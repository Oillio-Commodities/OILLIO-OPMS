
## 2026-05-21 (Rev 7) — WhatsApp T&C Fix + PDF Logo & T&C

### WhatsApp text (buildRpt)
- Fixed FOB/CIF detection to be **case-insensitive**. Old Able Perfect items store `mode:'fob'` (lowercase); new supplier items store `mode:'FOB'` (uppercase). Previous check `x.mode==='FOB'` missed old items. Now uses `x.mode.toUpperCase()==='FOB'` — T&C terms now appear for all FOB quotes regardless of which supplier.

### PDF Summary Report
- **Logo**: Replaced placeholder circle with proper Oillio brand SVG — green radial gradient with oil-drop motif, "Oillio" wordmark below icon.
- **Header proportions**: Company name 15pt bold green, tagline "Your Trusted Partner in Edible Oils & Fats", registration/address 7pt, date + ref number right-aligned. Green gradient rule line below header.
- **T&C**: Also fixed case-insensitive detection (same fix as WhatsApp). FOB Terms and CIF Terms now reliably appear at bottom of PDF for all quote types.

### Preserved
- All prior fixes (calcKlkP, KLK chips/sub-filter/compact list, Apical/WingAgro layout, quotation tab T&C)
