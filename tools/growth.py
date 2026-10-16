"""Analytics + SEO/GEO + newsletter for the IELTS study site (idempotent). python3 tools/growth.py"""
import json, os, re, html, subprocess
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(D, '..'); BASE = 'https://siinxu.github.io/ielts-study/'
raw = open(os.path.join(R, 'data.js'), encoding='utf-8').read(); d = json.loads(raw[raw.index('{'):raw.rindex('}') + 1])
S = {s['key']: s for s in d['sections']}; N = sum(s['count'] for s in d['sections'])
c = lambda k: S[k]['count']
LC = ['zh', 'zh-Hant', 'en', 'ja', 'ko', 'es', 'ms', 'vi', 'fr', 'de']
INTRO = {
 'zh': f'免费的雅思自学站，目标总分 7.5（单科保底 6.5），适合自学备考的人：共 {N} 条学习内容（错题记忆 {c("mistakes")}、固定搭配与句式 {c("collocations")}、口语对话 {c("dialogues")}、语法与口音 {c("grammar")}、写作口语模板 {c("templates")}、复习计划 {c("plan")}），另有原创听力、阅读、写作、口语练习和间隔复习。进度只存在你自己的浏览器里，支持 10 种语言。',
 'zh-Hant': f'免費的雅思自學站，目標總分 7.5（單科保底 6.5），適合自學備考的人：共 {N} 條學習內容（錯題記憶 {c("mistakes")}、固定搭配與句式 {c("collocations")}、口語對話 {c("dialogues")}、語法與口音 {c("grammar")}、寫作口語模板 {c("templates")}、複習計畫 {c("plan")}），另有原創聽力、閱讀、寫作、口說練習和間隔複習。進度只存在你自己的瀏覽器裡，支援 10 種語言。',
 'en': f'A free IELTS self-study site aiming at band 7.5 overall (6.5 minimum per skill), for people preparing on their own: {N} study items ({c("mistakes")} common-mistake cards, {c("collocations")} collocations and sentence patterns, {c("dialogues")} speaking dialogues, {c("grammar")} grammar and pronunciation notes, {c("templates")} writing/speaking templates, {c("plan")} plan notes) plus original listening, reading, writing and speaking practice and spaced review. Progress stays in your own browser; 10 languages.',
 'ja': f'IELTS 総合 7.5（各技能 6.5 以上）を目指す独学者向けの無料学習サイト。学習項目 {N} 件（間違いやすい表現 {c("mistakes")}、コロケーションと構文 {c("collocations")}、スピーキング対話 {c("dialogues")}、文法と発音 {c("grammar")}、ライティング・スピーキング用テンプレート {c("templates")}、学習計画 {c("plan")}）に加え、オリジナルのリスニング・リーディング・ライティング・スピーキング練習と間隔復習。進捗はブラウザ内にのみ保存、10 言語対応。',
 'ko': f'IELTS 종합 7.5(영역별 최소 6.5)를 목표로 혼자 준비하는 사람을 위한 무료 학습 사이트입니다. 학습 항목 {N}개(오답 노트 {c("mistakes")}, 연어·문형 {c("collocations")}, 스피킹 대화 {c("dialogues")}, 문법·발음 {c("grammar")}, 라이팅·스피킹 템플릿 {c("templates")}, 학습 계획 {c("plan")})와 오리지널 듣기·읽기·쓰기·말하기 연습, 간격 복습을 제공합니다. 진도는 내 브라우저에만 저장되며 10개 언어를 지원합니다.',
 'es': f'Sitio gratuito para preparar el IELTS por tu cuenta con objetivo de banda 7,5 (mínimo 6,5 por destreza): {N} elementos de estudio ({c("mistakes")} errores frecuentes, {c("collocations")} colocaciones y estructuras, {c("dialogues")} diálogos orales, {c("grammar")} notas de gramática y pronunciación, {c("templates")} plantillas de writing/speaking, {c("plan")} notas de plan) más práctica original de listening, reading, writing y speaking y repaso espaciado. El progreso se guarda solo en tu navegador; 10 idiomas.',
 'ms': f'Laman belajar IELTS sendiri secara percuma dengan sasaran band 7.5 (minimum 6.5 setiap kemahiran): {N} item pembelajaran ({c("mistakes")} kesilapan lazim, {c("collocations")} kolokasi dan pola ayat, {c("dialogues")} dialog lisan, {c("grammar")} nota tatabahasa dan sebutan, {c("templates")} templat penulisan/lisan, {c("plan")} nota rancangan) serta latihan asli mendengar, membaca, menulis dan bertutur dan ulang kaji berjarak. Kemajuan disimpan dalam pelayar anda sahaja; 10 bahasa.',
 'vi': f'Trang tự học IELTS miễn phí, mục tiêu band 7.5 (tối thiểu 6.5 mỗi kỹ năng): {N} mục học ({c("mistakes")} lỗi thường gặp, {c("collocations")} cụm từ và mẫu câu, {c("dialogues")} hội thoại nói, {c("grammar")} ghi chú ngữ pháp và phát âm, {c("templates")} mẫu viết/nói, {c("plan")} ghi chú kế hoạch) cùng bài luyện nghe, đọc, viết, nói nguyên bản và ôn tập ngắt quãng. Tiến độ chỉ lưu trong trình duyệt của bạn; 10 ngôn ngữ.',
 'fr': f'Site gratuit pour préparer l’IELTS en autonomie, objectif 7,5 global (6,5 minimum par compétence) : {N} fiches ({c("mistakes")} erreurs fréquentes, {c("collocations")} collocations et tournures, {c("dialogues")} dialogues oraux, {c("grammar")} notes de grammaire et prononciation, {c("templates")} modèles writing/speaking, {c("plan")} notes de planning), plus des exercices originaux d’écoute, lecture, écriture et oral et une révision espacée. La progression reste dans votre navigateur ; 10 langues.',
 'de': f'Kostenlose IELTS-Selbstlernseite mit Ziel Band 7,5 (mindestens 6,5 je Fertigkeit): {N} Lerneinträge ({c("mistakes")} typische Fehler, {c("collocations")} Kollokationen und Satzmuster, {c("dialogues")} Sprechdialoge, {c("grammar")} Grammatik- und Aussprachenotizen, {c("templates")} Writing-/Speaking-Vorlagen, {c("plan")} Plannotizen) plus eigene Hör-, Lese-, Schreib- und Sprechübungen und verteilte Wiederholung. Der Fortschritt bleibt in deinem Browser; 10 Sprachen.'}
e = html.escape
# default HTML is English (served to every locale before JS picks the language); zh text lives only in JS / ?lang=zh
SEC_EN = {'plan': 'Study Plan', 'grammar': 'Grammar & Accent', 'dialogues': 'Conversations', 'templates': 'Templates', 'collocations': 'Collocations', 'mistakes': 'Mistake Log'}
ssr = ('<!--IA--><section class="ssr-index" style="max-width:860px;margin:0 auto;padding:24px 20px"><h1>IELTS 7.5 Study Site</h1>'
       f'<p>{e(INTRO["en"])}</p><h2>Sections</h2><ul>'
       + ''.join(f'<li>{e(SEC_EN.get(s["key"], s["key"]))} — {s["count"]}</li>' for s in d['sections']) + '</ul></section><!--/IA-->')
cfg = {'root': R, 'base': BASE, 'name': 'IELTS 7.5 study site', 'site': 'ielts', 'cf_token': '41d8abdb6f1247c08f2412afcd5f2143', 'goal': 'copy', 'og_image': 'og.png', 'hreflang': True, 'locales': LC,
       'subcss_path': os.path.join(D, 'subscribe.css'), 'intro': INTRO, 'lang_alias': {'zh': ['zh-CN', 'zh-Hans']}, 'intro_after': '</header>', 'intro_fallback': 'en', 'desc': INTRO['en'],
       'intro_css': 'max-width:1080px;margin:12px auto 0;padding:0 20px;font-size:12.5px;line-height:1.55;opacity:.72',
       'sub_before': '<nav class="bottom"', 'sub_css': 'max-width:860px;margin:28px auto 96px;padding:0 20px;--ie-acc:var(--acc);--ie-acc-ink:#fff',
       'pages': [{'file': 'index.html', 'rel': '', 'title': 'IELTS 7.5 Study Site · free band 7.5 self-study',
                  'ld': [{'@type': 'WebApplication', 'name': 'IELTS 7.5 study site', 'url': BASE, 'applicationCategory': 'EducationalApplication', 'operatingSystem': 'Web', 'isAccessibleForFree': True, 'inLanguage': LC, 'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'USD'}, 'publisher': {'@id': 'https://incidental.site/#org'}, 'description': INTRO['en']}]}]}
llms = f'# IELTS 7.5 study site\n> {INTRO["en"]}\n\n- Site: {BASE}\n- Languages: {", ".join(LC)} (append ?lang=<code>)\n- Publisher: Incidental AI (https://incidental.site/)\n- Full outline: {BASE}llms-full.txt\n\n## Sections\n' + ''.join(f'- {SEC_EN.get(s["key"], s["key"])} ({s["key"]}): {s["count"]} items\n' for s in d['sections'])
cfg['llms.txt'] = llms
cfg['llms-full.txt'] = llms + '\n## Overview in other languages\n' + ''.join(f'- {k}: {v}\n' for k, v in INTRO.items() if k in ('en', 'es', 'fr', 'de', 'ms', 'vi', 'ko'))
p = '/tmp/ielts-ia.json'; json.dump(cfg, open(p, 'w'), ensure_ascii=False)
subprocess.run(['python3', os.path.join(D, 'ia_inject.py'), p], check=True)
ip = os.path.join(R, 'index.html'); s = open(ip, encoding='utf-8').read()
s = re.sub(r'<!--IA--><section class="ssr-index".*?<!--/IA-->', '', s, flags=re.S)
s = s.replace('<main id="main"></main>', '<main id="main">' + ssr + '</main>', 1)
open(ip, 'w', encoding='utf-8').write(s); print('growth ok')
