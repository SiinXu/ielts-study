# 雅思备考学习站 v3「雅思笔记」（手机 + 电脑）

内容全部来自 `../combined.html`（雅思备考资料合集，零到五共 6 部分），没有新增内容。

## 文件
- `index.html` 页面入口
- `style.css` 样式：浅色纸张笔记本风格（米白纸底、横线便签、索引贴色标），可切冷灰深色；英文用 Newsreader 衬线、界面用 Plus Jakarta Sans（本地打包在 `fonts/`），中文用系统字体，无外部 CDN
- `app.js` 交互：首页（问候 + 倒计时、本阶段便签、今日任务清单、总进度与目标分数、六本笔记）、版块页（右侧目录栏、索引卡片）、搜索、只看未学、详情抽屉（上一条/下一条）、已学勾选与进度、深浅色切换
- 视觉参考 shadcn/ui 干净表面、Land-book / Beautiful UI 的暖色纸张感、Ant Design X 的信息层级；电脑顶部标签导航 + 右侧栏，手机底部导航
- `data.js` 由 `build.py` 从 `combined.html` 生成的内容数据
- `build.py` 重新生成 `data.js`：`python3 build.py`（需要 beautifulsoup4）

## 本地打开
- 电脑：直接双击 `index.html`，或在此目录运行 `python3 -m http.server 8000` 后打开 http://localhost:8000
- 手机：电脑和手机连同一 Wi‑Fi，运行上面的命令，手机 Safari 打开 `http://电脑局域网IP:8000`；Safari 分享 →“添加到主屏幕”可像 App 一样打开
- 也可以把整个 `site` 文件夹放到任意静态托管（GitHub Pages、Netlify、Vercel 等），无需构建

## 说明
- 已学勾选、深浅色、各页滚动位置保存在浏览器 localStorage（键名 `ielts.done` / `ielts.theme` / `ielts.scroll` / `ielts.today` / `ielts.unread` / `ielts.last`），只保存在当前设备当前浏览器。
- 条目 ID 由内容哈希生成，修改 combined.html 后重新运行 build.py，未改动的条目勾选状态保留。
