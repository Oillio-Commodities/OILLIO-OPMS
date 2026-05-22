
## 2026-05-22 (Rev 25) — Auth Page: Emblem + White Wordmark (Presentable on Dark Bg)

### Problem
- `logo_nobg.svg` has dark green text — invisible/ugly on dark navy (#071c2e) auth background
- Full SVG logo is only suitable for WHITE backgrounds (PDF)

### Fix
- Auth/login page: emblem icon (`logo_emblem_nobg.svg`, 80px) + white HTML wordmark
  - "Oillio" — Trebuchet MS 32pt 800-weight WHITE
  - "Commodities Sdn. Bhd." — Arial 11pt 600-weight rgba(255,255,255,0.80)
  - "(1527357-W)" — Arial 9pt rgba(255,255,255,0.50)
- Header: unchanged (emblem-only icon, always correct)
- PDF: unchanged (full `logo_nobg.svg` on white page — dark text looks great)
