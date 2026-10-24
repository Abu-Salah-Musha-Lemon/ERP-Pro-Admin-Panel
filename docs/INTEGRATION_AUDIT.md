# ERP Pro — CI/CD Integration Audit

**Source baseline:** v3.0.1 Professional README ZIP retained from previous project work.
**Owner:** Abu Salah Musha Lemon
**Important:** The public GitHub repository could not be fetched at the time of this package preparation due to network restrictions. The contents of the current GitHub `main` branch could not be compared, so this package must not be treated as a verified mirror of the latest remote commit.

## Changes included

- Complete 32-page v3.0.1 frontend demo, documentation, assets, source and tests
- `.github/workflows/quality.yml` and `.github/workflows/publish-container.yml`
- Non-root Nginx `Dockerfile` (uses current upstream `nginx/nginx-unprivileged:1.30.6-alpine` image) and `.dockerignore`
- `tests/ci_browser_smoke.py` (corrected body theme assertion)
- Deployment and release documentation and version-specific template
- Simplified public README Support section (star, share, contribute only)

## Verification performed in working environment

- `python tests/validate_project.py` — PASS (32 HTML pages; structural, link, asset, syntax checks).
- `python tests/test_footer_release.py` — PASS (32 pages; copyright and config).
- `node --check` for `script.js`, `seed.js`, `project-config.js` — PASS.
- `python tests/browser_test.py` — PASS (32 pages × 6 widths; 11 interaction checks, zero reported errors).
- `ERP_TEST_SET_CONTENT=1 ERP_USE_SYSTEM_CHROMIUM=1 ERP_CI_OFFLINE=1 python tests/ci_browser_smoke.py` — PASS (32 pages × 3 widths; theme, sidebar, basic inventory checks).

### Not verified

- Live GitHub `main` commit, deployed Pages changes, settings and real workflow runs
- Real networked CDN behavior, live GitHub-hosted Ubuntu runner
- Docker build/push/pull, GHCR package visibility and runtime (Docker Engine not available here)

The offline local browser fallback uses the Bootstrap resources present in this test environment; GitHub Actions downloads pinned Bootstrap 5.3.2 and Playwright separately. A successful local offline browser test is not a replacement for GitHub Actions and real browser verification.

## Safe integration

Start with a fresh clone of the actual GitHub repository, copy this package into a *new feature branch*, inspect `git diff`, resolve any differences from the latest remote files, and create a pull request. Do not delete existing remote-only files or force-push.
