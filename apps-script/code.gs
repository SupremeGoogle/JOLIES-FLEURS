/**
 * ═══════════════════════════════════════════════════════════
 *  JOLIES FLEURS — Google Apps Script для приёма заявок
 * ═══════════════════════════════════════════════════════════
 *
 * ШАГ 1. Создай новую Google Таблицу (sheets.google.com)
 *
 * ШАГ 2. В таблице: Расширения → Apps Script
 *        Удали весь код и вставь ЭТОТ файл целиком. Сохрани (Ctrl+S).
 *
 * ШАГ 3. Нажми «Выполнить» → выбери функцию setupSheet → Разреши доступ
 *        (нужно один раз, чтобы создать заголовки)
 *
 * ШАГ 4. Нажми «Развернуть» → «Новое развёртывание»:
 *        - Тип:          Веб-приложение
 *        - Выполнять как: Я (akbarchik0071@gmail.com)
 *        - Доступ:        Все (в том числе анонимные пользователи)
 *        → Нажми «Развернуть», скопируй URL вида:
 *          https://script.google.com/macros/s/XXXX.../exec
 *
 * ШАГ 5. В Vercel → Settings → Environment Variables добавь:
 *        APPS_SCRIPT_URL = <скопированный URL из шага 4>
 *
 * ШАГ 6. Локально в web/.env.local также добавь:
 *        APPS_SCRIPT_URL=<тот же URL>
 *        Затем запусти: ./push.sh "Добавлен Apps Script URL"
 *
 * ═══════════════════════════════════════════════════════════
 */

var SHEET_NAME = "Заявки с сайта";

/**
 * Принимает POST-запрос от сайта и записывает заявку в таблицу.
 * Вызывается автоматически при отправке формы.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet_();

    var row = [
      formatDate_(data.timestamp),   // A: Дата
      data.name    || "",            // B: Имя
      data.phone   || "",            // C: Телефон
      data.message || "",            // D: Сообщение
      "Сайт"                         // E: Источник
    ];

    sheet.appendRow(row);

    // Форматируем дату в последней строке
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("dd.MM.yyyy HH:mm");

    // Чередующийся цвет строк для читаемости
    var bg = (lastRow % 2 === 0) ? "#FFF5F7" : "#FFFFFF";
    sheet.getRange(lastRow, 1, 1, 5).setBackground(bg);

    return ok_({ saved: true, row: lastRow });

  } catch (err) {
    return ok_({ saved: false, error: err.toString() });
  }
}

/**
 * Обработчик GET — для проверки что скрипт работает.
 * Открой URL в браузере — должен вернуть {"status":"ok"}
 */
function doGet() {
  return ok_({ status: "ok", sheet: SHEET_NAME });
}

/** Запусти вручную один раз для создания заголовков */
function setupSheet() {
  var sheet = getOrCreateSheet_();
  Logger.log("Лист готов: " + sheet.getName());
}

/** Тест без реального HTTP-запроса */
function testSend() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Мария Тестова",
        phone: "+7 (999) 123-45-67",
        message: "Хочу заказать букет роз на день рождения",
        timestamp: new Date().toISOString()
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

// ─── Вспомогательные функции ───────────────────────────────

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);

    // Заголовки
    var headers = ["📅 Дата", "👤 Имя", "📞 Телефон", "💬 Сообщение", "🌐 Источник"];
    sheet.appendRow(headers);

    // Стиль заголовков
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange
      .setBackground("#F2A7B5")
      .setFontWeight("bold")
      .setFontColor("#3D2B1F")
      .setFontSize(11);

    // Ширина колонок
    sheet.setColumnWidth(1, 140);  // Дата
    sheet.setColumnWidth(2, 160);  // Имя
    sheet.setColumnWidth(3, 160);  // Телефон
    sheet.setColumnWidth(4, 400);  // Сообщение
    sheet.setColumnWidth(5, 100);  // Источник

    sheet.setFrozenRows(1);

    Logger.log("✅ Лист создан: " + SHEET_NAME);
  }

  return sheet;
}

function formatDate_(iso) {
  if (!iso) return new Date();
  try { return new Date(iso); } catch (e) { return new Date(); }
}

function ok_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
