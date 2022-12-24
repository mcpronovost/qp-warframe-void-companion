import{d as j,u as P,r as t,o as S,b as H,c as v,w as l,A as J,E as D,e as u,v as K,f as i,g as b,h as s,i as m,t as f,n as X,F as Y,l as Z,T as ee,k as L,m as te,_ as le}from"./index-13251ea8.js";import{Q as ne,a as se}from"./RelicItem-ce644bce.js";import"./WeaponImage.vue_vue_type_script_setup_true_lang-b9aabe63.js";import"./systems-5ba34008.js";const oe={key:0,class:"qp-container"},ae={class:"qp-relics-actions-era"},ue=["textContent"],re=["textContent"],ie=["textContent"],de=["textContent"],ce=["textContent"],pe=["textContent"],_e=j({__name:"UserView",setup(ve){const{t:U}=P(),A=K(),g=t(!1),r=t(!1),C=t(null),w=t(!1),_=t(null),k=t(""),N=t([]),h=t([]),y=t(0),x=t(1),q=t(1),R=t(null),z=t(window.innerWidth),d=async(o,e,$=!1)=>{$?r.value=!0:g.value=!0,C.value=null;let c=o?`?page=${o}`:"?page=1";c+=e?`&era=${e}`:"",R.value=e;try{let p=await fetch(`${J}/users/${A.params.slug}/relics/${c}`,{method:"GET"}).then(a=>a).catch(()=>new Response(null,{status:400}));if(p.status===200){let a=await p.json();k.value=a.user,y.value=a.count,x.value=a.size,N.value=a.results,h.value=a.results,g.value=!1,r.value=!1}else throw p.status}catch(p){p===401?D.error("not authorized"):D.error(U("AnErrorOccurred")),C.value=`${p}`,g.value=!1,r.value=!1}},W=(o=null)=>{_.value=o,w.value=!0},E=()=>{w.value=!1,_.value=null},V=()=>{z.value=window.innerWidth};return S(()=>{d(null,null),window.addEventListener("resize",V)}),H(()=>{window.removeEventListener("resize",V)}),(o,e)=>{const $=u("qp-header"),c=u("el-button"),p=u("el-button-group"),a=u("el-col"),B=u("el-pagination"),I=u("el-row"),M=u("el-drawer"),O=u("qp-notfound"),Q=u("qp-loading"),T=u("qp-page"),F=te("loading");return i(),v(T,null,{default:l(()=>[!g.value&&!C.value?(i(),b("div",oe,[s($,{title:o.$t("RelicsOf",[k.value]),"page-type":"relics"},null,8,["title"]),m("div",ae,[s(p,null,{default:l(()=>[s(c,{disabled:r.value,onClick:e[0]||(e[0]=n=>d(null,null,!0))},{default:l(()=>[m("span",{textContent:f(o.$t("All"))},null,8,ue)]),_:1},8,["disabled"]),s(c,{disabled:r.value,onClick:e[1]||(e[1]=n=>d(null,"Lith",!0))},{default:l(()=>[m("span",{textContent:f(o.$t("Lith"))},null,8,re)]),_:1},8,["disabled"]),s(c,{disabled:r.value,onClick:e[2]||(e[2]=n=>d(null,"Meso",!0))},{default:l(()=>[m("span",{textContent:f(o.$t("Meso"))},null,8,ie)]),_:1},8,["disabled"]),s(c,{disabled:r.value,onClick:e[3]||(e[3]=n=>d(null,"Neo",!0))},{default:l(()=>[m("span",{textContent:f(o.$t("Neo"))},null,8,de)]),_:1},8,["disabled"]),s(c,{disabled:r.value,onClick:e[4]||(e[4]=n=>d(null,"Axi",!0))},{default:l(()=>[m("span",{textContent:f(o.$t("Axi"))},null,8,ce)]),_:1},8,["disabled"])]),_:1})]),X((i(),v(I,{class:"qp-relics-list"},{default:l(()=>[s(ee,{name:"list",mode:"out-in"},{default:l(()=>[(i(!0),b(Y,null,Z(h.value,(n,G)=>(i(),v(a,{key:`relics-${G}`,span:12,sm:8,md:6,lg:4,class:"qp-relics-col"},{default:l(()=>[s(se,{relic:n,onClick:me=>W(n)},null,8,["relic","onClick"])]),_:2},1024))),128))]),_:1}),s(a,null,{default:l(()=>[s(B,{background:"","hide-on-single-page":"",layout:"prev, pager, next","current-page":q.value,"onUpdate:current-page":e[5]||(e[5]=n=>q.value=n),"page-size":x.value,total:y.value,onCurrentChange:d},null,8,["current-page","page-size","total"])]),_:1})]),_:1})),[[F,r.value]]),s(M,{modelValue:w.value,"onUpdate:modelValue":e[7]||(e[7]=n=>w.value=n),direction:"rtl",size:z.value<992?"90%":"30%","before-close":E},{header:l(()=>[_.value?(i(),b("span",{key:0,class:"el-drawer__title",textContent:f(`${_.value.era} ${_.value.name}`)},null,8,pe)):L("",!0)]),default:l(()=>[_.value?(i(),v(ne,{key:0,relic:_.value,readonly:!0,onClose:e[6]||(e[6]=n=>{E(),d(null,R.value,!0)})},null,8,["relic"])):L("",!0)]),_:1},8,["modelValue","size"])])):g.value?(i(),v(Q,{key:2})):(i(),v(O,{key:1}))]),_:1})}}});const $e=le(_e,[["__scopeId","data-v-b6d3ec69"]]);export{$e as default};