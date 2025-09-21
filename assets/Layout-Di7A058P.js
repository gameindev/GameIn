import{r as k,f as K,u as N,j as e,B as ae,a as H,p as le,b as ce,c as de,U as q,e as Ce,g as Le,d as J,h as Te,i as me,k as B,l as I,L as m,m as Ee,n as Ae,t as re,o as Pe,O as Oe,s as Re}from"./index-BdKYZ-eS.js";import{G as ue}from"./gamein-logo-OLN3yQ-G.js";import{c as pe,i as he}from"./selectors-BfVctv7J.js";import{c as z}from"./creator_image-C6LzQUPk.js";import{A as U,H as Fe}from"./AvatarSection-i47vKbpB.js";import{p as _e}from"./useProfileMediaUrl-7uGcnrxC.js";import{C as xe,I as $e}from"./IconPlus-C6oc2iMO.js";import{f as ze,c as fe}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as Ue}from"./InputBase-CeldfAqD.js";import{P as F}from"./Popover-W4PPjW8o.js";import{c as Ge}from"./create-safe-context-Bvd17-2z.js";import{u as ge,a as Be}from"./DirectionProvider-DXc5CcBD.js";import{c as Ke}from"./create-optional-context-Bp0Cxvum.js";import{A as He}from"./AccordionChevron-CE32AG2g.js";import{i as je}from"./FocusTrap-CvEZSnOY.js";import{u as Ve}from"./modal-DTgkh8oR.js";import{u as We}from"./use-uncontrolled-BTizQgRf.js";import{B as ie}from"./Button-Bhqaz8qy.js";import{T as qe}from"./TextInput-o1WTiNdf.js";import{T as R}from"./Title-B-hr11WK.js";import{c as Q}from"./createReactComponent-vGlhThBW.js";import{I as Je,a as Qe}from"./IconStar-ZRleWtx1.js";import{u as Ye}from"./useApi-Biy4RklS.js";import{g as Xe}from"./index-C3NaiNSv.js";import"./HexContainer-CzvVzpjc.js";import"./EditAvator-DAwUm_Jh.js";import"./Stack-BnYw-62w.js";import"./Group-Cc3YjUX0.js";import"./FileInput-Lv1PaQrn.js";import"./FileButton-bg7tlTQ9.js";import"./Image-C6yLjeA5.js";import"./Paper-CJFZiEJq.js";import"./get-floating-position-G-PNIiYN.js";import"./IconButton-BUWNAfHS.js";import"./ActionIcon-Db9UWPL9.js";import"./Modal-DAgg0iNA.js";import"./index-BuX6f0Uy.js";function b(s,t){return o=>{s==null||s(o),t==null||t(o)}}function Ze(s,t,o){var r;return o?Array.from(((r=ze(o,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(i=>i===o):null}function ve({open:s,close:t,openDelay:o,closeDelay:r}){const i=k.useRef(-1),n=k.useRef(-1),u=()=>{window.clearTimeout(i.current),window.clearTimeout(n.current)},a=()=>{u(),o===0||o===void 0?s():i.current=window.setTimeout(s,o)},l=()=>{u(),r===0||r===void 0?t():n.current=window.setTimeout(t,r)};return k.useEffect(()=>u,[]),{openDropdown:a,closeDropdown:l}}const[es,L]=Ge("Menu component was not found in the tree");var T={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const Y=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,...a}=N("MenuDivider",null,s),l=L();return e.jsx(ae,{ref:t,...l.getStyles("divider",{className:r,style:i,styles:n,classNames:o}),...a})});Y.classes=T;Y.displayName="@mantine/core/MenuDivider";const X=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,onMouseEnter:a,onMouseLeave:l,onKeyDown:g,children:j,...v}=N("MenuDropdown",null,s),f=k.useRef(null),p=L(),h=b(g,w=>{var C,E;(w.key==="ArrowUp"||w.key==="ArrowDown")&&(w.preventDefault(),(E=(C=f.current)==null?void 0:C.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||E.focus())}),d=b(a,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.openDropdown()),c=b(l,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.closeDropdown());return e.jsxs(F.Dropdown,{...v,onMouseEnter:d,onMouseLeave:c,role:"menu","aria-orientation":"vertical",ref:H(t,f),...p.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:h,children:[p.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),j]})});X.classes=T;X.displayName="@mantine/core/MenuDropdown";const[ss,V]=Ke(),Z=le((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,color:a,closeMenuOnClick:l,leftSection:g,rightSection:j,children:v,disabled:f,"data-disabled":p,...h}=N("MenuItem",null,s),d=L(),c=V(),w=ce(),{dir:C}=ge(),E=k.useRef(null),D=h,M=b(D.onClick,()=>{p||(typeof l=="boolean"?l&&d.closeDropdownImmediately():d.closeOnItemClick&&d.closeDropdownImmediately())}),y=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,S=a?de({color:a,theme:w}):null,$=b(D.onKeyDown,A=>{A.key==="ArrowLeft"&&c&&(c.close(),c.focusParentItem())});return e.jsxs(q,{onMouseDown:A=>A.preventDefault(),...h,unstyled:d.unstyled,tabIndex:d.menuItemTabIndex,...d.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:H(E,t),role:"menuitem",disabled:f,"data-menu-item":!0,"data-disabled":f||p||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:fe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:d.loop,dir:C,orientation:"vertical",onKeyDown:$}),__vars:{"--menu-item-color":S!=null&&S.isThemeColor&&(S==null?void 0:S.shade)===void 0?`var(--mantine-color-${S.color}-6)`:y==null?void 0:y.color,"--menu-item-hover":y==null?void 0:y.hover},children:[g&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:g}),v&&e.jsx("div",{...d.getStyles("itemLabel",{styles:n,classNames:o}),children:v}),j&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:j})]})});Z.classes=T;Z.displayName="@mantine/core/MenuItem";const ee=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,...a}=N("MenuLabel",null,s),l=L();return e.jsx(ae,{ref:t,...l.getStyles("label",{className:r,style:i,styles:n,classNames:o}),...a})});ee.classes=T;ee.displayName="@mantine/core/MenuLabel";const se=K((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,onMouseEnter:a,onMouseLeave:l,onKeyDown:g,children:j,...v}=N("MenuSubDropdown",null,s),f=k.useRef(null),p=L(),h=V(),d=b(a,h==null?void 0:h.open),c=b(l,h==null?void 0:h.close);return e.jsx(F.Dropdown,{...v,onMouseEnter:d,onMouseLeave:c,role:"menu","aria-orientation":"vertical",ref:H(t,f),...p.getStyles("dropdown",{className:r,style:i,styles:n,classNames:o,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:j})});se.classes=T;se.displayName="@mantine/core/MenuSubDropdown";const oe=le((s,t)=>{const{classNames:o,className:r,style:i,styles:n,vars:u,color:a,leftSection:l,rightSection:g,children:j,disabled:v,"data-disabled":f,closeMenuOnClick:p,...h}=N("MenuSubItem",null,s),d=L(),c=V(),w=ce(),{dir:C}=ge(),E=k.useRef(null),D=h,M=a?w.variantColorResolver({color:a,theme:w,variant:"light"}):void 0,y=a?de({color:a,theme:w}):null,S=b(D.onKeyDown,O=>{O.key==="ArrowRight"&&(c==null||c.open(),c==null||c.focusFirstItem()),O.key==="ArrowLeft"&&(c!=null&&c.parentContext)&&(c.parentContext.close(),c.parentContext.focusParentItem())}),$=b(D.onClick,()=>{!f&&p&&d.closeDropdownImmediately()}),A=b(D.onMouseEnter,c==null?void 0:c.open),P=b(D.onMouseLeave,c==null?void 0:c.close);return e.jsxs(q,{onMouseDown:O=>O.preventDefault(),...h,unstyled:d.unstyled,tabIndex:d.menuItemTabIndex,...d.getStyles("item",{className:r,style:i,styles:n,classNames:o}),ref:H(E,t),role:"menuitem",disabled:v,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":v||f||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:A,onMouseLeave:P,onClick:$,onKeyDown:fe({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:d.loop,dir:C,orientation:"vertical",onKeyDown:S}),__vars:{"--menu-item-color":y!=null&&y.isThemeColor&&(y==null?void 0:y.shade)===void 0?`var(--mantine-color-${y.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[l&&e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"left",children:l}),j&&e.jsx("div",{...d.getStyles("itemLabel",{styles:n,classNames:o}),children:j}),e.jsx("div",{...d.getStyles("itemSection",{styles:n,classNames:o}),"data-position":"right",children:g||e.jsx(He,{...d.getStyles("chevron"),size:14})})]})});oe.classes=T;oe.displayName="@mantine/core/MenuSubItem";function ye({children:s,refProp:t}){if(!je(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return L(),e.jsx(F.Target,{refProp:t,popupType:"menu",children:s})}ye.displayName="@mantine/core/MenuSubTarget";const os={offset:0,position:"right-start",transitionProps:{duration:0},middlewares:{shift:{crossAxis:!0}}};function _(s){const{children:t,closeDelay:o,...r}=N("MenuSub",os,s),i=Be(),[n,{open:u,close:a}]=Ve(!1),l=V(),{openDropdown:g,closeDropdown:j}=ve({open:u,close:a,closeDelay:o,openDelay:0}),v=()=>window.setTimeout(()=>{var p,h;(h=(p=document.getElementById(`${i}-dropdown`))==null?void 0:p.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||h.focus()},16),f=()=>window.setTimeout(()=>{var p;(p=document.getElementById(`${i}-target`))==null||p.focus()},16);return e.jsx(ss,{value:{opened:n,close:j,open:g,focusFirstItem:v,focusParentItem:f,parentContext:l},children:e.jsx(F,{opened:n,...r,withinPortal:!1,withArrow:!1,id:i,children:t})})}_.extend=s=>s;_.displayName="@mantine/core/MenuSub";_.Target=ye;_.Dropdown=se;_.Item=oe;const ns={refProp:"ref"},we=k.forwardRef((s,t)=>{const{children:o,refProp:r,...i}=N("MenuTarget",ns,s);if(!je(o))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const n=L(),u=o.props,a=b(u.onClick,()=>{n.trigger==="click"?n.toggleDropdown():n.trigger==="click-hover"&&(n.setOpenedViaClick(!0),n.opened||n.openDropdown())}),l=b(u.onMouseEnter,()=>(n.trigger==="hover"||n.trigger==="click-hover")&&n.openDropdown()),g=b(u.onMouseLeave,()=>{(n.trigger==="hover"||n.trigger==="click-hover"&&!n.openedViaClick)&&n.closeDropdown()});return e.jsx(F.Target,{refProp:r,popupType:"menu",ref:t,...i,children:k.cloneElement(o,{onClick:a,onMouseEnter:l,onMouseLeave:g,"data-expanded":n.opened?!0:void 0})})});we.displayName="@mantine/core/MenuTarget";const ts={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function x(s){const t=N("Menu",ts,s),{children:o,onOpen:r,onClose:i,opened:n,defaultOpened:u,trapFocus:a,onChange:l,closeOnItemClick:g,loop:j,closeOnEscape:v,trigger:f,openDelay:p,closeDelay:h,classNames:d,styles:c,unstyled:w,variant:C,vars:E,menuItemTabIndex:D,keepMounted:M,withInitialFocusPlaceholder:y,attributes:S,...$}=t,A=Ce({name:"Menu",classes:T,props:t,classNames:d,styles:c,unstyled:w,attributes:S}),[P,O]=We({value:n,defaultValue:u,finalValue:!1,onChange:l}),[be,ne]=k.useState(!1),G=()=>{O(!1),ne(!1),P&&(i==null||i())},W=()=>{O(!0),!P&&(r==null||r())},te=()=>{P?G():W()},{openDropdown:Me,closeDropdown:Se}=ve({open:W,close:G,closeDelay:h,openDelay:p}),ke=Ne=>Ze("[data-menu-item]","[data-menu-dropdown]",Ne),{resolvedClassNames:Ie,resolvedStyles:De}=Ue({classNames:d,styles:c,props:t});return e.jsx(es,{value:{getStyles:A,opened:P,toggleDropdown:te,getItemIndex:ke,openedViaClick:be,setOpenedViaClick:ne,closeOnItemClick:g,closeDropdown:f==="click"?G:Se,openDropdown:f==="click"?W:Me,closeDropdownImmediately:G,loop:j,trigger:f,unstyled:w,menuItemTabIndex:D,withInitialFocusPlaceholder:y},children:e.jsx(F,{...$,opened:P,onChange:te,defaultOpened:u,trapFocus:M?!1:a,closeOnEscape:v,__staticSelector:"Menu",classNames:Ie,styles:De,unstyled:w,variant:C,keepMounted:M,children:o})})}x.extend=s=>s;x.withProps=Le(x);x.classes=T;x.displayName="@mantine/core/Menu";x.Item=Z;x.Label=ee;x.Dropdown=X;x.Target=we;x.Divider=Y;x.Sub=_;/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=[["path",{d:"M5 12l-2 0l9 -9l9 9l-2 0",key:"svg-0"}],["path",{d:"M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",key:"svg-1"}],["path",{d:"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",key:"svg-2"}]],is=Q("outline","home","Home",rs);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=[["path",{d:"M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11",key:"svg-0"}],["path",{d:"M8 8l4 0",key:"svg-1"}],["path",{d:"M8 12l4 0",key:"svg-2"}],["path",{d:"M8 16l4 0",key:"svg-3"}]],ls=Q("outline","news","News",as);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=[["path",{d:"M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z",key:"svg-0"}],["path",{d:"M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-1"}]],ds=Q("outline","settings-2","Settings2",cs),ms=J.header`
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
`,us=J.footer`
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
`,ps=J.aside`
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
`;function hs(){var a,l,g,j;const s=Te(),t=me(),o=B(pe),r=B(he),{avatarUrl:i}=_e((o==null?void 0:o.user)||{}),n=async()=>{t(Ee()),await Ae.purge(),s(I.LOGIN)},u=[{label:"GameIn",path:I.WELCOMEPAGE},{label:"About",path:I.WELCOMEPAGE},{label:"Info",path:I.WELCOMEPAGE},{label:"Guidelines",path:I.WELCOMEPAGE}];return e.jsx(ms,{children:e.jsx(xe,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(x,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(x.Target,{children:e.jsx(q,{children:e.jsx(U,{className:"avatar-icon-small",size:"55",avatar:i||z})})}),e.jsxs(x.Dropdown,{children:[e.jsxs(x.Label,{style:{fontSize:"1em"},children:["Hello,"," ",((l=(a=o==null?void 0:o.user)==null?void 0:a.username)==null?void 0:l.charAt(0).toUpperCase())+((j=(g=o==null?void 0:o.user)==null?void 0:g.username)==null?void 0:j.slice(1).toLowerCase())]}),e.jsx(x.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(x.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(x.Divider,{}),e.jsx(x.Item,{color:"red",onClick:n,children:"Logout"})]})]}):e.jsx("ul",{children:u.map((v,f)=>e.jsx("li",{children:e.jsx(m,{to:v.path,children:v.label})},f))}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(m,{to:"/login",children:e.jsx(ie,{variant:"grey",size:"sm",style:{marginRight:"0.5em"},children:"Sign in"})}),e.jsx(m,{to:"/register",children:e.jsx(ie,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function xs(){return e.jsx(xe,{p:0,children:e.jsx(us,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ue,alt:"Game Logo"})}),e.jsx(qe,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(R,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Competency"})}),e.jsx("li",{children:e.jsx(m,{children:"Service"})}),e.jsx("li",{children:e.jsx(m,{children:"Vision"})}),e.jsx("li",{children:e.jsx(m,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(R,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Team"})}),e.jsx("li",{children:e.jsx(m,{children:"Location"})}),e.jsx("li",{children:e.jsx(m,{children:"History"})}),e.jsx("li",{children:e.jsx(m,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(m,{children:"Contact"})}),e.jsx("li",{children:e.jsx(m,{children:"Press"})}),e.jsx("li",{children:e.jsx(m,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(m,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(R,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(m,{children:"Support"})}),e.jsx("li",{children:e.jsx(m,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(m,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(m,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(R,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(m,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(m,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(m,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(m,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(m,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(R,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(R,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}function fs(){const s=[{icon:e.jsx(is,{size:"1em"}),label:"Account",link:I.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(ls,{size:"1em"}),label:"News Feed",link:I.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(Je,{size:"1em"}),label:"Creators",link:I.SEARCH.replace(":userType","creator")},{icon:e.jsx(Qe,{size:"1em"}),label:"Brands",link:I.SEARCH.replace(":userType","brand")},{icon:e.jsx(ds,{size:"1em"}),label:"Settings",link:I.SETTINGS.ROOT}];return e.jsxs(ps,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(Fe,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:re.colors.inputBgColor[0],$rotated:!0,$border:"0.125emsolid #FFF",children:e.jsx($e,{size:"1.25em",color:re.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})}),e.jsx("li",{children:e.jsx(U,{size:"50",avatar:z})})]})}),e.jsx("div",{className:"profile-links",children:e.jsx("ul",{children:s.map((t,o)=>e.jsxs("li",{children:[e.jsxs(m,{to:t.link,children:[t.icon,e.jsx("span",{children:t.label})]}),o%2!==0&&e.jsx("div",{className:"divider"})]},o))})})]})}const eo=()=>{const t=Pe().pathname==="/",o=B(he),{user:r}=B(pe)||{},i=me(),{get:n}=Ye(),u=o&&!t;return k.useEffect(()=>{(async()=>{if(r!=null&&r.id)try{const l=await Xe(n,r.id,r.user_type);i(Re({user:l}))}catch(l){console.error("Error fetching user profile",l)}})()},[r==null?void 0:r.id]),e.jsxs("div",{children:[e.jsx(hs,{}),e.jsxs("div",{className:"wrapper",children:[u&&e.jsx(fs,{}),e.jsx("main",{className:u?"logged-in":"",children:e.jsx(Oe,{})}),u&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(xs,{})]})};export{eo as default};
