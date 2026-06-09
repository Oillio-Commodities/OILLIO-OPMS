/**
 * OILLIO-OPMS — Reference Price Database v3
 * Deploy as: Web App → Execute as: Me → Anyone can access
 *
 * IMPORTANT: After pasting this code, click Deploy → Manage Deployments
 * → Edit (pencil) → Version: New version → Deploy
 */

var SHEET_NAME = 'RefPrices';
var LOG_SHEET  = 'RefLog';

// ── GET: used for BOTH reading AND writing ──
// Writing via GET avoids all CORS issues completely
function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // WRITE: ?action=save&data={json}
    if (p.action === 'save' && p.data) {
      var payload = JSON.parse(p.data);
      savePrices(payload);
      return respond({status: 'saved', ts: new Date().toISOString()});
    }

    // READ: ?action=get (or just GET with no params)
    return respond(getLatest());

  } catch(err) {
    return respond({error: err.toString()});
  }
}

// ── POST: fallback, also handles saves ──
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);
    savePrices(payload);
    return respond({status: 'saved', ts: new Date().toISOString()});
  } catch(err) {
    return respond({error: err.toString()});
  }
}

// ── Read latest prices for all suppliers ──
function getLatest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return {};

  var rows = sheet.getDataRange().getValues();
  var latest = {};

  for (var i = 1; i < rows.length; i++) {
    var sup = String(rows[i][0]);
    var ts  = String(rows[i][1]);
    if (!sup) continue;
    if (!latest[sup] || ts > latest[sup].ts) {
      latest[sup] = {
        ts:  ts,
        ref: safeJson(rows[i][2]),
        pkg: safeJson(rows[i][3]),
        user: rows[i][4] || ''
      };
    }
  }
  return latest;
}

// ── Save prices to sheet ──
function savePrices(data) {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreate(ss, SHEET_NAME,
    ['supplier','ts','ref_json','pkg_json','user'], '#34a853');
  var log = getOrCreate(ss, LOG_SHEET,
    ['Date (MY)','Time (MY)','Supplier','User','Ref Values'], '#4285f4');

  var ts  = data.ts  || new Date().toISOString();
  var sup = data.supplier || 'apical';
  var ref = data.ref || {};
  var pkg = data.pkg || [];
  var usr = data.user || 'User 0';

  sheet.appendRow([sup, ts, JSON.stringify(ref), JSON.stringify(pkg), usr]);

  var myDate = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'dd/MM/yyyy');
  var myTime = Utilities.formatDate(new Date(), 'Asia/Kuala_Lumpur', 'HH:mm:ss');
  log.appendRow([myDate, myTime, sup, usr, JSON.stringify(ref)]);
}

// ── Helpers ──
function getOrCreate(ss, name, headers, color) {
  var s = ss.getSheetByName(name);
  if (!s) {
    s = ss.insertSheet(name);
    s.appendRow(headers);
    s.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold').setBackground(color).setFontColor('#ffffff');
  }
  return s;
}

function safeJson(str) {
  try { return JSON.parse(str || '{}'); } catch(e) { return {}; }
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
