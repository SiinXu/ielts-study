/* 界面多语言：zh 为源语言；其余语言按「中文原文 → 译文」查表。
   缺译时依次回退到英文、再到中文。语言存 localStorage: ielts.lang。 */
(function(){
var LANGS = [['zh','中文','中'],['en','English','EN'],['ja','日本語','日'],['ko','한국어','한'],['es','Español','ES'],['ms','Bahasa Melayu','MS']];
function ok(l){ return LANGS.some(function(x){ return x[0] === l; }); }
function detect(){
  var s = null; try{ s = localStorage.getItem('ielts.lang'); }catch(e){}
  if (s && ok(s)) return s;
  var nl = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  for (var i=0;i<nl.length;i++){
    var l = String(nl[i]).toLowerCase();
    if (l.indexOf('zh') === 0) return 'zh';
    var b = l.split('-')[0];
    if (b === 'id') b = 'ms';
    if (ok(b)) return b;
  }
  return 'en';
}
var lang = detect(), dict = {};
var LOCALE = {zh:'zh-CN', en:'en-GB', ja:'ja-JP', ko:'ko-KR', es:'es-ES', ms:'ms-MY'};
function t(s, v){
  var key = String(s == null ? '' : s), r = key;
  if (lang !== 'zh'){ r = (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || key; }
  if (v) r = r.replace(/\{(\w+)\}/g, function(m, k){ return v[k] != null ? v[k] : m; });
  return r;
}
window.I18N = {
  lang: lang, langs: LANGS, locale: LOCALE[lang],
  add: function(l, o){ dict[l] = dict[l] || {}; for (var k in o) dict[l][k] = o[k]; },
  has: function(s){ return lang === 'zh' || !!((dict[lang] && dict[lang][s]) || (dict.en && dict.en[s])); },
  t: t,
  set: function(l){ if (!ok(l)) return; try{ localStorage.setItem('ielts.lang', l); }catch(e){} location.reload(); }
};
document.documentElement.lang = LOCALE[lang];
if (lang !== 'zh'){
  document.write('<script src="i18n/en.js" charset="utf-8"><\/script>');
  if (lang !== 'en') document.write('<script src="i18n/'+lang+'.js" charset="utf-8"><\/script>');
}
})();
