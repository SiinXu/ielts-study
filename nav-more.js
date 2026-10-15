/* v11 顶栏「更多」：版块标签放不下时（长语言如 vi/fr/es/de），把末尾的标签收进下拉菜单，而不是被裁掉 */
(function(){
var T = window.I18N ? I18N.t : function(s){ return s; };
var tb = document.getElementById('tabs'); if (!tb) return;
var wrap = document.createElement('div'); wrap.className = 'tab-more'; wrap.hidden = true;
wrap.innerHTML = '<button type="button" class="tm-b" aria-haspopup="true" aria-expanded="false"><span>'+T('更多')+'</span>'+
  '<svg viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"/></svg></button>'+
  '<div class="tm-menu" role="menu" hidden></div>';
tb.parentNode.insertBefore(wrap, tb.nextSibling);
var btn = wrap.querySelector('.tm-b'), menu = wrap.querySelector('.tm-menu');
function close(){ menu.hidden = true; btn.setAttribute('aria-expanded','false'); }
btn.onclick = function(e){ e.stopPropagation(); var o = menu.hidden; menu.hidden = !o; btn.setAttribute('aria-expanded', String(o)); };
document.addEventListener('click', function(e){ if (!wrap.contains(e.target)) close(); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
menu.addEventListener('click', function(e){ if (e.target.closest('a')) close(); });
function fit(){
  if (getComputedStyle(tb).display === 'none'){ wrap.hidden = true; return; }
  var as = [].slice.call(tb.children).filter(function(n){ return n.tagName === 'A'; });
  as.forEach(function(a){ a.hidden = false; }); wrap.hidden = true; tb.parentNode.classList.remove('has-more');
  if (tb.scrollWidth <= tb.clientWidth + 1){ menu.innerHTML = ''; return; }
  wrap.hidden = false; tb.parentNode.classList.add('has-more');
  var hid = [];
  for (var i = as.length - 1; i >= 5 && tb.scrollWidth > tb.clientWidth + 1; i--){ as[i].hidden = true; hid.unshift(as[i]); }
  while (hid.length > 1){ hid[0].hidden = false; if (tb.scrollWidth > tb.clientWidth + 1){ hid[0].hidden = true; break; } hid.shift(); }
  menu.innerHTML = hid.map(function(a){ return '<a role="menuitem" href="'+a.getAttribute('href')+'" class="'+(a.classList.contains('on')?'on':'')+'">'+a.innerHTML+'</a>'; }).join('');
  btn.classList.toggle('on', hid.some(function(a){ return a.classList.contains('on'); }));
  var sep = tb.querySelector('.tab-sep'); if (sep) sep.hidden = hid.length >= as.length - 5;
}
var raf = 0; function later(){ cancelAnimationFrame(raf); raf = requestAnimationFrame(function(){ setTimeout(fit, 0); }); }
new MutationObserver(later).observe(tb, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
window.addEventListener('resize', later); window.addEventListener('hashchange', later);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(later);
later();
})();
