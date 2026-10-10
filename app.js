(function(){
'use strict';
var D = window.IELTS_DATA, S = {};
D.sections.forEach(function(s, i){ s.idx = i; S[s.key] = s; });

/* 版块标签（界面用，非学习内容）：统一蓝色强调，用图标区分 */
var META = {
  plan:        {nav:'计划', en:'Study plan',     c:'var(--acc)', ic:'<path d="M8 3v4M16 3v4M3 10h18"/><rect x="3" y="5" width="18" height="16" rx="3"/>'},
  grammar:     {nav:'语法', en:'Grammar & accent',c:'var(--acc)', ic:'<path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h6M8 11h4"/>'},
  dialogues:   {nav:'对话', en:'Conversations',  c:'var(--acc)', ic:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'},
  templates:   {nav:'模板', en:'Templates',      c:'var(--acc)', ic:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'},
  collocations:{nav:'搭配', en:'Collocations',   c:'var(--acc)', ic:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'},
  mistakes:    {nav:'错题', en:'Mistake log',    c:'var(--acc)', ic:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'}
};
var ORDER = ['plan','grammar','dialogues','templates','collocations','mistakes'];
var IC = {
  home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  today:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 3 3 5-6"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>'
};
var CHECK = '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

var LS = {get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
          set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
var done = LS.get('ielts.done', {});
if (!done || typeof done !== 'object') done = {};
var $ = function(id){ return document.getElementById(id); };
var main = $('main'), sheet = $('sheet'), scrim = $('scrim');
var cur = 'home', Q = '', UNREAD = LS.get('ielts.unread', false), visible = [], byId = {}, ctx = {};

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function strip(h){ var d = document.createElement('div'); d.innerHTML = String(h||'').replace(/<br\s*\/?>/g,' '); return d.textContent; }
function items(s){ return s.nodes.filter(function(n){ return n.t === 'item'; }); }
function stat(s){ var it = items(s), d = it.filter(function(n){ return done[n.id]; }).length; return {d:d, n:it.length, p: it.length ? Math.round(d*100/it.length) : 0}; }
function total(){ var t=0,d=0; D.sections.forEach(function(s){ var x=stat(s); t+=x.n; d+=x.d; }); return {d:d,n:t,p:t?Math.round(d*100/t):0}; }
function svg(p){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'; }
function bar(p, c){ return '<span class="pbar"'+(c?' style="--c:'+c+'"':'')+'><i style="width:'+p+'%"></i></span>'; }

D.sections.forEach(function(s){
  var h2 = null, h3 = null;
  s.nodes.forEach(function(n){
    if (n.t === 'h2'){ h2 = n.text; h3 = null; }
    else if (n.t === 'h3') h3 = n.text;
    else if (n.t === 'item'){ n.sec = s.key; n.h2 = h2; n.h3 = h3; byId[n.id] = n; }
  });
});

/* 主题：默认浅色，可切石板深色 */
function toggleTheme(){
  var t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t; try{ localStorage.setItem('ielts.theme', t); }catch(e){}
  var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#0f172a' : '#ffffff';
}
$('themeTop').onclick = toggleTheme;

/* 导航 */
function navHTML(){
  $('tabs').innerHTML = '<a href="#home" data-k="home">首页</a><a href="#today" data-k="today">今日任务</a><span class="tsep"></span>'+
    ORDER.map(function(k){ return '<a href="#'+k+'" data-k="'+k+'" style="--c:'+META[k].c+'"><i class="tdot"></i>'+META[k].nav+'</a>'; }).join('');
  $('nav').innerHTML = [['home','首页',IC.home],['today','今日',IC.today],['sections','版块',IC.book],['mistakes','错题',META.mistakes.ic],['search','搜索',IC.search]].map(function(x){
    return '<a href="'+(x[0]==='sections'||x[0]==='search'?'javascript:':'#'+x[0])+'" data-k="'+x[0]+'">'+svg(x[2])+'<span>'+x[1]+'</span></a>';
  }).join('');
}
$('nav').addEventListener('click', function(e){
  var a = e.target.closest('a'); if (!a) return;
  if (a.dataset.k === 'sections'){ e.preventDefault(); openSections(); }
  if (a.dataset.k === 'search'){ e.preventDefault(); if (cur !== 'home') location.hash = '#home'; setTimeout(function(){ var q = $('q'); if (q){ q.focus(); q.scrollIntoView({block:'center'}); } }, 60); }
});
function refreshNav(){
  [].forEach.call(document.querySelectorAll('#tabs a, #nav a'), function(a){
    var k = a.dataset.k, on = k === cur;
    if (a.parentNode.id === 'nav' && k === 'sections') on = !!S[cur] && cur !== 'mistakes';
    a.classList.toggle('on', on);
  });
  var t = total();
  $('topProg').innerHTML = '<b>'+t.d+'</b>/'+t.n+' 已学 '+bar(t.p);
  [].forEach.call(document.querySelectorAll('[data-sp]'), function(e){
    var x = stat(S[e.dataset.sp]);
    var b = e.querySelector('.pbar i'); if (b) b.style.width = x.p + '%';
    var n = e.querySelector('.sp-n'); if (n) n.textContent = x.d + ' / ' + x.n;
    var p = e.querySelector('.sp-p'); if (p) p.textContent = x.p + '%';
  });
  [].forEach.call(document.querySelectorAll('[data-tp]'), function(e){
    var b = e.querySelector('.pbar i'); if (b) b.style.width = t.p + '%';
    var n = e.querySelector('.tp-n'); if (n) n.textContent = t.d;
    var p = e.querySelector('.tp-p'); if (p) p.textContent = t.p + '%';
  });
  var kt = document.querySelector('[data-kpi=today]');
  if (kt){ var ti = todaySet(); kt.textContent = ti.filter(function(i){ return done[i]; }).length + ' / ' + ti.length; }
  var kp = document.querySelector('[data-kpi=total]'); if (kp) kp.textContent = t.p + '%';
  var kd = document.querySelector('[data-kpi=done]'); if (kd) kd.textContent = t.d;
  var td = document.querySelector('[data-today]');
  if (td){ var ids = todaySet(), d = ids.filter(function(i){ return done[i]; }).length, pp = ids.length ? Math.round(d*100/ids.length) : 100;
    td.querySelector('.td-n').textContent = d + ' / ' + ids.length; var bi = td.querySelector('.pbar i'); if (bi) bi.style.width = pp + '%'; }
}

/* 当前阶段：从“复习计划”表格的“时间”列推算 */
function parseSide(str, end){
  var m = str.match(/(\d+)\s*月\s*(?:(\d+)\s*日|(初|底))?/); if (!m) return null;
  var mo = +m[1], y = mo >= 8 ? 2026 : 2027, d;
  if (m[2]) d = +m[2]; else if (m[3] === '初') d = end ? 10 : 1; else if (m[3] === '底') d = end ? new Date(y, mo, 0).getDate() : 20; else d = end ? new Date(y, mo, 0).getDate() : 1;
  return new Date(y, mo-1, d, end ? 23 : 0, end ? 59 : 0);
}
function currentStage(){
  var now = new Date(), list = items(S.plan).filter(function(n){ return n.cells && n.cells[0].label === '时间'; }), best = null;
  list.forEach(function(n, i){
    var parts = strip(n.cells[0].html).split(/[–-]/), a = parseSide(parts[0], false), b = parseSide(parts[1] || parts[0], true);
    if (!a || !b) return;
    if (now >= a && now <= b) best = {n:n, i:i, now:true, a:a, b:b};
    else if (!best && now < a) best = {n:n, i:i, now:false, a:a, b:b};
  });
  if (!best) return null;
  var c = {}; best.n.cells.forEach(function(x){ c[x.label] = x.html; });
  return {c:c, i:best.i, total:list.length, now:best.now, id:best.n.id, a:best.a, b:best.b};
}

/* 今日任务：每天从各版块未学条目里按顺序抽取，当天固定 */
function todaySet(){
  var key = new Date().toDateString(), t = LS.get('ielts.today', null);
  if (t && t.date === key && t.ids && t.ids.every(function(id){ return byId[id]; })) return t.ids;
  var plan = [['grammar',2],['dialogues',2],['templates',2],['collocations',5],['mistakes',6]], ids = [];
  plan.forEach(function(p){ ids = ids.concat(items(S[p[0]]).filter(function(n){ return !done[n.id]; }).slice(0, p[1]).map(function(n){ return n.id; })); });
  LS.set('ielts.today', {date:key, ids:ids});
  return ids;
}

/* 卡片 */
function kind(n){
  if (n.title) return 'rich';
  if (!n.cells) return 'rich';
  if (n.cells.some(function(c){ return c.cls.indexOf('err') >= 0; })) return 'mis';
  return 'cells';
}
function cellsHTML(n){
  var k = kind(n);
  if (k === 'mis') return n.cells.map(function(c){
    var cl = c.cls.indexOf('err')>=0 ? 'bad' : c.cls.indexOf('ok')>=0 ? 'good' : 'why';
    return '<div class="mrow '+cl+'"><span class="lab">'+esc(c.label)+'</span><div class="v">'+c.html+'</div></div>';
  }).join('');
  var first = n.cells[0], rest = n.cells.slice(1), h = '';
  h += '<div class="lead'+(first.cls.indexOf('en')>=0?' en':'')+'">'+(first.label?'<span class="lab">'+esc(first.label)+'</span>':'')+'<div class="v">'+first.html+'</div></div>';
  h += rest.map(function(c){
    return '<div class="row'+(c.cls.indexOf('en')>=0?' en':'')+'">'+(c.label?'<span class="lab">'+esc(c.label)+'</span>':'')+'<div class="v">'+c.html+'</div></div>';
  }).join('');
  return h;
}
function cardHTML(n, i, opts){
  opts = opts || {};
  var on = done[n.id], m = META[n.sec], k = kind(n), body;
  if (k === 'rich'){
    var txt = strip(n.html), long = txt.length > 160;
    body = (n.title ? '<h4>'+esc(n.title)+'</h4>' : '') +
      '<div class="rich'+(long?' clamp':'')+'">'+n.html+'</div>' +
      (long ? '<span class="more-l">展开阅读 →</span>' : '');
  } else body = cellsHTML(n);
  var crumb = opts.crumb ? '<span class="crumb" style="--c:'+m.c+'"><i></i>'+esc(S[n.sec].short)+(n.h2?' · '+esc(n.h2.replace(/^\d+\.\s*/,'')):'')+'</span>' : '';
  return '<article class="card k-'+k+(on?' done':'')+'" data-id="'+n.id+'" style="--c:'+m.c+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="标记已学">'+CHECK+'</button>'+
    '<div class="card-in">'+crumb+body+'</div></article>';
}
function taskHTML(n){
  var m = META[n.sec], on = done[n.id], k = kind(n);
  var t = n.title || strip(k === 'rich' ? n.html : n.cells[0].html), sub = k === 'rich' ? '' : (n.cells[1] ? strip(n.cells[1].html) : '');
  if (k === 'mis'){ var g = n.cells.filter(function(c){ return c.cls.indexOf('ok')>=0; })[0]; t = g ? strip(g.html) : t; sub = '错题 · 改正后的说法'; }
  return '<div class="task card'+(on?' done':'')+'" data-id="'+n.id+'" style="--c:'+m.c+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="标记已学">'+CHECK+'</button>'+
    '<div class="task-t card-in"><span class="crumb"><i></i>'+esc(m.nav)+'</span><b>'+esc(t.length>90?t.slice(0,88)+'…':t)+'</b>'+(sub?'<small>'+esc(sub.length>70?sub.slice(0,68)+'…':sub)+'</small>':'')+'</div>'+
    '<span class="task-go">'+svg('<path d="M9 6l6 6-6 6"/>')+'</span></div>';
}

function terms(){ return Q.trim().toLowerCase().split(/\s+/).filter(Boolean); }
function match(n, t){
  if (UNREAD && done[n.id]) return false;
  for (var i=0;i<t.length;i++) if (n.q.toLowerCase().indexOf(t[i]) < 0) return false;
  return true;
}

function toolbar(placeholder){
  return '<div class="tools"><label class="search">'+svg(IC.search)+
    '<input id="q" type="search" placeholder="'+placeholder+'" value="'+esc(Q)+'" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search">'+
    '<button class="clr" id="clr" type="button" aria-label="清空"'+(Q?'':' hidden')+'>×</button></label>'+
    '<button class="tg'+(UNREAD?' on':'')+'" id="unread" type="button" aria-pressed="'+UNREAD+'"><i>'+CHECK+'</i>只看未学</button>'+
    (S[cur] ? '<button class="b ghost toc-b" id="tocBtn" type="button">'+svg('<path d="M4 6h16M4 12h10M4 18h13"/>')+'<span>目录</span></button>' : '')+
    '</div>';
}

function greet(){ var h = new Date().getHours(); return h < 5 ? '夜深了' : h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好'; }
var WK = ['日','一','二','三','四','五','六'];
function daysTo(d){ return Math.max(0, Math.ceil((d - new Date())/86400000)); }

function sectionList(){
  return '<div class="secs">'+ORDER.map(function(k){
    var s = S[k], x = stat(s), m = META[k];
    return '<a class="sec" href="#'+k+'" data-sp="'+k+'" style="--c:'+m.c+'">'+
      '<span class="sec-ic">'+svg(m.ic)+'</span>'+
      '<span class="sec-t"><b>'+esc(s.title)+'</b><small>'+m.en+' · '+x.n+' 条</small>'+bar(x.p)+'</span>'+
      '<span class="sec-r"><span class="sp-p">'+x.p+'%</span><small class="sp-n">'+x.d+' / '+x.n+'</small></span></a>';
  }).join('')+'</div>';
}

/* ---------- 首页 ---------- */
function renderHome(){
  var t = total(), st = currentStage(), last = S[LS.get('ielts.last', 'grammar')] ? LS.get('ielts.last', 'grammar') : 'grammar';
  var nextIt = items(S[last]).filter(function(n){ return !done[n.id]; })[0];
  var tids = todaySet(), tdone = tids.filter(function(id){ return done[id]; }).length;
  var cover = D.cover.split('<br/>'), now = new Date();
  var exam = new Date(2027, 4, 1);
  var h = '<section class="greet">'+
    '<p class="date">'+now.getFullYear()+' 年 '+(now.getMonth()+1)+' 月 '+now.getDate()+' 日 · 星期'+WK[now.getDay()]+'</p>'+
    '<h1>'+greet()+'，SIYIN</h1>'+
    '<p class="lede">'+esc(strip(cover[1] || ''))+'。今天还剩 <b class="hl">'+(tids.length - tdone)+' 条</b>任务。</p>'+
    toolbar('搜索 '+t.n+' 条内容')+
    '</section>'+
    ((!terms().length && !UNREAD) ? '<section class="kpis">'+
      '<div class="kpi"><small>今日任务</small><b data-kpi="today">'+tdone+' / '+tids.length+'</b></div>'+
      '<div class="kpi"><small>总进度</small><b data-kpi="total">'+t.p+'%</b></div>'+
      '<div class="kpi"><small>已学条目</small><b data-kpi="done">'+t.d+'</b></div>'+
      '<div class="kpi"><small>距申请</small><b>'+daysTo(exam)+' 天</b></div></section>' : '')+
    '<div id="results"></div>';

  if (!terms().length && !UNREAD){
    h += '<div class="home-grid"><div class="col-main">';
    /* 本阶段 */
    if (st) h += '<section class="stage block">'+
      '<div class="stage-h"><span class="kicker">'+(st.now?'本阶段':'下一阶段')+' · 第 '+(st.i+1)+' / '+st.total+' 段</span><span class="stage-d">'+esc(strip(st.c['时间']))+'</span></div>'+
      '<h2>'+esc(strip(st.c['阶段']))+'</h2>'+
      '<p class="ln"><span class="lab">重点</span>'+st.c['重点']+'</p>'+
      (st.c['阶段目标']?'<p class="ln"><span class="lab">目标</span>'+st.c['阶段目标']+'</p>':'')+
      (st.now ? '<div class="stage-p"><small>本阶段时间已过 '+Math.min(100,Math.round((now-st.a)*100/(st.b-st.a)))+'%</small>'+bar(Math.min(100,Math.round((now-st.a)*100/(st.b-st.a))), 'var(--acc)')+'</div>' : '')+
      '</section>';
    /* 今日任务清单 */
    var preview = tids.slice(0, 6);
    visible = tids.slice();
    h += '<section class="block today-b" data-today>'+
      '<div class="block-h"><div><h2>今日任务</h2><p>语法 2 · 对话 2 · 模板 2 · 搭配 5 · 错题 6，学完勾掉</p></div>'+
      '<div class="td-r"><span class="td-n">'+tdone+' / '+tids.length+'</span>'+bar(tids.length?Math.round(tdone*100/tids.length):100, 'var(--acc)')+'</div></div>'+
      (preview.length ? '<div class="tasks">'+preview.map(function(id){ return taskHTML(byId[id]); }).join('')+'</div>'+(tids.length>preview.length?'<p class="more-n">还有 '+(tids.length-preview.length)+' 条在今日任务页</p>':'') : '<div class="empty">全部学完了，太强了。</div>')+
      '<div class="block-f"><a class="b pri" href="#today">打开今日 '+tids.length+' 条 →</a>'+
      '<a class="b ghost" href="#'+last+(nextIt?'/'+nextIt.id:'')+'">接着学「'+esc(S[last].title)+'」</a></div></section>';
    h += '</div><aside class="col-side">';
    /* 总进度 */
    h += '<section class="block prog-b" data-tp><div class="pb-top"><div><small>总进度</small><p><b class="tp-n">'+t.d+'</b> / '+t.n+' 条</p></div><span class="pct tp-p">'+t.p+'%</span></div>'+bar(t.p, 'var(--acc)')+
      '<div class="targets">'+[['总分','7.5'],['听力','6.5+'],['阅读','6.5+'],['写作','6.5+'],['口语','6.5+']].map(function(g, i){
        return '<div'+(i?'':' class="main"')+'><span>'+g[0]+'</span><b>'+g[1]+'</b></div>'; }).join('')+'</div><p class="tgt-n">目标分数 · 单科不低于 6.5</p></section>';
    h += '<section class="block"><div class="block-h"><div><h2>六个版块</h2><p>点进去按小节学，可搜索、可只看未学</p></div></div>'+sectionList()+'</section>';
    h += '</aside></div>';
    h += '<p class="foot">点左边的小方框标记“已学”。进度只存在这台设备的浏览器里，换设备不会同步。<button class="lnk" id="reset" type="button">清空全部进度</button></p>';
  }
  main.innerHTML = h;
  if ($('reset')) $('reset').onclick = function(){ if (confirm('确定清空所有已学标记？')) { done = {}; LS.set('ielts.done', done); refreshNav(); render(); } };
  if (terms().length || UNREAD) renderSearch($('results'));
}

function renderSearch(box){
  var t = terms(), h = '', tot = 0, LIMIT = 40; visible = [];
  ORDER.forEach(function(k){
    var s = S[k], hits = items(s).filter(function(n){ return match(n, t); });
    if (!hits.length) return;
    tot += hits.length;
    h += '<div class="g-h" style="--c:'+META[k].c+'"><h2><i></i>'+esc(s.title)+'<span class="cnt">'+hits.length+'</span></h2>'+
      (hits.length > LIMIT ? '<a class="b ghost sm" href="#'+k+'">查看全部 →</a>' : '')+'</div><div class="cards">'+
      hits.slice(0, LIMIT).map(function(n, i){ visible.push(n.id); return cardHTML(n, i); }).join('')+'</div>';
  });
  box.innerHTML = tot ? '<p class="count">共找到 '+tot+' 条</p>' + h : '<div class="empty">没有符合条件的条目</div>';
  highlight(box, t);
}

/* ---------- 今日 ---------- */
function renderToday(){
  var ids = todaySet(), d = ids.filter(function(id){ return done[id]; }).length, p = ids.length ? Math.round(d*100/ids.length) : 100;
  visible = ids.slice();
  var h = '<section class="s-head" style="--c:var(--acc)" data-today><div>'+
    '<p class="kicker">每天自动挑选各版块里还没学的条目</p>'+
    '<h1>今日任务</h1>'+
    '<p class="lede">语法 2 · 对话 2 · 模板 2 · 搭配 5 · 错题 6。学完一条勾一条，明天换下一批。</p></div>'+
    '<div class="s-prog"><span class="td-n">'+d+' / '+ids.length+'</span><small>今日已学</small>'+bar(p)+'</div></section>';
  h += ids.length ? '<div class="cards">'+ids.map(function(id, i){ return cardHTML(byId[id], i, {crumb:true}); }).join('')+'</div>' : '<div class="empty">全部学完了，太强了。</div>';
  main.innerHTML = h;
}

/* ---------- 版块 ---------- */
function renderSection(s){
  var m = META[s.key], x = stat(s);
  var h = '<section class="s-head" style="--c:'+m.c+'" data-sp="'+s.key+'"><div>'+
    '<p class="kicker"><i></i>第 '+s.idx+' 部分 · '+esc(s.source)+'</p>'+
    '<h1>'+esc(s.title)+'<em>'+m.en+'</em></h1></div>'+
    '<div class="s-prog"><span class="sp-p">'+x.p+'%</span><small class="sp-n">'+x.d+' / '+x.n+'</small>'+bar(x.p)+'</div></section>';
  h += '<div class="sec-grid"><div class="col-main"><div class="sticky">'+toolbar('在「'+s.title+'」里搜索…')+'</div><div id="list"></div></div>'+
    '<aside class="col-toc"><div class="toc-box"><p class="toc-h">目录</p><div class="toc" id="sideToc"></div></div></aside></div>';
  main.innerHTML = h;
  renderList(s);
}
function renderList(s){
  var t = terms(), html = '', toc = [], pendingH = [], shown = 0, hid = 0, open = false;
  visible = [];
  function close(){ if (open){ html += '</div>'; open = false; } }
  function flush(){
    pendingH.forEach(function(hh){
      close();
      var id = 'h'+(hid++);
      if (hh.t === 'h2'){
        var num = (hh.text.match(/^(\d+)\./)||[])[1], txt = hh.text.replace(/^\d+\.\s*/,'');
        html += '<div class="g-h" id="'+id+'"><h2>'+(num?'<span class="no">'+(num.length<2?'0'+num:num)+'</span>':'<i></i>')+esc(txt)+'</h2></div>';
      } else html += '<h3 class="g-h3" id="'+id+'">'+esc(hh.text)+'</h3>';
      toc.push({id:id, t:hh.t, text:hh.text});
    });
    pendingH = [];
  }
  s.nodes.forEach(function(n){
    if (n.t === 'h2' || n.t === 'h3'){
      if (n.t === 'h2') pendingH = [];
      pendingH = pendingH.filter(function(h){ return h.t === 'h2'; });
      pendingH.push(n); return;
    }
    if (n.t === 'note'){ if (!t.length && !UNREAD){ flush(); close(); html += '<div class="note"><span class="note-l">说明</span><div>'+n.html+'</div></div>'; } return; }
    if (!match(n, t)) return;
    flush();
    if (!open){ html += '<div class="cards">'; open = true; }
    html += cardHTML(n, shown); visible.push(n.id); shown++;
  });
  close();
  if (!shown) html += '<div class="empty">'+(UNREAD && !t.length ? '这个版块全部学完了 🎉' : '没有符合条件的条目')+'</div>';
  else if (t.length || UNREAD) html = '<p class="count">'+(t.length?'找到 ':'未学 ')+shown+' 条</p>' + html;
  $('list').innerHTML = html;
  ctx.toc = toc;
  var st = $('sideToc');
  if (st) st.innerHTML = toc.length ? toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('') : '<p class="toc-e">没有小节</p>';
  highlight($('list'), t);
  refreshNav();
}

function highlight(root, t){
  if (!t.length) return;
  var re = new RegExp('(' + t.map(function(x){ return x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'gi');
  var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), list = [], nd;
  while ((nd = w.nextNode())) { re.lastIndex = 0; if (nd.parentNode.closest('.card-in') && re.test(nd.nodeValue)) list.push(nd); }
  list.forEach(function(n){
    var span = document.createElement('span');
    span.innerHTML = esc(n.nodeValue).replace(re, '<mark>$1</mark>');
    n.parentNode.replaceChild(span, n);
  });
}

/* ---------- 抽屉 ---------- */
function openSheet(html, cls){
  sheet.className = 'sheet ' + (cls||''); sheet.innerHTML = '<div class="grab"></div>' + html;
  scrim.hidden = false; requestAnimationFrame(function(){ sheet.classList.add('open'); scrim.classList.add('open'); });
  sheet.setAttribute('aria-hidden','false'); document.body.classList.add('lock');
}
function closeSheet(){
  sheet.classList.remove('open'); scrim.classList.remove('open'); sheet.setAttribute('aria-hidden','true'); document.body.classList.remove('lock');
  setTimeout(function(){ if (!sheet.classList.contains('open')) scrim.hidden = true; }, 300);
  ctx.open = null;
}
function sheetHead(title, c){ return '<div class="d-head"'+(c?' style="--c:'+c+'"':'')+'><span class="crumb"><i></i>'+title+'</span><button class="icon" id="dClose" type="button" aria-label="关闭">'+svg(IC.close)+'</button></div>'; }
function openItem(id){
  var n = byId[id]; if (!n) return;
  ctx.open = id;
  var m = META[n.sec], s = S[n.sec], idx = visible.indexOf(id), on = done[id];
  var body = (kind(n) === 'rich') ? (n.title ? '<h2 class="d-t">'+esc(n.title)+'</h2>' : '') + '<div class="rich d-rich">'+n.html+'</div>' : '<div class="d-cells k-'+kind(n)+'">'+cellsHTML(n)+'</div>';
  openSheet(sheetHead((idx>=0?'<b>'+(idx+1)+' / '+visible.length+'</b> ':'')+esc(s.title)+(n.h2?' · '+esc(n.h2):'')+(n.h3?' · '+esc(n.h3):''), m.c)+
    '<div class="d-body" style="--c:'+m.c+'">'+body+'</div>'+
    '<div class="d-foot">'+
      '<button class="b ghost sq" id="dPrev" type="button"'+(idx>0?'':' disabled')+' aria-label="上一条">'+svg('<path d="M15 6l-6 6 6 6"/>')+'</button>'+
      '<button class="b '+(on?'ghost':'pri')+' grow" id="dDone" type="button">'+(on?'已学 ✓ 点击取消':'标记已学，下一条')+'</button>'+
      '<button class="b ghost sq" id="dNext" type="button"'+(idx>=0&&idx<visible.length-1?'':' disabled')+' aria-label="下一条">'+svg('<path d="M9 6l6 6-6 6"/>')+'</button>'+
      '</div>', 'item');
  $('dClose').onclick = closeSheet;
  $('dPrev').onclick = function(){ openItem(visible[idx-1]); };
  $('dNext').onclick = function(){ openItem(visible[idx+1]); };
  $('dDone').onclick = function(){ setDone(id, !done[id]); if (done[id] && idx>=0 && idx<visible.length-1) setTimeout(function(){ openItem(visible[idx+1]); }, 200); else openItem(id); };
}
function openToc(){
  if (!ctx.toc || !ctx.toc.length) { toast('当前没有小节'); return; }
  openSheet(sheetHead(esc(S[cur].title)+' · 目录', META[cur].c)+
    '<div class="toc">'+ctx.toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('')+'</div>', 'tocs');
  $('dClose').onclick = closeSheet;
}
function openSections(){
  openSheet(sheetHead('六个版块')+'<div class="d-body">'+sectionList()+'</div>', 'tocs');
  $('dClose').onclick = closeSheet;
  sheet.querySelector('.secs').onclick = function(){ setTimeout(closeSheet, 0); };
}
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('.toc [data-h]'); if (!a) return;
  if (sheet.contains(a)) closeSheet();
  var el = $(a.dataset.h); if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
});
scrim.onclick = closeSheet;

function setDone(id, v){
  if (v) done[id] = 1; else delete done[id];
  LS.set('ielts.done', done);
  [].forEach.call(document.querySelectorAll('.card[data-id="'+id+'"]'), function(c){
    c.classList.toggle('done', !!v); c.querySelector('.chk').setAttribute('aria-pressed', v?'true':'false');
    if (v){ c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  });
  refreshNav();
}

var tt;
function toast(msg){ var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove('show'); }, 1500); }

/* 事件 */
main.addEventListener('click', function(e){
  var chk = e.target.closest('.chk');
  if (chk){ var id = chk.closest('.card').dataset.id, v = !done[id]; setDone(id, v); toast(v ? '已标记为已学' : '已取消'); return; }
  if (e.target.closest('#unread')){ UNREAD = !UNREAD; LS.set('ielts.unread', UNREAD); rerenderList(); return; }
  if (e.target.closest('#tocBtn')){ openToc(); return; }
  if (e.target.closest('#clr')){ Q = ''; var qi = $('q'); if (qi) qi.value = ''; rerenderList(); return; }
  var card = e.target.closest('.card');
  if (card && !e.target.closest('a')) openItem(card.dataset.id);
});
var qt;
main.addEventListener('input', function(e){
  if (e.target.id !== 'q') return;
  Q = e.target.value; clearTimeout(qt); qt = setTimeout(rerenderList, 180);
});
function rerenderList(){
  var c = $('clr'); if (c) c.hidden = !Q;
  var u = $('unread'); if (u){ u.classList.toggle('on', UNREAD); u.setAttribute('aria-pressed', UNREAD); }
  if (S[cur]) renderList(S[cur]);
  else if (cur === 'home'){
    var focused = document.activeElement && document.activeElement.id === 'q', pos = focused ? $('q').selectionStart : 0;
    renderHome(); refreshNav(); if (focused){ var q = $('q'); q.focus(); try{ q.setSelectionRange(pos,pos); }catch(e){} }
  }
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet();
  if (ctx.open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')){ var i = visible.indexOf(ctx.open) + (e.key === 'ArrowRight' ? 1 : -1); if (visible[i]) openItem(visible[i]); }
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT'){ var q = $('q'); if (q){ e.preventDefault(); q.focus(); } }
});
window.addEventListener('scroll', function(){ $('top').classList.toggle('scrolled', window.scrollY > 8); }, {passive:true});

function render(){
  var s = S[cur];
  $('title').textContent = s ? s.title : cur === 'today' ? '今日任务' : '雅思学习';
  document.title = (s ? s.title + ' · ' : cur==='today' ? '今日任务 · ' : '') + '雅思学习 · XU SIYIN';
  if (s){ LS.set('ielts.last', cur); renderSection(s); }
  else if (cur === 'today') renderToday();
  else renderHome();
  refreshNav();
}
var st;
function route(){
  var parts = (location.hash.slice(1) || 'home').split('/'), k = parts[0];
  var prev = cur;
  cur = (S[k] || k === 'home' || k === 'today') ? k : 'home';
  if (prev !== cur && S[cur]) Q = '';
  closeSheet();
  render();
  if (parts[1] && byId[parts[1]]){
    var el = document.querySelector('.card[data-id="'+parts[1]+'"]');
    if (el){ el.scrollIntoView({block:'center'}); el.classList.add('flash'); }
    history.replaceState(null, '', '#'+cur);
  } else {
    var pos = LS.get('ielts.scroll', {});
    window.scrollTo(0, (!Q && pos[cur]) || 0);
  }
}
window.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(function(){ var p = LS.get('ielts.scroll', {}); p[cur] = window.scrollY; LS.set('ielts.scroll', p); }, 300); }, {passive:true});
window.addEventListener('hashchange', route);
navHTML();
route();
})();
