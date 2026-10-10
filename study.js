/* 雅思 7.5 · 内容模块：课表 / 练习 / 档案（复习曲线）/ 语法每日页
   依赖 app.js 暴露的 window.IELTS_APP；内容在 content/*.js；界面文字与讲解经 I18N.t 翻译。
   本地存储（都与 ielts.done 并存，不改它）：
   ielts.srs   弱项与复习曲线 {key:{tag,title,lv,due,last,n,ok,added,done}}
   ielts.plan  课表打卡 {YYYY-MM-DD:{blockIndex:1}}   ielts.start 课表开始日期
   ielts.prac  练习成绩 {setId:{s,t,d}}
   ielts.notes 笔记 / 作业 / 错误 [{id,type,tag,text,d}]
   ielts.draft 作文草稿 {id:text}   ielts.wcheck 作文自查 {id:{i:1}} */
window.IELTS_EXT_BOOT = function(A){
'use strict';
var C = window.IELTS_COURSE, G = window.IELTS_GRAMMAR || {}, LI = window.IELTS_LISTENING || [], RE = window.IELTS_READING || [],
    WR = window.IELTS_WRITING || {t1:[],t2:[],check:{t1:[],t2:[]}}, SP = window.IELTS_SPEAKING || {p1:[],p2:[],check:[]}, DR = window.IELTS_DRILLS || {writing:[],listening:[]};
var esc = A.esc, ic = A.ic, LS = A.LS, T = A.T, $ = function(id){ return document.getElementById(id); };
var INT = C.srs;
var TAGS = {
  grammar:   {zh:'语法',     cls:'t-grammar'},
  collocation:{zh:'搭配',    cls:'t-collocations'},
  listening: {zh:'听力陷阱', cls:'t-dialogues'},
  reading:   {zh:'阅读定位', cls:'t-plan'},
  writing:   {zh:'写作语言', cls:'t-templates'},
  speaking:  {zh:'口语表达', cls:'t-mistakes'}
};
function tg(k){ return T((TAGS[k]||TAGS.grammar).zh); }
var SEC_TAG = {mistakes:'grammar', grammar:'grammar', collocations:'collocation', templates:'writing', dialogues:'speaking', plan:'writing'};
var SKILL = {L:['听力','t-dialogues'], R:['阅读','t-plan'], W:['写作','t-templates'], S:['口语','t-mistakes'], G:['语法','t-grammar'], V:['词汇','t-collocations'], SRS:['复习','t-plan'], X:['专项','t-mistakes'], M:['模考','t-plan']};

/* ---------- 日期 ---------- */
function pad(n){ return (n<10?'0':'')+n; }
function ymd(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function parse(s){ var p = s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
function addDays(s, n){ var d = parse(s); d.setDate(d.getDate()+n); return ymd(d); }
function today(){ return ymd(new Date()); }
function diff(a, b){ return Math.round((parse(b) - parse(a))/86400000); }
function mdz(s){ return A.fmtDate(parse(s), {month:'short', day:'numeric'}); }
function wkd(s){ return A.fmtDate(parse(s), {weekday:'short'}); }
var WKK = ['sun','mon','tue','wed','thu','fri','sat'];

/* ---------- 复习曲线 SRS ---------- */
var srs = LS.get('ielts.srs', {}); if (!srs || typeof srs !== 'object') srs = {};
function saveSrs(){ LS.set('ielts.srs', srs); }
function addWeak(key, tag, title){
  var t = today(), r = srs[key];
  if (r){ r.lv = 0; r.n = (r.n||0)+1; r.due = addDays(t, INT[0]); r.last = t; r.done = 0; }
  else srs[key] = {tag:tag, title:String(title||'').slice(0,120), lv:0, due:addDays(t, INT[0]), last:t, n:1, ok:0, added:t, done:0};
  saveSrs(); logAct('weak');
}
function grade(key, ok){
  var r = srs[key]; if (!r) return;
  var t = today();
  if (ok){ r.ok = (r.ok||0)+1; r.lv = (r.lv||0)+1; if (r.lv >= INT.length){ r.done = 1; r.due = null; } else r.due = addDays(t, INT[r.lv]); }
  else { r.lv = 0; r.n = (r.n||0)+1; r.due = addDays(t, INT[0]); r.done = 0; }
  r.last = t; saveSrs(); logAct('rev');
}
function answered(key, ok, tag, title){ if (ok){ if (srs[key] && !srs[key].done && srs[key].due <= today()) grade(key, true); } else addWeak(key, tag, title); }
/* 手动加入的复习可以随时取消；取消 = 从 ielts.srs 里真正删掉这条 */
function snapSrs(keys){ var o = {}; keys.forEach(function(k){ o[k] = srs[k] ? JSON.parse(JSON.stringify(srs[k])) : null; }); return o; }
function restoreSrs(o){ Object.keys(o).forEach(function(k){ if (o[k]) srs[k] = o[k]; else delete srs[k]; }); saveSrs(); }
function removeWeak(key){ if (!srs[key]) return false; delete srs[key]; saveSrs(); return true; }
function inQueue(key){ var r = srs[key]; return !!(r && !r.done); }
function srsToggleHTML(key){
  return (inQueue(key)
    ? '<span class="srs-st">'+ic('check')+'<span>'+T('已在复习')+'</span></span><button class="b ghost sm" type="button" data-srs="rm">'+ic('x')+'<span>'+T('取消复习')+'</span></button>'
    : '<button class="b ghost sm" type="button" data-srs="add">'+ic('plus')+'<span>'+T('加入复习')+'</span></button>')+
    '<p class="srs-help">'+T('错题会自动进复习；手动加入可随时取消。')+'</p>';
}
function wireSrsToggle(box, key, addFn){
  box.innerHTML = srsToggleHTML(key);
  box.onclick = function(e){
    var b = e.target.closest('[data-srs]'); if (!b) return;
    var before = snapSrs([key]);
    function redraw(){ box.innerHTML = srsToggleHTML(key); }
    if (b.dataset.srs === 'add'){ addFn(); redraw(); A.toast(T('已加入复习，可在这里取消'), {label:T('撤销'), fn:function(){ restoreSrs(before); redraw(); A.toast(T('已取消复习')); }}); }
    else { removeWeak(key); redraw(); A.toast(T('已取消复习'), {label:T('撤销'), fn:function(){ restoreSrs(before); redraw(); }}); }
  };
}
function addManyUndo(keys, msg){
  var before = snapSrs(keys.map(function(x){ return x[0]; }));
  keys.forEach(function(x){ addWeak(x[0], x[1], x[2]); });
  A.toast(msg, {label:T('撤销'), fn:function(){ restoreSrs(before); A.toast(T('已取消复习')); }});
}
function active(){ return Object.keys(srs).filter(function(k){ return !srs[k].done; }); }
function dueKeys(){ var t = today(); return active().filter(function(k){ return srs[k].due <= t; }).sort(function(a,b){ return srs[a].due < srs[b].due ? -1 : 1; }); }
function logAct(k){ var l = LS.get('ielts.log', {}), t = today(); l[t] = l[t] || {}; l[t][k] = (l[t][k]||0)+1; LS.set('ielts.log', l); }

/* ---------- 课表：阶段按「开始日期」相对排，不写死任何人的日期 ---------- */
var BASE = C.phases[0].from;
function startDate(){
  var s = A.settings().start || LS.get('ielts.start', '');
  if (!s){ var keys = Object.keys(LS.get('ielts.plan', {})).sort(); s = keys[0] || today(); LS.set('ielts.start', s); }
  return s;
}
var PH = [];
function buildPhases(){ var st = startDate(); PH = C.phases.map(function(p){ var o = {}; for (var k in p) o[k] = p[k]; o.from = addDays(st, diff(BASE, p.from)); o.to = addDays(st, diff(BASE, p.to)); return o; }); }
buildPhases();
function phaseOf(d){
  for (var i=0;i<PH.length;i++) if (d >= PH[i].from && d <= PH[i].to) return {p:PH[i], i:i};
  return d < PH[0].from ? {p:PH[0], i:0} : {p:PH[PH.length-1], i:PH.length-1};
}
function resolveDays(p, key){
  var v = p.days[key], guard = 0;
  while (typeof v === 'string' && guard++ < 5) v = v === 'sunBase' ? C.sunBase : p.days[v];
  return v;
}
function gDays(){ return Object.keys(G).map(Number).sort(function(a,b){ return a-b; }); }
function dayBlocks(d){
  var ph = phaseOf(d), p = ph.p, dt = parse(d), wd = dt.getDay(), key = WKK[wd], list;
  if (p.days.wk) list = resolveDays(p, (wd === 0 || wd === 6) ? 'we' : 'wk') || resolveDays(p, 'wk');
  else list = resolveDays(p, key) || resolveDays(p, 'mon');
  var idx = Math.max(0, diff(startDate(), d)), wk = Math.floor(idx/7);
  var gmax = gDays().length, gday = ph.i === 0 ? Math.min(14, Math.max(1, diff(p.from, d) + 1)) : 15 + (idx % Math.max(1, gmax - 14));
  if (!G[gday]) gday = Math.min(14, Math.max(1, diff(p.from, d) + 1));
  var L = LI[idx % LI.length], R = RE[idx % RE.length], W1 = WR.t1[wk % WR.t1.length], W2 = WR.t2[wk % WR.t2.length], Sx = SP.p2[idx % SP.p2.length], P1i = idx % SP.p1.length, P1 = SP.p1[P1i];
  return {phase:p, pi:ph.i, blocks:list.map(function(b, i){
    var t = T(b.t).replace('{G}', T('第 {n} 天', {n:gday})+' · '+gTitle(gday)).replace('{L}', L.title).replace('{R}', R.title).replace('{W1}', T(W1.kind)).replace('{W2}', T(W2.topic)+' · '+T(W2.kind)).replace('{S}', Sx.card.replace(/^Describe /,'')).replace('{P1}', P1.topic);
    var go = b.go;
    if (go === 'grammar') go = '#/grammar/day/'+gday;
    else if (go === 'L') go = '#/practice/'+setPath(L.id); else if (go === 'R') go = '#/practice/'+setPath(R.id);
    else if (go === 'W1') go = '#/practice/'+setPath(W1.id); else if (go === 'W2') go = '#/practice/'+setPath(W2.id);
    else if (go === 'S') go = '#/practice/'+setPath(Sx.id); else if (go === 'S1') go = '#/practice/'+setPath('P1-'+P1i);
    else if (go === '#today') go = '#/today';
    else if (go === '#archive/review') go = '#/archive/review';
    else if (go === '#archive/drill') go = '#/archive/drill';
    else if (go === '#archive') go = '#/archive';
    return {i:i, s:b.s, t:t, min:b.min, d:b.d ? T(b.d) : '', go:go};
  })};
}
function grammarItem(n){ var it = A.items(A.S.grammar).filter(function(x){ return x.title && x.title.indexOf('第 '+n+' 天') === 0; }); return it[0]; }
function gTitle(n){ var it = grammarItem(n); if (it) return T(it.title.replace(/^第 \d+ 天 · /,'')); var g = G[n]; return g && g.title ? T(g.title) : ''; }
function planLog(){ return LS.get('ielts.plan', {}); }
function dayMinutes(d){ var b = dayBlocks(d).blocks, l = planLog()[d] || {}, tot = 0, got = 0; b.forEach(function(x){ tot += x.min; if (l[x.i]) got += x.min; }); return {tot:tot, got:got, n:b.length, done:b.filter(function(x){ return l[x.i]; }).length}; }
function streak(){ var l = planLog(), n = 0, d = today(); if (!l[d] || !Object.keys(l[d]).length) d = addDays(d, -1); while (l[d] && Object.keys(l[d]).length){ n++; d = addDays(d, -1); } return n; }

function blockRow(b, d, l){
  var on = l && l[b.i], sk = SKILL[b.s] || SKILL.X;
  return '<div class="blk'+(on?' on':'')+'" data-blk="'+b.i+'" data-day="'+d+'">'+
    '<button class="chk" type="button" aria-pressed="'+(on?'true':'false')+'" aria-label="'+T('完成')+'">'+ic('check')+'</button>'+
    '<div class="blk-t"><b>'+esc(b.t)+'</b>'+(b.d?'<small>'+esc(b.d)+'</small>':'')+'</div>'+
    '<div class="blk-r"><span class="tag '+sk[1]+'">'+T(sk[0])+'</span><span class="blk-m mono">'+b.min+'′</span>'+
    '<a class="blk-go" href="'+b.go+'" aria-label="'+T('开始')+'">'+ic('arrow-right')+'</a></div></div>';
}

/* ---------- 练习路径：#/practice/listening/3 ↔ 题组 id ---------- */
function setPath(id){
  var i;
  if (/^L/.test(id)){ i = LI.map(function(s){ return s.id; }).indexOf(id); return 'listening/'+(i+1); }
  if (/^R/.test(id)){ i = RE.map(function(s){ return s.id; }).indexOf(id); return 'reading/'+(i+1); }
  if (/^W1/.test(id)){ i = WR.t1.map(function(s){ return s.id; }).indexOf(id); return 'writing/task1-'+(i+1); }
  if (/^W2/.test(id)){ i = WR.t2.map(function(s){ return s.id; }).indexOf(id); return 'writing/task2-'+(i+1); }
  if (/^P1-/.test(id)) return 'speaking/part1-'+(+id.slice(3)+1);
  if (/^S/.test(id)){ i = SP.p2.map(function(s){ return s.id; }).indexOf(id); return 'speaking/part2-'+(i+1); }
  return id;
}
function setFromPath(sub){
  var p = sub.split('/'), tab = p[0], n = p[1] || '', m;
  if (tab === 'listening' && LI[+n-1]) return LI[+n-1].id;
  if (tab === 'reading' && RE[+n-1]) return RE[+n-1].id;
  if (tab === 'writing' && (m = n.match(/^task([12])-(\d+)$/))){ var arr = m[1] === '1' ? WR.t1 : WR.t2; return arr[+m[2]-1] ? arr[+m[2]-1].id : null; }
  if (tab === 'speaking' && (m = n.match(/^part([12])-(\d+)$/))){ if (m[1] === '1') return SP.p1[+m[2]-1] ? 'P1-'+(+m[2]-1) : null; return SP.p2[+m[2]-1] ? SP.p2[+m[2]-1].id : null; }
  return null;
}
function practicePath(sub){
  if (!sub) return '';
  if (/^(L|R|W1|W2|S|P1-)\w*/.test(sub) && sub.indexOf('/') < 0) return setPath(sub);   /* 旧：#practice/L01 */
  return sub;
}

/* ---------- 题目渲染（练习、专项、复习通用） ---------- */
function norm(s){ return String(s||'').toLowerCase().replace(/[£$%.,!?'"]/g,'').replace(/\s+/g,' ').trim(); }
function qHTML(q, key, n){
  var h = '<div class="q" data-key="'+esc(key)+'" data-t="'+q.t+'">'+
    '<p class="q-q"><span class="q-n mono">'+(n!=null?pad(n):'')+'</span><span class="en-q">'+esc(T(q.q))+'</span></p>';
  if (q.t === 'mcq') h += '<div class="opts">'+q.o.map(function(o, i){ return '<button type="button" class="opt" data-i="'+i+'"><span class="opt-k mono">'+'ABCD'[i]+'</span><span>'+esc(o)+'</span></button>'; }).join('')+'</div>';
  else if (q.t === 'tfng') h += '<div class="opts row3">'+['T','F','NG'].map(function(o){ return '<button type="button" class="opt" data-i="'+o+'"><span class="opt-k mono">'+o+'</span><span>'+({T:'TRUE',F:'FALSE',NG:'NOT GIVEN'})[o]+'</span></button>'; }).join('')+'</div>';
  else h += '<label class="gap"><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="'+T('输入答案，回车确认')+'"><button type="button" class="b ghost gap-ok">'+T('确认')+'</button></label>';
  h += '<div class="q-fb" hidden></div></div>';
  return h;
}
function checkQ(el, q, val){
  var ok;
  if (q.t === 'gap') ok = q.a.some(function(x){ return norm(x) === norm(val); });
  else ok = String(q.a) === String(val);
  el.classList.add('answered', ok ? 'right' : 'wrong');
  [].forEach.call(el.querySelectorAll('.opt'), function(b){
    b.disabled = true;
    if (String(b.dataset.i) === String(q.a)) b.classList.add('is-a');
    else if (String(b.dataset.i) === String(val)) b.classList.add('is-x');
  });
  var inp = el.querySelector('.gap input'); if (inp){ inp.disabled = true; el.querySelector('.gap-ok').disabled = true; }
  var ans = q.t === 'mcq' ? q.o[q.a] : q.t === 'tfng' ? ({T:'TRUE',F:'FALSE',NG:'NOT GIVEN'})[q.a] : q.a[0];
  var fb = el.querySelector('.q-fb'); fb.hidden = false;
  fb.innerHTML = '<b>'+(ok?'✓ '+T('对了'):'✗ '+T('正确答案：')+esc(ans))+'</b>'+(q.why?'<span>'+esc(T(q.why))+'</span>':'')+(q.trap && q.trap !== '—'?'<span><i class="lab">'+T('陷阱')+'</i>'+esc(T(q.trap))+'</span>':'')+(ok?'':'<em class="mono">'+T('已加入档案 · 明天复习')+'</em>');
  return ok;
}
/* 所有可复习题目的统一索引 */
function qByKey(key){
  var p = key.split(':');
  if (p[0] === 'q'){
    var set = LI.concat(RE).filter(function(s){ return s.id === p[1]; })[0]; if (!set) return null;
    var q = set.qs[+p[2]]; if (!q) return null;
    var isL = set.id[0] === 'L';
    return {q:q, tag:isL?'listening':'reading', src:set.id+' · '+set.title, link:'#/practice/'+setPath(set.id)};
  }
  if (p[0] === 'g'){ var day = G[p[1]]; if (!day || !day.quiz[+p[2]]) return null; var g = day.quiz[+p[2]]; return {q:{t:'mcq', q:g.q, o:g.o, a:g.a, why:g.why}, tag:'grammar', src:T('语法第 {n} 天', {n:p[1]}), link:'#/grammar/day/'+p[1]}; }
  if (p[0] === 'd'){ var arr = p[1] === 'w' ? DR.writing : DR.listening, d = arr[+p[2]]; if (!d) return null; return {q:{t:'mcq', q:d.q, o:d.o, a:d.a, why:d.why}, tag:p[1]==='w'?'writing':'listening', src:T(p[1]==='w'?'写作语言':'听力陷阱')}; }
  if (p[0] === 'cl'){ var n = A.byId[p[1]]; if (!n) return null; return colloQ(n); }
  return null;
}
/* 搭配填空：从例句里挖空 */
function cellAt(n, i){ return n && n.cells && n.cells[i] ? A.strip(n.cells[i].html).trim() : ''; }
function isCloze(n){ return n.cells && n.cells.length >= 3 && (cellAt(n, 2).match(/[A-Za-z]+/g)||[]).length >= 3 && cellAt(n, 0).length < 60; }
function colloQ(n){
  if (!isCloze(n)) return null;
  var col = cellAt(n, 0).split(/\s*\/\s*/)[0], zh = cellAt(n, 1), ex = cellAt(n, 2).split(/（|\(/)[0];
  var pool = A.items(A.S.collocations).filter(function(x){ return x.id !== n.id && isCloze(x) && x.cells[0].label === n.cells[0].label; });
  var seed = n.id.charCodeAt(n.id.length-1) + n.id.charCodeAt(n.id.length-2);
  var o1 = cellAt(pool[seed % pool.length], 0).split(/\s*\/\s*/)[0], o2 = cellAt(pool[(seed*7+3) % pool.length], 0).split(/\s*\/\s*/)[0];
  var opts = [col, o1, o2], a = seed % 3; var tmp = opts[0]; opts[0] = opts[a]; opts[a] = tmp;
  var words = col.replace(/\b(sb|sth|somebody|something)\b|\.\.\.|…/gi,' ').trim().split(/\s+/).filter(Boolean).map(function(w){ return w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); });
  var blanked = ex;
  for (var k = words.length; k > 0 && blanked === ex; k--) blanked = ex.replace(new RegExp('\\b'+words.slice(0, k).map(function(w){ return w+'\\w*'; }).join('\\s+(?:\\w+\\s+)?'), 'i'), '_____');
  var qq = blanked === ex ? T('哪个英文表达是「{zh}」？', {zh:zh}) : '「'+zh+'」 '+blanked;
  return {q:{t:'mcq', q:qq, o:opts, a:a, why:col+': '+ex}, tag:'collocation', src:T('搭配'), link:'#/item/'+n.id};
}

/* 自评卡（data.js 条目、笔记、作文自查项） */
function selfCard(key){
  var p = key.split(':'), r = srs[key] || {}, front = '', back = '';
  if (p[0] === 'item'){
    var n = A.byId[p.slice(1).join(':')]; if (!n) return null;
    var k = A.kind(n);
    if (k === 'mis'){ front = '<p class="sc-hint">'+T('找出错误并改正')+'</p><p class="sc-front en">'+esc(A.strip(n.cells[0].html).replace(/^\s*✗\s*/,''))+'</p>'; back = A.cellsHTML(n); }
    else if (k === 'pair'){ front = '<p class="sc-hint">'+T('用英语怎么说')+'</p><p class="sc-front">'+esc(A.strip(n.cells[0].html))+'</p>'; back = '<div class="pe en">'+n.cells[1].html+'</div>'; }
    else if (k === 'rich'){ front = '<p class="sc-hint">'+T('回忆要点')+'</p><p class="sc-front">'+esc(n.title || A.strip(n.html).slice(0,60))+'</p>'; back = '<div class="rich">'+fixPairs(n.html)+'</div>'; }
    else { front = '<p class="sc-hint">'+T('回忆用法和例句')+'</p><p class="sc-front en">'+esc(A.strip(n.cells[0].html))+'</p>'; back = A.cellsHTML(n); }
  } else { front = '<p class="sc-hint">'+esc(tg(r.tag))+'</p><p class="sc-front">'+esc(T(r.title))+'</p>'; back = '<p class="muted">'+T('想一想能不能做到，再诚实地选。')+'</p>'; }
  return '<div class="selfc" data-key="'+esc(key)+'"><div class="sc-f">'+front+'</div><div class="sc-b" hidden>'+back+'</div>'+
    '<div class="sc-act"><button type="button" class="b pri grow sc-show">'+T('看答案')+'</button></div>'+
    '<div class="sc-act sc-grade" hidden><button type="button" class="b ghost grow" data-g="0">'+T('还不会')+'</button><button type="button" class="b pri grow" data-g="1">'+T('记住了')+'</button></div></div>';
}

/* ---------- 语法每日页 ---------- */
function fixPairs(html){
  return String(html||'')
    .replace(/<span class="err">✗\s*([\s\S]*?)<\/span>\s*(?:<span class="ok">✓\s*([\s\S]*?)<\/span>)?[\s\u3000]*/g, function(_, b, g){
      return '<span class="fx"><span class="fx-b"><i>✗</i><span>'+b+'</span></span>'+(g?'<span class="fx-g"><i>✓</i><span>'+g+'</span></span>':'')+'</span>';
    })
    .replace(/<span class="err">(常错：?)<\/span>/g, '<span class="fx-lab">'+T('常错：')+'</span>');
}
function dayNo(n){ var m = n && n.sec === 'grammar' && n.title && n.title.match(/^第 (\d+) 天/); return m ? +m[1] : 0; }
function grammarDeep(d){
  var g = G[d]; if (!g) return '';
  return '<section class="gd">'+
    '<p class="gd-meta mono">'+T('约 {m} 分钟 · {e} 个例句 · {q} 道小测 · {r} 条常错', {m:g.min, e:g.ex.length, q:g.quiz.length, r:g.err.length})+'</p>'+
    '<h3 class="gd-h"><span class="no">01</span>'+T('讲解')+'</h3>'+g.teach.map(function(p){ return '<p class="gd-p">'+T(p)+'</p>'; }).join('')+
    '<h3 class="gd-h"><span class="no">02</span>'+T('例句精读')+'</h3><ol class="gd-ex">'+g.ex.map(function(e){ return '<li><span class="en">'+e[0]+'</span><small>'+esc(T(e[1]))+'</small></li>'; }).join('')+'</ol>'+
    '<h3 class="gd-h"><span class="no">03</span>'+T('小测')+'</h3><p class="gd-tip">'+T('点选答案即判分；做错的进「档案」，按 1/3/7/14/30 天回来复习。')+'</p>'+
    '<div class="qs">'+g.quiz.map(function(q, i){ return qHTML({t:'mcq', q:q.q, o:q.o, a:q.a, why:q.why}, 'g:'+d+':'+i, i+1); }).join('')+'</div>'+
    '<details class="gd-key"><summary>'+T('答案速查')+'</summary><p class="mono">'+g.quiz.map(function(q, i){ return (i+1)+'. '+'ABCD'[q.a]; }).join('　')+'</p></details>'+
    '<h3 class="gd-h"><span class="no">04</span>'+T('常错对照')+'</h3><div class="gd-err">'+g.err.map(function(e){ return '<div class="ge"><span class="fx-b"><i>✗</i><span class="en">'+esc(e[0])+'</span></span><span class="fx-g"><i>✓</i><span class="en">'+esc(e[1])+'</span></span><small>'+esc(T(e[2]))+'</small></div>'; }).join('')+'</div>'+
    '<h3 class="gd-h"><span class="no">05</span>'+T('今日输出')+'</h3><p class="gd-p">'+T('用今天的结构写 5 句和你的工作或生活有关的句子，写在下面（只存本机），写完勾掉本条。')+'</p>'+
    '<textarea class="gd-out" data-out="'+d+'" rows="5" placeholder="1. \n2. \n3. ">'+esc((LS.get('ielts.gout', {})[d])||'')+'</textarea>'+
    '</section>';
}
function grammarBadge(n){ var d = dayNo(n), g = G[d]; return g ? '<p class="gd-badge mono">'+T('讲解 · {e} 例句 · {q} 题小测 · 约 {m} 分钟', {e:g.ex.length, q:g.quiz.length, m:g.min})+' · <a class="lnk" href="#/grammar/day/'+d+'">'+T('打开第 {n} 天', {n:d})+'</a></p>' : ''; }
function gdone(d){ var it = grammarItem(d); return it ? A.isDone(it.id) : !!LS.get('ielts.gdone', {})[d]; }
function grammarDaysStrip(cur){
  return '<div class="gdays strip">'+gDays().map(function(k){
    return '<a href="#/grammar/day/'+k+'" class="gday'+(gdone(k)?' on':'')+(k===cur?' cur':'')+(k>14?' adv':'')+'"><span class="mono">'+pad(k)+'</span><small>'+esc(gTitle(k))+'</small></a>';
  }).join('')+'</div>';
}
function renderGrammarDay(main, d){
  var days = gDays(); if (!G[d]) d = days[0];
  var it = grammarItem(d), g = G[d], parent = A.parentOf(location.hash) || '#/section/grammar', on = gdone(d), i = days.indexOf(d);
  var h = '<section class="set-h t-grammar gday-h">'+A.backHTML(parent, A.baseLabel(parent))+
    '<p class="mono muted">'+T('两周语法速成')+(d>14?' · '+T('进阶'):'')+' · '+T('第 {n} 天', {n:d})+' / '+days.length+'</p>'+
    '<h1 class="set-title">'+esc(gTitle(d))+'</h1>'+
    '<div class="row-f"><button class="b '+(on?'ghost':'pri')+'" id="gDone" type="button">'+ic('check')+'<span>'+T(on?'已学，点击取消':'标记今天已学')+'</span></button>'+
    '</div><div class="srs-row" id="gSrs"></div>'+
    '</section>';
  h += '<div class="gday-grid"><article class="gday-main">';
  if (it) h += '<div class="rich d-rich gd-base">'+fixPairs(it.html)+'</div>';
  h += grammarDeep(d);
  h += '<nav class="gday-pn">'+(days[i-1]?'<a class="b ghost" href="#/grammar/day/'+days[i-1]+'" data-swap>'+ic('caret-left')+'<span>'+T('第 {n} 天', {n:days[i-1]})+'</span></a>':'<span></span>')+
    (days[i+1]?'<a class="b pri" href="#/grammar/day/'+days[i+1]+'" data-swap><span>'+T('第 {n} 天', {n:days[i+1]})+'</span>'+ic('caret-right')+'</a>':'')+'</nav>';
  h += '</article><aside class="gday-side"><p class="toc-h">'+T('全部天数')+'</p>'+grammarDaysStrip(d)+'</aside></div>';
  main.innerHTML = h;
  $('gDone').onclick = function(){
    if (it) A.setDone(it.id, !A.isDone(it.id)); else { var x = LS.get('ielts.gdone', {}); if (x[d]) delete x[d]; else x[d] = 1; LS.set('ielts.gdone', x); }
    var now = gdone(d); this.className = 'b '+(now?'ghost':'pri'); this.querySelector('span').textContent = T(now?'已学，点击取消':'标记今天已学');
    A.toast(T(now?'已标记为已学':'已取消'));
  };
  wireSrsToggle($('gSrs'), it ? 'item:'+it.id : 'gd:'+d, function(){ addWeak(it ? 'item:'+it.id : 'gd:'+d, 'grammar', '语法第 '+d+' 天'); });
  [].forEach.call(main.querySelectorAll('[data-swap]'), function(a){ a.onclick = function(e){ e.preventDefault(); A.nav(a.getAttribute('href')); }; });
}

/* ---------- 事件委托：题目、自评卡、课表打卡 ---------- */
document.addEventListener('click', function(e){
  var opt = e.target.closest && e.target.closest('.q .opt');
  if (opt && !opt.disabled){ var el = opt.closest('.q'), key = el.dataset.key, x = qByKey(key); if (!x) return; var ok = checkQ(el, x.q, opt.dataset.i); answered(key, ok, x.tag, x.q.q); afterAnswer(el, ok); return; }
  var go = e.target.closest && e.target.closest('.gap-ok');
  if (go){ var el2 = go.closest('.q'), x2 = qByKey(el2.dataset.key), v = el2.querySelector('input').value; if (!v.trim()) return; var ok2 = checkQ(el2, x2.q, v); answered(el2.dataset.key, ok2, x2.tag, x2.q.q); afterAnswer(el2, ok2); return; }
  var sc = e.target.closest && e.target.closest('.selfc');
  if (sc){
    if (e.target.closest('.sc-show')){ sc.querySelector('.sc-b').hidden = false; sc.querySelector('.sc-act').hidden = true; sc.querySelector('.sc-grade').hidden = false; return; }
    var gb = e.target.closest('[data-g]'); if (gb){ var k = sc.dataset.key, good = gb.dataset.g === '1'; if (srs[k]) grade(k, good); else if (!good) addWeak(k, tagOfKey(k), titleOfKey(k)); sc.classList.add(good?'right':'wrong'); sc.querySelector('.sc-grade').innerHTML = '<p class="muted">'+(good?T('下次：')+(srs[k]&&srs[k].done?T('已掌握'):mdz(srs[k]?srs[k].due:today())):T('明天再见'))+'</p>'; afterAnswer(sc, good); return; }
  }
  var blk = e.target.closest && e.target.closest('.blk .chk');
  if (blk){ var row = blk.closest('.blk'), l = planLog(), d = row.dataset.day, i = row.dataset.blk; l[d] = l[d] || {}; if (l[d][i]) delete l[d][i]; else l[d][i] = 1; LS.set('ielts.plan', l); row.classList.toggle('on', !!l[d][i]); blk.setAttribute('aria-pressed', l[d][i]?'true':'false'); updateDayMeter(d); return; }
});
document.addEventListener('keydown', function(e){ if (e.key === 'Enter' && e.target.closest && e.target.closest('.gap input')){ var b = e.target.closest('.q').querySelector('.gap-ok'); b.click(); } });
document.addEventListener('input', function(e){
  if (e.target.classList && e.target.classList.contains('gd-out')){ var o = LS.get('ielts.gout', {}); o[e.target.dataset.out] = e.target.value; LS.set('ielts.gout', o); }
});
function tagOfKey(k){ var p = k.split(':'); if (p[0] === 'item'){ var n = A.byId[p.slice(1).join(':')]; return n ? (SEC_TAG[n.sec]||'grammar') : 'grammar'; } return 'writing'; }
function qTitle(k, r){
  var p = k.split(':'), d = p[0] === 'gd' ? +p[1] : (p[0] === 'item' && A.byId[p[1]] ? dayNo(A.byId[p[1]]) : 0);
  if (d) return T('语法第 {n} 天', {n:d})+' · '+gTitle(d);
  return T(r.title || titleOfKey(k));
}
function titleOfKey(k){ var p = k.split(':'); if (p[0] === 'item'){ var n = A.byId[p.slice(1).join(':')]; if (n) return n.title || A.strip(n.cells ? n.cells[0].html : n.html).slice(0, 80); } return k; }
function updateDayMeter(d){ var m = dayMinutes(d); [].forEach.call(document.querySelectorAll('[data-meter="'+d+'"]'), function(e){ e.innerHTML = meterHTML(m); }); }
function meterHTML(m){ return '<b>'+m.got+'</b><span>/ '+T('{n} 分钟', {n:m.tot})+'</span><span class="mt-bar">'+'<i style="width:'+(m.tot?Math.round(m.got*100/m.tot):0)+'%"></i></span>'; }

/* 练习组计分 */
var session = null;
function afterAnswer(el, ok){
  var set = el.closest('[data-set]');
  if (set){
    var all = set.querySelectorAll('.q').length, dn = set.querySelectorAll('.q.answered').length, right = set.querySelectorAll('.q.right').length;
    var sc = set.querySelector('.set-score'); if (sc) sc.innerHTML = '<b>'+right+'</b> / '+all+(dn===all?' · '+T('完成'):' · '+T('已答 {n}', {n:dn}));
    if (dn === all){ var pr = LS.get('ielts.prac', {}); pr[set.dataset.set] = {s:right, t:all, d:today()}; LS.set('ielts.prac', pr); logAct('set'); var tr = set.querySelector('.tr'); if (tr) tr.classList.remove('blind'); }
  }
  if (session && el.closest('#sess')){ session.right += ok ? 1 : 0; session.done++; setTimeout(nextInSession, ok ? 700 : 1600); }
}

/* ---------- 听力：浏览器朗读 ---------- */
var speech = {rate: LS.get('ielts.rate', 0.9), voices: [], playing:false};
function loadVoices(){ if (!('speechSynthesis' in window)) return; var v = speechSynthesis.getVoices().filter(function(x){ return /^en/i.test(x.lang); }); var gb = v.filter(function(x){ return /GB|AU|IE/i.test(x.lang); }); speech.voices = gb.concat(v.filter(function(x){ return gb.indexOf(x) < 0; })); }
if ('speechSynthesis' in window){ loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speakLines(lines, from, root){
  if (!('speechSynthesis' in window)){ A.toast(T('这个浏览器不支持朗读，请用「先读再听」模式')); return; }
  speechSynthesis.cancel(); speech.playing = true;
  var vs = speech.voices;
  lines.forEach(function(l, i){
    if (i < from) return;
    var u = new SpeechSynthesisUtterance(l[1].replace(/£/g,' pounds ').replace(/—/g,', '));
    u.lang = 'en-GB'; u.rate = speech.rate;
    var vA = vs[0], vB = vs[1] || vs[0];
    if (l[0] === 'B'){ if (vB) u.voice = vB; u.pitch = vs.length > 1 ? 1 : 1.35; } else { if (vA) u.voice = vA; u.pitch = 0.95; }
    u.onstart = function(){ [].forEach.call(root.querySelectorAll('.ln'), function(x){ x.classList.toggle('now', +x.dataset.ln === i); }); };
    if (i === lines.length-1) u.onend = function(){ speech.playing = false; [].forEach.call(root.querySelectorAll('.ln.now'), function(x){ x.classList.remove('now'); }); playBtn(root); };
    speechSynthesis.speak(u);
  });
  playBtn(root);
}
function playBtn(root){ var b = root.querySelector('.pl-play'); if (b) b.innerHTML = speech.playing ? ic('pause')+'<span>'+T('停止')+'</span>' : ic('play')+'<span>'+T('播放全文')+'</span>'; }

/* ---------- 口语计时 ---------- */
var timer = {id:null};
function startTimer(el, secs, label, then){
  clearInterval(timer.id); var end = Date.now() + secs*1000;
  function tick(){ var left = Math.max(0, Math.round((end - Date.now())/1000)); el.querySelector('.tm-n').textContent = Math.floor(left/60)+':'+pad(left%60); el.querySelector('.tm-l').textContent = label; el.style.setProperty('--tp', (100 - left*100/secs)+'%'); if (!left){ clearInterval(timer.id); if (navigator.vibrate) try{navigator.vibrate(120);}catch(e){} if (then) then(); else { el.querySelector('.tm-l').textContent = T('时间到'); } } }
  tick(); timer.id = setInterval(tick, 250);
}
var rec = {mr:null, chunks:[]};
function toggleRecord(btn, out){
  if (rec.mr && rec.mr.state === 'recording'){ rec.mr.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder){ A.toast(T('这个浏览器不支持录音，可用手机自带录音')); return; }
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(st){
    rec.chunks = []; rec.mr = new MediaRecorder(st);
    rec.mr.ondataavailable = function(e){ rec.chunks.push(e.data); };
    rec.mr.onstop = function(){ st.getTracks().forEach(function(t){ t.stop(); }); var url = URL.createObjectURL(new Blob(rec.chunks)); out.innerHTML = '<audio controls src="'+url+'"></audio><small class="muted">'+T('录音只在这次打开的页面里，不会上传或保存。')+'</small>'; btn.classList.remove('rec'); btn.querySelector('span').textContent = T('重新录音'); };
    rec.mr.start(); btn.classList.add('rec'); btn.querySelector('span').textContent = T('停止录音');
  }).catch(function(){ A.toast(T('没有麦克风权限，可以跳过录音')); });
}

/* ================= 页面 ================= */
var ROUTES = {course:{en:'Course', title:'课表'}, practice:{en:'Practice', title:'练习'}, archive:{en:'Archive', title:'档案'}};
function head(k, zh, lede, extra, back){
  return '<section class="s-head x-head x-'+k+'">'+(back?A.backHTML(back[0], back[1]):'')+'<h1 class="s-en">'+ROUTES[k].en+'</h1><p class="s-zh">'+zh+'</p>'+(lede?'<p class="lede">'+lede+'</p>':'')+(extra||'')+'</section>';
}

/* ----- 课表 ----- */
function renderCourse(main){
  buildPhases();
  var t = today(), db = dayBlocks(t), ph = db.phase, l = planLog()[t] || {}, m = dayMinutes(t), st = A.settings();
  var exam = st.exam || '', left = exam ? diff(t, exam) : null;
  var h = head('course', T('课表与复习曲线')+' <span class="mono muted">'+esc(T(ph.name))+(left != null && left >= 0 ? ' · '+T('距考试 {n} 天', {n:left}) : '')+'</span>', T('每天按顺序做完下面的块就是一天的量。时间是实际建议时长，打勾记录在本机。'),
    '<div class="meter mono" data-meter="'+t+'">'+meterHTML(m)+'</div>', ['#/home', T('首页')]);
  h += '<div class="x-grid"><div class="x-main">';
  h += '<h2 class="sec-h">'+T('今天')+' · '+mdz(t)+' '+wkd(t)+'</h2><div class="blks">'+db.blocks.map(function(b){ return blockRow(b, t, l); }).join('')+'</div>';
  var mon = addDays(t, -((parse(t).getDay()+6)%7));
  h += '<h2 class="sec-h gap-t">'+T('本周')+'</h2><div class="week">';
  for (var i=0;i<7;i++){
    var d = addDays(mon, i), bl = dayBlocks(d), mm = dayMinutes(d);
    h += '<details class="wd'+(d===t?' is-t':'')+'"'+(d===t?' open':'')+'><summary><span class="wd-d"><b>'+wkd(d)+'</b><span class="mono">'+(parse(d).getMonth()+1)+'.'+parse(d).getDate()+'</span></span><span class="wd-s">'+bl.blocks.map(function(b){ var sk = SKILL[b.s]||SKILL.X; return '<i class="sq '+sk[1]+'" title="'+T(sk[0])+'"></i>'; }).join('')+'</span><span class="mono wd-m">'+(mm.got?mm.got+'/':'')+mm.tot+'′</span></summary>'+
      '<div class="blks sm">'+bl.blocks.map(function(b){ return blockRow(b, d, planLog()[d]); }).join('')+'</div></details>';
  }
  h += '</div>';
  h += '<h2 class="sec-h gap-t">'+T('阶段')+' <span class="mono muted">'+T('从 {d} 开始', {d:mdz(startDate())})+' · <a class="lnk" href="#/settings">'+T('改开始日期')+'</a></span></h2><ol class="phases">'+PH.map(function(p, i){
    var stt = t > p.to ? 'past' : (t >= p.from ? 'now' : '');
    var wkMin = 0; for (var j=0;j<7;j++){ wkMin += dayMinutes(addDays(p.from, j)).tot; }
    return '<li class="phz '+stt+'"><span class="phz-i mono">'+pad(i+1)+'</span><div><b>'+esc(T(p.name))+'</b><span class="mono muted">'+mdz(p.from)+' – '+mdz(p.to)+' · '+T('每周约 {h} 小时', {h:Math.round(wkMin/60*10)/10})+'</span><p>'+esc(T(p.goal))+'</p></div></li>';
  }).join('')+'</ol>';
  h += '</div><aside class="x-side">';
  h += srsPanel();
  h += '<section class="panel"><h3 class="p-h">'+T('语法速成 · {n} 天', {n:gDays().length})+'</h3>'+grammarDaysStrip()+'</section>';
  h += '</aside></div>';
  main.innerHTML = h;
}
function stageCard(){
  buildPhases();
  var t = today(), ph = phaseOf(t), p = ph.p, now = t >= p.from && t <= p.to, len = diff(p.from, p.to) + 1, pct = now ? Math.min(100, Math.round((diff(p.from, t)+1)*100/len)) : 0;
  return '<section class="stage">'+
    '<p class="mono muted">'+T(now?'本阶段':'下一阶段')+'  '+mdz(p.from)+' - '+mdz(p.to)+'</p>'+
    '<h3>'+esc(T(p.name))+'</h3>'+
    '<p class="stage-f">'+esc(T(p.goal))+'</p>'+
    '<div class="seg">'+PH.map(function(x, i){ return '<i class="'+(i<ph.i?'past':i===ph.i?'now':'')+'"'+(i===ph.i?' style="--p:'+pct+'%"':'')+'></i>'; }).join('')+'</div>'+
    '<p class="seg-l mono"><span>'+T('第 {a} / {b} 段', {a:ph.i+1, b:PH.length})+'</span><span>'+(now?T('已过 {p}%', {p:pct}):T('未开始'))+'</span></p>'+
    '<p class="goal"><a class="lnk" href="#/course">'+T('打开课表')+' '+ic('arrow-right')+'</a></p>'+
    '</section>';
}
function srsPanel(){
  var t = today(), act = active(), due = dueKeys().length, days = [];
  for (var i=0;i<14;i++){ var d = addDays(t, i); days.push({d:d, n:act.filter(function(k){ return i === 0 ? srs[k].due <= d : srs[k].due === d; }).length}); }
  var mx = Math.max.apply(null, days.map(function(x){ return x.n; }).concat([1]));
  return '<section class="panel srs"><h3 class="p-h">'+T('复习曲线')+'</h3>'+
    '<div class="curve">'+INT.map(function(n, i){ return '<span><b class="mono">'+n+'</b><small>'+T(i===0?'天后':'天')+'</small></span>'; }).join('<i>'+ic('arrow-right')+'</i>')+'</div>'+
    '<p class="p-t">'+T('做错或标记「还不会」的条目第二天回来；答对一次升一级，间隔变成 3、7、14、30 天；30 天后再答对就算掌握。答错回到第一级。')+'</p>'+
    '<div class="bars" aria-label="'+T('未来 14 天到期数')+'">'+days.map(function(x, i){ return '<span class="bar'+(i===0?' t':'')+'" title="'+mdz(x.d)+' '+x.n+'"><i style="height:'+Math.max(4, x.n*100/mx)+'%"></i><small class="mono">'+(i===0?T('今'):parse(x.d).getDate())+'</small></span>'; }).join('')+'</div>'+
    '<div class="p-f"><span>'+T('{a} 条今天到期 · 共 {b} 条在复习', {a:'<b class="mono">'+due+'</b>', b:act.length})+'</span><a class="b pri sm" href="#/archive/review">'+T('开始复习')+'</a></div></section>';
}

/* ----- 练习 ----- */
var PTABS = [['listening','听力'],['reading','阅读'],['writing','写作'],['speaking','口语'],['drill','专项']];
function renderPractice(main, sub){
  sub = practicePath(sub || '');
  var p = sub.split('/');
  if (p[1]){ var id = setFromPath(sub); return renderSet(main, id, p[0]); }
  var tab = PTABS.some(function(x){ return x[0] === p[0]; }) ? p[0] : LS.get('ielts.ptab', 'listening');
  LS.set('ielts.ptab', tab);
  var pr = LS.get('ielts.prac', {});
  var cnt = LI.length + RE.length + WR.t1.length + WR.t2.length + SP.p2.length + SP.p1.length;
  var nq = LI.reduce(function(a,s){return a+s.qs.length;},0)+RE.reduce(function(a,s){return a+s.qs.length;},0);
  var h = head('practice', T('题库')+' <span class="mono muted">'+T('{a} 套 · {b} 道听读题', {a:cnt, b:nq})+'</span>', T('全部为本站原创练习（非剑桥真题原文）。做错的题自动进入档案，按复习曲线回来。'), '', ['#/home', T('首页')]);
  h += '<div class="seg-t" role="tablist">'+PTABS.map(function(x){ return '<a href="#/practice/'+x[0]+'" data-swap class="'+(x[0]===tab?'on':'')+'">'+T(x[1])+'</a>'; }).join('')+'</div>';
  function row(id, t, zh, meta, cls){ var q = pr[id]; return '<a class="set" href="#/practice/'+setPath(id)+'"><span class="set-id mono">'+id+'</span><span class="set-t"><b class="en">'+esc(t)+'</b><small>'+esc(zh)+'</small></span><span class="set-m"><span class="tag '+cls+'">'+meta+'</span>'+(q?'<span class="mono set-s">'+q.s+'/'+q.t+'</span>':'<span class="mono muted set-s">'+T('未做')+'</span>')+'</span></a>'; }
  if (tab === 'listening'){
    h += '<p class="note">'+T('播放用浏览器自带的英语朗读（两个说话人音高不同）。建议第一遍「盲听」做题，第二遍「先读再听」逐句跟读。')+'</p>';
    [1,2,3,4].forEach(function(part){ var arr = LI.filter(function(s){ return s.part === part; }); if (!arr.length) return;
      h += '<h2 class="sec-h gap-t">Part '+part+' <span class="mono muted">'+T('{n} 套', {n:arr.length})+'</span></h2><div class="sets">'+arr.map(function(s){ return row(s.id, s.title, T(s.zh)+' · '+T('{n} 题', {n:s.qs.length})+' · '+T('{n} 分钟', {n:s.min}), 'Part '+s.part, 't-dialogues'); }).join('')+'</div>'; });
  }
  if (tab === 'reading') h += '<div class="sets">'+RE.map(function(s){ return row(s.id, s.title, T(s.zh)+' · '+T('{n} 题', {n:s.qs.length})+' · '+T('限时 {n} 分钟', {n:s.min}), '≈'+s.level, 't-plan'); }).join('')+'</div>';
  if (tab === 'writing') h += '<h2 class="sec-h gap-t">Task 1 · '+T('20 分钟 150 词')+'</h2><div class="sets">'+WR.t1.map(function(s){ return row(s.id, s.prompt.slice(0,60)+'…', T(s.kind), T(s.kind), 't-templates'); }).join('')+'</div><h2 class="sec-h gap-t">Task 2 · '+T('40 分钟 250 词')+'</h2><div class="sets">'+WR.t2.map(function(s){ return row(s.id, s.prompt.slice(0,70)+'…', T(s.topic)+' · '+T(s.kind), T(s.kind), 't-templates'); }).join('')+'</div>';
  if (tab === 'speaking') h += '<h2 class="sec-h gap-t">'+T('Part 2 题卡 · 1 分钟准备 + 2 分钟')+'</h2><div class="sets">'+SP.p2.map(function(s){ return row(s.id, s.card, T('范例回答 + {n} 个 Part 3 追问', {n:s.p3.length}), 'Part 2', 't-mistakes'); }).join('')+'</div><h2 class="sec-h gap-t">'+T('Part 1 话题')+'</h2><div class="sets">'+SP.p1.map(function(s, i){ return row('P1-'+i, s.topic, T('{n} 个问题 + 范例', {n:s.qs.length}), 'Part 1', 't-mistakes'); }).join('')+'</div>';
  if (tab === 'drill') h += drillPicker();
  main.innerHTML = h;
  [].forEach.call(main.querySelectorAll('.seg-t [data-swap]'), function(a){ a.onclick = function(e){ e.preventDefault(); A.nav(a.getAttribute('href')); }; });
}
function drillPicker(){
  var st = tagStats();
  return '<p class="note">'+T('专项训练每组 10 题：先出你在这个标签里还没掌握的弱项，不够再从题库补。语法、搭配题直接取自原有的错题和搭配。')+'</p><div class="drills">'+Object.keys(TAGS).map(function(k){
    var s = st[k];
    return '<a class="drill '+TAGS[k].cls+'" href="#/archive/drill/'+k+'"><span class="tile-en">'+tg(k)+'</span><span class="mono">'+T('弱项 {a} · 到期 {b}', {a:s.n, b:s.due})+' · '+T('题库 {n}', {n:poolFor(k).length})+'</span></a>';
  }).join('')+'</div>';
}
function setNav(tab, id){
  /* 同类上一套 / 下一套（替换历史，不堆栈） */
  var list = tab === 'listening' ? LI.map(function(s){ return s.id; }) : tab === 'reading' ? RE.map(function(s){ return s.id; }) : tab === 'writing' ? WR.t1.concat(WR.t2).map(function(s){ return s.id; }) : SP.p2.map(function(s){ return s.id; }).concat(SP.p1.map(function(_, i){ return 'P1-'+i; }));
  var i = list.indexOf(id);
  return '<nav class="gday-pn">'+(list[i-1]?'<a class="b ghost" href="#/practice/'+setPath(list[i-1])+'" data-swap>'+ic('caret-left')+'<span>'+T('上一套')+'</span></a>':'<span></span>')+
    (list[i+1]?'<a class="b pri" href="#/practice/'+setPath(list[i+1])+'" data-swap><span>'+T('下一套')+'</span>'+ic('caret-right')+'</a>':'')+'</nav>';
}
function wireSwap(main){ [].forEach.call(main.querySelectorAll('[data-swap]'), function(a){ a.onclick = function(e){ e.preventDefault(); A.nav(a.getAttribute('href')); }; }); }
function renderSet(main, id, tab){
  var pr = LS.get('ielts.prac', {}), h = '', back = A.backHTML('#/practice/'+tab, T('练习')+' · '+T((PTABS.filter(function(x){ return x[0] === tab; })[0]||['','练习'])[1]));
  if (!id){ main.innerHTML = '<div class="empty"><b>'+T('没有这套题')+'</b><a class="lnk" href="#/practice">'+T('回到练习')+'</a></div>'; return; }
  var L = LI.filter(function(s){ return s.id === id; })[0], R = RE.filter(function(s){ return s.id === id; })[0];
  var W = WR.t1.concat(WR.t2).filter(function(s){ return s.id === id; })[0], Sx = SP.p2.filter(function(s){ return s.id === id; })[0];
  var P1 = /^P1-(\d+)$/.test(id) ? SP.p1[+id.slice(3)] : null;
  if (L){
    var mode = LS.get('ielts.lmode', 'blind');
    h += '<section class="set-h t-dialogues">'+back+'<p class="mono muted">'+L.id+' · Part '+L.part+' · '+T('{n} 分钟', {n:L.min})+' · '+T('{n} 题', {n:L.qs.length})+'</p><h1 class="set-title en">'+esc(L.title)+'</h1><p class="s-zh">'+esc(T(L.zh))+'</p>'+
      '<div class="player"><button class="b pri pl-play" type="button">'+ic('play')+'<span>'+T('播放全文')+'</span></button>'+
      '<div class="pl-rate" role="group" aria-label="'+T('语速')+'">'+[0.8,0.9,1].map(function(r){ return '<button type="button" data-rate="'+r+'" class="'+(speech.rate==r?'on':'')+'">'+r+'×</button>'; }).join('')+'</div>'+
      '<div class="pl-mode" role="group">'+[['blind','盲听'],['read','先读再听']].map(function(m){ return '<button type="button" data-mode="'+m[0]+'" class="'+(mode===m[0]?'on':'')+'">'+T(m[1])+'</button>'; }).join('')+'</div></div>'+
      '<p class="pl-note">'+T('音频为浏览器朗读合成，用来练耳朵和跟读；真人录音版待补。点任意一句可从那句开始播放。')+'</p></section>';
    h += '<div class="set-grid lis" data-set="'+L.id+'"><div class="tr'+(mode==='blind'?' blind':'')+'"><h2 class="sec-h">'+T('原文')+' <span class="muted">'+(mode==='blind'?'· '+T('答完全部题后显示'):'')+'</span></h2>'+
      L.lines.map(function(l, i){ return '<p class="ln" data-ln="'+i+'"><span class="sp mono">'+l[0]+'</span><span class="en">'+esc(l[1])+'</span></p>'; }).join('')+'</div>'+
      '<div class="qcol"><div class="set-bar"><h2 class="sec-h">'+T('题目')+'</h2><span class="set-score mono">'+(pr[L.id]?T('上次 {a} / {b}', {a:pr[L.id].s, b:pr[L.id].t}):'0 / '+L.qs.length)+'</span></div><div class="qs">'+L.qs.map(function(q, i){ return qHTML(q, 'q:'+L.id+':'+i, i+1); }).join('')+'</div></div></div>'+setNav(tab, id);
    main.innerHTML = h; wireSwap(main);
    var root = main;
    main.querySelector('.pl-play').onclick = function(){ if (speech.playing){ speechSynthesis.cancel(); speech.playing = false; playBtn(root); } else speakLines(L.lines, 0, root); };
    [].forEach.call(main.querySelectorAll('[data-rate]'), function(b){ b.onclick = function(){ speech.rate = +b.dataset.rate; LS.set('ielts.rate', speech.rate); [].forEach.call(main.querySelectorAll('[data-rate]'), function(x){ x.classList.toggle('on', x === b); }); }; });
    [].forEach.call(main.querySelectorAll('[data-mode]'), function(b){ b.onclick = function(){ LS.set('ielts.lmode', b.dataset.mode); main.querySelector('.tr').classList.toggle('blind', b.dataset.mode === 'blind'); [].forEach.call(main.querySelectorAll('[data-mode]'), function(x){ x.classList.toggle('on', x === b); }); }; });
    [].forEach.call(main.querySelectorAll('.ln'), function(p){ p.onclick = function(){ speakLines(L.lines, +p.dataset.ln, root); }; });
    return;
  }
  if (R){
    h += '<section class="set-h t-plan">'+back+'<p class="mono muted">'+R.id+' · '+T('难度约 {l}', {l:R.level})+' · '+T('建议 {n} 分钟', {n:R.min})+' · '+T('{n} 题', {n:R.qs.length})+'</p><h1 class="set-title en">'+esc(R.title)+'</h1><p class="s-zh">'+esc(T(R.zh))+'</p>'+
      '<div class="tm" id="rtm"><span class="tm-n mono">'+R.min+':00</span><span class="tm-l">'+T('计时未开始')+'</span><button class="b ghost sm" type="button" id="rgo">'+T('开始计时')+'</button></div></section>';
    h += '<div class="set-grid" data-set="'+R.id+'"><article class="passage">'+R.p.map(function(p, i){ return '<p><span class="pn mono">'+'ABCDEFGH'[i]+'</span><span class="en">'+esc(p)+'</span></p>'; }).join('')+'</article>'+
      '<div class="qcol"><div class="set-bar"><h2 class="sec-h">'+T('题目 · TRUE / FALSE / NOT GIVEN 与选择')+'</h2><span class="set-score mono">'+(pr[R.id]?T('上次 {a} / {b}', {a:pr[R.id].s, b:pr[R.id].t}):'0 / '+R.qs.length)+'</span></div><div class="qs">'+R.qs.map(function(q, i){ return qHTML(q, 'q:'+R.id+':'+i, i+1); }).join('')+'</div></div></div>'+setNav(tab, id);
    main.innerHTML = h; wireSwap(main);
    $('rgo').onclick = function(){ startTimer($('rtm'), R.min*60, T('剩余')); };
    return;
  }
  if (W){
    var isT1 = /^W1/.test(W.id), list = isT1 ? WR.check.t1 : WR.check.t2, chk = LS.get('ielts.wcheck', {})[W.id] || {}, draft = LS.get('ielts.draft', {})[W.id] || '';
    h += '<section class="set-h t-templates">'+back+'<p class="mono muted">'+W.id+' · '+(isT1?'Task 1':'Task 2')+' · '+esc(T(W.kind))+' · '+T('{n} 分钟', {n:W.min})+'</p><h1 class="set-title en wp">'+esc(W.prompt)+'</h1>'+
      '<div class="tm" id="wtm"><span class="tm-n mono">'+W.min+':00</span><span class="tm-l">'+T('计时未开始')+'</span><button class="b ghost sm" type="button" id="wgo">'+T('开始计时')+'</button></div></section>';
    h += '<div class="set-grid"><div>';
    if (W.data) h += '<h2 class="sec-h">'+T('数据')+'</h2><div class="tbl"><table>'+W.data.map(function(r, i){ return '<tr>'+r.map(function(c){ return i ? '<td>'+esc(c)+'</td>' : '<th>'+esc(T(c))+'</th>'; }).join('')+'</tr>'; }).join('')+'</table></div>';
    h += '<h2 class="sec-h gap-t">'+T('写作区')+' <span class="mono muted" id="wc">'+T('{a} 词 / {b}', {a:wc(draft), b:isT1?150:250})+'</span></h2><textarea class="wbox en" id="wbox" rows="14" placeholder="'+T('在这里写，自动保存在本机。')+'">'+esc(draft)+'</textarea>';
    h += '<details class="rev"><summary>'+T('思路提纲')+'</summary><ol>'+W.plan.map(function(x){ return '<li>'+esc(T(x))+'</li>'; }).join('')+'</ol></details>';
    h += '<details class="rev"><summary>'+T(isT1?'范文片段（Overview）':'范文片段（引言）')+'</summary><p class="en big-q">'+esc(W.model)+'</p></details>';
    if (W.body) h += '<details class="rev"><summary>'+T('主体段示范')+'</summary>'+W.body.map(function(x){ return '<p class="en big-q">'+esc(x)+'</p>'; }).join('')+'</details>';
    h += '<details class="rev"><summary>'+T('可用表达')+'</summary><div class="chips">'+W.lang.map(function(x){ return '<span class="chip en">'+esc(x)+'</span>'; }).join('')+'</div></details>';
    h += '</div><div class="qcol"><div class="set-bar"><h2 class="sec-h">'+T('评分自查（写完再勾）')+'</h2><span class="mono" id="wck">'+Object.keys(chk).length+' / '+list.length+'</span></div><div class="cklist">'+list.map(function(c, i){ return '<label class="ck"><input type="checkbox" data-ck="'+i+'"'+(chk[i]?' checked':'')+'><span><i class="lab">'+esc(T(c[0]))+'</i>'+esc(T(c[1]))+'</span></label>'; }).join('')+'</div>'+
      '<button class="b ghost" type="button" id="wweak">'+T('没勾的项加入复习')+'</button></div></div>'+setNav(tab, id);
    main.innerHTML = h; wireSwap(main);
    $('wgo').onclick = function(){ startTimer($('wtm'), W.min*60, T('剩余')); };
    $('wbox').oninput = function(){ var d = LS.get('ielts.draft', {}); d[W.id] = this.value; LS.set('ielts.draft', d); $('wc').textContent = T('{a} 词 / {b}', {a:wc(this.value), b:isT1?150:250}); };
    [].forEach.call(main.querySelectorAll('[data-ck]'), function(cb){ cb.onchange = function(){ var all = LS.get('ielts.wcheck', {}); all[W.id] = all[W.id] || {}; if (cb.checked) all[W.id][cb.dataset.ck] = 1; else delete all[W.id][cb.dataset.ck]; LS.set('ielts.wcheck', all); $('wck').textContent = Object.keys(all[W.id]).length+' / '+list.length; }; });
    $('wweak').onclick = function(){ var ks = []; [].forEach.call(main.querySelectorAll('[data-ck]'), function(cb){ if (!cb.checked){ var c = list[+cb.dataset.ck]; ks.push(['wc:'+(isT1?'t1':'t2')+':'+cb.dataset.ck, 'writing', c[1]]); } }); if (ks.length) addManyUndo(ks, T('已加入 {n} 项写作弱项', {n:ks.length})); else A.toast(T('全部达标')); };
    return;
  }
  if (Sx || P1){
    var item = Sx || P1;
    h += '<section class="set-h t-mistakes">'+back+'<p class="mono muted">'+(Sx?Sx.id+' · '+T('Part 2 题卡'):'Part 1 · '+T('{n} 个问题', {n:P1.qs.length}))+'</p><h1 class="set-title en">'+esc(Sx?Sx.card:P1.topic)+'</h1>'+
      (Sx?'<p class="s-zh">You should say:</p><ul class="cue en">'+Sx.bullets.map(function(b){ return '<li>'+esc(b)+'</li>'; }).join('')+'</ul>':'<ol class="cue en">'+P1.qs.map(function(q){ return '<li>'+esc(q)+'</li>'; }).join('')+'</ol>')+
      '<div class="tm big" id="stm"><span class="tm-n mono">'+(Sx?'1:00':'0:30')+'</span><span class="tm-l">'+T(Sx?'准备 1 分钟 → 讲 2 分钟':'每题 30 秒')+'</span></div>'+
      '<div class="row-f"><button class="b pri" id="sgo" type="button">'+ic('play')+'<span>'+T(Sx?'开始准备':'开始一题')+'</span></button><button class="b ghost" id="srec" type="button">'+ic('microphone')+'<span>'+T('录音（可选）')+'</span></button></div><div id="sout" class="sout"></div></section>';
    h += '<div class="set-grid"><div>'+
      '<details class="rev"><summary>'+T('范例回答')+'</summary><p class="en big-q">'+esc(item.model)+'</p></details>'+
      (Sx?'<h2 class="sec-h gap-t">'+T('Part 3 追问（每题答 4–5 句）')+'</h2><ol class="p3 en">'+Sx.p3.map(function(q){ return '<li>'+esc(q)+'</li>'; }).join('')+'</ol>':'')+
      (item.vocab?'<h2 class="sec-h gap-t">'+T('话题词汇')+'</h2><div class="chips">'+item.vocab.map(function(x){ return '<span class="chip en">'+esc(x)+'</span>'; }).join('')+'</div>':'')+
      '<h2 class="sec-h gap-t">'+T('讲完后自评')+'</h2><div class="cklist">'+SP.check.map(function(c, i){ return '<label class="ck"><input type="checkbox" data-sk="'+i+'"><span><i class="lab">'+esc(T(c[0]))+'</i>'+esc(T(c[1]))+'</span></label>'; }).join('')+'</div>'+
      '<div class="row-f"><button class="b pri" id="sdone" type="button">'+T('记录这次练习')+'</button></div></div>'+
      '<div class="qcol"><h2 class="sec-h">'+T('可借用的句式')+'</h2><div class="cards">'+A.items(A.S.templates).slice(0, 5).map(function(n, i){ return A.entryHTML(n, i); }).join('')+'</div></div></div>'+setNav(tab, id);
    main.innerHTML = h; wireSwap(main);
    $('sgo').onclick = function(){ if (Sx) startTimer($('stm'), 60, T('准备中'), function(){ startTimer($('stm'), 120, T('开始讲')); }); else startTimer($('stm'), 30, T('回答中')); };
    $('srec').onclick = function(){ toggleRecord($('srec'), $('sout')); };
    $('sdone').onclick = function(){
      var ks = []; [].forEach.call(main.querySelectorAll('[data-sk]'), function(cb){ if (!cb.checked){ var c = SP.check[+cb.dataset.sk]; ks.push(['sk:'+cb.dataset.sk, 'speaking', c[1]]); } }); var n = ks.length;
      var pr2 = LS.get('ielts.prac', {}); pr2[id] = {s:SP.check.length - n, t:SP.check.length, d:today()}; LS.set('ielts.prac', pr2); logAct('set');
      if (n) addManyUndo(ks, T('已记录，{n} 项口语弱项进入复习', {n:n})); else A.toast(T('已记录，全部达标'));
    };
    return;
  }
  main.innerHTML = '<div class="empty"><b>'+T('没有这套题')+'</b><a class="lnk" href="#/practice">'+T('回到练习')+'</a></div>';
}
function wc(s){ return (String(s).match(/[A-Za-z0-9'’-]+/g)||[]).length; }

/* ----- 档案 ----- */
function tagStats(){
  var t = today(), st = {};
  Object.keys(TAGS).forEach(function(k){ st[k] = {n:0, due:0, last:'', next:'', wrong:0, done:0}; });
  Object.keys(srs).forEach(function(k){
    var r = srs[k], s = st[r.tag]; if (!s) return;
    if (r.done){ s.done++; return; }
    s.n++; s.wrong += r.n||0; if (r.due <= t) s.due++;
    if (r.last > s.last) s.last = r.last;
    if (!s.next || r.due < s.next) s.next = r.due;
  });
  return st;
}
var NTYPES = ['错误','笔记','作业'];
function renderArchive(main, sub){
  if (sub === 'review') return startSession(main, 'review');
  if (sub === 'drill') return startSession(main, 'drill-'+weakestTag());
  if (sub && sub.indexOf('drill/') === 0) return startSession(main, 'drill-'+sub.slice(6));
  var st = tagStats(), act = active(), due = dueKeys(), mastered = Object.keys(srs).filter(function(k){ return srs[k].done; }).length;
  var notes = LS.get('ielts.notes', []), pr = LS.get('ielts.prac', {});
  var mis = A.items(A.S.mistakes).filter(function(n){ return A.isDone(n.id); }).length;
  var h = head('archive', T('错题档案与专项训练'), T('做错的题、自评「还不会」的条目、写作口语没达标的自查项，都按标签收在这里。'),
    '<div class="kpis">'+[[due.length,'今天到期'],[act.length,'复习中'],[mastered,'已掌握'],[streak(),'连续打卡天']].map(function(x){ return '<span><b>'+x[0]+'</b><small>'+T(x[1])+'</small></span>'; }).join('')+'</div>', ['#/home', T('首页')]);
  h += '<div class="row-f"><a class="b pri" href="#/archive/review">'+T('开始复习 {n} 条', {n:due.length})+'</a><a class="b ghost" href="#/archive/drill/'+weakestTag()+'">'+T('专项训练：{t}', {t:tg(weakestTag())})+'</a></div>';
  h += '<div class="x-grid"><div class="x-main">';
  h += '<h2 class="sec-h gap-t">'+T('弱项标签')+'</h2><div class="tags-t">'+Object.keys(TAGS).map(function(k){
    var s = st[k];
    return '<div class="tg-row"><div class="tg-l"><span class="tag '+TAGS[k].cls+'">'+tg(k)+'</span><b>'+s.n+'</b><small>'+T('条弱项 · 累计错 {n} 次', {n:s.wrong})+'</small></div>'+
      '<div class="tg-m"><span>'+T('上次复习')+' <b class="mono">'+(s.last?mdz(s.last):'—')+'</b></span><span>'+T('下次到期')+' <b class="mono">'+(s.next?(s.next<=today()?'<em>'+T('今天')+'</em>':mdz(s.next)):'—')+'</b></span></div>'+
      '<a class="b ghost sm" href="#/archive/drill/'+k+'">'+T('练 10 题')+'</a></div>';
  }).join('')+'</div>';
  var list = act.sort(function(a,b){ return srs[a].due < srs[b].due ? -1 : 1; }).slice(0, 60);
  h += '<h2 class="sec-h gap-t">'+T('复习队列')+' <span class="mono muted">'+act.length+'</span></h2><p class="srs-help">'+T('错题会自动进复习；手动加入可随时取消。')+'</p>'+(list.length ? '<div class="queue" id="queue">'+list.map(function(k){
    var r = srs[k], iid = k.indexOf('item:') === 0 ? k.slice(5) : null, tt = esc(qTitle(k, r));
    return '<div class="qi"><span class="tag '+(TAGS[r.tag]||TAGS.grammar).cls+'">'+tg(r.tag)+'</span>'+(iid && A.byId[iid] ? '<a class="qi-t" href="#/item/'+esc(iid)+'">'+tt+'</a>' : '<span class="qi-t">'+tt+'</span>')+'<span class="qi-lv">'+INT.map(function(_, i){ return '<i class="'+(i<=r.lv?'on':'')+'"></i>'; }).join('')+'</span><span class="mono qi-d">'+(r.due<=today()?'<em>'+T('今天')+'</em>':mdz(r.due))+'</span><button class="qi-x icon" type="button" data-rmk="'+esc(k)+'" aria-label="'+T('取消复习')+'" title="'+T('取消复习')+'">'+ic('x')+'</button></div>';
  }).join('')+'</div>' : '<div class="empty"><b>'+T('档案还是空的')+'</b><span>'+T('去「练习」做一套题，或在任意条目里点「加入复习」。')+'</span></div>');
  h += '</div><aside class="x-side">';
  h += srsPanel();
  h += '<section class="panel"><h3 class="p-h">'+T('记一条：笔记 / 作业 / 错误')+'</h3><form id="nf" class="nf">'+
    '<div class="seg-s">'+NTYPES.map(function(x, i){ return '<label><input type="radio" name="ty" value="'+x+'"'+(i?'':' checked')+'><span>'+T(x)+'</span></label>'; }).join('')+'</div>'+
    '<select name="tag">'+Object.keys(TAGS).map(function(k){ return '<option value="'+k+'">'+tg(k)+'</option>'; }).join('')+'</select>'+
    '<textarea name="tx" rows="3" placeholder="'+T('例：I have seen him yesterday → I saw him yesterday（有具体过去时间不用完成时）')+'"></textarea>'+
    '<button class="b pri" type="submit">'+T('保存')+'</button><p class="p-t">'+T('「错误」会同时进入复习曲线。')+'</p></form>'+
    (notes.length ? '<div class="notes">'+notes.slice(-8).reverse().map(function(n){ return '<div class="nt"><span class="tag '+(TAGS[n.tag]||TAGS.grammar).cls+'">'+esc(T(n.type))+'</span><p>'+esc(n.text)+'</p><small class="mono muted">'+mdz(n.d)+'</small></div>'; }).join('')+'</div>' : '')+'</section>';
  h += '<section class="panel"><h3 class="p-h">'+T('做过的练习')+'</h3>'+(Object.keys(pr).length ? '<div class="done-l">'+Object.keys(pr).map(function(k){ return '<a href="#/practice/'+setPath(k)+'"><span class="mono">'+k+'</span><span class="mono">'+pr[k].s+' / '+pr[k].t+'</span><small class="mono muted">'+mdz(pr[k].d)+'</small></a>'; }).join('')+'</div>' : '<p class="p-t">'+T('还没有。')+'</p>')+
    '<p class="p-t">'+T('原「错题记忆」已勾 {a} / {b} 条。', {a:mis, b:A.items(A.S.mistakes).length})+'</p></section>';
  h += '</aside></div>';
  main.innerHTML = h;
  if ($('queue')) $('queue').onclick = function(e){
    var b = e.target.closest('[data-rmk]'); if (!b) return;
    var k = b.dataset.rmk, before = snapSrs([k]); removeWeak(k); renderArchive(main);
    A.toast(T('已取消复习'), {label:T('撤销'), fn:function(){ restoreSrs(before); renderArchive(main); }});
  };
  $('nf').onsubmit = function(e){
    e.preventDefault(); var f = e.target, tx = f.tx.value.trim(); if (!tx) return;
    var n = {id:Date.now().toString(36), type:f.ty.value, tag:f.tag.value, text:tx, d:today()};
    notes.push(n); LS.set('ielts.notes', notes);
    if (n.type === '错误') addWeak('n:'+n.id, n.tag, tx);
    A.toast(T('已保存')); renderArchive(main);
  };
}
function weakestTag(){ var st = tagStats(), best = 'grammar', mx = -1; Object.keys(st).forEach(function(k){ var v = st[k].n*2 + st[k].due*3; if (v > mx){ mx = v; best = k; } }); return best; }

/* 复习 / 专项：一题一屏 */
function shuffle(a, s){ var x = a.slice(), seed = s || Date.now(); for (var i = x.length-1; i > 0; i--){ seed = (seed*9301+49297)%233280; var j = Math.floor(seed/233280*(i+1)); var t = x[i]; x[i] = x[j]; x[j] = t; } return x; }
function poolFor(tag){
  var keys = [];
  if (tag === 'grammar'){ Object.keys(G).forEach(function(d){ G[d].quiz.forEach(function(_, i){ keys.push('g:'+d+':'+i); }); }); A.items(A.S.mistakes).forEach(function(n){ keys.push('item:'+n.id); }); }
  if (tag === 'collocation') A.items(A.S.collocations).forEach(function(n){ keys.push(isCloze(n) ? 'cl:'+n.id : 'item:'+n.id); });
  if (tag === 'listening'){ DR.listening.forEach(function(_, i){ keys.push('d:l:'+i); }); LI.forEach(function(s){ s.qs.forEach(function(q, i){ if (q.t === 'mcq') keys.push('q:'+s.id+':'+i); }); }); }
  if (tag === 'reading') RE.forEach(function(s){ s.qs.forEach(function(q, i){ if (q.t !== 'gap') keys.push('q:'+s.id+':'+i); }); });
  if (tag === 'writing'){ DR.writing.forEach(function(_, i){ keys.push('d:w:'+i); }); A.items(A.S.templates).forEach(function(n){ keys.push('item:'+n.id); }); }
  if (tag === 'speaking'){ (DR.speaking||[]).forEach(function(_, i){ keys.push('d:s:'+i); }); A.items(A.S.dialogues).forEach(function(n){ keys.push('item:'+n.id); }); }
  return keys;
}
function startSession(main, mode){
  var keys, title;
  if (mode === 'review'){ keys = dueKeys().slice(0, 30); title = T('今日复习'); }
  else {
    var tag = mode.slice(6); if (!TAGS[tag]) tag = 'grammar';
    var weak = active().filter(function(k){ return srs[k].tag === tag; });
    var rest = shuffle(poolFor(tag).filter(function(k){ return weak.indexOf(k) < 0; }));
    keys = shuffle(weak).slice(0, 6).concat(rest).slice(0, 10); title = T('专项')+' · '+tg(tag);
  }
  session = {keys:keys, i:-1, right:0, done:0, title:title, mode:mode};
  main.innerHTML = '<section class="set-h t-plan">'+A.backHTML('#/archive', T('档案'))+'<p class="mono muted" id="sessN"></p><h1 class="set-title">'+esc(title)+'</h1>'+
    '<div class="sess-bar" id="sessBar">'+keys.map(function(){ return '<i></i>'; }).join('')+'</div></section><div id="sess" class="sess"></div>';
  nextInSession();
}
function nextInSession(){
  var s = session, box = $('sess'); if (!s || !box) return;
  s.i++;
  var bars = document.querySelectorAll('#sessBar i'); [].forEach.call(bars, function(b, i){ b.className = i < s.i ? 'on' : i === s.i ? 'now' : ''; });
  if (!s.keys.length){ box.innerHTML = '<div class="empty"><b>'+T('今天没有到期的条目')+'</b><span>'+T('去做一组专项，或者明天再来。')+'</span><a class="b pri" href="#/archive/drill">'+T('专项训练')+'</a></div>'; $('sessN').textContent = ''; return; }
  if (s.i >= s.keys.length){
    box.innerHTML = '<div class="empty fin"><span class="sc-n">'+s.right+'<small>/'+s.keys.length+'</small></span><b>'+T('这一组完成了')+'</b><span>'+T('错的已经安排到明天；对的按 3/7/14/30 天往后排。')+'</span><div class="row-f"><a class="b pri" href="#/archive" data-back="#/archive">'+T('回到档案')+'</a><a class="b ghost" href="#/archive/'+(s.mode==='review'?'drill':'drill/'+s.mode.slice(6))+'">'+T('再来一组')+'</a></div></div>';
    $('sessN').textContent = T('完成'); session = null; return;
  }
  var key = s.keys[s.i]; $('sessN').textContent = (s.i+1)+' / '+s.keys.length+(srs[key]?' · '+T('第 {n} 级', {n:srs[key].lv+1}):'');
  var x = qByKey(key), html;
  if (key.indexOf('d:s:') === 0 && DR.speaking){ var sp = DR.speaking[+key.split(':')[2]]; x = sp ? {q:{t:'mcq', q:sp.q, o:sp.o, a:sp.a, why:sp.why}, tag:'speaking', src:T('口语表达')} : null; }
  if (x){ html = '<p class="sess-src mono muted">'+esc(x.src||'')+(x.link?' · <a class="lnk" href="'+x.link+'">'+T('原文')+'</a>':'')+'</p>'+qHTML(x.q, key, s.i+1); }
  else html = selfCard(key) || '<p class="muted">'+T('这一条已不存在，跳过。')+'</p>';
  box.innerHTML = html + '<div class="sess-skip"><button class="lnk" type="button" id="skip">'+T('跳过')+'</button></div>';
  $('skip').onclick = nextInSession;
}
/* 口语专项题也能在复习里出现 */
var _qByKey = qByKey;
qByKey = function(key){ if (key.indexOf('d:s:') === 0){ var sp = (DR.speaking||[])[+key.split(':')[2]]; return sp ? {q:{t:'mcq', q:sp.q, o:sp.o, a:sp.a, why:sp.why}, tag:'speaking', src:T('口语表达')} : null; } return _qByKey(key); };

/* ---------- 首页：今日课表块 ---------- */
function homeBlock(){
  var t = today(), db = dayBlocks(t), l = planLog()[t] || {}, m = dayMinutes(t), due = dueKeys().length;
  return '<section class="plan-today"><div class="pt-h"><h2 class="sec-h">'+T('今日学习路径')+' · '+esc(T(db.phase.name))+'</h2><span class="meter mono" data-meter="'+t+'">'+meterHTML(m)+'</span></div>'+
    '<div class="blks">'+db.blocks.map(function(b){ return blockRow(b, t, l); }).join('')+'</div>'+
    '<div class="row-f"><a class="b pri" href="#/course">'+T('打开课表')+'</a><a class="b ghost" href="#/archive/review">'+T('复习 {n} 条到期', {n:due})+'</a><a class="b ghost" href="#/practice">'+T('题库')+'</a></div></section>';
}

window.IELTS_EXT = {
  routes: ROUTES,
  render: function(k, sub, main){ if (timer.id) clearInterval(timer.id); if ('speechSynthesis' in window) speechSynthesis.cancel(); speech.playing = false; session = null;
    if (k === 'course') renderCourse(main); else if (k === 'practice') renderPractice(main, sub); else renderArchive(main, sub); },
  renderGrammarDay: function(main, d){ if (timer.id) clearInterval(timer.id); session = null; renderGrammarDay(main, d); },
  grammarDaysStrip: function(){ return grammarDaysStrip(); },
  practicePath: practicePath,
  fixPairs: fixPairs,
  cardExtra: grammarBadge,
  dayNo: dayNo,
  homeBlock: homeBlock,
  stageCard: stageCard,
  startDate: startDate,
  setStart: function(s){ LS.set('ielts.start', s); buildPhases(); },
  addItem: function(n){ addWeak('item:'+n.id, SEC_TAG[n.sec]||'grammar', n.title || A.strip(n.cells ? n.cells[0].html : n.html).slice(0, 80)); },
  srsToggleHTML: srsToggleHTML,
  wireSrsToggle: wireSrsToggle,
  removeItem: function(id){ return removeWeak('item:'+id); },
  inSrs: function(id){ var r = srs['item:'+id]; return r && !r.done; },
  dueCount: function(){ return dueKeys().length; }
};
};
