# Application Test Report — ERP Pro v3.1.0

**Author:** Abu Salah Musha Lemon  
**Environment:** Local source reconstructed from the previous v3.0.1 project plus CI/CD starter, Chromium  
**Date:** 24 October 2026  
**Limitation:** Remote GitHub HEAD was unavailable to the local test environment. Do not interpret these results as direct verification of the current deployed repository.

## Summary

| Test group | Outcome | Evidence |
|---|---:|---|
| HTML structure, assets, internal routes | 32/32 pass | `tests/validate_project.py` |
| Footer, license, legal attribution | 32/32 pass | `tests/test_footer_release.py` |
| Page-responsive viewport checks | 192/192 pass | `tests/browser_test.py` (32 × 6 widths) |
| Existing UI interaction categories | 11/11 pass | `tests/browser_test.py` |
| Additional application scenarios | 9/9 pass | `tests/application_e2e.py` |
| HTML / JS runtime errors in tested views | None reported | Chromium offline-mode test output |

## Application scenarios included

1. Inventory edit persists across page re-render.
2. Negative product stock is rejected.
3. Inventory search resets and selected CSV export works.
4. Dark mode persists; desktop and mobile sidebar controls work.
5. POS rejects checkout with insufficient cash.
6. POS card checkout creates a sale, decrements stock, clears the cart and shows a demo receipt.
7. POS held cart can be resumed.
8. POS prevents adding out-of-stock products.
9. Signup rejects mismatched passwords.

## Manual container smoke validation — user supplied

For the published `ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0` image, the user supplied terminal output confirming successful pull, Nginx port `8080`, and `curl.exe -I http://localhost:8000/` returning `HTTP/1.1 200 OK` after mapping `-p 8000:8080`. This verifies HTTP serving only—not all browser interactions in the deployed container.

## Not verified

- New GitHub Actions run for these additional tests (run after pushing).
- Live remote source changes after the earlier project baseline.
- External CDN features and real infrastructure dependencies.
- Backend, multi-user, payment or data-security correctness (none are part of the frontend demo).

## Interpretation

**PASS for the documented offline frontend smoke and application-level demo scenarios.** The project remains a **frontend demonstration**. Treat production deployment and server-side business correctness as out of scope until separately implemented and tested.
