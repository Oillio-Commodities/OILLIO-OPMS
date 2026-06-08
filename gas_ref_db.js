/**
 * OILLIO-OPMS — Google Apps Script (Ref Price Database)
 * Deploy as: Web App → Execute as Me → Anyone can access
 *
 * Handles:
 *   GET ?action=getRef        → returns latest ref prices for all 3 suppliers
 *   GET ?data={json payload}  → saves ref prices (sent from _pushRefToSheets)
 *
 * SETUP:
 * 1. script.google.com → New Project → paste this file
 * 2. Deploy → New Deployment → Web App
 *    Execute as: Me | Who has access: Anyone
 * 3. Copy deployment URL ID into index.html _GAS_URL
 */

var SHEET_NAME = 'RefPrices';
var LOG_SHEET  = 'RefLog';

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};

  // ── Save ref prices (from _pushRefToSheets via GET ?data=...) ──
  if (params.data) {
    try {
      var payload = JSON.parse(decodeURIComponent(params.data));
      if (payload.action === 'saveRef') {
        saveRef(payload);
        return jsonResponse({status:'saved', supplier:payload.supplier, ts:payload.ts});
      }
    } catch(err) {
      return jsonResponse({status:'error', msg: err.toString()});
    }
  }

  // ── Return latest ref prices ──
  if (params.action === 'getRef' || !params.action) {
    return getRef();
  }

  return jsonResponse({status:'ok', info:'OILLIO-OPMS Ref DB v2'});
}

// Keep doPost for any future POST calls
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'saveRef') {
      saveRef(data);
      return jsonResponse({status:'saved'});
    }
  } catch(err) {}
  return jsonResponse({status:'error'});
}

// ── Return latest ref prices for all suppliers ──
function getRef() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return jsonResponse({});

  var data = sheet.getDataRange().getValues();
  var latest = {};

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var sup = row[0], ts = row[1];
    if (!latest[sup] || ts > latest[sup][1]) {
      latest[sup] = row;
    }
  }

  var result = {};
  ['apical','klk','wingagro'].forEach(function(sup) {
    if (latest[sup]) {
      try {
        result[sup] = {
          ref: JSON.parse(latest[sup][2]),
          pkg: JSON.parse(latest[sup][3]),
          ts:  latest[sup][1],
          savedBy: latest[sup][4] || 'User 0'
        };
      } catch(e) {}
    }
  });

  return jsonResponse(result);
}

// ── Save ref prices (appends a new row, keeping full history) ──
function saveRef(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['supplier','ts','ref_json','pkg_json','saved_by']);
    sheet.getRange(1,1,1,5).setFontWeight('bold');
  }

  var ts = data.ts || new Date().toISOString();
  sheet.appendRow([
    data.supplier || '',
    ts,
    JSON.stringify(data.ref  || {}),
    JSON.stringify(data.pkg  || []),
    data.user || 'User 0'
  ]);

  // Also write to human-readable log sheet
  var logSheet = ss.getSheetByName(LOG_SHEET);
  if (!logSheet) {
    logSheet = ss.insertSheet(LOG_SHEET);
    logSheet.appendRow(['Date','Time','Supplier','Saved By','Ref Prices (JSON)']);
    logSheet.getRange(1,1,1,5).setFontWeight('bold');
  }

  var d = new Date(ts);
  var dateStr = d.toLocaleDateString('en-MY', {timeZone:'Asia/Kuala_Lumpur'});
  var timeStr = d.toLocaleTimeString('en-MY', {timeZone:'Asia/Kuala_Lumpur'});
  logSheet.appendRow([dateStr, timeStr, data.supplier, data.user||'User 0',
    JSON.stringify(data.ref||{})]);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
