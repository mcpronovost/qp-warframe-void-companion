import{d as R,f as n,g as s,i as l,h as i,t as O,k as b,_ as x,u as A,s as B,a as S,r as C,c as N,w as z,n as F,F as w,l as y,e as L,m as U,q as f,A as V,H as j,E as g}from"./index-1f7384cd.js";import{_ as H}from"./WeaponImage.vue_vue_type_script_setup_true_lang-e56a4a9a.js";const M={class:"qp-relics-drawer-components-item-wrapper"},P={class:"qp-relics-drawer-components-img"},T={class:"qp-relics-drawer-components-name"},Q=["textContent"],G={class:"qp-relics-drawer-rarities"},J={key:0,class:"qp-relics-drawer-rarities-gold"},K={key:1,class:"qp-relics-drawer-rarities-silver"},W={key:2,class:"qp-relics-drawer-rarities-bronze"},X=R({__name:"RelicDrawerItem",props:{component:{type:Object,required:!0}},setup(e){return(q,r)=>(n(),s("div",M,[l("div",P,[i(H,{component:e.component.component.name},null,8,["component"])]),l("div",null,[l("div",T,[l("span",{textContent:O(e.component.component.fullname)},null,8,Q)]),l("div",G,[e.component.percent<.1?(n(),s("span",J)):e.component.percent>.09&&e.component.percent<.2?(n(),s("span",K)):e.component.percent>.19?(n(),s("span",W)):b("",!0)])])]))}});const v=x(X,[["__scopeId","data-v-09e3b6d4"]]),Y={key:0,class:"qp-relics-drawer-components-list"},Z=["onClick"],ee=["onClick"],ne=["onClick"],te=["onClick"],se=R({__name:"RelicDrawer",props:{relic:{type:Object,required:!0},readonly:{type:Boolean,default:!1,required:!1}},emits:["close"],setup(e,{emit:q}){const r=e,{t:$}=A(),D=B(),{rat:E,lang:I}=S(D),d=C(!1),k=C(null),m=async(c,u)=>{d.value=!0,k.value=null;let _=new FormData;_.append("id",c.toString());try{let o=await fetch(`${V}/me/${u}/components/create/`,{method:"POST",body:_,headers:j(E.value,I.value)}).then(t=>t).catch(()=>new Response(null,{status:400}));if(o.status===201)g.success({message:$("ComponentUpdated"),showClose:!0}),d.value=!1,q("close");else throw o.status}catch(o){o===401?g.error("not authorized"):g.error($("AnErrorOccurred")),k.value=`${o}`,d.value=!1}},p=c=>c==null?void 0:c.filter(u=>!u.is_owned);return(c,u)=>{const _=L("el-scrollbar"),o=U("loading");return n(),N(_,{height:"100%"},{default:z(()=>[r.relic?F((n(),s("ul",Y,[(n(!0),s(w,null,y(p(r.relic.warframe_rewards),(t,a)=>(n(),s("li",{key:`warframe-components-${a}`,class:f(`qp-relics-drawer-components-item${e.readonly?" qp-readonly":""}`),onClick:h=>e.readonly?void 0:m(t.component.id,"warframes")},[i(v,{component:t},null,8,["component"])],10,Z))),128)),(n(!0),s(w,null,y(p(r.relic.primaryweapon_rewards),(t,a)=>(n(),s("li",{key:`primaryweapon-components-${a}`,class:f(`qp-relics-drawer-components-item${e.readonly?" qp-readonly":""}`),onClick:h=>e.readonly?void 0:m(t.component.id,"primary-weapons")},[i(v,{component:t},null,8,["component"])],10,ee))),128)),(n(!0),s(w,null,y(p(r.relic.secondaryweapon_rewards),(t,a)=>(n(),s("li",{key:`secondaryweapon-components-${a}`,class:f(`qp-relics-drawer-components-item${e.readonly?" qp-readonly":""}`),onClick:h=>e.readonly?void 0:m(t.component.id,"secondary-weapons")},[i(v,{component:t},null,8,["component"])],10,ne))),128)),(n(!0),s(w,null,y(p(r.relic.meleeweapon_rewards),(t,a)=>(n(),s("li",{key:`meleeweapon-components-${a}`,class:f(`qp-relics-drawer-components-item${e.readonly?" qp-readonly":""}`),onClick:h=>e.readonly?void 0:m(t.component.id,"melee-weapons")},[i(v,{component:t},null,8,["component"])],10,te))),128))])),[[o,d.value]]):b("",!0)]),_:1})}}});const re=x(se,[["__scopeId","data-v-f8fc068d"]]),ce="/static/assets/img/relic_lith-5b7e387f.png",le="/static/assets/img/relic_meso-a11281ee.png",ie="/static/assets/img/relic_neo-7caabf00.png",de="/static/assets/img/relic_axi-a32307ff.png";export{le as a,ie as b,de as c,ce as i,re as q};
