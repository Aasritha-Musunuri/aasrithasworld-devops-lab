import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const notes=path.resolve(root,'../DevOps-Learning-Journey');
export function lessons(){
 return fs.readdirSync(notes,{withFileTypes:true}).filter(x=>x.isDirectory()&&/^day-\d+/.test(x.name)).sort((a,b)=>a.name.localeCompare(b.name)).map(d=>{
 const folder=path.join(notes,d.name), readme=fs.readFileSync(path.join(folder,'README.md'),'utf8');
 return {id:d.name,number:Number(d.name.match(/day-(\d+)/)[1]),title:(readme.match(/^# (.*)/m)||[])[1]?.replace(/^Day \d+:\s*/, '')||d.name,
 topics:fs.readdirSync(folder).filter(f=>/^\d.*\.md$/.test(f)).sort().map(f=>{const content=fs.readFileSync(path.join(folder,f),'utf8');return {id:f,title:(content.match(/^# (.*)/m)||[])[1]||f,content};})};
 });
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 try{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/lessons'){res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(lessons()));return;}
 const name=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);
 const target=path.resolve(root,'dist','.'+name);
 if(!target.startsWith(path.join(root,'dist')+path.sep)){res.writeHead(403);res.end();return;}
 if(!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404);res.end('Page not found');return;}
 res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});fs.createReadStream(target).pipe(res);
 }catch{res.writeHead(500);res.end('Unable to load this page');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Port 4173 is busy. Close the previous study server before starting another.':e.message);process.exitCode=1;});
server.listen(4173,'127.0.0.1',()=>console.log('DevOps Learning Journey: http://127.0.0.1:4173'));
