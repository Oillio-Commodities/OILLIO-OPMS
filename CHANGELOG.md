
## 2026-05-22 (Rev 23) — Use Actual SVG Logo File (Exact Match)

### Logo — official SVG file provided by user
- `logo.svg`: full logo (1326×614px) — emblem + wordmark (Oillio, Commodities Sdn. Bhd., 1527357-W)
- `logo_emblem.svg`: emblem only (viewBox 0 0 620 614) — circular ring icon only

### Applied to all 4 locations
1. Auth/login page: `logo.svg` at height 90px — full logo with wordmark
2. Main header icon: `logo_emblem.svg` at 40×40px
3. PDF header: `logo.svg` at height 84px (wordmark included)
4. PDF watermark: `logo_emblem.svg` at 480×480px, opacity 0.04

### No more SVG-in-JS-string issues
- All logo references use relative URL paths (`logo.svg`, `logo_emblem.svg`)
- Zero risk of HTML/JS parser corruption
