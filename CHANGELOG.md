
## 2026-05-22 (Rev 17) — Organic S-curve Logo from Structural JSON Analysis

### Logo — from detailed image_analysis JSON
- **Green left swooping shape**: large left arc (CCW) + organic S-curve inner boundary
  - Path: `M50,3 A47,47 0 1 0 50,97 C46,83 48,67 53,50 C58,33 55,17 50,3 Z`
  - The S-curve creates the "swoop": boundary at x≈55 upper, x≈46 lower
- **Orange right swooping shape**: S-curve mirror + right arc (CW)
  - Path: `M50,3 C55,17 58,33 53,50 C48,67 46,83 50,97 A47,47 0 0 1 97,50 A47,47 0 0 1 50,3 Z`
- **White almond**: `M53,20 C72,28 72,66 46,80 C24,72 24,34 53,20Z` (larger than before)
- **Green gradient**: cx20,cy15 — #8ed84a lime → #00a651 emerald → #004020 dark
- **Orange gradient**: cx80,cy15 — #ffe040 gold → #f7a000 amber → #c05000 deep orange
- Applied to auth(100px), header(44px), PDF(84px), watermark(480px @4%)
