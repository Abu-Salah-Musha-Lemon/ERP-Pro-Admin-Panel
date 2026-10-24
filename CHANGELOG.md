# Changelog

All notable frontend changes are tracked here. Tag names follow the `vMAJOR.MINOR.PATCH` convention.

## [3.1.0] — 2026-10-24

Published CI/CD, GHCR Docker image and versioned deployment documentation. Application-level Playwright coverage added in the documentation/test update.

- Added reusable GitHub Actions quality checks and offline Playwright browser smoke tests.
- Added release-triggered GHCR container publishing workflow and rootless Nginx Dockerfile using the current `nginx/nginx-unprivileged` registry.
- Added versioned deployment, rollback and release-process documentation.
- Fixed dark-mode assertion in CI browser smoke test to check the actual `<body data-theme>` state.
- Updated README with CI/CD and Docker instructions while keeping the support section donation-free.
- Project owner confirmed GHCR publishing and a Docker HTTP 200 response using `-p 8000:8080`. Newly added application tests still require a new GitHub Actions run after committing.

## [3.0.1] — 2026-10-22

### Added
- Licensed the author-owned project code under Apache License 2.0, with a dedicated attribution NOTICE.
- Added a responsive, theme-aware copyright/credit footer on all 32 pages, including POS, authentication and errors.
- Added a central, opt-in `donationUrl` configuration with a hidden-by-default Donate footer link; no real payment processing.
- Updated GitHub documentation and source-file license notices.

## [3.0.0] — 2026-10-22

### Changed
- Consolidated dark/light design tokens into a consistent palette.
- Standardized card, menu, table, dialog and form-field border colors.
- Improved component readability, focus styling and responsive theme handling.
- Retained the desktop compact/sidebar and mobile drawer fixes from v2.1.
- Prepared a GitHub-friendly README, screenshots, contributor guide, release notes and security guidance.

### Verified in the previous v3.0 test report
- 32 HTML pages in static validation.
- 192 viewport smoke checks and 320 light/dark viewport checks.
- 11 additional theme checks, with browser/third-party integration limitations documented.

## [2.1.0] — Previous frontend update

### Fixed
- Desktop sidebar toggle availability and compact sidebar behavior.
- Mobile navigation overlay and compact-mode interaction.
- Night-mode persistence and supporting responsive behavior.

## Earlier work

- Base ERP Pro frontend created from `docs/master-erp-prompt-v2.md` with seeded demo data, standalone modules, shared CSS/JS and browser-local interactions.

For detailed implementation notes, see `docs/CHANGELOG_v2.1.md` and `docs/CHANGELOG_v3.0.md`.
