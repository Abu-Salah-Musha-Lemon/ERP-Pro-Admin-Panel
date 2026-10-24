# ERP Pro — Application-level Testing Guide

**Project:** [ERP Pro Admin Panel](https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel)  
**Owner:** Abu Salah Musha Lemon  
**Target release:** v3.1.0  
**Scope:** Static frontend and client-side demo operations.

## What is tested

The automated test suite exercises 32 HTML page layouts and the following demo flows:

- Sidebar collapse/expand and mobile drawer keyboard behavior.
- Persistent light/dark preference when moving between pages.
- Inventory table search and selected-record CSV export.
- Inventory edit persistence through browser `localStorage` and rejection of negative stock.
- POS insufficient-cash rejection; sale completion adds one demo invoice and reduces product stock.
- POS held orders, resumed orders, and out-of-stock products.
- Sign-up password confirmation validation.
- Footer copyright and donation-hidden-by-default checks.

The test data uses local demo fixtures; successful tests do **not** certify production readiness.

## Run locally

Requires Python 3.10+, Node.js, a Playwright Chromium browser, and internet access for **one-time installation** of development/test dependencies.

From the repository root:

```bash
python -m pip install playwright==1.56.0 beautifulsoup4==4.12.3
python -m playwright install chromium
npm install --no-save --package-lock=false bootstrap@5.3.2
python tests/validate_project.py
python tests/test_footer_release.py
python tests/application_e2e.py
```

If `chromium` is installed on Linux and Playwright's bundled Chromium is unavailable, set `ERP_TEST_CHROME=/usr/bin/chromium`. For Windows PowerShell, the bundled Playwright Chromium is recommended; `py` can replace `python`.

For the full responsive regression, run `python tests/browser_test.py` (with the same dependencies). It checks 32 pages at 320, 375, 414, 768, 1024 and 1440 pixels.

## Run through GitHub Actions

The `.github/workflows/quality.yml` workflow runs three jobs: `Static validation`, `Browser smoke tests`, and `Application-level E2E (offline demo)`. They run on PRs targeting `main`, pushes to `main`, manual workflow dispatch, and calls by the GHCR release workflow. A failed job should block publication through the `needs: quality` release gate.

After an Actions run, open the job summary and download its `application-e2e-results` artifact, containing `tests/application_e2e_results.json`.

## Manual Docker release acceptance test

The user-verified v3.1.0 package exposes **container port 8080**, not 8000. On a machine with Docker Desktop:

```powershell
docker pull ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
docker run -d --name erp-pro -p 8000:8080 ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
curl.exe -I http://localhost:8000/
docker ps
docker logs --tail 30 erp-pro
```

Expect `HTTP/1.1 200 OK`, then open `http://localhost:8000` to manually check sidebar, dark mode, inventory and POS. The user previously supplied a successful `200 OK` response with Nginx 1.30.6 on this mapping; UI behavior in that deployed container must still be accepted separately.

**Teardown:** `docker stop erp-pro` followed by `docker rm erp-pro`.

## Explicitly not covered

- CDN-based DataTables, ApexCharts, Toastr, Select2 and JavaScript barcode behavior in a connected browser.
- Real authentication, server-side authorization, business transaction integrity, payments or databases.
- Container vulnerability scanning and a fresh Docker build in this offline environment.
- Cross-browser device testing (automated tests currently use Chromium only).
- Actual remote `main` branch state where network or GitHub connector access is unavailable.

## Before each GitHub release

1. Run all quality jobs on the final commit.
2. Inspect `Files changed` and check PR conflicts.
3. Publish a new version tag from `main` only after CI succeeds.
4. Confirm the GHCR publish workflow completes and the exact tag exists.
5. Pull the version tag on an independent Docker host; check HTTP 200 and primary demo scenarios.
6. Record release tag, commit SHA and optional image digest in `docs/deployments/`.

For deployment/rollback instructions, see [DEPLOYMENT.md](DEPLOYMENT.md) and [RELEASE_PROCESS.md](RELEASE_PROCESS.md).
