import{j as e,t as r,d as t}from"./index-D9oEtHeb.js";const a="3s",s=r.colors.primary[0],o=r.colors.secondary[0],d=()=>e.jsx(i,{children:e.jsxs("div",{className:"wrapper",children:[e.jsx("div",{className:"loader",children:e.jsx("svg",{viewBox:"0 0 80 80",children:e.jsx("circle",{r:32,cy:40,cx:40,id:"test"})})}),e.jsx("div",{className:"loader triangle",children:e.jsx("svg",{viewBox:"0 0 86 80",children:e.jsx("polygon",{points:"43 8 79 72 7 72"})})}),e.jsx("div",{className:"loader",children:e.jsx("svg",{viewBox:"0 0 80 80",children:e.jsx("rect",{height:64,width:64,y:8,x:8})})})]})}),i=t.div`
  .loader {
    --path: ${s};
    --dot: ${o};
    --duration: ${a};
    width: 2.5em;
    height: 2.5em;
    position: relative;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .loader:before {
    content: "";
    width: 0.375em;
    height: 0.375em;
    border-radius: 50%;
    position: absolute;
    display: block;
    background: var(--dot);
    top: 2.3125em;
    left: 1.1875em;
    transform: translate(-1.125em, -1.125em);
    animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .loader svg rect,
  .loader svg polygon,
  .loader svg circle {
    fill: none;
    stroke: var(--path);
    stroke-width: 0.625em;
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .loader svg polygon {
    stroke-dasharray: 145 76 145 76;
    stroke-dashoffset: 0;
    animation: pathTriangle var(--duration)
      cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  .loader svg rect {
    stroke-dasharray: 192 64 192 64;
    stroke-dashoffset: 0;
    animation: pathRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader svg circle {
    stroke-dasharray: 150 50 150 50;
    stroke-dashoffset: 75;
    animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
      infinite;
  }

  .loader.triangle {
    width: 3em;
  }

  .loader.triangle:before {
    left: 1.3125em;
    transform: translate(-0.625em, -1.125em);
    animation: dotTriangle var(--duration)
      cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  }

  @keyframes pathTriangle {
    33% {
      stroke-dashoffset: 74;
    }

    66% {
      stroke-dashoffset: 147;
    }

    100% {
      stroke-dashoffset: 221;
    }
  }

  @keyframes dotTriangle {
    33% {
      transform: translate(0, 0);
    }

    66% {
      transform: translate(0.625em, -1.125em);
    }

    100% {
      transform: translate(-0.625em, -1.125em);
    }
  }

  @keyframes pathRect {
    25% {
      stroke-dashoffset: 64;
    }

    50% {
      stroke-dashoffset: 128;
    }

    75% {
      stroke-dashoffset: 192;
    }

    100% {
      stroke-dashoffset: 256;
    }
  }

  @keyframes dotRect {
    25% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(1.125em, -1.125em);
    }

    75% {
      transform: translate(0, -2.25em);
    }

    100% {
      transform: translate(-1.125em, -1.125em);
    }
  }

  @keyframes pathCircle {
    25% {
      stroke-dashoffset: 125;
    }

    50% {
      stroke-dashoffset: 175;
    }

    75% {
      stroke-dashoffset: 225;
    }

    100% {
      stroke-dashoffset: 275;
    }
  }

  .loader {
    display: inline-block;
    margin: 0 0.5em;
  }
`;export{d as default};
