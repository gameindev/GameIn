import{r as D,f as F,u as A,j as e,U as Y,B,a as je,c as He,g as Ve,b as We,d as be,e as J,p as we,h as Ie,i as Se,k as oe,l as qe,m as ke,n as q,o as Me,q as Ne,s as k,L as x,t as Ye,v as Je,w as Ce,x as ve,O as Qe,y as Xe}from"./index-C5_jzTTu.js";import{G as Ae}from"./gamein-logo-OLN3yQ-G.js";import{c as De}from"./creator_image-C6LzQUPk.js";import{A as Te,H as Ze}from"./AvatarSection-De6N2qKw.js";import{f as eo,c as ne,g as ge,p as oo}from"./useProfileMediaUrl-RESHVnk_.js";import{C as Pe,I as no}from"./IconPlus-CPMov3JY.js";import{u as to}from"./Input-mneJPGbo.js";import{P as K}from"./Popover-BOPrdVoJ.js";import{c as te}from"./create-safe-context-CIV-pmjS.js";import{u as _e}from"./DirectionProvider-dA5er05Q.js";import{c as so}from"./create-optional-context-9Oh-2q2o.js";import{A as se}from"./AccordionChevron-DWHEcesg.js";import{i as Le}from"./FocusTrap-D4-4-GUs.js";import{u as Ee}from"./use-id-BBuErT-4.js";import{u as ro}from"./modal-Dwyxegjm.js";import{u as $e}from"./use-uncontrolled-Cq7P_ORC.js";import{B as ye}from"./Button-DyMlzesk.js";import{T as io}from"./TextInput-DVNW7Ewj.js";import{T as G}from"./Title-CtijEpZh.js";import{C as ao}from"./Collapse-DSHkuD_u.js";import{c as re}from"./createReactComponent-sA3TK7Vs.js";import{I as lo,a as co}from"./IconStar-Bfb19Pc4.js";import{U as mo}from"./user-D_icTkIf.js";import{P as uo}from"./plug-2-VzNnoS08.js";import{c as ie}from"./createLucideIcon-CAiZrkpf.js";import{u as po}from"./useApi-D8p45sYy.js";import{g as ho}from"./index-EfBUle2R.js";import"./HexContainer-CKWSYepT.js";import"./EditAvator-DUT1Cdlm.js";import"./Stack-BgBiURvo.js";import"./Text-DsdgoVeg.js";import"./Group-D4p7Vx77.js";import"./FileInput-CxIeBjHR.js";import"./FileButton-3XqT8MeK.js";import"./InputBase-NC4Jnabm.js";import"./Image-DLmm_XTy.js";import"./Paper-BizL2M9x.js";import"./get-floating-position-DilwK3dJ.js";import"./Transition-COXhOSJn.js";import"./IconButton-D2tqVnSN.js";import"./ActionIcon-Ix80DLbn.js";import"./Modal-DiY_pJEi.js";import"./get-style-object-DUJZA7T_.js";import"./index-KaTw7AUd.js";function M(o,r){return n=>{o==null||o(n),r==null||r(n)}}function xo(o,r,n){var s;return n?Array.from(((s=eo(n,r))==null?void 0:s.querySelectorAll(o))||[]).findIndex(l=>l===n):null}function Re({open:o,close:r,openDelay:n,closeDelay:s}){const l=D.useRef(-1),t=D.useRef(-1),d=()=>{window.clearTimeout(l.current),window.clearTimeout(t.current)},a=()=>{d(),n===0||n===void 0?o():l.current=window.setTimeout(o,n)},c=()=>{d(),s===0||s===void 0?r():t.current=window.setTimeout(r,s)};return D.useEffect(()=>d,[]),{openDropdown:a,closeDropdown:c}}const[fo,ae]=te("Accordion component was not found in the tree"),[vo,Oe]=te("Accordion.Item component was not found in the tree");var V={root:"m_9bdbb667",panel:"m_df78851f",content:"m_4ba554d4",itemTitle:"m_8fa820a0",control:"m_4ba585b8","control--default":"m_6939a5e9","control--contained":"m_4271d21b",label:"m_df3ffa0f",chevron:"m_3f35ae96",icon:"m_9bd771fe",item:"m_9bd7b098","item--default":"m_fe19b709","item--contained":"m_1f921b3b","item--filled":"m_2cdf939a","item--separated":"m_9f59b069"};const le=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,chevron:a,icon:c,onClick:p,onKeyDown:u,children:g,disabled:f,mod:h,...v}=A("AccordionControl",null,o),{value:m}=Oe(),i=ae(),y=i.isItemActive(m),T=typeof i.order=="number",P=`h${i.order}`,S=e.jsxs(Y,{...v,...i.getStyles("control",{className:s,classNames:n,style:l,styles:t,variant:i.variant}),unstyled:i.unstyled,mod:["accordion-control",{active:y,"chevron-position":i.chevronPosition,disabled:f},h],ref:r,onClick:w=>{p==null||p(w),i.onChange(m)},type:"button",disabled:f,"aria-expanded":y,"aria-controls":i.getRegionId(m),id:i.getControlId(m),onKeyDown:ne({siblingSelector:"[data-accordion-control]",parentSelector:"[data-accordion]",activateOnFocus:!1,loop:i.loop,orientation:"vertical",onKeyDown:u}),children:[e.jsx(B,{component:"span",mod:{rotate:!i.disableChevronRotation&&y,position:i.chevronPosition},...i.getStyles("chevron",{classNames:n,styles:t}),children:a||i.chevron}),e.jsx("span",{...i.getStyles("label",{classNames:n,styles:t}),children:g}),c&&e.jsx(B,{component:"span",mod:{"chevron-position":i.chevronPosition},...i.getStyles("icon",{classNames:n,styles:t}),children:c})]});return T?e.jsx(P,{...i.getStyles("itemTitle",{classNames:n,styles:t}),children:S}):S});le.displayName="@mantine/core/AccordionControl";le.classes=V;const ce=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,value:a,mod:c,...p}=A("AccordionItem",null,o),u=ae();return e.jsx(vo,{value:{value:a},children:e.jsx(B,{ref:r,mod:[{active:u.isItemActive(a)},c],...u.getStyles("item",{className:s,classNames:n,styles:t,style:l,variant:u.variant}),...p})})});ce.displayName="@mantine/core/AccordionItem";ce.classes=V;const de=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,children:a,...c}=A("AccordionPanel",null,o),{value:p}=Oe(),u=ae();return e.jsx(ao,{ref:r,...u.getStyles("panel",{className:s,classNames:n,style:l,styles:t}),...c,in:u.isItemActive(p),transitionDuration:u.transitionDuration??200,role:"region",id:u.getRegionId(p),"aria-labelledby":u.getControlId(p),children:e.jsx("div",{...u.getStyles("content",{classNames:n,styles:t}),children:a})})});de.displayName="@mantine/core/AccordionPanel";de.classes=V;const go={multiple:!1,disableChevronRotation:!1,chevronPosition:"right",variant:"default",chevronSize:"auto",chevronIconSize:16},yo=He((o,{transitionDuration:r,chevronSize:n,radius:s})=>({root:{"--accordion-transition-duration":r===void 0?void 0:`${r}ms`,"--accordion-chevron-size":n===void 0?void 0:We(n),"--accordion-radius":s===void 0?void 0:Ve(s)}}));function C(o){const r=A("Accordion",go,o),{classNames:n,className:s,style:l,styles:t,unstyled:d,vars:a,children:c,multiple:p,value:u,defaultValue:g,onChange:f,id:h,loop:v,transitionDuration:m,disableChevronRotation:i,chevronPosition:y,chevronSize:T,order:P,chevron:S,variant:w,radius:b,chevronIconSize:N,attributes:O,...E}=r,_=Ee(h),[I,X]=$e({value:u,defaultValue:g,finalValue:p?[]:null,onChange:f}),W=L=>Array.isArray(I)?I.includes(L):L===I,z=L=>{const Z=Array.isArray(I)?I.includes(L)?I.filter(ee=>ee!==L):[...I,L]:L===I?null:L;X(Z)},U=je({name:"Accordion",classes:V,props:r,className:s,style:l,classNames:n,styles:t,unstyled:d,attributes:O,vars:a,varsResolver:yo});return e.jsx(fo,{value:{isItemActive:W,onChange:z,getControlId:ge(`${_}-control`,"Accordion.Item component was rendered with invalid value or without value"),getRegionId:ge(`${_}-panel`,"Accordion.Item component was rendered with invalid value or without value"),chevron:S===null?null:S||e.jsx(se,{size:N}),transitionDuration:m,disableChevronRotation:i,chevronPosition:y,order:P,loop:v,getStyles:U,variant:w,unstyled:d},children:e.jsx(B,{...U("root"),id:_,...E,variant:w,"data-accordion":!0,children:c})})}const jo=o=>o;C.extend=jo;C.withProps=be(C);C.classes=V;C.displayName="@mantine/core/Accordion";C.Item=ce;C.Panel=de;C.Control=le;C.Chevron=se;const[bo,$]=te("Menu component was not found in the tree");var R={dropdown:"m_dc9b7c9f",label:"m_9bfac126",divider:"m_efdf90cb",item:"m_99ac2aa1",itemLabel:"m_5476e0d3",itemSection:"m_8b75e504",chevron:"m_b85b0bed"};const me=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,...a}=A("MenuDivider",null,o),c=$();return e.jsx(B,{ref:r,...c.getStyles("divider",{className:s,style:l,styles:t,classNames:n}),...a})});me.classes=R;me.displayName="@mantine/core/MenuDivider";const ue=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,onMouseEnter:a,onMouseLeave:c,onKeyDown:p,children:u,...g}=A("MenuDropdown",null,o),f=D.useRef(null),h=$(),v=M(p,y=>{var T,P;(y.key==="ArrowUp"||y.key==="ArrowDown")&&(y.preventDefault(),(P=(T=f.current)==null?void 0:T.querySelectorAll("[data-menu-item]:not(:disabled)")[0])==null||P.focus())}),m=M(a,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.openDropdown()),i=M(c,()=>(h.trigger==="hover"||h.trigger==="click-hover")&&h.closeDropdown());return e.jsxs(K.Dropdown,{...g,onMouseEnter:m,onMouseLeave:i,role:"menu","aria-orientation":"vertical",ref:J(r,f),...h.getStyles("dropdown",{className:s,style:l,styles:t,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,onKeyDown:v,children:[h.withInitialFocusPlaceholder&&e.jsx("div",{tabIndex:-1,"data-autofocus":!0,"data-mantine-stop-propagation":!0,style:{outline:0}}),u]})});ue.classes=R;ue.displayName="@mantine/core/MenuDropdown";const[wo,Q]=so(),pe=we((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,color:a,closeMenuOnClick:c,leftSection:p,rightSection:u,children:g,disabled:f,"data-disabled":h,...v}=A("MenuItem",null,o),m=$(),i=Q(),y=Ie(),{dir:T}=_e(),P=D.useRef(null),S=v,w=M(S.onClick,()=>{h||(typeof c=="boolean"?c&&m.closeDropdownImmediately():m.closeOnItemClick&&m.closeDropdownImmediately())}),b=a?y.variantColorResolver({color:a,theme:y,variant:"light"}):void 0,N=a?Se({color:a,theme:y}):null,O=M(S.onKeyDown,E=>{E.key==="ArrowLeft"&&i&&(i.close(),i.focusParentItem())});return e.jsxs(Y,{onMouseDown:E=>E.preventDefault(),...v,unstyled:m.unstyled,tabIndex:m.menuItemTabIndex,...m.getStyles("item",{className:s,style:l,styles:t,classNames:n}),ref:J(P,r),role:"menuitem",disabled:f,"data-menu-item":!0,"data-disabled":f||h||void 0,"data-mantine-stop-propagation":!0,onClick:w,onKeyDown:ne({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:m.loop,dir:T,orientation:"vertical",onKeyDown:O}),__vars:{"--menu-item-color":N!=null&&N.isThemeColor&&(N==null?void 0:N.shade)===void 0?`var(--mantine-color-${N.color}-6)`:b==null?void 0:b.color,"--menu-item-hover":b==null?void 0:b.hover},children:[p&&e.jsx("div",{...m.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"left",children:p}),g&&e.jsx("div",{...m.getStyles("itemLabel",{styles:t,classNames:n}),children:g}),u&&e.jsx("div",{...m.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"right",children:u})]})});pe.classes=R;pe.displayName="@mantine/core/MenuItem";const he=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,...a}=A("MenuLabel",null,o),c=$();return e.jsx(B,{ref:r,...c.getStyles("label",{className:s,style:l,styles:t,classNames:n}),...a})});he.classes=R;he.displayName="@mantine/core/MenuLabel";const xe=F((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,onMouseEnter:a,onMouseLeave:c,onKeyDown:p,children:u,...g}=A("MenuSubDropdown",null,o),f=D.useRef(null),h=$(),v=Q(),m=M(a,v==null?void 0:v.open),i=M(c,v==null?void 0:v.close);return e.jsx(K.Dropdown,{...g,onMouseEnter:m,onMouseLeave:i,role:"menu","aria-orientation":"vertical",ref:J(r,f),...h.getStyles("dropdown",{className:s,style:l,styles:t,classNames:n,withStaticClass:!1}),tabIndex:-1,"data-menu-dropdown":!0,children:u})});xe.classes=R;xe.displayName="@mantine/core/MenuSubDropdown";const fe=we((o,r)=>{const{classNames:n,className:s,style:l,styles:t,vars:d,color:a,leftSection:c,rightSection:p,children:u,disabled:g,"data-disabled":f,closeMenuOnClick:h,...v}=A("MenuSubItem",null,o),m=$(),i=Q(),y=Ie(),{dir:T}=_e(),P=D.useRef(null),S=v,w=a?y.variantColorResolver({color:a,theme:y,variant:"light"}):void 0,b=a?Se({color:a,theme:y}):null,N=M(S.onKeyDown,I=>{I.key==="ArrowRight"&&(i==null||i.open(),i==null||i.focusFirstItem()),I.key==="ArrowLeft"&&(i!=null&&i.parentContext)&&(i.parentContext.close(),i.parentContext.focusParentItem())}),O=M(S.onClick,()=>{!f&&h&&m.closeDropdownImmediately()}),E=M(S.onMouseEnter,i==null?void 0:i.open),_=M(S.onMouseLeave,i==null?void 0:i.close);return e.jsxs(Y,{onMouseDown:I=>I.preventDefault(),...v,unstyled:m.unstyled,tabIndex:m.menuItemTabIndex,...m.getStyles("item",{className:s,style:l,styles:t,classNames:n}),ref:J(P,r),role:"menuitem",disabled:g,"data-menu-item":!0,"data-sub-menu-item":!0,"data-disabled":g||f||void 0,"data-mantine-stop-propagation":!0,onMouseEnter:E,onMouseLeave:_,onClick:O,onKeyDown:ne({siblingSelector:"[data-menu-item]:not([data-disabled])",parentSelector:"[data-menu-dropdown]",activateOnFocus:!1,loop:m.loop,dir:T,orientation:"vertical",onKeyDown:N}),__vars:{"--menu-item-color":b!=null&&b.isThemeColor&&(b==null?void 0:b.shade)===void 0?`var(--mantine-color-${b.color}-6)`:w==null?void 0:w.color,"--menu-item-hover":w==null?void 0:w.hover},children:[c&&e.jsx("div",{...m.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"left",children:c}),u&&e.jsx("div",{...m.getStyles("itemLabel",{styles:t,classNames:n}),children:u}),e.jsx("div",{...m.getStyles("itemSection",{styles:t,classNames:n}),"data-position":"right",children:p||e.jsx(se,{...m.getStyles("chevron"),size:14})})]})});fe.classes=R;fe.displayName="@mantine/core/MenuSubItem";function Fe({children:o,refProp:r}){if(!Le(o))throw new Error("Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return $(),e.jsx(K.Target,{refProp:r,popupType:"menu",children:o})}Fe.displayName="@mantine/core/MenuSubTarget";const Io={offset:0,position:"right-start",transitionProps:{duration:0},middlewares:{shift:{crossAxis:!0}}};function H(o){const{children:r,closeDelay:n,...s}=A("MenuSub",Io,o),l=Ee(),[t,{open:d,close:a}]=ro(!1),c=Q(),{openDropdown:p,closeDropdown:u}=Re({open:d,close:a,closeDelay:n,openDelay:0}),g=()=>window.setTimeout(()=>{var h,v;(v=(h=document.getElementById(`${l}-dropdown`))==null?void 0:h.querySelectorAll("[data-menu-item]:not([data-disabled])")[0])==null||v.focus()},16),f=()=>window.setTimeout(()=>{var h;(h=document.getElementById(`${l}-target`))==null||h.focus()},16);return e.jsx(wo,{value:{opened:t,close:u,open:p,focusFirstItem:g,focusParentItem:f,parentContext:c},children:e.jsx(K,{opened:t,withinPortal:!1,withArrow:!1,id:l,...s,children:r})})}H.extend=o=>o;H.displayName="@mantine/core/MenuSub";H.Target=Fe;H.Dropdown=xe;H.Item=fe;const So={refProp:"ref"},ze=D.forwardRef((o,r)=>{const{children:n,refProp:s,...l}=A("MenuTarget",So,o);if(!Le(n))throw new Error("Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const t=$(),d=n.props,a=M(d.onClick,()=>{t.trigger==="click"?t.toggleDropdown():t.trigger==="click-hover"&&(t.setOpenedViaClick(!0),t.opened||t.openDropdown())}),c=M(d.onMouseEnter,()=>(t.trigger==="hover"||t.trigger==="click-hover")&&t.openDropdown()),p=M(d.onMouseLeave,()=>{(t.trigger==="hover"||t.trigger==="click-hover"&&!t.openedViaClick)&&t.closeDropdown()});return e.jsx(K.Target,{refProp:s,popupType:"menu",ref:r,...l,children:D.cloneElement(n,{onClick:a,onMouseEnter:c,onMouseLeave:p,"data-expanded":t.opened?!0:void 0})})});ze.displayName="@mantine/core/MenuTarget";const ko={trapFocus:!0,closeOnItemClick:!0,withInitialFocusPlaceholder:!0,clickOutsideEvents:["mousedown","touchstart","keydown"],loop:!0,trigger:"click",openDelay:0,closeDelay:100,menuItemTabIndex:-1};function j(o){const r=A("Menu",ko,o),{children:n,onOpen:s,onClose:l,opened:t,defaultOpened:d,trapFocus:a,onChange:c,closeOnItemClick:p,loop:u,closeOnEscape:g,trigger:f,openDelay:h,closeDelay:v,classNames:m,styles:i,unstyled:y,variant:T,vars:P,menuItemTabIndex:S,keepMounted:w,withInitialFocusPlaceholder:b,attributes:N,...O}=r,E=je({name:"Menu",classes:R,props:r,classNames:m,styles:i,unstyled:y,attributes:N}),[_,I]=$e({value:t,defaultValue:d,finalValue:!1,onChange:c}),[X,W]=D.useState(!1),z=()=>{I(!1),W(!1),_&&(l==null||l())},U=()=>{I(!0),!_&&(s==null||s())},L=()=>{_?z():U()},{openDropdown:Z,closeDropdown:ee}=Re({open:U,close:z,closeDelay:v,openDelay:h}),Ue=Ke=>xo("[data-menu-item]","[data-menu-dropdown]",Ke),{resolvedClassNames:Ge,resolvedStyles:Be}=to({classNames:m,styles:i,props:r});return e.jsx(bo,{value:{getStyles:E,opened:_,toggleDropdown:L,getItemIndex:Ue,openedViaClick:X,setOpenedViaClick:W,closeOnItemClick:p,closeDropdown:f==="click"?z:ee,openDropdown:f==="click"?U:Z,closeDropdownImmediately:z,loop:u,trigger:f,unstyled:y,menuItemTabIndex:S,withInitialFocusPlaceholder:b},children:e.jsx(K,{...O,opened:_,onChange:L,defaultOpened:d,trapFocus:w?!1:a,closeOnEscape:g,__staticSelector:"Menu",classNames:Ge,styles:Be,unstyled:y,variant:T,keepMounted:w,children:n})})}j.extend=o=>o;j.withProps=be(j);j.classes=R;j.displayName="@mantine/core/Menu";j.Item=pe;j.Label=he;j.Dropdown=ue;j.Target=ze;j.Divider=me;j.Sub=H;/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mo=[["path",{d:"M5 12l-2 0l9 -9l9 9l-2 0",key:"svg-0"}],["path",{d:"M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7",key:"svg-1"}],["path",{d:"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6",key:"svg-2"}]],No=re("outline","home","Home",Mo);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["path",{d:"M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11",key:"svg-0"}],["path",{d:"M8 8l4 0",key:"svg-1"}],["path",{d:"M8 12l4 0",key:"svg-2"}],["path",{d:"M8 16l4 0",key:"svg-3"}]],Ao=re("outline","news","News",Co);/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=[["path",{d:"M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z",key:"svg-0"}],["path",{d:"M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-1"}]],To=re("outline","settings-2","Settings2",Do);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Po=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],_o=ie("bell",Po);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],Eo=ie("credit-card",Lo);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $o=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ro=ie("shield",$o),Oo=oe.header`
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
        color: ${({theme:o})=>o.colors.textWhite[0]};
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
`,Fo=oe.footer`
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
            color: ${({theme:o})=>o.colors.textWhite[0]};
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }
        }
      }
    }
  }
`,zo=oe.aside`
  display: flex;
  width: 100%;
  min-width: 20.625em;
  background: ${({theme:o})=>o.colors.secondaryGrey[1]};
  position: sticky;
  top: 5em;
  height: calc(100vh - 5em);

  .profile-icons {
    background: ${({theme:o})=>o.colors.textSecondary[0]};
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

        li{
          .menu-accordion{
            .mantine-Accordion-icon{
              color: ${({theme:o})=>o.colors.text[0]};
            }

            .mantine-Accordion-label{
              color: ${({theme:o})=>o.colors.text[0]};
              text-transform: uppercase;
            }

            & .mantine-Accordion-control:hover{
              background: ${({theme:o})=>o.colors.inputBgColor[0]};
              color: ${({theme:o})=>o.colors.primary[0]};
              border-radius: 0.313em;
              transition: all 0.3s ease-in-out;

              .mantine-Accordion-icon{
                color: ${({theme:o})=>o.colors.primary[0]};
              }

              .mantine-Accordion-label{
                color: ${({theme:o})=>o.colors.primary[0]};
              }
            }

            .mantine-Accordion-panel a{
              display: flex;
              align-items: center;
              padding: 1em 1.5em;
              gap: 0.75em;
              border-radius: 0.313em;
              text-decoration: none;
              color: ${({theme:o})=>o.colors.text[0]};
              text-transform: uppercase;
              /* font-size: ${({theme:o})=>o.fontSizes.sm};; */

              &:hover, &.active{
                background: ${({theme:o})=>o.colors.inputBgColor[0]};
                color: ${({theme:o})=>o.colors.primary[0]};
                transition: all 0.3s ease-in-out;
              }

              .arrow{
                display: inline-flex;
                margin-left: auto;
              }
            }
          }
          a{
            text-decoration: none;
          }
        }

        .avatar-icon {
          position: unset;

          & > div {
            border: none;
          }
        }
      }
    }

  .profile-links {
    padding: 1.5em 1em;
    flex-basis: calc(100% - 4.375em);

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      li > a {
        display: flex;
        align-items: center;
        padding: 1em 1.5em;
        gap: 0.75em;
        border-radius: 0.313em;
        text-decoration: none;
        color: ${({theme:o})=>o.colors.text[0]};
        text-transform: uppercase;

        &:hover {
          background: ${({theme:o})=>o.colors.inputBgColor[0]};
          color: ${({theme:o})=>o.colors.primary[0]};
          transition: all 0.3s ease-in-out;
        }
      }

      /* li.active a {
        background: ${({theme:o})=>o.colors.inputBgColor[0]};
        color: ${({theme:o})=>o.colors.primary[0]};
      } */

      .divider {
        border: 0.063em dashed ${({theme:o})=>o.colors.inputBgColor[0]};
        width: 100%;
        margin: 0.75em 0;
      }
    }
  }
`;function Uo(){var a,c,p,u;const o=qe(),r=ke(),n=q(Me),s=q(Ne),{avatarUrl:l}=oo((n==null?void 0:n.user)||{}),t=async()=>{r(Ye()),await Je.purge(),o(k.LOGIN)},d=[{label:"GameIn",path:k.WELCOMEPAGE},{label:"About",path:k.WELCOMEPAGE},{label:"Info",path:k.WELCOMEPAGE},{label:"Guidelines",path:k.WELCOMEPAGE}];return e.jsx(Oo,{children:e.jsx(Pe,{className:"headerCard",radius:0,children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"headerFlex",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:Ae,alt:"GameIn Logo"})}),e.jsxs("nav",{children:[s?e.jsxs(j,{shadow:"md",width:180,position:"bottom-end",children:[e.jsx(j.Target,{children:e.jsx(Y,{children:e.jsx(Te,{className:"avatar-icon-small",size:"55",avatar:l||De})})}),e.jsxs(j.Dropdown,{children:[e.jsxs(j.Label,{style:{fontSize:"1em"},children:["Hello,"," ",((c=(a=n==null?void 0:n.user)==null?void 0:a.username)==null?void 0:c.charAt(0).toUpperCase())+((u=(p=n==null?void 0:n.user)==null?void 0:p.username)==null?void 0:u.slice(1).toLowerCase())]}),e.jsx(j.Item,{onClick:()=>o("/profile"),children:"Profile"}),e.jsx(j.Item,{onClick:()=>o("/dashboard"),children:"Dashboard"}),e.jsx(j.Divider,{}),e.jsx(j.Item,{color:"red",onClick:t,children:"Logout"})]})]}):e.jsx("ul",{children:d.map((g,f)=>e.jsx("li",{children:e.jsx(x,{to:g.path,children:g.label})},f))}),!s&&e.jsxs("div",{className:"access-btns",children:[e.jsx(x,{to:"/login",children:e.jsx(ye,{variant:"grey",size:"sm",style:{marginRight:"0.5em"},children:"Sign in"})}),e.jsx(x,{to:"/register",children:e.jsx(ye,{variant:"secondary",size:"sm",children:"Register"})})]})]})]})})})})}function Go(){return e.jsx(Pe,{p:0,children:e.jsx(Fo,{children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"footerFlex",children:[e.jsxs("div",{className:"choose-lang",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:Ae,alt:"Game Logo"})}),e.jsx(io,{component:"select",pointer:!0,mt:"md",children:e.jsx("option",{value:"1",children:"Language"})})]}),e.jsxs("div",{className:"quick-links",children:[e.jsxs("div",{className:"gameIn-links",children:[e.jsx(G,{c:"primary",fw:"500",order:5,children:"GameIn"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(x,{children:"Competency"})}),e.jsx("li",{children:e.jsx(x,{children:"Service"})}),e.jsx("li",{children:e.jsx(x,{children:"Vision"})}),e.jsx("li",{children:e.jsx(x,{children:"Mission"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(G,{c:"primary",fw:"500",order:5,children:"About"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(x,{children:"Team"})}),e.jsx("li",{children:e.jsx(x,{children:"Location"})}),e.jsx("li",{children:e.jsx(x,{children:"History"})}),e.jsx("li",{children:e.jsx(x,{children:"Jobs"})}),e.jsx("li",{children:e.jsx(x,{children:"Contact"})}),e.jsx("li",{children:e.jsx(x,{children:"Press"})}),e.jsx("li",{children:e.jsx(x,{children:"Imprint"})}),e.jsx("li",{children:e.jsx(x,{children:"Thanks to.."})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(G,{c:"primary",fw:"500",order:5,children:"Info"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(x,{children:"Cooperation"})}),e.jsx("li",{children:e.jsx(x,{children:"Support"})}),e.jsx("li",{children:e.jsx(x,{children:"FAQ"})}),e.jsx("li",{children:e.jsx(x,{children:"Feedback"})}),e.jsx("li",{children:e.jsx(x,{children:"Devs"})})]})]}),e.jsxs("div",{className:"gameIn-links",children:[e.jsx(G,{c:"primary",fw:"500",order:5,children:"Terms of Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(x,{children:"Guideliness"})}),e.jsx("li",{children:e.jsx(x,{children:"Privacy Policy"})}),e.jsx("li",{children:e.jsx(x,{children:"License Agreement"})}),e.jsx("li",{children:e.jsx(x,{children:"Damage Limitation Clause"})}),e.jsx("li",{children:e.jsx(x,{children:"50% Performance Bonus"})})]})]})]}),e.jsxs("div",{className:"copyrights",children:[e.jsxs(G,{c:"primary",fw:"500",order:5,ta:"right",children:["© ",new Date().getFullYear()]}),e.jsxs(G,{fw:"500",order:5,ta:"right",children:["Esports network ",e.jsx("br",{})," holdings"]}),e.jsx("h6",{})]})]})})})})}function Bo(){Ce();const o=[{icon:e.jsx(No,{size:"1em"}),label:"Account",active:!1,link:k.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(Ao,{size:"1em"}),label:"News Feed",active:!1,link:k.ACCOUNTS.DASHBOARD.ROOT},{icon:e.jsx(lo,{size:"1em"}),label:"Creators",active:!1,link:k.SEARCH.replace(":userType","creator")},{icon:e.jsx(co,{size:"1em"}),label:"Brands",active:!1,link:k.SEARCH.replace(":userType","brand")},{icon:e.jsx(To,{size:"1em"}),label:"Settings",active:!1,link:"#",children:[{icon:e.jsx(mo,{size:"1em"}),label:"Account",active:!1,link:k.SETTINGS.ACCOUNT},{icon:e.jsx(uo,{size:"1em"}),label:"Integrations",active:!1,link:k.SETTINGS.INTEGRATIONS},{icon:e.jsx(_o,{size:"1em"}),label:"Notifications",active:!1,link:k.SETTINGS.NOTIFICATIONS},{icon:e.jsx(Ro,{size:"1em"}),label:"Privacy",active:!1,link:k.SETTINGS.PRIVACY},{icon:e.jsx(Eo,{size:"1em"}),label:"Payments",active:!1,link:k.SETTINGS.PAYMENTS}]}],[r,n]=D.useState(o),s=l=>{n(t=>t.map((d,a)=>a===l?{...d,active:!0}:{...d,active:!1}))};return e.jsxs(zo,{children:[e.jsx("div",{className:"profile-icons",children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(Ze,{className:"profile-hexagon",$mainRadius:10,$roundingRadius:15,size:"3em",$backgroundColor:ve.colors.inputBgColor[0],$rotated:!0,$border:"0.125em solid #FFF",children:e.jsx(no,{size:"1.25em",color:ve.colors.primary[0]})})}),[...Array(4)].map((l,t)=>e.jsx("li",{children:e.jsx(Te,{size:"50",avatar:De})},t))]})}),e.jsx("div",{className:"profile-links",children:e.jsx("ul",{children:r==null?void 0:r.map(({link:l,label:t,icon:d,children:a},c)=>e.jsxs("li",{children:[e.jsx(C,{className:"menu-accordion",variant:"unstyled",radius:"md",defaultValue:"submenu",children:e.jsxs(C.Item,{value:t.toLowerCase(),children:[e.jsx(x,{to:l,children:e.jsx(C.Control,{icon:d,chevron:a?"":e.jsx(e.Fragment,{}),children:t})}),a&&e.jsx(C.Panel,{children:e.jsx("ul",{children:a==null?void 0:a.map(({link:p,label:u,icon:g,active:f},h)=>e.jsx("li",{children:e.jsxs(x,{to:p,className:f?"active":"",onClick:()=>s(c),children:[g,e.jsx("span",{children:u})]})},h))})})]})}),c%2!==0&&e.jsx("div",{className:"divider"})]},c))})})]})}const En=()=>{const r=Ce().pathname==="/",n=q(Ne),{user:s}=q(Me)||{},l=ke(),{get:t}=po(),d=n&&!r;return D.useEffect(()=>{(async()=>{if(s!=null&&s.id)try{const c=await ho(t,s.id,s.user_type);l(Xe({user:c}))}catch(c){console.error("Error fetching user profile",c)}})()},[s==null?void 0:s.id]),e.jsxs("div",{children:[e.jsx(Uo,{}),e.jsxs("div",{className:"wrapper",children:[d&&e.jsx(Bo,{}),e.jsx("main",{className:d?"logged-in":"",children:e.jsx(Qe,{})}),d&&e.jsx("aside",{className:"ad-banner"})]}),e.jsx(Go,{})]})};export{En as default};
