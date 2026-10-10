/* 听力练习：全部原创脚本（非剑桥真题）。
   音频：v1 用浏览器自带的英语语音朗读（Web Speech API），A/B 两个说话人用不同音高。
   TODO：换成真人录音（自录或 CC 授权素材）后，在每套里加 audio:'audio/xxx.mp3' 即可。
   题型 mcq {q,o,a}；gap {q 含 ___, a:[可接受答案]}；trap = 这题的陷阱 */
window.IELTS_LISTENING = [
{id:'L01', part:1, title:'Joining a sports centre', zh:'健身中心入会登记', min:8,
 lines:[
  ['A','Good morning, Riverside Sports Centre. How can I help?'],
  ['B','Hi, I\'d like to become a member. I saw your advert online.'],
  ['A','Of course. Can I take your surname first?'],
  ['B','Yes, it\'s Harlow. H-A-R-L-O-W.'],
  ['A','Thank you. And your first name?'],
  ['B','Megan.'],
  ['A','And what\'s your address, Megan?'],
  ['B','It\'s 42 Westbrook Road. That\'s in the north of the city.'],
  ['A','Lovely. Now, we have three types of membership. Off-peak is twenty-two pounds a month, standard is thirty-five, and premium is fifty.'],
  ['B','I usually train in the evenings after work, so I guess off-peak isn\'t for me.'],
  ['A','That\'s right, off-peak is only before five p.m. on weekdays.'],
  ['B','Then I\'ll take standard. Does that include the pool?'],
  ['A','It does, but classes like yoga are extra, unless you go premium.'],
  ['B','That\'s fine. I can pay for yoga separately.'],
  ['A','Great. You\'ll need to come in for an induction before you start. The earliest we have is Thursday at six thirty. Actually, sorry, that one\'s full. Saturday at ten?'],
  ['B','Saturday at ten works.'],
  ['A','Please bring a photo for your card. Oh, and one more thing. How did you hear about us?'],
  ['B','A colleague recommended you, actually, not the advert.']
 ],
 qs:[
  {t:'gap', q:'Surname: ___', a:['harlow'], trap:'拼写题：字母要听准，H-A-R-L-O-W'},
  {t:'gap', q:'Address: ___ Westbrook Road', a:['42'], trap:'数字 42，注意 forty / fourteen 的重音'},
  {t:'gap', q:'Membership chosen: ___', a:['standard'], trap:'先提到 off-peak 被否定，最终选 standard'},
  {t:'gap', q:'Monthly cost: £___', a:['35','thirty-five','thirty five'], trap:'三个价格都出现了，选与 standard 对应的'},
  {t:'mcq', q:'Induction day', o:['Thursday','Saturday','Friday'], a:1, trap:'先说 Thursday 后被纠正（that one\'s full）'},
  {t:'mcq', q:'How did she hear about the centre?', o:['An online advert','A colleague','A leaflet'], a:1, trap:'开头提到 advert，结尾 actually 推翻'}
 ]},
{id:'L02', part:1, title:'Booking a holiday cottage', zh:'预订度假小屋', min:8,
 lines:[
  ['A','Hello, Lakeside Cottages, Daniel speaking.'],
  ['B','Hi Daniel, I\'m interested in renting a cottage for a week in August.'],
  ['A','Sure. How many people will be staying?'],
  ['B','Four adults and one child. My daughter is seven.'],
  ['A','Then I\'d recommend Willow Cottage. It has three bedrooms. Or Fern Cottage, which is smaller but right on the water.'],
  ['B','We need three bedrooms, so Willow sounds better.'],
  ['A','Willow is available from the ninth to the sixteenth, or from the sixteenth to the twenty-third.'],
  ['B','The second week, please, the sixteenth.'],
  ['A','The price is six hundred and eighty pounds, and there\'s a cleaning fee of forty pounds.'],
  ['B','Is parking included?'],
  ['A','Yes, two cars free of charge. Pets are not allowed, though.'],
  ['B','That\'s fine, we don\'t have any. Can we hire bikes?'],
  ['A','Bikes are available from the village shop, which is about a ten-minute walk. Boats can be hired directly from us.'],
  ['B','Perfect. Could I give you my email? It\'s s.chen88 at mailbox dot com.'],
  ['A','S dot chen, eight eight. Got it. I\'ll send the confirmation and you\'ll need to pay a deposit of twenty percent within three days.']
 ],
 qs:[
  {t:'mcq', q:'Which cottage do they choose?', o:['Fern','Willow','Oak'], a:1, trap:'Fern 在水边但卧室不够'},
  {t:'gap', q:'Arrival date: August ___', a:['16','16th','sixteenth'], trap:'两段日期，选第二段的开始日'},
  {t:'gap', q:'Cleaning fee: £___', a:['40','forty'], trap:'forty 和 fourteen 的区分'},
  {t:'mcq', q:'Bikes can be hired from', o:['the cottage owner','the village shop','the station'], a:1, trap:'船才是从房东处租'},
  {t:'gap', q:'Deposit: ___ percent', a:['20','twenty'], trap:'三天是期限，二十是比例'}
 ]},
{id:'L03', part:2, title:'A guided tour of the new library', zh:'新图书馆导览（独白）', min:9,
 lines:[
  ['A','Welcome, everyone, to the new Central Library. I\'ll give you a quick overview before you explore on your own.'],
  ['A','The building opened in March, although construction actually finished at the end of last year. It took almost three years in total.'],
  ['A','On the ground floor you\'ll find the café and the children\'s section. Many people expect the newspapers to be here too, but we moved them up to the first floor, next to the quiet study area.'],
  ['A','The second floor is home to our digital lab. You can use 3D printers there, but you must book at least one day in advance. Laptops can be borrowed for up to four hours.'],
  ['A','The top floor has a roof garden. It\'s open every day except Monday, when our volunteers look after the plants.'],
  ['A','A couple of practical points. Lockers are free, but you need a one-pound coin, which you get back. And please note that the library now closes at eight p.m. on weekdays, not nine as it says on our old leaflets.'],
  ['A','Finally, if you\'d like to join our volunteer team, speak to Grace at the information desk, not at reception.']
 ],
 qs:[
  {t:'mcq', q:'When did the library open?', o:['At the end of last year','In March','Three years ago'], a:1, trap:'end of last year 是完工时间'},
  {t:'mcq', q:'Where are the newspapers now?', o:['Ground floor','First floor','Second floor'], a:1, trap:'「很多人以为在一楼」是干扰'},
  {t:'gap', q:'3D printers must be booked ___ day(s) in advance', a:['1','one'], trap:'four hours 是笔记本借用时长'},
  {t:'mcq', q:'The roof garden is closed on', o:['Sunday','Monday','Saturday'], a:1, trap:'except Monday'},
  {t:'gap', q:'Weekday closing time: ___ p.m.', a:['8','eight'], trap:'旧传单上的 nine 是干扰'},
  {t:'mcq', q:'To volunteer, speak to Grace at', o:['reception','the information desk','the café'], a:1, trap:'not at reception'}
 ]},
{id:'L04', part:2, title:'Community clean-up day', zh:'社区清洁日通知', min:8,
 lines:[
  ['A','Hi everyone, thanks for coming to this short briefing about Saturday\'s clean-up day.'],
  ['A','We\'ll meet at the north gate of Elm Park at nine. Originally we planned to start at the river, but the path there is being repaired, so we\'ll begin in the playground.'],
  ['A','Gloves and bags will be provided. What we don\'t have enough of are litter pickers, so if you own one, please bring it.'],
  ['A','We\'ve divided the park into four zones. Zone A, near the lake, will be handled by the school group. Zone B is the woodland, which needs our strongest volunteers because some of the rubbish is quite heavy.'],
  ['A','Lunch will be sandwiches, kindly donated by Rosie\'s Bakery. If you have any food allergies, tell Tom before Thursday.'],
  ['A','Last year we collected two hundred and twelve bags. This year our target is two hundred and fifty.'],
  ['A','And if it rains heavily, we\'ll postpone to the following Sunday rather than cancel.']
 ],
 qs:[
  {t:'mcq', q:'Where will the work start?', o:['The river','The playground','The lake'], a:1, trap:'原计划 river，因修路改成 playground'},
  {t:'mcq', q:'Volunteers should bring', o:['gloves','bags','litter pickers'], a:2, trap:'gloves and bags will be provided'},
  {t:'mcq', q:'Zone B needs volunteers who are', o:['experienced','strong','young'], a:1, trap:'strongest volunteers'},
  {t:'gap', q:'This year\'s target: ___ bags', a:['250','two hundred and fifty'], trap:'212 是去年的数字'},
  {t:'mcq', q:'If it rains heavily, the event will be', o:['cancelled','moved to Sunday','moved indoors'], a:1, trap:'rather than cancel'}
 ]},
{id:'L05', part:3, title:'Planning a group presentation', zh:'两名学生讨论小组展示', min:10,
 lines:[
  ['A','So, Leo, have you decided what our presentation should focus on? Urban farming is quite broad.'],
  ['B','I was thinking rooftop gardens, but honestly, I think vertical farms might be more interesting. There\'s more recent data.'],
  ['A','I agree. The rooftop studies are mostly from ten years ago.'],
  ['B','For structure, should we start with the history?'],
  ['A','Our tutor said to keep the background short. Maybe we open with a surprising statistic instead, then move to case studies.'],
  ['B','Good idea. Which case study? Singapore or Tokyo?'],
  ['A','Singapore has better documentation. Tokyo\'s project is newer, but most of the reports are only in Japanese.'],
  ['B','Singapore, then. What about the visuals? I find charts a bit dull.'],
  ['A','Charts are necessary for the costs section, but for the design part we could use photos.'],
  ['B','And who presents what? I\'m more confident talking about economics.'],
  ['A','Then you take costs, and I\'ll do design and the conclusion. We should rehearse at least twice.'],
  ['B','Wednesday works for me, but not Friday.'],
  ['A','Wednesday and Monday, then.']
 ],
 qs:[
  {t:'mcq', q:'What will the presentation focus on?', o:['Rooftop gardens','Vertical farms','Community gardens'], a:1, trap:'先说 rooftop，but 之后改变'},
  {t:'mcq', q:'How will they open the presentation?', o:['With history','With a statistic','With a video'], a:1, trap:'tutor 说背景要短'},
  {t:'mcq', q:'Why choose Singapore?', o:['It is newer','It is better documented','It is cheaper'], a:1, trap:'newer 是 Tokyo 的特点'},
  {t:'mcq', q:'Photos will be used for', o:['costs','design','conclusion'], a:1, trap:'costs 必须用图表'},
  {t:'mcq', q:'Leo will present', o:['costs','design','the conclusion'], a:0, trap:'economics = costs（同义替换）'},
  {t:'mcq', q:'Rehearsal days', o:['Wednesday and Friday','Wednesday and Monday','Monday and Friday'], a:1, trap:'not Friday'}
 ]},
{id:'L06', part:3, title:'Feedback on an essay', zh:'导师给学生作文反馈', min:9,
 lines:[
  ['A','Come in, Priya. I\'ve read your essay on remote working.'],
  ['B','Thanks. I was worried the argument wasn\'t clear.'],
  ['A','Actually, the argument is the strongest part. Your position is obvious from the introduction. The weakness is the evidence.'],
  ['B','You mean I need more sources?'],
  ['A','Not more, better. Two of your sources are blog posts. Replace them with peer-reviewed studies.'],
  ['B','OK. What about the length?'],
  ['A','You\'re about three hundred words over the limit. Your second section repeats points from the first, so cut there rather than in the conclusion.'],
  ['B','And the referencing?'],
  ['A','Mostly fine, but you\'ve mixed two styles. Stick with the one the department requires.'],
  ['B','When should I resubmit?'],
  ['A','The official deadline is the twentieth, but send me a draft by the fifteenth if you\'d like comments.']
 ],
 qs:[
  {t:'mcq', q:'The strongest part of the essay is', o:['the evidence','the argument','the conclusion'], a:1, trap:'Priya 担心 argument，但老师说 actually 最强'},
  {t:'mcq', q:'What does the tutor say about sources?', o:['Use more','Use better quality ones','Remove all'], a:1, trap:'Not more, better'},
  {t:'mcq', q:'Where should she cut words?', o:['Introduction','Second section','Conclusion'], a:1, trap:'rather than in the conclusion'},
  {t:'gap', q:'Draft for comments by the ___', a:['15','15th','fifteenth'], trap:'20 号是正式截止'}
 ]},
{id:'L07', part:4, title:'The history of the bicycle', zh:'学术讲座：自行车的历史', min:10,
 lines:[
  ['A','Today\'s lecture looks at the bicycle, a machine that changed not only transport but also society.'],
  ['A','The first recognisable ancestor appeared in Germany in 1817. It had no pedals; riders pushed it along with their feet. It was called the running machine, and it was popular for only a few years.'],
  ['A','Pedals arrived in the 1860s in France, attached directly to the front wheel. To go faster, designers made that front wheel larger and larger, which led to the famous high-wheeler. These were fast but dangerous, and riders often fell forward over the handlebars.'],
  ['A','The real breakthrough was the safety bicycle of the 1880s. Its two wheels were the same size, and a chain drove the back wheel. Shortly after, air-filled tyres made riding far more comfortable.'],
  ['A','Socially, the effect was enormous, especially for women. Historians argue that the bicycle gave women an independent means of travel, and it even influenced fashion, as long skirts were impractical.'],
  ['A','In the twentieth century, cars pushed bicycles aside in many countries. Today, however, cities are building cycle lanes again, mainly to reduce congestion rather than for environmental reasons alone.']
 ],
 qs:[
  {t:'gap', q:'The first ancestor appeared in Germany in ___', a:['1817'], trap:'1860s 是踏板出现的年代'},
  {t:'gap', q:'The early machine had no ___', a:['pedals','pedal'], trap:'跟上 It had no...'},
  {t:'mcq', q:'High-wheelers were', o:['slow but safe','fast but dangerous','cheap'], a:1, trap:'—'},
  {t:'mcq', q:'The safety bicycle had', o:['a large front wheel','wheels of equal size','no chain'], a:1, trap:'same size = equal size（同义替换）'},
  {t:'gap', q:'The bicycle even influenced ___', a:['fashion','clothing'], trap:'long skirts 是例子'},
  {t:'mcq', q:'Cities build cycle lanes today mainly to', o:['protect the environment','reduce congestion','improve health'], a:1, trap:'rather than ... alone'}
 ]},
{id:'L08', part:4, title:'Sleep and memory', zh:'学术讲座：睡眠与记忆', min:10,
 lines:[
  ['A','Good afternoon. My topic today is the link between sleep and memory, an area where research has grown rapidly in the last two decades.'],
  ['A','We used to think sleep was simply a period of rest for the brain. We now know the brain is highly active, particularly during deep sleep, when it replays information learned during the day.'],
  ['A','In one well-known type of experiment, participants learn a list of word pairs in the evening. Those who sleep normally recall significantly more the next morning than those kept awake, even when both groups rest.'],
  ['A','Interestingly, a short nap of about twenty minutes improves alertness, but for memory, naps of sixty to ninety minutes appear more effective, because they include deep sleep.'],
  ['A','For students, the practical lesson is clear. Staying up all night before an exam is counterproductive. Revising in the evening and then sleeping is better than revising late at night with little sleep.'],
  ['A','Of course, many questions remain. For instance, we still don\'t fully understand why older adults get less deep sleep, and whether this explains some memory decline.']
 ],
 qs:[
  {t:'mcq', q:'During deep sleep the brain', o:['rests completely','replays information','forgets details'], a:1, trap:'used to think rest 是旧观点'},
  {t:'mcq', q:'Participants who slept', o:['recalled more','recalled less','showed no difference'], a:0, trap:'—'},
  {t:'gap', q:'For memory, naps of ___ to 90 minutes are more effective', a:['60','sixty'], trap:'20 分钟只提升清醒度'},
  {t:'mcq', q:'The speaker advises students to', o:['study all night','revise in the evening then sleep','nap before exams'], a:1, trap:'—'},
  {t:'mcq', q:'An unanswered question is why', o:['children sleep more','older adults get less deep sleep','naps help alertness'], a:1, trap:'—'}
 ]},
{id:'L09', part:1, title:'Reporting a lost item', zh:'挂失物品', min:7,
 lines:[
  ['A','Lost property office, how can I help?'],
  ['B','I left a bag on the number 57 bus this morning.'],
  ['A','Was it the 57 or the 67? They use the same stop.'],
  ['B','Definitely the 57. I got off at the hospital.'],
  ['A','Can you describe the bag?'],
  ['B','It\'s a dark green backpack, quite small, with a red keyring on the zip.'],
  ['A','What was inside?'],
  ['B','A laptop charger, a notebook and an umbrella. Oh, and my sunglasses, but I think I might have left those at home.'],
  ['A','What time did you get off?'],
  ['B','Around eight fifteen. No, wait, it was later, about eight forty, because I stopped for coffee first.'],
  ['A','OK. We\'ll check and call you. A phone number?'],
  ['B','07700 913 482.']
 ],
 qs:[
  {t:'gap', q:'Bus number: ___', a:['57','fifty-seven','fifty seven'], trap:'67 是对方的猜测'},
  {t:'gap', q:'Colour of backpack: dark ___', a:['green'], trap:'red 是钥匙扣'},
  {t:'mcq', q:'Which item was NOT definitely in the bag?', o:['Charger','Umbrella','Sunglasses'], a:2, trap:'might have left those at home'},
  {t:'gap', q:'Time she got off: 8:___', a:['40','forty'], trap:'先说 8:15 后改口'}
 ]},
{id:'L10', part:2, title:'Changes at the city museum', zh:'博物馆变动介绍', min:8,
 lines:[
  ['A','Thanks for tuning in to City Radio. I\'m here with some news about the City Museum, which reopens next month after renovation.'],
  ['A','The biggest change is the entrance. Visitors will no longer use the main steps on King Street; the new entrance is on the side, facing the park, and it\'s fully step-free.'],
  ['A','Admission to the permanent collection remains free, but special exhibitions will now cost eight pounds, or five for students.'],
  ['A','The first special exhibition is about ancient maps. It was originally going to be about Roman coins, but that has been postponed until next spring.'],
  ['A','The museum shop has moved from the ground floor to the basement, and the café has doubled in size.'],
  ['A','Opening hours are ten to six, and until nine on Fridays. School groups must book online at least two weeks in advance.']
 ],
 qs:[
  {t:'mcq', q:'The new entrance faces', o:['King Street','the park','the river'], a:1, trap:'King Street 是旧入口'},
  {t:'gap', q:'Student ticket for special exhibitions: £___', a:['5','five'], trap:'8 是普通票'},
  {t:'mcq', q:'The first special exhibition is about', o:['Roman coins','ancient maps','local history'], a:1, trap:'Roman coins 推迟了'},
  {t:'mcq', q:'The shop is now', o:['on the ground floor','in the basement','next to the café'], a:1, trap:'moved from ... to'},
  {t:'gap', q:'On Fridays the museum closes at ___ p.m.', a:['9','nine'], trap:'6 是平日'}
 ]},
{id:'L11', part:3, title:'Choosing a research method', zh:'讨论调研方法', min:9,
 lines:[
  ['A','Mia, for our project on student spending, are we doing a questionnaire or interviews?'],
  ['B','I thought interviews at first, because you get richer answers. But we need data from at least a hundred students.'],
  ['A','Right, interviews would take forever. A questionnaire, then. Online or paper?'],
  ['B','Online is quicker to analyse, but response rates can be low. Maybe we hand out paper ones in the canteen as well.'],
  ['A','Good. How many questions?'],
  ['B','Under fifteen. Long surveys get abandoned halfway.'],
  ['A','Should we ask about income?'],
  ['B','That\'s sensitive. Let\'s ask about monthly budget instead.'],
  ['A','And a pilot test?'],
  ['B','Definitely. Let\'s try it on five friends first and fix anything confusing.']
 ],
 qs:[
  {t:'mcq', q:'Main method chosen', o:['Interviews','Questionnaire','Observation'], a:1, trap:'at first 是原想法'},
  {t:'mcq', q:'Why also use paper copies?', o:['Cheaper','To improve response rates','Easier to analyse'], a:1, trap:'online 更好分析'},
  {t:'gap', q:'Number of questions: under ___', a:['15','fifteen'], trap:'—'},
  {t:'mcq', q:'Instead of income they will ask about', o:['savings','monthly budget','part-time jobs'], a:1, trap:'—'},
  {t:'gap', q:'Pilot test with ___ friends', a:['5','five'], trap:'100 是总样本'}
 ]},
{id:'L12', part:4, title:'Urban heat islands', zh:'学术讲座：城市热岛', min:10,
 lines:[
  ['A','Today we\'re looking at urban heat islands: the fact that cities are often several degrees warmer than the surrounding countryside.'],
  ['A','The main cause is surface materials. Asphalt and concrete absorb heat during the day and release it slowly at night, so the difference is actually greatest after sunset, not at midday.'],
  ['A','A second factor is the lack of vegetation. Trees cool the air through shade and through the water they release from their leaves.'],
  ['A','Heat from vehicles and air conditioners adds to the problem, although its contribution is smaller than many people assume.'],
  ['A','Solutions fall into three groups. Cool roofs, painted white or light colours, reflect sunlight. Green roofs add insulation and vegetation. And planting street trees is often the most cost-effective option.'],
  ['A','One city in Spain reduced street temperatures by up to three degrees simply by adding shade structures over busy walkways.']
 ],
 qs:[
  {t:'mcq', q:'The temperature difference is greatest', o:['at midday','after sunset','in the morning'], a:1, trap:'not at midday'},
  {t:'mcq', q:'Heat from vehicles is', o:['the main cause','smaller than people think','not a factor'], a:1, trap:'—'},
  {t:'gap', q:'Cool roofs are painted white or ___ colours', a:['light'], trap:'—'},
  {t:'mcq', q:'The most cost-effective option is often', o:['green roofs','street trees','cool roofs'], a:1, trap:'—'},
  {t:'gap', q:'The Spanish city cut temperatures by up to ___ degrees', a:['3','three'], trap:'—'}
 ]}
];
