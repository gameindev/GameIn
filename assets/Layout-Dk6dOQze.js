import{r as w,j as e,a as de,p as V,u as I,B as Z,b as pe,c as Pe,g as Te,f as G,d as q,e as he,h as xe,U as X,i as $e,k as ee,l as _e,m as Fe,n as Y,o as Ae,q as Re,L as c,s as E,t as Ee,v as ue,w as ze,O as Be}from"./index-CBYo3uOm.js";import{G as ge}from"./gamein-logo-OLN3yQ-G.js";import{P as Ke,a as F,c as Oe,i as fe,u as Ue,l as Ve,T as Ge}from"./authSlice-gNr61wWt.js";import{f as qe,c as je,A as z,a as B,H as He,i as We}from"./authSelector-DQQ_16WR.js";import{c as ye}from"./create-safe-context-CEQ25TS4.js";import{u as ve,a as Je,b as Qe}from"./DirectionProvider-DLJPuIFy.js";import{B as me}from"./Button-CXra7RiR.js";import{T as _}from"./Title-CxHBCAWL.js";import{c as H}from"./createLucideIcon-BihvDO_z.js";import{S as Ye,F as Ze}from"./star-DDLnuhbY.js";function S(s,t){return n=>{s==null||s(n),t==null||t(n)}}function Xe(s,t,n){var r;return n?Array.from(((r=qe(n,t))==null?void 0:r.querySelectorAll(s))||[]).findIndex(a=>a===n):null}function es(s=!1,t){const{onOpen:n,onClose:r}={},[a,o]=w.useState(s),m=w.useCallback(()=>{o(h=>h||(n==null||n(),!0))},[n]),i=w.useCallback(()=>{o(h=>h&&(r==null||r(),!1))},[r]),u=w.useCallback(()=>{a?i():m()},[i,m,a]);return[a,{open:m,close:i,toggle:u}]}function we({style:s,size:t=16,...n}){return e.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...s,width:de(t),height:de(t),display:"block"},...n,children:e.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}we.displayName="@mantine/core/AccordionChevron";const[ss,ns]=ye("Card component was not found in tree");var se={root:"m_e615b15f",section:"m_599a2148"};const os={},W=V((s,t)=>{const n=I("CardSection",os,s),{classNames:r,className:a,style:o,styles:m,vars:i,withBorder:u,inheritPadding:h,mod:y,...j}=n,x=ns();return e.jsx(Z,{ref:t,mod:[{"with-border":u,"inherit-padding":h},y],...x.getStyles("section",{className:a,style:o,styles:m,classNames:r}),...j})});W.classes=se;W.displayName="@mantine/core/CardSection";const ts={},rs=Pe((s,{padding:t})=>({root:{"--card-padding":Te(t)}})),K=V((s,t)=>{const n=I("Card",ts,s),{classNames:r,className:a,style:o,styles:m,unstyled:i,vars:u,children:h,padding:y,...j}=n,x=pe({name:"Card",props:n,classes:se,className:a,style:o,classNames:r,styles:m,unstyled:i,vars:u,varsResolver:rs}),p=w.Children.toArray(h),g=p.map((l,d)=>typeof l=="object"&&l&&"type"in l&&l.type===W?w.cloneElement(l,{"data-first-section":d===0||void 0,"data-last-section":d===p.length-1||void 0}):l);return e.jsx(ss,{value:{getStyles:x},children:e.jsx(Ke,{ref:t,unstyled:i,...x("root"),...j,children:g})})});K.classes=se;K.displayName="@mantine/core/Card";K.Section=W;function be({open:s,close:t,openDelay:n,closeDelay:r}){const a=w.useRef(-1),o=w.useRef(-1),m=()=>{window.clearTimeout(a.current),window.clearTimeout(o.current)},i=()=>{m(),n===0||n===void 0?s():a.current=window.setTimeout(s,n)},u=()=>{m(),r===0||r===void 0?t():o.current=window.setTimeout(t,r)};return w.useEffect(()=>m,[]),{openDropdown:i,closeDropdown:u}}const[as,L]=ye("Menu component was not found in the tree");var P={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const is={},ne=G((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,...i}=I("MenuDivider",is,s),u=L();return e.jsx(Z,{ref:t,...u.getStyles("divider",{className:r,style:a,styles:o,classNames:n}),...i})});ne.classes=P;ne.displayName="@mantine/core/MenuDivider";const ls={},oe=G((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,onMouseEnter:i,onMouseLeave:u,onKeyDown:h,children:y,...j}=I("MenuDropdown",ls,s),x=w.useRef(null),p=L(),g=S(h,b=>{var C,T;(b.key==="ArrowUp"||b.key==="ArrowDown")&&(b.preventDefault(),(T=(C=x.current)==null?void 0:C.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||T.focus())}),l=S(i,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.openDropdown()),d=S(u,()=>(p.trigger==="hover"||p.trigger==="click-hover")&&p.closeDropdown());return e.jsxs(F.Dropdown,{...j,onMouseEnter:l,onMouseLeave:d,role:"menu","aria-orientation":"vertical",ref:q(t,x),...p.getStyles("dropdown",{className:r,style:a,styles:o,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:g,children:[p.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),y]})});oe.classes=P;oe.displayName="@mantine/core/MenuDropdown";const[cs,J]=Oe(),ds={},te=V((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,color:i,closeMenuOnClick:u,leftSection:h,rightSection:y,children:j,disabled:x,"data-disabled":p,...g}=I("MenuItem",ds,s),l=L(),d=J(),b=he(),{dir:C}=ve(),T=w.useRef(null),D=g,M=S(D.onClick,()=>{p||(typeof u=="boolean"?u&&l.closeDropdownImmediately():l.closeOnItemClick&&l.closeDropdownImmediately())}),v=i?b.variantColorResolver({color:i,theme:b,variant:"light"}):void 0,k=i?xe({color:i,theme:b}):null,R=S(D.onKeyDown,N=>{N.key==="ArrowLeft"&&d&&(d.close(),d.focusParentItem())});return e.jsxs(X,{onMouseDown:N=>N.preventDefault(),...g,unstyled:l.unstyled,tabIndex:l.menuItemTabIndex,...l.getStyles("item",{className:r,style:a,styles:o,classNames:n}),ref:q(T,t),role:"menuitem",disabled:x,"data-menu-item":!0,"data-disabled":x||p||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:je({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:l.loop,dir:C,orientation:"vertical",onKeyDown:R}),__vars:{"--menu-item-color":k!=null&&k.isThemeColor&&(k==null?void 0:k.shade)===void 0?`var(--mantine-color-${k.color}-6)`:v==null?void 0:v.color,"--menu-item-hover":v==null?void 0:v.hover},children:[h&&e.jsx("div",{...l.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"left",children:h}),j&&e.jsx("div",{...l.getStyles("itemLabel",{styles:o,classNames:n}),children:j}),y&&e.jsx("div",{...l.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"right",children:y})]})});te.classes=P;te.displayName="@mantine/core/MenuItem";const us={},re=G((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,...i}=I("MenuLabel",us,s),u=L();return e.jsx(Z,{ref:t,...u.getStyles("label",{className:r,style:a,styles:o,classNames:n}),...i})});re.classes=P;re.displayName="@mantine/core/MenuLabel";const ms={},ae=G((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,onMouseEnter:i,onMouseLeave:u,onKeyDown:h,children:y,...j}=I("MenuSubDropdown",ms,s),x=w.useRef(null),p=L(),g=J(),l=S(i,g==null?void 0:g.open),d=S(u,g==null?void 0:g.close);return e.jsx(F.Dropdown,{...j,onMouseEnter:l,onMouseLeave:d,role:"menu","aria-orientation":"vertical",ref:q(t,x),...p.getStyles("dropdown",{className:r,style:a,styles:o,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:y})});ae.classes=P;ae.displayName="@mantine/core/MenuSubDropdown";const ps={},ie=V((s,t)=>{const{classNames:n,className:r,style:a,styles:o,vars:m,color:i,leftSection:u,rightSection:h,children:y,disabled:j,"data-disabled":x,closeMenuOnClick:p,...g}=I("MenuSubItem",ps,s),l=L(),d=J(),b=he(),{dir:C}=ve(),T=w.useRef(null),D=g,M=i?b.variantColorResolver({color:i,theme:b,variant:"light"}):void 0,v=i?xe({color:i,theme:b}):null,k=S(D.onKeyDown,$=>{$.key==="ArrowRight"&&(d==null||d.open(),d==null||d.focusFirstItem()),$.key==="ArrowLeft"&&(d!=null&&d.parentContext)&&(d.parentContext.close(),d.parentContext.focusParentItem())}),R=S(D.onClick,()=>{!x&&p&&l.closeDropdownImmediately()}),N=S(D.onMouseEnter,d==null?void 0:d.open),O=S(D.onMouseLeave,d==null?void 0:d.close);return e.jsxs(X,{onMouseDown:$=>$.preventDefault(),...g,unstyled:l.unstyled,tabIndex:l.menuItemTabIndex,...l.getStyles("item",{className:r,style:a,styles:o,classNames:n}),ref:q(T,t),role:"menuitem",disabled:j,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":j||x||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:N,onMouseLeave:O,onClick:R,onKeyDown:je({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:l.loop,dir:C,orientation:"vertical",onKeyDown:k}),__vars:{"--menu-item-color":v!=null&&v.isThemeColor&&(v==null?void 0:v.shade)===void 0?`var(--mantine-color-${v.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[u&&e.jsx("div",{...l.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"left",children:u}),y&&e.jsx("div",{...l.getStyles("itemLabel",{styles:o,classNames:n}),children:y}),e.jsx("div",{...l.getStyles("itemSection",{styles:o,classNames:n}),"data-position":"right",children:h||e.jsx(we,{...l.getStyles("chevron"),size:14})})]})});ie.classes=P;ie.displayName="@mantine/core/MenuSubItem";function Se({children:s,refProp:t}){if(!fe(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return L(),e.jsx(F.Target,{refProp:t,popupType:"menu",children:s})}Se.displayName="@mantine/core/MenuSubTarget";const hs={offset:0,position:"right-start",transitionProps:{duration:0}};function A(s){const{children:t,closeDelay:n,...r}=I("MenuSub",hs,s),a=Je(),[o,{open:m,close:i}]=es(!1),u=J(),{openDropdown:h,closeDropdown:y}=be({open:m,close:i,closeDelay:n,openDelay:0}),j=()=>window.setTimeout(()=>{var p,g;(g=(p=document.getElementById(`${a}-dropdown`))==null?void 0:p.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||g.focus()},16),x=()=>window.setTimeout(()=>{var p;(p=document.getElementById(`${a}-target`))==null||p.focus()},16);return e.jsx(cs,{value:{opened:o,close:y,open:h,focusFirstItem:j,focusParentItem:x,parentContext:u},children:e.jsx(F,{opened:o,...r,withinPortal:!1,id:a,children:t})})}A.extend=s=>s;A.displayName="@mantine/core/MenuSub";A.Target=Se;A.Dropdown=ae;A.Item=ie;const xs={refProp:"ref"},Me=w.forwardRef((s,t)=>{const{children:n,refProp:r,...a}=I("MenuTarget",xs,s);if(!fe(n))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const o=L(),m=n.props,i=S(m.onClick,()=>{o.trigger==="click"?o.toggleDropdown():o.trigger==="click-hover"&&(o.setOpenedViaClick(!0),o.opened||o.openDropdown())}),u=S(m.onMouseEnter,()=>(o.trigger==="hover"||o.trigger==="click-hover")&&o.openDropdown()),h=S(m.onMouseLeave,()=>{(o.trigger==="hover"||o.trigger==="click-hover"&&!o.openedViaClick)&&o.closeDropdown()});return e.jsx(F.Target,{refProp:r,popupType:"menu",ref:t,...a,children:w.cloneElement(n,{onClick:i,onMouseEnter:u,onMouseLeave:h,"data-expanded":o.opened?!0:void 0})})});Me.displayName="@mantine/core/MenuTarget";const gs={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function f(s){const t=I("Menu",gs,s),{children:n,onOpen:r,onClose:a,opened:o,defaultOpened:m,trapFocus:i,onChange:u,closeOnItemClick:h,loop:y,closeOnEscape:j,trigger:x,openDelay:p,closeDelay:g,classNames:l,styles:d,unstyled:b,variant:C,vars:T,menuItemTabIndex:D,keepMounted:M,withInitialFocusPlaceholder:v,...k}=t,R=pe({name:"Menu",classes:P,props:t,classNames:l,styles:d,unstyled:b}),[N,O]=Qe({value:o,defaultValue:m,finalValue:!1,onChange:u}),[$,le]=w.useState(!1),U=()=>{O(!1),le(!1),N&&(a==null||a())},Q=()=>{O(!0),!N&&(r==null||r())},ce=()=>{N?U():Q()},{openDropdown:ke,closeDropdown:Ne}=be({open:Q,close:U,closeDelay:g,openDelay:p}),Ie=Le=>Xe("[data-menu-item]","[data-menu-dropdown]",Le),{resolvedClassNames:De,resolvedStyles:Ce}=Ue({classNames:l,styles:d,props:t});return e.jsx(as,{value:{getStyles:R,opened:N,toggleDropdown:ce,getItemIndex:Ie,openedViaClick:$,setOpenedViaClick:le,closeOnItemClick:h,closeDropdown:x==="click"?U:Ne,openDropdown:x==="click"?Q:ke,closeDropdownImmediately:U,loop:y,trigger:x,unstyled:b,menuItemTabIndex:D,withInitialFocusPlaceholder:v},children:e.jsx(F,{...k,opened:N,onChange:ce,defaultOpened:m,trapFocus:M?!1:i,closeOnEscape:j,__staticSelector:"Menu",classNames:De,styles:Ce,unstyled:b,variant:C,keepMounted:M,children:n})})}f.extend=s=>s;f.withProps=$e(f);f.classes=P;f.displayName="@mantine/core/Menu";f.Item=te;f.Label=re;f.Dropdown=oe;f.Target=Me;f.Divider=ne;f.Sub=A;const fs=ee.header`
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
`,js=ee.footer`
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
`,ys=ee.aside`
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
`;function vs(){var o,m,i,u;const s=_e(),t=Fe(),n=Y(Ae),r=Y(Re),a=async()=>{t(Ve()),await Ee.purge(),s(E.welcomePage)};return e.jsx(fs,{children:e.jsx(K,{className:"headerCard",children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ge,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(f,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(f.Target,{children:e.jsx(X,{children:e.jsx(z,{className:"avatar-icon-small",size:"3.5rem",avatar:B})})}),e.jsxs(f.Dropdown,{children:[e.jsxs(f.Label,{style:{fontSize:"1rem"},children:["Hello,"," ",((m=(o=n==null?void 0:n.user)==null?void 0:o.username)==null?void 0:m.charAt(0).toUpperCase())+((u=(i=n==null?void 0:n.user)==null?void 0:i.username)==null?void 0:u.slice(1).toLowerCase())]}),e.jsx(f.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(f.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(f.Divider,{}),e.jsx(f.Item,{color:"red",onClick:a,children:"Logout"})]})]}):e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{to:E.welcomePage,children:"GameIn"})}),e.jsx("li",{children:e.jsx(c,{to:E.welcomePage,children:"About"})}),e.jsx("li",{children:e.jsx(c,{to:E.welcomePage,children:"Info"})}),e.jsx("li",{children:e.jsx(c,{to:E.welcomePage,children:"Guidelines"})})]}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(c,{to:"/login",children:e.jsx(me,{variant:"grey",size:"sm",style:{marginRight:"0.5rem"},children:"Sign in"})}),e.jsx(c,{to:"/register",children:e.jsx(me,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function ws(){return e.jsx(K,{p:0,children:e.jsx(js,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ge,alt:"Game Logo"})}),e.jsx(Ge,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{children:"Competency"})}),e.jsx("li",{children:e.jsx(c,{children:"Service"})}),e.jsx("li",{children:e.jsx(c,{children:"Vision"})}),e.jsx("li",{children:e.jsx(c,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{children:"Team"})}),e.jsx("li",{children:e.jsx(c,{children:"Location"})}),e.jsx("li",{children:e.jsx(c,{children:"History"})}),e.jsx("li",{children:e.jsx(c,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(c,{children:"Contact"})}),e.jsx("li",{children:e.jsx(c,{children:"Press"})}),e.jsx("li",{children:e.jsx(c,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(c,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(c,{children:"Support"})}),e.jsx("li",{children:e.jsx(c,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(c,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(c,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(c,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(c,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(c,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(c,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(c,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(_,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(_,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}],["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}]],Ss=H("bolt",bs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ks=H("house",Ms);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ns=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],Is=H("newspaper",Ns);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Cs=H("plus",Ds);function Ls(){return e.jsxs(ys,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(He,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ue.colors.inputBgColor[0],$rotated:!0,$border:"0.125rem solid #FFF",children:e.jsx(Cs,{size:"1.25rem",color:ue.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:B})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:B})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:B})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:B})})]})}),e.jsx("div",{className:"profile-links",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs(c,{to:"/",children:[e.jsx(ks,{size:"1rem"}),e.jsx("span",{children:"Account"})]})}),e.jsx("li",{children:e.jsxs(c,{to:"/",children:[e.jsx(Is,{size:"1rem"}),e.jsx("span",{children:"News Feed"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(c,{to:"/",children:[e.jsx(Ye,{size:"1rem"}),e.jsx("span",{children:"Creators"})]})}),e.jsx("li",{children:e.jsxs(c,{to:"/",children:[e.jsx(Ze,{size:"1rem"}),e.jsx("span",{children:"Brands"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(c,{to:"/",children:[e.jsx(Ss,{size:"1rem"}),e.jsx("span",{children:"Settings"})]})})]})})]})}const Ks=()=>{const t=ze().pathname==="/",r=Y(We)&&!t;return e.jsxs("div",{children:[e.jsx(vs,{}),e.jsxs("div",{className:"wrapper",children:[r&&e.jsx(Ls,{}),e.jsx("main",{className:r?"logged-in":"",children:e.jsx(Be,{})}),r&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(ws,{})]})};export{Ks as default};
