# ERP Pro Admin Panel v3.1.0 — CI/CD Automation & Docker Support

**Release tag:** `v3.1.0`  
**Author:** Abu Salah Musha Lemon  
**License:** Apache-2.0

## Highlights

- GitHub Actions workflow for static validation and responsive browser smoke testing.
- Docker image publication to GitHub Container Registry (GHCR) on GitHub Release publishing.
- Unprivileged Nginx image serving the ERP Pro static frontend on **container port 8080**.
- Versioned deployment and rollback documentation.
- Separate follow-up quality documentation adds nine application-level E2E demo scenarios to the CI gate.

## Run the published package

```powershell
docker pull ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
docker run -d --name erp-pro -p 8000:8080 ghcr.io/abu-salah-musha-lemon/erp-pro-admin-panel:v3.1.0
curl.exe -I http://localhost:8000/
```

Open `http://localhost:8000`. The project owner reported successful `HTTP/1.1 200 OK` with this mapping on 24 October 2026.

## Scope

The ERP, POS, authentication and finance screens are **frontend/demo functionality only**. No production API, server-side permissions, secure account system, real inventory accounting, or payment gateway is included. Run additional UI acceptance tests before relying on any environment as a production business system.

## Support the Project

If you find **ERP Pro** useful, consider giving the repository a ⭐ **star**, sharing it, or contributing improvements to help the project grow.

**Copyright © 2026 Abu Salah Musha Lemon. Licensed under Apache-2.0.**
