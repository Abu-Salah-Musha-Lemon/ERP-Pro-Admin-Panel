"""Portable ERP Pro browser smoke test for CI.

Runs a real local HTTP server and checks page access, layout overflow,
sidebar, theme persistence, and a basic inventory table.
ERP_CI_OFFLINE=1 blocks external CDN calls to make the check deterministic.
This is deliberately NOT a full end-to-end or live-CDN verification.
"""
from __future__ import annotations

import os
import shutil
from pathlib import Path
import socket
import subprocess
import sys
import time
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
PORT = int(os.getenv('ERP_CI_PORT', '18765'))
BASE = f'http://127.0.0.1:{PORT}'
PAGES = sorted(p.name for p in ROOT.glob('*.html'))
WIDTHS = (320, 768, 1440)
OFFLINE = os.getenv('ERP_CI_OFFLINE', '1') == '1'
SET_CONTENT = os.getenv('ERP_TEST_SET_CONTENT', '0') == '1'


def wait_for_server():
    for _ in range(60):
        try:
            with socket.create_connection(('127.0.0.1', PORT), timeout=0.3):
                return
        except OSError:
            time.sleep(0.1)
    raise RuntimeError('Local HTTP server never became ready')


def run():
    errors = []
    total = 0
    if SET_CONTENT:
        from browser_test import html as local_html
    server = subprocess.Popen(
        [sys.executable, '-m', 'http.server', str(PORT), '--bind', '127.0.0.1'],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_server()
        with sync_playwright() as pw:
            browser = pw.chromium.launch(
                headless=True, args=['--no-sandbox'],
                **({'executable_path': shutil.which('chromium') or shutil.which('google-chrome')}
                   if os.getenv('ERP_USE_SYSTEM_CHROMIUM') == '1' else {}),
            )
            context = browser.new_context(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce')
            if OFFLINE and not SET_CONTENT:
                # Pin bootstrap assets for reliable offline CI; block other CDNs.
                vendor = ROOT / 'node_modules' / 'bootstrap' / 'dist'
                css = vendor / 'css' / 'bootstrap.min.css'
                js = vendor / 'js' / 'bootstrap.bundle.min.js'
                if not css.is_file() or not js.is_file():
                    raise RuntimeError('Run: npm install --no-save --package-lock=false bootstrap@5.3.2')
                def route_offline(route):
                    url = route.request.url
                    if urlparse(url).hostname in ('127.0.0.1', 'localhost'):
                        route.continue_()
                    elif 'bootstrap@5.3.2/dist/css/bootstrap.min.css' in url:
                        route.fulfill(path=str(css), content_type='text/css')
                    elif 'bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' in url:
                        route.fulfill(path=str(js), content_type='text/javascript')
                    else:
                        route.abort()
                context.route('**/*', route_offline)
            page = context.new_page()
            page.set_default_timeout(4000)
            js_errors = []
            page.on('pageerror', lambda err: js_errors.append(str(err)))
            if len(PAGES) != 32:
                errors.append(f'Expected 32 HTML pages; got {len(PAGES)}')
            def visit(name):
                if SET_CONTENT:
                    page.set_content(local_html(ROOT / name), wait_until='domcontentloaded')
                    return 200
                response = page.goto(f'{BASE}/{name}', wait_until='domcontentloaded', timeout=15000)
                return response.status if response else None

            for name in PAGES:
                js_errors.clear()
                status = visit(name)
                if status != 200:
                    errors.append(f'{name}: HTTP status {status}')
                    continue
                if not page.locator('body').count():
                    errors.append(f'{name}: missing body')
                for width in WIDTHS:
                    page.set_viewport_size({'width': width, 'height': 900})
                    layout = page.evaluate('''() => ({width: document.documentElement.scrollWidth, viewport: innerWidth})''')
                    total += 1
                    if layout['width'] > layout['viewport'] + 2:
                        errors.append(f'{name}@{width}: page overflow ({layout["width"]}px)')
                if js_errors:
                    errors.append(f'{name}: JS errors: {js_errors[:2]}')

            # Representative interactions, keeping full screen size.
            page.set_viewport_size({'width': 1440, 'height': 900})
            visit('index.html')
            theme = page.locator('#dark-mode-btn')
            if theme.count():
                theme.click()
                if page.locator('body').get_attribute('data-theme') != 'dark':
                    errors.append('Theme button did not activate dark mode')
                visit('inventory.html')
                if page.locator('body').get_attribute('data-theme') != 'dark':
                    errors.append('Dark mode was not persisted between pages')
            else:
                errors.append('Missing dark mode control')
            visit('index.html')
            desktop = page.locator('#toggle-sidebar')
            if desktop.count():
                desktop.click()
                if 'mini-sidebar' not in page.locator('body').get_attribute('class').split():
                    errors.append('Desktop sidebar did not collapse')
                desktop.click()
            else:
                errors.append('Missing desktop sidebar toggle')
            page.set_viewport_size({'width': 375, 'height': 812})
            mobile = page.locator('#mobile-menu-btn')
            if mobile.count():
                mobile.click(force=True)
                if 'sidebar-open' not in page.locator('body').get_attribute('class').split():
                    errors.append('Mobile menu did not open')
                page.keyboard.press('Escape')
                if 'sidebar-open' in page.locator('body').get_attribute('class').split():
                    errors.append('Escape did not close mobile menu')
            else:
                errors.append('Missing mobile sidebar toggle')
            visit('inventory.html')
            if not page.locator('table[data-entity="products"] tbody tr').count():
                errors.append('Inventory demo table did not render rows')
            browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=3)
        except subprocess.TimeoutExpired:
            server.kill()
    print(f'ERP browser smoke: {len(PAGES)} pages, {total} responsive measurements, offline={OFFLINE}')
    for problem in errors:
        print('FAIL', problem)
    if errors:
        raise SystemExit(1)
    print('PASS: page loads, responsive width, theme, sidebar, and demo inventory smoke')


if __name__ == '__main__':
    run()
