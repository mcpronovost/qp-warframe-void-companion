import{d as V,u as j,s as G,a as O,r as i,o as Y,g as o,h as C,i as p,j as e,w as l,q as b,c,t as f,F as J,l as K,T as Q,A as X,H as Z,E as z,f as r,n as ee,k as te,M as D,m as se,_ as oe}from"./index-72b60cb1.js";import{q as ne}from"./index-5c87147b.js";const ae={key:0,class:"qp-container"},le={class:"qp-weapons-actions"},re=["textContent"],ie=["textContent"],ue=["onClick"],pe={class:"qp-weapons-item-wrapper"},ce={class:"qp-weapons-name"},de=["textContent"],_e={key:0,class:"qp-weapons-complete"},me={class:"qp-weapons-completion"},ve={class:"qp-weapons-allcomplete"},fe=["textContent"],ge=V({__name:"PrimaryWeaponsList",setup(he){const{t:S}=j(),q=G(),{rat:U,lang:A,hide_completed_warframes:k}=O(q),{doUpdateHideCompletedWarframes:$}=q,d=i(!1),v=i(!1),g=i(null),W=i(1),x=i(1),E=i(0),h=i([]),_=i([]),L=async(t=null,n=!0)=>{n?v.value=!0:d.value=!0,g.value=null;let m=t?`?page=${t}`:"?page=1";try{let a=await fetch(`${X}/primary-weapons/${m}`,{method:"GET",headers:Z(U.value,A.value)}).then(u=>u).catch(()=>new Response(null,{status:400}));if(a.status===200){let u=await a.json();x.value=u.size,E.value=u.count,h.value=u.results,_.value=y(k.value),d.value=!1,v.value=!1}else throw a.status}catch(a){a===401?z.error("not authorized"):z.error(S("AnErrorOccurred")),g.value=`${a}`,d.value=!1,v.value=!1}},y=(t=!1)=>t?h.value.filter(m=>m.completion<100):h.value,B=()=>{$(!1),_.value=y(!1)},F=()=>{$(!0),_.value=y(!0)};return Y(()=>{L(null,!1)}),(t,n)=>{const m=r("qp-header"),a=r("el-button"),u=r("el-button-group"),w=r("el-col"),H=r("el-pagination"),P=r("el-row"),T=r("el-icon"),I=r("qp-notfound"),M=r("qp-loading"),N=ee("loading");return!d.value&&!g.value?(o(),C("div",ae,[p(m,{title:t.$t("PrimaryWeapons"),"page-type":"weapons"},null,8,["title"]),e("div",le,[p(u,null,{default:l(()=>[b(k)?(o(),c(a,{key:0,onClick:n[0]||(n[0]=s=>B())},{default:l(()=>[e("span",{textContent:f(t.$t("ShowCompleted"))},null,8,re)]),_:1})):(o(),c(a,{key:1,onClick:n[1]||(n[1]=s=>F())},{default:l(()=>[e("span",{textContent:f(t.$t("HideCompleted"))},null,8,ie)]),_:1}))]),_:1})]),_.value.length?(o(),c(P,{key:0,class:"qp-weapons-list"},{default:l(()=>[p(Q,{name:"list",mode:"out-in"},{default:l(()=>[(o(!0),C(J,null,K(_.value,(s,R)=>te((o(),c(w,{key:`weapons-${R}`,span:12,sm:8,md:6,lg:4},{default:l(()=>[e("div",{class:"qp-weapons-item",onClick:ye=>t.$router.push({name:"PrimaryWeaponsDetail",params:{pk:s.id,slug:b(ne)(s.name)}})},[e("div",pe,[e("div",{class:"qp-weapons-image",style:D(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${s.image_name}')`)},null,4),e("div",ce,[e("span",{textContent:f(s.name)},null,8,de)]),s.completion==100?(o(),C("div",_e)):se("",!0),e("div",me,[e("div",{class:"qp-weapons-completed",style:D(`width:${s.completion}%;`)},null,4)])])],8,ue)]),_:2},1024)),[[N,v.value]])),128))]),_:1}),p(w,null,{default:l(()=>[p(H,{background:"","hide-on-single-page":"",layout:"prev, pager, next","current-page":W.value,"onUpdate:current-page":n[2]||(n[2]=s=>W.value=s),"page-size":x.value,total:E.value,onCurrentChange:L},null,8,["current-page","page-size","total"])]),_:1})]),_:1})):(o(),c(P,{key:1},{default:l(()=>[p(w,null,{default:l(()=>[e("div",ve,[p(T,{size:"132",class:"mdi mdi-emoticon-happy-outline"}),e("p",{textContent:f(t.$t("YoucompletedallPrimePrimaryWeapons"))},null,8,fe)])]),_:1})]),_:1}))])):d.value?(o(),c(M,{key:2})):(o(),c(I,{key:1}))}}});const qe=oe(ge,[["__scopeId","data-v-544587ea"]]);export{qe as default};
