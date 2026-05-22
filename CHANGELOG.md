# OILLIO OPMS — Full Changelog & Protected Configuration
# ============================================================
# READ THIS BEFORE MAKING ANY CHANGES
# This file documents EVERY intentional change made to index.html
# and the SVG logo files. Do NOT revert or overwrite these without
# explicit instruction from the user.
# ============================================================

## ⚠️  CRITICAL PROTECTED SETTINGS — DO NOT CHANGE

### Passwords (DO NOT MODIFY)
- Level 0: Joelishandsome1234
- Level 1: Ysw1708kluang
- Level 2: Oilliouser1

### Supplier Confidentiality (DO NOT EXPOSE)
- Supplier names (Apical / KLK / WingAgro) must NEVER appear in:
  - PDF quotation output
  - WhatsApp text (buildRpt function)
  - Any customer-facing output
- The `Supplier(s):` row was deliberately removed from PDF meta-grid

### Reference Number Format (DO NOT CHANGE)
- Format: `Oillio-YYYYMMDD-NN` (e.g. Oillio-20260523-02)
- Daily sequence starting at 01, stored in localStorage
- Previously was QT-YYYY-NNNNN — intentionally changed

### PDF Filename Format (DO NOT CHANGE)
- Format: `Oillio_Commodities-{customerName}_{YYYY}_{MM}_{DD}`

### Logo Files (DO NOT REPLACE WITH VTRACER SVG)
- `logo_emblem_nobg.svg` — hand-coded clean SVG (2KB, 5 elements)
  - MUST NOT be replaced with any VTracer/auto-traced version
  - See Rev 31 notes for why
- `logo_nobg.svg` — full logo (emblem + wordmark), white bg removed
- `logo.svg` — original uploaded SVG (kept for reference)
- `logo_emblem.svg` — emblem with viewBox crop (backup)

---

## Rev 1-5 — KLK Data & Supplier Fixes

### KLK Category Chips
- Root cause: KLK_DATA had no `cat` field → chips only showed "All"
- Fixed: injected `cat` for all 80 KLK products (JERRY CAN/BOTTLE/TIN/BIB/CARTON BOX/DRUM/FLEXIBAG)
- Chip rebuild: removed `innerHTML===''` guard so chips always rebuild active state
- Name sub-filter (`svNameChips`): second-row chips for KLK when category has 2+ distinct names
- Compact list: when all filtered products share the same name, show name once as header

### calcKlkP — CRITICAL BUG FIX (Rev 5)
- `function calcKlkP(sku,oilOvr,addOvr,mgnOvr,modeOvr,portOvr)` was called 10× but never defined
- This caused ALL quote calculations to crash for KLK supplier
- Fix: added `calcKlkP` delegating to `calcP` after `calcP` definition
- DO NOT REMOVE THIS FUNCTION

---

## Rev 6-11 — PDF, T&C, Reference, Filename

### T&C (Terms & Conditions)
- Present in 3 locations: quotation tab, WhatsApp text, PDF
- Uses `tcFob(sd)` / `tcCif(sd)` from Able Perfect supplier data
- FOB/CIF detection: case-insensitive `.toUpperCase()==='FOB'`
- REMOVED from T&C: "Validity: 3 working days" and "Prices exclude applicable taxes & duties"
- REMOVED: Ctrl+P hint from PDF action bar

### PDF Save Flow
- "Save PDF" button calls `doPrint()` directly
- Auto-print (`window.onload=window.print()`) removed — user sees preview first
- Removed: "Try Again" button, bottom duplicate "Save as PDF", screenshot tip

### Supplier Hidden from All Outputs
- `Supplier(s):` row removed from PDF meta-grid
- `*Supplier: Apical/KLK/WingAgro*` removed from WhatsApp (`buildRpt`) and PDF

### Reference Format Changed
- Old: QT-YYYY-NNNNN
- New: Oillio-YYYYMMDD-NN (daily sequence via localStorage, begins at 01)

### PDF Filename
- `Oillio_Commodities-{customer}_{YYYY}_{MM}_{DD}`

---

## Rev 12-19 — Logo Iteration History (SVG-in-JS approach — ABANDONED)

### Why these revisions are not in use
- Rev 12-21: Attempted to embed SVG code directly as JavaScript string literals
- Root cause of failure: Large SVG strings (especially 480×480px watermark) embedded in JS
  caused HTML parser to break out of `<script>` tag, rendering all JS as raw text on page
- Result: 19+ SVGs scattered across page, raw JS visible as text — page completely broken
- Lesson: NEVER embed raw SVG markup in JavaScript string variables

---

## Rev 22 — Emergency Recovery

### Restored from Rev 11 baseline
- Pulled Rev 11 (last known good state) as the recovery point
- Re-applied all non-logo fixes (supplier hidden, ref format, filename, T&C, calcKlkP) ✓
- Logo embedded as base64 data URL (safe in JS strings)

---

## Rev 23 — Official SVG Logo File Uploaded

### Files added to repository
- `logo.svg` — official Oillio logo SVG uploaded by user (1326×614, 571 paths)
- `logo_emblem.svg` — emblem-only crop (viewBox 0 0 620 614)
- Both committed and served via GitHub Pages

### Logo locations (4 total)
1. Auth/login page — full logo with wordmark
2. Main app header — emblem icon (40×40px)
3. PDF header — full logo
4. PDF watermark — faded emblem backdrop

---

## Rev 24 — Transparent Logo Background

### White background removed
- Original SVG had `fill="#FEFEFE"` rectangle as first path — appeared as white box on dark bg
- Removed from all 4 SVG files
- Created `logo_nobg.svg` and `logo_emblem_nobg.svg`

---

## Rev 25 — Auth Page: Emblem + White Wordmark

### Problem: dark green SVG text invisible on dark navy background
- `logo_nobg.svg` has dark green text — works on white bg, invisible on #071c2e auth bg
- Fix: show `logo_emblem_nobg.svg` + white HTML wordmark for auth/login page
- PDF continues to use `logo_nobg.svg` (white background — dark text looks correct)

---

## Rev 26 — SVG Intrinsic Dimensions Fixed + Auth Alignment

### Bug: SVG files had hard-coded width/height overriding CSS
- SVG tags had `width="620" height="614"` — mobile browsers used intrinsic size, ignored CSS
- Logo rendered at 620px instead of 72px — caused large "hook" shape visible on screen
- Fix: removed `width` and `height` attributes from all 4 SVG files

### Auth page text alignment
- Three text lines use `align-items:flex-start` so O/C/( all start at same left edge

---

## Rev 27 — Remove VTracer Artefact Line

### Gray-green horizontal line at top of logo — root cause fixed
- VTracer left a 4px-tall, full-width horizontal bar at y=0 (fill=#7D9485)
- Rendered as a visible gray-green line at the top of the logo on dark backgrounds
- Removed from all 4 SVG files

---

## Rev 28 — Auth Layout + PDF Logo URL + Total Cargo Column

### Auth/Login page
- Logo: 62px emblem
- Three text rows:
  - "Oillio" — font-weight:900, 2.6rem, white
  - "Commodities Sdn. Bhd." — font-weight:700, 1rem, 85% white
  - "(1527357-W)" — font-weight:400, 0.82rem, 55% white

### PDF logo — absolute URL fixes missing logo
- Relative URL `logo_nobg.svg` failed in PDF popup window (no base URL context)
- Fix: use `https://oillio-commodities.github.io/OILLIO-OPMS/logo_nobg.svg`
- Company name, tagline, address, tel, email, www reinstated in PDF header

### PDF Table — PROFIT/UNIT removed, TOTAL CARGO AMOUNT added
- REMOVED: `Profit/Unit` column (was admin-only, now removed entirely)
- ADDED: `Total Cargo (USD)` column
- Formula: `total_cargo = oillio_fob × load_ctns` (FOB) or `oillio_cif × load_ctns` (CIF)
- Displayed in bold dark green

---

## Rev 29 — Cache-Busting

- Added `?v=28` (then `?v=29`) to all SVG src refs to force browser reload
- Added `Cache-Control: no-cache` meta tags to HTML head

---

## Rev 30 — Emblem SVG Cleaned (Partial Fix)

### Attempted to fix stray circle via path filtering
- Removed 59 paths at translate x>=560 (text-adjacent paths)
- Removed 5 near-white paths (lum>0.82)
- Added clipPath circle as hard boundary
- Result: partial improvement but stray circle still visible (VTracer paths too intermingled)

### Auth page text layout — per reference Image 4
- Row 1: "Oillio" — 3rem, font-weight:900 (THICK/BOLD), white
- Row 2: "Commodities Sdn. Bhd." — 1rem, font-weight:700 (slightly bold), 85% white
- Row 3: "(1527357-W)" — 0.82rem, font-weight:400 (THIN), 55% white
- Logo: 95px

---

## Rev 31 — DEFINITIVE: Replace VTracer with Hand-Coded Clean SVG ✅

### logo_emblem_nobg.svg — REPLACED ENTIRELY
- Old: 250KB VTracer trace (354 paths) — leaked stray "O" circle + "Comm 1527357" text, whitish edges
- New: 2KB hand-coded clean SVG (5 elements) — zero artefacts, perfectly clean

### Clean SVG structure (DO NOT REPLACE WITH AUTO-TRACED VERSION)
```xml
Ring mask (evenodd): outer circle r=47 centre (50,50)
                     MINUS tilted almond top-LEFT(46,20)→bottom-RIGHT(54,80)
Green (left half):   radialGradient cx24,cy18 — #a8e040→#6ecb20→#28a030→#043010
Orange (right half): radialGradient cx74,cy16 — #ffe840→#ffcc00→#ffb000→#f07800→#c03400
3D depth:            green top-cap (M50,3 A47,47 0 0 0 14,24 L23,37 A31,31 0 0 1 50,22 Z)
                     orange bottom-cap (M50,97 A47,47 0 0 1 86,76 L77,63 A31,31 0 0 0 50,78 Z)
```

### PDF header — ring logo + Oillio brand text
- `_oillioLogo`: 72px ring emblem + "Oillio"(900) + "Commodities Sdn. Bhd."(700) + "(1527357-W)"(400)
- `_wordmark`: address/tel/email/www right-aligned
- Uses absolute URL: `https://oillio-commodities.github.io/OILLIO-OPMS/logo_emblem_nobg.svg?v=30`

---

## Current State Summary (as of Rev 31)

### Repository files
- `index.html` — main app (all fixes applied)
- `logo.svg` — original full logo SVG (reference only)
- `logo_nobg.svg` — full logo, no white background (used in PDF on white bg)
- `logo_emblem_nobg.svg` — CLEAN HAND-CODED ring SVG (used in auth, header, PDF emblem)
- `logo_emblem.svg` — emblem crop with viewBox (backup)

### 4 logo locations in index.html
1. **Auth/login** (`#authOverlay`): `logo_emblem_nobg.svg` 95px + 3-line white HTML wordmark
2. **Main header** (`<!-- Oillio Logo Icon -->`): `logo_emblem_nobg.svg` 46×46px
3. **PDF header** (`_oillioLogo`): 72px emblem + brand text via absolute URL
4. **PDF watermark** (`_watermark`): `logo_emblem_nobg.svg` 480px @4% opacity

### Key functional features (all working)
- KLK category chips + name sub-filter ✓
- calcKlkP function (critical — do not remove) ✓
- Supplier names hidden from all outputs ✓
- Reference: Oillio-YYYYMMDD-NN ✓
- PDF filename: Oillio_Commodities-customer_YYYY_MM_DD ✓
- T&C in PDF + WhatsApp (FOB/CIF auto-detected) ✓
- Total Cargo (USD) column in PDF table ✓
- No Profit/Unit column ✓
- PDF logo loads via absolute URL ✓
