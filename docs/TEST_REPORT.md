# ERP Pro Admin — v2.0.0 verification report

## Scope and environment

This is a **frontend demonstration**. The test environment cannot make outbound CDN requests or navigate local HTTP/file pages from its test browser. Accordingly, the Chromium test runner injects the project CSS and JS inline and uses a locally available Bootstrap 5.3.6 bundle for interaction testing. The delivered application still references the exact CDN versions prescribed in `docs/master-erp-prompt-v2.md` (including Bootstrap 5.3.2). It was **not possible to verify external CDN loading, third-party DataTables/Buttons, Toastr, ApexCharts or barcode CDN integration end-to-end** in this restricted environment. The application's native fallback paths were exercised.

## Results

- **32 of 32 HTML pages:** parsed and loaded in offline Chromium with no unhandled JavaScript exceptions.
- **192 responsive screen checks:** 32 pages × viewport widths 320, 375, 414, 768, 1024, 1440 px. No full-document horizontal overflow detected.
- **11 interaction categories verified:** desktop sidebar collapse/expand + accessibility attributes; light/dark switching; mobile drawer and submenu under saved compact sidebar; Escape dismissal; Settings preferences; inventory edit modal; fallback table search; selected CSV export; confirmed bulk delete; POS product/cart/payment simulation; standalone-page theme controls.
- **Structural validator:** checks HTML structure, relative links, referenced assets, duplicate IDs, input labels, table captions and JavaScript syntax. Passed.
- **Node.js syntax check:** `node --check assets/js/script.js` passed.

The machine-readable results are in `tests/browser_results.json`.

## Reproduce the checks

Static checks require Python and Node.js:

```bash
python tests/validate_project.py
node --check assets/js/script.js
node --check assets/js/seed.js
```

Chromium smoke checks additionally require Python packages `playwright`, `beautifulsoup4`, an installed Chromium browser, and locally available Bootstrap CSS/bundle files. The runner defaults to the local environment's Bootstrap paths; override them on other computers, for example:

```bash
ERP_TEST_BOOTSTRAP_CSS=/path/to/bootstrap.min.css ERP_TEST_BOOTSTRAP_JS=/path/to/bootstrap.bundle.min.js python tests/browser_test.py
```

On Windows PowerShell, set `$env:ERP_TEST_BOOTSTRAP_CSS` and `$env:ERP_TEST_BOOTSTRAP_JS` before running the test. Optionally set `ERP_TEST_CHROME` to an existing Chromium/Chrome executable. The runner intentionally tests offline fallback functionality; it does not substitute for a browser integration test with live network access.

## Known demo limitations

There is no production authentication, live server API, accounting backend or real payment processor. Application data lives in local browser storage; do not store sensitive business information. Browser storage can be cleared by the user, and data is not synchronized between devices. Production integration and security review are required before real-world deployment. API and CDN integration testing remains recommended in a regular browser with network access.
