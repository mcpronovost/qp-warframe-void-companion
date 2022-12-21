import{d as R,u as x,s as B,a as D,r as h,g as s,h as c,k as S,F as E,l as L,m as d,f as O,n as $,v as A,j as n,c as t,q as a,t as N,A as U,H as z,E as p,_ as F}from"./index-405760e7.js";import{i as H}from"./blueprint-b6c1ffa1.js";import{i as I,a as j,b as M}from"./systems-8cdc0256.js";import{i as P,a as T,b as V,c as G,d as J,e as K,f as Q,g as W,h as X}from"./prime_upperlimb-e05cfcd9.js";const Y={key:0,class:"qp-relics-drawer-components-list"},Z=["onClick"],ee={class:"qp-relics-drawer-components-item-wrapper"},se={class:"qp-relics-drawer-components-img"},re={class:"qp-relics-drawer-components-name"},te=["textContent"],ae={class:"qp-relics-drawer-rarities"},ie={key:0,class:"qp-relics-drawer-rarities-gold"},ce={key:1,class:"qp-relics-drawer-rarities-silver"},ne={key:2,class:"qp-relics-drawer-rarities-bronze"},le=R({__name:"RelicDrawer",props:{relic:{type:Object,required:!0},readonly:{type:Boolean,default:!1,required:!1}},emits:["close"],setup(m,{emit:v}){const u=m,{t:g}=x(),k=B(),{rat:w,lang:b}=D(k),l=h(!1),_=h(null),q=async(y,f)=>{l.value=!0,_.value=null;let r=new FormData;r.append("id",y.toString());try{let i=await fetch(`${U}/me/${f}/components/create/`,{method:"POST",body:r,headers:z(w.value,b.value)}).then(o=>o).catch(()=>new Response(null,{status:400}));if(i.status===201)p.success(g("ComponentUpdated")),l.value=!1,v("close");else throw i.status}catch(i){i===401?p.error("not authorized"):p.error(g("AnErrorOccurred")),_.value=`${i}`,l.value=!1}};return(y,f)=>{var o;const r=O("el-image"),i=$("loading");return s(),c("div",null,[(o=u.relic)!=null&&o.components?S((s(),c("ul",Y,[(s(!0),c(E,null,L(u.relic.components,(e,C)=>(s(),c("li",{key:`warframe-components-${C}`,class:A(`qp-relics-drawer-components-item${m.readonly?" qp-readonly":""}`),onClick:oe=>m.readonly?void 0:q(e.id,e.type)},[n("div",ee,[n("div",se,[e.component=="blueprint"?(s(),t(r,{key:0,src:a(H)},null,8,["src"])):e.component=="chassis"?(s(),t(r,{key:1,src:a(I)},null,8,["src"])):e.component=="neuroptics"?(s(),t(r,{key:2,src:a(j)},null,8,["src"])):e.component=="systems"?(s(),t(r,{key:3,src:a(M)},null,8,["src"])):e.component=="barrel"?(s(),t(r,{key:4,src:a(P)},null,8,["src"])):e.component=="blade"?(s(),t(r,{key:5,src:a(T)},null,8,["src"])):e.component=="grip"?(s(),t(r,{key:6,src:a(V)},null,8,["src"])):e.component=="handle"?(s(),t(r,{key:7,src:a(G)},null,8,["src"])):e.component=="lowerlimb"?(s(),t(r,{key:8,src:a(J)},null,8,["src"])):e.component=="receiver"?(s(),t(r,{key:9,src:a(K)},null,8,["src"])):e.component=="stock"?(s(),t(r,{key:10,src:a(Q)},null,8,["src"])):e.component=="string"?(s(),t(r,{key:11,src:a(W)},null,8,["src"])):e.component=="upperlimb"?(s(),t(r,{key:12,src:a(X)},null,8,["src"])):d("",!0)]),n("div",null,[n("div",re,[n("span",{textContent:N(e.name)},null,8,te)]),n("div",ae,[e.percent<10?(s(),c("span",ie)):e.percent>9&&e.percent<20?(s(),c("span",ce)):e.percent>19?(s(),c("span",ne)):d("",!0)])])])],10,Z))),128))])),[[i,l.value]]):d("",!0)])}}});const ge=F(le,[["__scopeId","data-v-8b8b96fe"]]),_e="/static/assets/img/relic_lith-5b7e387f.png",ye="/static/assets/img/relic_meso-a11281ee.png",fe="/static/assets/img/relic_neo-7caabf00.png",he="/static/assets/img/relic_axi-a32307ff.png";export{ye as a,fe as b,he as c,_e as i,ge as q};
