/**
 * JOLIES FLEURS — Google Apps Script
 *
 * КАК УСТАНОВИТЬ:
 * 1. Открой Google Sheets → Расширения → Apps Script
 * 2. Вставь этот код, нажми Сохранить
 * 3. Нажми "Развернуть" → "Новое развёртывание"
 *    - Тип: Веб-приложение
 *    - Выполнять как: Я (your email)
 *    - Доступ: Все (анонимный)
 * 4. Скопируй URL развёртывания
 * 5. В Vercel добавь переменную APPS_SCRIPT_URL = <скопированный URL>
 *
 * СТРУКТУРА ТАБЛИЦЫ:
 * Лист 1 "Заявки": Дата | Имя | Телефон | Сообщение | Источник
 */

var SHEET_NAME_ORDERS = "Заявки";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Получаем или создаём лист "Заявки"
    var sheet = ss.getSheetByName(SHEET_NAME_ORDERS);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME_ORDERS);
      // Заголовки
      sheet.appendRow(["Дата", "Имя", "Телефон", "Сообщение", "Источник"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#F2A7B5");
      sheet.setFrozenRows(1);
    }

    // Добавляем строку
    sheet.appendRow([
      new Date(data.timestamp || Date.now()),
      data.name || "",
      data.phone || "",
      data.message || "",
      data.source || "website"
    ]);

    // Форматируем колонку A как дату
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("dd.MM.yyyy HH:mm");

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Тестовая функция — запусти вручную для проверки
function testDoPost() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Тест Тестов",
        phone: "+7 999 000-00-00",
        message: "Тестовая заявка",
        timestamp: new Date().toISOString(),
        source: "website"
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
