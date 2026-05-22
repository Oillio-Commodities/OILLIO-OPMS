
## 2026-05-22 (Rev 27) — Remove Line + Fix Logo Size + Clean Edges

### Line above logo — root cause found and fixed
- The VTracer SVG conversion left a 4px-tall, full-width horizontal bar at y=0 (translate 0,0) coloured #7D9485
- This rendered as a visible gray-green line at the top of the logo on all dark backgrounds
- Removed from all 4 SVG files (logo.svg, logo_nobg.svg, logo_emblem.svg, logo_emblem_nobg.svg)

### Small stray circle — root cause fixed
- logo_emblem_nobg.svg still contained 215 text-portion paths from original SVG
- Even with viewBox "0 0 620 614", paths at x=560-619 created stray visual dots near right edge
- Fixed in Rev 26 by filtering to only emblem paths (x < 620)
- Now also removed the y=0 line path as the sole remaining artefact

### Logo size
- Auth/login: emblem enlarged from 72px to **110px** — matches reference proportions
- Removed drop-shadow filter (was creating halo/edge artefacts on dark bg)
- All text lines (Oillio / Commodities Sdn. Bhd. / 1527357-W) left-aligned with `display:block`
- Main header icon: 46px (slightly larger for better visibility)
