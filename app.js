(function(){
'use strict';
/* 雅思 7.5 · v5
   视觉参考（来自 XU SIYIN 的 UI 资源合集）：
   - leonxlnx/minimalist-skill：暖中性黑白 + 低饱和色块标签、编辑感衬线标题、1px 细线、墨黑主按钮、键帽
   - Beautiful UI（beautifului.dev）：像素格加载器 → 今日像素格；Task Rows → 任务行；Insight Cards → 大数字阶段卡
   - leonxlnx/taste-skill：去 AI 味约束（不用 Inter、无紫色辉光、无装饰圆点、无灰色填充进度条、单一强调色）
   图标：Phosphor Icons（Bold / Fill），MIT 许可。 */
var D = window.IELTS_DATA, S = {};
D.sections.forEach(function(s, i){ s.idx = i; S[s.key] = s; });
var ICONS = {"arrow-right": "<path d=\"M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z\"/>", "calendar-check": "<path d=\"M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Zm120.49-84.49a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-24-24a12,12,0,0,1,17-17L116,159l39.51-39.52A12,12,0,0,1,172.49,119.51Z\"/>", "caret-left": "<path d=\"M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z\"/>", "caret-right": "<path d=\"M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z\"/>", "chats-circle": "<path d=\"M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z\"/>", "check-square": "<path d=\"M79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0ZM228,48V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48Zm-24,4H52V204H204Z\"/>", "check": "<path d=\"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z\"/>", "f-check-square": "<path d=\"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-34.34,77.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z\"/>", "f-house-simple": "<path d=\"M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z\"/>", "f-magnifying-glass": "<path d=\"M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z\"/>", "f-squares-four": "<path d=\"M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z\"/>", "f-warning-diamond": "<path d=\"M235.33,116.72,139.28,20.66a16,16,0,0,0-22.56,0l-96,96.06a16,16,0,0,0,0,22.56l96.05,96.06h0a16,16,0,0,0,22.56,0l96.05-96.06a16,16,0,0,0,0-22.56ZM120,80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z\"/>", "file-text": "<path d=\"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z\"/>", "house-simple": "<path d=\"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H52V121.65l76-76,76,76Z\"/>", "link-simple": "<path d=\"M87.5,151.52l64-64a12,12,0,0,1,17,17l-64,64a12,12,0,0,1-17-17Zm131-114a60.08,60.08,0,0,0-84.87,0L103.51,67.61a12,12,0,0,0,17,17l30.07-30.06a36,36,0,0,1,50.93,50.92L171.4,135.52a12,12,0,1,0,17,17l30.08-30.06A60.09,60.09,0,0,0,218.45,37.55ZM135.52,171.4l-30.07,30.08a36,36,0,0,1-50.92-50.93l30.06-30.07a12,12,0,0,0-17-17L37.55,133.58a60,60,0,0,0,84.88,84.87l30.06-30.07a12,12,0,0,0-17-17Z\"/>", "list-bullets": "<path d=\"M76,64A12,12,0,0,1,88,52H216a12,12,0,0,1,0,24H88A12,12,0,0,1,76,64Zm140,52H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,64H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24ZM44,112a16,16,0,1,0,16,16A16,16,0,0,0,44,112Zm0-64A16,16,0,1,0,60,64,16,16,0,0,0,44,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,44,176Z\"/>", "magnifying-glass": "<path d=\"M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z\"/>", "moon": "<path d=\"M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z\"/>", "notebook": "<path d=\"M108,108a12,12,0,0,1,12-12h56a12,12,0,0,1,0,24H120A12,12,0,0,1,108,108Zm68,28H120a12,12,0,0,0,0,24h56a12,12,0,0,0,0-24Zm52-88V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48ZM52,204H68V52H52ZM204,52H92V204H204Z\"/>", "squares-four": "<path d=\"M100,36H56A20,20,0,0,0,36,56v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,100,36ZM96,96H60V60H96ZM200,36H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,60H160V60h36Zm-96,40H56a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,100,136Zm-4,60H60V160H96Zm104-60H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,200,136Zm-4,60H160V160h36Z\"/>", "sun": "<path d=\"M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z\"/>", "text-aa": "<path d=\"M90.86,50.89a12,12,0,0,0-21.72,0l-64,136a12,12,0,0,0,21.71,10.22L42.44,164h75.12l15.58,33.11a12,12,0,0,0,21.72-10.22ZM53.74,140,80,84.18,106.27,140ZM200,84c-13.85,0-24.77,3.86-32.45,11.48a12,12,0,1,0,16.9,17c3-3,8.26-4.52,15.55-4.52,11,0,20,7.18,20,16v4.39A47.28,47.28,0,0,0,200,124c-24.26,0-44,17.94-44,40s19.74,40,44,40a47.18,47.18,0,0,0,22-5.38A12,12,0,0,0,244,192V124C244,101.94,224.26,84,200,84Zm0,96c-11,0-20-7.18-20-16s9-16,20-16,20,7.18,20,16S211,180,200,180Z\"/>", "warning-diamond": "<path d=\"M128,68a12,12,0,0,1,12,12v52a12,12,0,0,1-24,0V80A12,12,0,0,1,128,68Zm0,88a16,16,0,1,0,16,16A16,16,0,0,0,128,156Zm116-28a19.86,19.86,0,0,1-5.84,14.11l-96,96.06a20,20,0,0,1-28.21,0h0l-96-96.06a20,20,0,0,1,0-28.22l96.05-96.06a20,20,0,0,1,28.21,0l96.06,96.06A19.86,19.86,0,0,1,244,128Zm-25.68,0L128,37.67,37.68,128,128,218.33Z\"/>", "play": "<path d=\"M72,39.88V216.12a8,8,0,0,0,12.15,6.83L228.37,134.83a8,8,0,0,0,0-13.66L84.15,33.05A8,8,0,0,0,72,39.88Z\"/>", "pause": "<path d=\"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z\"/>", "microphone": "<path d=\"M128,180a52.06,52.06,0,0,0,52-52V64a52,52,0,0,0-104,0v64A52.06,52.06,0,0,0,128,180ZM100,64a28,28,0,0,1,56,0v64a28,28,0,0,1-56,0Zm40,155.22V240a12,12,0,0,1-24,0V219.22A92.14,92.14,0,0,1,36,128a12,12,0,0,1,24,0,68,68,0,0,0,136,0,12,12,0,0,1,24,0A92.14,92.14,0,0,1,140,219.22Z\"/>", "plus": "<path d=\"M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z\"/>", "x": "<path d=\"M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z\"/>"};
function ic(name, cls){ return '<svg class="ph'+(cls?' '+cls:'')+'" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">'+(ICONS[name]||ICONS[name.replace(/^f-/,'')]||'')+'</svg>'; }

var META = {
  plan:        {nav:'计划', en:'Study Plan',       ic:'calendar-check'},
  grammar:     {nav:'语法', en:'Grammar & Accent', ic:'text-aa'},
  dialogues:   {nav:'对话', en:'Conversations',    ic:'chats-circle'},
  templates:   {nav:'模板', en:'Templates',        ic:'file-text'},
  collocations:{nav:'搭配', en:'Collocations',     ic:'link-simple'},
  mistakes:    {nav:'错题', en:'Mistake Log',      ic:'warning-diamond'}
};
var ORDER = ['plan','grammar','dialogues','templates','collocations','mistakes'];

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
/* 英文为主的内容用衬线体排 */
function isEn(html){ var t = strip(html).replace(/[✗✓…\.\,\/\(\)\[\]\-\?!'":;0-9\s%]/g,''); if (!t) return false; var lat = (t.match(/[A-Za-z]/g)||[]).length; return lat / t.length > 0.7; }
/* 一条一个点：已学为实心（替代灰色填充进度条） */
function dots(key){ return '<span class="dots" aria-hidden="true">'+items(S[key]).map(function(n){ return '<i data-dot="'+n.id+'"'+(done[n.id]?' class="on"':'')+'></i>'; }).join('')+'</span>'; }

D.sections.forEach(function(s){
  var h2 = null, h3 = null;
  s.nodes.forEach(function(n){
    if (n.t === 'h2'){ h2 = n.text; h3 = null; }
    else if (n.t === 'h3') h3 = n.text;
    else if (n.t === 'item'){ n.sec = s.key; n.h2 = h2; n.h3 = h3; byId[n.id] = n; }
  });
});

/* 主题 */
function themeIcon(){ $('themeTop').innerHTML = document.documentElement.dataset.theme === 'dark' ? ic('sun') : ic('moon'); }
function toggleTheme(){
  var t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t; try{ localStorage.setItem('ielts.theme', t); }catch(e){}
  var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#121211' : '#fcfcfb';
  themeIcon();
}
$('themeTop').onclick = toggleTheme; themeIcon();
$('searchTop').onclick = function(e){ e.preventDefault(); if (cur !== 'home') location.hash = '#home'; setTimeout(function(){ var q = $('q'); if (q){ q.focus(); q.scrollIntoView({block:'center'}); } }, 80); };

/* 导航 */
var NAV = [['home','首页','house-simple'],['today','今日','check-square'],['course','课表','calendar-check'],['practice','练习','notebook'],['archive','档案','warning-diamond'],['sections','版块','squares-four']];
var EXT = null;
function navHTML(){
  $('tabs').innerHTML = '<a href="#home" data-k="home">首页</a><a href="#today" data-k="today">今日</a><a href="#course" data-k="course">课表</a><a href="#practice" data-k="practice">练习</a><a href="#archive" data-k="archive">档案</a><span class="tab-sep"></span>'+
    ORDER.map(function(k){ return '<a href="#'+k+'" data-k="'+k+'">'+META[k].nav+'</a>'; }).join('');
  $('nav').innerHTML = NAV.map(function(x){
    return '<a href="'+(x[0]==='sections'||x[0]==='search'?'javascript:':'#'+x[0])+'" data-k="'+x[0]+'">'+ic(x[2],'off')+ic('f-'+x[2],'on')+'<span>'+x[1]+'</span></a>';
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
    if (a.parentNode.id === 'nav' && k === 'sections') on = !!S[cur];
    a.classList.toggle('on', on);
  });
  var t = total();
  $('topProg').innerHTML = '<b>'+t.d+'</b><span>/'+t.n+'</span>';
  [].forEach.call(document.querySelectorAll('[data-sp]'), function(e){
    var x = stat(S[e.dataset.sp]);
    var n = e.querySelector('.sp-n'); if (n) n.textContent = x.d + ' / ' + x.n;
    var p = e.querySelector('.sp-p'); if (p) p.textContent = x.p + '%';
  });
  var ids = todaySet(), d = ids.filter(function(i){ return done[i]; }).length;
  [].forEach.call(document.querySelectorAll('.td-n'), function(e){ e.textContent = d + ' / ' + ids.length; });
  [].forEach.call(document.querySelectorAll('.td-left'), function(e){ e.textContent = ids.length - d; });
  [].forEach.call(document.querySelectorAll('.tp-n'), function(e){ e.textContent = t.d; });
  [].forEach.call(document.querySelectorAll('.tp-p'), function(e){ e.textContent = t.p + '%'; });
}

/* 当前阶段：从“复习计划”表格的“时间”列推算 */
function parseSide(str, end){
  var m = str.match(/(\d+)\s*月\s*(?:(\d+)\s*日|(初|底))?/); if (!m) return null;
  var mo = +m[1], y = mo >= 8 ? 2026 : 2027, d;
  if (m[2]) d = +m[2]; else if (m[3] === '初') d = end ? 10 : 1; else if (m[3] === '底') d = end ? new Date(y, mo, 0).getDate() : 20; else d = end ? new Date(y, mo, 0).getDate() : 1;
  return new Date(y, mo-1, d, end ? 23 : 0, end ? 59 : 0);
}
function stages(){ return items(S.plan).filter(function(n){ return n.cells && n.cells[0].label === '时间'; }); }
function currentStage(){
  var now = new Date(), list = stages(), best = null;
  list.forEach(function(n, i){
    var parts = strip(n.cells[0].html).split(/[–-]/), a = parseSide(parts[0], false), b = parseSide(parts[1] || parts[0], true);
    if (!a || !b) return;
    if (now >= a && now <= b) best = {n:n, i:i, now:true, a:a, b:b};
    else if (!best && now < a) best = {n:n, i:i, now:false, a:a, b:b};
  });
  if (!best) return null;
  var c = {}; best.n.cells.forEach(function(x){ c[x.label] = x.html; });
  return {c:c, i:best.i, total:list.length, now:best.now, id:best.n.id, a:best.a, b:best.b, list:list};
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

/* 条目 */
function kind(n){
  if (n.title) return 'rich';
  if (!n.cells) return 'rich';
  if (n.cells.some(function(c){ return c.cls.indexOf('err') >= 0; })) return 'mis';
  if (n.sec === 'dialogues' && n.cells.length === 2 && n.cells[0].cls.indexOf('zh') >= 0) return 'pair';
  return 'cells';
}
function fx(h){ return EXT ? EXT.fixPairs(h) : h; }
function cellsHTML(n){
  var k = kind(n);
  if (k === 'mis') return n.cells.map(function(c){
    var cl = c.cls.indexOf('err')>=0 ? 'bad' : c.cls.indexOf('ok')>=0 ? 'good' : 'why';
    var v = c.html;
    if (cl !== 'why') v = v.replace(/^\s*[✗✓]\s*/, '');
    if (cl === 'good') v = '<span class="hl">'+v+'</span>';
    return '<div class="m '+cl+'">'+(cl==='why'?'<span class="lab">'+esc(c.label)+'</span>':'<span class="mk" aria-label="'+esc(c.label)+'">'+(cl==='bad'?'✗':'✓')+'</span>')+'<div class="v">'+v+'</div></div>';
  }).join('');
  if (k === 'pair') return '<p class="pz">'+n.cells[0].html+'</p><div class="pe en">'+n.cells[1].html+'</div>';
  var first = n.cells[0], rest = n.cells.slice(1), h = '';
  h += '<div class="lead'+(isEn(first.html)?' en':'')+'">'+(first.label?'<span class="lab">'+esc(first.label)+'</span>':'')+'<div class="v">'+first.html+'</div></div>';
  h += rest.length ? '<dl class="rows">'+rest.map(function(c){
    return '<div class="row'+(isEn(c.html)?' en':'')+'">'+(c.label?'<dt class="lab">'+esc(c.label)+'</dt>':'')+'<dd class="v">'+c.html+'</dd></div>';
  }).join('')+'</dl>' : '';
  return h;
}
function entryHTML(n, i, opts){
  opts = opts || {};
  var on = done[n.id], k = kind(n), body;
  if (k === 'rich'){
    var txt = strip(n.html), long = txt.length > 170;
    body = (n.title ? '<h4>'+esc(n.title)+'</h4>' : '') +
      '<div class="rich'+(long?' clamp':'')+'">'+fx(n.html)+'</div>' +
      (long ? '<span class="more-l">展开全文 '+ic('arrow-right')+'</span>' : '') + (EXT ? EXT.cardExtra(n) : '');
  } else body = cellsHTML(n);
  var crumb = opts.crumb ? '<span class="tag t-'+n.sec+'">'+esc(META[n.sec].nav)+'</span>' : '';
  return '<article class="card k-'+k+' t-'+n.sec+(on?' done':'')+'" data-id="'+n.id+'" style="--i:'+Math.min(i||0,10)+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="标记已学">'+ic('check')+'</button>'+
    '<div class="card-in">'+crumb+body+'</div></article>';
}
function taskHTML(n, i){
  var m = META[n.sec], on = done[n.id], k = kind(n);
  var t = n.title || strip(k === 'rich' ? n.html : n.cells[k==='pair'?1:0].html), sub = '';
  if (k === 'cells' && n.cells[1]) sub = strip(n.cells[1].html);
  if (k === 'pair') sub = strip(n.cells[0].html);
  if (k === 'mis'){ var g = n.cells.filter(function(c){ return c.cls.indexOf('ok')>=0; })[0]; t = g ? strip(g.html).replace(/^\s*✓\s*/,'') : t; sub = '改正后的说法'; }
  var en = isEn(t);
  return '<div class="task card t-'+n.sec+(on?' done':'')+'" data-id="'+n.id+'" style="--i:'+i+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="标记已学">'+ic('check')+'</button>'+
    '<div class="task-t card-in"><b class="'+(en?'en':'')+'">'+esc(t.length>90?t.slice(0,88)+'…':t)+'</b>'+(sub?'<small>'+esc(sub.length>60?sub.slice(0,58)+'…':sub)+'</small>':'')+'</div>'+
    '<span class="tag t-'+n.sec+'">'+esc(m.nav)+'</span></div>';
}

function terms(){ return Q.trim().toLowerCase().split(/\s+/).filter(Boolean); }
function match(n, t){
  if (UNREAD && done[n.id]) return false;
  for (var i=0;i<t.length;i++) if (n.q.toLowerCase().indexOf(t[i]) < 0) return false;
  return true;
}

function toolbar(placeholder){
  return '<div class="tools"><label class="search">'+ic('magnifying-glass')+
    '<input id="q" type="search" placeholder="'+placeholder+'" value="'+esc(Q)+'" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search" aria-label="搜索">'+
    '<kbd class="kbd">/</kbd><button class="clr" id="clr" type="button" aria-label="清空"'+(Q?'':' hidden')+'>'+ic('x')+'</button></label>'+
    '<button class="tg'+(UNREAD?' on':'')+'" id="unread" type="button" aria-pressed="'+UNREAD+'"><span class="sw"><i></i></span>只看未学</button>'+
    (S[cur] ? '<button class="b ghost toc-b" id="tocBtn" type="button">'+ic('list-bullets')+'<span>目录</span></button>' : '')+
    '</div>';
}

function greet(){ var h = new Date().getHours(); return h < 5 ? '夜深了' : h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好'; }
var WK = ['日','一','二','三','四','五','六'];
function daysTo(d){ return Math.max(0, Math.ceil((d - new Date())/86400000)); }
function md(d){ return (d.getMonth()+1)+'.'+(d.getDate()<10?'0':'')+d.getDate(); }

/* 六个版块：不等大小的色块网格 */
function bento(compact){
  var order = compact ? ORDER : ['mistakes','collocations','grammar','dialogues','templates','plan'];
  return '<div class="bento'+(compact?' compact':'')+'">'+order.map(function(k, i){
    var s = S[k], x = stat(s), m = META[k];
    return '<a class="tile t-'+k+' b-'+k+'" href="#'+k+'" data-sp="'+k+'" style="--i:'+i+'">'+
      '<span class="tile-top"><span class="tile-ic">'+ic(m.ic)+'</span><span class="sp-n mono">'+x.d+' / '+x.n+'</span></span>'+
      '<span class="tile-en">'+m.en+'</span>'+
      '<span class="tile-zh">'+esc(s.title)+'</span>'+
      (compact ? '' : dots(k))+
      '</a>';
  }).join('')+'</div>';
}

/* ---------- 首页 ---------- */
function renderHome(){
  var t = total(), st = currentStage(), last = S[LS.get('ielts.last', 'grammar')] ? LS.get('ielts.last', 'grammar') : 'grammar';
  var nextIt = items(S[last]).filter(function(n){ return !done[n.id]; })[0];
  var tids = todaySet(), tdone = tids.filter(function(id){ return done[id]; }).length;
  var now = new Date(), exam = new Date(2027, 4, 1), searching = terms().length || UNREAD;
  var h = '<section class="hero">'+
    '<div class="hero-l">'+
      '<p class="date mono">'+now.getFullYear()+'.'+(now.getMonth()+1)+'.'+now.getDate()+'  星期'+WK[now.getDay()]+'</p>'+
      '<h1>'+greet()+'，SIYIN。<br>今天还剩 <span class="big td-left">'+(tids.length - tdone)+'</span> 条。</h1>'+
      '<p class="lede">目标雅思 7.5，单科不低于 6.5。距 2027 年 5 月申请还有 '+daysTo(exam)+' 天。</p>'+
      toolbar('搜索 '+t.n+' 条笔记')+
    '</div>';
  if (!searching){
    h += '<div class="hero-r pix-card">'+
      '<div class="pix-h"><span>今日 <b class="td-n mono">'+tdone+' / '+tids.length+'</b></span><a href="#today" class="lnk">全部 '+ic('arrow-right')+'</a></div>'+
      '<div class="pix">'+tids.map(function(id, i){ var n = byId[id]; return '<button type="button" class="px t-'+n.sec+(done[id]?' on':'')+'" data-open="'+id+'" data-dot="'+id+'" style="--i:'+i+'" aria-label="'+esc(META[n.sec].nav)+' 第 '+(i+1)+' 条"></button>'; }).join('')+'</div>'+
      '<div class="pix-leg">'+[['grammar',2],['dialogues',2],['templates',2],['collocations',5],['mistakes',6]].map(function(p){ return '<span><i class="sq t-'+p[0]+'"></i>'+META[p[0]].nav+' '+p[1]+'</span>'; }).join('')+'</div>'+
    '</div>';
  }
  h += '</section><div id="results"></div>';

  if (!searching && EXT) h += EXT.homeBlock();
  if (!searching){
    var preview = tids.slice(0, 6);
    visible = tids.slice();
    h += '<div class="home-grid"><section class="today-b">'+
      '<h2 class="sec-h">今日任务</h2>'+
      (preview.length ? '<div class="tasks">'+preview.map(function(id, i){ return taskHTML(byId[id], i); }).join('')+'</div>' : '<div class="empty"><b>今天的都学完了</b><span>明天会自动换下一批。</span></div>')+
      '<div class="row-f"><a class="b pri" href="#today">开始今日 '+tids.length+' 条</a>'+
      '<a class="b ghost" href="#'+last+(nextIt?'/'+nextIt.id:'')+'">接着学'+esc(META[last].nav)+'</a></div></section>';
    h += '<aside class="side">';
    if (st){
      var pct = st.now ? Math.min(100,Math.round((now-st.a)*100/(st.b-st.a))) : 0;
      h += '<section class="stage">'+
        '<p class="mono muted">'+(st.now?'本阶段':'下一阶段')+'  '+md(st.a)+' - '+md(st.b)+'</p>'+
        '<h3>'+esc(strip(st.c['阶段']))+'</h3>'+
        '<p class="stage-f">'+st.c['重点']+'</p>'+
        '<div class="seg" aria-label="共 '+st.total+' 段，当前第 '+(st.i+1)+' 段">'+st.list.map(function(n, i){ return '<i class="'+(i<st.i?'past':i===st.i?'now':'')+'"'+(i===st.i?' style="--p:'+pct+'%"':'')+'></i>'; }).join('')+'</div>'+
        '<p class="seg-l mono"><span>第 '+(st.i+1)+' / '+st.total+' 段</span><span>'+(st.now?'已过 '+pct+'%':'未开始')+'</span></p>'+
        (st.c['阶段目标']?'<p class="goal"><span class="tag t-plan">阶段目标</span>'+st.c['阶段目标']+'</p>':'')+
        '</section>';
    }
    h += '<section class="score">'+
      '<div class="score-main"><span class="sc-n">7.5</span><span class="sc-l">目标总分</span></div>'+
      '<div class="score-sub">'+[['L','听力'],['R','阅读'],['W','写作'],['S','口语']].map(function(g){ return '<span><b>6.5</b><small>'+g[1]+'</small></span>'; }).join('')+'</div>'+
      '<p class="score-p">已学 <b class="tp-n">'+t.d+'</b> / '+t.n+' 条，<b class="tp-p">'+t.p+'%</b></p>'+
      '</section>';
    h += '</aside></div>';
    h += '<section class="sections-b"><h2 class="sec-h">六个版块</h2>'+bento(false)+'</section>';
    h += '<p class="foot">点条目左侧的方框标记已学。进度只存在这台设备的浏览器里。<button class="lnk" id="reset" type="button">清空全部进度</button></p>';
  }
  main.innerHTML = h;
  if ($('reset')) $('reset').onclick = function(){ if (confirm('确定清空所有已学标记？')) { done = {}; LS.set('ielts.done', done); refreshNav(); render(); } };
  if (searching) renderSearch($('results'));
}

function renderSearch(box){
  var t = terms(), h = '', tot = 0, LIMIT = 40; visible = [];
  ORDER.forEach(function(k){
    var s = S[k], hits = items(s).filter(function(n){ return match(n, t); });
    if (!hits.length) return;
    tot += hits.length;
    h += '<div class="g-h"><h2><span class="tag t-'+k+'">'+esc(META[k].nav)+'</span>'+esc(s.title)+'<span class="cnt mono">'+hits.length+'</span></h2>'+
      (hits.length > LIMIT ? '<a class="lnk" href="#'+k+'">查看全部 '+ic('arrow-right')+'</a>' : '')+'</div><div class="cards">'+
      hits.slice(0, LIMIT).map(function(n, i){ visible.push(n.id); return entryHTML(n, i); }).join('')+'</div>';
  });
  box.innerHTML = tot ? '<p class="count mono">共 '+tot+' 条</p>' + h : '<div class="empty"><b>没有找到</b><span>换个关键词，或关掉“只看未学”。</span></div>';
  highlight(box, t);
}

/* ---------- 今日 ---------- */
function renderToday(){
  var ids = todaySet(), d = ids.filter(function(id){ return done[id]; }).length;
  visible = ids.slice();
  var h = '<section class="s-head t-plan">'+
    '<h1 class="s-en">Today</h1>'+
    '<p class="s-zh">今日任务 <span class="td-n mono">'+d+' / '+ids.length+'</span></p>'+
    '<p class="lede">每天从各版块里挑还没学的：语法 2，对话 2，模板 2，搭配 5，错题 6。学完一条勾一条，明天换下一批。</p>'+
    '<div class="pix wide">'+ids.map(function(id, i){ var n = byId[id]; return '<button type="button" class="px t-'+n.sec+(done[id]?' on':'')+'" data-open="'+id+'" data-dot="'+id+'" style="--i:'+i+'" aria-label="第 '+(i+1)+' 条"></button>'; }).join('')+'</div>'+
    '</section>';
  h += ids.length ? '<div class="cards">'+ids.map(function(id, i){ return entryHTML(byId[id], i, {crumb:true}); }).join('')+'</div>' : '<div class="empty"><b>今天的都学完了</b><span>明天会自动换下一批。</span></div>';
  main.innerHTML = h;
}

/* ---------- 版块 ---------- */
function renderSection(s){
  var m = META[s.key], x = stat(s);
  var h = '<section class="s-head t-'+s.key+'" data-sp="'+s.key+'">'+
    '<h1 class="s-en">'+m.en+'</h1>'+
    '<p class="s-zh">'+esc(s.title)+'<span class="mono muted">第 '+s.idx+' 部分</span></p>'+
    '<div class="s-prog">'+dots(s.key)+'<span class="s-num mono"><b class="sp-p">'+x.p+'%</b><span class="sp-n">'+x.d+' / '+x.n+'</span></span></div>'+
    '</section>';
  h += '<div class="sec-grid"><div class="col-main"><div class="sticky">'+toolbar('在'+s.title+'里搜索')+'</div><div id="list"></div></div>'+
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
        html += '<div class="g-h" id="'+id+'"><h2>'+(num?'<span class="no">'+(num.length<2?'0'+num:num)+'</span>':'')+esc(txt)+'</h2></div>';
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
    if (n.t === 'note'){ if (!t.length && !UNREAD){ flush(); close(); html += '<div class="note">'+n.html+'</div>'; } return; }
    if (!match(n, t)) return;
    flush();
    if (!open){ html += '<div class="cards">'; open = true; }
    html += entryHTML(n, shown); visible.push(n.id); shown++;
  });
  close();
  if (!shown) html += '<div class="empty">'+(UNREAD && !t.length ? '<b>这个版块全部学完了</b><span>可以关掉“只看未学”复习一遍。</span>' : '<b>没有找到</b><span>换个关键词试试。</span>')+'</div>';
  else if (t.length || UNREAD) html = '<p class="count mono">'+(t.length?'找到 ':'未学 ')+shown+' 条</p>' + html;
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
function sheetHead(title, sec){ return '<div class="d-head"><span class="d-crumb">'+(sec?'<span class="tag t-'+sec+'">'+esc(META[sec].nav)+'</span>':'')+title+'</span><button class="icon" id="dClose" type="button" aria-label="关闭">'+ic('x')+'</button></div>'; }
function openItem(id){
  var n = byId[id]; if (!n) return;
  ctx.open = id;
  var s = S[n.sec], idx = visible.indexOf(id), on = done[id];
  var body = (kind(n) === 'rich') ? (n.title ? '<h2 class="d-t">'+esc(n.title)+'</h2>' : '') + '<div class="rich d-rich">'+fx(n.html)+'</div>' : '<div class="d-cells card k-'+kind(n)+' t-'+n.sec+'"><div class="card-in">'+cellsHTML(n)+'</div></div>';
  if (EXT) body += EXT.itemExtra(n);
  var inS = EXT && EXT.inSrs(id);
  openSheet(sheetHead('<span class="d-path">'+esc(n.h2 ? n.h2.replace(/^\d+\.\s*/,'') : s.title)+'</span>'+(idx>=0?'<span class="mono muted">'+(idx+1)+' / '+visible.length+'</span>':''), n.sec)+
    '<div class="d-body">'+body+'</div>'+
    '<div class="d-foot">'+
      '<button class="b ghost sq" id="dPrev" type="button"'+(idx>0?'':' disabled')+' aria-label="上一条">'+ic('caret-left')+'</button>'+
      (EXT ? '<button class="b ghost sq'+(inS?' on':'')+'" id="dWeak" type="button" aria-label="加入复习" title="'+(inS?'已在复习曲线里':'加入复习（1/3/7/14/30 天）')+'">'+ic(inS?'check':'plus')+'</button>' : '')+
      '<button class="b '+(on?'ghost':'pri')+' grow" id="dDone" type="button">'+(on?'已学，点击取消':'标记已学，下一条')+'</button>'+
      '<button class="b ghost sq" id="dNext" type="button"'+(idx>=0&&idx<visible.length-1?'':' disabled')+' aria-label="下一条">'+ic('caret-right')+'</button>'+
      '</div>', 'item');
  $('dClose').onclick = closeSheet;
  if ($('dWeak')) $('dWeak').onclick = function(){ if (EXT.inSrs(id)) { toast('已在复习曲线里'); return; } EXT.addItem(n); toast('已加入复习 · 明天到期'); this.classList.add('on'); this.innerHTML = ic('check'); };
  $('dPrev').onclick = function(){ openItem(visible[idx-1]); };
  $('dNext').onclick = function(){ openItem(visible[idx+1]); };
  $('dDone').onclick = function(){ setDone(id, !done[id]); if (done[id] && idx>=0 && idx<visible.length-1) setTimeout(function(){ openItem(visible[idx+1]); }, 200); else openItem(id); };
}
function openToc(){
  if (!ctx.toc || !ctx.toc.length) { toast('当前没有小节'); return; }
  openSheet(sheetHead('<span class="d-path">目录</span>', cur)+
    '<div class="toc">'+ctx.toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('')+'</div>', 'tocs');
  $('dClose').onclick = closeSheet;
}
function openSections(){
  openSheet(sheetHead('<span class="d-path">六个版块</span>')+'<div class="d-body">'+bento(true)+'</div>', 'tocs');
  $('dClose').onclick = closeSheet;
  sheet.querySelector('.bento').onclick = function(){ setTimeout(closeSheet, 0); };
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
    c.classList.toggle('done', !!v); var k = c.querySelector('.chk'); if (k) k.setAttribute('aria-pressed', v?'true':'false');
    if (v){ c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
  });
  [].forEach.call(document.querySelectorAll('[data-dot="'+id+'"]'), function(d){ d.classList.toggle('on', !!v); });
  refreshNav();
}

var tt;
function toast(msg){ var t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove('show'); }, 1500); }

/* 事件 */
main.addEventListener('click', function(e){
  var chk = e.target.closest('.card > .chk');
  if (chk){ var id = chk.closest('.card').dataset.id, v = !done[id]; setDone(id, v); toast(v ? '已标记为已学' : '已取消'); return; }
  var px = e.target.closest('[data-open]'); if (px){ openItem(px.dataset.open); return; }
  if (e.target.closest('#unread')){ UNREAD = !UNREAD; LS.set('ielts.unread', UNREAD); rerenderList(); return; }
  if (e.target.closest('#tocBtn')){ openToc(); return; }
  if (e.target.closest('#clr')){ Q = ''; var qi = $('q'); if (qi) qi.value = ''; rerenderList(); return; }
  var card = e.target.closest('.card');
  if (card && card.dataset.id && !e.target.closest('a')) openItem(card.dataset.id);
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
/* 顶栏阴影：用 IntersectionObserver 观察页顶哨兵 */
if ('IntersectionObserver' in window){
  new IntersectionObserver(function(en){ $('top').classList.toggle('scrolled', !en[0].isIntersecting); }).observe($('sentinel'));
}

function render(){
  var s = S[cur];
  $('title').textContent = s ? s.title : cur === 'today' ? '今日任务' : '雅思 7.5';
  document.title = (s ? s.title + ' · ' : cur==='today' ? '今日任务 · ' : '') + '雅思 7.5 · XU SIYIN';
  if (EXT && EXT.routes[cur]){ $('title').textContent = EXT.routes[cur].title; document.title = EXT.routes[cur].title + ' · 雅思 7.5 · XU SIYIN'; EXT.render(cur, ctx.sub, main); }
  else if (s){ LS.set('ielts.last', cur); renderSection(s); }
  else if (cur === 'today') renderToday();
  else renderHome();
  document.body.dataset.page = s ? 'section' : (EXT && EXT.routes[cur]) ? 'x' : cur;
  refreshNav();
}
var st;
function route(){
  var parts = (location.hash.slice(1) || 'home').split('/'), k = parts[0];
  var prev = cur;
  cur = (S[k] || k === 'home' || k === 'today' || (EXT && EXT.routes[k])) ? k : 'home';
  ctx.sub = parts[1] || '';
  if (prev !== cur && S[cur]) Q = '';
  closeSheet();
  render();
  if (EXT && EXT.routes[cur]){ if (prev !== cur || parts[1]) window.scrollTo(0, 0); }
  else if (parts[1] && byId[parts[1]]){
    var el = document.querySelector('.card[data-id="'+parts[1]+'"]');
    if (el){ el.scrollIntoView({block:'center'}); el.classList.add('flash'); }
    history.replaceState(null, '', '#'+cur);
  } else {
    var pos = LS.get('ielts.scroll', {});
    window.scrollTo(0, (!Q && pos[cur]) || 0);
  }
}
/* 记住每页滚动位置（防抖保存，不做动画） */
window.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(function(){ var p = LS.get('ielts.scroll', {}); p[cur] = window.scrollY; LS.set('ielts.scroll', p); }, 300); }, {passive:true});
window.addEventListener('hashchange', route);
window.IELTS_APP = {ic:ic, esc:esc, strip:strip, byId:byId, items:items, S:S, META:META, LS:LS, kind:kind, cellsHTML:cellsHTML, entryHTML:entryHTML,
  isDone:function(id){ return !!done[id]; }, setDone:setDone, toast:toast, openItem:openItem, render:function(){ render(); }};
if (window.IELTS_EXT_BOOT){ try{ window.IELTS_EXT_BOOT(window.IELTS_APP); EXT = window.IELTS_EXT || null; }catch(e){ console.error(e); } }
navHTML();
route();
})();
