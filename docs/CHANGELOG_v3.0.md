# ERP Pro Admin — v3.0.0 Theme and Contrast Stabilization

## Changes since v2.0.0

- Replaced conflicting dark-mode declarations with **one semantic design-token system** using `:root` and `:root[data-theme='dark']`. The chosen theme is stored in the browser and applied to the document before first paint.
- Redesigned dark mode around deep navy (`#0F1729`) plus slate cards (`#19273D`) and raised panels (`#22334D`). The previous mismatched purple/navy surfaces have been removed.
- Standardized **card, header, sidebar, dropdown, modal, table, filter and input borders**. Editable controls use a higher-contrast border token (`--border-strong`) distinct from decorative borders (`--border-color`).
- Fixed light/dark treatment for Bootstrap table cells and header rows, badges, outline buttons, status colors, dropdowns, navigation tabs, forms, CRM cards and POS widgets.
- Added dark-aware overrides for Select2, Flatpickr, SweetAlert2, Toastr and ApexCharts tooltips. The application still requires the actual CDN libraries to use all integrations.
- Updated chart label/grid colors and browser theme metadata to match the revised tokens.
- Preserved the existing responsive sidebar and accessible theme buttons; added `prefers-contrast: more` and better keyboard focus/skip-link styling.
- Added dedicated automated theme tests, computed-style checks, contrast validation and two-theme viewport checks.

## Design tokens

| Surface / semantic | Light | Dark |
| --- | --- | --- |
| Page | `#F5F7FB` | `#0F1729` |
| Card | `#FFFFFF` | `#19273D` |
| Raised panel | `#FFFFFF` | `#22334D` |
| Input | `#FFFFFF` | `#1A2A42` |
| Subtle border | `#D9E2EC` | `#40536D` |
| Control border | `#8395AA` | `#6E839E` |
| Primary text | `#1F3045` | `#F2F6FC` |
| Secondary text | `#50647B` | `#C3D0E1` |
| Accent | `#FF9F43` | `#FFAF5A` |

Note: These are frontend design and interaction fixes, not an authentication or server-side ERP implementation.
