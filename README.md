<div align="center">
  <img src="assets/img/logo.png" alt="ERP Pro logo" width="154" />

  # ERP Pro — Admin Panel

  **Responsive ERP, Inventory Management & Point-of-Sale Dashboard**

  A multi-page admin interface built with HTML, CSS, JavaScript and Bootstrap.  
  Designed as a foundation for retail and wholesale business management software.

  ![Version](https://img.shields.io/badge/version-3.0.1-2563eb)
  ![Project](https://img.shields.io/badge/status-frontend%20demo-f59e0b)
  ![HTML](https://img.shields.io/badge/HTML5-CSS3-JavaScript-0f172a)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952b3)
  ![Responsive](https://img.shields.io/badge/responsive-mobile%20%7C%20tablet%20%7C%20desktop-16a34a)
  ![License](https://img.shields.io/badge/license-Apache--2.0-2563eb)

  **Author: Abu Salah Musha Lemon**
</div>

> [!IMPORTANT]
> **Frontend demonstration, not a production ERP.** Authentication and access permissions are not enforced server-side; payments, financial figures and some workflows are simulations. Demo records use browser `localStorage`, not a shared database. Do **not** use this release to process real customer, payment, employee or inventory data without implementing a secure backend.

## Preview

| Dark dashboard | Light dashboard |
|:---:|:---:|
| ![ERP Pro dark dashboard](docs/screenshots/dashboard-dark.png) | ![ERP Pro light dashboard](docs/screenshots/dashboard-light.png) |

![ERP Pro inventory in dark mode](docs/screenshots/inventory-dark.png)

## Highlights

- **32 ready-to-open HTML pages** covering a dashboard, product catalog, sales, purchases, customer and supplier records, POS and ERP modules.
- **Consistent light and dark themes**, persisted in the same browser, with standardized colors, borders and readable controls.
- **Responsive navigation:** full desktop sidebar, collapsible compact sidebar, mobile slide-in drawer, backdrop close and keyboard-friendly controls.
- **Reusable data tables:** search, pagination, filters, CSV import/export, CRUD dialogs and bulk actions; advanced DataTables/Excel/PDF features depend on the CDN libraries loading.
- **Interactive demo POS:** product lookup, cart, quantities, cash/change, discounts, taxes, held orders and receipt printing; checkout updates demo stock and adds a demo sale in local browser storage.
- **Reports and dashboard visualizations** with example charts and illustrative financial figures.
- **No frontend build process:** shared HTML/CSS/JS with CDN-hosted dependencies.
- **Copyright & attribution footer:** visible on all 32 pages; author credit, Apache-2.0 license, and optional donation link (disabled until configured).

## Quick start

**Option A — open directly:** Download the repository as a ZIP, extract it and open `index.html` in Chrome, Edge or Firefox.

**Option B — run a local server (recommended):**

```bash
git clone <YOUR-REPOSITORY-URL>
cd erp-pro-admin
python -m http.server 8000
# Windows: py -m http.server 8000
```

Visit **http://localhost:8000**. No `npm install`, database or build step is required to explore the demo. **Internet access is required for full CDN-based functionality**, including enhanced tables, charts, icons and dialogs.

> **Demo sign-in:** `signin.html` is an interface simulation. Use an email-formatted input and a password of at least six characters to preview the dashboard. No real credentials are required or checked. Do not enter an actual password.

## Modules

| Module | Key pages | Demo capabilities |
| --- | --- | --- |
| Dashboard | `index.html` | KPI cards, charts, shortcuts |
| Inventory | `inventory.html`, `addproduct.html`, `categorylist.html`, `brandlist.html`, `barcode.html` | Product records, demo stock, barcode generation |
| Sales & POS | `sales.html`, `add-sales.html`, `pos.html`, `salesreturnlist.html` | Sales records, cart, receipt, returns UI |
| Purchasing | `purchase.html`, `addpurchase.html`, `purchasereturnlist.html` | Purchase forms, records, returns UI |
| Operations | `expense.html`, `quotation.html`, `transfer.html` | Expenses, quotations, transfers UI |
| People | `customerlist.html`, `supplierlist.html`, `userlist.html` | Customer, supplier and user directories |
| ERP | `hrms.html`, `crm.html`, `finance.html`, `warehouse.html`, `ecommerce.html`, `reports.html` | Module screens and demo workflows |
| Account & System | `settings.html`, `profile.html`, `activities.html`, `signin.html`, `signup.html` | Preferences, profile and UI-only sign-in |
| Error screens | `error-404.html`, `error-500.html` | Branded error layouts |

## Technology

| Layer | Tools |
| --- | --- |
| Structure & style | HTML5, CSS3, Bootstrap 5.3.2, Bootstrap Icons, Font Awesome, Nunito |
| Interactions | Vanilla JavaScript, jQuery 3.6.4 |
| Tables & export | DataTables 1.13.8, Buttons 2.4.2, Responsive 2.5.0, JSZip, pdfmake |
| Charts & controls | ApexCharts, Select2, Flatpickr |
| Feedback & dialogs | Toastr, SweetAlert2, Animate.css |
| Barcodes | JsBarcode (barcode page) |
| Demo persistence | Browser `localStorage` |

Dependencies are loaded using external CDNs; the versions above describe the included references, not a guarantee that the remote servers are always available.

## Project structure

```text
erp-pro-admin/
├── index.html                 # Overview/dashboard
├── inventory.html             # Example list & CRUD page
├── pos.html                   # Standalone POS terminal
├── [29 other HTML pages]      # ERP modules, auth and errors
├── assets/
│   ├── css/style.css          # Responsive layout, theme tokens, components
│   ├── js/project-config.js   # Optional verified external donation link
│   ├── js/seed.js             # Demo data
│   ├── js/script.js           # Shared UI logic, tables, POS and charts
│   └── img/                   # Project images
├── docs/
│   ├── screenshots/           # GitHub screenshots
│   ├── DEVELOPER_GUIDE.md     # Code architecture and API migration
│   ├── CHANGELOG_v3.0.md      # Original v3 theme fixes
│   ├── TEST_REPORT_v3.0.md    # Validation scope and limitations
│   └── GITHUB_SETUP.md        # Publishing and release instructions
├── tests/                     # Static, browser and theme verification scripts
├── CHANGELOG.md               # GitHub changelog
├── CONTRIBUTING.md            # Contribution guide
├── SECURITY.md                # Security and demo limitations
└── README.md
```

## Themes and responsive behavior

Use the **moon/sun button** in the top bar, or theme preferences in Settings. The choice is saved in the current browser. Version 3.0 unifies the color system across sidebar, cards, tables, fields, overlays, modals and plugin components, including distinct tokens for standard and stronger borders.

The project's tests checked common widths of **320, 375, 414, 768, 1024 and 1440 pixels**. On small screens, wide datasets may scroll *inside* table containers rather than shrinking the columns until they become unreadable.

To customize theme colors, change the semantic CSS variables in `assets/css/style.css` rather than hard-coding unrelated component colors. See [the developer guide](docs/DEVELOPER_GUIDE.md).

## Demo data and limitations

The app initializes mock data from `assets/js/seed.js` and stores edited demo records in browser `localStorage` keys beginning with `erpProDemoV2:`. Browser data stays on the same device/browser origin; it is not synced between users or machines.

The following are **not implemented as production services**:

- Secure login, password management, sessions, server-side role enforcement or permission checks.
- Shared database, server API, audit ledger or multi-user transactional inventory.
- Payment gateways, SMTP email, real tax accounting or reconciliation of demo KPI figures.
- Reliable cross-device synchronization and production backup/recovery.

To reset demo records, remove the project-specific `erpProDemoV2:` local-storage entries in the browser's Developer Tools and reload. **Note:** This deletes local demo changes.

## Verification

The packaged v3.0 test report records:

| Check | Reported outcome |
| --- | --- |
| Static structure | 32/32 HTML pages passed |
| Browser viewport smoke checks | 32 pages × 6 widths = 192 checks |
| Light/dark responsive states | 32 pages × 2 themes × 5 widths = 320 checks |
| JavaScript syntax | Passed for shared JS files |
| CSS parsing | No parsing errors reported |
| Additional theme/contrast checks | 11 checks passed |

Re-run static checks locally:

```bash
python tests/validate_project.py
node --check assets/js/script.js
node --check assets/js/seed.js
```

The v3.0.1 update adds 256 browser checks for footers across 32 pages, two themes and four widths; see `tests/footer_browser_results.json`. Donation link activation and unsafe URL rejection are checked as well.

The browser tests exercised application behavior with local/offline substitutes; **live third-party CDN integrations and a real backend were not end-to-end verified**. See [the v3.0.1 test report](docs/TEST_REPORT_v3.0.1.md), along with the original [v3.0 report](docs/TEST_REPORT_v3.0.md).

## Roadmap

- [ ] Extract repeated header/sidebar markup into a reusable template or component system.
- [ ] Implement server authentication, roles, permissions and audit logs.
- [ ] Add API endpoints and database persistence for products, purchases, sales and customers.
- [ ] Implement inventory reservations, transactional checkout and correct stock ledgers.
- [ ] Integrate verified payments, receipts, reports and notifications.
- [ ] Add CI, full browser E2E tests, security review and automated dependency checks.

These are **planned ideas**, not current features.

## Contributing

Bug reports and improvement proposals are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a change. For security-related issues, see [SECURITY.md](SECURITY.md). Release history is in [CHANGELOG.md](CHANGELOG.md).

## Author and rights

**Abu Salah Musha Lemon** — Project Author.

**License:** [Apache License 2.0](LICENSE). Anyone may use, copy, modify, distribute and commercially use the project under the license terms. Retain applicable copyright, attribution and license notices, including the [NOTICE](NOTICE) file when redistributing derivative works. This does not legally require derivative applications to display the same footer permanently; it requires preservation of notices as specified by the license. Third-party libraries remain subject to their own licenses.

## Copyright footer

A shared footer now appears on **all 32 pages**, including the admin dashboard, POS checkout, sign-in/sign-up and error pages. It is responsive, theme-aware and credited to **Abu Salah Musha Lemon**. It links to the Apache-2.0 `LICENSE`, `NOTICE`, and the author's public GitHub profile.

To update the year or text later, edit the footer in the HTML pages (search `<!-- Global project footer`). Theme and layout styles are in `assets/css/style.css` under `v3.0.1 — Shared attribution footer`.

## Donations (future-ready, disabled by default)

This project does **not** process donations or payments. When you have a legitimate, verified donation page (e.g. a hosted payment provider), edit `assets/js/project-config.js`:

```js
window.ERP_CONFIG = Object.freeze({
  donationUrl: 'https://your-verified-donation-provider.example/your-page'
});
```

The **Donate** footer link is automatically revealed on every page only if a syntactically valid `https://` URL is provided. Leaving `donationUrl: ''` hides it; no broken or placeholder donation button is shown. Do not place payment secrets or API keys in client-side code. This does not integrate payment processing.

