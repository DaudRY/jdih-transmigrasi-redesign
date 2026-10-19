/* Dua bahasa untuk navigasi dan antarmuka, bukan terjemahan resmi produk hukum.
   Preferensi disimpan hanya pada peramban pengguna. Tidak memakai API eksternal. */
(function(){
"use strict";
const translations={
"Beranda":"Home","Peraturan":"Regulations","Peraturan ▾":"Regulations ▾",
"Pembentukan PUU":"Regulation Drafting","Pembentukan PUU ▾":"Regulation Drafting ▾",
"Nonperaturan ▾":"Non-regulatory Documents ▾","Nonperaturan":"Non-regulatory Documents",
"Informasi ▾":"Information ▾","Informasi":"Information",
"Peraturan Menteri Transmigrasi":"Ministerial Regulations",
"Keputusan Menteri Transmigrasi":"Ministerial Decisions",
"Memorandum of Understanding":"Memoranda of Understanding",
"Perjanjian Kerja Sama":"Cooperation Agreements",
"Undang-Undang":"Laws","Perppu":"Government Regulations in Lieu of Law",
"Peraturan Pemerintah":"Government Regulations","Peraturan Presiden":"Presidential Regulations",
"Keputusan Presiden":"Presidential Decisions","Instruksi Presiden":"Presidential Instructions",
"Instruksi Menteri":"Ministerial Instructions","Surat Edaran Kementerian":"Ministry Circulars",
"SK Pimpinan UKE I":"Echelon I Leadership Decisions","Permendes PDTT":"Village Ministry Regulations",
"Rancangan Peraturan":"Draft Regulations","Rancangan Peraturan Menteri":"Draft Ministerial Regulations",
"Naskah Urgensi":"Urgency Papers","Naskah Akademik":"Academic Papers",
"Monografi":"Legal Monographs","Artikel Hukum":"Legal Articles",
"Yurisprudensi":"Case Law","Yurisprudensi (Nonperaturan)":"Case Law (Non-regulatory)",
"Putusan Pengadilan":"Court Decisions","Putusan & yurisprudensi":"Court Decisions & Case Law",
"Putusan Pengadilan / Yurisprudensi":"Court Decisions / Case Law",
"Berita":"News","Berita JDIH":"JDIH News",
"Profil":"Profile","Dasar Hukum":"Legal Basis","Visi dan Misi":"Vision and Mission",
"Sejarah":"History","Program Unggulan 5T":"5T Priority Programs",
"Statistik dan survei":"Statistics & Survey","Statistik":"Statistics",
"Galeri *":"Gallery *","Foto *":"Photos *","Video *":"Videos *",
"Galeri":"Gallery","Foto":"Photos","Video":"Videos","Pojok UKE I":"Echelon I Corner",
"PORTAL INFORMASI HUKUM":"LEGAL INFORMATION PORTAL",
"Temukan dasar hukum.":"Find the legal basis.",
"Pahami keterkaitannya.":"Understand the connections.",
"Akses peraturan dan dokumen hukum Kementerian Transmigrasi melalui pencarian yang terarah, informasi yang jelas, dan struktur koleksi yang mudah ditelusuri.":"Access the Ministry of Transmigration's legal documents through focused search, clear information, and an accessible collection structure.",
"Jelajahi koleksi ↓":"Browse the collection ↓","Portal resmi ↗":"Official portal ↗",
"PENCARIAN DOKUMEN":"DOCUMENT SEARCH","Apa yang Anda cari?":"What are you looking for?",
"Kata kunci":"Keywords","Jenis dokumen":"Document type","Semua jenis":"All types",
"Peraturan Menteri":"Ministerial Regulation","Dokumen hukum lain":"Other Legal Documents",
"Putusan / yurisprudensi":"Decisions / Case Law",
"Tahun":"Year","Semua tahun":"All years","Nomor Peraturan":"Regulation Number",
"Cari dokumen →":"Search Documents →","Coba nomor peraturan, tahun terbit, atau kata dalam judul.":"Try a regulation number, publication year, or words from a title.",
"Informasi hukum satu pintu":"One-stop legal information",
"Responsif untuk desktop dan perangkat seluler":"Responsive on desktop and mobile",
"Berorientasi pada keterlacakan dokumen":"Designed for traceable legal sources",
"AKSES CEPAT":"QUICK ACCESS","Telusuri berdasarkan kebutuhan":"Browse by what you need",
"Mulai dari jenis dokumen yang diperlukan, bukan dari menu yang berlapis-lapis.":"Start with the document type you need, not layers of menus.",
"Peraturan dan keputusan":"Regulations and decisions",
"Program, rancangan, naskah urgensi, dan kajian":"Programs, drafts, urgency papers, and studies",
"Monografi, artikel, dan dokumen pendukung":"Monographs, articles, and supporting documents",
"Koleksi putusan dengan metadata tersendiri ↗":"Decision collections with dedicated metadata",
"PENELUSURAN HUKUM":"LEGAL SEARCH","Koleksi peraturan dan dokumen hukum":"Regulation and Legal Document Collection",
"Ringkasan cepat":"Quick summary","Detail lengkap →":"Full details →","Sumber resmi ↗":"Official source ↗",
"Subjek":"Subject","Sumber pengundangan":"Promulgation source",
"Nomor":"Number","Status":"Status","Semua status":"All statuses",
"Reset filter":"Reset filters","Bersihkan filter":"Clear filters",
"PROSES REGULASI":"REGULATORY PROCESS",
"Dokumen pembentukan PUU, dari awal hingga ditetapkan":"Regulation drafting documents, from initiation to enactment",
"Penyajian tahapan pembentukan membantu pengguna memahami konteks, menelusuri dokumen pendukung, dan melihat proses regulasi dengan lebih utuh.":"The drafting stages help visitors understand the context, find supporting materials, and follow the regulatory process.",
"Program penyusunan":"Drafting program","Rancangan peraturan":"Draft regulations",
"Naskah akademik dan urgensi":"Academic and urgency papers",
"Analisis, kajian, dan risalah":"Analysis, studies, and minutes",
"Program pembentukan peraturan perundang-undangan":"Legislative drafting program",
"Dokumen rancangan untuk proses pembentukan":"Draft documents for the regulatory process",
"Dasar analisis, urgensi, dan arah kebijakan":"Legal analysis, urgency, and policy direction",
"Hasil evaluasi dan dokumen pembahasan":"Evaluation findings and discussion documents",
"AKSES DOKUMEN":"DOCUMENT ACCESS",
"FITUR EKSISTING · TETAP DIPERTAHANKAN":"EXISTING FEATURES · PRESERVED",
"Katalog lengkap kategori dokumen":"Complete document category catalog",
"Seluruh kategori utama yang tersedia di portal resmi tetap dipertahankan. Pilih kategori untuk membuka koleksi pada sumber resmi.":"All principal document categories are preserved. Select a category to open its collection on this site.",
"MONOGRAFI DAN ARTIKEL":"MONOGRAPHS AND ARTICLES",
"KONTEN BERANDA EKSISTING":"EXISTING HOMEPAGE CONTENT",
"Program Unggulan 5T tetap tersedia":"The 5T Priority Programs remain available",
"FITUR BERANDA & INFORMASI":"HOMEPAGE & INFORMATION",
"Berita, informasi kelembagaan, layanan, dan jejaring":"News, institutional information, services, and networks",
"Tentang Kami":"About Us","Statistik pengunjung dan survei":"Visitor Statistics and Survey",
"Pengunjung hari ini":"Visitors today","Pengunjung bulan ini":"Visitors this month",
"Total klik":"Total clicks","Survei kepuasan":"Satisfaction survey",
"Belum terhubung":"Not connected","Perlu integrasi":"Integration needed",
"Galeri, Foto, Video, dan Pojok UKE I":"Gallery, Photos, Videos & Echelon I Corner",
"Kontak dan aplikasi mobile":"Contact & Mobile App",
"Proses kegiatan, data peraturan, dan dokumentasi rapat":"Activities, regulation data, and meeting documentation",
"JALUR PERLU DIVERIFIKASI":"LINK NEEDS VERIFICATION",
"Tautan JDIH dan instansi terkait":"JDIH and Related Institutions",
"PENAMBAHAN BERDASARKAN EVALUASI":"EVALUATION-DRIVEN ENHANCEMENTS",
"Perbaikan baru di atas fitur yang sudah ada":"Improvements built on existing features",
"Prioritas tinggi":"High priority","Pengembangan":"Development",
"KUALITAS DATA":"DATA QUALITY","DETAIL PERATURAN":"REGULATION DETAILS",
"STATISTIK PUU":"REGULATION STATISTICS","INTEGRASI JDIHN":"JDIHN INTEGRATION",
"LAYANAN PUBLIK":"PUBLIC SERVICES",
"Submenu dokumen pembentukan lebih lengkap":"More comprehensive drafting submenus",
"Metadata dan abstrak konsisten":"Consistent metadata and abstracts",
"Relasi hukum yang dapat ditelusuri":"Traceable legal relationships",
"Statistik berdasarkan jenis, tahun, dan status":"Statistics by type, year, and status",
"Sinkronisasi dan log integrasi":"Synchronization and integration logs",
"Layanan onsite, terjemahan, dan aksesibilitas":"On-site services, translation, and accessibility",
"Informasi hukum harus dapat diakses semua orang.":"Legal information should be accessible to everyone.",
"Kontras tinggi":"High contrast","Kontras normal":"Normal contrast",
"Situs resmi":"Official website","Kembali ke beranda ↑":"Back to homepage ↑",
"Jaringan Dokumentasi dan Informasi Hukum":"Legal Documentation and Information Network",
"Jaringan Dokumentasi dan Informasi Hukum Nasional":"National Legal Documentation and Information Network",
"Metadata dokumen hukum":"Legal Document Metadata",
"Abstrak dan ringkasan dokumen":"Abstract and Document Summary",
"Status dan hubungan antarperaturan":"Regulatory Status and Relationships",
"Pratinjau naskah peraturan dan abstrak":"Regulation and Abstract Preview",
"Sumber dan validasi":"Source and Verification",
"Jelajahi dokumen lain":"Explore Other Documents",
"Lihat halaman metadata resmi ↗":"View Official Metadata ↗",
"Pratinjau belum dimuat. Sumber file: JDIH Kementerian Transmigrasi.":"Preview not loaded. File source: Ministry of Transmigration JDIH.",
"Muat pratinjau naskah":"Load Regulation Preview",
"Muat pratinjau abstrak":"Load Abstract Preview",
"Buka PDF di tab baru ↗":"Open PDF in a New Tab ↗",
"Metadata":"Metadata","Abstrak":"Abstract","Relasi hukum":"Legal Relationships",
"Naskah & PDF":"Document & PDF","Sumber data":"Data Source",
"Ikhtisar isi yang telah diperiksa":"Verified Content Summary",
"Struktur resmi abstrak peraturan (Lampiran I, halaman 7–9)":"Official Regulation Abstract Structure (Appendix I, pp. 7–9)",
"Kepala Abstrak":"Abstract Header","Dasar Pertimbangan":"Legal Considerations",
"Dasar Hukum":"Legal Basis","Materi Pokok":"Main Provisions","Catatan":"Notes",
"Belum tercantum pada metadata resmi":"Not recorded in official metadata",
"Status putusan dan putusan terkait":"Decision Status and Related Judgments",
"Referensi dan dokumen pendukung":"References and Supporting Documents",
"Tanggal pemeriksaan data contoh":"Sample Data Verification Date",
"Status sinkronisasi":"Synchronization Status",
"Data contoh, belum terhubung ke API":"Sample data, not connected to API",
"Catatan kualitas":"Quality Note",
"Kembali ke koleksi":"Back to Collection",
"Data belum tersedia":"Data Not Yet Available",
"Telusuri kategori":"Browse Categories","Kembali ke beranda":"Back to Homepage",
"Cari dalam kategori":"Search This Category","Semua kategori":"All Categories",
"Hasil pencarian":"Search Results","Belum ada data terverifikasi":"No Verified Data Yet",
"Kategori lain":"Other Categories","Lihat detail":"View Details",
"Informasi dokumen":"Document Information","Sumber rujukan":"Source Reference",
"Buka sumber resmi":"Open Official Source",
"Informasi belum tersinkronisasi":"Information Not Yet Synchronized",
"Dokumen resmi tetap berbahasa Indonesia. Antarmuka diterjemahkan sebagai bantuan navigasi, bukan terjemahan hukum resmi.":"Official legal documents remain in Indonesian. The interface is translated for navigation only; this is not an official legal translation.",
"Mode siang":"Day Mode","Mode malam":"Night Mode"
};
let lang="id",theme="day";
const originals=new WeakMap();
function saved(key){try{return localStorage.getItem(key)}catch(e){return null}}
function persist(key,val){try{localStorage.setItem(key,val)}catch(e){}}
function updateTheme(){
 document.documentElement.dataset.theme=theme;
 const b=document.getElementById("theme-toggle");
 if(b){
   b.setAttribute("aria-pressed",String(theme==="night"));
   b.setAttribute("aria-label",theme==="night"?(lang==="en"?"Activate day mode":"Aktifkan mode siang"):(lang==="en"?"Activate night mode":"Aktifkan mode malam"));
   b.innerHTML='<span class="theme-indicator" aria-hidden="true">'+(theme==="night"?"☀️":"🌙")+'</span> '+(theme==="night"?(lang==="en"?"Day mode":"Mode siang"):(lang==="en"?"Night mode":"Mode malam"));
 }
 const m=document.querySelector('meta[name="theme-color"]');
 if(m)m.content=theme==="night"?"#132326":"#dce6dc";
}
function changeTheme(){
 theme=theme==="night"?"day":"night";
 persist("jdih-theme",theme);
 updateTheme();
}
function tr(phrase){
 return lang==="en"?(translations[phrase]||phrase):phrase;
}
function translatePage(){
 document.documentElement.lang=lang;
 const selector=document.getElementById("lang-select");
 if(selector)selector.value=lang;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 const nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 for(const n of nodes){
   const p=n.parentElement;
   if(!p||p.closest("script,style,textarea,pre,code,.legal-original,.doc h3,#doctitle,#abstractpoints,.meta dd,.relation-card p,.original-source"))continue;
   if(!originals.has(n))originals.set(n,n.nodeValue);
   const raw=originals.get(n);
   const trimmed=raw.trim();
   if(!trimmed||!Object.hasOwn(translations,trimmed))continue;
   n.nodeValue=raw.replace(trimmed,tr(trimmed));
 }
 for(const el of document.querySelectorAll("input[placeholder],textarea[placeholder]")){
   if(!el.dataset.origPlaceholder)el.dataset.origPlaceholder=el.placeholder;
   const inputMap={
     "Judul, nomor, subjek, kata kunci…":"Title, number, subject, keywords…",
     "Contoh: 4":"Example: 4",
     "Cari judul, nomor, subjek…":"Search title, number, subject…",
     "Masukkan kata kunci…":"Enter keywords…"
   };
   el.placeholder=lang==="en"?(inputMap[el.dataset.origPlaceholder]||el.dataset.origPlaceholder):el.dataset.origPlaceholder;
 }
 document.querySelectorAll("[data-i18n]").forEach(el=>{
   const key=el.dataset.i18n;
   if(!el.dataset.origI18n)el.dataset.origI18n=el.textContent;
   el.textContent=lang==="en"?(translations[key]||el.dataset.origI18n):el.dataset.origI18n;
 });
 updateTheme();
}
function changeLanguage(v){
 lang=v==="en"?"en":"id";
 persist("jdih-lang",lang);
 translatePage();
}
function init(){
 theme=saved("jdih-theme")==="night"?"night":"day";
 lang=saved("jdih-lang")==="en"?"en":"id";
 let host=document.querySelector(".mastin")||document.querySelector(".headin");
 if(host&&!document.querySelector(".site-tools")){
   const controls=document.createElement("div");
   controls.className="site-tools";
   controls.innerHTML='<button id="theme-toggle" type="button" aria-pressed="false"><span class="theme-indicator" aria-hidden="true">🌙</span> Mode malam</button><label for="lang-select">Bahasa / Language</label><select id="lang-select" aria-label="Bahasa / Language"><option value="id">ID</option><option value="en">EN</option></select>';
   host.appendChild(controls);
   controls.querySelector("#theme-toggle").addEventListener("click",changeTheme);
   controls.querySelector("#lang-select").addEventListener("change",e=>changeLanguage(e.target.value));
 }
 translatePage();
}
window.JDIHPreferences={translate:translatePage,t:tr,get language(){return lang},get theme(){return theme}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
