
## 2026-05-22 (Rev 10) — Logo Exact Match + Supplier Confidential + Ref Format + Filename

### Oillio branding — exact match to commercial invoice
- **Logo SVG rebuilt**: Green circle (#1e6b1e) + large amber/orange oval (radial gradient #ffe082→#ffb300→#e65c00) covering right 60% of circle, rotated -12°, clipped to circle. White "Oillio" in italic bold Georgia serif centered. Matches invoice logo exactly.
- **Wordmark**: "Oillio" in italic bold Georgia 22pt green, "Commodities Sdn. Bhd." 8.5pt, "(1527357-W)" 7pt — displayed next to logo exactly as commercial invoice.
- **Watermark**: Large semi-transparent logo backdrop (opacity 4%) right side of page.
- **Footer**: Dark green bar, orange (#f5a623) pin/phone/email icons, address, "(O)+603 5888 8339 / (M) +6012 326 3988", "export@oillio.com.my", "www.oillio.com.my" right-aligned.

### "Save as PDF" bar removed from PDF window
- The green "Save as PDF" button bar no longer appears at top of the PDF preview window. PDF opens clean without any overlay buttons.

### Supplier confidentiality — removed from all 3 locations
- **PDF**: "Supplier(s):" row removed from meta-grid.
- **WhatsApp text**: "*Supplier: Apical/KLK/Wing Agro/For Reference Only*" lines removed from buildRpt.
- **Image/openPrintPreview**: Same supplier lines removed.

### Reference format: Oillio-YYYYMMDD-NN
- Format changed from `QT-YYYY-NNNNN` to `Oillio-YYYYMMDD-NN` (e.g. Oillio-20260522-01).
- Daily sequence stored in localStorage; resets each day, starts at 01.

### PDF filename: Oillio_Commodities-{customer}_{YYYY}_{MM}_{DD}
- When saved/downloaded: `Oillio_Commodities-CustomerName_2026_05_22.html`.
- Browser `<title>` also updated to match for PDF "save as" default name.

### Preserved
- All prior fixes intact (calcKlkP, KLK chips, Apical/WingAgro, T&C, WhatsApp T&C).
