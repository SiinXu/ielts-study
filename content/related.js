/* v5g 详情抽屉「举一反三」渲染器
   - 模板：content/related-tpl.js 按「用途」（表格第一格）或条目 id 取池 → 句式块（何时用 / 何时不用 / 例句 + 示范场景）+ 近义句式 + 对比句式 + 迁移提示
   - 错题：content/related-mis.js 40 个规则池；classify() 按小节编号 + 原因关键词把 489 条映射到规则键，
           抽屉里显示：错句/正句各自的示范场景、规则（何时适用 / 常见误用）、同规则 3–4 组类比、迁移提示、站内同类条目 */
(function(){
var I = window.I18N || {lang:'zh', t:function(s){return s;}, add:function(){}};
var LANG = I.lang;
function T(s, v){ return I.t(s, v); }
function L(p){ return !p ? '' : (LANG === 'zh' ? p[0] : (p[1] || p[0])); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
function strip(h){ return String(h||'').replace(/<br\s*\/?>/g,' ').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim(); }
function hash(s){ var h = 0; for (var i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }

/* 示范场景：zh, en, ja, ko, es, ms */
var SCENE = {
 t2i:['Task 2 开头段 · 亮明立场','Task 2 intro · stating your position','Task 2 序論 · 立場を示す','Task 2 서론 · 입장 밝히기','Task 2 introducción · tu postura','Task 2 pengenalan · nyatakan pendirian'],
 t2b:['Task 2 论证段首句','Task 2 body · topic sentence','Task 2 本論 · 主題文','Task 2 본론 · 주제문','Task 2 cuerpo · frase temática','Task 2 isi · ayat topik'],
 t2e:['Task 2 论证段 · 展开解释','Task 2 body · explaining the point','Task 2 本論 · 説明','Task 2 본론 · 설명','Task 2 cuerpo · desarrollo','Task 2 isi · huraian'],
 t2x:['Task 2 论证段 · 举例','Task 2 body · giving an example','Task 2 本論 · 具体例','Task 2 본론 · 예시','Task 2 cuerpo · ejemplo','Task 2 isi · contoh'],
 t2o:['Task 2 让步 / 反方观点','Task 2 · the other side / concession','Task 2 · 譲歩・反対意見','Task 2 · 양보 / 반대 의견','Task 2 · concesión / otra postura','Task 2 · konsesi / pandangan lain'],
 t2c:['Task 2 结尾段','Task 2 conclusion','Task 2 結論','Task 2 결론','Task 2 conclusión','Task 2 kesimpulan'],
 t1i:['Task 1 开头 · 改写题目','Task 1 intro · paraphrasing','Task 1 導入 · 言い換え','Task 1 도입 · 패러프레이즈','Task 1 introducción · parafrasear','Task 1 pengenalan · parafrasa'],
 t1o:['Task 1 概述段 (Overview)','Task 1 overview','Task 1 概要','Task 1 개요','Task 1 visión general','Task 1 gambaran keseluruhan'],
 t1d:['Task 1 主体段 · 描述数据','Task 1 body · describing figures','Task 1 本文 · データ描写','Task 1 본문 · 수치 묘사','Task 1 cuerpo · describir datos','Task 1 isi · huraikan data'],
 t1p:['Task 1 流程图 / 地图','Task 1 process or map','Task 1 プロセス図・地図','Task 1 과정도 / 지도','Task 1 proceso o mapa','Task 1 proses atau peta'],
 p1:['口语 Part 1 · 日常问答','Speaking Part 1 · everyday question','スピーキング Part 1 · 日常の質問','스피킹 Part 1 · 일상 질문','Speaking Part 1 · pregunta cotidiana','Speaking Part 1 · soalan harian'],
 p1w:['口语 Part 1 · 讲工作 / 学习','Part 1 · talking about work or study','Part 1 · 仕事・勉強の話','Part 1 · 일 / 공부 이야기','Part 1 · hablar del trabajo o estudios','Part 1 · bercakap tentang kerja / belajar'],
 p2s:['口语 Part 2 · 开头第一句','Part 2 · opening line','Part 2 · 最初の一文','Part 2 · 첫 문장','Part 2 · frase inicial','Part 2 · ayat pembuka'],
 p2:['口语 Part 2 · 讲经历','Part 2 · telling a story','Part 2 · 経験を話す','Part 2 · 경험 이야기','Part 2 · contar una experiencia','Part 2 · menceritakan pengalaman'],
 p3:['口语 Part 3 · 讨论社会话题','Part 3 · discussing society','Part 3 · 社会的な話題','Part 3 · 사회 주제 토론','Part 3 · tema social','Part 3 · isu masyarakat'],
 p3f:['口语 Part 3 · 预测未来','Part 3 · predicting the future','Part 3 · 将来の予測','Part 3 · 미래 예측','Part 3 · predecir el futuro','Part 3 · meramal masa depan'],
 rs:['口语卡壳救场','Speaking · when you get stuck','スピーキング · 詰まった時','스피킹 · 막혔을 때','Speaking · cuando te bloqueas','Speaking · bila tersekat'],
 cw:['职场对话 / 开会','Workplace chat or meeting','職場の会話・会議','직장 대화 / 회의','Conversación de trabajo / reunión','Perbualan kerja / mesyuarat'],
 em:['工作邮件','Work email','仕事のメール','업무 이메일','Correo de trabajo','E-mel kerja'],
 dl:['日常闲聊','Everyday small talk','日常の雑談','일상 대화','Charla cotidiana','Sembang harian'],
 sv:['点单 / 办事','Ordering or running errands','注文・用事','주문 / 볼일','Pedir o hacer trámites','Memesan / urusan'],
 ls:['听力填空','Listening gap-fill','リスニング穴埋め','리스닝 빈칸','Listening · completar huecos','Listening · isi tempat kosong'],
 rd:['阅读判断题','Reading T/F/NG','リーディング T/F/NG','리딩 T/F/NG','Reading V/F/NG','Reading T/F/NG'],
 sp:['拼写自查','Spelling check','スペルチェック','철자 점검','Revisión ortográfica','Semakan ejaan'],
 pr:['朗读 / 发音练习','Reading aloud / pronunciation','音読・発音練習','소리 내어 읽기 / 발음','Lectura en voz alta / pronunciación','Bacaan kuat / sebutan'],
 gt:['培训类书信 (GT)','General Training letter','GT 手紙','GT 편지','Carta General Training','Surat General Training']
};
var LI = {zh:0,en:1,ja:2,ko:3,es:4,ms:5};
function scene(k){ var s = SCENE[k]; return s ? (s[LI[LANG]] || s[1]) : ''; }

/* 界面标签翻译 */
var LBL = {
 '何时用':['When to use','使う場面','쓸 때','Cuándo usarlo','Bila guna'],
 '何时不用':['When not to use','使わない場面','쓰지 않을 때','Cuándo no usarlo','Bila jangan guna'],
 '示范场景':['Scenario','使用場面','예시 상황','Escenario','Senario'],
 '用途':['Function','用途','용도','Función','Fungsi'],
 '句式':['Patterns','構文','구문','Estructuras','Struktur'],
 '结构拆解':['Structure, move by move','構成の分解','구조 분해','Estructura paso a paso','Struktur langkah demi langkah'],
 '原文模板':['Original template','元のテンプレート','원문 템플릿','Plantilla original','Templat asal'],
 '举一反三 · 同功能近义句式':['Go further · similar patterns','応用 · 同じ機能の類似表現','응용 · 같은 기능의 비슷한 표현','Ve más allá · estructuras similares','Lanjutan · struktur serupa'],
 '迁移提示':['Transfer tip','応用のコツ','응용 팁','Consejo para transferir','Tip pemindahan'],
 '{a} 个句式 · {b} 个近义 · 1 个对比 · {c} 个例句':['{a} patterns · {b} similar · 1 contrast · {c} examples','構文 {a} · 類似 {b} · 対比 1 · 例文 {c}','구문 {a} · 유사 {b} · 대비 1 · 예문 {c}','{a} estructuras · {b} similares · 1 contraste · {c} ejemplos','{a} struktur · {b} serupa · 1 kontras · {c} contoh'],
 '常见于':['Typical slip in','よく出る場面','자주 틀리는 상황','Error típico en','Kesilapan biasa dalam'],
 '正确用于':['Correct in','正しく使う場面','올바른 사용','Correcto en','Betul dalam'],
 '规则':['Rule','ルール','규칙','Regla','Peraturan'],
 '何时适用':['When the rule applies','ルールが当てはまる時','규칙이 적용될 때','Cuándo se aplica','Bila peraturan terpakai'],
 '常见误用':['How people misuse it','よくある誤用','흔한 오용','Cómo se usa mal','Salah guna biasa'],
 '举一反三 · 同规则 {n} 例':['Go further · {n} more on this rule','応用 · 同じルールの例 {n}','응용 · 같은 규칙 {n}개','Ve más allá · {n} casos de la misma regla','Lanjutan · {n} contoh peraturan sama'],
 '站内同类条目':['Related entries on this site','サイト内の関連項目','사이트 내 관련 항목','Entradas relacionadas','Entri berkaitan'],
 '原因':['Reason','理由','이유','Motivo','Sebab']
};
(function(){ var langs = ['en','ja','ko','es','ms']; langs.forEach(function(l, i){ var o = {}; for (var k in LBL) o[k] = LBL[k][i]; I.add(l, o); }); })();

/* ---------- 模板 ---------- */
function tplKey(n){
  var P = window.IELTS_REL_TPL || {};
  if (P[n.id]) return n.id;
  if (n.cells && n.cells[0]){ var k = strip(n.cells[0].html); if (P[k]) return k; }
  return null;
}
function block(b, i){
  return '<article class="rx-b">'+
    '<div class="rx-p en"><span class="rx-i mono">'+(i<9?'0':'')+(i+1)+'</span><span>'+esc(b.p)+'</span></div>'+
    '<div class="rx-wn">'+
      '<div class="rx-w"><b>✓ '+T('何时用')+'</b><span>'+esc(L(b.w))+'</span></div>'+
      '<div class="rx-n"><b>✗ '+T('何时不用')+'</b><span>'+esc(L(b.n))+'</span></div>'+
    '</div>'+
    '<ol class="rx-ex">'+b.ex.map(function(e){
      return '<li><p class="en">'+esc(e[0])+'</p><span class="rx-sc"><i aria-hidden="true"></i>'+T('示范场景')+' · '+esc(scene(e[1]))+'</span></li>';
    }).join('')+'</ol></article>';
}
function renderTpl(n, A){
  var k = tplKey(n); if (!k) return '';
  var p = window.IELTS_REL_TPL[k], rich = !n.cells;
  var fn = p.fn ? L(p.fn) : (n.cells ? strip(n.cells[0].html) : (n.title || ''));
  if (!p.fn && LANG !== 'zh') fn = T(fn);
  var nex = 0; p.main.concat(p.near, [p.contrast.b]).forEach(function(b){ nex += b.ex.length; });
  var h = '<div class="rx rx-tpl">'+
    '<header class="rx-hd"><span class="rx-k">'+T('用途')+'</span><h2 class="rx-fn">'+esc(fn)+'</h2>'+
    '<p class="rx-meta mono">'+esc(T('{a} 个句式 · {b} 个近义 · 1 个对比 · {c} 个例句', {a:p.main.length, b:p.near.length, c:nex}))+'</p></header>';
  if (rich) h += '<section class="rx-sec"><h3 class="rx-h">'+T('原文模板')+'</h3><div class="rx-src rich d-rich">'+(A.fx ? A.fx(n.html) : n.html)+'</div></section>';
  h += '<section class="rx-sec"><h3 class="rx-h">'+T(rich ? '结构拆解' : '句式')+' <span class="mono">'+p.main.length+'</span></h3>'+p.main.map(block).join('')+'</section>';
  h += '<section class="rx-sec rx-near"><h3 class="rx-h">'+T('举一反三 · 同功能近义句式')+' <span class="mono">'+p.near.length+'</span></h3>'+p.near.map(function(b,i){ return block(b, p.main.length+i); }).join('')+'</section>';
  h += '<section class="rx-sec rx-con"><h3 class="rx-h">'+esc(L(p.contrast.lab))+'</h3>'+block(p.contrast.b, p.main.length+p.near.length)+'</section>';
  h += '<p class="rx-tip"><b>'+T('迁移提示')+'</b><span>'+esc(L(p.tip))+'</span></p>';
  return h + '</div>';
}

/* ---------- 错题 ---------- */
function secNo(n){ var m = String(n.h2||'').match(/^(\d+)\./); return m ? +m[1] : 0; }
function classify(n){
  var c = secNo(n), t = (n.cells||[]).map(function(x){ return strip(x.html); }).join(' | ');
  var why = n.cells && n.cells.length ? strip(n.cells[n.cells.length-1].html) : '';
  function has(re){ return re.test(t); }
  switch (c){
    case 1:
      if (/since|during|while/i.test(t)) return 'timeprep';
      if (/冠词|不加 the|most 前/.test(why)) return 'article';
      if (/连字符|years 后/.test(why)) return 'number';
      if (/条件句|when 引导/.test(why)) return 'cond';
      if (/不可数|news|fewer/.test(t)) return 'count';
      if (/第三人称|单数|复数|police/.test(why)) return 'agree';
      if (/过去时|完成时/.test(why)) return 'tense';
      if (/比较级/.test(why)) return 'compare';
      if (/被动|不及物/.test(why)) return 'passive';
      if (/语序/.test(why)) return 'order';
      if (/-ed|感受|boring/.test(why)) return 'adjed';
      if (/very|almost|hardly|几乎不/.test(why)) return 'modifier';
      if (/直接接宾语|不加介词|despite/.test(why)) return 'prepzero';
      if (/介词该加/.test(why)) return 'prep';
      if (/doing|原形|sb to do|tell|agree 本身|used to/.test(why)) return 'verbpat';
      if (/married|prefer/.test(t)) return 'prep';
      if (/years|year-old/.test(t)) return 'number';
      if (/中式|直译/.test(why)) return 'chinglish';
      if (/只用一个|只能用一个/.test(why)) return 'double';
      return 'clause';
    case 2:
      if (/不可数/.test(why)) return 'count';
      if (/very/.test(why)) return 'modifier';
      if (/重复|return 本身/.test(why)) return 'double';
      if (/discuss/.test(why)) return 'verbpat';
      if (/质疑|催|称呼|礼貌|生硬|道歉/.test(why)) return 'polite';
      if (/直译|中文|吃饭|eat rice|不等于/.test(t)) return 'chinglish';
      if (/搭配|用 take|用 improve|用 read|用 speak|turn on|borrow|high|接游戏|固定说法|电器/.test(t)) return 'colloc';
      return 'chinglish';
    case 3:
      if (/字数|编造|先写/.test(t)) return 'wstruct';
      if (/拼写/.test(t)) return 'spell';
      if (/标点|大写/.test(t)) return 'punct';
      if (/缩写|口语|正式|套话|问句|第二人称|you 泛指|etc/.test(t)) return 'register';
      if (/^✗ 小作文/.test(t)) return 't1chart';
      return 'wstruct';
    case 4: case 24:
      if (/多样性|单调|very good/.test(t)) return 'variety';
      if (/时态|现在时/.test(t)) return 'tense';
      return 'speak';
    case 5: return 'exam';
    case 6: return 'confuse';
    case 7: case 20:
      if (/不发音/.test(t)) return 'silent';
      if (/重音/.test(t)) return 'stress';
      if (/地名/.test(t)) return 'place';
      if (/英美差异/.test(t)) return 'brame';
      if (/AI 行业|职场常用|租房/.test(t)) return 'tech';
      return 'pron';
    case 8: return 'culture';
    case 9:
      if (/since|until|by 是/.test(t)) return 'timeprep';
      if (/wish|虚拟/.test(t)) return 'cond';
      if (/用单数/.test(why)) return 'agree';
      if (/reason|because 和/.test(t)) return 'double';
      if (/keep/.test(t)) return 'verbpat';
      if (/过去时/.test(why)) return 'tense';
      return 'clause';
    case 10:
      if (/星期|日期|钟点|on time|in time|at the end|weekend|by bus|by 后/.test(t)) return 'timeat';
      return 'prep';
    case 11: return /介词/.test(why) ? 'prep' : 'colloc';
    case 12: return 'article';
    case 13:
      if (/because 和 so/.test(why)) return 'double';
      if (/百分比|阿拉伯数字|句首不用/.test(why)) return 'number';
      return 'punct';
    case 14: return 'brame';
    case 15: return 'number';
    case 16: return 'email';
    case 17: return /幅度|副词/.test(why) ? 't1chart' : 'register';
    case 18:
      if (/very/.test(why)) return 'modifier';
      if (/礼貌|直接问|打探|身材|请求|点单|当成|祈使/.test(why)) return 'polite';
      if (/wait 后接 for|pick up/.test(why)) return 'prep';
      if (/there 前/.test(why)) return 'prepzero';
      if (/because 后/.test(why)) return 'clause';
      if (/do 后要有宾语/.test(why)) return 'verbpat';
      if (/重复/.test(why)) return 'double';
      return 'chinglish';
    case 19: return 'synonym';
    case 21: return 'spell';
    case 22: return 't1chart';
    case 23:
      if (/两个谓语/.test(why)) return 'clause';
      if (/不可数/.test(why)) return 'count';
      return 'work';
  }
  return 'chinglish';
}
var KEYS = null;   // 规则键 → 条目 id 列表
function buildIndex(A){
  KEYS = {};
  A.items(A.S.mistakes).forEach(function(n){ var k = classify(n); n.rk = k; (KEYS[k] = KEYS[k] || []).push(n.id); });
  return KEYS;
}
function sceneLine(lab, k){ return '<span class="rx-sc"><i aria-hidden="true"></i>'+T(lab)+' · '+esc(scene(k))+'</span>'; }
function misPair(n, r, A){
  var k = A.kind(n);
  if (k !== 'mis'){
    return '<div class="d-cells card k-'+k+' t-mistakes"><div class="card-in">'+A.cellsHTML(n)+'</div></div>'+
      '<div class="rx-scs">'+sceneLine('常见于', r.sb)+sceneLine('正确用于', r.sg)+'</div>';
  }
  var h = '<div class="d-cells card k-mis t-mistakes"><div class="card-in">';
  n.cells.forEach(function(c){
    var cl = c.cls.indexOf('err')>=0 ? 'bad' : c.cls.indexOf('ok')>=0 ? 'good' : 'why';
    var v = c.html; if (cl !== 'why') v = v.replace(/^\s*[✗✓]\s*/, '');
    if (cl === 'good') v = '<span class="hl">'+v+'</span>';
    h += '<div class="m '+cl+'">'+(cl==='why'?'<span class="lab">'+esc(T(c.label||'原因'))+'</span>':'<span class="mk">'+(cl==='bad'?'✗':'✓')+'</span>')+'<div class="v">'+v+'</div></div>';
    if (cl === 'bad') h += '<div class="rx-scrow">'+sceneLine('常见于', r.sb)+'</div>';
    if (cl === 'good') h += '<div class="rx-scrow">'+sceneLine('正确用于', r.sg)+'</div>';
  });
  return h + '</div></div>';
}
function renderMis(n, A){
  var R = window.IELTS_REL_MIS || {};
  if (!KEYS) buildIndex(A);
  var key = n.rk || classify(n), r = R[key]; if (!r) return '';
  var own = strip((n.cells||[]).map(function(c){ return c.html; }).join(' ')).toLowerCase();
  var pool = r.ex.filter(function(e){ return own.indexOf(e[0].toLowerCase()) < 0; });
  var want = pool.length >= 5 ? 4 : Math.min(3, pool.length), st = hash(n.id) % pool.length, an = [];
  for (var i=0; i<want; i++) an.push(pool[(st+i) % pool.length]);
  var sib = (KEYS[key] || []).filter(function(id){ return id !== n.id; });
  var so = sib.length ? hash(n.id+'s') % sib.length : 0, sibs = [];
  for (var j=0; j<Math.min(3, sib.length); j++) sibs.push(sib[(so+j) % sib.length]);
  var h = '<div class="rx rx-mis">' + misPair(n, r, A);
  h += '<section class="rx-sec rx-rule"><h3 class="rx-h">'+T('规则')+' · '+esc(L(r.name))+'</h3><div class="rx-wn">'+
    '<div class="rx-w"><b>✓ '+T('何时适用')+'</b><span>'+esc(L(r.app))+'</span></div>'+
    '<div class="rx-n"><b>✗ '+T('常见误用')+'</b><span>'+esc(L(r.mis))+'</span></div></div></section>';
  h += '<section class="rx-sec"><h3 class="rx-h">'+esc(T('举一反三 · 同规则 {n} 例', {n:an.length}))+'</h3><ol class="rx-an">'+an.map(function(e){
    return '<li><div class="a-bad en"><span class="mk">✗</span><s>'+esc(e[0])+'</s></div><div class="a-good en"><span class="mk">✓</span><span>'+esc(e[1])+'</span></div>'+sceneLine('示范场景', e[2])+'</li>';
  }).join('')+'</ol></section>';
  h += '<p class="rx-tip"><b>'+T('迁移提示')+'</b><span>'+esc(L(r.tip))+'</span></p>';
  if (sibs.length) h += '<section class="rx-sec rx-sibs"><h3 class="rx-h">'+T('站内同类条目')+' <span class="mono">'+sib.length+'</span></h3><div class="rx-sib">'+sibs.map(function(id){
    var m = A.byId[id], g = (m.cells||[]).filter(function(c){ return c.cls.indexOf('ok')>=0; })[0] || m.cells[0];
    return '<button type="button" class="rx-sl en" data-rel="'+id+'">'+esc(strip(g.html).replace(/^✓\s*/,''))+'</button>';
  }).join('')+'</div></section>';
  return h + '</div>';
}

window.IELTS_REL = {
  has: function(n){ return n && (n.sec === 'templates' ? !!tplKey(n) : n.sec === 'mistakes'); },
  render: function(n, A){ return n.sec === 'templates' ? renderTpl(n, A) : n.sec === 'mistakes' ? renderMis(n, A) : ''; },
  classify: classify, buildIndex: buildIndex, tplKey: tplKey, scene: scene,
  stats: function(A){ if (!KEYS) buildIndex(A); var o = {}; for (var k in KEYS) o[k] = KEYS[k].length; return o; }
};
})();
