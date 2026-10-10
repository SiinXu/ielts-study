/* v5g 错题「举一反三」：按规则键（rule key）组织的类比池。
   每个池：规则名、何时适用、常见误用、迁移提示、错误/正确示范场景 + 4–6 组同规则的 ✗/✓ 类比（各带场景）。
   条目 → 规则键由 related.js 的 classify() 按版块小节 + 原因关键词自动判定，489 条全部覆盖。 */
(function(){
function M(nz, ne, az, ae, mz, me, tz, te, sb, sg, ex){ return {name:[nz,ne], app:[az,ae], mis:[mz,me], tip:[tz,te], sb:sb, sg:sg, ex:ex}; }
var R = {};
R.agree = M("主谓一致 / 单复数","Subject–verb agreement",
 "主语是第三人称单数（he / she / it / each / every / the number of）时动词加 -s；复数主语（people / police / the elderly）用复数动词。","Third-person singular subjects (he, each, every, the number of) take -s; plural subjects (people, police, the elderly) take plural verbs.",
 "口语里漏 -s；被中间的修饰语（of the students）带偏；把 police / people 当单数；the number of 和 a number of 混用。","Dropping -s in speech; being misled by phrases like 'of the students'; treating police/people as singular; mixing the number of / a number of.",
 "找真正的主语：先划掉 of 短语和从句，再决定动词单复数。","Find the real subject: cross out 'of ...' phrases first, then choose the verb.",
 "p1w","t2e",
 [["My manager live in Sydney.","My manager lives in Sydney.","p1w"],["Each of the projects have a deadline.","Each of the projects has a deadline.","cw"],["The number of cars have doubled.","The number of cars has doubled.","t1d"],["A number of students was absent.","A number of students were absent.","t2e"],["The people in my city is friendly.","The people in my city are friendly.","p1"],["Everyone in my team speak English.","Everyone in my team speaks English.","p1w"]]);
R.timeprep = M("since / for / during / while / by / until","Time words: since, for, during, while, by, until",
 "since + 时间点、for + 时间段（都配完成时）；during + 名词、while + 句子；by = 截止前完成，until = 持续到某时。","since + point, for + period (with perfect tenses); during + noun, while + clause; by = deadline, until = continuing up to.",
 "since 接时间段（since 3 years）；during 后接句子；用 until 表达截止（finish until Friday）。","since + a period; during + a clause; until for deadlines.",
 "先问“是时间点还是时间段？是名词还是句子？是截止还是持续？”三问选词。","Ask: point or period? noun or clause? deadline or duration?",
 "p1","p1",
 [["I've worked here since two years.","I've worked here for two years.","p1w"],["I have known her for 2015.","I have known her since 2015.","p1"],["During I was at university, I worked part-time.","While I was at university, I worked part-time.","p2"],["Please send it until Monday.","Please send it by Monday.","em"],["I'll wait by 6 pm.","I'll wait until 6 pm.","dl"],["Prices have risen since the last five years.","Prices have risen over the last five years.","t1d"]]);
R.tense = M("时态（过去时 / 完成时）","Tense: past vs present perfect",
 "有明确过去时间（last year / in 2019 / when I was a child）用一般过去时；“到现在为止”“经历”用现在完成时；讲过去经历全程用过去时。","Finished past time → past simple; up to now or life experience → present perfect; tell past stories in the past.",
 "have been + 明确过去时间；Part 2 讲过去的故事用现在时；“到现在还没”用一般过去时。","Present perfect with a finished time; present tense for past stories; past simple for 'still not yet'.",
 "看时间词：有具体过去时间 → 过去时；有 so far / yet / ever → 完成时。","Check time words: a finished time → past; so far / yet / ever → perfect.",
 "p2","p2",
 [["I have visited Paris in 2019.","I visited Paris in 2019.","p2"],["Yesterday I go to the gym.","Yesterday I went to the gym.","p1"],["I didn't finish the report yet.","I haven't finished the report yet.","cw"],["When I was a kid, I play outside every day.","When I was a kid, I played outside every day.","p2"],["I live here for ten years.","I have lived here for ten years.","p1"],["Sales increase sharply in 2010.","Sales increased sharply in 2010.","t1d"]]);
R.cond = M("条件句 / 虚拟语气 / 时间从句","Conditionals, wishes and time clauses",
 "if / when / as soon as 引导的从句用现在时表将来；假设现在不真实用 If + 过去时, would；wish 后用过去式（could / were）。","If/when/as soon as clauses use present for future; unreal present uses past + would; wish + past (could/were).",
 "从句里加 will；前后时态不配（If I had ..., I will ...）；wish 后用 can。","Adding will in the clause; mismatched tenses; wish + can.",
 "主句管将来，从句管条件：will 只出现在主句。","The main clause carries the future; will stays out of the if/when clause.",
 "p3","p3",
 [["If it will rain, we will stay home.","If it rains, we will stay home.","dl"],["As soon as I will get the results, I'll tell you.","As soon as I get the results, I'll tell you.","cw"],["If I was rich, I will buy a house.","If I were rich, I would buy a house.","p3"],["I wish I can travel more.","I wish I could travel more.","p1"],["If governments invest more, people would be happier.","If governments invested more, people would be happier.","t2e"],["I'll text you when I will land.","I'll text you when I land.","dl"]]);
R.article = M("冠词 a / an / the / 零冠词","Articles: a, an, the, zero",
 "可数单数第一次出现用 a / an（看发音）；特指、最高级、独一无二、年代、the UK 用 the；泛指抽象概念、复数泛指、三餐、球类、go to bed / school 不加。","a/an for first mention (by sound); the for specific, superlatives, unique things, decades, the UK; none for general abstract nouns, plural generalisations, meals, sports, go to bed/school.",
 "职业前漏 a（He is engineer）；抽象名词前乱加 the（The life）；按字母而不是发音选 a / an；最高级漏 the。","Missing a before jobs; the before abstract nouns; a/an by spelling not sound; no the with superlatives.",
 "写完扫一遍每个单数可数名词：前面有没有 a / the / my / this？","Scan every singular countable noun: does it have a/the/my/this?",
 "t2e","t2e",
 [["My sister is doctor.","My sister is a doctor.","p1w"],["The technology is changing our lives.","Technology is changing our lives.","t2b"],["It took me a hour.","It took me an hour.","p2"],["She is most popular teacher.","She is the most popular teacher.","p2"],["I want to study in USA.","I want to study in the USA.","p1w"],["After the work, I go to the gym.","After work, I go to the gym.","p1"]]);
R.count = M("可数 / 不可数名词","Countable vs uncountable nouns",
 "information / advice / research / equipment / news / furniture / feedback / data(多作不可数) 没有复数，不用 a；数量用 a piece of / some；可数用 many / fewer / number，不可数用 much / less / amount。","Uncountable nouns (information, advice, news, equipment, feedback) take no -s or a; use some / a piece of; many/fewer/number for countables, much/less/amount for uncountables.",
 "informations / advices；a news；less people；the amount of people。","informations, advices, a news, less people, the amount of people.",
 "不确定时查词典的 [U]/[C] 标记；不可数名词的“个数”靠 a piece of。","Check [U]/[C] in a dictionary; count uncountables with 'a piece of'.",
 "em","t2e",
 [["Can you give me some advices?","Can you give me some advice?","dl"],["We need more equipments.","We need more equipment.","cw"],["There were less cars on the road.","There were fewer cars on the road.","t1d"],["The amount of students increased.","The number of students increased.","t1d"],["Thanks for your feedbacks.","Thanks for your feedback.","em"],["I have a homework to do.","I have some homework to do.","p1"]]);
R.clause = M("句子结构（从句、逗号连接、双谓语）","Sentence structure: fragments, comma splices, double verbs",
 "一个完整句子 = 一个主语 + 一个谓语；两个完整句子用句号、分号或连词连接；Because / Although 从句必须挂在主句上。","One clause = one subject + one finite verb; join two sentences with a full stop, semicolon or conjunction; Because/Although clauses need a main clause.",
 "逗号直接连两个句子；从句单独成句；There are many people want ...（两个谓语）；It has ... 表示“有”。","Comma splices; stand-alone subordinate clauses; two finite verbs ('There are people want'); 'It has' for existence.",
 "每句数一下谓语动词：多于一个且没有连词/关系词，就要拆句或改结构。","Count finite verbs: more than one without a linker means split or restructure.",
 "t2e","t2e",
 [["Online learning is flexible, it saves money.","Online learning is flexible, and it saves money.","t2e"],["Because the rent is too high.","Many people leave the city because the rent is too high.","t2e"],["There are many students like this course.","Many students like this course.","p1"],["It has a big park near my home.","There is a big park near my home.","p1"],["Although it was late. We kept working.","Although it was late, we kept working.","cw"],["I have a friend lives in Perth.","I have a friend who lives in Perth.","p1"]]);
R.double = M("重复表达（连词 / 语义重复）","Redundancy: doubled linkers and meanings",
 "although 和 but、because 和 so 只能用一个；in my opinion 和 I think 只用一个；return / reason / discuss 本身已含的意思不再重复。","Use either although or but, because or so; either in my opinion or I think; don't repeat meanings already in return, reason, etc.",
 "Although ..., but ...；Because ..., so ...；return back；the reason is because；I'll give you a call to you。","Although ... but; Because ... so; return back; the reason is because.",
 "每个想法只说一次：写完删掉意思重复的词。","Say each idea once: delete words that repeat meaning.",
 "t2e","t2e",
 [["Although it rained, but we went out.","Although it rained, we went out.","p2"],["Because the bus was late, so I missed the class.","Because the bus was late, I missed the class.","p2"],["In my opinion, I think it's useful.","In my opinion, it's useful.","p3"],["Please repeat again.","Please repeat that.","rs"],["The reason is because it's cheaper.","The reason is that it's cheaper.","t2e"],["We need to cooperate together.","We need to cooperate.","cw"]]);
R.verbpat = M("动词句型（doing / to do / 原形 / 宾语）","Verb patterns: -ing, to do, bare infinitive, objects",
 "每个动词后接什么是固定的：make / let + 原形；suggest + doing / that；look forward to + doing；worth + doing；tell + 人，say + 内容；agree 本身是动词。","Each verb has a fixed pattern: make/let + bare infinitive; suggest + -ing/that; look forward to + -ing; worth + -ing; tell + person, say + words; agree is already a verb.",
 "make him to do；suggest me to；look forward to hear；say me；I am agree；enjoy to do。","make him to do; suggest me to; look forward to hear; say me; I am agree; enjoy to do.",
 "背动词时连后面的结构一起背：enjoy doing、decide to do、let sb do。","Learn verbs with their pattern: enjoy doing, decide to do, let sb do.",
 "cw","em",
 [["My boss let me to leave early.","My boss let me leave early.","cw"],["I enjoy to read on the train.","I enjoy reading on the train.","p1"],["She suggested me to apply.","She suggested that I apply.","cw"],["I look forward to meet you.","I look forward to meeting you.","em"],["He said me the news.","He told me the news.","p2"],["I am agree with the plan.","I agree with the plan.","cw"]]);
R.passive = M("被动语态","Passive voice",
 "动作的承受者作主语时用 be + 过去分词；happen / occur / appear / rise 等不及物动词没有被动。","Use be + past participle when the receiver is the subject; intransitive verbs (happen, occur, rise) have no passive.",
 "漏 be（can solved）；不及物动词用被动（was happened）。","Missing be; passive with intransitive verbs.",
 "先问动词能不能直接带宾语：不能带宾语的动词永远不用被动。","If a verb can't take an object, it never goes passive.",
 "t1p","t1p",
 [["The beans are dry in the sun.","The beans are dried in the sun.","t1p"],["The accident was occurred at night.","The accident occurred at night.","p2"],["The report must finish today.","The report must be finished today.","cw"],["Prices were risen last year.","Prices rose last year.","t1d"],["A new bridge built in 2010.","A new bridge was built in 2010.","t1p"]]);
R.prep = M("介词搭配（形容词 / 动词 + 介词）","Dependent prepositions",
 "很多形容词和动词后接固定介词：good at、depend on、responsible for、famous for、similar to、married to、afraid of、worried about、prefer A to B。","Many adjectives/verbs take fixed prepositions: good at, depend on, responsible for, similar to, married to, afraid of, worried about, prefer A to B.",
 "按中文直译介词（different with、angry to、famous of）；漏掉必须的介词（wait me、pay the coffee）。","Translating prepositions directly; dropping required ones (wait me, pay the coffee).",
 "把“词 + 介词”当一个整体记，造 3 个句子固定下来。","Learn word + preposition as one chunk and make three sentences.",
 "p1","t2e",
 [["I'm interested on photography.","I'm interested in photography.","p1"],["It depends of the weather.","It depends on the weather.","p3"],["She is good in public speaking.","She is good at public speaking.","p1w"],["I'm worried for my exam.","I'm worried about my exam.","dl"],["This app is similar with WeChat.","This app is similar to WeChat.","p3"],["Can you wait me here?","Can you wait for me here?","dl"]]);
R.prepzero = M("不该加的介词","Verbs that take no preposition",
 "discuss / mention / emphasise / reach / enter / contact / marry / attend 直接接宾语；home / there / abroad / downtown 前不加 to。","discuss, mention, emphasise, reach, enter, contact, marry, attend take a direct object; no to before home/there/abroad.",
 "discuss about、contact with、go to home、go to there、despite of。","discuss about, contact with, go to home, go to there, despite of.",
 "这些动词在中文里常带“关于/和”，英语里不带：先说动词，直接跟宾语。","Chinese adds 'about/with' — English doesn't: verb + object directly.",
 "cw","em",
 [["Let's discuss about the budget.","Let's discuss the budget.","cw"],["Please contact with me by email.","Please contact me by email.","em"],["I went to home early.","I went home early.","p1"],["We reached to the airport at 6.","We reached the airport at 6.","p2"],["She married with a teacher.","She married a teacher.","dl"],["He wants to go to abroad.","He wants to go abroad.","p1"]]);
R.timeat = M("时间地点介词 in / on / at","in / on / at for time and place",
 "at + 钟点 / 夜里 / 周末(英)；on + 星期 / 具体日期；in + 月 / 年 / 季节 / 上午下午；交通：by bus（无冠词）、on the bus、in the car。","at + clock time/night; on + days/dates; in + months/years/seasons/the morning; by bus, on the bus, in the car.",
 "in Monday、on 2020、in 3 pm、in night、by the bus；on time 和 in time 混用。","in Monday, on 2020, in 3 pm, in night, by the bus; confusing on time / in time.",
 "从大到小：in（年月）→ on（日）→ at（点）。","Big to small: in (year/month) → on (day) → at (time).",
 "ls","em",
 [["The meeting is in Friday.","The meeting is on Friday.","cw"],["I was born on 1998.","I was born in 1998.","p1"],["See you in 7 pm.","See you at 7 pm.","dl"],["I usually go by the train.","I usually go by train.","p1"],["The course starts at 3 March.","The course starts on 3 March.","ls"],["I arrived on time to catch the last bus.","I arrived in time to catch the last bus.","p2"]]);
R.adjed = M("-ed / -ing 形容词","-ed vs -ing adjectives",
 "-ed 描述人的感受（bored / interested / excited）；-ing 描述引起感受的事物（boring / interesting / exciting）。","-ed describes how people feel; -ing describes what causes the feeling.",
 "I'm boring / I'm interesting in ...（把自己说成“无聊的人”）。","'I'm boring' / 'I'm interesting in' — saying you are boring.",
 "主语是人且在说感受 → -ed；在评价事物 → -ing。","People feeling → -ed; judging things → -ing.",
 "p1","p1",
 [["I was very confusing by the instructions.","I was very confused by the instructions.","p2"],["The lecture was bored.","The lecture was boring.","p1"],["I'm exciting about the trip.","I'm excited about the trip.","dl"],["She felt embarrassing.","She felt embarrassed.","p2"],["That's a surprised result.","That's a surprising result.","t1o"],["I'm tiring after work.","I'm tired after work.","p1w"]]);
R.order = M("间接问句 / 宾语从句语序","Word order in indirect questions",
 "Can you tell me / I don't know / I wonder 后面的疑问词从句用陈述句语序（主语在动词前）。","After Can you tell me / I don't know / I wonder, use statement order (subject before verb).",
 "保留直接问句语序：where is the station、what is his name、why did he leave。","Keeping question order after these openers.",
 "把问句拆成“疑问词 + 主语 + 动词”：where + the station + is。","Rebuild as wh-word + subject + verb.",
 "sv","sv",
 [["Do you know where is the toilet?","Do you know where the toilet is?","sv"],["I wonder why did she leave.","I wonder why she left.","p2"],["Could you tell me what time does the shop open?","Could you tell me what time the shop opens?","sv"],["I'm not sure how much does it cost.","I'm not sure how much it costs.","dl"],["Can you explain what is the problem?","Can you explain what the problem is?","cw"]]);
R.compare = M("比较级 / 最高级","Comparatives and superlatives",
 "单音节加 -er / -est，多音节用 more / most，二者不叠加；最高级前加 the；修饰比较级用 much / far / slightly，不用 very。","Short adjectives take -er/-est, long ones more/most — never both; the before superlatives; much/far/slightly, not very, before comparatives.",
 "more easier、the most highest、very better、比较对象不对等（Japan is higher than China）。","more easier, the most highest, very better, unequal comparisons.",
 "写完比较句检查三件事：没叠加、有 the、比较对象同类。","Check: no doubling, the before superlatives, like-for-like.",
 "t1d","t1d",
 [["This method is more faster.","This method is faster.","t2e"],["It was the most biggest city.","It was the biggest city.","p2"],["Her score was very higher than mine.","Her score was much higher than mine.","dl"],["London's rent is higher than Sydney.","London's rent is higher than Sydney's.","t1d"],["He is taller of the three.","He is the tallest of the three.","p1"]]);
R.modifier = M("程度副词怎么修饰（very / really / almost）","Modifiers: very, really, almost",
 "very 修饰形容词和副词，不修饰动词（用 really / very much）；almost 修饰 all / every / no，不直接修饰名词；hardly = 几乎不；极端形容词（delicious / exhausted）不用 very。","very modifies adjectives/adverbs, not verbs (use really / very much); almost goes with all/every/no; hardly means 'barely'; no very with extreme adjectives.",
 "I very like、I very agree、almost students、work hardly、very delicious。","I very like, I very agree, almost students, work hardly, very delicious.",
 "动词前想说“很”→ really；名词前想说“几乎所有”→ almost all。","Before a verb use really; before a noun use almost all.",
 "p1","p1",
 [["I very enjoy my job.","I really enjoy my job.","p1w"],["Almost people use phones.","Almost all people use phones.","t2e"],["She studies very hardly.","She studies very hard.","p1"],["The view was very amazing.","The view was absolutely amazing.","p2"],["I very want to see it.","I really want to see it.","dl"]]);
R.colloc = M("动名词搭配（make / do / take / gain ...）","Verb–noun collocations",
 "名词决定动词：make a decision / progress / a mistake；do homework / research；take medicine / a photo / an exam；gain knowledge / experience；meet a deadline；commit a crime。","The noun chooses the verb: make a decision, do research, take medicine, gain experience, meet a deadline, commit a crime.",
 "按中文选动词：learn knowledge、eat medicine、catch the deadline、do a decision、open the light。","Choosing verbs from Chinese: learn knowledge, eat medicine, catch the deadline, open the light.",
 "背名词时连它的动词一起背，用词典的 collocations 栏。","Learn each noun with its verb; use the dictionary's collocations box.",
 "t2e","t2e",
 [["I did a big mistake.","I made a big mistake.","p2"],["We should make more research.","We should do more research.","t2e"],["He learned a lot of experience.","He gained a lot of experience.","p1w"],["Can you open the air conditioner?","Can you turn on the air conditioner?","dl"],["We caught the deadline.","We met the deadline.","cw"],["They made a crime.","They committed a crime.","t2x"]]);
R.chinglish = M("中式直译","Direct translation from Chinese",
 "中文习惯说法（吃饭、加油、人山人海、第一次来）在英语里要换成英语的固定说法，而不是逐字翻译。","Chinese set phrases need English equivalents, not word-for-word translation.",
 "Let's eat rice、Add oil、People mountain people sea、It's my first time to come、I think it's not good。","Let's eat rice, Add oil, People mountain people sea, first time to come.",
 "先想“英语母语者在这个场景会说什么”，再套句子，不从中文出发。","Ask what a native speaker says in that situation; don't start from Chinese.",
 "dl","dl",
 [["Long time no see you.","It's been ages!","dl"],["I'm very hot today.","It's really hot today.","dl"],["Open the TV, please.","Turn on the TV, please.","dl"],["My English is very poor, please forgive.","Sorry, could you say that a bit more slowly?","rs"],["Give you.","Here you go.","sv"],["I will go to sleep a while.","I'm going to take a nap.","dl"]]);
R.polite = M("礼貌语气与得体请求","Politeness and requests",
 "请求、点单、催进度用 Could I / Could you / Would you mind；不同意先缓冲（I see your point, but ...）；不评论身材、年龄、收入。","Use Could I / Could you / Would you mind for requests; soften disagreement; avoid comments on body, age, income.",
 "祈使句点单（Give me a coffee）；直接催促（Reply me ASAP）；Do you understand? 质疑对方；直接问名字。","Imperative orders; blunt chasing; 'Do you understand?'; asking names bluntly.",
 "把祈使句换成问句：Give me → Could I get；Check it → Could you take a look。","Turn imperatives into questions.",
 "sv","em",
 [["Give me the menu.","Could I see the menu, please?","sv"],["Send me the file now.","Could you send me the file when you get a chance?","em"],["You are wrong.","I see it a bit differently.","cw"],["Tell me your phone number.","Could I get your phone number?","dl"],["Hurry up and reply.","Just checking in on this — any update?","em"],["Do you understand what I said?","Does that make sense?","cw"]]);
R.register = M("写作正式语体与套话","Formal register and clichés",
 "Task 2 用完整形式（do not）、正式词（children / many）、第三人称泛指（people / individuals）；开头直接改写题目。","Task 2 needs full forms, formal words, third-person generalisations; open by paraphrasing.",
 "缩写和口语词（don't / kids / stuff / a lot of）；万能开头（With the rapid development ...）；As we all know；more and more；Last but not least。","Contractions and slang; memorised openers; as we all know; more and more; last but not least.",
 "写完把每个“口语词 / 套话”换成更精确的说法：a lot of → a large number of。","Replace each informal word or cliché with a precise alternative.",
 "t2b","t2b",
 [["Kids spend a lot of time on phones.","Children spend a considerable amount of time on phones.","t2e"],["It's gonna get worse.","The situation is likely to deteriorate.","t2e"],["As we all know, pollution is bad.","Pollution is widely recognised as harmful.","t2i"],["More and more people work from home.","An increasing number of people work from home.","t2i"],["If you study hard, you will succeed.","Students who study consistently tend to succeed.","t2e"],["Last but not least, it is cheap.","Finally, it is inexpensive.","t2e"]]);
R.wstruct = M("写作任务与结构","Task response and structure",
 "每段一个中心句；立场全文一致；结尾只总结不加新观点；字数够、先写大作文；例子简短扣题。","One topic sentence per paragraph; consistent stance; no new ideas in the conclusion; enough words; Task 2 first; short, relevant examples.",
 "主体段没中心句；结尾冒出新观点；连接词机械堆砌；例子写成长故事；字数不够。","No topic sentence; new ideas in the conclusion; mechanical linkers; long story examples; under length.",
 "写完逐段只读第一句：能否连成一篇提纲？不能就改中心句。","Read only first sentences — they should form an outline.",
 "t2b","t2b",
 [["Firstly, ... Secondly, ... Moreover, ... Furthermore, ... (every sentence)","Use linkers only where the logic changes; use pronouns and synonyms elsewhere.","t2e"],["(Body paragraph starting with an example)","The main reason is that ... (topic sentence first)","t2b"],["In conclusion, another problem is noise.","In conclusion, the two main benefits are ... (no new point)","t2c"],["(230-word Task 2)","(260–290 words)","t2c"],["I agree ... (intro) / I disagree ... (conclusion)","Keep the same stance throughout.","t2c"]]);
R.t1chart = M("小作文图表描述","Task 1 data language",
 "增减用 by（变化量）/ to（终点）/ from ... to；increase in + 对象；副词匹配幅度；过去数据用过去时，预测用 is projected to；概述不写数字。","Use by (amount), to (end), from...to; increase in; adverbs matching size; past tense for past data, projected for forecasts; no numbers in the overview.",
 "increased 20%（漏 by）；increase of sales；1% 写 dramatically；比较国家而不是数据；概述写数字；Firstly / Secondly 组织数据。","Missing by; increase of; dramatic for 1%; comparing countries not figures; numbers in overview; Firstly/Secondly.",
 "每个数据句检查：介词 by / to / from、副词大小、时态、比较对象。","Check every data sentence: preposition, adverb size, tense, comparison.",
 "t1d","t1d",
 [["Sales increased 15%.","Sales increased by 15%.","t1d"],["There was a rise of exports.","There was a rise in exports.","t1d"],["The figure rose dramatically from 10% to 11%.","The figure rose slightly from 10% to 11%.","t1d"],["China is higher than India.","The figure for China was higher than that for India.","t1d"],["In 2040, the number will be 300.","The number is projected to reach 300 by 2040.","t1d"],["Overall, A was 30% and B was 20%.","Overall, A remained higher than B throughout.","t1o"]]);
R.speak = M("口语答题策略","Speaking strategy",
 "Part 1 2–4 句；Part 2 说满 2 分钟、串成故事；Part 3 观点 + 原因 + 例子 + 另一面；卡住用过渡语；he / she 分清。","Part 1: 2–4 sentences; Part 2: full 2 minutes as a story; Part 3: view + reason + example + other side; bridge pauses; get he/she right.",
 "只答 yes / no；Part 2 一问一答、1 分钟就停；Part 3 只讲个人经历；沉默想词；照念笔记；背模板。","Yes/no answers; Part 2 as Q&A or too short; Part 3 only personal; silent pauses; reading notes; memorised answers.",
 "每个回答问自己：有没有原因？有没有例子？Part 3 有没有扩展到“一般人”？","Ask: reason? example? (Part 3) wider society?",
 "p1","p1",
 [["Q: Do you like cooking? A: Yes.","Yes, I do — mainly because it helps me relax after work. I usually cook pasta on weekends.","p1"],["(Part 2 stops after 50 seconds)","Keep going with feelings and reasons until the examiner stops you.","p2"],["Q: Why do people move to cities? A: I moved for work.","In general, people move for jobs. For example, ... That said, ...","p3"],["My sister... he works in a bank.","My sister... she works in a bank.","p1"],["(Long silence searching for a word)","It's a kind of ... / Let me think ...","rs"],["Firstly ... Secondly ... In conclusion ...","First of all ... Another thing is ... So overall ...","p3"]]);
R.variety = M("表达多样性","Lexical and structural variety",
 "同一个意思准备 3 种说法：观点、举例、对比、推测、评价；考官看词汇和句式多样性。","Have three ways to say each function: opinion, example, contrast, speculation, evaluation.",
 "每句 I think / for example / but / very good / will 循环使用。","Cycling I think / for example / but / very good / will.",
 "给 5 个高频功能各建一个 3 词小表，练习时强制轮换。","Make a 3-item list for 5 functions and rotate them.",
 "p3","p3",
 [["I think ... I think ... I think ...","I'd say ... / To me, ... / Personally, ...","p3"],["It was very good.","It was fantastic / really rewarding.","p2"],["For example ... for example ...","For instance ... / Take ... for example ...","p3"],["but ... but ... but ...","whereas ... / that said ... / on the other hand ...","p3"],["It will happen.","It's likely that ... / I imagine ...","p3f"]]);
R.exam = M("听力阅读答题规范","Listening and reading test technique",
 "严格按字数要求；填原文的词、拼写和单复数都算分；FALSE = 原文相反，NOT GIVEN = 原文没提；只根据原文；不留空。","Follow word limits; copy words exactly (spelling and plurals count); FALSE = contradicts, NOT GIVEN = not mentioned; use only the text; never leave blanks.",
 "超字数；漏 -s；被改口信息误导；用常识判断；FALSE 和 NOT GIVEN 混淆；机考最后才填。","Exceeding limits; missing -s; distractors; common-sense answers; FALSE vs NOT GIVEN; filling in at the end on computer.",
 "交卷前三查：字数、拼写、单复数。","Before submitting: word count, spelling, plurals.",
 "ls","ls",
 [["(NO MORE THAN TWO WORDS) a large garden","large garden","ls"],["book (audio says 'books')","books","ls"],["(Speaker says Tuesday, then 'sorry, Thursday') Tuesday","Thursday","ls"],["Text doesn't mention price → FALSE","NOT GIVEN","rd"],["(Gap left empty)","Write your best guess — no penalty.","ls"],["the environment protection (text: environmental protection)","environmental protection","rd"]]);
R.confuse = M("形近 / 音近易混词","Commonly confused words",
 "拼写或发音接近、意思不同的词：先看词性（affect 动词 / effect 名词），再看意思（lose 丢 / loose 松）。","Similar-looking words: check part of speech first (affect v. / effect n.), then meaning (lose / loose).",
 "写作里拼对了词但用错了词（their / there、its / it's、then / than），拼写检查查不出来。","Using a real but wrong word — spellcheck won't catch it.",
 "给每组造一句同时包含两个词的句子：I lost my loose ring。","Make one sentence that uses both words.",
 "em","t2e",
 [["The new law will effect everyone.","The new law will affect everyone.","t2e"],["Its going to rain.","It's going to rain.","dl"],["She is taller then me.","She is taller than me.","p1"],["Can you advice me?","Can you advise me?","dl"],["I don't want to loose my job.","I don't want to lose my job.","p1w"],["Their going to the office.","They're going to the office.","em"]]);
R.synonym = M("近义词辨析","Near-synonyms",
 "意思相近但用法不同：看搭配对象（job 可数 / work 不可数）、及物与否（raise / rise）、语气（famous / notorious）、方向（bring / take）。","Close meanings, different use: countability, transitivity, tone, direction.",
 "用中文同一个词代替所有英文近义词：“说” = say、“看” = see、“工资” = salary。","Using one English word for every meaning of a Chinese word.",
 "每组记一个典型搭配：watch TV / see a doctor / look at the board。","Learn one fixed collocation for each word.",
 "p1","p1",
 [["I watched him at the party.","I saw him at the party.","p2"],["She speaks that she is busy.","She says that she is busy.","dl"],["I have many works today.","I have a lot of work today.","p1w"],["Please take your laptop here.","Please bring your laptop here.","cw"],["He is a notorious scientist.","He is a famous scientist.","p3"],["The government should rise taxes.","The government should raise taxes.","t2e"]]);
R.silent = M("不发音字母","Silent letters",
 "b（doubt、climb）、h（hour、honest）、k（knowledge、know）、p（psychology、receipt）、t（mortgage、listen）、s（island、debris）、l（salmon、walk）常不发音。","Silent b, h, k, p, t, s, l in common words.",
 "按拼写逐字母读：clim-b、k-now、psy-cho、mort-gage。","Pronouncing every letter as spelled.",
 "遇到 mb / kn / ps / st 组合先怀疑有不发音字母，查一次发音。","Be suspicious of mb, kn, ps, st clusters — check once.",
 "pr","pr",
 [["/klaɪmb/ (climb)","/klaɪm/","pr"],["/ˈkɒnəʊ/ k-now","/nəʊ/ (know)","pr"],["/pˈsaɪkɒlədʒi/","/saɪˈkɒlədʒi/ (psychology)","pr"],["/ˈlɪstən/ (t pronounced)","/ˈlɪsn/ (listen)","pr"],["/ˈaɪslənd/","/ˈaɪlənd/ (island)","pr"],["/wɔːlk/ (l pronounced)","/wɔːk/ (walk)","pr"]]);
R.stress = M("单词重音","Word stress",
 "-tion / -sion / -ic 结尾重音在前一个音节；-ology / -onomy 重音在倒数第三音节；很多两音节名词重音在前。","Stress falls before -tion/-sion/-ic; on the third-last syllable in -ology/-onomy; many two-syllable nouns are stressed first.",
 "每个音节一样重；把重音放错位置（tech-no-LO-gy、ho-TEL 读成 HO-tel）。","Equal stress on every syllable; misplaced stress.",
 "查词典时看重音符号 ˈ，并大声拍手读一遍音节。","Check the ˈ mark and clap the syllables.",
 "pr","pr",
 [["pho-to-GRA-phy","pho-TO-gra-phy","pr"],["e-co-NO-my","e-CO-no-my","pr"],["de-ve-LOP-ment","de-VE-lop-ment","pr"],["HO-tel","ho-TEL","pr"],["a-NA-lyse","AN-a-lyse","pr"],["en-vi-RON-ment","en-VI-ron-ment","pr"]]);
R.place = M("地名读法","Place names",
 "英、澳、新地名常有弱读和不发音字母：-ford / -bury / -bourne / -wich / -cester 结尾都弱读。","UK/AU/NZ place names reduce endings: -bourne, -wich, -cester are weak.",
 "按拼写重读结尾（Mel-BORN、Leices-TER）。","Stressing spelled endings.",
 "听当地人读一次（新闻、地图 App 语音），记弱读规律。","Listen once to local pronunciation and note the weak endings.",
 "ls","ls",
 [["Mel-BORN","/ˈmelbən/ (Melbourne)","ls"],["Lei-ces-ter","/ˈlestə/ (Leicester)","ls"],["Green-WICH","/ˈɡrenɪtʃ/ (Greenwich)","ls"],["Edin-BURG","/ˈedɪnbərə/ (Edinburgh)","ls"],["Bris-BANE","/ˈbrɪzbən/ (Brisbane)","ls"],["Wor-ces-ter","/ˈwʊstə/ (Worcester)","ls"]]);
R.tech = M("职场 / 行业高频词读法","Workplace and tech terms",
 "行业词按英语习惯读：cache = cash、query /ˈkwɪəri/、niche /niːʃ/、mortgage t 不发音、data /ˈdeɪtə/ 或 /ˈdɑːtə/。","Read industry words the English way: cache = cash, query, niche, mortgage (silent t), data.",
 "按拼音或拼写猜读（ca-che、mort-gage），开会时对方听不懂。","Guessing from spelling, confusing colleagues.",
 "开会前把要说的 5 个专业词查一次发音并读给自己听。","Before meetings, check and say aloud five key terms.",
 "cw","cw",
 [["/kæˈtʃeɪ/ (cache)","/kæʃ/","cw"],["/ˈmɔːtɡeɪdʒ/","/ˈmɔːɡɪdʒ/ (mortgage)","dl"],["/naɪtʃ/","/niːʃ/ (niche)","cw"],["/ˈsuːt/ (suite)","/swiːt/","cw"],["/ˈepɒtʃ/","/ˈiːpɒk/ (epoch)","cw"],["/ɑːˈkaɪv/","/ˈɑːkaɪv/ (archive)","cw"]]);
R.pron = M("音节与元音读法","Syllables and vowels",
 "很多常用词实际读得比拼写少一个音节（comfortable、vegetable、interesting）；同形词按词性/时态变读音（read / lead）。","Many words lose a syllable in speech; homographs change with meaning or tense.",
 "逐字母读出每个音节（com-for-ta-ble）；read 过去式仍读 /riːd/。","Pronouncing every written syllable; read (past) as /riːd/.",
 "跟读时数一下实际音节数，和拼写对比。","Count real syllables when shadowing.",
 "pr","pr",
 [["com-for-ta-ble (4)","/ˈkʌmftəbl/ (3)","pr"],["ve-ge-ta-ble (4)","/ˈvedʒtəbl/ (3)","pr"],["choco-late (3)","/ˈtʃɒklət/ (2)","pr"],["I read (/riːd/) it yesterday.","I read (/red/) it yesterday.","p2"],["clo-thes (2)","/kləʊðz/ (1)","pr"],["fa-mi-ly (3, stressed evenly)","/ˈfæmli/ (2)","pr"]]);
R.brame = M("英式 / 美式差异","British vs American English",
 "雅思两种都接受，但全文统一；澳新多用英式：-our、-re、-ise、双写 l（travelled）、名词 -ce（licence）。","Both are accepted but be consistent; AU/NZ use British forms: -our, -re, -ise, travelled, licence (n.).",
 "同一篇里 color 和 centre 混用；动词名词 license / licence 不分。","Mixing spellings in one text; confusing licence/license.",
 "考前选定一种，输入法和拼写检查也设成对应语言。","Pick one variety and set your spellchecker to match.",
 "t2e","t2e",
 [["color ... centre (same essay)","colour ... centre","t2e"],["organize ... realise","organise ... realise","t2e"],["traveled","travelled","em"],["a driving license (noun, UK)","a driving licence","gt"],["program (TV, UK)","programme","t2e"],["/təˈmeɪtəʊ/ vs /təˈmɑːtəʊ/","Both are fine — just be consistent.","pr"]]);
R.culture = M("职场与跨文化沟通","Workplace and cultural norms",
 "澳新职场直呼名字、守时、委婉表达不同意见、及时道谢；闲聊话题选周末、天气、食物。","In AU/NZ workplaces: first names, punctuality, softened disagreement, prompt thanks; small talk about weekends, weather, food.",
 "称呼 Sir / Boss；没听懂也说 Yes；开会迟到不打招呼；问年龄工资；直接说 No, this is wrong。","Sir/Boss; nodding without understanding; silent lateness; personal questions; blunt rejection.",
 "不确定时选更温和、更直接称名的一种。","When unsure, be softer and use first names.",
 "cw","cw",
 [["Good morning, Boss.","Morning, Sarah!","cw"],["Yes, yes. (didn't understand)","Sorry, could you run that by me again?","cw"],["(5 minutes late, no message)","Running 5 mins late — sorry!","cw"],["How much do you earn?","How was your weekend?","dl"],["That idea is wrong.","I'm not sure that'll work, because ...","cw"],["(No thanks after help)","Thanks so much, I really appreciate it.","cw"]]);
R.punct = M("标点和大小写","Punctuation and capitals",
 "星期、月份、语言、国籍、I 大写，季节小写；句首连接副词后加逗号；英文标点前不空格；年代复数 1990s 不加撇号；复合形容词加连字符。","Capitalise days, months, languages, nationalities, I; not seasons; comma after sentence adverbs; no space before punctuation; 1990s; hyphenate compound adjectives.",
 "中文标点混入；monday / english 小写；However 后没逗号；1990's；well known company。","Chinese punctuation; lowercase days/languages; no comma after However; 1990's; missing hyphen.",
 "交卷前专门扫一遍大写和标点，机考关掉中文输入法。","Do a final caps-and-punctuation sweep; switch off Chinese input.",
 "t2e","t2e",
 [["i think english is useful.","I think English is useful.","t2e"],["We met in Summer.","We met in summer.","p2"],["Therefore the plan failed.","Therefore, the plan failed.","t2e"],["It was cheap ,but slow .","It was cheap, but slow.","t2e"],["a two year course","a two-year course","t2e"],["in the 2000's","in the 2000s","t1d"]]);
R.number = M("数字、日期、单位","Numbers, dates and units",
 "具体数字后 hundred / thousand / million 不加 s；不确定数量用 millions of；percent 不加 s，名词用 percentage；日期读序数；句首数字拼写；百分比修饰名词加 of。","No -s after a specific number + million; millions of for vague amounts; percent has no -s; percentage as the noun; ordinal dates; spell out sentence-initial numbers; 20% of people.",
 "two millions；10 percents；the percent of；five October；3 people came. 句首；20% people。","two millions; 10 percents; the percent of; five October; digits at sentence start; 20% people.",
 "数字后面那个词：确定数量不加 s，不确定数量加 s + of。","Exact number → no -s; vague amount → -s + of.",
 "t1d","t1d",
 [["three thousands students","three thousand students","t1d"],["thousand of people","thousands of people","t2e"],["The percent of women rose.","The percentage of women rose.","t1d"],["15% students","15% of students","t1d"],["5 companies joined.","Five companies joined.","t1d"],["the third of May read as 'three May'","the third of May","ls"]]);
R.email = M("英文邮件规范","Email conventions",
 "知道名字就用 Hi / Dear + 名字（Mr / Ms + 姓）；开门见山说目的；结尾 Kind regards；主题说明来意；附件写 Please find attached。","Use Hi/Dear + name (Mr/Ms + surname); state your purpose early; Kind regards; a clear subject; 'Please find attached'.",
 "Dear Sir 给认识的人；Mr + 名；Waiting for your reply；全大写；没有主题；忘附件。","Dear Sir to known contacts; Mr + first name; 'Waiting for your reply'; all caps; no subject; missing attachment.",
 "发送前查四项：称呼、主题、第一句目的、附件。","Before sending: greeting, subject, purpose line, attachment.",
 "em","em",
 [["Dear Mr. Tom,","Hi Tom, / Dear Mr Smith,","em"],["I am writing this email to tell you ...","I'm writing to let you know ...","em"],["Waiting your reply.","I look forward to hearing from you.","em"],["Subject: Hello","Subject: Request to reschedule Friday's meeting","em"],["PLEASE CHECK ASAP","Could you check this by Thursday?","em"],["Best Regards,","Best regards,","em"]]);
R.spell = M("易拼错单词","Commonly misspelled words",
 "高频陷阱：双写辅音（committee、accommodate、occurred）、ie / ei（believe、receive、foreign）、-ar / -ent / -ence 结尾、去 e（truly、argument）。","Traps: double consonants, ie/ei, -ar/-ent/-ence endings, dropped e (truly, argument).",
 "按发音拼写，漏写不发音的字母或双写字母；听力填空拼错直接判错。","Spelling by sound, dropping silent or doubled letters — wrong in Listening.",
 "把易错词按规则分组（双写组 / ie-ei 组 / 去 e 组），每组听写一次。","Group words by rule and dictate each group.",
 "sp","sp",
 [["recomend","recommend","sp"],["beleive","believe","ls"],["goverment","government","t2e"],["occured","occurred","t2e"],["truely","truly","em"],["definately","definitely","t2e"]]);
R.work = M("职场与 AI 行业英语","Workplace and tech English",
 "说具体：给数字、时间、职责（I'll have it done by Thursday / reached 92% accuracy）；用行业常用词（ship、feature、run tests、get back to you）。","Be specific: numbers, deadlines, ownership; use standard terms (ship, feature, run tests, get back to you).",
 "空泛表态（I will do my best、very powerful、responsible for many things）；中式行业词（landing、feedback to you、my leader）。","Vague claims; Chinglish jargon (landing, feedback to you, my leader).",
 "每句工作英语自问：有没有动作、对象、时间或数字？","Ask: action, object, time or number?",
 "cw","cw",
 [["I will try my best to finish.","I'll have it ready by 3 pm tomorrow.","cw"],["The model effect is good.","The model performs well — 91% on the test set.","cw"],["I'll feedback to you later.","I'll get back to you this afternoon.","em"],["We need to landing this feature.","We need to ship this feature.","cw"],["My leader asked me to do it.","My manager asked me to do it.","p1w"],["This function is very powerful.","This feature saves users about ten minutes a day.","cw"]]);

window.IELTS_REL_MIS = R;
})();
