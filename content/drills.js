/* 专项小题：写作语言升级 + 听力陷阱。语法与搭配专项直接从 data.js 的错题（489）和搭配（287）自动出题。 */
window.IELTS_DRILLS = {
writing: [
 {q:'哪句更适合 Task 2？', o:['A lot of kids play games too much.','A significant number of children spend excessive time on video games.'], a:1, why:'a lot of / kids 偏口语'},
 {q:'哪句更适合 Task 2？', o:['I think this is a good thing.','I would argue that this development is largely positive.'], a:1, why:'避免空泛的 good thing'},
 {q:'替换 "get better"', o:['improve','get more good','betterize'], a:0, why:'improve / enhance'},
 {q:'替换 "big problem"', o:['huge problem','serious / pressing issue','very big trouble'], a:1, why:'pressing issue 更正式'},
 {q:'Overview 的正确开头', o:['Overall, ...','In conclusion, ...','To sum up, I think ...'], a:0, why:'Task 1 用 Overall，不写结论'},
 {q:'哪句连接更自然？', o:['Firstly... Secondly... Thirdly... Fourthly...','One key reason is... Another factor is... Furthermore, ...'], a:1, why:'连接词有变化'},
 {q:'哪句是完整句子？', o:['For example, Singapore.','Singapore, for example, has invested heavily in public housing.'], a:1, why:'举例要成句'},
 {q:'哪个更准确？', o:['The number of cars increased a lot.','The number of cars rose sharply, from 2 million to 5 million.'], a:1, why:'趋势词 + 数据'},
 {q:'哪个更客观（hedging）？', o:['This will definitely destroy all jobs.','This could lead to job losses in certain sectors.'], a:1, why:'谨慎表达'},
 {q:'替换 "nowadays"（避免模板）', o:['In recent years,','Nowadays, with the development of society,'], a:0, why:'后者是被考官熟知的模板'},
 {q:'哪句正确使用 whereas？', o:['Whereas cars are fast. Bikes are cheap.','Cars are fast, whereas bikes are cheap.'], a:1, why:'whereas 连接两个分句'},
 {q:'"占……比例" 正确表达', o:['account for 30%','occupy 30%','take 30% of percent'], a:0, why:'account for'},
 {q:'替换 "bad for health"', o:['detrimental to health','very not good for health','unhealth'], a:0, why:'detrimental to / harmful to'},
 {q:'结论段应该', o:['加一个新论点','重申立场并概括主要理由','举一个新例子'], a:1, why:'结论不加新内容'},
 {q:'哪句更像主题句？', o:['There are many reasons.','The primary benefit of remote work is the time saved on commuting.'], a:1, why:'主题句要具体'},
 {q:'"解决问题" 的高分搭配', o:['solve the problem / tackle the issue','fix the question','answer the problem'], a:0, why:'tackle / address an issue'},
 {q:'替换 "people think"', o:['It is widely believed that','Everybody knows that'], a:0, why:'Everybody knows 过度绝对'},
 {q:'哪个是 Task 1 禁忌？', o:['写原因猜测："because people became richer"','比较最高与最低'], a:0, why:'Task 1 不解释原因'}
],
listening: [
 {q:'"The meeting is on Tuesday... sorry, I mean Thursday." 答案是', o:['Tuesday','Thursday'], a:1, why:'改口：sorry, I mean / actually 之后才是答案'},
 {q:'"It used to cost £15, but now it\'s £12." 现在价格', o:['£15','£12'], a:1, why:'used to 是过去信息'},
 {q:'"Fifteen" 和 "fifty" 区别', o:['fifteen 重音在后，fifty 重音在前','两者重音相同'], a:0, why:'-teen 重读，-ty 前重读'},
 {q:'"We\'d planned to go to the park, but the rain..." 最终去', o:['the park','未确定 / 其他地方'], a:1, why:'planned ... but → 计划被推翻'},
 {q:'题目写 "inexpensive"，录音可能说', o:['cheap / doesn\'t cost much','expensive'], a:0, why:'同义替换'},
 {q:'"Everything is included except breakfast." 不包括', o:['breakfast','dinner'], a:0, why:'except 后是排除项'},
 {q:'"The first two are full, so you\'ll be in the third group." 你在', o:['第一组','第三组'], a:1, why:'排除法'},
 {q:'拼写题听到 "double S"', o:['ss','s2'], a:0, why:'double = 两个相同字母'},
 {q:'"Not the main entrance — use the side door." 走', o:['main entrance','side door'], a:1, why:'not ... 否定前项'},
 {q:'"Most people think it\'s in June, but it\'s actually in May." 时间', o:['June','May'], a:1, why:'actually 纠正常识'},
 {q:'填空 NO MORE THAN TWO WORDS，答案 "a heavy wooden box" 应写', o:['heavy wooden box','wooden box'], a:1, why:'超字数直接判错，保留核心名词'},
 {q:'"I\'d rather not take the bus; the train is quicker." 选择', o:['bus','train'], a:1, why:'I\'d rather not 表否定'}
]
};
