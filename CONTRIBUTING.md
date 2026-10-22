# Contributing to ERP Pro

Thanks for helping improve this frontend demonstration. **Project author: Abu Salah Musha Lemon.**

## Before making a change

1. Read `README.md` and `docs/DEVELOPER_GUIDE.md`.
2. Open an issue describing the problem or proposed enhancement, when appropriate.
3. Create a focused branch (`fix/...`, `feature/...`, or `docs/...`).
4. Keep shared component styles in `assets/css/style.css` and common behavior in `assets/js/script.js`.
5. Do not introduce real credentials, customer data or claims that mock operations are production-ready.

## Validation

```bash
python tests/validate_project.py
node --check assets/js/script.js
node --check assets/js/seed.js
```

Test significant UI changes in light/dark modes at 320px, 375px, 768px, 1024px and 1440px; confirm keyboard navigation, readable contrast and active sidebar state. Test live third-party integrations in a connected browser.

## Pull requests

Include a summary of changes, screenshots for visual changes, test steps/results, and any known limitations. Describe how an API/backend would be needed if the change touches authentication, payments, stock movement or permissions.

## Licensing note

ERP Pro is available under the [Apache License 2.0](LICENSE). Contributions should be compatible with this license. Preserve notices as required by the license and document material changes to modified files. Do not include incompatible third-party code without permission.
