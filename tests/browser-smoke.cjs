"use strict";
/* Smoke test browser sungguhan untuk desktop, tablet, dan lebar mobile.
   Memakai Chromium; tidak mengklaim telah menguji Safari iOS secara fisik. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {chromium}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".webp":"image/webp",".png":"image/png",".css":"text/css; charset=utf-8"};
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
     await page.screenshot({path:path.join(output,"sprint2-day-detail-"+width+".png"),fullPage:true});
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
     assert.ok(overflow<=2,"Overflow detail "+width+"px: "+overflow);
     assert.deepEqual(errors,[],"JavaScript error pada detail "+width+"px");
     await page.goto(origin+"/index.html",{waitUntil:"load"});
     assert.equal(await page.locator("#results .home-doc-card").count(),3,"Only three recent regulations on homepage");
     await page.locator("#results .home-doc-card .home-doc-link").first().click();
     assert.ok(page.url().includes("detail.html?id=4"),"Recent regulation must open the internal detail page");
     // Uji warna yang nyaman, mode malam, lokalisasi dan navigasi internal.
     const sitePage=page;
     await sitePage.goto(origin+"/index.html",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#theme-toggle").count(),1,"Theme switch ada di header");
     assert.equal(await sitePage.locator("#lang-select").count(),1,"Language switch ada di header");
     const initialColor=await sitePage.evaluate(()=>getComputedStyle(document.body).backgroundColor);
     assert.notEqual(initialColor,"rgb(255, 255, 255)","Latar siang tidak putih menyilaukan");
     await sitePage.locator("#theme-toggle").click();
     assert.equal(await sitePage.locator("html").getAttribute("data-theme"),"night");
     const nightColor=await sitePage.evaluate(()=>getComputedStyle(document.body).backgroundColor);
     assert.notEqual(initialColor,nightColor,"Mode malam harus mengubah background");
     await sitePage.locator("#lang-select").selectOption("en");
     assert.equal(await sitePage.locator("html").getAttribute("lang"),"en");
     assert.equal(await sitePage.locator("#lang-select").inputValue(),"en");
     // Menu kategori eksisting wajib menuju website ini, bukan portal lama.
     const ministerial=sitePage.locator('#nav a[href="./katalog.html?kategori=peraturan-menteri-transmigrasi"]').first();
     assert.ok(await ministerial.count(),"Menu Permen menuju katalog internal");
     await sitePage.goto(origin+"/katalog.html?kategori=peraturan-menteri-transmigrasi",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),1,"Satu contoh resmi per kategori");
     assert.equal(await sitePage.locator("html").getAttribute("data-theme"),"night","Tema tersimpan lintas halaman");
     assert.equal(await sitePage.locator("html").getAttribute("lang"),"en","Bahasa tersimpan lintas halaman");
     await sitePage.locator("#catalog-query").fill("Nomor 4");
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),1);
     await sitePage.locator('#catalog-results a[href="./detail.html?id=4"]').first().click();
     assert.ok(sitePage.url().includes("detail.html?id=4"));
     // Cek kategori nyata yang sebelumnya kosong, detail internal dan PDF sumber asli.
     await sitePage.goto(origin+"/katalog.html?kategori=keputusan-menteri-transmigrasi",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),1);
     await sitePage.locator(".internal-detail").first().click();
     assert.ok(sitePage.url().includes("contoh.html?id=kepmen-99-2025"));
     await sitePage.waitForLoadState("load");
     await sitePage.waitForFunction(()=>document.querySelector("#doc-title")?.textContent?.length>5,{timeout:12000});
     const actualSampleTitle=await sitePage.locator("#doc-title").innerText();
     assert.ok(actualSampleTitle.includes("Nomor 99 Tahun 2025"),"Title="+JSON.stringify(actualSampleTitle)+" errors="+JSON.stringify(errors)+" notfound="+(await sitePage.locator("#notfound").isVisible()));
     assert.equal(await sitePage.locator("#metadatafields .meta").count()>8,true);
     const originalPdf=await sitePage.locator("#download").getAttribute("href");
     assert.ok(originalPdf.includes("pdf")&&originalPdf!=="#","Download uses an official PDF or bundled copy");
     await sitePage.goto(origin+"/katalog.html?kategori=putusan-pengadilanyurisprudensi",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),1);
     await sitePage.locator(".internal-detail").first().click();
     await sitePage.waitForLoadState("load");
     await sitePage.waitForFunction(()=>document.querySelector("#doc-title")?.textContent?.length>5,{timeout:12000});
     assert.ok((await sitePage.locator("#source-status-note").innerText()).includes("inkracht"),"Putusan status qualifier");
     await sitePage.goto(origin+"/katalog.html?kategori=rancangan-peraturan",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),1);
     await sitePage.goto(origin+"/index.html",{waitUntil:"load"});
     assert.equal(await sitePage.locator(".quick a .qicon svg").count(),4,"All four quick menus have semantic SVG icons");
     assert.ok(await sitePage.locator(".navmenu .menu-icon svg").count()>=10,"Small menu icons visible");
     await sitePage.goto(origin+"/katalog.html?kategori=monographs",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#catalog-empty").isVisible(),true);
     assert.equal(await sitePage.locator("#catalog-results .catalogcard").count(),0);
     await sitePage.goto(origin+"/ruang.html?bagian=berita",{waitUntil:"load"});
     assert.equal(await sitePage.locator("#pagebody").count(),1);
     assert.ok((await sitePage.locator("#pagebody").innerText()).length>40,"Halaman berita internal punya status koleksi");
     await sitePage.goto(origin+"/index.html",{waitUntil:"load"});
     await sitePage.locator("#lang-select").selectOption("id");
     await sitePage.locator("#theme-toggle").click();
     assert.equal(await sitePage.locator("html").getAttribute("data-theme"),"day");
     await page.goto(origin+"/index.html",{waitUntil:"load"});
     assert.equal(await page.locator(".home-section").count(),4,"Four middle sections plus hero and footer");
     assert.equal(await page.locator("#results .home-doc-card").count(),3);
     const mapLoaded=await page.locator(".home-map").evaluate(el=>el.complete&&el.naturalWidth>300);
     assert.ok(mapLoaded,"User supplied transmigration map must load");
     assert.ok(await page.locator('a[href="./struktur-organisasi.html"]').count()>=1,"Organization structure in homepage");
     await page.screenshot({path:path.join(output,"sprint2-day-home-"+width+".png"),fullPage:true});
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
   console.log("LULUS: metadata/PDF, katalog dan layanan internal, peralihan ID-EN, tema tersimpan, serta responsivitas 375/768/1440px ("+count+" ukuran).");
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(err=>{console.error(err);process.exitCode=1;server.close();});
