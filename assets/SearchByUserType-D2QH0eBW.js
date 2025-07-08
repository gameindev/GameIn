import{a as m,f as G,u as I,g as Y,b as ve,j as e,B as O,v as X,J as tt,c as Pe,K as st,x as te,w as Ee,M as Nt,s as Rt,r as ae,N as qe,y as zt,P as $t,z as _t,Q as Ke,t as f,d as be,S as ot,E as ne,T as Pt,D as Et}from"./index-D9oEtHeb.js";import{S as Mt}from"./SectionHeader-B5RrWApi.js";import{C as Ot}from"./CoverBanner-Bm70gIZs.js";import{G as z}from"./Group-B6akqJOh.js";import{a as It,T as w}from"./Text-8hgcObZb.js";import{g as At}from"./get-env-uyVen0u2.js";import{t as me,u as rt,s as nt,g as Bt,i as at,F as Ft,a as Dt,b as Lt,c as Gt,d as Ut,e as Vt,f as Ht,h as Wt,o as qt,j as Ye,k as Kt,l as Ne,S as Yt}from"./FocusTrap-CENGLIKd.js";import{u as Xt}from"./use-uncontrolled-NxHOPr4h.js";import{a as it,u as Qt}from"./DirectionProvider-D6EKyNqO.js";import{c as B}from"./createLucideIcon-K2Gk7huH.js";import{T as lt}from"./TextInput-CYS3MMnp.js";import{C as H}from"./chevron-down-iGnCWDjH.js";import{A as ct}from"./AvatarSection-AkqMalqv.js";import{c as dt}from"./creator_image-C6LzQUPk.js";import{c as ut,V as Me,B as Oe,a as Ie}from"./calculateAge-CU7XHlxw.js";import{g as mt,a as Jt,F as Zt}from"./get-floating-position-B7o6aoca.js";import{g as es}from"./get-style-object-DUJZA7T_.js";import{B as ie}from"./Button-DE9b1J-V.js";import{C as ts,D as ss}from"./check-9oSX29LE.js";import{X as os,T as pe,I as fe,a as he,Y as xe}from"./youtube-DRmNCIDT.js";import{u as rs,F as Re}from"./FormField-pkCODe5l.js";import{c as ns}from"./create-safe-context-BzETH9ei.js";import{A as Xe}from"./ActionIcon-CBmGwXDV.js";import{b as pt,a as as}from"./useApi-HEZO75xY.js";import{g as is}from"./get-parsed-combobox-data-BSKT1ADk.js";import{C as ls}from"./ComboboxChevron-CZUbivVw.js";import{F as cs,S as ds}from"./star-BW9rjmVG.js";import"./modal-DkAunJW6.js";import"./IconButton-BvFDETZx.js";import"./Modal-BJGjPyn5.js";import"./Paper-B5GudHh1.js";import"./create-optional-context-nOeOZdkc.js";import"./EditAvator-RNBpw3lh.js";import"./HexContainer-zsQTPXMB.js";import"./selectors-BfVctv7J.js";import"./Stack-CmwLihlq.js";import"./Image-DLpckFmT.js";import"./FileInput-CX6dCDu1.js";function us(t,s){if(t===s||Number.isNaN(t)&&Number.isNaN(s))return!0;if(!(t instanceof Object)||!(s instanceof Object))return!1;const o=Object.keys(t),{length:r}=o;if(r!==Object.keys(s).length)return!1;for(let n=0;n<r;n+=1){const a=o[n];if(!(a in s)||t[a]!==s[a]&&!(Number.isNaN(t[a])&&Number.isNaN(s[a])))return!1}return!0}function ms(t,s){if(!t||!s)return!1;if(t===s)return!0;if(t.length!==s.length)return!1;for(let o=0;o<t.length;o+=1)if(!us(t[o],s[o]))return!1;return!0}function ps(t){const s=m.useRef([]),o=m.useRef(0);return ms(s.current,t)||(s.current=t,o.current+=1),[o.current]}function fs(t,s){m.useEffect(t,ps(s))}function hs(t,s,o={autoInvoke:!1}){const r=m.useRef(null),n=m.useCallback((...i)=>{r.current||(r.current=window.setTimeout(()=>{t(i),r.current=null},s))},[s]),a=m.useCallback(()=>{r.current&&(window.clearTimeout(r.current),r.current=null)},[]);return m.useEffect(()=>(o.autoInvoke&&n(),a),[a,n]),{start:n,clear:a}}function xs(t,s,o){const r=m.useRef(null),n=m.useRef(null);return m.useEffect(()=>{const a=typeof o=="function"?o():o;return(a||n.current)&&(r.current=new MutationObserver(t),r.current.observe(a||n.current,s)),()=>{var i;(i=r.current)==null||i.disconnect()}},[t,s]),n}function ys(){const[t,s]=m.useState(!1);return m.useEffect(()=>s(!0),[]),t}function gs(t,s){if(!s||!t)return!1;let o=s.parentNode;for(;o!=null;){if(o===t)return!0;o=o.parentNode}return!1}function vs({target:t,parent:s,ref:o,displayAfterTransitionEnd:r}){const n=m.useRef(-1),[a,i]=m.useState(!1),[u,l]=m.useState(typeof r=="boolean"?r:!1),d=()=>{if(!t||!s||!o.current)return;const y=t.getBoundingClientRect(),h=s.getBoundingClientRect(),x=window.getComputedStyle(t),v=window.getComputedStyle(s),k=me(x.borderTopWidth)+me(v.borderTopWidth),C=me(x.borderLeftWidth)+me(v.borderLeftWidth),S={top:y.top-h.top-k,left:y.left-h.left-C,width:y.width,height:y.height};o.current.style.transform=`translateY(${S.top}px) translateX(${S.left}px)`,o.current.style.width=`${S.width}px`,o.current.style.height=`${S.height}px`},c=()=>{window.clearTimeout(n.current),o.current&&(o.current.style.transitionDuration="0ms"),d(),n.current=window.setTimeout(()=>{o.current&&(o.current.style.transitionDuration="")},30)},p=m.useRef(null),g=m.useRef(null);return m.useEffect(()=>{if(d(),t)return p.current=new ResizeObserver(c),p.current.observe(t),s&&(g.current=new ResizeObserver(c),g.current.observe(s)),()=>{var y,h;(y=p.current)==null||y.disconnect(),(h=g.current)==null||h.disconnect()}},[s,t]),m.useEffect(()=>{if(s){const y=h=>{gs(h.target,s)&&(c(),l(!1))};return s.addEventListener("transitionend",y),()=>{s.removeEventListener("transitionend",y)}}},[s]),hs(()=>{At()!=="test"&&i(!0)},20,{autoInvoke:!0}),xs(y=>{y.forEach(h=>{h.type==="attributes"&&h.attributeName==="dir"&&c()})},{attributes:!0,attributeFilter:["dir"]},()=>document.documentElement),{initialized:a,hidden:u}}var ft={root:"m_96b553a6"};const bs={},js=X((t,{transitionDuration:s})=>({root:{"--transition-duration":typeof s=="number"?`${s}ms`:s}})),Ae=G((t,s)=>{const o=I("FloatingIndicator",bs,t),{classNames:r,className:n,style:a,styles:i,unstyled:u,vars:l,target:d,parent:c,transitionDuration:p,mod:g,displayAfterTransitionEnd:y,...h}=o,x=Y({name:"FloatingIndicator",classes:ft,props:o,className:n,style:a,classNames:r,styles:i,unstyled:u,vars:l,varsResolver:js}),v=m.useRef(null),{initialized:k,hidden:C}=vs({target:d,parent:c,ref:v,displayAfterTransitionEnd:y}),S=ve(s,v);return!d||!c?null:e.jsx(O,{ref:S,mod:[{initialized:k,hidden:C},g],...x("root"),...h})});Ae.displayName="@mantine/core/FloatingIndicator";Ae.classes=ft;function ws(t){return"group"in t}function Be({data:t}){if(ws(t)){const n=t.items.map(a=>e.jsx(Be,{data:a},a.value));return e.jsx("optgroup",{label:t.group,children:n})}const{value:s,label:o,...r}=t;return e.jsx("option",{value:t.value,...r,children:t.label},t.value)}Be.displayName="@mantine/core/NativeSelectOption";const ks={rightSectionPointerEvents:"none"},L=G((t,s)=>{const{data:o,children:r,size:n,error:a,rightSection:i,unstyled:u,...l}=I("NativeSelect",ks,t),d=is(o).map((c,p)=>e.jsx(Be,{data:c},p));return e.jsx(pt,{component:"select",ref:s,...l,__staticSelector:"NativeSelect",size:n,pointer:!0,error:a,unstyled:u,rightSection:i||e.jsx(ls,{size:n,error:a,unstyled:u}),children:r||d})});L.classes=pt.classes;L.displayName="@mantine/core/NativeSelect";const Ss={duration:100,transition:"fade"};function Cs(t,s){return{...Ss,...s,...t}}function Ts({offset:t,position:s,defaultOpened:o}){const[r,n]=m.useState(o),a=m.useRef(null),{x:i,y:u,elements:l,refs:d,update:c,placement:p}=rt({placement:s,middleware:[nt({crossAxis:!0,padding:5,rootBoundary:"document"})]}),g=p.includes("right")?t:s.includes("left")?t*-1:0,y=p.includes("bottom")?t:s.includes("top")?t*-1:0,h=m.useCallback(({clientX:x,clientY:v})=>{d.setPositionReference({getBoundingClientRect(){return{width:0,height:0,x,y:v,left:x+g,top:v+y,right:x,bottom:v}}})},[l.reference]);return m.useEffect(()=>{if(d.floating.current){const x=a.current;x.addEventListener("mousemove",h);const v=Bt(d.floating.current);return v.forEach(k=>{k.addEventListener("scroll",c)}),()=>{x.removeEventListener("mousemove",h),v.forEach(k=>{k.removeEventListener("scroll",c)})}}},[l.reference,d.floating.current,c,h,r]),{handleMouseMove:h,x:i,y:u,opened:r,setOpened:n,boundaryRef:a,floating:d.setFloating}}var je={tooltip:"m_1b3c8819",arrow:"m_f898399f"};const Ns={refProp:"ref",withinPortal:!0,offset:10,position:"right",zIndex:tt("popover")},Rs=X((t,{radius:s,color:o})=>({tooltip:{"--tooltip-radius":s===void 0?void 0:Ee(s),"--tooltip-bg":o?te(o,t):void 0,"--tooltip-color":o?"var(--mantine-color-white)":void 0}})),Fe=G((t,s)=>{const o=I("TooltipFloating",Ns,t),{children:r,refProp:n,withinPortal:a,style:i,className:u,classNames:l,styles:d,unstyled:c,radius:p,color:g,label:y,offset:h,position:x,multiline:v,zIndex:k,disabled:C,defaultOpened:S,variant:T,vars:P,portalProps:$,...E}=o,N=Pe(),A=Y({name:"TooltipFloating",props:o,classes:je,className:u,style:i,classNames:l,styles:d,unstyled:c,rootSelector:"tooltip",vars:P,varsResolver:Rs}),{handleMouseMove:W,x:U,y:_,opened:F,boundaryRef:J,floating:se,setOpened:Z}=Ts({offset:h,position:x,defaultOpened:S});if(!at(r))throw new Error("[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");const oe=ve(J,mt(r),s),M=r.props,re=V=>{var D;(D=M.onMouseEnter)==null||D.call(M,V),W(V),Z(!0)},q=V=>{var D;(D=M.onMouseLeave)==null||D.call(M,V),Z(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(st,{...$,withinPortal:a,children:e.jsx(O,{...E,...A("tooltip",{style:{...es(i,N),zIndex:k,display:!C&&F?"block":"none",top:(_&&Math.round(_))??"",left:(U&&Math.round(U))??""}}),variant:T,ref:se,mod:{multiline:v},children:y})}),m.cloneElement(r,{...M,[n]:oe,onMouseEnter:re,onMouseLeave:q})]})});Fe.classes=je;Fe.displayName="@mantine/core/TooltipFloating";const ht=m.createContext(!1),zs=ht.Provider,$s=()=>m.useContext(ht),_s={openDelay:0,closeDelay:0};function De(t){const{openDelay:s,closeDelay:o,children:r}=I("TooltipGroup",_s,t);return e.jsx(zs,{value:!0,children:e.jsx(Ft,{delay:{open:s,close:o},children:r})})}De.displayName="@mantine/core/TooltipGroup";De.extend=t=>t;function Ps(t){if(t===void 0)return{shift:!0,flip:!0};const s={...t};return t.shift===void 0&&(s.shift=!0),t.flip===void 0&&(s.flip=!0),s}function Es(t){const s=Ps(t.middlewares),o=[qt(t.offset)];return s.shift&&o.push(nt(typeof s.shift=="boolean"?{padding:8}:{padding:8,...s.shift})),s.flip&&o.push(typeof s.flip=="boolean"?Ye():Ye(s.flip)),o.push(Kt({element:t.arrowRef,padding:t.arrowOffset})),s.inline?o.push(typeof s.inline=="boolean"?Ne():Ne(s.inline)):t.inline&&o.push(Ne()),o}function Ms(t){var P,$,E;const[s,o]=m.useState(t.defaultOpened),n=typeof t.opened=="boolean"?t.opened:s,a=$s(),i=it(),u=m.useCallback(N=>{o(N),N&&k(i)},[i]),{x:l,y:d,context:c,refs:p,placement:g,middlewareData:{arrow:{x:y,y:h}={}}}=rt({strategy:t.strategy,placement:t.position,open:n,onOpenChange:u,middleware:Es(t),whileElementsMounted:Lt}),{delay:x,currentId:v,setCurrentId:k}=Dt(c,{id:i}),{getReferenceProps:C,getFloatingProps:S}=Gt([Ut(c,{enabled:(P=t.events)==null?void 0:P.hover,delay:a?x:{open:t.openDelay,close:t.closeDelay},mouseOnly:!(($=t.events)!=null&&$.touch)}),Vt(c,{enabled:(E=t.events)==null?void 0:E.focus,visibleOnly:!0}),Ht(c,{role:"tooltip"}),Wt(c,{enabled:typeof t.opened>"u"})]);Nt(()=>{var N;(N=t.onPositionChange)==null||N.call(t,g)},[g]);const T=n&&v&&v!==i;return{x:l,y:d,arrowX:y,arrowY:h,reference:p.setReference,floating:p.setFloating,getFloatingProps:S,getReferenceProps:C,isGroupPhase:T,opened:n,placement:g}}const Qe={position:"top",refProp:"ref",withinPortal:!0,arrowSize:4,arrowOffset:5,arrowRadius:0,arrowPosition:"side",offset:5,transitionProps:{duration:100,transition:"fade"},events:{hover:!0,focus:!1,touch:!1},zIndex:tt("popover"),positionDependencies:[],middlewares:{flip:!0,shift:!0,inline:!1}},Os=X((t,{radius:s,color:o,variant:r,autoContrast:n})=>{const a=t.variantColorResolver({theme:t,color:o||t.primaryColor,autoContrast:n,variant:r||"filled"});return{tooltip:{"--tooltip-radius":s===void 0?void 0:Ee(s),"--tooltip-bg":o?a.background:void 0,"--tooltip-color":o?a.color:void 0}}}),le=G((t,s)=>{const o=I("Tooltip",Qe,t),{children:r,position:n,refProp:a,label:i,openDelay:u,closeDelay:l,onPositionChange:d,opened:c,defaultOpened:p,withinPortal:g,radius:y,color:h,classNames:x,styles:v,unstyled:k,style:C,className:S,withArrow:T,arrowSize:P,arrowOffset:$,arrowRadius:E,arrowPosition:N,offset:A,transitionProps:W,multiline:U,events:_,zIndex:F,disabled:J,positionDependencies:se,onClick:Z,onMouseEnter:oe,onMouseLeave:M,inline:re,variant:q,keepMounted:V,vars:D,portalProps:K,mod:Se,floatingStrategy:ee,middlewares:Ce,autoContrast:Ve,...de}=I("Tooltip",Qe,o),{dir:ue}=Qt(),b=m.useRef(null),R=Ms({position:Jt(ue,n),closeDelay:l,openDelay:u,onPositionChange:d,opened:c,defaultOpened:p,events:_,arrowRef:b,arrowOffset:$,offset:typeof A=="number"?A+(T?P/2:0):A,positionDependencies:[...se,r],inline:re,strategy:ee,middlewares:Ce}),Te=Y({name:"Tooltip",props:o,classes:je,className:S,style:C,classNames:x,styles:v,unstyled:k,rootSelector:"tooltip",vars:D,varsResolver:Os});if(!at(r))throw new Error("[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");const Ct=ve(R.reference,mt(r),s),He=Cs(W,{duration:100,transition:"fade"}),We=r.props;return e.jsxs(e.Fragment,{children:[e.jsx(st,{...K,withinPortal:g,children:e.jsx(It,{...He,keepMounted:V,mounted:!J&&!!R.opened,duration:R.isGroupPhase?10:He.duration,children:Tt=>e.jsxs(O,{...de,"data-fixed":ee==="fixed"||void 0,variant:q,mod:[{multiline:U},Se],...R.getFloatingProps({ref:R.floating,className:Te("tooltip").className,style:{...Te("tooltip").style,...Tt,zIndex:F,top:R.y??0,left:R.x??0}}),children:[i,e.jsx(Zt,{ref:b,arrowX:R.arrowX,arrowY:R.arrowY,visible:T,position:R.placement,arrowSize:P,arrowOffset:$,arrowRadius:E,arrowPosition:N,...Te("arrow")})]})})}),m.cloneElement(r,R.getReferenceProps({onClick:Z,onMouseEnter:oe,onMouseLeave:M,onMouseMove:o.onMouseMove,onPointerDown:o.onPointerDown,onPointerEnter:o.onPointerEnter,className:Rt(S,We.className),...We,[a]:Ct}))]})});le.classes=je;le.displayName="@mantine/core/Tooltip";le.Floating=Fe;le.Group=De;function Is({size:t,thickness:s,sum:o,value:r,root:n,offset:a}){const i=(t*.9-s*2)/2,u=Math.PI*i*2/100,l=n||r===void 0?`${(100-o)*u}, ${o*u}`:`${r*u}, ${(100-r)*u}`;return{strokeWidth:Number.isNaN(s)?12:s,cx:t/2||0,cy:t/2||0,r:i||0,transform:n?`scale(1, -1) translate(0, -${t})`:void 0,strokeDasharray:l,strokeDashoffset:n?0:a||0}}function xt({size:t,value:s,offset:o,sum:r,thickness:n,root:a,color:i,lineRoundCaps:u,tooltip:l,getStyles:d,display:c,...p}){const g=Pe();return e.jsx(le.Floating,{disabled:!l,label:l,children:e.jsx(O,{component:"circle",...p,...d("curve"),__vars:{"--curve-color":i?te(i,g):void 0},fill:"none",strokeLinecap:u?"round":"butt",...Is({sum:r,size:t,thickness:n,value:s,offset:o,root:a})})})}xt.displayName="@mantine/core/Curve";function As({size:t,thickness:s,sections:o,renderRoundedLineCaps:r,rootColor:n}){const a=o.reduce((c,p)=>c+p.value,0),i=Math.PI*((t*.9-s*2)/2)*2;let u=i;const l=[],d=[];for(let c=0;c<o.length;c+=1)l.push({sum:a,offset:u,data:o[c],root:!1}),u-=o[c].value/100*i;if(l.push({sum:a,offset:u,data:{color:n},root:!0}),d.push({...l[l.length-1],lineRoundCaps:!1}),l.length>2){d.push({...l[0],lineRoundCaps:r}),d.push({...l[l.length-2],lineRoundCaps:r});for(let c=1;c<=l.length-3;c+=1)d.push({...l[c],lineRoundCaps:!1})}else d.push({...l[0],lineRoundCaps:r});return d}var yt={root:"m_b32e4812",svg:"m_d43b5134",curve:"m_b1ca1fbf",label:"m_b23f9dc4"};function Bs(t,s){return Math.min(t||12,(s||120)/4)}const Fs={size:120,thickness:12},Ds=X((t,{size:s,thickness:o,transitionDuration:r})=>({root:{"--rp-size":ae(s),"--rp-label-offset":ae(o*2),"--rp-transition-duration":r?`${r}ms`:void 0}})),we=G((t,s)=>{const o=I("RingProgress",Fs,t),{classNames:r,className:n,style:a,styles:i,unstyled:u,vars:l,label:d,sections:c,size:p,thickness:g,roundCaps:y,rootColor:h,transitionDuration:x,...v}=o,k=Y({name:"RingProgress",classes:yt,props:o,className:n,style:a,classNames:r,styles:i,unstyled:u,vars:l,varsResolver:Ds}),C=Bs(g,p),S=As({size:p,thickness:C,sections:c,renderRoundedLineCaps:y,rootColor:h}).map(({data:T,sum:P,root:$,lineRoundCaps:E,offset:N},A)=>m.createElement(xt,{...T,key:A,size:p,thickness:C,sum:P,offset:N,color:T==null?void 0:T.color,root:$,lineRoundCaps:E,getStyles:k}));return e.jsxs(O,{...k("root"),size:p,ref:s,...v,children:[e.jsx("svg",{...k("svg"),children:S}),d&&e.jsx("div",{...k("label"),children:d})]})});we.classes=yt;we.displayName="@mantine/core/RingProgress";var gt={root:"m_cf365364",indicator:"m_9e182ccd",label:"m_1738fcb2",input:"m_1714d588",control:"m_69686b9b",innerLabel:"m_78882f40"};const Ls={withItemsBorders:!0},Gs=X((t,{radius:s,color:o,transitionDuration:r,size:n,transitionTimingFunction:a})=>({root:{"--sc-radius":s===void 0?void 0:Ee(s),"--sc-color":o?te(o,t):void 0,"--sc-shadow":o?void 0:"var(--mantine-shadow-xs)","--sc-transition-duration":r===void 0?void 0:`${r}ms`,"--sc-transition-timing-function":a,"--sc-padding":_t(n,"sc-padding"),"--sc-font-size":$t(n)}})),Le=G((t,s)=>{var de,ue;const o=I("SegmentedControl",Ls,t),{classNames:r,className:n,style:a,styles:i,unstyled:u,vars:l,data:d,value:c,defaultValue:p,onChange:g,size:y,name:h,disabled:x,readOnly:v,fullWidth:k,orientation:C,radius:S,color:T,transitionDuration:P,transitionTimingFunction:$,variant:E,autoContrast:N,withItemsBorders:A,mod:W,...U}=o,_=Y({name:"SegmentedControl",props:o,classes:gt,className:n,style:a,classNames:r,styles:i,unstyled:u,vars:l,varsResolver:Gs}),F=Pe(),J=d.map(b=>typeof b=="string"?{label:b,value:b}:b),se=ys(),[Z,oe]=m.useState(qe()),[M,re]=m.useState(null),[q,V]=m.useState({}),D=(b,R)=>{q[R]=b,V(q)},[K,Se]=Xt({value:c,defaultValue:p,finalValue:Array.isArray(d)?((de=J.find(b=>!b.disabled))==null?void 0:de.value)??((ue=d[0])==null?void 0:ue.value)??null:null,onChange:g}),ee=it(h),Ce=J.map(b=>m.createElement(O,{..._("control"),mod:{active:K===b.value,orientation:C},key:b.value},m.createElement("input",{..._("input"),disabled:x||b.disabled,type:"radio",name:ee,value:b.value,id:`${ee}-${b.value}`,checked:K===b.value,onChange:()=>!v&&Se(b.value),"data-focus-ring":F.focusRing,key:`${b.value}-input`}),m.createElement(O,{component:"label",..._("label"),mod:{active:K===b.value&&!(x||b.disabled),disabled:x||b.disabled,"read-only":v},htmlFor:`${ee}-${b.value}`,ref:R=>D(R,b.value),__vars:{"--sc-label-color":T!==void 0?zt({color:T,theme:F,autoContrast:N}):void 0},key:`${b.value}-label`},e.jsx("span",{..._("innerLabel"),children:b.label})))),Ve=ve(s,b=>re(b));return fs(()=>{oe(qe())},[d.length]),d.length===0?null:e.jsxs(O,{..._("root"),variant:E,size:y,ref:Ve,mod:[{"full-width":k,orientation:C,initialized:se,"with-items-borders":A},W],...U,role:"radiogroup","data-disabled":x,children:[typeof K=="string"&&e.jsx(Ae,{target:q[K],parent:M,component:"span",transitionDuration:"var(--sc-transition-duration)",..._("indicator")},Z),Ce]})});Le.classes=gt;Le.displayName="@mantine/core/SegmentedControl";const[Us,Vs]=ns("Table component was not found in the tree");var ce={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function Hs(t,s){if(!s)return;const o={};return s.columnBorder&&t.withColumnBorders&&(o["data-with-column-border"]=!0),s.rowBorder&&t.withRowBorders&&(o["data-with-row-border"]=!0),s.striped&&t.striped&&(o["data-striped"]=t.striped),s.highlightOnHover&&t.highlightOnHover&&(o["data-hover"]=!0),s.captionSide&&t.captionSide&&(o["data-side"]=t.captionSide),s.stickyHeader&&t.stickyHeader&&(o["data-sticky"]=!0),o}function Q(t,s){const o=`Table${t.charAt(0).toUpperCase()}${t.slice(1)}`,r=G((n,a)=>{const i=I(o,{},n),{classNames:u,className:l,style:d,styles:c,...p}=i,g=Vs();return e.jsx(O,{component:t,ref:a,...Hs(g,s),...g.getStyles(t,{className:l,classNames:u,style:d,styles:c,props:i}),...p})});return r.displayName=`@mantine/core/${o}`,r.classes=ce,r}const _e=Q("th",{columnBorder:!0}),vt=Q("td",{columnBorder:!0}),ye=Q("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),bt=Q("thead",{stickyHeader:!0}),jt=Q("tbody"),wt=Q("tfoot"),kt=Q("caption",{captionSide:!0});function Ge({data:t}){return e.jsxs(e.Fragment,{children:[t.caption&&e.jsx(kt,{children:t.caption}),t.head&&e.jsx(bt,{children:e.jsx(ye,{children:t.head.map((s,o)=>e.jsx(_e,{children:s},o))})}),t.body&&e.jsx(jt,{children:t.body.map((s,o)=>e.jsx(ye,{children:s.map((r,n)=>e.jsx(vt,{children:r},n))},o))}),t.foot&&e.jsx(wt,{children:e.jsx(ye,{children:t.foot.map((s,o)=>e.jsx(_e,{children:s},o))})})]})}Ge.displayName="@mantine/core/TableDataRenderer";const Ws={type:"scrollarea"},qs=X((t,{minWidth:s,maxHeight:o,type:r})=>({scrollContainer:{"--table-min-width":ae(s),"--table-max-height":ae(o),"--table-overflow":r==="native"?"auto":void 0}})),Ue=G((t,s)=>{const o=I("TableScrollContainer",Ws,t),{classNames:r,className:n,style:a,styles:i,unstyled:u,vars:l,children:d,minWidth:c,maxHeight:p,type:g,scrollAreaProps:y,...h}=o,x=Y({name:"TableScrollContainer",classes:ce,props:o,className:n,style:a,classNames:r,styles:i,unstyled:u,vars:l,varsResolver:qs,rootSelector:"scrollContainer"});return e.jsx(O,{component:g==="scrollarea"?Yt:"div",...g==="scrollarea"?p?{offsetScrollbars:"xy",...y}:{offsetScrollbars:"x",...y}:{},ref:s,...x("scrollContainer"),...h,children:e.jsx("div",{...x("scrollContainerInner"),children:d})})});Ue.classes=ce;Ue.displayName="@mantine/core/TableScrollContainer";const Ks={withRowBorders:!0,verticalSpacing:7},Ys=X((t,{layout:s,captionSide:o,horizontalSpacing:r,verticalSpacing:n,borderColor:a,stripedColor:i,highlightOnHoverColor:u,striped:l,highlightOnHover:d,stickyHeaderOffset:c,stickyHeader:p})=>({table:{"--table-layout":s,"--table-caption-side":o,"--table-horizontal-spacing":Ke(r),"--table-vertical-spacing":Ke(n),"--table-border-color":a?te(a,t):void 0,"--table-striped-color":l&&i?te(i,t):void 0,"--table-highlight-on-hover-color":d&&u?te(u,t):void 0,"--table-sticky-header-offset":p?ae(c):void 0}})),j=G((t,s)=>{const o=I("Table",Ks,t),{classNames:r,className:n,style:a,styles:i,unstyled:u,vars:l,horizontalSpacing:d,verticalSpacing:c,captionSide:p,stripedColor:g,highlightOnHoverColor:y,striped:h,highlightOnHover:x,withColumnBorders:v,withRowBorders:k,withTableBorder:C,borderColor:S,layout:T,variant:P,data:$,children:E,stickyHeader:N,stickyHeaderOffset:A,mod:W,tabularNums:U,..._}=o,F=Y({name:"Table",props:o,className:n,style:a,classes:ce,classNames:r,styles:i,unstyled:u,rootSelector:"table",vars:l,varsResolver:Ys});return e.jsx(Us,{value:{getStyles:F,stickyHeader:N,striped:h===!0?"odd":h||void 0,highlightOnHover:x,withColumnBorders:v,withRowBorders:k,captionSide:p||"bottom"},children:e.jsx(O,{component:"table",variant:P,ref:s,mod:[{"data-with-table-border":C,"data-tabular-nums":U},W],...F("table"),..._,children:E||!!$&&e.jsx(Ge,{data:$})})})});j.classes=ce;j.displayName="@mantine/core/Table";j.Td=vt;j.Th=_e;j.Tr=ye;j.Thead=bt;j.Tbody=jt;j.Tfoot=wt;j.Caption=kt;j.ScrollContainer=Ue;j.DataRenderer=Ge;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],ge=B("gamepad-2",Xs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],Js=B("handshake",Qs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],eo=B("layout-grid",Zs);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]],so=B("list",to);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]],ro=B("music-2",oo);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],ze=B("music",no);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],io=B("search",ao);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]],co=B("table",lo);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],mo=B("user-check",uo);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],St=B("user",po),fo=""+new URL("creator-search-cover-DN8rtlhC.jpg",import.meta.url).href,ho=""+new URL("brand-search-cover-C1rBdOnU.jpg",import.meta.url).href,xo=be.div`
    .header, .banner_image{
        margin: 0 0 1em;
    }

    .mantine-Grid-col{
        /* padding: calc(${f.spacing.xs} / 3); */
    }

    .forms-fields{
        /* flex: 1; */
        flex-basis: calc(calc(60% - 0.8em));

        .input-wrapper{
            flex-basis: calc(25% - 0.8em);
        }
    }

    .switch-buttons{
        flex-direction: column;
        align-items: flex-end;
        /* flex-basis: calc(17% - 0.8em); */
    }

    .pagination{
        /* flex: 1; */
        flex-direction: column;
        /* flex-basis: calc(18% - 0.8em); */
    }
`;function yo({viewMode:t,setViewMode:s,size:o="md"}){const r={style:{display:"block"},size:"1em"};return e.jsxs(z,{className:"segmentControl",children:[e.jsx(w,{size:o,children:"Select View"}),e.jsx(Le,{withItemsBorders:!1,value:t,onChange:n=>s(n),data:[{label:e.jsx(eo,{...r}),value:"grid"},{label:e.jsx(so,{...r}),value:"list"},{label:e.jsx(co,{...r}),value:"table"}]})]})}function go({size:t}){return e.jsxs(z,{children:[e.jsx(w,{size:t,children:"Visible Rows"}),e.jsxs(lt,{size:"sm",variant:"secondaryGrey",component:"select",rightSection:e.jsx(H,{}),pointer:!0,defaultValue:"1",children:[e.jsx("option",{value:"",disabled:!0,children:"Select rows"}),e.jsx("option",{value:"1",children:"10"}),e.jsx("option",{value:"2",children:"2"})]})]})}const ke=m.createContext(""),vo=be.div`
  display: flex;
  align-items: center;
  padding: ${f.spacing.sm};
  margin: ${f.gap.md} 0;
  background-color: ${f.colors.secondaryGrey[0]};
  gap: ${f.gap.xs};

  .avatar,
  .levels,
  .progress,
  .social_info,
  .action_btns {
    flex: 1;
    text-align: center;
  }

  .list_content {
    flex: 1 0 25%;
  }

  .levels {
    border-left: 1px dashed ${f.colors.inputBgColor[0]};
  }

  .progress {
    border-left: 1px dashed ${f.colors.inputBgColor[0]};
    border-right: 1px dashed ${f.colors.inputBgColor[0]};
    display: flex;
    justify-content: center;
  }

  .social_info {
    border-right: 1px dashed ${f.colors.inputBgColor[0]};
    display: flex;
    padding: 0 ${f.gap.xs} 0 0;
    flex-direction: column;
    gap: ${f.gap.xxs};

    .follwers_list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${f.gap.xs};
    }
  }

  .action_btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 1em;
  }
`;function bo({SocialInfo:t}){const{searchData:s,userType:o}=m.useContext(ke),r=ot("(min-width: 1680px)");return console.log("Listview searchData:",s),s==null?void 0:s.map(({id:n,username:a,dateOfBirth:i,isVerified:u})=>e.jsxs(vo,{children:[e.jsx(ct,{className:"avatar",avatar:dt,size:"7em"}),e.jsxs("div",{className:"list_content",children:[e.jsx(w,{c:"white",size:"xl",children:a}),e.jsxs(z,{children:[o.toUpperCase()===ne.CREATOR&&e.jsx(w,{size:"sm",children:ut(i)}),u&&e.jsx(Me,{}),e.jsx(Oe,{})]}),e.jsx(w,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam"})]}),e.jsxs("div",{className:"levels",children:[e.jsx(w,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(Ie,{width:"3.125em",height:"4.375em"})]}),e.jsx("div",{className:"progress",children:e.jsx(we,{size:r?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsxs(w,{size:r?"md":"sm",ta:"center",c:"white",children:[" ","1.5M"]}),e.jsx(w,{size:r?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(w,{size:r?"sm":"xs",ta:"center",children:e.jsx(St,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsx("div",{className:"social_info",children:t.map(({text:l,icon:d,followers:c,color:p})=>e.jsxs(w,{className:"follwers_list",ta:"center",children:[d,e.jsx(w,{size:"xs",span:!0,c:p,children:l}),e.jsx(w,{size:"xs",span:!0,c:"white",children:c})]},l))}),e.jsxs("div",{className:"action_btns",children:[e.jsx(ie,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(ie,{width:"6.25em",variant:"primary",children:"sponsor"})]})]},n))}const jo=be.div`
    display: flex;
    align-items: center;
    gap: ${f.gap.xs};

    label{  
        position: relative;
        width: 3.75em;
        height: 2.125em;
    }

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${f.colors.inputBgColor[0]};
      transition: 0.3 s;
      border-radius: ${f.radius.sm};
    }

    .slider>.icon {
      position: absolute;
      height: 1.625em;
      width: 1.625em;
      left: 0.25em;
      bottom: 0.25em;
      background-color: ${f.colors.grey[0]};
      color: ${f.colors.white[0]};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${f.radius.sm};
      font-size: ${f.fontSizes.md};
      transition: 0.3s;
    }


    input:checked + .slider>.icon  {
      transform: translateX(1.625em);
      background-color: ${f.colors.primary[0]};
    }
`;function Je({fieldName:t,label:s,...o}){const[r,n]=m.useState(!1);return e.jsxs(jo,{children:[e.jsx(w,{children:s}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:t,onClick:()=>n(a=>!a),...o}),e.jsx("span",{className:"slider",children:e.jsx("span",{className:"icon",children:r?e.jsx(ts,{size:f.spacing.sm}):e.jsx(os,{size:f.spacing.sm})})})]})]})}const wo=be.div`
  padding: 2em;
  background-color: ${f.colors.secondaryGrey[0]};
  border-radius: ${f.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${f.gap.xs};

  .avatar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .title{
      display: flex;
      flex-direction: column;
      gap: ${f.gap.xxs};
    }
  }

  .information{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    align-items: center;
    gap: ${f.gap.xs};

    .social_info{
      display: flex;
      padding: 0 ${f.gap.xs} 0 0;
      flex-direction: column;
      gap: ${f.gap.xxs};

      .follwers_list{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: ${f.gap.xs};
      }
    }

    .progress{
      border-left: 1px dashed ${f.colors.inputBgColor[0]};
      border-right: 1px dashed ${f.colors.inputBgColor[0]};
      display: flex;
      justify-content: center;
    }
  }
`;function ko({SocialInfo:t}){const{searchData:s,userType:o}=m.useContext(ke),r=ot("(min-width: 1680px)");return e.jsx(z,{children:s==null?void 0:s.map(({id:n,username:a,dateOfBirth:i,isVerified:u})=>e.jsx("div",{style:{flexBasis:"calc(33.3% - 0.8em)"},children:e.jsxs(wo,{children:[e.jsxs("div",{className:"avatar",children:[e.jsx(ct,{className:"avatar",avatar:dt,size:"112"}),e.jsxs("div",{className:"title",children:[e.jsx(w,{c:"white",size:"xl",children:a}),e.jsxs(z,{children:[o.toUpperCase()===ne.CREATOR&&e.jsx(w,{size:"sm",children:ut(i)}),u&&e.jsx(Me,{}),e.jsx(Oe,{})]})]})]}),e.jsx(w,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat..."}),e.jsxs("div",{className:"information",children:[e.jsx("div",{className:"social_info",children:t.map(({text:l,icon:d,followers:c,color:p})=>e.jsxs(w,{className:"follwers_list",ta:"center",children:[d,e.jsx(w,{size:"xs",span:!0,c:p,children:l}),e.jsx(w,{size:"xs",span:!0,c:"white",children:c})]},l))}),e.jsx("div",{className:"progress",children:e.jsx(we,{size:r?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsx(w,{size:r?"md":"sm",ta:"center",c:"white",children:" 1.5M"}),e.jsx(w,{size:r?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(w,{size:r?"sm":"xs",ta:"center",children:e.jsx(St,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsxs("div",{className:"levels",children:[e.jsx(w,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(Ie,{width:"3.125em",height:"4.375em"})]})]}),e.jsxs(z,{className:"action_btns",children:[e.jsx(ie,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(ie,{width:"6.25em",variant:"primary",children:"sponsor"})]})]})},n))})}const So=[{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(pe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(fe,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(he,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(ze,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"dicord.com/"}],score:5},{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(pe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(fe,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(he,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(ze,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"dicord.com/"}],score:4},{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(pe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(fe,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(he,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(ze,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"dicord.com/"}],score:6}];function Co(){const{searchData:t}=m.useContext(ke),s=r=>{let n=r==null?void 0:r.reduce((a,i)=>a+parseInt(i.follwers),0);return e.jsxs(z,{children:[e.jsxs(w,{children:[n,"K"]}),e.jsx(z,{gap:"sm",children:r==null?void 0:r.map(({name:a,icon:i})=>i&&e.jsx("div",{children:i},a))})]})},o=t.map(({id:r,username:n,isVerified:a})=>e.jsxs(j.Tr,{children:[e.jsx(j.Td,{children:n}),e.jsx(j.Td,{children:e.jsxs(z,{children:[e.jsx(w,{children:"USA"}),a&&e.jsx(Me,{}),e.jsx(Oe,{})]})}),e.jsx(j.Td,{children:s(So[0].socialLinks)}),e.jsx(j.Td,{children:e.jsx(Ie,{number:"4"})}),e.jsx(j.Td,{children:e.jsxs(z,{children:[e.jsx(Xe,{color:"secondary",size:"sm",variant:"filled",radius:"md",children:e.jsx(Js,{})}),e.jsx(Xe,{color:"primary",size:"sm",variant:"filled",radius:"md",children:e.jsx(mo,{})})]})})]},r));return e.jsx(j.ScrollContainer,{children:e.jsxs(j,{withColumnBorders:!0,horizontalSpacing:"md",children:[e.jsx(j.Thead,{children:e.jsxs(j.Tr,{children:[e.jsx(j.Th,{children:"NAME"}),e.jsx(j.Th,{children:"INFO"}),e.jsx(j.Th,{children:"GAMEIN FOLLOWERS"}),e.jsx(j.Th,{children:"G-SCORE"}),e.jsx(j.Th,{children:"INTERACT"})]})}),e.jsx(j.Tbody,{children:o})]})})}const Ze={creator:{name:"CREATORS",icon:e.jsx(ds,{size:"1.5em"}),coverImage:fo},brand:{name:"BRANDS",icon:e.jsx(cs,{size:"1.5em"}),coverImage:ho}},$e={search_input:"",teams:"",game:"",country:"",gamein_partner:"",followers:"",level:"",sortBy:"",ai_matchmaking:"",verification:""},To=[{name:"search_input",className:"input-wrapper",variant:"secondaryGrey",label:"",placeholder:"type here",rightSection:e.jsx(io,{size:"1em"}),component:lt,componentType:""},{name:"teams",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["type(orga,teams)","Angular","Vue"]},{name:"game",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["game","Angular","Vue"]},{name:"country",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["country","Angular","Vue"]},{name:"gamein_partner",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["gamein partner","Angular","Vue"]},{name:"followers",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["followers","Angular","Vue"]},{name:"level",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["level","Angular","Vue"]},{name:"sortBy",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(H,{size:"1em"}),component:L,componentType:"",options:["sort by","Angular","Vue"]}],et=[{text:"Twitch",icon:e.jsx(pe,{size:f.spacing.xs}),followers:"35K",color:"primary"},{text:"Instagram",icon:e.jsx(fe,{size:f.spacing.xs}),followers:"35K",color:"primary"},{text:"Twitter",icon:e.jsx(he,{size:f.spacing.xs}),followers:"35K",color:"skyblue"},{text:"Youtube",icon:e.jsx(xe,{size:f.spacing.xs}),followers:"35K",color:"skyblue"},{text:"Tiktok",icon:e.jsx(ro,{size:f.spacing.xs}),followers:"35K",color:"secondary"},{text:"Discord",icon:e.jsx(ge,{size:f.spacing.xs}),followers:"35K",color:"secondary"}],No={list:e.jsx(bo,{SocialInfo:et}),grid:e.jsx(ko,{SocialInfo:et}),table:e.jsx(Co,{})};function mr(){var p;const{userType:t}=Pt(),[s,o]=m.useState({}),[r,n]=m.useState("list"),{control:a,handleSubmit:i}=rs({defaultValues:$e}),[u,l]=m.useState([]),{get:d}=as();if(m.useEffect(()=>{(t==null?void 0:t.toUpperCase())===ne.CREATOR?o(Ze.creator):o(Ze.brand)},[o,t]),(t==null?void 0:t.toUpperCase())!==ne.BRAND&&(t==null?void 0:t.toUpperCase())!==ne.CREATOR)return;const c=async g=>{const{search_input:y,country:h}=g;try{const{data:x}=await d(Et.SEARCH({keyword:y,userType:t==null?void 0:t.toUpperCase(),country:h}));l(x)}catch(x){return Promise.reject("Complete profile error:",x)}};return s&&e.jsxs(xo,{children:[e.jsx(Mt,{icon:s==null?void 0:s.icon,text:s==null?void 0:s.name}),e.jsx(Ot,{coverImage:s.coverImage,size:"auto"}),e.jsx("form",{onSubmit:i(c),children:e.jsxs(z,{justify:"space-between",children:[e.jsx(z,{className:"forms-fields",children:To.map(({name:g,className:y,variant:h,label:x,placeholder:v,rightSection:k,component:C,componentType:S,options:T})=>e.jsx(Re,{name:g,control:a,Component:C,componentProps:{label:x,className:y,variant:h,rightSection:k,...S&&{componentType:S},...v&&{placeholder:v},...T&&{data:T}}},g))}),e.jsxs(z,{className:"switch-buttons",justify:"space-between",children:[e.jsx(Re,{name:$e.ai_matchmaking,control:a,Component:Je,componentProps:{name:"ai_matchmaking",label:"ai matchmaking"}}),e.jsx(Re,{name:$e.verification,control:a,Component:Je,componentProps:{name:"verification",label:"verification"}})]}),e.jsxs(z,{className:"pagination",justify:"space-between",children:[e.jsx(yo,{size:"sm",viewMode:r,setViewMode:n}),e.jsx(go,{size:"sm"})]}),e.jsx(z,{flex:"0 0 100%",justify:"end",children:e.jsx(ie,{variant:"primary",type:"submit",children:"Search"})})]})}),e.jsx(w,{children:"RESULTS"}),e.jsx(ss,{my:"sm",variant:"dashed",color:"white"}),(p=u==null?void 0:u.results)!=null&&p.length?e.jsx(ke.Provider,{value:{searchData:u==null?void 0:u.results,userType:t},children:r&&No[r]}):e.jsx(w,{c:"dimmed",ta:"center",size:"md",children:"No results found"})]})}export{mr as default};
