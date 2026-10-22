# ERP Pro — Inventory, POS & Enterprise Admin UI

A polished **32-page, responsive, multi-module ERP admin dashboard demo**, written with static HTML, CSS and JavaScript from `master-erp-prompt-v2.md`. No Node build, package installation, database or bundler is required to view the pages.

> **Important:** This project is a **frontend prototype**, not a production ERP or a secure authentication/payment solution. All provided names, balances, KPI figures and chart data are demonstrative. A backend, database, authentication, RBAC enforcement, audit logging, server validation and business transaction processing must be implemented before real business use.

## Open it

1. Extract this ZIP and keep the entire `erp-pro-admin/` directory together.
2. Open `index.html` in Chrome, Edge or Firefox. The interface loads Bootstrap, Font Awesome, Bootstrap Icons, DataTables, ApexCharts, Toastr, SweetAlert2, Flatpickr and other libraries from their pinned CDNs, so **internet access is needed** for their full behavior.
3. For a more reliable local development environment, use Python: `python -m http.server 8000` from inside the extracted directory, then open `http://localhost:8000/index.html`. On Windows, `py -m http.server 8000` works if Python is installed.
4. Try **Inventory → Edit**, **Customers → Add customer**, **Sales → New sale**, **POS Terminal**, **Settings**, **Dark mode** and **CSV import/export**.

**Demo account:** `signin.html` and `signup.html` are UI simulations. You may enter any valid email and a six-character-or-longer password to preview the dashboard. **They do not authenticate users** and should never be publicly deployed as secure access controls.

## Modules and pages

| Area | Pages |
| --- | --- |
| Overview | `index.html` |
| Products | `inventory.html`, `addproduct.html`, `categorylist.html`, `brandlist.html`, `barcode.html` |
| Sales & POS | `sales.html`, `add-sales.html`, `pos.html`, `salesreturnlist.html` |
| Purchases | `purchase.html`, `addpurchase.html`, `purchasereturnlist.html` |
| Operations | `expense.html`, `quotation.html`, `transfer.html` |
| Directories | `customerlist.html`, `supplierlist.html`, `userlist.html` |
| ERP | `hrms.html`, `crm.html`, `finance.html`, `warehouse.html`, `ecommerce.html`, `reports.html` |
| Account & administration | `settings.html`, `profile.html`, `activities.html`, `signin.html`, `signup.html` |
| Error templates | `error-404.html`, `error-500.html` |

## Architecture

```text
erp-pro-admin/
├── index.html                 # Dashboard
├── inventory.html             # Reusable CRUD-list pattern
├── addproduct.html            # Independent form-page pattern
├── pos.html                   # Standalone POS (no global sidebar)
├── ...                        # Remaining standalone .html pages
├── assets/
│   ├── css/style.css          # Theme tokens, layouts, components, responsive and print
│   ├── js/seed.js             # Shared mock data, including source examples
│   ├── js/script.js           # Core interactions, CRUD, POS, charts, tables, settings
│   └── img/                   # Owned logo, avatar, favicon, auth art
├── docs/
│   ├── master-erp-prompt-v2.md # Original supplied requirements
│   └── DEVELOPER_GUIDE.md      # Maintainer instructions and API migration plan
└── tests/validate_project.py  # Offline static validation
```

The HTML files intentionally replicate the canonical header/sidebar instead of injecting them at runtime, per the uploaded specification. Each uses the same CSS/JS. The `data-page`, `data-entity` and `data-cols` attributes control shared behavior.

## Supported demo interactions

- Mobile navigation, desktop mini-sidebar, active menu, quick global navigation search and persistent dark mode.
- Reusable record tables with search, paging and filters (when DataTables CDN is available), edit/view/create/delete modals, multiselect, bulk delete, bulk status changes, CSV exports and import from CSV containing matching table column headers.
- Add product, sale and purchase forms with native HTML validation; browser-local data persistence.
- POS cart, quantity adjustment, stock validation, discount, tax, tendered amount, cash/change calculation, hold/resume order, demo checkout, receipt printing and adding a sales entry plus decrementing stock.
- Reports and dashboard charts use the **exact fixed ApexCharts sample configurations** in the supplied prompt, not a calculated financial ledger.
- CRM leads, basic visual pipeline, HRMS employee/attendance/payroll, finance, warehouse and e-commerce views.
- Settings pages for general info, email UI, payment toggles, tax, permissions and preferences. Permissions are **not enforced** without a backend.
- Code128 barcodes via JsBarcode. EAN-13 is available only for valid numeric product identifiers; sample SKUs require Code128. QR codes are not included in this demo.

### Browser data

Demo records are stored in `localStorage` keys beginning with `erpProDemoV2:`. Reset browser demo data by opening Developer Tools → Application (Storage) → Local Storage for the page and deleting those keys; reload afterward. This affects only the browser you're using.

Imported CSV is limited to 1 MB and 500 records per import. Its first row **must** contain all table columns (e.g. products: `sku,name,category,brand,price,stock,status`). Import is not a production bulk-upload pipeline.

## Known limits

1. **No server, database, authenticated sessions or real roles.** Logins, passwords, permission matrix, and payment provider switches are UI-only. SMTP testing honestly reports that a backend is required.
2. **Historical sample numbers are fixed.** Business KPIs/finance charts do not reconcile to mutable local records; they are visual demo data from the prompt.
3. **No inventory ledger.** POS reduces available product stock in the local demo, but purchasing, returns and transfers aren't double-entry stock transactions and aren't linked to warehouse balances.
4. **No API integration.** Real emails, card charges, remote user synchronization, multi-device collaboration, session expiration and durable receipt storage are intentionally not simulated as production success.
5. **CDN-dependent libraries.** Core HTML is readable offline, but DataTables/Bootstrap interactions, ApexCharts, barcodes and toast/modal enhancements may require internet.
6. Some additional mock records beyond the original provided sample data were generated to make 8-row tables across modules; they are clearly **demo** data. Source sales invoice dates are retained from 2025.

## Run static checks

```bash
python tests/validate_project.py
# Optionally, if Node.js is installed:
node --check assets/js/script.js
node --check assets/js/seed.js
```

See `docs/DEVELOPER_GUIDE.md` before adapting the project to production.

---

## v2.1 Responsive sidebar and night mode update

The sidebar now supports a desktop collapse/expand toggle that remains clickable while collapsed, a mobile slide-in navigation drawer with an explicit close button, a clickable backdrop and Escape-key closing. Saved compact preferences no longer hide mobile submenus. Sidebar controls include ARIA state and mobile off-screen focus protection.

Use the moon/sun icon in the header to enable or disable night mode. The preference persists in the current browser and applies to forms, tables, dialogs, POS, and sign-in/outlier pages; it can also be configured under **Settings → Preferences**. Styling has been checked at 320, 375, 414, 768, 1024 and 1440 pixels. Horizontal data tables may intentionally scroll *inside their table container* on narrow screens.

**Test records:** `docs/CHANGELOG_v2.1.md` and `docs/TEST_REPORT.md`, with `tests/browser_results.json` for machine-readable results.

**Limitation:** The automated browser tested the frontend with local Bootstrap and **without live CDN calls**. Check external libraries and browser-specific behavior in your deployment environment. This is still a local browser-storage demo; a backend and authentication system must be implemented for production use.
