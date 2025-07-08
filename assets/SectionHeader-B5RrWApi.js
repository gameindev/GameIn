import{j as e,t as i,d as a}from"./index-D9oEtHeb.js";const n=a.div`
  display: flex;
  align-items: center;
  gap: 1.563em;

  span {
    display: inline-flex;
    color: ${i.colors.primary[0]};
  }

  .header_icon {
    display: flex;
    align-items: center;
  }

  .header_text {
    font-size: 1.563em;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.2em;
    color: ${i.colors.primary[0]};
  }
`;function l({icon:s,text:r}){return e.jsxs(n,{className:"header",children:[e.jsx("div",{className:"header_icon",children:e.jsx("span",{children:s})}),e.jsx("div",{className:"header_text",children:e.jsx("span",{children:r})})]})}export{l as S};
