import{d as I,u as V,s as j,a as H,r as v,o as P,g as e,h as t,i as C,w as b,m as G,F as w,k as y,j as n,K,c as m,A as L,H as O,E as u,f as p,n as J,v as Q,L as X,q as $,l as Y,t as g,_ as Z}from"./index-b795a324.js";import{i as ee,a as te,b as se,c as ae}from"./systems-5ba34008.js";const ne={key:0,class:"qp-container"},re={class:"qp-warframes-detail-components-list"},oe=["onClick"],le={class:"qp-warframes-detail-components-item-wrapper"},ie={class:"qp-warframes-detail-components-img"},ce={class:"qp-warframe-detail-components-name"},ue=["textContent"],de={class:"qp-warframe-detail-components-relics"},me={key:0},pe={key:1,class:"qp-warframe-detail-components-era"},_e=["textContent"],fe={key:0},he={key:1,class:"qp-warframe-detail-components-era"},ve=["textContent"],we={key:0},ye={key:1,class:"qp-warframe-detail-components-era"},ge=["textContent"],ke={key:0},qe={key:1,class:"qp-warframe-detail-components-era"},Ce=["textContent"],$e={class:"qp-warframes-detail-image"},xe=I({__name:"WarframesDetail",setup(Ee){const{t:_}=V(),W=Q(),B=j(),{rat:x,lang:E,id:De}=H(B),f=v(!1),d=v(!1),D=v(null),k=v(null),h=v(),A=async(l=!1)=>{l||(f.value=!0),D.value=null;try{let s=await fetch(`${L}/warframes/${W.params.pk}/`,{method:"GET",headers:O(x.value,E.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(s.status===200){let a=await s.json();h.value=a,f.value=!1}else throw s.status}catch(s){s===401?u.error("not authorized"):u.error(_("AnErrorOccurred")),D.value=`${s}`,f.value=!1}},N=async l=>{d.value=!0,k.value=null;let s=new FormData;s.append("id",l.toString());try{let a=await fetch(`${L}/me/warframes/components/create/`,{method:"POST",body:s,headers:O(x.value,E.value)}).then(i=>i).catch(()=>new Response(null,{status:400}));if(a.status===201)u.success(_("ComponentUpdated")),d.value=!1,A(!0);else throw a.status}catch(a){a===401?u.error("not authorized"):u.error(_("AnErrorOccurred")),k.value=`${a}`,d.value=!1}},R=async l=>{d.value=!0,k.value=null;try{let s=await fetch(`${L}/me/warframes/components/${l}/delete/`,{method:"DELETE",headers:O(x.value,E.value)}).then(a=>a).catch(()=>new Response(null,{status:400}));if(s.status===204)u.success(_("ComponentUpdated")),d.value=!1,A(!0);else throw s.status}catch(s){s===401?u.error("not authorized"):u.error(_("AnErrorOccurred")),k.value=`${s}`,d.value=!1}},q=(l,s)=>{let a=l.filter(i=>i.era==s);return a!=null&&a.length?a:[]};return P(()=>{A()}),(l,s)=>{const a=p("qp-header"),i=p("el-image"),S=p("el-col"),z=p("el-row"),U=p("qp-notfound"),F=p("qp-loading"),M=J("loading");return!f.value&&!D.value&&h.value?(e(),t("div",ne,[C(a,{title:h.value.name,"page-type":"warframe"},null,8,["title"]),C(z,{class:"qp-warframes-detail"},{default:b(()=>[C(S,{span:24,md:14,class:"qp-warframes-detail-info"},{default:b(()=>[G((e(),t("ul",re,[(e(!0),t(w,null,y(h.value.components,(r,T)=>(e(),t("li",{key:`warframe-components-${T}`,class:X(`qp-warframes-detail-components-item${r.is_owned?" qp-isowned":""}`),onClick:c=>r.is_owned?R(r.id):N(r.id)},[n("div",le,[n("div",ie,[r.name=="blueprint"?(e(),m(i,{key:0,src:$(ee)},null,8,["src"])):r.name=="chassis"?(e(),m(i,{key:1,src:$(te)},null,8,["src"])):r.name=="neuroptics"?(e(),m(i,{key:2,src:$(se)},null,8,["src"])):r.name=="systems"?(e(),m(i,{key:3,src:$(ae)},null,8,["src"])):Y("",!0)]),n("div",null,[n("div",ce,[n("span",{textContent:g(l.$t(r.name))},null,8,ue)]),n("div",de,[n("div",null,[(e(!0),t(w,null,y(q(r.relics,"Lith"),(c,o)=>(e(),t("span",{key:`component-relics-${o}`},[o>0?(e(),t("span",me,", ")):(e(),t("span",pe,"Lith : ")),n("span",{textContent:g(c.name)},null,8,_e)]))),128))]),n("div",null,[(e(!0),t(w,null,y(q(r.relics,"Meso"),(c,o)=>(e(),t("span",{key:`component-relics-${o}`},[o>0?(e(),t("span",fe,", ")):(e(),t("span",he,"Meso : ")),n("span",{textContent:g(c.name)},null,8,ve)]))),128))]),n("div",null,[(e(!0),t(w,null,y(q(r.relics,"Neo"),(c,o)=>(e(),t("span",{key:`component-relics-${o}`},[o>0?(e(),t("span",we,", ")):(e(),t("span",ye,"Neo : ")),n("span",{textContent:g(c.name)},null,8,ge)]))),128))]),n("div",null,[(e(!0),t(w,null,y(q(r.relics,"Axi"),(c,o)=>(e(),t("span",{key:`component-relics-${o}`},[o>0?(e(),t("span",ke,", ")):(e(),t("span",qe,"Axi : ")),n("span",{textContent:g(c.name)},null,8,Ce)]))),128))])])])])],10,oe))),128))])),[[M,d.value]])]),_:1}),C(S,{span:24,md:10,class:"qp-warframes-detail-picture"},{default:b(()=>[n("div",$e,[n("div",{class:"qp-warframes-detail-img",style:K(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${h.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):f.value?(e(),m(F,{key:2})):(e(),m(U,{key:1}))}}});const Le=Z(xe,[["__scopeId","data-v-0a317b86"]]);export{Le as default};