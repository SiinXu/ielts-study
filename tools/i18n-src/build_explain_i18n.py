# v11：讲解/题目说明类 692 条（原先只在 en.js 里，其它语言回退英文）→ ja ko es ms vi fr de 人工译文；zh-Hant 用 OpenCC s2twp 补缺
# 用法：node 先导出 /tmp/miss.json（[中文键, 英文] 列表，顺序与 t_explain_*.txt 行号一致）
import json,os,re,opencc
SRC=os.path.dirname(os.path.abspath(__file__)); SITE=os.path.dirname(os.path.dirname(SRC))
miss=json.load(open('/tmp/miss.json'))
M='/* explain v11 */'
EXTRA={'ja':{'更多':'その他'},'ko':{'更多':'더 보기'},'es':{'更多':'Más'},'ms':{'更多':'Lagi'},'vi':{'更多':'Thêm'},'fr':{'更多':'Plus'},'de':{'更多':'Mehr'}}
def put(l,o):
    p=f'{SITE}/i18n/{l}.js'; s=open(p,encoding='utf-8').read()
    if M in s: s=s[:s.index(M)]
    s=s.rstrip('\n')+'\n'+M+'\nI18N.add(%s, %s);\n'%(json.dumps(l),json.dumps(o,ensure_ascii=False,indent=0))
    open(p,'w',encoding='utf-8').write(s)
for l in ['ja','ko','es','ms','vi','fr','de']:
    rows=[ln.rstrip('\n').split('|',1) for ln in open(f'{SRC}/t_explain_{l}.txt',encoding='utf-8') if ln.strip()]
    assert [int(r[0]) for r in rows]==list(range(len(miss))),l
    o={}
    for (i,v),(k,en) in zip(rows,miss):
        v=v.strip(); assert v,(l,i)
        assert sorted(re.findall(r'\{\w+\}',v))==sorted(re.findall(r'\{\w+\}',en)),(l,i)
        assert v.count('<')==en.count('<'),(l,i)
        o[k]=v
    o.update(EXTRA[l])
    put(l,o); print(l,len(o))
cc=opencc.OpenCC('s2twp')
zht=json.load(open('/tmp/ielts_i18n_all.json'))['zh-Hant']
o={k:cc.convert(k) for k,_ in miss if k not in zht and re.search('[\u4e00-\u9fff]',k)}
o={k:v for k,v in o.items() if v!=k}
put('zh-Hant',o); print('zh-Hant',len(o))
