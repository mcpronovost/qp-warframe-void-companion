import{d as T,u as I,s as H,a as V,r as g,o as G,g as e,h as s,i as v,w as h,j as n,c as x,t as _,k as J,F as k,l as C,M as K,A as R,H as S,E as p,f as m,n as Q,x as X,e as Y,v as Z,_ as ee}from"./index-708ca2a2.js";import{_ as te}from"./WeaponImage.vue_vue_type_script_setup_true_lang-c08271b8.js";import"./blueprint-b6c1ffa1.js";import"./prime_upperlimb-e05cfcd9.js";const se={key:0,class:"qp-container"},ne={class:"qp-weapons-actions"},ae={class:"qp-weapons-actions-extra"},oe=["textContent"],le=["textContent"],re={class:"qp-weapons-detail-components-list"},ie=["onClick"],ce={class:"qp-weapons-detail-components-item-wrapper"},ue={class:"qp-weapons-detail-components-img"},pe={class:"qp-weapons-detail-components-name"},de=["textContent"],_e={class:"qp-weapons-detail-components-relics"},me={key:0},ve={key:1,class:"qp-weapons-detail-components-era"},he=["textContent"],we={key:0},fe={key:1,class:"qp-weapons-detail-components-era"},ye=["textContent"],ge={key:0},ke={key:1,class:"qp-weapons-detail-components-era"},Ce=["textContent"],qe={key:0},$e={key:1,class:"qp-weapons-detail-components-era"},xe=["textContent"],Ee={class:"qp-weapons-detail-image"},De=T({__name:"PrimaryWeaponsDetail",setup(Ae){const{t:w}=I(),P=X(),z=Y(),B=H(),{rat:E,lang:D}=V(B),f=g(!1),d=g(!1),A=g(null),q=g(null),c=g(),b=async(r=!1)=>{r||(f.value=!0),A.value=null;try{let a=await fetch(`${R}/primary-weapons/${P.params.pk}/`,{method:"GET",headers:S(E.value,D.value)}).then(o=>o).catch(()=>new Response(null,{status:400}));if(a.status===200){let o=await a.json();c.value=o,f.value=!1}else throw a.status}catch(a){a===401?p.error("not authorized"):p.error(w("AnErrorOccurred")),A.value=`${a}`,f.value=!1}},W=async(r,a=!1)=>{d.value=!0,q.value=null;let o=new FormData;c.value&&a?o.append("id",c.value.components.map(t=>t.id.toString()).join(",")):o.append("id",r.toString());try{let t=await fetch(`${R}/me/primary-weapons/components/create/`,{method:"POST",body:o,headers:S(E.value,D.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(t.status===201)p.success(w("ComponentsUpdated")),d.value=!1,a?z.push({name:"PrimaryWeapons"}):b(!0);else throw t.status}catch(t){t===401?p.error("not authorized"):p.error(w("AnErrorOccurred")),q.value=`${t}`,d.value=!1}},O=async(r,a=!1)=>{d.value=!0,q.value=null;let o=new FormData;c.value&&a&&o.append("ids",c.value.components.map(t=>t.id.toString()).join(","));try{let t=await fetch(`${R}/me/primary-weapons/components/${r}/delete/`,{method:"DELETE",body:o,headers:S(E.value,D.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(t.status===204)p.success(w("ComponentUpdated")),d.value=!1,b(!0);else throw t.status}catch(t){t===401?p.error("not authorized"):p.error(w("AnErrorOccurred")),q.value=`${t}`,d.value=!1}},$=(r,a)=>{let o=r.filter(t=>t.era==a);return o!=null&&o.length?o:[]};return G(()=>{b()}),(r,a)=>{const o=m("qp-header"),t=m("el-button"),y=m("el-button-group"),L=m("el-col"),F=m("el-row"),M=m("qp-notfound"),U=m("qp-loading"),j=Q("loading");return!f.value&&!A.value&&c.value?(e(),s("div",se,[v(o,{title:c.value.name,"page-type":"weapon"},null,8,["title"]),v(F,{class:"qp-weapons-detail"},{default:h(()=>[v(L,{span:24,md:14,class:"qp-weapons-detail-info"},{default:h(()=>[n("div",ne,[n("div",ae,[v(y,null,{default:h(()=>[c.value.completion<100?(e(),x(t,{key:0,onClick:a[0]||(a[0]=l=>W(0,!0))},{default:h(()=>[n("span",{textContent:_(r.$t("CompleteAll"))},null,8,oe)]),_:1})):(e(),x(t,{key:1,onClick:a[1]||(a[1]=l=>O(0,!0))},{default:h(()=>[n("span",{textContent:_(r.$t("RemoveAll"))},null,8,le)]),_:1}))]),_:1})])]),J((e(),s("ul",re,[(e(!0),s(k,null,C(c.value.components,(l,N)=>(e(),s("li",{key:`weapon-components-${N}`,class:Z(`qp-weapons-detail-components-item${l.is_owned?" qp-isowned":""}`),onClick:u=>l.is_owned?O(l.id):W(l.id)},[n("div",ce,[n("div",ue,[v(te,{component:l.name},null,8,["component"])]),n("div",null,[n("div",pe,[n("span",{textContent:_(r.$t(l.name))},null,8,de)]),n("div",_e,[n("div",null,[(e(!0),s(k,null,C($(l.relics,"Lith"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",me,", ")):(e(),s("span",ve,"Lith : ")),n("span",{textContent:_(u.name)},null,8,he)]))),128))]),n("div",null,[(e(!0),s(k,null,C($(l.relics,"Meso"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",we,", ")):(e(),s("span",fe,"Meso : ")),n("span",{textContent:_(u.name)},null,8,ye)]))),128))]),n("div",null,[(e(!0),s(k,null,C($(l.relics,"Neo"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",ge,", ")):(e(),s("span",ke,"Neo : ")),n("span",{textContent:_(u.name)},null,8,Ce)]))),128))]),n("div",null,[(e(!0),s(k,null,C($(l.relics,"Axi"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",qe,", ")):(e(),s("span",$e,"Axi : ")),n("span",{textContent:_(u.name)},null,8,xe)]))),128))])])])])],10,ie))),128))])),[[j,d.value]])]),_:1}),v(L,{span:24,md:10,class:"qp-weapons-detail-picture"},{default:h(()=>[n("div",Ee,[n("div",{class:"qp-weapons-detail-img",style:K(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${c.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):f.value?(e(),x(U,{key:2})):(e(),x(M,{key:1}))}}});const Oe=ee(De,[["__scopeId","data-v-40d5cd31"]]);export{Oe as default};
