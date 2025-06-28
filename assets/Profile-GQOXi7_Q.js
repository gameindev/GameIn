import{f as A,u as _,g as $,j as e,B as E,v as F,x as G,r as g,t as x,d as y,a as b,i as z,l as W,L as I,m as v,ab as P}from"./index-BP5I_U89.js";import{G as u,S as h}from"./StatBox-CCnFoPTL.js";import{I as p}from"./IconButton-DI2hAM0x.js";import{c as M}from"./selectors-BfVctv7J.js";import{S as Q}from"./Stack-CDZGMFlh.js";import{T as f}from"./Text-x9c1eFgR.js";import{F as k}from"./Flex-DY_EVV9e.js";import{I as D}from"./Image-B0KUzfd5.js";import{B as H}from"./Button-BqnFXR5e.js";import"./ActionIcon-B-d1yO3M.js";import"./chevron-up-CnRIpKsS.js";import"./createLucideIcon-woCjupzC.js";import"./chevron-down-BBZzOKsV.js";import"./get-style-object-DUJZA7T_.js";var L={root:"m_18320242","skeleton-fade":"m_299c329c"};const q={visible:!0,animate:!0},J=F((c,{width:r,height:a,radius:l,circle:i})=>({root:{"--skeleton-height":g(a),"--skeleton-width":i?g(a):g(r),"--skeleton-radius":i?"1000px":l===void 0?void 0:G(l)}})),S=A((c,r)=>{const a=_("Skeleton",q,c),{classNames:l,className:i,style:t,styles:d,unstyled:n,vars:m,width:C,height:s,circle:o,visible:j,radius:B,animate:N,mod:O,...T}=a,V=$({name:"Skeleton",classes:L,props:a,className:i,style:t,classNames:l,styles:d,unstyled:n,vars:m,varsResolver:J});return e.jsx(E,{ref:r,...V("root"),mod:[{visible:j,animate:N},O],...T})});S.classes=L;S.displayName="@mantine/core/Skeleton";const w=y.div`
  width: 100%;
  height: 11em;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: ${x.radius.md};
`,R=y.div`
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
`,U=y.div`
  iframe,
  video {
    border-radius: ${x.radius.md};
    width: 100%;
    height: 11em;
    object-fit: cover;
  }
`;function K({videoUrl:c,videoFile:r}){const[a,l]=b.useState(!1),[i,t]=b.useState(null),n=(s=>{try{const o=new URL(s);if(o.hostname==="youtu.be")return o.pathname.slice(1);if(o.hostname.includes("youtube.com"))return o.searchParams.get("v")}catch{return null}})(c),m=n?`https://www.youtube.com/embed/${n}`:null,C=n&&`https://img.youtube.com/vi/${n}/0.jpg`;return b.useEffect(()=>{if(r){const s=document.createElement("video");s.src=URL.createObjectURL(r),s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0;const o=document.createElement("canvas"),j=()=>{s.currentTime=.5,s.onseeked=()=>{o.width=s.videoWidth,o.height=s.videoHeight,o.getContext("2d").drawImage(s,0,0,o.width,o.height),t(o.toDataURL("image/jpeg"))}};return s.addEventListener("loadeddata",j),()=>{s.removeEventListener("loadeddata",j)}}},[r]),!r&&!c&&!n?e.jsx(w,{children:"No Video Found"}):r?a?e.jsx(U,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(r),poster:i})}):e.jsx(w,{onClick:()=>l(!0),style:{backgroundImage:`url(${i})`},children:e.jsx(R,{children:"▶"})}):c&&n?a?e.jsx(U,{children:e.jsx("iframe",{src:m,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(w,{onClick:()=>l(!0),style:{backgroundImage:`url(${C})`},children:e.jsx(R,{children:"▶"})}):null}function me(){const c=z(),{user:r}=W(M),{userBio:{bio:a,videoBioUrl:l,preferredGames:i=[]}={}}=r||{};return e.jsxs(u,{gutter:20,children:[e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Profile Bio",action:e.jsx(p,{onClick:()=>c(v.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(E,{p:20,children:e.jsxs(Q,{spacing:"md",children:[e.jsx(K,{videoUrl:l,videoFile:null}),e.jsx(f,{children:a||"No bio added"}),e.jsxs(k,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(f,{fw:600,tt:"uppercase",fz:x.fontSizes.sm,children:"Preferred Games:"}),e.jsxs(k,{gap:"md",children:[i.map((t,d)=>{var n,m;return e.jsx(k,{align:"center",gap:8,children:e.jsx(I,{target:"_blank",to:t==null?void 0:t.gameUrl,children:e.jsx(D,{w:32,h:32,src:(n=t==null?void 0:t.metadata)==null?void 0:n.favicon,alt:((m=t==null?void 0:t.metadata)==null?void 0:m.title)||"favicon",width:32,height:32})})},d)}),Array.from({length:4-i.length}).map((t,d)=>e.jsx(S,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${d}`))]})]})]})})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:8},children:e.jsx(h,{title:"Social Media Stats",action:e.jsx(p,{}),children:e.jsx(f,{children:"Coming soon..."})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"FAQ",action:e.jsx(p,{onClick:()=>c(v.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Welcome to Game-In",background:P(x.colors.secondary[0],.5),action:e.jsx(p,{}),children:e.jsx(f,{children:"Stat"})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Sponsorships",background:P(x.colors.primary[0],.3),action:e.jsx(p,{}),children:e.jsx("div",{className:"create_team",children:e.jsx(I,{to:v.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(H,{children:"Create Team"})})})})})]})}export{me as default};
