"""Static regression checks for v3.0.1 footer / attribution."""
from pathlib import Path
from html.parser import HTMLParser
root = Path(__file__).resolve().parents[1]
class P(HTMLParser):
    def __init__(self):
        super().__init__();self.tags=[];self.footer=[];self.main=[];self.link=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='footer':self.footer.append(a)
        if tag=='main':self.main.append(a)
        if tag=='a' and 'data-donation-link' in a:self.link.append(a)
        self.tags.append(tag)
files=sorted(root.glob('*.html'))
assert len(files)==32,len(files)
assert (root/'LICENSE').exists() and (root/'NOTICE').exists()
assert 'Apache License' in (root/'LICENSE').read_text()
assert 'Abu Salah Musha Lemon' in (root/'NOTICE').read_text()
for f in files:
    s=f.read_text();p=P();p.feed(s)
    assert len(p.footer)==1, (f.name, 'footer count', len(p.footer))
    assert len(p.link)==1 and 'hidden' in p.link[0],(f.name,'donate is hidden by default')
    assert s.index('<footer')<s.index('</body>'),f.name
    assert 'Abu Salah Musha Lemon' in s and 'href="LICENSE"' in s and 'href="NOTICE"' in s, f.name
    assert s.count('<script src="assets/js/project-config.js"></script>')==1, f.name
    assert s.index('assets/js/project-config.js')<s.index('assets/js/script.js'),f.name
    assert 'SPDX-License-Identifier: Apache-2.0' in s,f.name
    assert len(p.main)==1,(f.name,'main count')
print('PASS: 32/32 footers, donation hidden, legal credit, and configured JS order')
