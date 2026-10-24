const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
function compile(root){
 const folders=[];
 for(const entry of fs.readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory())){
  if(/^day-\d+/.test(entry.name))folders.push({id:entry.name,path:entry.name,module:null});
  else for(const day of fs.readdirSync(path.join(root,entry.name),{withFileTypes:true}).filter(x=>x.isDirectory()&&/^day-\d+/.test(x.name)))folders.push({id:day.name,path:entry.name+'/'+day.name,module:entry.name});
 }
 return folders.map(d=>{const folder=path.join(root,d.path),readmeFile=path.join(folder,'README.md'),readme=fs.existsSync(readmeFile)?fs.readFileSync(readmeFile,'utf8'):'';return{...d,module:d.module||(readme.match(/^\*\*Module:\*\* (.+)$/m)||[])[1]?.trim()||'Other',number:Number(d.id.match(/^day-(\d+)/)[1]),title:(readme.match(/^# (.*)/m)||[])[1]?.replace(/^Day \d+:\s*/,'').trim()||d.id.replace(/^day-\d+-?/,'').replaceAll('-',' '),topics:fs.readdirSync(folder).filter(x=>/^\d[^/]*\.md$/.test(x)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(file=>{const content=fs.readFileSync(path.join(folder,file),'utf8');return{id:file,title:(content.match(/^# (.*)/m)||[])[1]?.trim()||file,content};})};}).filter(d=>d.topics.length).sort((a,b)=>a.number-b.number||a.id.localeCompare(b.id));
}
if(require.main===module){const root=path.resolve(process.argv[2]||path.join(__dirname,'../DevOps-Learning-Journey')),output=path.resolve(process.argv[3]||path.join(__dirname,'dist/lessons.json')),days=compile(root);if(!days.length)throw Error('No numbered lessons found; refusing to publish an empty learning path.');let commit=null;try{commit=execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{}fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify({version:1,generatedAt:new Date().toISOString(),source:{owner:'Aasritha-Musunuri',repository:'Devops',directory:'DevOps-Learning-Journey',commit},days}));console.log(`Prepared ${days.length} chapters and ${days.reduce((n,d)=>n+d.topics.length,0)} lessons.`);}
module.exports={compile};
