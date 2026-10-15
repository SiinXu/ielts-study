#!/usr/bin/env python3
"""Build content/explain.js: per-question evidence (verbatim quote from the transcript/passage), keyword and
paraphrase matches, and distractor locations for every listening and reading practice question.
Paraphrase pairs are found via shared Chinese glosses in the bundled ECDICT dictionary (dict/), then reviewed;
overrides in tools/explain_overrides.json win. Run: node tools/dump.js && python3 tools/build_explain.py"""
import json, re, os
HERE = os.path.dirname(os.path.abspath(__file__))
D = json.load(open('/tmp/ielts_data.json')); DIC = json.load(open('/tmp/ielts_dict.json'))
G, INFL = DIC['g'], DIC['infl']
OV = json.load(open(os.path.join(HERE,'explain_overrides.json'))) if os.path.exists(os.path.join(HERE,'explain_overrides.json')) else {}
STOP = set('''a an the and or but if of to in on at for with by from as is are was were be been being it its this that these those there here
i you he she we they me him her us them my your his our their what which who whom whose when where why how do does did done not no yes
so than then too very can could will would should may might must shall have has had having about into over after before up down out
also just only more most some any all each other such own same both few much many one two three ___ s t don isn didn doesn wasn re ll ve
according paragraph writer passage text say says said think thinks main mainly mostly main reason because'''.split())
NUM = {'one':'1','two':'2','three':'3','four':'4','five':'5','six':'6','seven':'7','eight':'8','nine':'9','ten':'10','eleven':'11','twelve':'12','fifteen':'15','twenty':'20','thirty':'30','forty':'40','fifty':'50','hundred':'100'}
def lem(w):
    w = w.lower().strip("'")
    if w in INFL: w = INFL[w]
    for suf in ('ies','es','s','ing','ed','ly'):
        if w.endswith(suf) and len(w) - len(suf) >= 4 and w[:-len(suf)] in G: return w[:-len(suf)]
    return w
def toks(s): return [w for w in re.findall(r"[A-Za-z][A-Za-z'-]*|\d+", s)]
def content(s): return [w for w in toks(s) if w.lower() not in STOP and len(w) > 2 or w.isdigit()]
_gl = {}
def gloss(w):
    w = lem(w)
    if w in _gl: return _gl[w]
    out = set()
    for line in G.get(w, []):
        line = re.sub(r'\[[^\]]*\]|（[^）]*）|\([^)]*\)', '', line)
        line = re.sub(r'\b(n|v|vt|vi|adj|adv|a|prep|conj|pron|num|art|int)\.', ' ', line)
        for t in re.split(r'[;；,，、\s]+', line):
            t = re.sub(r'[^\u4e00-\u9fff]', '', t)
            if len(t) >= 2: out.add(t)
    _gl[w] = out; return out
GENERIC = {'东西','事情','方面','进行','使用','可以','一个','时间','地方','情况','部分','方式','问题','工作','人们','表示','有关','关于','开始','做出','得到','给予','具有','成为','发生','出现'}
BAD = {('blocking','street'),('closed','top'),('developed','planting'),('early','forward'),('given','results'),('machine','wheel'),('made','working'),('present','introduction'),('scale','ways'),('thought','seen'),('time','staying'),('wind','air'),('work','start')}
def syn(a, b):
    la, lb = lem(a), lem(b)
    if (a.lower(), b.lower()) in BAD: return False
    if la == lb or len(la) < 3 or len(lb) < 3: return False
    ga, gb = gloss(la) - GENERIC, gloss(lb) - GENERIC
    return bool(ga & gb)
def units_L(s): return [dict(sp=l[0], t=l[1]) for l in s['lines']]
def units_R(s):
    out = []
    for pi, para in enumerate(s['p']):
        for sent in re.split(r'(?<=[.!?])\s+(?=[A-Z"\'])', para):
            if sent.strip(): out.append(dict(sp=pi+1, t=sent.strip()))
    return out
def score(u, qw, w2=None):
    ul = {lem(x) for x in content(u['t'])}; ut = content(u['t'])
    sc = sum(1 for w in qw if lem(w) in ul)
    sc += 0.6 * sum(1 for w in qw if lem(w) not in ul and any(syn(w, x) for x in ut))
    if w2: sc += 2 * sum(1 for w in w2 if lem(w) in ul) + 1.2 * sum(1 for w in w2 if lem(w) not in ul and any(syn(w, x) for x in ut))
    return sc
def norm(s): return re.sub(r'[^a-z0-9 ]', ' ', s.lower())
def has_ans(u, alts):
    t = ' ' + re.sub(r'\s+', ' ', norm(u['t'].replace('-', ' '))) + ' '
    t = re.sub(r'(?<=\d) (?=\d)', '', t)
    for a in alts:
        a = re.sub(r'\s+', ' ', norm(a.replace('-', ' '))).strip()
        if a and (' '+a+' ') in t: return True
    return False
def pairs(qw, u, extra=()):
    ut = content(u['t']); ul = {lem(x): x for x in ut}; out = []; seen = set()
    for w in list(extra) + list(qw):
        lw = lem(w)
        if lw in seen: continue
        if lw in ul: out.append([w, ul[lw], 0]); seen.add(lw)
        else:
            m = next((x for x in ut if syn(w, x)), None)
            if m: out.append([w, m, 1]); seen.add(lw)
    out.sort(key=lambda p: -p[2]); return out[:4]
def explain(s, kind):
    U = units_L(s) if kind == 'L' else units_R(s); res = []
    for qi, q in enumerate(s['qs']):
        key = f"{s['id']}:{qi}"; qw = content(q['q']); e = {}
        if q['t'] == 'gap':
            alts = list(q['a']) + [k for k, v in NUM.items() if v in q['a']]
            cand = [i for i, u in enumerate(U) if has_ans(u, alts)]
            if cand: bi = cand[-1] if kind == 'L' else max(cand, key=lambda i: (score(U[i], qw), -i))  # listening: the final/confirmed mention
            else: bi = max(range(len(U)), key=lambda i: score(U[i], qw))
            e['found'] = bool(cand); kw = pairs(qw, U[bi])
        elif q['t'] == 'mcq':
            ow = content(q['o'][q['a']])
            bi = max(range(len(U)), key=lambda i: (score(U[i], qw, ow), -i if kind == 'R' else i))
            kw = pairs(qw, U[bi], ow)
            ds = []
            for oi, o in enumerate(q['o']):
                if oi == q['a']: continue
                w = content(o)
                if not w: continue
                sc = [(sum(1 for x in w if lem(x) in {lem(y) for y in content(u['t'])}), i) for i, u in enumerate(U)]
                best = max(sc)
                if best[0] >= max(1, len(w) // 2): ds.append([oi, U[best[1]]['t'], U[best[1]]['sp']])
            e['d'] = ds
        else:
            bi = max(range(len(U)), key=lambda i: (score(U[i], qw), -i))
            kw = pairs(qw, U[bi])
        e.update(t=U[bi]['t'], s=U[bi]['sp'], k=kw)
        if key in OV: e.update(OV[key])
        res.append(e)
    return res
OUT = {}
for s in D['L']: OUT[s['id']] = explain(s, 'L')
for s in D['R']: OUT[s['id']] = explain(s, 'R')
json.dump(OUT, open('/tmp/explain.json','w'), ensure_ascii=False, indent=0)
js = ('/* generated by tools/build_explain.py: per-question evidence (verbatim from the original script/passage),\n'
      '   keyword/paraphrase matches and distractor locations. Rendered by study.js (explainHTML). */\n'
      'window.IELTS_EXPLAIN = ' + json.dumps(OUT, ensure_ascii=False, separators=(',',':')) + ';\n')
open(os.path.join(HERE, '..', 'content', 'explain.js'), 'w').write(js)
print('sets', len(OUT), 'qs', sum(len(v) for v in OUT.values()), 'gap-not-found', sum(1 for v in OUT.values() for e in v if e.get('found') is False))
