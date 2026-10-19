"use strict";
/* Smoke test browser sungguhan untuk desktop, tablet, dan lebar mobile.
   Memakai Chromium; tidak mengklaim telah menguji Safari iOS secara fisik. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".webp":"image/webp"};
const server=http.createServer((req,res)=>{
  try{
    let requestPath=new URL(req.url,"http://localhost").pathname;
    if(requestPath==="/")requestPath="/index.html";
    const resolved=path.resolve(root,"."+decodeURIComponent(requestPath));
    if(!resolved.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const body=fs.readFileSync(resolved);
    res.writeHead(200,{"content-type":mime[path.extname(resolved)]||"application/octet-stream"});
    res.end(body);
  }catch(e){res.writeHead(404).end("Tidak ditemukan");}
});
async function run(){
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const port=server.address().port,origin="http://127.0.0.1:"+port;
 const browser=await chromium.launch({headless:true});
 const output=path.join(root,"artifacts");
 fs.mkdirSync(output,{recursive:true});
 let count=0;
 try{
   for(const width of [375,768,1440]){
     const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
     const errors=[];
     page.on("pageerror",e=>errors.push(e.message));
     // Pratinjau tidak perlu menyentuh internet selama uji.
     await page.route("https://jdih.transmigrasi.go.id/**",route=>route.abort());
     await page.goto(origin+"/detail.html?id=4",{waitUntil:"load"});
     assert.ok((await page.locator("#doctitle").innerText()).includes("Nomor 4 Tahun 2026"));
     assert.equal(await page.locator("#metadatafields .meta").count(),15);
     assert.ok((await page.locator("#relations").innerText()).includes("Nomor 10 Tahun 2025"));
     assert.ok((await page.locator("#dateinfo").innerText()).includes("29 September 2026"));
     assert.equal(await page.locator("#pdfpreview").isVisible(),false);
     await page.getByRole("button",{name:"Muat pratinjau naskah"}).click();
     assert.ok((await page.locator("#pdfpreview").getAttribute("src")).includes("transmigrasi4.pdf"));
     await page.getByRole("button",{name:"Muat pratinjau abstrak"}).click();
     assert.ok((await page.locator("#pdfpreview").getAttribute("src")).includes("AB_2026"));
     await page.screenshot({path:path.join(output,"sprint1-detail-"+width+".png"),fullPage:true});
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
     assert.ok(overflow<=2,"Overflow detail "+width+"px: "+overflow);
     assert.deepEqual(errors,[],"JavaScript error pada detail "+width+"px");
     await page.goto(origin+"/index.html",{waitUntil:"load"});
     assert.equal(await page.locator("#results .doc").count(),4);
     await page.locator("#number").fill("4");
     assert.equal(await page.locator("#results .doc").count(),1);
     await page.locator("#results .doc .detail-link").click();
     assert.ok(page.url().includes("detail.html?id=4"));
     await page.goto(origin+"/index.html",{waitUntil:"load"});
     const homeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
     assert.ok(homeOverflow<=2,"Overflow beranda "+width+"px: "+homeOverflow);
     assert.deepEqual(errors,[],"JavaScript error pada beranda "+width+"px");
     await page.close();
     count+=1;
   }
   const page=await browser.newPage();
   await page.goto(origin+"/detail.html?id=3");
   assert.ok((await page.locator("#relations").innerText()).includes("Belum ada relasi hukum"));
   await page.goto(origin+"/detail.html?id=tidak-valid");
   assert.equal(await page.locator("#notfound").isVisible(),true);
   assert.equal(await page.locator("#detailpage").isVisible(),false);
   await page.close();
   console.log("LULUS: interaksi data/detail, PDF berdasarkan klik, fallback, tanpa JS error, dan tanpa scroll horizontal pada 375px, 768px, 1440px ("+count+" ukuran).");
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(err=>{console.error(err);process.exitCode=1;server.close();});
