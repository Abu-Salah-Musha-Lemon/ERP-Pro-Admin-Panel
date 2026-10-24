
# ╔══════════════════════════════════════════════════════════════════════════╗
# ║        MASTER PROMPT v2 — PRODUCTION ERP & INVENTORY ADMIN SYSTEM      ║
# ║        Senior Full-Stack Architect · Frontend Engineer · UI Designer    ║
# ╚══════════════════════════════════════════════════════════════════════════╝

---

## ██ HOW TO USE THIS PROMPT (READ FIRST) ██

This prompt is split into **4 ordered batches**. Generate one batch at a time.
Do NOT attempt to generate all files in a single response — output will be truncated.

```
BATCH 1 → Layout foundation  : style.css · script.js · layout-template.html
BATCH 2 → Core pages         : index.html · signin.html · signup.html · error-404.html · error-500.html
BATCH 3 → Inventory modules  : inventory.html · addproduct.html · sales.html · add-sales.html ·
                               purchase.html · addpurchase.html · pos.html · expense.html ·
                               quotation.html · transfer.html · salesreturnlist.html ·
                               purchasereturnlist.html · customerlist.html · supplierlist.html ·
                               userlist.html · barcode.html · categorylist.html · brandlist.html ·
                               profile.html · activities.html
BATCH 4 → ERP modules        : hrms.html · crm.html · finance.html · warehouse.html ·
                               ecommerce.html · reports.html · settings.html
```

When starting each batch, paste this full prompt + add at the end:
**"Generate BATCH [N] only. Use the canonical sidebar and header blocks from Section 7 verbatim."**

---

## ═══════════════════════════════════════════════
## SECTION 1 — PROJECT OVERVIEW
## ═══════════════════════════════════════════════

Build a complete, production-ready, **multi-page ERP + Inventory Management & POS Admin Dashboard**
as a static HTML/CSS/JS/bootstrap/Toastr alert/ datatable system. Target users: retail and wholesale businesses.

**System scope:**
- Full inventory lifecycle: products · purchasing · sales · returns · transfers · expenses · quotations
- ERP modules: HRMS · CRM · Finance · Warehouse · E-Commerce · Reporting · Settings · POS
- Fully responsive: mobile → tablet → desktop
- No build tools. CDN only. Standalone `.html` files + shared `assets/` folder
- Architecture must support future backend integration (Laravel / Django / Node.js) without redesign

**Design principles:**
- 60 % neutral background · 30 % sidebar & containers · 10 % accent color
- Golden Ratio layout balance (sidebar ≈ 260px / content ≈ remaining)
- Consistent 8px spacing scale, soft shadows, rounded corners (6–12px)

---

## ═══════════════════════════════════════════════
## SECTION 2 — TECH STACK (PINNED VERSIONS)
## ═══════════════════════════════════════════════

Use **exactly** these CDN links — no substitutions. Version conflicts are documented below.

### HEAD — CSS (load in this exact order)

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- Bootstrap 5.3.2 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

<!-- Bootstrap Icons 1.11.3 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Font Awesome 6.5.0 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- DataTables 1.13.8 + Bootstrap5 skin (MUST match exactly) -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/dataTables.bootstrap5.min.css">
<!-- DataTables Buttons 2.4.2 -->
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.2/css/buttons.bootstrap5.min.css">
<!-- DataTables Responsive 2.5.0 -->
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.bootstrap5.min.css">
<!-- NOTE: ColReorder is NOT loaded — it conflicts with Responsive on column index mapping.
     Column visibility is handled via the ColVis button only. -->

<!-- Select2 4.0.13 STABLE (NOT 4.1.0-rc which is unstable) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css">

<!-- Flatpickr 4.6.13 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css">

<!-- Toastr 2.1.4 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.css">

<!-- SweetAlert2 11 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

<!-- Animate.css 4.1.1 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

<!-- JsBarcode (for barcode.html only) -->
<!-- loaded inline on barcode.html only — not global -->

<!-- Custom (always last) -->
<link rel="stylesheet" href="assets/css/style.css">
```

### BODY END — JS (load in this exact order)

```html
<!-- jQuery 3.6.4 — SlimScroll requires ≤ 3.6.x; 3.7 breaks it -->
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

<!-- Bootstrap 5.3.2 bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- DataTables 1.13.8 core -->
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.8/js/dataTables.bootstrap5.min.js"></script>

<!-- DataTables Buttons 2.4.2 -->
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.colVis.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>

<!-- JSZip 3.10.1 (must load BEFORE buttons.html5) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<!-- pdfmake 0.2.7 + matching vfs_fonts (versions MUST match) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
<!-- buttons.html5 AFTER jszip and pdfmake -->
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>

<!-- DataTables Responsive 2.5.0 -->
<script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.5.0/js/responsive.bootstrap5.min.js"></script>

<!-- Select2 4.0.13 STABLE -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.full.min.js"></script>

<!-- Flatpickr 4.6.13 -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js"></script>

<!-- jQuery SlimScroll 1.3.6 (NOT 1.3.8 — broken on jQuery 3.6+) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.6/jquery.slimscroll.min.js"></script>

<!-- ApexCharts 3.45.2 -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts@3.45.2/dist/apexcharts.min.js"></script>

<!-- Toastr 2.1.4 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js"></script>

<!-- SweetAlert2 11 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

<!-- CDN failure guard (load before script.js) -->
<script>
  // If DataTables failed to load, show a non-blocking warning
  if (typeof $.fn.DataTable === 'undefined') {
    console.warn('DataTables failed to load from CDN. Tables will render as plain HTML.');
  }
  if (typeof toastr === 'undefined') {
    window.toastr = {
      success: function(m){ console.log('[Toastr SUCCESS]', m); },
      error:   function(m){ console.error('[Toastr ERROR]', m); },
      info:    function(m){ console.info('[Toastr INFO]', m); },
      warning: function(m){ console.warn('[Toastr WARNING]', m); }
    };
  }
</script>

<!-- Custom JS (always last) -->
<script src="assets/js/script.js"></script>
```

---

## ═══════════════════════════════════════════════
## SECTION 3 — FULL FILE STRUCTURE
## ═══════════════════════════════════════════════

```
/erp-dashboard/
│
├── index.html
├── signin.html
├── signup.html
├── error-404.html
├── error-500.html
│
├── inventory.html
├── addproduct.html
├── categorylist.html
├── brandlist.html
│
├── sales.html
├── add-sales.html
├── salesreturnlist.html
│
├── purchase.html
├── addpurchase.html
├── purchasereturnlist.html
│
├── pos.html               ← standalone layout (no sidebar)
│
├── expense.html
├── quotation.html
├── transfer.html
├── customerlist.html
├── supplierlist.html
├── userlist.html
├── barcode.html
├── profile.html
├── activities.html
│
├── hrms.html
├── crm.html
├── finance.html
├── warehouse.html
├── ecommerce.html
├── reports.html
├── settings.html
│
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
        ├── logo.png          (use placeholder: https://placehold.co/140x40/FF9F43/fff?text=ERP+Pro)
        ├── logo-small.png    (use placeholder: https://placehold.co/32x32/FF9F43/fff?text=E)
        ├── favicon.png       (same as logo-small)
        └── login-bg.jpg      (use placeholder: https://placehold.co/900x1080/1B2850/fff?text=ERP+Pro)
```

---

## ═══════════════════════════════════════════════
## SECTION 4 — COLOR SYSTEM & DESIGN TOKENS
## ═══════════════════════════════════════════════

Declare all tokens in `:root`. Never use hardcoded color values in HTML — always reference variables.

```css
:root {
  /* ── Primary Accent (10%) ── */
  --primary:           #FF9F43;
  --primary-dark:      #E8880A;
  --primary-light:     rgba(255, 159, 67, 0.12);

  /* ── Sidebar / Container (30%) ── */
  --sidebar-bg:        #FFFFFF;
  --sidebar-width:     260px;
  --sidebar-mini-width:80px;
  --header-height:     60px;
  --active-item-bg:    #1B2850;

  /* ── Body / Neutral (60%) ── */
  --body-bg:           #FAFBFE;
  --card-bg:           #FFFFFF;
  --border-color:      #E8EBED;
  --table-head-bg:     #F8F9FA;

  /* ── Dark Mode Surfaces ── */
  --dark-root:         #141432;
  --dark-card:         #1D1D42;
  --dark-border:       #353570;
  --dark-sidebar:      #141432;
  --dark-header:       #1B2850;
  --dark-table-head:   #141432;
  --dark-input-bg:     #1D1D42;

  /* ── Semantic ── */
  --color-success:     #28C76F;
  --color-danger:      #EA5455;
  --color-info:        #00CFE8;
  --color-warning:     #FF9F43;
  --color-purple:      #7367F0;
  --color-dark:        #1B2850;

  /* ── Text ── */
  --text-primary:      #212B36;
  --text-secondary:    #637381;
  --text-muted:        #B8BCC9;
  --text-white:        #FFFFFF;

  /* ── Shadows ── */
  --shadow-sm:         0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md:         0 4px 20px rgba(0, 0, 0, 0.09);
  --shadow-lg:         0 8px 30px rgba(0, 0, 0, 0.12);

  /* ── Radius ── */
  --radius-sm:         6px;
  --radius-md:         10px;
  --radius-lg:         14px;

  /* ── Spacing scale (8px base) ── */
  --space-xs:          4px;
  --space-sm:          8px;
  --space-md:          16px;
  --space-lg:          24px;
  --space-xl:          32px;
}
```

**Typography:** `Nunito, sans-serif` · base 14px · line-height 1.6 · weights: 400 / 500 / 600 / 700 / 800

---

## ═══════════════════════════════════════════════
## SECTION 5 — GLOBAL LAYOUT ARCHITECTURE
## ═══════════════════════════════════════════════

```
┌──────────────────────────────────────────────────────────────────────────┐
│  #header  (position:fixed · top:0 · left:0 · right:0 · h:60px)          │
│  ├── .header-left  (w:260px · border-right · logo + toggle)              │
│  ├── .header-right (flex · gap · search · lang · notif · avatar)         │
│  └── #mobile-btn   (hamburger · d-block d-lg-none)                       │
├───────────────────┬──────────────────────────────────────────────────────┤
│  #sidebar         │  #page-wrapper                                       │
│  (position:fixed  │  (margin-left:260px · padding-top:60px)              │
│   top:60px        │  └── .content-wrapper  (padding:25px)               │
│   w:260px         │       └── ← page content →                          │
│   overflow:hidden)│                                                      │
│                   │                                                      │
│  .sidebar-overlay │  (position:fixed · inset:0 · mobile only)           │
└───────────────────┴──────────────────────────────────────────────────────┘
```

**Mini sidebar** (`body.mini-sidebar`): sidebar → 80px, icons only, text hidden.
**Expand on hover** (`body.mini-sidebar #sidebar:hover`): temporarily expands to 260px.
**Mobile** (< 992px): sidebar slides in from left, overlay closes it.
**State persistence**: `localStorage.getItem('erpSidebarMini')` === `'true'`.

---

## ═══════════════════════════════════════════════
## SECTION 6 — COMMON HTML HEAD & META
## ═══════════════════════════════════════════════

Every HTML file must begin with exactly this head block:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <meta name="description" content="ERP Pro — Enterprise Resource Planning & Inventory Management">
  <meta name="theme-color" content="#FF9F43">
  <title>PAGE TITLE — ERP Pro</title>
  <link rel="icon" type="image/png" href="assets/img/favicon.png">
  <!-- [all CSS CDN links from Section 2 in exact order] -->
</head>
<body>

<!-- Page Loader (remove on window load) -->
<div id="page-loader">
  <div class="loader-ring">
    <div></div><div></div><div></div><div></div>
  </div>
</div>

<!-- Sidebar Overlay (mobile) -->
<div class="sidebar-overlay" id="sidebar-overlay"></div>

<!-- [HEADER block — Section 7.1] -->
<!-- [SIDEBAR block — Section 7.2] -->

<div id="page-wrapper">
  <div class="content-wrapper">
    <!-- PAGE-SPECIFIC CONTENT HERE -->
  </div>
</div>

<!-- [all JS CDN links from Section 2 in exact order] -->
</body>
</html>
```

---

## ═══════════════════════════════════════════════
## SECTION 7 — CANONICAL LAYOUT BLOCKS
## ═══════════════════════════════════════════════

**COPY THESE BLOCKS VERBATIM onto every page. Do not modify structure — only change `PAGE TITLE`.**

---

### 7.1 — CANONICAL HEADER (copy verbatim to every page)

```html
<!-- ========== HEADER ========== -->
<header id="header">
  <div class="header-left">
    <a href="index.html" class="logo">
      <img src="assets/img/logo.png" alt="ERP Pro" class="logo-full">
      <img src="assets/img/logo-small.png" alt="E" class="logo-small">
    </a>
    <button id="toggle-sidebar" class="sidebar-toggle-btn" aria-label="Toggle Sidebar">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div class="header-right">
    <!-- Search -->
    <div class="header-search">
      <input type="text" placeholder="Search…" id="global-search" aria-label="Global search">
      <i class="bi bi-search"></i>
    </div>

    <!-- Language -->
    <div class="dropdown lang-dropdown">
      <button class="header-icon-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Language">
        <img src="https://flagcdn.com/w20/us.png" alt="EN" id="active-flag"> EN
        <i class="bi bi-chevron-down ms-1" style="font-size:10px"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#" data-flag="us" data-lang="EN">
          <img src="https://flagcdn.com/w20/us.png" alt="US"> English</a></li>
        <li><a class="dropdown-item" href="#" data-flag="fr" data-lang="FR">
          <img src="https://flagcdn.com/w20/fr.png" alt="FR"> French</a></li>
        <li><a class="dropdown-item" href="#" data-flag="es" data-lang="ES">
          <img src="https://flagcdn.com/w20/es.png" alt="ES"> Spanish</a></li>
        <li><a class="dropdown-item" href="#" data-flag="de" data-lang="DE">
          <img src="https://flagcdn.com/w20/de.png" alt="DE"> German</a></li>
      </ul>
    </div>

    <!-- Notifications -->
    <div class="dropdown notif-dropdown">
      <button class="header-icon-btn position-relative" data-bs-toggle="dropdown"
              aria-expanded="false" aria-label="Notifications">
        <i class="bi bi-bell"></i>
        <span class="notif-badge" id="notif-count">5</span>
      </button>
      <div class="dropdown-menu dropdown-menu-end notif-panel">
        <div class="notif-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">Notifications</h6>
          <a href="#" class="text-primary small clear-notif" id="clear-all-notif">Clear All</a>
        </div>
        <div class="notif-list" id="notif-list">
          <!-- JS renders these -->
        </div>
        <div class="notif-footer text-center">
          <a href="activities.html">View All Activities <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    </div>

    <!-- Dark Mode Toggle -->
    <button class="header-icon-btn" id="dark-mode-btn" aria-label="Toggle dark mode">
      <i class="bi bi-moon-stars" id="dark-icon"></i>
    </button>

    <!-- User Avatar -->
    <div class="dropdown user-dropdown">
      <button class="user-avatar-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="User menu">
        <img src="https://placehold.co/36x36/1B2850/fff?text=JD" alt="John Doe" class="user-avatar">
        <span class="online-dot"></span>
      </button>
      <div class="dropdown-menu dropdown-menu-end user-menu-panel">
        <div class="user-menu-header">
          <img src="https://placehold.co/48x48/1B2850/fff?text=JD" alt="John Doe">
          <div>
            <strong>John Doe</strong>
            <span>Administrator</span>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="profile.html">
          <i class="bi bi-person me-2"></i> My Profile</a>
        <a class="dropdown-item" href="settings.html">
          <i class="bi bi-gear me-2"></i> Settings</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="signin.html">
          <i class="bi bi-box-arrow-right me-2"></i> Logout</a>
      </div>
    </div>

    <!-- Mobile hamburger -->
    <button class="header-icon-btn d-lg-none" id="mobile-menu-btn" aria-label="Open menu">
      <i class="bi bi-list fs-4"></i>
    </button>
  </div>
</header>
<!-- ========== /HEADER ========== -->
```

---

### 7.2 — CANONICAL SIDEBAR (copy verbatim to every page)

Active link detection is handled automatically by `script.js` — do NOT hardcode `active` class.

```html
<!-- ========== SIDEBAR ========== -->
<nav id="sidebar" aria-label="Main navigation">
  <div class="sidebar-inner slimscroll">
    <div class="sidebar-menu">
      <ul>

        <li class="menu-title"><span>Main Menu</span></li>

        <li>
          <a href="index.html">
            <i class="bi bi-speedometer2 menu-icon"></i>
            <span class="menu-text">Dashboard</span>
          </a>
        </li>

        <!-- Product -->
        <li class="submenu">
          <a href="#" aria-expanded="false">
            <i class="bi bi-box-seam menu-icon"></i>
            <span class="menu-text">Product</span>
            <i class="bi bi-chevron-right menu-arrow"></i>
          </a>
          <ul>
            <li><a href="inventory.html">Product List</a></li>
            <li><a href="addproduct.html">Add Product</a></li>
            <li><a href="categorylist.html">Category List</a></li>
            <li><a href="brandlist.html">Brand List</a></li>
            <li><a href="barcode.html">Print Barcode</a></li>
          </ul>
        </li>

        <!-- Sales -->
        <li class="submenu">
          <a href="#" aria-expanded="false">
            <i class="bi bi-cart3 menu-icon"></i>
            <span class="menu-text">Sales</span>
            <i class="bi bi-chevron-right menu-arrow"></i>
          </a>
          <ul>
            <li><a href="sales.html">Sales List</a></li>
            <li><a href="add-sales.html">Add New Sale</a></li>
            <li><a href="pos.html">POS Terminal</a></li>
            <li><a href="salesreturnlist.html">Sales Returns</a></li>
          </ul>
        </li>

        <!-- Purchase -->
        <li class="submenu">
          <a href="#" aria-expanded="false">
            <i class="bi bi-bag-check menu-icon"></i>
            <span class="menu-text">Purchase</span>
            <i class="bi bi-chevron-right menu-arrow"></i>
          </a>
          <ul>
            <li><a href="purchase.html">Purchase List</a></li>
            <li><a href="addpurchase.html">Add Purchase</a></li>
            <li><a href="purchasereturnlist.html">Purchase Returns</a></li>
          </ul>
        </li>

        <!-- Expense -->
        <li class="submenu">
          <a href="#" aria-expanded="false">
            <i class="bi bi-receipt menu-icon"></i>
            <span class="menu-text">Expense</span>
            <i class="bi bi-chevron-right menu-arrow"></i>
          </a>
          <ul>
            <li><a href="expense.html">Expense List</a></li>
            <li><a href="expense.html#categories">Expense Categories</a></li>
          </ul>
        </li>

        <!-- Quotation -->
        <li>
          <a href="quotation.html">
            <i class="bi bi-file-earmark-text menu-icon"></i>
            <span class="menu-text">Quotations</span>
          </a>
        </li>

        <!-- Transfer -->
        <li>
          <a href="transfer.html">
            <i class="bi bi-arrow-left-right menu-icon"></i>
            <span class="menu-text">Transfers</span>
          </a>
        </li>

        <li class="menu-title"><span>People</span></li>

        <li>
          <a href="customerlist.html">
            <i class="bi bi-people menu-icon"></i>
            <span class="menu-text">Customers</span>
          </a>
        </li>
        <li>
          <a href="supplierlist.html">
            <i class="bi bi-truck menu-icon"></i>
            <span class="menu-text">Suppliers</span>
          </a>
        </li>
        <li>
          <a href="userlist.html">
            <i class="bi bi-person-badge menu-icon"></i>
            <span class="menu-text">Users</span>
          </a>
        </li>

        <li class="menu-title"><span>ERP Modules</span></li>

        <li>
          <a href="hrms.html">
            <i class="bi bi-person-workspace menu-icon"></i>
            <span class="menu-text">HRMS</span>
          </a>
        </li>
        <li>
          <a href="crm.html">
            <i class="bi bi-diagram-3 menu-icon"></i>
            <span class="menu-text">CRM</span>
          </a>
        </li>
        <li>
          <a href="finance.html">
            <i class="bi bi-cash-stack menu-icon"></i>
            <span class="menu-text">Finance</span>
          </a>
        </li>
        <li>
          <a href="warehouse.html">
            <i class="bi bi-building menu-icon"></i>
            <span class="menu-text">Warehouse</span>
          </a>
        </li>
        <li>
          <a href="ecommerce.html">
            <i class="bi bi-shop menu-icon"></i>
            <span class="menu-text">E-Commerce</span>
          </a>
        </li>
        <li>
          <a href="reports.html">
            <i class="bi bi-bar-chart-line menu-icon"></i>
            <span class="menu-text">Reports</span>
          </a>
        </li>

        <li class="menu-title"><span>Config</span></li>

        <li>
          <a href="settings.html">
            <i class="bi bi-sliders menu-icon"></i>
            <span class="menu-text">Settings</span>
          </a>
        </li>
        <li>
          <a href="signin.html">
            <i class="bi bi-box-arrow-right menu-icon"></i>
            <span class="menu-text">Logout</span>
          </a>
        </li>

      </ul>
    </div>
  </div>
</nav>
<!-- ========== /SIDEBAR ========== -->
```

---

## ═══════════════════════════════════════════════
## SECTION 8 — DATATABLE CONFIGURATION (FULL)
## ═══════════════════════════════════════════════

### 8.1 Standard Table HTML Structure

Every data table must use this exact HTML skeleton:

```html
<div class="card">
  <div class="card-body">

    <!-- Bulk Action Bar (hidden until rows selected) -->
    <div class="bulk-bar d-none mb-3" id="bulk-bar">
      <span class="bulk-count me-3 fw-600">0 selected</span>
      <button class="btn btn-sm btn-danger me-2 btn-bulk-delete">
        <i class="bi bi-trash3 me-1"></i>Delete Selected
      </button>
      <button class="btn btn-sm btn-warning me-2 btn-bulk-status">
        <i class="bi bi-toggle-on me-1"></i>Change Status
      </button>
      <button class="btn btn-sm btn-secondary btn-bulk-export">
        <i class="bi bi-download me-1"></i>Export Selected
      </button>
      <button class="btn btn-sm btn-outline-secondary ms-auto btn-bulk-cancel">
        <i class="bi bi-x"></i> Cancel
      </button>
    </div>

    <!-- Table Toolbar -->
    <div class="table-toolbar d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <div class="d-flex gap-2 align-items-center">
        <div class="search-box position-relative">
          <i class="bi bi-search search-icon-inside"></i>
          <input type="text" class="form-control ps-5 dt-custom-search"
                 placeholder="Search records…" aria-label="Search table">
        </div>
        <button class="btn btn-sm btn-filter" id="btn-toggle-filter" title="Toggle Filters">
          <i class="bi bi-funnel"></i>
        </button>
      </div>
      <!-- DT export buttons render here via dom: -->
      <div class="dt-btn-wrap"></div>
    </div>

    <!-- Filter Panel (collapsed by default) -->
    <div class="filter-panel mb-3 d-none" id="filter-panel">
      <div class="row g-2">
        <div class="col-lg-3 col-md-6">
          <label class="form-label small">From Date</label>
          <input type="text" class="form-control form-control-sm flatpickr-date" placeholder="DD-MM-YYYY">
        </div>
        <div class="col-lg-3 col-md-6">
          <label class="form-label small">To Date</label>
          <input type="text" class="form-control form-control-sm flatpickr-date" placeholder="DD-MM-YYYY">
        </div>
        <div class="col-lg-3 col-md-6">
          <label class="form-label small">Status</label>
          <select class="form-select form-select-sm select2">
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div class="col-lg-3 col-md-6 d-flex align-items-end gap-2">
          <button class="btn btn-sm btn-primary btn-apply-filter">Apply</button>
          <button class="btn btn-sm btn-secondary btn-reset-filter">Reset</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table datatable" id="TABLE-ID" width="100%">
        <thead>
          <!-- Row 1: column headers -->
          <tr>
            <th><input type="checkbox" class="form-check-input select-all-cb" aria-label="Select all"></th>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <!-- Row 2: column-level filter inputs -->
          <tr class="col-filter-row">
            <th></th>
            <th><input type="text"   class="form-control form-control-sm" placeholder="#"></th>
            <th><input type="text"   class="form-control form-control-sm" placeholder="Name…"></th>
            <th>
              <select class="form-select form-select-sm">
                <option value="">All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- DATA ROWS — see per-page sample data in Section 11 -->
        </tbody>
      </table>
    </div>

  </div>
</div>
```

### 8.2 Standard Table Row

```html
<tr>
  <td><input type="checkbox" class="form-check-input row-cb" aria-label="Select row"></td>
  <td>001</td>
  <td>Sample Record Name</td>
  <td><span class="status-badge badge-active">Active</span></td>
  <td>
    <div class="action-btns">
      <a href="#" class="action-btn btn-view" title="View" data-bs-toggle="tooltip">
        <i class="bi bi-eye"></i></a>
      <a href="#" class="action-btn btn-edit" title="Edit" data-bs-toggle="tooltip">
        <i class="bi bi-pencil-square"></i></a>
      <a href="#" class="action-btn btn-delete confirm-delete" title="Delete" data-bs-toggle="tooltip">
        <i class="bi bi-trash3"></i></a>
    </div>
  </td>
</tr>
```

### 8.3 DataTable Init (in script.js — applied to all `.datatable` elements)

```javascript
function initDataTables() {
  document.querySelectorAll('.datatable').forEach(function (el) {
    if ($.fn.DataTable && !$.fn.DataTable.isDataTable(el)) {
      var table = $(el).DataTable({
        paging:       true,
        pageLength:   10,
        lengthMenu:   [[10, 25, 50, 100, -1], ['10', '25', '50', '100', 'All']],
        lengthChange: true,
        searching:    true,
        ordering:     true,
        orderMulti:   true,
        info:         true,
        responsive:   true,
        scrollX:      true,
        scrollCollapse: true,
        // stateSave WITHOUT colReorder (avoids index mapping bug)
        stateSave:    true,
        processing:   true,
        // Skip first col (checkbox) and last col (action) from sorting
        columnDefs: [
          { orderable: false, targets: [0, -1] },
          { searchable: false, targets: [0, -1] }
        ],
        buttons: [
          {
            extend: 'colvis',
            text: '<i class="bi bi-layout-three-columns me-1"></i>Columns',
            className: 'btn btn-sm btn-outline-secondary'
          },
          {
            extend: 'excel',
            text: '<i class="bi bi-file-earmark-excel me-1"></i>Excel',
            className: 'btn btn-sm btn-outline-success',
            exportOptions: { columns: ':visible:not(:last-child):not(:first-child)' },
            title: document.title
          },
          {
            extend: 'csv',
            text: '<i class="bi bi-filetype-csv me-1"></i>CSV',
            className: 'btn btn-sm btn-outline-info',
            exportOptions: { columns: ':visible:not(:last-child):not(:first-child)' }
          },
          {
            extend: 'pdf',
            text: '<i class="bi bi-file-earmark-pdf me-1"></i>PDF',
            className: 'btn btn-sm btn-outline-danger',
            exportOptions: { columns: ':visible:not(:last-child):not(:first-child)' },
            customize: function (doc) {
              doc.styles.tableHeader.fillColor = '#FF9F43';
              doc.styles.tableHeader.color = '#ffffff';
            }
          },
          {
            extend: 'print',
            text: '<i class="bi bi-printer me-1"></i>Print',
            className: 'btn btn-sm btn-outline-dark',
            exportOptions: { columns: ':visible:not(:last-child):not(:first-child)' },
            customize: function (win) {
              $(win.document.body).find('table').addClass('table table-bordered');
            }
          },
          {
            extend: 'copy',
            text: '<i class="bi bi-clipboard me-1"></i>Copy',
            className: 'btn btn-sm btn-outline-secondary',
            exportOptions: { columns: ':visible:not(:last-child):not(:first-child)' }
          }
        ],
        // Buttons injected into .dt-btn-wrap sibling, search in toolbar
        dom: "<'d-none'f>" +       // hide built-in search (we use custom)
             "<'row'<'col-12'tr>>" +
             "<'row mt-3 align-items-center'" +
               "<'col-sm-5'i>" +
               "<'col-sm-4'l>" +
               "<'col-sm-3'p>>",
        language: {
          processing:  '<div class="dt-loader"><div class="spinner-border text-warning" style="width:1.5rem;height:1.5rem"></div></div>',
          search:      '',
          searchPlaceholder: 'Search…',
          lengthMenu:  'Show _MENU_',
          info:        'Showing _START_–_END_ of _TOTAL_ entries',
          infoEmpty:   'No entries',
          infoFiltered:'(filtered from _MAX_ total)',
          emptyTable:  '<div class="text-center py-5"><i class="bi bi-inbox" style="font-size:2rem;color:#B8BCC9"></i><p class="mt-2 text-muted">No records found</p></div>',
          zeroRecords: '<div class="text-center py-4 text-muted">No matching records found</div>',
          paginate: {
            previous: '<i class="bi bi-chevron-left"></i>',
            next:     '<i class="bi bi-chevron-right"></i>'
          }
        },
        initComplete: function () {
          var api = this.api();

          // Inject export buttons into toolbar
          var btnContainer = $(el).closest('.card-body').find('.dt-btn-wrap');
          $(el).closest('.dataTables_wrapper').find('.dt-buttons')
               .appendTo(btnContainer);

          // Wire custom search input to DT search
          var $search = $(el).closest('.card-body').find('.dt-custom-search');
          $search.on('keyup', function () { api.search(this.value).draw(); });

          // Column-level filter inputs (row 2 of thead)
          api.columns().every(function (i) {
            var col = this;
            var $input = $(el).find('.col-filter-row th').eq(i).find('input, select');
            $input.on('keyup change', function () {
              if (col.search() !== this.value) {
                col.search(this.value).draw();
              }
            });
          });
        }
      });

      // Export buttons feedback
      $(el).closest('.card-body').on('click', '.dt-button', function () {
        var label = $(this).text().trim();
        if (label && label !== 'Columns') {
          toastr.info('Exporting as ' + label + '…', 'Export');
        }
      });
    }
  });
}
```

### 8.4 Select-All & Bulk Bar Logic

```javascript
// Select all checkbox
$(document).on('change', '.select-all-cb', function () {
  var $table = $(this).closest('table');
  var checked = this.checked;
  $table.find('.row-cb').prop('checked', checked);
  updateBulkBar($table);
});
$(document).on('change', '.row-cb', function () {
  var $table = $(this).closest('table');
  var total   = $table.find('.row-cb').length;
  var checked = $table.find('.row-cb:checked').length;
  $table.find('.select-all-cb').prop({
    checked:       checked === total,
    indeterminate: checked > 0 && checked < total
  });
  updateBulkBar($table);
});
function updateBulkBar($table) {
  var count    = $table.find('.row-cb:checked').length;
  var $bulkBar = $table.closest('.card-body').find('.bulk-bar');
  if (count > 0) {
    $bulkBar.removeClass('d-none');
    $bulkBar.find('.bulk-count').text(count + ' row' + (count > 1 ? 's' : '') + ' selected');
  } else {
    $bulkBar.addClass('d-none');
  }
}
// Bulk delete
$(document).on('click', '.btn-bulk-delete', function () {
  var $table = $(this).closest('.card-body').find('table');
  var count  = $table.find('.row-cb:checked').length;
  Swal.fire({
    title: 'Delete ' + count + ' record' + (count > 1 ? 's' : '') + '?',
    text:  'This action cannot be undone.',
    icon:  'warning', showCancelButton: true,
    confirmButtonColor: '#EA5455', cancelButtonColor: '#637381',
    confirmButtonText: 'Yes, delete all!'
  }).then(function (r) {
    if (r.isConfirmed) {
      $table.find('.row-cb:checked').each(function () {
        $(this).closest('tr').fadeOut(300, function () { $(this).remove(); });
      });
      updateBulkBar($table);
      toastr.success(count + ' record' + (count > 1 ? 's' : '') + ' deleted.', 'Bulk Delete');
    }
  });
});
// Bulk cancel
$(document).on('click', '.btn-bulk-cancel', function () {
  var $table = $(this).closest('.card-body').find('table');
  $table.find('.row-cb, .select-all-cb').prop('checked', false).prop('indeterminate', false);
  updateBulkBar($table);
});
```

---

## ═══════════════════════════════════════════════
## SECTION 9 — TOASTR CONFIGURATION (FULL)
## ═══════════════════════════════════════════════

### 9.1 Global Config (in script.js, inside DOMContentLoaded)

```javascript
toastr.options = {
  closeButton:        true,
  progressBar:        true,
  positionClass:      'toast-top-right',
  preventDuplicates:  false,
  timeOut:            4000,
  extendedTimeOut:    1500,
  showEasing:         'swing',
  hideEasing:         'linear',
  showMethod:         'fadeIn',
  hideMethod:         'fadeOut',
  tapToDismiss:       true,
  newestOnTop:        true,
  maxOpened:          5,
  autoDismiss:        true
};
```

### 9.2 Toastr Trigger Map (implement all of these in script.js)

| Trigger | Call |
|---|---|
| Record saved | `toastr.success('Record saved successfully!', 'Saved')` |
| Record updated | `toastr.success('Record updated successfully!', 'Updated')` |
| Record deleted (single) | `toastr.success('Record deleted.', 'Deleted')` |
| Bulk delete complete | `toastr.success(count + ' records deleted.', 'Bulk Delete')` |
| Delete cancelled | `toastr.info('Delete cancelled.', 'Cancelled')` |
| Required field empty | `toastr.error('Please fill all required fields.', 'Validation')` |
| Invalid email | `toastr.error('Enter a valid email address.', 'Validation')` |
| Password mismatch | `toastr.error('Passwords do not match.', 'Validation')` |
| Import success | `toastr.success('File imported. 24 records added.', 'Import')` |
| Export triggered | `toastr.info('Exporting as ' + format + '…', 'Export')` |
| Status toggled | `toastr.info('Status changed to ' + status, 'Updated')` |
| Dark mode on | `toastr.info('Dark mode enabled.', 'Theme')` |
| Dark mode off | `toastr.info('Light mode enabled.', 'Theme')` |
| Session expiry warning | `toastr.warning('Your session expires in 5 minutes.', 'Session')` |
| Copy to clipboard | `toastr.info('Copied to clipboard.', 'Copy')` |
| Unsaved changes | `toastr.warning('You have unsaved changes.', 'Warning')` |
| CDN load failure | `toastr.error('A required library failed to load. Refresh page.', 'Error')` |

### 9.3 Delete Pattern (SweetAlert2 → Toastr)

```javascript
$(document).on('click', '.confirm-delete', function (e) {
  e.preventDefault();
  var $row = $(this).closest('tr');
  Swal.fire({
    title:              'Delete this record?',
    text:               'This action cannot be undone.',
    icon:               'warning',
    showCancelButton:   true,
    confirmButtonColor: '#EA5455',
    cancelButtonColor:  '#637381',
    confirmButtonText:  '<i class="bi bi-trash3 me-1"></i> Yes, delete!',
    cancelButtonText:   'Cancel',
    customClass: { confirmButton: 'btn btn-danger', cancelButton: 'btn btn-secondary' },
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) {
      $row.addClass('animate__animated animate__fadeOut');
      setTimeout(function () { $row.remove(); }, 400);
      toastr.success('Record deleted successfully.', 'Deleted');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      toastr.info('Delete cancelled.', 'Cancelled');
    }
  });
});
```

### 9.4 Form Save Pattern (with loading state)

```javascript
$(document).on('click', '.btn-submit', function (e) {
  e.preventDefault();
  var $btn  = $(this);
  var $form = $btn.closest('form, .card-body');

  // Validate required fields
  var $empty = $form.find('[required]').filter(function () {
    return !String(this.value).trim();
  });
  if ($empty.length) {
    toastr.error('Please fill all required fields.', 'Validation Error');
    $empty.first().addClass('is-invalid').focus();
    setTimeout(function () { $empty.removeClass('is-invalid'); }, 3000);
    return;
  }

  // Simulate async save with loading state
  var originalText = $btn.html();
  $btn.html('<span class="spinner-border spinner-border-sm me-1"></span>Saving…').prop('disabled', true);

  setTimeout(function () {
    $btn.html(originalText).prop('disabled', false);
    toastr.success('Record saved successfully!', 'Saved');
  }, 800);
});
```

---

## ═══════════════════════════════════════════════
## SECTION 10 — COMPLETE script.js
## ═══════════════════════════════════════════════

`assets/js/script.js` — complete file, handles everything across all pages:

```javascript
'use strict';

/* ══════════════════════════════════════
   1. TOASTR CONFIG
══════════════════════════════════════ */
toastr.options = {
  closeButton: true, progressBar: true, positionClass: 'toast-top-right',
  timeOut: 4000, extendedTimeOut: 1500, newestOnTop: true, maxOpened: 5,
  showMethod: 'fadeIn', hideMethod: 'fadeOut', tapToDismiss: true
};

/* ══════════════════════════════════════
   2. PAGE LOADER
══════════════════════════════════════ */
window.addEventListener('load', function () {
  var loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(function () { loader.style.display = 'none'; }, 400);
  }
});

/* ══════════════════════════════════════
   3. DOM READY
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* ─── 3.1 Sidebar Toggle (mini) ─── */
  var SIDEBAR_KEY = 'erpSidebarMini';
  var body        = document.body;

  function applySidebarState() {
    if (localStorage.getItem(SIDEBAR_KEY) === 'true') {
      body.classList.add('mini-sidebar');
    }
  }
  applySidebarState();

  var toggleBtn = document.getElementById('toggle-sidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      body.classList.toggle('mini-sidebar');
      localStorage.setItem(SIDEBAR_KEY, body.classList.contains('mini-sidebar'));
    });
  }

  /* ─── 3.2 Mobile Sidebar ─── */
  var mobileBtn = document.getElementById('mobile-menu-btn');
  var overlay   = document.getElementById('sidebar-overlay');
  var sidebar   = document.getElementById('sidebar');

  function openMobileSidebar() {
    body.classList.add('sidebar-open');
    if (overlay) overlay.classList.add('active');
  }
  function closeMobileSidebar() {
    body.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('active');
  }
  if (mobileBtn) mobileBtn.addEventListener('click', openMobileSidebar);
  if (overlay)   overlay.addEventListener('click', closeMobileSidebar);

  /* ─── 3.3 Sidebar Submenu ─── */
  document.querySelectorAll('.sidebar .submenu > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var li   = this.parentElement;
      var ul   = li.querySelector('ul');
      var open = li.classList.contains('open');

      // Close all siblings
      document.querySelectorAll('.sidebar .submenu.open').forEach(function (openLi) {
        if (openLi !== li) {
          openLi.classList.remove('open');
          openLi.querySelector('a').setAttribute('aria-expanded', 'false');
          var openUl = openLi.querySelector('ul');
          if (openUl) { openUl.style.maxHeight = null; openUl.style.opacity = '0'; }
        }
      });

      if (open) {
        li.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
        if (ul) { ul.style.maxHeight = null; ul.style.opacity = '0'; }
      } else {
        li.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        if (ul) {
          ul.style.maxHeight = ul.scrollHeight + 'px';
          ul.style.opacity   = '1';
        }
      }
    });
  });

  /* ─── 3.4 Active Menu Detection ─── */
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  var currentHash = window.location.hash;
  document.querySelectorAll('#sidebar a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    var hrefFile = href.split('#')[0];
    if (hrefFile && hrefFile === currentFile) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
      var parentLi = a.closest('.submenu');
      if (parentLi) {
        parentLi.classList.add('open');
        var parentA = parentLi.querySelector(':scope > a');
        var ul      = parentLi.querySelector('ul');
        if (parentA) parentA.setAttribute('aria-expanded', 'true');
        if (ul) { ul.style.maxHeight = ul.scrollHeight + 'px'; ul.style.opacity = '1'; }
      }
    }
  });

  /* ─── 3.5 Dark Mode ─── */
  var DARK_KEY   = 'erpDarkMode';
  var darkBtn    = document.getElementById('dark-mode-btn');
  var darkIcon   = document.getElementById('dark-icon');

  function setDarkMode(on) {
    if (on) {
      body.setAttribute('data-theme', 'dark');
      if (darkIcon) { darkIcon.classList.remove('bi-moon-stars'); darkIcon.classList.add('bi-sun'); }
      localStorage.setItem(DARK_KEY, 'true');
    } else {
      body.removeAttribute('data-theme');
      if (darkIcon) { darkIcon.classList.remove('bi-sun'); darkIcon.classList.add('bi-moon-stars'); }
      localStorage.removeItem(DARK_KEY);
    }
  }
  setDarkMode(localStorage.getItem(DARK_KEY) === 'true');
  if (darkBtn) {
    darkBtn.addEventListener('click', function () {
      var isDark = body.getAttribute('data-theme') === 'dark';
      setDarkMode(!isDark);
      toastr.info((isDark ? 'Light' : 'Dark') + ' mode enabled.', 'Theme');
    });
  }

  /* ─── 3.6 DataTables ─── */
  if (typeof $.fn !== 'undefined' && $.fn.DataTable) {
    initDataTables();
  }

  /* ─── 3.7 Select2 ─── */
  if (typeof $.fn !== 'undefined' && $.fn.select2) {
    $('.select2').select2({ theme: 'bootstrap-5', width: '100%' });
  }

  /* ─── 3.8 Flatpickr ─── */
  if (typeof flatpickr !== 'undefined') {
    document.querySelectorAll('.flatpickr-date').forEach(function (el) {
      flatpickr(el, { dateFormat: 'd-m-Y', allowInput: true });
    });
    document.querySelectorAll('.flatpickr-datetime').forEach(function (el) {
      flatpickr(el, { enableTime: true, dateFormat: 'd-m-Y H:i' });
    });
    document.querySelectorAll('.flatpickr-range').forEach(function (el) {
      flatpickr(el, { mode: 'range', dateFormat: 'd-m-Y' });
    });
  }

  /* ─── 3.9 Tooltips ─── */
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
    new bootstrap.Tooltip(el, { trigger: 'hover' });
  });

  /* ─── 3.10 SlimScroll (sidebar) ─── */
  if (typeof $.fn !== 'undefined' && $.fn.slimScroll) {
    $('.slimscroll').slimScroll({
      height: 'calc(100vh - 60px)', width: '100%',
      position: 'right', size: '4px', color: '#FF9F43', opacity: 0.6
    });
  }

  /* ─── 3.11 Counter Animation ─── */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target   = parseFloat(el.getAttribute('data-count'));
    var prefix   = el.getAttribute('data-prefix') || '';
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start    = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value    = progress * target;
      el.textContent = prefix + (Number.isInteger(target)
        ? Math.floor(value).toLocaleString()
        : value.toFixed(2)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  /* ─── 3.12 Filter Panel Toggle ─── */
  $(document).on('click', '#btn-toggle-filter', function () {
    var $panel = $(this).closest('.card-body').find('#filter-panel');
    $panel.toggleClass('d-none');
    $(this).toggleClass('active');
  });

  /* ─── 3.13 Notification Populator ─── */
  var notifData = [
    { icon: 'bi-cart3',      color: '#28C76F', msg: 'New sale #INV-2024 created.',      time: '2 min ago' },
    { icon: 'bi-box-seam',   color: '#FF9F43', msg: 'iPhone 15 Pro stock is low (3).',  time: '15 min ago' },
    { icon: 'bi-person-plus',color: '#00CFE8', msg: 'New customer John Smith added.',   time: '1 hr ago' },
    { icon: 'bi-receipt',    color: '#EA5455', msg: 'Invoice #2048 is overdue.',        time: '3 hr ago' },
    { icon: 'bi-arrow-left-right', color: '#7367F0', msg: 'Transfer TRF-008 completed.', time: '5 hr ago' }
  ];
  var $notifList = $('#notif-list');
  if ($notifList.length) {
    notifData.forEach(function (n) {
      $notifList.append(
        '<div class="notif-item">' +
          '<span class="notif-icon" style="background:' + n.color + '20;color:' + n.color + '">' +
            '<i class="bi ' + n.icon + '"></i>' +
          '</span>' +
          '<div class="notif-body"><p>' + n.msg + '</p><span>' + n.time + '</span></div>' +
        '</div>'
      );
    });
  }
  $('#clear-all-notif').on('click', function (e) {
    e.preventDefault();
    $notifList.empty();
    $('#notif-count').text('0');
    toastr.info('All notifications cleared.', 'Notifications');
  });

  /* ─── 3.14 Language Switcher ─── */
  $(document).on('click', '.lang-dropdown .dropdown-item', function (e) {
    e.preventDefault();
    var flag = $(this).data('flag');
    var lang = $(this).data('lang');
    $('#active-flag').attr('src', 'https://flagcdn.com/w20/' + flag + '.png');
    $(this).closest('.lang-dropdown').find('button').contents().last().replaceWith(' ' + lang);
    toastr.info('Language set to ' + $(this).text().trim(), 'Language');
  });

  /* ─── 3.15 Status Toggle Toastr ─── */
  $(document).on('change', '.status-toggle', function () {
    toastr.info('Status changed to ' + (this.checked ? 'Active' : 'Inactive') + '.', 'Updated');
  });

  /* ─── 3.16 Image Upload Preview ─── */
  $(document).on('change', '.img-upload-input', function () {
    var $wrap = $(this).closest('.img-upload-zone').find('.img-preview-wrap');
    Array.from(this.files).forEach(function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $wrap.append(
          '<div class="preview-thumb">' +
            '<img src="' + e.target.result + '" alt="preview">' +
            '<button type="button" class="remove-thumb" aria-label="Remove"><i class="bi bi-x-lg"></i></button>' +
          '</div>'
        );
      };
      reader.readAsDataURL(file);
    });
    this.value = '';
  });
  $(document).on('click', '.remove-thumb', function () {
    $(this).closest('.preview-thumb').remove();
  });

  /* ─── 3.17 Form Save (generic) ─── */
  $(document).on('click', '.btn-submit', function (e) {
    e.preventDefault();
    var $btn  = $(this);
    var $form = $btn.closest('form, .card-body');
    var $empty = $form.find('[required]').filter(function () {
      return !String($(this).val() || '').trim();
    });
    if ($empty.length) {
      toastr.error('Please fill all required fields.', 'Validation Error');
      $empty.first().addClass('is-invalid').focus();
      setTimeout(function () { $form.find('.is-invalid').removeClass('is-invalid'); }, 3000);
      return;
    }
    var orig = $btn.html();
    $btn.html('<span class="spinner-border spinner-border-sm me-1"></span>Saving…').prop('disabled', true);
    setTimeout(function () {
      $btn.html(orig).prop('disabled', false);
      toastr.success('Record saved successfully!', 'Saved');
    }, 900);
  });

  /* ─── 3.18 Delete Confirm ─── */
  $(document).on('click', '.confirm-delete', function (e) {
    e.preventDefault();
    var $row = $(this).closest('tr');
    Swal.fire({
      title: 'Delete this record?',
      text:  'This action cannot be undone.',
      icon:  'warning',
      showCancelButton: true,
      confirmButtonColor: '#EA5455',
      cancelButtonColor:  '#637381',
      confirmButtonText:  'Yes, delete!',
      customClass: { confirmButton: 'btn btn-danger me-2', cancelButton: 'btn btn-secondary' },
      buttonsStyling: false
    }).then(function (r) {
      if (r.isConfirmed) {
        $row.addClass('animate__animated animate__fadeOut');
        setTimeout(function () { $row.remove(); }, 400);
        toastr.success('Record deleted successfully.', 'Deleted');
      } else if (r.dismiss === Swal.DismissReason.cancel) {
        toastr.info('Delete cancelled.', 'Cancelled');
      }
    });
  });

  /* ─── 3.19 Session Expiry Warning ─── */
  setTimeout(function () {
    toastr.warning('Your session will expire in 5 minutes.', 'Session Warning');
  }, 55 * 60 * 1000);

  /* ─── 3.20 Bulk Actions ─── */
  // (Defined in Section 8.4 — included here as part of script.js)

}); // end DOMContentLoaded
```

---

## ═══════════════════════════════════════════════
## SECTION 11 — APEXCHARTS CONFIGS (EXACT)
## ═══════════════════════════════════════════════

Use these exact config objects. Do not invent chart configs.

### 11.1 Sales vs Purchase Area Chart (Dashboard)

```javascript
var salesPurchaseChart = new ApexCharts(document.querySelector('#sales-purchase-chart'), {
  series: [
    {
      name: 'Sales',
      data: [42000, 56000, 38000, 72000, 48000, 65000, 54000, 78000, 62000, 85000, 71000, 93000]
    },
    {
      name: 'Purchase',
      data: [28000, 34000, 25000, 41000, 31000, 38000, 29000, 47000, 36000, 52000, 44000, 58000]
    }
  ],
  chart:   { type: 'area', height: 300, toolbar: { show: false }, zoom: { enabled: false } },
  colors:  ['#28C76F', '#EA5455'],
  fill:    { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
  dataLabels: { enabled: false },
  stroke:  { curve: 'smooth', width: 2 },
  xaxis:   { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
             labels: { style: { colors: '#637381' } } },
  yaxis:   { labels: { formatter: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; },
             style: { colors: '#637381' } } },
  tooltip: { y: { formatter: function (v) { return '$' + v.toLocaleString(); } } },
  legend:  { position: 'top', horizontalAlign: 'right' },
  grid:    { borderColor: '#E8EBED', strokeDashArray: 4 }
});
salesPurchaseChart.render();
```

### 11.2 Revenue by Category Donut (Dashboard)

```javascript
var categoryChart = new ApexCharts(document.querySelector('#category-donut-chart'), {
  series: [35, 25, 20, 12, 8],
  chart:  { type: 'donut', height: 280 },
  labels: ['Electronics', 'Clothing', 'Furniture', 'Food & Bev', 'Other'],
  colors: ['#FF9F43', '#28C76F', '#00CFE8', '#7367F0', '#EA5455'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '65%',
    labels: { show: true,
      total: { show: true, label: 'Total Revenue',
        formatter: function () { return '$385K'; } } } } } },
  tooltip: { y: { formatter: function (v) { return v + '%'; } } }
});
categoryChart.render();
```

### 11.3 Top Selling Products Bar (Dashboard)

```javascript
var topProductsChart = new ApexCharts(document.querySelector('#top-products-chart'), {
  series: [{ name: 'Units Sold', data: [320, 290, 245, 210, 185, 160, 140] }],
  chart:  { type: 'bar', height: 260, toolbar: { show: false } },
  colors: ['#FF9F43'],
  plotOptions: { bar: { borderRadius: 6, horizontal: true, dataLabels: { position: 'top' } } },
  dataLabels:  { enabled: true, formatter: function (v) { return v + ' units'; },
                 offsetX: 5, style: { colors: ['#637381'], fontSize: '11px' } },
  xaxis: { categories: ['iPhone 15 Pro','MacBook Air','Samsung TV','AirPods Pro',
                         'iPad Mini','Sony Headphones','Dell Monitor'],
           labels: { style: { colors: '#637381' } } },
  grid:  { borderColor: '#E8EBED' }
});
topProductsChart.render();
```

### 11.4 Monthly Revenue Line (Reports)

```javascript
var revenueChart = new ApexCharts(document.querySelector('#monthly-revenue-chart'), {
  series: [{ name: 'Revenue', data: [93000,85000,71000,62000,78000,54000,65000,48000,72000,38000,56000,42000] }],
  chart:  { type: 'line', height: 300, toolbar: { show: true }, zoom: { enabled: true } },
  colors: ['#FF9F43'],
  stroke: { curve: 'smooth', width: 3 },
  markers:{ size: 5, colors: ['#fff'], strokeColors: '#FF9F43', strokeWidth: 2 },
  xaxis:  { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            labels: { style: { colors: '#637381' } } },
  yaxis:  { labels: { formatter: function (v) { return '$' + (v/1000).toFixed(0) + 'k'; } } },
  tooltip:{ y: { formatter: function (v) { return '$' + v.toLocaleString(); } } },
  grid:   { borderColor: '#E8EBED', strokeDashArray: 4 }
});
revenueChart.render();
```

### 11.5 Expense Breakdown Donut (Finance)

```javascript
var expenseChart = new ApexCharts(document.querySelector('#expense-chart'), {
  series: [28, 22, 18, 15, 10, 7],
  chart:  { type: 'donut', height: 260 },
  labels: ['Salaries','Rent','Utilities','Marketing','Logistics','Other'],
  colors: ['#1B2850','#FF9F43','#28C76F','#EA5455','#00CFE8','#7367F0'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '60%' } } }
});
expenseChart.render();
```

---

## ═══════════════════════════════════════════════
## SECTION 12 — REALISTIC SAMPLE DATA
## ═══════════════════════════════════════════════

Use exactly this data set across all pages for cross-page consistency.

### Products (inventory.html, addproduct, barcode)
| SKU | Name | Category | Brand | Price | Stock | Status |
|---|---|---|---|---|---|---|
| PRD-001 | iPhone 15 Pro 256GB | Electronics | Apple | $999.00 | 45 | Active |
| PRD-002 | MacBook Air M2 | Electronics | Apple | $1,299.00 | 12 | Active |
| PRD-003 | Samsung 65" QLED TV | Electronics | Samsung | $849.00 | 8 | Low |
| PRD-004 | Sony WH-1000XM5 | Electronics | Sony | $349.00 | 3 | Low |
| PRD-005 | Dell UltraSharp 27" | Electronics | Dell | $499.00 | 22 | Active |
| PRD-006 | Levi's 501 Jeans | Clothing | Levi's | $89.00 | 150 | Active |
| PRD-007 | Nike Air Max 270 | Footwear | Nike | $129.00 | 75 | Active |
| PRD-008 | Ergonomic Office Chair | Furniture | Herman Miller | $699.00 | 18 | Active |
| PRD-009 | AirPods Pro (2nd Gen) | Electronics | Apple | $249.00 | 0 | Out of Stock |
| PRD-010 | iPad Mini 6 | Electronics | Apple | $499.00 | 31 | Active |

### Customers (customerlist.html, sales, CRM)
| Code | Name | Email | Phone | Country | Orders | Spent |
|---|---|---|---|---|---|---|
| CUS-001 | James Anderson | j.anderson@email.com | +1 555-2301 | USA | 24 | $18,450 |
| CUS-002 | Sarah Mitchell | s.mitchell@email.com | +44 7700-9001 | UK | 18 | $12,800 |
| CUS-003 | Li Wei | l.wei@email.com | +86 138-0001 | China | 31 | $24,600 |
| CUS-004 | Maria Santos | m.santos@email.com | +55 11-9901 | Brazil | 9 | $6,200 |
| CUS-005 | Raj Patel | r.patel@email.com | +91 98001-0001 | India | 15 | $9,100 |
| CUS-006 | Emma Johnson | e.johnson@email.com | +1 555-3401 | USA | 7 | $4,750 |
| CUS-007 | Carlos Ruiz | c.ruiz@email.com | +34 612-001 | Spain | 11 | $7,320 |
| CUS-008 | Aisha Okafor | a.okafor@email.com | +234 803-001 | Nigeria | 5 | $3,100 |

### Suppliers (supplierlist.html, purchase)
| Code | Name | Email | Phone | Country | Balance |
|---|---|---|---|---|---|
| SUP-001 | TechSource Global | supply@techsource.com | +1 800-4501 | USA | $45,200 |
| SUP-002 | Asia Electronics Ltd | ae@asiaelec.com | +852 3900-001 | Hong Kong | $32,800 |
| SUP-003 | EuroFashion SA | orders@eurofashion.eu | +33 1-4001 | France | $18,600 |
| SUP-004 | Furniture Direct | fd@furnituredirect.co | +44 2000-001 | UK | $27,400 |
| SUP-005 | Nike Distribution | nd@nike-dist.com | +1 503-0001 | USA | $15,900 |

### Sales Invoices (sales.html)
| Invoice | Customer | Date | Method | Status | Total | Paid | Due |
|---|---|---|---|---|---|---|---|
| INV-2048 | James Anderson | 05-May-2025 | Card | Paid | $1,998.00 | $1,998.00 | $0.00 |
| INV-2047 | Sarah Mitchell | 04-May-2025 | Cash | Paid | $349.00 | $349.00 | $0.00 |
| INV-2046 | Li Wei | 03-May-2025 | Bank | Pending | $2,598.00 | $1,000.00 | $1,598.00 |
| INV-2045 | Maria Santos | 02-May-2025 | Cash | Overdue | $178.00 | $0.00 | $178.00 |
| INV-2044 | Raj Patel | 01-May-2025 | Card | Paid | $499.00 | $499.00 | $0.00 |
| INV-2043 | Emma Johnson | 30-Apr-2025 | Bank | Cancelled | $699.00 | $0.00 | $699.00 |
| INV-2042 | Carlos Ruiz | 29-Apr-2025 | Cash | Paid | $258.00 | $258.00 | $0.00 |
| INV-2041 | Aisha Okafor | 28-Apr-2025 | Card | Paid | $129.00 | $129.00 | $0.00 |

### Employees (hrms.html)
| ID | Name | Department | Role | Email | Phone | Joined | Status |
|---|---|---|---|---|---|---|---|
| EMP-001 | Michael Torres | Engineering | Senior Dev | m.torres@erp.com | +1 555-1001 | 01-Jan-2022 | Active |
| EMP-002 | Jennifer Lee | Sales | Sales Manager | j.lee@erp.com | +1 555-1002 | 15-Mar-2021 | Active |
| EMP-003 | David Kim | Finance | Accountant | d.kim@erp.com | +1 555-1003 | 10-Jun-2023 | Active |
| EMP-004 | Priya Sharma | HR | HR Executive | p.sharma@erp.com | +91 9800-1004 | 20-Aug-2022 | Active |
| EMP-005 | Tom Williams | Warehouse | Manager | t.williams@erp.com | +1 555-1005 | 05-Nov-2020 | Active |
| EMP-006 | Fatima Al-Zahra | Marketing | Digital Lead | f.alzahra@erp.com | +971 50-1006 | 01-Feb-2024 | Active |

### CRM Leads (crm.html)
| Name | Company | Email | Source | Stage | Value |
|---|---|---|---|---|---|
| Robert Green | GreenTech Inc | r.green@gt.com | Website | Qualified | $25,000 |
| Anna Schmidt | Schmidt GmbH | a.schmidt@sg.de | LinkedIn | Proposal | $48,000 |
| Chen Wei | Wei Corp | c.wei@weicorp.cn | Referral | Negotiation | $72,000 |
| Sophia Brown | BrownCo | s.brown@bc.com | Cold Call | Prospecting | $15,000 |
| Hassan Ali | Ali Trading | h.ali@alt.ae | Email | Closed Won | $38,500 |

---

## ═══════════════════════════════════════════════
## SECTION 13 — PAGE-SPECIFIC CONTENT SPECS
## ═══════════════════════════════════════════════

### index.html — Dashboard
- 4× `.dash-widget` KPI cards (row 1 — see colors in Section 4)
- 4× `.dash-count` colored cards (row 2): Customers 100 / Suppliers 42 / Purchase Invoices 318 / Sales Invoices 527
- Chart row: `#sales-purchase-chart` (col-lg-7) + "Recently Added Products" DataTable (col-lg-5)
- `#top-products-chart` bar chart (col-lg-8) + `#category-donut-chart` (col-lg-4)
- "Expired Products" DataTable (full width, bottom)
- KPI counters use `data-count` + `data-prefix="$"` or no prefix

### pos.html — STANDALONE (no sidebar, no page-wrapper)
POS uses its own full-screen layout. DO NOT include sidebar.

```
.pos-wrapper
  .pos-header  (logo · global search · user avatar only)
  .pos-body
    .pos-left  (col-lg-8)
      Category tabs (All · Electronics · Clothing · Footwear · Furniture)
      Product card grid — each card: image · name · price · [Add] btn
      Order list table: Product · Qty (− qty +) · Price · Subtotal · [×]
    .pos-right (col-lg-4)
      Customer select (Select2)
      Order totals card (Sub Total / Discount / Tax / Grand Total)
      Payment method tabs (Cash · Card · Bank)
      Numpad calculator (.numpad-grid — 3×4 grid of buttons: 0–9 · . · ⌫)
      [Hold] [Clear] [Pay Now] buttons
```

**POS JavaScript (complete — no hallucination):**
```javascript
// POS state
var posState = {
  items:    [],   // { id, name, price, qty }
  discount: 0,
  taxRate:  0.08,
  cash:     0
};

function posAddItem(id, name, price) {
  var existing = posState.items.find(function(i){ return i.id === id; });
  if (existing) { existing.qty++; }
  else { posState.items.push({ id: id, name: name, price: price, qty: 1 }); }
  posRender();
}
function posChangeQty(id, delta) {
  var item = posState.items.find(function(i){ return i.id === id; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) posState.items = posState.items.filter(function(i){ return i.id !== id; });
  posRender();
}
function posRemoveItem(id) {
  posState.items = posState.items.filter(function(i){ return i.id !== id; });
  posRender();
}
function posSubtotal() {
  return posState.items.reduce(function(s, i){ return s + i.price * i.qty; }, 0);
}
function posRender() {
  var sub   = posSubtotal();
  var disc  = posState.discount;
  var tax   = (sub - disc) * posState.taxRate;
  var total = sub - disc + tax;
  var change= posState.cash - total;

  $('#pos-order-body').empty();
  posState.items.forEach(function(item) {
    $('#pos-order-body').append(
      '<tr>' +
        '<td>' + item.name + '</td>' +
        '<td><button class="btn btn-sm btn-outline-secondary pos-qty-btn" data-id="'+item.id+'" data-d="-1">−</button>' +
        ' <span class="mx-2">' + item.qty + '</span> ' +
        '<button class="btn btn-sm btn-outline-secondary pos-qty-btn" data-id="'+item.id+'" data-d="1">+</button></td>' +
        '<td>$' + item.price.toFixed(2) + '</td>' +
        '<td>$' + (item.price * item.qty).toFixed(2) + '</td>' +
        '<td><button class="btn btn-sm btn-link text-danger pos-remove-btn" data-id="'+item.id+'"><i class="bi bi-x-lg"></i></button></td>' +
      '</tr>'
    );
  });

  $('#pos-subtotal').text('$' + sub.toFixed(2));
  $('#pos-discount').text('−$' + disc.toFixed(2));
  $('#pos-tax').text('$' + tax.toFixed(2));
  $('#pos-total').text('$' + total.toFixed(2));
  $('#pos-change').text('$' + Math.max(0, change).toFixed(2));
}

// Numpad
var numpadBuffer = '';
$(document).on('click', '.numpad-btn', function() {
  var v = $(this).data('val');
  if (v === 'backspace') { numpadBuffer = numpadBuffer.slice(0,-1); }
  else if (v === '.') { if (!numpadBuffer.includes('.')) numpadBuffer += '.'; }
  else { numpadBuffer += v; }
  var parsed = parseFloat(numpadBuffer) || 0;
  posState.cash = parsed;
  $('#pos-cash-display').val(numpadBuffer ? '$' + numpadBuffer : '');
  posRender();
});

// Qty buttons (delegated)
$(document).on('click', '.pos-qty-btn', function() {
  posChangeQty($(this).data('id'), parseInt($(this).data('d')));
});
$(document).on('click', '.pos-remove-btn', function() {
  posRemoveItem($(this).data('id'));
});

// Add product
$(document).on('click', '.pos-add-btn', function() {
  posAddItem($(this).data('id'), $(this).data('name'), parseFloat($(this).data('price')));
  toastr.success($(this).data('name') + ' added to order.', 'POS');
});

// Pay Now
$(document).on('click', '#pos-pay-btn', function() {
  if (posState.items.length === 0) {
    toastr.error('No items in order.', 'POS Error'); return;
  }
  var total = posSubtotal() * (1 + posState.taxRate) - posState.discount;
  if (posState.cash < total) {
    toastr.warning('Cash tendered is less than total.', 'Payment'); return;
  }
  Swal.fire({ title: 'Payment Successful!',
    html: '<strong>Total: $' + total.toFixed(2) + '</strong><br>Change: $' + (posState.cash - total).toFixed(2),
    icon: 'success', confirmButtonColor: '#28C76F', confirmButtonText: 'Print Receipt'
  }).then(function() {
    posState.items = []; posState.cash = 0; numpadBuffer = '';
    posRender(); toastr.success('Sale completed!', 'POS');
  });
});

// Hold
$(document).on('click', '#pos-hold-btn', function() {
  if (posState.items.length === 0) return;
  toastr.info('Order placed on hold.', 'POS');
});

// Clear
$(document).on('click', '#pos-clear-btn', function() {
  if (posState.items.length === 0) return;
  Swal.fire({ title: 'Clear order?', icon: 'warning', showCancelButton: true,
    confirmButtonColor: '#EA5455', confirmButtonText: 'Clear'
  }).then(function(r) {
    if (r.isConfirmed) { posState.items=[]; posState.cash=0; numpadBuffer=''; posRender(); }
  });
});

posRender(); // initial render
```

### hrms.html — 3 Bootstrap nav-tabs
- **Employees tab:** DataTable with employees sample data (Section 12)
- **Attendance tab:** Month select (Flatpickr month mode) + grid table showing per-day attendance for each employee. Key cells: `P`=Present (green), `A`=Absent (red), `L`=Late (yellow), `H`=Holiday (grey)
- **Payroll tab:** DataTable: Employee | Base Salary | Bonus | Deductions | Net Pay | Month | Status | Action

### crm.html — 3 Bootstrap nav-tabs
- **Leads tab:** DataTable with CRM sample data
- **Pipeline tab:** 5-column Kanban board (no drag lib — visual only using Bootstrap columns)
  - Columns: Prospecting · Qualification · Proposal · Negotiation · Closed Won
  - Each deal card: deal name + company + `$value` badge + owner initials circle + stage badge
- **Contacts tab:** DataTable (same customer data)

### finance.html — 3 Bootstrap nav-tabs: Invoices · Payments · Expenses
- Expenses tab includes `#expense-chart` donut (Section 11.5)

### reports.html
- Filter bar: Module dropdown · Date range (flatpickr-range) · Warehouse · [Generate] [Reset] [Export PDF] [Export Excel]
- 2×2 chart grid: `#sales-purchase-chart` · `#monthly-revenue-chart` · `#category-donut-chart` · `#top-products-chart`
- Summary DataTable below (aggregated report data)

### settings.html — 6 Bootstrap nav-tabs

**Tab 1: General**
Form fields: Site Name · Email · Phone · Address · Timezone (Select2) · Language (Select2) · Currency Symbol · Logo upload · Favicon upload

**Tab 2: Email**
SMTP: Host · Port · Encryption (Select2: TLS/SSL/None) · Username · Password (eye toggle) · From Name · From Email
[Test Connection] button → `toastr.success('SMTP connection successful.', 'Test Email')`

**Tab 3: Payment**
Toggle cards for: Stripe · PayPal · Bank Transfer · Cash on Delivery
Each card: enabled toggle + (when enabled) key/secret fields that slide open

**Tab 4: Tax & Currency**
DataTable of tax rates (Name · Rate % · Action) + [Add Tax Rate] button → inline row append
Currency: Symbol · Position (Before/After select) · Decimal Places

**Tab 5: Permissions**
Role selector (Admin / Manager / Cashier / Staff)
Permission matrix table:
- Rows: Dashboard · Sales · Purchase · Inventory · Expense · Reports · Settings · Users
- Columns: View · Create · Edit · Delete · Export
- Each cell: checkbox
- [Select All Row] button per row · [Select All Column] header checkboxes

**Permissions JS:**
```javascript
// Select all in a row
$(document).on('click', '.perm-row-all', function() {
  $(this).closest('tr').find('.perm-cb').prop('checked', this.checked);
});
// Select all in a column
$(document).on('click', '.perm-col-all', function() {
  var colIdx = $(this).closest('th').index();
  $('#permissions-table tbody tr').each(function() {
    $(this).find('td').eq(colIdx).find('.perm-cb').prop('checked', true);
  });
});
// Save permissions
$(document).on('click', '#save-permissions', function() {
  toastr.success('Permissions saved successfully!', 'Permissions');
});
```

**Tab 6: Preferences**
- Dark mode toggle (`.status-toggle` connected to `setDarkMode()`)
- Sidebar default state toggle (mini / full)
- Notification preferences: checkboxes for Low Stock / New Order / Overdue Invoice / System Alerts
- [Save Preferences] → `toastr.success`

### profile.html
- Banner: `linear-gradient(135deg, #EA5455 0%, #FF9F43 100%)`, height 120px, border-radius bottom 0
- Avatar: 120px circle, border: 4px solid white, margin-top: −60px, box-shadow, upload button overlay
- Two-column layout:
  - **Left:** Personal Info form (Full Name · Email · Phone · DOB (flatpickr-date) · Department · Role · Bio textarea)
  - **Right:** Change Password form (Current Password · New Password · Confirm Password — all with eye toggle + strength meter)

**Password strength meter JS:**
```javascript
$('#new-password').on('input', function() {
  var v = this.value;
  var strength = 0;
  if (v.length >= 8)              strength++;
  if (/[A-Z]/.test(v))           strength++;
  if (/[0-9]/.test(v))           strength++;
  if (/[^A-Za-z0-9]/.test(v))    strength++;
  var labels  = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  var colors  = ['', '#EA5455', '#FF9F43', '#00CFE8', '#28C76F'];
  var $bar    = $('#pwd-strength-bar');
  var $label  = $('#pwd-strength-label');
  $bar.css({ width: (strength * 25) + '%', background: colors[strength] });
  $label.text(labels[strength]).css('color', colors[strength]);
});
$('#confirm-password').on('input', function() {
  var match = this.value === $('#new-password').val();
  $(this).toggleClass('is-invalid', !match).toggleClass('is-valid', match);
  if (!match) toastr.error('Passwords do not match.', 'Validation');
});
```

### barcode.html
Load JsBarcode on this page only:
```html
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
```

Layout:
- Control card: Product select (Select2) · Barcode format (Code128 / EAN-13 / QR Code select) · Quantity (1–100 number input) · [Generate] [Print] buttons
- Output grid `.barcode-grid` — renders N barcode items

**Barcode JS (complete):**
```javascript
$(document).on('click', '#generate-barcode', function() {
  var product = $('#barcode-product').val();
  var label   = $('#barcode-product option:selected').text();
  var sku     = $('#barcode-product option:selected').data('sku') || 'PRD-001';
  var format  = $('#barcode-format').val() || 'CODE128';
  var qty     = parseInt($('#barcode-qty').val()) || 1;

  if (!product) { toastr.error('Please select a product.', 'Barcode'); return; }
  if (qty < 1 || qty > 100) { toastr.error('Quantity must be 1–100.', 'Barcode'); return; }

  var $grid = $('#barcode-grid').empty();
  for (var i = 0; i < qty; i++) {
    var id  = 'bc-' + i;
    var $el = $('<div class="barcode-item text-center p-2 border rounded m-1 d-inline-block">' +
                  '<svg id="' + id + '"></svg>' +
                  '<p class="small mb-0 mt-1">' + label + '</p>' +
                  '<p class="small text-muted">' + sku + '</p>' +
                '</div>');
    $grid.append($el);
    try {
      JsBarcode('#' + id, sku, {
        format: format, width: 1.5, height: 50,
        displayValue: false, background: '#ffffff', lineColor: '#000000'
      });
    } catch(e) {
      toastr.error('Unsupported barcode format for this value.', 'Barcode Error');
      $grid.empty(); return;
    }
  }
  toastr.success(qty + ' barcode' + (qty > 1 ? 's' : '') + ' generated.', 'Barcode');
});

$(document).on('click', '#print-barcode', function() {
  if (!$('#barcode-grid').children().length) {
    toastr.warning('Generate barcodes first.', 'Print'); return;
  }
  window.print();
});
```

---

## ═══════════════════════════════════════════════
## SECTION 14 — COMPLETE style.css
## ═══════════════════════════════════════════════

### 14.1 Page Loader

```css
#page-loader {
  position: fixed; inset: 0; background: #fff; z-index: 999999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.4s;
}
.loader-ring { display: inline-block; position: relative; width: 64px; height: 64px; }
.loader-ring div {
  box-sizing: border-box; display: block; position: absolute;
  width: 48px; height: 48px; margin: 8px;
  border: 4px solid var(--primary); border-radius: 50%;
  animation: loader-spin 1.2s cubic-bezier(0.5,0,0.5,1) infinite;
  border-color: var(--primary) transparent transparent transparent;
}
.loader-ring div:nth-child(1){ animation-delay: -0.45s; }
.loader-ring div:nth-child(2){ animation-delay: -0.30s; }
.loader-ring div:nth-child(3){ animation-delay: -0.15s; }
@keyframes loader-spin { 0%{ transform:rotate(0); } 100%{ transform:rotate(360deg); } }
```

### 14.2 Header

```css
#header {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--header-height); background: var(--card-bg);
  border-bottom: 1px solid var(--border-color); box-shadow: var(--shadow-sm);
  display: flex; align-items: center; z-index: 1000;
  transition: background 0.3s;
}
.header-left {
  width: var(--sidebar-width); min-width: var(--sidebar-width);
  height: 100%; padding: 0 20px;
  border-right: 1px solid var(--border-color);
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0; transition: width 0.25s ease, min-width 0.25s ease;
}
.logo-full  { width: 130px; display: block; }
.logo-small { width: 32px;  display: none; }

.sidebar-toggle-btn {
  background: none; border: none; cursor: pointer; padding: 4px;
  display: flex; flex-direction: column; gap: 4px;
}
.sidebar-toggle-btn span {
  display: block; width: 20px; height: 2px;
  background: var(--text-secondary); border-radius: 2px;
  transition: all 0.3s;
}
.header-right {
  flex: 1; display: flex; align-items: center;
  justify-content: flex-end; padding: 0 20px; gap: 8px;
}
.header-search {
  position: relative; display: flex; align-items: center;
}
.header-search input {
  width: 220px; padding: 6px 10px 6px 34px;
  border: 1px solid var(--border-color); border-radius: var(--radius-sm);
  font-size: 13px; background: var(--body-bg); color: var(--text-primary);
  transition: width 0.3s, box-shadow 0.2s;
}
.header-search input:focus { width: 280px; outline: none; box-shadow: 0 0 0 3px var(--primary-light); }
.header-search .bi-search {
  position: absolute; left: 10px; color: var(--text-muted); font-size: 13px;
}
.header-icon-btn {
  background: none; border: 1px solid var(--border-color); cursor: pointer;
  width: 36px; height: 36px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary); font-size: 16px; transition: all 0.2s;
}
.header-icon-btn:hover { background: var(--primary-light); color: var(--primary); border-color: var(--primary); }
.notif-badge {
  position: absolute; top: -4px; right: -4px;
  background: var(--color-danger); color: #fff;
  font-size: 9px; font-weight: 700; min-width: 16px; height: 16px;
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  padding: 0 3px;
}
.notif-panel {
  width: 340px; padding: 0; border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md); border-radius: var(--radius-md);
}
.notif-header { padding: 12px 16px; border-bottom: 1px solid var(--border-color); }
.notif-list   { max-height: 280px; overflow-y: auto; }
.notif-item   {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 10px 16px; border-bottom: 1px solid var(--border-color);
  transition: background 0.2s;
}
.notif-item:hover { background: var(--body-bg); }
.notif-icon  { width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
               display: flex; align-items: center; justify-content: center; font-size: 14px; }
.notif-body p   { font-size: 12px; margin: 0; color: var(--text-primary); }
.notif-body span{ font-size: 11px; color: var(--text-muted); }
.notif-footer { padding: 10px; text-align: center; border-top: 1px solid var(--border-color); }
.notif-footer a { font-size: 12px; color: var(--primary); font-weight: 600; text-decoration: none; }

.user-avatar-btn {
  background: none; border: none; cursor: pointer; padding: 0;
  position: relative; display: flex; align-items: center;
}
.user-avatar   { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.online-dot    {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--color-success); border: 2px solid #fff;
  position: absolute; bottom: 0; right: 0;
}
.user-menu-panel { width: 220px; padding: 0; border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.user-menu-header {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}
.user-menu-header img { width: 40px; height: 40px; border-radius: 50%; }
.user-menu-header strong { display: block; font-size: 13px; color: var(--text-primary); }
.user-menu-header span  { font-size: 11px; color: var(--text-muted); }
```

### 14.3 Sidebar

```css
#sidebar {
  position: fixed; top: var(--header-height); left: 0; bottom: 0;
  width: var(--sidebar-width); background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color); z-index: 999;
  overflow: hidden; transition: width 0.25s ease, left 0.3s ease;
}
.sidebar-inner { height: 100%; overflow-y: auto; }
.sidebar-menu  { padding: 16px 12px 60px; }
.sidebar-menu ul { list-style: none; padding: 0; margin: 0; }
.menu-title span {
  display: block; padding: 16px 8px 6px;
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1px; color: var(--text-muted);
}
.sidebar-menu li { margin-bottom: 2px; }
.sidebar-menu li > a {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: var(--radius-sm);
  color: var(--text-secondary); font-weight: 500; font-size: 13.5px;
  text-decoration: none; transition: all 0.2s; white-space: nowrap;
}
.sidebar-menu li > a:hover,
.sidebar-menu li > a.active {
  background: var(--active-item-bg); color: #fff;
}
.sidebar-menu li > a:hover .menu-icon,
.sidebar-menu li > a.active .menu-icon { color: #fff; }
.menu-icon  { font-size: 16px; flex-shrink: 0; width: 18px; color: var(--text-muted); transition: color 0.2s; }
.menu-arrow { margin-left: auto; font-size: 11px; transition: transform 0.25s; }
.submenu.open > a .menu-arrow { transform: rotate(90deg); }

/* Submenu ul */
.submenu ul {
  max-height: 0; opacity: 0; overflow: hidden;
  padding-left: 0; transition: max-height 0.25s ease, opacity 0.2s;
  background: var(--body-bg); border-radius: var(--radius-sm);
  margin-top: 2px;
}
.submenu.open ul { opacity: 1; /* max-height set by JS */ }
.submenu ul li a {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px 8px 38px; font-size: 13px;
  color: var(--text-secondary); border-radius: var(--radius-sm);
  position: relative;
}
.submenu ul li a::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%;
  border: 1px solid var(--text-muted);
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  transition: background 0.2s, border-color 0.2s;
}
.submenu ul li a:hover,
.submenu ul li a.active { color: var(--primary); }
.submenu ul li a.active::before,
.submenu ul li a:hover::before { background: var(--primary); border-color: var(--primary); }
```

### 14.4 Mini Sidebar

```css
.mini-sidebar .header-left  { width: var(--sidebar-mini-width); min-width: var(--sidebar-mini-width); justify-content: center; }
.mini-sidebar .logo-full    { display: none; }
.mini-sidebar .logo-small   { display: block; }
.mini-sidebar #sidebar      { width: var(--sidebar-mini-width); }
.mini-sidebar #page-wrapper { margin-left: var(--sidebar-mini-width); }
.mini-sidebar .menu-text,
.mini-sidebar .menu-arrow,
.mini-sidebar .menu-title   { display: none; }
.mini-sidebar .sidebar-menu li > a { justify-content: center; padding: 12px; }
.mini-sidebar .menu-icon    { width: auto; }
/* Expand on hover */
.mini-sidebar #sidebar:hover { width: var(--sidebar-width); box-shadow: var(--shadow-lg); }
.mini-sidebar #sidebar:hover .menu-text  { display: inline; }
.mini-sidebar #sidebar:hover .menu-arrow { display: inline; }
.mini-sidebar #sidebar:hover .menu-title { display: block; }
.mini-sidebar #sidebar:hover .sidebar-menu li > a { justify-content: flex-start; padding: 10px 12px; }
```

### 14.5 Page Wrapper & Content

```css
#page-wrapper {
  margin-left: var(--sidebar-width);
  padding-top: var(--header-height);
  min-height: 100vh; transition: margin-left 0.25s ease;
}
.content-wrapper { padding: 25px; }
.page-header {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px; margin-bottom: 24px;
}
.page-header h4 { font-size: 18px; font-weight: 700; color: var(--text-primary); margin: 0; }
.page-header h6 { font-size: 12px; color: var(--text-muted); margin: 0; }
```

### 14.6 Cards

```css
.card {
  background: var(--card-bg); border: 1px solid var(--border-color);
  border-radius: var(--radius-md); box-shadow: var(--shadow-sm);
  margin-bottom: 24px; transition: box-shadow 0.2s;
}
.card:hover { box-shadow: var(--shadow-md); }
.card-header { background: transparent; border-bottom: 1px solid var(--border-color); padding: 16px 20px; }
.card-body   { padding: 20px; }
.card-title  { font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0; }
```

### 14.7 Dash Widgets

```css
.dash-widget {
  background: var(--card-bg); border: 1px solid var(--border-color);
  border-radius: var(--radius-md); padding: 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: var(--shadow-sm); margin-bottom: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.dash-widget:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.dash-widget-icon {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.dash-widget-info h5 { font-size: 22px; font-weight: 800; color: var(--text-primary); margin: 0 0 4px; }
.dash-widget-info p  { font-size: 12px; color: var(--text-muted); margin: 0; }

.dash-count {
  border-radius: var(--radius-md); padding: 20px;
  display: flex; align-items: center; justify-content: space-between;
  color: #fff; margin-bottom: 24px; cursor: default;
  transition: transform 0.2s, box-shadow 0.2s;
}
.dash-count:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.dash-count-info h4 { font-size: 28px; font-weight: 800; margin: 0 0 4px; }
.dash-count-info p  { font-size: 12px; margin: 0; opacity: 0.85; }
.dash-count-icon    { font-size: 40px; opacity: 0.7; transition: transform 0.3s; }
.dash-count:hover .dash-count-icon { transform: scale(1.18); }
```

### 14.8 Buttons

```css
.btn-primary-custom, .btn-submit {
  background: var(--primary); color: #fff; border: none;
  padding: 9px 22px; border-radius: var(--radius-sm);
  font-weight: 600; font-size: 14px; transition: background 0.2s, transform 0.1s;
}
.btn-submit:hover, .btn-primary-custom:hover { background: var(--primary-dark); color: #fff; }
.btn-cancel {
  background: #637381; color: #fff; border: none;
  padding: 9px 22px; border-radius: var(--radius-sm); font-weight: 600;
}
.btn-cancel:hover { background: #4a555f; color: #fff; }
.btn-filter {
  background: var(--primary); color: #fff; border: none;
  width: 36px; height: 36px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.btn-filter.active { background: var(--color-danger); }
.btn-filter:hover  { background: var(--primary-dark); }
```

### 14.9 Tables & Actions

```css
.table         { border-collapse: separate; border-spacing: 0; }
.table thead th {
  background: var(--table-head-bg); color: var(--text-primary);
  font-weight: 600; font-size: 13px; padding: 12px 10px;
  border-bottom: 2px solid var(--border-color); white-space: nowrap;
}
.table tbody td { padding: 10px; color: var(--text-secondary); font-size: 13px;
                  border-bottom: 1px solid var(--border-color); vertical-align: middle; }
.table tbody tr { transition: background 0.15s; }
.table tbody tr:hover { background: rgba(255,159,67,0.04); }

.action-btns  { display: flex; gap: 4px; align-items: center; }
.action-btn   {
  width: 28px; height: 28px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 13px; text-decoration: none; transition: all 0.2s;
  border: none; cursor: pointer;
}
.btn-view   { background: rgba(0,207,232,.12);  color: var(--color-info); }
.btn-edit   { background: rgba(255,159,67,.12); color: var(--primary); }
.btn-delete { background: rgba(234,84,85,.12);  color: var(--color-danger); }
.btn-view:hover   { background: var(--color-info);    color: #fff; }
.btn-edit:hover   { background: var(--primary);       color: #fff; }
.btn-delete:hover { background: var(--color-danger);  color: #fff; }

/* Status Badges */
.status-badge {
  display: inline-block; padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px; white-space: nowrap;
}
.badge-active    { background: rgba(40,199,111,.15);  color: var(--color-success); }
.badge-inactive  { background: rgba(234,84,85,.15);   color: var(--color-danger); }
.badge-pending   { background: rgba(255,159,67,.15);  color: var(--color-warning); }
.badge-paid      { background: rgba(40,199,111,.15);  color: var(--color-success); }
.badge-overdue   { background: rgba(234,84,85,.15);   color: var(--color-danger); }
.badge-cancelled { background: rgba(99,115,129,.15);  color: var(--text-secondary); }
.badge-draft     { background: rgba(115,103,240,.15); color: var(--color-purple); }
.badge-processing{ background: rgba(0,207,232,.15);   color: var(--color-info); }
.badge-low-stock { background: rgba(234,84,85,.15);   color: var(--color-danger); }
.badge-in-stock  { background: rgba(40,199,111,.15);  color: var(--color-success); }
```

### 14.10 DataTables Overrides

```css
div.dataTables_wrapper div.dataTables_paginate .paginate_button.current,
div.dataTables_wrapper div.dataTables_paginate .paginate_button.current:hover {
  background: var(--primary) !important; border-color: var(--primary) !important; color: #fff !important;
  border-radius: var(--radius-sm) !important;
}
div.dataTables_wrapper div.dataTables_paginate .paginate_button:hover {
  background: var(--primary-light) !important; color: var(--primary) !important;
  border-radius: var(--radius-sm) !important; border-color: transparent !important;
}
div.dataTables_wrapper .dt-buttons { display: flex; flex-wrap: wrap; gap: 4px; }
div.dataTables_wrapper div.dataTables_info { font-size: 12px; color: var(--text-muted); }
div.dataTables_wrapper select.form-select { min-width: 70px; }
.col-filter-row th { padding: 4px 6px; }
.col-filter-row input, .col-filter-row select { font-size: 12px; }
.dt-loader { display: flex; align-items: center; justify-content: center; padding: 20px; }
.bulk-bar {
  background: rgba(255,159,67,.1); border: 1px solid var(--primary);
  border-radius: var(--radius-sm); padding: 8px 16px;
  display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
}
.bulk-count { font-size: 13px; font-weight: 600; color: var(--primary); }
```

### 14.11 Toastr Override

```css
/* Push toasts below fixed header */
#toast-container.toast-top-right { top: 70px !important; right: 20px !important; }
#toast-container > .toast { border-radius: var(--radius-sm) !important; font-size: 13px !important; }
```

### 14.12 Dark Mode (comprehensive — covers all third-party components)

```css
[data-theme="dark"] {
  --card-bg:       var(--dark-card);
  --sidebar-bg:    var(--dark-sidebar);
  --border-color:  var(--dark-border);
  --body-bg:       var(--dark-root);
  --text-primary:  #E0E0E0;
  --text-secondary:#B8BCC9;
  --table-head-bg: var(--dark-table-head);
}
[data-theme="dark"] #header         { background: var(--dark-header); border-color: var(--dark-border); }
[data-theme="dark"] #sidebar        { background: var(--dark-sidebar); border-color: var(--dark-border); }
[data-theme="dark"] .card           { background: var(--dark-card); border-color: var(--dark-border); }
[data-theme="dark"] .table thead th { background: var(--dark-table-head); color: #ccc; }
[data-theme="dark"] .table tbody tr:hover { background: rgba(255,255,255,0.04); }
[data-theme="dark"] .header-search input { background: var(--dark-card); border-color: var(--dark-border); color: #E0E0E0; }
[data-theme="dark"] #page-loader    { background: var(--dark-root); }
/* Select2 dark */
[data-theme="dark"] .select2-container--bootstrap-5 .select2-selection {
  background: var(--dark-input-bg) !important;
  border-color: var(--dark-border) !important;
  color: #E0E0E0 !important;
}
[data-theme="dark"] .select2-dropdown {
  background: var(--dark-card) !important;
  border-color: var(--dark-border) !important;
}
[data-theme="dark"] .select2-results__option { color: #E0E0E0 !important; }
[data-theme="dark"] .select2-results__option--highlighted { background: var(--primary) !important; }
/* SweetAlert2 dark */
[data-theme="dark"] .swal2-popup { background: var(--dark-card) !important; color: #E0E0E0 !important; }
[data-theme="dark"] .swal2-title { color: #E0E0E0 !important; }
[data-theme="dark"] .swal2-html-container { color: #B8BCC9 !important; }
/* Toastr dark — darker backgrounds */
[data-theme="dark"] #toast-container .toast-success { background-color: #1a3a2a !important; }
[data-theme="dark"] #toast-container .toast-error   { background-color: #3a1a1a !important; }
[data-theme="dark"] #toast-container .toast-info    { background-color: #1a2a3a !important; }
[data-theme="dark"] #toast-container .toast-warning { background-color: #3a2a1a !important; }
/* DataTables dark */
[data-theme="dark"] div.dataTables_wrapper div.dataTables_info,
[data-theme="dark"] div.dataTables_wrapper div.dataTables_length label { color: #B8BCC9; }
[data-theme="dark"] .dataTables_scrollHeadInner,
[data-theme="dark"] .dataTables_scrollBody { background: var(--dark-card); }
/* Filter panel dark */
[data-theme="dark"] .filter-panel { background: var(--dark-card); border: 1px solid var(--dark-border); border-radius: var(--radius-sm); padding: 12px; }
/* Flatpickr dark */
[data-theme="dark"] .flatpickr-calendar { background: var(--dark-card) !important; border-color: var(--dark-border) !important; }
[data-theme="dark"] .flatpickr-day      { color: #E0E0E0 !important; }
[data-theme="dark"] .flatpickr-day:hover { background: var(--primary) !important; }
```

### 14.13 Mobile & Responsive

```css
.sidebar-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.5); z-index: 998;
  transition: opacity 0.3s;
}
.sidebar-overlay.active { display: block; }

@media (max-width: 991.98px) {
  .header-left { width: auto; border-right: none; }
  #sidebar { left: calc(-1 * var(--sidebar-width)); }
  .sidebar-open #sidebar { left: 0; box-shadow: var(--shadow-lg); }
  #page-wrapper { margin-left: 0 !important; }
  .mini-sidebar #page-wrapper { margin-left: 0 !important; }
  .header-search { display: none; }
}
@media (max-width: 767.98px) {
  .content-wrapper { padding: 16px; }
  .dash-count-icon { font-size: 28px; }
}
@media (max-width: 575.98px) {
  .lang-dropdown, [data-bs-toggle="dropdown"]:not(.user-avatar-btn):not(#mobile-menu-btn) {
    display: none;
  }
}
```

### 14.14 Print Styles (fixes barcode + all pages)

```css
@media print {
  #header, #sidebar, #page-loader, .sidebar-overlay,
  .btn-filter, .table-toolbar, .bulk-bar, .filter-panel,
  .action-btns, .dt-buttons, .dataTables_paginate,
  .dataTables_info, .dataTables_length { display: none !important; }
  #page-wrapper { margin-left: 0 !important; padding-top: 0 !important; }
  .content-wrapper { padding: 0 !important; }
  .card { box-shadow: none !important; border: 1px solid #ddd !important; }
  #barcode-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .barcode-item { break-inside: avoid; page-break-inside: avoid; }
  body { font-size: 12px; }
}
```

### 14.15 Misc Components

```css
/* Form groups */
.form-group { margin-bottom: 16px; }
.form-label { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
.form-control, .form-select {
  border: 1px solid var(--border-color); border-radius: var(--radius-sm);
  font-size: 13px; color: var(--text-primary); background: var(--card-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-control:focus, .form-select:focus {
  border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); outline: none;
}

/* Image upload zone */
.img-upload-zone {
  border: 2px dashed var(--border-color); border-radius: var(--radius-md);
  padding: 30px; text-align: center; cursor: pointer; transition: border-color 0.2s;
}
.img-upload-zone:hover { border-color: var(--primary); }
.img-preview-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.preview-thumb { position: relative; display: inline-block; }
.preview-thumb img { width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm); }
.remove-thumb {
  position: absolute; top: -6px; right: -6px;
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--color-danger); color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: 10px;
}

/* Nav Tabs */
.nav-tabs .nav-link { color: var(--text-secondary); font-weight: 600; font-size: 13px; border: none; }
.nav-tabs .nav-link.active { color: var(--primary); border-bottom: 2px solid var(--primary); }

/* Kanban (CRM) */
.kanban-board { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px; }
.kanban-col   { min-width: 220px; flex: 1; background: var(--body-bg); border-radius: var(--radius-md); padding: 12px; }
.kanban-col-header { font-weight: 700; font-size: 13px; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 2px solid var(--primary); }
.kanban-card  {
  background: var(--card-bg); border: 1px solid var(--border-color);
  border-radius: var(--radius-sm); padding: 12px; margin-bottom: 8px;
  box-shadow: var(--shadow-sm); transition: box-shadow 0.2s;
}
.kanban-card:hover { box-shadow: var(--shadow-md); }
.kanban-card h6 { font-size: 13px; font-weight: 600; margin: 0 0 4px; }
.kanban-card p  { font-size: 11px; color: var(--text-muted); margin: 0; }
.deal-value { font-size: 12px; font-weight: 700; color: var(--primary); }

/* POS */
.pos-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
.pos-header  {
  height: 56px; background: var(--active-item-bg); color: #fff;
  display: flex; align-items: center; padding: 0 20px; gap: 16px;
  position: sticky; top: 0; z-index: 100;
}
.pos-body    { display: flex; flex: 1; overflow: hidden; }
.pos-left    { flex: 1; padding: 16px; overflow-y: auto; }
.pos-right   { width: 360px; background: var(--card-bg); border-left: 1px solid var(--border-color);
               padding: 16px; display: flex; flex-direction: column; overflow-y: auto; }
.pos-product-card {
  border: 1px solid var(--border-color); border-radius: var(--radius-sm);
  padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;
}
.pos-product-card:hover { border-color: var(--primary); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
.pos-product-card img   { width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 8px; }
.pos-product-card h6    { font-size: 12px; font-weight: 600; margin: 0 0 4px; }
.pos-product-card .price{ font-size: 13px; font-weight: 700; color: var(--primary); }
.numpad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 12px; }
.numpad-btn  {
  padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-sm);
  background: var(--body-bg); font-size: 16px; font-weight: 600;
  cursor: pointer; transition: all 0.15s; text-align: center;
}
.numpad-btn:hover  { background: var(--primary); color: #fff; border-color: var(--primary); }
.numpad-btn.double { grid-column: span 2; }
.pos-total-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
.pos-total-row.grand { font-weight: 800; font-size: 16px; color: var(--primary); border-top: 2px solid var(--border-color); padding-top: 10px; margin-top: 6px; }

/* Profile */
.profile-banner { height: 120px; border-radius: var(--radius-md) var(--radius-md) 0 0; background: linear-gradient(135deg, #EA5455 0%, #FF9F43 100%); }
.profile-avatar-wrap { display: flex; align-items: flex-end; gap: 16px; padding: 0 24px; margin-top: -50px; }
.profile-avatar { position: relative; display: inline-block; }
.profile-avatar img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #fff; box-shadow: var(--shadow-md); object-fit: cover; }
.profile-avatar-upload { position: absolute; bottom: 4px; right: 4px; width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: #fff; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; }
.pwd-strength-bar { height: 4px; border-radius: 2px; background: var(--border-color); overflow: hidden; margin-top: 6px; }
.pwd-strength-bar-fill { height: 100%; width: 0; border-radius: 2px; transition: width 0.3s, background 0.3s; }

/* Scrollbar */
::-webkit-scrollbar       { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 10px; }
```

---

## ═══════════════════════════════════════════════
## SECTION 15 — ACCESSIBILITY REQUIREMENTS
## ═══════════════════════════════════════════════

Every page must include:

```html
<!-- Skip to main content -->
<a href="#page-wrapper" class="visually-hidden-focusable skip-link">Skip to main content</a>
```

```css
.skip-link:focus { position:fixed; top:8px; left:8px; z-index:99999;
  background:var(--primary); color:#fff; padding:8px 16px; border-radius:4px; }
```

- `<nav id="sidebar" aria-label="Main navigation">`
- `<main id="page-wrapper" role="main">`
- `<header id="header" role="banner">`
- All dropdowns: `aria-expanded`, `aria-haspopup="true"`
- Active sidebar link: `aria-current="page"`
- All icon-only buttons: `aria-label="…"`
- All form inputs: matching `<label for="…">` + `id`
- Tables: `<caption>` element describing table content
- Color is never the ONLY indicator of status (badges always have text)
- Focus outlines must NOT be removed: `outline: none` only on `.btn:focus:not(:focus-visible)`

---

## ═══════════════════════════════════════════════
## SECTION 16 — OUTPUT FORMAT RULES
## ═══════════════════════════════════════════════

1. Label every file with a comment header:
   ```
   <!-- ==================== index.html ==================== -->
   ```
2. Every HTML file must be **complete** — no `<!-- content here -->` placeholders.
3. Every page must have **the full canonical header and sidebar** from Section 7 (copy verbatim).
4. Every table must have **exactly 8–10 data rows** using the sample data from Section 12.
5. Every page must load **all CDN links from Section 2** in the exact specified order.
6. **No explanations, commentary, or markdown** outside code blocks in the output.
7. `style.css` and `script.js` — output once only (in Batch 1). Never repeat them.
8. POS page (`pos.html`) — uses `.pos-wrapper` root, NOT `.page-wrapper`. No sidebar. No standard header.
9. Charts — use the **exact ApexCharts config objects from Section 11**. Do not invent new ones.
10. All pages must include the `<a href="#page-wrapper" class="visually-hidden-focusable skip-link">` accessibility link.
