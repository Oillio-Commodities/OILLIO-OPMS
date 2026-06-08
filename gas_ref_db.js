/**
 * OILLIO-OPMS — Google Apps Script (Ref Price Database)
 * Deploy as: Web App → Execute as Me → Anyone can access
 *
 * This script handles two actions:
 *   GET  ?action=getRef   → returns latest ref prices for all 3 suppliers
 *   POST {action:'saveRef', supplier, ref, pkg, ts, user} → saves new prices
 *
 * SETUP INSTRUCTIONS:
 * 1. Open https://script.google.com → New Project
 * 2. Paste this entire file as Code.gs
 * 3. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL
 * 5. In index.html, replace PASTE_YOUR_DEPLOYMENT_ID_HERE with your deployment ID
 *    (the part between /macros/s/ and /exec)
 */

var SHEET_NAME = 'RefPrices';
var LOG_SHEET  = 'RefLog';

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'getRef') {
    return getRef();
  }
  return ContentService.createTextOutput(JSON.stringify({status:'ok',info:'OILLIO-OPMS Ref DB'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'saveRef') {
      return saveRef(data);
    }
    if (data.action === 'logActivity') {
      return logActivity(data);
    }
  } catch(err) {}
  return ContentService.createTextOutput(JSON.stringify({status:'error'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET: return latest ref prices for all suppliers ──
function getRef() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Sheet doesn't exist yet — return empty (app will use defaults)
    return ContentService.createTextOutput(JSON.stringify({}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var result = {};

  // Sheet structure: Row 1 = headers, each row = one supplier snapshot
  // Columns: supplier | ts | ref_json | pkg_json
  // We only care about the LATEST row per supplier
  var latest = {}; // supplier -> row
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var sup = row[0];
    var ts  = row[1];
    if (!latest[sup] || ts > latest[sup][1]) {
      latest[sup] = row;
    }
  }

  ['apical','klk','wingagro'].forEach(function(sup) {
    if (latest[sup]) {
      try {
        result[sup] = {
          ref: JSON.parse(latest[sup][2]),
          pkg: JSON.parse(latest[sup][3]),
          ts:  latest[sup][1]
        };
      } catch(e) {}
    }
  });

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST: save ref prices ──
function saveRef(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['supplier','ts','ref_json','pkg_json','saved_by']);
  }

  sheet.appendRow([
    data.supplier,
    data.ts || new Date().toISOString(),
    JSON.stringify(data.ref  || {}),
    JSON.stringify(data.pkg  || []),
    data.user || 'User 0'
  ]);

  // Also write to log sheet
  var logSheet = ss.getSheetByName(LOG_SHEET);
  if (!logSheet) {
    logSheet = ss.insertSheet(LOG_SHEET);
    logSheet.appendRow(['date','ts','supplier','user','ref_json','pkg_json']);
  }
  var today = new Date().toISOString().slice(0,10);
  logSheet.appendRow([today, data.ts, data.supplier, data.user,
    JSON.stringify(data.ref||{}), JSON.stringify(data.pkg||[])]);

  return ContentService.createTextOutput(JSON.stringify({status:'saved'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST: log general activity ──
function logActivity(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ActivityLog');
  if (!sheet) {
    sheet = ss.insertSheet('ActivityLog');
    sheet.appendRow(['ts','user','device','action','detail']);
  }
  sheet.appendRow([
    new Date().toISOString(),
    data.user    || '',
    data.device  || '',
    data.action  || '',
    JSON.stringify(data)
  ]);
  return ContentService.createTextOutput(JSON.stringify({status:'logged'}))
    .setMimeType(ContentService.MimeType.JSON);
}
