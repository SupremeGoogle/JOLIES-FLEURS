import asyncio
import io
import re
import zipfile
import logging
from collections import defaultdict
from telegram import Update, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

TOKEN = "8416371684:AAHgiqIGvaaNZzDXNBz_7ceD9WOInoUznec"

logging.basicConfig(format="%(asctime)s - %(levelname)s - %(message)s", level=logging.INFO)

KEYBOARD = ReplyKeyboardMarkup(
    [[KeyboardButton("▶️ Старт"), KeyboardButton("⏹ Стоп")]],
    resize_keyboard=True,
    is_persistent=True,
)


def new_state():
    return {
        "collecting": False,
        "photos": [],          # list of (file_id, price_label)
        "pending_groups": {},  # group_id -> {photos, caption}
        "pending_tasks": {},   # group_id -> asyncio.Task
    }


user_state: dict = defaultdict(new_state)


def extract_prices(text: str) -> list[str]:
    prices = []
    for line in text.split("\n"):
        line = line.strip()
        if line and re.search(r"\d{3,}", line):
            prices.append(line)
    return prices


def price_to_filename(label: str, index: int, used: set) -> str:
    # Keep only digits + currency symbols
    name = re.sub(r"[^\d₽руб.,\-]", "", label).strip(" .,")
    if not name:
        name = f"фото_{index + 1}"
    candidate = f"{name}.jpg"
    # Handle duplicates
    if candidate in used:
        candidate = f"{name}_{index + 1}.jpg"
    used.add(candidate)
    return candidate


async def flush_group(context: ContextTypes.DEFAULT_TYPE, chat_id: int, group_id: str):
    await asyncio.sleep(1.5)
    state = user_state[chat_id]
    g = state["pending_groups"].pop(group_id, None)
    state["pending_tasks"].pop(group_id, None)
    if not g:
        return
    prices = extract_prices(g["caption"]) if g["caption"] else []
    for i, file_id in enumerate(g["photos"]):
        label = prices[i] if i < len(prices) else f"фото_{len(state['photos']) + 1}"
        state["photos"].append((file_id, label))


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    state = user_state[chat_id]
    state["collecting"] = True
    state["photos"] = []
    state["pending_groups"] = {}
    state["pending_tasks"] = {}
    await update.message.reply_text(
        "✅ Сбор начат!\nОтправляй фото с ценами в описании.\nКогда закончишь — нажми ⏹ Стоп.",
        reply_markup=KEYBOARD,
    )


async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text or ""
    chat_id = update.effective_chat.id

    if text == "▶️ Старт":
        await cmd_start(update, context)
    elif text == "⏹ Стоп":
        await do_stop(update, context, chat_id)


async def on_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = update.message
    chat_id = msg.chat_id
    state = user_state[chat_id]

    if not state["collecting"]:
        await msg.reply_text("Нажми ▶️ Старт, чтобы начать сбор.", reply_markup=KEYBOARD)
        return

    file_id = msg.photo[-1].file_id
    group_id = msg.media_group_id

    if group_id:
        g = state["pending_groups"].setdefault(group_id, {"photos": [], "caption": ""})
        g["photos"].append(file_id)
        if msg.caption:
            g["caption"] = msg.caption

        # Reset timer so we flush only after last photo of group arrives
        if group_id in state["pending_tasks"]:
            state["pending_tasks"][group_id].cancel()
        state["pending_tasks"][group_id] = asyncio.create_task(
            flush_group(context, chat_id, group_id)
        )
    else:
        label = msg.caption or f"фото_{len(state['photos']) + 1}"
        state["photos"].append((file_id, label))


async def download_with_retry(bot, file_id: str, retries: int = 3) -> bytes:
    for attempt in range(retries):
        try:
            tg_file = await bot.get_file(file_id, read_timeout=60, write_timeout=60, connect_timeout=30)
            return bytes(await tg_file.download_as_bytearray(read_timeout=120))
        except Exception as e:
            if attempt == retries - 1:
                raise
            await asyncio.sleep(2)


async def do_stop(update: Update, context: ContextTypes.DEFAULT_TYPE, chat_id: int):
    state = user_state[chat_id]

    if state["pending_tasks"]:
        await update.message.reply_text("⏳ Дожидаюсь последних фото...")
        await asyncio.gather(*state["pending_tasks"].values(), return_exceptions=True)

    photos = state["photos"]
    if not photos:
        await update.message.reply_text("Нет фотографий для архива.", reply_markup=KEYBOARD)
        return

    status_msg = await update.message.reply_text(f"⏳ Скачиваю {len(photos)} фото...")

    used_names: set = set()
    zip_buffer = io.BytesIO()

    try:
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_STORED) as zf:
            for i, (file_id, label) in enumerate(photos):
                await status_msg.edit_text(f"⏳ Скачиваю {i + 1}/{len(photos)}...")
                filename = price_to_filename(label, i, used_names)
                data = await download_with_retry(context.bot, file_id)
                zf.writestr(filename, data)
    except Exception as e:
        await status_msg.edit_text(f"❌ Ошибка при скачивании: {e}")
        return

    zip_buffer.seek(0)
    await status_msg.edit_text("📤 Отправляю архив...")
    await context.bot.send_document(
        chat_id=chat_id,
        document=zip_buffer,
        filename="flowers.zip",
        caption=f"📦 {len(photos)} фото",
        write_timeout=120,
        read_timeout=120,
    )
    await status_msg.delete()

    state["collecting"] = False
    state["photos"] = []
    state["pending_groups"] = {}
    state["pending_tasks"] = {}


async def on_error(update: object, context: ContextTypes.DEFAULT_TYPE):
    logging.error(f"Error: {context.error}")


def main():
    app = (
        Application.builder()
        .token(TOKEN)
        .read_timeout(60)
        .write_timeout(60)
        .connect_timeout(30)
        .build()
    )
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    app.add_handler(MessageHandler(filters.PHOTO, on_photo))
    app.add_error_handler(on_error)
    logging.info("Bot started")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
