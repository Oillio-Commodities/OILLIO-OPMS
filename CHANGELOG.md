
## 2026-05-21 (Rev 7) — Logo + Full T&C in PDF; WhatsApp T&C for all suppliers

### PDF (For Reference Only / generatePDF)
- **Logo**: The `.bar` header containing the SVG logo was hidden in `@media print` (CSS `display:none`). Logo was never visible in saved PDFs. Fix: added `_pdfLogo` SVG to the print-visible `.hdr` section (inside `.wrap`), beside company name. Now renders correctly in print/PDF.
- **T&C**: Replaced the abbreviated 4-5 line T&C with the full `tcFob()`/`tcCif()` content — same payment terms, shipment, brand clause, all 6 external document items, and CIF Special Clauses 6–9. Consistent across WhatsApp, quotation tab, and all PDF types.

### WhatsApp text (buildRpt)
- Fixed `hasFobItems`/`hasCifItems` detection to cover **all supplier types**. Previous check used only `priceMode` field (Able Perfect items only). New supplier items (Apical/KLK/WingAgro) use `mode` field only, so FOB T&C was never appended for them. Fix: checks both `priceMode` and `mode` fields.

### All prior fixes preserved
- calcKlkP, KLK chips, compact list, Apical/WingAgro layout unchanged
