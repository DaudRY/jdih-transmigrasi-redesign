/* Sampel sumber resmi untuk uji fitur katalog dan demonstrasi kepada Pusdatin.
   Satu dokumen per kategori yang ditemukan di portal JDIH Kementerian Transmigrasi.
   Diperiksa pada 19 Oktober 2026. Nilai null berarti tidak terbaca dalam metadata resmi;
   JANGAN mengisi nilai kosong menggunakan dugaan, OCR, atau tanggal dari jenis lain.
   PDF hanya dari /public/documents pada domain JDIH Kementerian Transmigrasi.
   Dokumen ini tidak membuktikan seluruh koleksi sudah tersinkronisasi. */
(function(global){
"use strict";
const host="https://jdih.transmigrasi.go.id";
const page=id=>host+"/web/regulations/read/"+id;
const pdf=path=>host+"/public/documents/"+path;
const samples=[
{
 id:"kepmen-99-2025",category:"keputusan-menteri-transmigrasi",
 title:"Keputusan Menteri Transmigrasi Nomor 99 Tahun 2025 tentang Walidata dan Produsen Data Bidang Transmigrasi",
 label:"Keputusan Menteri Transmigrasi",recordType:"decision-instrument",
 number:"99",year:2025,issuer:"Indonesia. Kementerian Transmigrasi",
 subject:"Walidata Produsen Bidang Transmigrasi",place:"Jakarta",source:"Kementerian Transmigrasi Keputusan Menteri 2025 : 3 Hlm",
 language:"Indonesia",field:"Keputusan Menteri",location:"Kementerian Transmigrasi Biro Hukum",status:"Berlaku",
 summary:"Penetapan walidata dan produsen data bidang transmigrasi.",sourceUrl:page(854),
 pdfUrl:pdf("/2cb2ea77-07d8-49e6-9510-be3b9c25a45b99__SALINAN_Keputusan_Menteri_Transmigrasi_Nomor_99_Tahun_2025_Walidata_dan_Produsen_Data.pdf")
},
{
 id:"mou-52-2025",category:"memorandum-of-understanding",
 title:"Memorandum of Understanding Nomor 52/HKM.07/XI/2025 Tahun 2025 tentang Kesepahaman Bersama antara Kementerian Transmigrasi dan PT. Haeng Nam Sejahtera Indonesia (HSI) tentang Dukungan Tanggung Jawab Sosial Perusahaan dalam Pemenuhan Kebutuhan Alat Makan Transmigran Penempatan Tahun 2025",
 label:"Memorandum of Understanding",recordType:"instrument",number:"52/HKM.07/XI/2025",year:2025,
 issuer:"Indonesia, Kementerian Transmigrasi",place:"Jakarta",source:"Biro Hukum, 5 hkm",
 language:"Indonesia",location:"Kementerian Transmigrasi",status:"Berlaku",
 summary:"Kesepahaman dukungan tanggung jawab sosial perusahaan mengenai alat makan transmigran.",sourceUrl:page(915),
 pdfUrl:pdf("2025memorandum-of-understanding52_HKM_07_XI_2025.pdf?v=1768885806")
},
{
 id:"uu-15-1997",category:"undang-undang",
 title:"Undang-Undang Nomor 15 Tahun 1997 tentang Ketransmigrasian",
 label:"Undang-Undang",recordType:"regulation",number:"15",year:1997,
 subject:"Ketransmigrasian",place:"Jakarta",source:"LN 1997 (37) : 37 HLM",
 language:"Indonesia",field:"Ketransmigrasian",location:"Jakarta",status:"Tidak Berlaku",
 summary:"Undang-undang tentang penyelenggaraan ketransmigrasian.",sourceUrl:page(639),
 pdfUrl:pdf("1624513736__nomor__tahun_1997.pdf")
},
{
 id:"perppu-1-2020",category:"pengganti-uu-perppu",
 title:"Peraturan Pemerintah Pengganti Undang-Undang Nomor 1 Tahun 2020 tentang Kebijakan Keuangan Negara dan Stabilitas Sistem Keuangan untuk Penanganan Pandemi Corona Virus Disease 2019 (COVID-19) dan/atau dalam Rangka Menghadapi Ancaman yang Membahayakan Perekonomian Nasional dan/atau Stabilitas Sistem Keuangan",
 label:"Peraturan Pemerintah Pengganti Undang-Undang",recordType:"regulation",number:"1",year:2020,
 subject:"Kebijakan Keuangan Negara dan Stabilitas Sistem Keuangan",place:"Jakarta",source:"LN 2020 (87) : 46 HLM",
 language:"Indonesia",field:"Penanganan Pandemi Covid-19",location:"Jakarta",status:null,
 summary:"Kebijakan keuangan negara dan stabilitas sistem keuangan dalam keadaan darurat pandemi.",sourceUrl:page(564),
 pdfUrl:pdf("1657510505__nomor__tahun_2020.pdf")
},
{
 id:"pp-19-2024",category:"peraturan-pemerintah",
 title:"Peraturan Pemerintah Nomor 19 Tahun 2024 tentang Peraturan Pelaksanaan Undang-Undang Nomor 15 Tahun 1997 tentang Ketransmigrasian sebagaimana Telah Diubah dengan Undang-Undang Nomor 29 Tahun 2009",
 label:"Peraturan Pemerintah",recordType:"regulation",number:"19",year:2024,
 issuer:"Indonesia. Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi",
 subject:"KETRANSMIGRASIAN",place:"Jakarta",source:"LN2024 (79) : 108 HLM",
 language:"Indonesia",field:"Transmigrasi",location:"Kementerian Desa, PDTT",status:"Berlaku",
 summary:"Peraturan pelaksanaan ketentuan undang-undang ketransmigrasian.",sourceUrl:page(725),
 pdfUrl:pdf("/34b5463b-0b85-4e56-889e-dff9839514b7Salinan_PP_Nomor_19_Tahun_2024.pdf")
},
{
 id:"perpres-50-2018",category:"peraturan-presiden",
 title:"Peraturan Presiden Nomor 50 Tahun 2018 tentang Koordinasi dan Integrasi Penyelenggaraan Transmigrasi",
 label:"Peraturan Presiden",recordType:"regulation",number:"50",year:2018,
 issuer:"Indonesia. Kementerian Transmigrasi",
 subject:"Koordinasi Integrasi Transmigrasi",place:"Jakarta",
 source:"Lembaran Negara Republik Indonesia Tahun 2018 Nomor 100 : 12 hlm",
 language:"Indonesia",field:"Peraturan Perundanganan",location:"Kementerian Sekretariat Negara",status:"Berlaku",
 summary:"Koordinasi dan integrasi lintas pemangku kepentingan dalam penyelenggaraan transmigrasi.",sourceUrl:page(835),
 pdfUrl:pdf("/77be7c46-06bf-44c4-b1e1-2386ece6d0c1Peraturan_Presiden_Nomor_50_Tahun_2018_tentang_Koordinasi_dan_Integrasi_Pelaksanaan_Transmigrasi.pdf")
},
{
 id:"keppres-12-2020",category:"keputusan-presiden",
 title:"Keputusan Presiden Nomor 12 Tahun 2020 tentang Penetapan Bencana Nonalam Penyebaran Corona Virus Disease 2019 (COVID-19) sebagai Bencana Nasional",
 label:"Keputusan Presiden",recordType:"decision-instrument",number:"12",year:2020,
 subject:"Penetapan Bencana Covid-19",place:"Jakarta",source:"LN 2020, KEPPRES: 3 HLM",
 language:"Indonesia",field:"Covid-19",location:"Jakarta",status:null,
 summary:"Keputusan mengenai penetapan bencana nonalam COVID-19 sebagai bencana nasional.",sourceUrl:page(164),
 pdfUrl:pdf("1657349464__nomor__tahun_2020.pdf")
},
{
 id:"inpres-8-2025",category:"instruksi-presiden",
 title:"Instruksi Presiden Nomor 8 Tahun 2025 tentang Optimalisasi Pelaksanaan Pengentasan Kemiskinan dan Penghapusan Kemiskinan Ekstrem",
 label:"Instruksi Presiden",recordType:"instruction",number:"8",year:2025,
 issuer:"Indonesia. Kementerian Transmigrasi",
 subject:"Optimalisasi Pelaksanaan Pengentasan Kemiskinan",place:"Jakarta",
 language:"Indonesia",field:"Instruksi Presiden",location:"Kementerian Sekretariat Negara Republik Indonesia",status:"Berlaku",
 summary:"Instruksi optimalisasi penanggulangan kemiskinan, termasuk kemiskinan ekstrem.",sourceUrl:page(840),
 pdfUrl:pdf("/f9fd0c77-b1c2-4ed6-954e-d16b26ce1116Inpres_Nomor_8_Tahun_2025.pdf")
},
{
 id:"permendes-8-2024",category:"permendes-pdtt",
 title:"Peraturan Menteri Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi Nomor 8 Tahun 2024 tentang Standar Sarana dan Prasarana Kantor di Lingkungan Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi",
 label:"Peraturan Menteri Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi",recordType:"regulation",number:"8",year:2024,
 issuer:"Indonesia. Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi",
 subject:"SARANA - PRASARANA - STANDAR",place:"Jakarta",source:"BN 2024 (611) : 45 HLM",
 language:"Indonesia",field:"Standar Sarana dan Prasarana Kantor",location:"Kemendesa PDTT",status:"Berlaku",
 summary:"Ketentuan standar sarana dan prasarana kantor pada kementerian terkait.",sourceUrl:page(763),
 pdfUrl:pdf("/bdfa2b8f-221a-4174-899e-80336a7979a7Peraturan_Menteri_Desa%2C_Pembangunan_Daerah_Tertinggal%2C_dan_Transmigrasi_Nomor_8_Tahun_2024_tentang_St.pdf")
},
{
 id:"rancangan-jdih-2025",category:"rancangan-peraturan",
 title:"Rancangan Peraturan Menteri Transmigrasi Tahun 2025 tentang Jaringan Dokumentasi dan Informasi Hukum Kementerian Transmigrasi",
 label:"Rancangan Peraturan Menteri",recordType:"formation",number:null,year:2025,
 issuer:"Indonesia, Kementerian Transmigrasi",language:"Indonesia",status:null,
 summary:"Rancangan pengaturan pengelolaan JDIH Kementerian Transmigrasi.",sourceUrl:page(969),
 pdfUrl:pdf("2025rancangan-peraturan-menteri-transmigrasi_.pdf?v=1769754642")
},
{
 id:"urgensi-bantuan-2025",category:"naskah-urgensi",
 title:"Naskah Urgensi Tahun 2025 tentang Pedoman Umum Penyaluran Bantuan Pemerintah di Lingkungan Kementerian Transmigrasi",
 label:"Naskah Urgensi",recordType:"formation",number:null,year:2025,
 issuer:"Indonesia, Kementerian Transmigrasi",place:"Jakarta",language:"Indonesia",status:null,
 summary:"Naskah urgensi pembentukan peraturan mengenai penyaluran bantuan pemerintah.",sourceUrl:page(982),
 pdfUrl:pdf("2025naskah-urgensi_.pdf?v=1770199679")
},
{
 id:"akademik-pakaian-2025",category:"naskah-akademik",
 title:"Naskah Akademik Tahun 2025 tentang Pakaian Dinas Harian dan Atribut",
 label:"Naskah Akademik",recordType:"formation",number:null,year:2025,
 issuer:"Indonesia, Kementerian Transmigrasi",place:"Jakarta",language:"Indonesia",status:null,
 summary:"Dokumen kajian mengenai pakaian dinas harian dan atribut.",sourceUrl:page(983),
 pdfUrl:pdf("2025naskah-akademik_.pdf?v=1770199737")
},
{
 id:"putusan-malili-2025",category:"putusan-pengadilanyurisprudensi",
 title:"Putusan Pengadilan Negeri Malili Nomor 5/Pdt.G/2025/PN Mll Tahun 2025",
 label:"Putusan Pengadilan/Yurisprudensi",recordType:"decision",
 number:"5/Pdt.G/2025/PN Mll",year:2025,
 courtAuthority:"Indonesia, Mahkamah Agung Republik Indonesia",
 courtType:"Pengadilan Negeri",courtTypeAbbreviation:"PN",
 courtPlace:"Malili",dateRead:null,
 source:"Mahkamah Agung Republik Indonesia",language:"Indonesia",caseType:"Perdata (Pdt.G)",
 location:"Mahkamah Agung Republik Indonesia",decisionStatus:null,
 sourceStatusLiteral:"Berlaku (label dari portal JDIH; bukan penetapan inkracht)",
 summary:"Dokumen putusan perkara perdata pada Pengadilan Negeri Malili. Status kekuatan hukum tetap belum diverifikasi.",
 sourceUrl:page(984),pdfUrl:pdf("2025putusan-pengadilan-yurisprudensi5_Pdt_G_2025_PN_Mll.pdf?v=1770277796")
}
];
const slugs=new Set(samples.map(x=>x.category));
if(slugs.size!==samples.length)throw new Error("Satu PDF sampel per kategori, tidak boleh duplikat kategori.");
for(const s of samples){
 if(!/^https:\/\/jdih\.transmigrasi\.go\.id\/web\/regulations\/read\/\d+$/.test(s.sourceUrl))throw new Error("Sumber metadata tidak sah: "+s.id);
 if(!/^https:\/\/jdih\.transmigrasi\.go\.id\/public\/documents\//.test(s.pdfUrl))throw new Error("Sumber PDF tidak sah: "+s.id);
 s.localPdf="pdfs/"+s.id+".pdf";
 s.checkedAt="2026-10-19";
 Object.freeze(s);
}
global.JDIH_VERIFIED_SAMPLES=Object.freeze(samples);
})(window);
