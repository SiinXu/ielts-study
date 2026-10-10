# 雅思备考学习站 v5「雅思 7.5」（手机 + 电脑）

内容全部来自 `../combined.html`（雅思备考资料合集，零到五共 6 部分），没有新增内容；`data.js` 与 v4 字节一致。

## 文件
- `index.html` 页面入口
- `style.css` 样式：编辑感黑白 + 低饱和色块。白底墨黑，唯一强调色为橙 #ff5a1f；英文内容用 Newsreader 衬线排，界面用 Geist，数字和元信息用 Geist Mono（均本地打包在 `fonts/`，SIL OFL，中文回落系统字体）。圆角规则：面板 12px、按钮输入框 8px、标签全圆角。可切暖黑深色
- `app.js` 交互：首页（大字问候、今日像素格、任务行、本阶段分段时间线、目标分数、六个版块色块网格）、版块页（衬线大标题 + 每条一个点的进度矩阵、右侧目录）、搜索高亮、只看未学、详情抽屉（上一条/下一条）、已学勾选与进度、深浅色切换
- 视觉参考（均来自资源合集）：leonxlnx/minimalist-skill（暖中性黑白、色块标签、衬线标题、键帽）、Beautiful UI（像素格加载器、Task Rows、Insight Cards）、leonxlnx/taste-skill（去 AI 味约束）；图标 Phosphor Icons（MIT）
- `data.js` 由 `build.py` 从 `combined.html` 生成的内容数据
- `build.py` 重新生成 `data.js`：`python3 build.py`（需要 beautifulsoup4）

## 本地打开
- 电脑：直接双击 `index.html`，或在此目录运行 `python3 -m http.server 8000` 后打开 http://localhost:8000
- 手机：电脑和手机连同一 Wi‑Fi，运行上面的命令，手机 Safari 打开 `http://电脑局域网IP:8000`；Safari 分享 →“添加到主屏幕”可像 App 一样打开
- 也可以把整个 `site` 文件夹放到任意静态托管（GitHub Pages、Netlify、Vercel 等），无需构建

## 说明
- 已学勾选、深浅色、各页滚动位置保存在浏览器 localStorage（键名 `ielts.done` / `ielts.theme` / `ielts.scroll` / `ielts.today` / `ielts.unread` / `ielts.last`），只保存在当前设备当前浏览器。
- 条目 ID 由内容哈希生成，修改 combined.html 后重新运行 build.py，未改动的条目勾选状态保留。

## v5c 内容加厚（2026-10-10）
视觉沿用 v5，`data.js` 947 条不变，新增模块：
- `content/grammar-deep.js` 两周语法 14 天加厚：每天讲解 + 6–8 例句 + 4–5 题小测（答案速查）+ 常错对照表 + 输出练习，约 12–15 分钟
- `content/listening.js` 12 套原创听力（Part 1–4，62 题，含陷阱说明），浏览器朗读播放 + 盲听 / 先读再听
- `content/reading.js` 8 篇原创学术短文（45 题，T/F/NG、选择、填空）
- `content/writing.js` Task 1 ×4、Task 2 ×8（思路、范文片段、表达）+ 评分自查表（T1 9 项 / T2 10 项）
- `content/speaking.js` Part 1 ×10 话题（33 问）、Part 2 ×10 题卡（范例 + 30 个 Part 3 追问）、6 项自评
- `content/drills.js` 写作语言 18 题、听力陷阱 12 题；语法/搭配/口语专项直接用 data.js 的错题、搭配、对话出题
- `content/course.js` 课表：按复习计划的 5 个阶段生成每天的学习块（含分钟数）与周视图
- `study.js` / `study.css` 课表、练习、档案三页 + 复习曲线（1/3/7/14/30 天）+ 改错对排版修复
新增本地存储键：`ielts.srs` `ielts.plan` `ielts.prac` `ielts.notes` `ielts.draft` `ielts.wcheck` `ielts.gout` `ielts.log` `ielts.rate` `ielts.lmode` `ielts.ptab`（`ielts.done` 不变）。
TODO：听力真人录音（在 listening.js 每套加 `audio` 字段后接入）。

## v5f 动态课表（2026-10-10）
设置里保存目标后，课表即时重排（`study.js` 的 `derivePlan`）：
- 权重：比总分低 n 个半分的单项 ×(1 + 0.4n)（上限 2.2）；高于总分的单项每半分 −0.1（下限 0.8）；低于保底分再 +0.3 并标「保底风险」排到今日最前
- 当天已有该科的块按权重加时（取 5 分钟整），没有该科且权重 ≥1.2 时加一块「加练」（10 分钟起，每多半分 +5，保底风险再 +5，上限 30）
- 时间线：有考试日期时前四个阶段按「开始 → 考试」等比伸缩（语法阶段尽量保留 14 天），考试与重考阶段从考试日开始；无考试日期按默认约 29 周
- 派生结果存 `ielts.plan.derived`，按设置哈希失效；打卡键不变，加练块键为 `xW` 等
