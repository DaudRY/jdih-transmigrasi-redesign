"use strict";
/* WebKit approximates Safari engine, not a physical iOS test. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {chromium,firefox,webkit}=require("playwright");
const root=path.resolve(__dirname,"..");
const types={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".webp":"image/webp",".pdf":"application/pdf",".json":"application/json"};
const server=http.createServer((req,res)=>{
 try{
  const p=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const file=path.resolve(root,"."+(p==="/"?"/index.html":p));
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  const body=fs.readFileSync(file);
  res.writeHead(200,{"content-type":types[path.extname(file)]||"application/octet-stream"});
  res.end(body);
 }catch(e){if(!res.headersSent)res.writeHead(404);res.end("Not found");}
});
async function test(name,engine,origin){
 const browser=await engine.launch({headless:true});
 let count=0;
 try{
  for(const width of [390,768,1440]){
   const page=await browser.newPage({viewport:{width,height:840},deviceScaleFactor:1});
   const errors=[];
   page.on("pageerror",e=>errors.push(e.message));
   await page.route("https://jdih.transmigrasi.go.id/**",route=>route.abort());
   await page.goto(origin+"/index.html",{waitUntil:"load"});
   await page.locator("#theme-toggle").waitFor();
   assert.equal(await page.locator("#results .doc").count(),4,name+"/"+width+": homepage cards");
   assert.equal(await page.locator(".quick a .qicon svg").count(),4,name+"/"+width+": four category icons");
   const overflow=await page.evaluate(()=>Math.round(document.documentElement.scrollWidth-window.innerWidth));
   assert.ok(overflow<=3,name+"/"+width+": home overflow "+overflow+"px");
   assert.equal(await page.locator("a.skip").count(),1,name+"/"+width+": skip link");
   await page.locator("#theme-toggle").click();
   assert.equal(await page.locator("html").getAttribute("data-theme"),"night",name+"/"+width+": night theme");
   await page.locator("#lang-select").selectOption("en");
   assert.equal(await page.locator("html").getAttribute("lang"),"en",name+"/"+width+": EN language");
   if(width<=768){
     const menu=page.locator("#menu");
     assert.equal(await menu.isVisible(),true,name+"/"+width+": mobile toggle visible");
     await menu.click();
     assert.equal(await page.locator("#nav").isVisible(),true,name+"/"+width+": navigation opens");
     await page.keyboard.press("Escape");
     assert.equal(await page.locator("#nav").isVisible(),false,name+"/"+width+": Escape closes menu");
   }
   await page.screenshot({path:path.join(root,"artifacts","browser-"+name+"-"+width+".png")});
   await page.locator("#heroquery").fill("patriot");
   await page.locator("#heroform button[type=submit]").click();
   await page.waitForURL("**/telusur.html?**");
   assert.ok(page.url().includes("q=patriot"),name+"/"+width+": search URL");
   await page.locator("#results .resultcard").first().waitFor();
   assert.equal(await page.locator("#results .resultcard").count(),1,name+"/"+width+": search results");
   const searchOverflow=await page.evaluate(()=>Math.round(document.documentElement.scrollWidth-window.innerWidth));
   assert.ok(searchOverflow<=3,name+"/"+width+": search overflow "+searchOverflow);
   await page.goto(origin+"/katalog.html?kategori=putusan-pengadilanyurisprudensi",{waitUntil:"load"});
   assert.equal(await page.locator("#catalog-results .catalogcard").count(),1,name+"/"+width+": decision category");
   await page.locator("#catalog-results .internal-detail").first().click();
   await page.locator("#doc-title").filter({hasText:"Malili"}).waitFor();
   assert.ok((await page.locator("#source-status-note").innerText()).includes("inkracht"),name+"/"+width+": status distinction");
   const docOverflow=await page.evaluate(()=>Math.round(document.documentElement.scrollWidth-window.innerWidth));
   assert.ok(docOverflow<=3,name+"/"+width+": detail overflow "+docOverflow);
   await page.locator("#load-preview").click();
   assert.ok((await page.locator("#pdfpreview").getAttribute("src")).includes(".pdf"),name+"/"+width+": PDF preview");
   assert.deepEqual(errors,[],name+"/"+width+": JS console errors");
   await page.close();
   count++;
  }
 }finally{await browser.close();}
 return count;
}
(async()=>{
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 fs.mkdirSync(path.join(root,"artifacts"),{recursive:true});
 const origin="http://127.0.0.1:"+server.address().port;
 let total=0;
 try{
  for(const [name,engine] of [["chromium",chromium],["firefox",firefox],["webkit",webkit]]){
   total+=await test(name,engine,origin);
   console.log("LULUS "+name+" (390px, 768px, 1440px)");
  }
  console.log("LULUS "+total+" pengujian browser dan ukuran layar");
 }finally{await new Promise(resolve=>server.close(resolve));}
})().catch(err=>{console.error(err);process.exitCode=1;server.close();});
