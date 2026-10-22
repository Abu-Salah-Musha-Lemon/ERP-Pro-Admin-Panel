# ERP Pro — Developer Guide

## 1. Setup and philosophy

This is a no-build, no-framework frontend. The code prioritizes a reusable static page template and centralized behavior for straightforward migration to Laravel Blade, Django templates, Express/Nunjucks or another SSR frontend. The CSS uses tokens in `:root`, with a responsive 260px sidebar and 60px header. Mobile sidebar is a slide-in panel.

Use a real version control repository. Keep `main` stable and make topic branches such as `feature/products-api`, `feature/pos-payments`, `fix/mobile-sidebar`; review and merge them after tests. Never commit secrets, connection strings or real cardholder data.

## 2. File responsibilities

| File | Responsibilities |
| --- | --- |
| `assets/css/style.css` | Theme colors, typography, header, sidebar, cards, tables, forms, POS, auth, responsive & print media |
| `assets/js/seed.js` | Initial mock records by entity (`window.ERP_SEED`) |
| `assets/js/script.js` | `records`, `save`, `drawTable`, modal CRUD, CSV, sidebar, theme, settings, barcode, POS, charts |
| `*.html` | Complete standalone page markup with shared canonical sidebar/header, forms, tables, specific module layouts |
| `docs/master-erp-prompt-v2.md` | Supplied project requirements and exact pinned CDN list |

## 3. How tables work

A list page includes:

```html
<table class="table datatable" data-entity="products"
       data-cols="sku,name,category,brand,price,stock,status">
```

`records('products')` reads the browser override, falling back to `window.ERP_SEED.products`. `drawTable()` renders safely escaped cells, adds a stable row key and optionally initializes DataTables. Search, column filtering, pagination and HTML5 export buttons are enabled when the pinned CDN libraries load. The custom built-in CSV exporter still works without DataTables.

To add an entity: create an array in `seed.js`, add an HTML table with `data-entity` and `data-cols`, provide a sidebar link, and use `.btn-create` with `data-entity="yourEntity"`. For a dedicated form page, use `class="entry-form"`, `data-entity` and `data-back`. Set `<input name="field">` to match the object schema. This is a demo pattern, not a production data validation strategy.

## 4. How POS works

The standalone `pos.html` uses `records('products')` to build its catalog. Cart state is in memory; a held cart uses a browser-local key. Cash payments require sufficient tender and all sales validate available quantity. Checkout adds one demo invoice to `records('sales')` and reduces product stock. This is **not transactional**: crashes across multiple writes, refunds, concurrent terminals, taxes per jurisdiction, order reservations and financial postings are unhandled.

For a real POS, move tax, discount, stock, order creation and payment verification into one server-side transaction or coordinated checkout workflow. Generate server invoice IDs. Never trust a browser-supplied total, permission or stock balance.

## 5. Backend transition (suggested)

Suggested REST surface:

```text
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/me
GET    /api/products?search=&page=&status=
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
GET    /api/customers
POST   /api/customers
GET    /api/sales
POST   /api/sales                # Transactional checkout
GET    /api/purchases
POST   /api/purchases
GET    /api/warehouses
POST   /api/transfers            # Atomic inventory movement
GET    /api/reports/summary?from=&to=
GET    /api/audit-log
GET    /api/roles/:id/permissions
PUT    /api/roles/:id/permissions
```

Move `records()` to an async HTTP data layer (`GET /api/...`), and `save()` to typed mutation endpoints. Update optimistic UI states only after server confirmation; show real validation errors. Replace dummy reports with reporting APIs. Introduce pagination/filtering/sorting server-side for large tables.

## 6. Security and correctness checklist

- Server-side authorization for **every endpoint**. A checked permission box in HTML is not security.
- Hash passwords using established backend auth systems; secure, HttpOnly, SameSite cookies, CSRF protection (where applicable), session invalidation and MFA as required.
- Strict validation, request throttling, accounting decimal arithmetic, server-controlled pricing and idempotency keys for checkout.
- ACID transactions or explicit compensations across sale, stock deduction, receipt and payment steps; reserve/lock inventory against concurrent sales.
- Audit log with timestamp, user, action, target and immutable before/after references; appropriate retention and privacy rules.
- Sanitize CSV import/export; the demo exporter prefixes spreadsheet-like formula cells for safety, but production should validate content and authorization.
- Never put API tokens, private SMTP credentials, payment secrets, user PII or passwords in localStorage. Configure secrets server-side.
- Automated unit, integration, accessibility, responsive and end-to-end tests. Run against all your supported browsers.
- Implement proper error/loading/empty states, API retries, timezones, localization, monetary rounding and legal tax rules for your target jurisdictions.

## 7. Visual changes

Edit `:root` token values in `assets/css/style.css` (`--primary`, `--active-item-bg`, `--sidebar-width`, `--body-bg`, etc.). The included script binds dark mode using `body[data-theme=dark]` and stores its preference. Bootstrap colors in plugin components may require additional overrides if you change the primary accent.

## 8. Tests and limitations

`tests/validate_project.py` performs structural checks: required pages/assets, internal links, duplicate IDs, input labels, table captions and JS syntax if Node is present. It does not prove that all CDN libraries load in the user's browser. Browser-assisted smoke tests were run against inline DOMs with external libraries stubbed because the test container blocks local browser navigation; this validates primary custom interactions, not fully integrated end-to-end behavior.

The uploaded specification requests a production-ready system. This static delivery implements its interface and representative local interactions; production architecture and service integrations are intentionally out of scope until a backend is chosen.
