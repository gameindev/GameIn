import{k as $,j as x,v as j}from"./index-CkKlCP49.js";function b(e,t){let o=e;for(;(o=o.parentElement)&&!o.matches(t););return o}function I(e,t,o){for(let r=e-1;r>=0;r-=1)if(!t[r].disabled)return r;if(o){for(let r=t.length-1;r>-1;r-=1)if(!t[r].disabled)return r}return e}function P(e,t,o){for(let r=e+1;r<t.length;r+=1)if(!t[r].disabled)return r;if(o){for(let r=0;r<t.length;r+=1)if(!t[r].disabled)return r}return e}function w(e,t,o){return b(e,o)===b(t,o)}function H({parentSelector:e,siblingSelector:t,onKeyDown:o,loop:r=!0,activateOnFocus:u=!1,dir:h="rtl",orientation:f}){return s=>{var g;o==null||o(s);const a=Array.from(((g=b(s.currentTarget,e))==null?void 0:g.querySelectorAll(t))||[]).filter(i=>w(s.currentTarget,i,e)),c=a.findIndex(i=>s.currentTarget===i),l=P(c,a,r),n=I(c,a,r),d=h==="rtl"?n:l,p=h==="rtl"?l:n;switch(s.key){case"ArrowRight":{f==="horizontal"&&(s.stopPropagation(),s.preventDefault(),a[d].focus(),u&&a[d].click());break}case"ArrowLeft":{f==="horizontal"&&(s.stopPropagation(),s.preventDefault(),a[p].focus(),u&&a[p].click());break}case"ArrowUp":{f==="vertical"&&(s.stopPropagation(),s.preventDefault(),a[n].focus(),u&&a[n].click());break}case"ArrowDown":{f==="vertical"&&(s.stopPropagation(),s.preventDefault(),a[l].focus(),u&&a[l].click());break}case"Home":{s.stopPropagation(),s.preventDefault(),!a[0].disabled&&a[0].focus();break}case"End":{s.stopPropagation(),s.preventDefault();const i=a.length-1;!a[i].disabled&&a[i].focus();break}}}}const R=({mainRadius:e=30,roundingRadius:t=10,rotated:o=!1,precision:r=20}={})=>{const s=60/r,a=e+t,c=n=>n*Math.PI/180,l=[];for(let n=0;n<6;n++){const d=n*60+(o?-90:0),p=50+a*Math.cos(c(d)),g=50+a*Math.sin(c(d));for(let i=0;i<=r;i++){const m=d+(i-r/2)*s,k=p+t*Math.cos(c(m)),A=g+t*Math.sin(c(m));l.push(`${k}% ${A}%`)}}return`polygon(${l.join(", ")})`},v=$.div`
  display: inline-block;
  width: ${({size:e="20em"})=>e};
  height: ${({size:e="20em"})=>e};
  background: ${({$backgroundColor:e="teal",imageUrl:t})=>t?`url(${t}) center/cover no-repeat`:e};
  clip-path: ${({$mainRadius:e,$roundingRadius:t,$rotated:o,$precision:r})=>R({mainRadius:e,roundingRadius:t,rotated:o,precision:r})};
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
`,M=({avatar:e,size:t,className:o=""})=>x.jsx("div",{className:o,children:x.jsx(v,{$mainRadius:10,$roundingRadius:15,size:t,$backgroundColor:j.colors.inputBgColor[0],$rotated:!0,children:x.jsx("img",{src:e,alt:"Avatar"})})}),S=""+new URL("creator_image-DN7rJn_7.jpg",import.meta.url).href,T=e=>{var t,o;return(o=(t=e.user)==null?void 0:t.profile)==null?void 0:o.user},_=e=>{var t;return!!((t=e.auth)!=null&&t.accessToken)};export{M as A,v as H,S as a,H as c,b as f,_ as i,T as s};
