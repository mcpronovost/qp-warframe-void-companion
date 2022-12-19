import{d as I,u as N,r as h,l as A,e as b,c as y,w as l,g as o,k as m,t as q,m as w,n as Q,p as K,q as W,v as H,i as P,x as B,y as Y,z as C,A as O,b as n,B as ee,C as te,_ as z,s as F,a as oe,o as le,H as se}from"./index-5720967c.js";const D=x=>(ee("data-v-ed7df9a9"),x=x(),te(),x),ne=["textContent"],ae=["innerHTML"],re=["textContent"],ue=["textContent"],ie=D(()=>m("div",null,"(en développement)",-1)),de=D(()=>m("div",null,"(en développement)",-1)),pe=D(()=>m("div",null,"(en développement)",-1)),me=I({__name:"RegisterView",setup(x){const{t:e}=N(),T=B(),c=h(!1),v=h(null),_=h(!1),g=h(!1),$=h(!1),f=h(),r=A({username:"",email:"",name:"",password:"",password_confirm:""}),U=(s,t,a)=>{const p=/^[A-Za-z0-9_-]+$/;t===""?a(new Error(e("Thisfieldisrequired"))):t.match(p)?a():a(new Error(e("Mustonlycontainlettersnumbersandsomecharacters")))},E=(s,t,a)=>{const p=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;t===""?a(new Error(e("Thisfieldisrequired"))):t.match(p)?a():a(new Error(e("Thisemailisinvalid")))},i=(s,t,a)=>{const p=/^[A-Za-z- ]+$/;t===""?a(new Error(e("Thisfieldisrequired"))):t.match(p)?a():a(new Error(e("Mustonlycontainlettersspaceandsomecharacters")))},u=(s,t,a)=>{t===""?a(new Error(e("Thisfieldisrequired"))):t!==r.password?a(new Error(e("Thepasswordconfirmationdoesntmatch"))):a()},V=A({username:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:5,max:150,message:e("LengthshouldbebetweenXandX",[5,150]),trigger:"blur"},{validator:U,trigger:"blur"}],email:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:8,max:254,message:e("LengthshouldbebetweenXandX",[8,254]),trigger:"blur"},{validator:E,trigger:"blur"}],name:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:2,max:32,message:e("LengthshouldbebetweenXandX",[2,32]),trigger:"blur"},{validator:i,trigger:"blur"}],password:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:8,max:254,message:e("LengthshouldbebetweenXandX",[6,254]),trigger:"blur"}],password_confirm:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:8,max:254,message:e("LengthshouldbebetweenXandX",[6,254]),trigger:"blur"},{validator:u,trigger:"blur"}]}),R=async()=>{var s;c.value=!0,v.value=null,await((s=f.value)==null?void 0:s.validate(t=>{t?Y.confirm(C("div",null,[C("p",null,e("Byclickingyouacceptrules")),C("div",{class:"qp-center"},[C("button",{class:"el-button is-text",onClick:()=>{_.value=!0}},e("ReadTheRules"))]),C("div",{class:"qp-center"},[C("button",{class:"el-button is-text",onClick:()=>{g.value=!0}},e("ReadUsePolicies"))]),C("div",{class:"qp-center"},[C("button",{class:"el-button is-text",onClick:()=>{$.value=!0}},e("ReadPrivacyPolicies"))])]),e("Register"),{confirmButtonText:e("IAcceptTheRules"),cancelButtonText:e("Cancel"),autofocus:!1,closeOnClickModal:!1,closeOnPressEscape:!1,closeOnHashChange:!1}).then(()=>{k()}).catch(()=>{c.value=!1}):c.value=!1}))},k=async()=>{c.value=!0,v.value=null;let s=new FormData;s.append("username",r.username.trim()),s.append("email",r.email.trim()),s.append("name",r.name.trim()),s.append("password",r.password);let t=await fetch(`${O}/register/`,{method:"POST",body:s});t.status===200?T.push({name:"AuthLogin"}):t.status===400?(v.value=e("InvalidCredentials"),c.value=!1):(v.value=e("AnErrorOccurred"),c.value=!1)};return(s,t)=>{const a=n("el-input"),p=n("el-form-item"),M=n("el-alert"),L=n("el-button"),Z=n("el-form"),j=n("el-card"),X=n("el-scrollbar"),S=n("el-dialog"),G=n("el-col"),J=n("el-row");return b(),y(J,{id:"qp-auth-register"},{default:l(()=>[o(G,null,{default:l(()=>[o(j,null,{default:l(()=>[m("h1",{textContent:q(s.$t("Register"))},null,8,ne),o(Z,{ref_key:"refRegister",ref:f,model:r,rules:V,"label-position":"top","status-icon":""},{default:l(()=>[o(p,{prop:"username"},{default:l(()=>[o(a,{modelValue:r.username,"onUpdate:modelValue":t[0]||(t[0]=d=>r.username=d),placeholder:s.$t("Username"),"prefix-icon":w(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),o(p,{prop:"email"},{default:l(()=>[o(a,{modelValue:r.email,"onUpdate:modelValue":t[1]||(t[1]=d=>r.email=d),placeholder:s.$t("Email"),"prefix-icon":w(K)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),o(p,{prop:"name"},{default:l(()=>[o(a,{modelValue:r.name,"onUpdate:modelValue":t[2]||(t[2]=d=>r.name=d),placeholder:s.$t("Name"),"prefix-icon":w(W)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),o(p,{prop:"password"},{default:l(()=>[o(a,{modelValue:r.password,"onUpdate:modelValue":t[3]||(t[3]=d=>r.password=d),placeholder:s.$t("Password"),"prefix-icon":w(H),type:"password"},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),o(p,{prop:"password_confirm"},{default:l(()=>[o(a,{modelValue:r.password_confirm,"onUpdate:modelValue":t[4]||(t[4]=d=>r.password_confirm=d),placeholder:s.$t("PasswordConfirm"),"prefix-icon":w(H),type:"password"},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),v.value?(b(),y(p,{key:0},{default:l(()=>[o(M,{type:"error","show-icon":"",closable:!1},{default:l(()=>[m("div",{innerHTML:v.value},null,8,ae)]),_:1})]),_:1})):P("",!0),o(p,{class:"qp-form-submit"},{default:l(()=>[o(L,{type:"primary",loading:c.value,onClick:t[5]||(t[5]=d=>R())},{default:l(()=>[m("span",{textContent:q(s.$t("RegisterMe"))},null,8,re)]),_:1},8,["loading"])]),_:1}),o(p,{class:"qp-form-switchauth"},{default:l(()=>[o(L,{text:"",size:"small",disabled:c.value,onClick:t[6]||(t[6]=d=>s.$router.push({name:"AuthLogin"}))},{default:l(()=>[m("span",{textContent:q(s.$t("Alreadyhaveanaccount"))},null,8,ue)]),_:1},8,["disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1}),o(S,{modelValue:_.value,"onUpdate:modelValue":t[7]||(t[7]=d=>_.value=d),title:w(e)("TheRules")},{default:l(()=>[o(X,{height:"60vh"},{default:l(()=>[ie]),_:1})]),_:1},8,["modelValue","title"]),o(S,{modelValue:g.value,"onUpdate:modelValue":t[8]||(t[8]=d=>g.value=d),title:w(e)("UsePolicies")},{default:l(()=>[o(X,{height:"60vh"},{default:l(()=>[de]),_:1})]),_:1},8,["modelValue","title"]),o(S,{modelValue:$.value,"onUpdate:modelValue":t[9]||(t[9]=d=>$.value=d),title:w(e)("PrivacyPolicies")},{default:l(()=>[o(X,{height:"60vh"},{default:l(()=>[pe]),_:1})]),_:1},8,["modelValue","title"])]),_:1})]),_:1})}}});const ce=z(me,[["__scopeId","data-v-ed7df9a9"]]),_e=["textContent"],fe=["innerHTML"],ge=["textContent"],he=["textContent"],ve=I({__name:"LoginView",setup(x){const{t:e}=N(),T=B(),c=F(),{updateRat:v}=c,_=h(!1),g=h(null),$=h(),f=A({username:"",password:""}),r=A({username:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:5,max:150,message:e("LengthshouldbebetweenXandX",[5,150]),trigger:"blur"}],password:[{required:!0,message:e("Thisfieldisrequired"),trigger:"blur"},{min:6,max:254,message:e("LengthshouldbebetweenXandX",[6,254]),trigger:"blur"}]}),U=async()=>{var i;_.value=!0,g.value=null,await((i=$.value)==null?void 0:i.validate(u=>{u?E():_.value=!1}))},E=async()=>{_.value=!0;let i=new FormData;i.append("username",f.username),i.append("password",f.password);let u=await fetch(`${O}/login/`,{method:"POST",body:i});if(u.status===200){let V=await u.json();v(V.token),T.push({name:"Home"})}else u.status===400?(g.value=e("InvalidCredentials"),_.value=!1):(g.value=e("AnErrorOccurred"),_.value=!1)};return(i,u)=>{const V=n("el-input"),R=n("el-form-item"),k=n("el-alert"),s=n("el-button"),t=n("el-form"),a=n("el-card"),p=n("el-col"),M=n("el-row");return b(),y(M,{id:"qp-auth-login"},{default:l(()=>[o(p,null,{default:l(()=>[o(a,null,{default:l(()=>[m("h1",{textContent:q(i.$t("Login"))},null,8,_e),o(t,{ref_key:"refLogin",ref:$,model:f,rules:r,"label-position":"top","status-icon":""},{default:l(()=>[o(R,{prop:"username"},{default:l(()=>[o(V,{modelValue:f.username,"onUpdate:modelValue":u[0]||(u[0]=L=>f.username=L),placeholder:i.$t("Username"),"prefix-icon":w(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),o(R,{prop:"password"},{default:l(()=>[o(V,{modelValue:f.password,"onUpdate:modelValue":u[1]||(u[1]=L=>f.password=L),placeholder:i.$t("Password"),"prefix-icon":w(H),type:"password"},null,8,["modelValue","placeholder","prefix-icon"])]),_:1}),g.value?(b(),y(k,{key:0,type:"error","show-icon":"",closable:!1},{default:l(()=>[m("p",{innerHTML:g.value},null,8,fe)]),_:1})):P("",!0),o(R,{class:"qp-form-submit"},{default:l(()=>[o(s,{type:"primary",loading:_.value,onClick:u[2]||(u[2]=L=>U())},{default:l(()=>[m("span",{textContent:q(i.$t("LoginMe"))},null,8,ge)]),_:1},8,["loading"])]),_:1}),o(R,{class:"qp-form-switchauth"},{default:l(()=>[o(s,{text:"",size:"small",disabled:_.value,onClick:u[3]||(u[3]=L=>i.$router.push({name:"AuthRegister"}))},{default:l(()=>[m("span",{textContent:q(i.$t("Donthaveanaccount"))},null,8,he)]),_:1},8,["disabled"])]),_:1})]),_:1},8,["model","rules"])]),_:1})]),_:1})]),_:1})}}});const we=z(ve,[["__scopeId","data-v-cad79bf2"]]),be=["textContent"],ye=["innerHTML"],$e={class:"qp-form-submit"},Ve=["textContent"],Le=I({__name:"LogoutView",setup(x){const e=B(),T=F(),{rat:c}=oe(T),{cleanUser:v}=T,_=h(!1),g=h(),$=async()=>{_.value=!0,await fetch(`${O}/logout/`,{method:"POST",headers:se(c.value),body:null}),v(),e.push({name:"Home"})};return le(()=>{$()}),(f,r)=>{const U=n("el-alert"),E=n("el-button"),i=n("el-card"),u=n("el-col"),V=n("el-row");return b(),y(V,{id:"qp-auth-logout"},{default:l(()=>[o(u,null,{default:l(()=>[o(i,{class:"qp-center"},{default:l(()=>[m("h1",{textContent:q(f.$t("Logout"))},null,8,be),g.value?(b(),y(U,{key:0,type:"error","show-icon":"",closable:!1},{default:l(()=>[m("p",{innerHTML:g.value},null,8,ye)]),_:1})):P("",!0),m("div",$e,[o(E,{type:"primary",loading:_.value,onClick:r[0]||(r[0]=R=>$())},{default:l(()=>[m("span",{textContent:q(f.$t("LogoutMe"))},null,8,Ve)]),_:1},8,["loading"])])]),_:1})]),_:1})]),_:1})}}});const Ce=z(Le,[["__scopeId","data-v-1e4d5659"]]);const qe={class:"qp-container qp-centered"},Te={__name:"AuthView",setup(x){return(e,T)=>{const c=n("qp-page");return b(),y(c,null,{default:l(()=>[m("div",qe,[e.$route.name&&e.$route.name=="AuthRegister"?(b(),y(ce,{key:0})):e.$route.name&&e.$route.name=="AuthLogin"?(b(),y(we,{key:1})):e.$route.name&&e.$route.name=="AuthLogout"?(b(),y(Ce,{key:2})):P("",!0)])]),_:1})}}};export{Te as default};
