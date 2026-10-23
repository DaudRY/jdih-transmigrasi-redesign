"use strict";
/* QA UI: dropdown dapat dibuka/diklik, keterbacaan siang/malam, kesamaan
 * header dan palet saat berpindah dari beranda ke penelusuran.
 * WebKit menguji engine Safari, bukan perangkat iPhone fisik. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const http=require("node:http");
const path=require("node:path");
const {chromium,firefox,webkit}=require("playwright");
const root=path.resolve(__dirname,"..");
const mime={".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",
".css":"text/css; charset=utf-8",".png":"image/png",".webp":"image/webp",".json":"application/json"};
const server=http.createServer((req,res)=>{
  try{
    const reqPath=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    const target=path.resolve(root,"."+(reqPath==="/"?"/index.html":reqPath));
    if(!target.startsWith(root+path.sep))return res.writeHead(403).end();
    const data=fs.readFileSync(target);
    res.writeHead(200,{"content-type":mime[path.extname(target)]||"application/octet-stream"}).end(data);
  }catch(err){res.writeHead(404).end("Not found");}
});
async function dropdownCheck(page,label){
 const top=page.locator("#nav");
 const toggle=page.locator("#menu");
 if(await toggle.isVisible()){
   if(!(await top.isVisible()))await toggle.click();
   assert.equal(await top.isVisible(),true,label+" mobile nav should open");
 }
 const groups=top.locator("details.navgroup");
 assert.equal(await groups.count(),4,label+" four main dropdowns");
 for(let i=0;i<4;i++){
   const group=groups.nth(i);
   await group.locator("summary").click();
   assert.equal(await group.getAttribute("open")!==null,true,label+" dropdown "+i+" open");
   if(i>0)assert.equal(await groups.nth(i-1).getAttribute("open"),null,label+" older dropdown closes");
   const submenu=group.locator(".navmenu");
   assert.ok(await submenu.isVisible(),label+" submenu is visible");
   const link=submenu.locator("a").first();
   assert.ok(await link.isVisible(),label+" submenu link is visible");
   await link.click({trial:true,timeout:5000});
   const match=await link.evaluate(node=>{
     const box=node.getBoundingClientRect();
     const el=document.elementFromPoint(box.left+box.width/2,box.top+box.height/2);
     return !!el&&(el===node||node.contains(el));
   });
   assert.ok(match,label+" dropdown link must not be covered by hero");
   const readable=await link.evaluate(el=>{
     function rgb(s){const m=s.match(/rgba?\(([^)]+)\)/);return m?m[1].split(",").slice(0,3).map(x=>Number(x.trim())):[0,0,0];}
     function lum(a){let c=a.map(v=>{const x=v/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4});return .2126*c[0]+.7152*c[1]+.0722*c[2];}
     const foreground=lum(rgb(getComputedStyle(el).color));
     const backdrop=el.closest(".navmenu");
     const background=lum(rgb(getComputedStyle(backdrop).backgroundColor));
     return (Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05);
   });
   assert.ok(readable>=4.5,label+" dropdown text contrast >=4.5:1 ("+readable.toFixed(2)+")");
 }
 await page.keyboard.press("Escape");
 assert.equal(await groups.locator("[open]").count(),0,label+" Escape closes dropdown");
}
async function testBrowser(name,browserType,origin){
 const browser=await browserType.launch({headless:true});
 try{
  for(const width of [390,768,1440]){
   const page=await browser.newPage({viewport:{width,height:920}});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.route("https://jdih.transmigrasi.go.id/**",r=>r.abort());
   await page.goto(origin+"/index.html",{waitUntil:"load"});
   await page.locator("#theme-toggle").waitFor();
   for(const theme of ["day","night"]){
     const active=await page.locator("html").getAttribute("data-theme");
     if(active!==theme)await page.locator("#theme-toggle").click();
     assert.equal(await page.locator("html").getAttribute("data-theme"),theme);
     const label=name+"/"+width+"/"+theme;
     const brand=page.locator(".mast .brand");
     const rect=await brand.boundingBox();
     assert.ok(rect&&rect.x>=-2&&rect.x+rect.width<=width+2,label+" brand fits viewport");
     assert.ok((await brand.locator("strong").innerText()).includes("JDIH"),label+" readable logo title");
     await dropdownCheck(page,label);
     await page.screenshot({path:path.join(root,"artifacts","navigation-"+name+"-"+width+"-"+theme+".png")});
     await page.goto(origin+"/telusur.html?q=permen",{waitUntil:"load"});
     assert.equal(await page.locator("html").getAttribute("data-theme"),theme,label+" theme preserved");
     const logo=await page.locator(".mast .brand img").getAttribute("src");
     assert.ok(logo.includes("logo-kementrans-bulat"),label+" same ministry logo on search");
     const searchNav=page.locator("#nav");
     assert.equal(await searchNav.locator("details.navgroup").count(),4,label+" same menu on search");
     const bg=await page.locator(".catalog-head").evaluate(el=>getComputedStyle(el).backgroundImage);
     const match=bg.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
     assert.ok(bg.includes("linear-gradient")&&match,label+" search gradient exists: "+bg);
     const [red,green,blue]=match.slice(1).map(Number);
     assert.ok(blue>green&&green>red,label+" navy-blue palette, not green: "+bg);
     const searchBoxColor=await page.locator(".searchpanel").evaluate(el=>getComputedStyle(el).backgroundColor);
     assert.notEqual(searchBoxColor,"rgb(255, 255, 255)",label+" soft card palette");
     await dropdownCheck(page,label+" search");
     const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
     assert.ok(overflow<=3,label+" no horizontal overflow on search: "+overflow);
     await page.screenshot({path:path.join(root,"artifacts","search-"+name+"-"+width+"-"+theme+".png")});
     await page.goto(origin+"/index.html",{waitUntil:"load"});
   }
   assert.deepEqual(errors,[],name+"/"+width+" JS errors");
   await page.close();
  }
 }finally{await browser.close();}
}
(async()=>{
 await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
 const origin="http://127.0.0.1:"+server.address().port;
 fs.mkdirSync(path.join(root,"artifacts"),{recursive:true});
 try{
   for(const [name,type] of [["chromium",chromium],["firefox",firefox],["webkit",webkit]]){
      await testBrowser(name,type,origin);
      console.log("LULUS menu dan konsistensi palet "+name+": 390, 768, 1440px, day/night");
   }
 }finally{await new Promise(resolve=>server.close(resolve));}
})().catch(err=>{console.error(err);process.exitCode=1;server.close();});
