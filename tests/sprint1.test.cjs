"use strict";
/* Audit Sprint 1 tanpa paket eksternal, dijalankan sebelum deployment. */
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const home=read("index.html"),detail=read("detail.html"),dataJs=read("data/peraturan-2026.js");
const context={window:{}};
vm.runInNewContext(dataJs,context,{filename:"data/peraturan-2026.js"});
const docs=Array.from(context.window.JDIH_DOCUMENTS);
const schemaContext={window:{}};
vm.runInNewContext(read("data/metadata-schemas.js"),schemaContext,{filename:"data/metadata-schemas.js"});
const schemaSet=schemaContext.window.JDIH_METADATA_SCHEMAS;
assert.deepEqual(Object.keys(schemaSet),["regulation","monograph","article","decision"],"Empat skema jenis dokumen");
const expectedKeys={
  regulation:["documentType","title","issuer","number","label","formAbbreviation","place","legalDates","source","subject","status","language","location","field","attachmentDescription"],
  monograph:["documentType","title","author","callNumber","edition","publicationPlace","publisher","publicationYear","physicalDescription","subject","isbn","language","field","bookInventoryNumber","location","attachmentDescription"],
  article:["documentType","title","author","publicationPlace","publicationYear","source","subject","language","field","location","attachmentDescription"],
  decision:["documentType","title","courtAuthority","decisionNumber","courtType","courtTypeAbbreviation","courtPlace","dateRead","source","subject","decisionStatus","language","caseType","location","attachmentDescription"]
};
for(const [kind,expected] of Object.entries(expectedKeys)){
 assert.deepEqual(Array.from(schemaSet[kind].fields,row=>row[1]),expected,"Urutan metadata Lampiran II untuk "+kind);
}
assert.deepEqual([schemaSet.regulation.page,schemaSet.monograph.page,schemaSet.article.page,schemaSet.decision.page],[24,56,81,92]);
assert.equal(schemaSet.regulation.abstractRequiredStructure.length,5,"Hanya abstrak PUU mempunyai lima bagian dalam Lampiran I");
for(const kind of ["monograph","article","decision"]){
 assert.equal(schemaSet[kind].abstractStandard,null,"Jangan menerapkan struktur abstrak PUU untuk "+kind);
 assert.ok(schemaSet[kind].summaryGuidance);
}
assert.ok(detail.includes('<script src="data/metadata-schemas.js"></script>'));
assert.ok(detail.includes('schema.fields'));
assert.ok(detail.includes('schema.abstractRequiredStructure'));

const catalogContext={window:{}};
vm.runInNewContext(read("data/catalog-categories.js"),catalogContext,{filename:"data/catalog-categories.js"});
const categories=Array.from(catalogContext.window.JDIH_CATEGORIES);
assert.ok(categories.length>=25,"Kategori portal lama harus dipertahankan sebagai navigasi internal");
assert.equal(new Set(categories.map(c=>c.slug)).size,categories.length,"Slug kategori tidak boleh duplikat");
for(const category of categories){
 assert.ok(["regulation","formation","nonregulation","decision"].includes(category.group));
 assert.ok(category.title&&category.titleEn);
}
assert.ok(fs.existsSync(path.join(root,"katalog.html")),"Halaman katalog internal ada");
assert.ok(fs.existsSync(path.join(root,"ruang.html")),"Halaman layanan internal ada");
assert.ok(fs.existsSync(path.join(root,"assets/comfort-theme.css")));
assert.ok(fs.existsSync(path.join(root,"assets/site-preferences.js")));
const catalogHTML=read("katalog.html"),serviceHTML=read("ruang.html"),preferencesJS=read("assets/site-preferences.js");
assert.ok(home.includes('assets/comfort-theme.css')&&detail.includes('assets/comfort-theme.css'));
assert.ok(catalogHTML.includes('assets/comfort-theme.css')&&serviceHTML.includes('assets/comfort-theme.css'));
assert.ok(home.includes("assets/site-preferences.js")&&detail.includes("assets/site-preferences.js"));
assert.ok(catalogHTML.includes("assets/site-preferences.js")&&serviceHTML.includes("assets/site-preferences.js"));
assert.ok(preferencesJS.includes("jdih-theme")&&preferencesJS.includes("jdih-lang"));
assert.ok(preferencesJS.includes("jdih:languagechange"));
const obsoleteDirectCategory=/href="https:\/\/jdih\.transmigrasi\.go\.id\/web\/(?:non)?regulations\/category\//;
assert.ok(!obsoleteDirectCategory.test(home),"Menu beranda tidak boleh langsung mengarah ke kategori pada portal lama");
assert.ok(home.includes('href="./katalog.html?kategori=peraturan-menteri-transmigrasi"'));
assert.ok(home.includes('href="./ruang.html?bagian=berita"'));
for(const file of ["katalog.html","ruang.html","assets/site-preferences.js","data/catalog-categories.js"]){
 const script=file.endsWith(".js")?read(file):Array.from(read(file).matchAll(/<script>\s*([\s\S]*?)<\/script>/g)).map(m=>m[1]).join("\n");
 new vm.Script(script,{filename:file+".inline.js"});
}
assert.equal(docs.length,4,"Dataset empat contoh resmi");
assert.deepEqual(docs.map(d=>d.id),["4","3","2","1"],"Urutan dan ID empat contoh");
for(const d of docs){
  assert.match(d.url,/^https:\/\/jdih\.transmigrasi\.go\.id\/web\/regulations\/read\/\d+$/);
  assert.match(d.pdfUrl,/^https:\/\/jdih\.transmigrasi\.go\.id\/public\/documents\/[^?#]+\.pdf\?v=\d+$/);
  assert.match(d.abstractPdfUrl,/^https:\/\/jdih\.transmigrasi\.go\.id\/public\/documents\/AB_[^?#]+\.pdf\?v=\d+$/);
  assert.equal(d.status,"Berlaku");
  assert.equal(d.enactmentDate,null,"Tanggal penetapan kosong sesuai metadata portal");
  assert.equal(d.promulgationDate,null,"Tanggal pengundangan kosong sesuai metadata portal");
  assert.equal(d.effectiveDate,null,"Tanggal efektif kosong sesuai metadata portal");
  assert.ok(Array.isArray(d.abstractPoints)&&d.abstractPoints.length>=2);
  assert.ok(Array.isArray(d.relations));
  assert.ok(d.effectiveNote.includes("Menurut catatan abstrak resmi"));
}
assert.equal(docs[0].relations.length,1,"Relasi Nomor 4 yang terkonfirmasi");
assert.equal(docs[0].relations[0].kind,"Mencabut");
assert.ok(docs[0].relations[0].title.includes("Nomor 10 Tahun 2025"));
for(const d of docs.slice(1))assert.equal(d.relations.length,0,"Tidak mengarang hubungan hukum");
assert.ok(home.includes('<script src="data/peraturan-2026.js"></script>'));
assert.ok(detail.includes('<script src="data/peraturan-2026.js"></script>'));
assert.ok(home.includes('const docs=Array.isArray(window.JDIH_DOCUMENTS)'));
assert.ok(home.includes('href="./detail.html?id='+String.fromCharCode(36)+'{encodeURIComponent(d.id)}"'));
for(const id of ["koleksi","pembentukan","kategori-lengkap","program-5t","layanan-portal","fitur-tambahan","statistik","dialog"]){
  assert.ok(home.includes('id="'+id+'"'),"Komponen eksisting tetap ada: "+id);
}
for(const id of ["metadata","metadatafields","abstrak","abstractpoints","relasi","relations","dokumen","pdfpreview","sumber","notfound"]){
  assert.ok(detail.includes('id="'+id+'"'),"Komponen detail: "+id);
}
assert.ok(detail.includes('if(!d){$("#notfound").hidden=false'),"ID invalid punya fallback");
assert.ok(detail.includes('hint.hidden=true;preview.hidden=false'),"Pratinjau dimuat berdasarkan interaksi pengguna");
assert.ok(detail.includes('$("#preview-regulation").addEventListener("click"'));
assert.ok(detail.includes('$("#preview-abstract").addEventListener("click"'));
assert.ok(detail.includes('Belum tercantum pada metadata resmi'));
assert.ok(detail.includes('Daftar navigasi berikut bukan daftar peraturan terkait secara hukum.'));
assert.ok(detail.includes('@media(max-width:900px)')&&detail.includes('@media(max-width:640px)')&&detail.includes('@media(max-width:390px)'));
assert.ok(home.includes('@media(max-width:650px)'));
for(const asset of ["assets/logo-jdih-globe.webp","assets/logo-kementrans-bulat.webp"]){
  assert.ok(fs.existsSync(path.join(root,asset)),"Logo harus tersedia: "+asset);
}
const homeScript=home.match(/<script>\s*([\s\S]*?)<\/script>\s*<\/body>/);
const detailScript=detail.match(/<script>\s*([\s\S]*?)<\/script>\s*<\/body>/);
assert.ok(homeScript&&detailScript);
new vm.Script(homeScript[1],{filename:"index.inline.js"});
new vm.Script(detailScript[1],{filename:"detail.inline.js"});
console.log("LULUS: 4 sumber dokumen, metadata kosong, relasi terbukti, 2 jenis PDF, navigasi lama, aset, responsive CSS, dan sintaks JavaScript.");
