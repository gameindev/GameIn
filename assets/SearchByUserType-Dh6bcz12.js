import{a as p,f as L,u as I,g as q,b as ze,j as e,B as P,v as K,z as rs,s as J,J as ns,c as Be,K as is,x as Fe,M as Ts,y as Rs,r as de,N as Xe,w as _s,P as $s,Q as Qe,t as f,d as Se,S as as,T as Ps}from"./index-C-4AFNO7.js";import{X as Es,T as xe,I as ve,a as ye,Y as ge,S as Ms}from"./SectionHeader-CRqKxQKP.js";import{C as Is}from"./CoverBanner-2QBI14tf.js";import{G as N}from"./Group-CIVdmQNo.js";import{a as Os,T as u}from"./Text-Bpvfj0Xl.js";import{g as Bs}from"./get-env-uyVen0u2.js";import{t as fe,u as ls,s as cs,g as Fs,i as ds,F as Ls,a as Ds,b as As,c as Gs,d as Vs,e as Hs,f as Us,h as Ws,o as qs,j as Je,k as Ks,l as $e,S as Ys}from"./FocusTrap-C_LKvyJp.js";import{c as us,u as Xs}from"./useApi-D27OJqXo.js";import{a as ms,u as Qs}from"./DirectionProvider-CeuBSB5J.js";import{c as B}from"./createLucideIcon-CFEEk01s.js";import{T as ps}from"./TextInput-DDuOS7nz.js";import{C as W}from"./chevron-down-GNjr-X4T.js";import{A as je}from"./AvatarSection-BLGA51bl.js";import{c as be}from"./creator_image-C6LzQUPk.js";import{V as ae,B as le,a as ce}from"./LevelBadge-CBks6eCf.js";import{g as hs,a as Js,F as Zs}from"./get-floating-position-DB61theM.js";import{g as et}from"./get-style-object-DUJZA7T_.js";import{B as V}from"./Button-BR3F4-qk.js";import{u as st,F as Pe}from"./FormField-CDmgs_EH.js";import{c as tt,A as Ze}from"./ActionIcon-CN4WoK2w.js";import{g as ot}from"./get-parsed-combobox-data-BSKT1ADk.js";import{C as rt}from"./ComboboxChevron-Blj9Qmi_.js";import{F as nt,S as it}from"./star-C7lZQp77.js";import"./modal-h5yuvtaI.js";import"./IconButton-BgxEkDQX.js";import"./Modal-DGi-JDXn.js";import"./Paper-9yU7SWws.js";import"./EditAvator-B4wwl5Wv.js";import"./HexContainer-Ccq6LLuc.js";import"./selectors-BfVctv7J.js";import"./Stack-cHEUxKAk.js";import"./Image-B2O5Zm9s.js";import"./FileInput--HYmVBXe.js";function at(s,t){if(s===t||Number.isNaN(s)&&Number.isNaN(t))return!0;if(!(s instanceof Object)||!(t instanceof Object))return!1;const o=Object.keys(s),{length:r}=o;if(r!==Object.keys(t).length)return!1;for(let n=0;n<r;n+=1){const i=o[n];if(!(i in t)||s[i]!==t[i]&&!(Number.isNaN(s[i])&&Number.isNaN(t[i])))return!1}return!0}function lt(s,t){if(!s||!t)return!1;if(s===t)return!0;if(s.length!==t.length)return!1;for(let o=0;o<s.length;o+=1)if(!at(s[o],t[o]))return!1;return!0}function ct(s){const t=p.useRef([]),o=p.useRef(0);return lt(t.current,s)||(t.current=s,o.current+=1),[o.current]}function dt(s,t){p.useEffect(s,ct(t))}function ut(s,t,o={autoInvoke:!1}){const r=p.useRef(null),n=p.useCallback((...a)=>{r.current||(r.current=window.setTimeout(()=>{s(a),r.current=null},t))},[t]),i=p.useCallback(()=>{r.current&&(window.clearTimeout(r.current),r.current=null)},[]);return p.useEffect(()=>(o.autoInvoke&&n(),i),[i,n]),{start:n,clear:i}}function mt(s,t,o){const r=p.useRef(null),n=p.useRef(null);return p.useEffect(()=>{const i=typeof o=="function"?o():o;return(i||n.current)&&(r.current=new MutationObserver(s),r.current.observe(i||n.current,t)),()=>{var a;(a=r.current)==null||a.disconnect()}},[s,t]),n}function pt(){const[s,t]=p.useState(!1);return p.useEffect(()=>t(!0),[]),s}function ht(s,t){if(!t||!s)return!1;let o=t.parentNode;for(;o!=null;){if(o===s)return!0;o=o.parentNode}return!1}function ft({target:s,parent:t,ref:o,displayAfterTransitionEnd:r}){const n=p.useRef(-1),[i,a]=p.useState(!1),[m,c]=p.useState(typeof r=="boolean"?r:!1),d=()=>{if(!s||!t||!o.current)return;const v=s.getBoundingClientRect(),x=t.getBoundingClientRect(),g=window.getComputedStyle(s),w=window.getComputedStyle(t),k=fe(g.borderTopWidth)+fe(w.borderTopWidth),z=fe(g.borderLeftWidth)+fe(w.borderLeftWidth),S={top:v.top-x.top-k,left:v.left-x.left-z,width:v.width,height:v.height};o.current.style.transform=`translateY(${S.top}px) translateX(${S.left}px)`,o.current.style.width=`${S.width}px`,o.current.style.height=`${S.height}px`},l=()=>{window.clearTimeout(n.current),o.current&&(o.current.style.transitionDuration="0ms"),d(),n.current=window.setTimeout(()=>{o.current&&(o.current.style.transitionDuration="")},30)},h=p.useRef(null),y=p.useRef(null);return p.useEffect(()=>{if(d(),s)return h.current=new ResizeObserver(l),h.current.observe(s),t&&(y.current=new ResizeObserver(l),y.current.observe(t)),()=>{var v,x;(v=h.current)==null||v.disconnect(),(x=y.current)==null||x.disconnect()}},[t,s]),p.useEffect(()=>{if(t){const v=x=>{ht(x.target,t)&&(l(),c(!1))};return t.addEventListener("transitionend",v),()=>{t.removeEventListener("transitionend",v)}}},[t]),ut(()=>{Bs()!=="test"&&a(!0)},20,{autoInvoke:!0}),mt(v=>{v.forEach(x=>{x.type==="attributes"&&x.attributeName==="dir"&&l()})},{attributes:!0,attributeFilter:["dir"]},()=>document.documentElement),{initialized:i,hidden:m}}var fs={root:"m_96b553a6"};const xt={},vt=K((s,{transitionDuration:t})=>({root:{"--transition-duration":typeof t=="number"?`${t}ms`:t}})),Le=L((s,t)=>{const o=I("FloatingIndicator",xt,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,target:d,parent:l,transitionDuration:h,mod:y,displayAfterTransitionEnd:v,...x}=o,g=q({name:"FloatingIndicator",classes:fs,props:o,className:n,style:i,classNames:r,styles:a,unstyled:m,vars:c,varsResolver:vt}),w=p.useRef(null),{initialized:k,hidden:z}=ft({target:d,parent:l,ref:w,displayAfterTransitionEnd:v}),S=ze(t,w);return!d||!l?null:e.jsx(P,{ref:S,mod:[{initialized:k,hidden:z},y],...g("root"),...x})});Le.displayName="@mantine/core/FloatingIndicator";Le.classes=fs;var xs={root:"m_3eebeb36",label:"m_9e365f20"};const yt={orientation:"horizontal"},gt=K((s,{color:t,variant:o,size:r})=>({root:{"--divider-color":t?J(t,s):void 0,"--divider-border-style":o,"--divider-size":rs(r,"divider-size")}})),De=L((s,t)=>{const o=I("Divider",yt,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,color:d,orientation:l,label:h,labelPosition:y,mod:v,...x}=o,g=q({name:"Divider",classes:xs,props:o,className:n,style:i,classNames:r,styles:a,unstyled:m,vars:c,varsResolver:gt});return e.jsx(P,{ref:t,mod:[{orientation:l,"with-label":!!h},v],...g("root"),...x,role:"separator",children:h&&e.jsx(P,{component:"span",mod:{position:y},...g("label"),children:h})})});De.classes=xs;De.displayName="@mantine/core/Divider";function jt(s){return"group"in s}function Ae({data:s}){if(jt(s)){const n=s.items.map(i=>e.jsx(Ae,{data:i},i.value));return e.jsx("optgroup",{label:s.group,children:n})}const{value:t,label:o,...r}=s;return e.jsx("option",{value:s.value,...r,children:s.label},s.value)}Ae.displayName="@mantine/core/NativeSelectOption";const bt={rightSectionPointerEvents:"none"},G=L((s,t)=>{const{data:o,children:r,size:n,error:i,rightSection:a,unstyled:m,...c}=I("NativeSelect",bt,s),d=ot(o).map((l,h)=>e.jsx(Ae,{data:l},h));return e.jsx(us,{component:"select",ref:t,...c,__staticSelector:"NativeSelect",size:n,pointer:!0,error:i,unstyled:m,rightSection:a||e.jsx(rt,{size:n,error:i,unstyled:m}),children:r||d})});G.classes=us.classes;G.displayName="@mantine/core/NativeSelect";const wt={duration:100,transition:"fade"};function kt(s,t){return{...wt,...t,...s}}function Nt({offset:s,position:t,defaultOpened:o}){const[r,n]=p.useState(o),i=p.useRef(null),{x:a,y:m,elements:c,refs:d,update:l,placement:h}=ls({placement:t,middleware:[cs({crossAxis:!0,padding:5,rootBoundary:"document"})]}),y=h.includes("right")?s:t.includes("left")?s*-1:0,v=h.includes("bottom")?s:t.includes("top")?s*-1:0,x=p.useCallback(({clientX:g,clientY:w})=>{d.setPositionReference({getBoundingClientRect(){return{width:0,height:0,x:g,y:w,left:g+y,top:w+v,right:g,bottom:w}}})},[c.reference]);return p.useEffect(()=>{if(d.floating.current){const g=i.current;g.addEventListener("mousemove",x);const w=Fs(d.floating.current);return w.forEach(k=>{k.addEventListener("scroll",l)}),()=>{g.removeEventListener("mousemove",x),w.forEach(k=>{k.removeEventListener("scroll",l)})}}},[c.reference,d.floating.current,l,x,r]),{handleMouseMove:x,x:a,y:m,opened:r,setOpened:n,boundaryRef:i,floating:d.setFloating}}var Ce={tooltip:"m_1b3c8819",arrow:"m_f898399f"};const zt={refProp:"ref",withinPortal:!0,offset:10,position:"right",zIndex:ns("popover")},St=K((s,{radius:t,color:o})=>({tooltip:{"--tooltip-radius":t===void 0?void 0:Fe(t),"--tooltip-bg":o?J(o,s):void 0,"--tooltip-color":o?"var(--mantine-color-white)":void 0}})),Ge=L((s,t)=>{const o=I("TooltipFloating",zt,s),{children:r,refProp:n,withinPortal:i,style:a,className:m,classNames:c,styles:d,unstyled:l,radius:h,color:y,label:v,offset:x,position:g,multiline:w,zIndex:k,disabled:z,defaultOpened:S,variant:C,vars:E,portalProps:_,...M}=o,T=Be(),F=q({name:"TooltipFloating",props:o,classes:Ce,className:m,style:a,classNames:c,styles:d,unstyled:l,rootSelector:"tooltip",vars:E,varsResolver:St}),{handleMouseMove:Y,x:H,y:$,opened:D,boundaryRef:ee,floating:re,setOpened:se}=Nt({offset:x,position:g,defaultOpened:S});if(!ds(r))throw new Error("[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");const ne=ze(ee,hs(r),t),O=r.props,ie=U=>{var A;(A=O.onMouseEnter)==null||A.call(O,U),Y(U),se(!0)},X=U=>{var A;(A=O.onMouseLeave)==null||A.call(O,U),se(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(is,{..._,withinPortal:i,children:e.jsx(P,{...M,...F("tooltip",{style:{...et(a,T),zIndex:k,display:!z&&D?"block":"none",top:($&&Math.round($))??"",left:(H&&Math.round(H))??""}}),variant:C,ref:re,mod:{multiline:w},children:v})}),p.cloneElement(r,{...O,[n]:ne,onMouseEnter:ie,onMouseLeave:X})]})});Ge.classes=Ce;Ge.displayName="@mantine/core/TooltipFloating";const vs=p.createContext(!1),Ct=vs.Provider,Tt=()=>p.useContext(vs),Rt={openDelay:0,closeDelay:0};function Ve(s){const{openDelay:t,closeDelay:o,children:r}=I("TooltipGroup",Rt,s);return e.jsx(Ct,{value:!0,children:e.jsx(Ls,{delay:{open:t,close:o},children:r})})}Ve.displayName="@mantine/core/TooltipGroup";Ve.extend=s=>s;function _t(s){if(s===void 0)return{shift:!0,flip:!0};const t={...s};return s.shift===void 0&&(t.shift=!0),s.flip===void 0&&(t.flip=!0),t}function $t(s){const t=_t(s.middlewares),o=[qs(s.offset)];return t.shift&&o.push(cs(typeof t.shift=="boolean"?{padding:8}:{padding:8,...t.shift})),t.flip&&o.push(typeof t.flip=="boolean"?Je():Je(t.flip)),o.push(Ks({element:s.arrowRef,padding:s.arrowOffset})),t.inline?o.push(typeof t.inline=="boolean"?$e():$e(t.inline)):s.inline&&o.push($e()),o}function Pt(s){var E,_,M;const[t,o]=p.useState(s.defaultOpened),n=typeof s.opened=="boolean"?s.opened:t,i=Tt(),a=ms(),m=p.useCallback(T=>{o(T),T&&k(a)},[a]),{x:c,y:d,context:l,refs:h,placement:y,middlewareData:{arrow:{x:v,y:x}={}}}=ls({strategy:s.strategy,placement:s.position,open:n,onOpenChange:m,middleware:$t(s),whileElementsMounted:As}),{delay:g,currentId:w,setCurrentId:k}=Ds(l,{id:a}),{getReferenceProps:z,getFloatingProps:S}=Gs([Vs(l,{enabled:(E=s.events)==null?void 0:E.hover,delay:i?g:{open:s.openDelay,close:s.closeDelay},mouseOnly:!((_=s.events)!=null&&_.touch)}),Hs(l,{enabled:(M=s.events)==null?void 0:M.focus,visibleOnly:!0}),Us(l,{role:"tooltip"}),Ws(l,{enabled:typeof s.opened>"u"})]);Ts(()=>{var T;(T=s.onPositionChange)==null||T.call(s,y)},[y]);const C=n&&w&&w!==a;return{x:c,y:d,arrowX:v,arrowY:x,reference:h.setReference,floating:h.setFloating,getFloatingProps:S,getReferenceProps:z,isGroupPhase:C,opened:n,placement:y}}const es={position:"top",refProp:"ref",withinPortal:!0,arrowSize:4,arrowOffset:5,arrowRadius:0,arrowPosition:"side",offset:5,transitionProps:{duration:100,transition:"fade"},events:{hover:!0,focus:!1,touch:!1},zIndex:ns("popover"),positionDependencies:[],middlewares:{flip:!0,shift:!0,inline:!1}},Et=K((s,{radius:t,color:o,variant:r,autoContrast:n})=>{const i=s.variantColorResolver({theme:s,color:o||s.primaryColor,autoContrast:n,variant:r||"filled"});return{tooltip:{"--tooltip-radius":t===void 0?void 0:Fe(t),"--tooltip-bg":o?i.background:void 0,"--tooltip-color":o?i.color:void 0}}}),ue=L((s,t)=>{const o=I("Tooltip",es,s),{children:r,position:n,refProp:i,label:a,openDelay:m,closeDelay:c,onPositionChange:d,opened:l,defaultOpened:h,withinPortal:y,radius:v,color:x,classNames:g,styles:w,unstyled:k,style:z,className:S,withArrow:C,arrowSize:E,arrowOffset:_,arrowRadius:M,arrowPosition:T,offset:F,transitionProps:Y,multiline:H,events:$,zIndex:D,disabled:ee,positionDependencies:re,onClick:se,onMouseEnter:ne,onMouseLeave:O,inline:ie,variant:X,keepMounted:U,vars:A,portalProps:Q,mod:Te,floatingStrategy:te,middlewares:Re,autoContrast:qe,...pe}=I("Tooltip",es,o),{dir:he}=Qs(),j=p.useRef(null),R=Pt({position:Js(he,n),closeDelay:c,openDelay:m,onPositionChange:d,opened:l,defaultOpened:h,events:$,arrowRef:j,arrowOffset:_,offset:typeof F=="number"?F+(C?E/2:0):F,positionDependencies:[...re,r],inline:ie,strategy:te,middlewares:Re}),_e=q({name:"Tooltip",props:o,classes:Ce,className:S,style:z,classNames:g,styles:w,unstyled:k,rootSelector:"tooltip",vars:A,varsResolver:Et});if(!ds(r))throw new Error("[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported");const Ss=ze(R.reference,hs(r),t),Ke=kt(Y,{duration:100,transition:"fade"}),Ye=r.props;return e.jsxs(e.Fragment,{children:[e.jsx(is,{...Q,withinPortal:y,children:e.jsx(Os,{...Ke,keepMounted:U,mounted:!ee&&!!R.opened,duration:R.isGroupPhase?10:Ke.duration,children:Cs=>e.jsxs(P,{...pe,"data-fixed":te==="fixed"||void 0,variant:X,mod:[{multiline:H},Te],...R.getFloatingProps({ref:R.floating,className:_e("tooltip").className,style:{..._e("tooltip").style,...Cs,zIndex:D,top:R.y??0,left:R.x??0}}),children:[a,e.jsx(Zs,{ref:j,arrowX:R.arrowX,arrowY:R.arrowY,visible:C,position:R.placement,arrowSize:E,arrowOffset:_,arrowRadius:M,arrowPosition:T,..._e("arrow")})]})})}),p.cloneElement(r,R.getReferenceProps({onClick:se,onMouseEnter:ne,onMouseLeave:O,onMouseMove:o.onMouseMove,onPointerDown:o.onPointerDown,onPointerEnter:o.onPointerEnter,className:Rs(S,Ye.className),...Ye,[i]:Ss}))]})});ue.classes=Ce;ue.displayName="@mantine/core/Tooltip";ue.Floating=Ge;ue.Group=Ve;function Mt({size:s,thickness:t,sum:o,value:r,root:n,offset:i}){const a=(s*.9-t*2)/2,m=Math.PI*a*2/100,c=n||r===void 0?`${(100-o)*m}, ${o*m}`:`${r*m}, ${(100-r)*m}`;return{strokeWidth:Number.isNaN(t)?12:t,cx:s/2||0,cy:s/2||0,r:a||0,transform:n?`scale(1, -1) translate(0, -${s})`:void 0,strokeDasharray:c,strokeDashoffset:n?0:i||0}}function ys({size:s,value:t,offset:o,sum:r,thickness:n,root:i,color:a,lineRoundCaps:m,tooltip:c,getStyles:d,display:l,...h}){const y=Be();return e.jsx(ue.Floating,{disabled:!c,label:c,children:e.jsx(P,{component:"circle",...h,...d("curve"),__vars:{"--curve-color":a?J(a,y):void 0},fill:"none",strokeLinecap:m?"round":"butt",...Mt({sum:r,size:s,thickness:n,value:t,offset:o,root:i})})})}ys.displayName="@mantine/core/Curve";function It({size:s,thickness:t,sections:o,renderRoundedLineCaps:r,rootColor:n}){const i=o.reduce((l,h)=>l+h.value,0),a=Math.PI*((s*.9-t*2)/2)*2;let m=a;const c=[],d=[];for(let l=0;l<o.length;l+=1)c.push({sum:i,offset:m,data:o[l],root:!1}),m-=o[l].value/100*a;if(c.push({sum:i,offset:m,data:{color:n},root:!0}),d.push({...c[c.length-1],lineRoundCaps:!1}),c.length>2){d.push({...c[0],lineRoundCaps:r}),d.push({...c[c.length-2],lineRoundCaps:r});for(let l=1;l<=c.length-3;l+=1)d.push({...c[l],lineRoundCaps:!1})}else d.push({...c[0],lineRoundCaps:r});return d}var gs={root:"m_b32e4812",svg:"m_d43b5134",curve:"m_b1ca1fbf",label:"m_b23f9dc4"};function Ot(s,t){return Math.min(s||12,(t||120)/4)}const Bt={size:120,thickness:12},Ft=K((s,{size:t,thickness:o,transitionDuration:r})=>({root:{"--rp-size":de(t),"--rp-label-offset":de(o*2),"--rp-transition-duration":r?`${r}ms`:void 0}})),oe=L((s,t)=>{const o=I("RingProgress",Bt,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,label:d,sections:l,size:h,thickness:y,roundCaps:v,rootColor:x,transitionDuration:g,...w}=o,k=q({name:"RingProgress",classes:gs,props:o,className:n,style:i,classNames:r,styles:a,unstyled:m,vars:c,varsResolver:Ft}),z=Ot(y,h),S=It({size:h,thickness:z,sections:l,renderRoundedLineCaps:v,rootColor:x}).map(({data:C,sum:E,root:_,lineRoundCaps:M,offset:T},F)=>p.createElement(ys,{...C,key:F,size:h,thickness:z,sum:E,offset:T,color:C==null?void 0:C.color,root:_,lineRoundCaps:M,getStyles:k}));return e.jsxs(P,{...k("root"),size:h,ref:t,...w,children:[e.jsx("svg",{...k("svg"),children:S}),d&&e.jsx("div",{...k("label"),children:d})]})});oe.classes=gs;oe.displayName="@mantine/core/RingProgress";var js={root:"m_cf365364",indicator:"m_9e182ccd",label:"m_1738fcb2",input:"m_1714d588",control:"m_69686b9b",innerLabel:"m_78882f40"};const Lt={withItemsBorders:!0},Dt=K((s,{radius:t,color:o,transitionDuration:r,size:n,transitionTimingFunction:i})=>({root:{"--sc-radius":t===void 0?void 0:Fe(t),"--sc-color":o?J(o,s):void 0,"--sc-shadow":o?void 0:"var(--mantine-shadow-xs)","--sc-transition-duration":r===void 0?void 0:`${r}ms`,"--sc-transition-timing-function":i,"--sc-padding":rs(n,"sc-padding"),"--sc-font-size":$s(n)}})),He=L((s,t)=>{var pe,he;const o=I("SegmentedControl",Lt,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,data:d,value:l,defaultValue:h,onChange:y,size:v,name:x,disabled:g,readOnly:w,fullWidth:k,orientation:z,radius:S,color:C,transitionDuration:E,transitionTimingFunction:_,variant:M,autoContrast:T,withItemsBorders:F,mod:Y,...H}=o,$=q({name:"SegmentedControl",props:o,classes:js,className:n,style:i,classNames:r,styles:a,unstyled:m,vars:c,varsResolver:Dt}),D=Be(),ee=d.map(j=>typeof j=="string"?{label:j,value:j}:j),re=pt(),[se,ne]=p.useState(Xe()),[O,ie]=p.useState(null),[X,U]=p.useState({}),A=(j,R)=>{X[R]=j,U(X)},[Q,Te]=Xs({value:l,defaultValue:h,finalValue:Array.isArray(d)?((pe=ee.find(j=>!j.disabled))==null?void 0:pe.value)??((he=d[0])==null?void 0:he.value)??null:null,onChange:y}),te=ms(x),Re=ee.map(j=>p.createElement(P,{...$("control"),mod:{active:Q===j.value,orientation:z},key:j.value},p.createElement("input",{...$("input"),disabled:g||j.disabled,type:"radio",name:te,value:j.value,id:`${te}-${j.value}`,checked:Q===j.value,onChange:()=>!w&&Te(j.value),"data-focus-ring":D.focusRing,key:`${j.value}-input`}),p.createElement(P,{component:"label",...$("label"),mod:{active:Q===j.value&&!(g||j.disabled),disabled:g||j.disabled,"read-only":w},htmlFor:`${te}-${j.value}`,ref:R=>A(R,j.value),__vars:{"--sc-label-color":C!==void 0?_s({color:C,theme:D,autoContrast:T}):void 0},key:`${j.value}-label`},e.jsx("span",{...$("innerLabel"),children:j.label})))),qe=ze(t,j=>ie(j));return dt(()=>{ne(Xe())},[d.length]),d.length===0?null:e.jsxs(P,{...$("root"),variant:M,size:v,ref:qe,mod:[{"full-width":k,orientation:z,initialized:re,"with-items-borders":F},Y],...H,role:"radiogroup","data-disabled":g,children:[typeof Q=="string"&&e.jsx(Le,{target:X[Q],parent:O,component:"span",transitionDuration:"var(--sc-transition-duration)",...$("indicator")},se),Re]})});He.classes=js;He.displayName="@mantine/core/SegmentedControl";const[At,Gt]=tt("Table component was not found in the tree");var me={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function Vt(s,t){if(!t)return;const o={};return t.columnBorder&&s.withColumnBorders&&(o["data-with-column-border"]=!0),t.rowBorder&&s.withRowBorders&&(o["data-with-row-border"]=!0),t.striped&&s.striped&&(o["data-striped"]=s.striped),t.highlightOnHover&&s.highlightOnHover&&(o["data-hover"]=!0),t.captionSide&&s.captionSide&&(o["data-side"]=s.captionSide),t.stickyHeader&&s.stickyHeader&&(o["data-sticky"]=!0),o}function Z(s,t){const o=`Table${s.charAt(0).toUpperCase()}${s.slice(1)}`,r=L((n,i)=>{const a=I(o,{},n),{classNames:m,className:c,style:d,styles:l,...h}=a,y=Gt();return e.jsx(P,{component:s,ref:i,...Vt(y,t),...y.getStyles(s,{className:c,classNames:m,style:d,styles:l,props:a}),...h})});return r.displayName=`@mantine/core/${o}`,r.classes=me,r}const Oe=Z("th",{columnBorder:!0}),bs=Z("td",{columnBorder:!0}),we=Z("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),ws=Z("thead",{stickyHeader:!0}),ks=Z("tbody"),Ns=Z("tfoot"),zs=Z("caption",{captionSide:!0});function Ue({data:s}){return e.jsxs(e.Fragment,{children:[s.caption&&e.jsx(zs,{children:s.caption}),s.head&&e.jsx(ws,{children:e.jsx(we,{children:s.head.map((t,o)=>e.jsx(Oe,{children:t},o))})}),s.body&&e.jsx(ks,{children:s.body.map((t,o)=>e.jsx(we,{children:t.map((r,n)=>e.jsx(bs,{children:r},n))},o))}),s.foot&&e.jsx(Ns,{children:e.jsx(we,{children:s.foot.map((t,o)=>e.jsx(Oe,{children:t},o))})})]})}Ue.displayName="@mantine/core/TableDataRenderer";const Ht={type:"scrollarea"},Ut=K((s,{minWidth:t,maxHeight:o,type:r})=>({scrollContainer:{"--table-min-width":de(t),"--table-max-height":de(o),"--table-overflow":r==="native"?"auto":void 0}})),We=L((s,t)=>{const o=I("TableScrollContainer",Ht,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,children:d,minWidth:l,maxHeight:h,type:y,scrollAreaProps:v,...x}=o,g=q({name:"TableScrollContainer",classes:me,props:o,className:n,style:i,classNames:r,styles:a,unstyled:m,vars:c,varsResolver:Ut,rootSelector:"scrollContainer"});return e.jsx(P,{component:y==="scrollarea"?Ys:"div",...y==="scrollarea"?h?{offsetScrollbars:"xy",...v}:{offsetScrollbars:"x",...v}:{},ref:t,...g("scrollContainer"),...x,children:e.jsx("div",{...g("scrollContainerInner"),children:d})})});We.classes=me;We.displayName="@mantine/core/TableScrollContainer";const Wt={withRowBorders:!0,verticalSpacing:7},qt=K((s,{layout:t,captionSide:o,horizontalSpacing:r,verticalSpacing:n,borderColor:i,stripedColor:a,highlightOnHoverColor:m,striped:c,highlightOnHover:d,stickyHeaderOffset:l,stickyHeader:h})=>({table:{"--table-layout":t,"--table-caption-side":o,"--table-horizontal-spacing":Qe(r),"--table-vertical-spacing":Qe(n),"--table-border-color":i?J(i,s):void 0,"--table-striped-color":c&&a?J(a,s):void 0,"--table-highlight-on-hover-color":d&&m?J(m,s):void 0,"--table-sticky-header-offset":h?de(l):void 0}})),b=L((s,t)=>{const o=I("Table",Wt,s),{classNames:r,className:n,style:i,styles:a,unstyled:m,vars:c,horizontalSpacing:d,verticalSpacing:l,captionSide:h,stripedColor:y,highlightOnHoverColor:v,striped:x,highlightOnHover:g,withColumnBorders:w,withRowBorders:k,withTableBorder:z,borderColor:S,layout:C,variant:E,data:_,children:M,stickyHeader:T,stickyHeaderOffset:F,mod:Y,tabularNums:H,...$}=o,D=q({name:"Table",props:o,className:n,style:i,classes:me,classNames:r,styles:a,unstyled:m,rootSelector:"table",vars:c,varsResolver:qt});return e.jsx(At,{value:{getStyles:D,stickyHeader:T,striped:x===!0?"odd":x||void 0,highlightOnHover:g,withColumnBorders:w,withRowBorders:k,captionSide:h||"bottom"},children:e.jsx(P,{component:"table",variant:E,ref:t,mod:[{"data-with-table-border":z,"data-tabular-nums":H},Y],...D("table"),...$,children:M||!!_&&e.jsx(Ue,{data:_})})})});b.classes=me;b.displayName="@mantine/core/Table";b.Td=bs;b.Th=Oe;b.Tr=we;b.Thead=ws;b.Tbody=ks;b.Tfoot=Ns;b.Caption=zs;b.ScrollContainer=We;b.DataRenderer=Ue;/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Yt=B("check",Kt);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]],ke=B("gamepad-2",Xt);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]],Jt=B("handshake",Qt);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]],eo=B("layout-grid",Zt);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]],to=B("list",so);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["circle",{cx:"8",cy:"18",r:"4",key:"1fc0mg"}],["path",{d:"M12 18V2l7 4",key:"g04rme"}]],ro=B("music-2",oo);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],Ee=B("music",no);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],ao=B("search",io);/**
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
 */const po=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Ne=B("user",po),ho=""+new URL("creator-search-cover-DN8rtlhC.jpg",import.meta.url).href,fo=""+new URL("brand-search-cover-C1rBdOnU.jpg",import.meta.url).href,xo=Se.div`
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
`;function vo({viewMode:s,setViewMode:t,size:o="md"}){const r={style:{display:"block"},size:"1em"};return e.jsxs(N,{className:"segmentControl",children:[e.jsx(u,{size:o,children:"Select View"}),e.jsx(He,{withItemsBorders:!1,value:s,onChange:n=>t(n),data:[{label:e.jsx(eo,{...r}),value:"grid"},{label:e.jsx(to,{...r}),value:"list"},{label:e.jsx(co,{...r}),value:"table"}]})]})}function yo({size:s}){return e.jsxs(N,{children:[e.jsx(u,{size:s,children:"Visible Rows"}),e.jsxs(ps,{size:"sm",variant:"secondaryGrey",component:"select",rightSection:e.jsx(W,{}),pointer:!0,defaultValue:"1",children:[e.jsx("option",{value:"",disabled:!0,children:"Select rows"}),e.jsx("option",{value:"1",children:"10"}),e.jsx("option",{value:"2",children:"2"})]})]})}const go=Se.div`
  display: flex;
  align-items: center;
  padding: ${f.spacing.sm};
  background-color: ${f.colors.secondaryGrey[0]};
  gap: ${f.gap.xs};

  .avatar, .levels, .progress, .social_info, .action_btns{
    flex: 1;
    text-align: center;
  }

  .list_content{
    flex: 1 0 25%;
  }

  .levels{
    border-left: 1px dashed ${f.colors.inputBgColor[0]};
  }

  .progress{
    border-left: 1px dashed ${f.colors.inputBgColor[0]};
    border-right: 1px dashed ${f.colors.inputBgColor[0]};
    display: flex;
    justify-content: center;
  }

  .social_info{
    border-right: 1px dashed ${f.colors.inputBgColor[0]};
    display: flex;
    padding: 0 ${f.gap.xs} 0 0;
    flex-direction: column;
    gap: ${f.gap.xxs};

    .follwers_list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${f.gap.xs};
    }
  }

  .action_btns{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    gap: 1em
  }
`;function jo({SocialInfo:s}){const t=as("(min-width: 1680px)");return e.jsxs(go,{children:[e.jsx(je,{className:"avatar",avatar:be,size:"7em"}),e.jsxs("div",{className:"list_content",children:[e.jsx(u,{c:"white",size:"xl",children:"Instant Shock"}),e.jsxs(N,{children:[e.jsx(u,{size:"sm",children:"24"}),e.jsx(ae,{}),e.jsx(le,{})]}),e.jsx(u,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam"})]}),e.jsxs("div",{className:"levels",children:[e.jsx(u,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(ce,{width:"3.125em",height:"4.375em"})]}),e.jsx("div",{className:"progress",children:e.jsx(oe,{size:t?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsx(u,{size:t?"md":"sm",ta:"center",c:"white",children:" 1.5M"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:e.jsx(Ne,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsx("div",{className:"social_info",children:s.map(({text:o,icon:r,followers:n,color:i})=>e.jsxs(u,{className:"follwers_list",ta:"center",children:[r,e.jsx(u,{size:"xs",span:!0,c:i,children:o}),e.jsx(u,{size:"xs",span:!0,c:"white",children:n})]},o))}),e.jsxs("div",{className:"action_btns",children:[e.jsx(V,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(V,{width:"6.25em",variant:"primary",children:"sponsor"})]})]})}const bo=Se.div`
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
`;function ss({fieldName:s,label:t,...o}){const[r,n]=p.useState(!1);return e.jsxs(bo,{children:[e.jsx(u,{children:t}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:s,onClick:()=>n(i=>!i),...o}),e.jsx("span",{className:"slider",children:e.jsx("span",{className:"icon",children:r?e.jsx(Yt,{size:f.spacing.sm}):e.jsx(Es,{size:f.spacing.sm})})})]})]})}const Me=Se.div`
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
`;function wo({SocialInfo:s}){const t=as("(min-width: 1680px)");return e.jsxs(N,{children:[e.jsx("div",{style:{flexBasis:"calc(33.3% - 0.8em)"},children:e.jsxs(Me,{children:[e.jsxs("div",{className:"avatar",children:[e.jsx(je,{className:"avatar",avatar:be,size:"7em"}),e.jsxs("div",{className:"title",children:[e.jsxs(u,{c:"white",size:"xl",children:["Instant ",e.jsx("br",{})," Shock"]}),e.jsxs(N,{children:[e.jsx(u,{size:"sm",children:"24"}),e.jsx(ae,{}),e.jsx(le,{})]})]})]}),e.jsx(u,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat..."}),e.jsxs("div",{className:"information",children:[e.jsx("div",{className:"social_info",children:s.map(({text:o,icon:r,followers:n,color:i})=>e.jsxs(u,{className:"follwers_list",ta:"center",children:[r,e.jsx(u,{size:"xs",span:!0,c:i,children:o}),e.jsx(u,{size:"xs",span:!0,c:"white",children:n})]},o))}),e.jsx("div",{className:"progress",children:e.jsx(oe,{size:t?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsx(u,{size:t?"md":"sm",ta:"center",c:"white",children:" 1.5M"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:e.jsx(Ne,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsxs("div",{className:"levels",children:[e.jsx(u,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(ce,{width:"3.125em",height:"4.375em"})]})]}),e.jsxs(N,{className:"action_btns",children:[e.jsx(V,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(V,{width:"6.25em",variant:"primary",children:"sponsor"})]})]})}),e.jsx("div",{style:{flexBasis:"calc(33.3% - 0.8em)"},children:e.jsxs(Me,{children:[e.jsxs("div",{className:"avatar",children:[e.jsx(je,{className:"avatar",avatar:be,size:"7em"}),e.jsxs("div",{className:"title",children:[e.jsxs(u,{c:"white",size:"xl",children:["Instant ",e.jsx("br",{})," Shock"]}),e.jsxs(N,{children:[e.jsx(u,{size:"sm",children:"24"}),e.jsx(ae,{}),e.jsx(le,{})]})]})]}),e.jsx(u,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat..."}),e.jsxs("div",{className:"information",children:[e.jsx("div",{className:"social_info",children:s.map(({text:o,icon:r,followers:n,color:i})=>e.jsxs(u,{className:"follwers_list",ta:"center",children:[r,e.jsx(u,{size:"xs",span:!0,c:i,children:o}),e.jsx(u,{size:"xs",span:!0,c:"white",children:n})]},o))}),e.jsx("div",{className:"progress",children:e.jsx(oe,{size:t?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsx(u,{size:t?"md":"sm",ta:"center",c:"white",children:" 1.5M"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:e.jsx(Ne,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsxs("div",{className:"levels",children:[e.jsx(u,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(ce,{width:"3.125em",height:"4.375em"})]})]}),e.jsxs(N,{className:"action_btns",children:[e.jsx(V,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(V,{width:"6.25em",variant:"primary",children:"sponsor"})]})]})}),e.jsx("div",{style:{flexBasis:"calc(33.3% - 0.8em)"},children:e.jsxs(Me,{children:[e.jsxs("div",{className:"avatar",children:[e.jsx(je,{className:"avatar",avatar:be,size:"7em"}),e.jsxs("div",{className:"title",children:[e.jsxs(u,{c:"white",size:"xl",children:["Instant ",e.jsx("br",{})," Shock"]}),e.jsxs(N,{children:[e.jsx(u,{size:"sm",children:"24"}),e.jsx(ae,{}),e.jsx(le,{})]})]})]}),e.jsx(u,{size:"sm",children:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat..."}),e.jsxs("div",{className:"information",children:[e.jsx("div",{className:"social_info",children:s.map(({text:o,icon:r,followers:n,color:i})=>e.jsxs(u,{className:"follwers_list",ta:"center",children:[r,e.jsx(u,{size:"xs",span:!0,c:i,children:o}),e.jsx(u,{size:"xs",span:!0,c:"white",children:n})]},o))}),e.jsx("div",{className:"progress",children:e.jsx(oe,{size:t?120:90,thickness:5,roundCaps:!0,label:e.jsxs(e.Fragment,{children:[e.jsx(u,{size:t?"md":"sm",ta:"center",c:"white",children:" 1.5M"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:"FOLLOWERS"}),e.jsx(u,{size:t?"sm":"xs",ta:"center",children:e.jsx(Ne,{})})]}),sections:[{value:25,color:"primary"},{value:15,color:"secondary"},{value:15,color:"skyblue"},{value:25,color:"primary"}]})}),e.jsxs("div",{className:"levels",children:[e.jsx(u,{size:"sm",ta:"center",mb:"xs",children:"LEVEL"}),e.jsx(ce,{width:"3.125em",height:"4.375em"})]})]}),e.jsxs(N,{className:"action_btns",children:[e.jsx(V,{width:"6.25em",variant:"secondary",children:"follow"}),e.jsx(V,{width:"6.25em",variant:"primary",children:"sponsor"})]})]})})]})}const ko=[{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(ve,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(ye,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(Ee,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ke,{size:"0.7em"}),url:"dicord.com/"}],score:5},{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(ve,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(ye,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(Ee,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ke,{size:"0.7em"}),url:"dicord.com/"}],score:4},{name:"NVIDIA",info:{country:"USA",verified:!0,badge:!0},socialLinks:[{name:"twitch",follwers:"120k",icon:e.jsx(xe,{size:"0.7em"}),url:"twitch.com/"},{name:"instagram",follwers:"120k",icon:e.jsx(ve,{size:"0.7em"}),url:"instagram.com/"},{name:"twitter",follwers:"120k",icon:e.jsx(ye,{size:"0.7em"}),url:"twitter.com/"},{name:"youtube",follwers:"120k",icon:e.jsx(ge,{size:"0.7em"}),url:"youtube.com/"},{name:"tiktok",follwers:"120k",icon:e.jsx(Ee,{size:"0.7em"}),url:"youtube.com/"},{name:"discord",follwers:"120k",icon:e.jsx(ke,{size:"0.7em"}),url:"dicord.com/"}],score:6}];function No(){const s=o=>{let r=o==null?void 0:o.reduce((n,i)=>n+parseInt(i.follwers),0);return e.jsxs(N,{children:[e.jsxs(u,{children:[r,"K"]}),e.jsx(N,{gap:"sm",children:o==null?void 0:o.map(({name:n,icon:i})=>i&&e.jsx("div",{children:i},n))})]})},t=ko.map(({name:o,info:r,socialLinks:n,score:i})=>e.jsxs(b.Tr,{children:[e.jsx(b.Td,{children:o}),e.jsx(b.Td,{children:e.jsxs(N,{children:[e.jsx(u,{children:r.country}),r.verified&&e.jsx(ae,{}),r.badge&&e.jsx(le,{})]})}),e.jsx(b.Td,{children:s(n)}),e.jsx(b.Td,{children:e.jsx(ce,{number:i})}),e.jsx(b.Td,{children:e.jsxs(N,{children:[e.jsx(Ze,{color:"secondary",size:"sm",variant:"filled",radius:"md",children:e.jsx(Jt,{})}),e.jsx(Ze,{color:"primary",size:"sm",variant:"filled",radius:"md",children:e.jsx(mo,{})})]})})]},o));return e.jsx(b.ScrollContainer,{children:e.jsxs(b,{withColumnBorders:!0,horizontalSpacing:"md",children:[e.jsx(b.Thead,{children:e.jsxs(b.Tr,{children:[e.jsx(b.Th,{children:"NAME"}),e.jsx(b.Th,{children:"INFO"}),e.jsx(b.Th,{children:"GAMEIN FOLLOWERS"}),e.jsx(b.Th,{children:"G-SCORE"}),e.jsx(b.Th,{children:"INTERACT"})]})}),e.jsx(b.Tbody,{children:t})]})})}const ts={creator:{name:"CREATORS",icon:e.jsx(it,{size:"1.5em"}),coverImage:ho},brand:{name:"BRANDS",icon:e.jsx(nt,{size:"1.5em"}),coverImage:fo}},Ie={search_input:"",teams:"",game:"",country:"",gamein_partner:"",followers:"",level:"",sortBy:"",ai_matchmaking:"",verification:""},zo=[{name:"search_input",className:"input-wrapper",variant:"secondaryGrey",label:"",placeholder:"type here",rightSection:e.jsx(ao,{size:"1em"}),component:ps,componentType:""},{name:"teams",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["type(orga,teams)","Angular","Vue"]},{name:"game",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["game","Angular","Vue"]},{name:"country",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["country","Angular","Vue"]},{name:"gamein_partner",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["gamein partner","Angular","Vue"]},{name:"followers",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["followers","Angular","Vue"]},{name:"level",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["level","Angular","Vue"]},{name:"sortBy",className:"input-wrapper",variant:"secondaryGrey",label:"",rightSection:e.jsx(W,{size:"1em"}),component:G,componentType:"",options:["sort by","Angular","Vue"]}],os=[{text:"Twitch",icon:e.jsx(xe,{size:f.spacing.xs}),followers:"35K",color:"primary"},{text:"Instagram",icon:e.jsx(ve,{size:f.spacing.xs}),followers:"35K",color:"primary"},{text:"Twitter",icon:e.jsx(ye,{size:f.spacing.xs}),followers:"35K",color:"skyblue"},{text:"Youtube",icon:e.jsx(ge,{size:f.spacing.xs}),followers:"35K",color:"skyblue"},{text:"Tiktok",icon:e.jsx(ro,{size:f.spacing.xs}),followers:"35K",color:"secondary"},{text:"Discord",icon:e.jsx(ke,{size:f.spacing.xs}),followers:"35K",color:"secondary"}],So={list:e.jsx(jo,{SocialInfo:os}),grid:e.jsx(wo,{SocialInfo:os}),table:e.jsx(No,{})};function ir(){const{userType:s}=Ps(),[t,o]=p.useState({}),[r,n]=p.useState("list"),{control:i}=st({defaultValues:Ie});if(p.useEffect(()=>{(s==null?void 0:s.toLowerCase())==="creators"?o(ts.creator):o(ts.brand)},[o,s]),!((s==null?void 0:s.toLowerCase())!=="brands"&&(s==null?void 0:s.toLowerCase())!=="creators"))return t&&e.jsxs(xo,{children:[e.jsx(Ms,{icon:t==null?void 0:t.icon,text:t==null?void 0:t.name}),e.jsx(Is,{coverImage:t.coverImage,size:"auto"}),e.jsx("form",{children:e.jsxs(N,{justify:"space-between",children:[e.jsx(N,{className:"forms-fields",children:zo.map(({name:a,className:m,variant:c,label:d,placeholder:l,rightSection:h,component:y,componentType:v,options:x})=>e.jsx(Pe,{name:a,control:i,Component:y,componentProps:{label:d,className:m,variant:c,rightSection:h,...v&&{componentType:v},...l&&{placeholder:l},...x&&{data:x}}},a))}),e.jsxs(N,{className:"switch-buttons",justify:"space-between",children:[e.jsx(Pe,{name:Ie.ai_matchmaking,control:i,Component:ss,componentProps:{name:"ai_matchmaking",label:"ai matchmaking"}}),e.jsx(Pe,{name:Ie.verification,control:i,Component:ss,componentProps:{name:"verification",label:"verification"}})]}),e.jsxs(N,{className:"pagination",justify:"space-between",children:[e.jsx(vo,{size:"sm",viewMode:r,setViewMode:n}),e.jsx(yo,{size:"sm"})]}),e.jsx(N,{flex:"0 0 100%",justify:"end",children:e.jsx(V,{variant:"primary",type:"submit",children:"Search"})})]})}),e.jsx(u,{children:"RESULTS"}),e.jsx(De,{my:"sm",variant:"dashed",color:"white"}),r&&So[r]]})}export{ir as default};
