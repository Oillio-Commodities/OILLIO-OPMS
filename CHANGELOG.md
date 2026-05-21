
## 2026-05-21 (Rev 8) — PDF Save Flow Swapped + Buttons Cleaned

### PDF Save Flow (swapped as requested)
- **Before**: Clicking "Save PDF" showed the `openPrintPreview()` modal first (Image 2), then user clicked "SAVE AS PDF" to get the clean PDF (Image 1).
- **After**: Clicking "Save PDF" now calls `doPrint()` directly → opens the clean `generatePdfHtml()` PDF in a new window immediately (Image 1 first). No intermediate modal step.
- **Auto-print removed**: The `generatePdfHtml()` output no longer auto-triggers `window.print()` on load. User sees the clean PDF preview first, then clicks "Save as PDF" button when ready.

### Buttons removed from PDF preview (as requested)
- **"Try Again" button**: Removed completely.
- **Bottom "SAVE AS PDF" button**: Removed (duplicate — top bar button remains).
- **Screenshot tip** (purple box): Removed.
- **Kept**: Top action bar with single "Save as PDF" button + keyboard shortcut hint. T&C (FOB/CIF terms) remain fully visible at bottom of PDF.

### Preserved
- All prior fixes intact: calcKlkP, KLK chips/sub-filter/compact list, Apical/WingAgro layout, WhatsApp T&C, PDF logo/header, quotation tab T&C.
