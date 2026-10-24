"""ERP Pro local application-level UI scenarios (offline simulated CDN mode).

Install test dependencies and pinned Bootstrap resources; see docs/APPLICATION_TESTING.md.
Run: python tests/application_e2e.py

These tests exercise the frontend/demo-data flows, NOT actual backend authentication,
payments, external CDN integrations, or a deployed Docker container.
"""
from __future__ import annotations

import json
import os
import shutil
import sys
import traceback
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright

from browser_test import html  # shared deterministic Bootstrap/seed injection

ROOT = Path(__file__).resolve().parents[1]
REPORT = ROOT / 'tests' / 'application_e2e_results.json'
RESULTS = []


def check(condition: bool, message: str):
    if not condition:
        raise AssertionError(message)


def page_load(page, name):
    page.set_content(html(ROOT / name), wait_until='domcontentloaded', timeout=14000)
    page.wait_for_timeout(20)


def scenario(name, fn, browser):
    page = browser.new_page(viewport={'width': 1366, 'height': 850}, reduced_motion='reduce', accept_downloads=True)
    page.set_default_timeout(5000)
    browser_errors = []
    page.on('pageerror', lambda error: browser_errors.append(str(error)))
    try:
        fn(page)
        check(not browser_errors, f'JavaScript errors: {browser_errors[:3]}')
        RESULTS.append({'name': name, 'status': 'PASS'})
        print('PASS', name, flush=True)
    except Exception as exc:
        RESULTS.append({'name': name, 'status': 'FAIL', 'detail': str(exc)[:500]})
        print('FAIL', name, '-', str(exc)[:500], flush=True)
    finally:
        page.close()


def inventory_edit_and_persist(page):
    page_load(page, 'inventory.html')
    first = page.locator('table[data-entity="products"] tbody tr[data-id]').first
    uid = first.get_attribute('data-id')
    original = page.evaluate('(id) => window.ERP_DEMO.records("products").find(x=>x._id===id).name', uid)
    first.locator('.btn-edit').click()
    name_field = page.locator('#record-form [name="name"]')
    name_field.fill('QA Product Persistence Test')
    page.locator('#record-form button[type="submit"]').click()
    page.wait_for_timeout(75)
    persisted = page.evaluate('(id) => window.ERP_DEMO.records("products").find(x=>x._id===id).name', uid)
    check(persisted == 'QA Product Persistence Test', f'Edit not saved: {persisted}')
    page_load(page, 'inventory.html')
    still_saved = page.evaluate('(id) => window.ERP_DEMO.records("products").find(x=>x._id===id).name', uid)
    check(still_saved == 'QA Product Persistence Test', 'Product edit not retained after page replacement')
    check(original != still_saved, 'Test did not modify product')


def inventory_validation(page):
    page_load(page, 'inventory.html')
    first = page.locator('table[data-entity="products"] tbody tr[data-id]').first
    uid = first.get_attribute('data-id')
    original = page.evaluate('(id) => window.ERP_DEMO.records("products").find(x=>x._id===id).stock', uid)
    first.locator('.btn-edit').click()
    page.locator('#record-form [name="stock"]').fill('-25')
    page.locator('#record-form button[type="submit"]').click()
    page.wait_for_timeout(35)
    updated = page.evaluate('(id) => window.ERP_DEMO.records("products").find(x=>x._id===id).stock', uid)
    check(updated == original, 'Negative stock was accepted')


def fallback_filter_and_export(page):
    page_load(page, 'inventory.html')
    selector = 'table[data-entity="products"] tbody tr[data-id]'
    count = page.locator(selector).count()
    check(count > 2, 'Insufficient inventory seed records')
    search = page.locator('.dt-custom-search').first
    search.fill('there-is-no-such-product-999')
    check(page.locator(selector + ':visible').count() == 0, 'Search should hide all nonmatches')
    search.fill('')
    check(page.locator(selector + ':visible').count() == count, 'Clearing search should restore rows')
    page.locator(selector + ' .row-cb').first.check()
    check(page.locator('.bulk-bar').first.is_visible(), 'Bulk action bar missing')
    with page.expect_download(timeout=3000) as download:
        page.locator('.btn-bulk-export').first.click()
    check(download.value.suggested_filename == 'products-export.csv', 'Wrong CSV export filename')


def theme_and_navigation(page):
    page_load(page, 'index.html')
    page.locator('#dark-mode-btn').click()
    check(page.locator('body').get_attribute('data-theme') == 'dark', 'Could not enable night mode')
    check(page.locator('html').get_attribute('data-bs-theme') == 'dark', 'Bootstrap scheme not dark')
    page_load(page, 'inventory.html')
    check(page.locator('body').get_attribute('data-theme') == 'dark', 'Night mode not retained across pages')
    page.locator('#toggle-sidebar').click()
    check('mini-sidebar' in (page.locator('body').get_attribute('class') or ''), 'Sidebar did not collapse')
    page.set_viewport_size({'width': 375, 'height': 812})
    page.locator('#mobile-menu-btn').click()
    check('sidebar-open' in (page.locator('body').get_attribute('class') or ''), 'Mobile sidebar not opened')
    page.keyboard.press('Escape')
    check('sidebar-open' not in (page.locator('body').get_attribute('class') or ''), 'Escape failed to close mobile sidebar')


def pos_cash_validation(page):
    page_load(page, 'pos.html')
    before = page.evaluate('window.ERP_DEMO.records("sales").length')
    page.locator('.pos-add-btn').first.click()
    # Default cash payment, without any cash tendered, must not accept checkout.
    page.locator('#pos-pay-btn').click()
    page.wait_for_timeout(30)
    after = page.evaluate('window.ERP_DEMO.records("sales").length')
    check(after == before, 'POS allowed a cash sale without sufficient payment')
    check('1 items' in page.locator('#pos-item-count').inner_text(), 'Rejected sale should retain cart')


def pos_paid_sale_stock(page):
    page_load(page, 'pos.html')
    before_sales = page.evaluate('window.ERP_DEMO.records("sales").length')
    sku = page.locator('.pos-add-btn').first.get_attribute('data-id')
    before_stock = page.evaluate('(sku) => Number(window.ERP_DEMO.records("products").find(x=>x.sku===sku).stock)', sku)
    page.locator('.pos-add-btn').first.click()
    page.locator('input[name="pos-method"][value="Card"]').check(force=True)
    page.locator('#pos-pay-btn').click()
    page.wait_for_timeout(50)
    after_sales = page.evaluate('window.ERP_DEMO.records("sales").length')
    after_stock = page.evaluate('(sku) => Number(window.ERP_DEMO.records("products").find(x=>x.sku===sku).stock)', sku)
    check(after_sales == before_sales + 1, 'Completed POS sale did not create invoice')
    check(after_stock == before_stock - 1, f'Stock did not decrement: {before_stock}->{after_stock}')
    check('0 items' in page.locator('#pos-item-count').inner_text(), 'Cart not cleared after successful sale')
    receipt = page.locator('#pos-receipt').inner_text()
    check('DEMO' in receipt, 'Demo-only receipt warning missing')


def pos_hold_resume(page):
    page_load(page, 'pos.html')
    page.locator('.pos-add-btn').first.click()
    page.locator('#pos-hold-btn').click()
    check('0 items' in page.locator('#pos-item-count').inner_text(), 'Hold did not clear cart')
    check(page.locator('#pos-hold-btn').inner_text().strip() == 'Resume held', 'Resume action not offered')
    page.locator('#pos-hold-btn').click()
    check('1 items' in page.locator('#pos-item-count').inner_text(), 'Held sale not restored')


def pos_out_of_stock(page):
    page_load(page, 'pos.html')
    # Find a product with zero inventory in seed data.
    sku = page.evaluate('''() => window.ERP_DEMO.records("products").find(x=>Number(x.stock)===0)?.sku''')
    check(bool(sku), 'No out-of-stock fixture exists')
    page.locator(f'.pos-add-btn[data-id="{sku}"]').click()
    check('0 items' in page.locator('#pos-item-count').inner_text(), 'Out-of-stock product was added to cart')


def signup_password_mismatch(page):
    page_load(page, 'signup.html')
    form = page.locator('.auth-form')
    check(form.count() == 1, 'Signup form missing')
    for inp in form.locator('input[required]').all():
        if inp.get_attribute('type') == 'checkbox':
            inp.check(force=True)
        elif inp.get_attribute('type') == 'email':
            inp.fill('qa@example.com')
        else:
            inp.fill('StrongPass123!')
    page.locator('#auth-confirm').fill('OtherPass123!')
    form.locator('button[type="submit"]').click()
    page.wait_for_timeout(30)
    check('Passwords do not match' in page.locator('body').inner_text(), 'Password mismatch feedback missing')


if __name__ == '__main__':
    checks = [
        ('inventory edit persists', inventory_edit_and_persist),
        ('inventory rejects negative stock', inventory_validation),
        ('inventory search and selected CSV export', fallback_filter_and_export),
        ('theme persistence and sidebar navigation', theme_and_navigation),
        ('POS prevents insufficient-cash checkout', pos_cash_validation),
        ('POS sale updates stock and creates receipt', pos_paid_sale_stock),
        ('POS hold and resume', pos_hold_resume),
        ('POS blocks out-of-stock product', pos_out_of_stock),
        ('signup mismatched passwords blocked', signup_password_mismatch),
    ]
    browser_path = os.environ.get('ERP_TEST_CHROME') or shutil.which('chromium') or shutil.which('google-chrome')
    with sync_playwright() as p:
        opts = {'executable_path': browser_path} if browser_path else {}
        browser = p.chromium.launch(headless=True, args=['--no-sandbox'], **opts)
        for case, fn in checks:
            scenario(case, fn, browser)
        browser.close()
    report = {
        'run_at_utc': datetime.now(timezone.utc).isoformat(),
        'mode': 'offline with local Bootstrap and demo data; NOT deployed Docker/live-CDN testing',
        'source': 'v3.0.1 local baseline + v3.1.0 CI/CD configuration (remote HEAD not fetched)',
        'total': len(RESULTS),
        'passed': sum(x['status'] == 'PASS' for x in RESULTS),
        'failed': sum(x['status'] == 'FAIL' for x in RESULTS),
        'cases': RESULTS,
    }
    REPORT.write_text(json.dumps(report, indent=2) + '\n')
    print(f"Application-level test result: {report['passed']}/{report['total']} passed")
    sys.exit(1 if report['failed'] else 0)
