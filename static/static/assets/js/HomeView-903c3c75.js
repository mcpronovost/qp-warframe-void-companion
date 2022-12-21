import{d as oe,u as re,s as ie,a as ce,r as p,o as ue,b as de,c as a,w as i,e as pe,A as F,H as G,E as b,f as m,g as e,h as _,i as c,j as t,t as v,k as I,F as j,l as P,T as _e,m as w,W as me,n as ve,p as ge,q as r,_ as he}from"./index-a1b3c409.js";import{i as fe,a as we,b as ke,c as ye}from"./relic_axi-05cc5723.js";import{i as Ce}from"./blueprint-b6c1ffa1.js";import{i as be,a as qe,b as $e}from"./systems-8cdc0256.js";import{i as xe,a as Re,b as Le,c as ze,d as Ee,e as Ae,f as Se,g as De,h as Ue}from"./prime_upperlimb-e05cfcd9.js";const Ve={key:0,class:"qp-container"},Be={class:"qp-relics-actions"},Ne={class:"qp-relics-actions-extra"},We=["textContent"],Oe={class:"qp-relics-actions-era"},Te=["textContent"],He=["textContent"],Me=["textContent"],Fe=["textContent"],Ge=["textContent"],Ie=["onClick"],je={class:"qp-relics-item-wrapper"},Pe={class:"qp-relics-image"},Je={class:"qp-relics-name"},Ke=["textContent"],Qe={key:0,class:"qp-relics-components-count"},Xe=["textContent"],Ye={class:"qp-relics-rarities"},Ze={key:0,class:"qp-relics-rarities-gold"},es={key:1,class:"qp-relics-rarities-silver"},ss={key:2,class:"qp-relics-rarities-bronze"},ts=["textContent"],ns={key:0,class:"qp-relics-drawer-components-list"},ls=["onClick"],as={class:"qp-relics-drawer-components-item-wrapper"},os={class:"qp-relics-drawer-components-img"},rs={class:"qp-relics-drawer-components-name"},is=["textContent"],cs={class:"qp-relics-drawer-rarities"},us={key:0,class:"qp-relics-drawer-rarities-gold"},ds={key:1,class:"qp-relics-drawer-rarities-silver"},ps={key:2,class:"qp-relics-drawer-rarities-bronze"},_s=oe({__name:"HomeView",setup(ms){const{t:$}=re(),J=pe(),K=ie(),{rat:L,lang:E,slug:A}=ce(K),q=p(!1),g=p(!1),x=p(!1),z=p(null),S=p(null),R=p(!1),y=p(null),Q=p([]),D=p([]),U=p(1),V=p(1),B=p(0),N=p(window.innerWidth),k=async(u,n,h=!1)=>{h?g.value=!0:q.value=!0,z.value=null;let C=u?`?page=${u}`:"?page=1";C+=n?`&era=${n}`:"";try{let d=await fetch(`${F}/me/relics/${C}`,{method:"GET",headers:G(L.value,E.value)}).then(f=>f).catch(()=>new Response(null,{status:400}));if(d.status===200){let f=await d.json();B.value=f.count,V.value=f.size,Q.value=f.results,D.value=f.results,q.value=!1,g.value=!1}else throw d.status}catch(d){d===401?b.error("not authorized"):b.error($("AnErrorOccurred")),z.value=`${d}`,q.value=!1,g.value=!1}},X=(u=null)=>{y.value=u,R.value=!0},W=()=>{R.value=!1,y.value=null},O=()=>{N.value=window.innerWidth},Y=async u=>{x.value=!0,S.value=null;let n=new FormData;n.append("id",u.toString());try{let h=await fetch(`${F}/me/warframes/components/create/`,{method:"POST",body:n,headers:G(L.value,E.value)}).then(C=>C).catch(()=>new Response(null,{status:400}));if(h.status===201)b.success($("ComponentUpdated")),x.value=!1,W(),k(null,null);else throw h.status}catch(h){h===401?b.error("not authorized"):b.error($("AnErrorOccurred")),S.value=`${h}`,x.value=!1}},Z=()=>{console.log(A),navigator.clipboard.writeText(`${me}/u/${A.value}`),b.success($("Sharelinkcopiedtoclipboard"))};return ue(()=>{L.value?(k(null,null),window.addEventListener("resize",O)):J.push({name:"AuthLogin"})}),de(()=>{window.removeEventListener("resize",O)}),(u,n)=>{const h=m("qp-header"),C=m("el-icon"),d=m("el-button"),f=m("el-button-group"),o=m("el-image"),T=m("el-col"),ee=m("el-pagination"),se=m("el-row"),te=m("el-drawer"),ne=m("qp-notfound"),le=m("qp-loading"),ae=m("qp-page"),H=ve("loading");return e(),a(ae,null,{default:i(()=>[!q.value&&!z.value?(e(),_("div",Ve,[c(h,{title:u.$t("Relics"),"page-type":"relics"},null,8,["title"]),t("div",Be,[t("div",Ne,[c(f,null,{default:i(()=>[c(d,{onClick:n[0]||(n[0]=s=>Z())},{default:i(()=>[c(C,{class:"mdi mdi-share-variant"}),t("span",{textContent:v(u.$t("Share"))},null,8,We)]),_:1})]),_:1})]),t("div",Oe,[c(f,null,{default:i(()=>[c(d,{disabled:g.value,onClick:n[1]||(n[1]=s=>k(null,null,!0))},{default:i(()=>[t("span",{textContent:v(u.$t("All"))},null,8,Te)]),_:1},8,["disabled"]),c(d,{disabled:g.value,onClick:n[2]||(n[2]=s=>k(null,"Lith",!0))},{default:i(()=>[t("span",{textContent:v(u.$t("Lith"))},null,8,He)]),_:1},8,["disabled"]),c(d,{disabled:g.value,onClick:n[3]||(n[3]=s=>k(null,"Meso",!0))},{default:i(()=>[t("span",{textContent:v(u.$t("Meso"))},null,8,Me)]),_:1},8,["disabled"]),c(d,{disabled:g.value,onClick:n[4]||(n[4]=s=>k(null,"Neo",!0))},{default:i(()=>[t("span",{textContent:v(u.$t("Neo"))},null,8,Fe)]),_:1},8,["disabled"]),c(d,{disabled:g.value,onClick:n[5]||(n[5]=s=>k(null,"Axi",!0))},{default:i(()=>[t("span",{textContent:v(u.$t("Axi"))},null,8,Ge)]),_:1},8,["disabled"])]),_:1})])]),I((e(),a(se,{class:"qp-relics-list"},{default:i(()=>[c(_e,{name:"list",mode:"out-in"},{default:i(()=>[(e(!0),_(j,null,P(D.value,(s,l)=>(e(),a(T,{key:`relics-${l}`,span:12,sm:8,md:6,lg:4,class:"qp-relics-col"},{default:i(()=>[t("div",{class:"qp-relics-item",onClick:M=>X(s)},[t("div",je,[t("div",Pe,[c(ge,null,{default:i(()=>[s.era=="Lith"?(e(),a(o,{key:0,src:r(fe)},null,8,["src"])):s.era=="Meso"?(e(),a(o,{key:1,src:r(we)},null,8,["src"])):s.era=="Neo"?(e(),a(o,{key:2,src:r(ke)},null,8,["src"])):s.era=="Axi"?(e(),a(o,{key:3,src:r(ye)},null,8,["src"])):w("",!0)]),_:2},1024)]),t("div",Je,[t("span",{textContent:v(`${s.era} ${s.name}`)},null,8,Ke)]),s.components.length>1?(e(),_("div",Qe,[t("span",{textContent:v(`x${s.components.length}`)},null,8,Xe)])):w("",!0),t("div",Ye,[s.rarities.gold?(e(),_("span",Ze)):w("",!0),s.rarities.silver?(e(),_("span",es)):w("",!0),s.rarities.bronze?(e(),_("span",ss)):w("",!0)])])],8,Ie)]),_:2},1024))),128))]),_:1}),c(T,null,{default:i(()=>[c(ee,{background:"","hide-on-single-page":"",layout:"prev, pager, next","current-page":U.value,"onUpdate:current-page":n[6]||(n[6]=s=>U.value=s),"page-size":V.value,total:B.value,onCurrentChange:k},null,8,["current-page","page-size","total"])]),_:1})]),_:1})),[[H,g.value]]),c(te,{modelValue:R.value,"onUpdate:modelValue":n[7]||(n[7]=s=>R.value=s),direction:"rtl",size:N.value<992?"90%":"30%","before-close":W},{header:i(()=>[y.value?(e(),_("span",{key:0,class:"el-drawer__title",textContent:v(`${y.value.era} ${y.value.name}`)},null,8,ts)):w("",!0)]),default:i(()=>{var s;return[t("div",null,[(s=y.value)!=null&&s.components?I((e(),_("ul",ns,[(e(!0),_(j,null,P(y.value.components,(l,M)=>(e(),_("li",{key:`warframe-components-${M}`,class:"qp-relics-drawer-components-item",onClick:vs=>l.type=="warframe"?Y(l.id):""},[t("div",as,[t("div",os,[l.component=="blueprint"?(e(),a(o,{key:0,src:r(Ce)},null,8,["src"])):l.component=="chassis"?(e(),a(o,{key:1,src:r(be)},null,8,["src"])):l.component=="neuroptics"?(e(),a(o,{key:2,src:r(qe)},null,8,["src"])):l.component=="systems"?(e(),a(o,{key:3,src:r($e)},null,8,["src"])):l.component=="barrel"?(e(),a(o,{key:4,src:r(xe)},null,8,["src"])):l.component=="blade"?(e(),a(o,{key:5,src:r(Re)},null,8,["src"])):l.component=="grip"?(e(),a(o,{key:6,src:r(Le)},null,8,["src"])):l.component=="handle"?(e(),a(o,{key:7,src:r(ze)},null,8,["src"])):l.component=="lowerlimb"?(e(),a(o,{key:8,src:r(Ee)},null,8,["src"])):l.component=="receiver"?(e(),a(o,{key:9,src:r(Ae)},null,8,["src"])):l.component=="stock"?(e(),a(o,{key:10,src:r(Se)},null,8,["src"])):l.component=="string"?(e(),a(o,{key:11,src:r(De)},null,8,["src"])):l.component=="upperlimb"?(e(),a(o,{key:12,src:r(Ue)},null,8,["src"])):w("",!0)]),t("div",null,[t("div",rs,[t("span",{textContent:v(l.name)},null,8,is)]),t("div",cs,[l.percent<10?(e(),_("span",us)):l.percent>9&&l.percent<20?(e(),_("span",ds)):l.percent>19?(e(),_("span",ps)):w("",!0)])])])],8,ls))),128))])),[[H,x.value]]):w("",!0)])]}),_:1},8,["modelValue","size"])])):q.value?(e(),a(le,{key:2})):(e(),a(ne,{key:1}))]),_:1})}}});const ys=he(_s,[["__scopeId","data-v-5b1ef430"]]);export{ys as default};
