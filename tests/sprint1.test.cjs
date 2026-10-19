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
