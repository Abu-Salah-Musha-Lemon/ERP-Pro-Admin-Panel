# ERP Pro — Deployment Guide

**Project:** https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel  
**Author:** Abu Salah Musha Lemon  
**License:** Apache-2.0  
**Scope:** Frontend demonstration, **not a production ERP/backend**.

## A. Local development (without Docker)

```bash
git clone https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel.git
cd ERP-Pro-Admin-Panel
python -m http.server 8000
```
Visit http://localhost:8000. External CDN scripts need an internet connection.

## B. GitHub Pages

GitHub repository -> Settings -> Pages -> Deploy from branch -> main -> / (root).
The published demo is https://abu-salah-musha-lemon.github.io/ERP-Pro-Admin-Panel/ .

GitHub Pages is a public static site, not a backend. Do not collect real account passwords, customer data or payment details in this demo.

## C. Docker locally

Install Docker Desktop or Docker Engine, then run from the repository root:

```bash
docker build -t erp-pro:local .
docker run --rm --name erp-pro -p 8000:8080 erp-pro:local
```

Open http://localhost:8000. This image uses a non-root Nginx service listening on port 8080. Its contents are the static HTML/CSS/JS demo. Your browser's localStorage is outside the container.

## D. GitHub Container Registry (GHCR)

On a NEW GitHub release published from a tag like `v3.1.0`, the publish workflow first calls the reusable quality workflow. If it passes, it builds and uploads two images, for example:

- `ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0`
- `ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:3.1.0`
- `ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:latest` (only for non-prereleases)

The package is initially private unless you change its visibility. To make it publicly runnable, visit your user profile -> Packages -> the published package -> Package settings -> Change visibility -> Public. Confirm repository linkage/access in Package settings. The GitHub Actions `GITHUB_TOKEN` handles publication; do NOT paste personal tokens into YAML.

Pull and run a published public image:

```bash
docker pull ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
docker run -d --name erp-pro -p 8000:8080 ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
```

Note: a published v3.1.0 image was independently pulled by the project owner, and its local HTTP response returned 200 using `-p 8000:8080`. The `EXPOSE 8080` container configuration has been confirmed via `nginx -T`. Docker runtime on a separate system is still needed for any subsequent tags.

## E. Verify and rollback

- Verify the root page and `inventory.html`, `pos.html` at localhost:8000.
- Check container logs: `docker logs erp-pro`.
- Stop current service: `docker stop erp-pro && docker rm erp-pro`.
- Run a previous tested image with its exact version tag, e.g. `:v3.1.0`.
- Existing users retain browser-local demo state per origin. A new deployment may require clearing `erpProDemoV2:` test entries if test data changes.

## Security and operational limits

No server-side authentication, DB, multi-user synchronization, payment processing or authorization. Do not expose this demo as a real business ERP service. For production deployment, add backend, secure sessions, RBAC, HTTPS, secrets management, backups, and monitoring.
