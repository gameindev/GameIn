import{j as e,r as re,a as I,f as G,u as C,B as le,b as K,p as ce,c as de,e as me,U as q,g as Ne,h as Ce,d as J,i as Le,k as Pe,l as W,m as D,L as d,n as Te,o as Ae,t as ie,q as Ee,O as Oe}from"./index-BvCOVkLD.js";import{G as ue}from"./gamein-logo-OLN3yQ-G.js";import{c as Re,i as pe}from"./selectors-BfVctv7J.js";import{c as _}from"./creator_image-C6LzQUPk.js";import{A as z,H as Fe}from"./AvatarSection-C8rK72Tb.js";import{f as $e,c as he,u as _e}from"./useProfileMediaUrl-CEgnBrp4.js";import{C as xe,P as ze}from"./plus-BZZVrYO3.js";import{u as Be,a as Ue}from"./useApi-BwtuBH04.js";import{P as R}from"./Popover-BwJWVMFH.js";import{c as Ge}from"./ActionIcon-C5h1Yk4e.js";import{c as Ke,u as fe,a as He}from"./DirectionProvider-CK_z1yMt.js";import{i as ge}from"./FocusTrap-BCiAvqBo.js";import{u as Ve}from"./modal-I6ipLrwR.js";import{B as ae}from"./Button-D3wcv81E.js";import{T as We}from"./TextInput-BgZHhGb8.js";import{T as O}from"./Title-3733XNcH.js";import{c as Q}from"./createLucideIcon-CXxXVj4d.js";import{S as qe,F as Je}from"./star-z5bekuxk.js";import"./HexContainer-CUGkvrPJ.js";import"./EditAvator-BTP8XZV1.js";import"./Stack-BaPA_i4L.js";import"./Text-CuMorHTw.js";import"./Group-mkW3al6E.js";import"./Image-BDImwyx1.js";import"./FileInput-xzTxsHB7.js";import"./Paper-5kWu9an9.js";import"./get-floating-position-CNhaFEyy.js";import"./IconButton-CaG3UMhI.js";import"./Modal-gP-LzBBs.js";function b(s,t){return o=>{s==null||s(o),t==null||t(o)}}function Qe(s,t,o){var r;return o?Array.from(((r=$e(o,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(i=>i===o):null}function je({style:s,size:t=16,...o}){return e.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...s,width:re(t),height:re(t),display:"block"},...o,children:e.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}je.displayName="@mantine/core/AccordionChevron";function ye({open:s,close:t,openDelay:o,closeDelay:r}){const i=I.useRef(-1),n=I.useRef(-1),p=()=>{window.clearTimeout(i.current),window.clearTimeout(n.current)},a=()=>{p(),o===0||o===void 0?s():i.current=window.setTimeout(s,o)},m=()=>{p(),r===0||r===void 0?t():n.current=window.setTimeout(t,r)};return I.useEffect(()=>p,[]),{openDropdown:a,closeDropdown:m}}const[Ye,P]=Ge("Menu component was not found in the tree");var T={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const Ze={},Y=G((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,...a}=C("MenuDivider",Ze,s),m=P();return e.jsx(le,{ref:t,...m.getStyles("divider",{className:r,style:i,styles:n,classNames:o}),...a})});Y.classes=T;Y.displayName="@mantine/core/MenuDivider";const Xe={},Z=G((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,onMouseEnter:a,onMouseLeave:m,onKeyDown:g,children:j,...y}=C("MenuDropdown",Xe,s),f=I.useRef(null),u=P(),h=b(g,w=>{var L,A;(w.key==="ArrowUp"||w.key==="ArrowDown")&&(w.preventDefault(),(A=(L=f.current)==null?void 0:L.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||A.focus())}),c=b(a,()=>(u.trigger==="hover"||u.trigger==="click-hover")&&u.openDropdown()),l=b(m,()=>(u.trigger==="hover"||u.trigger==="click-hover")&&u.closeDropdown());return e.jsxs(R.Dropdown,{...y,onMouseEnter:c,onMouseLeave:l,role:"menu","aria-orientation":"vertical",ref:K(t,f),...u.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:h,children:[u.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),j]})});Z.classes=T;Z.displayName="@mantine/core/MenuDropdown";const[es,H]=Ke(),ss={},X=ce((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,color:a,closeMenuOnClick:m,leftSection:g,rightSection:j,children:y,disabled:f,"data-disabled":u,...h}=C("MenuItem",ss,s),c=P(),l=H(),w=de(),{dir:L}=fe(),A=I.useRef(null),N=h,M=b(N.onClick,()=>{u||(typeof m=="boolean"?m&&c.closeDropdownImmediately():c.closeOnItemClick&&c.closeDropdownImmediately())}),v=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,S=a?me({color:a,theme:w}):null,$=b(N.onKeyDown,k=>{k.key==="ArrowLeft"&&l&&(l.close(),l.focusParentItem())});return e.jsxs(q,{onMouseDown:k=>k.preventDefault(),...h,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:K(A,t),role:"menuitem",disabled:f,"data-menu-item":!0,"data-disabled":f||u||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:he({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:L,orientation:"vertical",onKeyDown:$}),__vars:{"--menu-item-color":S!=null&&S.isThemeColor&&(S==null?void 0:S.shade)===void 0?`var(--mantine-color-${S.color}-6)`:v==null?void 0:v.color,"--menu-item-hover":v==null?void 0:v.hover},children:[g&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:g}),y&&e.jsx("div",{...c.getStyles("itemLabel",{styles:n,classNames:o}),children:y}),j&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:j})]})});X.classes=T;X.displayName="@mantine/core/MenuItem";const os={},ee=G((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,...a}=C("MenuLabel",os,s),m=P();return e.jsx(le,{ref:t,...m.getStyles("label",{className:r,style:i,styles:n,classNames:o}),...a})});ee.classes=T;ee.displayName="@mantine/core/MenuLabel";const ns={},se=G((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,onMouseEnter:a,onMouseLeave:m,onKeyDown:g,children:j,...y}=C("MenuSubDropdown",ns,s),f=I.useRef(null),u=P(),h=H(),c=b(a,h==null?void 0:h.open),l=b(m,h==null?void 0:h.close);return e.jsx(R.Dropdown,{...y,onMouseEnter:c,onMouseLeave:l,role:"menu","aria-orientation":"vertical",ref:K(t,f),...u.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:j})});se.classes=T;se.displayName="@mantine/core/MenuSubDropdown";const ts={},oe=ce((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,color:a,leftSection:m,rightSection:g,children:j,disabled:y,"data-disabled":f,closeMenuOnClick:u,...h}=C("MenuSubItem",ts,s),c=P(),l=H(),w=de(),{dir:L}=fe(),A=I.useRef(null),N=h,M=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,v=a?me({color:a,theme:w}):null,S=b(N.onKeyDown,E=>{E.key==="ArrowRight"&&(l==null||l.open(),l==null||l.focusFirstItem()),E.key==="ArrowLeft"&&(l!=null&&l.parentContext)&&(l.parentContext.close(),l.parentContext.focusParentItem())}),$=b(N.onClick,()=>{!f&&u&&c.closeDropdownImmediately()}),k=b(N.onMouseEnter,l==null?void 0:l.open),B=b(N.onMouseLeave,l==null?void 0:l.close);return e.jsxs(q,{onMouseDown:E=>E.preventDefault(),...h,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:K(A,t),role:"menuitem",disabled:y,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":y||f||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:k,onMouseLeave:B,onClick:$,onKeyDown:he({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:L,orientation:"vertical",onKeyDown:S}),__vars:{"--menu-item-color":v!=null&&v.isThemeColor&&(v==null?void 0:v.shade)===void 0?`var(--mantine-color-${v.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[m&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:m}),j&&e.jsx("div",{...c.getStyles("itemLabel",{styles:n,classNames:o}),children:j}),e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:g||e.jsx(je,{...c.getStyles("chevron"),size:14})})]})});oe.classes=T;oe.displayName="@mantine/core/MenuSubItem";function ve({children:s,refProp:t}){if(!ge(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return P(),e.jsx(R.Target,{refProp:t,popupType:"menu",children:s})}ve.displayName="@mantine/core/MenuSubTarget";const rs={offset:0,position:"right-start",transitionProps:{duration:0}};function F(s){const{children:t,closeDelay:o,...r}=C("MenuSub",rs,s),i=He(),[n,{open:p,close:a}]=Ve(!1),m=H(),{openDropdown:g,closeDropdown:j}=ye({open:p,close:a,closeDelay:o,openDelay:0}),y=()=>window.setTimeout(()=>{var u,h;(h=(u=document.getElementById(`${i}-dropdown`))==null?void 0:u.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||h.focus()},16),f=()=>window.setTimeout(()=>{var u;(u=document.getElementById(`${i}-target`))==null||u.focus()},16);return e.jsx(es,{value:{opened:n,close:j,open:g,focusFirstItem:y,focusParentItem:f,parentContext:m},children:e.jsx(R,{opened:n,...r,withinPortal:!1,id:i,children:t})})}F.extend=s=>s;F.displayName="@mantine/core/MenuSub";F.Target=ve;F.Dropdown=se;F.Item=oe;const is={refProp:"ref"},we=I.forwardRef((s,t)=>{const{children:o,refProp:r,...i}=C("MenuTarget",is,s);if(!ge(o))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const n=P(),p=o.props,a=b(p.onClick,()=>{n.trigger==="click"?n.toggleDropdown():n.trigger==="click-hover"&&(n.setOpenedViaClick(!0),n.opened||n.openDropdown())}),m=b(p.onMouseEnter,()=>(n.trigger==="hover"||n.trigger==="click-hover")&&n.openDropdown()),g=b(p.onMouseLeave,()=>{(n.trigger==="hover"||n.trigger==="click-hover"&&!n.openedViaClick)&&n.closeDropdown()});return e.jsx(R.Target,{refProp:r,popupType:"menu",ref:t,...i,children:I.cloneElement(o,{onClick:a,onMouseEnter:m,onMouseLeave:g,"data-expanded":n.opened?!0:void 0})})});we.displayName="@mantine/core/MenuTarget";const as={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function x(s){const t=C("Menu",as,s),{children:o,onOpen:r,onClose:i,opened:n,defaultOpened:p,trapFocus:a,onChange:m,closeOnItemClick:g,loop:j,closeOnEscape:y,trigger:f,openDelay:u,closeDelay:h,classNames:c,styles:l,unstyled:w,variant:L,vars:A,menuItemTabIndex:N,keepMounted:M,withInitialFocusPlaceholder:v,...S}=t,$=Ne({name:"Menu",classes:T,props:t,classNames:c,styles:l,unstyled:w}),[k,B]=Be({value:n,defaultValue:p,finalValue:!1,onChange:m}),[E,ne]=I.useState(!1),U=()=>{B(!1),ne(!1),k&&(i==null||i())},V=()=>{B(!0),!k&&(r==null||r())},te=()=>{k?U():V()},{openDropdown:be,closeDropdown:Me}=ye({open:V,close:U,closeDelay:h,openDelay:u}),Se=Ie=>Qe("[data-menu-item]","[data-menu-dropdown]",Ie),{resolvedClassNames:ke,resolvedStyles:De}=Ue({classNames:c,styles:l,props:t});return e.jsx(Ye,{value:{getStyles:$,opened:k,toggleDropdown:te,getItemIndex:Se,openedViaClick:E,setOpenedViaClick:ne,closeOnItemClick:g,closeDropdown:f==="click"?U:Me,openDropdown:f==="click"?V:be,closeDropdownImmediately:U,loop:j,trigger:f,unstyled:w,menuItemTabIndex:N,withInitialFocusPlaceholder:v},children:e.jsx(R,{...S,opened:k,onChange:te,defaultOpened:p,trapFocus:M?!1:a,closeOnEscape:y,__staticSelector:"Menu",classNames:ke,styles:De,unstyled:w,variant:L,keepMounted:M,children:o})})}x.extend=s=>s;x.withProps=Ce(x);x.classes=T;x.displayName="@mantine/core/Menu";x.Item=X;x.Label=ee;x.Dropdown=Z;x.Target=we;x.Divider=Y;x.Sub=F;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],cs=Q("bolt",ls);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ms=Q("house",ds);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],ps=Q("newspaper",us),hs=J.header`
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
`,xs=J.footer`
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
`,fs=J.aside`
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
`;function gs(){var a,m,g,j;const s=Le(),t=Pe(),o=W(Re),r=W(pe),{avatarUrl:i}=_e(),n=async()=>{t(Te()),await Ae.purge(),s(D.LOGIN)},p=[{label:"GameIn",path:D.WELCOMEPAGE},{label:"About",path:D.WELCOMEPAGE},{label:"Info",path:D.WELCOMEPAGE},{label:"Guidelines",path:D.WELCOMEPAGE}];return e.jsx(hs,{children:e.jsx(xe,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(x,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(x.Target,{children:e.jsx(q,{children:e.jsx(z,{className:"avatar-icon-small",size:"55",avatar:i||_})})}),e.jsxs(x.Dropdown,{children:[e.jsxs(x.Label,{style:{fontSize:"1em"},children:["Hello,"," ",((m=(a=o==null?void 0:o.user)==null?void 0:a.username)==null?void 0:m.charAt(0).toUpperCase())+((j=(g=o==null?void 0:o.user)==null?void 0:g.username)==null?void 0:j.slice(1).toLowerCase())]}),e.jsx(x.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(x.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(x.Divider,{}),e.jsx(x.Item,{color:"red",onClick:n,children:"Logout"})]})]}):e.jsx("ul",{children:p.map((y,f)=>e.jsx("li",{children:e.jsx(d,{to:y.path,children:y.label})},f))}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(d,{to:"/login",children:e.jsx(ae,{variant:"grey",size:"sm",style:{marginRight:"0.5em"},children:"Sign in"})}),e.jsx(d,{to:"/register",children:e.jsx(ae,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function js(){return e.jsx(xe,{p:0,children:e.jsx(xs,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"Game Logo"})}),e.jsx(We,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Competency"})}),e.jsx("li",{children:e.jsx(d,{children:"Service"})}),e.jsx("li",{children:e.jsx(d,{children:"Vision"})}),e.jsx("li",{children:e.jsx(d,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Team"})}),e.jsx("li",{children:e.jsx(d,{children:"Location"})}),e.jsx("li",{children:e.jsx(d,{children:"History"})}),e.jsx("li",{children:e.jsx(d,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(d,{children:"Contact"})}),e.jsx("li",{children:e.jsx(d,{children:"Press"})}),e.jsx("li",{children:e.jsx(d,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(d,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(d,{children:"Support"})}),e.jsx("li",{children:e.jsx(d,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(d,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(d,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(d,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(d,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(d,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(d,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(O,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(O,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}function ys(){const s=[{icon:e.jsx(ms,{size:"1em"}),label:"Account",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(ps,{size:"1em"}),label:"News Feed",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(qe,{size:"1em"}),label:"Creators",link:D.SEARCH.replace(":userType","creators")},{icon:e.jsx(Je,{size:"1em"}),label:"Brands",link:D.SEARCH.replace(":userType","brands")},{icon:e.jsx(cs,{size:"1em"}),label:"Settings",link:D.ACCOUNTS.DASHBOARD.ROOT}];return e.jsxs(fs,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(Fe,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ie.colors.inputBgColor[0],$rotated:!0,$border:"0.125emsolid #FFF",children:e.jsx(ze,{size:"1.25em",color:ie.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(z,{size:"50",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"50",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"50",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"50",avatar:_})})]})}),e.jsx("div",{className:"profile-links",children:e.jsx("ul",{children:s.map((t,o)=>e.jsxs("li",{children:[e.jsxs(d,{to:t.link,children:[t.icon,e.jsx("span",{children:t.label})]}),o%2!==0&&e.jsx("div",{className:"divider"})]},o))})})]})}const Js=()=>{const t=Ee().pathname==="/",r=W(pe)&&!t;return e.jsxs("div",{children:[e.jsx(gs,{}),e.jsxs("div",{className:"wrapper",children:[r&&e.jsx(ys,{}),e.jsx("main",{className:r?"logged-in":"",children:e.jsx(Oe,{})}),r&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(js,{})]})};export{Js as default};
