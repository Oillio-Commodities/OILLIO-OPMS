
---

## Rev 34 — Packaging Cost & Premium in Yellow Reference Panel

### What was added
Under the Yellow Reference panel (🟡), a new section "📦 Packaging Costs & Premiums/Discounts" now appears for all 3 suppliers.

### Access control (CRITICAL — do not change)
- **User 0** (Joelishandsome1234): CAN EDIT pkg cost and premium/discount
- **User 1** (Ysw1708kluang): CAN VIEW only (read-only, greyed inputs)
- **User 2** (Oilliouser1): COMPLETELY HIDDEN (u2-hide class)

### New variables
- `APC_PKG_DEF` / `APC_PKG` — Apical packaging defaults (5 types)
- `WA_PKG_DEF` / `WA_PKG` — WingAgro packaging defaults (2 types)
- `KLK_PKG_DEF` / `KLK_PKG` — KLK packaging defaults (57 types)
- Storage keys: `oillio_apc_pkg`, `oillio_wa_pkg`, `oillio_klk_pkg`

### Apical packaging types & defaults
- 20L Jerry Can: pkg_cost=138, premium=0
- 20kg carton: pkg_cost=82, premium=-5
- 20kg BIB: pkg_cost=100, premium=-10
- Flexibag: pkg_cost=52, premium=-120
- 25kg polywoven bag: pkg_cost=10, premium=-15

### WingAgro packaging types & defaults
- 20L Jerry Can: pkg_cost=138, premium=-13
- 20kg carton: pkg_cost=82, premium=-37

### KLK: 57 packaging types
All KLK packaging types stored with their pkg_cost and fcpo_delta as premium
(See KLK_PKG_DEF in code for full list)

### getLiveFob() formula (CRITICAL — do not revert)
```
FOB = oil_reference + fcpo_delta + premium + pkg_cost + fob_delta
```
Where:
- oil_reference = from APC_REF/WA_REF/KLK_REF (adjustable via yellow panel top section)
- premium = from PKG_REF[packing].premium (adjustable via yellow panel bottom section)
- pkg_cost = from PKG_REF[packing].pkg_cost (adjustable via yellow panel bottom section)
- fob_delta = fixed per-product delta (hardcoded from Excel data, not adjustable)

### Save & Log
- "Save & Log Reference" now also saves packaging costs/premiums to localStorage
- pkg data included in ref_log entries as `pkg` field
- CSV export includes "Packaging Costs & Premiums" column

### CSV log format (Ref Price Log)
Date | Time | Supplier | User | Malaysia CP10 | ... | Oillio Margin | Packaging Costs & Premiums
