# ERP Pro v2.1 — Responsive Sidebar & Dark Mode maintenance release

## Corrections

1. Restored a **visible expand control** when the desktop sidebar is collapsed (previously the toggle disappeared and could trap the interface in compact mode).
2. Fixed **mobile submenu visibility** when the compact-sidebar preference was saved on desktop.
3. Added a **mobile drawer close button**, backdrop dismissal, Escape-key dismissal, correct ARIA expanded state, and off-canvas keyboard-focus prevention (`inert`). The drawer also resets correctly after breakpoint changes.
4. Improved desktop compact sidebar hover behavior and click targets.
5. Unified **dark mode across dashboard, tables, forms, modals, pagination, navigation, POS, sign-in/sign-up and error pages**; header theme buttons display sun/moon state, announce the action, and persist the selection in browser local storage.
6. Applied an initial dark color scheme before the page renders to reduce white flashing. Bootstrap dark theme is selected alongside custom design tokens. Chart colors are updated on toggle and initialized to match the selected scheme where ApexCharts is available.
7. Improved table and page container width constraints, narrow mobile layouts, POS panels, compact toolbar and breakpoint behavior.
8. Re-enabled visible fallback toast feedback if Toastr fails to load from a CDN (rather than only logging the message).

## Regression checks

Refer to `docs/TEST_REPORT.md` for the 32-page structural and offline Chromium smoke test report and limitations. This is still a static frontend demonstration, not a deployed ERP backend.
