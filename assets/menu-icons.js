/* Ikon SVG garis konsisten, tanpa ketergantungan font/CDN.
   Ikon bersifat dekoratif, teks tautan tetap menjadi nama aksesibel. */
(function(global){
"use strict";
const paths={
 "scroll":'<path d="M8 21h12a2 2 0 0 0 2-2V5a2 2 0 0 0-4 0v12H6a3 3 0 1 1 3 3" /><path d="M6 17V4a2 2 0 0 1 2-2h12" /><path d="M10 6h5m-5 4h5m-5 4h5"/>',
 "draft":'<path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/><path d="m14 5 5 5M10 14l-1 4 4-1 8-8a2.12 2.12 0 0 0-3-3Z"/>',
 "books":'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M8 7h8m-8 4h5"/>',
 "gavel":'<path d="m14 13-7 7M12 15l-4-4m3-6 8 8m-9-9 5-5m-7 8 5-5m2 9 5-5M2 22h11"/>',
 "file":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
 "layers":'<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5m-18 5 9 5 9-5"/>',
 "handshake":'<path d="m2 12 4-4 5 1 3-2 4 2 4 4-4 6-4-1-3 2-4-2-3-3"/><path d="m9 9 4 4a2 2 0 0 0 3 0l1-1m-6 5 2 1m-6-3 3 2"/>',
 "scale":'<path d="M12 3v18M5 7h14M8 21h8M4 7l-3 6h6L4 7Zm16 0-3 6h6l-3-6Z"/>',
 "landmark":'<path d="m3 10 9-7 9 7v2H3v-2Zm2 2v7m4-7v7m6-7v7m4-7v7M3 21h18M2 19h20"/>',
 "clipboard":'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM9 11h6m-6 4h6m-6 4h3"/>',
 "folder":'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
 "search":'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 "megaphone":'<path d="M3 11h4l12-6v14L7 13H3a2 2 0 0 1 0-4v2Zm4 2 2 7h3"/>',
 "shield":'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
 "globe":'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
 "news":'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h7v5H6zm11 0h2m-2 4h2M6 16h13"/>',
 "book":'<path d="M12 7c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1ZM12 7v14"/>',
 "building":'<rect x="4" y="3" width="16" height="19" rx="1"/><path d="M9 22v-5h6v5M8 7h1m6 0h1M8 11h1m6 0h1"/>',
 "check":'<path d="m5 12 5 5L20 7"/>',
 "info":'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
 "calendar":'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
 "copyright":'<circle cx="12" cy="12" r="10"/><path d="M15 9a4 4 0 1 0 0 6"/>',
 "users":'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m16-8a4 4 0 0 0 0-8"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
 "chart":'<path d="M3 3v18h18M8 17v-5m5 5V8m5 9V5"/>'
};
const slugs={
 "peraturan-menteri-transmigrasi":"scroll",
 "keputusan-menteri-transmigrasi":"file",
 "memorandum-of-understanding":"handshake",
 "perjanjian-kerja-sama":"handshake",
 "undang-undang":"landmark",
 "pengganti-uu-perppu":"landmark",
 "peraturan-pemerintah":"scroll",
 "peraturan-presiden":"landmark",
 "keputusan-presiden":"file",
 "instruksi-presiden":"megaphone",
 "instruksi-menteri":"megaphone",
 "surat-edaran-kementerian-transmigrasi":"megaphone",
 "sk-pimpinan-uke-i":"file",
 "permendes-pdtt":"scroll",
 "rancangan-peraturan":"draft",
 "program-penyusunan":"clipboard",
 "analisis-evaluasi":"search",
 "risalah-harmonisasi":"clipboard",
 "kajian-penelitian":"book",
 "naskah-urgensi":"clipboard",
 "naskah-akademik":"book",
 "monographs":"books",
 "book":"news",
 "haki":"copyright",
 "putusan-pengadilanyurisprudensi":"gavel",
 "jurisprudence":"scale"
};
const quick=["scroll","draft","books","gavel"];
function svg(name,size=18){
 const pathsValue=paths[name]||paths.file;
 return '<svg class="ui-svg-icon" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">'+pathsValue+"</svg>";
}
function groupIcon(group){
 return {regulation:"scroll",formation:"draft",nonregulation:"books",decision:"gavel"}[group]||"file";
}
function decorate(){
 const cards=document.querySelectorAll(".quick a .qicon");
 cards.forEach((el,i)=>{if(el.dataset.iconDone)return;el.innerHTML=svg(quick[i]||"file",20);el.dataset.iconDone="true"});
 for(const el of document.querySelectorAll(".navmenu a,.featuretile,.formationlist a")){
  if(el.dataset.iconDone)continue;
  let kind="";
  try{
   const u=new URL(el.getAttribute("href"),document.baseURI);
   const slug=u.searchParams.get("kategori");
   if(slug)kind=slugs[slug]||"folder";
  }catch(e){}
  if(!kind&&el.closest(".formationlist"))kind="draft";
  if(!kind&&el.closest(".navmenu"))kind="file";
  if(!kind)continue;
  const holder=document.createElement("span");
  holder.className="menu-icon";
  holder.innerHTML=svg(kind,15);
  el.prepend(holder);
  el.dataset.iconDone="true";
 }
 const services=document.querySelectorAll(".servicepanel .qicon");
 services.forEach((el,i)=>{if(el.dataset.iconDone)return;
  el.innerHTML=svg(["news","building","chart","folder","users","clipboard","globe"][i]||"file",19);
  el.dataset.iconDone="true";
 });
}
global.JDIHIcons={svg,category:slug=>slugs[slug]||"file",group:groupIcon,decorate};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",decorate,{once:true});
else decorate();
})(window);
