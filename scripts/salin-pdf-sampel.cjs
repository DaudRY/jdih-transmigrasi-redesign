"use strict";
/**
 * Menyiapkan salinan PDF JDIH publik sebagai data percontohan Pusdatin.
 * Batasan: satu berkas untuk satu kategori terverifikasi. Berkas yang gagal
 * diakses / gagal validasi tidak diterbitkan sebagai PDF, tidak dibuat dummy.
 * Manifest menandai sukses/gagal secara terbuka; fallback adalah PDF resmi.
 * Tidak memakai kredensial atau scraping halaman yang memerlukan login.
 */
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const crypto=require("node:crypto");
const root=path.resolve(__dirname,"..");
const site=path.resolve(root,"_site");
const folder=path.join(site,"pdfs");
fs.mkdirSync(folder,{recursive:true});
fs.mkdirSync(path.join(site,"data"),{recursive:true});
function load(filename,key){
 const context={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,filename),"utf8"),context,{filename});
 return Array.from(context.window[key]||[]);
}
const existing=load("data/peraturan-2026.js","JDIH_DOCUMENTS");
const first=existing.find(x=>x.id==="4");
if(!first)throw new Error("Contoh Permen 4/2026 tidak tersedia");
const more=load("data/sampel-resmi.js","JDIH_VERIFIED_SAMPLES");
const records=[
 {id:"permen-4-2026",category:"peraturan-menteri-transmigrasi",pdfUrl:first.pdfUrl,localPdf:"pdfs/permen-4-2026.pdf",sourceUrl:first.url},
 ...more.map(x=>({id:x.id,category:x.category,pdfUrl:x.pdfUrl,localPdf:x.localPdf,sourceUrl:x.sourceUrl}))
];
const hosts=new Set(["jdih.transmigrasi.go.id"]);
const manifest={
 generatedAt:new Date().toISOString(),
 description:"Satu PDF publik per kategori sebagai bukti demonstrasi; bukan koleksi JDIH lengkap.",
 origin:"https://jdih.transmigrasi.go.id",
 items:{}
};
let next=0;
const MAX_FILE=15*1024*1024;
async function download(record){
 const result={id:record.id,category:record.category,sourceUrl:record.sourceUrl,pdfUrl:record.pdfUrl,bundled:false,path:null,bytes:0,sha256:null,reason:null};
 try{
  const u=new URL(record.pdfUrl);
  if(u.protocol!=="https:"||!hosts.has(u.hostname)||!u.pathname.startsWith("/public/documents/")){
   throw new Error("URL sumber tidak memenuhi pembatasan keamanan");
  }
  const file=path.basename(record.localPdf);
  if(!/^[a-z0-9-]+\.pdf$/.test(file))throw new Error("Nama PDF tidak aman");
  for(let attempt=1;attempt<=2;attempt++){
   try{
    const response=await fetch(record.pdfUrl,{redirect:"follow",signal:AbortSignal.timeout(25000),
      headers:{"Accept":"application/pdf","User-Agent":"JDIH-Transmigrasi-Prototipe-Data-Sampel/1.0"}});
    const resolved=new URL(response.url);
    if(resolved.protocol!=="https:"||!hosts.has(resolved.hostname)){
      throw new Error("Unduhan dialihkan ke domain yang bukan sumber JDIH");
    }
    if(!response.ok)throw new Error("Status HTTP "+response.status);
    const length=Number(response.headers.get("content-length")||0);
    if(length>MAX_FILE)throw new Error("Ukuran berkas melebihi batas 15 MB");
    let bytes=0,chunks=[];
    for await(const chunk of response.body){
      bytes+=chunk.length;
      if(bytes>MAX_FILE)throw new Error("Berkas melebihi batas 15 MB");
      chunks.push(chunk);
    }
    const buffer=Buffer.concat(chunks);
    if(buffer.length<100||buffer.subarray(0,5).toString()!=="%PDF-"){
      throw new Error("Respons bukan PDF yang valid");
    }
    const sha256=crypto.createHash("sha256").update(buffer).digest("hex");
    fs.writeFileSync(path.join(folder,file),buffer);
    result.bundled=true;result.path="pdfs/"+file;result.bytes=buffer.length;result.sha256=sha256;
    result.reason=null;
    console.log("OK "+record.category+" "+buffer.length+" bytes "+sha256.slice(0,12));
    break;
   }catch(err){
    result.reason=String(err.message||err).slice(0,180);
    if(attempt===2)console.warn("TIDAK TERSALIN "+record.category+": "+result.reason);
   }
  }
 }catch(err){result.reason=String(err.message||err).slice(0,180);}
 manifest.items[record.id]=result;
}
async function worker(){
 while(true){const index=next++;if(index>=records.length)return;await download(records[index]);}
}
(async()=>{
 await Promise.all(Array.from({length:4},worker));
 const manifestPath=path.join(site,"data","pdf-manifest.json");
 fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+"\n");
 const count=Object.values(manifest.items).filter(x=>x.bundled).length;
 const failed=records.length-count;
 console.log("PDF KONFIRMASI: "+count+"/"+records.length+" disimpan di _site/pdfs; "+failed+" memakai fallback sumber resmi.");
 if(!count)console.warn("PERINGATAN: Tidak ada PDF yang dapat diunduh; periksa akses dari runner dan gunakan URL resmi pada UI.");
})();
