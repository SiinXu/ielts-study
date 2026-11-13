# 雅思站听力音频改造（2026-11-13，网页工坊）

需求来源：总管转述 Siin（2026-11-13）。本分支只开 PR 和预览，**不合并、不部署正式站**。

## 1. 设计说明
- 目标一：站内不托管任何受版权保护的官方音频。
- 目标二：给官方免费听力样题做站内导航，只外链。
- 目标三：站内 24 套原创脚本换成自然的多口音合成录音。
- 视觉不新造。外链清单直接用练习页现有的 `.set` 行（整行是一个 `<a>`，可点区域就是整行）、`.tag`、`.note`、`.chip`、`.sec-h`。
- 入口放在练习页的标签栏里，加一个「官方样题」标签（`#/practice/official`）。不加抽屉，不加弹窗。
- 分组按「题型样题 / 整套机考 / 分级听力 / 考试说明」。顶部一排 `.chip` 跳到各组。
- 每行左边写来源（IELTS / BC / IDP），右边写考试类型（学术类 / 培训类 / 两类通用）和形式（机考 / 纸笔 / 网页）＋ ↗。
- 外链都 `target=_blank rel=noopener`，aria-label 写明「新标签页打开」。
- 播放器外观不变：同一个「播放全文」按钮、0.8/0.9/1× 语速、盲听 / 先读再听、点句从那句开始。只是声音来源从浏览器朗读换成 mp3。
- 播放器说明行写出口音和「合成语音，非真人、非官方录音」。列表每套后面加口音。
- 音频失败时自动回退浏览器朗读，并提示一次。

## 2. 音频盘点（改动前）
用 `find` 和 `git log --all --diff-filter=A` 查了工作区和全部历史。

| 位置 | 来源 | 结论 |
|---|---|---|
| 仓库里的音频文件（mp3/m4a/ogg/opus/wav/aac/webm/flac） | 无 | 当前和历史都是 0 个 |
| 指向官方或剑桥音频的链接 | 无 | 全站外链只有 stats、Cloudflare beacon 和自己的域名 |
| 听力 24 套（`content/listening*.js`） | 浏览器 Web Speech API 现场朗读 | 原创脚本，不是剑桥真题；不托管文件 |
| 单词卡朗读（`words.js`） | 浏览器 Web Speech API | 不托管文件，未改 |
| 口语录音（`study.js` toggleRecord） | 用户自己麦克风，本页内存 | 不上传不保存，未改 |

**删除清单：没有需要删除的官方或剑桥音频文件（一个都不存在）。** 本次换掉的是听力 24 套的主播放源：浏览器朗读 → 本站自己生成的合成 mp3（浏览器朗读只留作回退）。旧提示「真人录音版待补」已去掉。

## 3. 官方免费样题外链
核验：`tools/check_official_links.sh`（curl 跟随跳转，要求 200；先默认 UA，再浏览器 UA）。核验时间 2026-11-13 约 06:40 美东。

| 分组 | 来源 | 链接 | 结果 |
|---|---|---|---|
| 题型样题 | IELTS | https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test | 200 |
| 题型样题 | IELTS | https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test | 200 |
| 题型样题 | BC | https://takeielts.britishcouncil.org/prepare/ielts-free-practice-mock-tests/academic/listening | 机房 IP 被拦（curl 403，浏览器 UA 和无头 Chrome 都断开）；外部网络抓取正常，标题「IELTS Academic listening practice tests」 |
| 题型样题 | IDP | https://ielts.idp.com/prepare/free-practice-tests/listening | 200 |
| 题型样题 | IELTS | https://cdn.ielts.org/Sample-tests/ielts-listening-sample-tasks-2023.pdf | 200 |
| 整套机考 | IDP | https://ielts.idp.com/about/ielts-familiarisation-tests | 200 |
| 整套机考 | IELTS | https://ielts.org/take-a-test/preparation-resources/sample-test-questions | 200 |
| 分级听力 | BC | https://learnenglish.britishcouncil.org/skills/listening | 同 BC：机房 IP 403；外部网络抓取正常，A1–C1 分级页 |
| 考试说明 | IELTS | https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening | 200（首轮偶发 503，重试 3 次都是 200） |
| 考试说明 | IDP | https://ielts.idp.com/about/ielts-listening | 200 |

已剔除：
- `takeielts…/general-training/listening`：外部抓取被跳回 BC 首页，不是练习页。
- `takeielts…/take-ielts/prepare/free-ielts-practice-tests/listening`：跳到上面的 academic/listening，重复。
- `ielts.org/…/life-skills-sample-questions`：两次 503，且是 UKVI Life Skills，不是主考试。
- IDP 播客页：不是练习题。

埋点：events.js 对站外链接自动发 `outbound_click`（带 host 和 path），白名单里已有。所以没加 `data-evt`，加了会重复上报。

## 4. TTS 选型和费用
**用的方案：开源模型，本机 CPU 离线生成，静态 mp3 跟站点一起托管。费用 0。**

| 口音 | 引擎 | 许可 | 用到的音色 |
|---|---|---|---|
| 英式 GB | Kokoro-82M（kokoro-onnx v1.0） | Apache-2.0 | 女 bf_emma、bf_isabella、bf_alice；男 bm_george、bm_fable、bm_daniel |
| 美式 US | Kokoro-82M | Apache-2.0 | 女 af_heart、af_sarah、af_bella；男 am_puck、am_adam、am_fenrir |
| 澳式 AU | MeloTTS English，speaker EN-AU | MIT | 1 个女声（基频约 213 Hz） |

- 分配：GB 8 套、AU 8 套、US 8 套，Part 1–4 都有三种口音。对话两人一男一女，音色不同。
- MeloTTS 只有 1 个澳式声音，所以澳式对话（L02、L09、L14、L20）是「澳式女声 + 英式或美式男声」。雅思真题里混合口音也常见。
- 发音处理只改朗读文本，屏幕上的原文不变：拼读 H-A-R-L-O-W 逐个字母读，电话号码按位读（oh seven seven…），£35 读成 35 pounds，3B、LP2075、OK 单独处理。
- 文件：单声道 24 kHz、48 kbps MP3，每套 45–87 秒、263–523 KB，24 套共 8.9 MB。
- 每句开始时间写进 `content/listening-audio.js`，用来逐句高亮、点句跳转。语速用 `playbackRate`（保持音高）。
- 选型时淘汰：Piper（只有 en_GB / en_US，没有澳式）；Coqui XTTS-v2（CPML 非商用许可）。
- 生成脚本：`tools/tts_build.py`，可重复跑。

客观质量检查（UTMOS22 自然度预测，满分 5，每套逐句平均）：见第 6 节表格，24 套都在 4.1 以上。
候选音色单句打分：af_heart 4.53、MeloTTS EN-AU 4.52、af_sarah 4.52、am_puck 4.50、am_adam 4.49、bf_alice 4.44、bf_isabella 4.43、bf_emma 4.42、bm_george 4.31；bm_lewis 4.14、af_nicole 3.15 被淘汰。

付费方案（**没有用，只供 Siin 决定**；价格来自厂商官网定价页，2026-11-13 读取）。全站 24 套脚本约 22,819 个字符：
- Google Cloud TTS Chirp 3: HD（有 en-AU 多个声音）：每月前 100 万字符免费，之后 US$30 / 100 万字符。本站一次生成在免费额度内，约 0 元；超额时约 US$0.68。需要开 Google Cloud 结算账户。
- Google Neural2：每月前 100 万字符免费，之后 US$16 / 100 万字符（约 US$0.37）。
- ElevenLabs API：v4 / v3 / Multilingual v2 每 1,000 字符 US$0.08（约 US$1.83）；Flash / Turbo 每 1,000 字符 US$0.04（约 US$0.91）。需要注册账户。
- 结论：开源方案的澳式只有 1 个声音。如果 Siin 想要多个澳式声音（比如澳式男声），可以考虑 Google Chirp 3: HD，一次性成本在免费额度内。

## 5. 改动文件
- `audio/listening/L01–L24.mp3`（新增）
- `content/listening-audio.js`（新增，时间轴和音色）
- `content/listening-official.js`（新增，外链清单）
- `study.js`：`playFrom()` / `stopListening()`、新标签 `official`、`officialList()`；离开页面时停止音频
- `study.css`：`.chips a.chip` 触屏高度 36px、分组锚点留白
- `i18n/*.js`：32 条新文案 × 9 种语言（zh 为源语言）；源文件 `tools/i18n-src/tr_listening_audio.json`
- `i18n/core.js`、`index.html`：版本号 v=12，引入两个新数据文件
- `tools/tts_build.py`、`tools/check_official_links.sh`、`tools/verify_listening_audio.py`
- `README.md`、`content/listening.js` 注释

## 6. 验证
见 PR 描述和下面的结果（`tools/verify_listening_audio.py`，Playwright + 系统 Chrome，屏蔽了 stats 和 Cloudflare beacon，不污染统计）。

### 6.1 音频质量（每套逐句）
| 套 | 口音 | 说话人 → 音色 | 时长 | UTMOS | 逐句 ASR 词错率* |
|---|---|---|---|---|---|
| L01 | GB | A=bm_george, B=bf_emma | 80s | 4.24 | 0.234 |
| L02 | AU | A=bm_daniel, B=MeloTTS EN-AU | 69s | 4.35 | 0.147 |
| L03 | GB | A=bf_emma | 61s | 4.35 | 0.062 |
| L04 | AU | A=MeloTTS EN-AU | 54s | 4.51 | 0.07 |
| L05 | US | A=af_heart, B=am_puck | 66s | 4.47 | 0.181 |
| L06 | GB | A=bm_fable, B=bf_isabella | 51s | 4.28 | 0.244 |
| L07 | GB | A=bm_george | 87s | 4.29 | 0.505 |
| L08 | US | A=af_heart | 68s | 4.51 | 0.889 |
| L09 | AU | A=MeloTTS EN-AU, B=am_adam | 46s | 4.44 | 0.39 |
| L10 | AU | A=MeloTTS EN-AU | 49s | 4.43 | 0.151 |
| L11 | US | A=am_adam, B=af_sarah | 44s | 4.42 | 0.112 |
| L12 | US | A=am_adam | 56s | 4.46 | 0.014 |
| L13 | GB | A=bf_emma, B=bm_daniel | 66s | 4.15 | 0.135 |
| L14 | AU | A=MeloTTS EN-AU, B=bm_fable | 65s | 4.31 | 0.145 |
| L15 | US | A=am_fenrir, B=af_heart | 54s | 4.41 | 0.617 |
| L16 | GB | A=bm_fable | 64s | 4.29 | 0.058 |
| L17 | AU | A=MeloTTS EN-AU | 67s | 4.48 | 0.115 |
| L18 | US | A=af_sarah | 60s | 4.5 | 0.102 |
| L19 | GB | A=bf_alice, B=bm_george | 76s | 4.24 | 0.139 |
| L20 | AU | A=MeloTTS EN-AU, B=am_puck | 63s | 4.43 | 0.053 |
| L21 | US | A=am_puck, B=af_bella | 62s | 4.37 | 0.038 |
| L22 | GB | A=bf_isabella | 82s | 4.4 | 0.039 |
| L23 | AU | A=MeloTTS EN-AU | 68s | 4.5 | 0.613 |
| L24 | US | A=am_fenrir | 76s | 4.5 | 0.777 |

UTMOS 范围 4.15–4.51，平均 4.39。

*ASR 用 faster-whisper small.en。它在这台机器上逐句切片时不稳定：同一段音频有时返回空或只转出半句，单独重跑又能逐字转对。所以逐句词错率只当参考。偏高的 4 套用整段音频（ffmpeg 转 16 kHz wav）重跑：L07 0.016、L08 0.017、L23 0.048、L24 0.010，和脚本基本逐字一致，音频本身完整。听感最终以预览里人耳试听为准。

### 6.2 Playwright 结果（本地 http-server，支持 Range）
- 播放：L01（GB）、L02（AU）、L05（US）、L09（AU）点「播放全文」后 3 秒，`paused=false`，`currentTime` 约 2–3 秒，时长 79.8 / 69.3 / 66.3 / 45.7 秒，音频请求 206（分段）。点第 6 句后从该句开始，高亮第 6 句。
- 24 个 mp3：全部 HTTP 200，`duration > 0`（43.8–87.0 秒）。
- 官方样题标签：10 个外链，全部 `target=_blank rel=noopener`，整行可点，4 个分组。
- 页面报错：0。
- 零汉字检查（听力列表、官方样题、L01/L02/L05 详情、首页）：en、ko、ms、vi、fr、es、de 都是 0 个汉字（不算语言切换器自称 简体中文 / 繁體中文 / 日本語）。ja 的汉字是日文汉字；32 条新文案在 9 种语言里都有译文（zh-Hant 的 3 条口音词繁简同形）。
- 截图：/workspace/ielts-audio-shots/（桌面 1440、手机 390，浅色 / 深色；官方样题 en + zh、听力列表、播放中）。手机详情页顶部的大块空白是现网原样（compare-prod-mobile-dark-L02.png 对照），不是本次改动。

## 7. 预览
- 预览固定在本分支提交上（raw.githack 代理 GitHub 文件；mp3 跳到 raw.githubusercontent.com，支持分段）。不是正式站。
- 试过 cloudflared 临时隧道：本机网络挡住了隧道出口（QUIC 和 HTTP/2 都连不上 Cloudflare 边缘），没用上。

## 8. 待 Siin 决定
1. 是否合并本 PR（GitHub Pages 合并即上线）。
2. 澳式只有 1 个开源女声，澳式对话是混合口音。要不要换付费方案（Google Chirp 3: HD，本站用量在每月免费额度内）拿到多个澳式声音。
3. mp3 放在仓库里（8.9 MB）。以后脚本变多，可以挪到 Cloudflare R2 或别的静态存储。
