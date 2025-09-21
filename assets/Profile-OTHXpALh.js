import{f as A,u as $,e as F,j as e,B as R,v as G,w as Y,I as v,t as f,d as y,r as b,h as z,ac as W,L as I,l as w,ad as P}from"./index-KaOkpbgD.js";import{G as d,S as x}from"./StatBox-D1y6XCWs.js";import{I as j}from"./IconButton--YwSlTVi.js";import{T as u,B as M}from"./Button-ByjVlHKD.js";import{S as Q}from"./Stack-BKlG6h7b.js";import{F as C}from"./Flex-D1Ig9GjA.js";import{I as D}from"./Image-CERVtzaz.js";import"./create-safe-context-DyzOCSRN.js";import"./ActionIcon-BCOgBU3A.js";import"./IconChevronUp-D5ClwrcT.js";import"./createReactComponent-0rOQNGPo.js";import"./IconChevronDown-Df4Pu6as.js";import"./get-style-object-DUJZA7T_.js";var E={root:"m_18320242","skeleton-fade":"m_299c329c"};const H={visible:!0,animate:!0},q=G((i,{width:r,height:o,radius:n,circle:l})=>({root:{"--skeleton-height":v(o),"--skeleton-width":l?v(o):v(r),"--skeleton-radius":l?"1000px":n===void 0?void 0:Y(n)}})),S=A((i,r)=>{const o=$("Skeleton",H,i),{classNames:n,className:l,style:h,styles:m,unstyled:t,vars:c,width:p,height:s,circle:a,visible:g,radius:U,animate:N,mod:O,attributes:B,...T}=o,V=F({name:"Skeleton",classes:E,props:o,className:l,style:h,classNames:n,styles:m,unstyled:t,attributes:B,vars:c,varsResolver:q});return e.jsx(R,{ref:r,...V("root"),mod:[{visible:g,animate:N},O],...T})});S.classes=E;S.displayName="@mantine/core/Skeleton";const k=y.div`
  width: 100%;
  height: 11em;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: ${f.radius.md};
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
    border-radius: ${f.radius.md};
    width: 100%;
    height: 11em;
    object-fit: cover;
  }
`;function J({videoUrl:i,videoFile:r}){const[o,n]=b.useState(!1),[l,h]=b.useState(null),t=(s=>{try{const a=new URL(s);if(a.hostname==="youtu.be")return a.pathname.slice(1);if(a.hostname.includes("youtube.com"))return a.searchParams.get("v")}catch{return null}})(i),c=t?`https://www.youtube.com/embed/${t}`:null,p=t&&`https://img.youtube.com/vi/${t}/0.jpg`;return b.useEffect(()=>{if(r){const s=document.createElement("video");s.src=URL.createObjectURL(r),s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0;const a=document.createElement("canvas"),g=()=>{s.currentTime=.5,s.onseeked=()=>{a.width=s.videoWidth,a.height=s.videoHeight,a.getContext("2d").drawImage(s,0,0,a.width,a.height),h(a.toDataURL("image/jpeg"))}};return s.addEventListener("loadeddata",g),()=>{s.removeEventListener("loadeddata",g)}}},[r]),!r&&!i&&!t?e.jsx(k,{children:"No Video Found"}):r?o?e.jsx(L,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(r),poster:l})}):e.jsx(k,{onClick:()=>n(!0),style:{backgroundImage:`url(${l})`},children:e.jsx(_,{children:"▶"})}):i&&t?o?e.jsx(L,{children:e.jsx("iframe",{src:c,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(k,{onClick:()=>n(!0),style:{backgroundImage:`url(${p})`},children:e.jsx(_,{children:"▶"})}):null}function de(){const i=z(),{userProfile:r,isSelf:o}=W();if(console.log(r,o),!r)return e.jsx(u,{children:"Loading profile..."});const n=r.user_bio||{},{bio:l,video_bio_url:h,preferred_games:m=[]}=n;return e.jsxs(d,{gutter:20,children:[e.jsx(d.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Profile Bio",action:o&&e.jsx(j,{hoverClass:"hoverYellow",onClick:()=>i(w.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(R,{p:20,children:e.jsxs(Q,{spacing:"md",children:[e.jsx(J,{videoUrl:h,videoFile:null}),e.jsx(u,{children:l||"No bio added yet."}),e.jsxs(C,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(u,{fw:600,tt:"uppercase",fz:f.fontSizes.sm,children:"Preferred Games:"}),e.jsxs(C,{gap:"md",children:[m.slice(0,4).map((t,c)=>{var p,s;return e.jsx(C,{align:"center",gap:8,children:e.jsx(I,{target:"_blank",to:t==null?void 0:t.game_url,children:e.jsx(D,{w:32,h:32,src:(p=t==null?void 0:t.meta_data)==null?void 0:p.favicon,alt:((s=t==null?void 0:t.meta_data)==null?void 0:s.title)||"favicon",width:32,height:32})})},c)}),Array.from({length:Math.max(0,4-m.length)}).map((t,c)=>e.jsx(S,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${c}`))]})]})]})})})}),e.jsx(d.Col,{span:{base:12,md:6,lg:8},children:e.jsx(x,{title:"Social Media Stats",action:e.jsx(j,{hoverClass:"hoverYellow"}),children:e.jsx(u,{children:"Coming soon..."})})}),e.jsx(d.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"FAQ",action:o&&e.jsx(j,{hoverClass:"hoverYellow",onClick:()=>i(w.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(d.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Welcome to Game-In",background:P(f.colors.secondary[0],.5),action:e.jsx(j,{hoverClass:"hoverYellow"}),children:e.jsx(u,{children:"Stat"})})}),e.jsx(d.Col,{span:{base:12,md:6,lg:4},children:e.jsx(x,{title:"Sponsorships",background:P(f.colors.primary[0],.3),action:e.jsx(j,{hoverClass:"hoverYellow"}),children:o?e.jsx("div",{className:"create_team",children:e.jsx(I,{to:w.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(M,{children:"Create Team"})})}):e.jsx(u,{children:"No team management available"})})})]})}export{de as default};
