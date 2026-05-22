
## 2026-05-22 (Rev 26) — Fix Large SVG Ghost + Auth Page Alignment

### Root cause of large hook/loop shape
- SVG files had explicit `width="620" height="614"` attributes in the `<svg>` tag
- Mobile browsers prioritise SVG intrinsic dimensions over CSS, so the 80px img rendered at 620px
- Fix: removed `width` and `height` attributes from all 4 SVG files; now CSS fully controls size

### Auth/login page redesign
- Single emblem (72px) left-side, with text column right-side
- All three text lines LEFT-ALIGNED (same x-start): "Oillio" / "Commodities Sdn. Bhd." / "(1527357-W)"
- Explicit `align-items:flex-start` on text column ensures O, C, ( all start at same edge
- Uses `display:block` + explicit `width:72px;height:72px` on img to prevent any sizing ambiguity

### Main header
- Emblem uses `width:40px;height:40px;display:block` — no overflow or double-render
