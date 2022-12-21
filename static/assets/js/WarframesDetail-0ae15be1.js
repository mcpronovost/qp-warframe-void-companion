import{d as H,u as P,s as G,a as J,r as g,o as K,g as e,h as s,i as k,w as v,j as a,c as d,t as f,k as Q,F as C,l as q,M as X,A as W,H as O,E as m,f as p,n as Y,x as Z,e as ee,v as te,q as D,m as se,_ as ae}from"./index-72b60cb1.js";import{i as ne}from"./blueprint-b6c1ffa1.js";import{i as oe,a as re,b as le}from"./systems-8cdc0256.js";const ie={key:0,class:"qp-container"},ce={class:"qp-warframes-actions"},ue={class:"qp-warframes-actions-extra"},de=["textContent"],me=["textContent"],pe={class:"qp-warframes-detail-components-list"},_e=["onClick"],fe={class:"qp-warframes-detail-components-item-wrapper"},ve={class:"qp-warframes-detail-components-img"},he={class:"qp-warframe-detail-components-name"},we=["textContent"],ye={class:"qp-warframe-detail-components-relics"},ge={key:0},ke={key:1,class:"qp-warframe-detail-components-era"},Ce=["textContent"],qe={key:0},$e={key:1,class:"qp-warframe-detail-components-era"},xe=["textContent"],Ee={key:0},De={key:1,class:"qp-warframe-detail-components-era"},be=["textContent"],Ae={key:0},Se={key:1,class:"qp-warframe-detail-components-era"},Re=["textContent"],We={class:"qp-warframes-detail-image"},Oe=H({__name:"WarframesDetail",setup(Be){const{t:h}=P(),z=Z(),F=ee(),M=G(),{rat:b,lang:A,id:Le}=J(M),w=g(!1),_=g(!1),S=g(null),$=g(null),c=g(),R=async(l=!1)=>{l||(w.value=!0),S.value=null;try{let n=await fetch(`${W}/warframes/${z.params.pk}/`,{method:"GET",headers:O(b.value,A.value)}).then(o=>o).catch(()=>new Response(null,{status:400}));if(n.status===200){let o=await n.json();c.value=o,w.value=!1}else throw n.status}catch(n){n===401?m.error("not authorized"):m.error(h("AnErrorOccurred")),S.value=`${n}`,w.value=!1}},B=async(l,n=!1)=>{_.value=!0,$.value=null;let o=new FormData;c.value&&n?o.append("id",c.value.components.map(t=>t.id.toString()).join(",")):o.append("id",l.toString());try{let t=await fetch(`${W}/me/warframes/components/create/`,{method:"POST",body:o,headers:O(b.value,A.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(t.status===201)m.success(h("ComponentsUpdated")),_.value=!1,n?F.push({name:"Warframes"}):R(!0);else throw t.status}catch(t){t===401?m.error("not authorized"):m.error(h("AnErrorOccurred")),$.value=`${t}`,_.value=!1}},L=async(l,n=!1)=>{_.value=!0,$.value=null;let o=new FormData;c.value&&n&&o.append("ids",c.value.components.map(t=>t.id.toString()).join(","));try{let t=await fetch(`${W}/me/warframes/components/${l}/delete/`,{method:"DELETE",body:o,headers:O(b.value,A.value)}).then(y=>y).catch(()=>new Response(null,{status:400}));if(t.status===204)m.success(h("ComponentUpdated")),_.value=!1,R(!0);else throw t.status}catch(t){t===401?m.error("not authorized"):m.error(h("AnErrorOccurred")),$.value=`${t}`,_.value=!1}},x=(l,n)=>{let o=l.filter(t=>t.era==n);return o!=null&&o.length?o:[]};return K(()=>{R()}),(l,n)=>{const o=p("qp-header"),t=p("el-button"),y=p("el-button-group"),E=p("el-image"),N=p("el-col"),U=p("el-row"),j=p("qp-notfound"),T=p("qp-loading"),I=Y("loading");return!w.value&&!S.value&&c.value?(e(),s("div",ie,[k(o,{title:c.value.name,"page-type":"warframe"},null,8,["title"]),k(U,{class:"qp-warframes-detail"},{default:v(()=>[k(N,{span:24,md:14,class:"qp-warframes-detail-info"},{default:v(()=>[a("div",ce,[a("div",ue,[k(y,null,{default:v(()=>[c.value.completion<100?(e(),d(t,{key:0,onClick:n[0]||(n[0]=r=>B(0,!0))},{default:v(()=>[a("span",{textContent:f(l.$t("CompleteAll"))},null,8,de)]),_:1})):(e(),d(t,{key:1,onClick:n[1]||(n[1]=r=>L(0,!0))},{default:v(()=>[a("span",{textContent:f(l.$t("RemoveAll"))},null,8,me)]),_:1}))]),_:1})])]),Q((e(),s("ul",pe,[(e(!0),s(C,null,q(c.value.components,(r,V)=>(e(),s("li",{key:`warframe-components-${V}`,class:te(`qp-warframes-detail-components-item${r.is_owned?" qp-isowned":""}`),onClick:u=>r.is_owned?L(r.id):B(r.id)},[a("div",fe,[a("div",ve,[r.name=="blueprint"?(e(),d(E,{key:0,src:D(ne)},null,8,["src"])):r.name=="chassis"?(e(),d(E,{key:1,src:D(oe)},null,8,["src"])):r.name=="neuroptics"?(e(),d(E,{key:2,src:D(re)},null,8,["src"])):r.name=="systems"?(e(),d(E,{key:3,src:D(le)},null,8,["src"])):se("",!0)]),a("div",null,[a("div",he,[a("span",{textContent:f(l.$t(r.name))},null,8,we)]),a("div",ye,[a("div",null,[(e(!0),s(C,null,q(x(r.relics,"Lith"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",ge,", ")):(e(),s("span",ke,"Lith : ")),a("span",{textContent:f(u.name)},null,8,Ce)]))),128))]),a("div",null,[(e(!0),s(C,null,q(x(r.relics,"Meso"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",qe,", ")):(e(),s("span",$e,"Meso : ")),a("span",{textContent:f(u.name)},null,8,xe)]))),128))]),a("div",null,[(e(!0),s(C,null,q(x(r.relics,"Neo"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",Ee,", ")):(e(),s("span",De,"Neo : ")),a("span",{textContent:f(u.name)},null,8,be)]))),128))]),a("div",null,[(e(!0),s(C,null,q(x(r.relics,"Axi"),(u,i)=>(e(),s("span",{key:`component-relics-${i}`},[i>0?(e(),s("span",Ae,", ")):(e(),s("span",Se,"Axi : ")),a("span",{textContent:f(u.name)},null,8,Re)]))),128))])])])])],10,_e))),128))])),[[I,_.value]])]),_:1}),k(N,{span:24,md:10,class:"qp-warframes-detail-picture"},{default:v(()=>[a("div",We,[a("div",{class:"qp-warframes-detail-img",style:X(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${c.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):w.value?(e(),d(T,{key:2})):(e(),d(j,{key:1}))}}});const Me=ae(Oe,[["__scopeId","data-v-42aee812"]]);export{Me as default};