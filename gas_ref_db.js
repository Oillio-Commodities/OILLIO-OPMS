/**
 * OILLIO-OPMS — Reference Price Database
 * Google Apps Script — deploy as Web App
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * After ANY code change: Deploy → New Deployment (or New Version on existing)
 */

var SHEET_NAME = 'RefPrices';
var LOG_SHEET  = 'RefLog';

// ── CORS headers for all responses ──
function cors(output) {
  return output
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Handle GET: returns latest prices ──
function doGet(e) {
  try {
    return cors(ContentService.createTextOutput(
      JSON.stringify(getLatest())
    ));
  } catch(err) {
    return cors(ContentService.createTextOutput(
      JSON.stringify({error: err.toString()})
    ));
  }
}

// ── Handle POST: saves new prices ──
// Uses text/plain body to avoid CORS preflight
function doPost(e) {
  try {
    var body = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(body);
    savePrices(data);
    return cors(ContentService.createTextOutput(
      JSON.stringify({status:'saved', ts: new Date().toISOString()})
    ));
  } catch(err) {
    return cors(ContentService.createTextOutput(
      JSON.stringify({error: err.toString()})
    ));
  }
}

// ── Get latest prices for all 3 suppliers ──
function getLatest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return {};

  var rows = sheet.getDataRange().getValues();
  var latest = {}; // supplier -> row

  for (var i = 1; i < rows.length; i++) {
    var sup = rows[i][0];
    var ts  = rows[i][1];
    if (!sup) continue;
    if (!latest[sup] || ts > latest[sup].ts) {
      latest[sup] = {
        ts:  ts,
        ref: safeJson(rows[i][2]),
        pkg: safeJson(rows[i][3])
      };
    }
  }
  return latest;
}

// ── Save prices ──
function savePrices(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  var log   = ss.getSheetByName(LOG_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['supplier','ts','ref_json','pkg_json','user']);
    sheet.getRange(1,1,1,5).setFontWeight('bold').setBackground('#34a853').setFontColor('#fff');
  }
  if (!log) {
    log = ss.insertSheet(LOG_SHEET);
    log.appendRow(['Date (MY)','Time (MY)','Supplier','User','Changes']);
    log.getRange(1,1,1,5).setFontWeight('bold').setBackground('#4285f4').setFontColor('#fff');
  }

  var ts  = data.ts || new Date().toISOString();
  var sup = data.supplier || 'apical';
  var ref = data.ref || {};
  var pkg = data.pkg || [];
  var user = data.user || 'User 0';

  // Save to RefPrices (history)
  sheet.appendRow([sup, ts, JSON.stringify(ref), JSON.stringify(pkg), user]);

  // Save to RefLog (human readable)
  var d = new Date();
  var myDate = Utilities.formatDate(d, 'Asia/Kuala_Lumpur', 'dd/MM/yyyy');
  var myTime = Utilities.formatDate(d, 'Asia/Kuala_Lumpur', 'HH:mm:ss');
  log.appendRow([myDate, myTime, sup, user, JSON.stringify(ref)]);
}

function safeJson(str) {
  try { return JSON.parse(str || '{}'); } catch(e) { return {}; }
}
