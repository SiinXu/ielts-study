/* v5g 模板详情：每个句式拆成独立块（何时用 / 何时不用 / 2–3 个例句 + 示范场景），
   外加「举一反三」同功能近义句式 + 1 个对比句式 + 迁移提示。
   键：表格行用第一格文字（用途），整段模板用条目 id。场景代码见 related.js 的 SCENE。 */
(function(){
function B(p, wz, we, nz, ne, ex){ return {p:p, w:[wz,we], n:[nz,ne], ex:ex}; }
var P = {};

P['表达观点'] = {
 main:[
  B("I firmly believe that ...","立场要鲜明时：Task 2 开头亮明观点、结尾重申观点。","When your stance must be clear: stating or restating your position in Task 2.","论证段中间每句都用会显得武断；口语 Part 1 小事用它太重。","Too strong mid-paragraph or for small Part 1 questions.",
   [["I firmly believe that public transport should be free for students.","t2i"],["In conclusion, I firmly believe that the benefits of remote work outweigh its costs.","t2c"]]),
  B("From my perspective, ...","给出个人视角、语气中性：Task 2 开头或 Part 3 回答第一句。","Neutral personal angle: Task 2 intro or the first line of a Part 3 answer.","不要和 I think 叠用（From my perspective, I think ...）。","Don't stack it with I think.",
   [["From my perspective, AI will create more jobs than it replaces.","t2i"],["From my perspective, cities should invest in parks before shopping malls.","p3"]]),
  B("It seems to me that ...","语气偏软、像在推理：口语 Part 3、讨论双方类作文的个人立场。","Softer, reasoning tone: Part 3 or your view in a discuss-both-views essay.","需要强硬表态（To what extent agree）时显得不够坚定。","Sounds too tentative when the task wants a firm stance.",
   [["It seems to me that young people are reading more, just on screens.","p3"],["It seems to me that both sides have a point, but the second is more convincing.","t2o"],["It seems to me that the problem is cost, not interest.","cw"]])],
 near:[
  B("In my view, ...","最通用的立场句，写作口语都能用。","The all-purpose stance opener for speaking and writing.","一篇里别连用三次以上。","Avoid using it more than twice in one essay.",
   [["In my view, homework should be limited for primary pupils.","t2i"],["In my view, it depends on the type of job.","p3"]]),
  B("I would argue that ...","想显得有论证感：口语 Part 3、Task 2 论证段首句。","Sounds analytical: Part 3 or a Task 2 topic sentence.","Part 1 聊爱好时太正式。","Too formal for Part 1 small talk.",
   [["I would argue that online learning works best for adults.","t2b"],["I'd argue that the government should step in here.","p3"]])],
 contrast:{lab:["对比：委婉不绝对（hedging）","Contrast: hedging"], b:B("It could be argued that ... / to some extent","不想把话说死、数据不足、话题有争议时。","When evidence is limited or the issue is contested.","需要清楚立场的开头段别只用它，否则考官找不到你的观点。","Don't hide your main position behind it in the intro.",
   [["It could be argued that social media has, to some extent, made people lonelier.","t2o"],["To some extent, I agree, but it really depends on age.","p3"]])},
 tip:["立场句只放在开头、段首和结尾；中间用理由和例子撑，不用反复说“我认为”。","Put stance phrases in the intro, topic sentences and conclusion; support the middle with reasons, not more 'I think'."]
};
P['引出他人观点'] = {
 main:[
  B("It is often argued that ...","引出常见观点再回应：Task 2 开头改写题目、讨论双方类第一个观点。","Introducing a common view before responding: Task 2 intro or the first view in a discussion essay.","不要用来表达你自己的立场，考官会以为这是别人的观点。","Not for your own view — the examiner will read it as someone else's.",
   [["It is often argued that technology makes people lazy.","t2i"],["It is often argued that zoos protect endangered species.","t2o"]]),
  B("Some people claim that ...","准备反驳的观点：claim 暗示你未必同意。","A view you plan to challenge — claim implies doubt.","引出你赞同的观点时用 claim 会自相矛盾。","Contradictory if you actually agree with the view.",
   [["Some people claim that university is a waste of money, but this ignores long-term earnings.","t2o"],["Some people claim that kids don't play outside anymore. I'm not so sure.","p3"]]),
  B("There is a widespread belief that ...","描述普遍看法：社会话题、Part 3 讨论趋势。","Describing a common belief about society: Part 3 or Task 2 background.","个人小事（我朋友认为）不用这么大的说法。","Too grand for one person's opinion.",
   [["There is a widespread belief that older people struggle with technology.","t2i"],["There's a widespread belief that fast food is always unhealthy.","p3"]])],
 near:[
  B("Many people believe that ...","中性、最安全，写作口语都适用。","Neutral and safe in both speaking and writing.","每篇都用会显得模板化。","Overused if it opens every essay.",
   [["Many people believe that working from home improves productivity.","t2i"],["Many people believe exams are the fairest way to judge students.","p3"]]),
  B("Supporters of ... point out that ...","讨论双方类，写一方的论据。","Presenting one side's argument in a discuss essay.","没有明确“一方”时别用。","Only when there is a clear group of supporters.",
   [["Supporters of the ban point out that it reduces pollution.","t2o"]])],
 contrast:{lab:["对比：你自己的立场","Contrast: your own stance"], b:B("I firmly believe that ... / In my view, ...","转回你自己的观点时，和他人观点形成对照。","Switching from others' views to yours.","不要连用在同一句里。","Don't use both in one sentence.",
   [["It is often argued that exams are stressful; in my view, they are still necessary.","t2i"]])},
 tip:["先用他人观点句铺开，再用 However / In my view 拉回自己的立场，形成“他说—我说”的结构。","Lead with others' view, then pull back with However / In my view — a clear 'they say, I say' move."]
};
P['原因'] = {
 main:[
  B("This is mainly because ...","解释上一句的主要原因：论证段第二句。","Explaining the previous claim: second sentence of a body paragraph.","不要写成独立的 Because ... 句子；前面要有被解释的句子。","Needs a claim before it; never a stand-alone Because clause.",
   [["Many graduates move to big cities. This is mainly because salaries are higher there.","t2e"],["I prefer the metro. This is mainly because it's never stuck in traffic.","p1"]]),
  B("... is largely due to ...","due to 后接名词短语，适合书面、分析原因。","due to + noun phrase; analytical and written.","due to 后不能直接接完整句子（due to people are busy ✗）。","No full clause after due to.",
   [["The rise in remote work is largely due to better online tools.","t2e"],["The drop in sales in 2015 was largely due to a new competitor.","t1d"]]),
  B("One key reason is that ...","列出多个原因中的一个：原因/解决类作文主体段。","Giving one of several reasons: cause/solution essays.","只有一个原因时说 one key reason 会让考官等第二个。","Implies more reasons will follow.",
   [["One key reason is that housing is too expensive for young couples.","t2b"],["One key reason is that the app is free.","p3"]])],
 near:[
  B("... stems from ...","原因来源更深层：写作里替换 because。","Deeper root cause; a written alternative to because.","口语日常聊天显得太书面。","Too bookish for casual speaking.",
   [["Much of the stress students feel stems from constant testing.","t2e"]]),
  B("The main reason (why) ... is that ...","口语写作都可，结构清楚。","Clear in both speaking and writing.","不要写成 the reason ... is because（语义重复）。","Avoid 'the reason ... is because'.",
   [["The main reason I study at night is that it's quieter.","p1w"],["The main reason cities are crowded is that jobs are concentrated there.","t2e"]])],
 contrast:{lab:["对比：结果（反方向）","Contrast: result (the other direction)"], b:B("As a result, ... / This leads to ...","原因说完要接后果时，切换到结果句式。","When you move from cause to consequence.","别在同一句里既 because 又 as a result。","Don't mix because and as a result in one sentence.",
   [["Rents have doubled. As a result, many young people live with their parents.","t2e"]])},
 tip:["原因句后面马上接例子或数据，原因才站得住。","Follow every reason with an example or figure."]
};
P['结果'] = {
 main:[
  B("As a result, ...","前一句是原因，这一句给后果：论证段推进。","Previous sentence is the cause; this gives the effect.","两句之间没有因果关系时别硬用。","Don't force it where there's no real cause.",
   [["Many factories closed. As a result, unemployment rose sharply.","t2e"],["I missed the bus. As a result, I was late for the interview.","p2"]]),
  B("This leads to ...","后果是名词或动名词：写作分析连锁反应。","Effect as a noun/-ing: describing chain reactions.","leads to 后不能接 do（leads to increase ✗）。","Not followed by a bare verb.",
   [["Longer working hours lead to higher stress levels.","t2e"],["This leads to more traffic in the city centre.","p3"]]),
  B("Consequently, ...","比 as a result 更正式：Task 2、学术写作。","More formal than as a result: Task 2.","口语里显得像念稿。","Sounds scripted in speaking.",
   [["Fewer students choose science. Consequently, there is a shortage of engineers.","t2e"]]),
  B("..., which means that ...","把结果挂在同一句后面，口语写作都自然。","Attaches the effect to the same sentence; natural everywhere.","which 前要有逗号，不要单独起句。","Needs a comma; not a new sentence.",
   [["Rents keep rising, which means that young people struggle to buy homes.","t2e"],["I work from home on Fridays, which means I can sleep in.","p1w"]])],
 near:[
  B("..., resulting in ...","同一句里补出结果，书面常用。","Adds the result in the same sentence; written.","resulting in 后接名词。","Follow with a noun.",
   [["Sales fell by 20%, resulting in several store closures.","t1d"]]),
  B("So, ...","口语最自然的结果连接。","The most natural spoken link for results.","Task 2 句首少用 So。","Avoid starting Task 2 sentences with So.",
   [["It was raining, so we stayed in and watched films.","p2"]])],
 contrast:{lab:["对比：原因（往回说）","Contrast: cause (looking back)"], b:B("This is mainly because ...","需要解释“为什么”而不是“导致什么”时。","When you explain why rather than what follows.","别把原因和结果的方向写反。","Don't reverse the direction of cause and effect.",
   [["Unemployment rose sharply. This was mainly because many factories closed.","t2e"]])},
 tip:["写完原因就问自己“所以呢？”，用结果句补上一层，段落就有深度。","After every reason ask 'so what?' and add a result."]
};
P['递进'] = {
 main:[
  B("Moreover, ...","补充同方向、分量更重的论据：写作段中。","Adding a stronger point in the same direction: written.","口语里用显得生硬；不要每段都用。","Stiff in speech; don't use in every paragraph.",
   [["Public transport reduces pollution. Moreover, it eases traffic congestion.","t2e"]]),
  B("In addition, ...","平行补充一个论点：写作口语都可。","Adding a parallel point: speaking or writing.","不要用来引出相反观点。","Not for contrasting ideas.",
   [["In addition, online courses let people study at their own pace.","t2b"],["In addition, the staff there are really friendly.","p2"]]),
  B("Not only ... but also ...","一句里说两个好处/问题，显示句式多样。","Two benefits or problems in one sentence.","not only 放句首要倒装（Not only is it ...）。","Invert if not only starts the sentence.",
   [["AI not only saves time but also reduces human error.","t2e"],["Not only is cycling cheap, but it is also good for your health.","t2e"],["It's not only cheap but also really quick.","p1"]]),
  B("What is more, ...","口语和写作都能用的递进，稍带强调。","Adds with slight emphasis; speaking or writing.","一段只用一次。","Once per paragraph at most.",
   [["What's more, the park is free to enter.","p2"],["What is more, the scheme costs taxpayers very little.","t2e"]])],
 near:[
  B("On top of that, ...","口语递进，自然不书面。","Spoken, natural addition.","写作里太口语。","Too informal for writing.",
   [["On top of that, it's right next to my office.","p1w"]]),
  B("Furthermore, ...","正式写作替换 moreover。","Formal written alternative to moreover.","不要和 moreover 连着用。","Don't chain it with moreover.",
   [["Furthermore, the policy would create jobs in rural areas.","t2e"]])],
 contrast:{lab:["对比：转折（反方向）","Contrast: contrast (opposite direction)"], b:B("However, ... / On the other hand, ...","下一句意思相反时，别再用递进词。","When the next idea goes the other way.","不要在同方向补充时用 however。","Not for same-direction additions.",
   [["Online courses are flexible. However, they require a lot of self-discipline.","t2e"]])},
 tip:["递进词前后必须同方向；读一遍，如果后句是“但是”，换成转折词。","Additions must go the same way; if the next idea is a 'but', switch to a contrast word."]
};
P['对比'] = {
 main:[
  B("In contrast, ...","两句对照两个对象：Task 1 比较数据、Task 2 对比两种情况。","Contrasting two things across sentences: Task 1 figures or Task 2 situations.","同一对象前后变化用 however 更自然。","For change in one thing, however is more natural.",
   [["Car use rose steadily. In contrast, cycling fell by half.","t1d"],["City life is fast-paced. In contrast, rural life is quieter.","t2e"]]),
  B("On the other hand, ...","讨论另一面：讨论双方类作文、Part 3。","Presenting the other side: discuss essays and Part 3.","前面最好有 On the one hand，或至少先讲完一面。","Works best after the first side is fully presented.",
   [["On the other hand, remote work can make people feel isolated.","t2o"],["On the other hand, it can be quite expensive.","p3"]]),
  B("..., whereas ...","一句内两个对象对比，Task 1 最常用。","Two things compared in one sentence; very common in Task 1.","whereas 不放句首单独成句。","Not a stand-alone sentence opener.",
   [["Cities offer more jobs, whereas the countryside offers cleaner air.","t2e"],["Sales in Japan doubled, whereas those in China remained flat.","t1d"]]),
  B("Unlike ..., ...","以对比开头、强调差异。","Opening a sentence with a difference.","Unlike 后接名词，比较对象要同类（Unlike Japan, China ...）。","Compare like with like after Unlike.",
   [["Unlike my sister, I've never enjoyed cooking.","p1"],["Unlike coal, solar power produces no emissions.","t2e"]])],
 near:[
  B("While ..., ...","句首对比，写作口语都可。","Sentence-initial contrast in both modes.","不要再加 but。","Don't add but.",
   [["While A rose, B declined over the same period.","t1o"]]),
  B("By contrast, ...","Task 1 主体段第二段开头常用。","Common opener for Task 1 body paragraph 2.","口语里少用。","Rare in speaking.",
   [["By contrast, the figure for B fell sharply.","t1d"]])],
 contrast:{lab:["对比：让步（承认后再转）","Contrast: concession"], b:B("Although ..., ...","不是平行对照，而是先承认一点再坚持观点时。","When you admit a point and then hold your ground.","两件事只是不同、并无让步时用对比词。","For simple differences, use contrast words.",
   [["Although cities offer more jobs, I would still prefer to live in the countryside.","t2o"]])},
 tip:["对比要“同类比同类”：数字比数字、城市比城市，不要拿国家比数据。","Compare like with like: figure vs figure, city vs city."]
};
P['让步'] = {
 main:[
  B("Although ..., ...","先承认对方有道理再说自己的观点：让步段、Part 3。","Admitting a point before your view: concession paragraph or Part 3.","although 和 but 不能同时用。","Never with but.",
   [["Although online shopping is convenient, it hurts local businesses.","t2o"],["Although I live far from work, I don't mind the commute.","p1w"]]),
  B("Despite [名词], ...","让步对象是名词或 doing。","Concession with a noun or -ing.","despite 后不加 of，也不接完整句子。","No of, no full clause after despite.",
   [["Despite the high cost, many families choose private schools.","t2o"],["Despite feeling nervous, I enjoyed the presentation.","p2"]]),
  B("Admittedly, ... However, ...","两句式让步：先承认缺点再转回立场，优缺点类作文必备。","Two-sentence concession: admit, then turn — vital in advantage essays.","只写 Admittedly 不写转折，会被看成立场摇摆。","Without the However, your stance looks unclear.",
   [["Admittedly, AI has risks. However, banning it is unrealistic.","t2o"],["Admittedly, the city is expensive. However, the salaries make up for it.","p3"]])],
 near:[
  B("Even though ..., ...","比 although 语气更强，强调“即使这样”。","Stronger than although.","事实不确定时用 even if。","Use even if for hypothetical cases.",
   [["Even though it was raining, we still went hiking.","p2"]]),
  B("That said, ...","口语让步转回，非常自然。","Natural spoken turn-back after a point.","书面正式写作少用。","Less formal for essays.",
   [["That said, I don't think it will replace teachers.","p3"]])],
 contrast:{lab:["对比：直接对照（不承认对方）","Contrast: plain contrast"], b:B("In contrast, ... / whereas","两件事只是不同，不涉及承认对方观点时。","When two things simply differ.","需要先认可对方时，别只用 whereas。","When you need to concede, whereas is not enough.",
   [["Older workers prefer offices, whereas younger ones prefer home working.","t2e"]])},
 tip:["让步段的公式：承认一点 → 但是 → 你的立场更有分量，最后一句一定回到立场。","Concession formula: admit → but → why your view wins; end on your stance."]
};
P['举例'] = {
 main:[
  B("For example, ...","最基本的举例，写作口语通用。","Basic example marker for both modes.","一段里只用 for example 会单调。","Monotonous if it's your only example marker.",
   [["For example, many banks now use chatbots to answer basic questions.","t2x"],["For example, last week I tried a Korean restaurant near my office.","p1"]]),
  B("A case in point is ...","引出一个很典型的具体案例：Task 2 举例句。","Introducing a typical, specific case in Task 2.","后面要接具体名字或事件，不能接泛泛的“一些人”。","Must name a specific case.",
   [["A case in point is ChatGPT, which reached millions of users within weeks.","t2x"],["A case in point is Singapore, where public housing is affordable.","t2x"]]),
  B("Take ... as an example.","口语和写作都可，先点名再展开。","Name it first, then expand.","Take 句后要真的展开 1–2 句。","Follow with 1–2 sentences of detail.",
   [["Take my hometown as an example. Ten years ago there was no metro at all.","p3"],["Take Japan as an example. Its population is shrinking rapidly.","t2x"]]),
  B("such as ...","句中列举 2–3 个名词。","Listing 2–3 nouns inside a sentence.","不要放句首当独立句；后面不加 etc.","Not a sentence opener; don't add etc.",
   [["Repetitive tasks such as data entry are easy to automate.","t2e"],["I like outdoor sports such as hiking and cycling.","p1"]])],
 near:[
  B("For instance, ...","for example 的替换。","Alternative to for example.","同一段里别和 for example 连用。","Don't pair with for example in one paragraph.",
   [["For instance, at my company we use AI to draft documents.","p3"]]),
  B("A good example would be ...","口语 Part 3 举例非常自然。","Very natural in Part 3.","写作里略口语。","Slightly informal in essays.",
   [["A good example would be online banking.","p3"]])],
 contrast:{lab:["对比：概括（从例子回到观点）","Contrast: generalising"], b:B("In general, ... / Overall, ...","例子说完要拉回总体结论时。","Pulling back from the example to the general point.","不要只堆例子不概括。","Don't stack examples without a general point.",
   [["In general, technology has made banking far more convenient.","t2e"]])},
 tip:["例子 2–3 句就够，最后一句写“所以这说明……”把例子扣回论点。","Keep examples to 2–3 sentences and end with 'this shows ...'."]
};
P['强调'] = {
 main:[
  B("It is [X] that ...","强调句：把重点挪到前面，写作口语都可。","Cleft sentence: fronts the key point.","每段都用会刻意。","Feels forced if overused.",
   [["It is the cost, not the distance, that stops people from travelling.","t2e"],["It was my teacher who got me interested in science.","p2"]]),
  B("What really matters is ...","点出核心：Part 3、Task 2 结尾前一句。","Pinpointing the core issue: Part 3 or near the conclusion.","不要放在 Task 1。","Not for Task 1.",
   [["What really matters is how we use the technology.","t2e"],["What really matters is whether kids enjoy it.","p3"]]),
  B("The key point is that ...","总结或强调最关键的一点。","Highlighting the most important point.","前面没有铺垫时显得突兀。","Abrupt without build-up.",
   [["The key point is that education should prepare people for work.","t2c"],["The key point is that it saves a lot of time.","cw"]])],
 near:[
  B("Above all, ...","列举多个理由后强调最重要的。","After listing reasons, highlight the top one.","只有一个理由时别用。","Needs several reasons before it.",
   [["Above all, the scheme is cheap to run.","t2e"]]),
  B("The thing is, ...","口语强调，非常地道。","Spoken emphasis; very idiomatic.","写作不用。","Not for writing.",
   [["The thing is, most people don't have time to cook.","p3"]])],
 contrast:{lab:["对比：委婉弱化","Contrast: softening"], b:B("to some extent / in many cases","需要降低语气而不是加强时。","When you need to soften, not stress.","核心论点处不要全用弱化词。","Don't soften your main claim away.",
   [["To some extent, cost is the main barrier.","t2o"]])},
 tip:["强调句一段最多一次，用在你最想让考官记住的那句话上。","One emphasis structure per paragraph — on the sentence you most want remembered."]
};
P['条件 / 假设'] = {
 main:[
  B("If ..., ... will ...","真实可能的条件：提政策建议、预测结果。","Real, likely conditions: policy suggestions or predictions.","if 从句里不用 will（If I will have ✗）。","No will in the if-clause.",
   [["If the government taxes sugar, people will buy fewer soft drinks.","t2e"],["If it's sunny this weekend, I'll go to the beach.","p1"]]),
  B("Unless ..., ...","= if not，强调“除非”：警示后果。","= if not; warning of consequences.","unless 后不再用否定（unless we don't ✗）。","No negative after unless.",
   [["Unless action is taken now, the problem will get worse.","t2e"],["Unless it rains, we'll eat outside.","dl"]]),
  B("If ..., ... would ...","假设或不太可能的情况：Part 3 假设题、Task 2 提出设想。","Hypothetical or unlikely: Part 3 'what if' or Task 2 proposals.","前后时态要配：If ... had/did, ... would。","Match tenses: past in if-clause, would in main.",
   [["If governments invested more in training, workers would adapt faster.","t2e"],["If I had more free time, I would learn the guitar.","p1"]])],
 near:[
  B("Provided that ..., ...","正式写作中“只要……”。","Formal 'as long as'.","口语用 as long as 更自然。","In speech, as long as is more natural.",
   [["Provided that it is well managed, tourism can benefit local people.","t2e"]]),
  B("As long as ..., ...","口语写作都可。","Natural in both.","同上，if 从句不用 will。","No will in the condition.",
   [["As long as I get enough sleep, I'm fine.","p1"]])],
 contrast:{lab:["对比：事实陈述（无条件）","Contrast: plain fact"], b:B("When ..., ...","总会发生的事实用 when，不是假设。","Use when for things that always happen.","真正的假设别写成 when。","Don't use when for hypotheticals.",
   [["When prices rise, demand usually falls.","t2e"]])},
 tip:["提建议的段落用 If + will 写后果，考官能看到你能推理。","In solution paragraphs, use If + will to show the consequence of your proposal."]
};
P['比较'] = {
 main:[
  B("far more ... than ...","强调差距大：Task 1 比较数据、Task 2 比较两种选择。","Stressing a big gap: Task 1 figures or Task 2 options.","比较级不能叠用（more easier ✗）。","No double comparatives.",
   [["Far more people commuted by car than by train in 2010.","t1d"],["Studying abroad is far more expensive than studying at home.","t2e"]]),
  B("twice as ... as ...","倍数比较：Task 1 必备。","Multiples: essential in Task 1.","不要写 the double of。","Not 'the double of'.",
   [["The figure for A was twice as high as that for B.","t1d"],["My new flat is twice as big as my old one.","p1"]]),
  B("The more ..., the more ...","两个变化同步：Task 2 论证、Part 3。","Two things changing together.","两边结构要平行，第二个 the 不能省。","Keep both halves parallel.",
   [["The more people rely on apps, the less they remember.","t2e"],["The more I practise, the more confident I feel.","p1"]])],
 near:[
  B("considerably / significantly + 比较级","修饰比较级，表示“明显更……”。","Modifying comparatives for 'much more'.","不要用 very + 比较级。","Not very + comparative.",
   [["Sales were considerably higher in 2020.","t1d"]]),
  B("not as ... as ...","否定比较，语气更温和。","Negative comparison; softer.","别和 than 混用。","Don't mix with than.",
   [["Trains are not as convenient as cars in rural areas.","t2e"]])],
 contrast:{lab:["对比：最高级（三者以上）","Contrast: superlative"], b:B("the highest / the most ...","三者及以上取极值时用最高级，不用比较级。","For extremes among three or more.","最高级前要 the，不叠用（most highest ✗）。","Needs the; no double superlative.",
   [["Coal was the most common energy source in 1990.","t1o"]])},
 tip:["Task 1 每段至少一个比较句：倍数、差距或同步变化三选一。","In Task 1, include at least one comparison per body paragraph."]
};
P['总结'] = {
 main:[
  B("In conclusion, ...","Task 2 结尾段开头，最稳。","Safest opener for a Task 2 conclusion.","口语里不要用，像在念作文。","Avoid in speaking — sounds like reading an essay.",
   [["In conclusion, I firmly believe that the benefits of tourism outweigh its costs.","t2c"]]),
  B("Overall, ...","Task 1 概述段开头首选；Task 2 结尾也可。","First choice for the Task 1 overview.","Task 1 概述里不要接具体数字。","No specific numbers after it in Task 1.",
   [["Overall, car use increased while cycling declined.","t1o"],["Overall, I think it's a positive change.","p3"]]),
  B("To sum up, ...","结尾段替换 in conclusion。","Alternative conclusion opener.","不要用 In a word（意思不对）。","Not 'in a word'.",
   [["To sum up, both views have merit, but the second is more convincing.","t2c"]]),
  B("All things considered, ...","权衡后下结论，适合优缺点/讨论类。","Concluding after weighing both sides.","没讨论过两面时用会显得空。","Hollow if you haven't weighed both sides.",
   [["All things considered, the benefits outweigh the drawbacks.","t2c"],["All things considered, it was a great trip.","p2"]])],
 near:[
  B("So overall, I'd say ...","口语 Part 3 收尾。","Wrapping up a Part 3 answer.","写作不用。","Not for writing.",
   [["So overall, I'd say people will work alongside AI.","p3"]]),
  B("In summary, ...","正式总结，Task 2 可用。","Formal summary.","不要和 in conclusion 同时用。","Don't combine with in conclusion.",
   [["In summary, education is the most effective long-term solution.","t2c"]])],
 contrast:{lab:["对比：继续展开（不是收尾）","Contrast: continuing, not concluding"], b:B("Another point is that ...","还有新论点时不要提前总结；结尾不加新观点。","If you still have a new point, don't conclude yet.","结尾段里不要再写新论点。","Never add new points in the conclusion.",
   [["Another point is that remote work saves commuting time.","t2b"]])},
 tip:["结尾只“换说法重申立场 + 两个理由”，不加新例子、新观点。","Conclusions restate stance and reasons in new words — no new ideas."]
};
P['委婉 / 不绝对'] = {
 main:[
  B("may / might","可能性不确定：预测、推测。","Uncertain possibility: predictions and guesses.","确定的事实不要加 may（The sun may rise ✗）。","Not for certain facts.",
   [["This policy may reduce traffic in the short term.","t2e"],["It might be because people are busier now.","p3f"]]),
  B("tend to","描述普遍倾向但不绝对。","General tendencies, not absolutes.","描述一次性事件不用 tend to。","Not for one-off events.",
   [["Young people tend to adopt new technology more quickly.","t2e"],["I tend to study better in the morning.","p1"]]),
  B("to some extent","部分同意、部分成立。","Partial agreement or truth.","To what extent 题全文只用它会立场模糊。","Overuse blurs your stance.",
   [["To some extent, I agree that exams cause too much stress.","t2i"],["To some extent, yes, but it depends on the person.","p3"]]),
  B("in many cases","避免以偏概全，限定范围。","Limiting a claim to avoid overgeneralising.","有具体数据时直接给数据。","Give data if you have it.",
   [["In many cases, older workers have more practical experience.","t2e"]])],
 near:[
  B("It is likely that ...","有一定把握的推测。","Fairly confident prediction.","完全确定时不用。","Not for certainties.",
   [["It is likely that more people will work remotely in future.","p3f"]]),
  B("I'd guess that ...","口语推测，非常自然。","Natural spoken guess.","写作太随意。","Too casual for writing.",
   [["I'd guess that most people still prefer printed books.","p3"]])],
 contrast:{lab:["对比：强烈观点","Contrast: strong opinion"], b:B("I firmly believe that ... / clearly","立场题开头和结尾需要明确表态时。","When a firm stance is required.","证据不足的推测不要说得这么绝对。","Not for weak or speculative claims.",
   [["I firmly believe that every child should learn to swim.","t2i"]])},
 tip:["事实和数据直接说，推测和预测加 may / likely，考官看重这种分寸感。","State facts directly; hedge predictions with may / likely."]
};
/* Task 1 词汇行 */
P['上升'] = {
 main:[
  B("rise · increase · grow","中性上升，幅度不特别大时首选。","Neutral increase — default choice.","rise 不及物，不能 rise the price（用 raise）。","rise is intransitive (use raise for 'raise prices').",
   [["The number of tourists rose from 2 million to 3 million.","t1d"],["Online sales grew steadily throughout the decade.","t1d"]]),
  B("climb","逐步爬升，常配 steadily / gradually。","Gradual climb.","剧烈上升用 surge / soar。","For sharp jumps use surge/soar.",
   [["The figure then climbed steadily, reaching 45% in 2015.","t1d"],["House prices climbed gradually after 2012.","t1d"]]),
  B("surge · soar","猛增、飙升：短期内大幅上升。","Sudden, very large rise.","小幅上升（1–2%）用它属于用词夸张，会扣分。","Exaggerated for small rises.",
   [["Electric car sales soared from 1% to 15% in just five years.","t1d"],["Demand surged during the holiday season.","t1d"]])],
 near:[
  B("There was a rise / an increase in ...","名词写法，和动词写法交替。","Noun form to vary from the verb form.","increase 后用 in（not of）。","increase in, not of.",
   [["There was a sharp increase in the number of cyclists.","t1d"]]),
  B("double · triple","倍数增长。","Multiplying.","不要和 by 100% 叠用。","Don't add 'by 100%'.",
   [["The price of houses doubled between 2000 and 2010.","t1d"]])],
 contrast:{lab:["对比：下降","Contrast: decrease"], b:B("fall · decline · drop","趋势反向时使用，与上升词交替描述两条线。","For the opposite trend.","同一句里两条线方向要写清楚。","Make each line's direction clear.",
   [["Car use rose, while bus use fell slightly.","t1d"]])},
 tip:["动词选幅度：小（rise slightly）中（increase steadily）大（soar）。","Pick the verb by size: slight rise, steady increase, soar."]
};
P['下降'] = {
 main:[
  B("fall · decrease · decline","中性下降，最常用。","Neutral fall — most common.","decline 偏缓慢长期，短期骤降别用。","decline suggests a gradual, long-term fall.",
   [["Coal consumption fell from 40% to 25%.","t1d"],["The birth rate declined steadily over the period.","t1d"]]),
  B("drop","较明显的下降，口语书面都可。","A noticeable fall.","drop 作及物动词时意思是“扔下”，描述数据用不及物。","Use intransitively for data.",
   [["Visitor numbers dropped sharply in 2020.","t1d"],["Prices dropped a lot after the new store opened.","p3"]]),
  B("plunge","暴跌：短时间大幅下降。","Crash: a sudden, large fall.","小幅下降用它属于夸张。","Exaggerated for small falls.",
   [["Ticket sales plunged by 80% during the lockdown.","t1d"],["Profits plunged in the final quarter.","t1d"]])],
 near:[
  B("There was a fall / a decline in ...","名词写法。","Noun form.","decline in，不用 of。","decline in, not of.",
   [["There was a gradual decline in newspaper readership.","t1d"]]),
  B("halve","减半。","Halved.","不要说 decreased to half of。","Not 'decreased to half of'.",
   [["The number of smokers halved over twenty years.","t1d"]])],
 contrast:{lab:["对比：上升","Contrast: increase"], b:B("rise · increase · soar","对照另一条上升的线。","For the line moving up.","不要用 reduce（及物）描述数据自己下降。","Don't use transitive reduce for a figure falling by itself.",
   [["While coal fell, solar power soared.","t1o"]])},
 tip:["下降也分幅度：slightly / gradually / sharply / plunge，和数据匹配。","Match the verb to the size of the drop."]
};
P['平稳 / 波动'] = {
 main:[
  B("remain stable","某段时间基本不变。","Staying roughly the same.","不要写 kept stable。","Not 'kept stable'.",
   [["The figure remained stable at around 20% until 2010.","t1d"],["Bus fares remained stable for five years.","t1d"]]),
  B("level off · plateau","上升/下降后趋于平稳。","Flattening after a rise or fall.","一开始就平的线用 remain stable。","For a line flat from the start use remain stable.",
   [["After rising for a decade, the figure levelled off at 60%.","t1d"],["Sales plateaued in the final three years.","t1d"]]),
  B("fluctuate","上下起伏但整体无明确趋势。","Up and down with no clear trend.","整体明显上升时不要只写 fluctuate，要写清总体方向。","If there's an overall trend, say so.",
   [["Prices fluctuated between $40 and $60 throughout the period.","t1d"],["Visitor numbers fluctuated slightly from month to month.","t1d"]])],
 near:[
  B("stay roughly the same","简单可靠的替换。","Simple, safe alternative.","与 remain stable 交替用。","Alternate with remain stable.",
   [["Bus use stayed roughly the same at 15%.","t1d"]]),
  B("there was little change in ...","名词写法。","Noun form.","不要写 there was no change 如果其实有小波动。","Avoid 'no change' if there was slight movement.",
   [["There was little change in the proportion of students.","t1d"]])],
 contrast:{lab:["对比：明显趋势","Contrast: clear trend"], b:B("rose sharply / fell steadily","数据有明确方向时。","When there is a clear direction.","不要把小起伏写成大趋势。","Don't turn small wobbles into trends.",
   [["In contrast, B rose sharply over the same period.","t1d"]])},
 tip:["平稳 ≠ 没东西写：写出平稳的数值和时间段，再对比别的线。","Stable lines still need a value and a period, then a comparison."]
};
P['最高 / 最低'] = {
 main:[
  B("reach a peak of","最高点，带具体数值。","The highest point with a value.","不要写 reached the peak at（用 peaked at / reached a peak of）。","Use 'peaked at' or 'reached a peak of'.",
   [["The figure reached a peak of 45% in 2015.","t1d"],["Unemployment peaked at 12% in 2009.","t1d"]]),
  B("hit a low of","最低点。","The lowest point.","概述里只说趋势，不写具体最低值。","Keep exact lows out of the overview.",
   [["Sales hit a low of 2,000 units in March.","t1d"],["Rainfall hit a low of 5 mm in July.","t1d"]]),
  B("bottom out at","跌到底后不再下降（随后可能回升）。","Falling to a floor before levelling or recovering.","没有后续平稳或回升时别用。","Only if it stops falling afterwards.",
   [["The price bottomed out at $20 before recovering.","t1d"],["Demand bottomed out in 2009 and then rose again.","t1d"]])],
 near:[
  B("the highest / the lowest","最高级对比多个对象。","Superlatives across categories.","最高级前加 the，不说 most highest。","Need 'the'; no 'most highest'.",
   [["A remained the highest throughout the period.","t1o"]]),
  B("stand at","描述某时间点的数值（起点）。","Value at a point in time.","描述变化时不用。","Not for changes.",
   [["In 2000, A stood at 20%.","t1d"]])],
 contrast:{lab:["对比：过程描述","Contrast: describing the movement"], b:B("climb steadily / fall gradually","描述到达峰值之前的过程。","Describing the journey to the peak.","只写峰值不写过程，图表描述会不完整。","Peaks alone are incomplete without the movement.",
   [["It climbed steadily before reaching a peak of 45%.","t1d"]])},
 tip:["起点 stood at → 过程 climbed → 峰值 peaked at，一句串起三个信息。","Chain start → movement → peak in one sentence."]
};
P['程度'] = {
 main:[
  B("dramatically · sharply","大幅、急剧。","Large and sudden.","1% 的变化用它属于数据不匹配，会扣分。","Mismatch for tiny changes.",
   [["The number of users rose dramatically from 1 million to 10 million.","t1d"],["Prices fell sharply after 2008.","t1d"]]),
  B("significantly","明显，幅度中到大。","Noticeable, medium to large.","不要和 dramatically 混用同一条线。","Don't mix with dramatically for the same line.",
   [["Spending on healthcare increased significantly.","t1d"],["Crime has fallen significantly in my city.","p3"]]),
  B("steadily · gradually","持续平稳、逐渐变化。","Steady or gradual change.","短时间剧烈变化不用。","Not for sudden jumps.",
   [["The population grew steadily over the century.","t1d"],["Interest gradually declined after 2015.","t1d"]]),
  B("slightly","小幅变化。","Small change.","大幅变化用它会低估。","Understates large changes.",
   [["The figure for B dipped slightly to 18%.","t1d"],["Prices went up slightly last year.","p3"]])],
 near:[
  B("marginally","极小变化，比 slightly 更正式。","Very small; more formal.","中等变化不用。","Not for medium changes.",
   [["Exports rose marginally in the final year.","t1d"]]),
  B("considerably","较大变化，替换 significantly。","Alternative to significantly.","不要每句都用。","Don't overuse.",
   [["Costs rose considerably between 2010 and 2020.","t1d"]])],
 contrast:{lab:["对比：形容词 + 名词写法","Contrast: adjective + noun form"], b:B("a sharp rise / a slight fall","把副词换成形容词，句式更多样。","Varies the structure.","不要写 a sharply rise。","Not 'a sharply rise'.",
   [["There was a slight fall in demand in 2019.","t1d"]])},
 tip:["先算幅度再选副词：<5% slightly，5–20% steadily/significantly，>20% sharply/dramatically。","Calculate the size first, then pick the adverb."]
};
P['两种写法交替用'] = {
 main:[
  B("A rose sharply.（动词 + 副词）","主语是数据本身，句子短而直接。","Data as the subject; short and direct.","整段都用这一种，句式单调。","Monotonous if every sentence uses it.",
   [["Car ownership rose sharply in the 1990s.","t1d"],["The figure for B fell slightly.","t1d"]]),
  B("There was a sharp rise in A.（形容词 + 名词）","用名词化写法变换句式。","Nominalised form for variety.","in 不要写成 of。","in, not of.",
   [["There was a sharp rise in car ownership in the 1990s.","t1d"],["There was a slight fall in the figure for B.","t1d"]])],
 near:[
  B("A saw / experienced a sharp rise","用时间或对象作主语。","Time or category as subject.","不要主语是人（People saw ...）。","Avoid people as subject.",
   [["The 1990s saw a sharp rise in car ownership.","t1d"]]),
  B("..., rising sharply to ...","分词短语连在同一句。","Participle clause in the same sentence.","不要句子太长。","Keep it readable.",
   [["Sales stood at 20 units, rising sharply to 50 by May.","t1d"]])],
 contrast:{lab:["对比：只用一种写法","Contrast: one structure only"], b:B("A rose. B rose. C rose.","反面示范：只为说明为什么要交替。","Counter-example — why you should alternate.","考官会因句式单一压语法分。","Repetitive structure lowers the grammar score.",
   [["A rose sharply, while there was a gradual increase in B.","t1d"]])},
 tip:["一段里动词写法和名词写法各至少一次。","Use both the verb form and the noun form in each paragraph."]
};

/* 口语表格行 */
P['喜欢'] = {
 main:[
  B("I'm really into ...","口语 Part 1 谈爱好，地道随意。","Casual, natural for Part 1 hobbies.","写作不用；正式场合换 I enjoy。","Not for writing or formal settings.",
   [["I'm really into hiking at the moment.","p1"],["I'm really into cooking Thai food.","dl"]]),
  B("I'm a big fan of ...","表达很喜欢某样东西或某人。","Strong liking for a thing or person.","不喜欢时说 I'm not a big fan of。","Use 'not a big fan' for dislikes.",
   [["I'm a big fan of crime dramas.","p1"],["I'm a big fan of working early in the morning.","p1w"]]),
  B("... is right up my street.","地道习语：正合我意。","Idiom: exactly my taste.","一场考试用一次即可，多用显得背诵。","Once per test — overuse sounds memorised.",
   [["Anything to do with history is right up my street.","p1"],["A quiet weekend in the countryside is right up my street.","p2"]])],
 near:[
  B("I really enjoy ...","最安全的替换，接 doing。","Safest option; + -ing.","不要接 to do。","+ -ing, not to do.",
   [["I really enjoy going to markets.","p1"]]),
  B("I'm quite keen on ...","英式表达，语气中等。","British, moderate liking.","后面接名词或 doing。","+ noun or -ing.",
   [["I'm quite keen on photography.","p1"]])],
 contrast:{lab:["对比：不喜欢","Contrast: dislike"], b:B("I'm not really keen on ... / ... isn't really my thing.","表达不喜欢且语气委婉。","Polite dislike.","不要直接说 I hate ... 除非真的强烈。","Avoid 'I hate' unless you mean it.",
   [["Jazz isn't really my thing, to be honest.","p1"]])},
 tip:["喜欢句后面马上接 because + 一个细节，Part 1 回答就有 2–3 句。","Follow with because + a detail for a full Part 1 answer."]
};
P['不喜欢'] = {
 main:[
  B("I'm not really keen on ...","委婉地表达不喜欢，Part 1 常用。","Gently saying you don't like something.","不要说 I'm not keen to ...（意思变成“不想做”）。","'not keen to do' means 'don't want to'.",
   [["I'm not really keen on crowded places.","p1"],["I'm not really keen on spicy food.","dl"]]),
  B("... isn't really my thing.","很地道的随意说法。","Idiomatic and casual.","正式写作不用。","Not for writing.",
   [["Shopping isn't really my thing.","p1"],["Online games aren't really my thing.","p1"]])],
 near:[
  B("I'm not a big fan of ...","温和不喜欢。","Mild dislike.","别和 hate 混用夸张。","Don't exaggerate.",
   [["I'm not a big fan of early mornings.","p1"]]),
  B("I can't stand ...","强烈不喜欢。","Strong dislike.","普通小事用它太重。","Too strong for small things.",
   [["I can't stand waiting in long queues.","p1"]])],
 contrast:{lab:["对比：喜欢","Contrast: liking"], b:B("I'm really into ...","切换到你喜欢的替代选项。","Switch to what you do like.","不要只说不喜欢就停。","Don't stop at the dislike.",
   [["Shopping isn't my thing, but I'm really into markets.","p1"]])},
 tip:["说完不喜欢，补一句“但我更喜欢……”，回答立刻完整。","After a dislike, add what you prefer instead."]
};
P['频率'] = {
 main:[
  B("every now and then","偶尔，口语自然。","Occasionally; natural speech.","写作改成 occasionally。","Use occasionally in writing.",
   [["I go to the cinema every now and then.","p1"],["Every now and then we order takeaway.","dl"]]),
  B("once in a while","偶尔、隔一阵子。","Once in a while.","频繁的事不用。","Not for frequent habits.",
   [["Once in a while, I treat myself to a nice dinner.","p1"],["I work from a café once in a while.","p1w"]]),
  B("pretty much every day","几乎每天。","Almost every day.","写作不用 pretty。","Avoid pretty in writing.",
   [["I use my phone for English practice pretty much every day.","p1"],["I cycle to work pretty much every day.","p1w"]])],
 near:[
  B("from time to time","偶尔，口语书面都可。","Occasionally; both modes.","不要和 always 混用。","Don't mix with always.",
   [["From time to time, I visit my grandparents.","p1"]]),
  B("hardly ever","几乎从不。","Almost never.","不要再加 not。","No extra not.",
   [["I hardly ever watch TV these days.","p1"]])],
 contrast:{lab:["对比：具体次数","Contrast: exact frequency"], b:B("twice a week / three times a month","需要具体时给数字，比副词更清晰。","Give exact numbers when you can.","正式写作里 twice 比 two times 好。","Prefer twice to two times.",
   [["I play badminton twice a week.","p1"]])},
 tip:["频率词 + 什么时候 + 和谁，三个信息让 Part 1 变丰富。","Frequency + when + who makes Part 1 answers rich."]
};
P['变化'] = {
 main:[
  B("I used to ..., but these days I ...","对比过去和现在的习惯。","Contrasting past and present habits.","used to 只说过去习惯，不说一次性事件。","Only for past habits, not single events.",
   [["I used to play video games a lot, but these days I prefer reading.","p1"],["I used to commute by bus, but these days I cycle.","p1w"]]),
  B("When I was younger, ...; now ...","时间对比，Part 1 和 Part 3 都可。","Time contrast for Part 1 or 3.","前后时态要分清：过去用过去时。","Past tense for the past half.",
   [["When I was younger, I hated vegetables; now I eat them every day.","p1"],["When I was younger, people wrote letters; now everyone texts.","p3"]])],
 near:[
  B("These days, ... whereas in the past ...","社会变化对比。","Social change contrast.","Part 1 讲个人小事可简化。","Simplify for small personal topics.",
   [["These days, kids learn coding, whereas in the past it was rare.","p3"]]),
  B("I've started ...ing recently.","最近的新习惯。","A recent new habit.","不要用 I start ...（缺完成时）。","Use present perfect.",
   [["I've started going to the gym recently.","p1"]])],
 contrast:{lab:["对比：be used to doing（习惯于）","Contrast: be used to doing"], b:B("I'm used to getting up early.","表示“已经习惯”，不是过去常常。","Means 'accustomed to', not past habit.","不要写成 I'm used to get up。","Not 'I'm used to get up'.",
   [["I'm used to working late, so it doesn't bother me.","p1w"]])},
 tip:["Part 1 很多题都能用“以前…现在…”拉出两句，顺便展示时态。","'I used to ... but now ...' adds a sentence and shows tense control."]
};
/* 救场句 */
P['争取思考时间'] = {
 main:[
  B("That's an interesting question. Let me think about it for a second.","题目突然、需要 2–3 秒组织时。","When you need 2–3 seconds to organise.","每题都说会显得在拖时间。","Not for every question.",
   [["That's an interesting question. Let me think about it for a second... I'd say yes.","rs"],["Let me think about it for a second. Probably the cost.","p3"]]),
  B("Well, I've never really thought about that, but ...","真的没想过的话题，同时承接观点。","For topics you've never considered — then give a view.","说完一定要接观点，不能停。","Must be followed by an answer.",
   [["Well, I've never really thought about that, but I suppose it's because of cost.","rs"],["I've never really thought about that, but maybe schools should teach it.","p3"]])],
 near:[
  B("Hmm, that's a tough one.","承认难度，口语自然。","Acknowledging difficulty.","不要停在这里。","Don't stop there.",
   [["Hmm, that's a tough one. I guess I'd choose the train.","rs"]]),
  B("Good question. I'd say ...","快速接入观点。","Quick entry into an answer.","不要每题都 Good question。","Not every time.",
   [["Good question. I'd say it depends on age.","p3"]])],
 contrast:{lab:["对比：直接回答","Contrast: answering directly"], b:B("Definitely, ... / I'd say ...","有想法时不需要救场句，直接开答更流利。","If you know what to say, just start.","不要把救场句当成每题固定开头。","Don't make fillers a fixed opener.",
   [["Definitely, and I think it's already happening.","p3"]])},
 tip:["救场句是桥，不是终点：说完 2 秒内必须给观点。","Fillers are a bridge: give a view within 2 seconds."]
};
P['没听清'] = {
 main:[
  B("Sorry, could you repeat the question, please?","真的没听清时，礼貌请求重复。","Politely asking for a repeat when you didn't catch it.","不要每题都要求重复；听懂了别用。","Don't use it if you understood.",
   [["Sorry, could you repeat the question, please?","rs"],["Sorry, could you say that again? The line's a bit bad.","cw"]]),
  B("Do you mean ...?","听到了但不确定意思，确认理解。","Checking meaning when unsure.","Part 1 考官一般只重复不解释，问了也可能得不到解释。","In Part 1, examiners usually just repeat.",
   [["Do you mean public transport in my city?","rs"],["Do you mean the deadline for the first draft?","cw"]])],
 near:[
  B("Sorry, I didn't catch that.","简短自然。","Short and natural.","不要说 What?","Not 'What?'.",
   [["Sorry, I didn't catch that. Could you say it again?","rs"]]),
  B("Could you say that a bit more slowly?","语速太快时。","When it's too fast.","考试里考官通常不会改变语速太多。","Examiners may not slow down much.",
   [["Could you say that a bit more slowly, please?","sv"]])],
 contrast:{lab:["对比：没听懂某个词","Contrast: an unknown word"], b:B("Sorry, what do you mean by \"...\"?","听清了但有一个词不懂。","Heard it but one word is unclear.","整题没听清时用 repeat。","Use repeat if you missed the whole question.",
   [["Sorry, what do you mean by 'sustainable'?","rs"]])},
 tip:["请求重复不扣分，答错题才扣分；关键是只用在真的需要时。","Asking to repeat costs nothing; answering the wrong question does."]
};
P['不懂某个词'] = {
 main:[
  B("Sorry, what do you mean by \"[...]\"?","题目里某个词不懂时直接问，不扣分。","Ask about an unknown word — no penalty.","Part 1 考官一般只重复问题；Part 3 才会换说法解释。","In Part 1 the examiner usually only repeats.",
   [["Sorry, what do you mean by 'leisure facilities'?","rs"],["Sorry, what do you mean by 'rollout'?","cw"]])],
 near:[
  B("I'm not sure what ... means. Do you mean ...?","带上自己的猜测，显得积极。","Offer your guess — sounds proactive.","不要沉默猜。","Don't guess silently.",
   [["I'm not sure what 'urban sprawl' means. Do you mean cities growing outward?","rs"]]),
  B("Could you explain what ... means?","正式请求解释。","Formal request.","口语可以更简单。","Can be simpler in speech.",
   [["Could you explain what 'KPI' means here?","cw"]])],
 contrast:{lab:["对比：猜测后直接回答","Contrast: guessing and answering"], b:B("If you mean ..., then I'd say ...","大致能猜到意思时，带假设直接回答。","Answer with an assumption if you can roughly guess.","完全猜不到时别硬答。","Don't bluff if you have no idea.",
   [["If you mean big shopping centres, then I'd say they're popular here.","p3"]])},
 tip:["问词义要具体到那个词，考官更容易帮你。","Name the exact word you don't know."]
};
P['说错了自我纠正'] = {
 main:[
  B("... I mean, ...","马上改正一个词或数字。","Quick correction of a word or number.","不要说 Sorry sorry 反复道歉。","Don't over-apologise.",
   [["I went there in 2019 — I mean, 2018.","p2"],["It's on Tuesday, I mean Wednesday.","cw"]]),
  B("Or rather, ...","把说法改得更准确。","Making it more precise.","写作不用。","Not for writing.",
   [["It's a small town, or rather a big village.","p1"],["We had a meeting, or rather a quick chat.","cw"]]),
  B("Sorry, let me rephrase that.","整句说乱了，重新组织。","Restarting a messy sentence.","一场考试别用太多次。","Not too often in one test.",
   [["Sorry, let me rephrase that. What I mean is that prices are too high.","rs"],["Let me rephrase that — the app is useful, but slow.","p3"]])],
 near:[
  B("Actually, ...","更正事实。","Correcting a fact.","不要每句都用 actually。","Not every sentence.",
   [["Actually, it was my brother who suggested it.","p2"]]),
  B("What I'm trying to say is ...","澄清意思。","Clarifying the point.","不要变成长句重复。","Don't repeat at length.",
   [["What I'm trying to say is that it saves time.","p3"]])],
 contrast:{lab:["对比：继续往下说","Contrast: just keep going"], b:B("（小错不纠正，继续说）","不影响意思的小语法错，直接继续比停下来更显流利。","For tiny slips, continuing shows fluency.","影响意思的错误（时间、数字、人）要纠正。","Correct errors that change meaning.",
   [["I go there last week... and it was really nice.","p2"]])},
 tip:["自我纠正说明你在监控语言，是加分项；但只纠正影响意思的错误。","Self-correction shows control — but only fix meaning-changing errors."]
};
P['想不起某个词'] = {
 main:[
  B("It's a kind of ...","用上位词描述：it's a kind of tool / food。","Describe with a category word.","能想起的词就不要绕。","Don't paraphrase words you know.",
   [["It's a kind of vegetable, a bit like a long green pepper.","rs"],["It's a kind of software for managing projects.","cw"]]),
  B("It's what you use to ...","用功能描述物品。","Describe by function.","描述人或抽象概念时换说法。","Not ideal for people or abstract ideas.",
   [["It's what you use to open a wine bottle.","rs"],["It's what you use to keep food cold when you go camping.","p2"]]),
  B("I can't think of the word, but it's ...","坦白一下然后描述，比沉默好得多。","Admit it, then describe — better than silence.","一场考试不要说很多次。","Not too often.",
   [["I can't think of the word, but it's the place where you return library books.","rs"],["I can't think of the word, but it's like a small festival in the street.","p2"]])],
 near:[
  B("It's similar to ...","用相似物描述。","Compare with something similar.","差别太大时别用。","Only if it's genuinely similar.",
   [["It's similar to a tablet, but bigger.","rs"]]),
  B("the thing that ...","口语描述功能。","Spoken description.","写作不用。","Not for writing.",
   [["You know, the thing that keeps the door open.","rs"]])],
 contrast:{lab:["对比：沉默或说中文","Contrast: silence or switching language"], b:B("（沉默 / 说中文）","反面：考官只能按“无法持续表达”打流利度。","Counter-example: the examiner marks fluency down.","任何时候都不要用中文词填空。","Never fill with your first language.",
   [["It's a kind of dumpling, a bit like ravioli.","rs"]])},
 tip:["练习时故意找 5 个不会的词，用“类别 + 功能 + 像什么”描述一遍。","Practise describing 5 unknown words with category + function + similar to."]
};
P['不了解这个话题'] = {
 main:[
  B("To be honest, I don't know much about this, but I'd guess that ...","不熟悉的话题仍给出推测，不放弃回答。","Unfamiliar topic — still give a guess.","不要只说 I don't know 就停。","Never stop at I don't know.",
   [["To be honest, I don't know much about this, but I'd guess that older people prefer it.","p3"],["To be honest, I don't know much about farming, but I'd guess it's getting more automated.","p3f"]])],
 near:[
  B("I'm not an expert, but ...","承认不懂并给观点。","Admit and give a view.","不要停在这里。","Don't stop there.",
   [["I'm not an expert, but I think the government should help.","p3"]]),
  B("I haven't had much experience with ..., but from what I've heard ...","用听说的信息回答。","Answer from what you've heard.","不要编造数据。","Don't invent data.",
   [["I haven't had much experience with it, but from what I've heard it's expensive.","p3"]])],
 contrast:{lab:["对比：转到熟悉的角度","Contrast: steering to a familiar angle"], b:B("In my city, at least, ...","把大话题拉到你熟悉的地方或经验。","Narrow the topic to what you know.","不要完全跑题。","Don't go off-topic.",
   [["In my city, at least, most people use apps for this.","p3"]])},
 tip:["考的是语言不是知识：任何话题都能用“推测 + 原因 + 例子”回答。","It tests language, not knowledge: guess + reason + example."]
};
/* 整段模板（按条目 id） */
P['templates-c9f5e8cddb'] = { fn:["小作文四段结构","Task 1 four-paragraph structure"],
 main:[
  B("① Intro：改写题目","第一句用同义词和不同句式改写图表说明。","Paraphrase the chart description.","不要照抄题目，照抄部分不计字数。","Copied words don't count.",
   [["The bar chart compares the number of visitors to three museums between 2010 and 2020.","t1i"],["The table gives information about household spending in five countries in 2015.","t1i"]]),
  B("② Overview：2 个主要趋势","概述总体趋势或最大特征。","Two main trends or features.","不写具体数字、不写原因。","No exact figures, no reasons.",
   [["Overall, visitor numbers rose at all three museums, with the Science Museum remaining the most popular.","t1o"],["Overall, housing was the largest expense in every country, while education was the smallest.","t1o"]]),
  B("③④ Body：选择 + 比较数据","两段分组描述关键数据。","Two paragraphs grouping key figures.","不要罗列所有数字、不要个人观点。","No full data lists, no opinions.",
   [["In 2010, the Science Museum attracted 2 million visitors, twice as many as the Art Gallery.","t1d"],["By contrast, the History Museum saw only a slight increase.","t1d"]])],
 near:[B("Overview 放结尾","也可以把概述放在最后一段，但一定要有。","The overview can go last — but must exist.","不要两处写成重复内容。","Don't duplicate it.",[["Overall, all three museums became more popular over the decade.","t1o"]])],
 contrast:{lab:["对比：大作文结构","Contrast: Task 2 structure"], b:B("Intro + 立场 → 论证段 → 结论","大作文要观点，小作文不要。","Task 2 needs an opinion; Task 1 doesn't.","不要把大作文的立场句用在小作文。","No stance sentences in Task 1.",[["I firmly believe that museums should be free.","t2i"]])},
 tip:["小作文的分数关键在 Overview：写完先检查有没有。","The overview decides Task 1 — check it's there."]
};
P['templates-3ebaab5034'] = { fn:["动态图模板","Dynamic chart template"],
 main:[
  B("Intro: The line graph illustrates ...","改写题目的开头句。","Paraphrased opening.","illustrates / shows 不要和题目同一个词。","Vary the verb from the prompt.",
   [["The line graph illustrates changes in the number of cyclists in three cities between 2000 and 2020.","t1i"],["The graph shows how much electricity was produced from four sources over 30 years.","t1i"]]),
  B("Overview: Overall, A rose ..., while B declined.","两条主要趋势 + 最高者。","Two main trends + the highest.","不写具体数字。","No figures.",
   [["Overall, cycling rose significantly in Amsterdam, while it declined in London.","t1o"],["Overall, renewable sources grew, whereas coal fell, although coal remained the largest.","t1o"]]),
  B("Body 1: In 2000, A stood at ... It then climbed ...","起点 → 过程 → 峰值。","Start → movement → peak.","不要逐年流水账。","Not year-by-year listing.",
   [["In 2000, Amsterdam stood at 30%. It then climbed steadily, reaching a peak of 45% in 2015.","t1d"],["Wind power began at just 2% but rose to 18% by 2020.","t1d"]]),
  B("Body 2: By contrast, B fell sharply ...","对照另一组数据。","Contrasting the other group.","不要重复 Body 1 的句式。","Vary structure from Body 1.",
   [["By contrast, London fell sharply from 20% to 8%, before levelling off.","t1d"],["By contrast, there was a steady decline in coal, from 60% to 35%.","t1d"]])],
 near:[B("The chart gives information about ...","Intro 另一种开头。","Alternative intro.","不要加 years（from 2000 to 2020 years ✗）。","No 'years' after the range.",[["The chart gives information about energy use in Australia from 1990 to 2020.","t1i"]])],
 contrast:{lab:["对比：静态图","Contrast: static chart"], b:B("accounted for / made up","没有时间变化时，不用 rise / fall。","No time change → no rise/fall.","单一年份的饼图别写 increased。","Don't write 'increased' for a single-year pie.",[["Coal accounted for the largest share of energy use.","t1o"]])},
 tip:["动态图三要素：起点、变化、终点/峰值；每条线至少写一次。","Dynamic charts: start, change, end/peak for each line."]
};
P['templates-eaaaab3d81'] = { fn:["静态图模板","Static chart template"],
 main:[
  B("Overview: A accounted for the largest proportion, whereas D made up the smallest share.","概述最大和最小。","Largest and smallest in the overview.","不写具体百分比。","No exact percentages.",
   [["Overall, rent accounted for the largest proportion of spending, whereas transport made up the smallest share.","t1o"],["Overall, most students chose science, whereas very few studied languages.","t1o"]]),
  B("Body: A represented nearly a third of the total, roughly twice as much as B.","用分数、倍数描述。","Fractions and multiples.","不要把所有数据逐个罗列。","Group, don't list.",
   [["Rent represented nearly a third of the total, roughly twice as much as food.","t1d"],["Science students made up almost half of the group.","t1d"]]),
  B("C and D were similar, at 12% and 10% respectively.","相近数据合并写。","Grouping similar figures.","respectively 的顺序要和前面一致。","Keep the order matching.",
   [["Clothing and leisure were similar, at 12% and 10% respectively.","t1d"],["Art and music attracted 8% and 7% respectively.","t1d"]])],
 near:[B("constituted / comprised","accounted for 的替换。","Alternatives to accounted for.","comprise 后不加 of。","comprise, not comprise of.",[["Women constituted 60% of the workforce.","t1d"]])],
 contrast:{lab:["对比：动态图","Contrast: dynamic chart"], b:B("rose / fell / remained","有多个年份时才用变化动词。","Change verbs only with multiple years.","单个年份不用。","Not for one year.",[["Between 2000 and 2020, rent rose from 25% to 33%.","t1d"]])},
 tip:["静态图核心动词：account for / make up / represent，轮换使用。","Rotate account for / make up / represent."]
};
P['templates-759a93328f'] = { fn:["流程图和地图","Process and map"],
 main:[
  B("Overall, there are [six] stages, beginning with ... and ending with ...","流程图概述：阶段数 + 起止。","Process overview: stages + start/end.","不要漏写概述。","Don't skip the overview.",
   [["Overall, there are six stages, beginning with the collection of cocoa beans and ending with packaging.","t1p"],["Overall, the process involves five steps, from harvesting to bottling.","t1p"]]),
  B("First, ... is collected. Next, ... is heated.","被动语态 + 顺序词。","Passive + sequencers.","不要用 I / we 作主语。","No I/we subjects.",
   [["First, the beans are harvested. Next, they are dried in the sun.","t1p"],["Once this is done, the mixture is poured into moulds.","t1p"]]),
  B("Overall, the area became more [residential] ...","地图概述：总体变化方向。","Map overview: overall change.","不要只列建筑。","Don't just list buildings.",
   [["Overall, the village became more residential, with farmland being replaced by housing.","t1o"],["Overall, the town centre was modernised and made more pedestrian-friendly.","t1o"]]),
  B("... was demolished / converted into / extended","地图变化动词，用被动。","Map change verbs, passive.","时态要过去时（对比过去的地图）。","Past tense for past maps.",
   [["The old factory was converted into apartments.","t1p"],["A new car park was built to the north of the station.","t1p"]])],
 near:[B("After that / Subsequently / Finally","顺序词轮换。","Rotate sequencers.","不要每句 then。","Not 'then' every time.",[["Subsequently, the bottles are sealed and labelled.","t1p"]])],
 contrast:{lab:["对比：数据图","Contrast: data charts"], b:B("rose / fell / accounted for","数据图描述数字；流程图描述步骤。","Data charts = numbers; process = steps.","流程图里不要写趋势词。","No trend verbs for processes.",[["The figure rose by 20%.","t1d"]])},
 tip:["流程图：被动 + 顺序词；地图：被动 + 方位词 + 过去时。","Process: passive + sequencers; map: passive + location + past tense."]
};
P['templates-675699a0e2'] = { fn:["大作文通用四段","Task 2 four-paragraph structure"],
 main:[
  B("开头：改写题目 + 明确立场","第一段两句：话题 + 立场。","Two sentences: topic + stance.","不要背 With the rapid development of ... 套话。","No memorised openers.",
   [["Some people believe that university should be free. I completely agree with this view.","t2i"],["Whether children should have smartphones is widely debated. In my view, limited use is helpful.","t2i"]]),
  B("主体段：中心句 → 解释 → 例子 → 小结","每段一个理由。","One reason per paragraph.","一段塞两个理由会都讲不透。","Two reasons in one paragraph = shallow.",
   [["The main reason is that free education increases social mobility.","t2b"],["For example, in Germany, where tuition is free, more students from low-income families attend university.","t2x"]]),
  B("结尾：重申立场","换说法重复立场和理由。","Restate stance and reasons.","不加新观点。","No new ideas.",
   [["In conclusion, free university education benefits both individuals and society.","t2c"],["To sum up, the advantages of free tuition far outweigh the costs.","t2c"]])],
 near:[B("五段式（两个理由 + 一个让步）","需要写反方时可加让步段。","Add a concession paragraph when needed.","时间不够时保持四段。","Keep four if short of time.",[["Admittedly, free tuition is costly for governments. However, it pays off in the long run.","t2o"]])],
 contrast:{lab:["对比：小作文结构","Contrast: Task 1"], b:B("Intro + Overview + 2 Body","小作文没有立场和结论段。","Task 1 has no stance or conclusion.","不要把 In conclusion 用在小作文。","No 'In conclusion' in Task 1.",[["Overall, enrolment rose in every country.","t1o"]])},
 tip:["立场写在开头最后一句，结尾第一句再说一次，考官最容易看到。","Put your stance at the end of the intro and start of the conclusion."]
};
P['templates-857a50e5f2'] = { fn:["观点类（同意/不同意）","Opinion essay"],
 main:[
  B("Intro: It is sometimes argued that ... I completely / largely agree ...","改写观点 + 同意程度 + 两个理由。","Paraphrase + degree of agreement + two reasons.","写“部分同意”却全文只支持一边会自相矛盾。","Match the degree to your body paragraphs.",
   [["It is sometimes argued that children should learn a second language at primary school. I completely agree with this view because it is easier at a young age and it opens more opportunities.","t2i"],["It is sometimes argued that public transport should be free. I largely agree, as it cuts traffic and helps low-income workers.","t2i"]]),
  B("Body 1: The main reason I support this view is that ...","理由 1 + 解释 + 例子。","Reason 1 + explanation + example.","例子不要编造数据。","No fake statistics.",
   [["The main reason I support this view is that young children absorb languages naturally.","t2b"],["This is because their brains are still developing, so they copy sounds easily.","t2e"]]),
  B("Body 2: Another reason is that ... A case in point is ...","理由 2 + 具体案例。","Reason 2 + specific case.","不要和理由 1 重复。","Don't repeat reason 1.",
   [["Another reason is that bilingual people have more career options.","t2b"],["A case in point is Singapore, where most young people speak two languages fluently.","t2x"]]),
  B("Conclusion: In conclusion, I firmly believe that ...","重申。","Restate.","不要改变立场。","Don't change stance.",
   [["In conclusion, I firmly believe that early language learning benefits children.","t2c"],["In conclusion, free public transport would benefit both cities and workers.","t2c"]])],
 near:[B("I partly agree ...","部分同意时，一段支持、一段保留。","Partial agreement: one for, one with limits.","不要写成讨论双方。","Not a discuss-both essay.",[["I partly agree, as long as it doesn't replace core subjects.","t2i"]])],
 contrast:{lab:["对比：讨论双方类","Contrast: discuss both views"], b:B("While some believe ..., others argue ...","题目要求讨论双方时，两面都要写。","When the question asks for both views.","观点类不需要平均分配两面。","Opinion essays need not balance both sides.",[["While some believe zoos are cruel, others argue they protect species.","t2i"]])},
 tip:["先看题目问的是 agree/disagree 还是 discuss both，模板不能混。","Check the question type before choosing the template."]
};
P['templates-81578b2d0c'] = { fn:["讨论双方类","Discuss both views"],
 main:[
  B("Intro: People hold different views on whether ... While some believe ..., others argue ... In my view, ...","话题 + 两方 + 你的立场。","Topic + both sides + your view.","不要忘了写 your own opinion。","Don't forget your own opinion.",
   [["People hold different views on whether children should use smartphones. While some believe they are harmful, others argue they are useful learning tools. In my view, limited use is beneficial.","t2i"],["People disagree about whether museums should be free. In my view, free entry is worth the cost.","t2i"]]),
  B("Body 1: On the one hand, those who support A argue that ...","客观写 A 方理由。","Present side A fairly.","不要写成你同意 A。","Don't sound like you agree with A.",
   [["On the one hand, those who oppose smartphones argue that they reduce concentration.","t2o"],["Critics point out that screen time can affect sleep.","t2o"]]),
  B("Body 2: On the other hand, I agree with those who believe B, because ...","B 方 + 你的支持。","Side B + your support.","立场要和开头一致。","Match your intro stance.",
   [["On the other hand, I agree with those who believe phones can support learning, because apps make practice easier.","t2b"],["For example, language apps let pupils practise for ten minutes a day.","t2x"]]),
  B("Conclusion: although A has some merit, I believe B is more convincing ...","让步 + 立场。","Concede + stance.","不要两边都同意。","Don't agree with both equally.",
   [["In conclusion, although screen time has risks, I believe guided use is more convincing.","t2c"],["To sum up, both views have merit, but the benefits are greater.","t2c"]])],
 near:[B("Proponents of ... maintain that ...","替换 those who support。","Alternative to those who support.","不要过度使用大词。","Don't overload with big words.",[["Proponents of online learning maintain that it is more flexible.","t2o"]])],
 contrast:{lab:["对比：观点类","Contrast: opinion essay"], b:B("I completely agree ...","题目只问同意程度时，不用平均讨论两方。","For agree/disagree, no need to balance.","讨论类里不要只写一方。","Don't write only one side here.",[["I completely agree that children should learn to cook.","t2i"]])},
 tip:["讨论类一定要两方 + 自己的观点，三样缺一扣 Task Response。","Both views + your view — missing any one costs Task Response."]
};
P['templates-859dcae2e0'] = { fn:["优缺点类","Advantages vs disadvantages"],
 main:[
  B("Intro: ... has become increasingly common. Although ..., I believe the benefits are far more significant.","现象 + 让步 + 立场（利大于弊）。","Trend + concession + stance.","不要回避“哪个更多”的问题。","Answer 'which outweighs'.",
   [["Working from home has become increasingly common. Although it has some drawbacks, I believe the benefits are far more significant.","t2i"],["Online shopping has become increasingly common. Although it hurts some shops, I believe its advantages are greater.","t2i"]]),
  B("Body 1: Admittedly, ... has certain disadvantages.","先写缺点。","Disadvantages first.","缺点段不要写得比优点段还强。","Don't make it stronger than the advantages.",
   [["Admittedly, remote work has certain disadvantages. The most obvious one is isolation.","t2o"],["Admittedly, online shopping has certain drawbacks, such as delivery waste.","t2o"]]),
  B("Body 2: However, the advantages clearly outweigh these problems.","优点 + 理由。","Advantages + reasons.","不要只列不解释。","Explain, don't list.",
   [["However, the advantages clearly outweigh these problems. First, employees save commuting time.","t2b"],["Furthermore, companies can hire talent from anywhere.","t2e"]])],
 near:[B("These drawbacks are outweighed by ...","被动表达权衡。","Passive weighing.","不要句子过长。","Keep it short.",[["These drawbacks are outweighed by the flexibility it offers.","t2c"]])],
 contrast:{lab:["对比：只列优缺点","Contrast: just listing pros and cons"], b:B("Advantages are ... Disadvantages are ...","题目问 outweigh 时，只列不判断会扣分。","If asked 'outweigh', listing without judging loses marks.","一定要给出哪个更重。","Always say which is greater.",[["Overall, the advantages outweigh the disadvantages.","t2c"]])},
 tip:["优缺点类：弱的一面放前面、强的一面放后面，结尾自然落在立场上。","Put the weaker side first so you end on your stance."]
};
P['templates-59a0ef1b9a'] = { fn:["原因 / 问题 + 解决","Problem / solution"],
 main:[
  B("Intro: ... is becoming a serious issue ... This essay will examine the main causes and suggest some solutions.","问题 + 文章计划。","Problem + essay plan.","题目问 effects 时要改成 effects。","Change to effects if asked.",
   [["Childhood obesity is becoming a serious issue in many countries. This essay will examine the main causes and suggest some solutions.","t2i"],["Traffic congestion is becoming a serious problem in large cities. This essay will look at why and what can be done.","t2i"]]),
  B("Body 1: The primary cause is ... In addition, ...","两个原因。","Two causes.","不要混进解决办法。","Don't mix in solutions.",
   [["The primary cause is the popularity of fast food. In addition, children exercise less.","t2b"],["The primary cause is the rise in car ownership.","t2b"]]),
  B("Body 2: To tackle this problem, governments should ... individuals could ...","政府 + 个人两层解决。","Government + individual solutions.","解决要对应原因。","Solutions must match causes.",
   [["To tackle this problem, governments should tax sugary drinks. At the same time, parents could limit screen time.","t2b"],["Cities could introduce congestion charges, as London has done.","t2x"]])],
 near:[B("One effective solution would be to ...","具体可行的建议。","Concrete solution.","不要写 A good way is to let people ...","Avoid vague 'a good way'.",[["One effective solution would be to offer free sports clubs after school.","t2e"]])],
 contrast:{lab:["对比：观点类","Contrast: opinion"], b:B("I firmly believe ...","原因解决类不需要“同意/不同意”。","No agree/disagree needed here.","不要跑题去表态。","Don't drift into agreeing.",[["The main cause is the lack of cheap public transport.","t2b"]])},
 tip:["原因和解决一一对应：每个原因配一个办法，结构最清楚。","Pair each cause with a solution."]
};
P['templates-ae72baca49'] = { fn:["示范段落（观点类）","Model paragraph"],
 main:[
  B("中心句：The main reason I disagree is that ...","一句话说清本段理由。","One-sentence point.","不要中心句里塞例子。","No example in the topic sentence.",
   [["The main reason I disagree is that AI is more likely to change jobs than to eliminate them.","t2b"],["The main reason I agree is that cycling lanes make cities safer.","t2b"]]),
  B("解释：While ..., most roles still require ...","展开为什么。","Explain why.","不要直接跳到例子。","Don't jump straight to the example.",
   [["While AI can handle repetitive tasks, most roles still require judgement and creativity.","t2e"],["When cyclists are separated from cars, accidents fall.","t2e"]]),
  B("例子：For example, in my own industry, ...","具体例子。","Specific example.","不要编造研究数据。","No fake studies.",
   [["For example, in software, AI helps engineers write code faster, but companies still need people to design products.","t2x"],["For example, Copenhagen built separate lanes and now most commuters cycle.","t2x"]]),
  B("小结：Therefore, ... is better seen as ...","回到论点。","Return to the point.","不要加新观点。","No new idea.",
   [["Therefore, AI is better seen as a tool that makes workers more productive.","t2e"],["Therefore, investing in lanes is a practical way to improve safety.","t2e"]])],
 near:[B("同结构换话题","把四步套在别的话题上练习。","Apply the four moves to another topic.","不要背整段。","Don't memorise the paragraph.",[["The main reason I support remote work is that it saves time.","t2b"]])],
 contrast:{lab:["对比：只写观点不展开","Contrast: claims without support"], b:B("AI will not replace jobs. It is just a tool.","反面：没有解释和例子，Task Response 低。","Counter-example: no support, low Task Response.","每个观点都要展开。","Develop every point.",[["AI will not replace most jobs because it cannot handle judgement. For example, ...","t2b"]])},
 tip:["每段四步：观点 → 解释 → 例子 → 小结，写完数一下有没有四步。","Count the four moves in every paragraph."]
};
P['templates-4a0503e48c'] = { fn:["Part 1 公式","Part 1 formula"],
 main:[
  B("直接回答","第一句就回答问题。","Answer in the first sentence.","不要重复题目原句。","Don't repeat the question.",
   [["I work in marketing, at a company that sells sports equipment.","p1w"],["I'm a student — I'm in my second year of an engineering degree.","p1w"]]),
  B("原因","接一个 because / mainly because。","Add a reason.","不要只答 yes / no。","Not just yes/no.",
   [["I chose it mainly because I enjoy working with people.","p1w"],["I picked engineering because I've always liked building things.","p1w"]]),
  B("细节或例子","一个具体细节让回答完整。","One specific detail.","不要超过 30 秒。","Keep under 30 seconds.",
   [["What I like most is that every project is different, so I'm always learning.","p1w"],["For example, last week I organised a small event for clients.","p1w"]])],
 near:[B("对比过去现在","用 used to 增加一句。","Add a used-to sentence.","不要偏题。","Stay on topic.",[["I used to work in sales, but this suits me better.","p1w"]])],
 contrast:{lab:["对比：Part 3 公式","Contrast: Part 3 formula"], b:B("观点 → 原因 → 例子 → 另一面","Part 3 更长、更抽象。","Part 3 is longer and more general.","Part 1 不需要讲社会层面。","Part 1 doesn't need society-level views.",[["In general, people change jobs more often now because ...","p3"]])},
 tip:["Part 1 每题 2–4 句、20–30 秒，答完自然停。","2–4 sentences, 20–30 seconds, then stop."]
};
P['templates-7c4c5fee60'] = { fn:["Part 2 一分钟笔记","Part 2 notes"],
 main:[
  B("开头：I'd like to talk about ..., which ...","点题 + 一句介绍。","Topic + one-line intro.","比 Today I want to talk about 更自然。","More natural than 'Today I want to talk about'.",
   [["I'd like to talk about a café near my office, which I go to almost every morning.","p2s"],["I'd like to talk about a trip to the mountains, which I took last spring.","p2s"]]),
  B("中间：It happened about ... What I remember most is ...","时间、经过、细节。","When, what happened, details.","过去的事用过去时。","Past tense for past events.",
   [["It happened about two years ago, when I first moved to the city.","p2"],["What I remember most is how friendly the owner was.","p2"]]),
  B("结尾：The reason it means so much to me is that ...","感受和原因，最能拉长时间。","Feelings and reasons — the best time-filler.","不要说完就停在 That's all。","Don't end with 'That's all'.",
   [["The reason it means so much to me is that it helped me feel at home.","p2"],["Looking back, I think it was the first time I felt really independent.","p2"]])],
 near:[B("Looking back, I think ...","回顾总结。","Reflective ending.","不要加新故事。","No new story.",[["Looking back, I think it changed how I see my job.","p2"]])],
 contrast:{lab:["对比：写满句子的笔记","Contrast: full-sentence notes"], b:B("（整句写笔记）","反面：来不及看，还会照念。","Counter-example: too slow and leads to reading aloud.","只写 5–8 个关键词。","Write only 5–8 keywords.",[["café – 2 yrs – owner – quiet – feel home","p2"]])},
 tip:["笔记按“什么 / 何时 / 和谁 / 细节 / 感受”排，感受部分准备 2 个理由。","Order notes: what / when / who / details / feelings — with 2 reasons for feelings."]
};
P['templates-96c165fcef'] = { fn:["Part 2 示例","Part 2 model answer"],
 main:[
  B("I'd like to talk about my ..., which I bought about ... ago.","点题 + 时间。","Topic + time.","不要背整段。","Don't memorise it.",
   [["I'd like to talk about my e-reader, which I bought about a year ago.","p2s"],["I'd like to talk about a translation app I started using last year.","p2s"]]),
  B("I got them mainly because ...","原因。","Reason.","过去的原因用过去时。","Past tense.",
   [["I got it mainly because I travel a lot for work.","p2"],["I downloaded it mainly because I was going to Japan.","p2"]]),
  B("What I love most is ...","最喜欢的细节。","Favourite detail.","不要只说 good / nice。","Avoid just good/nice.",
   [["What I love most is how light it is.","p2"],["What I love most is that it works offline.","p2"]]),
  B("The reason they mean a lot to me is that ...","意义和感受。","Meaning and feelings.","不要突然结束。","Don't stop abruptly.",
   [["The reason it means a lot to me is that it got me reading again.","p2"],["It means a lot to me because it made me less nervous abroad.","p2"]])],
 near:[B("Recently I've also been ...ing","现在完成进行时加一个新细节。","Add a recent detail with present perfect continuous.","时态别混。","Keep tenses consistent.",[["Recently I've also been using it to read English novels.","p2"]])],
 contrast:{lab:["对比：一问一答式","Contrast: Q&A style"], b:B("What is it? It's ... When? Two years ago.","反面：像在答题卡，不像故事。","Counter-example: sounds like a checklist.","把题卡问题串成故事。","Turn prompts into a story.",[["I bought it two years ago, when I started commuting.","p2"]])},
 tip:["换物品练：耳机 → 电子书 → 翻译 App，保留结构、换细节。","Practise the same structure with different objects."]
};
P['templates-e3dbde71c1'] = { fn:["Part 3 公式","Part 3 formula"],
 main:[
  B("观点：Definitely, ... / I'd say ...","第一句明确观点。","Clear view first.","不要只说 I don't know。","Never just 'I don't know'.",
   [["Definitely, and I think it's already happening.","p3"],["I'd say it's mostly positive.","p3"]]),
  B("原因：The main reason is that ...","社会层面的原因。","Society-level reason.","不要只讲个人经历。","Not just personal experience.",
   [["The main reason is that AI can take over routine tasks.","p3"],["The main reason is that people have less free time.","p3"]]),
  B("例子：For instance, ...","具体例子。","Specific example.","例子要简短。","Keep it short.",
   [["For instance, many companies use AI to draft reports.","p3"],["For instance, my parents now shop online every week.","p3"]]),
  B("另一面：That said, ... / So overall, I'd say ...","补另一面并收尾。","Other side + wrap-up.","不要说完一句就停。","Don't stop after one sentence.",
   [["That said, jobs that need empathy are harder to automate.","p3"],["So overall, I'd say people will work alongside AI.","p3f"]])],
 near:[B("It's likely that ... / I imagine ...","预测类问题。","For future questions.","不要只用 will。","Not only will.",[["It's likely that more people will work from home.","p3f"]])],
 contrast:{lab:["对比：Part 1 简短回答","Contrast: short Part 1 answer"], b:B("直接回答 + 原因 + 细节","Part 1 只需 2–4 句。","Part 1 needs just 2–4 sentences.","Part 3 只说两句太短。","Two sentences is too short for Part 3.",[["Yes, I use it every day because it's quick.","p1"]])},
 tip:["Part 3 从个人扩展到社会：In general, people ... / In my country, ...","Widen from you to society in Part 3."]
};

window.IELTS_REL_TPL = P;
})();
