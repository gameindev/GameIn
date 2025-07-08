import{d as j,j as o,t as b}from"./index-D9oEtHeb.js";import{H as $}from"./HexContainer-zsQTPXMB.js";import{R as A}from"./modal-DkAunJW6.js";import{E as M}from"./EditAvator-RNBpw3lh.js";const y=({mainRadius:t=30,roundingRadius:e=10,rotated:n=!1,precision:s=20}={})=>{const g=60/s,p=t+e,i=a=>a*Math.PI/180,h=[];for(let a=0;a<6;a++){const r=a*60+(n?-90:0),x=50+p*Math.cos(i(r)),u=50+p*Math.sin(i(r));for(let c=0;c<=s;c++){const m=r+(c-s/2)*g,v=x+e*Math.cos(i(m)),f=u+e*Math.sin(i(m));h.push(`${v}% ${f}%`)}}return`polygon(${h.join(", ")})`},E=j.div`
  display: inline-block;
  width: ${({size:t="20em"})=>t};
  height: ${({size:t="20em"})=>t};
  background: ${({$backgroundColor:t="teal",imageUrl:e})=>e?`url(${e}) center/cover no-repeat`:t};
  clip-path: ${({$mainRadius:t,$roundingRadius:e,$rotated:n,$precision:s})=>y({mainRadius:t,roundingRadius:e,rotated:n,precision:s})};
  border: ${({$border:t="0.063em solid transparent"})=>t};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`,P=({avatar:t,size:e,radius:n,controls:s=!1,className:l=""})=>o.jsxs("div",{className:l,children:[o.jsx($,{size:e,radius:n,background:b.colors.inputBgColor[0],children:o.jsx("img",{src:t,alt:"Avatar"})}),s&&o.jsx("div",{className:"action",children:o.jsx(A,{title:"Update Profile Picture",children:({close:d})=>o.jsx(M,{type:"avatar",close:d})})})]});export{P as A,E as H};
