import{h as $,j as x,t as j}from"./index-CjX4y3jd.js";import"./HexContainer-QAxbGUEH.js";function b(r,t){let o=r;for(;(o=o.parentElement)&&!o.matches(t););return o}function I(r,t,o){for(let e=r-1;e>=0;e-=1)if(!t[e].disabled)return e;if(o){for(let e=t.length-1;e>-1;e-=1)if(!t[e].disabled)return e}return r}function P(r,t,o){for(let e=r+1;e<t.length;e+=1)if(!t[e].disabled)return e;if(o){for(let e=0;e<t.length;e+=1)if(!t[e].disabled)return e}return r}function w(r,t,o){return b(r,o)===b(t,o)}function S({parentSelector:r,siblingSelector:t,onKeyDown:o,loop:e=!0,activateOnFocus:u=!1,dir:h="rtl",orientation:f}){return s=>{var g;o==null||o(s);const a=Array.from(((g=b(s.currentTarget,r))==null?void 0:g.querySelectorAll(t))||[]).filter(i=>w(s.currentTarget,i,r)),c=a.findIndex(i=>s.currentTarget===i),l=P(c,a,e),n=I(c,a,e),d=h==="rtl"?n:l,p=h==="rtl"?l:n;switch(s.key){case"ArrowRight":{f==="horizontal"&&(s.stopPropagation(),s.preventDefault(),a[d].focus(),u&&a[d].click());break}case"ArrowLeft":{f==="horizontal"&&(s.stopPropagation(),s.preventDefault(),a[p].focus(),u&&a[p].click());break}case"ArrowUp":{f==="vertical"&&(s.stopPropagation(),s.preventDefault(),a[n].focus(),u&&a[n].click());break}case"ArrowDown":{f==="vertical"&&(s.stopPropagation(),s.preventDefault(),a[l].focus(),u&&a[l].click());break}case"Home":{s.stopPropagation(),s.preventDefault(),!a[0].disabled&&a[0].focus();break}case"End":{s.stopPropagation(),s.preventDefault();const i=a.length-1;!a[i].disabled&&a[i].focus();break}}}}const T=""+new URL("creator_image-DN7rJn_7.jpg",import.meta.url).href,R=({mainRadius:r=30,roundingRadius:t=10,rotated:o=!1,precision:e=20}={})=>{const s=60/e,a=r+t,c=n=>n*Math.PI/180,l=[];for(let n=0;n<6;n++){const d=n*60+(o?-90:0),p=50+a*Math.cos(c(d)),g=50+a*Math.sin(c(d));for(let i=0;i<=e;i++){const m=d+(i-e/2)*s,k=p+t*Math.cos(c(m)),A=g+t*Math.sin(c(m));l.push(`${k}% ${A}%`)}}return`polygon(${l.join(", ")})`},C=$.div`
  display: inline-block;
  width: ${({size:r="20em"})=>r};
  height: ${({size:r="20em"})=>r};
  background: ${({$backgroundColor:r="teal",imageUrl:t})=>t?`url(${t}) center/cover no-repeat`:r};
  clip-path: ${({$mainRadius:r,$roundingRadius:t,$rotated:o,$precision:e})=>R({mainRadius:r,roundingRadius:t,rotated:o,precision:e})};
  border: ${({$border:r="0.063rem solid transparent"})=>r};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    border: inherit;
  }
`,_=({avatar:r,size:t,className:o=""})=>x.jsx("div",{className:o,children:x.jsx(C,{$mainRadius:10,$roundingRadius:15,size:t,$backgroundColor:j.colors.inputBgColor[0],$rotated:!0,children:x.jsx("img",{src:r,alt:"Avatar"})})}),v=r=>{var t,o;return(o=(t=r.user)==null?void 0:t.profile)==null?void 0:o.user},y=r=>{var t;return!!((t=r.auth)!=null&&t.accessToken)};export{_ as A,C as H,T as a,S as c,b as f,y as i,v as s};
