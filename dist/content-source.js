(function(){
 async function response(url,signal,headers){const r=await fetch(url,{cache:'no-store',signal,headers});if(!r.ok)throw Error('Unable to load lesson data (HTTP '+r.status+').');return r;}
 async function liveLessons(config,knownCommit){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000),signal=controller.signal;
  try{
   const base='https://api.github.com/repos/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repository);
   const commit=await(await response(base+'/commits/'+encodeURIComponent(config.branch),signal,{Accept:'application/vnd.github+json'})).json();
   if(commit.sha===knownCommit)return null;
   const tree=await(await response(base+'/git/trees/'+commit.commit.tree.sha+'?recursive=1',signal,{Accept:'application/vnd.github+json'})).json();
   if(tree.truncated)throw Error('The lesson repository listing is incomplete.');
   const prefix=config.directory.replace(/^\/+|\/+$/g,'')+'/';
   const entries=tree.tree.filter(x=>x.type==='blob'&&x.path.startsWith(prefix)).map(x=>({...x,relative:x.path.slice(prefix.length)})).filter(x=>/^(?:[^/]+\/)?day-\d+[^/]*\/(README|\d[^/]*)\.md$/i.test(x.relative));
   const groups=new Map();for(const entry of entries){const folder=entry.relative.split('/').slice(0,-1).join('/');if(!groups.has(folder))groups.set(folder,[]);groups.get(folder).push(entry);}
   const raw='https://raw.githubusercontent.com/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repository)+'/'+commit.sha+'/';
   const contents=new Map();let next=0;
   await Promise.all(Array.from({length:Math.min(5,entries.length)},async()=>{while(next<entries.length){const entry=entries[next++];contents.set(entry.path,await(await response(raw+entry.path.split('/').map(encodeURIComponent).join('/'),signal)).text());}}));
   return Array.from(groups).map(([folder,files])=>{const parts=folder.split('/'),id=parts.at(-1),readme=files.find(x=>x.relative.endsWith('/README.md')),text=readme?contents.get(readme.path):'';return{id,path:folder,module:parts.length>1?parts[0]:(text.match(/^\*\*Module:\*\* (.+)$/m)||[])[1]?.trim()||'Other',number:Number(id.match(/^day-(\d+)/)[1]),title:(text.match(/^# (.*)/m)||[])[1]?.replace(/^Day \d+:\s*/,'').trim()||id.replace(/^day-\d+-?/,'').replaceAll('-',' '),topics:files.filter(x=>!x.relative.endsWith('/README.md')).sort((a,b)=>a.relative.localeCompare(b.relative,undefined,{numeric:true})).map(x=>({id:x.relative.split('/').at(-1),title:(contents.get(x.path).match(/^# (.*)/m)||[])[1]?.trim()||x.relative.split('/').at(-1),content:contents.get(x.path)}))};}).filter(x=>x.topics.length).sort((a,b)=>a.number-b.number||a.id.localeCompare(b.id));
  }finally{clearTimeout(timeout);controller.abort();}
 }
 window.loadStudyLessons=async function(){
  const config=window.STUDY_SOURCE;
  if(config.mode==='disabled')throw Error(config.retiredDomain?'This learning site is no longer available on this domain.':'The study website is paused.');
  if(config.mode==='local'){const r=await response('/api/lessons');return r.json();}
  // This file is generated from the original Markdown during each Pages deployment.
  // Opening the reader therefore needs no GitHub API access or cross-origin requests.
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
  let snapshot;
  try{const r=await response('lessons.json',controller.signal);snapshot=await r.json();if(snapshot.version!==1||!Array.isArray(snapshot.days)||!snapshot.days.length)throw Error('The deployed lesson data is invalid.');}
  catch{try{return await liveLessons(config,null);}catch{throw Error('The lesson data could not be reached. Please reload the page or try again shortly.');}}
  finally{clearTimeout(timeout);}
  // A blocked external request never removes the already available lessons.
  setTimeout(()=>{liveLessons(config,snapshot.source?.commit).then(days=>{if(days)window.dispatchEvent(new CustomEvent('study-lessons-updated',{detail:{days}}));}).catch(()=>{});},0);
  return snapshot.days;
 };
})();
