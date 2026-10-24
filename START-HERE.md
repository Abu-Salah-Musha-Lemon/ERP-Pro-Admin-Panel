# ERP Pro v3.1.0 — Application Testing & Documentation Update

**Author:** Abu Salah Musha Lemon  
**License:** Apache-2.0  
**GitHub:** https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel

## What this package contains

- Professional `README.md` updated for **v3.1.0** and the public GHCR Docker image.
- Updated GitHub Actions quality workflow with nine additional Playwright demo scenarios.
- Application testing instructions, report and versioned deployment evidence.
- Existing 32-page frontend project and screenshots, reproduced from the locally available baseline.

## Important source note

The current remote `main` branch was **not** fetched during this update (GitHub network access was unavailable). The full-project ZIP is a convenience snapshot using the earlier v3.0.1 frontend files plus CI/CD integration and this testing/documentation update. Do **not** blindly overwrite newer GitHub files with the full ZIP.

**Use the documentation/testing patch ZIP** to apply changes to your current cloned repository and review the diff first.

## Safe update steps

```bash
git clone https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel.git
cd ERP-Pro-Admin-Panel
git switch -c docs/application-testing-v3.1
# Extract the provided patch ZIP here, preserving folders.
git diff --stat
```

Then install the test dependencies and run:

```bash
python -m pip install playwright==1.56.0 beautifulsoup4==4.12.3
python -m playwright install chromium
npm install --no-save --package-lock=false bootstrap@5.3.2
python tests/validate_project.py
python tests/test_footer_release.py
python tests/application_e2e.py
```

After verifying local and GitHub Actions results, open a pull request against `main`. **Do not recreate or retag the existing `v3.1.0` release.** Documentation updates can merge without publishing a new release; a new binary release is only needed when appropriate.

## Verified tests (local baseline, Chromium offline mode)

- 32/32 HTML pages passed structural validation.
- 192/192 viewport measurements passed (32 × 6 screen widths).
- 11/11 original interactive regression checks passed.
- 9/9 additional application-level scenarios passed.
- Footer/legal checks passed across all 32 pages.

The project owner additionally supplied `curl.exe` output confirming **HTTP 200** from published `v3.1.0` with Docker mapping `-p 8000:8080`. That verifies HTTP serving—not every UI feature or production security.

See `docs/APPLICATION_TESTING.md` and `docs/APPLICATION_TEST_REPORT_v3.1.0.md` for exact coverage and limitations.
