global.window={};const fs=require('fs');for(const f of ['listening','listening-more','reading','reading-more'])require('../content/'+f+'.js');
const shards={},infl={};global.IELTS_DICT_SHARD=(k,d,v)=>{Object.assign(shards,d);Object.assign(infl,v||{})};
for(const f of fs.readdirSync(__dirname+'/../dict'))if(f.endsWith('.js'))require('../dict/'+f);
fs.writeFileSync('/tmp/ielts_data.json',JSON.stringify({L:window.IELTS_LISTENING,R:window.IELTS_READING}));
const g={};for(const w in shards)g[w]=shards[w].g||[];fs.writeFileSync('/tmp/ielts_dict.json',JSON.stringify({g,infl}));
