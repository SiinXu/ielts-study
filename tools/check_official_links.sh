#!/usr/bin/env bash
# 核验 content/listening-official.js 里的官方外链：curl 跟随跳转，要求最终 200；先用 curl 默认 UA，失败再用浏览器 UA。
# 注：British Council 两个域名（takeielts / learnenglish）对机房 IP 回 403 或断开连接（Akamai 机器人防护），
#     这种情况需要从普通网络或浏览器再确认，脚本会标 BLOCKED 而不是 FAIL。
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
grep -o "u:'[^']*'" "$(dirname "$0")/../content/listening-official.js" | sed "s/^u:'//; s/'$//" | while read -r u; do
  a=$(curl -s -o /dev/null -L -m 25 -w "%{http_code}" "$u"); b=$(curl -s -o /dev/null -L -m 25 -A "$UA" -w "%{http_code} %{url_effective}" "$u")
  if [ "$a" = 200 ] || [ "${b%% *}" = 200 ]; then s=OK; elif [ "$a" = 403 ] || [ "${b%% *}" = 000 ]; then s=BLOCKED; else s=FAIL; fi
  echo "$s | curl:$a | browserUA:$b | $u"
done
