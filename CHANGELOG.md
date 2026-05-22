
## 2026-05-22 (Rev 14) — Correct Torus Logo from Zoomed Reference

### Logo structure — pixel-matched from zoomed screenshot
- **Structure**: Ring/torus shape. Green base circle (cx50,cy50,r47) with amber circle (cx62,cy52,r42) clipped inside — creates green outer crescent on the left (~17 unit wide, 18% of diameter).
- **White leaf/almond**: Bezier path `M53,22 C70,30 70,64 46,78 C24,70 24,36 53,22Z` — pointed at top(53,22) and bottom(46,78), widest right at x≈65 and left at x≈30.
- **Green gradient** (userSpaceOnUse cx18,cy16,r62): vivid lime #a0e030 → #6cc020 → #2a8c10 → #105808 → #073404
- **Amber gradient** (userSpaceOnUse cx60,cy32,r52): golden #ffe820 → #ffcc00 → #ff9800 → #ff6400 → #e04000
- All 4 locations use identical SVG (different width/height only): auth(100px), header(44px), PDF(84px), watermark(480px@3.8%opacity).
