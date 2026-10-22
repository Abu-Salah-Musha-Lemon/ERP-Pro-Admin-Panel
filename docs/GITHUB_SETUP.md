# GitHub Publishing & Release Guide

**Author:** Abu Salah Musha Lemon  
**Recommended version tag:** `v3.0.1`  
**Suggested repository name:** `erp-pro-admin-panel`

## 1. Repository metadata

**Repository name:** `erp-pro-admin-panel`

**Short description (GitHub About):**

> Responsive ERP, inventory management and POS admin panel built with HTML, CSS, JavaScript and Bootstrap. Includes dark mode, charts and demo CRUD.

**Suggested GitHub Topics** (copy as separate topic chips; max 20):

`erp` · `admin-dashboard` · `inventory-management` · `pos-system` · `bootstrap5` · `javascript` · `html5` · `css3` · `dark-mode` · `responsive-design` · `datatables` · `dashboard` · `frontend` · `retail-management` · `warehouse-management`

**Default branch:** `main`  
**Suggested development branch:** `develop` (optional)  
**Example feature branches:** `feature/backend-auth`, `feature/products-api`, `fix/sidebar-contrast`.

## 2. Publish the repository

Make the `erp-pro-admin` folder the **repository root** (so `README.md` and `index.html` are at top level), then run:

```bash
cd erp-pro-admin
git init
git branch -M main
git add .
git commit -m "release: add Apache-2.0 attribution and footer v3.0.1"
git remote add origin https://github.com/YOUR_USERNAME/erp-pro-admin-panel.git
git push -u origin main
```

First create an empty repository on GitHub under your account, and replace `YOUR_USERNAME` with your actual GitHub username. If the repo already exists, **do not blindly reinitialize or force-push**: copy only the changes into your working branch, review `git diff`, commit and open a pull request.

## 3. Create a Git tag

```bash
git tag -a v3.0.1 -m "ERP Pro Admin Panel v3.0.1"
git push origin v3.0.1
```

If `v3.0.1` already exists, use the existing tag for the same commit or select another version. Do not overwrite published tags casually.

## 4. Create the GitHub Release

GitHub repository → **Releases** → **Draft a new release**:

| Field | Value |
| --- | --- |
| Choose a tag | `v3.0.1` |
| Target branch | `main` |
| Release title | `ERP Pro Admin Panel v3.0.1 — Apache-2.0 License & Copyright Footer` |
| Description | Paste the contents of `RELEASE_NOTES_v3.0.1.md` |
| Assets | Upload `ERP_Pro_Admin_Panel_v3.0.1_Licensed_Footer.zip` |
| Pre-release | Off, if you are publishing this as the finished frontend demo release |
| Latest release | On, if this is the repository's newest published version |

**Important:** A release can be a stable *frontend demo* without claiming the product is production-ready. Say this explicitly in the release text.

## 5. Optional GitHub Pages demo

You may publish the static UI using **Settings → Pages**, deploying from `main` (root), or using GitHub Actions. Because `index.html` is at the repository root, this can work without a build tool. Browser-local records are **not private to a business account** and login is **not an access gate**. Never add sensitive data, API secrets or production credentials to the GitHub Pages repository or its demo UI.

## 6. Suggested repository settings

- Add repository description, topics and screenshot-rich README.
- Enable Issues and Discussions if you want community feedback.
- Use branch protection / rulesets and require pull request review for `main` when collaborating.
- Enable dependency/security scanning where supported (note: CDN dependencies may require separate audits).
- The project uses Apache-2.0; keep LICENSE and NOTICE at the repository root.
- Keep original requirements/test documentation for provenance; keep test claims scoped to verified environments.
- Check links, screenshots, broken images and CDN loading from the published Pages site.

## 7. Release checklist

- [ ] Author credit is correct: **Abu Salah Musha Lemon**.
- [ ] Root `README.md` renders correctly with screenshots.
- [ ] Pages open and navigation works on desktop/mobile.
- [ ] Both themes, overlays, forms and tables are readable.
- [ ] Live CDN-loaded charts, plugins and icons work in a connected browser.
- [ ] No credentials, keys or personal customer data are committed.
- [ ] Changelog and release notes match what is actually implemented.
- [ ] Confirm LICENSE and NOTICE are included in the release and properly attributed.
- [ ] Tag and release source from the intended commit.
- [ ] Attach the correct ZIP as a release asset.

## 8. Future versioning

Use semantic versioning *as a project convention*:

- `v3.0.1` — small fixes to the same interface.
- `v3.1.0` — new backwards-compatible demo features or modules.
- `v4.0.0` — significant architectural changes or intentionally incompatible behavior.

For a collaborative workflow, use focused branches and pull requests; keep `main` releasable and create tags from verified commits.

## Future GitHub Sponsors / donation button

When the author has an active and verified funding destination, consider adding `.github/FUNDING.yml` using GitHub's documented syntax for verified services. The application's Donate footer link is separately configured via `assets/js/project-config.js`. Do **not** publish a funding destination or payment keys before the account is ready.
