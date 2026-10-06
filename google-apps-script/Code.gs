/**
 * Enquiry form -> Google Sheet.
 * Deploy as a web app (Execute as: Me, Who has access: Anyone).
 * See README.md in this folder for step-by-step setup.
 */

// Optional: get an email for every new enquiry. Leave empty to turn off.
const ALERT_EMAIL = "";

const HEADERS = ["Date", "Name", "Business", "WhatsApp", "Package", "Message", "Status"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};

    // Silently accept bot submissions without saving them.
    if (p.website) return json({ ok: true });

    const name = clean(p.name, 100);
    const business = clean(p.business, 120);
    const whatsapp = clean(p.whatsapp, 20);
    if (!name || !business || !whatsapp) return json({ ok: false, error: "Missing fields" });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      name,
      business,
      // Leading apostrophe keeps "+91..." as text instead of a formula.
      "'" + whatsapp,
      clean(p.package, 40),
      clean(p.message, 2000),
      "New",
    ]);

    if (ALERT_EMAIL) {
      MailApp.sendEmail({
        to: ALERT_EMAIL,
        subject: "New website enquiry: " + business,
        body:
          "Name: " + name + "\n" +
          "Business: " + business + "\n" +
          "WhatsApp: " + whatsapp + "\n" +
          "Package: " + clean(p.package, 40) + "\n\n" +
          clean(p.message, 2000),
      });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Strip characters that would make Sheets treat input as a formula.
function clean(value, max) {
  return String(value || "")
    .trim()
    .replace(/^[=+\-@]+/, "")
    .slice(0, max);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
