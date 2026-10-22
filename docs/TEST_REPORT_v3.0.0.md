# ERP Pro Admin — v3.0.0 Verification

**Scope:** The v2.0.0 ZIP was used as the source; all 32 standalone HTML pages were retained.

## Passed automated checks

- Structural source validation: **32/32** pages pass HTML structure, references, assets, duplicate-ID and input-label tests (`python tests/validate_project.py`).
- JavaScript syntax: `node --check` passes `assets/js/script.js` and `assets/js/seed.js`.
- CSS syntax: `tinycss2` reports **0 CSS parse errors**.
- Offline browser smoke suite: **32 pages × 6 widths (320, 375, 414, 768, 1024, 1440) = 192 checks**. No full-page horizontal overflow or unhandled application JavaScript exceptions. Existing 11 tested interaction categories pass.
- Theme coverage: **32 pages × 2 modes × 5 widths (320, 390, 768, 1024, 1440) = 320 states**. Persistent theme and Bootstrap theme attributes were consistent and no full-page overflow was detected.
- Theme/contrast integration: **11 additional checks**, covering dark/light surface and border tokens on Dashboard, Inventory, Settings and POS; accessible computed text contrast (4.5:1 or higher in sampled UI), dark CRUD modal, dark notification dropdown, and theme persistence on navigation. No sampled contrast failures.

Commands:

```bash
python tests/validate_project.py
node --check assets/js/script.js
node --check assets/js/seed.js
python tests/browser_test.py
python tests/theme_audit.py
python tests/dark_mode_interactions.py
```

Reports: `tests/browser_results.json`, `tests/theme_results.json`, `tests/dark_mode_results.json`.

## Environment and limitations

The browser tests load the project's CSS/JS into Chromium with locally available Bootstrap CSS/JS, because navigation to local file/http pages is blocked by the testing environment and outbound CDN calls cannot be verified. These tests cover the application logic and rendered theme styles, **not** the real CDN responses for Bootstrap 5.3.2, DataTables/Buttons, Select2, Flatpickr, Toastr, SweetAlert2, ApexCharts or icon fonts. Browser tests of those integrations with unrestricted internet access are still necessary before deployment.

The app remains a localStorage **frontend demonstration**. It does not implement secure server-side authentication/authorization, durable multi-user storage, live payment processing or an ERP API. The testing claims should not be interpreted as proof of full production readiness or of every third-party feature.
