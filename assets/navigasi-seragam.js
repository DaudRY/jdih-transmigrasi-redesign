/* Navigasi bersama beranda dan halaman penelusuran.
 * Hanya satu dropdown terbuka; Escape dan klik di luar menutup menu.
 * Menggunakan <details>/<summary> native untuk keyboard dan sentuh. */
(function(){
"use strict";
function init(){
 const header=document.querySelector(".jdih-shell .mast");
 const nav=document.querySelector(".jdih-shell #nav");
 const button=document.querySelector(".jdih-shell #menu");
 if(!header||!nav||!button||nav.dataset.navReady)return;
 nav.dataset.navReady="true";
 const groups=[...nav.querySelectorAll("details.navgroup")];
 const closeGroups=except=>{
   groups.forEach(el=>{if(el!==except)el.open=false;});
 };
 const closeMenu=({focus=false}={})=>{
   nav.classList.remove("open");
   button.setAttribute("aria-expanded","false");
   closeGroups();
   if(focus)button.focus();
 };
 button.addEventListener("click",()=>{
   const open=!nav.classList.contains("open");
   if(open)nav.classList.add("open");
   else nav.classList.remove("open");
   button.setAttribute("aria-expanded",String(open));
   if(!open)closeGroups();
 });
 groups.forEach(group=>{
   // Jalankan sebelum aksi native <summary>, tidak menunggu event toggle asinkron.
   const summary=group.querySelector("summary");
   if(summary)summary.addEventListener("click",()=>closeGroups(group),{capture:true});
   group.addEventListener("toggle",()=>{if(group.open)closeGroups(group);});
 });
 nav.querySelectorAll("a").forEach(a=>{
   a.addEventListener("click",()=>closeMenu());
 });
 document.addEventListener("pointerdown",event=>{
   if(!header.contains(event.target))closeMenu();
   else if(!nav.contains(event.target)&&event.target!==button&&!button.contains(event.target)){
     closeGroups();
   }
 });
 document.addEventListener("keydown",event=>{
   if(event.key==="Escape"){
     const wasOpen=nav.classList.contains("open")||groups.some(el=>el.open);
     closeMenu({focus:wasOpen});
   }
 });
 // Saat berpindah dari mobile ke desktop, jangan meninggalkan popover terbuka.
 window.addEventListener("resize",()=>{
   if(window.innerWidth>1100&&nav.classList.contains("open")){
     closeMenu();
   }
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
