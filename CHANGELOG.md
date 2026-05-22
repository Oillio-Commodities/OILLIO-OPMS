
## 2026-05-22 (Rev 18) — Cleanest Logo Implementation

### Logo — 3-layer approach based on actual image analysis
- **Layer 1**: Full green circle (cx50,cy50,r47) — becomes the green crescent after orange overlays
- **Layer 2**: Orange S-curve shape: `M50,3 C90,3 10,97 50,97 A47,47 0 0 1 97,50 A47,47 0 0 1 50,3 Z`
  - S-curve bezier C90,3 10,97: sweeps far right at top (control x=90), far left at bottom (control x=10)
  - At upper portion (y≈23): orange boundary at x≈60 (green extends 10 units right of centre)
  - At lower portion (y≈77): orange boundary at x≈40 (orange extends 10 units left of centre)
  - Creates the "swoop" where orange wraps to lower-left and green to upper-right
- **Layer 3**: White almond `M53,19 C74,26 74,68 46,81 C22,74 22,32 53,19 Z` (large, prominent)
  - Top tip (53,19), bottom tip (46,81), right ~x=74, left ~x=22 — height 62%, width 52% of circle

### Green gradient (cx18,cy14,r62): #a8e040→#5cc828→#00a851→#007038→#003014
### Orange gradient (cx80,cy14,r62): #ffe020→#ffb800→#f7941d→#e87200→#b03800
