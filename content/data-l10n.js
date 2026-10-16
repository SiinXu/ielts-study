/* Non-Chinese pages: swap the Chinese study notes in IELTS_DATA for the page language before app.js renders.
   Order per text segment: hand UI dictionary (I18N) > English (DATA_EN, tools/data_i18n.py) > Han stripped. zh / zh-Hant keep the original. */
(function(){
  var I = window.I18N, L = I && I.lang, D = window.IELTS_DATA;
  if (!D || !L || L === 'zh' || L === 'zh-Hant') return;
  var E = window.DATA_EN || {}, H = /[\u4e00-\u9fff\u3400-\u4dbf]/, HG = /[\u4e00-\u9fff\u3400-\u4dbf\u3000-\u303f\uff08\uff09\uff0c\uff1a\uff1b]+/g;
  function seg(t){
    var k = t.trim(); if (!H.test(k)) return t;
    var r = (I.has(k) && I.t(k) !== k ? I.t(k) : null) || E[k];
    if (r == null || H.test(r)) r = (r || k).replace(HG, ' ').replace(/\s+/g, ' ').trim();
    return t.replace(k, fw(r).trim());
  }
  var FW = {'\uff0c':', ', '\uff1b':'; ', '\uff1a':': ', '\uff08':' (', '\uff09':') ', '\u3001':', ', '\u3002':'. ', '\uff01':'! ', '\uff1f':'? '};
  function fw(p){ return p.replace(/[\uff0c\uff1b\uff1a\uff08\uff09\u3001\u3002\uff01\uff1f]\s*/g, function(c){ return FW[c.charAt(0)]; }).replace(/ \)/g, ')').replace(/\( /g, '('); }
  /* Chinese runs on without spaces around inline tags; English needs them */
  function tx(h){
    if (!h) return h;
    var a = String(h).split(/(<[^>]+>)/), last = a.length - 1;
    return a.map(function(p, i){
      if (p.charAt(0) === '<') return p;
      if (!H.test(p)) return fw(p);
      var r = seg(p);
      if (i > 0 && /^[A-Za-z0-9\[("'\u2018\u201c]/.test(r)) r = ' ' + r;
      var j = i + 1; while (j <= last && (a[j].charAt(0) === '<' || a[j] === '')) j++;
      if (j <= last && /[A-Za-z0-9\]):;,.!?'"\u2019\u201d]$/.test(r) && (H.test(a[j].charAt(0)) || /^[A-Za-z0-9(\u2717\u2713]/.test(a[j]))) r = r + ' ';
      return r;
    }).join('');
  }
  if (D.cover) D.cover = tx(D.cover);
  D.sections.forEach(function(s){
    ['short','title','source'].forEach(function(k){ if (s[k] && !I.has(s[k])) s[k] = tx(s[k]); });
    s.nodes.forEach(function(n){
      var q = [];
      if (n.text) n.text = tx(n.text);
      if (n.title){ var m = n.title.match(/^(\u7b2c \d+ \u5929 \u00b7 )(.+)$/); n.title = I.has(n.title) ? n.title : E[n.title.trim()] ? E[n.title.trim()] : m ? m[1] + (I.has(m[2]) ? m[2] : tx(m[2])) : (I.has(n.title) ? n.title : tx(n.title)); }
      if (n.html){ n.html = tx(n.html); q.push(n.html); }
      (n.cells || []).forEach(function(c){ c.html = tx(c.html); q.push(c.html); if (c.label === '\u4e2d\u6587' || c.label === '\u4e2d\u6587 / \u7528\u6cd5') c.label = '\u610f\u601d'; /* "Chinese" gloss column -> "Meaning" */
        if (c.label && !I.has(c.label)) c.label = tx(c.label); });
      if (n.q && q.length) n.q += ' ' + q.join(' ').replace(/<[^>]+>/g, ' ').toLowerCase();
    });
  });
})();
