
---

## Rev 35 — Packaging Panel: Complete Per-Product Table (All 110 Products)

### Problem with Rev 34
- Grouped by packing TYPE only → multiple products with same packing were collapsed into one row
- Apical "20L Jerry Can" had 4 variants (Yellow/White × CP10/CP8) — only 1 shown
- Apical "20kg carton" had 17 products with widely different premiums — only 1 shown
- KLK missing many entries

### Fix
- Now shows EVERY product individually (one row per product)
- Grouped by CATEGORY for readability with category header labels
- Total products shown: Apical 26 | WingAgro 4 | KLK 80

### Apical (26 products) — packaging costs & premiums
| Product | Packing | Pkg Cost | Premium |
| 20L Yellow Jerry Can CP10 | 20L Jerry Can | 138 | 0 |
| 20L Yellow Jerry Can CP8 | 20L Jerry Can | 138 | +10 |
| 20L White Jerry Can CP10 | 20L Jerry Can | 148 | 0 |
| 20L White Jerry Can CP8 | 20L Jerry Can | 147 | +10 |
| 20kg Shortening 36/39 | 20kg carton | 82 | -5 |
| 20kg Shortening 38/40 | 20kg carton | 82 | -5 |
| 20kg Shortening 43/47 | 20kg carton | 82 | -7 |
| 20kg Shortening 46/48 | 20kg carton | 82 | -3 |
| 20kg Shortening 48/52 | 20kg carton | 82 | -14.5 |
| 20kg BIB Spread Fat | 20kg BIB | 100 | +115 |
| 20kg CBR 37/40 | 20kg carton | 82 | +500 |
| ... (all 26 products stored in APC_PKG_DEF)

### WingAgro (4 products)
| 20L/25L Jerry Can CP10 | 20L Jerry Can | 138 | -13 |
| 20L Jerry Can CP8 | 20L Jerry Can | 138 | -32.4 |
| 20kg HPKS | 20kg carton | 82 | -217 |
| 20kg HPKO | 20kg carton | 82 | -223 |

### KLK (80 products)
All 80 KLK products stored with individual pkg_cost and premium/fcpo_delta
Categories: BOTTLE, JERRY CAN, TIN, BIB, DRUM, CARTON, FLEXIBAG

### getLiveFob formula
Matches each product by exact (name + packing) to find its adjustable pkg_cost/premium
Storage keys: oillio_apc_pkg, oillio_wa_pkg, oillio_klk_pkg

---

## [2026-05-25] — Apical Price List Update (25 May 2026)

### Updated: APICAL_DATA (26 products, same product list)

**Reference Price Changes (Row 2 Yellow Cells):**
| Reference | Old (13 May) | New (25 May) |
|---|---|---|
| Malaysia CP10 | 1175 | **1170** |
| Indonesia CP10 | 1050 | 1050 (unchanged) |
| RBD Palm Kernel Olein | 2040 | **1955** |
| RBD Palm Kernel Oil | 2180 | **2110** |
| RBD Palm Kernel Stearin | 2350 | **2275** |
| Coconut Oil | 2080 | **2060** |
| RBD Stearin | 1135 | **1140** |
| Oillio Margin | 2.5% | **5.0%** |

**Product FOB Price Changes (sample):**
- 20L Yellow Jerry Can CP10 JKT: 1374.87 → **1367.71** USD/MT
- 20L White Jerry Can CP10 KL: 1385.34 → **1378.13** USD/MT
- 20kg Shortening 36/39 JKT: 1180.10 → **1173.96** USD/MT
- 20kg HPKS 33.5/35.5 KL: 2450+ → **2410.42** USD/MT

**Formula Fix:**
- Corrected: `Est.Cost = FCPO + Packaging` (NOT FCPO + Premium + Packaging)
- Excel formula confirmed: SUPPLIER ESTIMATED COST col = FCPO col + Packaging col
- Premium/Discount column represents adjustment applied TO FCPO from reference
  (i.e. FCPO = Reference + Premium, already embedded in FCPO value)

**JKT vs KL product mapping (unchanged):**
- JKT only: Yellow JC CP10/CP8, Shortening 43/47-48/52, BIB Spread Fat, RCNO, HCNO, RPKO BIB, RCNO Flexibag, HPS Flakes
- KL only: White JC CP10/CP8, CBR, HPKS, HPKO 35/37 & 38/40, HPKL, LOW GE Shortening (all 5), Apifil 7011 XC
- Both: Shortening 36/39 and 38/40 & 40/42


---

## [2026-05-25 v2] — Reference prices, cross-supplier sync, product display

### Fixed
- **WA_REF_DEF updated**: All commodity prices now match Apical May 25 values
  (malaysia_cp10=1170, pk_olein=1955, pk_oil=2110, pk_stearin=2275, coconut=2060, stearin=1140, oillio_margin=5.0%)
- **KLK_REF_DEF updated**: cp10=1170, oillio_margin=5.0%
- **Stale localStorage cleared**: Version key `20260525` clears saved old ref prices on load

### Added
- **Cross-supplier reference sync**: `svOnRefChange()` now updates APC_REF, WA_REF, AND KLK_REF simultaneously when any yellow cell is changed. Only need to update references once under Apical.
- **Margin % visible for all users**: Moved "OILLIO MARGIN %" input inside supplierView (after ref panel), visible to User 0, 1, and 2 whenever a supplier is selected
- **JKT/KL toggle inside supplier panel**: Now shows next to margin input when Apical is selected

### Improved
- **Product list columns** now show all Excel data:
  - Name + FOB Port badge (FOB Tj Priok / FOB Port Klang / FOB Surabaya)
  - Packing | Loading (ctns/FCL) | Net Weight (kg/unit)
  - Admin only: Est.Cost/MT | Supplier Price/SKU
  - All users: Oillio/MT | Oillio Price/SKU
  - Admin only: Profit/SKU

### Lessons Learned
- `id="suppMargin"` must NOT be inside `class="admin-only u2-hide"` div — User 2 can't edit it otherwise
- WA_REF_DEF and KLK_REF_DEF must be updated EVERY TIME Apical reference prices change
- The cache-bust version key must match the date of the price update


---

## [2026-06-05] — Supplier Margin, Report Columns, T&C Fix

### Fixed
- **safeFob/nw/lc undefined crash**: Variables were stripped from product list
  map callback but HTML generation still referenced them. Restored in correct
  order: `var nw`, `var lc`, `var safeFob` before `svCalc()` call.
  **RULE: Never remove variable declarations that are used later in the same function scope.**

### Added
1. **Supplier Margin tab for Apical** (matching KLK and WingAgro):
   - `supplier_margin: 0.96` added to APC_REF_DEF
   - `supplier_margin: 0.955` added to WA_REF_DEF
   - Label "Supplier Margin Factor" added to svRenderRefPanel LABELS
   - User 0: editable | User 1: view-only | User 2: not shown (inside admin panel)

2. **Report — Before and After Freight columns**:
   - NEW: `FOB Price/Unit (USD)` — price per carton before freight
   - NEW: `Total FOB Cargo (USD)` — total value of shipment before freight (bold)
   - NEW: `Total FOB+Freight Cargo (USD)` — total after freight added (bold)
   - Existing: FOB Price/MT, FOB+Freight/Ctn, FOB+Freight/MT
   - Column spans updated accordingly

3. **T&C renamed**: "CIF Terms" → **"FOB Terms (with Freight)"**
   - FOB-only mode: Shows FOB Terms only (unchanged)
   - Freight-added mode: Shows "FOB Terms (with Freight) & Conditions"
   - Column badge: "CIF" → "FOB+Freight"
   - Mode label: "CIF" → "FOB+Freight"
   - Internal data storage stays as mode:'CIF' (no breakage to existing items)

### Important notes
- `item.mode` in QITEMS is still stored as `'CIF'` internally
  (only the PDF display text is renamed to FOB+Freight)
- Changing supplier_margin in the panel does NOT currently alter product
  prices (fob_delta already encodes it). Display only for now.


---

## [2026-06-05 v2.2] — Pricing Fix, Profit Column, Freight Formula

### Critical Fixes

**Margin stuck at 5%**: Root cause was `fcpo` undefined in the product list item builder, causing `svRenderTable()` to silently crash on re-render. Now `fcpo` is computed from `APC_REF` before the item builder. **RULE: always check variable scope in map callbacks — any undefined variable silently kills the entire render.**

**APICAL_DATA**: Rebuilt from May 25 Excel. All pkg_cost values verified (Yellow JC CP10 = 143). Cache-bust key `RESET_05JUN2026` forces localStorage clear on next load.

### Pricing Formula (confirmed matches Excel)
- `est = fcpo + pkg_cost` (no premium — premium already embedded in FCPO delta)
- `fob = est + fob_delta`
- `Supplier/unit = fob × nw/1000`
- `Oillio/MT = fob × (1 + margin%)`
- `Oillio/unit = Oillio/MT × nw/1000`
- `Profit/unit = Oillio/unit - Supplier/unit`

### Freight Formula (all views consistent)
- `Freight/unit = freight_rate / load_ctn`
- `FOB+Freight/unit = Oillio/unit + Freight/unit`
- `FOB+Freight/MT = FOB+Freight/unit / net_wt × 1000`
- Example: (6200/1336) + 25.85 = **30.49/SKU**; 30.49/18×1000 = **1693.91/MT**

### svCalc return object
`{su, om, os, of (with freight unit), ofm (with freight MT), ps (profit), tp, fr}`

### Product List Columns
- 🔵 Blue: Supplier (Est/MT, FOB/MT, Supplier/SKU)
- 🟢 Green: Oillio (Oillio/MT, Oillio/SKU, Profit/SKU for User 0+1)
- 🟡 Amber: Freight row (shown when port/manual freight selected)


---

## [2026-06-06] — ROOT CAUSE FIX: Pricing Formula Correct

### The Actual Bug (after extensive investigation)
`getLiveFob()` looks up `pkg_cost` from `APC_PKG_DEF` **before** using APICAL_DATA.
`APC_PKG_DEF` had stale May 13 values (`pkg_cost=138`) while APICAL_DATA was
correctly updated to May 25 values (`pkg_cost=143`). Every calculation used the
wrong pkg_cost, giving wrong est/FOB/prices across all views.

### Root Cause Chain
```
getLiveFob() → getPkgArr() → APC_PKG_DEF → pkg_cost=138 (WRONG)
                                          ↑ should have been 143
Result: est=1308 (wrong), fob=1362.71 (wrong), Oillio/SKU=25.76 (wrong)
Correct: est=1313,         fob=1367.71,          Oillio/SKU=25.85 ✓
```

### Fix
- Updated `APC_PKG_DEF` with correct May 25 Excel values for all 26 products
- Version redirect now clears ALL `oillio_*` localStorage keys (incl. pkg arrays)
- Added `no-cache` meta headers + version-based URL redirect for fresh JS loading
- `APC_REF/WA_REF/KLK_REF` hardcoded to Excel defaults (no localStorage dependency)

### Verified Calculation (Yellow JC CP10)
- `est = 1170 + 0 + 143 = 1313`
- `fob = 1313 + 54.71 = 1367.71`
- `Supplier/SKU = 24.61875` ✓
- `Oillio/MT = 1,436.094` ✓
- `Oillio/SKU = 25.85` ✓

### Rules Added
- **NEVER update APICAL_DATA without also updating APC_PKG_DEF** — both must
  reflect the same Excel source simultaneously
- When clearing stale data, clear ALL `oillio_*` localStorage keys, not just refs


---

## [2026-06-06 v2] — Full Cross-Check: All Suppliers Verified

### Verification Result
Complete cross-check of APC_PKG_DEF / WA_PKG_DEF / KLK_PKG_DEF vs source data:

**Apical — 26/26 products ✓**
All pkg_cost and premium values match May 25 Excel exactly.
(Yellow JC CP10=143, White JC CP10=153, Shortening=82, BIB=100, etc.)

**WingAgro — 4/4 products ✓**
All pkg_cost values match WA_DATA. (Jerry Cans=138, Cartons=82)

**KLK — 80/80 products ✓**
All pkg_cost values match KLK_DATA. Zero mismatches.

### Note
The previous fix (APC_PKG_DEF update) corrected ALL 26 Apical products
simultaneously — not just Yellow JC CP10. Yellow JC CP10 was only called
out as the example used to detect the bug.

