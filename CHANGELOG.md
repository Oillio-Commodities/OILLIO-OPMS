
## 2026-05-22 (Rev 22) — EMERGENCY FIX: Restore page + safe logo embedding

### Root cause of corruption (Rev 12-21)
- Large SVG strings (especially 480×480px watermark) embedded directly as JavaScript string literals
- SVG `</mask>`, `</defs>`, `</svg>` tags inside JS strings caused the HTML parser to break
- The entire `<script>` block failed → all JS code rendered as raw text on the page
- Result: 19+ SVGs scattered across the page, raw JS visible, page broken

### Fix
- Restored index.html from Rev11 (last known fully working state)
- Re-applied all non-logo fixes from Rev11 baseline (all present and verified ✓)
- **New logo embedding strategy**: SVG encoded as base64 data URL
  - `data:image/svg+xml;base64,...` — contains only alphanumeric + / + = characters
  - ZERO risk of breaking JS strings or HTML parser
  - Used `<img src="data:...">` in all 4 locations

### Logo design (from XML description)
- Ring/donut with evenodd mask: outer circle r=47 minus tilted almond (top-LEFT 46,20 → bottom-RIGHT 54,80)
- Green: left half, gradient cx38,cy22 — #c4ec48 lime → #003014 dark forest
- Orange: right half, gradient cx65,cy10 — #fff060 yellow → #b83000 deep orange
- 3D depth caps at 12 o'clock (green over orange) and 6 o'clock (orange over green)
