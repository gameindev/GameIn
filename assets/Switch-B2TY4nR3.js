import{r as c,j as s,T as l,aw as d,t as e,d as m}from"./index-Ddh2FbSx.js";import{X as p}from"./x-CWbGpevt.js";const h=m.div`
    display: flex;
    align-items: center;
    gap: ${e.gap.xs};

    label{  
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
      background-color: ${e.colors.inputBgColor[0]};
      transition: 0.3 s;
      border-radius: ${e.radius.sm};
    }

    .slider>.icon {
      position: absolute;
      height: 1.625em;
      width: 1.625em;
      left: 0.25em;
      bottom: 0.25em;
      background-color: ${e.colors.grey[0]};
      color: ${e.colors.white[0]};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: ${e.radius.sm};
      font-size: ${e.fontSizes.md};
      transition: 0.3s;
    }


    input:checked + .slider>.icon  {
      transform: translateX(1.625em);
      background-color: ${e.colors.primary[0]};
    }
`;function g({fieldName:t,label:i,...o}){const[r,n]=c.useState(!1);return s.jsxs(h,{children:[s.jsx(l,{children:i}),s.jsxs("label",{children:[s.jsx("input",{type:"checkbox",name:t,onClick:()=>n(a=>!a),...o}),s.jsx("span",{className:"slider",children:s.jsx("span",{className:"icon",children:r?s.jsx(d,{size:e.spacing.sm}):s.jsx(p,{size:e.spacing.sm})})})]})]})}export{g as S};
