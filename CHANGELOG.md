
## 2026-05-22 (Rev 24) — Transparent Logo Background (Blends with All Pages)

### Fix
- Removed the white background rectangle (#FEFEFE) that was the first <path> in the SVG
- Created `logo_nobg.svg` and `logo_emblem_nobg.svg` — identical logos with transparent backgrounds
- All 4 logo references now use the transparent versions
- Logo blends naturally into: dark auth background, dark green header, white PDF page, watermark backdrop
