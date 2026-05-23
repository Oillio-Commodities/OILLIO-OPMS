
---

## Rev 32 — CSV Export for Logs (User 0)

### New functions added
- `exportPdfLog()` — **REPLACED** (was JSON export, now proper CSV)
- `exportRefLog()` — **NEW** — exports reference price change history as CSV
- `clearLogs()` — **NEW** — clears both logs after confirmation prompt

### How CSV export works
1. User 0 opens the PDF Activity Log modal (from Oil Price Manager)
2. Three buttons shown at top:
   - 🟢 **Download PDF Log (CSV)** — all quotations ever generated
   - 🟠 **Download Ref Price Log (CSV)** — all reference price saves
   - 🔴 **Clear All Logs** — permanent delete (confirm dialog shown)
3. Browser downloads file to device Downloads folder

### PDF Log CSV columns
Date | Time | User | Customer | Product | Mode | FCL | FOB/MT (USD) | Oillio MT (USD) | Oillio Unit (USD)
- One row per product line item (entries with multiple products = multiple rows)
- Up to 2000 entries stored in localStorage key `oillio_pdf_log`

### Ref Price Log CSV columns
Date | Time | Supplier | User | [all reference price fields dynamically]
- Up to 500 entries stored in localStorage key `oillio_ref_log`
- Records every time User 0 clicks "Save & Log Reference"

### Storage reminder
- All data stored in browser localStorage on the device
- Export CSV regularly to preserve records across device changes
- Clearing browser data will erase logs — export first
