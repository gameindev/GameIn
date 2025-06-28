import{j as o,t as i,d as s}from"./index-Dg9eACOL.js";const t=a=>`${a/16}em`,l=s.div`
  --r: ${({radius:a})=>a};
  --a: ${({angle:a})=>a};

  width: ${({size:a})=>t(a)};
  background: ${({background:a})=>a||i.colors.inputBgColor[0]};
  aspect-ratio: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0.063em solid transparent;
  --_a: calc(30deg * var(--r));
  --_r: calc(50% * cos(30deg) / cos(30deg * (1 - var(--r))));

  clip-path: shape(
    from calc(50% + var(--_r) * cos(var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(var(--a) + var(--_a))) with
      calc(50% + 50% * cos(var(--a))) calc(50% + 50% * sin(var(--a))),
    line to calc(50% + var(--_r) * cos(60deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(60deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(60deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(60deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(60deg + var(--a)))
      calc(50% + 50% * sin(60deg + var(--a))),
    line to calc(50% + var(--_r) * cos(120deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(120deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(120deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(120deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(120deg + var(--a)))
      calc(50% + 50% * sin(120deg + var(--a))),
    line to calc(50% + var(--_r) * cos(180deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(180deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(180deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(180deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(180deg + var(--a)))
      calc(50% + 50% * sin(180deg + var(--a))),
    line to calc(50% + var(--_r) * cos(240deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(240deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(240deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(240deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(240deg + var(--a)))
      calc(50% + 50% * sin(240deg + var(--a))),
    line to calc(50% + var(--_r) * cos(300deg + var(--a) - var(--_a)))
      calc(50% + var(--_r) * sin(300deg + var(--a) - var(--_a))),
    curve to calc(50% + var(--_r) * cos(300deg + var(--a) + var(--_a)))
      calc(50% + var(--_r) * sin(300deg + var(--a) + var(--_a))) with
      calc(50% + 50% * cos(300deg + var(--a)))
      calc(50% + 50% * sin(300deg + var(--a)))
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    clip-path: inherit;
    object-position: center;
    /* border: inherit; */
  }
`,d=({children:a,radius:r=.25,angle:c="30deg",size:v=2,background:e})=>o.jsx(l,{size:v,background:e,radius:r,angle:c,children:a});export{d as H};
