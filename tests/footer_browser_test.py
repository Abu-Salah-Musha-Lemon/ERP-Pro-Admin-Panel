"""Offline responsive/dark-mode/functional footer checks for v3.0.1.

Uses local CSS/Bootstrap substitutes, not full online CDN integration.
"""
from pathlib import Path
import sys, json, os, shutil
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent))
from browser_test import html as offline_html
ROOT=Path(__file__).resolve().parents[1]
RESULT=ROOT/'tests/footer_browser_results.json'
PAGES=sorted(ROOT.glob('*.html'))
WH=[320,390,768,1440]
THEMES=['light','dark']
errors=[]; checks=0

def contrast(c1,c2):
 def rgb(s):
  import re
  ns=[float(x) for x in re.findall(r'[\d.]+',s)[:3]]
  if len(ns)!=3:return [0,0,0]
  return [v/255 for v in ns]
 def luminance(c):
  vals=[(v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4) for v in rgb(c)]
  return vals[0]*0.2126+vals[1]*0.7152+vals[2]*0.0722
 a,b=sorted([luminance(c1),luminance(c2)],reverse=True)
 return round((a+0.05)/(b+0.05),2)

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':900},reduced_motion='reduce')
 page.set_default_timeout(3000)
 js_errors=[];page.on('pageerror',lambda e:js_errors.append(str(e)))
 for fname in PAGES:
  for theme in THEMES:
   js_errors.clear()
   raw=offline_html(fname)
   # Preserve a persistent default theme without relying on synthetic localStorage.
   if theme=='dark': raw=raw.replace('</head>', '<script>localStorage.setItem("erpProDemoV2:dark","true");document.documentElement.dataset.theme="dark";document.documentElement.setAttribute("data-bs-theme","dark");</script></head>')
   else: raw=raw.replace('</head>', '<script>localStorage.removeItem("erpProDemoV2:dark");document.documentElement.removeAttribute("data-theme");document.documentElement.setAttribute("data-bs-theme","light");</script></head>')
   try: page.set_content(raw,wait_until='domcontentloaded',timeout=15000)
   except Exception as e:errors.append(f'{fname.name} {theme} load: {e}');continue
   for w in WH:
    page.set_viewport_size({'width':w,'height':900})
    info=page.evaluate('''() => {let f=document.querySelector('.site-footer'),s=getComputedStyle(f),b=f.getBoundingClientRect(),main=document.querySelector('#page-wrapper,.pos-wrapper,.auth-body,.error-page');return {footers:document.querySelectorAll('.site-footer').length,donateHidden:f.querySelector('[data-donation-link]').hidden,width:document.documentElement.scrollWidth,viewport:innerWidth,footerColor:s.color,background:s.backgroundColor,border:s.borderTopColor,hasCredit:f.innerText.includes('Abu Salah Musha Lemon'),footerLeft:b.left,footerRight:b.right,footerTop:b.top,mainBottom:main.getBoundingClientRect().bottom,footerHeight:b.height,bodyTheme:document.body.getAttribute('data-theme'),htmlTheme:document.documentElement.getAttribute('data-theme')} }''')
    checks+=1
    if info['footers']!=1 or not info['donateHidden'] or not info['hasCredit']: errors.append(f'{fname.name} {theme} {w}: footer/credit/donate incorrect: {info}')
    if info['width']>w+2:errors.append(f'{fname.name} {theme} {w}: horizontal scroll width={info["width"]}')
    if info['footerLeft']<-2 or info['footerRight']>w+2:errors.append(f'{fname.name} {theme} {w}: footer extends offscreen')
    if info['footerHeight']<30:errors.append(f'{fname.name} {theme} {w}: footer too short')
    if contrast(info['footerColor'],info['background'])<4.5:errors.append(f'{fname.name} {theme} {w}: contrast {contrast(info["footerColor"],info["background"])}')
    if theme=='dark' and info['htmlTheme']!='dark':errors.append(f'{fname.name} dark {w}: theme lost')
    if fname.name in ['signin.html','signup.html','error-404.html','error-500.html'] and info['footerTop'] < info['mainBottom']-2:errors.append(f'{fname.name} {theme} {w}: footer overlaps main')
    if fname.name=='pos.html' and info['footerTop']<info['mainBottom']-info['footerHeight']-2:errors.append(f'{fname.name} {theme} {w}: footer outside POS')
    if fname.name in ['index.html','signin.html','pos.html'] and w==1440:
     output=ROOT/'docs/screenshots'/f'{fname.stem}-footer-{theme}.png'
     page.screenshot(path=str(output),full_page=True,animations='disabled')
   if js_errors: errors.append(f'{fname.name} {theme}: {js_errors[:2]}')
   print('checked',fname.name,theme,flush=True)
 # Dedicated donation configuration show/hide test
 raw=offline_html(ROOT/'index.html').replace('</head>','<script>window.ERP_CONFIG={donationUrl:"https://example.org/support"};</script></head>')
 page.set_content(raw,wait_until='domcontentloaded')
 page.wait_for_timeout(40)
 configured=page.locator('[data-donation-link]')
 if configured.is_hidden() or configured.get_attribute('href')!='https://example.org/support':errors.append('configured donate link failed')
 raw=offline_html(ROOT/'index.html').replace('</head>','<script>window.ERP_CONFIG={donationUrl:"javascript:alert(1)"};</script></head>')
 page.set_content(raw,wait_until='domcontentloaded')
 page.wait_for_timeout(40)
 if not page.locator('[data-donation-link]').is_hidden():errors.append('unsafe URL should be ignored')
 browser.close()
RESULT.write_text(json.dumps({'page_count':len(PAGES),'theme_width_checks':checks,'screenshots':['docs/screenshots/index-footer-light.png','docs/screenshots/index-footer-dark.png','docs/screenshots/signin-footer-light.png','docs/screenshots/signin-footer-dark.png','docs/screenshots/pos-footer-light.png','docs/screenshots/pos-footer-dark.png'],'errors':errors},indent=2),encoding='utf8')
print('DONE:',len(PAGES),'pages,',checks,'theme/viewport checks,',len(errors),'errors',flush=True)
for e in errors:print('FAILED:',e,flush=True)
raise SystemExit(bool(errors))
