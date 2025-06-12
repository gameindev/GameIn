import{h as $,j as x,t as j}from"./index-CyJ1SQbb.js";import"./HexContainer-CwpIyzAD.js";function b(e,t){let s=e;for(;(s=s.parentElement)&&!s.matches(t););return s}function I(e,t,s){for(let r=e-1;r>=0;r-=1)if(!t[r].disabled)return r;if(s){for(let r=t.length-1;r>-1;r-=1)if(!t[r].disabled)return r}return e}function P(e,t,s){for(let r=e+1;r<t.length;r+=1)if(!t[r].disabled)return r;if(s){for(let r=0;r<t.length;r+=1)if(!t[r].disabled)return r}return e}function w(e,t,s){return b(e,s)===b(t,s)}function S({parentSelector:e,siblingSelector:t,onKeyDown:s,loop:r=!0,activateOnFocus:u=!1,dir:h="rtl",orientation:f}){return o=>{var g;s==null||s(o);const a=Array.from(((g=b(o.currentTarget,e))==null?void 0:g.querySelectorAll(t))||[]).filter(i=>w(o.currentTarget,i,e)),c=a.findIndex(i=>o.currentTarget===i),l=P(c,a,r),n=I(c,a,r),d=h==="rtl"?n:l,p=h==="rtl"?l:n;switch(o.key){case"ArrowRight":{f==="horizontal"&&(o.stopPropagation(),o.preventDefault(),a[d].focus(),u&&a[d].click());break}case"ArrowLeft":{f==="horizontal"&&(o.stopPropagation(),o.preventDefault(),a[p].focus(),u&&a[p].click());break}case"ArrowUp":{f==="vertical"&&(o.stopPropagation(),o.preventDefault(),a[n].focus(),u&&a[n].click());break}case"ArrowDown":{f==="vertical"&&(o.stopPropagation(),o.preventDefault(),a[l].focus(),u&&a[l].click());break}case"Home":{o.stopPropagation(),o.preventDefault(),!a[0].disabled&&a[0].focus();break}case"End":{o.stopPropagation(),o.preventDefault();const i=a.length-1;!a[i].disabled&&a[i].focus();break}}}}const T="/GameIn/assets/creator_image-DN7rJn_7.jpg",R=({mainRadius:e=30,roundingRadius:t=10,rotated:s=!1,precision:r=20}={})=>{const o=60/r,a=e+t,c=n=>n*Math.PI/180,l=[];for(let n=0;n<6;n++){const d=n*60+(s?-90:0),p=50+a*Math.cos(c(d)),g=50+a*Math.sin(c(d));for(let i=0;i<=r;i++){const m=d+(i-r/2)*o,k=p+t*Math.cos(c(m)),A=g+t*Math.sin(c(m));l.push(`${k}% ${A}%`)}}return`polygon(${l.join(", ")})`},C=$.div`
  display: inline-block;
  width: ${({size:e="20em"})=>e};
  height: ${({size:e="20em"})=>e};
  background: ${({$backgroundColor:e="teal",imageUrl:t})=>t?`url(${t}) center/cover no-repeat`:e};
  clip-path: ${({$mainRadius:e,$roundingRadius:t,$rotated:s,$precision:r})=>R({mainRadius:e,roundingRadius:t,rotated:s,precision:r})};
  border: ${({$border:e="0.063rem solid transparent"})=>e};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`,_=({avatar:e,size:t,className:s=""})=>x.jsx("div",{className:s,children:x.jsx(C,{$mainRadius:10,$roundingRadius:15,size:t,$backgroundColor:j.colors.inputBgColor[0],$rotated:!0,children:x.jsx("img",{src:e,alt:"Avatar"})})}),v=e=>{var t,s;return(s=(t=e.user)==null?void 0:t.profile)==null?void 0:s.user},y=e=>{var t;return!!((t=e.auth)!=null&&t.accessToken)};export{_ as A,C as H,T as a,S as c,b as f,y as i,v as s};
