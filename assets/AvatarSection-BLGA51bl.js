import{d as $,j as o,t as j}from"./index-C-4AFNO7.js";import"./HexContainer-Ccq6LLuc.js";import{R as f}from"./modal-h5yuvtaI.js";import{E as b}from"./EditAvator-B4wwl5Wv.js";const A=({mainRadius:t=30,roundingRadius:e=10,rotated:a=!1,precision:s=20}={})=>{const m=60/s,l=t+e,i=n=>n*Math.PI/180,p=[];for(let n=0;n<6;n++){const r=n*60+(a?-90:0),g=50+l*Math.cos(i(r)),u=50+l*Math.sin(i(r));for(let c=0;c<=s;c++){const h=r+(c-s/2)*m,x=g+e*Math.cos(i(h)),v=u+e*Math.sin(i(h));p.push(`${x}% ${v}%`)}}return`polygon(${p.join(", ")})`},R=$.div`
  display: inline-block;
  width: ${({size:t="20em"})=>t};
  height: ${({size:t="20em"})=>t};
  background: ${({$backgroundColor:t="teal",imageUrl:e})=>e?`url(${e}) center/cover no-repeat`:t};
  clip-path: ${({$mainRadius:t,$roundingRadius:e,$rotated:a,$precision:s})=>A({mainRadius:t,roundingRadius:e,rotated:a,precision:s})};
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
`,H=({avatar:t,size:e,controls:a=!1,className:s=""})=>o.jsxs("div",{className:s,children:[o.jsx(R,{$mainRadius:10,$roundingRadius:15,size:e,$backgroundColor:j.colors.inputBgColor[0],$rotated:!0,children:o.jsx("img",{src:t,alt:"Avatar"})}),a&&o.jsx("div",{className:"action",children:o.jsx(f,{title:"Update Profile Picture",children:({close:d})=>o.jsx(b,{type:"avatar",close:d})})})]});export{H as A,R as H};
