
## 2026-05-23 (Rev 28) — Auth Layout + PDF Logo + Total Cargo Column

### Auth/Login page
- Logo size: 62px (matches height of text block: "Oillio" ~42px + "Commodities..." ~14px + gap)
- Layout: `[logo 62px] | Oillio (2.6rem bold white)`
          `            | Commodities Sdn. Bhd. (1527357-W)` — ALL on ONE line
- CSS filter: `contrast(1.15) saturate(1.8)` — pushes muted mint edge colours → vivid green, reduces whitish appearance
- Removed drop-shadow (was creating halo artefacts)

### PDF header — reinstated logo + full company details
- Logo: absolute URL `https://oillio-commodities.github.io/OILLIO-OPMS/logo_nobg.svg`
  (relative URL failed in PDF popup window — this was why logo was missing)
- Company name: OILLIO COMMODITIES SDN BHD (bold, green)
- Tagline + address + tel + email + www reinstated

### PDF table — PROFIT/UNIT → TOTAL CARGO AMOUNT
- Removed: `Profit/Unit` admin-only column
- Added: `Total Cargo (USD)` column visible to all users
- Formula: `total_cargo = oillio_fob × load_ctns` (FOB) or `oillio_cif × load_ctns` (CIF)
- Displayed in bold dark green
