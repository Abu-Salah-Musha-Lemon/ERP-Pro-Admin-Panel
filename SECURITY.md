# Security Policy and Demo Disclaimer

**Maintainer:** Abu Salah Musha Lemon

## Frontend demo — not a secure ERP service

This repository contains client-side UI and demonstration records. It does **not** have a server-backed login, authorization layer, protected financial transaction processor, access controls or secure data store. Do not use it to process real payments, credentials, employee records or customer personal data.

## Reporting an issue

If you discover a security issue, **do not post exploits, credentials or personal data in a public issue**. Contact the repository owner using GitHub's private vulnerability reporting feature **if the owner has enabled it**; otherwise contact the maintainer through a private channel you already trust.

There is no committed response-time or coordinated disclosure SLA for this frontend demonstration.

## For anyone extending the project

- Implement server-side authentication and authorization before real-world deployment.
- Validate all requests and restrict every API endpoint on the server.
- Do not store secrets, cardholder data, real passwords or sensitive user data in `localStorage`.
- Treat pricing, discounts, checkout totals and stock movement as untrusted until revalidated server-side.
- Audit all external CDN dependencies and their licenses.
- Review the backend transition and security checklist in `docs/DEVELOPER_GUIDE.md`.
