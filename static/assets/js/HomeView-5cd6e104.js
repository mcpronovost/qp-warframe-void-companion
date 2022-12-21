import{d as Y,u as Z,s as ee,a as te,r,o as se,b as ne,c,w as n,e as le,A as oe,H as ae,E as x,f as u,g as s,h as g,i as o,j as l,t as _,k as ie,F as re,l as ue,T as ce,m as f,W as de,n as pe,p as _e,q as $,_ as ve}from"./index-2dfb36fa.js";import{q as me,i as ge,a as fe,b as he,c as Ce}from"./relic_axi-eea15a08.js";import"./blueprint-b6c1ffa1.js";import"./systems-8cdc0256.js";import"./prime_upperlimb-e05cfcd9.js";const we={key:0,class:"qp-container"},ke={class:"qp-relics-actions"},$e={class:"qp-relics-actions-extra"},qe=["textContent"],be={class:"qp-relics-actions-era"},xe=["textContent"],ye=["textContent"],Re=["textContent"],Ee=["textContent"],Le=["textContent"],ze=["onClick"],Ae={class:"qp-relics-item-wrapper"},De={class:"qp-relics-image"},Ve={class:"qp-relics-name"},Ne=["textContent"],Ue={key:0,class:"qp-relics-components-count"},We=["textContent"],Me={class:"qp-relics-rarities"},Se={key:0,class:"qp-relics-rarities-gold"},Te={key:1,class:"qp-relics-rarities-silver"},Be={key:2,class:"qp-relics-rarities-bronze"},He=["textContent"],Ie=Y({__name:"HomeView",setup(je){const{t:y}=Z(),M=le(),S=ee(),{rat:R,lang:T,slug:B}=te(S),h=r(!1),d=r(!1),q=r(null),C=r(!1),m=r(null),H=r([]),E=r([]),L=r(1),z=r(1),A=r(0),D=r(null),V=r(window.innerWidth),v=async(i,t,b=!1)=>{b?d.value=!0:h.value=!0,q.value=null;let w=i?`?page=${i}`:"?page=1";w+=t?`&era=${t}`:"",D.value=t;try{let a=await fetch(`${oe}/me/relics/${w}`,{method:"GET",headers:ae(R.value,T.value)}).then(p=>p).catch(()=>new Response(null,{status:400}));if(a.status===200){let p=await a.json();A.value=p.count,z.value=p.size,H.value=p.results,E.value=p.results,h.value=!1,d.value=!1}else throw a.status}catch(a){a===401?x.error("not authorized"):x.error(y("AnErrorOccurred")),q.value=`${a}`,h.value=!1,d.value=!1}},I=(i=null)=>{m.value=i,C.value=!0},N=()=>{C.value=!1,m.value=null},U=()=>{V.value=window.innerWidth},j=()=>{navigator.clipboard.writeText(`${de}/u/${B.value}`),x.success(y("Sharelinkcopiedtoclipboard"))};return se(()=>{R.value?(v(null,null),window.addEventListener("resize",U)):M.push({name:"AuthLogin"})}),ne(()=>{window.removeEventListener("resize",U)}),(i,t)=>{const b=u("qp-header"),w=u("el-icon"),a=u("el-button"),p=u("el-button-group"),k=u("el-image"),W=u("el-col"),F=u("el-pagination"),G=u("el-row"),O=u("el-drawer"),P=u("qp-notfound"),J=u("qp-loading"),K=u("qp-page"),Q=pe("loading");return s(),c(K,null,{default:n(()=>[!h.value&&!q.value?(s(),g("div",we,[o(b,{title:i.$t("Relics"),"page-type":"relics"},null,8,["title"]),l("div",ke,[l("div",$e,[o(p,null,{default:n(()=>[o(a,{onClick:t[0]||(t[0]=e=>j())},{default:n(()=>[o(w,{class:"mdi mdi-share-variant"}),l("span",{textContent:_(i.$t("Share"))},null,8,qe)]),_:1})]),_:1})]),l("div",be,[o(p,null,{default:n(()=>[o(a,{disabled:d.value,onClick:t[1]||(t[1]=e=>v(null,null,!0))},{default:n(()=>[l("span",{textContent:_(i.$t("All"))},null,8,xe)]),_:1},8,["disabled"]),o(a,{disabled:d.value,onClick:t[2]||(t[2]=e=>v(null,"Lith",!0))},{default:n(()=>[l("span",{textContent:_(i.$t("Lith"))},null,8,ye)]),_:1},8,["disabled"]),o(a,{disabled:d.value,onClick:t[3]||(t[3]=e=>v(null,"Meso",!0))},{default:n(()=>[l("span",{textContent:_(i.$t("Meso"))},null,8,Re)]),_:1},8,["disabled"]),o(a,{disabled:d.value,onClick:t[4]||(t[4]=e=>v(null,"Neo",!0))},{default:n(()=>[l("span",{textContent:_(i.$t("Neo"))},null,8,Ee)]),_:1},8,["disabled"]),o(a,{disabled:d.value,onClick:t[5]||(t[5]=e=>v(null,"Axi",!0))},{default:n(()=>[l("span",{textContent:_(i.$t("Axi"))},null,8,Le)]),_:1},8,["disabled"])]),_:1})])]),ie((s(),c(G,{class:"qp-relics-list"},{default:n(()=>[o(ce,{name:"list",mode:"out-in"},{default:n(()=>[(s(!0),g(re,null,ue(E.value,(e,X)=>(s(),c(W,{key:`relics-${X}`,span:12,sm:8,md:6,lg:4,class:"qp-relics-col"},{default:n(()=>[l("div",{class:"qp-relics-item",onClick:Fe=>I(e)},[l("div",Ae,[l("div",De,[o(_e,null,{default:n(()=>[e.era=="Lith"?(s(),c(k,{key:0,src:$(ge)},null,8,["src"])):e.era=="Meso"?(s(),c(k,{key:1,src:$(fe)},null,8,["src"])):e.era=="Neo"?(s(),c(k,{key:2,src:$(he)},null,8,["src"])):e.era=="Axi"?(s(),c(k,{key:3,src:$(Ce)},null,8,["src"])):f("",!0)]),_:2},1024)]),l("div",Ve,[l("span",{textContent:_(`${e.era} ${e.name}`)},null,8,Ne)]),e.components.length>1?(s(),g("div",Ue,[l("span",{textContent:_(`x${e.components.length}`)},null,8,We)])):f("",!0),l("div",Me,[e.rarities.gold?(s(),g("span",Se)):f("",!0),e.rarities.silver?(s(),g("span",Te)):f("",!0),e.rarities.bronze?(s(),g("span",Be)):f("",!0)])])],8,ze)]),_:2},1024))),128))]),_:1}),o(W,null,{default:n(()=>[o(F,{background:"","hide-on-single-page":"",layout:"prev, pager, next","current-page":L.value,"onUpdate:current-page":t[6]||(t[6]=e=>L.value=e),"page-size":z.value,total:A.value,onCurrentChange:v},null,8,["current-page","page-size","total"])]),_:1})]),_:1})),[[Q,d.value]]),o(O,{modelValue:C.value,"onUpdate:modelValue":t[8]||(t[8]=e=>C.value=e),direction:"rtl",size:V.value<992?"90%":"30%","before-close":N},{header:n(()=>[m.value?(s(),g("span",{key:0,class:"el-drawer__title",textContent:_(`${m.value.era} ${m.value.name}`)},null,8,He)):f("",!0)]),default:n(()=>[m.value?(s(),c(me,{key:0,relic:m.value,onClick:t[7]||(t[7]=e=>{N(),v(null,D.value,!0)})},null,8,["relic"])):f("",!0)]),_:1},8,["modelValue","size"])])):h.value?(s(),c(J,{key:2})):(s(),c(P,{key:1}))]),_:1})}}});const Qe=ve(Ie,[["__scopeId","data-v-1e4fb771"]]);export{Qe as default};
