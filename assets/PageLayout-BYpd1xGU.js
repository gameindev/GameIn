import{f as P,u as A,j as e,B as R,c as Y,U as q,s as K,g as J,v as Q,w as Z,x as ee,t as u,d as m,l as te,i as se,q as ae,m as x,O as oe}from"./index-Dg9eACOL.js";import{C as ne}from"./CoverBanner-BD3bNdU-.js";import{A as ie}from"./AvatarSection-BLVdaIve.js";import{V as re,B as le,a as ce}from"./LevelBadge-B0rtYZVa.js";import{c as de}from"./createLucideIcon-MMBRSnsv.js";import{T as g}from"./Text-BBkJkHY-.js";import{U as me}from"./user-round-BFS80sz1.js";import{c as pe}from"./selectors-BfVctv7J.js";import{c as ue,u as he}from"./useProfileMediaUrl-D0qZl6aD.js";import{B as M}from"./Button-DpEVbpPo.js";import{g as ve}from"./get-auto-contrast-value-Da6zqqWm.js";import{c as fe}from"./ActionIcon-DMT6QUJS.js";import{u as be,a as xe}from"./DirectionProvider-Dvl7Qpn6.js";import{u as ge}from"./useApi-BdKJNy78.js";import"./modal-RMMwVJ9Y.js";import"./IconButton-DmhTJAbr.js";import"./Modal-CtIVw0_p.js";import"./FocusTrap-W_8BtrWM.js";import"./Paper-vI5tJrMe.js";import"./EditAvator-CLfID24-.js";import"./HexContainer-fQxL_Z7p.js";import"./Stack-BSbQn8pe.js";import"./Group-DP02tFHM.js";import"./Image-DB9ZBUvX.js";import"./FileInput-9YJQx90q.js";function V(t,a){return s=>{if(typeof s!="string"||s.trim().length===0)throw new Error(a);return`${t}-${s}`}}const[je,U]=fe("Tabs component was not found in the tree");var N={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const ye={},F=P((t,a)=>{const s=A("TabsList",ye,t),{children:o,className:l,grow:d,justify:i,classNames:c,styles:p,style:b,mod:h,...v}=s,r=U();return e.jsx(R,{...v,...r.getStyles("list",{className:l,style:b,classNames:c,styles:p,props:s,variant:r.variant}),ref:a,role:"tablist",variant:r.variant,mod:[{grow:d,orientation:r.orientation,placement:r.orientation==="vertical"&&r.placement,inverted:r.inverted},h],"aria-orientation":r.orientation,__vars:{"--tabs-justify":i},children:o})});F.classes=N;F.displayName="@mantine/core/TabsList";const Te={},$=P((t,a)=>{const s=A("TabsPanel",Te,t),{children:o,className:l,value:d,classNames:i,styles:c,style:p,mod:b,keepMounted:h,...v}=s,r=U(),j=r.value===d,y=r.keepMounted||h||j?o:null;return e.jsx(R,{...v,...r.getStyles("panel",{className:l,classNames:i,styles:c,style:[p,j?void 0:{display:"none"}],props:s}),ref:a,mod:[{orientation:r.orientation},b],role:"tabpanel",id:r.getPanelId(d),"aria-labelledby":r.getTabId(d),children:y})});$.classes=N;$.displayName="@mantine/core/TabsPanel";const Se={},L=P((t,a)=>{const s=A("TabsTab",Se,t),{className:o,children:l,rightSection:d,leftSection:i,value:c,onClick:p,onKeyDown:b,disabled:h,color:v,style:r,classNames:j,styles:y,vars:z,mod:w,tabIndex:O,...I}=s,B=Y(),{dir:_}=be(),n=U(),T=c===n.value,D=E=>{n.onChange(n.allowTabDeactivation&&c===n.value?null:c),p==null||p(E)},S={classNames:j,styles:y,props:s};return e.jsxs(q,{...I,...n.getStyles("tab",{className:o,style:r,variant:n.variant,...S}),disabled:h,unstyled:n.unstyled,variant:n.variant,mod:[{active:T,disabled:h,orientation:n.orientation,inverted:n.inverted,placement:n.orientation==="vertical"&&n.placement},w],ref:a,role:"tab",id:n.getTabId(c),"aria-selected":T,tabIndex:O!==void 0?O:T||n.value===null?0:-1,"aria-controls":n.getPanelId(c),onClick:D,__vars:{"--tabs-color":v?K(v,B):void 0},onKeyDown:ue({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:n.activateTabWithKeyboard,loop:n.loop,orientation:n.orientation||"horizontal",dir:_,onKeyDown:b}),children:[i&&e.jsx("span",{...n.getStyles("tabSection",S),"data-position":"left",children:i}),l&&e.jsx("span",{...n.getStyles("tabLabel",S),children:l}),d&&e.jsx("span",{...n.getStyles("tabSection",S),"data-position":"right",children:d})]})});L.classes=N;L.displayName="@mantine/core/TabsTab";const W="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",Ne={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},we=Q((t,{radius:a,color:s,autoContrast:o})=>({root:{"--tabs-radius":ee(a),"--tabs-color":K(s,t),"--tabs-text-color":ve(o,t)?Z({color:s,theme:t,autoContrast:o}):void 0}})),f=P((t,a)=>{const s=A("Tabs",Ne,t),{defaultValue:o,value:l,onChange:d,orientation:i,children:c,loop:p,id:b,activateTabWithKeyboard:h,allowTabDeactivation:v,variant:r,color:j,radius:y,inverted:z,placement:w,keepMounted:O,classNames:I,styles:B,unstyled:_,className:n,style:T,vars:D,autoContrast:S,mod:E,...H}=s,C=xe(b),[G,X]=ge({value:l,defaultValue:o,finalValue:null,onChange:d}),k=J({name:"Tabs",props:s,classes:N,className:n,style:T,classNames:I,styles:B,unstyled:_,vars:D,varsResolver:we});return e.jsx(je,{value:{placement:w,value:G,orientation:i,id:C,loop:p,activateTabWithKeyboard:h,getTabId:V(`${C}-tab`,W),getPanelId:V(`${C}-panel`,W),onChange:X,allowTabDeactivation:v,variant:r,color:j,radius:y,inverted:z,keepMounted:O,unstyled:_,getStyles:k},children:e.jsx(R,{ref:a,id:C,variant:r,mod:[{orientation:i,inverted:i==="horizontal"&&z,placement:i==="vertical"&&w},E],...k("root"),...H,children:c})})});f.classes=N;f.displayName="@mantine/core/Tabs";f.Tab=L;f.Panel=$;f.List=F;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],_e=de("eye",Oe),Ce=t=>{if(!t)return null;const a=new Date(t),s=new Date;let o=s.getFullYear()-a.getFullYear();const l=s.getMonth()-a.getMonth();return(l<0||l===0&&s.getDate()<a.getDate())&&o--,o},Pe=m.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${u.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`,Ae=m.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25em;
  background-color: ${u.colors.secondaryGrey[0]};
  color: white;
`,Re=m.div`
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
`,ze=m.div`
  margin-left: 12em;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5em;

  /* .personal_info {
    flex-grow: 1;
  } */
`,Ie=m.div`
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
    color: ${u.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875em;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1em;
  }
`,Be=m.div`
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
`,De=m.div`
  border-left: 0.063em dotted #4a5568;
  border-right: 0.063em dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25em;

    svg text {
      font-family: ${u.fontFamily};
    }
  }
`,Ee=m.div`
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
`,Ue=m.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`,Fe=({user:t})=>{const a=Ce(t==null?void 0:t.dateOfBirth);return e.jsx(Ie,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:t.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:t.nationality||"IND"}),t.userType==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:a||"N/A"}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(re,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(le,{})})]})]})})})},$e=({stats:t})=>e.jsx(Be,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(_e,{size:"0.75em"}),e.jsx(g,{className:"views",size:"md",weight:500,children:t.views}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(me,{size:"0.75em"}),e.jsx(g,{className:"followers",size:"md",weight:500,children:t==null?void 0:t.followers}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(g,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(g,{className:"helperText",size:"xs",color:"dimmed",children:(t==null?void 0:t.joinedOn)||"OCT. 23rd, 2022"})]})]})}),Le=({sponsors:t})=>{var a;return e.jsxs(Ee,{children:[e.jsx(g,{className:"sponsorship_text",component:"span",size:"sm",children:t.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(a=t.sponsorship)==null?void 0:a.map((s,o)=>e.jsx("img",{className:"sponsor_logo",src:s.logo,alt:s.name,style:{width:s.size}},o))})]})},ke={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},Me=({level:t})=>{const a=ke[t]||"#E2BB63";return e.jsx(De,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(ce,{fill:a,number:t})})})})},Ve=()=>{const{user:t}=te(pe),{avatarUrl:a,coverImageUrl:s}=he();if(!t)return null;const{userType:o,creatorProfile:l,brandProfile:d}=t,i=o==="CREATOR"?l:d,c={views:(i==null?void 0:i.views)||"0",followers:(i==null?void 0:i.followers)||"0",joinedOn:new Date(t.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};return e.jsxs(Pe,{children:[e.jsx(ne,{coverImage:s,controls:!0}),e.jsxs(Ae,{children:[e.jsx(Re,{children:e.jsx(ie,{avatar:a,radius:.35,size:"180",controls:!0})}),e.jsxs(ze,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(Fe,{user:t}),e.jsx($e,{stats:c})]}),e.jsx(Me,{level:(i==null?void 0:i.rank)||1}),e.jsx(Le,{sponsors:(t==null?void 0:t.sponsors)||[]}),e.jsx(Ue,{children:e.jsxs("div",{className:"actions",children:[e.jsx(M,{variant:"secondary",size:"xs",children:"Follow"}),e.jsx(M,{variant:"primary",size:"xs",children:"Sponsor"})]})})]})]})]})},We=m.div`
  position: relative;
  background-color: ${u.colors.secondaryGrey[0]};
  border-radius: ${u.radius.md};
  margin-top: 0.625em;
  padding: 1em 0.5em;

  button span {
    font-size: ${u.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${u.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5em;
      width: 100%;
      height: 0.125em;
      border-radius: 50em;
      background: ${u.colors.primary[0]};
    }
  }
`,Ke=[{value:x.ACCOUNTS.DASHBOARD.ROOT,label:"DASHBOARD"},{value:x.ACCOUNTS.PROFILE.ROOT,label:"PROFILE"},{value:x.ACCOUNTS.SPONSORSHIPS.ROOT,label:"SPONSORSHIPS"},{value:x.ACCOUNTS.OFFERINGS.ROOT,label:"OFFERINGS"},{value:x.ACCOUNTS.STATS.ROOT,label:"STATS"},{value:x.ACCOUNTS.NEWSFEED.ROOT,label:"NEWSFEED"},{value:x.ACCOUNTS.INBOX.ROOT,label:"INBOX"}];function He(){const t=se(),s=ae().pathname.split("/")[1];return e.jsx(We,{children:e.jsx(f,{value:s,onChange:o=>t(`/${o}`),variant:"none",children:e.jsx(f.List,{children:Ke.map(o=>{const l=o.value.replace("/","");return e.jsx(f.Tab,{value:l,children:o.label},l)})})})})}function xt(){return e.jsxs(e.Fragment,{children:[e.jsx(Ve,{}),e.jsx(He,{}),e.jsx(R,{mt:40,children:e.jsx(oe,{})})]})}export{xt as default};
