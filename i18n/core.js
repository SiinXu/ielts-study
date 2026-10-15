/* 界面多语言：zh 为源语言；其余语言按「中文原文 → 译文」查表。
   缺译时依次回退：zh-Hant → 中文原文；其余 → 英文 → 中文。语言存 localStorage: ielts.lang。
   没有手动选择时按浏览器语言 + 时区（地区）自动选默认语言。 */
(function(){
var LANGS = [['zh','简体中文','简'],['zh-Hant','繁體中文','繁'],['en','English','EN'],['ja','日本語','日'],['ko','한국어','한'],['es','Español','ES'],['ms','Bahasa Melayu','MS'],['vi','Tiếng Việt','VI'],['fr','Français','FR'],['de','Deutsch','DE']];
function ok(l){ return LANGS.some(function(x){ return x[0] === l; }); }
var TZ = {'Asia/Taipei':'zh-Hant','Asia/Hong_Kong':'zh-Hant','Asia/Macau':'zh-Hant','Asia/Shanghai':'zh','Asia/Chongqing':'zh','Asia/Urumqi':'zh','Asia/Singapore':'en',
  'Asia/Tokyo':'ja','Asia/Seoul':'ko','Asia/Kuala_Lumpur':'ms','Asia/Kuching':'ms','Asia/Brunei':'ms','Asia/Jakarta':'ms','Asia/Ho_Chi_Minh':'vi','Asia/Saigon':'vi',
  'Europe/Paris':'fr','Europe/Brussels':'fr','Europe/Monaco':'fr','Europe/Berlin':'de','Europe/Vienna':'de','Europe/Zurich':'de','Europe/Madrid':'es','America/Mexico_City':'es',
  'America/Bogota':'es','America/Argentina/Buenos_Aires':'es','America/Lima':'es','America/Santiago':'es'};
function zhVariant(l){ return /-(tw|hk|mo|hant)\b/.test(l) ? 'zh-Hant' : 'zh'; }
function detect(){
  var s = null; try{ s = localStorage.getItem('ielts.lang'); }catch(e){}
  if (s && ok(s)) return s;
  var nl = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  var tz = ''; try{ tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; }catch(e){}
  for (var i=0;i<nl.length;i++){
    var l = String(nl[i]).toLowerCase();
    if (l.indexOf('zh') === 0){ return (l === 'zh' && TZ[tz] === 'zh-Hant') ? 'zh-Hant' : zhVariant(l); }
    var b = l.split('-')[0];
    if (b === 'id') b = 'ms';
    if (b === 'en' && i === 0 && TZ[tz] && TZ[tz] !== 'en' && nl.length === 1) continue;  /* 仅 en 且地区明确时让时区决定 */
    if (ok(b)) return b;
  }
  return TZ[tz] || 'en';
}
var lang = detect(), dict = {};
var LOCALE = {zh:'zh-CN', 'zh-Hant':'zh-TW', en:'en-GB', ja:'ja-JP', ko:'ko-KR', es:'es-ES', ms:'ms-MY', vi:'vi-VN', fr:'fr-FR', de:'de-DE'};
function t(s, v){
  var key = String(s == null ? '' : s), r = key;
  if (dict[lang] && dict[lang][key]) r = dict[lang][key];
  else if (lang !== 'zh' && lang !== 'zh-Hant' && dict.en && dict.en[key]) r = dict.en[key];
  if (v) r = r.replace(/\{(\w+)\}/g, function(m, k){ return v[k] != null ? v[k] : m; });
  return r;
}
window.I18N = {
  lang: lang, langs: LANGS, locale: LOCALE[lang],
  add: function(l, o){ dict[l] = dict[l] || {}; for (var k in o) dict[l][k] = o[k]; },
  has: function(s){ return lang === 'zh' || lang === 'zh-Hant' || !!((dict[lang] && dict[lang][s]) || (dict.en && dict.en[s])); },
  t: t,
  set: function(l){ if (!ok(l)) return; try{ localStorage.setItem('ielts.lang', l); }catch(e){} location.reload(); }
};
document.documentElement.lang = LOCALE[lang];
var V = '?v=11';
if (lang !== 'zh' && lang !== 'zh-Hant') document.write('<script src="i18n/en.js'+V+'" charset="utf-8"><\/script>');
if (lang === 'zh-Hant') document.write('<script src="i18n/zh-Hant-conv.js'+V+'" charset="utf-8"><\/script>');
if (lang !== 'en') document.write('<script src="i18n/'+(lang === 'zh' ? 'zh' : lang)+'.js'+V+'" charset="utf-8"><\/script>');
})();
