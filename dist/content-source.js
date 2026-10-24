(function(){
 async function json(url){const r=await fetch(url,{cache:'no-store',headers:{Accept:'application/vnd.github+json'}});if(!r.ok){if(r.status===403||r.status===429)throw Error('GitHub is limiting requests from this connection. Please try again later.');throw Error('Unable to read the public lesson repository (HTTP '+r.status+').');}return r.json();}
 async function mapLimit(items,limit,fn){let next=0;const results=new Array(items.length);await Promise.all(Array.from({length:Math.min(limit,items.length)},async()=>{while(next<items.length){const i=next++;results[i]=await fn(items[i]);}}));return results;}
 window.loadStudyLessons=async function(){
 const config=window.STUDY_SOURCE;
 if(config.mode==='disabled')throw Error(config.retiredDomain?'This learning site is no longer available on this domain.':'The study website is paused.');
 if(config.mode==='local'){const r=await fetch('/api/lessons',{cache:'no-store'});if(!r.ok)throw Error('Start the local server using start.cmd, then reload this page.');return r.json();}
 const base='https://api.github.com/repos/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repository);
 const commit=await json(base+'/commits/'+encodeURIComponent(config.branch));
 const tree=await json(base+'/git/trees/'+commit.commit.tree.sha+'?recursive=1');
 if(tree.truncated)throw Error('The repository is too large for automatic discovery. Use a smaller dedicated lesson directory/repository.');
 const prefix=config.directory.replace(/^\/+|\/+$/g,'')+'/';
 const entries=tree.tree.filter(x=>x.type==='blob'&&x.path.startsWith(prefix)).map(x=>({...x,relative:x.path.slice(prefix.length)})).filter(x=>/^(?:[^/]+\/)?day-\d+[^/]*\/(README|\d[^/]*)\.md$/i.test(x.relative));
 const groups=new Map();for(const entry of entries){const folder=entry.relative.split('/').slice(0,-1).join('/');if(!groups.has(folder))groups.set(folder,[]);groups.get(folder).push(entry);}
 window.studyRawBase='https://raw.githubusercontent.com/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repository)+'/'+commit.sha+'/'+config.directory+'/';
 const texts=await mapLimit(entries,5,async entry=>{const r=await fetch('https://raw.githubusercontent.com/'+encodeURIComponent(config.owner)+'/'+encodeURIComponent(config.repository)+'/'+commit.sha+'/'+entry.path.split('/').map(encodeURIComponent).join('/'));if(!r.ok)throw Error('Unable to load '+entry.path);return [entry.path,await r.text()];});
 const contents=new Map(texts);
 return Array.from(groups).map(([folder,files])=>{const parts=folder.split('/'),id=parts.at(-1),module=parts.length>1?parts[0]:null,readme=files.find(x=>x.relative.endsWith('/README.md'));const title=readme?(contents.get(readme.path).match(/^# (.*)/m)||[])[1]:null;return{id,path:folder,module,number:Number(id.match(/^day-(\d+)/)[1]),title:title?.replace(/^Day \d+:\s*/,'')||id.replace(/^day-\d+-?/,'').replaceAll('-',' '),topics:files.filter(x=>!x.relative.endsWith('/README.md')).sort((a,b)=>a.relative.localeCompare(b.relative,undefined,{numeric:true})).map(x=>({id:x.relative.split('/').at(-1),title:(contents.get(x.path).match(/^# (.*)/m)||[])[1]||x.relative.split('/').at(-1),content:contents.get(x.path)}))};}).filter(x=>x.topics.length).sort((a,b)=>a.number-b.number||a.id.localeCompare(b.id));
 };
})();
