import{d as V,u as H,s as P,a as G,r as y,o as J,f as e,g as n,h as g,w as h,i as o,j as K,c as C,t as _,k as Q,n as X,F as k,l as q,M as Y,A as M,H as R,E as v,N as O,e as m,m as Z,v as ee,D as te,q as se,_ as ne}from"./index-1f7384cd.js";import{_ as oe}from"./WeaponImage.vue_vue_type_script_setup_true_lang-e56a4a9a.js";import"./systems-5ba34008.js";const ae={key:0,class:"qp-container"},le={class:"qp-weapons-actions"},re={class:"qp-weapons-actions-extra"},ie=["textContent"],ce=["textContent"],ue={class:"qp-weapons-detail-components-list"},pe=["onClick"],de={class:"qp-weapons-detail-components-item-wrapper"},_e={class:"qp-weapons-detail-components-img"},me={class:"qp-weapons-detail-components-name"},he=["textContent"],ve={class:"qp-weapons-detail-components-relics"},we={key:0},fe={key:1,class:"qp-weapons-detail-components-era"},ye=["textContent"],ge={key:0},Ce={key:1,class:"qp-weapons-detail-components-era"},ke=["textContent"],qe={key:0},$e={key:1,class:"qp-weapons-detail-components-era"},xe=["textContent"],Ee={key:0},De={key:1,class:"qp-weapons-detail-components-era"},be=["textContent"],Ae={class:"qp-weapons-detail-image"},Me=V({__name:"MeleeWeaponsDetail",setup(Re){const{t:p}=H(),U=ee(),L=te(),z=P(),{rat:$,lang:D}=G(z),w=y(!1),d=y(!1),b=y(null),x=y(null),c=y(),A=async(r=!1)=>{r||(w.value=!0),b.value=null;try{let t=await fetch(`${M}/melee-weapons/${U.params.pk}/`,{method:"GET",headers:R($.value,D.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(t.status===200){let a=await t.json();c.value=a,w.value=!1}else throw t.status}catch(t){t===401?v.error("not authorized"):v.error(p("AnErrorOccurred")),b.value=`${t}`,w.value=!1}},S=async(r,t=!1)=>{d.value=!0,x.value=null;let a=new FormData;c.value&&t?a.append("id",c.value.components.map(s=>s.id.toString()).join(",")):a.append("id",r.toString());try{let s=await fetch(`${M}/me/melee-weapons/components/create/`,{method:"POST",body:a,headers:R($.value,D.value)}).then(f=>f).catch(()=>new Response(null,{status:400}));if(s.status===201)O({message:p(t?"ComponentsUpdated":"ComponentUpdated"),type:"success",position:"bottom-right",showClose:!0}),d.value=!1,t?L.push({name:"MeleeWeapons"}):A(!0);else throw s.status}catch(s){s===401?v.error("not authorized"):v.error(p("AnErrorOccurred")),x.value=`${s}`,d.value=!1}},W=async(r,t=!1)=>{d.value=!0,x.value=null;let a=new FormData;c.value&&t&&a.append("ids",c.value.components.map(s=>s.id.toString()).join(","));try{let s=await fetch(`${M}/me/melee-weapons/components/${r}/delete/`,{method:"DELETE",body:a,headers:R($.value,D.value)}).then(f=>f).catch(()=>new Response(null,{status:400}));if(s.status===204)O({message:p(t?"ComponentsUpdated":"ComponentUpdated"),type:"success",position:"bottom-right",showClose:!0}),d.value=!1,A(!0);else throw s.status}catch(s){s===401?v.error("not authorized"):v.error(p("AnErrorOccurred")),x.value=`${s}`,d.value=!1}},E=(r,t)=>{let a=r.filter(s=>s.era==t);return a!=null&&a.length?a:[]};return J(()=>{A()}),(r,t)=>{const a=m("qp-header"),s=m("el-button"),f=m("el-button-group"),N=m("el-col"),B=m("el-row"),F=m("qp-notfound"),j=m("qp-loading"),T=Z("loading");return!w.value&&!b.value&&c.value?(e(),n("div",ae,[g(a,{title:c.value.name,"page-type":"weapon"},null,8,["title"]),g(B,{class:"qp-weapons-detail"},{default:h(()=>[g(N,{span:24,md:14,class:"qp-weapons-detail-info"},{default:h(()=>[o("div",le,[o("div",re,[K($)?(e(),C(f,{key:0},{default:h(()=>[c.value.completion<100?(e(),C(s,{key:0,onClick:t[0]||(t[0]=l=>S(0,!0))},{default:h(()=>[o("span",{textContent:_(r.$t("CompleteAll"))},null,8,ie)]),_:1})):(e(),C(s,{key:1,onClick:t[1]||(t[1]=l=>W(0,!0))},{default:h(()=>[o("span",{textContent:_(r.$t("RemoveAll"))},null,8,ce)]),_:1}))]),_:1})):Q("",!0)])]),X((e(),n("ul",ue,[(e(!0),n(k,null,q(c.value.components,(l,I)=>(e(),n("li",{key:`weapon-components-${I}`,class:se(`qp-weapons-detail-components-item${l.is_owned?" qp-isowned":""}`),onClick:u=>l.is_owned?W(l.id):S(l.id)},[o("div",de,[o("div",_e,[g(oe,{component:l.name},null,8,["component"])]),o("div",null,[o("div",me,[o("span",{textContent:_(r.$t(l.name))},null,8,he)]),o("div",ve,[o("div",null,[(e(!0),n(k,null,q(E(l.relics,"Lith"),(u,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",we,", ")):(e(),n("span",fe,"Lith : ")),o("span",{textContent:_(u.name)},null,8,ye)]))),128))]),o("div",null,[(e(!0),n(k,null,q(E(l.relics,"Meso"),(u,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",ge,", ")):(e(),n("span",Ce,"Meso : ")),o("span",{textContent:_(u.name)},null,8,ke)]))),128))]),o("div",null,[(e(!0),n(k,null,q(E(l.relics,"Neo"),(u,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",qe,", ")):(e(),n("span",$e,"Neo : ")),o("span",{textContent:_(u.name)},null,8,xe)]))),128))]),o("div",null,[(e(!0),n(k,null,q(E(l.relics,"Axi"),(u,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",Ee,", ")):(e(),n("span",De,"Axi : ")),o("span",{textContent:_(u.name)},null,8,be)]))),128))])])])])],10,pe))),128))])),[[T,d.value]])]),_:1}),g(N,{span:24,md:10,class:"qp-weapons-detail-picture"},{default:h(()=>[o("div",Ae,[o("div",{class:"qp-weapons-detail-img",style:Y(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${c.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):w.value?(e(),C(j,{key:2})):(e(),C(F,{key:1}))}}});const Oe=ne(Me,[["__scopeId","data-v-62785427"]]);export{Oe as default};