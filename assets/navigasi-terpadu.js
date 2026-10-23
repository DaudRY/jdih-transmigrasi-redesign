/* Navigasi JDIH terpadu. Tidak mengubah isi dokumen atau metadata. */
(function(){
"use strict";
const oldHeader=document.querySelector("header.mast,header.header,header.structure-header");
if(!oldHeader)return;
const header=document.createElement("header");
header.className="mast ui-site-header";
header.innerHTML=`
  <div class="mastin">
    <a class="brand" href="./index.html#beranda" aria-label="Beranda JDIH Kementerian Transmigrasi">
      <img class="brand-mark" src="assets/logo-kementrans-bulat.webp" alt="" width="46" height="46">
      <span class="brand-copy"><strong>JDIH Kementerian Transmigrasi</strong>
      <small>Jaringan Dokumentasi dan Informasi Hukum</small></span>
    </a>
    <nav class="nav" id="nav" aria-label="Navigasi utama">
      <a href="./index.html#beranda" data-en="Home">Beranda</a>
      <a href="./telusur.html" data-en="Search">Penelusuran</a>
      <details class="navgroup"><summary data-en="Legal Documents">Dokumen Hukum</summary>
        <div class="navmenu">
          <a href="./katalog.html?kategori=peraturan-menteri-transmigrasi" data-en="Ministerial Regulations">Peraturan Menteri</a>
          <a href="./katalog.html?kategori=keputusan-menteri-transmigrasi" data-en="Ministerial Decisions">Keputusan Menteri</a>
          <a href="./katalog.html?kategori=monographs" data-en="Legal Monographs">Monografi Hukum</a>
          <a href="./katalog.html?kategori=book" data-en="Legal Articles">Artikel Hukum</a>
          <a href="./katalog.html?kategori=putusan-pengadilanyurisprudensi" data-en="Court Decisions">Putusan Pengadilan</a>
        </div>
      </details>
      <details class="navgroup"><summary data-en="Regulation Drafting">Pembentukan PUU</summary>
        <div class="navmenu">
          <a href="./program-penyusunan.html" data-en="Drafting Program">Program Penyusunan</a>
          <a href="./katalog.html?kategori=rancangan-peraturan" data-en="Draft Regulations">Rancangan Peraturan</a>
          <a href="./katalog.html?kategori=naskah-urgensi" data-en="Urgency Papers">Naskah Urgensi</a>
          <a href="./katalog.html?kategori=naskah-akademik" data-en="Academic Papers">Naskah Akademik</a>
          <a href="./katalog.html?kategori=risalah-harmonisasi" data-en="Discussion Minutes">Risalah Pembahasan</a>
          <a href="./katalog.html?kategori=analisis-evaluasi" data-en="Legal Analysis and Evaluation">Analisis dan Evaluasi</a>
        </div>
      </details>
      <details class="navgroup"><summary data-en="Profile">Profil</summary>
        <div class="navmenu">
          <a href="./struktur-organisasi.html" data-en="Organizational Structure">Struktur Organisasi</a>
          <a href="./ruang.html?bagian=profil" data-en="About JDIH">Tentang JDIH</a>
          <a href="./ruang.html?bagian=dasar-hukum" data-en="Legal Basis">Dasar Hukum</a>
        </div>
      </details>
      <details class="navgroup"><summary data-en="Services">Layanan</summary>
        <div class="navmenu">
          <a href="./ruang.html?bagian=faq" data-en="Help and FAQ">Panduan dan FAQ</a>
          <a href="./ruang.html?bagian=kontak" data-en="Contact">Kontak</a>
          <a href="./ruang.html?bagian=survei" data-en="Satisfaction Survey">Survei Kepuasan</a>
        </div>
      </details>
    </nav>
    <button class="menu" id="menu" type="button" aria-expanded="false" aria-controls="nav">
      <span aria-hidden="true">☰</span> <span data-en="Menu">Menu</span>
    </button>
  </div>`;
oldHeader.replaceWith(header);
document.body.classList.add("ui-unified-nav");
if(!document.querySelector(".top,.site-topbar")){
 const bar=document.createElement("div");
 bar.className="site-topbar";
 bar.innerHTML=`
  <div class="site-topbar-inner">
    <span class="site-topbar-title">Kementerian Transmigrasi Republik Indonesia</span>
    <a href="https://jdihn.go.id/" target="_blank" rel="noopener noreferrer">JDIHN Nasional ↗</a>
  </div>`;
 header.before(bar);
}
const nav=header.querySelector("#nav"),menu=header.querySelector("#menu");
const groups=Array.from(nav.querySelectorAll(".navgroup"));
const labels=Array.from(header.querySelectorAll("[data-en]"));
for(const el of labels)el.dataset.id=el.textContent.trim();
function closeGroups(except){for(const item of groups)if(item!==except)item.open=false;}
function closeMobile(){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}
menu.addEventListener("click",()=>{
 const open=nav.classList.toggle("open");
 menu.setAttribute("aria-expanded",String(open));
 if(!open)closeGroups();
});
for(const group of groups)group.addEventListener("toggle",()=>{if(group.open)closeGroups(group);});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{closeGroups();closeMobile();}));
document.addEventListener("click",e=>{
 if(!header.contains(e.target)){closeGroups();closeMobile();}
});
document.addEventListener("keydown",e=>{
 if(e.key!=="Escape")return;
 const hadGroups=groups.some(g=>g.open);
 closeGroups();
 if(nav.classList.contains("open"))closeMobile();
 else if(hadGroups&&document.activeElement?.closest(".navgroup")){
  document.activeElement.closest(".navgroup").querySelector("summary")?.focus();
 }
});
function syncLanguage(){
 const en=window.JDIHPreferences?.language==="en";
 for(const el of labels){
  const value=en?el.dataset.en:el.dataset.id;
  const node=Array.from(el.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);
  if(node)node.nodeValue=value;
  else el.appendChild(document.createTextNode(value));
 }
}
document.addEventListener("jdih:languagechange",syncLanguage);
syncLanguage();
})();
