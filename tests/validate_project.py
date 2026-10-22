"""Offline structural smoke checks for the ERP Pro static demo."""
from pathlib import Path
import re, shutil, subprocess, sys
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
NAMES='''index signin signup error-404 error-500 inventory addproduct categorylist brandlist sales add-sales salesreturnlist purchase addpurchase purchasereturnlist pos expense quotation transfer customerlist supplierlist userlist barcode profile activities hrms crm finance warehouse ecommerce reports settings'''.split()
class Scanner(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.links=[];self.labels=set();self.inputs=[];self.tables=[];self.table_captions=[];self._in_table=0
    def handle_starttag(self,t,a):
        d=dict(a)
        if 'id' in d:self.ids.append(d['id'])
        if t=='a' and 'href' in d:self.links.append(d['href'])
        if t=='label' and 'for' in d:self.labels.add(d['for'])
        if t in ('input','select','textarea') and 'id' in d and d.get('type') not in ('checkbox','radio','hidden') and 'aria-label' not in d:self.inputs.append(d['id'])
        if t=='table':self.tables.append(False);self._in_table+=1
        if t=='caption' and self._in_table:self.tables[-1]=True
    def handle_endtag(self,t):
        if t=='table':self._in_table=max(0,self._in_table-1)
errors=[]
for name in NAMES:
    page=ROOT/(name+'.html')
    if not page.exists():errors.append('Missing page: '+page.name);continue
    text=page.read_text(encoding='utf8');scanner=Scanner();scanner.feed(text)
    if not text.startswith('<!DOCTYPE html>'):errors.append(page.name+': missing doctype')
    if 'assets/css/style.css' not in text or 'assets/js/script.js' not in text:errors.append(page.name+': missing shared assets')
    dup={id for id in scanner.ids if scanner.ids.count(id)>1}
    if dup:errors.append(page.name+': duplicate IDs: '+str(sorted(dup)))
    for href in scanner.links:
        href=href.split('#')[0]
        if href.endswith('.html') and not (ROOT/href).exists():errors.append(page.name+': broken href '+href)
    for field in scanner.inputs:
        if field not in scanner.labels:errors.append(page.name+': unlabeled field '+field)
    if not all(scanner.tables):errors.append(page.name+': missing table captions')
    if name not in ('signin','signup','error-404','error-500','pos') and ('id="header"' not in text or 'id="sidebar"' not in text):errors.append(page.name+': missing shell')
    if name=='pos' and ('id="sidebar"' in text or 'id="page-wrapper"' in text):errors.append(page.name+': POS must be standalone')
for rel in ['assets/css/style.css','assets/js/script.js','assets/js/seed.js','assets/img/logo.png','assets/img/logo-small.png','assets/img/favicon.png','assets/img/avatar.png','assets/img/login-bg.jpg']:
    if not (ROOT/rel).exists():errors.append('Missing asset: '+rel)
if shutil.which('node'):
    for path in ['assets/js/script.js','assets/js/seed.js']:
        ret=subprocess.run(['node','--check',str(ROOT/path)],capture_output=True,text=True)
        if ret.returncode:errors.append(path+': JS syntax failure: '+ret.stderr)
if errors:
    print('FAIL —',len(errors),'errors');print(*errors,sep='\n');sys.exit(1)
print('PASS —',len(NAMES),'pages; all internal links, assets, unique IDs, input labels, table captions and syntax checks.')
