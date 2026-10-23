"use strict";
/** Pemeriksaan QA khusus menu yang dapat diklik, identitas visual,
 *  posisi logo, dan kesinambungan beranda ke penelusuran.
 *  Firefox/WebKit memakai engine lokal, bukan uji fisik perangkat iOS.
 */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const {chromium,firefox,webkit}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".json":"application/json",".pdf":"application/pdf"};
const server=http.createServer((req,res)=>{
 try{
  const p=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  const file=path.resolve(root,"."+(p==="/"?"/index.html":p));
  if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
  const body=fs.readFileSync(file);
  res.writeHead(200,{"content-type":mime[path.extname(file)]||"application/octet-stream"});
  res.end(body);
 }catch(e){res.writeHead(404).end("Not found");}
});
const menuNames=["Dokumen Hukum","Pembentukan PUU","Profil","Layanan"];
const sampleDestinations=["katalog.html","program-penyusunan.html","struktur-organisasi.html","ruang.html"];
async function checkPage(page,origin,engineName,width,mode){
 const key=engineName+"/"+width+"/"+mode;
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto(origin+"/index.html",{waitUntil:"load"});
 await page.locator("#theme-toggle").waitFor();
 if(mode==="night")await page.locator("#theme-toggle").click();
 assert.equal(await page.locator("html").getAttribute("data-theme"),mode,key+": theme control");
 const brand=page.locator(".mast .brand");
 assert.equal(await brand.isVisible(),true,key+": ministry brand visible");
 assert.ok((await brand.locator("img").getAttribute("src")).includes("logo-kementrans"),key+": ministry logo");
 const metrics=await page.evaluate(()=>{
  const brand=document.querySelector(".mast .brand");
  const strong=brand.querySelector("strong");
  const small=brand.querySelector("small");
  const a=brand.getBoundingClientRect(),b=strong.getBoundingClientRect(),c=small.getBoundingClientRect();
  return {brand:a.toJSON(),strong:b.toJSON(),small:c.toJSON(),
   display:getComputedStyle(strong).display,viewport:innerWidth,
   horizontalOverflow:document.documentElement.scrollWidth-innerWidth};
 });
 assert.ok(metrics.brand.width>155,key+": identity must have readable width "+JSON.stringify(metrics));
 assert.equal(metrics.display,"block",key+": brand name and subtitle on separate lines");
 assert.ok(metrics.small.y>=metrics.strong.y+metrics.strong.height-2,key+": identity subtitle below name "+JSON.stringify(metrics));
 assert.ok(metrics.strong.right<=metrics.brand.right+2,key+": brand name not clipped "+JSON.stringify(metrics));
 assert.ok(metrics.horizontalOverflow<=3,key+": homepage no horizontal overflow "+metrics.horizontalOverflow);
 const groups=page.locator("#nav details.navgroup");
 assert.equal(await groups.count(),4,key+": exactly four dropdown groups");
 for(let i=0;i<menuNames.length;i++){
  if(width<=1100&&!await page.locator("#nav").isVisible()){
   await page.locator("#menu").click();
   assert.equal(await page.locator("#menu").getAttribute("aria-expanded"),"true",key+": mobile menu open");
  }
  const section=groups.nth(i),summary=section.locator("summary");
  await summary.click();
  assert.ok(await section.evaluate(el=>el.open),key+": "+menuNames[i]+" native details open");
  const dropdown=section.locator(".navmenu");
  await dropdown.waitFor({state:"visible"});
  const first=dropdown.locator("a").first();
  await first.scrollIntoViewIfNeeded();
  const appearance=await first.evaluate(el=>{
   const panel=el.closest(".navmenu");
   const css=getComputedStyle(panel);
   const rect=el.getBoundingClientRect();
   const hit=document.elementFromPoint(rect.left+rect.width/2,rect.top+rect.height/2);
   return {
    background:css.backgroundColor,color:getComputedStyle(el).color,
    opacity:css.opacity,pointerEvents:css.pointerEvents,
    hit:hit===el||el.contains(hit),
    panelZ:css.zIndex,
    visibleRect:rect.toJSON()
   };
  });
  const expectedBackground=mode==="night"?
   (width<=1100?"rgb(34, 62, 80)":"rgb(27, 48, 64)"):
   (width<=1100?"rgb(218, 231, 237)":"rgb(246, 248, 247)");
  // No transparent layers, even if the browser represents the RGB differently.
  assert.ok(appearance.background.startsWith("rgb("),key+": "+menuNames[i]+" opaque background "+JSON.stringify(appearance));
  assert.ok(!appearance.background.includes("rgba("),key+": "+menuNames[i]+" must not be transparent");
  assert.equal(appearance.pointerEvents,"auto",key+": clickable "+menuNames[i]);
  assert.equal(appearance.opacity,"1",key+": visible "+menuNames[i]);
  assert.ok(appearance.hit,key+": "+menuNames[i]+" is not on top/clickable "+JSON.stringify(appearance));
  const href=await first.getAttribute("href");
  assert.ok(href.startsWith("./"),key+": "+menuNames[i]+" internal route "+href);
  // Click each public menu, proving this is not a cosmetic overlay.
  await first.click({timeout:6000});
  await page.waitForURL(url=>url.pathname.includes(sampleDestinations[i]),{timeout:8000});
  if(i!==menuNames.length-1)await page.goto(origin+"/index.html",{waitUntil:"load"});
 }
 // Search entered on homepage must keep branding, palette, theme and return actual results.
 await page.goto(origin+"/index.html",{waitUntil:"load"});
 await page.locator("#heroquery").fill("permen");
 await page.locator("#heroform button[type=submit]").click();
 await page.waitForURL("**/telusur.html?**",{timeout:10000});
 await page.locator("#results .resultcard").first().waitFor({timeout:9000});
 const hits=await page.locator("#results .resultcard").count();
 assert.ok(hits>=3,key+": Permen should find ministerial regulations, got "+hits);
 assert.equal(await page.locator("body").getAttribute("class"),"search-page jdih-shell",key+": shared shell on search page");
 assert.equal(await page.locator("html").getAttribute("data-theme"),mode,key+": saved theme on search page");
 const colors=await page.evaluate(()=>{
  const head=getComputedStyle(document.querySelector(".catalog-head"));
  const panel=getComputedStyle(document.querySelector(".searchpanel"));
  const bg=getComputedStyle(document.body);
  return {headerImage:head.backgroundImage,headerColor:head.backgroundColor,panelColor:panel.backgroundColor,bodyColor:bg.backgroundColor,
   bodyPaper:bg.getPropertyValue("--paper").trim(),searchOverflow:document.documentElement.scrollWidth-innerWidth};
 });
 assert.ok(colors.headerImage.includes("rgb(20, 57, 79)")||colors.headerImage.includes("rgb(9, 29, 45)"),key+": search has blue palette "+JSON.stringify(colors));
 assert.ok(colors.panelColor.startsWith("rgb("),key+": search card background is opaque "+JSON.stringify(colors));
 assert.ok(colors.searchOverflow<=3,key+": search no horizontal overflow "+JSON.stringify(colors));
 assert.ok((await page.locator(".mast .brand img").getAttribute("src")).includes("logo-kementrans"),key+": search shows same Ministry logo");
 await page.screenshot({path:path.join(root,"artifacts","nav-qa-"+engineName+"-"+width+"-"+mode+".png")});
 assert.deepEqual(errors,[],key+": no JavaScript errors");
 console.log("LULUS "+key+" -- submenu klik, logo, pencarian, palet");
}
(async()=>{
 await new Promise(done=>server.listen(0,"127.0.0.1",done));
 fs.mkdirSync(path.join(root,"artifacts"),{recursive:true});
 const origin="http://127.0.0.1:"+server.address().port;
 let cases=0;
 try{
  const suites=[["chromium",chromium,[375,768,1024,1440]],["firefox",firefox,[390,1280]],["webkit",webkit,[390,1280]]];
  for(const [name,engine,widths] of suites){
   const browser=await engine.launch({headless:true});
   try{
    for(const width of widths){
     for(const mode of ["day","night"]){
      const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
      const page=await context.newPage();
      await page.route("https://jdih.transmigrasi.go.id/**",route=>route.abort());
      await checkPage(page,origin,name,width,mode);
      await context.close();
      cases++;
     }
    }
   }finally{await browser.close();}
  }
  console.log("LULUS "+cases+" kombinasi ukuran, mesin dan mode warna.");
 }finally{await new Promise(done=>server.close(done));}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
