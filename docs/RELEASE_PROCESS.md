# ERP Pro — Release and Versioning

**Author:** Abu Salah Musha Lemon

## Versioning policy

Use Semantic Versioning (`MAJOR.MINOR.PATCH`):

- `PATCH` — compatible bug fix (e.g. 3.0.1 -> 3.0.2).
- `MINOR` — backward-compatible feature (e.g. 3.0.1 -> 3.1.0).
- `MAJOR` — breaking changes (e.g. 3.x -> 4.0.0).

**Current baseline** is v3.0.1. The CI/CD addition may be announced in a future release; do not claim it is shipped until GitHub shows a successful run.

## Checklist before publishing

- [ ] Open a pull request against `main`.
- [ ] Confirm `Static validation` and `Browser smoke tests` are green.
- [ ] Manually inspect dashboard, sidebar, dark mode, inventory and POS in a real networked browser.
- [ ] Confirm external CDN libraries and mobile widths (320, 375, 768, 1024, 1440).
- [ ] Update `CHANGELOG.md` and `README.md` when features change.
- [ ] Confirm `LICENSE` and `NOTICE` attribution is intact.
- [ ] Merge the PR. Create a GitHub release tag such as `v3.1.0` from the tested commit.
- [ ] Publish the GitHub release to trigger `.github/workflows/publish-container.yml`.
- [ ] Confirm the package appears in GHCR and set visibility appropriately.
- [ ] Test a `docker pull` + `docker run` for the published exact version.

## Example release title

`ERP Pro v3.1.0 — Automated Quality Checks & Docker Distribution`

## Example release note

- Added automatic static and browser checks to pull requests and pushes.
- Added version-tagged Docker images via GitHub Packages / GHCR.
- Added deployment, release and rollback documentation.
- Frontend demonstration only; no server-side auth or payment integration.

## Rollback

Container deployment: stop the current container and run the last passing `vX.Y.Z` image tag. GitHub Pages: revert the deployment commit or redeploy the last known-good commit through the Pages deployment process. Record the commit hash and tag in each release note.

## Version-specific deployment records

- [`deployments/v3.0.1.md`](deployments/v3.0.1.md) — existing published frontend baseline; no Docker package in that original release.
- [`deployments/NEXT_RELEASE_TEMPLATE.md`](deployments/NEXT_RELEASE_TEMPLATE.md) — fill in tag, commit SHA, CI run, image digest and rollback target for each new release.
