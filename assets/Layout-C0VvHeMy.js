import{r as w,j as e,a as de,p as V,u as I,B as Z,b as he,c as Pe,g as Te,f as G,d as q,e as pe,h as xe,U as X,i as $e,k as ee,l as _e,m as Fe,n as Y,o as Ae,q as Re,L as d,s as E,t as Ee,v as ue,w as ze,O as Oe}from"./index-24N-J-Nb.js";import{G as ge}from"./gamein-logo-OLN3yQ-G.js";import{P as Be,a as F,c as Ke,i as fe,u as Ue,l as Ve,T as Ge}from"./authSlice-BRdzwD2J.js";import{f as qe,c as je,A as z,a as O,H as He,i as We}from"./authSelector-CJBdQoHa.js";import{c as ye}from"./create-safe-context-BbkzFr54.js";import{u as ve,a as Je,b as Qe}from"./DirectionProvider-BsSgPi3y.js";import{B as me}from"./Button-B3_wdx4I.js";import{T as _}from"./Title-BrLs7r7A.js";import{c as H}from"./createLucideIcon-Dspq0Akv.js";import{S as Ye,F as Ze}from"./star-Do7stAlo.js";function S(s,o){return n=>{s==null||s(n),o==null||o(n)}}function Xe(s,o,n){var r;return n?Array.from(((r=qe(n,o))==null?void 0:r.querySelectorAll(s))||[]).findIndex(i=>i===n):null}function es(s=!1,o={}){const[n,r]=w.useState(s),i=w.useCallback(()=>{r(a=>{var l;return a||((l=o.onOpen)==null||l.call(o),!0)})},[o.onOpen]),t=w.useCallback(()=>{r(a=>{var l;return a&&((l=o.onClose)==null||l.call(o),!1)})},[o.onClose]),m=w.useCallback(()=>{n?t():i()},[t,i,n]);return[n,{open:i,close:t,toggle:m}]}function we({style:s,size:o=16,...n}){return e.jsx("svg",{viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{...s,width:de(o),height:de(o),display:"block"},...n,children:e.jsx("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}we.displayName="@mantine/core/AccordionChevron";const[ss,ns]=ye("Card component was not found in tree");var se={root:"m_e615b15f",section:"m_599a2148"};const os={},W=V((s,o)=>{const n=I("CardSection",os,s),{classNames:r,className:i,style:t,styles:m,vars:a,withBorder:l,inheritPadding:f,mod:y,...j}=n,p=ns();return e.jsx(Z,{ref:o,mod:[{"with-border":l,"inherit-padding":f},y],...p.getStyles("section",{className:i,style:t,styles:m,classNames:r}),...j})});W.classes=se;W.displayName="@mantine/core/CardSection";const ts={},rs=Pe((s,{padding:o})=>({root:{"--card-padding":Te(o)}})),B=V((s,o)=>{const n=I("Card",ts,s),{classNames:r,className:i,style:t,styles:m,unstyled:a,vars:l,children:f,padding:y,...j}=n,p=he({name:"Card",props:n,classes:se,className:i,style:t,classNames:r,styles:m,unstyled:a,vars:l,varsResolver:rs}),h=w.Children.toArray(f),x=h.map((c,u)=>typeof c=="object"&&c&&"type"in c&&c.type===W?w.cloneElement(c,{"data-first-section":u===0||void 0,"data-last-section":u===h.length-1||void 0}):c);return e.jsx(ss,{value:{getStyles:p},children:e.jsx(Be,{ref:o,unstyled:a,...p("root"),...j,children:x})})});B.classes=se;B.displayName="@mantine/core/Card";B.Section=W;function be({open:s,close:o,openDelay:n,closeDelay:r}){const i=w.useRef(-1),t=w.useRef(-1),m=()=>{window.clearTimeout(i.current),window.clearTimeout(t.current)},a=()=>{m(),n===0||n===void 0?s():i.current=window.setTimeout(s,n)},l=()=>{m(),r===0||r===void 0?o():t.current=window.setTimeout(o,r)};return w.useEffect(()=>m,[]),{openDropdown:a,closeDropdown:l}}const[as,L]=ye("Menu component was not found in the tree");var P={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const is={},ne=G((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,...a}=I("MenuDivider",is,s),l=L();return e.jsx(Z,{ref:o,...l.getStyles("divider",{className:r,style:i,styles:t,classNames:n}),...a})});ne.classes=P;ne.displayName="@mantine/core/MenuDivider";const ls={},oe=G((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,onMouseEnter:a,onMouseLeave:l,onKeyDown:f,children:y,...j}=I("MenuDropdown",ls,s),p=w.useRef(null),h=L(),x=S(f,b=>{var C,T;(b.key==="ArrowUp"||b.key==="ArrowDown")&&(b.preventDefault(),(T=(C=p.current)==null?void 0:C.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||T.focus())}),c=S(a,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.openDropdown()),u=S(l,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.closeDropdown());return e.jsxs(F.Dropdown,{...j,onMouseEnter:c,onMouseLeave:u,role:"menu","aria-orientation":"vertical",ref:q(o,p),...h.getStyles("dropdown",{className:r,style:i,styles:t,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:x,children:[h.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),y]})});oe.classes=P;oe.displayName="@mantine/core/MenuDropdown";const[cs,J]=Ke(),ds={},te=V((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,color:a,closeMenuOnClick:l,leftSection:f,rightSection:y,children:j,disabled:p,"data-disabled":h,...x}=I("MenuItem",ds,s),c=L(),u=J(),b=pe(),{dir:C}=ve(),T=w.useRef(null),D=x,M=S(D.onClick,()=>{h||(typeof l=="boolean"?l&&c.closeDropdownImmediately():c.closeOnItemClick&&c.closeDropdownImmediately())}),v=a?b.variantColorResolver({color:a,theme:b,variant:"light"}):void 0,k=a?xe({color:a,theme:b}):null,R=S(D.onKeyDown,N=>{N.key==="ArrowLeft"&&u&&(u.close(),u.focusParentItem())});return e.jsxs(X,{onMouseDown:N=>N.preventDefault(),...x,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:t,classNames:n}),ref:q(T,o),role:"menuitem",disabled:p,"data-menu-item":!0,"data-disabled":p||h||void 0,"data-mantine-stop-propagation":!0,onClick:M,onKeyDown:je({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:C,orientation:"vertical",onKeyDown:R}),__vars:{"--menu-item-color":k!=null&&k.isThemeColor&&(k==null?void 0:k.shade)===void 0?`var(--mantine-color-${k.color}-6)`:v==null?void 0:v.color,"--menu-item-hover":v==null?void 0:v.hover},children:[f&&e.jsx("div",{...c.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"left",children:f}),j&&e.jsx("div",{...c.getStyles("itemLabel",{styles:t,classNames:n}),children:j}),y&&e.jsx("div",{...c.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"right",children:y})]})});te.classes=P;te.displayName="@mantine/core/MenuItem";const us={},re=G((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,...a}=I("MenuLabel",us,s),l=L();return e.jsx(Z,{ref:o,...l.getStyles("label",{className:r,style:i,styles:t,classNames:n}),...a})});re.classes=P;re.displayName="@mantine/core/MenuLabel";const ms={},ae=G((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,onMouseEnter:a,onMouseLeave:l,onKeyDown:f,children:y,...j}=I("MenuSubDropdown",ms,s),p=w.useRef(null),h=L(),x=J(),c=S(a,x==null?void 0:x.open),u=S(l,x==null?void 0:x.close);return e.jsx(F.Dropdown,{...j,onMouseEnter:c,onMouseLeave:u,role:"menu","aria-orientation":"vertical",ref:q(o,p),...h.getStyles("dropdown",{className:r,style:i,styles:t,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:y})});ae.classes=P;ae.displayName="@mantine/core/MenuSubDropdown";const hs={},ie=V((s,o)=>{const{classNames:n,className:r,style:i,styles:t,vars:m,color:a,leftSection:l,rightSection:f,children:y,disabled:j,"data-disabled":p,closeMenuOnClick:h,...x}=I("MenuSubItem",hs,s),c=L(),u=J(),b=pe(),{dir:C}=ve(),T=w.useRef(null),D=x,M=a?b.variantColorResolver({color:a,theme:b,variant:"light"}):void 0,v=a?xe({color:a,theme:b}):null,k=S(D.onKeyDown,$=>{$.key==="ArrowRight"&&(u==null||u.open(),u==null||u.focusFirstItem()),$.key==="ArrowLeft"&&(u!=null&&u.parentContext)&&(u.parentContext.close(),u.parentContext.focusParentItem())}),R=S(D.onClick,()=>{!p&&h&&c.closeDropdownImmediately()}),N=S(D.onMouseEnter,u==null?void 0:u.open),K=S(D.onMouseLeave,u==null?void 0:u.close);return e.jsxs(X,{onMouseDown:$=>$.preventDefault(),...x,unstyled:c.unstyled,tabIndex:c.menuItemTabIndex,...c.getStyles("item",{className:r,style:i,styles:t,classNames:n}),ref:q(T,o),role:"menuitem",disabled:j,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":j||p||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:N,onMouseLeave:K,onClick:R,onKeyDown:je({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:c.loop,dir:C,orientation:"vertical",onKeyDown:k}),__vars:{"--menu-item-color":v!=null&&v.isThemeColor&&(v==null?void 0:v.shade)===void 0?`var(--mantine-color-${v.color}-6)`:M==null?void 0:M.color,"--menu-item-hover":M==null?void 0:M.hover},children:[l&&e.jsx("div",{...c.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"left",children:l}),y&&e.jsx("div",{...c.getStyles("itemLabel",{styles:t,classNames:n}),children:y}),e.jsx("div",{...c.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"right",children:f||e.jsx(we,{...c.getStyles("chevron"),size:14})})]})});ie.classes=P;ie.displayName="@mantine/core/MenuSubItem";function Se({children:s,refProp:o}){if(!fe(s))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return L(),e.jsx(F.Target,{refProp:o,popupType:"menu",children:s})}Se.displayName="@mantine/core/MenuSubTarget";const ps={offset:0,position:"right-start",transitionProps:{duration:0}};function A(s){const{children:o,closeDelay:n,...r}=I("MenuSub",ps,s),i=Je(),[t,{open:m,close:a}]=es(!1),l=J(),{openDropdown:f,closeDropdown:y}=be({open:m,close:a,closeDelay:n,openDelay:0}),j=()=>window.setTimeout(()=>{var h,x;(x=(h=document.getElementById(`${i}-dropdown`))==null?void 0:h.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||x.focus()},16),p=()=>window.setTimeout(()=>{var h;(h=document.getElementById(`${i}-target`))==null||h.focus()},16);return e.jsx(cs,{value:{opened:t,close:y,open:f,focusFirstItem:j,focusParentItem:p,parentContext:l},children:e.jsx(F,{opened:t,...r,withinPortal:!1,id:i,children:o})})}A.extend=s=>s;A.displayName="@mantine/core/MenuSub";A.Target=Se;A.Dropdown=ae;A.Item=ie;const xs={refProp:"ref"},Me=w.forwardRef((s,o)=>{const{children:n,refProp:r,...i}=I("MenuTarget",xs,s);if(!fe(n))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const t=L(),m=n.props,a=S(m.onClick,()=>{t.trigger==="click"?t.toggleDropdown():t.trigger==="click-hover"&&(t.setOpenedViaClick(!0),t.opened||t.openDropdown())}),l=S(m.onMouseEnter,()=>(t.trigger==="hover"||t.trigger==="click-hover")&&t.openDropdown()),f=S(m.onMouseLeave,()=>{(t.trigger==="hover"||t.trigger==="click-hover"&&!t.openedViaClick)&&t.closeDropdown()});return e.jsx(F.Target,{refProp:r,popupType:"menu",ref:o,...i,children:w.cloneElement(n,{onClick:a,onMouseEnter:l,onMouseLeave:f,"data-expanded":t.opened?!0:void 0})})});Me.displayName="@mantine/core/MenuTarget";const gs={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function g(s){const o=I("Menu",gs,s),{children:n,onOpen:r,onClose:i,opened:t,defaultOpened:m,trapFocus:a,onChange:l,closeOnItemClick:f,loop:y,closeOnEscape:j,trigger:p,openDelay:h,closeDelay:x,classNames:c,styles:u,unstyled:b,variant:C,vars:T,menuItemTabIndex:D,keepMounted:M,withInitialFocusPlaceholder:v,...k}=o,R=he({name:"Menu",classes:P,props:o,classNames:c,styles:u,unstyled:b}),[N,K]=Qe({value:t,defaultValue:m,finalValue:!1,onChange:l}),[$,le]=w.useState(!1),U=()=>{K(!1),le(!1),N&&(i==null||i())},Q=()=>{K(!0),!N&&(r==null||r())},ce=()=>{N?U():Q()},{openDropdown:ke,closeDropdown:Ne}=be({open:Q,close:U,closeDelay:x,openDelay:h}),Ie=Le=>Xe("[data-menu-item]","[data-menu-dropdown]",Le),{resolvedClassNames:De,resolvedStyles:Ce}=Ue({classNames:c,styles:u,props:o});return e.jsx(as,{value:{getStyles:R,opened:N,toggleDropdown:ce,getItemIndex:Ie,openedViaClick:$,setOpenedViaClick:le,closeOnItemClick:f,closeDropdown:p==="click"?U:Ne,openDropdown:p==="click"?Q:ke,closeDropdownImmediately:U,loop:y,trigger:p,unstyled:b,menuItemTabIndex:D,withInitialFocusPlaceholder:v},children:e.jsx(F,{...k,opened:N,onChange:ce,defaultOpened:m,trapFocus:M?!1:a,closeOnEscape:j,__staticSelector:"Menu",classNames:De,styles:Ce,unstyled:b,variant:C,keepMounted:M,children:n})})}g.extend=s=>s;g.withProps=$e(g);g.classes=P;g.displayName="@mantine/core/Menu";g.Item=te;g.Label=re;g.Dropdown=oe;g.Target=Me;g.Divider=ne;g.Sub=A;const fs=ee.header`
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
`;function vs(){var t,m,a,l;const s=_e(),o=Fe(),n=Y(Ae),r=Y(Re),i=async()=>{o(Ve()),await Ee.purge(),s(E.welcomePage)};return e.jsx(fs,{children:e.jsx(B,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ge,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[r?e.jsxs(g,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(g.Target,{children:e.jsx(X,{children:e.jsx(z,{className:"avatar-icon-small",size:"3.5rem",avatar:O})})}),e.jsxs(g.Dropdown,{children:[e.jsxs(g.Label,{style:{fontSize:"1rem"},children:["Hello,"," ",((m=(t=n==null?void 0:n.user)==null?void 0:t.username)==null?void 0:m.charAt(0).toUpperCase())+((l=(a=n==null?void 0:n.user)==null?void 0:a.username)==null?void 0:l.slice(1).toLowerCase())]}),e.jsx(g.Item,{onClick:()=>s("/profile"),children:"Profile"}),e.jsx(g.Item,{onClick:()=>s("/dashboard"),children:"Dashboard"}),e.jsx(g.Divider,{}),e.jsx(g.Item,{color:"red",onClick:i,children:"Logout"})]})]}):e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{to:E.welcomePage,children:"GameIn"})}),e.jsx("li",{children:e.jsx(d,{to:E.welcomePage,children:"About"})}),e.jsx("li",{children:e.jsx(d,{to:E.welcomePage,children:"Info"})}),e.jsx("li",{children:e.jsx(d,{to:E.welcomePage,children:"Guidelines"})})]}),!r&&e.jsxs("div",{className:"access-btns",children:[e.jsx(d,{to:"/login",children:e.jsx(me,{variant:"grey",size:"sm",style:{marginRight:"0.5rem"},children:"Sign in"})}),e.jsx(d,{to:"/register",children:e.jsx(me,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function ws(){return e.jsx(B,{p:0,children:e.jsx(js,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:ge,alt:"Game Logo"})}),e.jsx(Ge,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Competency"})}),e.jsx("li",{children:e.jsx(d,{children:"Service"})}),e.jsx("li",{children:e.jsx(d,{children:"Vision"})}),e.jsx("li",{children:e.jsx(d,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Team"})}),e.jsx("li",{children:e.jsx(d,{children:"Location"})}),e.jsx("li",{children:e.jsx(d,{children:"History"})}),e.jsx("li",{children:e.jsx(d,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(d,{children:"Contact"})}),e.jsx("li",{children:e.jsx(d,{children:"Press"})}),e.jsx("li",{children:e.jsx(d,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(d,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(d,{children:"Support"})}),e.jsx("li",{children:e.jsx(d,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(d,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(d,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(_,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(d,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(d,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(d,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(d,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(d,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(_,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(_,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}/**
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
 */const Ds=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Cs=H("plus",Ds);function Ls(){return e.jsxs(ys,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(He,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ue.colors.inputBgColor[0],$rotated:!0,$border:"0.125rem solid #FFF",children:e.jsx(Cs,{size:"1.25rem",color:ue.colors.primary[0]})})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:O})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:O})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:O})}),e.jsx("li",{children:e.jsx(z,{className:"avatar-icon-small",size:"3em",avatar:O})})]})}),e.jsx("div",{className:"profile-links",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsxs(d,{to:"/",children:[e.jsx(ks,{size:"1rem"}),e.jsx("span",{children:"Account"})]})}),e.jsx("li",{children:e.jsxs(d,{to:"/",children:[e.jsx(Is,{size:"1rem"}),e.jsx("span",{children:"News Feed"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(d,{to:"/",children:[e.jsx(Ye,{size:"1rem"}),e.jsx("span",{children:"Creators"})]})}),e.jsx("li",{children:e.jsxs(d,{to:"/",children:[e.jsx(Ze,{size:"1rem"}),e.jsx("span",{children:"Brands"})]})}),e.jsx("div",{className:"divider"}),e.jsx("li",{children:e.jsxs(d,{to:"/",children:[e.jsx(Ss,{size:"1rem"}),e.jsx("span",{children:"Settings"})]})})]})})]})}const Bs=()=>{const o=ze().pathname==="/",r=Y(We)&&!o;return e.jsxs("div",{children:[e.jsx(vs,{}),e.jsxs("div",{className:"wrapper",children:[r&&e.jsx(Ls,{}),e.jsx("main",{className:r?"logged-in":"",children:e.jsx(Oe,{})}),r&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(ws,{})]})};export{Bs as default};
