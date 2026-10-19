/* Pemetaan label metadata berdasarkan Lampiran II Permenkumham 8/2019.
   Halaman 24: peraturan; 56: monografi hukum; 81: artikel hukum;
   92: putusan pengadilan/yurisprudensi.
   Lampiran I (halaman 7-9) hanya mengatur pembuatan abstrak PUU.
   Field disajikan per tipe. Tidak membuat entri atau isi metadata otomatis. */
(function(global){
"use strict";
const reg=[
  ["Tipe Dokumen","documentType"],
  ["Judul","title"],
  ["T.E.U. Badan/Pengarang","issuer"],
  ["Nomor Peraturan","number"],
  ["Jenis/Bentuk Peraturan","label"],
  ["Singkatan Jenis/Bentuk Peraturan","formAbbreviation"],
  ["Tempat Penetapan","place"],
  ["Tanggal-Bulan-Tahun Penetapan/Pengundangan","legalDates"],
  ["Sumber","source"],
  ["Subjek","subject"],
  ["Status","status"],
  ["Bahasa","language"],
  ["Lokasi","location"],
  ["Bidang Hukum","field"],
  ["Lampiran","attachmentDescription"]
];
const monograph=[
  ["Tipe Dokumen","documentType"],
  ["Judul","title"],
  ["T.E.U. Orang/Badan","author"],
  ["Nomor Panggil","callNumber"],
  ["Cetakan/Edisi","edition"],
  ["Tempat Terbit","publicationPlace"],
  ["Penerbit","publisher"],
  ["Tahun Terbit","publicationYear"],
  ["Deskripsi Fisik","physicalDescription"],
  ["Subjek","subject"],
  ["ISBN","isbn"],
  ["Bahasa","language"],
  ["Bidang Hukum","field"],
  ["Nomor Induk Buku","bookInventoryNumber"],
  ["Lokasi","location"],
  ["Lampiran","attachmentDescription"]
];
const article=[
  ["Tipe Dokumen","documentType"],
  ["Judul","title"],
  ["T.E.U. Orang/Badan","author"],
  ["Tempat Terbit","publicationPlace"],
  ["Tahun Terbit","publicationYear"],
  ["Sumber","source"],
  ["Subjek","subject"],
  ["Bahasa","language"],
  ["Bidang Hukum","field"],
  ["Lokasi","location"],
  ["Lampiran","attachmentDescription"]
];
const court=[
  ["Tipe Dokumen","documentType"],
  ["Judul","title"],
  ["T.E.U. Badan","courtAuthority"],
  ["Nomor Putusan","decisionNumber"],
  ["Jenis Peradilan","courtType"],
  ["Singkatan Jenis Peradilan","courtTypeAbbreviation"],
  ["Tempat Peradilan","courtPlace"],
  ["Tanggal-Bulan-Tahun Dibacakan","dateRead"],
  ["Sumber","source"],
  ["Subjek","subject"],
  ["Status Putusan","decisionStatus"],
  ["Bahasa","language"],
  ["Bidang Hukum/Jenis Perkara","caseType"],
  ["Lokasi","location"],
  ["Lampiran","attachmentDescription"]
];
const schemas={
  regulation:{
    name:"Peraturan perundang-undangan",page:24,fields:reg,
    abstractStandard:"Lampiran I, halaman 7–9",
    abstractRequiredStructure:[
      ["Kepala Abstrak","Subjek, tahun, jenis dan nomor peraturan, sumber, serta judul peraturan."],
      ["Dasar Pertimbangan","Ringkasan alasan atau latar belakang dari bagian Menimbang."],
      ["Dasar Hukum","Rujukan dari bagian Mengingat yang disalin menurut hierarki."],
      ["Materi Pokok","Ringkasan pokok materi muatan dari pasal-pasal."],
      ["Catatan","Tanggal berlaku, peraturan pelaksanaan, peraturan yang dicabut, atau diubah jika ada."]
    ]
  },
  monograph:{
    name:"Monografi hukum",page:56,fields:monograph,
    abstractStandard:null,
    summaryGuidance:"Lampiran II mengatur metadata monografi, bukan struktur abstrak peraturan. Apabila tersedia ringkasan/abstrak monografi, tampilkan naskah yang memang diterbitkan dan jangan menyusun bagian Menimbang, Mengingat, Materi Pokok, atau Catatan seperti abstrak PUU."
  },
  article:{
    name:"Artikel hukum",page:81,fields:article,
    abstractStandard:null,
    summaryGuidance:"Lampiran II mengatur metadata artikel, bukan format baku abstrak artikel. Ringkasan harus mengikuti isi artikel dan sumbernya apabila tersedia; jangan dipaksa menggunakan format abstrak peraturan."
  },
  decision:{
    name:"Putusan pengadilan/yurisprudensi",page:92,fields:court,
    abstractStandard:null,
    summaryGuidance:"Lampiran II mengatur metadata putusan, bukan struktur baku abstrak putusan yang sama dengan PUU. Jika tersedia abstrak atau ringkasan putusan, tampilkan sesuai sumber resmi. Pokok perkara, pertimbangan, dan amar dapat menjadi struktur tampilan tambahan hanya setelah diperiksa pada dokumen resmi."
  }
};
Object.keys(schemas).forEach(k=>{
  schemas[k].fields.forEach(row=>Object.freeze(row));
  Object.freeze(schemas[k].fields);
  if(schemas[k].abstractRequiredStructure){
    schemas[k].abstractRequiredStructure.forEach(row=>Object.freeze(row));
    Object.freeze(schemas[k].abstractRequiredStructure);
  }
  Object.freeze(schemas[k]);
});
global.JDIH_METADATA_SCHEMAS=Object.freeze(schemas);
})(window);
