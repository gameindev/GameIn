import{d as b,j as o,t as g}from"./index-KaOkpbgD.js";import{H as $}from"./HexContainer-L0QzlbD2.js";import{R as y}from"./modal-B79DAsnm.js";import{E as A}from"./EditAvator-tQLEa9Pg.js";const M=({mainRadius:e=30,roundingRadius:t=10,rotated:n=!1,precision:s=20}={})=>{const x=60/s,h=e+t,a=i=>i*Math.PI/180,p=[];for(let i=0;i<6;i++){const r=i*60+(n?-90:0),u=50+h*Math.cos(a(r)),f=50+h*Math.sin(a(r));for(let c=0;c<=s;c++){const m=r+(c-s/2)*x,j=u+t*Math.cos(a(m)),v=f+t*Math.sin(a(m));p.push(`${j}% ${v}%`)}}return`polygon(${p.join(", ")})`},k=b.div`
  display: inline-block;
  width: ${({size:e="20em"})=>e};
  height: ${({size:e="20em"})=>e};
  background: ${({$backgroundColor:e="teal",imageUrl:t})=>t?`url(${t}) center/cover no-repeat`:e};
  clip-path: ${({$mainRadius:e,$roundingRadius:t,$rotated:n,$precision:s})=>M({mainRadius:e,roundingRadius:t,rotated:n,precision:s})};
  border: ${({$border:e="0.063em solid transparent"})=>e};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`,E=({avatar:e,size:t,radius:n,controls:s=!1,className:l=""})=>o.jsxs("div",{className:l,children:[o.jsx($,{size:t,radius:n,background:g.colors.inputBgColor[0],children:e?o.jsx("img",{src:e,alt:"Avatar"}):o.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:g.colors.white[0]},children:"No Avatar"})}),s&&o.jsx("div",{className:"action",children:o.jsx(y,{title:"Update Profile Picture",children:({close:d})=>o.jsx(A,{type:"avatar",close:d})})})]});export{E as A,k as H};
