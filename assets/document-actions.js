/* Document affordances: citation, sharing and print.
   This changes UI only; no document is published or modified by these actions. */
(function(){
"use strict";
const path=location.pathname;
const isReg=/\/detail\.html$/.test(path);
const isSample=/\/contoh\.html$/.test(path);
if(!isReg&&!isSample)return;
const id=new URLSearchParams(location.search).get("id");
const dataset=isReg?window.JDIH_DOCUMENTS:window.JDIH_VERIFIED_SAMPLES;
const doc=Array.isArray(dataset)?dataset.find(d=>d.id===id):null;
if(!doc)return;
const lang=()=>window.JDIHPreferences?.language==="en"?"en":"id";
const labels={
 id:{copy:"Salin sitasi",link:"Salin tautan",share:"Bagikan",print:"Cetak halaman",copied:"Sitasi disalin.",linked:"Tautan disalin.",failed:"Tidak dapat menyalin secara otomatis."},
 en:{copy:"Copy citation",link:"Copy link",share:"Share",print:"Print page",copied:"Citation copied.",linked:"Link copied.",failed:"Automatic copying is unavailable."}
};
function citation(){
 const title=(doc.title||"").trim();
 return title+"\nJDIH Kementerian Transmigrasi\n"+location.href;
}
async function copy(value){
 try{
  if(navigator.clipboard&&navigator.clipboard.writeText){
   await navigator.clipboard.writeText(value);return true;
  }
  const input=document.createElement("textarea");
  input.value=value;input.setAttribute("readonly","");
  input.style.cssText="position:fixed;left:-9999px;top:0;opacity:0";
  document.body.appendChild(input);input.focus();input.select();
  const ok=document.execCommand("copy");input.remove();return ok;
 }catch(e){return false;}
}
function init(){
 const host=isReg?document.querySelector(".heroactions"):document.querySelector("#dokumen .actions");
 if(!host)return;
 const bar=document.createElement("div");
 bar.className="document-utilities";
 bar.setAttribute("aria-label","Aksi dokumen");
 const actions=[
  ["copy","file-text"],["link","link"],["share","share-2"],["print","printer"]
 ];
 const symbols={copy:"§",link:"↗",share:"⇧",print:"▤"};
 const buttons={};
 for(const [action] of actions){
  const button=document.createElement("button");
  button.type="button";button.className="document-utility";
  button.dataset.documentAction=action;
  const symbol=document.createElement("span");symbol.setAttribute("aria-hidden","true");symbol.textContent=symbols[action];
  const title=document.createElement("span");title.className="utility-label";
  button.append(symbol,title);bar.appendChild(button);buttons[action]=title;
 }
 const status=document.createElement("span");
 status.className="utility-status";
 status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 bar.appendChild(status);
 host.insertAdjacentElement("afterend",bar);
 const update=()=>{
  const l=labels[lang()];
  for(const action of Object.keys(buttons))buttons[action].textContent=l[action];
  bar.setAttribute("aria-label",lang()==="en"?"Document actions":"Aksi dokumen");
 };
 bar.addEventListener("click",async e=>{
  const button=e.target.closest("[data-document-action]");
  if(!button)return;
  const action=button.dataset.documentAction;
  const l=labels[lang()];
  if(action==="print"){window.print();return;}
  if(action==="share"&&navigator.share){
   try{await navigator.share({title:doc.title,url:location.href});return}
   catch(error){if(error&&error.name==="AbortError")return}
  }
  const result=await copy(action==="copy"?citation():location.href);
  status.textContent=result?(action==="copy"?l.copied:l.linked):l.failed;
 });
 document.addEventListener("jdih:languagechange",update);
 update();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();
