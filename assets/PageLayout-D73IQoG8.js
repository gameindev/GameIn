import{f as P,u as I,j as e,B as R,c as J,U as Q,s as H,g as Y,v as Z,w as ee,x as te,t as x,d as h,l as se,i as ae,q as oe,m as g,O as ne}from"./index-C-4AFNO7.js";import{C as ie}from"./CoverBanner-2QBI14tf.js";import{A as re}from"./AvatarSection-BLGA51bl.js";import{V as le,B as ce,a as de}from"./LevelBadge-CBks6eCf.js";import{c as me}from"./createLucideIcon-CFEEk01s.js";import{T as j}from"./Text-Bpvfj0Xl.js";import{U as pe}from"./user-round-J5po2fs4.js";import{c as ue}from"./selectors-BfVctv7J.js";import{B as V}from"./Button-BR3F4-qk.js";import{g as he}from"./get-auto-contrast-value-Da6zqqWm.js";import{c as ve}from"./ActionIcon-CN4WoK2w.js";import{c as be}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as xe,a as fe}from"./DirectionProvider-CeuBSB5J.js";import{u as ge}from"./useApi-D27OJqXo.js";import"./modal-h5yuvtaI.js";import"./IconButton-BgxEkDQX.js";import"./Modal-DGi-JDXn.js";import"./FocusTrap-C_LKvyJp.js";import"./Paper-9yU7SWws.js";import"./EditAvator-B4wwl5Wv.js";import"./HexContainer-Ccq6LLuc.js";import"./Stack-cHEUxKAk.js";import"./Group-CIVdmQNo.js";import"./Image-B2O5Zm9s.js";import"./FileInput--HYmVBXe.js";function W(t,r){return s=>{if(typeof s!="string"||s.trim().length===0)throw new Error(r);return`${t}-${s}`}}const[je,D]=ve("Tabs component was not found in the tree");var N={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const ye={},$=P((t,r)=>{const s=I("TabsList",ye,t),{children:i,className:d,grow:m,justify:l,classNames:c,styles:a,style:v,mod:p,...u}=s,o=D();return e.jsx(R,{...u,...o.getStyles("list",{className:d,style:v,classNames:c,styles:a,props:s,variant:o.variant}),ref:r,role:"tablist",variant:o.variant,mod:[{grow:m,orientation:o.orientation,placement:o.orientation==="vertical"&&o.placement,inverted:o.inverted},p],"aria-orientation":o.orientation,__vars:{"--tabs-justify":l},children:i})});$.classes=N;$.displayName="@mantine/core/TabsList";const Te={},F=P((t,r)=>{const s=I("TabsPanel",Te,t),{children:i,className:d,value:m,classNames:l,styles:c,style:a,mod:v,keepMounted:p,...u}=s,o=D(),b=o.value===m,y=o.keepMounted||p||b?i:null;return e.jsx(R,{...u,...o.getStyles("panel",{className:d,classNames:l,styles:c,style:[a,b?void 0:{display:"none"}],props:s}),ref:r,mod:[{orientation:o.orientation},v],role:"tabpanel",id:o.getPanelId(m),"aria-labelledby":o.getTabId(m),children:y})});F.classes=N;F.displayName="@mantine/core/TabsPanel";const Se={},L=P((t,r)=>{const s=I("TabsTab",Se,t),{className:i,children:d,rightSection:m,leftSection:l,value:c,onClick:a,onKeyDown:v,disabled:p,color:u,style:o,classNames:b,styles:y,vars:A,mod:w,tabIndex:O,...z}=s,B=J(),{dir:_}=xe(),n=D(),T=c===n.value,E=U=>{n.onChange(n.allowTabDeactivation&&c===n.value?null:c),a==null||a(U)},S={classNames:b,styles:y,props:s};return e.jsxs(Q,{...z,...n.getStyles("tab",{className:i,style:o,variant:n.variant,...S}),disabled:p,unstyled:n.unstyled,variant:n.variant,mod:[{active:T,disabled:p,orientation:n.orientation,inverted:n.inverted,placement:n.orientation==="vertical"&&n.placement},w],ref:r,role:"tab",id:n.getTabId(c),"aria-selected":T,tabIndex:O!==void 0?O:T||n.value===null?0:-1,"aria-controls":n.getPanelId(c),onClick:E,__vars:{"--tabs-color":u?H(u,B):void 0},onKeyDown:be({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:n.activateTabWithKeyboard,loop:n.loop,orientation:n.orientation||"horizontal",dir:_,onKeyDown:v}),children:[l&&e.jsx("span",{...n.getStyles("tabSection",S),"data-position":"left",children:l}),d&&e.jsx("span",{...n.getStyles("tabLabel",S),children:d}),m&&e.jsx("span",{...n.getStyles("tabSection",S),"data-position":"right",children:m})]})});L.classes=N;L.displayName="@mantine/core/TabsTab";const K="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",Ne={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},we=Z((t,{radius:r,color:s,autoContrast:i})=>({root:{"--tabs-radius":te(r),"--tabs-color":H(s,t),"--tabs-text-color":he(i,t)?ee({color:s,theme:t,autoContrast:i}):void 0}})),f=P((t,r)=>{const s=I("Tabs",Ne,t),{defaultValue:i,value:d,onChange:m,orientation:l,children:c,loop:a,id:v,activateTabWithKeyboard:p,allowTabDeactivation:u,variant:o,color:b,radius:y,inverted:A,placement:w,keepMounted:O,classNames:z,styles:B,unstyled:_,className:n,style:T,vars:E,autoContrast:S,mod:U,...G}=s,C=fe(v),[X,q]=ge({value:d,defaultValue:i,finalValue:null,onChange:m}),k=Y({name:"Tabs",props:s,classes:N,className:n,style:T,classNames:z,styles:B,unstyled:_,vars:E,varsResolver:we});return e.jsx(je,{value:{placement:w,value:X,orientation:l,id:C,loop:a,activateTabWithKeyboard:p,getTabId:W(`${C}-tab`,K),getPanelId:W(`${C}-panel`,K),onChange:q,allowTabDeactivation:u,variant:o,color:b,radius:y,inverted:A,keepMounted:O,unstyled:_,getStyles:k},children:e.jsx(R,{ref:r,id:C,variant:o,mod:[{orientation:l,inverted:l==="horizontal"&&A,placement:l==="vertical"&&w},U],...k("root"),...G,children:c})})});f.classes=N;f.displayName="@mantine/core/Tabs";f.Tab=L;f.Panel=F;f.List=$;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],_e=me("eye",Oe),Ce=h.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${x.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`,Pe=h.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25em;
  background-color: ${x.colors.secondaryGrey[0]};
  color: white;
`,Ie=h.div`
  position: absolute;
  top: -8em;
  left: 0em;
  /* width: 10.625em;
  height: 11.875em; */
  overflow: hidden;

  .action {
    position: absolute;
    bottom: 2em;
    right: 3em;
  }
`,Re=h.div`
  margin-left: 13em;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5em;

  /* .personal_info {
    flex-grow: 1;
  } */
`,Ae=h.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875em;
    margin-bottom: 0.5em;
  }

  .profile_name {
    font-size: 1.875em;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${x.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875em;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1em;
  }
`,ze=h.div`
  .profile_stats {
    display: flex;
    justify-content: flex-start;
    gap: 1.25em;
    color: white;

    .stats_section {
      text-align: center;
      display: flex;
      align-items: center;

      .views,
      .followers,
      .joined {
        font-size: 0.625em;
        margin: 0 0.188em 0 0.5em;
        font-weight: 800;
        line-height: 1.2;
      }

      .helperText {
        font-size: 0.625em;
        font-weight: 400;
        color: #a0aec0;
        text-transform: uppercase;
      }
    }
  }
`,Be=h.div`
  border-left: 0.063em dotted #4a5568;
  border-right: 0.063em dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25em;

    svg text {
      font-family: ${x.fontFamily};
    }
  }
`,Ee=h.div`
  display: flex;
  align-items: end;
  gap: 2.5em;
  font-size: 0.875em;
  color: #a0aec0;
  padding: 0.5em;
  border-right: 0.063em dotted #4a5568;
  margin-right: auto;

  .sponsorship_text {
    font-size: 0.625em;
    font-weight: 400;
    text-transform: uppercase;
  }

  .sponsorship_badge {
    background-color: #2b6cb0;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    font-size: 0.75em;
  }
`,Ue=h.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`,De=({user:t})=>e.jsx(Ae,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:t.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:t.nationality||"IND"}),t.userType==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:t.age||24}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(le,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(ce,{})})]})]})})}),$e=({stats:t})=>e.jsx(ze,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(_e,{size:"0.75em"}),e.jsx(j,{className:"views",size:"md",weight:500,children:t.views}),e.jsx(j,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(pe,{size:"0.75em"}),e.jsx(j,{className:"followers",size:"md",weight:500,children:t==null?void 0:t.followers}),e.jsx(j,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(j,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(j,{className:"helperText",size:"xs",color:"dimmed",children:(t==null?void 0:t.joinedOn)||"OCT. 23rd, 2022"})]})]})}),Fe=({sponsors:t})=>{var r;return e.jsxs(Ee,{children:[e.jsx(j,{className:"sponsorship_text",component:"span",size:"sm",children:t.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(r=t.sponsorship)==null?void 0:r.map((s,i)=>e.jsx("img",{className:"sponsor_logo",src:s.logo,alt:s.name,style:{width:s.size}},i))})]})},Le={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},ke=({level:t})=>{const r=Le[t]||"#E2BB63";return e.jsx(Be,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(de,{fill:r,number:t})})})})},M=t=>t?`http://localhost:3000/${t}`:null,Ve=()=>{var o,b;const{user:t}=se(ue);if(!t)return null;const{username:r,userType:s,email:i,dateOfBirth:d,creatorProfile:m,brandProfile:l,userBio:c}=t,a=s==="CREATOR"?m:l,v={views:(a==null?void 0:a.views)||"0",followers:(a==null?void 0:a.followers)||"0",joinedOn:new Date(t.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};console.log(t);const p=M((o=a==null?void 0:a.profileImage)==null?void 0:o.path),u=M((b=a==null?void 0:a.coverImage)==null?void 0:b.path);return e.jsxs(Ce,{children:[e.jsx(ie,{coverImage:u,controls:!0}),e.jsxs(Pe,{children:[e.jsx(Ie,{children:e.jsx(re,{avatar:p,size:"15em",controls:!0})}),e.jsxs(Re,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(De,{user:t}),e.jsx($e,{stats:v})]}),e.jsx(ke,{level:(a==null?void 0:a.rank)||1}),e.jsx(Fe,{sponsors:(t==null?void 0:t.sponsors)||[]}),e.jsx(Ue,{children:e.jsxs("div",{className:"actions",children:[e.jsx(V,{variant:"secondary",size:"xs",children:"Follow"}),e.jsx(V,{variant:"primary",size:"xs",children:"Sponsor"})]})})]})]})]})},We=h.div`
  position: relative;
  background-color: ${x.colors.secondaryGrey[0]};
  border-radius: ${x.radius.md};
  margin-top: 0.625em;
  padding: 1em 0.5em;

  button span {
    font-size: ${x.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${x.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5em;
      width: 100%;
      height: 0.125em;
      border-radius: 50em;
      background: ${x.colors.primary[0]};
    }
  }
`,Ke=[{value:g.ACCOUNTS.DASHBOARD.ROOT,label:"DASHBOARD"},{value:g.ACCOUNTS.PROFILE.ROOT,label:"PROFILE"},{value:g.ACCOUNTS.SPONSORSHIPS.ROOT,label:"SPONSORSHIPS"},{value:g.ACCOUNTS.OFFERINGS.ROOT,label:"OFFERINGS"},{value:g.ACCOUNTS.STATS.ROOT,label:"STATS"},{value:g.ACCOUNTS.NEWSFEED.ROOT,label:"NEWSFEED"},{value:g.ACCOUNTS.INBOX.ROOT,label:"INBOX"}];function Me(){const t=ae(),s=oe().pathname.split("/")[1];return e.jsx(We,{children:e.jsx(f,{value:s,onChange:i=>t(`/${i}`),variant:"none",children:e.jsx(f.List,{children:Ke.map(i=>{const d=i.value.replace("/","");return e.jsx(f.Tab,{value:d,children:i.label},d)})})})})}function xt(){return e.jsxs(e.Fragment,{children:[e.jsx(Ve,{}),e.jsx(Me,{}),e.jsx(R,{mt:40,children:e.jsx(ne,{})})]})}export{xt as default};
