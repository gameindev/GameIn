import{r as a,j as e,x as s,k as l}from"./index-C5_jzTTu.js";import{T as m}from"./Text-DsdgoVeg.js";import{I as d}from"./IconCheck-7uQf9coA.js";import{I as p}from"./IconX-rrNd9szu.js";const h=l.div`
  display: flex;
  align-items: center;
  gap: ${s.gap.xs};

  label {
    position: relative;
    width: 3.75em;
    height: 2.125em;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${s.colors.inputBgColor[0]};
    transition: 0.3 s;
    border-radius: ${s.radius.sm};
  }

  .slider > .icon {
    position: absolute;
    height: 1.625em;
    width: 1.625em;
    left: 0.25em;
    bottom: 0.25em;
    background-color: ${s.colors.grey[0]};
    color: ${s.colors.white[0]};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${s.radius.sm};
    font-size: ${s.fontSizes.md};
    transition: 0.3s;
  }

  input:checked + .slider > .icon {
    transform: translateX(1.625em);
    background-color: ${s.colors.primary[0]};
  }
`;function b({fieldName:t,label:o,...i}){const[r,n]=a.useState(!1);return e.jsxs(h,{children:[e.jsx(m,{children:o}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",name:t,onClick:()=>n(c=>!c),...i}),e.jsx("span",{className:"slider",children:e.jsx("span",{className:"icon",children:r?e.jsx(d,{size:s.spacing.sm}):e.jsx(p,{size:s.spacing.sm})})})]})]})}export{b as S};
