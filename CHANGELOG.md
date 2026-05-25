
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
