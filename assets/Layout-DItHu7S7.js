import{r as k,c as Ce,f as K,u as N,j as e,B as ae,a as V,p as le,b as ce,e as de,U as q,g as Le,h as Te,i as J,d as Q,k as Ae,l as me,m as B,n as ue,o as pe,q as D,L as m,s as re,v as Ee,w as Pe,t as ie,x as Oe,y as Fe,O as Re,z as _e}from"./index-Ddh2FbSx.js";import{G as he}from"./gamein-logo-OLN3yQ-G.js";import{c as z}from"./creator_image-C6LzQUPk.js";import{A as U,H as $e}from"./AvatarSection-rpQ3v9TR.js";import{p as ze}from"./useProfileMediaUrl-DRGexTqt.js";import{C as xe,P as Ue}from"./plus-D844hIS-.js";import{f as Ge,c as fe}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as Be}from"./InputBase-CeXKGc7g.js";import{P as R}from"./Popover-aw1Pz-Fv.js";import{u as ge,a as Ke}from"./DirectionProvider-DznSjpHc.js";import{c as Ve}from"./create-optional-context-IBslluko.js";import{A as He}from"./AccordionChevron-Cp8RyjUV.js";import{i as je}from"./FocusTrap-BR_CIkjN.js";import{u as We}from"./modal-BrqPe0S_.js";import{u as qe}from"./use-uncontrolled-DUnM3McR.js";import{T as Je}from"./TextInput-nn2H34KY.js";import{T as F}from"./Title-BF2Ea30k.js";import{S as Qe,F as Ye}from"./star--91wJu6d.js";import{g as Xe}from"./index-8AOQfsCY.js";import"./HexContainer-CYqX8Osk.js";import"./EditAvator-DzLDPkaX.js";import"./Stack-DQps_MKj.js";import"./Group-DpkmbcfE.js";import"./FileInput-BqiUkdXR.js";import"./FileButton-rdLhRiWF.js";import"./Image-DoFcPglF.js";import"./Paper-BSpVnLm3.js";import"./get-floating-position-_di4TTIy.js";import"./Modal-DT7K7fYe.js";import"./index-Pf2rS8iD.js";function b(s,t){return o=>{s==null||s(o),t==null||t(o)}}function Ze(s,t,o){var r;return o?Array.from(((r=Ge(o,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(i=>i===o):null}function ye({open:s,close:t,openDelay:o,closeDelay:r}){const i=k.useRef(-1),n=k.useRef(-1),u=()=>{window.clearTimeout(i.current),window.clearTimeout(n.current)},a=()=>{u(),o===0||o===void 0?s():i.current=window.setTimeout(s,o)},l=()=>{u(),r===0||r===void 0?t():n.current=window.setTimeout(t,r)};return k.useEffect(()=>u,[]),{openDropdown:a,closeDropdown:l}}const[es,L]=Ce("Menu component was not found in the tree");var T={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const Y=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,...a}=N("MenuDivider",null,s),l=L();return e.jsx(ae,{ref:t,...l.getStyles("divider",{className:r,style:i,styles:n,classNames:o}),...a})});Y.classes=T;Y.displayName="@mantine/core/MenuDivider";const X=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,onMouseEnter:a,onMouseLeave:l,onKeyDown:g,children:j,...y}=N("MenuDropdown",null,s),f=k.useRef(null),p=L(),h=b(g,w=>{var C,A;(w.key==="ArrowUp"||w.key==="ArrowDown")&&(w.preventDefault(),(A=(C=f.current)==null?void 0:C.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||A.focus())}),d=b(a,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.openDropdown()),c=b(l,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.closeDropdown());return e.jsxs(R.Dropdown,{...y,onMouseEnter:d,onMouseLeave:c,role:"menu","aria-orientation":"vertical",ref:V(t,f),...p.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:h,children:[p.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),j]})});X.classes=T;X.displayName="@mantine/core/MenuDropdown";const[ss,H]=Ve(),Z=le((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,color:a,closeMenuOnClick:l,leftSection:g,rightSection:j,children:y,disabled:f,"data-disabled":p,...h}=N("MenuItem",null,s),d=L(),c=H(),w=ce(),{dir:C}=ge(),A=k.useRef(null),I=h,M=b(I.onClick,()=>{p||(typeof l=="boolean"?l&&d.closeDropdownImmediately():d.closeOnItemClick&&d.closeDropdownImmediately())}),v=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,S=a?de({color:a,theme:w}):null,$=b(I.onKeyDown,E=>{E.key==="ArrowLeft"&&c&&(c.close(),c.focusParentItem())});return e.jsxs(q,{onMouseDown:E=>E.preventDefault(),...h,unstyled:d.unstyled,tabIndex:d.menuItemTabIndex,...d.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:V(A,t),role:"menuitem",disabled:f,"data-menu-item":!0,"data-disabled":f||p||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:fe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:d.loop,dir:C,orientation:"vertical",onKeyDown:$}),__vars:{"--menu-item-color":S!=null&&S.isThemeColor&&(S==null?void 0:S.shade)===void 0?`var(--mantine-color-${S.color}-6)`:v==null?void 0:v.color,"--menu-item-hover":v==null?void 0:v.hover},children:[g&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:g}),y&&e.jsx("div",{...d.getStyles("itemLabel",{styles:n,classNames:o}),children:y}),j&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:j})]})});Z.classes=T;Z.displayName="@mantine/core/MenuItem";const ee=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,...a}=N("MenuLabel",null,s),l=L();return e.jsx(ae,{ref:t,...l.getStyles("label",{className:r,style:i,styles:n,classNames:o}),...a})});ee.classes=T;ee.displayName="@mantine/core/MenuLabel";const se=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,onMouseEnter:a,onMouseLeave:l,onKeyDown:g,children:j,...y}=N("MenuSubDropdown",null,s),f=k.useRef(null),p=L(),h=H(),d=b(a,h==null?void 0:h.open),c=b(l,h==null?void 0:h.close);return e.jsx(R.Dropdown,{...y,onMouseEnter:d,onMouseLeave:c,role:"menu","aria-orientation":"vertical",ref:V(t,f),...p.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:j})});se.classes=T;se.displayName="@mantine/core/MenuSubDropdown";const oe=le((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,color:a,leftSection:l,rightSection:g,children:j,disabled:y,"data-disabled":f,closeMenuOnClick:p,...h}=N("MenuSubItem",null,s),d=L(),c=H(),w=ce(),{dir:C}=ge(),A=k.useRef(null),I=h,M=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,v=a?de({color:a,theme:w}):null,S=b(I.onKeyDown,O=>{O.key==="ArrowRight"&&(c==null||c.open(),c==null||c.focusFirstItem()),O.key==="ArrowLeft"&&(c!=null&&c.parentContext)&&(c.parentContext.close(),c.parentContext.focusParentItem())}),$=b(I.onClick,()=>{!f&&p&&d.closeDropdownImmediately()}),E=b(I.onMouseEnter,c==null?void 0:c.open),P=b(I.onMouseLeave,c==null?void 0:c.close);return e.jsxs(q,{onMouseDown:O=>O.preventDefault(),...h,unstyled:d.unstyled,tabIndex:d.menuItemTabIndex,...d.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:V(A,t),role:"menuitem",disabled:y,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":y||f||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:E,onMouseLeave:P,onClick:$,onKeyDown:fe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:d.loop,dir:C,orientation:"vertical",onKeyDown:S}),__vars:{"--menu-item-color":v!=null&&v.isThemeColor&&(v==null?void 0:v.shade)===void 0?`var(--mantine-color-${v.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[l&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:l}),j&&e.jsx("div",{...d.getStyles("itemLabel",{styles:n,classNames:o}),children:j}),e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:g||e.jsx(He,{...d.getStyles("chevron"),size:14})})]})});oe.classes=T;oe.displayName="@mantine/core/MenuSubItem";function ve({children:s,refProp:t}){if(!je(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return L(),e.jsx(R.Target,{refProp:t,popupType:"menu",children:s})}ve.displayName="@mantine/core/MenuSubTarget";const os={offset:0,position:"right-start",transitionProps:{duration:0},middlewares:{shift:{crossAxis:!0}}};function _(s){const{children:t,closeDelay:o,...r}=N("MenuSub",os,s),i=Ke(),[n,{open:u,close:a}]=We(!1),l=H(),{openDropdown:g,closeDropdown:j}=ye({open:u,close:a,closeDelay:o,openDelay:0}),y=()=>window.setTimeout(()=>{var p,h;(h=(p=document.getElementById(`${i}-dropdown`))==null?void 0:p.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||h.focus()},16),f=()=>window.setTimeout(()=>{var p;(p=document.getElementById(`${i}-target`))==null||p.focus()},16);return e.jsx(ss,{value:{opened:n,close:j,open:g,focusFirstItem:y,focusParentItem:f,parentContext:l},children:e.jsx(R,{opened:n,...r,withinPortal:!1,withArrow:!1,id:i,children:t})})}_.extend=s=>s;_.displayName="@mantine/core/MenuSub";_.Target=ve;_.Dropdown=se;_.Item=oe;const ns={refProp:"ref"},we=k.forwardRef((s,t)=>{const{children:o,refProp:r,...i}=N("MenuTarget",ns,s);if(!je(o))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const n=L(),u=o.props,a=b(u.onClick,()=>{n.trigger==="click"?n.toggleDropdown():n.trigger==="click-hover"&&(n.setOpenedViaClick(!0),n.opened||n.openDropdown())}),l=b(u.onMouseEnter,()=>(n.trigger==="hover"||n.trigger==="click-hover")&&n.openDropdown()),g=b(u.onMouseLeave,()=>{(n.trigger==="hover"||n.trigger==="click-hover"&&!n.openedViaClick)&&n.closeDropdown()});return e.jsx(R.Target,{refProp:r,popupType:"menu",ref:t,...i,children:k.cloneElement(o,{onClick:a,onMouseEnter:l,onMouseLeave:g,"data-expanded":n.opened?!0:void 0})})});we.displayName="@mantine/core/MenuTarget";const ts={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function x(s){const t=N("Menu",ts,s),{children:o,onOpen:r,onClose:i,opened:n,defaultOpened:u,trapFocus:a,onChange:l,closeOnItemClick:g,loop:j,closeOnEscape:y,trigger:f,openDelay:p,closeDelay:h,classNames:d,styles:c,unstyled:w,variant:C,vars:A,menuItemTabIndex:I,keepMounted:M,withInitialFocusPlaceholder:v,attributes:S,...$}=t,E=Le({name:"Menu",classes:T,props:t,classNames:d,styles:c,unstyled:w,attributes:S}),[P,O]=qe({value:n,defaultValue:u,finalValue:!1,onChange:l}),[be,ne]=k.useState(!1),G=()=>{O(!1),ne(!1),P&&(i==null||i())},W=()=>{O(!0),!P&&(r==null||r())},te=()=>{P?G():W()},{openDropdown:Me,closeDropdown:Se}=ye({open:W,close:G,closeDelay:h,openDelay:p}),ke=Ne=>Ze("[data-menu-item]","[data-menu-dropdown]",Ne),{resolvedClassNames:De,resolvedStyles:Ie}=Be({classNames:d,styles:c,props:t});return e.jsx(es,{value:{getStyles:E,opened:P,toggleDropdown:te,getItemIndex:ke,openedViaClick:be,setOpenedViaClick:ne,closeOnItemClick:g,closeDropdown:f==="click"?G:Se,openDropdown:f==="click"?W:Me,closeDropdownImmediately:G,loop:j,trigger:f,unstyled:w,menuItemTabIndex:I,withInitialFocusPlaceholder:v},children:e.jsx(R,{...$,opened:P,onChange:te,defaultOpened:u,trapFocus:M?!1:a,closeOnEscape:y,__staticSelector:"Menu",classNames:De,styles:Ie,unstyled:w,variant:C,keepMounted:M,children:o})})}x.extend=s=>s;x.withProps=Te(x);x.classes=T;x.displayName="@mantine/core/Menu";x.Item=Z;x.Label=ee;x.Dropdown=X;x.Target=we;x.Divider=Y;x.Sub=_;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],is=J("bolt",rs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ls=J("house",as);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],ds=J("newspaper",cs),ms=Q.header`
  /* padding: 1.625em 0; */
  position: sticky;
  top: 0;
  z-index: 99;

  .headerCard {
    padding: 0.75em 0;
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 11.5em;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2em;

    ul {
      display: flex;
      gap: 1em;

      li > a {
        color: ${({theme:s})=>s.colors.textWhite[0]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        text-transform: uppercase;
      }
    }

    .access-btns {
      display: flex;
      gap: 0.5em;
    }
  }
`,us=Q.footer`
  padding: 4em 0;

  .footerFlex {
    display: flex;
    justify-content: space-between;

    .choose-lang {
      flex-basis: 20%;
      display: flex;
      flex-direction: column;
      gap: 1em;

      .logo {
        width: 11.5em;
      }  
    }

    .quick-links{
      flex-basis: 50%;
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;

      h5{
        margin: 0 0 1em;
      }

      .gameIn-links{
        ul{
          display: flex;
          flex-direction: column;
          gap: 0.25em;

          li>a{
            color: ${({theme:s})=>s.colors.textWhite[0]};
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }
        }
      }
    }
  }
`,ps=Q.aside`
    display: flex;
    width: 100%;
    min-width: 20.625em;
    background: ${({theme:s})=>s.colors.secondaryGrey[1]};
    position: sticky;
    top: 5em;
    height: calc(100vh - 5em);

    .profile-icons {
      background: ${({theme:s})=>s.colors.textSecondary[0]};
      padding: 1.5em 1em;

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        li {
          .profile-hexagon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .avatar-icon {
            position: unset;

            & > div {
              border: none;
            }
          }
        }
      }
    }

    .profile-links{
      padding: 1.5em 1em;
      flex-basis: calc(100% - 4.375em);

      ul{
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        li>a{
          display: flex;
          align-items: center;
          padding: 1em 1.5em;
          gap: 0.75em;
          border-radius: 0.313em;
          text-decoration: none;
          color: ${({theme:s})=>s.colors.text[0]};
          text-transform: uppercase;

          &:hover{
            background: ${({theme:s})=>s.colors.inputBgColor[0]};
            color: ${({theme:s})=>s.colors.primary[0]};
            transition: all 0.3s ease-in-out;
          }
        }

        .divider{
            border: 0.063em dashed ${({theme:s})=>s.colors.inputBgColor[0]};
            width: 100%;
            margin: 0.75em 0;
        }
      }
    }
`;function hs(){var a,l,g,j;const s=Ae(),t=me(),o=B(ue),r=B(pe),{avatarUrl:i}=ze(),n=async()=>{t(Ee()),await Pe.purge(),s(D.LOGIN)},u=[{label:"GameIn",path:D.WELCOMEPAGE},{label:"About",path:D.WELCOMEPAGE},{label:"Info",path:D.WELCOMEPAGE},{label:"Guidelines",path:D.WELCOMEPAGE}];return e.jsx(ms,{children:e.jsx(xe,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:he,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(x,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(x.Target,{children:e.jsx(q,{children:e.jsx(U,{className:"avatar-icon-small",size:"55",avatar:i||z})})}),e.jsxs(x.Dropdown,{children:[e.jsxs(x.Label,{style:{fontSize:"1em"},children:["Hello,"," ",((l=(a=o==null?void 0:o.user)==null?void 0:a.username)==null?void 0:l.charAt(0).toUpperCase())+((j=(g=o==null?void 0:o.user)==null?void 0:g.username)==null?void 0:j.slice(1).toLowerCase())]}),e.jsx(x.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(x.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(x.Divider,{}),e.jsx(x.Item,{color:"red",onClick:n,children:"Logout"})]})]}):e.jsx("ul",{children:u.map((y,f)=>e.jsx("li",{children:e.jsx(m,{to:y.path,children:y.label})},f))}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(m,{to:"/login",children:e.jsx(re,{variant:"grey",size:"sm",style:{marginRight:"0.5em"},children:"Sign in"})}),e.jsx(m,{to:"/register",children:e.jsx(re,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function xs(){return e.jsx(xe,{p:0,children:e.jsx(us,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:he,alt:"Game Logo"})}),e.jsx(Je,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(F,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Competency"})}),e.jsx("li",{children:e.jsx(m,{children:"Service"})}),e.jsx("li",{children:e.jsx(m,{children:"Vision"})}),e.jsx("li",{children:e.jsx(m,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(F,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Team"})}),e.jsx("li",{children:e.jsx(m,{children:"Location"})}),e.jsx("li",{children:e.jsx(m,{children:"History"})}),e.jsx("li",{children:e.jsx(m,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(m,{children:"Contact"})}),e.jsx("li",{children:e.jsx(m,{children:"Press"})}),e.jsx("li",{children:e.jsx(m,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(m,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(F,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(m,{children:"Support"})}),e.jsx("li",{children:e.jsx(m,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(m,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(m,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(F,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(m,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(m,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(m,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(m,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(F,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(F,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}function fs(){const s=[{icon:e.jsx(ls,{size:"1em"}),label:"Account",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(ds,{size:"1em"}),label:"News Feed",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(Qe,{size:"1em"}),label:"Creators",link:D.SEARCH.replace(":userType","creator")},{icon:e.jsx(Ye,{size:"1em"}),label:"Brands",link:D.SEARCH.replace(":userType","brand")},{icon:e.jsx(is,{size:"1em"}),label:"Settings",link:D.SETTINGS.ROOT}];return e.jsxs(ps,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx($e,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ie.colors.inputBgColor[0],$rotated:!0,$border:"0.125emsolid #FFF",children:e.jsx(Ue,{size:"1.25em",color:ie.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})})]})}),e.jsx("div",{className:"profile-links",children:e.jsx("ul",{children:s.map((t,o)=>e.jsxs("li",{children:[e.jsxs(m,{to:t.link,children:[t.icon,e.jsx("span",{children:t.label})]}),o%2!==0&&e.jsx("div",{className:"divider"})]},o))})})]})}const Ws=()=>{const t=Oe().pathname==="/",o=B(pe),{user:r}=B(ue)||{},i=me(),{get:n}=Fe(),u=o&&!t;return k.useEffect(()=>{(async()=>{if(r!=null&&r.id)try{const l=await Xe(n,r.id,r.user_type);i(_e({user:l}))}catch(l){console.error("Error fetching user profile",l)}})()},[r==null?void 0:r.id]),e.jsxs("div",{children:[e.jsx(hs,{}),e.jsxs("div",{className:"wrapper",children:[u&&e.jsx(fs,{}),e.jsx("main",{className:u?"logged-in":"",children:e.jsx(Re,{})}),u&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(xs,{})]})};export{Ws as default};
