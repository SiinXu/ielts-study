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
