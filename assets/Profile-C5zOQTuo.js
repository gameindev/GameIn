import{f as A,u as $,a as F,j as e,B as R,c as G,g as Y,b as v,x as j,k as y,r as b,l as z,af as W,L as I,s as w,ag as P}from"./index-C5_jzTTu.js";import{S as x}from"./StatBox-rDWrn2C4.js";import{I as f}from"./IconButton-D2tqVnSN.js";import{T as d}from"./Text-DsdgoVeg.js";import{G as m}from"./Grid-BcesIbwb.js";import{S as M}from"./Stack-BgBiURvo.js";import{F as k}from"./Flex-HE_Sn6Zi.js";import{I as Q}from"./Image-DLmm_XTy.js";import{B as D}from"./Button-DyMlzesk.js";import"./ActionIcon-Ix80DLbn.js";import"./Transition-COXhOSJn.js";import"./IconChevronUp-BaGWGmEF.js";import"./createReactComponent-sA3TK7Vs.js";import"./IconChevronDown-xwcck36b.js";import"./Collapse-DSHkuD_u.js";import"./get-style-object-DUJZA7T_.js";import"./create-safe-context-CIV-pmjS.js";var E={root:"m_18320242","skeleton-fade":"m_299c329c"};const H={visible:!0,animate:!0},q=G((i,{width:r,height:o,radius:n,circle:l})=>({root:{"--skeleton-height":v(o),"--skeleton-width":l?v(o):v(r),"--skeleton-radius":l?"1000px":n===void 0?void 0:Y(n)}})),S=A((i,r)=>{const o=$("Skeleton",H,i),{classNames:n,className:l,style:u,styles:h,unstyled:t,vars:c,width:p,height:s,circle:a,visible:g,radius:U,animate:N,mod:O,attributes:B,...T}=o,V=F({name:"Skeleton",classes:E,props:o,className:l,style:u,classNames:n,styles:h,unstyled:t,attributes:B,vars:c,varsResolver:q});return e.jsx(R,{ref:r,...V("root"),mod:[{visible:g,animate:N},O],...T})});S.classes=E;S.displayName="@mantine/core/Skeleton";const C=y.div`
  width: 100%;
  height: 11em;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: ${j.radius.md};
`,_=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 3em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5em;
`,L=y.div`
  iframe,
  video {
    border-radius: ${j.radius.md};
    width: 100%;
    height: 11em;
    object-fit: cover;
  }
`;function J({videoUrl:i,videoFile:r}){const[o,n]=b.useState(!1),[l,u]=b.useState(null),t=(s=>{try{const a=new URL(s);if(a.hostname==="youtu.be")return a.pathname.slice(1);if(a.hostname.includes("youtube.com"))return a.searchParams.get("v")}catch{return null}})(i),c=t?`https://www.youtube.com/embed/${t}`:null,p=t&&`https://img.youtube.com/vi/${t}/0.jpg`;return b.useEffect(()=>{if(r){const s=document.createElement("video");s.src=URL.createObjectURL(r),s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0;const a=document.createElement("canvas"),g=()=>{s.currentTime=.5,s.onseeked=()=>{a.width=s.videoWidth,a.height=s.videoHeight,a.getContext("2d").drawImage(s,0,0,a.width,a.height),u(a.toDataURL("image/jpeg"))}};return s.addEventListener("loadeddata",g),()=>{s.removeEventListener("loadeddata",g)}}},[r]),!r&&!i&&!t?e.jsx(C,{children:"No Video Found"}):r?o?e.jsx(L,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(r),poster:l})}):e.jsx(C,{onClick:()=>n(!0),style:{backgroundImage:`url(${l})`},children:e.jsx(_,{children:"▶"})}):i&&t?o?e.jsx(L,{children:e.jsx("iframe",{src:c,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(C,{onClick:()=>n(!0),style:{backgroundImage:`url(${p})`},children:e.jsx(_,{children:"▶"})}):null}function pe(){const i=z(),{userProfile:r,isSelf:o}=W();if(!r)return e.jsx(d,{children:"Loading profile..."});const n=r.user_bio||{},{bio:l,video_bio_url:u,preferred_games:h=[]}=n;return e.jsxs(m,{gutter:20,children:[e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Profile Bio",action:o&&e.jsx(f,{hoverClass:"hoverYellow",onClick:()=>i(w.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(R,{p:20,children:e.jsxs(M,{spacing:"md",children:[e.jsx(J,{videoUrl:u,videoFile:null}),e.jsx(d,{children:l||"No bio added yet."}),e.jsxs(k,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(d,{fw:600,tt:"uppercase",fz:j.fontSizes.sm,children:"Preferred Games:"}),e.jsxs(k,{gap:"md",children:[h.slice(0,4).map((t,c)=>{var p,s;return e.jsx(k,{align:"center",gap:8,children:e.jsx(I,{target:"_blank",to:t==null?void 0:t.game_url,children:e.jsx(Q,{w:32,h:32,src:(p=t==null?void 0:t.meta_data)==null?void 0:p.favicon,alt:((s=t==null?void 0:t.meta_data)==null?void 0:s.title)||"favicon",width:32,height:32})})},c)}),Array.from({length:Math.max(0,4-h.length)}).map((t,c)=>e.jsx(S,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${c}`))]})]})]})})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:8},children:e.jsx(x,{title:"Social Media Stats",action:e.jsx(f,{hoverClass:"hoverYellow"}),children:e.jsx(d,{children:"Coming soon..."})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"FAQ",action:o&&e.jsx(f,{hoverClass:"hoverYellow",onClick:()=>i(w.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Welcome to Game-In",background:P(j.colors.secondary[0],.5),action:e.jsx(f,{hoverClass:"hoverYellow"}),children:e.jsx(d,{children:"Stat"})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Sponsorships",background:P(j.colors.primary[0],.3),action:e.jsx(f,{hoverClass:"hoverYellow"}),children:o?e.jsx("div",{className:"create_team",children:e.jsx(I,{to:w.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(D,{children:"Create Team"})})}):e.jsx(d,{children:"No team management available"})})})]})}export{pe as default};
