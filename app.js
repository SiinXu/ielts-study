(function(){
'use strict';
/* 雅思 7.5 · v5d
   视觉参考（来自公开 UI 资源合集）：leonxlnx/minimalist-skill、Beautiful UI、leonxlnx/taste-skill；图标 Phosphor Icons（MIT）。
   v5d：哈希路由（浏览器返回可用）、多语言界面、个人设置（昵称/考试日期/目标分）、不含任何个人信息。 */
var D = window.IELTS_DATA, S = {}, I = window.I18N, T = I.t;
D.sections.forEach(function(s, i){ s.idx = i; S[s.key] = s; });
var ICONS = {"caret-down": "<path d=\"M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z\"/>", "arrow-right": "<path d=\"M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z\"/>", "calendar-check": "<path d=\"M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Zm120.49-84.49a12,12,0,0,1,0,17l-48,48a12,12,0,0,1-17,0l-24-24a12,12,0,0,1,17-17L116,159l39.51-39.52A12,12,0,0,1,172.49,119.51Z\"/>", "caret-left": "<path d=\"M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z\"/>", "caret-right": "<path d=\"M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z\"/>", "chats-circle": "<path d=\"M236.34,187.09A84,84,0,0,0,172.29,68.9,84,84,0,0,0,19.66,139.09l-6.84,23.26a20,20,0,0,0,24.83,24.83l23.26-6.84a83.94,83.94,0,0,0,22.76,6.74,84.06,84.06,0,0,0,111.42,41.26l23.26,6.84a20,20,0,0,0,24.83-24.83ZM62,155.5a11.88,11.88,0,0,0-3.39.49l-20.72,6.09L44,141.35a12,12,0,0,0-.93-9A60,60,0,1,1,67.7,156.92,12,12,0,0,0,62,155.5Zm150.89,24.8a12,12,0,0,0-.93,9l6.09,20.73L197.36,204a12,12,0,0,0-9.06.93A60,60,0,0,1,111,186.63a83.93,83.93,0,0,0,68.55-91.37,60,60,0,0,1,33.38,85Z\"/>", "check-square": "<path d=\"M79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0ZM228,48V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48Zm-24,4H52V204H204Z\"/>", "check": "<path d=\"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z\"/>", "f-check-square": "<path d=\"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm-34.34,77.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z\"/>", "f-house-simple": "<path d=\"M224,120v96a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a15.87,15.87,0,0,1,4.69-11.32l80-80a16,16,0,0,1,22.62,0l80,80A15.87,15.87,0,0,1,224,120Z\"/>", "f-magnifying-glass": "<path d=\"M168,112a56,56,0,1,1-56-56A56,56,0,0,1,168,112Zm61.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88,88,0,1,1,11.32-11.31l50.06,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z\"/>", "f-squares-four": "<path d=\"M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z\"/>", "f-warning-diamond": "<path d=\"M235.33,116.72,139.28,20.66a16,16,0,0,0-22.56,0l-96,96.06a16,16,0,0,0,0,22.56l96.05,96.06h0a16,16,0,0,0,22.56,0l96.05-96.06a16,16,0,0,0,0-22.56ZM120,80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z\"/>", "file-text": "<path d=\"M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z\"/>", "house-simple": "<path d=\"M222.14,105.85l-80-80a20,20,0,0,0-28.28,0l-80,80A19.86,19.86,0,0,0,28,120v96a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V120A19.86,19.86,0,0,0,222.14,105.85ZM204,204H52V121.65l76-76,76,76Z\"/>", "link-simple": "<path d=\"M87.5,151.52l64-64a12,12,0,0,1,17,17l-64,64a12,12,0,0,1-17-17Zm131-114a60.08,60.08,0,0,0-84.87,0L103.51,67.61a12,12,0,0,0,17,17l30.07-30.06a36,36,0,0,1,50.93,50.92L171.4,135.52a12,12,0,1,0,17,17l30.08-30.06A60.09,60.09,0,0,0,218.45,37.55ZM135.52,171.4l-30.07,30.08a36,36,0,0,1-50.92-50.93l30.06-30.07a12,12,0,0,0-17-17L37.55,133.58a60,60,0,0,0,84.88,84.87l30.06-30.07a12,12,0,0,0-17-17Z\"/>", "list-bullets": "<path d=\"M76,64A12,12,0,0,1,88,52H216a12,12,0,0,1,0,24H88A12,12,0,0,1,76,64Zm140,52H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,64H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24ZM44,112a16,16,0,1,0,16,16A16,16,0,0,0,44,112Zm0-64A16,16,0,1,0,60,64,16,16,0,0,0,44,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,44,176Z\"/>", "magnifying-glass": "<path d=\"M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z\"/>", "moon": "<path d=\"M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z\"/>", "notebook": "<path d=\"M108,108a12,12,0,0,1,12-12h56a12,12,0,0,1,0,24H120A12,12,0,0,1,108,108Zm68,28H120a12,12,0,0,0,0,24h56a12,12,0,0,0,0-24Zm52-88V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48ZM52,204H68V52H52ZM204,52H92V204H204Z\"/>", "squares-four": "<path d=\"M100,36H56A20,20,0,0,0,36,56v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,100,36ZM96,96H60V60H96ZM200,36H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,60H160V60h36Zm-96,40H56a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,100,136Zm-4,60H60V160H96Zm104-60H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,200,136Zm-4,60H160V160h36Z\"/>", "sun": "<path d=\"M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z\"/>", "text-aa": "<path d=\"M90.86,50.89a12,12,0,0,0-21.72,0l-64,136a12,12,0,0,0,21.71,10.22L42.44,164h75.12l15.58,33.11a12,12,0,0,0,21.72-10.22ZM53.74,140,80,84.18,106.27,140ZM200,84c-13.85,0-24.77,3.86-32.45,11.48a12,12,0,1,0,16.9,17c3-3,8.26-4.52,15.55-4.52,11,0,20,7.18,20,16v4.39A47.28,47.28,0,0,0,200,124c-24.26,0-44,17.94-44,40s19.74,40,44,40a47.18,47.18,0,0,0,22-5.38A12,12,0,0,0,244,192V124C244,101.94,224.26,84,200,84Zm0,96c-11,0-20-7.18-20-16s9-16,20-16,20,7.18,20,16S211,180,200,180Z\"/>", "warning-diamond": "<path d=\"M128,68a12,12,0,0,1,12,12v52a12,12,0,0,1-24,0V80A12,12,0,0,1,128,68Zm0,88a16,16,0,1,0,16,16A16,16,0,0,0,128,156Zm116-28a19.86,19.86,0,0,1-5.84,14.11l-96,96.06a20,20,0,0,1-28.21,0h0l-96-96.06a20,20,0,0,1,0-28.22l96.05-96.06a20,20,0,0,1,28.21,0l96.06,96.06A19.86,19.86,0,0,1,244,128Zm-25.68,0L128,37.67,37.68,128,128,218.33Z\"/>", "play": "<path d=\"M72,39.88V216.12a8,8,0,0,0,12.15,6.83L228.37,134.83a8,8,0,0,0,0-13.66L84.15,33.05A8,8,0,0,0,72,39.88Z\"/>", "pause": "<path d=\"M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z\"/>", "microphone": "<path d=\"M128,180a52.06,52.06,0,0,0,52-52V64a52,52,0,0,0-104,0v64A52.06,52.06,0,0,0,128,180ZM100,64a28,28,0,0,1,56,0v64a28,28,0,0,1-56,0Zm40,155.22V240a12,12,0,0,1-24,0V219.22A92.14,92.14,0,0,1,36,128a12,12,0,0,1,24,0,68,68,0,0,0,136,0,12,12,0,0,1,24,0A92.14,92.14,0,0,1,140,219.22Z\"/>", "plus": "<path d=\"M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z\"/>", "x": "<path d=\"M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z\"/>", "sliders": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"22\" stroke-linecap=\"round\"><path d=\"M40 64h52M148 64h68M40 128h112M208 128h8M40 192h20M116 192h100\"/><circle cx=\"120\" cy=\"64\" r=\"24\"/><circle cx=\"180\" cy=\"128\" r=\"24\"/><circle cx=\"88\" cy=\"192\" r=\"24\"/></g>", "globe": "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"20\"><circle cx=\"128\" cy=\"128\" r=\"96\"/><path d=\"M32 128h192M128 32c-30 30-44 62-44 96s14 66 44 96M128 32c30 30 44 62 44 96s-14 66-44 96\"/></g>"};
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

/* ---------- 个人设置（只存本机） ---------- */
var DEF = {name:'', exam:'', start:'', overall:7.5, L:7.5, R:7.5, W:7.5, S:7.5, floor:6.5};
function settings(){ var s = LS.get('ielts.settings', {}) || {}, o = {}; for (var k in DEF) o[k] = s[k] != null && s[k] !== '' ? s[k] : DEF[k]; return o; }
function band(x){ var f = Math.floor(x), r = x - f; return r < .25 ? f : r < .75 ? f + .5 : f + 1; }
function avg4(s){ return (s.L + s.R + s.W + s.S) / 4; }
function fmtB(x){ return (Math.round(x*2)/2).toFixed(1); }

function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function strip(h){ var d = document.createElement('div'); d.innerHTML = String(h||'').replace(/<br\s*\/?>/g,' '); return d.textContent; }
function items(s){ return s.nodes.filter(function(n){ return n.t === 'item'; }); }
function stat(s){ var it = items(s), d = it.filter(function(n){ return done[n.id]; }).length; return {d:d, n:it.length, p: it.length ? Math.round(d*100/it.length) : 0}; }
function total(){ var t=0,d=0; D.sections.forEach(function(s){ var x=stat(s); t+=x.n; d+=x.d; }); return {d:d,n:t,p:t?Math.round(d*100/t):0}; }
function secTitle(k){ return T(S[k].title); }
function secNav(k){ return T(META[k].nav); }
function isEn(html){ var t = strip(html).replace(/[✗✓…\.\,\/\(\)\[\]\-\?!'":;0-9\s%]/g,''); if (!t) return false; var lat = (t.match(/[A-Za-z]/g)||[]).length; return lat / t.length > 0.7; }
function dots(key){ return '<span class="dots" aria-hidden="true">'+items(S[key]).map(function(n){ return '<i data-dot="'+n.id+'"'+(done[n.id]?' class="on"':'')+'></i>'; }).join('')+'</span>'; }

D.sections.forEach(function(s){
  var h2 = null, h3 = null;
  s.nodes.forEach(function(n){
    if (n.t === 'h2'){ h2 = n.text; h3 = null; }
    else if (n.t === 'h3') h3 = n.text;
    else if (n.t === 'item'){ n.sec = s.key; n.h2 = h2; n.h3 = h3; byId[n.id] = n; }
  });
});

/* ---------- 主题 / 语言 ---------- */
function themeIcon(){ $('themeTop').innerHTML = document.documentElement.dataset.theme === 'dark' ? ic('sun') : ic('moon'); $('themeTop').setAttribute('aria-label', T('切换浅色/深色')); }
function toggleTheme(){
  var t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t; try{ localStorage.setItem('ielts.theme', t); }catch(e){}
  var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#121211' : '#fcfcfb';
  themeIcon();
}
$('themeTop').onclick = toggleTheme; themeIcon();
function langLabel(){ var l = I.langs.filter(function(x){ return x[0] === I.lang; })[0]; return l ? l[2] : 'EN'; }
function langOpts(){ return I.langs.map(function(l){ return '<option value="'+l[0]+'"'+(l[0]===I.lang?' selected':'')+'>'+l[1]+'</option>'; }).join(''); }
$('langV').innerHTML = ic('globe')+'<span class="mono">'+langLabel()+'</span>'+ic('caret-down');
$('langSel').innerHTML = langOpts();
$('langSel').setAttribute('aria-label', T('界面语言'));
$('langTop').title = T('界面语言');
$('langSel').onchange = function(){ I.set(this.value); };
$('setTop').setAttribute('aria-label', T('设置'));
$('searchTop').setAttribute('aria-label', T('搜索'));
$('searchTop').onclick = function(e){ e.preventDefault(); if (cur !== 'home') go('#/home'); setTimeout(function(){ var q = $('q'); if (q){ q.focus(); q.scrollIntoView({block:'center'}); } }, 80); };

/* ---------- 导航 ---------- */
var NAV = [['home','首页','house-simple'],['today','今日','check-square'],['course','课表','calendar-check'],['practice','练习','notebook'],['archive','档案','warning-diamond'],['sections','版块','squares-four']];
var EXT = null;
function navHTML(){
  var wm = document.querySelector('.wm'); if (wm) wm.innerHTML = T('雅思')+'<em>Band 7.5</em>';
  $('tabs').innerHTML = NAV.slice(0,5).map(function(x){ return '<a href="#/'+x[0]+'" data-k="'+x[0]+'">'+T(x[1])+'</a>'; }).join('')+'<span class="tab-sep"></span>'+
    ORDER.map(function(k){ return '<a href="#/section/'+k+'" data-k="'+k+'">'+secNav(k)+'</a>'; }).join('');
  $('nav').innerHTML = NAV.map(function(x){
    return '<a href="'+(x[0]==='sections'?'javascript:':'#/'+x[0])+'" data-k="'+x[0]+'">'+ic(x[2],'off')+ic('f-'+x[2],'on')+'<span>'+T(x[1])+'</span></a>';
  }).join('');
  $('nav').setAttribute('aria-label', T('底部导航'));
}
$('nav').addEventListener('click', function(e){
  var a = e.target.closest('a'); if (!a) return;
  if (a.dataset.k === 'sections'){ e.preventDefault(); openSections(); }
});
function refreshNav(){
  [].forEach.call(document.querySelectorAll('#tabs a, #nav a'), function(a){
    var k = a.dataset.k, on = k === cur || (k === 'grammar' && cur === 'gday');
    if (a.parentNode.id === 'nav' && k === 'sections') on = !!S[cur] || cur === 'gday';
    a.classList.toggle('on', on);
  });
  var t = total();
  $('topProg').innerHTML = '<b>'+t.d+'</b><span>/'+t.n+'</span>';
  $('topProg').title = T('已学条目');
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

/* 今日任务：每天从各版块未学条目里按顺序抽取，当天固定 */
var TODAY_PLAN = [['grammar',2],['dialogues',2],['templates',2],['collocations',5],['mistakes',6]];
function todaySet(){
  var key = new Date().toDateString(), t = LS.get('ielts.today', null);
  if (t && t.date === key && t.ids && t.ids.every(function(id){ return byId[id]; })) return t.ids;
  var ids = [];
  TODAY_PLAN.forEach(function(p){ ids = ids.concat(items(S[p[0]]).filter(function(n){ return !done[n.id]; }).slice(0, p[1]).map(function(n){ return n.id; })); });
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
    return '<div class="m '+cl+'">'+(cl==='why'?'<span class="lab">'+esc(T(c.label))+'</span>':'<span class="mk" aria-label="'+esc(T(c.label))+'">'+(cl==='bad'?'✗':'✓')+'</span>')+'<div class="v">'+v+'</div></div>';
  }).join('');
  if (k === 'pair') return '<p class="pz">'+n.cells[0].html+'</p><div class="pe en">'+n.cells[1].html+'</div>';
  var first = n.cells[0], rest = n.cells.slice(1), h = '';
  h += '<div class="lead'+(isEn(first.html)?' en':'')+'">'+(first.label?'<span class="lab">'+esc(T(first.label))+'</span>':'')+'<div class="v">'+first.html+'</div></div>';
  h += rest.length ? '<dl class="rows">'+rest.map(function(c){
    return '<div class="row'+(isEn(c.html)?' en':'')+'">'+(c.label?'<dt class="lab">'+esc(T(c.label))+'</dt>':'')+'<dd class="v">'+c.html+'</dd></div>';
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
      (long ? '<span class="more-l">'+T('展开全文')+' '+ic('arrow-right')+'</span>' : '') + (EXT ? EXT.cardExtra(n) : '');
  } else body = cellsHTML(n);
  var crumb = opts.crumb ? '<span class="tag t-'+n.sec+'">'+esc(secNav(n.sec))+'</span>' : '';
  return '<article class="card k-'+k+' t-'+n.sec+(on?' done':'')+'" data-id="'+n.id+'" style="--i:'+Math.min(i||0,10)+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="'+T('标记已学')+'">'+ic('check')+'</button>'+
    '<div class="card-in">'+crumb+body+'</div></article>';
}
function taskHTML(n, i){
  var on = done[n.id], k = kind(n);
  var t = ttl(n.title) || strip(k === 'rich' ? n.html : n.cells[k==='pair'?1:0].html), sub = '';
  if (k === 'cells' && n.cells[1]) sub = strip(n.cells[1].html);
  if (k === 'pair') sub = strip(n.cells[0].html);
  if (k === 'mis'){ var g = n.cells.filter(function(c){ return c.cls.indexOf('ok')>=0; })[0]; t = g ? strip(g.html).replace(/^\s*✓\s*/,'') : t; sub = T('改正后的说法'); }
  var en = isEn(t);
  return '<div class="task card t-'+n.sec+(on?' done':'')+'" data-id="'+n.id+'" style="--i:'+i+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="'+T('标记已学')+'">'+ic('check')+'</button>'+
    '<div class="task-t card-in"><b class="'+(en?'en':'')+'">'+esc(t.length>90?t.slice(0,88)+'…':t)+'</b>'+(sub?'<small>'+esc(sub.length>60?sub.slice(0,58)+'…':sub)+'</small>':'')+'</div>'+
    '<span class="tag t-'+n.sec+'">'+esc(secNav(n.sec))+'</span></div>';
}

function terms(){ return Q.trim().toLowerCase().split(/\s+/).filter(Boolean); }
function match(n, t){
  if (UNREAD && done[n.id]) return false;
  for (var i=0;i<t.length;i++) if (n.q.toLowerCase().indexOf(t[i]) < 0) return false;
  return true;
}

function toolbar(placeholder){
  return '<div class="tools"><label class="search">'+ic('magnifying-glass')+
    '<input id="q" type="search" placeholder="'+esc(placeholder)+'" value="'+esc(Q)+'" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="search" aria-label="'+T('搜索')+'">'+
    '<kbd class="kbd">/</kbd><button class="clr" id="clr" type="button" aria-label="'+T('清空')+'"'+(Q?'':' hidden')+'>'+ic('x')+'</button></label>'+
    '<button class="tg'+(UNREAD?' on':'')+'" id="unread" type="button" aria-pressed="'+UNREAD+'"><span class="sw"><i></i></span>'+T('只看未学')+'</button>'+
    (S[cur] ? '<button class="b ghost toc-b" id="tocBtn" type="button">'+ic('list-bullets')+'<span>'+T('目录')+'</span></button>' : '')+
    '</div>';
}

function greet(){ var h = new Date().getHours(); return T(h < 5 ? '夜深了' : h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好'); }
function fmtDate(d, o){ try{ return d.toLocaleDateString(I.locale, o); }catch(e){ return d.toDateString(); } }
function daysTo(d){ return Math.max(0, Math.ceil((d - new Date())/86400000)); }
function pDate(s){ var p = String(s||'').split('-'); return p.length === 3 ? new Date(+p[0], +p[1]-1, +p[2]) : null; }

/* 六个版块：不等大小的色块网格 */
function bento(compact){
  var order = compact ? ORDER : ['mistakes','collocations','grammar','dialogues','templates','plan'];
  return '<div class="bento'+(compact?' compact':'')+'">'+order.map(function(k, i){
    var s = S[k], x = stat(s), m = META[k];
    return '<a class="tile t-'+k+' b-'+k+'" href="#/section/'+k+'" data-sp="'+k+'" style="--i:'+i+'">'+
      '<span class="tile-top"><span class="tile-ic">'+ic(m.ic)+'</span><span class="sp-n mono">'+x.d+' / '+x.n+'</span></span>'+
      '<span class="tile-en">'+m.en+'</span>'+
      '<span class="tile-zh">'+esc(secTitle(k))+'</span>'+
      (compact ? '' : dots(k))+
      '</a>';
  }).join('')+'</div>';
}

/* 目标分数卡：四项目标的平均分（按雅思取整规则）就是总分；保底分单独标注 */
function scoreCard(){
  var s = settings(), t = total(), a = band(avg4(s)), mismatch = a !== s.overall;
  return '<section class="score">'+
    '<div class="score-main"><span class="sc-n">'+fmtB(s.overall)+'</span><span class="sc-l">'+T('目标总分')+'</span></div>'+
    '<div class="score-sub">'+[['L','听力'],['R','阅读'],['W','写作'],['S','口语']].map(function(g){ return '<span><b>'+fmtB(s[g[0]])+'</b><small>'+T(g[1])+'</small></span>'; }).join('')+'</div>'+
    '<p class="score-f"><span class="tag t-plan">'+T('单科保底')+' '+fmtB(s.floor)+'</span><span class="muted">'+T('四项目标平均 {a} → 总分 {b}', {a:avg4(s).toFixed(2).replace(/0$/,''), b:fmtB(a)})+'</span>'+(mismatch?'<em>'+T('与目标总分不一致，去设置里调整')+'</em>':'')+'</p>'+
    '<p class="score-p">'+T('已学 {d} / {n} 条，{p}', {d:'<b class="tp-n">'+t.d+'</b>', n:t.n, p:'<b class="tp-p">'+t.p+'%</b>'})+' · <a class="lnk" href="#/settings">'+T('改目标')+'</a></p>'+
    '</section>';
}

/* ---------- 首页 ---------- */
function renderHome(){
  var t = total(), st = settings(), last = S[LS.get('ielts.last', 'grammar')] ? LS.get('ielts.last', 'grammar') : 'grammar';
  var nextIt = items(S[last]).filter(function(n){ return !done[n.id]; })[0];
  var tids = todaySet(), tdone = tids.filter(function(id){ return done[id]; }).length;
  var now = new Date(), exam = pDate(st.exam), searching = terms().length || UNREAD;
  var hello = st.name ? T('{g}，{name}。', {g:greet(), name:esc(st.name)}) : T('{g}。', {g:greet()});
  var lede = T('目标总分 {o}，单科保底 {f}。', {o:fmtB(st.overall), f:fmtB(st.floor)}) + ' ' +
    (exam && exam > now ? T('距考试还有 {n} 天。', {n:'<b>'+daysTo(exam)+'</b>'}) : '<a class="lnk" href="#/settings">'+T('设置考试日期')+' '+ic('arrow-right')+'</a>');
  var h = '<section class="hero">'+
    '<div class="hero-l">'+
      '<p class="date mono">'+esc(fmtDate(now, {year:'numeric', month:'short', day:'numeric', weekday:'short'}))+'</p>'+
      '<h1>'+hello+'<br>'+T('今天还剩 {n} 条。', {n:'<span class="big td-left">'+(tids.length - tdone)+'</span>'})+'</h1>'+
      '<p class="lede">'+lede+'</p>'+
      toolbar(T('搜索 {n} 条笔记', {n:t.n}))+
    '</div>';
  if (!searching){
    h += '<div class="hero-r pix-card">'+
      '<div class="pix-h"><span>'+T('今日')+' <b class="td-n mono">'+tdone+' / '+tids.length+'</b></span><a href="#/today" class="lnk">'+T('全部')+' '+ic('arrow-right')+'</a></div>'+
      '<div class="pix">'+tids.map(function(id, i){ var n = byId[id]; return '<button type="button" class="px t-'+n.sec+(done[id]?' on':'')+'" data-open="'+id+'" data-dot="'+id+'" style="--i:'+i+'" aria-label="'+esc(secNav(n.sec))+' '+(i+1)+'"></button>'; }).join('')+'</div>'+
      '<div class="pix-leg">'+TODAY_PLAN.map(function(p){ return '<span><i class="sq t-'+p[0]+'"></i>'+secNav(p[0])+' '+p[1]+'</span>'; }).join('')+'</div>'+
    '</div>';
  }
  h += '</section><div id="results"></div>';

  if (!searching && EXT) h += EXT.homeBlock();
  if (!searching){
    var preview = tids.slice(0, 6);
    visible = tids.slice();
    h += '<div class="home-grid"><section class="today-b">'+
      '<h2 class="sec-h">'+T('今日任务')+'</h2>'+(EXT && EXT.riskNote ? EXT.riskNote() : '')+
      (preview.length ? '<div class="tasks">'+preview.map(function(id, i){ return taskHTML(byId[id], i); }).join('')+'</div>' : '<div class="empty"><b>'+T('今天的都学完了')+'</b><span>'+T('明天会自动换下一批。')+'</span></div>')+
      '<div class="row-f"><a class="b pri" href="#/today">'+T('开始今日 {n} 条', {n:tids.length})+'</a>'+
      '<a class="b ghost" href="#/section/'+last+(nextIt?'/'+nextIt.id:'')+'">'+T('接着学{s}', {s:secNav(last)})+'</a></div></section>';
    h += '<aside class="side">';
    if (EXT) h += EXT.stageCard();
    h += scoreCard();
    h += '</aside></div>';
    h += '<section class="sections-b"><h2 class="sec-h">'+T('六个版块')+'</h2>'+bento(false)+'</section>';
    h += '<p class="foot">'+T('点条目左侧的方框标记已学。进度只存在这台设备的浏览器里，不会上传。')+'<button class="lnk" id="reset" type="button">'+T('清空全部进度')+'</button></p>';
  }
  main.innerHTML = h;
  if ($('reset')) $('reset').onclick = function(){ if (confirm(T('确定清空所有已学标记？'))) { done = {}; LS.set('ielts.done', done); refreshNav(); render(); } };
  if (searching) renderSearch($('results'));
}

function renderSearch(box){
  var t = terms(), h = '', tot = 0, LIMIT = 40; visible = [];
  ORDER.forEach(function(k){
    var s = S[k], hits = items(s).filter(function(n){ return match(n, t); });
    if (!hits.length) return;
    tot += hits.length;
    h += '<div class="g-h"><h2><span class="tag t-'+k+'">'+esc(secNav(k))+'</span>'+esc(secTitle(k))+'<span class="cnt mono">'+hits.length+'</span></h2>'+
      (hits.length > LIMIT ? '<a class="lnk" href="#/section/'+k+'">'+T('查看全部')+' '+ic('arrow-right')+'</a>' : '')+'</div><div class="cards">'+
      hits.slice(0, LIMIT).map(function(n, i){ visible.push(n.id); return entryHTML(n, i); }).join('')+'</div>';
  });
  box.innerHTML = tot ? '<p class="count mono">'+T('共 {n} 条', {n:tot})+'</p>' + h : '<div class="empty"><b>'+T('没有找到')+'</b><span>'+T('换个关键词，或关掉“只看未学”。')+'</span></div>';
  highlight(box, t);
}

/* ---------- 返回控件（页面内） ---------- */
function ttl(t){ if (!t) return t; var m = t.match(/^第 (\d+) 天 · (.+)$/); return m ? T('第 {n} 天', {n:m[1]})+' · '+T(m[2]) : T(t); }
/* 页内返回：永远叫「返回」，按真实浏览历史退一步；没有历史（直接打开链接）时才去 href 这个兜底父级 */
function backHTML(href){ return '<a class="back-l" href="'+href+'" data-back="'+href+'">'+ic('caret-left')+'<span>'+T('返回')+'</span></a>'; }

/* ---------- 今日 ---------- */
function renderToday(){
  var ids = todaySet(), d = ids.filter(function(id){ return done[id]; }).length;
  visible = ids.slice();
  var h = '<section class="s-head t-plan">'+backHTML('#/home', T('首页'))+
    '<h1 class="s-en">Today</h1>'+
    '<p class="s-zh">'+T('今日任务')+' <span class="td-n mono">'+d+' / '+ids.length+'</span></p>'+
    '<p class="lede">'+T('每天从各版块里挑还没学的：语法 2，对话 2，模板 2，搭配 5，错题 6。学完一条勾一条，明天换下一批。')+'</p>'+
    (EXT && EXT.riskNote ? EXT.riskNote() : '')+
    '<div class="pix wide">'+ids.map(function(id, i){ var n = byId[id]; return '<button type="button" class="px t-'+n.sec+(done[id]?' on':'')+'" data-open="'+id+'" data-dot="'+id+'" style="--i:'+i+'" aria-label="'+(i+1)+'"></button>'; }).join('')+'</div>'+
    '</section>';
  h += ids.length ? '<div class="cards">'+ids.map(function(id, i){ return entryHTML(byId[id], i, {crumb:true}); }).join('')+'</div>' : '<div class="empty"><b>'+T('今天的都学完了')+'</b><span>'+T('明天会自动换下一批。')+'</span></div>';
  main.innerHTML = h;
}

/* ---------- 版块 ---------- */
function renderSection(s){
  var m = META[s.key], x = stat(s);
  var h = '<section class="s-head t-'+s.key+'" data-sp="'+s.key+'">'+backHTML('#/home', T('首页'))+
    '<h1 class="s-en">'+m.en+'</h1>'+
    '<p class="s-zh">'+esc(secTitle(s.key))+'<span class="mono muted">'+T('第 {n} 部分', {n:s.idx})+'</span></p>'+
    '<div class="s-prog">'+dots(s.key)+'<span class="s-num mono"><b class="sp-p">'+x.p+'%</b><span class="sp-n">'+x.d+' / '+x.n+'</span></span></div>'+
    (s.key === 'grammar' && EXT ? EXT.grammarDaysStrip() : '')+
    '</section>';
  h += '<div class="sec-grid"><div class="col-main"><div class="sticky">'+toolbar(T('在{s}里搜索', {s:secTitle(s.key)}))+'</div><div id="list"></div></div>'+
    '<aside class="col-toc"><div class="toc-box"><p class="toc-h">'+T('目录')+'</p><div class="toc" id="sideToc"></div></div></aside></div>';
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
      var id = 'h'+(hid++), txt0 = T(hh.text);
      if (hh.t === 'h2'){
        var num = (txt0.match(/^(\d+)\./)||[])[1], txt = txt0.replace(/^\d+\.\s*/,'');
        html += '<div class="g-h" id="'+id+'"><h2>'+(num?'<span class="no">'+(num.length<2?'0'+num:num)+'</span>':'')+esc(txt)+'</h2></div>';
      } else html += '<h3 class="g-h3" id="'+id+'">'+esc(txt0)+'</h3>';
      toc.push({id:id, t:hh.t, text:txt0});
    });
    pendingH = [];
  }
  s.nodes.forEach(function(n){
    if (n.t === 'h2' || n.t === 'h3'){
      if (n.t === 'h2') pendingH = [];
      pendingH = pendingH.filter(function(h){ return h.t === 'h2'; });
      pendingH.push(n); return;
    }
    if (n.t === 'note'){ if (!t.length && !UNREAD){ flush(); close(); html += '<div class="note">'+T(n.html)+'</div>'; } return; }
    if (!match(n, t)) return;
    flush();
    if (!open){ html += '<div class="cards">'; open = true; }
    html += entryHTML(n, shown); visible.push(n.id); shown++;
  });
  close();
  if (!shown) html += '<div class="empty">'+(UNREAD && !t.length ? '<b>'+T('这个版块全部学完了')+'</b><span>'+T('可以关掉“只看未学”复习一遍。')+'</span>' : '<b>'+T('没有找到')+'</b><span>'+T('换个关键词试试。')+'</span>')+'</div>';
  else if (t.length || UNREAD) html = '<p class="count mono">'+(t.length?T('找到 {n} 条', {n:shown}):T('未学 {n} 条', {n:shown}))+'</p>' + html;
  $('list').innerHTML = html;
  ctx.toc = toc;
  var st = $('sideToc');
  if (st) st.innerHTML = toc.length ? toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('') : '<p class="toc-e">'+T('没有小节')+'</p>';
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

/* ---------- 设置 ---------- */
/* 日期：原生 <input type="date">（系统日期选择器），值始终是 ISO yyyy-mm-dd；
   上面盖一层按界面语言格式化的显示，避免出现 mm/dd/yyyy 输入掩码。 */
function dateFld(k, lab, v){
  return '<div class="fld"><span>'+T(lab)+'</span><div class="dt'+(v?' has':'')+'">'+
    '<span class="dt-v">'+ic('calendar-check')+'<b></b></span>'+
    '<input type="date" name="'+k+'" value="'+esc(v||'')+'" lang="'+esc(I.locale)+'" aria-label="'+esc(T(lab))+'">'+
    '<button class="dt-x" type="button" aria-label="'+T('清除')+'">'+ic('x')+'</button></div></div>';
}
function initDates(f){
  [].forEach.call(f.querySelectorAll('.dt'), function(w){
    var inp = w.querySelector('input'), out = w.querySelector('.dt-v b');
    function show(){ var d = pDate(inp.value); out.textContent = d ? fmtDate(d, {year:'numeric', month:'long', day:'numeric', weekday:'short'}) : T('未设置 · 点这里选日期'); w.classList.toggle('has', !!d); }
    inp.addEventListener('input', show); inp.addEventListener('change', show);
    inp.addEventListener('click', function(){ try{ if (inp.showPicker) inp.showPicker(); }catch(e){} });
    w.querySelector('.dt-x').onclick = function(){ inp.value = ''; show(); inp.dispatchEvent(new Event('change', {bubbles:true})); };
    show();
  });
}

function renderSettings(){
  var s = settings();
  function num(k, lab){ return '<label class="fld"><span>'+T(lab)+'</span><select name="'+k+'">'+[5,5.5,6,6.5,7,7.5,8,8.5,9].map(function(v){ return '<option value="'+v+'"'+(+s[k]===v?' selected':'')+'>'+v.toFixed(1)+'</option>'; }).join('')+'</select></label>'; }
  var h = '<section class="s-head t-plan">'+backHTML('#/home')+'<h1 class="s-en">Settings</h1><p class="s-zh">'+T('设置')+'</p>'+
    '<p class="lede">'+T('这些只保存在你这台设备的浏览器里，不会上传，也不会出现在别人的页面上。不填也能正常使用。')+'</p></section>';
  h += '<form class="setf" id="setf">'+
    '<h2 class="sec-h gap-t">'+T('个人')+'</h2>'+
    '<label class="fld wide"><span>'+T('称呼（可留空）')+'</span><input name="name" maxlength="20" value="'+esc(s.name)+'" placeholder="'+T('例如：Alex')+'" autocomplete="off"></label>'+
    dateFld('exam', '考试日期（可留空）', s.exam)+
    dateFld('start', '课表开始日期', EXT ? EXT.startDate() : s.start)+
    '<h2 class="sec-h gap-t">'+T('目标分数')+'</h2>'+
    '<p class="p-t">'+T('雅思总分 = 四项平均分（按 0.25 进到 .5、0.75 进到整数）。所以四项目标的平均要等于总分；保底分只是「任何一项都不能低于」的底线。')+'</p>'+
    '<div class="fld-g">'+num('overall','目标总分')+num('L','听力')+num('R','阅读')+num('W','写作')+num('S','口语')+num('floor','单科保底')+'</div>'+
    '<p class="set-chk mono" id="setChk"></p>'+
    '<p class="p-t">'+T('保存后课表会按目标重排：比总分低的单项每天加时、没有该科的日子加一块加练；低于保底分的排到今日最前；有考试日期时阶段按「开始 → 考试」伸缩。')+'</p>'+
    '<div class="row-f"><button class="b pri" type="submit">'+T('保存')+'</button><button class="b ghost" type="button" id="setAvg">'+T('四项都设为总分')+'</button><button class="b ghost" type="button" id="setReset">'+T('恢复默认')+'</button></div>'+
    '<h2 class="sec-h gap-t">'+T('界面语言')+'</h2><label class="fld"><span>'+T('界面语言')+'</span><select name="lang" id="setLang">'+langOpts()+'</select></label>'+
    '</form>';
  main.innerHTML = h;
  var f = $('setf'), okBox = document.createElement('div'); okBox.className = 'set-ok'; okBox.id = 'setOk'; okBox.hidden = true; okBox.setAttribute('role', 'status');
  f.querySelector('.row-f').insertAdjacentElement('afterend', okBox);
  function read(){ var o = {name:f.name.value.trim(), exam:f.exam.value, start:f.start.value}; ['overall','L','R','W','S','floor'].forEach(function(k){ o[k] = +f[k].value; }); return o; }
  function check(){
    var o = read(), a = avg4(o), b = band(a), low = ['L','R','W','S'].filter(function(k){ return o[k] < o.floor; });
    var msg = T('四项平均 {a} → 总分 {b}', {a:a.toFixed(3).replace(/0+$/,'').replace(/\.$/,''), b:fmtB(b)});
    msg += b === o.overall ? ' ✓' : ' · '+T('与目标总分 {o} 不一致', {o:fmtB(o.overall)});
    if (low.length) msg += ' · '+T('有单项低于保底分');
    $('setChk').textContent = msg; $('setChk').classList.toggle('bad', b !== o.overall || !!low.length);
  }
  f.onchange = check; f.oninput = check; check();
  $('setAvg').onclick = function(){ ['L','R','W','S'].forEach(function(k){ f[k].value = f.overall.value; }); check(); };
  $('setReset').onclick = function(){ f.overall.value = 7.5; ['L','R','W','S'].forEach(function(k){ f[k].value = 7.5; }); f.floor.value = 6.5; check(); };
  f.onsubmit = function(e){ e.preventDefault(); var o = read(); LS.set('ielts.settings', o); if (EXT && o.start) EXT.setStart(o.start);
    if (EXT && EXT.replan){ var r = EXT.replan(), box = $('setOk');
      box.innerHTML = '<b>'+ic('check')+T('课表已按目标重排')+'</b><span>'+r.summary.map(esc).join(' · ')+'</span><a class="lnk" href="#/course">'+T('看课表')+' '+ic('arrow-right')+'</a>';
      box.hidden = false; toast(T('课表已按目标重排')); }
    else toast(T('已保存'));
    check(); };
  $('setLang').onchange = function(e){ e.stopPropagation(); I.set(this.value); };
  initDates(f);
}

/* ---------- 抽屉 ---------- */
function openSheet(html, cls){
  sheet.className = 'sheet ' + (cls||''); sheet.innerHTML = '<div class="grab"></div>' + html;
  scrim.hidden = false; requestAnimationFrame(function(){ sheet.classList.add('open'); scrim.classList.add('open'); });
  sheet.setAttribute('aria-hidden','false'); document.body.classList.add('lock');
}
function hideSheet(){
  sheet.classList.remove('open'); scrim.classList.remove('open'); sheet.setAttribute('aria-hidden','true'); document.body.classList.remove('lock');
  setTimeout(function(){ if (!sheet.classList.contains('open')) scrim.hidden = true; }, 300);
}
/* 关闭：条目抽屉是一个路由，关掉等于返回上一级；其他弹层（目录、语言、版块）只是关掉 */
function closeSheet(){
  if (ctx.open){ ctx.open = null; goBack(baseHash || '#/home'); return; }
  hideSheet();
}
function sheetHead(title, sec){ return '<div class="d-head"><span class="d-crumb">'+(sec?'<span class="tag t-'+sec+'">'+esc(secNav(sec))+'</span>':'')+title+'</span><button class="icon" id="dClose" type="button" aria-label="'+T('关闭')+'">'+ic('x')+'</button></div>'; }
function baseLabel(h){
  var r = parse(h);
  if (r.v === 'section') return secNav(r.a);
  if (r.v === 'practice' && r.sub){ var tb = {listening:'听力', reading:'阅读', writing:'写作', speaking:'口语', drill:'专项'}[r.sub.split('/')[0]]; if (tb) return T(tb); }
  if (r.v === 'archive' && r.sub) return T('档案');
  return T({home:'首页', today:'今日', course:'课表', practice:'练习', archive:'档案', settings:'设置', gday:'语法'}[r.v] || '返回');
}
function showItem(id){
  var n = byId[id]; if (!n) return;
  ctx.open = id;
  var s = S[n.sec], idx = visible.indexOf(id), on = done[id];
  var body = (kind(n) === 'rich') ? (n.title ? '<h2 class="d-t">'+esc(ttl(n.title))+'</h2>' : '') + '<div class="rich d-rich">'+fx(n.html)+'</div>' : '<div class="d-cells card k-'+kind(n)+' t-'+n.sec+'"><div class="card-in">'+cellsHTML(n)+'</div></div>';
  var REL = window.IELTS_REL;
  if (REL && REL.has(n)){ var rx = REL.render(n, {fx:fx, kind:kind, cellsHTML:cellsHTML, byId:byId, items:items, S:S}); if (rx) body = rx; }
  var inS = EXT && EXT.inSrs(id);
  openSheet('<div class="d-head d-nav">'+
      '<button class="d-back" id="dBack" type="button">'+ic('caret-left')+'<span>'+T('返回')+'</span></button>'+
      '<span class="d-crumb"><span class="tag t-'+n.sec+'">'+esc(secNav(n.sec))+'</span><span class="d-path">'+esc(n.h2 ? T(n.h2).replace(/^\d+\.\s*/,'') : T(s.title))+'</span>'+(idx>=0?'<span class="mono muted">'+(idx+1)+' / '+visible.length+'</span>':'')+'</span>'+
      '<button class="icon" id="dClose" type="button" aria-label="'+T('关闭')+'">'+ic('x')+'</button></div>'+
    '<div class="d-body">'+body+(EXT ? '<div class="srs-row" id="dSrs">'+EXT.srsToggleHTML('item:'+id)+'</div>' : '')+'</div>'+
    '<div class="d-foot">'+
      '<button class="b ghost sq" id="dPrev" type="button"'+(idx>0?'':' disabled')+' aria-label="'+T('上一条')+'">'+ic('caret-left')+'</button>'+
      '<button class="b '+(on?'ghost':'pri')+' grow" id="dDone" type="button">'+T(on?'已学，点击取消':'标记已学，下一条')+'</button>'+
      '<button class="b ghost sq" id="dNext" type="button"'+(idx>=0&&idx<visible.length-1?'':' disabled')+' aria-label="'+T('下一条')+'">'+ic('caret-right')+'</button>'+
      '</div>', 'item');
  $('dClose').onclick = closeSheet; $('dBack').onclick = closeSheet;
  Array.prototype.forEach.call(sheet.querySelectorAll('[data-rel]'), function(b){ b.onclick = function(){ swapItem(b.getAttribute('data-rel')); }; });
  if ($('dSrs')) EXT.wireSrsToggle($('dSrs'), 'item:'+id, function(){ EXT.addItem(n); });
  $('dPrev').onclick = function(){ swapItem(visible[idx-1]); };
  $('dNext').onclick = function(){ swapItem(visible[idx+1]); };
  $('dDone').onclick = function(){ setDone(id, !done[id]); if (done[id] && idx>=0 && idx<visible.length-1) setTimeout(function(){ swapItem(visible[idx+1]); }, 200); else showItem(id); };
}
/* 上一条/下一条只替换当前历史记录，返回键不会一条条倒回去 */
function swapItem(id){ if (!id) return; nav(itemHash(id)); }
function itemHash(id){ var n = byId[id]; if (n && EXT){ var d = EXT.dayNo(n); if (d) return '#/grammar/day/'+d; } return '#/item/'+id; }
function openItem(id){ if (byId[id]) go(itemHash(id)); }
function openToc(){
  if (!ctx.toc || !ctx.toc.length) { toast(T('当前没有小节')); return; }
  openSheet(sheetHead('<span class="d-path">'+T('目录')+'</span>', cur)+
    '<div class="toc">'+ctx.toc.map(function(h){ return '<a href="javascript:" data-h="'+h.id+'" class="'+h.t+'">'+esc(h.text)+'</a>'; }).join('')+'</div>', 'tocs');
  $('dClose').onclick = hideSheet;
}
function openSections(){
  openSheet(sheetHead('<span class="d-path">'+T('六个版块')+'</span>')+'<div class="d-body">'+bento(true)+'</div>', 'tocs');
  $('dClose').onclick = hideSheet;
  sheet.querySelector('.bento').onclick = function(){ setTimeout(hideSheet, 0); };
}
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('.toc [data-h]'); if (!a) return;
  if (sheet.contains(a)) hideSheet();
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
/* toast(msg) 普通提示；toast(msg, {label, fn}) 带一个可点的操作（例如「撤销」），停留 5 秒 */
function toast(msg, act){
  var t = $('toast'); t.innerHTML = ''; t.appendChild(document.createTextNode(msg));
  t.classList.toggle('act', !!act);
  if (act){ var b = document.createElement('button'); b.type = 'button'; b.className = 't-act'; b.textContent = act.label; b.onclick = function(){ clearTimeout(tt); t.classList.remove('show'); act.fn(); }; t.appendChild(b); }
  t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove('show'); }, act ? 5000 : 1500);
}

/* 事件 */
main.addEventListener('click', function(e){
  var chk = e.target.closest('.card > .chk');
  if (chk){ var id = chk.closest('.card').dataset.id, v = !done[id]; setDone(id, v); toast(T(v ? '已标记为已学' : '已取消')); return; }
  var px = e.target.closest('[data-open]'); if (px){ openItem(px.dataset.open); return; }
  if (e.target.closest('#unread')){ UNREAD = !UNREAD; LS.set('ielts.unread', UNREAD); rerenderList(); return; }
  if (e.target.closest('#tocBtn')){ openToc(); return; }
  if (e.target.closest('#clr')){ Q = ''; var qi = $('q'); if (qi) qi.value = ''; rerenderList(); return; }
  var card = e.target.closest('.card');
  if (card && card.dataset.id && byId[card.dataset.id] && !e.target.closest('a') && !e.target.closest('.q') && !e.target.closest('textarea')) openItem(card.dataset.id);
});
/* 任何 data-back 链接：上一页就是它的父级时用浏览器返回，否则直接替换到父级 */
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('[data-back]'); if (!b) return;
  e.preventDefault(); goBack(b.dataset.back);
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
  if (ctx.open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')){ var i = visible.indexOf(ctx.open) + (e.key === 'ArrowRight' ? 1 : -1); if (visible[i]) swapItem(visible[i]); }
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){ var q = $('q'); if (q){ e.preventDefault(); q.focus(); } }
});
if ('IntersectionObserver' in window){
  new IntersectionObserver(function(en){ $('top').classList.toggle('scrolled', !en[0].isIntersecting); }).observe($('sentinel'));
}

/* ================= 路由 =================
   #/home  #/today  #/course（#/plan 同）  #/settings
   #/section/<版块>  #/section/<版块>/<条目id>（定位到该条）
   #/item/<条目id>（详情抽屉，叠在上一页上；直接打开时叠在所属版块上）
   #/grammar/day/<1-21>
   #/practice  #/practice/<listening|reading|writing|speaking|drill>  #/practice/<类>/<编号>
   #/archive  #/archive/review  #/archive/drill/<标签>
   旧链接（#grammar、#practice/L01、#archive/drill-grammar…）自动换成新格式。 */
function parse(h){
  var raw = String(h || '').replace(/^#\/?/, ''), p = raw.split('/').filter(Boolean).map(function(x){ try{ return decodeURIComponent(x); }catch(e){ return x; } });
  var k = p[0] || 'home';
  if (k === 'plan' && !p[1]) return {v:'course'};
  if (k === 'section' && S[p[1]]) return {v:'section', a:p[1], b:p[2]};
  if (k === 'grammar' && p[1] === 'day') return {v:'gday', a:p[2] || '1'};
  if (S[k]) return {v:'section', a:k, b:p[1]};                      /* 旧：#grammar、#grammar/<id> */
  if (k === 'item' && p[1]) return {v:'item', a:p.slice(1).join('/')};
  if (k === 'home' || k === 'today' || k === 'course' || k === 'settings') return {v:k};
  if (k === 'practice') return {v:'practice', sub:p.slice(1).join('/')};
  if (k === 'archive'){ var sub = p.slice(1).join('/').replace(/^drill-/, 'drill/'); return {v:'archive', sub:sub}; }
  return {v:'home'};
}
function canon(r){
  if (r.v === 'section') return '#/section/'+r.a+(r.b?'/'+r.b:'');
  if (r.v === 'item') return '#/item/'+r.a;
  if (r.v === 'gday') return '#/grammar/day/'+r.a;
  if (r.v === 'practice') return '#/practice'+(r.sub ? '/'+(EXT ? EXT.practicePath(r.sub) : r.sub) : '');
  if (r.v === 'archive') return '#/archive'+(r.sub ? '/'+r.sub : '');
  return '#/'+r.v;
}
/* 每个页面的父级（页内返回、顶栏返回都用它） */
function parentOf(h){
  var r = parse(h);
  if (r.v === 'item') return baseHash || (byId[r.a] ? '#/section/'+byId[r.a].sec : '#/home');
  if (r.v === 'gday') return '#/section/grammar';
  if (r.v === 'practice'){ var p = (r.sub||'').split('/'); return p.length >= 2 ? '#/practice/'+p[0] : (r.sub ? null : null); }
  if (r.v === 'archive') return r.sub ? '#/archive' : null;
  if (r.v === 'settings') return '#/home';
  return null;
}
/* 导航栈跟着真实浏览历史走（存 sessionStorage，刷新后还在）：
   返回 = 栈里有上一页就 history.back()（从首页进来回首页、从课表进来回课表）；
   栈里没有（直接打开深链接）才去页面的兜底父级。浏览器返回键走的是同一条历史。 */
var stack = (function(){ try{ var x = JSON.parse(sessionStorage.getItem('ielts.nav')||'[]'); return Array.isArray(x) ? x : []; }catch(e){ return []; } })();
var scrollMem = {}, baseHash = null, curHash = null, popped = false, renderedHash = null, replacing = false;
function saveStack(){ try{ sessionStorage.setItem('ielts.nav', JSON.stringify(stack)); }catch(e){} }
function go(h){ if (location.hash === h) route(); else location.hash = h; }
/* 站内替换当前历史（上一套/下一套、切 tab）：不增加历史，返回键不会一条条倒回去 */
function nav(h){ if (location.hash === h) return; replacing = true; location.replace(h); }
function goBack(fallback){
  if (stack.length > 1) history.back();
  else { stack = []; nav(fallback || parentOf(curHash) || '#/home'); }
}
function route(){
  var r = parse(location.hash), c = canon(r);
  if (location.hash !== c){ history.replaceState(null, '', c); }
  /* 记录导航栈：回到栈里上一项视为“返回” */
  if (replacing){ replacing = false; popped = false; if (stack.length) stack[stack.length-1] = c; else stack.push(c); }
  else {
    popped = stack.length > 1 && stack[stack.length-2] === c;
    if (popped) stack.pop(); else if (stack[stack.length-1] !== c) stack.push(c);
  }
  if (stack.length > 60) stack.shift();
  saveStack();
  if (curHash) scrollMem[curHash] = window.scrollY;
  var prevHash = curHash; curHash = c;

  if (r.v === 'item'){
    var n = byId[r.a];
    if (!n){ nav('#/home'); return; }
    if (EXT && EXT.dayNo(n)){ nav('#/grammar/day/'+EXT.dayNo(n)); return; }
    if (prevHash && parse(prevHash).v !== 'item') baseHash = prevHash;   /* 从某一页点开 */
    else if (!baseHash) baseHash = '#/section/'+n.sec;                     /* 直接打开链接 / 刷新 */
    if (renderedHash !== baseHash || !main.innerHTML.trim()) renderRoute(parse(baseHash), baseHash);
    if (visible.indexOf(r.a) < 0 && S[n.sec]) visible = items(S[n.sec]).map(function(x){ return x.id; });
    showItem(r.a); setBack(c);
    return;
  }
  /* 从抽屉回到它下面那一页：不重画，保持滚动位置 */
  if (sheet.classList.contains('open')){
    var wasItem = sheet.classList.contains('item'); ctx.open = null; hideSheet();
    if (wasItem && c === renderedHash && main.innerHTML.trim()){ baseHash = null; setBack(c); refreshNav(); return; }
  }
  baseHash = null;
  renderRoute(r, c);
  setBack(c);
  if (r.v === 'section' && r.b && byId[r.b]){
    var el = document.querySelector('.card[data-id="'+r.b+'"]');
    if (el){ el.scrollIntoView({block:'center'}); el.classList.add('flash'); }
    history.replaceState(null, '', '#/section/'+r.a); stack[stack.length-1] = '#/section/'+r.a; saveStack(); curHash = '#/section/'+r.a;
    renderedHash = '#/section/'+r.a;
  } else if (popped && scrollMem[c] != null) window.scrollTo(0, scrollMem[c]);
  else if (r.v === 'section' && !Q){ var pos = LS.get('ielts.scroll', {}); window.scrollTo(0, pos[r.a] || 0); }
  else window.scrollTo(0, 0);
}
function renderRoute(r, h){
  var prev = cur; renderedHash = h;
  cur = r.v === 'section' ? r.a : r.v;
  if (prev !== cur && S[cur]) Q = '';
  ctx.sub = r.sub || '';
  var titles = {home:'雅思 7.5', today:'今日任务', course:'课表', practice:'练习', archive:'档案', settings:'设置', gday:'语法'};
  var tt = S[cur] ? secTitle(cur) : T(titles[cur] || '雅思 7.5');
  $('title').textContent = tt;
  document.title = (cur === 'home' ? '' : tt + ' · ') + T('雅思 7.5 学习站');
  if (cur === 'gday' && EXT) EXT.renderGrammarDay(main, +r.a);
  else if (EXT && EXT.routes[cur]) EXT.render(cur, ctx.sub, main);
  else if (S[cur]){ LS.set('ielts.last', cur); renderSection(S[cur]); }
  else if (cur === 'today') renderToday();
  else if (cur === 'settings') renderSettings();
  else renderHome();
  document.body.dataset.page = S[cur] ? 'section' : (EXT && EXT.routes[cur]) || cur === 'gday' ? 'x' : cur;
  refreshNav();
}
/* 顶栏返回按钮：有父级的页面才显示 */
function setBack(h){
  var p = parentOf(h), b = $('backTop');
  if (!p){ b.hidden = true; document.body.classList.remove('has-back'); return; }
  b.hidden = false; document.body.classList.add('has-back');
  var to = stack.length > 1 ? stack[stack.length-2] : p;
  b.dataset.back = p; b.setAttribute('href', to);
  b.querySelector('span').textContent = T('返回');
  b.setAttribute('aria-label', T('返回')+' · '+baseLabel(to)); b.title = T('返回')+' · '+baseLabel(to);
}
window.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(function(){ if (curHash) scrollMem[curHash] = window.scrollY; if (S[cur] && !ctx.open){ var p = LS.get('ielts.scroll', {}); p[cur] = window.scrollY; LS.set('ielts.scroll', p); } }, 300); }, {passive:true});
var st;
window.addEventListener('hashchange', route);
window.IELTS_APP = {ic:ic, esc:esc, strip:strip, byId:byId, items:items, S:S, META:META, LS:LS, kind:kind, cellsHTML:cellsHTML, entryHTML:entryHTML,
  isDone:function(id){ return !!done[id]; }, setDone:setDone, toast:toast, openItem:openItem, go:go, nav:nav, goBack:goBack, backHTML:backHTML,
  settings:settings, parentOf:parentOf, baseLabel:baseLabel, band:band, fmtB:fmtB, T:T, I:I, fmtDate:fmtDate, secNav:secNav, render:function(){ renderRoute(parse(location.hash), location.hash); }};
if (window.IELTS_EXT_BOOT){ try{ window.IELTS_EXT_BOOT(window.IELTS_APP); EXT = window.IELTS_EXT || null; }catch(e){ console.error(e); } }
navHTML();
route();
})();
