# ERP Pro v3.0.1 Verification Report

Run date: 2026-10-22  
Scope: Apache-2.0 license, shared footer, responsive light/dark themes, optional donation link, app regression.

## Results

| Check | Outcome |
|---|---|
| License presence and NOTICE attribution | Pass |
| Copyright footer/valid footer link and markup across all pages | 32 / 32 pass |
| Footers across 2 themes × 4 viewports × 32 pages | 256 checks, 0 errors |
| Viewports for footer audit | 320, 390, 768, 1440 px |
| Footer text/background contrast | All tested computed text/background combinations >= 4.5:1 |
| Donation link empty or invalid | Hidden by default; unsafe protocol rejected |
| Donation configured to verified HTTPS URL (test value) | Footer link displayed correctly |
| Base app responsive smoke scans | 32 pages × 6 sizes, 0 errors |
| Base app interactions | 11 checks passed (sidebar, theme, settings, CRUD, search/export, bulk and POS) |
| JavaScript syntax | `script.js`, `seed.js`, `project-config.js` pass Node syntax check |
| CSS stylesheet parsing | No top-level parse errors |
| ZIP integrity | Verified at packaging |

## Limitations

Offline Chromium tests used an available local Bootstrap substitute and omitted third-party CDN functionality. We did not validate live remote charting/tables/icon dependencies, real backend authentication, real payment settlement, or transaction-safe multiuser inventory. The screenshots created during browser tests do not include remote icon fonts and images, and are intended primarily for footer layout verification. Original v3.0 visual previews remain unchanged.

## Reproduce

```bash
python tests/validate_project.py
python tests/test_footer_release.py
python tests/footer_browser_test.py
python tests/browser_test.py
node --check assets/js/script.js
node --check assets/js/project-config.js
```

Test output: `tests/footer_browser_results.json`, `tests/browser_results.json`.
