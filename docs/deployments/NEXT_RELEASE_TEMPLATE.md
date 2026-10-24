# ERP Pro vX.Y.Z — Deployment Record TEMPLATE

> Replace placeholders on each actual release; do not publish a version as already shipped before GitHub Actions verifies it.

- **Tag:** `vX.Y.Z`
- **Commit SHA:** `FILL_ME`
- **Date:** `YYYY-MM-DD`
- **GitHub Release URL:** `FILL_ME`
- **GitHub Pages URL:** `https://abu-salah-musha-lemon.github.io/ERP-Pro-Admin-Panel/`
- **Container URI:** `ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:vX.Y.Z`
- **Container digest (preferred for reproducibility):** `sha256:FILL_ME`
- **CI run:** `FILL_ME`
- **Docker publish run:** `FILL_ME`
- **License and attribution:** Apache-2.0; Abu Salah Musha Lemon

## New features and changes

Summarize what changed; link CHANGELOG / release notes.

## Tested platforms

Fill in desktop/mobile browsers and resolutions actually checked.

## Deployment

```bash
docker pull ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:vX.Y.Z
docker run -d --name erp-pro -p 8080:8080 ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:vX.Y.Z
```

## Verification

- [ ] CI passed
- [ ] GHCR package visible and permissions correct
- [ ] docker pull and run successful
- [ ] dashboard, inventory and POS accessible
- [ ] theme and sidebar verified

## Rollback

Identify last known-good image tag/digest and tested rollback instructions.

## Limits

Frontend demo only; no real database, authentication, payment gateway, or backend authorization.
