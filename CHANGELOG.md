
## 2026-05-23 (Rev 30) — Emblem SVG Cleaned + Correct 3-Line Text Layout

### Emblem SVG (logo_emblem_nobg.svg) — definitive clean
- Removed 59 paths at translate x>=560: these were text-adjacent paths causing the stray "O" circle and "Comm 1527357" text to render beside the emblem
- Removed 5 near-white anti-aliasing paths (lum>0.82, sat<0.3) causing whitish pixel spots
- Added `<clipPath>` circle (cx=295,cy=307,r=285) as hard boundary — nothing outside the ring can render
- Kept 290 paths: only the orange/yellow and green ring paths + white almond

### Auth/Login page text layout — matches Image 4 reference exactly
- Row 1: "Oillio" — 3rem, font-weight:900 (THICK/BOLD), white
- Row 2: "Commodities Sdn. Bhd." — 1rem, font-weight:700 (slightly bold), 85% white
- Row 3: "(1527357-W)" — 0.82rem, font-weight:400 (THIN), 55% white
- Logo: 95px (matches combined 3-row text block height)
- CSS filter: contrast(1.3) saturate(2) for vivid ring colours
