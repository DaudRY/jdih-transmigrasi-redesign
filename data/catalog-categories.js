/* Arsitektur koleksi internal. Kategori mengikuti menu JDIH Transmigrasi.
   URL resmi hanya digunakan untuk verifikasi sumber bila tersedia,
   TIDAK untuk menggantikan penjelajahan di situs prototipe.
   Koleksi yang belum tersinkronisasi tidak diisi data rekaan. */
(function(global) {
"use strict";
const root="https://jdih.transmigrasi.go.id";
const reg=slug=>root+"/web/regulations/category/"+slug;
const non=slug=>root+"/web/nonregulations/category/"+slug;
const categories=[
 ["peraturan-menteri-transmigrasi","Peraturan Menteri Transmigrasi","Ministerial Regulations","regulation",reg("peraturan-menteri-transmigrasi"),"Koleksi Peraturan Menteri Transmigrasi dan metadata resminya."],
 ["keputusan-menteri-transmigrasi","Keputusan Menteri Transmigrasi","Ministerial Decisions","regulation",reg("keputusan-menteri-transmigrasi"),"Koleksi Keputusan Menteri Transmigrasi."],
 ["memorandum-of-understanding","Memorandum of Understanding","Memoranda of Understanding","regulation",reg("memorandum-of-understanding"),"Nota kesepahaman atau MoU yang diterbitkan."],
 ["perjanjian-kerja-sama","Perjanjian Kerja Sama","Cooperation Agreements","regulation",reg("perjanjian-kerja-sama"),"Dokumen kerja sama kelembagaan."],
 ["undang-undang","Undang-Undang","Laws","regulation",reg("undang-undang"),"Peraturan perundang-undangan tingkat undang-undang."],
 ["pengganti-uu-perppu","Perppu","Government Regulations in Lieu of Law","regulation",reg("pengganti-uu-perppu"),"Peraturan Pemerintah Pengganti Undang-Undang."],
 ["peraturan-pemerintah","Peraturan Pemerintah","Government Regulations","regulation",reg("peraturan-pemerintah"),"Peraturan Pemerintah terkait transmigrasi."],
 ["peraturan-presiden","Peraturan Presiden","Presidential Regulations","regulation",reg("peraturan-presiden"),"Peraturan Presiden terkait transmigrasi."],
 ["keputusan-presiden","Keputusan Presiden","Presidential Decisions","regulation",reg("keputusan-presiden"),"Keputusan Presiden terkait transmigrasi."],
 ["instruksi-presiden","Instruksi Presiden","Presidential Instructions","regulation",reg("instruksi-presiden"),"Instruksi Presiden terkait transmigrasi."],
 ["instruksi-menteri","Instruksi Menteri","Ministerial Instructions","regulation",reg("instruksi-menteri"),"Instruksi Menteri Transmigrasi."],
 ["surat-edaran-kementerian-transmigrasi","Surat Edaran Kementerian","Ministry Circulars","regulation",reg("surat-edaran-kementerian-transmigrasi"),"Surat edaran yang dikeluarkan kementerian."],
 ["sk-pimpinan-uke-i","SK Pimpinan UKE I","Echelon I Leadership Decisions","regulation",reg("sk-pimpinan-uke-i"),"Keputusan pimpinan unit kerja eselon I."],
 ["permendes-pdtt","Permendes PDTT","Village Ministry Regulations","regulation",reg("permendes-pdtt"),"Peraturan Menteri Desa dan Pembangunan Daerah Tertinggal yang relevan."],
 ["rancangan-peraturan","Rancangan Peraturan","Draft Regulations","formation",reg("rancangan-peraturan-menteri"),"Dokumen rancangan peraturan yang dipublikasikan."],
 ["naskah-urgensi","Naskah Urgensi","Urgency Papers","formation",reg("naskah-urgensi"),"Naskah urgensi pembentukan peraturan."],
 ["naskah-akademik","Naskah Akademik","Academic Papers","formation",reg("naskah-akademik"),"Naskah akademik atau kajian dasar pembentukan peraturan."],
 ["program-penyusunan","Program Penyusunan","Drafting Programs","formation",null,"Program penyusunan peraturan perundang-undangan."],
 ["analisis-evaluasi","Analisis dan Evaluasi","Legal Analysis and Evaluation","formation",null,"Dokumen peninjauan dan evaluasi peraturan."],
 ["risalah-harmonisasi","Risalah Pembahasan","Discussion Minutes","formation",null,"Risalah atau notulensi pembahasan harmonisasi."],
 ["kajian-penelitian","Kajian Peraturan","Regulatory Studies","formation",null,"Kajian dan penelitian hukum pendukung pembentukan peraturan."],
 ["monographs","Monografi Hukum","Legal Monographs","nonregulation",non("monographs"),"Koleksi monografi hukum dengan metadata ISBN, penerbit, dan nomor panggil."],
 ["book","Artikel Hukum","Legal Articles","nonregulation",non("book"),"Artikel hukum dengan penulis dan sumber publikasi."],
 ["haki","HAKI","Intellectual Property Documents","nonregulation",non("haki"),"Dokumen kekayaan intelektual; pengelompokan metadata memerlukan validasi."],
 ["putusan-pengadilanyurisprudensi","Putusan Pengadilan","Court Decisions","decision",reg("putusan-pengadilanyurisprudensi"),"Putusan pengadilan dengan metadata nomor putusan, tanggal dibacakan, dan status putusan."],
 ["jurisprudence","Yurisprudensi","Case Law","decision",non("jurisprudence"),"Koleksi yurisprudensi dengan metadata putusan pengadilan."]
];
const enDescriptions={
 "peraturan-menteri-transmigrasi":"Verified ministerial regulations and their legal metadata.",
 "monographs":"Legal monographs with author, publisher, call number, and ISBN fields.",
 "book":"Legal articles with author and publication-source fields.",
 "putusan-pengadilanyurisprudensi":"Judgments with decision number, delivery date, and judgment status."
};
const groups={
 regulation:{name:"Peraturan dan Keputusan",nameEn:"Regulations and Decisions"},
 formation:{name:"Pembentukan PUU",nameEn:"Regulation Drafting"},
 nonregulation:{name:"Dokumen Hukum Nonperaturan",nameEn:"Non-regulatory Legal Documents"},
 decision:{name:"Putusan dan Yurisprudensi",nameEn:"Court Decisions and Case Law"}
};
global.JDIH_CATEGORIES=Object.freeze(categories.map(([slug,title,titleEn,group,sourceUrl,description])=>Object.freeze({
slug,title,titleEn,group,sourceUrl,description,
descriptionEn:enDescriptions[slug]||"Collection of documents in this category. Verified records have not yet been fully integrated."
})));
global.JDIH_GROUPS=Object.freeze(groups);
})(window);
