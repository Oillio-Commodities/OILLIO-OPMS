
## 2026-05-22 (Rev 16) — Correct Infinity Loop Logo from Detailed Spec

### Logo structure — from full JSON spec (interlocking infinity ribbon)
- **Type**: Two separate ribbon-shaped torus segments that interlock (NOT simple green crescent over amber fill)
- **Ring mask**: outer circle r=47 minus inner hole r=25 (creates the torus ring shape)
- **Layer order for 3D depth**:
  1. Full green ring (base)
  2. Orange right-half ring over green (M50,3 → CW outer arc → inner arc back)
  3. Green TOP cap: small arc at very top where green goes IN FRONT of orange (12 o'clock junction)
  4. Orange BOTTOM cap: small arc at bottom where orange goes IN FRONT of green (6 o'clock junction)
  5. White almond on top (M53,22 C70,30 70,64 46,78 C24,70 24,36 53,22Z)
- **Green gradient**: #7ed957 → #38cc44 → #00a651 → #006030 → #003c1c (highlight cx22,cy18)
- **Orange gradient**: #ffe840 → #ffb800 → #f7a000 → #e07000 → #b85000 (highlight cx76,cy18)
- Applied to all 4 locations: auth(100px), header(44px), PDF(84px), watermark(480px @4%)
