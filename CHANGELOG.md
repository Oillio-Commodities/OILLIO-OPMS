
---

## Rev 33 — CSV Export Fixed (Price History Log)

### Problem
- `svExportLog()` in Price History Log was exporting raw JSON — unreadable in Excel
- User saw "Export All History (JSON)" button downloading `.json` file

### Fix
- Replaced `svExportLog()` with proper Excel-ready CSV export
- Button renamed: "Download Report (CSV — opens in Excel)"
- File: `Oillio_PriceLog_YYYY-MM-DD.csv`

### CSV file structure (two sections in one file)
```
OILLIO COMMODITIES SDN BHD — PRICE & ACTIVITY REPORT
Generated: 23/05/2026, 09:05:00

=== REFERENCE PRICE LOG (N entries) ===
Date | Time | Supplier | User | Malaysia CP10 | Indonesia CP10 | PK Olein | PK Oil | PK Stearin | Coconut | Stearin | Oillio Margin %

=== QUOTATION ACTIVITY LOG (N entries) ===
Date | Time | User | Customer | Product | Supplier | Mode | FCL | FOB/MT | Oillio Price/MT | Oillio Unit Price
```

### How to open in Excel on Android
1. Press the button — file downloads to Downloads folder automatically
2. Open Files app → Downloads → tap the .csv file
3. Choose "Excel" or "Google Sheets" to open
4. Data appears in columns, fully readable

### Technical note
- Added `\uFEFF` BOM prefix so Excel auto-detects UTF-8 encoding
- Numbers are plain (no quotes) so Excel treats them as numbers, not text
- Text fields with commas are wrapped in double quotes
