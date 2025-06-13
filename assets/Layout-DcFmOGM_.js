import{r as v,j as e,a as re,f as K,u as N,B as le,b as U,p as ce,c as de,e as ue,U as H,g as De,h as Ne,d as J,i as Ce,k as Le,l as q,L as a,m as _,n as Pe,t as ie,o as Ee,O as Te}from"./index-BGIsBczW.js";import{G as me}from"./gamein-logo-OLN3yQ-G.js";import{c as Ae,i as Fe}from"./selectors-BSredJDX.js";import{P as F,c as $e,i as he,u as Re,l as _e,T as Oe}from"./authSlice-XspWluy_.js";import{f as ze,c as pe,A as O,a as z,H as Be,i as Ge}from"./authSelector-BdZ7YRtk.js";import{C as xe,P as Ke}from"./plus-C-PPl4cr.js";import{c as Ue}from"./create-safe-context-DLWbFZ0d.js";import{u as fe,a as Ve,b as We}from"./DirectionProvider-Bzy6_muY.js";import{B as ae}from"./Button-DNp22WlY.js";import{T as A}from"./Title-DjLebwEP.js";import{c as Q}from"./createLucideIcon-BaLQX5rB.js";import{S as qe,F as He}from"./star-BrXIJj58.js";import"./HexContainer-C81BKavN.js";function y(s,t){return n=>{s==null||s(n),t==null||t(n)}}function Je(s,t,n){var r;return n?Array.from(((r=ze(n,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(l=>l===n):null}function Qe(s=!1,t={}){const[n,r]=v.useState(s),l=v.useCallback(()=>{r(i=>{var c;return i||((c=t.onOpen)==null||c.call(t),!0)})},[t.onOpen]),o=v.useCallback(()=>{r(i=>{var c;return i&&((c=t.onClose)==null||c.call(t),!1)})},[t.onClose]),m=v.useCallback(()=>{n?o():l()},[o,l,n]);return[n,{open:l,close:o,toggle:m}]}function je({style:s,size:t=16,...n}){return e.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...s,width:re(t),height:re(t),display:"block"},...n,children:e.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}je.displayName="@mantine/core/AccordionChevron";function ge({open:s,close:t,openDelay:n,closeDelay:r}){const l=v.useRef(-1),o=v.useRef(-1),m=()=>{window.clearTimeout(l.current),window.clearTimeout(o.current)},i=()=>{m(),n===0||n===void 0?s():l.current=window.setTimeout(s,n)},c=()=>{m(),r===0||r===void 0?t():o.current=window.setTimeout(t,r)};return v.useEffect(()=>m,[]),{openDropdown:i,closeDropdown:c}}const[Ye,L]=Ue("Menu component was not found in the tree");var P={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const Ze={},Y=K((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,...i}=N("MenuDivider",Ze,s),c=L();return e.jsx(le,{ref:t,...c.getStyles("divider",{className:r,style:l,styles:o,classNames:n}),...i})});Y.classes=P;Y.displayName="@mantine/core/MenuDivider";const Xe={},Z=K((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,onMouseEnter:i,onMouseLeave:c,onKeyDown:w,children:b,...M}=N("MenuDropdown",Xe,s),f=v.useRef(null),h=L(),p=y(w,g=>{var C,E;(g.key==="ArrowUp"||g.key==="ArrowDown")&&(g.preventDefault(),(E=(C=f.current)==null?void 0:C.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||E.focus())}),u=y(i,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.openDropdown()),d=y(c,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.closeDropdown());return e.jsxs(F.Dropdown,{...M,onMouseEnter:u,onMouseLeave:d,role:"menu","aria-orientation":"vertical",ref:U(t,f),...h.getStyles("dropdown",{className:r,style:l,styles:o,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:p,children:[h.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),b]})});Z.classes=P;Z.displayName="@mantine/core/MenuDropdown";const[es,V]=$e(),ss={},X=ce((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,color:i,closeMenuOnClick:c,leftSection:w,rightSection:b,children:M,disabled:f,"data-disabled":h,...p}=N("MenuItem",ss,s),u=L(),d=V(),g=de(),{dir:C}=fe(),E=v.useRef(null),D=p,k=y(D.onClick,()=>{h||(typeof c=="boolean"?c&&u.closeDropdownImmediately():u.closeOnItemClick&&u.closeDropdownImmediately())}),j=i?g.variantColorResolver({color:i,theme:g,variant:"light"}):void 0,S=i?ue({color:i,theme:g}):null,R=y(D.onKeyDown,I=>{I.key==="ArrowLeft"&&d&&(d.close(),d.focusParentItem())});return e.jsxs(H,{onMouseDown:I=>I.preventDefault(),...p,unstyled:u.unstyled,tabIndex:u.menuItemTabIndex,...u.getStyles("item",{className:r,style:l,styles:o,classNames:n}),ref:U(E,t),role:"menuitem",disabled:f,"data-menu-item":!0,"data-disabled":f||h||void 0,"data-mantine-stop-propagation":!0,onClick:k,onKeyDown:pe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:u.loop,dir:C,orientation:"vertical",onKeyDown:R}),__vars:{"--menu-item-color":S!=null&&S.isThemeColor&&(S==null?void 0:S.shade)===void 0?`var(--mantine-color-${S.color}-6)`:j==null?void 0:j.color,"--menu-item-hover":j==null?void 0:j.hover},children:[w&&e.jsx("div",{...u.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"left",children:w}),M&&e.jsx("div",{...u.getStyles("itemLabel",{styles:o,classNames:n}),children:M}),b&&e.jsx("div",{...u.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"right",children:b})]})});X.classes=P;X.displayName="@mantine/core/MenuItem";const ns={},ee=K((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,...i}=N("MenuLabel",ns,s),c=L();return e.jsx(le,{ref:t,...c.getStyles("label",{className:r,style:l,styles:o,classNames:n}),...i})});ee.classes=P;ee.displayName="@mantine/core/MenuLabel";const os={},se=K((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,onMouseEnter:i,onMouseLeave:c,onKeyDown:w,children:b,...M}=N("MenuSubDropdown",os,s),f=v.useRef(null),h=L(),p=V(),u=y(i,p==null?void 0:p.open),d=y(c,p==null?void 0:p.close);return e.jsx(F.Dropdown,{...M,onMouseEnter:u,onMouseLeave:d,role:"menu","aria-orientation":"vertical",ref:U(t,f),...h.getStyles("dropdown",{className:r,style:l,styles:o,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:b})});se.classes=P;se.displayName="@mantine/core/MenuSubDropdown";const ts={},ne=ce((s,t)=>{const{classNames:n,className:r,style:l,styles:o,vars:m,color:i,leftSection:c,rightSection:w,children:b,disabled:M,"data-disabled":f,closeMenuOnClick:h,...p}=N("MenuSubItem",ts,s),u=L(),d=V(),g=de(),{dir:C}=fe(),E=v.useRef(null),D=p,k=i?g.variantColorResolver({color:i,theme:g,variant:"light"}):void 0,j=i?ue({color:i,theme:g}):null,S=y(D.onKeyDown,T=>{T.key==="ArrowRight"&&(d==null||d.open(),d==null||d.focusFirstItem()),T.key==="ArrowLeft"&&(d!=null&&d.parentContext)&&(d.parentContext.close(),d.parentContext.focusParentItem())}),R=y(D.onClick,()=>{!f&&h&&u.closeDropdownImmediately()}),I=y(D.onMouseEnter,d==null?void 0:d.open),B=y(D.onMouseLeave,d==null?void 0:d.close);return e.jsxs(H,{onMouseDown:T=>T.preventDefault(),...p,unstyled:u.unstyled,tabIndex:u.menuItemTabIndex,...u.getStyles("item",{className:r,style:l,styles:o,classNames:n}),ref:U(E,t),role:"menuitem",disabled:M,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":M||f||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:I,onMouseLeave:B,onClick:R,onKeyDown:pe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:u.loop,dir:C,orientation:"vertical",onKeyDown:S}),__vars:{"--menu-item-color":j!=null&&j.isThemeColor&&(j==null?void 0:j.shade)===void 0?`var(--mantine-color-${j.color}-6)`:k==null?void 0:k.color,"--menu-item-hover":k==null?void 0:k.hover},children:[c&&e.jsx("div",{...u.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"left",children:c}),b&&e.jsx("div",{...u.getStyles("itemLabel",{styles:o,classNames:n}),children:b}),e.jsx("div",{...u.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"right",children:w||e.jsx(je,{...u.getStyles("chevron"),size:14})})]})});ne.classes=P;ne.displayName="@mantine/core/MenuSubItem";function ve({children:s,refProp:t}){if(!he(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return L(),e.jsx(F.Target,{refProp:t,popupType:"menu",children:s})}ve.displayName="@mantine/core/MenuSubTarget";const rs={offset:0,position:"right-start",transitionProps:{duration:0}};function $(s){const{children:t,closeDelay:n,...r}=N("MenuSub",rs,s),l=Ve(),[o,{open:m,close:i}]=Qe(!1),c=V(),{openDropdown:w,closeDropdown:b}=ge({open:m,close:i,closeDelay:n,openDelay:0}),M=()=>window.setTimeout(()=>{var h,p;(p=(h=document.getElementById(`${l}-dropdown`))==null?void 0:h.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||p.focus()},16),f=()=>window.setTimeout(()=>{var h;(h=document.getElementById(`${l}-target`))==null||h.focus()},16);return e.jsx(es,{value:{opened:o,close:b,open:w,focusFirstItem:M,focusParentItem:f,parentContext:c},children:e.jsx(F,{opened:o,...r,withinPortal:!1,id:l,children:t})})}$.extend=s=>s;$.displayName="@mantine/core/MenuSub";$.Target=ve;$.Dropdown=se;$.Item=ne;const is={refProp:"ref"},ye=v.forwardRef((s,t)=>{const{children:n,refProp:r,...l}=N("MenuTarget",is,s);if(!he(n))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const o=L(),m=n.props,i=y(m.onClick,()=>{o.trigger==="click"?o.toggleDropdown():o.trigger==="click-hover"&&(o.setOpenedViaClick(!0),o.opened||o.openDropdown())}),c=y(m.onMouseEnter,()=>(o.trigger==="hover"||o.trigger==="click-hover")&&o.openDropdown()),w=y(m.onMouseLeave,()=>{(o.trigger==="hover"||o.trigger==="click-hover"&&!o.openedViaClick)&&o.closeDropdown()});return e.jsx(F.Target,{refProp:r,popupType:"menu",ref:t,...l,children:v.cloneElement(n,{onClick:i,onMouseEnter:c,onMouseLeave:w,"data-expanded":o.opened?!0:void 0})})});ye.displayName="@mantine/core/MenuTarget";const as={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function x(s){const t=N("Menu",as,s),{children:n,onOpen:r,onClose:l,opened:o,defaultOpened:m,trapFocus:i,onChange:c,closeOnItemClick:w,loop:b,closeOnEscape:M,trigger:f,openDelay:h,closeDelay:p,classNames:u,styles:d,unstyled:g,variant:C,vars:E,menuItemTabIndex:D,keepMounted:k,withInitialFocusPlaceholder:j,...S}=t,R=De({name:"Menu",classes:P,props:t,classNames:u,styles:d,unstyled:g}),[I,B]=We({value:o,defaultValue:m,finalValue:!1,onChange:c}),[T,oe]=v.useState(!1),G=()=>{B(!1),oe(!1),I&&(l==null||l())},W=()=>{B(!0),!I&&(r==null||r())},te=()=>{I?G():W()},{openDropdown:we,closeDropdown:be}=ge({open:W,close:G,closeDelay:p,openDelay:h}),Me=Ie=>Je("[data-menu-item]","[data-menu-dropdown]",Ie),{resolvedClassNames:ke,resolvedStyles:Se}=Re({classNames:u,styles:d,props:t});return e.jsx(Ye,{value:{getStyles:R,opened:I,toggleDropdown:te,getItemIndex:Me,openedViaClick:T,setOpenedViaClick:oe,closeOnItemClick:w,closeDropdown:f==="click"?G:be,openDropdown:f==="click"?W:we,closeDropdownImmediately:G,loop:b,trigger:f,unstyled:g,menuItemTabIndex:D,withInitialFocusPlaceholder:j},children:e.jsx(F,{...S,opened:I,onChange:te,defaultOpened:m,trapFocus:k?!1:i,closeOnEscape:M,__staticSelector:"Menu",classNames:ke,styles:Se,unstyled:g,variant:C,keepMounted:k,children:n})})}x.extend=s=>s;x.withProps=Ne(x);x.classes=P;x.displayName="@mantine/core/Menu";x.Item=X;x.Label=ee;x.Dropdown=Z;x.Target=ye;x.Divider=Y;x.Sub=$;const ls=J.header`
  /* padding: 1.625rem 0; */
  position: sticky;
  top: 0;
  z-index: 9999;
  
  .headerCard{
    padding: 1.5rem 0;
  }

  .headerFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      width: 11.5rem;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;

    ul {
      display: flex;
      gap: 1rem;

      li > a {
        color: ${({theme:s})=>s.colors.textWhite[0]};
        text-decoration: none;
        transition: color 0.2s ease-in-out;
        text-transform: uppercase;
      }
    }

    .access-btns {
      display: flex;
      gap: 0.5rem;
    }
  }
`,cs=J.footer`
  padding: 4rem 0;

  .footerFlex {
    display: flex;
    justify-content: space-between;

    .choose-lang {
      flex-basis: 20%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .logo {
        width: 11.5rem;
      }      

      select{
        padding: 0rem 1.25rem !important;
      }
    }

    .quick-links{
      flex-basis: 50%;
      display: flex;
      justify-content: space-between;
      text-transform: uppercase;

      h5{
        margin: 0 0 1rem;
      }

      .gameIn-links{
        ul{
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          li>a{
            color: ${({theme:s})=>s.colors.textWhite[0]};
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }
        }
      }
    }
  }
`,ds=J.aside`
    display: flex;
    width: 100%;
    min-width: 20.625rem;
    background: ${({theme:s})=>s.colors.darkText[1]};

    .profile-icons {
      background: ${({theme:s})=>s.colors.textSecondary[0]};
      padding: 1.5rem 1rem;

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

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
      padding: 1.5rem 1rem;
      flex-basis: calc(100% - 4.375rem);

      ul{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        li>a{
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 0.75rem;
          border-radius: 0.313rem;
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
            border: 0.063rem dashed ${({theme:s})=>s.colors.inputBgColor[0]};
            width: 100%;
            margin: 0.75rem 0;
        }
      }
    }
`;function us(){var o,m,i,c;const s=Ce(),t=Le(),n=q(Ae),r=q(Fe),l=async()=>{t(_e()),await Pe.purge(),s(_.WELCOMEPAGE)};return e.jsx(ls,{children:e.jsx(xe,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:me,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(x,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(x.Target,{children:e.jsx(H,{children:e.jsx(O,{className:"avatar-icon-small",size:"3.5rem",avatar:z})})}),e.jsxs(x.Dropdown,{children:[e.jsxs(x.Label,{style:{fontSize:"1rem"},children:["Hello,"," ",((m=(o=n==null?void 0:n.user)==null?void 0:o.username)==null?void 0:m.charAt(0).toUpperCase())+((c=(i=n==null?void 0:n.user)==null?void 0:i.username)==null?void 0:c.slice(1).toLowerCase())]}),e.jsx(x.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(x.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(x.Divider,{}),e.jsx(x.Item,{color:"red",onClick:l,children:"Logout"})]})]}):e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(a,{to:_.WELCOMEPAGE,children:"GameIn"})}),e.jsx("li",{children:e.jsx(a,{to:_.WELCOMEPAGE,children:"About"})}),e.jsx("li",{children:e.jsx(a,{to:_.WELCOMEPAGE,children:"Info"})}),e.jsx("li",{children:e.jsx(a,{to:_.WELCOMEPAGE,children:"Guidelines"})})]}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(a,{to:"/login",children:e.jsx(ae,{variant:"grey",size:"sm",style:{marginRight:"0.5rem"},children:"Sign in"})}),e.jsx(a,{to:"/register",children:e.jsx(ae,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function ms(){return e.jsx(xe,{p:0,children:e.jsx(cs,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:me,alt:"Game Logo"})}),e.jsx(Oe,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(A,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(a,{children:"Competency"})}),e.jsx("li",{children:e.jsx(a,{children:"Service"})}),e.jsx("li",{children:e.jsx(a,{children:"Vision"})}),e.jsx("li",{children:e.jsx(a,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(A,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(a,{children:"Team"})}),e.jsx("li",{children:e.jsx(a,{children:"Location"})}),e.jsx("li",{children:e.jsx(a,{children:"History"})}),e.jsx("li",{children:e.jsx(a,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(a,{children:"Contact"})}),e.jsx("li",{children:e.jsx(a,{children:"Press"})}),e.jsx("li",{children:e.jsx(a,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(a,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(A,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(a,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(a,{children:"Support"})}),e.jsx("li",{children:e.jsx(a,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(a,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(a,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(A,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(a,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(a,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(a,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(a,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(a,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(A,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(A,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],ps=Q("bolt",hs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],fs=Q("house",xs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],gs=Q("newspaper",js);function vs(){return e.jsxs(ds,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(Be,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ie.colors.inputBgColor[0],$rotated:!0,$border:"0.125rem solid #FFF",children:e.jsx(Ke,{size:"1.25rem",color:ie.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(O,{className:"avatar-icon-small",size:"3em",avatar:z})}),e.jsx("li",{children:e.jsx(O,{className:"avatar-icon-small",size:"3em",avatar:z})}),e.jsx("li",{children:e.jsx(O,{className:"avatar-icon-small",size:"3em",avatar:z})}),e.jsx("li",{children:e.jsx(O,{className:"avatar-icon-small",size:"3em",avatar:z})})]})}),e.jsx("div",{className:"profile-links",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs(a,{to:"/",children:[e.jsx(fs,{size:"1rem"}),e.jsx("span",{children:"Account"})]})}),e.jsx("li",{children:e.jsxs(a,{to:"/",children:[e.jsx(gs,{size:"1rem"}),e.jsx("span",{children:"News Feed"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(a,{to:"/",children:[e.jsx(qe,{size:"1rem"}),e.jsx("span",{children:"Creators"})]})}),e.jsx("li",{children:e.jsxs(a,{to:"/",children:[e.jsx(He,{size:"1rem"}),e.jsx("span",{children:"Brands"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(a,{to:"/",children:[e.jsx(ps,{size:"1rem"}),e.jsx("span",{children:"Settings"})]})})]})})]})}const Ts=()=>{const t=Ee().pathname==="/",r=q(Ge)&&!t;return e.jsxs("div",{children:[e.jsx(us,{}),e.jsxs("div",{className:"wrapper",children:[r&&e.jsx(vs,{}),e.jsx("main",{className:r?"logged-in":"",children:e.jsx(Te,{})}),r&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(ms,{})]})};export{Ts as default};
