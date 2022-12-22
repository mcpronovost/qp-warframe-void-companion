import{d as E,f as e,g as n,i as c,h,t as O,k as w,_ as z,u as S,s as j,a as L,r as A,c as g,w as B,n as Q,F as k,l as C,e as N,m as F,p as x,A as M,H as T,E as I,j as b,q as U}from"./index-13251ea8.js";import{_ as V}from"./WeaponImage.vue_vue_type_script_setup_true_lang-b9aabe63.js";const H={class:"qp-relics-drawer-components-item-wrapper"},P={class:"qp-relics-drawer-components-img"},G={class:"qp-relics-drawer-components-name"},J=["textContent"],K={class:"qp-relics-drawer-rarities"},W={key:0,class:"qp-relics-drawer-rarities-gold"},X={key:1,class:"qp-relics-drawer-rarities-silver"},Y={key:2,class:"qp-relics-drawer-rarities-bronze"},Z=E({__name:"RelicDrawerItem",props:{component:{type:Object,required:!0}},setup(t){return(r,i)=>(e(),n("div",H,[c("div",P,[h(V,{component:t.component.component.name},null,8,["component"])]),c("div",null,[c("div",G,[c("span",{textContent:O(t.component.component.fullname)},null,8,J)]),c("div",K,[t.component.percent<.1?(e(),n("span",W)):t.component.percent>.09&&t.component.percent<.2?(e(),n("span",X)):t.component.percent>.19?(e(),n("span",Y)):w("",!0)])])]))}});const R=z(Z,[["__scopeId","data-v-09e3b6d4"]]),ee={key:0,class:"qp-relics-drawer-components-list"},se=["onClick"],te=["onClick"],ne=["onClick"],re=["onClick"],oe=E({__name:"RelicDrawer",props:{relic:{type:Object,required:!0},readonly:{type:Boolean,default:!1,required:!1}},emits:["close"],setup(t,{emit:r}){const i=t,{t:l}=S(),f=j(),{rat:a,lang:d}=L(f),p=A(!1),v=A(null),m=async(y,$)=>{p.value=!0,v.value=null;let q=new FormData;q.append("id",y.toString());try{let _=await fetch(`${M}/me/${$}/components/create/`,{method:"POST",body:q,headers:T(a.value,d.value)}).then(o=>o).catch(()=>new Response(null,{status:400}));if(_.status===201)I.success({message:l("ComponentUpdated"),showClose:!0}),p.value=!1,r("close");else throw _.status}catch(_){_===401?I.error("not authorized"):I.error(l("AnErrorOccurred")),v.value=`${_}`,p.value=!1}},s=y=>y==null?void 0:y.filter($=>!$.is_owned);return(y,$)=>{const q=N("el-scrollbar"),_=F("loading");return e(),g(q,{height:"100%"},{default:B(()=>[i.relic?Q((e(),n("ul",ee,[(e(!0),n(k,null,C(s(i.relic.warframe_rewards),(o,u)=>(e(),n("li",{key:`warframe-components-${u}`,class:x(`qp-relics-drawer-components-item${t.readonly?" qp-readonly":""}`),onClick:D=>t.readonly?void 0:m(o.component.id,"warframes")},[h(R,{component:o},null,8,["component"])],10,se))),128)),(e(!0),n(k,null,C(s(i.relic.primaryweapon_rewards),(o,u)=>(e(),n("li",{key:`primaryweapon-components-${u}`,class:x(`qp-relics-drawer-components-item${t.readonly?" qp-readonly":""}`),onClick:D=>t.readonly?void 0:m(o.component.id,"primary-weapons")},[h(R,{component:o},null,8,["component"])],10,te))),128)),(e(!0),n(k,null,C(s(i.relic.secondaryweapon_rewards),(o,u)=>(e(),n("li",{key:`secondaryweapon-components-${u}`,class:x(`qp-relics-drawer-components-item${t.readonly?" qp-readonly":""}`),onClick:D=>t.readonly?void 0:m(o.component.id,"secondary-weapons")},[h(R,{component:o},null,8,["component"])],10,ne))),128)),(e(!0),n(k,null,C(s(i.relic.meleeweapon_rewards),(o,u)=>(e(),n("li",{key:`meleeweapon-components-${u}`,class:x(`qp-relics-drawer-components-item${t.readonly?" qp-readonly":""}`),onClick:D=>t.readonly?void 0:m(o.component.id,"melee-weapons")},[h(R,{component:o},null,8,["component"])],10,re))),128))])),[[_,p.value]]):w("",!0)]),_:1})}}});const Ce=z(oe,[["__scopeId","data-v-f8fc068d"]]),ae="/static/assets/img/relic_lith-5b7e387f.png",ce="/static/assets/img/relic_meso-a11281ee.png",ie="/static/assets/img/relic_neo-7caabf00.png",le="/static/assets/img/relic_axi-a32307ff.png",de={class:"qp-relics-item"},pe={class:"qp-relics-item-wrapper"},me={class:"qp-relics-image"},_e={class:"qp-relics-name"},ue=["textContent"],we={key:0,class:"qp-relics-components-count"},fe=["textContent"],ye={class:"qp-relics-rarities"},he={key:0,class:"qp-relics-rarities-gold"},ve={key:1,class:"qp-relics-rarities-silver"},ge={key:2,class:"qp-relics-rarities-bronze"},$e=E({__name:"RelicItem",props:{relic:{type:Object,required:!0}},setup(t){const r=t,i=(l,f)=>{var d,p,v,m;const a=s=>f=="gold"&&s.is_owned===!1&&s.percent<.1||f=="silver"&&s.is_owned===!1&&s.percent<.2&&s.percent>.09||f=="bronze"&&s.is_owned===!1&&s.percent>.19;return!!((d=l.warframe_rewards)!=null&&d.some(s=>a(s))||(p=l.primaryweapon_rewards)!=null&&p.some(s=>a(s))||(v=l.secondaryweapon_rewards)!=null&&v.some(s=>a(s))||(m=l.meleeweapon_rewards)!=null&&m.some(s=>a(s)))};return(l,f)=>{var d;const a=N("el-image");return e(),n("div",de,[c("div",pe,[c("div",me,[h(U,null,{default:B(()=>[r.relic.era=="Lith"?(e(),g(a,{key:0,src:b(ae)},null,8,["src"])):r.relic.era=="Meso"?(e(),g(a,{key:1,src:b(ce)},null,8,["src"])):r.relic.era=="Neo"?(e(),g(a,{key:2,src:b(ie)},null,8,["src"])):r.relic.era=="Axi"?(e(),g(a,{key:3,src:b(le)},null,8,["src"])):w("",!0)]),_:1})]),c("div",_e,[c("span",{textContent:O(`${r.relic.era} ${r.relic.name}`)},null,8,ue)]),((d=r.relic.components)==null?void 0:d.length)>1?(e(),n("div",we,[c("span",{textContent:O(`x${r.relic.components.length}`)},null,8,fe)])):w("",!0),c("div",ye,[i(r.relic,"gold")?(e(),n("span",he)):w("",!0),i(r.relic,"silver")?(e(),n("span",ve)):w("",!0),i(r.relic,"bronze")?(e(),n("span",ge)):w("",!0)])])])}}});const xe=z($e,[["__scopeId","data-v-b88c35f5"]]);export{Ce as Q,xe as a};
