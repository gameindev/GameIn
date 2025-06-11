import{f as P,u as V,j as e,B as z,e as J,U as X,x as Z,b as q,c as Q,y as Y,z as e1,v as C,k as d,n as s1,l as t1,w as a1,s as f,O as o1}from"./index-DhWoYYuj.js";import{c as i1,s as r1,A as n1,a as l1}from"./authSelector-CDKIuWfw.js";import{c as c1}from"./createLucideIcon-Dhfnbx2H.js";import{T as u}from"./Text-SWpDDOIv.js";import{g as d1,U as m1}from"./user-round-WDXwX9DJ.js";import{B as U}from"./Button-W9esXZEa.js";import{c as p1}from"./create-safe-context-1C9Cs1Qv.js";import{u as C1,a as h1,b as x1}from"./DirectionProvider-vo_XRJJ_.js";function F(s,a){return t=>{if(typeof t!="string"||t.trim().length===0)throw new Error(a);return`${s}-${t}`}}const[v1,A]=p1("Tabs component was not found in the tree");var w={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const g1={},O=P((s,a)=>{const t=V("TabsList",g1,s),{children:i,className:l,grow:m,justify:c,classNames:n,styles:p,style:g,mod:h,...x}=t,r=A();return e.jsx(z,{...x,...r.getStyles("list",{className:l,style:g,classNames:n,styles:p,props:t,variant:r.variant}),ref:a,role:"tablist",variant:r.variant,mod:[{grow:m,orientation:r.orientation,placement:r.orientation==="vertical"&&r.placement,inverted:r.inverted},h],"aria-orientation":r.orientation,__vars:{"--tabs-justify":c},children:i})});O.classes=w;O.displayName="@mantine/core/TabsList";const f1={},$=P((s,a)=>{const t=V("TabsPanel",f1,s),{children:i,className:l,value:m,classNames:c,styles:n,style:p,mod:g,keepMounted:h,...x}=t,r=A(),b=r.value===m,j=r.keepMounted||h||b?i:null;return e.jsx(z,{...x,...r.getStyles("panel",{className:l,classNames:c,styles:n,style:[p,b?void 0:{display:"none"}],props:t}),ref:a,mod:[{orientation:r.orientation},g],role:"tabpanel",id:r.getPanelId(m),"aria-labelledby":r.getTabId(m),children:j})});$.classes=w;$.displayName="@mantine/core/TabsPanel";const u1={},R=P((s,a)=>{const t=V("TabsTab",u1,s),{className:i,children:l,rightSection:m,leftSection:c,value:n,onClick:p,onKeyDown:g,disabled:h,color:x,style:r,classNames:b,styles:j,vars:B,mod:T,tabIndex:_,...I}=t,E=J(),{dir:S}=C1(),o=A(),y=n===o.value,M=k=>{o.onChange(o.allowTabDeactivation&&n===o.value?null:n),p==null||p(k)},L={classNames:b,styles:j,props:t};return e.jsxs(X,{...I,...o.getStyles("tab",{className:i,style:r,variant:o.variant,...L}),disabled:h,unstyled:o.unstyled,variant:o.variant,mod:[{active:y,disabled:h,orientation:o.orientation,inverted:o.inverted,placement:o.orientation==="vertical"&&o.placement},T],ref:a,role:"tab",id:o.getTabId(n),"aria-selected":y,tabIndex:_!==void 0?_:y||o.value===null?0:-1,"aria-controls":o.getPanelId(n),onClick:M,__vars:{"--tabs-color":x?Z(x,E):void 0},onKeyDown:i1({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:o.activateTabWithKeyboard,loop:o.loop,orientation:o.orientation||"horizontal",dir:S,onKeyDown:g}),children:[c&&e.jsx("span",{...o.getStyles("tabSection",L),"data-position":"left",children:c}),l&&e.jsx("span",{...o.getStyles("tabLabel",L),children:l}),m&&e.jsx("span",{...o.getStyles("tabSection",L),"data-position":"right",children:m})]})});R.classes=w;R.displayName="@mantine/core/TabsTab";const D="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",b1={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},j1=Q((s,{radius:a,color:t,autoContrast:i})=>({root:{"--tabs-radius":e1(a),"--tabs-color":Z(t,s),"--tabs-text-color":d1(i,s)?Y({color:t,theme:s,autoContrast:i}):void 0}})),v=P((s,a)=>{const t=V("Tabs",b1,s),{defaultValue:i,value:l,onChange:m,orientation:c,children:n,loop:p,id:g,activateTabWithKeyboard:h,allowTabDeactivation:x,variant:r,color:b,radius:j,inverted:B,placement:T,keepMounted:_,classNames:I,styles:E,unstyled:S,className:o,style:y,vars:M,autoContrast:L,mod:k,...G}=t,N=h1(g),[W,K]=x1({value:l,defaultValue:i,finalValue:null,onChange:m}),H=q({name:"Tabs",props:t,classes:w,className:o,style:y,classNames:I,styles:E,unstyled:S,vars:M,varsResolver:j1});return e.jsx(v1,{value:{placement:T,value:W,orientation:c,id:N,loop:p,activateTabWithKeyboard:h,getTabId:F(`${N}-tab`,D),getPanelId:F(`${N}-panel`,D),onChange:K,allowTabDeactivation:x,variant:r,color:b,radius:j,inverted:B,keepMounted:_,unstyled:S,getStyles:H},children:e.jsx(z,{ref:a,id:N,variant:r,mod:[{orientation:c,inverted:c==="horizontal"&&B,placement:c==="vertical"&&T},k],...H("root"),...G,children:n})})});v.classes=w;v.displayName="@mantine/core/Tabs";v.Tab=R;v.Panel=$;v.List=O;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],L1=c1("eye",y1),w1=d.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${C.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3); */
`,T1=d.div`
  position: relative;
  width: 100%;
  height: 9.5rem;
  background-color: #4a5568;
  overflow: hidden;

  .banner_image {
    width: 100%;
    height: 100%;
    background-image: url("/banner.jpg");
    background-size: cover;
    background-position: center;
  }
`,_1=d.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background-color: ${C.colors.secondaryGrey[0]};
  color: white;
`,S1=d.div`
  position: absolute;
  top: -8rem;
  left: 0rem;
  /* width: 10.625rem;
  height: 11.875rem; */
  overflow: hidden;

  .profile_avatar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.063rem solid #50565a;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`,N1=d.div`
  margin-left: 13rem;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;

  /* .personal_info {
    flex-grow: 1;
  } */
`,P1=d.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875rem;
    margin-bottom: 0.5rem;
  }

  .profile_name {
    font-size: 1.875rem;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${C.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875rem;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`,V1=d.div`
  .profile_stats {
    display: flex;
    justify-content: flex-start;
    gap: 1.25rem;
    color: white;

    .stats_section {
      text-align: center;
      display: flex;
      align-items: center;

      .views,
      .followers,
      .joined {
        font-size: 0.625rem;
        margin: 0 0.188rem 0 0.5rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .helperText {
        font-size: 0.625rem;
        font-weight: 400;
        color: #a0aec0;
        text-transform: uppercase;
      }
    }
  }
`,z1=d.div`
  border-left: 0.063rem dotted #4a5568;
  border-right: 0.063rem dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25rem;

    svg text {
      font-family: ${C.fontFamily};
    }
  }
`,B1=d.div`
  display: flex;
  align-items: end;
  gap: 2.5rem;
  font-size: 0.875rem;
  color: #a0aec0;
  padding: 0.5rem;
  border-right: 0.063rem dotted #4a5568;
  margin-right: auto;

  .sponsorship_text {
    font-size: 0.625rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .sponsorship_badge {
    background-color: #2b6cb0;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }
`,I1=d.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`,E1=({coverImage:s})=>e.jsxs(T1,{children:[e.jsx("div",{className:"banner_overlay"}),e.jsx("div",{className:"banner_image",children:e.jsx("img",{src:s,alt:"Cover"})})]}),M1=({user:s})=>e.jsx(P1,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:s.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:s.nationality||"IND"}),s.userType==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:s.age||24}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:11,height:11,viewBox:"0 0 11 11",fill:"none",children:[e.jsx("path",{d:"M5.9541 1.23971L7.44311 0.75772C7.56082 0.719636 7.68822 0.724686 7.80255 0.771956C7.91688 0.819227 8.01069 0.905627 8.06714 1.01572L8.77911 2.40973C8.8288 2.50721 8.90786 2.58661 9.00513 2.63672L10.3991 3.34872C10.5091 3.40498 10.5955 3.49857 10.6428 3.61273C10.69 3.72689 10.6951 3.85416 10.6571 3.97172L10.1751 5.46072C10.1411 5.56502 10.1411 5.67742 10.1751 5.78172L10.6571 7.27072C10.6951 7.38829 10.69 7.51555 10.6428 7.62971C10.5955 7.74387 10.5091 7.83746 10.3991 7.89372L9.00513 8.60573C8.90762 8.6555 8.82846 8.73499 8.77911 8.83272L8.06714 10.2257C8.0107 10.3359 7.91697 10.4223 7.80267 10.4698C7.68838 10.5172 7.56095 10.5225 7.44311 10.4847L5.9541 10.0027C5.8498 9.96873 5.73742 9.96873 5.63312 10.0027L4.14508 10.4847C4.02726 10.5227 3.8998 10.5175 3.78546 10.4701C3.67112 10.4226 3.5774 10.336 3.52112 10.2257L2.80908 8.83272C2.75931 8.73496 2.67985 8.6555 2.58209 8.60573L1.18909 7.89372C1.07889 7.83763 0.99235 7.7441 0.944885 7.62993C0.897419 7.51575 0.892166 7.3884 0.930114 7.27072L1.41211 5.78172C1.4461 5.67742 1.4461 5.56502 1.41211 5.46072L0.930114 3.97172C0.892166 3.85404 0.897419 3.72669 0.944885 3.61252C0.99235 3.49834 1.07889 3.40482 1.18909 3.34872L2.58209 2.63672C2.67964 2.58666 2.75903 2.50728 2.80908 2.40973L3.52112 1.01572C3.57756 0.905627 3.67132 0.819227 3.78564 0.771956C3.89997 0.724686 4.02737 0.719636 4.14508 0.75772L5.63312 1.23971C5.73742 1.2737 5.8498 1.2737 5.9541 1.23971Z",fill:"#69B3E7"}),e.jsx("path",{d:"M5.13702 7.51855L3.52905 5.91055L4.10608 5.33356L5.13702 6.36455L7.48206 4.01855L8.05902 4.59555L5.13702 7.51855Z",fill:"#33363A"})]})}),e.jsx("div",{className:"badge_info",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:10,height:11,viewBox:"0 0 10 11",fill:"none",children:[e.jsx("path",{d:"M8.82996 3.005L5.03797 0.815002C4.94343 0.760887 4.83641 0.732422 4.72748 0.732422C4.61855 0.732422 4.51153 0.760887 4.41699 0.815002L0.623964 3.005C0.529624 3.05959 0.451328 3.13805 0.396913 3.23248C0.342497 3.32692 0.313881 3.43401 0.313966 3.543V7.92201C0.313751 8.0309 0.342292 8.13789 0.39673 8.23219C0.451167 8.32649 0.529565 8.40473 0.623964 8.459L4.41699 10.649C4.5114 10.7035 4.61847 10.7322 4.72748 10.7322C4.83649 10.7322 4.94356 10.7035 5.03797 10.649L8.82996 8.459C8.92436 8.40473 9.00275 8.32649 9.05719 8.23219C9.11163 8.13789 9.14017 8.0309 9.13995 7.92201V3.543C9.14004 3.43401 9.11148 3.32692 9.05707 3.23248C9.00265 3.13805 8.9243 3.05959 8.82996 3.005Z",fill:"#E2BB63"}),e.jsx("path",{d:"M3.61816 4.04785C3.95508 4.04785 4.24642 4.11296 4.49219 4.24316C4.84863 4.43034 5.06673 4.7583 5.14648 5.22705H4.66553C4.60693 4.96501 4.48568 4.77458 4.30176 4.65576C4.11784 4.53532 3.8859 4.4751 3.60596 4.4751C3.27393 4.4751 2.99398 4.59961 2.76611 4.84863C2.53988 5.09766 2.42676 5.46875 2.42676 5.96191C2.42676 6.38835 2.52035 6.73584 2.70752 7.00439C2.89469 7.27132 3.19987 7.40479 3.62305 7.40479C3.94694 7.40479 4.21468 7.3112 4.42627 7.12402C4.63949 6.93522 4.74854 6.63086 4.75342 6.21094H3.63037V5.80811H5.20508V7.72705H4.89258L4.77539 7.26562C4.611 7.44629 4.46533 7.57161 4.33838 7.6416C4.12516 7.76204 3.85417 7.82227 3.52539 7.82227C3.10059 7.82227 2.73519 7.68473 2.4292 7.40967C2.09554 7.06462 1.92871 6.59098 1.92871 5.98877C1.92871 5.38818 2.09147 4.91048 2.41699 4.55566C2.72624 4.21712 3.12663 4.04785 3.61816 4.04785ZM6.00586 4.14062H7.61963C7.93864 4.14062 8.1958 4.23096 8.39111 4.41162C8.58643 4.59066 8.68408 4.84294 8.68408 5.16846C8.68408 5.4484 8.59701 5.69255 8.42285 5.90088C8.2487 6.10758 7.98096 6.21094 7.61963 6.21094H6.4917V7.72705H6.00586V4.14062ZM8.19336 5.1709C8.19336 4.90723 8.0957 4.72819 7.90039 4.63379C7.79297 4.58333 7.64567 4.55811 7.4585 4.55811H6.4917V5.80078H7.4585C7.6766 5.80078 7.85319 5.75439 7.98828 5.66162C8.125 5.56885 8.19336 5.40527 8.19336 5.1709Z",fill:"#33363A"})]})})]})]})})}),k1=({stats:s})=>e.jsx(V1,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(L1,{size:"0.75rem"}),e.jsx(u,{className:"views",size:"md",weight:500,children:s.views||"11,294"}),e.jsx(u,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(m1,{size:"0.75rem"}),e.jsx(u,{className:"followers",size:"md",weight:500,children:(s==null?void 0:s.followers)||"1124"}),e.jsx(u,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(u,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(u,{className:"helperText",size:"xs",color:"dimmed",children:(s==null?void 0:s.joined)||"OCT. 23rd, 2022"})]})]})}),A1=({sponsors:s})=>{var a;return e.jsxs(B1,{children:[e.jsx(u,{className:"sponsorship_text",component:"span",size:"sm",children:s.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(a=s.sponsorship)==null?void 0:a.map((t,i)=>e.jsx("img",{className:"sponsor_logo",src:t.logo,alt:t.name,style:{width:t.size}},i))})]})},O1={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},$1=[{id:"Path 1022",d:"M4.11988 49.7958L2.5199 48.8648C2.47686 48.8395 2.42781 48.8262 2.37787 48.8262C2.32794 48.8262 2.27894 48.8395 2.2359 48.8648L0.635867 49.7958C0.592451 49.8213 0.556481 49.8576 0.531558 49.9013C0.506636 49.945 0.493668 49.9946 0.4939 50.0449V51.9069C0.493668 51.9572 0.506636 52.0067 0.531558 52.0504C0.556481 52.0941 0.592451 52.1304 0.635867 52.1558L2.2359 53.0869C2.27894 53.1122 2.32794 53.1255 2.37787 53.1255C2.42781 53.1255 2.47686 53.1122 2.5199 53.0869L4.11988 52.1558C4.16329 52.1304 4.19926 52.0941 4.22419 52.0504C4.24911 52.0067 4.26214 51.9572 4.2619 51.9069V50.0449C4.26214 49.9946 4.24911 49.945 4.22419 49.9013C4.19926 49.8576 4.16329 49.8213 4.11988 49.7958Z"},{id:"Path 1023",d:"M10.897 49.7958L9.297 48.8648C9.25396 48.8395 9.20491 48.8262 9.15497 48.8262C9.10504 48.8262 9.05604 48.8395 9.013 48.8648L7.41303 49.7958C7.36961 49.8213 7.33358 49.8576 7.30866 49.9013C7.28374 49.945 7.27077 49.9946 7.271 50.0449V51.9069C7.27077 51.9572 7.28374 52.0067 7.30866 52.0504C7.33358 52.0941 7.36961 52.1304 7.41303 52.1558L9.013 53.0869C9.05604 53.1122 9.10504 53.1255 9.15497 53.1255C9.20491 53.1255 9.25396 53.1122 9.297 53.0869L10.897 52.1558C10.9404 52.1304 10.9764 52.0941 11.0013 52.0504C11.0262 52.0067 11.0392 51.9572 11.039 51.9069V50.0449C11.0392 49.9946 11.0262 49.945 11.0013 49.9013C10.9764 49.8576 10.9404 49.8213 10.897 49.7958Z"},{id:"Path 1024",d:"M17.6729 49.7958L16.0729 48.8648C16.0298 48.8395 15.9808 48.8262 15.9309 48.8262C15.881 48.8262 15.8319 48.8395 15.7889 48.8648L14.1889 49.7958C14.1455 49.8213 14.1095 49.8576 14.0846 49.9013C14.0597 49.945 14.0466 49.9946 14.0469 50.0449V51.9069C14.0466 51.9572 14.0597 52.0067 14.0846 52.0504C14.1095 52.0941 14.1455 52.1304 14.1889 52.1558L15.7889 53.0869C15.8319 53.1122 15.881 53.1255 15.9309 53.1255C15.9808 53.1255 16.0298 53.1122 16.0729 53.0869L17.6729 52.1558C17.7163 52.1304 17.7523 52.0941 17.7772 52.0504C17.8021 52.0067 17.8151 51.9572 17.8149 51.9069V50.0449C17.8151 49.9946 17.8021 49.945 17.7772 49.9013C17.7523 49.8576 17.7163 49.8213 17.6729 49.7958Z"},{id:"Path 1025",d:"M24.45 49.7958L22.85 48.8648C22.8069 48.8395 22.7579 48.8262 22.708 48.8262C22.6581 48.8262 22.609 48.8395 22.566 48.8648L20.966 49.7958C20.9226 49.8213 20.8866 49.8576 20.8617 49.9013C20.8368 49.945 20.8237 49.9946 20.824 50.0449V51.9069C20.8237 51.9572 20.8368 52.0067 20.8617 52.0504C20.8866 52.0941 20.9226 52.1304 20.966 52.1558L22.566 53.0869C22.609 53.1122 22.6581 53.1255 22.708 53.1255C22.7579 53.1255 22.8069 53.1122 22.85 53.0869L24.45 52.1558C24.4934 52.1304 24.5294 52.0941 24.5543 52.0504C24.5792 52.0067 24.5922 51.9572 24.592 51.9069V50.0449C24.5922 49.9946 24.5792 49.945 24.5543 49.9013C24.5294 49.8576 24.4934 49.8213 24.45 49.7958Z"},{id:"Path 1026",d:"M31.2258 49.7958L29.6259 48.8648C29.5828 48.8395 29.5338 48.8262 29.4838 48.8262C29.4339 48.8262 29.3849 48.8395 29.3419 48.8648L27.7418 49.7958C27.6984 49.8213 27.6624 49.8576 27.6375 49.9013C27.6126 49.945 27.5996 49.9946 27.5999 50.0449V51.9069C27.5996 51.9572 27.6126 52.0067 27.6375 52.0504C27.6624 52.0941 27.6984 52.1304 27.7418 52.1558L29.3419 53.0869C29.3849 53.1122 29.4339 53.1255 29.4838 53.1255C29.5338 53.1255 29.5828 53.1122 29.6259 53.0869L31.2258 52.1558C31.2692 52.1304 31.3052 52.0941 31.3301 52.0504C31.3551 52.0067 31.3681 51.9572 31.3679 51.9069V50.0449C31.3681 49.9946 31.3551 49.945 31.3301 49.9013C31.3052 49.8576 31.2692 49.8213 31.2258 49.7958Z"},{id:"Path 1027",d:"M38.002 49.7958L36.402 48.8648C36.3589 48.8395 36.3099 48.8262 36.26 48.8262C36.21 48.8262 36.161 48.8395 36.118 48.8648L34.5179 49.7958C34.4745 49.8213 34.4386 49.8576 34.4136 49.9013C34.3887 49.945 34.3757 49.9946 34.376 50.0449V51.9069C34.3757 51.9572 34.3887 52.0067 34.4136 52.0504C34.4386 52.0941 34.4745 52.1304 34.5179 52.1558L36.118 53.0869C36.161 53.1122 36.21 53.1255 36.26 53.1255C36.3099 53.1255 36.3589 53.1122 36.402 53.0869L38.002 52.1558C38.0454 52.1304 38.0813 52.0941 38.1063 52.0504C38.1312 52.0067 38.1442 51.9572 38.144 51.9069V50.0449C38.1442 49.9946 38.1312 49.945 38.1063 49.9013C38.0813 49.8576 38.0454 49.8213 38.002 49.7958Z"}],R1=({fill:s="#E2BB63",number:a="6"})=>e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2.438rem",height:"3.375rem",viewBox:"0 0 39 54",fill:"none",children:[e.jsxs("g",{id:"Group 3307",children:[e.jsx("g",{id:"Group 3297",children:e.jsx("g",{id:"Group 3296",children:$1.map((t,i)=>e.jsx("path",{id:t.id,d:t.d,fill:i<a?s:"#50565A"},t.id))})}),e.jsxs("g",{id:"Group 3268",children:[e.jsx("path",{id:"Path 1021",d:"M36.642 10.514L20.7549 1.25409C20.3261 1.00329 19.8383 0.871094 19.3415 0.871094C18.8447 0.871094 18.3568 1.00329 17.928 1.25409L2.04096 10.514C1.60974 10.7665 1.25226 11.1277 1.00416 11.5614C0.756049 11.9952 0.625977 12.4864 0.626959 12.9861V31.514C0.625977 32.0137 0.756049 32.505 1.00416 32.9387C1.25226 33.3725 1.60974 33.7336 2.04096 33.9861L17.928 43.246C18.3568 43.4968 18.8447 43.629 19.3415 43.629C19.8383 43.629 20.3261 43.4968 20.7549 43.246L36.642 33.9861C37.0732 33.7336 37.4307 33.3725 37.6788 32.9387C37.9269 32.505 38.057 32.0137 38.056 31.514V12.9891C38.057 12.4894 37.9269 11.9981 37.6788 11.5644C37.4307 11.1306 37.0732 10.7696 36.642 10.5171",fill:s}),e.jsx("path",{id:"Path 8857",d:"M36.6409 10.514L20.754 1.25409C20.3251 1.00329 19.8373 0.871094 19.3405 0.871094C18.8437 0.871094 18.3558 1.00329 17.9269 1.25409L2.03998 10.514C1.60876 10.7665 1.25123 11.1277 1.00312 11.5614C0.755011 11.9952 0.625 12.4864 0.625982 12.9861V31.514C0.625 32.0137 0.755011 32.505 1.00312 32.9387C1.25123 33.3725 1.60876 33.7336 2.03998 33.9861L17.9269 43.246C18.3558 43.4968 18.8437 43.629 19.3405 43.629C19.8373 43.629 20.3251 43.4968 20.754 43.246L36.6409 33.9861C37.0722 33.7336 37.4297 33.3725 37.6778 32.9387C37.9259 32.505 38.0559 32.0137 38.0549 31.514V12.9891C38.0559 12.4894 37.9259 11.9981 37.6778 11.5644C37.4297 11.1306 37.0722 10.7696 36.6409 10.5171",fill:"url(#paint0_linear_2_2584)"}),e.jsx("text",{id:a,fill:"#363A3E",xmlSpace:"preserve",style:{whiteSpace:"pre"},fontFamily:"Helvetica",fontSize:16,letterSpacing:"0em",children:e.jsx("tspan",{x:14.343,y:26.4497,children:a})}),e.jsx("path",{id:"Path 1028",opacity:.4,d:"M34.782 11.7801L20.605 3.51611C20.2221 3.2929 19.7868 3.17529 19.3436 3.17529C18.9003 3.17529 18.465 3.2929 18.082 3.51611L3.90503 11.7801C3.52054 12.0057 3.20183 12.3281 2.98059 12.7151C2.75936 13.1021 2.64334 13.5403 2.64405 13.9861V30.5131C2.64334 30.9589 2.75936 31.3971 2.98059 31.7841C3.20183 32.1711 3.52054 32.4935 3.90503 32.7191L18.082 40.9831C18.465 41.2063 18.9003 41.3239 19.3436 41.3239C19.7868 41.3239 20.2221 41.2063 20.605 40.9831L34.782 32.7191C35.1667 32.4936 35.4857 32.1713 35.7071 31.7843C35.9285 31.3973 36.0447 30.959 36.0441 30.5131V13.9861C36.0447 13.5402 35.9285 13.1019 35.7071 12.7149C35.4857 12.3279 35.1667 12.0056 34.782 11.7801Z",stroke:"#363A3E",strokeWidth:2,strokeMiterlimit:10})]})]}),e.jsx("defs",{children:e.jsxs("linearGradient",{id:"paint0_linear_2_2584",x1:15.8221,y1:6.25859,x2:2.37739,y2:24.4615,gradientUnits:"userSpaceOnUse",children:[e.jsx("stop",{stopColor:"#3C4044",stopOpacity:.2}),e.jsx("stop",{offset:.515,stopColor:"#3C4044",stopOpacity:0}),e.jsx("stop",{offset:.55,stopColor:"#3C4044",stopOpacity:.2}),e.jsx("stop",{offset:1,stopColor:"#3C4044",stopOpacity:0})]})})]}),H1=({level:s})=>{const a=O1[s]||"#E2BB63";return e.jsx(z1,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(R1,{fill:a,number:s})})})})},U1="/GameIn/assets/cover_image--vHHgeRB.jpg",F1=()=>{const s={avatar:l1,coverImage:U1,stats:{views:"11254",followers:"1125",joinedOn:"OCT 23rd, 2022"},level:5},a=s1(r1);return e.jsx(e.Fragment,{children:e.jsxs(w1,{children:[e.jsx(E1,{coverImage:s.coverImage}),e.jsxs(_1,{children:[e.jsx(S1,{children:e.jsx(n1,{avatar:s.avatar,size:"15em"})}),e.jsxs(N1,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(M1,{user:a}),e.jsx(k1,{stats:s.stats})]}),e.jsx(H1,{level:s.level}),e.jsx(A1,{sponsors:a}),e.jsx(I1,{children:e.jsxs("div",{className:"actions",children:[e.jsx(U,{variant:"secondary",size:"xs",padding:"0.25rem 0.5rem",width:"6.25rem",children:"Follow"}),e.jsx(U,{variant:"primary",size:"xs",padding:"0.25rem 0.5rem",width:"6.25rem",children:"Sponsor"})]})})]})]})]})})},D1=d.div`
  position: relative;
  background-color: ${C.colors.secondaryGrey[0]};
  border-radius: ${C.radius.md};
  margin-top: 0.625rem;
  padding: 1rem 0.5rem;

  button span {
    font-size: ${C.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${C.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5rem;
      width: 100%;
      height: 0.125rem;
      border-radius: 50rem;
      background: ${C.colors.primary[0]};
    }
  }
`,Z1=[{value:f.dashboard,label:"DASHBOARD"},{value:f.profile,label:"PROFILE"},{value:f.sponsorships,label:"SPONSORSHIPS"},{value:f.offerings,label:"OFFERINGS"},{value:f.stats,label:"STATS"},{value:f.newsfeed,label:"NEWSFEED"},{value:f.inbox,label:"INBOX"}];function G1(){const s=t1(),t=a1().pathname.split("/")[1];return e.jsx(D1,{children:e.jsx(v,{value:t,onChange:i=>s(`/${i}`),variant:"none",children:e.jsx(v.List,{children:Z1.map(i=>{const l=i.value.replace("/","");return e.jsx(v.Tab,{value:l,children:i.label},l)})})})})}function s2(){return console.log("PageLayout"),e.jsxs(e.Fragment,{children:[e.jsx(F1,{}),e.jsx(G1,{}),e.jsx(z,{mt:40,children:e.jsx(o1,{})})]})}export{s2 as default};
