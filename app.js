(function(){
'use strict';
var D = window.IELTS_DATA, S = {};
D.sections.forEach(function(s){ S[s.key] = s; });
var NAV = [['home','目录','目录'],['grammar','语法','语法与口音'],['dialogues','对话','口语对话'],['templates','模板','写作口语模板'],['collocations','搭配','固定搭配与句式'],['mistakes','错题','错题记忆']];
var LS = {get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},
          set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
var done = LS.get('ielts.done', {});
var $ = function(id){ return document.getElementById(id); };
var main = $('main'), q = $('q'), unread = $('unread'), jump = $('jump');
var cur = 'home';

function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function items(s){ return s.nodes.filter(function(n){ return n.t === 'item'; }); }
function stat(s){ var it = items(s), d = it.filter(function(n){ return done[n.id]; }).length; return {d:d, n:it.length, p: it.length ? Math.round(d*100/it.length) : 0}; }

// theme
function applyTheme(t){ if (t) document.documentElement.dataset.theme = t; }
$('theme').onclick = function(){
  var curT = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var t = curT === 'dark' ? 'light' : 'dark'; applyTheme(t); try{ localStorage.setItem('ielts.theme', t); }catch(e){}
};

// nav
$('nav').innerHTML = NAV.map(function(n){
  var s = S[n[0]], pct = s ? '<span data-p="'+n[0]+'">'+stat(s).p+'%</span>' : '<span>首页</span>';
  return '<a href="#'+n[0]+'" data-k="'+n[0]+'">'+n[1]+pct+'</a>';
}).join('');

function itemHTML(n){
  var body = '';
  if (n.title) body += '<div class="ititle">'+esc(n.title)+'</div>';
  if (n.cells) body += n.cells.map(function(c){
    return '<div class="cell'+(c.th?' th':'')+(c.cls.length?' '+c.cls.join(' '):'')+'">'+(c.label?'<span class="lab">'+esc(c.label)+'</span>':'')+c.html+'</div>';
  }).join('');
  else body += n.html;
  var on = done[n.id] ? ' checked' : '';
  return '<div class="item'+(on?' done':'')+'" data-id="'+n.id+'"><label class="chk"><input type="checkbox" aria-label="标记已学"'+on+'></label><div class="body">'+body+'</div></div>';
}

function match(n, terms){
  if (unread.checked && done[n.id]) return false;
  for (var i=0;i<terms.length;i++) if (n.q.indexOf(terms[i]) < 0) return false;
  return true;
}
function terms(){ return q.value.trim().toLowerCase().split(/\s+/).filter(Boolean); }

function renderSection(s){
  var t = terms(), html = '', opts = [], pendingH = [], shown = 0, hid = 0;
  s.nodes.forEach(function(n){
    if (n.t === 'h2' || n.t === 'h3'){
      if (n.t === 'h2') pendingH = [];
      pendingH = pendingH.filter(function(h){ return h.t === 'h2'; });
      pendingH.push(n); return;
    }
    if (n.t === 'note'){ if (!t.length && !unread.checked) { flush(); html += '<div class="note">'+n.html+'</div>'; } return; }
    if (!match(n, t)) return;
    flush(); html += itemHTML(n); shown++;
  });
  function flush(){
    pendingH.forEach(function(h){
      var id = 'h'+(hid++);
      html += '<'+h.t+' class="'+h.t+'" id="'+id+'">'+esc(h.text)+'</'+h.t+'>';
      opts.push('<option value="'+id+'">'+(h.t==='h3'?'　· ':'')+esc(h.text)+'</option>');
    });
    pendingH = [];
  }
  if (!shown) html += '<div class="empty">没有符合条件的条目</div>';
  else if (t.length) html = '<p class="muted">找到 '+shown+' 条</p>' + html;
  main.innerHTML = html;
  jump.innerHTML = '<option value="">跳到小节…（'+opts.length+'）</option>' + opts.join('');
  highlight(t);
}

function renderHome(){
  var t = terms();
  if (t.length || unread.checked) return renderSearch(t);
  var tot = 0, dn = 0;
  D.sections.forEach(function(s){ var x = stat(s); tot += x.n; dn += x.d; });
  var h = '<section class="hero"><h2>雅思备考 · XU SIYIN</h2><div>目标：总分 <b>7.5</b>，单科不低于 <b>6.5</b></div>'+
    '<div class="goals">'+[['总分','7.5'],['听力','6.5+'],['阅读','6.5+'],['写作','6.5+'],['口语','6.5+']].map(function(g){return '<div class="goal"><b>'+g[1]+'</b>'+g[0]+'</div>';}).join('')+'</div>'+
    '<div class="pbar" style="background:rgba(255,255,255,.25)"><i style="width:'+(tot?dn*100/tot:0)+'%"></i></div><div style="font-size:14px;margin-top:4px">总进度 '+dn+' / '+tot+'（'+(tot?Math.round(dn*100/tot):0)+'%）</div></section>';
  h += '<div class="cards">' + NAV.slice(1).concat([['plan','计划','复习计划']]).map(function(n){
    var s = S[n[0]], x = stat(s);
    return '<a class="qcard" href="#'+n[0]+'"><b>'+n[2]+'</b><small>'+esc(s.source)+'</small><small>'+x.d+' / '+x.n+' 条 · '+x.p+'%</small><div class="pbar"><i style="width:'+x.p+'%"></i></div></a>';
  }).join('') + '</div>';
  h += '<p class="muted">勾选每条左边的方框标记“已学”，进度只保存在这台设备的浏览器里。搜索框可以搜全部内容（英文或中文，空格分隔多个词）。</p>';
  h += '<button class="btn more" id="reset" type="button">清空全部学习进度</button>';
  main.innerHTML = h;
  $('reset').onclick = function(){ if (confirm('确定清空所有已学标记？')) { done = {}; LS.set('ielts.done', done); refreshNav(); render(); } };
}

function renderSearch(t){
  var h = '', total = 0, LIMIT = 300;
  D.sections.forEach(function(s){
    var hits = items(s).filter(function(n){ return match(n, t); });
    if (!hits.length) return;
    total += hits.length;
    h += '<div class="rgroup">'+esc(s.title)+' · '+hits.length+' 条</div>';
    h += hits.slice(0, LIMIT).map(itemHTML).join('');
    if (hits.length > LIMIT) h += '<p class="muted">还有 '+(hits.length-LIMIT)+' 条，进入该分类查看</p>';
  });
  main.innerHTML = total ? '<p class="muted">全部分类共找到 '+total+' 条</p>' + h : '<div class="empty">没有符合条件的条目</div>';
  highlight(t);
}

function highlight(t){
  if (!t.length) return;
  var re = new RegExp('(' + t.map(function(x){ return x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'gi');
  var w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null), list = [], nd;
  while ((nd = w.nextNode())) if (nd.parentNode.closest('.body') && re.test(nd.nodeValue)) list.push(nd);
  list.forEach(function(n){
    var span = document.createElement('span');
    span.innerHTML = esc(n.nodeValue).replace(re, '<mark>$1</mark>');
    n.parentNode.replaceChild(span, n);
  });
}

function refreshNav(){
  [].forEach.call(document.querySelectorAll('[data-p]'), function(e){ e.textContent = stat(S[e.dataset.p]).p + '%'; });
  [].forEach.call(document.querySelectorAll('.bottom a'), function(a){ a.classList.toggle('on', a.dataset.k === cur || (cur==='plan' && a.dataset.k==='home')); });
  var s = S[cur];
  $('sub').hidden = !s;
  if (s){ var x = stat(s); $('secprog').textContent = '已学 '+x.d+'/'+x.n+' · '+x.p+'%'; }
}

function render(){
  var s = S[cur];
  $('title').textContent = s ? s.title : '目录';
  document.title = (s ? s.title + ' · ' : '') + '雅思备考';
  if (s) renderSection(s); else renderHome();
  refreshNav();
}

main.addEventListener('change', function(e){
  if (e.target.type !== 'checkbox') return;
  var it = e.target.closest('.item'), id = it.dataset.id;
  if (e.target.checked) done[id] = 1; else delete done[id];
  it.classList.toggle('done', e.target.checked);
  LS.set('ielts.done', done); refreshNav();
});
var timer;
q.addEventListener('input', function(){ clearTimeout(timer); timer = setTimeout(function(){ render(); window.scrollTo(0,0); }, 200); });
unread.addEventListener('change', render);
jump.addEventListener('change', function(){
  var el = jump.value && document.getElementById(jump.value);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  jump.value = '';
});
function route(){
  var k = location.hash.slice(1) || 'home';
  cur = (S[k] || k === 'home') ? k : 'home';
  var pos = LS.get('ielts.scroll', {});
  render();
  window.scrollTo(0, (!q.value && pos[cur]) || 0);
}
var st;
window.addEventListener('scroll', function(){ clearTimeout(st); st = setTimeout(function(){ var p = LS.get('ielts.scroll', {}); p[cur] = window.scrollY; LS.set('ielts.scroll', p); }, 300); }, {passive:true});
window.addEventListener('hashchange', route);
route();
})();
