import{f as A,u as $,g as F,j as e,B as L,E as G,G as z,X as b,t as f,d as S,r as v,k as W,at as M,T as d,an as u,ao as p,F as k,L as I,ap as j,q as w,au as P,s as Q}from"./index-Ddh2FbSx.js";import{S as q}from"./Stack-DQps_MKj.js";import{I as D}from"./Image-DoFcPglF.js";var R={root:"m_18320242","skeleton-fade":"m_299c329c"};const H={visible:!0,animate:!0},X=G((n,{width:r,height:o,radius:i,circle:c})=>({root:{"--skeleton-height":b(o),"--skeleton-width":c?b(o):b(r),"--skeleton-radius":c?"1000px":i===void 0?void 0:z(i)}})),C=A((n,r)=>{const o=$("Skeleton",H,n),{classNames:i,className:c,style:h,styles:m,unstyled:t,vars:l,width:x,height:s,circle:a,visible:g,radius:U,animate:N,mod:O,attributes:B,...T}=o,V=F({name:"Skeleton",classes:R,props:o,className:c,style:h,classNames:i,styles:m,unstyled:t,attributes:B,vars:l,varsResolver:X});return e.jsx(L,{ref:r,...V("root"),mod:[{visible:g,animate:N},O],...T})});C.classes=R;C.displayName="@mantine/core/Skeleton";const y=S.div`
  width: 100%;
  height: 11em;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
  border-radius: ${f.radius.md};
`,_=S.div`
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
`,E=S.div`
  iframe,
  video {
    border-radius: ${f.radius.md};
    width: 100%;
    height: 11em;
    object-fit: cover;
  }
`;function J({videoUrl:n,videoFile:r}){const[o,i]=v.useState(!1),[c,h]=v.useState(null),t=(s=>{try{const a=new URL(s);if(a.hostname==="youtu.be")return a.pathname.slice(1);if(a.hostname.includes("youtube.com"))return a.searchParams.get("v")}catch{return null}})(n),l=t?`https://www.youtube.com/embed/${t}`:null,x=t&&`https://img.youtube.com/vi/${t}/0.jpg`;return v.useEffect(()=>{if(r){const s=document.createElement("video");s.src=URL.createObjectURL(r),s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0;const a=document.createElement("canvas"),g=()=>{s.currentTime=.5,s.onseeked=()=>{a.width=s.videoWidth,a.height=s.videoHeight,a.getContext("2d").drawImage(s,0,0,a.width,a.height),h(a.toDataURL("image/jpeg"))}};return s.addEventListener("loadeddata",g),()=>{s.removeEventListener("loadeddata",g)}}},[r]),!r&&!n&&!t?e.jsx(y,{children:"No Video Found"}):r?o?e.jsx(E,{children:e.jsx("video",{controls:!0,src:URL.createObjectURL(r),poster:c})}):e.jsx(y,{onClick:()=>i(!0),style:{backgroundImage:`url(${c})`},children:e.jsx(_,{children:"▶"})}):n&&t?o?e.jsx(E,{children:e.jsx("iframe",{src:l,title:"Intro Video",allowFullScreen:!0,frameBorder:"0"})}):e.jsx(y,{onClick:()=>i(!0),style:{backgroundImage:`url(${x})`},children:e.jsx(_,{children:"▶"})}):null}function ee(){const n=W(),{userProfile:r,isSelf:o}=M();if(console.log(r,o),!r)return e.jsx(d,{children:"Loading profile..."});const i=r.user_bio||{},{bio:c,video_bio_url:h,preferred_games:m=[]}=i;return e.jsxs(u,{gutter:20,children:[e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Profile Bio",action:o&&e.jsx(j,{onClick:()=>n(w.ACCOUNTS.PROFILE.BIO)}),children:e.jsx(L,{p:20,children:e.jsxs(q,{spacing:"md",children:[e.jsx(J,{videoUrl:h,videoFile:null}),e.jsx(d,{children:c||"No bio added yet."}),e.jsxs(k,{wrap:"wrap",gap:"md",align:"center",justify:"space-between",children:[e.jsx(d,{fw:600,tt:"uppercase",fz:f.fontSizes.sm,children:"Preferred Games:"}),e.jsxs(k,{gap:"md",children:[m.slice(0,4).map((t,l)=>{var x,s;return e.jsx(k,{align:"center",gap:8,children:e.jsx(I,{target:"_blank",to:t==null?void 0:t.game_url,children:e.jsx(D,{w:32,h:32,src:(x=t==null?void 0:t.meta_data)==null?void 0:x.favicon,alt:((s=t==null?void 0:t.meta_data)==null?void 0:s.title)||"favicon",width:32,height:32})})},l)}),Array.from({length:Math.max(0,4-m.length)}).map((t,l)=>e.jsx(C,{animate:!1,width:32,height:32,radius:"sm"},`skeleton-${l}`))]})]})]})})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:8},children:e.jsx(p,{title:"Social Media Stats",action:e.jsx(j,{}),children:e.jsx(d,{children:"Coming soon..."})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"FAQ",action:o&&e.jsx(j,{onClick:()=>n(w.ACCOUNTS.PROFILE.FAQ)})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Welcome to Game-In",background:P(f.colors.secondary[0],.5),action:e.jsx(j,{}),children:e.jsx(d,{children:"Stat"})})}),e.jsx(u.Col,{span:{base:12,md:6,lg:4},children:e.jsx(p,{title:"Sponsorships",background:P(f.colors.primary[0],.3),action:e.jsx(j,{}),children:o?e.jsx("div",{className:"create_team",children:e.jsx(I,{to:w.ACCOUNTS.PROFILE.CREATE_TEAM,children:e.jsx(Q,{children:"Create Team"})})}):e.jsx(d,{children:"No team management available"})})})]})}export{ee as default};
