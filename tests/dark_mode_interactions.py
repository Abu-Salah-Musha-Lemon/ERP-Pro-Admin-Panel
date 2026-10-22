"""Offline interactive and contrast checks specific to the color/border fix."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_test import ROOT,html
import re,sys,json,shutil
RESULT=ROOT/'tests/dark_mode_results.json'

def rgb(s):
 v=[float(x) for x in re.findall(r'[\d.]+',s)][:3]
 return v if len(v)==3 else None

def lum(v):
 q=[c/255 for c in v]
 q=[a/12.92 if a<=.04045 else ((a+.055)/1.055)**2.4 for a in q]
 return .2126*q[0]+.7152*q[1]+.0722*q[2]
def contrast(a,b):
 a,b=sorted((lum(a),lum(b)),reverse=True)
 return (a+.05)/(b+.05)

def sample(pg):
 return pg.evaluate('''() => {
 const sels=['body','.card','.page-title','.page-subtitle','.card-title','.stat-value','.stat-label','.status-badge','.badge-low','.badge-inactive','.table thead th','.table tbody td','.form-control','.form-select','.form-control::placeholder','.btn-primary','.sidebar-menu>ul>li>a.active'];
 let out={};
 for(let sel of sels){
   if(sel.includes('::')) continue;
   let e=document.querySelector(sel);if(!e)continue;
   const c=getComputedStyle(e);
   let bg=c.backgroundColor,pa=e;
   while((bg==='rgba(0, 0, 0, 0)'||bg==='transparent')&&pa.parentElement){pa=pa.parentElement;bg=getComputedStyle(pa).backgroundColor;}
   out[sel]={fg:c.color,bg,border:c.borderTopColor};
 }
 return out;
}''')

def check_color(samples,tag,issues):
 for selector in ['body','.page-title','.page-subtitle','.card-title','.stat-value','.stat-label','.status-badge','.badge-low','.badge-inactive','.table thead th','.table tbody td','.form-control','.form-select','.btn-primary','.sidebar-menu>ul>li>a.active']:
  if selector not in samples:continue
  s=samples[selector];a=rgb(s['fg']);b=rgb(s['bg']);
  if not a or not b:continue
  value=contrast(a,b)
  if value<4.5:issues.append(f'{tag} {selector} text contrast {value:.2f}<4.5')

def main():
 report={'checks':[],'contrast':{},'issues':[]}
 with sync_playwright() as p:
  b=p.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox'])
  pg=b.new_page(viewport={'width':1366,'height':860},reduced_motion='reduce')
  pg.set_default_timeout(2400)
  for mode in ['light','dark']:
   for fname in ['index.html','inventory.html','settings.html','pos.html']:
    raw=html(ROOT/fname).replace('window.__erpTestStore=window.__erpTestStore||{};',f"window.__erpTestStore={{'erpProDemoV2:dark':'{str(mode=='dark').lower()}'}};")
    pg.set_content(raw,wait_until='domcontentloaded')
    smp=sample(pg)
    check_color(smp,f'{fname}/{mode}',report['issues'])
    report['contrast'][f'{fname}/{mode}']=smp
    # Check custom card border and editable inputs against the shared semantic theme tokens.
    ok=pg.evaluate('''() => {
    let bg=getComputedStyle(document.documentElement);
    let c=document.querySelector('.card'),f=document.querySelector('.form-control');
    let card=c?getComputedStyle(c):null,form=f?getComputedStyle(f):null;
    return {card:card?.borderTopColor,border:bg.getPropertyValue('--border-color').trim(),input:form?.borderTopColor,strong:bg.getPropertyValue('--border-strong').trim()};
    }''')
    if fname in ['index.html','inventory.html','settings.html']:
     assert ok['card']==('rgb(64, 83, 109)' if mode=='dark' else 'rgb(217, 226, 236)'),f'{fname}: card border mismatch'
    if fname in ['inventory.html','settings.html','pos.html']:
     assert ok['input']==('rgb(110, 131, 158)' if mode=='dark' else 'rgb(131, 149, 170)'),f'{fname}: input border mismatch'
    report['checks'].append(f'{fname}/{mode}: semantic colors and borders')
  # Theme persistence and dark modal with records.
  pg.set_content(html(ROOT/'inventory.html'),wait_until='domcontentloaded')
  if pg.locator('html').get_attribute('data-theme')!='dark':pg.locator('#dark-mode-btn').click()
  pg.locator('table[data-entity="products"] .btn-edit').first.click()
  pg.locator('#record-modal.show').wait_for(state='visible',timeout=2000)
  assert pg.locator('#record-modal.show').count()==1
  assert pg.locator('#record-modal .form-control').count()>0
  assert pg.locator('#record-modal .form-control').first.evaluate("(e)=>getComputedStyle(e).backgroundColor")=='rgb(26, 42, 66)'
  report['checks'].append('Dark CRUD modal background and input contrast')
  # Open header notifications in dark mode and ensure the dropdown background is not pale.
  pg.locator('#record-modal .btn-close').first.click()
  pg.locator('.notif-dropdown>button').first.click()
  assert pg.locator('.notif-dropdown .dropdown-menu').first.evaluate("(e)=>getComputedStyle(e).backgroundColor")=='rgb(34, 51, 77)'
  report['checks'].append('Dark notifications dropdown uses raised surface')
  # Persist in same tab navigation without losing mode
  store=pg.evaluate("localStorage.getItem('erpProDemoV2:dark')")
  assert store=='true'
  pg.set_content(html(ROOT/'settings.html'),wait_until='domcontentloaded')
  assert pg.locator('html').get_attribute('data-theme')=='dark'
  report['checks'].append('Dark theme persisted across page navigation')
  b.close()
 RESULT.write_text(json.dumps(report,indent=2))
 print('Dark mode interactions:',len(report['checks']),'checks; contrast issues:',len(report['issues']))
 for s in report['issues']:print('CONTRAST ISSUE',s)
 return 1 if report['issues'] else 0
if __name__=='__main__':sys.exit(main())
