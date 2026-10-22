# ERP Pro Admin Panel v3.0.1 — Apache-2.0 License & Copyright Footer

**Author:** Abu Salah Musha Lemon  
**Release tag:** `v3.0.1`  
**Release type:** Attribution and UI maintenance update

## What's new

- Applied the **Apache License 2.0** to original ERP Pro source code and included a `NOTICE` attribution file.
- Added a consistent, accessible copyright footer to every one of the 32 HTML pages, including admin dashboards, POS, authentication and error views.
- Footer uses the existing light/dark theme color tokens and adjusts to small screens and collapsed navigation.
- Footer links to license terms, attribution notices and the author's GitHub profile.
- Added `assets/js/project-config.js` to enable a verified external HTTPS donation page later. The Donate link is hidden until configured.
- Updated README, contributing instructions and changelog.

## License and credit

Copyright 2026 **Abu Salah Musha Lemon**. Licensed under the Apache License, Version 2.0. Redistribution requires compliance with the license, including the relevant license and attribution notices. The license does not mandate a permanent, visible credit footer in every derivative app. Libraries supplied through third-party CDNs retain their own licenses.

## Installation

Extract this release ZIP and open `erp-pro-admin/index.html`, or run `python -m http.server 8000` from the project folder. Network connectivity is required for the CDN dependencies.

## Limitations

Frontend demonstration only. Local browser-stored data; no production authentication or payment processor. Donation integration is a future option, not an active payment service. Browser-based styling checks are limited to tested environments.
