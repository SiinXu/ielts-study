"""Playwright check: audio players load + play, official links tab, zero-Chinese on non-zh locales, screenshots.
Usage: python tools/verify_listening_audio.py http://127.0.0.1:8765 /workspace/ielts-audio-shots
Analytics requests (stats.incidental.site, cloudflareinsights) are blocked so the test does not pollute stats."""
import json, re, sys
from playwright.sync_api import sync_playwright
BASE, OUT = sys.argv[1].rstrip('/'), sys.argv[2]
HAN = re.compile(r'[\u3400-\u9fff\uf900-\ufaff]')
AUTONYMS = ['简体中文', '繁體中文', '日本語']  # 语言切换器里的自称（autonym），不算正文汉字
LANGS = ['zh', 'zh-Hant', 'en', 'ja', 'ko', 'ms', 'vi', 'fr', 'es', 'de']
NEWKEYS = list(json.load(open('tools/i18n-src/tr_listening_audio.json')).keys())
R = {'audio': [], 'files': [], 'official': None, 'i18n': [], 'errors': [], 'shots': []}

def ctx_new(b, w, h, theme='light', lang='en', mobile=False):
    c = b.new_context(viewport={'width': w, 'height': h}, is_mobile=mobile, has_touch=mobile, device_scale_factor=2 if mobile else 1)
    c.route(re.compile(r'https://(stats\.incidental\.site|static\.cloudflareinsights\.com)/.*'), lambda r: r.abort())
    c.add_init_script("try{localStorage.setItem('ielts.theme',%r);localStorage.setItem('ielts.lang',%r);localStorage.setItem('ielts.lmode','read')}catch(e){}" % (theme, lang))
    return c

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    c = ctx_new(b, 1440, 900); pg = c.new_page()
    pg.on('pageerror', lambda e: R['errors'].append(str(e)))
    resp = {}
    pg.on('response', lambda r: resp.__setitem__(r.url.split('/')[-1], r.status) if '/audio/listening/' in r.url else None)
    # 1) play three sets (GB / AU / US), then start-from-line
    for n in (1, 2, 5, 9):
        pg.goto(f'{BASE}/?lang=en#/practice/listening/{n}'); pg.wait_for_selector('.pl-play')
        pg.click('.pl-play'); pg.wait_for_timeout(3000)
        st = pg.evaluate("()=>{const a=document.querySelector('.pl-audio');return a&&{src:a.currentSrc.split('/').pop(),dur:a.duration,t:a.currentTime,paused:a.paused,rate:a.playbackRate,err:a.error&&a.error.code,now:(document.querySelector('.ln.now')||{}).dataset}}")
        pg.locator('.ln').nth(5).click(); pg.wait_for_timeout(1500)
        st2 = pg.evaluate("()=>{const a=document.querySelector('.pl-audio');return {t:a.currentTime,paused:a.paused,line:+(document.querySelector('.ln.now')||{dataset:{ln:-1}}).dataset.ln}}")
        st['from_line5'] = st2; st['http'] = resp.get(st['src'] if st else '', None)
        R['audio'].append(st)
        pg.click('.pl-play')  # stop
    # 2) every file: HTTP 200 + duration > 0
    meta = pg.evaluate('window.IELTS_LISTENING_AUDIO')
    for k, m in meta.items():
        r = pg.request.get(f"{BASE}/{m['src']}")
        d = pg.evaluate("src=>new Promise(res=>{const a=new Audio();a.preload='metadata';a.onloadedmetadata=()=>res(a.duration);a.onerror=()=>res(-1);a.src=src})", m['src'])
        R['files'].append({'id': k, 'status': r.status, 'bytes': len(r.body()), 'duration': round(d, 2), 'accent': m['accent'], 'voices': m['voices']})
    # 3) official tab
    pg.goto(f'{BASE}/?lang=en#/practice/official'); pg.wait_for_selector('#off-types')
    R['official'] = pg.evaluate("()=>[...document.querySelectorAll('.sets a.set[target=_blank]')].map(a=>({href:a.href,rel:a.rel,group:a.closest('.sets').previousElementSibling.id,title:a.querySelector('b').textContent}))")
    c.close()
    # 4) zero-Chinese check per locale on the pages this change touches
    pages = ['#/practice/listening', '#/practice/official', '#/practice/listening/1', '#/practice/listening/2', '#/practice/listening/5', '#/home']
    for L in LANGS:
        c = ctx_new(b, 1280, 900, lang=L); pg = c.new_page()
        pg.on('pageerror', lambda e, L=L: R['errors'].append(L + ': ' + str(e)))
        row = {'lang': L, 'han': {}, 'untranslated_new_keys': None}
        for h in pages:
            pg.goto(f'{BASE}/?lang={L}{h}'); pg.wait_for_timeout(700)
            t = pg.evaluate("()=>{const c=document.body.cloneNode(true);c.querySelectorAll('script,style,[hidden],template').forEach(e=>e.remove());return c.innerText+' '+[...document.querySelectorAll('[aria-label],[title],[placeholder]')].map(e=>(e.getAttribute('aria-label')||'')+(e.getAttribute('title')||'')+(e.getAttribute('placeholder')||'')).join(' ')}")
            for a in AUTONYMS: t = t.replace(a, '')
            hs = HAN.findall(t); row['han'][h] = len(hs)
            if hs and L not in ('zh', 'zh-Hant', 'ja'): row.setdefault('samples', {})[h] = ''.join(hs[:30])
        if L not in ('zh',):
            row['untranslated_new_keys'] = pg.evaluate("keys=>keys.filter(k=>I18N.t(k)===k)", NEWKEYS)
        R['i18n'].append(row); c.close()
    # 5) screenshots
    shots = [('desktop', 1440, 900, False), ('mobile', 390, 844, True)]
    for name, w, h, mob in shots:
        for theme in ('light', 'dark'):
            for lang, route, tag in (('en', '#/practice/official', 'official'), ('en', '#/practice/listening', 'list'), ('zh', '#/practice/official', 'official-zh')):
                c = ctx_new(b, w, h, theme, lang, mob); pg = c.new_page()
                pg.goto(f'{BASE}/?lang={lang}{route}'); pg.wait_for_timeout(900)
                f = f'{OUT}/{tag}-{name}-{theme}.png'; pg.screenshot(path=f, full_page=(tag != 'list')); R['shots'].append(f); c.close()
            c = ctx_new(b, w, h, theme, 'en', mob); pg = c.new_page()
            pg.goto(f'{BASE}/?lang=en#/practice/listening/2'); pg.wait_for_selector('.pl-play'); pg.click('.pl-play'); pg.wait_for_timeout(5500)
            f = f'{OUT}/player-playing-{name}-{theme}.png'; pg.screenshot(path=f); R['shots'].append(f); c.close()
    b.close()
json.dump(R, open(f'{OUT}/verify-results.json', 'w'), indent=1, ensure_ascii=False)
print(json.dumps({'audio': R['audio'], 'files_ok': sum(1 for f in R['files'] if f['status'] == 200 and f['duration'] > 0), 'files': len(R['files']),
                  'official': len(R['official']), 'i18n': R['i18n'], 'errors': R['errors'][:10], 'shots': len(R['shots'])}, indent=1, ensure_ascii=False))
