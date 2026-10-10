(function(){
'use strict';
var D = window.IELTS_DATA, S = {};
D.sections.forEach(function(s, i){ s.idx = i; S[s.key] = s; });

/* 版块元信息（只是界面标签，不是学习内容） */
var META = {
  plan:        {nav:'计划', en:'Study Plan',        c:'#fbbf24', c2:'#f97316', ic:'<path d="M8 3v4M16 3v4M3 10h18"/><rect x="3" y="5" width="18" height="16" rx="3"/>'},
  grammar:     {nav:'语法', en:'Grammar & Accent',  c:'#a78bfa', c2:'#6366f1', ic:'<path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h6M8 11h4"/>'},
  dialogues:   {nav:'对话', en:'Conversations',     c:'#38bdf8', c2:'#6366f1', ic:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'},
  templates:   {nav:'模板', en:'Templates',         c:'#34d399', c2:'#06b6d4', ic:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'},
  collocations:{nav:'搭配', en:'Collocations',      c:'#f472b6', c2:'#a78bfa', ic:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'},
  mistakes:    {nav:'错题', en:'Mistake Log',       c:'#fb7185', c2:'#f59e0b', ic:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>'}
};
var NAV = ['home','grammar','dialogues','templates','collocations','mistakes'];
var ORDER = ['plan','grammar','dialogues','templates','collocations','mistakes'];
var HOME_IC = '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>';
var CHECK = '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';

var LS = {get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
          set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
var done = LS.get('ielts.done', {});
var $ = function(id){ return document.getElementById(id); };
var main = $('main'), sheet = $('sheet'), scrim = $('scrim');
var cur = 'home', Q = '', UNREAD = LS.get('ielts.unread', false), visible = [], byId = {}, ctx = {};

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function strip(h){ var d = document.createElement('div'); d.innerHTML = String(h||'').replace(/<br\s*\/?>/g,' '); return d.textContent; }
function items(s){ return s.nodes.filter(function(n){ return n.t === 'item'; }); }
function stat(s){ var it = items(s), d = it.filter(function(n){ return done[n.id]; }).length; return {d:d, n:it.length, p: it.length ? Math.round(d*100/it.length) : 0}; }
function total(){ var t=0,d=0; D.sections.forEach(function(s){ var x=stat(s); t+=x.n; d+=x.d; }); return {d:d,n:t,p:t?Math.round(d*100/t):0}; }
function svg(p){ return '<svg viewBox="0 0 24 24">'+p+'</svg>'; }

/* 预处理：每条记录所属小节 */
D.sections.forEach(function(s){
  var h2 = null, h3 = null;
  s.nodes.forEach(function(n){
    if (n.t === 'h2'){ h2 = n.text; h3 = null; }
    else if (n.t === 'h3') h3 = n.text;
    else if (n.t === 'item'){ n.sec = s.key; n.h2 = h2; n.h3 = h3; byId[n.id] = n; }
  });
});

function ring(p, size, sw, c1, c2, label){
  var r = (size - sw)/2, C = 2*Math.PI*r, id = 'rg'+Math.random().toString(36).slice(2,8);
  return '<div class="ring" style="width:'+size+'px;height:'+size+'px"><svg viewBox="0 0 '+size+' '+size+'">'+
    '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>'+
    '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" stroke-width="'+sw+'" class="rt"/>'+
    '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" stroke-width="'+sw+'" stroke="url(#'+id+')" class="rp" stroke-dasharray="'+C.toFixed(2)+'" stroke-dashoffset="'+(C*(1-p/100)).toFixed(2)+'" style="--C:'+C.toFixed(2)+'"/>'+
    '</svg>'+(label != null ? '<b>'+label+'</b>' : '')+'</div>';
}

/* 主题 */
function toggleTheme(){
  var t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = t; try{ localStorage.setItem('ielts.theme', t); }catch(e){}
}
$('themeTop').onclick = $('themeSide').onclick = toggleTheme;

/* 导航 */
function navHTML(){
  $('nav').innerHTML = NAV.map(function(k){
    var m = META[k], s = S[k];
    return '<a href="#'+k+'" data-k="'+k+'" style="--c:'+(m?m.c:'#f4f4f6')+'">'+svg(m?m.ic:HOME_IC)+'<span>'+(m?m.nav:'首页')+'</span>'+(s?'<i data-p="'+k+'"></i>':'')+'</a>';
  }).join('');
  $('sideNav').innerHTML = '<a href="#home" data-k="home">'+svg(HOME_IC)+'<span>首页</span></a><a href="#today" data-k="today">'+svg('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>')+'<span>今日任务</span></a><div class="side-h">资料</div>'+
    ORDER.map(function(k){ var m = META[k];
      return '<a href="#'+k+'" data-k="'+k+'" style="--c:'+m.c+'">'+svg(m.ic)+'<span>'+S[k].title+'</span><em data-p="'+k+'"></em></a>'; }).join('');
}
function refreshNav(){
  [].forEach.call(document.querySelectorAll('[data-p]'), function(e){
    var x = stat(S[e.dataset.p]);
    if (e.tagName === 'I') e.style.setProperty('--p', x.p + '%'); else e.textContent = x.p + '%';
  });
  [].forEach.call(document.querySelectorAll('#nav a, #sideNav a'), function(a){
    var k = a.dataset.k; a.classList.toggle('on', k === cur || (cur === 'plan' && k === 'home' && a.parentNode.id === 'nav') || (cur==='today' && k==='home' && a.parentNode.id==='nav'));
  });
  var t = total();
  $('sideProg').innerHTML = ring(t.p, 64, 6, '#a78bfa', '#34d399', t.p+'%') + '<div><small>总进度</small><b><span class="mono">'+t.d+'</span> / '+t.n+'</b><small>目标 7.5 · 单科 ≥ 6.5</small></div>';
  var s = S[cur], hp = document.querySelector('.sh-prog');
  if (s && hp){ var x = stat(s); hp.innerHTML = ring(x.p, 92, 7, META[cur].c, META[cur].c2, x.p+'%') + '<div><b class="mono">'+x.d+' / '+x.n+'</b><small>已学 / 条目</small></div>'; }
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
    if (now >= a && now <= b) best = {n:n, i:i, now:true};
    else if (!best && now < a) best = {n:n, i:i, now:false};
  });
  if (!best) return null;
  var c = {}; best.n.cells.forEach(function(x){ c[x.label] = x.html; });
  return {c:c, i:best.i, total:list.length, now:best.now, id:best.n.id};
}

/* 今日任务：每天从各版块未学条目里按顺序抽取，当天固定 */
function todaySet(){
  var key = new Date().toDateString(), t = LS.get('ielts.today', null);
  if (t && t.date === key && t.ids.every(function(id){ return byId[id]; })) return t.ids;
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
function cellsHTML(n, full){
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
    var txt = strip(n.html), long = txt.length > 150;
    body = (n.title ? '<h4>'+esc(n.title)+'</h4>' : '') +
      '<div class="rich'+(long?' clamp':'')+'">'+n.html+'</div>' +
      (long ? '<span class="more-l">展开阅读 '+svg('<path d="M5 12h14M13 6l6 6-6 6"/>')+'</span>' : '');
  } else body = cellsHTML(n);
  var crumb = opts.crumb ? '<span class="crumb" style="--c:'+m.c+'">'+esc(S[n.sec].short)+(n.h2?' · '+esc(n.h2.replace(/^\d+\.\s*/,'')):'')+'</span>' : '';
  return '<article class="card k-'+k+(on?' done':'')+'" data-id="'+n.id+'" style="--c:'+m.c+';--c2:'+m.c2+';--i:'+Math.min(i,14)+'">'+
    '<div class="card-in">'+crumb+body+'</div>'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="标记已学">'+CHECK+'</button></article>';
}

function terms(){ return Q.trim().toLowerCase().split(/\s+/).filter(Boolean); }
function match(n, t){
  if (UNREAD && done[n.id]) return false;
  for (var i=0;i<t.length;i++) if (n.q.indexOf(t[i]) < 0) return false;
  return true;
}

function toolbar(placeholder){
  return '<div class="tools"><label class="search">'+svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>')+
    '<input id="q" type="search" placeholder="'+placeholder+'" value="'+esc(Q)+'" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search">'+
    '<button class="clr" id="clr" type="button" aria-label="清空"'+(Q?'':' hidden')+'>×</button></label>'+
    '<button class="tg'+(UNREAD?' on':'')+'" id="unread" type="button" aria-pressed="'+UNREAD+'"><i></i>只看未学</button>'+
    (S[cur] ? '<button class="b ghost toc-b" id="tocBtn" type="button">'+svg('<path d="M4 6h16M4 12h10M4 18h13"/>')+'<span>目录</span></button>' : '')+
    '</div>';
}

/* ---------- 首页 ---------- */
function renderHome(){
  var t = total(), st = currentStage(), last = LS.get('ielts.last', 'grammar'), lm = META[last] || META.grammar;
  var nextIt = items(S[last] || S.grammar).filter(function(n){ return !done[n.id]; })[0];
  var tids = todaySet(), tdone = tids.filter(function(id){ return done[id]; }).length;
  var cover = D.cover.split('<br/>');
  var h = '<section class="hero">'+
    '<p class="eyebrow"><span class="dot"></span>'+esc(strip(cover[0]))+'</p>'+
    '<h1><span class="shine">雅思 7.5</span><em>Your road to Band 7.5</em></h1>'+
    '<p class="lede">'+esc(strip(cover[1] || ''))+'。共 <b class="mono" data-count="'+t.n+'">'+t.n+'</b> 条资料，勾选即记进度，只存在这台设备。</p>'+
    '<div class="bands">'+[['总分','7.5','big'],['听力','6.5+'],['阅读','6.5+'],['写作','6.5+'],['口语','6.5+']].map(function(g){
      return '<div class="band'+(g[2]?' big':'')+'"><b class="mono">'+g[1]+'</b><span>'+g[0]+'</span></div>'; }).join('')+'</div>'+
    toolbar('搜索全部 '+t.n+' 条资料…')+
    '</section><div id="results"></div>';

  if (!terms().length && !UNREAD){
    h += '<section class="bento">';
    /* 今日卡片 */
    h += '<div class="tile today beam spot"><div class="tile-in">'+
      '<div class="t-head"><span class="pill">'+svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>')+'今日 · '+(new Date().getMonth()+1)+' 月 '+new Date().getDate()+' 日</span>'+
      (st ? '<span class="mono step">阶段 '+(st.i+1)+' / '+st.total+'</span>' : '')+'</div>'+
      (st ? '<h2>'+(st.now?'当前阶段：':'下一阶段：')+st.c['阶段']+'</h2><p class="t-time mono">'+st.c['时间']+'</p>'+
        '<p class="t-focus"><span class="lab">重点</span>'+st.c['重点']+'</p>'+(st.c['阶段目标']?'<p class="t-focus"><span class="lab">目标</span>'+st.c['阶段目标']+'</p>':'') : '<h2>开始今天的学习</h2>')+
      '<div class="t-cta">'+
        '<a class="b pri shimmer" href="#today">'+svg('<path d="m5 3 14 9-14 9z"/>')+'今日 '+tids.length+' 条 <span class="mono dim">'+tdone+'/'+tids.length+'</span></a>'+
        '<a class="b ghost" href="#'+(S[last]?last:'grammar')+(nextIt?'/'+nextIt.id:'')+'">继续 '+esc((S[last]||S.grammar).title)+' →</a>'+
      '</div></div></div>';
    /* 总进度 */
    h += '<div class="tile overall spot"><div class="tile-in">'+ring(t.p, 168, 12, '#a78bfa', '#34d399', '<span class="mono">'+t.p+'</span><small>%</small>')+
      '<div class="ov-t"><small>总进度</small><b class="mono">'+t.d+' <span>/ '+t.n+'</span></b>'+
      '<div class="mini">'+ORDER.map(function(k){ var x=stat(S[k]); return '<i style="--c:'+META[k].c+';flex:'+x.n+'"><u style="width:'+x.p+'%"></u></i>'; }).join('')+'</div></div></div></div>';
    /* 版块卡片 */
    ORDER.forEach(function(k, i){
      var s = S[k], x = stat(s), m = META[k];
      h += '<a class="tile sec spot" href="#'+k+'" style="--c:'+m.c+';--c2:'+m.c2+';--i:'+i+'"><div class="tile-in">'+
        '<div class="s-top"><span class="s-ic">'+svg(m.ic)+'</span>'+ring(x.p, 54, 5, m.c, m.c2, x.p+'%')+'</div>'+
        '<div class="s-big mono">'+x.n+'<small>条</small></div>'+
        '<h3>'+esc(s.title)+'</h3><p class="s-en">'+m.en+'</p>'+
        '<div class="bar-p"><i style="width:'+x.p+'%"></i></div><p class="s-meta mono">已学 '+x.d+' · 未学 '+(x.n-x.d)+'</p></div></a>';
    });
    h += '</section>';
    h += '<p class="foot">勾选卡片右上角的圆圈标记“已学”。进度只保存在这台设备的浏览器里，换设备不会同步。<button class="lnk" id="reset" type="button">清空全部进度</button></p>';
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
    h += '<div class="g-h"><h2 style="--c:'+META[k].c+'"><i></i>'+esc(s.title)+'<span class="mono">'+hits.length+'</span></h2>'+
      (hits.length > LIMIT ? '<a class="b ghost sm" href="#'+k+'">查看全部 →</a>' : '')+'</div><div class="cards">'+
      hits.slice(0, LIMIT).map(function(n, i){ visible.push(n.id); return cardHTML(n, i); }).join('')+'</div>';
  });
  box.innerHTML = tot ? '<p class="count mono">共找到 '+tot+' 条</p>' + h : '<div class="empty">没有符合条件的条目</div>';
  highlight(box, t);
}

/* ---------- 今日 ---------- */
function renderToday(){
  var ids = todaySet(), d = ids.filter(function(id){ return done[id]; }).length, p = ids.length ? Math.round(d*100/ids.length) : 100;
  visible = ids.slice();
  var h = '<section class="s-hero" style="--c:#a78bfa;--c2:#34d399"><div>'+
    '<p class="eyebrow"><span class="dot"></span>每天自动挑选各版块里还没学的条目</p>'+
    '<h1>今日任务<em>Today\'s set</em></h1>'+
    '<p class="lede">语法 2 · 对话 2 · 模板 2 · 搭配 5 · 错题 6，学完一条就勾一条。明天会换下一批未学的。</p></div>'+
    '<div class="sh-prog">'+ring(p, 92, 7, '#a78bfa', '#34d399', p+'%')+'<div><b class="mono">'+d+' / '+ids.length+'</b><small>今日已学</small></div></div></section>';
  h += ids.length ? '<div class="cards">'+ids.map(function(id, i){ return cardHTML(byId[id], i, {crumb:true}); }).join('')+'</div>' : '<div class="empty">全部学完了，太强了。</div>';
  main.innerHTML = h;
}

/* ---------- 版块 ---------- */
function renderSection(s){
  var m = META[s.key], t = terms(), x = stat(s);
  var notes = s.nodes.filter(function(n){ return n.t === 'note'; });
  var h = '<section class="s-hero" style="--c:'+m.c+';--c2:'+m.c2+'"><div>'+
    '<p class="eyebrow"><span class="dot"></span>PART '+s.idx+' · '+esc(s.source)+'</p>'+
    '<h1>'+esc(s.title)+'<em>'+m.en+'</em></h1></div>'+
    '<div class="sh-prog"></div></section>';
  h += '<div class="sticky">'+toolbar('搜索'+META[s.key].nav+'…')+'</div><div id="list"></div>';
  main.innerHTML = h;
  renderList(s);
}
function renderList(s){
  var t = terms(), m = META[s.key], html = '', toc = [], pendingH = [], shown = 0, hid = 0, gi = 0, open = false;
  visible = [];
  function close(){ if (open){ html += '</div>'; open = false; } }
  function flush(){
    pendingH.forEach(function(hh){
      close();
      var id = 'h'+(hid++);
      if (hh.t === 'h2'){
        var num = (hh.text.match(/^(\d+)\./)||[])[1], txt = hh.text.replace(/^\d+\.\s*/,'');
        html += '<div class="g-h" id="'+id+'"><h2 style="--c:'+m.c+'">'+(num?'<span class="no mono">'+(num.length<2?'0'+num:num)+'</span>':'<i></i>')+esc(txt)+'</h2></div>';
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
    if (n.t === 'note'){ if (!t.length && !UNREAD){ flush(); close(); html += '<div class="note">'+svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/>')+'<div>'+n.html+'</div></div>'; } return; }
    if (!match(n, t)) return;
    flush();
    if (!open){ html += '<div class="cards">'; open = true; gi = 0; }
    html += cardHTML(n, gi++); visible.push(n.id); shown++;
  });
  close();
  if (!shown) html += '<div class="empty">'+(UNREAD && !t.length ? '这一版块全部学完了 🎉' : '没有符合条件的条目')+'</div>';
  else if (t.length || UNREAD) html = '<p class="count mono">'+(t.length?'找到 ':'未学 ')+shown+' 条</p>' + html;
  $('list').innerHTML = html;
  ctx.toc = toc;
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
  setTimeout(function(){ if (!sheet.classList.contains('open')) scrim.hidden = true; }, 350);
  ctx.open = null;
}
function openItem(id){
  var n = byId[id]; if (!n) return;
  ctx.open = id;
  var m = META[n.sec], s = S[n.sec], idx = visible.indexOf(id), on = done[id];
  var body = (kind(n) === 'rich') ? (n.title ? '<h2 class="d-t">'+esc(n.title)+'</h2>' : '') + '<div class="rich d-rich">'+n.html+'</div>' : '<div class="d-cells k-'+kind(n)+'">'+cellsHTML(n)+'</div>';
  openSheet('<div class="d-head" style="--c:'+m.c+'"><span class="crumb">'+(idx>=0?'<b class="mono">'+(idx+1)+'/'+visible.length+'</b> ':'')+esc(s.title)+(n.h2?' · '+esc(n.h2):'')+(n.h3?' · '+esc(n.h3):'')+'</span>'+
    '<button class="icon" id="dClose" type="button" aria-label="关闭">'+svg('<path d="M6 6l12 12M18 6 6 18"/>')+'</button></div>'+
    '<div class="d-body" style="--c:'+m.c+';--c2:'+m.c2+'">'+body+'</div>'+
    '<div class="d-foot">'+
      '<button class="b ghost sq" id="dPrev" type="button"'+(idx>0?'':' disabled')+' aria-label="上一条">'+svg('<path d="M15 6l-6 6 6 6"/>')+'</button>'+
      '<button class="b '+(on?'ghost':'pri')+' grow" id="dDone" type="button">'+(on?'已学 ✓ 点击取消':'标记已学')+'</button>'+
      '<button class="b ghost sq" id="dNext" type="button"'+(idx>=0&&idx<visible.length-1?'':' disabled')+' aria-label="下一条">'+svg('<path d="M9 6l6 6-6 6"/>')+'</button>'+
      '</div>', 'item');
  $('dClose').onclick = closeSheet;
  $('dPrev').onclick = function(){ openItem(visible[idx-1]); };
  $('dNext').onclick = function(){ openItem(visible[idx+1]); };
  $('dDone').onclick = function(){ setDone(id, !done[id]); if (done[id] && idx>=0 && idx<visible.length-1) setTimeout(function(){ openItem(visible[idx+1]); }, 220); else openItem(id); };
}
function openToc(){
  if (!ctx.toc || !ctx.toc.length) { toast('当前没有小节'); return; }
  openSheet('<div class="d-head"><span class="crumb">'+esc(S[cur].title)+' · 目录</span><button class="icon" id="dClose" type="button" aria-label="关闭">'+svg('<path d="M6 6l12 12M18 6 6 18"/>')+'</button></div>'+
    '<div class="toc">'+ctx.toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('')+'</div>', 'tocs');
  $('dClose').onclick = closeSheet;
  sheet.querySelector('.toc').onclick = function(e){
    var a = e.target.closest('[data-h]'); if (!a) return;
    closeSheet(); var el = $(a.dataset.h); if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  };
}
scrim.onclick = closeSheet;

function setDone(id, v){
  if (v) done[id] = 1; else delete done[id];
  LS.set('ielts.done', done);
  [].forEach.call(document.querySelectorAll('.card[data-id="'+id+'"]'), function(c){
    c.classList.toggle('done', !!v); c.querySelector('.chk').setAttribute('aria-pressed', v?'true':'false');
    if (v){ c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  });
  refreshNav();
  if (cur === 'today'){ var ids = todaySet(), d = ids.filter(function(i){ return done[i]; }).length, p = Math.round(d*100/ids.length), hp = document.querySelector('.sh-prog');
    if (hp) hp.innerHTML = ring(p, 92, 7, '#a78bfa', '#34d399', p+'%')+'<div><b class="mono">'+d+' / '+ids.length+'</b><small>今日已学</small></div>'; }
}

var tt;
function toast(msg){ var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove('show'); }, 1600); }

/* 事件 */
main.addEventListener('click', function(e){
  var chk = e.target.closest('.chk');
  if (chk){ var id = chk.closest('.card').dataset.id, v = !done[id]; setDone(id, v); toast(v ? '已标记为已学' : '已取消'); return; }
  if (e.target.id === 'unread' || e.target.closest('#unread')){ UNREAD = !UNREAD; LS.set('ielts.unread', UNREAD); rerenderList(); return; }
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
    renderHome(); if (focused){ var q = $('q'); q.focus(); try{ q.setSelectionRange(pos,pos); }catch(e){} }
  }
}
/* 聚光灯：鼠标位置 */
document.addEventListener('pointermove', function(e){
  var el = e.target.closest && e.target.closest('.spot, .card'); if (!el) return;
  var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left)+'px'); el.style.setProperty('--my', (e.clientY - r.top)+'px');
}, {passive:true});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet();
  if (ctx.open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')){ var i = visible.indexOf(ctx.open) + (e.key === 'ArrowRight' ? 1 : -1); if (visible[i]) openItem(visible[i]); }
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT'){ var q = $('q'); if (q){ e.preventDefault(); q.focus(); } }
});
window.addEventListener('scroll', function(){ $('top').classList.toggle('scrolled', window.scrollY > 8); }, {passive:true});

function render(){
  var s = S[cur];
  $('title').textContent = s ? s.title : cur === 'today' ? '今日任务' : '雅思 7.5';
  document.title = (s ? s.title + ' · ' : cur==='today' ? '今日任务 · ' : '') + '雅思备考 · XU SIYIN';
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
