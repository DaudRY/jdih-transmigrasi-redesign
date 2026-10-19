"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const crypto=require("node:crypto");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
function load(file,key){
 const ctx={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,file),"utf8"),ctx);
 return Array.from(ctx.window[key]||[]);
}
const verified=load("data/sampel-resmi.js","JDIH_VERIFIED_SAMPLES");
const originals=load("data/peraturan-2026.js","JDIH_DOCUMENTS");
assert.equal(verified.length,13,"Ada 13 sampel kategori tambahan dari sumber resmi");
const slugs=new Set(verified.map(x=>x.category));
assert.equal(slugs.size,13,"Satu sampel per kategori tanpa duplikasi");
assert.ok(!slugs.has("peraturan-menteri-transmigrasi"),"Kategori Permen ditangani oleh sumber yang sudah tersedia");
const first=originals.find(x=>x.id==="4");
assert.ok(first&&first.pdfUrl,"PDF contoh Permen dari data yang sudah diverifikasi");
const categories=load("data/catalog-categories.js","JDIH_CATEGORIES");
const allCategories=new Set(categories.map(x=>x.slug));
for(const item of verified){
 assert.ok(allCategories.has(item.category),"Slug kategori valid: "+item.category);
 assert.ok(/^https:\/\/jdih\.transmigrasi\.go\.id\/web\/regulations\/read\/\d+$/.test(item.sourceUrl),"URL metadata resmi "+item.id);
 assert.ok(/^https:\/\/jdih\.transmigrasi\.go\.id\/public\/documents\//.test(item.pdfUrl),"URL PDF resmi "+item.id);
 assert.ok(item.title.length>=25,"Judul dokumen "+item.id);
 if(item.recordType==="decision")assert.equal(item.decisionStatus,null,"Jangan samakan Berlaku dengan inkracht");
}
const manifestPath=path.join(root,"_site","data","pdf-manifest.json");
assert.ok(fs.existsSync(manifestPath),"Manifest PDF harus tersedia setelah proses penyalinan");
const manifest=JSON.parse(fs.readFileSync(manifestPath,"utf8"));
const records=Object.values(manifest.items||{});
assert.equal(records.length,14,"Satu berkas PDF untuk 14 kategori terverifikasi");
const bundle=records.filter(x=>x.bundled);
for(const entry of records){
 assert.ok(allCategories.has(entry.category),"Manifest harus memiliki kategori JDIH");
 if(entry.bundled){
   assert.ok(/^pdfs\/[a-z0-9-]+\.pdf$/.test(entry.path),"Nama PDF tersimpan harus aman");
   const file=path.join(root,"_site",entry.path);
   assert.ok(fs.existsSync(file),"PDF tercatat harus benar-benar ada: "+entry.id);
   const data=fs.readFileSync(file);
   assert.ok(data.length>=100&&data.subarray(0,5).toString()==="%PDF-","Berkas salinan valid: "+entry.id);
   assert.equal(data.length,entry.bytes,"Ukuran PDF benar: "+entry.id);
   assert.equal(crypto.createHash("sha256").update(data).digest("hex"),entry.sha256,"Hash SHA-256: "+entry.id);
 }else{
   assert.ok(typeof entry.reason==="string"&&entry.reason.length>0,"Alasan kegagalan di manifest: "+entry.id);
 }
}
console.log("Audit PDF: "+bundle.length+"/"+records.length+" PDF asli berhasil diverifikasi dan disalin; "+
  (records.length-bundle.length)+" tetap mengarah ke sumber JDIH resmi.");
if(!bundle.length)throw new Error("Tidak ada PDF yang berhasil disalin. Periksa akses sumber resmi dari runner GitHub.");
