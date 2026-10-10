/* 两周语法速成 · 加厚版（原创讲解、例句、小测与常错表）
   按「第 N 天」挂到 data.js 里对应的语法条目上，不改 data.js。
   quiz: {q, o:[选项], a:正确下标, why}；err: [错, 对, 原因] */
window.IELTS_GRAMMAR = {
1: {
  min: 12,
  teach: [
    '每个英语句子都有一个<b>主语</b>和一个<b>谓语动词</b>。中文可以说「我很喜欢」「人很多想学」，英文不行：形容词、副词不能当谓语，一句话也不能同时放两个没有连接词的谓语。',
    '读长难句的第一步：先划掉介词短语（in..., of..., with...）和从句（which..., that...），剩下的就是五种骨架之一。写作时反过来：先写骨架，再往上挂修饰。',
    '五种骨架里最容易漏的是<b>系动词</b>（be / become / seem / remain / look），中文「结果很好」直译成 <i>The result very good</i> 就漏了 is。'
  ],
  ex: [
    ['Prices <u>rose</u>.', '主 + 谓：rise 不及物，后面不能接宾语'],
    ['The company <u>raised</u> prices.', '主 + 谓 + 宾：raise 及物，必须接宾语'],
    ['Online learning <u>has become</u> popular.', '主 + 系 + 表：become 是系动词，后接形容词'],
    ['The teacher <u>showed</u> us a new method.', '主 + 谓 + 间宾 + 直宾：show sb sth'],
    ['Remote work <u>makes</u> employees more productive.', '主 + 谓 + 宾 + 宾补：make sb + 形容词'],
    ['The number of students <u>who study abroad</u> <u>has increased</u> sharply.', '长句拆分：主语 the number，谓语 has increased，who 从句只是修饰'],
    ['Many young people <u>want</u> to learn AI.', '一句一个谓语：want 是谓语，to learn 是宾语'],
    ['There <u>are</u> many people <u>who want</u> to learn AI.', 'There be 句里第二个动词要放进从句']
  ],
  quiz: [
    {q:'选出正确的句子', o:['I very like this course.','I like this course very much.','I am very like this course.'], a:1, why:'very 是副词，不能修饰动词 like；用 like ... very much 或 really like'},
    {q:'The project ___ successful last year.', o:['was','became to','proved being'], a:0, why:'主系表：was + 形容词；became 后不加 to'},
    {q:'下面哪句缺了谓语？', o:['The result is impressive.','The weather in Shanghai very humid.','Prices fell.'], a:1, why:'very humid 前面要有系动词 is'},
    {q:'There are many students ___ part-time jobs.', o:['have','who have','are having'], a:1, why:'There be 后面再出现动词要变成从句或分词：who have / having'},
    {q:'The new policy made public transport ___.', o:['cheaply','cheaper','to cheap'], a:1, why:'make + 宾语 + 形容词（宾补），不用副词'}
  ],
  err: [
    ['I very like AI.', 'I really like AI.', '副词 very 不能直接修饰动词'],
    ['There are many people want to learn AI.', 'Many people want to learn AI.', '一句两个谓语；要么去掉 There are，要么加 who'],
    ['The result very good.', 'The result is very good.', '形容词不能当谓语，要加 be'],
    ['Prices were rose.', 'Prices rose.', 'rise 不及物，没有被动'],
    ['It makes me to feel tired.', 'It makes me feel tired.', 'make sb do，不加 to']
  ]
},
2: {
  min: 12,
  teach: [
    '<b>一般现在时</b>写事实、习惯和规律：<i>Water boils at 100°C.</i> 主语第三人称单数时动词加 -s，这是口语最常丢分的点。',
    '<b>现在进行时</b>写此刻在做、或这段时间的临时状态：<i>I am preparing for IELTS this year.</i> 表示状态的动词（know, believe, own, need, prefer）一般不用进行时。',
    '<b>一般过去时</b>只看时间点是否已经结束（yesterday, in 2019, when I was a child）。小作文写过去年份的数据，全篇用过去时；口语 Part 2 讲经历，也以过去时为主。'
  ],
  ex: [
    ['My manager usually <u>checks</u> the report on Mondays.', '习惯动作，三单加 -s'],
    ['I <u>am working</u> on a chatbot project at the moment.', '当前一段时间在做的事'],
    ['She <u>doesn\'t</u> like crowded places.', '否定用 doesn\'t + 动词原形，不是 don\'t likes'],
    ['In 2010, coal <u>accounted</u> for 40% of energy use.', '图表里的过去年份用过去时'],
    ['When I <u>was</u> a child, I <u>lived</u> near the sea.', 'Part 2 讲童年经历'],
    ['I <u>was reading</u> when the phone <u>rang</u>.', '过去进行（背景）+ 一般过去（打断）'],
    ['I <u>know</u> the answer.', '状态动词不用 am knowing']
  ],
  quiz: [
    {q:'My sister ___ in a bank.', o:['work','works','is work'], a:1, why:'三单主语 + works'},
    {q:'Look! It ___.', o:['rains','is raining','rained'], a:1, why:'Look! 提示此刻正在发生'},
    {q:'In 1990, the figure ___ at 25%.', o:['stands','stood','has stood'], a:1, why:'1990 是已结束的时间点'},
    {q:'选出错误的句子', o:['I am knowing him for years.','I know him well.','I am meeting him tomorrow.'], a:0, why:'know 是状态动词，不用进行时；且 for years 应用现在完成时'},
    {q:'___ your brother play the piano?', o:['Do','Does','Is'], a:1, why:'三单疑问用 Does + 原形'}
  ],
  err: [
    ['He go to work by metro.', 'He goes to work by metro.', '三单漏 -s'],
    ['She don\'t like coffee.', 'She doesn\'t like coffee.', '三单否定用 doesn\'t'],
    ['Yesterday I go to the gym.', 'Yesterday I went to the gym.', '过去时间要用过去式'],
    ['I am understanding now.', 'I understand now.', 'understand 是状态动词'],
    ['In 2000 the number is 50.', 'In 2000 the number was 50.', '小作文过去年份用过去时']
  ]
},
3: {
  min: 12,
  teach: [
    '<b>现在完成时</b>（have/has done）连接过去和现在：事情发生在过去，但时间没说或影响还在。看到 <i>since, for, already, yet, ever, never, so far, recently</i> 基本就是它。',
    '一旦出现<b>具体的过去时间</b>（yesterday, last year, in 2020, ago），就只能用一般过去时，这是中国考生最常见的时态错误。',
    '口语里 <i>I have been to</i>（去过已回来）和 <i>I have gone to</i>（去了还没回）不能混；<i>have been doing</i> 强调一直在做：<i>I have been learning English for ten years.</i>'
  ],
  ex: [
    ['I <u>have lived</u> in Shanghai for six years.', 'for + 时间段，到现在还住'],
    ['Online shopping <u>has grown</u> rapidly since 2015.', 'since + 起点，作文常用'],
    ['I <u>have never tried</u> skydiving.', '经历：ever / never'],
    ['I <u>visited</u> Japan last year.', '有 last year，用过去时'],
    ['Have you <u>finished</u> the report yet?', 'yet 用于疑问和否定'],
    ['She <u>has been to</u> Korea twice.', '去过两次，已经回来'],
    ['I <u>have been preparing</u> for this test since August.', '一直持续的动作']
  ],
  quiz: [
    {q:'I ___ this app since 2023.', o:['use','used','have used'], a:2, why:'since + 起点到现在 → 现在完成时'},
    {q:'She ___ to London in 2019.', o:['has moved','moved','has been moving'], a:1, why:'in 2019 是具体过去时间'},
    {q:'Where is Tom? — He ___ to the airport.', o:['has been','has gone','went to'], a:1, why:'人不在这里，用 has gone'},
    {q:'___ you ever ___ sushi?', o:['Did / eat','Have / eaten','Have / ate'], a:1, why:'ever 问经历 → Have you ever eaten'},
    {q:'The number of cars ___ dramatically over the past decade.', o:['increased','has increased','increases'], a:1, why:'over the past decade 延续到现在'}
  ],
  err: [
    ['I have seen him yesterday.', 'I saw him yesterday.', 'yesterday 不能和完成时连用'],
    ['I live here since 2020.', 'I have lived here since 2020.', 'since 要用完成时'],
    ['I have went there.', 'I have gone / been there.', '完成时用过去分词'],
    ['How long are you in Shanghai?', 'How long have you been in Shanghai?', '问持续时间用完成时']
  ]
},
4: {
  min: 12,
  teach: [
    '<b>可数名词单数</b>不能光着用：前面要有 a/an/the/my/this 之一，或改成复数。<i>Computer is useful</i> 错，<i>Computers are useful</i> 或 <i>A computer is useful</i> 对。',
    '<b>不可数名词</b>没有复数也不加 a：information, advice, research, equipment, knowledge, evidence, furniture, traffic。要计数用 <i>a piece of advice</i>。',
    '<b>主谓一致</b>看真正的主语：<i>The number of students is...</i>（the number 单数），<i>A number of students are...</i>（许多学生，复数）；<i>Each / Every / Everyone</i> 跟单数动词。'
  ],
  ex: [
    ['<u>Smartphones have</u> changed the way we communicate.', '泛指用复数，不加 the'],
    ['She gave me some useful <u>advice</u>.', 'advice 不可数'],
    ['<u>The number of</u> tourists <u>has</u> doubled.', 'the number 单数'],
    ['<u>A number of</u> students <u>are</u> late.', 'a number of = many'],
    ['<u>Everyone</u> in my team <u>works</u> remotely.', 'everyone 单数'],
    ['I play <u>the</u> piano but I don\'t play <u>football</u>.', '乐器加 the，球类不加'],
    ['<u>The</u> government should invest more in <u>education</u>.', '特指本国政府；education 泛指不加 the']
  ],
  quiz: [
    {q:'We need more ___ before we decide.', o:['informations','information','an information'], a:1, why:'information 不可数'},
    {q:'The number of cyclists ___ risen.', o:['have','has','are'], a:1, why:'主语 the number，单数'},
    {q:'___ is an important skill.', o:['Communication','The communications','A communication'], a:0, why:'抽象概念泛指，不可数不加冠词'},
    {q:'选出正确的句子', o:['Computer is very useful.','Computers are very useful.','The computers is very useful.'], a:1, why:'可数名词泛指用复数'},
    {q:'Each of the students ___ a laptop.', o:['have','has','are having'], a:1, why:'each of ... 跟单数'}
  ],
  err: [
    ['I have many homeworks.', 'I have a lot of homework.', 'homework 不可数'],
    ['People is busy.', 'People are busy.', 'people 是复数'],
    ['He is engineer.', 'He is an engineer.', '职业单数要加 a/an'],
    ['The research show that...', 'The research shows that...', 'research 不可数，动词单数'],
    ['The life in city is fast.', 'Life in the city is fast.', '泛指生活不加 the；特指城市加 the']
  ]
},
5: {
  min: 12,
  teach: [
    '<b>被动语态</b> = be + 过去分词。动作执行者不重要或不清楚时用：<i>The data were collected in 2020.</i> 写流程图（Task 1 process）几乎全用被动。',
    '时态体现在 be 上：is made / was made / has been made / will be made / is being made / can be made。',
    '<b>情态动词</b>（can, could, may, might, should, must, would）后面永远跟<b>动词原形</b>。作文里用 <i>may / might / could</i> 让观点更谨慎（hedging），比绝对化的 <i>will</i> 更像学术写作。'
  ],
  ex: [
    ['The beans <u>are roasted</u> and then <u>ground</u>.', '流程图：被动 + 顺序'],
    ['English <u>is spoken</u> in many countries.', '执行者不重要'],
    ['The museum <u>was built</u> in 1905.', '过去被动'],
    ['New rules <u>have been introduced</u> this year.', '完成被动'],
    ['This problem <u>could be solved</u> by better planning.', '情态 + be + done'],
    ['Governments <u>should invest</u> in public transport.', 'should + 原形，表建议'],
    ['Online learning <u>may not suit</u> every student.', '用 may 让观点更谨慎']
  ],
  quiz: [
    {q:'The bridge ___ in 1937.', o:['completed','was completed','has completed'], a:1, why:'桥是被完成的，1937 是过去'},
    {q:'Students should ___ more time to practise.', o:['given','be given','to be given'], a:1, why:'should + be + 过去分词'},
    {q:'选出正确的句子', o:['It can helps us.','It can help us.','It cans help us.'], a:1, why:'情态后接原形'},
    {q:'The water ___ before it is bottled.', o:['filters','is filtered','filtered'], a:1, why:'流程描述用一般现在时被动'},
    {q:'哪个更适合学术写作？', o:['This will definitely destroy jobs.','This may lead to job losses in some sectors.','This destroy jobs.'], a:1, why:'may + 限定范围，观点更稳'}
  ],
  err: [
    ['The car was repair yesterday.', 'The car was repaired yesterday.', '被动要用过去分词'],
    ['This phenomenon is happened often.', 'This phenomenon happens often.', 'happen 不及物，无被动'],
    ['We must to protect the environment.', 'We must protect the environment.', '情态后不加 to'],
    ['I am agree with you.', 'I agree with you.', 'agree 是动词，不和 am 连用'],
    ['He can speaks Japanese.', 'He can speak Japanese.', '情态后用原形']
  ]
},
6: {
  min: 12,
  teach: [
    '<b>名词性从句</b>就是把一整句话当名词用：做主语、宾语、表语或同位语。引导词 that（无意义）、whether/if（是否）、wh- 词（what, why, how...）。',
    '从句内部要用<b>陈述语序</b>：<i>I don\'t know what he wants</i>，不是 <i>what does he want</i>。这一点口语里最常错。',
    '主语从句太长时用 <i>It is ... that ...</i> 形式主语，作文里非常好用：<i>It is widely believed that...</i> / <i>It is clear that...</i>'
  ],
  ex: [
    ['<u>What matters most</u> is experience.', '主语从句'],
    ['I believe <u>that education should be free</u>.', '宾语从句'],
    ['I wonder <u>whether the plan will work</u>.', 'whether = 是否'],
    ['Can you tell me <u>where the station is</u>?', '陈述语序，不是 where is the station'],
    ['<u>It is widely accepted that</u> exercise improves mood.', '形式主语'],
    ['The problem is <u>that we lack funding</u>.', '表语从句'],
    ['There is no evidence <u>that the drug works</u>.', '同位语从句，解释 evidence']
  ],
  quiz: [
    {q:'I don\'t know ___.', o:['what does he want','what he wants','what he want'], a:1, why:'陈述语序 + 三单'},
    {q:'___ he will come is still unknown.', o:['If','Whether','That if'], a:1, why:'句首主语从句只能用 whether'},
    {q:'___ is widely believed that reading improves empathy.', o:['This','It','What'], a:1, why:'形式主语 It'},
    {q:'The fact ___ prices are rising worries many families.', o:['which','that','what'], a:1, why:'同位语从句用 that'},
    {q:'Could you tell me how ___?', o:['does this work','this works','works this'], a:1, why:'陈述语序'}
  ],
  err: [
    ['I don\'t know what is his name.', 'I don\'t know what his name is.', '从句用陈述语序'],
    ['What he said it is true.', 'What he said is true.', '主语从句后不重复 it'],
    ['I think it\'s not good.', 'I don\'t think it\'s good.', '否定前移更自然'],
    ['The reason is because...', 'The reason is that...', 'reason 后用 that']
  ]
},
7: {
  min: 15,
  teach: [
    '今天不学新规则，练<b>长难句拆分</b>：1) 找谓语动词（带时态变化的那个）；2) 往前找主语；3) 划掉所有介词短语和从句；4) 再逐个看修饰。',
    '剑桥阅读里一句 40 词的句子，骨架往往只有 5 个词。练熟以后，阅读速度会明显提升。',
    '方法：读下面的例句，先用手指遮住划线以外的部分，只读骨架，再读完整句。'
  ],
  ex: [
    ['<u>Researchers</u> at the university, who had studied sleep patterns for over a decade, <u>found</u> that teenagers need more rest.', '骨架：Researchers found that...'],
    ['<u>The idea</u> that machines could one day think like humans <u>has fascinated</u> scientists since the 1950s.', '骨架：The idea has fascinated scientists'],
    ['Despite rising costs, <u>the number</u> of students choosing to study abroad <u>continues</u> to grow.', '骨架：the number continues to grow'],
    ['<u>What</u> surprised the team most <u>was</u> how quickly users adopted the feature.', '主语从句 + 表语从句'],
    ['Having analysed thousands of samples, <u>the scientists concluded</u> that the species was migrating north.', '分词短语在句首，骨架在后'],
    ['<u>Cities</u> that invest in green spaces and reliable public transport <u>tend</u> to attract younger residents.', '骨架：Cities tend to attract residents']
  ],
  quiz: [
    {q:'"The report, which was published last week by an independent agency, suggests that fees should fall." 谓语动词是？', o:['was published','suggests','should fall'], a:1, why:'which 从句里的 was published 不是主句谓语'},
    {q:'"Students who work part-time often manage their time better." 主语是？', o:['Students','who','part-time'], a:0, why:'who work part-time 修饰 Students'},
    {q:'"Not until the 19th century did scientists understand germs." 主句谓语？', o:['did understand','until','century'], a:0, why:'倒装：did scientists understand'},
    {q:'"Built in 1880, the station remains a landmark." 骨架？', o:['Built in 1880','the station remains a landmark','in 1880 the station'], a:1, why:'Built in 1880 是过去分词作状语'}
  ],
  err: [
    ['Researchers at the university found that teenagers needs more rest.', '... teenagers need more rest.', '从句主语 teenagers 复数'],
    ['The idea that machines could think have fascinated people.', '... has fascinated people.', '主语是 The idea（单数）'],
    ['The number of students choosing to study abroad continue to grow.', '... continues to grow.', '主语 the number'],
    ['People who lives in cities...', 'People who live in cities...', '先行词 people 复数']
  ]
},
8: {
  min: 12,
  teach: [
    '<b>定语从句</b>放在名词后面修饰它：人用 who，物用 which，人和物都可以用 that；所属用 whose；地点 where，时间 when。',
    '<b>限制性</b>（无逗号）是必要信息；<b>非限制性</b>（有逗号）是补充信息，不能用 that。<i>My brother, who lives in Tokyo, ...</i>（只有一个哥哥）。',
    '从句里不要重复先行词：<i>the book which I bought <s>it</s></i>。介词可以前置：<i>the city in which I grew up</i>，更正式。'
  ],
  ex: [
    ['The colleague <u>who helped me</u> is from Malaysia.', '人 → who'],
    ['This is the app <u>which/that tracks my sleep</u>.', '物 → which/that'],
    ['Shanghai, <u>which has a population of 25 million</u>, is a global hub.', '非限制性，用 which 不用 that'],
    ['I met a woman <u>whose son studies in Japan</u>.', 'whose = 的'],
    ['This is the café <u>where I usually study</u>.', '地点 where'],
    ['I still remember the day <u>when I got my first job</u>.', '时间 when'],
    ['The city <u>in which I grew up</u> has changed a lot.', '介词前置，正式']
  ],
  quiz: [
    {q:'The person ___ called you is my manager.', o:['which','who','whose'], a:1, why:'人 + 作主语 → who'},
    {q:'Tokyo, ___ I visited last year, is very clean.', o:['that','which','where'], a:1, why:'非限制性 + visited 缺宾语 → which'},
    {q:'This is the town ___ I was born.', o:['which','where','that'], a:1, why:'born 后不缺成分，地点状语 → where'},
    {q:'选出正确的句子', o:['The phone which I bought it is broken.','The phone which I bought is broken.','The phone I bought it is broken.'], a:1, why:'从句里不重复宾语'},
    {q:'She is the writer ___ novels won several awards.', o:['who','whose','which'], a:1, why:'她的小说 → whose'}
  ],
  err: [
    ['The man which I met...', 'The man who(m) I met...', '人用 who'],
    ['My mother, that is a nurse, ...', 'My mother, who is a nurse, ...', '非限制性不用 that'],
    ['There are many people like it.', 'There are many people who like it.', '漏了关系词'],
    ['The place which I live is quiet.', 'The place where I live is quiet.', 'live 不及物，用 where / in which']
  ]
},
9: {
  min: 12,
  teach: [
    '<b>状语从句</b>说明原因、让步、条件、时间、结果、目的。关键：<b>连词后面跟句子，介词后面跟名词</b>。because + 句子，because of + 名词；although + 句子，despite + 名词。',
    '<b>although 和 but 不能同时用</b>，because 和 so 也不能同时用。这是中文「虽然……但是……」「因为……所以……」直译的结果。',
    '状语从句不能单独成句：<i>Because I was busy.</i> 是半句话，写作里会被判为语法错误。'
  ],
  ex: [
    ['<u>Although</u> the course was difficult, I enjoyed it.', '让步 + 句子，后面不加 but'],
    ['<u>Despite</u> the heavy rain, the event went ahead.', 'despite + 名词'],
    ['I stayed home <u>because</u> I felt ill.', '原因 + 句子'],
    ['Flights were cancelled <u>because of</u> the storm.', 'because of + 名词'],
    ['<u>As long as</u> you practise daily, you will improve.', '条件'],
    ['The room was <u>so</u> noisy <u>that</u> I couldn\'t concentrate.', '结果 so ... that'],
    ['I save money every month <u>so that</u> I can travel.', '目的 so that']
  ],
  quiz: [
    {q:'___ it was late, we kept working.', o:['Despite','Although','However'], a:1, why:'后接句子用 although'},
    {q:'___ the traffic, I arrived on time.', o:['Although','Despite','Because'], a:1, why:'the traffic 是名词'},
    {q:'选出正确的句子', o:['Although it is expensive, but it is worth it.','Although it is expensive, it is worth it.','Although expensive but worth.'], a:1, why:'although 和 but 不连用'},
    {q:'The test was cancelled ___ a power cut.', o:['because','because of','so'], a:1, why:'名词前用 because of'},
    {q:'I left early ___ I could catch the last train.', o:['so that','such that','although'], a:0, why:'目的 so that'}
  ],
  err: [
    ['Although it is hard, but I enjoy it.', 'Although it is hard, I enjoy it.', 'although + but 重复'],
    ['Because I was busy, so I didn\'t go.', 'Because I was busy, I didn\'t go.', 'because + so 重复'],
    ['Because I was busy.', 'I didn\'t go because I was busy.', '从句不能单独成句'],
    ['Despite it was raining, ...', 'Despite the rain, ... / Although it was raining, ...', 'despite 后不接句子'],
    ['He is so a kind person.', 'He is such a kind person.', '名词短语用 such']
  ]
},
10: {
  min: 12,
  teach: [
    '<b>to do</b> 多指目的或将来：<i>want / decide / plan / hope / afford / refuse to do</i>。<b>doing</b> 多指习惯、经验或已发生：<i>enjoy / avoid / mind / consider / finish / suggest doing</i>。',
    '<b>介词后面一律 doing</b>：<i>interested in learning, good at speaking, look forward to meeting</i>（这里的 to 是介词）。',
    '意思会变的几个：<i>stop to do</i>（停下来去做）/ <i>stop doing</i>（停止做）；<i>remember to do</i>（记得要做）/ <i>remember doing</i>（记得做过）；<i>try to do</i>（努力）/ <i>try doing</i>（试试看）。'
  ],
  ex: [
    ['I decided <u>to take</u> the IELTS test in spring.', 'decide to do'],
    ['I enjoy <u>listening</u> to podcasts on my commute.', 'enjoy doing'],
    ['I\'m looking forward to <u>hearing</u> from you.', 'to 是介词'],
    ['She is good at <u>managing</u> people.', '介词 + doing'],
    ['He stopped <u>smoking</u> last year.', '戒烟（停止做）'],
    ['He stopped <u>to answer</u> the phone.', '停下来去接电话'],
    ['<u>Learning</u> a language takes patience.', '动名词作主语']
  ],
  quiz: [
    {q:'I\'m considering ___ jobs.', o:['to change','changing','change'], a:1, why:'consider doing'},
    {q:'We can\'t afford ___ a new car.', o:['buying','to buy','buy'], a:1, why:'afford to do'},
    {q:'I look forward to ___ you.', o:['see','seeing','saw'], a:1, why:'look forward to + doing'},
    {q:'Remember ___ the door when you leave.', o:['locking','to lock','lock'], a:1, why:'记得要去做 → to do'},
    {q:'She is interested in ___ abroad.', o:['study','to study','studying'], a:2, why:'介词 in + doing'}
  ],
  err: [
    ['I enjoy to travel.', 'I enjoy travelling.', 'enjoy doing'],
    ['I look forward to meet you.', 'I look forward to meeting you.', 'to 是介词'],
    ['I suggest him to go.', 'I suggest that he go / suggest going.', 'suggest 不接 sb to do'],
    ['I want improving my English.', 'I want to improve my English.', 'want to do']
  ]
},
11: {
  min: 12,
  teach: [
    '<b>现在分词 -ing</b> 表主动或进行；<b>过去分词 -ed</b> 表被动或完成。<i>an interesting book</i>（书让人感兴趣）/ <i>I am interested</i>（我感兴趣）。',
    '分词短语可以代替定语从句，句子更紧凑：<i>students who live on campus → students living on campus</i>；<i>products which are made in China → products made in China</i>。',
    '分词作状语时，逻辑主语必须是主句主语，否则就是「悬垂分词」：<i>Walking into the room, <s>the lights</s> I noticed the lights were off.</i>'
  ],
  ex: [
    ['The movie was <u>boring</u>, so I felt <u>bored</u>.', '-ing 事物特征，-ed 人的感受'],
    ['People <u>living</u> in big cities often feel stressed.', '= who live'],
    ['Most of the goods <u>sold</u> online are delivered within two days.', '= which are sold'],
    ['<u>Having finished</u> the report, she went home.', '完成后再做'],
    ['<u>Compared with</u> 2010, sales rose by 20%.', '图表常用被动分词'],
    ['<u>Faced with</u> rising costs, many families cut spending.', '被动分词作原因状语'],
    ['I saw him <u>crossing</u> the road.', 'see sb doing']
  ],
  quiz: [
    {q:'I was ___ by the news.', o:['shocking','shocked','shock'], a:1, why:'人的感受用 -ed'},
    {q:'The number of people ___ from home has grown.', o:['work','working','worked'], a:1, why:'主动 → working'},
    {q:'The data ___ in the survey were reliable.', o:['collecting','collected','collect'], a:1, why:'数据被收集 → collected'},
    {q:'___ in 1990, the company now employs 5,000 people.', o:['Founding','Founded','Having founding'], a:1, why:'公司是被创立的'},
    {q:'哪句有悬垂分词错误？', o:['Walking home, I saw a fox.','Walking home, a fox appeared.','While I was walking home, a fox appeared.'], a:1, why:'狐狸不是在走回家的人'}
  ],
  err: [
    ['I am very boring today.', 'I am very bored today.', 'boring 指让人无聊'],
    ['The food was very satisfied.', 'The food was very satisfying.', '事物用 -ing'],
    ['People live in cities are busy.', 'People living / who live in cities are busy.', '两个谓语'],
    ['Compare with last year, ...', 'Compared with last year, ...', '固定用过去分词']
  ]
},
12: {
  min: 12,
  teach: [
    '<b>比较</b>：单音节加 -er/-est，多音节用 more/most；不规则 good-better-best, bad-worse-worst, many-more-most, little-less-least。不能同时用 more 和 -er。',
    '图表必备：<i>twice as high as, three times more than, slightly higher than, by far the largest, the second most popular</i>。',
    '<b>条件句三类</b>：真实条件 <i>If it rains, I will stay home.</i> 现在假设 <i>If I had more time, I would travel.</i> 过去假设 <i>If I had studied harder, I would have passed.</i> if 从句里不用 will。'
  ],
  ex: [
    ['Rents in Shanghai are <u>much higher than</u> in Wuhan.', 'much 修饰比较级'],
    ['Coffee is <u>the second most popular</u> drink.', '第二最……'],
    ['Car sales were <u>twice as high as</u> in 2000.', '倍数'],
    ['<u>The more</u> you practise, <u>the more fluent</u> you become.', 'the more..., the more...'],
    ['<u>If</u> the price <u>falls</u>, demand <u>will rise</u>.', '真实条件'],
    ['<u>If</u> I <u>were</u> the mayor, I <u>would build</u> more parks.', '现在假设，be 用 were'],
    ['<u>If</u> I <u>had known</u>, I <u>would have helped</u>.', '过去假设']
  ],
  quiz: [
    {q:'This test is ___ than the last one.', o:['more easier','easier','more easy'], a:1, why:'easy → easier'},
    {q:'If it ___ tomorrow, we will cancel.', o:['will rain','rains','rained'], a:1, why:'if 从句用现在时表将来'},
    {q:'If I ___ rich, I would travel the world.', o:['am','were','will be'], a:1, why:'与现在相反的假设'},
    {q:'Spending on food was ___ that on clothing.', o:['twice as much as','twice more as','two times as more'], a:0, why:'twice as much as'},
    {q:'If she had left earlier, she ___ the train.', o:['would catch','would have caught','will catch'], a:1, why:'过去假设'}
  ],
  err: [
    ['more cheaper', 'cheaper', '双重比较'],
    ['If I will have time, I will go.', 'If I have time, I will go.', 'if 从句不用 will'],
    ['If I was you, ...', 'If I were you, ...', '假设语气正式用 were'],
    ['the most biggest', 'the biggest', '双重最高级'],
    ['It is more better.', 'It is much better.', '比较级前用 much 强调']
  ]
},
13: {
  min: 12,
  teach: [
    '高分句型不在多，在于<b>准确且自然</b>。考官看的是语法范围（range）和准确度（accuracy）：用对 3–4 个复杂结构，比堆砌 10 个错的强。',
    '每个句型准备一个和你工作相关的例句（AI 产品经理是很好的素材库），口语和作文都能用。',
    '避免背整段模板：考官受过识别训练，模板化语言会被扣分。只背骨架，内容现场填。'
  ],
  ex: [
    ['<u>Not only</u> does remote work save time, <u>but it also</u> reduces costs.', 'not only 倒装'],
    ['<u>It is</u> the cost of housing <u>that</u> drives young people away.', '强调句'],
    ['<u>What</u> I find most rewarding <u>is</u> seeing users enjoy a feature.', 'What 主语从句（口语好用）'],
    ['<u>Had</u> I known about the deadline, I would have started earlier.', '省略 if 的倒装'],
    ['<u>While</u> some argue that AI threatens jobs, others believe it creates new ones.', '让步对比开头'],
    ['<u>There is no doubt that</u> smartphones have reshaped daily life.', '观点引入'],
    ['<u>The reason why</u> I chose this field <u>is that</u> I love solving problems.', 'reason ... is that']
  ],
  quiz: [
    {q:'Not only ___ cheaper, but it is also faster.', o:['it is','is it','it does'], a:1, why:'not only 置首，部分倒装'},
    {q:'It was in 2019 ___ I started my career.', o:['when','that','which'], a:1, why:'强调句 It was ... that'},
    {q:'___ I enjoy most is travelling alone.', o:['That','What','Which'], a:1, why:'What 引导主语从句'},
    {q:'The reason I moved is ___ I wanted a change.', o:['because','that','why'], a:1, why:'reason ... is that'}
  ],
  err: [
    ['Not only it is cheap, but also...', 'Not only is it cheap, but it is also...', 'not only 置首要倒装'],
    ['The reason is because...', 'The reason is that...', '重复因果'],
    ['As far as I\'m concerned, I think...', 'As far as I\'m concerned, ...', '意思重复，去掉 I think'],
    ['Nowadays, with the development of society, ...', '直接说具体变化', '空洞模板开头会扣分']
  ]
},
14: {
  min: 15,
  teach: [
    '综合自测：下面 5 题覆盖两周所有重点。做错的会自动进入「档案 · 错题」，按 1/3/7/14/30 天复习。',
    '做完后，回头写 5 句和你工作相关的句子，每句至少包含一个本周结构（定语从句、状语从句、非谓语、比较或条件句），发给自己存档。',
    '两周后语法不单独学：做阅读和改作文时遇到再回到对应的天补。'
  ],
  ex: [
    ['The product <u>that</u> we launched last month <u>has attracted</u> 10,000 users.', '定语从句 + 完成时'],
    ['<u>Although</u> the budget was tight, the team <u>managed to deliver</u> on time.', '让步 + manage to do'],
    ['<u>If</u> we <u>had tested</u> earlier, we <u>would have found</u> the bug.', '过去假设'],
    ['<u>Compared with</u> last year, revenue is <u>significantly higher</u>.', '分词 + 比较'],
    ['<u>What</u> users need <u>is</u> a simpler interface.', '主语从句'],
    ['<u>It is</u> widely believed <u>that</u> AI will reshape education.', '形式主语']
  ],
  quiz: [
    {q:'The number of users ___ since March.', o:['have doubled','has doubled','doubled'], a:1, why:'the number 单数 + since → has doubled'},
    {q:'___ the bad weather, the flight left on time.', o:['Although','Despite','Because'], a:1, why:'名词前 despite'},
    {q:'I avoid ___ late at night.', o:['to eat','eating','eat'], a:1, why:'avoid doing'},
    {q:'Shanghai, ___ is my hometown, is huge.', o:['that','which','where'], a:1, why:'非限制性 which'},
    {q:'If I ___ more time, I would read more.', o:['have','had','will have'], a:1, why:'现在假设'}
  ],
  err: [
    ['I very like it.', 'I really like it.', 'Day 1'],
    ['I have seen it last week.', 'I saw it last week.', 'Day 3'],
    ['Although..., but...', 'Although..., ...', 'Day 9'],
    ['I enjoy to read.', 'I enjoy reading.', 'Day 10'],
    ['more easier', 'easier', 'Day 12']
  ]
}
};
