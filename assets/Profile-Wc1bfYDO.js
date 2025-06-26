import{f as _,u as $,g as F,j as e,B as U,v as z,x as G,r as b,t as j,d as S,a as v,i as W,l as C,L as P,m as k,ab as R}from"./index-C-4AFNO7.js";import{G as m,S as p}from"./StatBox-BYq5nTLU.js";import{I as x}from"./IconButton-BgxEkDQX.js";import{c as M}from"./selectors-BfVctv7J.js";import{S as Q}from"./Stack-cHEUxKAk.js";import{T as g}from"./Text-Bpvfj0Xl.js";import{F as w}from"./Flex-CQgSZ6gU.js";import{I as D}from"./Image-B2O5Zm9s.js";import{B as H}from"./Button-BR3F4-qk.js";import"./ActionIcon-CN4WoK2w.js";import"./chevron-up-DtJG9RYt.js";import"./createLucideIcon-CFEEk01s.js";import"./chevron-down-GNjr-X4T.js";import"./get-style-object-DUJZA7T_.js";var V={root:"m_18320242","skeleton-fade":"m_299c329c"};const q={visible:!0,animate:!0},J=z((n,{width:s,height:a,radius:c,circle:l})=>({root:{"--skeleton-height":b(a),"--skeleton-width":l?b(a):b(s),"--skeleton-radius":l?"1000px":c===void 0?void 0:G(c)}})),I=_((n,s)=>{const a=$("Skeleton",q,n),{classNames:c,className:l,style:i,styles:u,unstyled:t,vars:d,width:h,height:r,circle:o,visible:f,radius:B,animate:N,mod:O,...T}=a,A=F({name:"Skeleton",classes:V,props:a,className:l,style:i,classNames:c,styles:u,unstyled:t,vars:d,varsResolver:J});return e.jsx(U,{ref:s,...A("root"),mod:[{visible:f,animate:N},O],...T})});I.classes=V;I.displayName="@mantine/core/Skeleton";const y=S.div`
  width: 100%;
  height: 11em;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: ${j.radius.md};
`,E=S.div`
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
`,L=S.div`
  iframe,
  video {
    border-radius: ${j.radius.md};
    width: 100%;
    height: 11em;
    object-fit: cover;
  }
`;function K({videoUrl:n,videoFile:s}){const[a,c]=v.useState(!1),[l,i]=v.useState(null),t=(r=>{try{const o=new URL(r);if(o.hostname==="youtu.be")return o.pathname.slice(1);if(o.hostname.includes("youtube.com"))return o.searchParams.get("v")}catch{return null}})(n),d=t?`https://www.youtube.com/embed/${t}`:null,h=t&&`https://img.youtube.com/vi/${t}/0.jpg`;return v.useEffect(()=>{if(s){const r=document.createElement("video");r.src=URL.createObjectURL(s),r.crossOrigin="anonymous",r.muted=!0,r.playsInline=!0;const o=document.createElement("canvas"),f=()=>{r.currentTime=.5,r.onseeked=()=>{o.width=r.videoWidth,o.height=r.videoHeight,o.getContext("2d").drawImage(r,0,0,o.width,o.height),i(o.toDataURL("image/jpeg"))}};return r.addEventListener("loadeddata",f),()=>{r.removeEventListener("loadeddata",f)}}},[s]),!s&&!n&&!t?e.jsx(y,{children:"No Video Found"}):s?a?e.jsx(L,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(s),poster:l})}):e.jsx(y,{onClick:()=>c(!0),style:{backgroundImage:`url(${l})`},children:e.jsx(E,{children:"▶"})}):n&&t?a?e.jsx(L,{children:e.jsx("iframe",{src:d,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(y,{onClick:()=>c(!0),style:{backgroundImage:`url(${h})`},children:e.jsx(E,{children:"▶"})}):null}function me(){var u;const n=W(),{user:s}=C(M),{bio:a,introVideoUrl:c,introVideoFile:l,gamesUrl:i}=C(t=>t.bio);return e.jsxs(m,{gutter:20,children:[e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Profile Bio",action:e.jsx(x,{onClick:()=>n(k.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(U,{p:20,children:e.jsxs(Q,{spacing:"md",children:[e.jsx(K,{videoUrl:c,videoFile:l}),e.jsx(g,{children:a||((u=s==null?void 0:s.userBio)==null?void 0:u.bio)||"No bio added"}),e.jsxs(w,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(g,{fw:600,tt:"uppercase",fz:j.fontSizes.sm,children:"Preferred Games:"}),e.jsxs(w,{gap:"md",children:[(i!=null&&i.length?i.filter(t=>t.favorite):[]).map((t,d)=>{var h;return e.jsx(w,{align:"center",gap:8,children:e.jsx(P,{target:"_blank",to:t==null?void 0:t.url,children:e.jsx(D,{w:32,h:32,src:(h=t.favicon)==null?void 0:h.url,alt:"favicon",width:32,height:32})})},d)}),Array.from({length:4-((i==null?void 0:i.filter(t=>t.favorite).length)||0)}).map((t,d)=>e.jsx(I,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${d}`))]})]})]})})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:8},children:e.jsx(p,{title:"Social Media Stats",action:e.jsx(x,{}),children:e.jsx(g,{})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"FAQ",action:e.jsx(x,{onClick:()=>n(k.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Welcome to Game-In",background:R(j.colors.secondary[0],.5),action:e.jsx(x,{}),children:e.jsx(g,{children:"Stat"})})}),e.jsx(m.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Sponsorships",background:R(j.colors.primary[0],.3),action:e.jsx(x,{}),children:e.jsx("div",{className:"create_team",children:e.jsx(P,{to:k.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(H,{children:"Create Team"})})})})})]})}export{me as default};
