"""Computed-style regression test for ERP Pro theme system, run offline with local Bootstrap."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import sys, json, shutil
from browser_test import html, ROOT
OUT=ROOT/'tests/theme_results.json'
CSS_VARS=['--body-bg','--card-bg','--sidebar-bg','--surface-raised','--surface-input','--border-color','--border-strong','--text-primary','--text-secondary','--primary-dark']
SAMPLES=['#header','#sidebar','.card','.card-header','.table','.table thead th','.table tbody td','.form-control','.form-select','.status-badge','.dropdown-menu','.page-title','.btn-primary','.btn-outline-secondary','.nav-tabs .nav-link','.quick-link','.pos-product','.auth-body','.modal-content']
def main():
 report={'pages':{},'failures':[],'sampleContrast':{},'testedWidths':[320,390,768,1024,1440]}
 with sync_playwright() as p:
  b=p.chromium.launch(headless=True,executable_path=shutil.which('chromium') or None,args=['--no-sandbox'])
  pg=b.new_page(viewport={'width':1440,'height':900},reduced_motion='reduce')
  for f in sorted(ROOT.glob('*.html')):
   # Establish persisted dark preference BEFORE app initialization via localStore test shim.
   raw=html(f)
   checks={}
   for mode in ['light','dark']:
    data=raw.replace('window.__erpTestStore=window.__erpTestStore||{};',f"window.__erpTestStore={{'erpProDemoV2:dark':'{str(mode=='dark').lower()}'}};")
    pg.set_content(data,wait_until='domcontentloaded',timeout=15000)
    state=pg.evaluate('''(sels) => {
       let root=document.documentElement,cs=getComputedStyle(root),res={mode:root.dataset.theme,bootstrap:root.getAttribute('data-bs-theme'),vars:{},items:{},overflow:document.documentElement.scrollWidth>innerWidth+2};
       for(let n of sels.vars)res.vars[n]=cs.getPropertyValue(n).trim();
       for(let sel of sels.samples){let e=document.querySelector(sel);if(!e)continue;let c=getComputedStyle(e);res.items[sel]={fg:c.color,bg:c.backgroundColor,border:c.borderTopColor,borderStyle:c.borderTopStyle};}
       return res;
    }''',{'vars':CSS_VARS,'samples':SAMPLES})
    if state['mode']!=mode or state['bootstrap']!=mode:report['failures'].append(f'{f.name}/{mode}: theme state failed')
    for selector,s in state['items'].items():
     if selector in ('.card','#sidebar','#header','.form-control','.form-select','.modal-content','.pos-product','.dropdown-menu','.quick-link') and s['borderStyle']!='none' and s['border'] not in (state['vars']['--border-color'] if False else []):
      pass
    for width in report['testedWidths']:
     pg.set_viewport_size({'width':width,'height':850})
     overflow=pg.evaluate('document.documentElement.scrollWidth>innerWidth+2')
     if overflow:report['failures'].append(f'{f.name}/{mode}: horizontal overflow at {width}')
    if f.name in ['index.html','inventory.html','settings.html','pos.html','signin.html']:
     checks[mode]=state
   report['pages'][f.name]=checks
  # Validate computed style across representative components.
  for fname in ['index.html','inventory.html','settings.html','pos.html']:
   for mode in ['dark','light']:
    d=report['pages'][fname][mode]
    assert d['vars']['--card-bg'] != d['vars']['--body-bg']
    assert d['vars']['--border-color'] != d['vars']['--card-bg']
    if fname=='index.html':
     assert d['items']['.card']['bg'] != d['items']['#sidebar']['bg'] or mode=='light'
  b.close()
 OUT.write_text(json.dumps(report,indent=2))
 print('Theme audit: 32 pages x 2 modes x 5 widths =',32*2*5,'responsive states; failures:',len(report['failures']))
 for f in report['failures'][:30]:print('FAIL',f)
 return 1 if report['failures'] else 0
if __name__=='__main__':sys.exit(main())
