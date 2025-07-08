import{f as A,u as _,g as $,j as e,B as E,v as F,w as G,r as g,t as x,d as y,a as b,i as z,l as W,L as I,m as v,ab as P}from"./index-D9oEtHeb.js";import{G as u,S as h}from"./StatBox-CL0MrM3-.js";import{I as p}from"./IconButton-BvFDETZx.js";import{c as M}from"./selectors-BfVctv7J.js";import{S as Q}from"./Stack-CmwLihlq.js";import{T as f}from"./Text-8hgcObZb.js";import{F as w}from"./Flex-DaaNoCtx.js";import{I as D}from"./Image-DLpckFmT.js";import{B as H}from"./Button-DE9b1J-V.js";import"./create-safe-context-BzETH9ei.js";import"./ActionIcon-CBmGwXDV.js";import"./chevron-up-BMiZp4Kn.js";import"./createLucideIcon-K2Gk7huH.js";import"./chevron-down-iGnCWDjH.js";import"./get-style-object-DUJZA7T_.js";var L={root:"m_18320242","skeleton-fade":"m_299c329c"};const q={visible:!0,animate:!0},J=F((c,{width:r,height:a,radius:l,circle:n})=>({root:{"--skeleton-height":g(a),"--skeleton-width":n?g(a):g(r),"--skeleton-radius":n?"1000px":l===void 0?void 0:G(l)}})),S=A((c,r)=>{const a=_("Skeleton",q,c),{classNames:l,className:n,style:t,styles:d,unstyled:i,vars:m,width:C,height:s,circle:o,visible:j,radius:B,animate:N,mod:O,...T}=a,V=$({name:"Skeleton",classes:L,props:a,className:n,style:t,classNames:l,styles:d,unstyled:i,vars:m,varsResolver:J});return e.jsx(E,{ref:r,...V("root"),mod:[{visible:j,animate:N},O],...T})});S.classes=L;S.displayName="@mantine/core/Skeleton";const k=y.div`
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
`;function K({videoUrl:c,videoFile:r}){const[a,l]=b.useState(!1),[n,t]=b.useState(null),i=(s=>{try{const o=new URL(s);if(o.hostname==="youtu.be")return o.pathname.slice(1);if(o.hostname.includes("youtube.com"))return o.searchParams.get("v")}catch{return null}})(c),m=i?`https://www.youtube.com/embed/${i}`:null,C=i&&`https://img.youtube.com/vi/${i}/0.jpg`;return b.useEffect(()=>{if(r){const s=document.createElement("video");s.src=URL.createObjectURL(r),s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0;const o=document.createElement("canvas"),j=()=>{s.currentTime=.5,s.onseeked=()=>{o.width=s.videoWidth,o.height=s.videoHeight,o.getContext("2d").drawImage(s,0,0,o.width,o.height),t(o.toDataURL("image/jpeg"))}};return s.addEventListener("loadeddata",j),()=>{s.removeEventListener("loadeddata",j)}}},[r]),!r&&!c&&!i?e.jsx(k,{children:"No Video Found"}):r?a?e.jsx(U,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(r),poster:n})}):e.jsx(k,{onClick:()=>l(!0),style:{backgroundImage:`url(${n})`},children:e.jsx(R,{children:"▶"})}):c&&i?a?e.jsx(U,{children:e.jsx("iframe",{src:m,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(k,{onClick:()=>l(!0),style:{backgroundImage:`url(${C})`},children:e.jsx(R,{children:"▶"})}):null}function ue(){const c=z(),{user:r}=W(M),{userBio:{bio:a,videoBioUrl:l,preferredGames:n=[]}={}}=r||{};return e.jsxs(u,{gutter:20,children:[e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Profile Bio",action:e.jsx(p,{onClick:()=>c(v.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(E,{p:20,children:e.jsxs(Q,{spacing:"md",children:[e.jsx(K,{videoUrl:l,videoFile:null}),e.jsx(f,{children:a||"No bio added"}),e.jsxs(w,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(f,{fw:600,tt:"uppercase",fz:x.fontSizes.sm,children:"Preferred Games:"}),console.log(n),e.jsxs(w,{gap:"md",children:[n.map((t,d)=>{var i,m;return e.jsx(w,{align:"center",gap:8,children:e.jsx(I,{target:"_blank",to:t==null?void 0:t.gameUrl,children:e.jsx(D,{w:32,h:32,src:(i=t==null?void 0:t.metadata)==null?void 0:i.favicon,alt:((m=t==null?void 0:t.metadata)==null?void 0:m.title)||"favicon",width:32,height:32})})},d)}),Array.from({length:4-n.length}).map((t,d)=>e.jsx(S,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${d}`))]})]})]})})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:8},children:e.jsx(h,{title:"Social Media Stats",action:e.jsx(p,{}),children:e.jsx(f,{children:"Coming soon..."})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"FAQ",action:e.jsx(p,{onClick:()=>c(v.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Welcome to Game-In",background:P(x.colors.secondary[0],.5),action:e.jsx(p,{}),children:e.jsx(f,{children:"Stat"})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(h,{title:"Sponsorships",background:P(x.colors.primary[0],.3),action:e.jsx(p,{}),children:e.jsx("div",{className:"create_team",children:e.jsx(I,{to:v.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(H,{children:"Create Team"})})})})})]})}export{ue as default};
