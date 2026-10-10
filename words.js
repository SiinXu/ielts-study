/* 雅思 7.5 · 划词释义 + 单词本 + 单词间隔复习
   - 划词：在正文 / 抽屉里选中英文单词或短语，弹出释义卡（离线词典 dict/*.js，按首字母懒加载）。
   - 单词本：localStorage ielts.words {key:{w,ipa,g,note,ctx,src,added,lv,due,last,n,lapse,done}}
     状态：新词（还没复习过）/ 学习中 / 已掌握（走完 30 天）。
   - 复习：1 / 3 / 7 / 14 / 30 天。不熟 → 回到 1 天；一般 → 进一级；熟悉 → 跳一级。每次评分都可撤销。
   路由：#/words  #/words/review（app.js 的 parse/canon 已接入）。 */
(function(){
'use strict';
var INT = [1, 3, 7, 14, 30];
var KEY = 'ielts.words';
function A(){ return window.IELTS_APP; }
function T(s, v){ return window.I18N.t(s, v); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function $(id){ return document.getElementById(id); }
function ic(n){ return A() ? A().ic(n) : ''; }
function pad(n){ return (n<10?'0':'')+n; }
function ymd(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function pd(s){ var p = String(s).split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
function today(){ return ymd(new Date()); }
function addDays(s, n){ var d = pd(s); d.setDate(d.getDate()+n); return ymd(d); }
function mdz(s){ try{ return pd(s).toLocaleDateString(window.I18N.locale, {month:'short', day:'numeric'}); }catch(e){ return s; } }

/* ---------- 存储 ---------- */
var W = (function(){ try{ var v = JSON.parse(localStorage.getItem(KEY) || '{}'); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; }catch(e){ return {}; } })();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(W)); }catch(e){} badge(); }
function norm(s){ return String(s||'').toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ').trim(); }
function status(r){ return r.done ? 'mastered' : r.n ? 'learning' : 'new'; }
function dueList(){ var t = today(); return Object.keys(W).filter(function(k){ var r = W[k]; return !r.done && r.due && r.due <= t; }).sort(function(a, b){ var x = W[a], y = W[b]; return (x.n ? 0 : 1) - (y.n ? 0 : 1) || (x.due < y.due ? -1 : x.due > y.due ? 1 : 0); }); }
function snap(k){ return W[k] ? JSON.parse(JSON.stringify(W[k])) : null; }
function restore(k, v){ if (v) W[k] = v; else delete W[k]; save(); }
function addWord(info, ctx){
  var k = norm(info.head); if (!k) return null;
  var t = today();
  if (!W[k]) W[k] = {w: info.head, ipa: info.ipa || '', g: (info.gloss || []).join('\n'), note: '', ctx: ctx && ctx.sent || '', src: ctx && ctx.src || '', added: t, lv: -1, due: t, last: null, n: 0, lapse: 0, done: 0, man: info.man ? 1 : 0};
  save(); return k;
}
/* 评分：0 不熟 · 1 一般 · 2 熟悉 */
function nextLv(r, q){ var lv = r.lv == null ? -1 : r.lv; return q === 0 ? 0 : q === 1 ? (lv < 0 ? 0 : lv + 1) : (lv < 0 ? 1 : lv + 2); }
function preview(r, q){ var lv = nextLv(r, q); return lv >= INT.length ? T('已掌握') : T('{n} 天', {n: INT[lv]}); }
function grade(k, q){
  var r = W[k]; if (!r) return;
  var t = today(), lv = nextLv(r, q);
  r.n = (r.n || 0) + 1; r.last = t;
  if (q === 0) r.lapse = (r.lapse || 0) + 1;
  if (lv >= INT.length){ r.lv = INT.length - 1; r.done = 1; r.due = null; }
  else { r.lv = lv; r.done = 0; r.due = addDays(t, INT[lv]); }
  save();
}

/* ---------- 离线词典（按首字母懒加载） ---------- */
var DICT = {}, RED = {}, loaded = {}, waiting = {};
window.IELTS_DICT_SHARD = function(ch, e, r){ for (var k in e) DICT[k] = e[k]; for (var f in r) RED[f] = r[f]; loaded[ch] = 1; (waiting[ch] || []).forEach(function(fn){ fn(); }); waiting[ch] = []; };
function shard(ch, cb){
  ch = /[a-z]/.test(ch) ? ch : '_';
  if (loaded[ch]) return cb();
  if (waiting[ch]){ waiting[ch].push(cb); return; }
  waiting[ch] = [cb];
  var s = document.createElement('script'); s.src = 'dict/'+ch+'.js'; s.charset = 'utf-8';
  s.onerror = function(){ loaded[ch] = 1; (waiting[ch] || []).forEach(function(fn){ fn(); }); waiting[ch] = []; };
  document.head.appendChild(s);
}
var INFL = /(的过去式|的过去分词|的现在分词|的复数|第三人称单数|的比较级|的最高级|的变形)/;
function stems(w){
  var o = [], add = function(x){ if (x && x.length > 1 && o.indexOf(x) < 0) o.push(x); };
  if (/'s$/.test(w)) add(w.slice(0, -2));
  if (/ies$/.test(w)) add(w.slice(0, -3)+'y');
  if (/(s|x|z|ch|sh|o)es$/.test(w)) add(w.slice(0, -2));
  if (/s$/.test(w) && !/ss$/.test(w)) add(w.slice(0, -1));
  if (/ied$/.test(w)) add(w.slice(0, -3)+'y');
  if (/ed$/.test(w)){ add(w.slice(0, -2)); add(w.slice(0, -1)); if (/([b-df-hj-np-tv-z])\1ed$/.test(w)) add(w.slice(0, -3)); }
  if (/ing$/.test(w)){ add(w.slice(0, -3)); add(w.slice(0, -3)+'e'); if (/([b-df-hj-np-tv-z])\1ing$/.test(w)) add(w.slice(0, -4)); }
  if (/ily$/.test(w)) add(w.slice(0, -3)+'y');
  if (/ly$/.test(w)) add(w.slice(0, -2));
  if (/iest$|ier$/.test(w)) add(w.replace(/(iest|ier)$/, 'y'));
  if (/est$/.test(w)){ add(w.slice(0, -3)); add(w.slice(0, -2)); }
  if (/er$/.test(w)){ add(w.slice(0, -2)); add(w.slice(0, -1)); }
  return o;
}
function pack(head, e, form){
  return {head: head, form: form && form !== head ? form : '', ipa: e.p || '', gloss: e.g || [], def: e.d || '', tags: e.t || '', collins: e.c || 0, ex: e.x || [], found: true};
}
function resolve(w){
  var e = DICT[w], lem = RED[w];
  var adjForm = e && (e.c || 0) >= 1 && /^(a|adj|adv)\./.test((e.g || [''])[0]);    /* crowded / interested 这类形容词用法本身就是词条 */
  if (lem && DICT[lem] && adjForm && !INFL.test((e.g || []).join(' '))){ var q = pack(w, e, ''); q.base = lem; q.own = (DICT[lem].g || []).slice(0, 2); return q; }
  if (lem && DICT[lem] && (!e || INFL.test((e.g || []).join(' ')) || (DICT[lem].c || 0) > (e.c || 0) || !e.x && DICT[lem].x)){
    var p = pack(lem, DICT[lem], w);
    if (e && !p.ex.length && e.x) p.ex = e.x;
    if (e && !INFL.test((e.g || []).join(' '))) p.own = (e.g || []).slice(0, 2);   /* 变形本身也有独立意思，如 running n. 跑步 */
    return p;
  }
  if (e) return pack(w, e, '');
  if (lem && DICT[lem]) return pack(lem, DICT[lem], w);
  var st = stems(w);
  for (var i = 0; i < st.length; i++){ var s = st[i]; if (DICT[s]) return pack(s, DICT[s], w); if (RED[s] && DICT[RED[s]]) return pack(RED[s], DICT[RED[s]], w); }
  return null;
}
function lookup(text, cb){
  var w = norm(text).replace(/^[^a-z]+|[^a-z]+$/g, '');
  if (!w) return cb(null, w);
  shard(w[0], function(){
    var r = resolve(w);
    if (!r && w.indexOf(' ') > 0){
      var parts = w.split(' '), first = parts[0], rest = parts.slice(1).join(' ');
      var lem = RED[first] || (stems(first).filter(function(s){ return DICT[s+' '+rest]; })[0]);
      if (lem && DICT[lem+' '+rest]) r = pack(lem+' '+rest, DICT[lem+' '+rest], w);
    }
    cb(r, w);
  });
}
function posSplit(line){ var m = String(line).match(/^((?:[a-z]{1,5}\.)(?:\s*[&,\/]\s*[a-z]{1,5}\.)*)\s*(.*)$/i); return m ? [m[1], m[2]] : ['', line]; }
var TAGN = {I:'IELTS', T:'TOEFL', '6':'CET-6', '4':'CET-4', G:'GRE', K:'考研'};

/* ---------- 发音（浏览器自带朗读） ---------- */
function speak(w){
  if (!('speechSynthesis' in window)) { A() && A().toast(T('这个浏览器不支持朗读')); return; }
  try{ speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(w); u.lang = 'en-GB'; u.rate = .9;
    var v = speechSynthesis.getVoices().filter(function(x){ return /^en(-|_)GB/i.test(x.lang); })[0] || speechSynthesis.getVoices().filter(function(x){ return /^en/i.test(x.lang); })[0]; if (v) u.voice = v;
    speechSynthesis.speak(u); }catch(e){}
}

/* ---------- 划词弹层 ---------- */
var pop = null, popState = null, selT = null, lastSel = '';
function ensurePop(){
  if (pop) return pop;
  pop = document.createElement('div'); pop.className = 'wpop'; pop.id = 'wpop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', T('划词释义')); pop.hidden = true;
  document.body.appendChild(pop);
  pop.addEventListener('mousedown', function(e){ if (!e.target.closest('input,textarea')) e.preventDefault(); });   /* 点按钮时不清掉选区 */
  pop.addEventListener('click', onPopClick);
  return pop;
}
function hidePop(){ if (pop && !pop.hidden){ pop.hidden = true; pop.classList.remove('show'); popState = null; } }
function inScope(node){
  var el = node && (node.nodeType === 1 ? node : node.parentElement); if (!el) return false;
  if (el.closest('input,textarea,select,button,.wpop,#top,#nav,.toast,.wb-noselect')) return false;
  return !!el.closest('#main,#sheet');
}
function sentenceOf(range, sel){
  var el = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
  var blk = el && el.closest('li,p,td,th,.v,.en,.q-q,.opt,blockquote,h1,h2,h3,h4,.card,div');
  if (!blk) return '';
  var raw = blk.textContent, off = -1;
  try{ var pre = document.createRange(); pre.selectNodeContents(blk); pre.setEnd(range.startContainer, range.startOffset); off = pre.toString().length; }catch(e){}
  if (off < 0) off = raw.toLowerCase().indexOf(sel.toLowerCase());
  if (off < 0) return '';
  var a = off, b = off + sel.length;
  while (a > 0 && !/[.!?\n]/.test(raw[a-1])) a--;
  while (b < raw.length && !/[.!?\n]/.test(raw[b])) b++;
  var s = raw.slice(a, Math.min(raw.length, b + 1)).replace(/\s+/g, ' ').trim();
  return s.length > 220 ? s.slice(0, 218)+'…' : s;
}
function checkSel(){
  var s = window.getSelection && window.getSelection();
  if (!s || s.isCollapsed || !s.rangeCount) return;
  var raw = String(s).replace(/\s+/g, ' ').trim();
  if (!raw || raw === lastSel && pop && !pop.hidden) return;
  if (/[\u3000-\u9fff\uac00-\ud7af]/.test(raw)) return;
  var t = raw.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '');
  if (!t || t.length > 48 || !/^[A-Za-z][A-Za-z'’\- ]*$/.test(t) || t.split(' ').length > 5) return;
  var r = s.getRangeAt(0);
  if (!inScope(r.commonAncestorContainer)) return;
  lastSel = raw;
  var rect = r.getBoundingClientRect();
  var ctx = {sent: sentenceOf(r, t), src: location.hash || '#/home'};
  showPop(t, rect, ctx);
}
function showPop(text, rect, ctx){
  ensurePop();
  popState = {text: text, rect: rect, ctx: ctx, info: null};
  pop.innerHTML = '<div class="wp-h"><b class="wp-w">'+esc(text)+'</b></div><p class="wp-load muted">'+T('查词中…')+'</p>';
  pop.hidden = false; place(rect); requestAnimationFrame(function(){ pop.classList.add('show'); });
  lookup(text, function(info, w){
    if (!popState || popState.text !== text) return;
    popState.info = info || {head: w || text.toLowerCase(), form: '', ipa: '', gloss: [], ex: [], found: false};
    renderPop(); place(rect);
  });
}
function hl(s, w){
  var e = esc(s); if (!w) return e;
  var base = w.split(' ')[0].replace(/[^a-z'\-]/gi, ''); if (base.length < 3) return e;
  var stem = base.length > 4 ? base.slice(0, base.length - (/(e|y)$/.test(base) ? 1 : 0)) : base;
  try{ return e.replace(new RegExp('\\b('+stem.replace(/[-']/g, '.')+'[a-z]*)', 'gi'), '<u>$1</u>'); }catch(x){ return e; }
}
function glossHTML(lines){
  return '<ul class="wp-g">'+lines.map(function(l){ var p = posSplit(l); return '<li>'+(p[0] ? '<span class="wp-pos mono">'+esc(p[0])+'</span>' : '')+'<span>'+esc(p[1])+'</span></li>'; }).join('')+'</ul>';
}
function renderPop(){
  var s = popState, i = s.info, k = norm(i.head), inb = !!W[k], h = '';
  h += '<div class="wp-h"><b class="wp-w">'+esc(i.head)+'</b>'+(i.ipa ? '<span class="wp-ipa mono">/'+esc(i.ipa)+'/</span>' : '')+
    '<button class="wp-ic" type="button" data-wp="say" aria-label="'+T('朗读')+'" title="'+T('朗读')+'">'+SPK+'</button>'+
    '<button class="wp-ic wp-x" type="button" data-wp="close" aria-label="'+T('关闭')+'">'+ic('x')+'</button></div>';
  if (i.form) h += '<p class="wp-form mono">'+esc(i.form)+' → '+esc(i.head)+'</p>'+(i.own && i.own.length ? '<div class="wp-own"><span class="mono">'+esc(i.form)+'</span>'+glossHTML(i.own)+'</div>' : '');
  if (i.found){
    var tg = (i.tags || '').split('').map(function(c){ return TAGN[c] ? '<span class="wp-tag">'+esc(T(TAGN[c]))+'</span>' : ''; }).join('');
    if (i.collins) tg += '<span class="wp-tag star" title="Collins">'+new Array(i.collins + 1).join('★')+'</span>';
    if (tg) h += '<div class="wp-tags">'+tg+'</div>';
    h += glossHTML(i.gloss);
    if (i.def) h += '<p class="wp-def"><span class="mono">EN</span> '+esc(i.def)+'</p>';
    if (i.base && i.own) h += '<div class="wp-own"><span class="mono">'+esc(i.head)+' ← '+esc(i.base)+'</span>'+glossHTML(i.own)+'</div>';
    var ex = (i.ex || []).slice(0, 2);
    if (!ex.length && s.ctx.sent && s.ctx.sent.split(' ').length > 3) ex = [s.ctx.sent];
    if (ex.length) h += '<div class="wp-ex"><span class="wp-lab">'+T('例句')+'</span>'+ex.map(function(x){ return '<p>'+hl(x, i.head)+'</p>'; }).join('')+'</div>';
  } else {
    h += '<p class="wp-miss">'+T('未收录，可手动加入单词本并自己填释义')+'</p>';
    if (!inb) h += '<input class="wp-in" id="wpIn" type="text" maxlength="120" placeholder="'+esc(T('自己写释义（可留空，之后在单词本里补）'))+'">';
  }
  h += '<div class="wp-f">'+(inb
    ? '<span class="wp-in-st">'+ic('check')+T('已在单词本')+'</span><button class="b ghost sm" type="button" data-wp="rm">'+T('移出')+'</button><a class="b ghost sm" href="#/words" data-wp="open">'+T('打开单词本')+'</a>'
    : '<button class="b pri sm" type="button" data-wp="add">'+ic('plus')+'<span>'+T('加入单词本')+'</span></button>')+'</div>';
  pop.innerHTML = h;
}
var BOOK = '<svg class="ph" viewBox="0 0 256 256" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" stroke-linecap="round"><path d="M128 76c-18-20-50-26-92-24v136c42-2 74 4 92 24 18-20 50-26 92-24V52c-42-2-74 4-92 24Z"/><path d="M128 76v136"/><path d="M164 100l18 0M164 136h18"/></g></svg>';
var SPK = '<svg class="ph" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M155.51,24.81a12,12,0,0,0-12.88,1.72L74.37,84H32A20,20,0,0,0,12,104v48a20,20,0,0,0,20,20H74.37l68.26,57.47A12,12,0,0,0,162.4,220V36A12,12,0,0,0,155.51,24.81ZM138.4,194.21,85.73,149.88A12,12,0,0,0,78,147H36V109H78a12,12,0,0,0,7.73-2.83L138.4,61.79ZM204.48,93.07a52,52,0,0,1,0,69.86,12,12,0,1,1-17.82-16.06,28,28,0,0,0,0-37.74,12,12,0,1,1,17.82-16.06Zm46.52,34.93a92,92,0,0,1-23.68,61.67,12,12,0,1,1-17.84-16.07,68,68,0,0,0,0-91.2,12,12,0,1,1,17.84-16.07A91.85,91.85,0,0,1,251,128Z"/></svg>';
function place(rect){
  if (!pop || pop.hidden) return;
  var mob = window.innerWidth <= 640;
  pop.classList.toggle('mob', mob);
  if (mob){
    pop.style.left = pop.style.top = '';
    var top = pop.getBoundingClientRect().top;               /* 选中的词被弹层挡住时把页面往上推一点 */
    if (rect && rect.bottom > top - 8 && !popState.scrolled){ popState.scrolled = 1; window.scrollBy({top: rect.bottom - top + 32, behavior: 'smooth'}); }
    return;
  }
  var w = pop.offsetWidth, h = pop.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
  var x = Math.min(Math.max(12, rect.left + rect.width / 2 - w / 2), vw - w - 12);
  var y = rect.bottom + 10;
  if (y + h > vh - 12) y = Math.max(12, rect.top - h - 10);
  pop.style.left = x+'px'; pop.style.top = y+'px';
}
function onPopClick(e){
  var b = e.target.closest('[data-wp]'); if (!b || !popState) return;
  var s = popState, i = s.info, act = b.dataset.wp;
  if (act === 'close'){ hidePop(); clearSel(); return; }
  if (act === 'say'){ speak(i ? i.head : s.text); return; }
  if (act === 'open'){ hidePop(); clearSel(); return; }
  if (!i) return;
  var k = norm(i.head);
  if (act === 'add'){
    var inp = $('wpIn'), info = i;
    if (!i.found){ info = {head: i.head, ipa: '', gloss: inp && inp.value.trim() ? [inp.value.trim()] : [], man: 1}; }
    var before = snap(k); addWord(info, s.ctx); renderPop();
    A().toast(T('已加入单词本，今天就能复习'), {label: T('撤销'), fn: function(){ restore(k, before); if (popState) renderPop(); refreshPage(); }});
    refreshPage(); return;
  }
  if (act === 'rm'){
    var bf = snap(k); delete W[k]; save(); renderPop();
    A().toast(T('已移出单词本'), {label: T('撤销'), fn: function(){ restore(k, bf); if (popState) renderPop(); refreshPage(); }});
    refreshPage();
  }
}
function clearSel(){ try{ var s = window.getSelection(); if (s) s.removeAllRanges(); }catch(e){} lastSel = ''; }
document.addEventListener('selectionchange', function(){ clearTimeout(selT); selT = setTimeout(checkSel, window.innerWidth <= 640 ? 450 : 250); });
document.addEventListener('mouseup', function(e){ if (pop && pop.contains(e.target)) return; clearTimeout(selT); selT = setTimeout(checkSel, 30); });
document.addEventListener('pointerdown', function(e){ if (pop && !pop.hidden && !pop.contains(e.target)){ hidePop(); lastSel = ''; } }, true);
document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && pop && !pop.hidden){ hidePop(); e.stopPropagation(); } }, true);
window.addEventListener('hashchange', function(){ hidePop(); lastSel = ''; });
window.addEventListener('resize', function(){ if (popState) place(popState.rect); });
window.addEventListener('scroll', function(){ if (pop && !pop.hidden && !pop.classList.contains('mob')) hidePop(); }, {passive: true});
document.addEventListener('scroll', function(e){ if (pop && !pop.hidden && !pop.classList.contains('mob') && e.target !== document && !pop.contains(e.target)) hidePop(); }, true);

/* ---------- 顶栏入口 + 到期角标 ---------- */
function badge(){
  var b = $('wordsTop'); if (!b) return;
  var n = dueList().length, el = b.querySelector('.wb-n');
  if (el){ el.textContent = n > 99 ? '99+' : n; el.hidden = !n; }
  b.setAttribute('aria-label', T('单词本')+(n ? ' · '+T('{n} 个到期', {n: n}) : '')); b.title = b.getAttribute('aria-label');
}
function refreshPage(){
  badge();
  var m = $('main'); if (!m) return;
  var p = String(location.hash);
  if (/^#\/words\/?$/.test(p) && $('wbList')) renderList(m);
  var hb = $('wbHome'); if (hb) hb.outerHTML = homeBlock();
}

/* ---------- 首页小块 ---------- */
function counts(){ var c = {all: 0, new: 0, learning: 0, mastered: 0}; Object.keys(W).forEach(function(k){ c.all++; c[status(W[k])]++; }); c.due = dueList().length; return c; }
function homeBlock(){
  var c = counts();
  return '<section class="wb-home" id="wbHome"><div class="wb-hl"><h2 class="sec-h">'+T('单词本 · 划词复习')+'</h2>'+
    '<p class="wb-hs">'+(c.all ? T('{a} 个词 · 新词 {b} · 学习中 {c} · 已掌握 {d}', {a: '<b class="mono">'+c.all+'</b>', b: c.new, c: c.learning, d: c.mastered})
      : T('在任何英文句子里选中一个词，就能看释义并加入单词本。'))+'</p></div>'+
    '<div class="wb-hr"><span class="wb-due mono"><b>'+c.due+'</b><small>'+T('今日到期')+'</small></span>'+
    (c.due ? '<a class="b pri sm" href="#/words/review">'+T('词汇复习')+'</a>' : '')+'<a class="b ghost sm" href="#/words">'+T('打开单词本')+'</a></div></section>';
}

/* ---------- 单词本页 ---------- */
var FILT = 'all', WQ = '', OPEN = null;
function head(back){
  return '<section class="s-head x-head x-words">'+(back ? A().backHTML(back[0], back[1]) : '')+'<h1 class="s-en">Words</h1><p class="s-zh">'+T('单词本')+'</p>'+
    '<p class="lede">'+T('在任何英文句子里选中一个词，就能看释义并加入单词本。复习间隔 1 / 3 / 7 / 14 / 30 天，按你的熟悉程度自动排。')+'</p></section>';
}
function render(sub, main){
  OPEN = null;
  if (sub === 'review') return startReview(main);
  main.innerHTML = head(['#/home', T('首页')]) + '<div id="wbBody"></div>';
  renderList(main);
}
function lvBar(r){ return '<span class="qi-lv" title="'+esc(T('复习进度'))+'">'+INT.map(function(_, i){ return '<i class="'+(r.done || r.n && i <= r.lv ? 'on' : '')+'"></i>'; }).join('')+'</span>'; }
var STN = {new: '新词', learning: '学习中', mastered: '已掌握'};
function rowHTML(k){
  var r = W[k], st = status(r), t = today();
  var g = String(r.g || '').split('\n').filter(Boolean)[0] || '';
  var due = r.done ? T('已掌握') : r.due <= t ? '<em>'+T('今天')+'</em>' : mdz(r.due);
  var h = '<div class="wb-row'+(OPEN === k ? ' open' : '')+'" data-k="'+esc(k)+'">'+
    '<button class="wb-main" type="button" data-wb="toggle" aria-expanded="'+(OPEN === k)+'"><span class="wb-w">'+esc(r.w)+'</span>'+(r.ipa ? '<span class="wb-ipa mono">/'+esc(r.ipa)+'/</span>' : '')+
    '<span class="wb-g">'+(g ? esc(g) : '<i class="muted">'+T('还没写释义')+'</i>')+'</span></button>'+
    '<span class="wb-st st-'+st+'">'+T(STN[st])+'</span>'+lvBar(r)+'<span class="mono qi-d">'+due+'</span>'+
    '<button class="qi-x icon" type="button" data-wb="del" aria-label="'+esc(T('删除'))+'" title="'+esc(T('删除'))+'">'+ic('x')+'</button></div>';
  if (OPEN === k){
    h += '<div class="wb-ed" data-k="'+esc(k)+'">'+
      '<label class="fld"><span>'+T('释义')+'</span><textarea id="wbG" rows="3">'+esc(r.g || '')+'</textarea></label>'+
      '<label class="fld"><span>'+T('笔记')+'</span><textarea id="wbN" rows="2" placeholder="'+esc(T('搭配、易混词、自己的例句…'))+'">'+esc(r.note || '')+'</textarea></label>'+
      (r.ctx ? '<p class="wb-ctx"><span class="wp-lab">'+T('出处句子')+'</span>'+hl(r.ctx, r.w)+(r.src ? ' <a class="lnk" href="'+esc(r.src)+'">'+T('回到原文')+'</a>' : '')+'</p>' : '')+
      '<p class="wb-meta mono">'+T('加入于 {d}', {d: mdz(r.added)})+' · '+T('复习 {n} 次', {n: r.n || 0})+(r.lapse ? ' · '+T('忘记 {n} 次', {n: r.lapse}) : '')+'</p>'+
      '<div class="row-f"><button class="b pri sm" type="button" data-wb="save">'+T('保存')+'</button>'+
      '<button class="b ghost sm" type="button" data-wb="say">'+SPK+'<span>'+T('朗读')+'</span></button>'+
      (r.done || r.n ? '<button class="b ghost sm" type="button" data-wb="reset">'+T('重新学习')+'</button>' : '')+
      (!r.done ? '<button class="b ghost sm" type="button" data-wb="master">'+T('标为已掌握')+'</button>' : '')+'</div></div>';
  }
  return h;
}
function renderList(main){
  var body = $('wbBody'); if (!body) return;
  var c = counts(), q = norm(WQ);
  var keys = Object.keys(W).filter(function(k){ var r = W[k]; return (FILT === 'all' || (FILT === 'due' ? !r.done && r.due <= today() : status(r) === FILT)) && (!q || k.indexOf(q) >= 0 || String(r.g || '').toLowerCase().indexOf(q) >= 0 || String(r.note || '').toLowerCase().indexOf(q) >= 0); })
    .sort(function(a, b){ return W[a].added < W[b].added ? 1 : W[a].added > W[b].added ? -1 : a < b ? -1 : 1; });
  var tabs = [['all', '全部', c.all], ['due', '今日到期', c.due], ['new', '新词', c.new], ['learning', '学习中', c.learning], ['mastered', '已掌握', c.mastered]];
  var h = '<div class="wb-sum"><div class="wb-stat">'+
      '<span><b class="mono">'+c.due+'</b><small>'+T('今日到期')+'</small></span><span><b class="mono">'+c.new+'</b><small>'+T('新词')+'</small></span><span><b class="mono">'+c.learning+'</b><small>'+T('学习中')+'</small></span><span><b class="mono">'+c.mastered+'</b><small>'+T('已掌握')+'</small></span></div>'+
      '<div class="row-f">'+(c.due ? '<a class="b pri" href="#/words/review">'+T('开始复习 {n} 个', {n: c.due})+'</a>' : '<span class="b ghost dis">'+T('今天没有到期的词')+'</span>')+'</div></div>'+
    '<form class="wb-add" id="wbAdd" autocomplete="off"><input id="wbAw" type="text" maxlength="48" placeholder="'+esc(T('手动加词：英文单词或短语'))+'" aria-label="'+esc(T('手动加词：英文单词或短语'))+'"><input id="wbAg" type="text" maxlength="120" placeholder="'+esc(T('释义（留空则用词典）'))+'" aria-label="'+esc(T('释义'))+'"><button class="b ghost" type="submit">'+ic('plus')+'<span>'+T('加入')+'</span></button></form>'+
    '<nav class="seg-t" id="wbTabs">'+tabs.map(function(t){ return '<a href="javascript:" data-f="'+t[0]+'" class="'+(FILT === t[0] ? 'on' : '')+'">'+T(t[1])+' <span class="mono muted">'+t[2]+'</span></a>'; }).join('')+'</nav>'+
    '<div class="wb-tools"><input id="wbQ" type="search" value="'+esc(WQ)+'" placeholder="'+esc(T('在单词本里搜索'))+'" aria-label="'+esc(T('在单词本里搜索'))+'">'+(c.all ? '<button class="lnk" type="button" id="wbExp">'+T('导出 CSV')+'</button>' : '')+'</div>';
  h += keys.length ? '<div class="queue wb-list" id="wbList">'+keys.map(rowHTML).join('')+'</div>'
    : '<div class="empty" id="wbList"><b>'+T(c.all ? '没有符合条件的词' : '单词本还是空的')+'</b><span>'+T('在任何英文句子里选中一个词，就能看释义并加入单词本。')+'</span></div>';
  h += '<p class="foot">'+T('单词本只存在这台设备的浏览器里，不会上传。词典数据：ECDICT（MIT），约 3.4 万词条；例句取自本站内容。')+'</p>';
  var foc = document.activeElement && document.activeElement.id === 'wbQ', pos = foc ? document.activeElement.selectionStart : 0;
  body.innerHTML = h;
  if (foc){ var qi = $('wbQ'); qi.focus(); try{ qi.setSelectionRange(pos, pos); }catch(e){} }
  wire(body);
}
function wire(body){
  if (body._wired) return; body._wired = true;
  body.addEventListener('click', function(e){
    var f = e.target.closest('[data-f]'); if (f){ e.preventDefault(); FILT = f.dataset.f; OPEN = null; renderList(); return; }
    if (e.target.closest('#wbExp')){ exportCsv(); return; }
    var b = e.target.closest('[data-wb]'); if (!b) return;
    var row = b.closest('[data-k]'), k = row && row.dataset.k, r = W[k]; if (!r) return;
    var act = b.dataset.wb, before = snap(k);
    if (act === 'toggle'){ OPEN = OPEN === k ? null : k; renderList(); if (OPEN){ var g = $('wbG'); if (g && window.innerWidth > 640) g.focus(); } return; }
    if (act === 'say'){ speak(r.w); return; }
    if (act === 'save'){ r.g = $('wbG').value.trim(); r.note = $('wbN').value.trim(); r.man = 1; save(); OPEN = null; renderList(); A().toast(T('已保存')); return; }
    if (act === 'del'){ delete W[k]; save(); if (OPEN === k) OPEN = null; renderList(); A().toast(T('已删除 {w}', {w: r.w}), {label: T('撤销'), fn: function(){ restore(k, before); renderList(); }}); return; }
    if (act === 'reset'){ r.lv = -1; r.done = 0; r.due = today(); save(); renderList(); A().toast(T('已放回今天的复习'), {label: T('撤销'), fn: function(){ restore(k, before); renderList(); }}); return; }
    if (act === 'master'){ r.done = 1; r.lv = INT.length - 1; r.due = null; save(); renderList(); A().toast(T('已标为已掌握'), {label: T('撤销'), fn: function(){ restore(k, before); renderList(); }}); }
  });
  body.addEventListener('input', function(e){ if (e.target.id === 'wbQ'){ WQ = e.target.value; clearTimeout(body._qt); body._qt = setTimeout(renderList, 160); } });
  body.addEventListener('submit', function(e){
    if (e.target.id !== 'wbAdd') return; e.preventDefault();
    var w = $('wbAw').value.replace(/\s+/g, ' ').trim(), g = $('wbAg').value.trim();
    if (!w || !/[A-Za-z]/.test(w)){ A().toast(T('先输入一个英文单词')); return; }
    lookup(w, function(info){
      var k = norm(info ? info.head : w);
      if (W[k]){ A().toast(T('{w} 已经在单词本里', {w: W[k].w})); OPEN = k; FILT = 'all'; renderList(); return; }
      var d = info ? {head: info.head, ipa: info.ipa, gloss: g ? [g] : info.gloss} : {head: w, ipa: '', gloss: g ? [g] : [], man: 1};
      addWord(d, {sent: info && info.ex[0] || '', src: ''});
      FILT = 'all'; WQ = ''; renderList();
      A().toast(info ? T('已加入 {w}', {w: d.head}) : T('词典未收录 {w}，已加入，记得补释义', {w: w}));
    });
  });
}
function exportCsv(){
  var rows = [['word', 'ipa', 'gloss', 'note', 'status', 'added', 'due']].concat(Object.keys(W).map(function(k){ var r = W[k]; return [r.w, r.ipa, r.g, r.note, status(r), r.added, r.due || '']; }));
  var csv = '\ufeff'+rows.map(function(r){ return r.map(function(c){ c = String(c == null ? '' : c); return /[",\n]/.test(c) ? '"'+c.replace(/"/g, '""')+'"' : c; }).join(','); }).join('\n');
  var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv'})); a.download = 'ielts-words-'+today()+'.csv'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ---------- 复习 ---------- */
var R = null;
function startReview(main){
  var keys = dueList();
  R = {q: keys.slice(), i: 0, total: keys.length, again: {}, right: 0, hist: [], shown: false};
  main.innerHTML = '<section class="set-h x-words">'+A().backHTML('#/words', T('单词本'))+'<p class="mono muted" id="wrN"></p><h1 class="set-title">'+T('词汇复习')+'</h1>'+
    '<div class="sess-bar" id="wrBar"></div></section><div class="sess wr" id="wr"></div>';
  card();
}
function card(){
  var box = $('wr'); if (!box || !R) return;
  var bar = $('wrBar'); if (bar) bar.innerHTML = R.q.map(function(_, i){ return '<i class="'+(i < R.i ? 'on' : i === R.i ? 'now' : '')+'"></i>'; }).join('');
  if (!R.total){ box.innerHTML = '<div class="empty"><b>'+T('今天没有到期的词')+'</b><span>'+T('在任何英文句子里选中一个词，就能看释义并加入单词本。')+'</span><div class="row-f"><a class="b pri" href="#/words" data-back="#/words">'+T('回到单词本')+'</a></div></div>'; $('wrN').textContent = ''; return; }
  if (R.i >= R.q.length){
    box.innerHTML = '<div class="empty fin"><span class="sc-n">'+R.right+'<small>/'+R.total+'</small></span><b>'+T('这一组完成了')+'</b><span>'+T('不熟的明天再见；一般和熟悉的按 3 / 7 / 14 / 30 天往后排。')+'</span><div class="row-f"><a class="b pri" href="#/words" data-back="#/words">'+T('回到单词本')+'</a></div></div>';
    $('wrN').textContent = T('完成'); badge(); return;
  }
  var k = R.q[R.i], r = W[k];
  if (!r){ R.i++; return card(); }
  R.shown = false;
  $('wrN').textContent = (R.i + 1)+' / '+R.q.length+' · '+T(STN[status(r)])+(R.again[k] === 2 ? ' · '+T('再认一次') : '');
  var ctx = r.ctx ? '<p class="wr-ctx">'+hl(r.ctx, r.w)+'</p>' : '';
  box.innerHTML = '<div class="wr-card"><div class="wr-front"><span class="wr-w">'+esc(r.w)+'</span>'+(r.ipa ? '<span class="wr-ipa mono">/'+esc(r.ipa)+'/</span>' : '')+
    '<button class="wp-ic" type="button" data-wr="say" aria-label="'+T('朗读')+'">'+SPK+'</button></div>'+ctx+
    '<div class="wr-back" id="wrBack" hidden></div>'+
    '<div class="wr-act" id="wrAct"><button class="b pri wr-show" type="button" data-wr="show">'+T('想好了，看释义')+' <kbd>Space</kbd></button>'+
    '<p class="srs-help">'+T('先在心里说出意思，再翻面打分。')+'</p></div></div>'+
    '<div class="sess-skip"><button class="lnk" type="button" data-wr="skip">'+T('跳过')+'</button> · <button class="lnk" type="button" data-wr="drop">'+T('移出单词本')+'</button></div>';
}
function reveal(){
  if (!R || R.shown) return; var k = R.q[R.i], r = W[k]; if (!r) return;
  R.shown = true;
  var back = $('wrBack'), g = String(r.g || '').split('\n').filter(Boolean);
  [].forEach.call(document.querySelectorAll('.wr-ctx u.bl'), function(u){ u.textContent = u.dataset.w; u.classList.remove('bl'); });
  back.innerHTML = (g.length ? glossHTML(g) : '<p class="muted">'+T('还没写释义')+' · <a class="lnk" href="#/words">'+T('去补')+'</a></p>')+(r.note ? '<p class="wr-note">'+esc(r.note)+'</p>' : '');
  back.hidden = false;
  var again = R.again[k] === 2;
  $('wrAct').innerHTML = '<div class="wr-rate">'+[[0, '不熟'], [1, '一般'], [2, '熟悉']].map(function(x){
    return '<button class="b '+(x[0] === 0 ? 'ghost r0' : x[0] === 1 ? 'ghost r1' : 'pri r2')+'" type="button" data-q="'+x[0]+'"><span>'+T(x[1])+'</span><small class="mono">'+(again ? T('已排明天') : x[0] === 0 ? T('{n} 天 · 本组再练', {n: INT[0]}) : preview(r, x[0]))+'</small><kbd>'+(x[0] + 1)+'</kbd></button>';
  }).join('')+'</div>';
}
function rate(q){
  if (!R || !R.shown) return;
  var k = R.q[R.i], r = W[k]; if (!r) return;
  var before = snap(k), qlen = R.q.length, rr = R.right, ag = R.again[k];
  if (R.again[k] === 2){ /* 本组里第二次见：只重认，不再改日程 */ }
  else grade(k, q);
  if (q === 0 && !R.again[k]){ R.again[k] = 2; R.q.push(k); }
  if (q > 0 && !ag) R.right++;
  R.hist.push({k: k, before: before, qlen: qlen, right: rr, again: ag, regraded: ag !== 2});
  R.i++; card();
  var lab = q === 0 ? T('不熟 · 明天再见') : (W[k] && W[k].done ? T('已掌握') : T('下次：{d}', {d: mdz(W[k].due)}));
  A().toast(lab, {label: T('撤销'), fn: undo});
}
function undo(){
  if (!R || !R.hist.length) return;
  var h = R.hist.pop();
  if (h.regraded) restore(h.k, h.before);
  R.q.length = h.qlen; R.right = h.right; if (h.again) R.again[h.k] = h.again; else delete R.again[h.k];
  R.i--; card(); reveal();
}
document.addEventListener('click', function(e){
  var box = e.target.closest && e.target.closest('#wr'); if (!box) return;
  var b = e.target.closest('[data-wr],[data-q]'); if (!b) return;
  if (b.dataset.q != null) return rate(+b.dataset.q);
  var a = b.dataset.wr, k = R && R.q[R.i];
  if (a === 'show') reveal();
  else if (a === 'say' && k && W[k]) speak(W[k].w);
  else if (a === 'skip'){ R.i++; card(); }
  else if (a === 'drop' && k && W[k]){ var bf = snap(k), w = W[k].w; delete W[k]; save(); R.q.splice(R.i, 1); R.total--; card(); A().toast(T('已删除 {w}', {w: w}), {label: T('撤销'), fn: function(){ restore(k, bf); if (R){ R.q.splice(R.i, 0, k); R.total++; card(); } }}); }
});
document.addEventListener('keydown', function(e){
  if (!$('wr') || !R) return;
  var t = document.activeElement && document.activeElement.tagName; if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  if (e.key === ' ' || e.key === 'Enter'){ if (!R.shown && R.i < R.q.length){ e.preventDefault(); reveal(); } }
  else if (R.shown && (e.key === '1' || e.key === '2' || e.key === '3')){ e.preventDefault(); rate(+e.key - 1); }
  else if ((e.key === 'z' || e.key === 'Z') && (e.metaKey || e.ctrlKey)){ e.preventDefault(); undo(); }
});

window.IELTS_WORDS = {
  icon: function(){ return BOOK; }, render: render, homeBlock: homeBlock, badge: badge, dueCount: function(){ return dueList().length; },
  lookup: lookup, add: addWord, all: function(){ return W; }, INT: INT
};
document.addEventListener('DOMContentLoaded', badge);
})();
