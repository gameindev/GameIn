import{j as e,t as o,d as a}from"./index-KaOkpbgD.js";import{R as n}from"./modal-B79DAsnm.js";import{E as c}from"./EditAvator-tQLEa9Pg.js";const l=a.div`
  position: relative;
  width: 100%;
  height: ${({size:t})=>t};
  background-color: #4a5568;
  overflow: ${({size:t})=>t==="auto"?"unset":"hidden"};

  .banner_image {
    width: 100%;
    height: 100%;
    background-color: ${o.colors.secondaryGrey[0]};
  }

  .action {
    position: absolute;
    top: 1em;
    right: 1.25em;
  }
`,v=({coverImage:t,controls:r,size:i="9.5em"})=>e.jsxs(l,{size:i,children:[e.jsx("div",{className:"banner_overlay"}),e.jsx("div",{className:"banner_image",children:t?e.jsx("img",{src:t,alt:"Cover",style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:o.colors.white[0]},children:"No Cover Image"})}),r&&e.jsx("div",{className:"action",children:e.jsx(n,{title:"Update Cover Screen",children:({close:s})=>e.jsx(c,{type:"cover",close:s})})})]});export{v as C};
