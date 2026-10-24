# ERP Pro — CI/CD starter kit

Author: Abu Salah Musha Lemon

This ZIP is a **non-destructive add-on**, not a replacement for the ERP Pro application. Copy its contents into the root of the existing `ERP-Pro-Admin-Panel` repository while keeping existing source files, LICENSE, NOTICE and README.

Included:

- `.github/workflows/quality.yml` — static tests + offline browser smoke on pushes/PRs; also reusable by release workflow.
- `.github/workflows/publish-container.yml` — run quality checks then publish image when a GitHub Release is published.
- `tests/ci_browser_smoke.py` — portable browser UI smoke test using Playwright.
- `Dockerfile` and `.dockerignore` — non-root Nginx static frontend image.
- `docs/DEPLOYMENT.md` and `docs/RELEASE_PROCESS.md` — deployment instructions and versioned release policy.

Local test commands:

```bash
python tests/validate_project.py
python tests/test_footer_release.py
python -m pip install playwright==1.56.0
python -m playwright install chromium
npm install --no-save --package-lock=false bootstrap@5.3.2
ERP_CI_OFFLINE=1 python tests/ci_browser_smoke.py
```

Windows PowerShell syntax for last command:

```powershell
$env:ERP_CI_OFFLINE="1"; python tests/ci_browser_smoke.py
```

Check the workflows under GitHub Actions after pushing. A newly created workflow and release do not imply that tests or publishing succeeded until Actions shows green results.

Docker build requires a separate installed Docker Engine; it cannot be verified by static checks alone.

Deployment-history starter files live in `docs/deployments/`. Complete a new record for each published version and store the immutable image digest and commit SHA there.
