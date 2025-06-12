import{j as e,t as o,h as a}from"./index-CyJ1SQbb.js";const s=a.div`
  position: relative;
  width: 100%;
  height: ${r=>r.$size};
  background-color: #4a5568;
  overflow: hidden;

  .banner_image {
    width: 100%;
    height: 100%;
    background-image: url("/banner.jpg");
    background-size: cover;
    background-position: center;
    background-color: ${o.colors.secondaryGrey[0]};
  }
`,t=({coverImage:r,size:n="9.5rem "})=>e.jsxs(s,{$size:n,children:[e.jsx("div",{className:"banner_overlay"}),e.jsx("div",{className:"banner_image",children:e.jsx("img",{src:r,alt:"Cover"})})]});export{t as C};
