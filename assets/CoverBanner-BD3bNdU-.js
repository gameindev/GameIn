import{j as e,t,d as i}from"./index-Dg9eACOL.js";import{R as n}from"./modal-RMMwVJ9Y.js";import{E as c}from"./EditAvator-CLfID24-.js";const d=i.div`
  position: relative;
  width: 100%;
  height: ${({size:o})=>o};
  background-color: #4a5568;
  overflow: ${({size:o})=>o==="auto"?"unset":"hidden"};;

  .banner_image {
    width: 100%;
    height: 100%;
    background-color: ${t.colors.secondaryGrey[0]};
  }

  .action {
    position: absolute;
    top: 1em;
    right: 1.25em;
  }
`,v=({coverImage:o,controls:r,size:a="9.5em"})=>e.jsxs(d,{size:a,children:[e.jsx("div",{className:"banner_overlay"}),e.jsx("div",{className:"banner_image",children:e.jsx("img",{src:o,alt:"Cover"})}),r&&e.jsx("div",{className:"action",children:e.jsx(n,{title:"Update Cover Screen",children:({close:s})=>e.jsx(c,{type:"cover",close:s})})})]});export{v as C};
