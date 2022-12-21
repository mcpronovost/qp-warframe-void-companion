import{d as j,u as G,s as O,a as P,r as i,o as Y,g as o,h as y,i as p,j as e,w as l,q as M,c,t as f,F as J,k as K,T as Q,A as X,H as Z,E as z,f as r,m as ee,n as te,M as D,l as se,_ as oe}from"./index-e3b9ccf8.js";import{q as ne}from"./index-5c87147b.js";const ae={key:0,class:"qp-container"},le={class:"qp-weapons-actions"},re=["textContent"],ie=["textContent"],ue=["onClick"],pe={class:"qp-weapons-item-wrapper"},ce={class:"qp-weapons-name"},de=["textContent"],_e={key:0,class:"qp-weapons-complete"},me={class:"qp-weapons-completion"},ve={class:"qp-weapons-allcomplete"},fe=["textContent"],ge=j({__name:"MeleeWeaponsList",setup(he){const{t:S}=G(),q=O(),{rat:U,lang:A,hide_completed_warframes:k}=P(q),{doUpdateHideCompletedWarframes:$}=q,d=i(!1),v=i(!1),g=i(null),W=i(1),b=i(1),x=i(0),h=i([]),_=i([]),E=async(t=null,n=!0)=>{n?v.value=!0:d.value=!0,g.value=null;let m=t?`?page=${t}`:"?page=1";try{let a=await fetch(`${X}/melee-weapons/${m}`,{method:"GET",headers:Z(U.value,A.value)}).then(u=>u).catch(()=>new Response(null,{status:400}));if(a.status===200){let u=await a.json();b.value=u.size,x.value=u.count,h.value=u.results,_.value=w(k.value),d.value=!1,v.value=!1}else throw a.status}catch(a){a===401?z.error("not authorized"):z.error(S("AnErrorOccurred")),g.value=`${a}`,d.value=!1,v.value=!1}},w=(t=!1)=>t?h.value.filter(m=>m.completion<100):h.value,B=()=>{$(!1),_.value=w(!1)},F=()=>{$(!0),_.value=w(!0)};return Y(()=>{E(null,!1)}),(t,n)=>{const m=r("qp-header"),a=r("el-button"),u=r("el-button-group"),C=r("el-col"),H=r("el-pagination"),L=r("el-row"),T=r("el-icon"),I=r("qp-notfound"),N=r("qp-loading"),R=ee("loading");return!d.value&&!g.value?(o(),y("div",ae,[p(m,{title:t.$t("MeleeWeapons"),"page-type":"weapons"},null,8,["title"]),e("div",le,[p(u,null,{default:l(()=>[M(k)?(o(),c(a,{key:0,onClick:n[0]||(n[0]=s=>B())},{default:l(()=>[e("span",{textContent:f(t.$t("ShowCompleted"))},null,8,re)]),_:1})):(o(),c(a,{key:1,onClick:n[1]||(n[1]=s=>F())},{default:l(()=>[e("span",{textContent:f(t.$t("HideCompleted"))},null,8,ie)]),_:1}))]),_:1})]),_.value.length?(o(),c(L,{key:0,class:"qp-weapons-list"},{default:l(()=>[p(Q,{name:"list",mode:"out-in"},{default:l(()=>[(o(!0),y(J,null,K(_.value,(s,V)=>te((o(),c(C,{key:`weapons-${V}`,span:12,sm:8,md:6,lg:4},{default:l(()=>[e("div",{class:"qp-weapons-item",onClick:we=>t.$router.push({name:"MeleeWeaponsDetail",params:{pk:s.id,slug:M(ne)(s.name)}})},[e("div",pe,[e("div",{class:"qp-weapons-image",style:D(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${s.image_name}')`)},null,4),e("div",ce,[e("span",{textContent:f(s.name)},null,8,de)]),s.completion==100?(o(),y("div",_e)):se("",!0),e("div",me,[e("div",{class:"qp-weapons-completed",style:D(`width:${s.completion}%;`)},null,4)])])],8,ue)]),_:2},1024)),[[R,v.value]])),128))]),_:1}),p(C,null,{default:l(()=>[p(H,{background:"","hide-on-single-page":"",layout:"prev, pager, next","current-page":W.value,"onUpdate:current-page":n[2]||(n[2]=s=>W.value=s),"page-size":b.value,total:x.value,onCurrentChange:E},null,8,["current-page","page-size","total"])]),_:1})]),_:1})):(o(),c(L,{key:1},{default:l(()=>[p(C,null,{default:l(()=>[e("div",ve,[p(T,{size:"132",class:"mdi mdi-emoticon-happy-outline"}),e("p",{textContent:f(t.$t("YoucompletedallPrimeSecondaryWeapons"))},null,8,fe)])]),_:1})]),_:1}))])):d.value?(o(),c(N,{key:2})):(o(),c(I,{key:1}))}}});const qe=oe(ge,[["__scopeId","data-v-b477931f"]]);export{qe as default};