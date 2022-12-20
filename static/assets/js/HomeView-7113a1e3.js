import{d as Z,u as ee,s as te,a as se,r as m,o as ne,b as oe,c as u,w as i,e as le,A as T,H as U,E as y,f as _,g as e,h as c,i as p,j as n,t as v,T as ae,F as W,k as H,l as h,m as re,n as ie,p as ce,q as f,_ as ue}from"./index-b795a324.js";import{i as de,a as pe,b as _e,c as me}from"./relic_axi-05cc5723.js";import{i as ve,a as he,b as fe,c as we}from"./systems-5ba34008.js";const ge={key:0,class:"qp-container"},ke={class:"qp-relics-actions-era"},ye=["textContent"],Ce=["textContent"],qe=["textContent"],$e=["textContent"],xe=["textContent"],Re=["onClick"],be={class:"qp-relics-item-wrapper"},Ee={class:"qp-relics-image"},Le={class:"qp-relics-name"},Ae=["textContent"],Oe={key:0,class:"qp-relics-components-count"},ze=["textContent"],De={class:"qp-relics-rarities"},Ne={key:0,class:"qp-relics-rarities-gold"},Ve={key:1,class:"qp-relics-rarities-silver"},Be={key:2,class:"qp-relics-rarities-bronze"},Me=["textContent"],Se={key:0,class:"qp-relics-drawer-components-list"},Te=["onClick"],Ue={class:"qp-relics-drawer-components-item-wrapper"},We={class:"qp-relics-drawer-components-img"},He={class:"qp-relics-drawer-components-name"},je=["textContent"],Fe={class:"qp-relics-drawer-rarities"},Ie={key:0,class:"qp-relics-drawer-rarities-gold"},Ge={key:1,class:"qp-relics-drawer-rarities-silver"},Pe={key:2,class:"qp-relics-drawer-rarities-bronze"},Je=Z({__name:"HomeView",setup(Ke){const{t:O}=ee(),j=le(),F=te(),{rat:R,lang:z,id:Qe}=se(F),g=m(!1),C=m(!1),b=m(null),D=m(null),q=m(!1),w=m(null),E=m([]),$=m([]),N=m(window.innerWidth),V=async(o=null)=>{g.value=!0,b.value=null;let s="";o&&(s=`?era=${o}`);let l=await fetch(`${T}/me/relics/${s}`,{method:"GET",headers:U(R.value,z.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(l.status===200){let a=await l.json();const x=["Lith","Meso","Neo","Axi"],d=a.results.sort((L,A)=>x.indexOf(L.era)-x.indexOf(A.era));E.value=d,$.value=d,g.value=!1}else l.status===401?y.error("not authorized"):y.error("AnErrorOccurred"),b.value=`${l.status}`,g.value=!1},I=(o,s)=>{let l=o.filter(a=>a.era==s);return l!=null&&l.length?l:[]},k=(o=null)=>{o?$.value=I(E.value,o):$.value=E.value},G=(o=null)=>{w.value=o,q.value=!0},B=()=>{q.value=!1,w.value=null},M=()=>{N.value=window.innerWidth},P=async o=>{C.value=!0,D.value=null;let s=new FormData;s.append("id",o.toString());try{let l=await fetch(`${T}/me/warframes/components/create/`,{method:"POST",body:s,headers:U(R.value,z.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(l.status===201)y.success(O("ComponentUpdated")),C.value=!1,B(),V();else throw l.status}catch(l){l===401?y.error("not authorized"):y.error(O("AnErrorOccurred")),D.value=`${l}`,C.value=!1}};return ne(()=>{R.value?(V(),window.addEventListener("resize",M)):j.push({name:"AuthLogin"})}),oe(()=>{window.removeEventListener("resize",M)}),(o,s)=>{const l=_("qp-header"),a=_("el-button"),x=_("el-button-group"),d=_("el-image"),L=_("el-col"),A=_("el-row"),J=_("el-drawer"),K=_("qp-notfound"),Q=_("qp-loading"),X=_("qp-page"),Y=ie("loading");return e(),u(X,null,{default:i(()=>[!g.value&&!b.value?(e(),c("div",ge,[p(l,{title:o.$t("Relics"),"page-type":"relics"},null,8,["title"]),n("div",ke,[p(x,null,{default:i(()=>[p(a,{onClick:s[0]||(s[0]=t=>k())},{default:i(()=>[n("span",{textContent:v(o.$t("All"))},null,8,ye)]),_:1}),p(a,{onClick:s[1]||(s[1]=t=>k("Lith"))},{default:i(()=>[n("span",{textContent:v(o.$t("Lith"))},null,8,Ce)]),_:1}),p(a,{onClick:s[2]||(s[2]=t=>k("Meso"))},{default:i(()=>[n("span",{textContent:v(o.$t("Meso"))},null,8,qe)]),_:1}),p(a,{onClick:s[3]||(s[3]=t=>k("Neo"))},{default:i(()=>[n("span",{textContent:v(o.$t("Neo"))},null,8,$e)]),_:1}),p(a,{onClick:s[4]||(s[4]=t=>k("Axi"))},{default:i(()=>[n("span",{textContent:v(o.$t("Axi"))},null,8,xe)]),_:1})]),_:1})]),p(A,{class:"qp-relics-list"},{default:i(()=>[p(ae,{name:"list",mode:"out-in"},{default:i(()=>[(e(!0),c(W,null,H($.value,(t,r)=>(e(),u(L,{key:`relics-${r}`,span:12,sm:8,md:6,lg:4,class:"qp-relics-col"},{default:i(()=>[n("div",{class:"qp-relics-item",onClick:S=>G(t)},[n("div",be,[n("div",Ee,[p(ce,null,{default:i(()=>[t.era=="Lith"?(e(),u(d,{key:0,src:f(de)},null,8,["src"])):t.era=="Meso"?(e(),u(d,{key:1,src:f(pe)},null,8,["src"])):t.era=="Neo"?(e(),u(d,{key:2,src:f(_e)},null,8,["src"])):t.era=="Axi"?(e(),u(d,{key:3,src:f(me)},null,8,["src"])):h("",!0)]),_:2},1024)]),n("div",Le,[n("span",{textContent:v(`${t.era} ${t.name}`)},null,8,Ae)]),t.components.length>1?(e(),c("div",Oe,[n("span",{textContent:v(`x${t.components.length}`)},null,8,ze)])):h("",!0),n("div",De,[t.rarities.gold?(e(),c("span",Ne)):h("",!0),t.rarities.silver?(e(),c("span",Ve)):h("",!0),t.rarities.bronze?(e(),c("span",Be)):h("",!0)])])],8,Re)]),_:2},1024))),128))]),_:1})]),_:1}),p(J,{modelValue:q.value,"onUpdate:modelValue":s[5]||(s[5]=t=>q.value=t),direction:"rtl",size:N.value<992?"90%":"30%","before-close":B},{header:i(()=>[w.value?(e(),c("span",{key:0,class:"el-drawer__title",textContent:v(`${w.value.era} ${w.value.name}`)},null,8,Me)):h("",!0)]),default:i(()=>{var t;return[n("div",null,[(t=w.value)!=null&&t.components?re((e(),c("ul",Se,[(e(!0),c(W,null,H(w.value.components,(r,S)=>(e(),c("li",{key:`warframe-components-${S}`,class:"qp-relics-drawer-components-item",onClick:Xe=>r.type=="warframe"?P(r.id):""},[n("div",Ue,[n("div",We,[r.component=="blueprint"?(e(),u(d,{key:0,src:f(ve)},null,8,["src"])):r.component=="chassis"?(e(),u(d,{key:1,src:f(he)},null,8,["src"])):r.component=="neuroptics"?(e(),u(d,{key:2,src:f(fe)},null,8,["src"])):r.component=="systems"?(e(),u(d,{key:3,src:f(we)},null,8,["src"])):h("",!0)]),n("div",null,[n("div",He,[n("span",{textContent:v(r.name)},null,8,je)]),n("div",Fe,[r.percent<10?(e(),c("span",Ie)):r.percent>9&&r.percent<20?(e(),c("span",Ge)):r.percent>19?(e(),c("span",Pe)):h("",!0)])])])],8,Te))),128))])),[[Y,C.value]]):h("",!0)])]}),_:1},8,["modelValue","size"])])):g.value?(e(),u(Q,{key:2})):(e(),u(K,{key:1}))]),_:1})}}});const tt=ue(Je,[["__scopeId","data-v-a0136871"]]);export{tt as default};