import{j as e,r as re,a as I,f as U,u as C,B as le,b as K,p as ce,c as de,e as me,U as q,g as Ne,h as Ce,d as J,i as Le,k as Te,l as W,m as D,L as d,n as Ae,o as Pe,t as ie,q as Ee,O as Oe}from"./index-C-4AFNO7.js";import{G as ue}from"./gamein-logo-OLN3yQ-G.js";import{c as Re,i as pe}from"./selectors-BfVctv7J.js";import{c as _}from"./creator_image-C6LzQUPk.js";import{A as z,H as Fe}from"./AvatarSection-BLGA51bl.js";import{C as he,P as $e}from"./plus-BNRel0L4.js";import{f as _e,c as xe}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as ze,a as Be}from"./useApi-D27OJqXo.js";import{P as R}from"./Popover-BKt8bi6Z.js";import{c as Ge}from"./ActionIcon-CN4WoK2w.js";import{c as Ue,u as fe,a as Ke}from"./DirectionProvider-CeuBSB5J.js";import{i as ge}from"./FocusTrap-C_LKvyJp.js";import{u as He}from"./modal-h5yuvtaI.js";import{B as ae}from"./Button-BR3F4-qk.js";import{T as Ve}from"./TextInput-DDuOS7nz.js";import{T as O}from"./Title-awJZ1-0w.js";import{c as Q}from"./createLucideIcon-CFEEk01s.js";import{S as We,F as qe}from"./star-C7lZQp77.js";import"./HexContainer-Ccq6LLuc.js";import"./EditAvator-B4wwl5Wv.js";import"./Stack-cHEUxKAk.js";import"./Text-Bpvfj0Xl.js";import"./Group-CIVdmQNo.js";import"./Image-B2O5Zm9s.js";import"./FileInput--HYmVBXe.js";import"./Paper-9yU7SWws.js";import"./get-floating-position-DB61theM.js";import"./IconButton-BgxEkDQX.js";import"./Modal-DGi-JDXn.js";function b(s,t){return o=>{s==null||s(o),t==null||t(o)}}function Je(s,t,o){var r;return o?Array.from(((r=_e(o,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(i=>i===o):null}function je({style:s,size:t=16,...o}){return e.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...s,width:re(t),height:re(t),display:"block"},...o,children:e.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}je.displayName="@mantine/core/AccordionChevron";function ye({open:s,close:t,openDelay:o,closeDelay:r}){const i=I.useRef(-1),n=I.useRef(-1),p=()=>{window.clearTimeout(i.current),window.clearTimeout(n.current)},a=()=>{p(),o===0||o===void 0?s():i.current=window.setTimeout(s,o)},m=()=>{p(),r===0||r===void 0?t():n.current=window.setTimeout(t,r)};return I.useEffect(()=>p,[]),{openDropdown:a,closeDropdown:m}}const[Qe,T]=Ge("Menu component was not found in the tree");var A={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const Ye={},Y=U((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,...a}=C("MenuDivider",Ye,s),m=T();return e.jsx(le,{ref:t,...m.getStyles("divider",{className:r,style:i,styles:n,classNames:o}),...a})});Y.classes=A;Y.displayName="@mantine/core/MenuDivider";const Ze={},Z=U((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,onMouseEnter:a,onMouseLeave:m,onKeyDown:f,children:g,...v}=C("MenuDropdown",Ze,s),j=I.useRef(null),u=T(),h=b(f,w=>{var L,P;(w.key==="ArrowUp"||w.key==="ArrowDown")&&(w.preventDefault(),(P=(L=j.current)==null?void 0:L.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||P.focus())}),c=b(a,()=>(u.trigger==="hover"||u.trigger==="click-hover")&&u.openDropdown()),l=b(m,()=>(u.trigger==="hover"||u.trigger==="click-hover")&&u.closeDropdown());return e.jsxs(R.Dropdown,{...v,onMouseEnter:c,onMouseLeave:l,role:"menu","aria-orientation":"vertical",ref:K(t,j),...u.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:h,children:[u.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),g]})});Z.classes=A;Z.displayName="@mantine/core/MenuDropdown";const[Xe,H]=Ue(),es={},X=ce((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,color:a,closeMenuOnClick:m,leftSection:f,rightSection:g,children:v,disabled:j,"data-disabled":u,...h}=C("MenuItem",es,s),c=T(),l=H(),w=de(),{dir:L}=fe(),P=I.useRef(null),N=h,M=b(N.onClick,()=>{u||(typeof m=="boolean"?m&&c.closeDropdownImmediately():c.closeOnItemClick&&c.closeDropdownImmediately())}),y=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,S=a?me({color:a,theme:w}):null,$=b(N.onKeyDown,k=>{k.key==="ArrowLeft"&&l&&(l.close(),l.focusParentItem())});return e.jsxs(q,{onMouseDown:k=>k.preventDefault(),...h,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:K(P,t),role:"menuitem",disabled:j,"data-menu-item":!0,"data-disabled":j||u||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:xe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:L,orientation:"vertical",onKeyDown:$}),__vars:{"--menu-item-color":S!=null&&S.isThemeColor&&(S==null?void 0:S.shade)===void 0?`var(--mantine-color-${S.color}-6)`:y==null?void 0:y.color,"--menu-item-hover":y==null?void 0:y.hover},children:[f&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:f}),v&&e.jsx("div",{...c.getStyles("itemLabel",{styles:n,classNames:o}),children:v}),g&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:g})]})});X.classes=A;X.displayName="@mantine/core/MenuItem";const ss={},ee=U((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,...a}=C("MenuLabel",ss,s),m=T();return e.jsx(le,{ref:t,...m.getStyles("label",{className:r,style:i,styles:n,classNames:o}),...a})});ee.classes=A;ee.displayName="@mantine/core/MenuLabel";const os={},se=U((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,onMouseEnter:a,onMouseLeave:m,onKeyDown:f,children:g,...v}=C("MenuSubDropdown",os,s),j=I.useRef(null),u=T(),h=H(),c=b(a,h==null?void 0:h.open),l=b(m,h==null?void 0:h.close);return e.jsx(R.Dropdown,{...v,onMouseEnter:c,onMouseLeave:l,role:"menu","aria-orientation":"vertical",ref:K(t,j),...u.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:g})});se.classes=A;se.displayName="@mantine/core/MenuSubDropdown";const ns={},oe=ce((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:p,color:a,leftSection:m,rightSection:f,children:g,disabled:v,"data-disabled":j,closeMenuOnClick:u,...h}=C("MenuSubItem",ns,s),c=T(),l=H(),w=de(),{dir:L}=fe(),P=I.useRef(null),N=h,M=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,y=a?me({color:a,theme:w}):null,S=b(N.onKeyDown,E=>{E.key==="ArrowRight"&&(l==null||l.open(),l==null||l.focusFirstItem()),E.key==="ArrowLeft"&&(l!=null&&l.parentContext)&&(l.parentContext.close(),l.parentContext.focusParentItem())}),$=b(N.onClick,()=>{!j&&u&&c.closeDropdownImmediately()}),k=b(N.onMouseEnter,l==null?void 0:l.open),B=b(N.onMouseLeave,l==null?void 0:l.close);return e.jsxs(q,{onMouseDown:E=>E.preventDefault(),...h,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:K(P,t),role:"menuitem",disabled:v,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":v||j||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:k,onMouseLeave:B,onClick:$,onKeyDown:xe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:L,orientation:"vertical",onKeyDown:S}),__vars:{"--menu-item-color":y!=null&&y.isThemeColor&&(y==null?void 0:y.shade)===void 0?`var(--mantine-color-${y.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[m&&e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:m}),g&&e.jsx("div",{...c.getStyles("itemLabel",{styles:n,classNames:o}),children:g}),e.jsx("div",{...c.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:f||e.jsx(je,{...c.getStyles("chevron"),size:14})})]})});oe.classes=A;oe.displayName="@mantine/core/MenuSubItem";function ve({children:s,refProp:t}){if(!ge(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return T(),e.jsx(R.Target,{refProp:t,popupType:"menu",children:s})}ve.displayName="@mantine/core/MenuSubTarget";const ts={offset:0,position:"right-start",transitionProps:{duration:0}};function F(s){const{children:t,closeDelay:o,...r}=C("MenuSub",ts,s),i=Ke(),[n,{open:p,close:a}]=He(!1),m=H(),{openDropdown:f,closeDropdown:g}=ye({open:p,close:a,closeDelay:o,openDelay:0}),v=()=>window.setTimeout(()=>{var u,h;(h=(u=document.getElementById(`${i}-dropdown`))==null?void 0:u.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||h.focus()},16),j=()=>window.setTimeout(()=>{var u;(u=document.getElementById(`${i}-target`))==null||u.focus()},16);return e.jsx(Xe,{value:{opened:n,close:g,open:f,focusFirstItem:v,focusParentItem:j,parentContext:m},children:e.jsx(R,{opened:n,...r,withinPortal:!1,id:i,children:t})})}F.extend=s=>s;F.displayName="@mantine/core/MenuSub";F.Target=ve;F.Dropdown=se;F.Item=oe;const rs={refProp:"ref"},we=I.forwardRef((s,t)=>{const{children:o,refProp:r,...i}=C("MenuTarget",rs,s);if(!ge(o))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const n=T(),p=o.props,a=b(p.onClick,()=>{n.trigger==="click"?n.toggleDropdown():n.trigger==="click-hover"&&(n.setOpenedViaClick(!0),n.opened||n.openDropdown())}),m=b(p.onMouseEnter,()=>(n.trigger==="hover"||n.trigger==="click-hover")&&n.openDropdown()),f=b(p.onMouseLeave,()=>{(n.trigger==="hover"||n.trigger==="click-hover"&&!n.openedViaClick)&&n.closeDropdown()});return e.jsx(R.Target,{refProp:r,popupType:"menu",ref:t,...i,children:I.cloneElement(o,{onClick:a,onMouseEnter:m,onMouseLeave:f,"data-expanded":n.opened?!0:void 0})})});we.displayName="@mantine/core/MenuTarget";const is={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function x(s){const t=C("Menu",is,s),{children:o,onOpen:r,onClose:i,opened:n,defaultOpened:p,trapFocus:a,onChange:m,closeOnItemClick:f,loop:g,closeOnEscape:v,trigger:j,openDelay:u,closeDelay:h,classNames:c,styles:l,unstyled:w,variant:L,vars:P,menuItemTabIndex:N,keepMounted:M,withInitialFocusPlaceholder:y,...S}=t,$=Ne({name:"Menu",classes:A,props:t,classNames:c,styles:l,unstyled:w}),[k,B]=ze({value:n,defaultValue:p,finalValue:!1,onChange:m}),[E,ne]=I.useState(!1),G=()=>{B(!1),ne(!1),k&&(i==null||i())},V=()=>{B(!0),!k&&(r==null||r())},te=()=>{k?G():V()},{openDropdown:be,closeDropdown:Me}=ye({open:V,close:G,closeDelay:h,openDelay:u}),Se=Ie=>Je("[data-menu-item]","[data-menu-dropdown]",Ie),{resolvedClassNames:ke,resolvedStyles:De}=Be({classNames:c,styles:l,props:t});return e.jsx(Qe,{value:{getStyles:$,opened:k,toggleDropdown:te,getItemIndex:Se,openedViaClick:E,setOpenedViaClick:ne,closeOnItemClick:f,closeDropdown:j==="click"?G:Me,openDropdown:j==="click"?V:be,closeDropdownImmediately:G,loop:g,trigger:j,unstyled:w,menuItemTabIndex:N,withInitialFocusPlaceholder:y},children:e.jsx(R,{...S,opened:k,onChange:te,defaultOpened:p,trapFocus:M?!1:a,closeOnEscape:v,__staticSelector:"Menu",classNames:ke,styles:De,unstyled:w,variant:L,keepMounted:M,children:o})})}x.extend=s=>s;x.withProps=Ce(x);x.classes=A;x.displayName="@mantine/core/Menu";x.Item=X;x.Label=ee;x.Dropdown=Z;x.Target=we;x.Divider=Y;x.Sub=F;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],ls=Q("bolt",as);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ds=Q("house",cs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],us=Q("newspaper",ms),ps=J.header`
  /* padding: 1.625em 0; */
  position: sticky;
  top: 0;
  z-index: 99;
  
  .headerCard{
    padding: 1.5em 0;
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
`,hs=J.footer`
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
`,xs=J.aside`
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
`;function fs(){var p,a,m,f;const s=Le(),t=Te(),o=W(Re),r=W(pe),i=async()=>{t(Ae()),await Pe.purge(),s(D.LOGIN)},n=[{label:"GameIn",path:D.WELCOMEPAGE},{label:"About",path:D.WELCOMEPAGE},{label:"Info",path:D.WELCOMEPAGE},{label:"Guidelines",path:D.WELCOMEPAGE}];return e.jsx(ps,{children:e.jsx(he,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(x,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(x.Target,{children:e.jsx(q,{children:e.jsx(z,{className:"avatar-icon-small",size:"2em",avatar:_})})}),e.jsxs(x.Dropdown,{children:[e.jsxs(x.Label,{style:{fontSize:"1em"},children:["Hello,"," ",((a=(p=o==null?void 0:o.user)==null?void 0:p.username)==null?void 0:a.charAt(0).toUpperCase())+((f=(m=o==null?void 0:o.user)==null?void 0:m.username)==null?void 0:f.slice(1).toLowerCase())]}),e.jsx(x.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(x.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(x.Divider,{}),e.jsx(x.Item,{color:"red",onClick:i,children:"Logout"})]})]}):e.jsx("ul",{children:n.map((g,v)=>e.jsx("li",{children:e.jsx(d,{to:g.path,children:g.label})},v))}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(d,{to:"/login",children:e.jsx(ae,{variant:"grey",size:"sm",style:{marginRight:"0.5em"},children:"Sign in"})}),e.jsx(d,{to:"/register",children:e.jsx(ae,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function gs(){return e.jsx(he,{p:0,children:e.jsx(hs,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"Game Logo"})}),e.jsx(Ve,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Competency"})}),e.jsx("li",{children:e.jsx(d,{children:"Service"})}),e.jsx("li",{children:e.jsx(d,{children:"Vision"})}),e.jsx("li",{children:e.jsx(d,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Team"})}),e.jsx("li",{children:e.jsx(d,{children:"Location"})}),e.jsx("li",{children:e.jsx(d,{children:"History"})}),e.jsx("li",{children:e.jsx(d,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(d,{children:"Contact"})}),e.jsx("li",{children:e.jsx(d,{children:"Press"})}),e.jsx("li",{children:e.jsx(d,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(d,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(d,{children:"Support"})}),e.jsx("li",{children:e.jsx(d,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(d,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(d,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(O,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(d,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(d,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(d,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(d,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(O,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(O,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}function js(){const s=[{icon:e.jsx(ds,{size:"1em"}),label:"Account",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(us,{size:"1em"}),label:"News Feed",link:D.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(We,{size:"1em"}),label:"Creators",link:D.SEARCH.replace(":userType","creators")},{icon:e.jsx(qe,{size:"1em"}),label:"Brands",link:D.SEARCH.replace(":userType","brands")},{icon:e.jsx(ls,{size:"1em"}),label:"Settings",link:D.ACCOUNTS.DASHBOARD.ROOT}];return e.jsxs(xs,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(Fe,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ie.colors.inputBgColor[0],$rotated:!0,$border:"0.125emsolid #FFF",children:e.jsx($e,{size:"1.25em",color:ie.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(z,{size:"3em",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"3em",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"3em",avatar:_})}),e.jsx("li",{children:e.jsx(z,{size:"3em",avatar:_})})]})}),e.jsx("div",{className:"profile-links",children:e.jsx("ul",{children:s.map((t,o)=>e.jsxs("li",{children:[e.jsxs(d,{to:t.link,children:[t.icon,e.jsx("span",{children:t.label})]}),o%2!==0&&e.jsx("div",{className:"divider"})]},o))})})]})}const qs=()=>{const t=Ee().pathname==="/",r=W(pe)&&!t;return e.jsxs("div",{children:[e.jsx(fs,{}),e.jsxs("div",{className:"wrapper",children:[r&&e.jsx(js,{}),e.jsx("main",{className:r?"logged-in":"",children:e.jsx(Oe,{})}),r&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(gs,{})]})};export{qs as default};
