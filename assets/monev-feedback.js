/* Form demonstrasi pendapat pengguna. Tidak melakukan POST atau
 * mengklaim tersimpan pada sistem Kementerian. Pengguna bisa mengunduh
 * catatan draft untuk kebutuhan uji staf. */
(function(){
"use strict";
const section=document.getElementById("pendapat");
if(!section)return;
const form=section.querySelector("form");
const message=section.querySelector("[data-feedback-status]");
if(!form)return;
form.addEventListener("submit",function(event){
 event.preventDefault();
 const data=new FormData(form);
 const comment=String(data.get("comment")||"").trim();
 const name=String(data.get("name")||"").trim();
 const score=String(data.get("score")||"");
 if(comment.length<15){message.textContent="Masukan sekurang-kurangnya 15 karakter.";return;}
 const payload={
   jenis:"Draf masukan JDIH Transmigrasi",
   dokumen:section.dataset.document||document.title,
   nama:name||"Tidak dicantumkan",
   penilaian:score,
   masukan:comment,
   tanggal:new Date().toISOString(),
   status:"Belum dikirim ke sistem resmi"
 };
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob);
 const a=document.createElement("a");
 a.href=url;a.download="draf-masukan-jdih.json";document.body.appendChild(a);a.click();a.remove();
 URL.revokeObjectURL(url);
 message.textContent="Draf masukan berhasil diunduh. Masukan belum dikirim ke pengelola JDIH. Kanal pengiriman resmi memerlukan integrasi Pusdatin.";
});
})();