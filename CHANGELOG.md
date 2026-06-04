
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

