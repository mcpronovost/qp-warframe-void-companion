import{d as I,u as V,s as G,a as J,r as C,o as K,g as e,h as n,i as q,w as f,j as a,c as r,t as w,k as Q,F as $,l as x,L as X,A as R,H as B,E as m,f as v,n as Y,v as Z,e as ee,M as te,q as d,m as se,_ as ne}from"./index-2dfb36fa.js";import{i as ae}from"./blueprint-b6c1ffa1.js";import{i as oe,a as le,b as re,c as ie,d as ce,e as ue,f as pe,g as de,h as _e}from"./prime_upperlimb-e05cfcd9.js";const me={key:0,class:"qp-container"},ve={class:"qp-weapons-actions"},he={class:"qp-weapons-actions-extra"},we=["textContent"],fe=["textContent"],ye={class:"qp-weapons-detail-components-list"},ge=["onClick"],ke={class:"qp-weapons-detail-components-item-wrapper"},Ce={class:"qp-weapons-detail-components-img"},qe={class:"qp-weapons-detail-components-name"},$e=["textContent"],xe={class:"qp-weapons-detail-components-relics"},be={key:0},Ee={key:1,class:"qp-weapons-detail-components-era"},De=["textContent"],Ae={key:0},Le={key:1,class:"qp-weapons-detail-components-era"},Se=["textContent"],Re={key:0},Be={key:1,class:"qp-weapons-detail-components-era"},We=["textContent"],Oe={key:0},Pe={key:1,class:"qp-weapons-detail-components-era"},Ue=["textContent"],ze={class:"qp-weapons-detail-image"},Fe=I({__name:"PrimaryWeaponsDetail",setup(Me){const{t:y}=V(),U=Z(),z=ee(),F=G(),{rat:D,lang:A,id:Ne}=J(F),g=C(!1),h=C(!1),L=C(null),b=C(null),u=C(),S=async(i=!1)=>{i||(g.value=!0),L.value=null;try{let o=await fetch(`${R}/primary-weapons/${U.params.pk}/`,{method:"GET",headers:B(D.value,A.value)}).then(l=>l).catch(()=>new Response(null,{status:400}));if(o.status===200){let l=await o.json();u.value=l,g.value=!1}else throw o.status}catch(o){o===401?m.error("not authorized"):m.error(y("AnErrorOccurred")),L.value=`${o}`,g.value=!1}},W=async(i,o=!1)=>{h.value=!0,b.value=null;let l=new FormData;u.value&&o?l.append("id",u.value.components.map(s=>s.id.toString()).join(",")):l.append("id",i.toString());try{let s=await fetch(`${R}/me/primary-weapons/components/create/`,{method:"POST",body:l,headers:B(D.value,A.value)}).then(k=>k).catch(()=>new Response(null,{status:400}));if(s.status===201)m.success(y("ComponentsUpdated")),h.value=!1,o?z.push({name:"PrimaryWeapons"}):S(!0);else throw s.status}catch(s){s===401?m.error("not authorized"):m.error(y("AnErrorOccurred")),b.value=`${s}`,h.value=!1}},O=async(i,o=!1)=>{h.value=!0,b.value=null;let l=new FormData;u.value&&o&&l.append("ids",u.value.components.map(s=>s.id.toString()).join(","));try{let s=await fetch(`${R}/me/primary-weapons/components/${i}/delete/`,{method:"DELETE",body:l,headers:B(D.value,A.value)}).then(k=>k).catch(()=>new Response(null,{status:400}));if(s.status===204)m.success(y("ComponentUpdated")),h.value=!1,S(!0);else throw s.status}catch(s){s===401?m.error("not authorized"):m.error(y("AnErrorOccurred")),b.value=`${s}`,h.value=!1}},E=(i,o)=>{let l=i.filter(s=>s.era==o);return l!=null&&l.length?l:[]};return K(()=>{S()}),(i,o)=>{const l=v("qp-header"),s=v("el-button"),k=v("el-button-group"),p=v("el-image"),P=v("el-col"),M=v("el-row"),N=v("qp-notfound"),j=v("qp-loading"),T=Y("loading");return!g.value&&!L.value&&u.value?(e(),n("div",me,[q(l,{title:u.value.name,"page-type":"weapon"},null,8,["title"]),q(M,{class:"qp-weapons-detail"},{default:f(()=>[q(P,{span:24,md:14,class:"qp-weapons-detail-info"},{default:f(()=>[a("div",ve,[a("div",he,[q(k,null,{default:f(()=>[u.value.completion<100?(e(),r(s,{key:0,onClick:o[0]||(o[0]=t=>W(0,!0))},{default:f(()=>[a("span",{textContent:w(i.$t("CompleteAll"))},null,8,we)]),_:1})):(e(),r(s,{key:1,onClick:o[1]||(o[1]=t=>O(0,!0))},{default:f(()=>[a("span",{textContent:w(i.$t("RemoveAll"))},null,8,fe)]),_:1}))]),_:1})])]),Q((e(),n("ul",ye,[(e(!0),n($,null,x(u.value.components,(t,H)=>(e(),n("li",{key:`weapon-components-${H}`,class:te(`qp-weapons-detail-components-item${t.is_owned?" qp-isowned":""}`),onClick:_=>t.is_owned?O(t.id):W(t.id)},[a("div",ke,[a("div",Ce,[t.name=="blueprint"?(e(),r(p,{key:0,src:d(ae)},null,8,["src"])):t.name=="barrel"?(e(),r(p,{key:1,src:d(oe)},null,8,["src"])):t.name=="blade"?(e(),r(p,{key:2,src:d(le)},null,8,["src"])):t.name=="grip"?(e(),r(p,{key:3,src:d(re)},null,8,["src"])):t.name=="handle"?(e(),r(p,{key:4,src:d(ie)},null,8,["src"])):t.name=="lowerlimb"?(e(),r(p,{key:5,src:d(ce)},null,8,["src"])):t.name=="receiver"?(e(),r(p,{key:6,src:d(ue)},null,8,["src"])):t.name=="stock"?(e(),r(p,{key:7,src:d(pe)},null,8,["src"])):t.name=="string"?(e(),r(p,{key:8,src:d(de)},null,8,["src"])):t.name=="upperlimb"?(e(),r(p,{key:9,src:d(_e)},null,8,["src"])):se("",!0)]),a("div",null,[a("div",qe,[a("span",{textContent:w(i.$t(t.name))},null,8,$e)]),a("div",xe,[a("div",null,[(e(!0),n($,null,x(E(t.relics,"Lith"),(_,c)=>(e(),n("span",{key:`component-relics-${c}`},[c>0?(e(),n("span",be,", ")):(e(),n("span",Ee,"Lith : ")),a("span",{textContent:w(_.name)},null,8,De)]))),128))]),a("div",null,[(e(!0),n($,null,x(E(t.relics,"Meso"),(_,c)=>(e(),n("span",{key:`component-relics-${c}`},[c>0?(e(),n("span",Ae,", ")):(e(),n("span",Le,"Meso : ")),a("span",{textContent:w(_.name)},null,8,Se)]))),128))]),a("div",null,[(e(!0),n($,null,x(E(t.relics,"Neo"),(_,c)=>(e(),n("span",{key:`component-relics-${c}`},[c>0?(e(),n("span",Re,", ")):(e(),n("span",Be,"Neo : ")),a("span",{textContent:w(_.name)},null,8,We)]))),128))]),a("div",null,[(e(!0),n($,null,x(E(t.relics,"Axi"),(_,c)=>(e(),n("span",{key:`component-relics-${c}`},[c>0?(e(),n("span",Oe,", ")):(e(),n("span",Pe,"Axi : ")),a("span",{textContent:w(_.name)},null,8,Ue)]))),128))])])])])],10,ge))),128))])),[[T,h.value]])]),_:1}),q(P,{span:24,md:10,class:"qp-weapons-detail-picture"},{default:f(()=>[a("div",ze,[a("div",{class:"qp-weapons-detail-img",style:X(`background-image:url('https://raw.githubusercontent.com/WFCD/warframe-items/master/data/img/${u.value.image_name}')`)},null,4)])]),_:1})]),_:1})])):g.value?(e(),r(j,{key:2})):(e(),r(N,{key:1}))}}});const Ie=ne(Fe,[["__scopeId","data-v-89246372"]]);export{Ie as default};