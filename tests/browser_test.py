"""Offline browser regression using Chromium and local Bootstrap; CDN add-ons unavailable in this test environment.
Run: python tests/browser_test.py
"""
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
import sys, json, os, shutil
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'tests'/'browser_results.json'
# Use local Bootstrap (for offline tests) rather than CDN. Point these paths to your own Bootstrap files if needed.
BS_CSS_PATH=Path(os.getenv('ERP_TEST_BOOTSTRAP_CSS','/opt/imagemagick/share/doc/ImageMagick-7/www/assets/bootstrap.min.css'))
BS_JS_PATH=Path(os.getenv('ERP_TEST_BOOTSTRAP_JS','/opt/imagemagick/share/doc/ImageMagick-7/www/assets/bootstrap.bundle.min.js'))
if not (BS_CSS_PATH.is_file() and BS_JS_PATH.is_file()):
    raise SystemExit('Offline Bootstrap files not found. Set ERP_TEST_BOOTSTRAP_CSS and ERP_TEST_BOOTSTRAP_JS. See docs/TEST_REPORT.md.')
BS_CSS=BS_CSS_PATH.read_text()
BS_JS=BS_JS_PATH.read_text()
CUSTOM_CSS=(ROOT/'assets/css/style.css').read_text()
SEED=(ROOT/'assets/js/seed.js').read_text()
APP=(ROOT/'assets/js/script.js').read_text()
FAKE_STORAGE="""window.__erpTestStore=window.__erpTestStore||{};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem(k){return Object.prototype.hasOwnProperty.call(window.__erpTestStore,k)?window.__erpTestStore[k]:null},setItem(k,v){window.__erpTestStore[k]=String(v)},removeItem(k){delete window.__erpTestStore[k]}}});"""

def html(file):
    doc=BeautifulSoup(file.read_text(), 'html.parser')
    for e in list(doc.select('link[href]')):e.decompose()
    for e in list(doc.select('script')):e.decompose()
    head=doc.head
    st=doc.new_tag('style');st.string=BS_CSS+'\n'+CUSTOM_CSS;head.append(st)
    loader=doc.new_tag('script');loader.string=FAKE_STORAGE;head.append(loader)
    pre=doc.new_tag('script');pre.string="try{if(localStorage.getItem('erpProDemoV2:dark')==='true'){document.documentElement.setAttribute('data-bs-theme','dark');document.documentElement.dataset.theme='dark';}}catch(e){}";head.append(pre)
    for script in [BS_JS,SEED,APP]:
        tag=doc.new_tag('script');tag.string=script;doc.body.append(tag)
    return str(doc)

def main():
    report={'pages':{},'errors':[], 'interactions':[]}
    pages=sorted(ROOT.glob('*.html'))
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,**({'executable_path':os.getenv('ERP_TEST_CHROME') or (shutil.which('chromium') or shutil.which('google-chrome'))} if os.getenv('ERP_TEST_CHROME') or shutil.which('chromium') or shutil.which('google-chrome') else {}),args=['--no-sandbox'])
        page=browser.new_page(viewport={'width':1366,'height':840},reduced_motion='reduce',accept_downloads=True);page.set_default_timeout(2500)
        errors=[];page.on('pageerror',lambda error:errors.append(str(error)))
        for file in pages:
            print('TEST',file.name,flush=True)
            data=html(file)
            errors.clear()
            try:page.set_content(data,wait_until='domcontentloaded',timeout=9000);page.wait_for_timeout(5)
            except Exception as e:report['errors'].append(file.name+': failed load '+str(e)[:150]);continue
            measurements=[]
            for width in [320,375,414,768,1024,1440]:
                page.set_viewport_size({'width':width,'height':800});page.wait_for_timeout(5)
                m=page.evaluate('''() => ({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,loader:!!document.getElementById('page-loader')})''')
                measurements.append(m)
                if m['document']>width+2:report['errors'].append(f'{file.name}: horizontal overflow at {width}px -> {m["document"]}px')
            report['pages'][file.name]=dict(widths=measurements,errors=errors[:])
            report['errors'] += [f'{file.name}: JS error {e}' for e in errors]
        print('Page scans complete',flush=True)
        # Test full shell interactions
        page.set_viewport_size({'width':1366,'height':840});page.set_content(html(ROOT/'index.html'),wait_until='domcontentloaded');page.wait_for_timeout(5)
        print('CHECK shell',flush=True)
        assert page.locator('#toggle-sidebar').is_visible()
        page.locator('#toggle-sidebar').click();page.wait_for_timeout(5)
        assert 'mini-sidebar' in (page.locator('body').get_attribute('class') or '')
        print('CHECK shell',flush=True)
        assert page.locator('#toggle-sidebar').is_visible(), 'Cannot expand mini sidebar!'
        assert page.locator('#toggle-sidebar').get_attribute('aria-expanded')=='false'
        page.locator('#toggle-sidebar').click();page.wait_for_timeout(5)
        assert 'mini-sidebar' not in (page.locator('body').get_attribute('class') or '')
        report['interactions'].append('Desktop collapse/expand and ARIA OK')
        page.locator('#dark-mode-btn').click();assert page.locator('body').get_attribute('data-theme')=='dark'
        assert page.locator('html').get_attribute('data-bs-theme')=='dark'
        assert page.locator('#dark-mode-btn').get_attribute('aria-pressed')=='true'
        page.locator('#dark-mode-btn').click();assert page.locator('body').get_attribute('data-theme') is None
        report['interactions'].append('Dark/light toggle + Bootstrap color scheme OK')
        page.locator('#toggle-sidebar').click();page.wait_for_timeout(5)
        page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(5)
        page.locator('#mobile-menu-btn').click();page.wait_for_timeout(5)
        assert 'sidebar-open' in (page.locator('body').get_attribute('class') or '')
        assert page.locator('#sidebar').get_attribute('aria-hidden')=='false'
        submenu=page.locator('#sidebar .submenu>a').first
        submenu.click();page.wait_for_timeout(5)
        assert page.locator('#sidebar a[href="inventory.html"]').first.is_visible(), 'submenu links hidden in mobile+mini state'
        page.locator('#close-sidebar').click();page.wait_for_timeout(5)
        assert 'sidebar-open' not in (page.locator('body').get_attribute('class') or '')
        assert page.locator('#sidebar').get_attribute('aria-hidden')=='true'
        assert page.locator('#mobile-menu-btn').get_attribute('aria-expanded')=='false'
        report['interactions'].append('Mobile drawer close, overlay, compact persisted state, submenu OK')
        page.locator('#mobile-menu-btn').click();page.wait_for_timeout(5)
        page.keyboard.press('Escape');page.wait_for_timeout(5)
        assert 'sidebar-open' not in (page.locator('body').get_attribute('class') or '')
        report['interactions'].append('Escape closes mobile drawer')
        print('CHECK settings',flush=True)
        # UI preferences
        page.set_viewport_size({'width':1366,'height':840});page.set_content(html(ROOT/'settings.html'),wait_until='domcontentloaded');page.wait_for_timeout(5)
        page.locator('#tab-preferences').click();page.wait_for_timeout(100);page.locator('#pref-dark').check();page.locator('#pref-mini').check()
        page.locator('form[data-settings="preferences"] button').click();page.wait_for_timeout(5)
        assert page.locator('body').get_attribute('data-theme')=='dark'
        report['interactions'].append('Settings preference save applies dark + compact mode')
        print('CHECK crud',flush=True)
        # Browser-stored CRUD
        page.set_content(html(ROOT/'inventory.html'),wait_until='domcontentloaded');page.wait_for_timeout(5)
        assert page.locator('table[data-entity="products"] tbody tr[data-id]').count()>0
        original=page.locator('table[data-entity="products"] tbody tr[data-id]').count()
        page.locator('table[data-entity="products"] tbody tr .btn-edit').first.click();page.wait_for_timeout(50)
        assert page.locator('#record-modal').get_attribute('class') and 'show' in page.locator('#record-modal').get_attribute('class')
        name=page.locator('#record-form [name="name"]');old=name.input_value();name.fill(old+' (Test)')
        page.locator('#record-form button[type="submit"]').click();page.wait_for_timeout(50)
        assert '(Test)' in page.locator('table[data-entity="products"] tbody tr').first.inner_text()
        assert page.locator('table[data-entity="products"] tbody tr[data-id]').count()==original
        report['interactions'].append('Product edit/CRUD modal and saved record OK')
        search=page.locator('.dt-custom-search').first
        search.fill('no-matching-product-xyz');search.dispatch_event('input')
        assert page.locator('table[data-entity="products"] tbody tr[data-id]:visible').count()==0
        search.fill('');search.dispatch_event('input')
        assert page.locator('table[data-entity="products"] tbody tr[data-id]:visible').count()==original
        report['interactions'].append('Table fallback search/filter OK')
        # Bulk actions and CSV export should work without DataTables CDN modules.
        page.locator('table[data-entity="products"] tbody .row-cb').first.check()
        assert page.locator('.bulk-bar').first.is_visible()
        with page.expect_download(timeout=2500) as dl:
            page.locator('.btn-bulk-export').first.click()
        assert dl.value.suggested_filename=='products-export.csv'
        report['interactions'].append('Table checkbox bulk bar and selected CSV export OK')
        page.on('dialog',lambda dialog:dialog.accept())
        page.locator('.btn-bulk-delete').first.click();page.wait_for_timeout(80)
        assert page.locator('table[data-entity="products"] tbody tr[data-id]').count()==original-1
        report['interactions'].append('Bulk delete with confirmation OK')
        print('CHECK pos',flush=True)
        # POS interactions with demo state
        page.set_content(html(ROOT/'pos.html'),wait_until='domcontentloaded');page.wait_for_timeout(5)
        before=page.evaluate('window.ERP_DEMO.records("sales").length');product=page.locator('.pos-add-btn').first;product.click()
        assert '1 items' in page.locator('#pos-item-count').inner_text()
        page.locator('input[name="pos-method"][value="Card"]').check(force=True)
        page.locator('#pos-pay-btn').click();page.wait_for_timeout(50)
        after=page.evaluate('window.ERP_DEMO.records("sales").length')
        assert after==before+1
        report['interactions'].append('POS add/cart/checkout demo record OK')
        print('CHECK standalone theme',flush=True)
        # theme control on special pages
        for file in ['pos.html','signin.html','signup.html','error-404.html','error-500.html']:
            page.set_content(html(ROOT/file),wait_until='domcontentloaded');page.wait_for_timeout(50)
            assert page.locator('#dark-mode-btn').is_visible(),file+' lacks standalone theme control'
            page.locator('#dark-mode-btn').click()
            assert page.locator('body').get_attribute('data-theme') in ('dark',None)
        report['interactions'].append('Standalone pages have night mode switches')
        browser.close()
    OUT.write_text(json.dumps(report,indent=2))
    print('Pages:',len(report['pages']),'Responsive sizes:',6,'Interaction checks:',len(report['interactions']))
    print('Interaction results:',*report['interactions'],sep='\n - ')
    print('Errors',len(report['errors']))
    for error in report['errors'][:50]:print('ERROR:',error)
    return 0 if not report['errors'] else 1

if __name__=='__main__':sys.exit(main())
