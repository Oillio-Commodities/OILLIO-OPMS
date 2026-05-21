# OILLIO-OPMS Changelog

## [Current] — 2026-05-21

### Fixed
- **CRITICAL BUG: `USER_LEVEL||2` falsy issue** — `0||2` evaluates to `2` in JS, so User 0 was always treated as User 2. All level checks now use `window.USER_LEVEL!=null?window.USER_LEVEL:2`.
- **Save & Log Reference does nothing** — caused by above bug. Now works correctly for User 0 only.
- **Products showing 0** — `fob_delta_jkt==null` filtered all products. Fixed by rebuilding APICAL_DATA with `fob_delta_jkt`/`fob_delta_kl` fields and simplifying filter to check `fob_jkt==null` only.
- **doPrint duplicate** — two doPrint functions existed; removed old one. PDF now opens in new window with print dialog.
- **PDF header** — Updated to green Oillio letterhead (was dark navy).

### Added  
- Reference prices locked (read-only, grey) after User 0 saves — click any input to unlock for editing
- Logout button in header for all users; auto-logout on page navigation
- PDF popup-blocked error message

---

## [2026-05-21 v2]

### Added
- **3-level authentication**:
  - `Joelishandsome1234` = User 0 (full admin: edit all yellow cells, save/log, view profit)
  - `Ysw1708kluang` = User 1 (view all, edit Oillio Margin % only)
  - `Oilliouser1` = User 2 (limited view: no ref prices, no profit/cost columns, margin min 2.5%)
- **Oillio SVG Logo** on login page, calculator header, and PDF
- **Internal PDF activity log** — every PDF generated captures: date, time, user, customer, products, prices (read-only, exportable as JSON)
- **Logout button** in header

### Fixed
- JKT/KL toggle now strictly separate (11 JKT-only, 13 KL-only, 2 both)
- Reference price inputs: editable (yellow) for User 0, greyed-out readonly for User 1/2
- Save/Reset buttons hidden for User 1; disabled for User 2

---

## [2026-05-21 v1]

### Changed
- Removed signature block from PDF quotation (no name, no company stamp)
- Removed "Supplier FOB/MT (editable)" yellow box from product detail card
- Removed extra "Save & Log FOB" green button from controls

---

## [2026-05-20 v5]

### Added
- **Yellow Reference Prices panel** (admin-only): Malaysia CP10, Indonesia CP10, RBD Palm Kernel Olein/Oil/Stearin, Coconut Oil, RBD Stearin
- **Live FOB pricing**: Each product stores `fob_delta` (supplier's margin above estimated cost). Changing a reference price auto-updates all products of that type
- **Save & Log Reference**: logs date, time, supplier, all reference prices to localStorage
- **View Log button**: shows last 30 working days of FOB + reference price logs
- **Export as JSON**: downloads complete unlimited price history
- Draft mode badge — official recording starts when confirmed

### Fixed
- ALL_PORTS is flat array `[{region,country,port,freight}]` — port region dropdown now shows region names (not numbers 0,1,2...)
- `setSupplier=function(){}` block was overwriting the correct function — removed
- Version stamp was inserting literal newline into JS string (SyntaxError in Chrome) — removed

---

## [2026-05-20 v4]

### Added
- **Oillio letterhead PDF**: dark navy (now green) header with logo, company details, address, T&C
- **Incoterms support**: FOB-only, CIF-only, or FOB & CIF columns in PDF
- **Freight as separate row** in PDF table for CIF items
- **showToast()** function for non-blocking notifications

### Fixed
- `SUPP_FREIGHT` undefined — changed to `SV_FR` throughout
- NaN in profit card — was unary `+` converting string to NaN; fixed by building strings safely
- Margin % change now updates detail card live (was only updating product list)

---

## [2026-05-20 v3]

### Added
- **Able Perfect layout** for product display: category chips → product list → tap for detail card
- Category chips for filtering (Jerry Cans, Shortening, Specialty, etc.)
- Detail card shows: FCPO, Premium, Pkg cost, Est.Cost (admin); Supplier/Unit, Oillio/MT, Oillio/Unit, Profit (all); Freight/Unit (if CIF)
- Add to Quote button in detail card

### Removed
- Wide horizontal-scrolling table replaced with vertical card layout

---

## [2026-05-20 v2]

### Added
- **APICAL_DATA** (26 products) with fcpo_default, premium, pkg_cost, fcpo_ref, fcpo_delta, fob_delta_jkt, fob_delta_kl
- **WA_DATA** (Wing Agro, 4 products): FOB Surabaya
- **KLK_DATA** (80 products)
- **getLiveFob(product, supplier)**: computes FOB dynamically from reference prices + delta. Changing Malaysia CP10 → all CP10 products update instantly
- **svCalc(fob, net_wt, load_ctn)**: Supplier/Unit, Oillio/MT, Oillio/Unit, Profit/Unit, Total Profit/FCL
- JKT / KL origin toggle for Apical (strict — no fallback)
- Incoterms / Freight panel: FOB / Manual / Port List (uses Able Perfect's 636-port database)
- Quotation cart: add products, generate PDF

### Formula (matches Excel row 2):
```
FCPO/MT = Reference[type] + product_delta
Est.Cost/MT = FCPO + Premium + Packaging
FOB/MT (live) = Est.Cost + Supplier fixed margin (fob_delta)
Oillio/MT = FOB × (1 + Margin%)
Oillio/Unit = Oillio/MT × net_wt / 1000
Profit/Unit = Oillio/Unit - Supplier/Unit
Total/FCL = Profit/Unit × Load_cartons
```

---

## [2026-05-19 Initial]

### Base system
- Able Perfect (For Reference Only): 636 ports, 104 SKUs, oil price manager, customer profiles
- Basic supplier tab structure
- GitHub Pages deployment at https://oillio-commodities.github.io/OILLIO-OPMS/

---

## Known Issues / Watch List

| # | Issue | Status |
|---|-------|--------|
| 1 | PDF on mobile: popup may be blocked | Workaround: allow popups |
| 2 | Able Perfect products not yet in comparison view | Pending |
| 3 | Price log uses device localStorage — not synced across devices | By design; export JSON to backup |
| 4 | KLK products don't have origin badges | Low priority |

## Access Credentials

| Password | Role | Access |
|----------|------|--------|
| `Joelishandsome1234` | User 0 | Full admin — edit all reference prices, save/log, view profit/cost |
| `Ysw1708kluang` | User 1 | View all + edit Oillio Margin % only |
| `Oilliouser1` | User 2 | Limited view (no ref prices, no profit/cost) + margin min 2.5% |

## Company Details
- **OILLIO COMMODITIES SDN BHD** (1527357-W)
- No 11A-1, Jalan Putra Mahkota 7/6C, Putra Heights, 47650 Subang Jaya, Selangor
- Tel: +603 5888 8339 | export@oillio.com.my | www.oillio.com.my

---

## [2026-05-21 v4] — Login Logo, Header, PDF fixes

### Fixed
- **Login page**: Now shows full Oillio logo (SVG embedded directly in HTML — no JS escaping)
  - Green circle + orange teardrop + white leaf + "Oillio / Commodities Sdn. Bhd. / (1527357-W)" in white
  - Dark navy background, "Price Management System" subtitle, green LOGIN button
  - Enter key support
- **Header layout**: Compact horizontal row (was vertical stacking)
  - Left: 44px Oillio icon + "Oillio Commodities" + subtitle in one row
  - Right: role badge + Logout button — no more vertical overflow or cut-off date
- **doLogout not defined error**: Moved `window.doLogout` definition BEFORE early return in auth IIFE
- **KLK/Apical switch bug**: Category chips were NOT cleared when switching suppliers
  - Apical's chips ("JERRY CANS", "SHORTENING" etc.) were showing while KLK products were loading
  - Fixed: chips are cleared in `setSupplier()` before `svRenderTable()` is called
- **PDF save**: `doPrint()` now renders PDF in-page overlay (avoids mobile popup blockers)
  - "Print / Save as PDF" button triggers `window.print()` → device print dialog → "Save as PDF"
  - Fixed mixed-quote syntax error in PDF return statement

### Lessons Learned (DO NOT REPEAT)
- **NEVER** use `h.replace('<body>', ...)` to inject HTML — it replaces ALL `<body>` occurrences including ones inside JS string templates
- **NEVER** use `window.USER_LEVEL||2` — 0 is falsy, so `0||2 = 2`. Always use `window.USER_LEVEL!=null?window.USER_LEVEL:2`
- **NEVER** put `window.doLogout` after an early `return;` in the auth IIFE
- **ALWAYS** clear category chips (`#svCatChips`) before `svRenderTable()` when supplier changes
- **ALWAYS** check if a hidden HTML element exists before trying to copy its `innerHTML`
- SVG logos: embed directly in HTML body (static) instead of setting via JS `innerHTML` to avoid escaping hell


## 2026-05-21 — KLK Category Tab Fix

### Bug Fixes
- **KLK category chips "select one, rest all selected"** — root cause: `innerHTML===''` guard in `svRenderTable()` prevented chip re-render after click (some browsers leave residual whitespace after clearing innerHTML). Fix: removed guard — chips always rebuild, correct active state always shown.
- **KLK chips cluttered on mobile** — `flex-wrap:wrap` caused all 8 category buttons to stack on multiple lines. Fix: `flex-wrap:nowrap; overflow-x:auto` with hidden scrollbar. Chips now scroll horizontally in a single clean row.
- **KLK chip flex-shrink** — chips no longer compress; `flex-shrink:0` added.
- **KLK category order** — consistent defined order: JERRY CAN → CARTON BOX → BIB → FLEXIBAG → POLYWOVEN BAG → BOTTLE → TIN → DRUM.

### Preserved (unchanged from prior sessions)
- PDF save & attachment (resolved previously)
- All supplier tabs functional (Apical, KLK, Wing Agro, For Reference Only, Compare All)
- FOB price editing + auto-calculation
- Admin vs user role visibility
- Price log / daily log
- Quote cart (max 50 items, FOB/CIF per item)
- Margin % editing
- Yellow reference price inputs (admin only)

## 2026-05-21 (Rev 2) — KLK Category Chips Fixed + Apical Restored

### Root Cause Found & Fixed
- **KLK category chips showed no categories** — KLK_DATA records had NO `cat` field. The chip renderer reads `p.cat` to build buttons; with no cat values, only the "All" button appeared. Fix: added `cat` to all 80 KLK_DATA records based on packing string: JERRY CAN / BOTTLE / TIN / BIB / CARTON BOX / DRUM / FLEXIBAG.
- **KLK chip active state not updating** — retained prior fix: removed the `innerHTML===''` guard in `svRenderTable()` so chips always rebuild with correct active state on every render.
- **Apical layout restored** — previous attempt incorrectly changed chip CSS (`flex-wrap:nowrap`) and chip padding/border, affecting Apical's chip row appearance. Reverted chips CSS fully back to original (`flex-wrap:wrap; gap:6px`). Apical product list, card layout, and category chips are unchanged from the working version.

### Preserved (unchanged)
- PDF save/attachment
- All supplier tabs (Apical, KLK, Wing Agro, For Reference Only, Compare All)
- FOB price editing + auto-calculation
- Admin vs user role distinction
- Price log / daily log  
- Quote cart (max 50 items, FOB/CIF per item)
- Margin % editing
- Yellow reference price inputs (admin only)

## 2026-05-21 (Rev 3) — KLK Sub-filter + PDF FOB/CIF T&C

### KLK Category Clutter Fix
- **Root cause**: KLK categories contain up to 21 products (JERRY CAN) and 16 products (FLEXIBAG) across multiple distinct oil types. Even with the category filter working, selecting FLEXIBAG still showed 16 mixed products (PFAD / Palm Oil 36-39 / CP10 / Palm Stearin × 4 packings each).
- **Fix**: Added a second-row name-level chip filter that appears below the category chips **only for KLK** when a category is selected AND contains 2+ distinct product names. Example: FLEXIBAG → shows PFAD | RBD PALM OIL 36-39 | RBD PALM OLEIN CP10 | RBD PALM STEARIN → clicking one shows only 4 packing variants for that oil.
- **Why Apical/WingAgro unaffected**: Apical has max 5 products per category; WingAgro max 2. Neither needs a sub-filter. The name chips only appear when `SV_SUP === 'klk'` and category has 2+ distinct names.
- Categories with single product name (JERRY CAN=CP10 only, BOTTLE=CP6 only, BIB=CP10 only): no sub-chips shown; scrollable list as-is.

### PDF T&C — FOB/CIF Terms
- **Replaced** the generic 7-clause T&C in PDF builder with the full specific terms from Able Perfect (`tcFob` / `tcCif`).
- PDF now shows: General clauses (5 items) + **FOB Terms** if any FOB items (payment 30%+70% 15 WD before loading, external docs 1-6) + **CIF Terms** if any CIF items (payment 30%+70% against copy BL, external docs 1-5, Special Clauses 6-9: GRI/PSS/PCS, shipper liner, BL to order, buyer responsibility).
- Terms appear only for modes present in the quote (FOB-only quote = FOB terms only; CIF-only = CIF terms only; mixed = both).

### Preserved (unchanged)
- All prior fixes (cat filter, chip rebuild, Apical/WingAgro layout)
- PDF save/attachment, quote cart, margin, role visibility, price log

## 2026-05-21 (Rev 6) — FOB/CIF T&C in All 3 Locations

### Changes
- **Quotation tab (on-screen)**: Added `qTcArea` div below the totals bar. `rQuote()` now renders a live T&C panel showing FOB Terms and/or CIF Terms based on which modes are present in the cart. Updates automatically as items are added/removed.
- **WhatsApp text (buildRpt)**: Fixed item-mode detection. Previous check used `priceMode` field (old Able Perfect only); new supplier items (Apical/KLK/WingAgro) use `mode` field. Now checks both — FOB terms appear for any FOB item, CIF terms for any CIF item with a port.
- **PDF summary (generatePdfHtml)**: Already correct from Rev 3 — confirmed working.

### T&C content (same across all 3 locations, sourced from `tcFob`/`tcCif`)
- **FOB**: Payment 30% deposit + 70% 15 working days before loading; External docs 1–6 (Health Cert, Phyto Cert, CoA, CoO, CTN/Inspection, buyer doc responsibility)
- **CIF**: Payment 30% deposit + 70% against copy BL; same external docs; Special Clauses 6–9 (GRI/PSS/PCS, shipper decides liner, BL to order, buyer responsibility)

### KLK calcKlkP (carried forward from Rev 5)
- `calcKlkP` missing function fix remains in place — quote works for all suppliers.

### Preserved
- All prior fixes intact (KLK chips, compact list, Apical/WingAgro layout unchanged)
