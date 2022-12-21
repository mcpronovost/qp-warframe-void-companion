import{d as H,u as P,s as V,a as G,r as g,o as J,g as e,h as n,i as h,w as v,j as o,c as x,t as _,n as K,F as C,k,M as Q,A,H as R,E as f,N as L,f as m,m as X,x as Y,e as Z,v as ee,_ as te}from"./index-e3b9ccf8.js";import{_ as se}from"./WeaponImage.vue_vue_type_script_setup_true_lang-eaff88d5.js";import"./blueprint-b6c1ffa1.js";const ne={key:0,class:"qp-container"},oe={class:"qp-weapons-actions"},ae={class:"qp-weapons-actions-extra"},le=["textContent"],re=["textContent"],ie={class:"qp-weapons-detail-components-list"},ce=["onClick"],pe={class:"qp-weapons-detail-components-item-wrapper"},ue={class:"qp-weapons-detail-components-img"},de={class:"qp-weapons-detail-components-name"},_e=["textContent"],me={class:"qp-weapons-detail-components-relics"},he={key:0},ve={key:1,class:"qp-weapons-detail-components-era"},fe=["textContent"],we={key:0},ye={key:1,class:"qp-weapons-detail-components-era"},ge=["textContent"],Ce={key:0},ke={key:1,class:"qp-weapons-detail-components-era"},qe=["textContent"],$e={key:0},xe={key:1,class:"qp-weapons-detail-components-era"},Ee=["textContent"],be={class:"qp-weapons-detail-image"},De=H({__name:"SecondaryWeaponsDetail",setup(Se){const{t:u}=P(),N=Y(),z=Z(),B=V(),{rat:E,lang:b}=G(B),w=g(!1),d=g(!1),D=g(null),q=g(null),c=g(),S=async(r=!1)=>{r||(w.value=!0),D.value=null;try{let t=await fetch(`${A}/secondary-weapons/${N.params.pk}/`,{method:"GET",headers:R(E.value,b.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(t.status===200){let a=await t.json();c.value=a,w.value=!1}else throw t.status}catch(t){t===401?f.error("not authorized"):f.error(u("AnErrorOccurred")),D.value=`${t}`,w.value=!1}},W=async(r,t=!1)=>{d.value=!0,q.value=null;let a=new FormData;c.value&&t?a.append("id",c.value.components.map(s=>s.id.toString()).join(",")):a.append("id",r.toString());try{let s=await fetch(`${A}/me/secondary-weapons/components/create/`,{method:"POST",body:a,headers:R(E.value,b.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(s.status===201)L({message:u(t?"ComponentsUpdated":"ComponentUpdated"),type:"success",position:"bottom-right",showClose:!0}),d.value=!1,t?z.push({name:"SecondaryWeapons"}):S(!0);else throw s.status}catch(s){s===401?f.error("not authorized"):f.error(u("AnErrorOccurred")),q.value=`${s}`,d.value=!1}},O=async(r,t=!1)=>{d.value=!0,q.value=null;let a=new FormData;c.value&&t&&a.append("ids",c.value.components.map(s=>s.id.toString()).join(","));try{let s=await fetch(`${A}/me/secondary-weapons/components/${r}/delete/`,{method:"DELETE",body:a,headers:R(E.value,b.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(s.status===204)L({message:u(t?"ComponentsUpdated":"ComponentUpdated"),type:"success",position:"bottom-right",showClose:!0}),d.value=!1,S(!0);else throw s.status}catch(s){s===401?f.error("not authorized"):f.error(u("AnErrorOccurred")),q.value=`${s}`,d.value=!1}},$=(r,t)=>{let a=r.filter(s=>s.era==t);return a!=null&&a.length?a:[]};return J(()=>{S()}),(r,t)=>{const a=m("qp-header"),s=m("el-button"),y=m("el-button-group"),U=m("el-col"),F=m("el-row"),M=m("qp-notfound"),j=m("qp-loading"),T=X("loading");return!w.value&&!D.value&&c.value?(e(),n("div",ne,[h(a,{title:c.value.name,"page-type":"weapon"},null,8,["title"]),h(F,{class:"qp-weapons-detail"},{default:v(()=>[h(U,{span:24,md:14,class:"qp-weapons-detail-info"},{default:v(()=>[o("div",oe,[o("div",ae,[h(y,null,{default:v(()=>[c.value.completion<100?(e(),x(s,{key:0,onClick:t[0]||(t[0]=l=>W(0,!0))},{default:v(()=>[o("span",{textContent:_(r.$t("CompleteAll"))},null,8,le)]),_:1})):(e(),x(s,{key:1,onClick:t[1]||(t[1]=l=>O(0,!0))},{default:v(()=>[o("span",{textContent:_(r.$t("RemoveAll"))},null,8,re)]),_:1}))]),_:1})])]),K((e(),n("ul",ie,[(e(!0),n(C,null,k(c.value.components,(l,I)=>(e(),n("li",{key:`weapon-components-${I}`,class:ee(`qp-weapons-detail-components-item${l.is_owned?" qp-isowned":""}`),onClick:p=>l.is_owned?O(l.id):W(l.id)},[o("div",pe,[o("div",ue,[h(se,{component:l.name},null,8,["component"])]),o("div",null,[o("div",de,[o("span",{textContent:_(r.$t(l.name))},null,8,_e)]),o("div",me,[o("div",null,[(e(!0),n(C,null,k($(l.relics,"Lith"),(p,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",he,", ")):(e(),n("span",ve,"Lith : ")),o("span",{textContent:_(p.name)},null,8,fe)]))),128))]),o("div",null,[(e(!0),n(C,null,k($(l.relics,"Meso"),(p,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",we,", ")):(e(),n("span",ye,"Meso : ")),o("span",{textContent:_(p.name)},null,8,ge)]))),128))]),o("div",null,[(e(!0),n(C,null,k($(l.relics,"Neo"),(p,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",Ce,", ")):(e(),n("span",ke,"Neo : ")),o("span",{textContent:_(p.name)},null,8,qe)]))),128))]),o("div",null,[(e(!0),n(C,null,k($(l.relics,"Axi"),(p,i)=>(e(),n("span",{key:`component-relics-${i}`},[i>0?(e(),n("span",$e,", ")):(e(),n("span",xe,"Axi : ")),o("span",{textContent:_(p.name)},null,8,Ee)]))),128))])])])])],10,ce))),128))])),[[T,d.value]])]),_:1}),h(U,{span:24,md:10,class:"qp-weapons-detail-picture"},{default:v(()=>[o("div",be,[o("div",{class:"qp-weapons-detail-img",style:Q(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${c.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):w.value?(e(),x(j,{key:2})):(e(),x(M,{key:1}))}}});const Oe=te(De,[["__scopeId","data-v-12ef590b"]]);export{Oe as default};