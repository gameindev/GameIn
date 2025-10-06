import{f as E,u as A,j as e,B,h as Z,U as ee,D as X,a as te,c as ae,C as se,g as oe,x as b,k as u,L as ne,G as N,l as ie,w as re,s as m,W as le,n as ce,o as de,r as G,O as me}from"./index-C5_jzTTu.js";import{C as pe}from"./CoverBanner-D_yCF77g.js";import{A as he}from"./AvatarSection-De6N2qKw.js";import{c as ve,V as ue,B as be,a as fe,F as xe}from"./FollowButton-CiFmuS6c.js";import{c as ge}from"./createReactComponent-sA3TK7Vs.js";import{T as g}from"./Text-DsdgoVeg.js";import{I as je}from"./IconUser-CQg-LtWH.js";import{c as ye,g as V,p as Se}from"./useProfileMediaUrl-RESHVnk_.js";import{I as Te}from"./IconButton-D2tqVnSN.js";import{B as H}from"./Button-DyMlzesk.js";import{I as Ne}from"./IconMessage-C90YdPWu.js";import{g as Oe}from"./get-auto-contrast-value-Da6zqqWm.js";import{c as we}from"./create-safe-context-CIV-pmjS.js";import{u as _e}from"./DirectionProvider-dA5er05Q.js";import{u as Ce}from"./use-id-BBuErT-4.js";import{u as Ie}from"./use-uncontrolled-Cq7P_ORC.js";import{u as Re}from"./useApi-D8p45sYy.js";import{g as Ee}from"./index-EfBUle2R.js";import Ae from"./Preloader-DFQGFO0_.js";import"./modal-Dwyxegjm.js";import"./Modal-DiY_pJEi.js";import"./FocusTrap-D4-4-GUs.js";import"./Paper-BizL2M9x.js";import"./Transition-COXhOSJn.js";import"./create-optional-context-9Oh-2q2o.js";import"./EditAvator-DUT1Cdlm.js";import"./HexContainer-CKWSYepT.js";import"./Stack-BgBiURvo.js";import"./Group-D4p7Vx77.js";import"./FileInput-CxIeBjHR.js";import"./Input-mneJPGbo.js";import"./FileButton-3XqT8MeK.js";import"./InputBase-NC4Jnabm.js";import"./Image-DLmm_XTy.js";import"./ActionIcon-Ix80DLbn.js";import"./index-KaTw7AUd.js";const[Be,L]=we("Tabs component was not found in the tree");var O={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const k=E((t,a)=>{const n=A("TabsList",null,t),{children:o,className:p,grow:r,justify:s,classNames:d,styles:l,style:h,mod:v,...f}=n,c=L();return e.jsx(B,{...f,...c.getStyles("list",{className:p,style:h,classNames:d,styles:l,props:n,variant:c.variant}),ref:a,role:"tablist",variant:c.variant,mod:[{grow:r,orientation:c.orientation,placement:c.orientation==="vertical"&&c.placement,inverted:c.inverted},v],"aria-orientation":c.orientation,__vars:{"--tabs-justify":s},children:o})});k.classes=O;k.displayName="@mantine/core/TabsList";const M=E((t,a)=>{const n=A("TabsPanel",null,t),{children:o,className:p,value:r,classNames:s,styles:d,style:l,mod:h,keepMounted:v,...f}=n,c=L(),j=c.value===r,y=c.keepMounted||v||j?o:null;return e.jsx(B,{...c.getStyles("panel",{className:p,classNames:s,styles:d,style:[l,j?void 0:{display:"none"}],props:n}),ref:a,mod:[{orientation:c.orientation},h],role:"tabpanel",id:c.getPanelId(r),"aria-labelledby":c.getTabId(r),...f,children:y})});M.classes=O;M.displayName="@mantine/core/TabsPanel";const $=E((t,a)=>{const n=A("TabsTab",null,t),{className:o,children:p,rightSection:r,leftSection:s,value:d,onClick:l,onKeyDown:h,disabled:v,color:f,style:c,classNames:j,styles:y,vars:U,mod:w,tabIndex:_,...P}=n,F=Z(),{dir:C}=_e(),i=L(),S=d===i.value,z=D=>{i.onChange(i.allowTabDeactivation&&d===i.value?null:d),l==null||l(D)},T={classNames:j,styles:y,props:n};return e.jsxs(ee,{...P,...i.getStyles("tab",{className:o,style:c,variant:i.variant,...T}),disabled:v,unstyled:i.unstyled,variant:i.variant,mod:[{active:S,disabled:v,orientation:i.orientation,inverted:i.inverted,placement:i.orientation==="vertical"&&i.placement},w],ref:a,role:"tab",id:i.getTabId(d),"aria-selected":S,tabIndex:_!==void 0?_:S||i.value===null?0:-1,"aria-controls":i.getPanelId(d),onClick:z,__vars:{"--tabs-color":f?X(f,F):void 0},onKeyDown:ye({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:i.activateTabWithKeyboard,loop:i.loop,orientation:i.orientation||"horizontal",dir:C,onKeyDown:h}),children:[s&&e.jsx("span",{...i.getStyles("tabSection",T),"data-position":"left",children:s}),p&&e.jsx("span",{...i.getStyles("tabLabel",T),children:p}),r&&e.jsx("span",{...i.getStyles("tabSection",T),"data-position":"right",children:r})]})});$.classes=O;$.displayName="@mantine/core/TabsTab";const K="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",Ue={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},Pe=ae((t,{radius:a,color:n,autoContrast:o})=>({root:{"--tabs-radius":oe(a),"--tabs-color":X(n,t),"--tabs-text-color":Oe(o,t)?se({color:n,theme:t,autoContrast:o}):void 0}})),x=E((t,a)=>{const n=A("Tabs",Ue,t),{defaultValue:o,value:p,onChange:r,orientation:s,children:d,loop:l,id:h,activateTabWithKeyboard:v,allowTabDeactivation:f,variant:c,color:j,radius:y,inverted:U,placement:w,keepMounted:_,classNames:P,styles:F,unstyled:C,className:i,style:S,vars:z,autoContrast:T,mod:D,attributes:Y,...J}=n,I=Ce(h),[q,Q]=Ie({value:p,defaultValue:o,finalValue:null,onChange:r}),W=te({name:"Tabs",props:n,classes:O,className:i,style:S,classNames:P,styles:F,unstyled:C,attributes:Y,vars:z,varsResolver:Pe});return e.jsx(Be,{value:{placement:w,value:q,orientation:s,id:I,loop:l,activateTabWithKeyboard:v,getTabId:V(`${I}-tab`,K),getPanelId:V(`${I}-panel`,K),onChange:Q,allowTabDeactivation:f,variant:c,color:j,radius:y,inverted:U,keepMounted:_,unstyled:C,getStyles:W},children:e.jsx(B,{ref:a,id:I,variant:c,mod:[{orientation:s,inverted:s==="horizontal"&&U,placement:s==="vertical"&&w},D],...W("root"),...J,children:d})})});x.classes=O;x.displayName="@mantine/core/Tabs";x.Tab=$;x.Panel=M;x.List=k;/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6",key:"svg-1"}]],ze=ge("outline","eye","Eye",Fe),De=u.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${b.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`,Le=u.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25em;
  background-color: ${b.colors.secondaryGrey[0]};
  color: white;
`,ke=u.div`
  position: absolute;
  top: -6em;
  left: 1em;
  /* width: 10.625em;
  height: 11.875em; */
  overflow: hidden;

  .action {
    position: absolute;
    bottom: 0.5em;
    right: 1.5em;
  }
`,Me=u.div`
  margin-left: 12em;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5em;

  .personal_info {
    width: 80%;
  }
`,$e=u.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875em;
    margin-bottom: 0.5em;
  }

  .profile_name {
    font-size: 1.875em;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${b.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875em;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1em;
  }
`,We=u.div`
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
        margin: 0 0.5em 0 0.5em;
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
`,Ge=u.div`
  border-left: 0.063em dotted #4a5568;
  border-right: 0.063em dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25em;

    svg text {
      font-family: ${b.fontFamily};
    }
  }
`,Ve=u.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;
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
`,He=u.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5em;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`,Ke=({user:t})=>{const a=ve(t==null?void 0:t.date_of_birth);return e.jsx($e,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:t.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:t.nationality||"IND"}),t.user_type==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:a||"N/A"}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(ue,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(be,{})})]})]})})})},Xe=({stats:t})=>e.jsx(We,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(ze,{size:"0.75em"}),e.jsx(g,{className:"views",size:"md",weight:500,children:t.views}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(je,{size:"0.75em"}),e.jsx(g,{className:"followers",size:"md",weight:500,children:t.followers||"0"}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(g,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:(t==null?void 0:t.joinedOn)||"OCT. 23rd, 2022"})]})]})}),Ye=({sponsors:t})=>{var a;return e.jsxs(Ve,{children:[e.jsx(g,{className:"sponsorship_text",component:"span",size:"sm",children:t.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(a=t.sponsorship)==null?void 0:a.map((n,o)=>e.jsx("img",{className:"sponsor_logo",src:n.logo,alt:n.name,style:{width:n.size}},o))})]})},Je={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},qe=({level:t})=>{const a=Je[t]||"#E2BB63";return e.jsx(Ge,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(fe,{fill:a,number:t})})})})},Qe=({userProfile:t,isSelf:a})=>{if(!t)return null;const{avatarUrl:n,coverImageUrl:o}=Se(t),{user_type:p,creator_profile:r,brand_profile:s,community_profile:d}=t,l=p===N.CREATOR?r:p===N.BRAND?s:d,h={views:(l==null?void 0:l.views)||"0",followers:(l==null?void 0:l.followers)||"0",joinedOn:new Date(t.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};return e.jsxs(De,{children:[e.jsx(pe,{coverImage:o,controls:a}),e.jsxs(Le,{children:[e.jsx(ke,{children:e.jsx(he,{avatar:n,radius:.35,size:"180",controls:a})}),e.jsxs(Me,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(Ke,{user:t}),e.jsx(Xe,{stats:h})]}),e.jsx(qe,{level:(l==null?void 0:l.rank)||1}),e.jsx(Ye,{sponsors:(t==null?void 0:t.sponsors)||[]}),e.jsx(He,{children:a?e.jsx("div",{className:"actions",children:e.jsx(H,{variant:"secondary",size:"xs",children:"Edit Profile"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"interaction",children:e.jsx(ne,{to:"/inbox",children:e.jsx(Te,{Icon:Ne,hoverClass:"hoverGrey"})})}),e.jsxs("div",{className:"actions",children:[e.jsx(xe,{targetUserId:t.id,onChange:v=>console.log("Followed:",v)}),e.jsx(H,{variant:"primary",size:"xs",children:"Sponsor"})]})]})})]})]})]})},Ze=u.div`
  position: relative;
  background-color: ${b.colors.secondaryGrey[0]};
  border-radius: ${b.radius.md};
  margin-top: 0.625em;
  padding: 1em 0.5em;

  button span {
    font-size: ${b.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${b.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5em;
      width: 100%;
      height: 0.125em;
      border-radius: 50em;
      background: ${b.colors.primary[0]};
    }
  }
`;function et({tabLists:t}){var p,r;const a=ie(),n=re(),o=((p=t.find(s=>n.pathname.startsWith(s.value)))==null?void 0:p.value)||((r=t[0])==null?void 0:r.value);return e.jsx(Ze,{children:e.jsx(x,{value:o,onChange:s=>a(s),variant:"none",children:e.jsx(x.List,{children:t.map(s=>e.jsx(x.Tab,{value:s.value,children:s.label},s.value))})})})}const R={self:[{label:"DASHBOARD",value:m.ACCOUNTS.DASHBOARD.ROOT},{label:"PROFILE",value:m.ACCOUNTS.PROFILE.ROOT},{label:"SPONSORSHIPS",value:m.ACCOUNTS.SPONSORSHIPS.ROOT},{label:"OFFERINGS",value:m.ACCOUNTS.OFFERINGS.ROOT},{label:"STATS",value:m.ACCOUNTS.STATS.ROOT},{label:"NEWSFEED",value:m.ACCOUNTS.NEWSFEED.ROOT},{label:"INBOX",value:m.ACCOUNTS.INBOX.ROOT}],otherCreator:t=>[{label:"PROFILE",value:m.helpers.profile(t)},{label:"SPONSORSHIPS",value:m.helpers.sponsorship(t)},{label:"OFFERINGS",value:m.helpers.offering(t)},{label:"INBOX",value:m.helpers.inbox(t)}],otherBrand:t=>[{label:"PROFILE",value:m.helpers.profile(t)},{label:"SPONSORSHIPS",value:m.helpers.sponsorship(t)},{label:"OFFERINGS",value:m.helpers.offering(t)},{label:"INBOX",value:m.helpers.inbox(t)}],otherCommunity:t=>[{label:"PROFILE",value:m.helpers.profile(t)},{label:"INBOX",value:m.helpers.inbox(t)}]};function zt(){var d;const{username:t}=le(),{user:a}=ce(de),{get:n}=Re(),[o,p]=G.useState(null),r=!t&&a||((d=a==null?void 0:a.username)==null?void 0:d.toLowerCase())===(t==null?void 0:t.toLowerCase());if(G.useEffect(()=>{if(window.scrollTo(0,0),!t||t===(a==null?void 0:a.username))return;(async()=>{try{const h=await Ee(n,t);p(h)}catch(h){console.error("Error fetching user data:",h)}})()},[t,a==null?void 0:a.username]),!r&&!o)return e.jsx(Ae,{});let s=R.self;if(!r&&(o!=null&&o.user_type))switch(o.user_type){case N.CREATOR:s=R.otherCreator(t);break;case N.BRAND:s=R.otherBrand(t);break;case N.COMMUNITY:s=R.otherCommunity(t);break}return e.jsxs(e.Fragment,{children:[e.jsx(Qe,{userProfile:r?a:o,isSelf:r}),e.jsx(et,{tabLists:s}),e.jsx(B,{mt:40,children:e.jsx(me,{context:{userProfile:r?a:o,isSelf:r}})})]})}export{zt as default};
