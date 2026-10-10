#!/usr/bin/env python3
"""Parse ../combined.html into data.js for the IELTS study site."""
import json, hashlib, re, os
from bs4 import BeautifulSoup, NavigableString, Tag

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'combined.html')
soup = BeautifulSoup(open(SRC, encoding='utf-8').read(), 'html.parser')
parts = soup.select('div.part')

META = [  # (key, short nav label, full title)
    ('plan', '计划', '复习计划'),
    ('grammar', '语法', '语法与口音'),
    ('templates', '模板', '写作口语模板'),
    ('dialogues', '对话', '口语对话'),
    ('mistakes', '错题', '错题记忆'),
    ('collocations', '搭配', '固定搭配与句式'),
]
KEEP_CLASSES = {'err', 'ok', 'blank', 'en', 'zh'}

def clean(node):
    """Return sanitized inner HTML of a node."""
    node = BeautifulSoup(str(node), 'html.parser')
    for t in node.find_all(True):
        attrs = {}
        cls = [c for c in t.get('class', []) if c in KEEP_CLASSES]
        if cls: attrs['class'] = cls
        if t.name == 'a' and t.get('href', '').startswith('http'):
            attrs.update(href=t['href'], target='_blank', rel='noopener')
        t.attrs = attrs
    root = node.find(True)
    return ''.join(str(c) for c in root.contents).strip() if root else str(node)

def text(node):
    return re.sub(r'\s+', ' ', node.get_text(' ', strip=True))

used = set()
def mkid(key, t):
    base = key + '-' + hashlib.sha1(t.encode()).hexdigest()[:10]
    i, h = 1, base
    while h in used:
        i += 1; h = f'{base}-{i}'
    used.add(h); return h

sections = []
for (key, short, title), part in zip(META, parts):
    h1 = part.find('h1').get_text(strip=True)
    nodes = []
    def item(html, txt, title=None, cells=None):
        nodes.append({'t': 'item', 'id': mkid(key, txt), 'title': title, 'html': html,
                      'cells': cells, 'q': txt.lower()})
    for ch in part.children:
        if isinstance(ch, NavigableString):
            if ch.strip(): nodes.append({'t': 'note', 'html': str(ch).strip()})
            continue
        cls = ch.get('class', [])
        if ch.name == 'h1':
            continue
        if ch.name in ('h2', 'h3'):
            nodes.append({'t': ch.name, 'text': ch.get_text(strip=True)})
        elif 'tip' in cls or ch.name == 'p':
            nodes.append({'t': 'note', 'html': clean(ch)})
        elif ch.name == 'table':
            header = None
            for tr in ch.find_all('tr'):
                cells = tr.find_all(['th', 'td'])
                if all(c.name == 'th' for c in cells) and header is None and len(cells) > 1:
                    header = [c.get_text(strip=True) for c in cells]; continue
                out = []
                for i, c in enumerate(cells):
                    lab = header[i] if header and i < len(header) else ('' if c.name != 'th' else None)
                    out.append({'label': lab, 'html': clean(c), 'th': c.name == 'th',
                                'cls': [x for x in c.get('class', []) if x in KEEP_CLASSES]})
                item(None, text(tr), cells=out)
        elif ch.name == 'ul':
            for li in ch.find_all('li', recursive=False):
                item(clean(li), text(li))
        elif ch.name == 'div':
            t = None
            h = ch.find(['h3', 'h4'])
            if h:
                t = h.get_text(strip=True); h.decompose()
            else:
                first = ch.find(True)
                if first is not None and first.name == 'b' and ch.contents and ch.contents[0] is first:
                    t = first.get_text(strip=True).rstrip('：:'); first.decompose()
                    # drop leading <br>
                    while ch.contents and (isinstance(ch.contents[0], Tag) and ch.contents[0].name == 'br' or (isinstance(ch.contents[0], NavigableString) and not ch.contents[0].strip())):
                        ch.contents[0].extract()
            item(clean(ch), (t or '') + ' ' + text(ch), title=t)
        else:
            nodes.append({'t': 'note', 'html': clean(ch)})
    n = sum(1 for x in nodes if x['t'] == 'item')
    sections.append({'key': key, 'short': short, 'title': title, 'source': h1, 'count': n, 'nodes': nodes})
    print(f'{key:13s} {h1:30s} items={n}')

cover = soup.select_one('.cover .sub')
data = {'built': __import__('datetime').date.today().isoformat(), 'cover': clean(cover) if cover else '', 'sections': sections}
with open(os.path.join(HERE, 'data.js'), 'w', encoding='utf-8') as f:
    f.write('window.IELTS_DATA=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('total items', sum(s['count'] for s in sections))
