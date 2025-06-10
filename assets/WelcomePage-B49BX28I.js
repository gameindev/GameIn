import{p as ot,u as at,j as c,A as ct,k as z,L as ve,r as S}from"./index-BA_9KDZa.js";import{G as lt}from"./gamein-logo-OLN3yQ-G.js";import{T as P}from"./Title-kPI9SKDK.js";import{F as oe}from"./Flex-Bd-XpZS_.js";import{B as E}from"./Button-xuIVweHX.js";import{T as $}from"./Text-DNdIUVAJ.js";import{c as Re}from"./createLucideIcon-F6eFk2LL.js";var Le={root:"m_849cf0da"};const ut={underline:"hover"},he=ot((e,t)=>{const{underline:s,className:r,unstyled:n,mod:i,...o}=at("Anchor",ut,e);return c.jsx($,{component:"a",ref:t,className:ct({[Le.root]:!n},r),...o,mod:[{underline:s},i],__staticSelector:"Anchor",unstyled:n})});he.classes=Le;he.displayName="@mantine/core/Anchor";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ht=Re("chevron-down",dt);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],mt=Re("chevron-up",ft),pt=z.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: calc(100vh - 5.188rem);

  .heroContent {
    width: 60%;

    img{
      max-width: 22.5rem;
    }

    .heroTitle {
      font-size: 3.125rem;
    }
    .heroSubTitle {
      font-size: 2.128rem;
    }
  }

  .scroll_down {
    all: unset;
    position: absolute;
    bottom: 10rem;
    left: 50%;
    font-weight: 800;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      border-right: 0.25rem solid #ffffff;
      border-bottom: 0.25rem solid #ffffff;
      width: 0.625rem;
      height: 0.625rem;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%) rotate(-315deg);
    }
  }
`,gt=z.div`
  display: flex;
  gap: 6.25rem;
  padding-bottom: 2.5rem;
  margin-bottom: 3rem;
  scroll-margin: 6.25rem;

  .creator_card, .sponsor_card{
    padding: 3.75rem;
    border-radius: 0.125rem;
    flex: 0 0 calc(50% - 6.25rem / 2);
    min-height: 36rem;
  }

  .creator_card {
    background: ${({theme:e})=>e.colors.primary[0]};

    .banner_img{
      max-width: 10rem;
    }
  }

  .sponsor_card {
    background: ${({theme:e})=>e.colors.secondary[0]};
    .banner_img{
      max-width: 12.938rem;
    }
  }

  .flexTitle{
    font-size: 2.188rem;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: -1rem;
        width: 3.5rem;
        height: 0.125rem;
        background: #ffffff;
        left: 0;
    }
  }
`,xt=z.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  border-radius: 0.125rem;
  background: ${({theme:e})=>e.colors.textSecondary[0]};
  gap: 3rem;

  .presentation_cardContent {
    flex: 0 0 40%;
    padding: 3.25rem 0 3.25rem 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .presentation_cardTitle {
      font-size: 2.188rem;
      font-weight: 400;
      line-height: 1;
      margin-bottom: 2.75rem;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -1.5rem;
        width: 3.3rem;
        height: 0.125rem;
        background: ${({theme:e})=>e.colors.primary[0]};
        left: 0;
      }

      span {
        font-weight: 900;
        color: ${({theme:e})=>e.colors.primary};
        display: block;
      }
    }
  }

  .presentation_img{
    flex-basis: 60%;
    img{
      height: 100%;
      object-fit: cover;
    }
  }

  &.odd {
    flex-direction: row-reverse;
    text-align: right;

    .presentation_cardContent {
      padding: 3.25rem 4.5rem 3.25rem 0;
      align-items: flex-end;

      .text_block {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .presentation_cardTitle::after {
        left: unset;
        right: 0;
      }
    }
    &:last-child {
      position: relative;
      margin-bottom: 15rem;

      &::after {
        content: "";
        position: absolute;
        bottom: -15rem;
        left: -8rem;
        background-image: url(/src/assets/homepage/bottom-decor.png);
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        z-index: -1;
        background-size: 20%;
      }
    }
  }
`,yt=z.div`
  .milestone_banner {
    position: relative;
    margin: 7.5rem 0;
    background: linear-gradient( 225deg, #9d7fef 0%, #69b3e7 48.8%, #5ce5b0 100%);
    clip-path: polygon(
      -0.018% 0.021%,
      -0.018% 99.883%,
      24.783% 99.883%,
      24.783% 99.883%,
      24.894% 99.873%,
      25.004% 99.84%,
      25.112% 99.783%,
      25.218% 99.703%,
      25.322% 99.6%,
      25.423% 99.476%,
      25.52% 99.329%,
      25.615% 99.161%,
      25.705% 98.972%,
      25.79% 98.763%,
      27.046% 95.356%,
      27.046% 95.356%,
      27.131% 95.148%,
      27.221% 94.959%,
      27.315% 94.792%,
      27.412% 94.645%,
      27.513% 94.521%,
      27.616% 94.418%,
      27.722% 94.338%,
      27.83% 94.28%,
      27.939% 94.247%,
      28.05% 94.237%,
      71.929% 94.237%,
      71.929% 94.237%,
      72.04% 94.246%,
      72.15% 94.279%,
      72.258% 94.336%,
      72.364% 94.416%,
      72.468% 94.519%,
      72.569% 94.644%,
      72.667% 94.791%,
      72.761% 94.959%,
      72.851% 95.147%,
      72.936% 95.356%,
      74.192% 98.763%,
      74.192% 98.763%,
      74.278% 98.972%,
      74.368% 99.161%,
      74.462% 99.329%,
      74.559% 99.476%,
      74.66% 99.601%,
      74.764% 99.703%,
      74.87% 99.783%,
      74.978% 99.84%,
      75.088% 99.874%,
      75.199% 99.883%,
      100% 99.883%,
      100% 0.021%,
      75.199% 0.021%,
      75.199% 0.021%,
      75.088% 0.031%,
      74.978% 0.064%,
      74.87% 0.121%,
      74.764% 0.201%,
      74.66% 0.304%,
      74.559% 0.429%,
      74.462% 0.575%,
      74.368% 0.743%,
      74.278% 0.932%,
      74.192% 1.141%,
      72.936% 4.548%,
      72.936% 4.548%,
      72.851% 4.756%,
      72.761% 4.945%,
      72.667% 5.112%,
      72.57% 5.259%,
      72.469% 5.384%,
      72.366% 5.486%,
      72.26% 5.566%,
      72.152% 5.624%,
      72.043% 5.657%,
      71.932% 5.667%,
      28.053% 5.667%,
      28.053% 5.667%,
      27.942% 5.658%,
      27.833% 5.625%,
      27.724% 5.568%,
      27.618% 5.488%,
      27.514% 5.385%,
      27.413% 5.26%,
      27.316% 5.114%,
      27.222% 4.946%,
      27.132% 4.757%,
      27.046% 4.548%,
      25.79% 1.141%,
      25.79% 1.141%,
      25.705% 0.932%,
      25.615% 0.743%,
      25.521% 0.575%,
      25.423% 0.428%,
      25.322% 0.303%,
      25.218% 0.201%,
      25.112% 0.121%,
      25.004% 0.064%,
      24.894% 0.031%,
      24.783% 0.021%,
      -0.018% 0.021%
    );

    .milestone_container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 5.625rem;
      max-width: 70rem;
      margin: 0 auto;

      .startJourney {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
          margin-bottom: 1.25rem;
          max-width: 18.75rem;
        }

        h3 {
          color: ${({theme:e})=>e.colors.textWhite[0]};
          font-size: 2.188rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 0.125rem;
        }

        p {
          color: ${({theme:e})=>e.colors.textWhite[0]};
          font-size: 1rem;
          font-weight: 400;
          line-height: 1;
        }
      }

      .counts_block {
        display: flex;
        align-items: center;
        margin-top: 2.75rem;
        width: 100%;
        justify-content: space-between;

        .count {
          color: ${({theme:e})=>e.colors.textWhite[0]};
          font-size: 3.75rem;
          font-weight: 400;
        }

        span {
          color: ${({theme:e})=>e.colors.textWhite[0]};
          font-size: 0.875rem;
          font-weight: 400;
          text-transform: uppercase;
        }
      }

      button {
        margin-top: 1.875rem;
      }
    }
  }
`;function bt({scrollToElement:e}){return c.jsxs(pt,{children:[c.jsxs("div",{className:"heroContent",children:[c.jsx("img",{src:lt,alt:"GameIn Logo"}),c.jsx(P,{order:2,c:"textWhite",className:"heroTitle",fw:"600",my:"lg",children:"Connecting creators & brands worldwide"}),c.jsx(P,{order:3,c:"textWhite",className:"heroSubTitle",fw:"300",mb:"xl",children:"Join the most powerful advertising marketplace and boost your success"}),c.jsxs(oe,{gap:"md",direction:"column",children:[c.jsx(ve,{to:"/register",children:c.jsx(E,{variant:"secondary",padding:"0.875rem",size:"lg",width:"13rem",children:"Register"})}),c.jsx(ve,{to:"/login",children:c.jsx(E,{variant:"grey",padding:"0.875rem",size:"lg",width:"13rem",children:"Sign in"})})]})]}),c.jsx("button",{onClick:e,className:"scroll_down",children:"Read more"})]})}const vt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='160.364'%20height='204.464'%20viewBox='0%200%20160.364%20204.464'%3e%3cpath%20d='M1352.25,248.15l7.45-3.4a9.69,9.69,0,0,1,4.9,1.25l79.15,39.6,56.5,28.15a11.846,11.846,0,0,1,5.85,5.1,12.543,12.543,0,0,1,1.35,6.6v118.5L1501,447.2l-151.9-75.95.1-116.35q-.3-4.75,2.1-6.35a4.762,4.762,0,0,1,.95-.4,5.876,5.876,0,0,1,3.6.15,13.972,13.972,0,0,1,2.35.9l79.1,39.6,56.45,28.2a12.075,12.075,0,0,1,5.75,4.8l4.35-1.95m-55.65,40q0,12.25-7.45,16.55-7.4,4.4-17.95-1.7-10.55-6.05-17.95-19t-7.4-25.2q0-12.2,7.4-16.6,7.4-4.35,17.95,1.75t17.95,19Q1448.2,347.6,1448.2,359.85Zm-32.9-34.6,19.2,26.6-19.2,4.3Zm84.2-3.45a13.089,13.089,0,0,1,1.5,6.85V447.2m-10-17.15-131.9-65.2.05-103.1L1491,327.05Z'%20transform='translate(-1348.1%20-243.736)'%20fill='none'%20stroke='%233c4044'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3c/svg%3e",wt="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='207.643'%20height='211.498'%20viewBox='0%200%20207.643%20211.498'%3e%3cpath%20d='M402.993,393.045v-4.711a1.764,1.764,0,0,1,0-.778.718.718,0,0,0,.043-.216,4.825,4.825,0,0,1,2.075-1.9l78.318-39.2.043-95.737q-.217-3.977,1.772-5.23,2.032-1.254,5.705.519l18.715,9.379,15.6,7.823,30.774,15.387,46.507,23.21q6.181,2.68,5.965,9.6v97.6q.691,4.409-5.014,7.175l-74.429,37.56a10.861,10.861,0,0,1-7.866,0L405.154,395.552a4.149,4.149,0,0,1-2.031-2.075c-.058-.029-.086-.058-.086-.086A1.889,1.889,0,0,1,402.993,393.045ZM453.174,408l31.552,15.474,17.591-8.731-31.6-15.56Zm-50.181-19.666a.186.186,0,0,0,.043.13,4.242,4.242,0,0,0,2.075,2.031h.043L520.9,448.369a11.022,11.022,0,0,0,8.471,0l79.14-39.591L483.43,346.235m-35.918,30.039,101.874,50.872,32.806-16.641L480.231,359.721ZM596.2,389.457,495.748,339.8l.043-78.448,100.4,49.705Z'%20transform='translate(-401.949%20-243.75)'%20fill='none'%20stroke='%233c4044'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'/%3e%3c/svg%3e",Tt=z.div`
  a {
    display: inline-flex;
    gap: 0.25rem;
    align-items: flex-end;
  }
`,ae=({content:e,maxChars:t=100,color:s})=>{const[r,n]=S.useState(!1),i=()=>n(u=>!u),o=e.length>t,a=r||!o?e:`${e.slice(0,t)}...`;return c.jsx(Tt,{children:c.jsxs($,{c:"white",children:[a,"  ",o&&c.jsx(he,{variant:"subtle",c:s,size:"md",fw:"600",padding:0,onClick:i,children:r?c.jsxs(c.Fragment,{children:["Show less",c.jsx(mt,{size:"1.125"})]}):c.jsxs(c.Fragment,{children:["Read more",c.jsx(ht,{size:"1.125"})]})})]})})};function kt({scrollToRef:e}){return c.jsxs(gt,{ref:e,children:[c.jsxs("div",{className:"creator_card",children:[c.jsx(P,{order:2,c:"textWhite",className:"flexTitle",fw:"900",mb:"xl",children:"FIND A CREATOR"}),c.jsx($,{mb:"xl",size:"md",c:"white",fw:"800",children:"Monetize your talent"}),c.jsx(ae,{color:"black",content:"GameIn helps sponsors break into dynamic gaming spaces with engaged viewership by finding the right gamers and teams to increase their exposure to desired demographics."}),c.jsxs(oe,{justify:"space-between",align:"flex-end",mt:"xl",children:[c.jsx(E,{variant:"darkGrey",padding:"0.5rem",size:"sm",width:"8.125rem",children:"Search"}),c.jsx("img",{className:"banner_img",src:vt,alt:""})]})]}),c.jsxs("div",{className:"sponsor_card",children:[c.jsx(P,{order:2,c:"textWhite",className:"flexTitle",fw:"900",mb:"xl",children:"FIND A SPONSOR"}),c.jsx($,{mb:"xl",size:"md",c:"white",fw:"800",children:"Don’t just throw your money at eSports."}),c.jsx(ae,{color:"black",content:"Text way to long. Discover sponsorship opportunities more efficient Our sponsorship marketplace provides increased exposure to potential sponsors, streamlines the sponsorship"}),c.jsxs(oe,{justify:"space-between",align:"flex-end",mt:"xl",children:[c.jsx(E,{variant:"darkGrey",padding:"0.5rem",size:"sm",width:"8.125rem",children:"Search"}),c.jsx("img",{className:"banner_img",src:wt,alt:""})]})]})]})}function we({data:e}){const{title:t,subTitle:s,className:r,readMoreColor:n,readMoreContent:i,btnText:o,image:a,altText:u}=e;return c.jsx(c.Fragment,{children:c.jsxs(xt,{className:r,children:[c.jsxs("div",{className:"presentation_cardContent",children:[c.jsxs("div",{className:"text_block",children:[c.jsxs(P,{order:2,c:"white",className:"presentation_cardTitle",children:[" ",t," ",c.jsx("span",{children:s})]}),c.jsx(ae,{color:n,content:i})]}),c.jsx(E,{variant:"primary",size:"sm",padding:"0.5rem",width:"8.5rem",mt:"xl",children:o})]}),c.jsx("div",{className:"presentation_img",children:c.jsx("img",{src:a,alt:u})})]})})}const Mt="data:image/svg+xml,%3csvg%20width='303'%20height='146'%20viewBox='0%200%20303%20146'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M170.262%2062.157L151.681%2051.429L133.1%2062.157V83.613L151.681%2094.339V72.884L170.262%2062.157Z'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M205.37%2060.9688V49.2688C205.37%2047.0261%20204.78%2044.8228%20203.659%2042.8805C202.537%2040.9381%20200.924%2039.3252%20198.982%2038.2038L158.069%2014.5818C156.127%2013.4606%20153.923%2012.8704%20151.68%2012.8704C149.438%2012.8704%20147.234%2013.4606%20145.292%2014.5818L104.379%2038.2038C102.437%2039.3252%20100.824%2040.9381%2099.7021%2042.8804C98.5806%2044.8227%2097.9901%2047.026%2097.99%2049.2688V96.5108C97.9901%2098.7537%2098.5806%20100.957%2099.7021%20102.899C100.824%20104.842%20102.437%20106.455%20104.379%20107.576L145.292%20131.198C147.234%20132.319%20149.438%20132.909%20151.68%20132.909C153.923%20132.909%20156.127%20132.319%20158.069%20131.198L198.982%20107.576C200.924%20106.454%20202.537%20104.842%20203.659%20102.899C204.78%20100.957%20205.37%2098.7536%20205.37%2096.5108V82.4388L188.843%2072.8958V94.3478L151.68%20115.801L114.518%2094.3458V51.4338L151.68%2029.9778L205.37%2060.9688Z'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M229.64%2072.8828H301.726'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M227.748%2036.3209L301.725%201.47485'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M199.139%208.18089L205.798%201.21289'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M227.748%20109.446L301.725%20144.292'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M199.139%20137.584L205.798%20144.552'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M73.245%2072.8828H0.968018'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M75.141%2036.3209L0.968018%201.47485'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M103.827%208.18089L97.15%201.21289'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M75.141%20109.446L0.968018%20144.292'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M103.827%20137.584L97.15%20144.552'%20stroke='white'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3c/svg%3e";function Ee(e){const t=S.useRef(null);return t.current===null&&(t.current=e()),t.current}const jt=typeof window<"u",St=jt?S.useLayoutEffect:S.useEffect,Ie=S.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),U=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function Ct(e,t){let s=new Set,r=new Set,n=!1,i=!1;const o=new WeakSet;let a={delta:0,timestamp:0,isProcessing:!1};function u(l){o.has(l)&&(d.schedule(l),e()),l(a)}const d={schedule:(l,h=!1,p=!1)=>{const v=p&&n?s:r;return h&&o.add(l),v.has(l)||v.add(l),l},cancel:l=>{r.delete(l),o.delete(l)},process:l=>{if(a=l,n){i=!0;return}n=!0,[s,r]=[r,s],s.forEach(u),s.clear(),n=!1,i&&(i=!1,d.process(l))}};return d}const K={},At=40;function Ft(e,t){let s=!1,r=!0;const n={delta:0,timestamp:0,isProcessing:!1},i=()=>s=!0,o=U.reduce((x,T)=>(x[T]=Ct(i),x),{}),{setup:a,read:u,resolveKeyframes:d,preUpdate:l,update:h,preRender:p,render:k,postRender:v}=o,g=()=>{const x=K.useManualTiming?n.timestamp:performance.now();s=!1,K.useManualTiming||(n.delta=r?1e3/60:Math.max(Math.min(x-n.timestamp,At),1)),n.timestamp=x,n.isProcessing=!0,a.process(n),u.process(n),d.process(n),l.process(n),h.process(n),p.process(n),k.process(n),v.process(n),n.isProcessing=!1,s&&t&&(r=!1,e(g))},M=()=>{s=!0,r=!0,n.isProcessing||e(g)};return{schedule:U.reduce((x,T)=>{const f=o[T];return x[T]=(b,j=!1,m=!1)=>(s||M(),f.schedule(b,j,m)),x},{}),cancel:x=>{for(let T=0;T<U.length;T++)o[U[T]].cancel(x)},state:n,steps:o}}const Y=e=>e,{schedule:ee,cancel:_e,state:Z}=Ft(typeof requestAnimationFrame<"u"?requestAnimationFrame:Y,!0);let Oe=()=>{};const Dt=e=>t=>typeof t=="string"&&t.startsWith(e),Nt=Dt("var(--"),Vt=e=>Nt(e)?Rt.test(e.split("/*")[0].trim()):!1,Rt=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,R=(e,t,s)=>s>t?t:s<e?e:s,Pe={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Be={...Pe,transform:e=>R(0,1,e)},Lt=e=>({test:t=>typeof t=="string"&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),Te=Lt("%"),ze=e=>!!(e&&e.getVelocity);let q;function Et(){q=void 0}const D={now:()=>(q===void 0&&D.set(Z.isProcessing||K.useManualTiming?Z.timestamp:performance.now()),q),set:e=>{q=e,queueMicrotask(Et)}};function It(e,t){e.indexOf(t)===-1&&e.push(t)}function _t(e,t){const s=e.indexOf(t);s>-1&&e.splice(s,1)}class Ot{constructor(){this.subscriptions=[]}add(t){return It(this.subscriptions,t),()=>_t(this.subscriptions,t)}notify(t,s,r){const n=this.subscriptions.length;if(n)if(n===1)this.subscriptions[0](t,s,r);else for(let i=0;i<n;i++){const o=this.subscriptions[i];o&&o(t,s,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function Ge(e,t){return t?e*(1e3/t):0}const ke=30,Pt=e=>!isNaN(parseFloat(e)),I={current:void 0};class Bt{constructor(t,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=(r,n=!0)=>{var o,a;const i=D.now();if(this.updatedAt!==i&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(r),this.current!==this.prev&&((o=this.events.change)==null||o.notify(this.current),this.dependents))for(const u of this.dependents)u.dirty();n&&((a=this.events.renderRequest)==null||a.notify(this.current))},this.hasAnimated=!1,this.setCurrent(t),this.owner=s.owner}setCurrent(t){this.current=t,this.updatedAt=D.now(),this.canTrackVelocity===null&&t!==void 0&&(this.canTrackVelocity=Pt(this.current))}setPrevFrameValue(t=this.current){this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt}onChange(t){return this.on("change",t)}on(t,s){this.events[t]||(this.events[t]=new Ot);const r=this.events[t].add(s);return t==="change"?()=>{r(),ee.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,s){this.passiveEffect=t,this.stopPassiveEffect=s}set(t,s=!0){!s||!this.passiveEffect?this.updateAndNotify(t,s):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,s,r){this.set(s),this.prev=void 0,this.prevFrameValue=t,this.prevUpdatedAt=this.updatedAt-r}jump(t,s=!0){this.updateAndNotify(t),this.prev=t,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){var t;(t=this.events.change)==null||t.notify(this.current)}addDependent(t){this.dependents||(this.dependents=new Set),this.dependents.add(t)}removeDependent(t){this.dependents&&this.dependents.delete(t)}get(){return I.current&&I.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){const t=D.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||t-this.updatedAt>ke)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,ke);return Ge(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(t){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=t(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){var t,s;(t=this.dependents)==null||t.clear(),(s=this.events.destroy)==null||s.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function zt(e,t){return new Bt(e,t)}const te=e=>e*1e3,V=e=>e/1e3,_=e=>Math.round(e*1e5)/1e5,Ue=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Gt(e){return e==null}const Ut=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,fe=(e,t)=>s=>!!(typeof s=="string"&&Ut.test(s)&&s.startsWith(e)||t&&!Gt(s)&&Object.prototype.hasOwnProperty.call(s,t)),We=(e,t,s)=>r=>{if(typeof r!="string")return r;const[n,i,o,a]=r.match(Ue);return{[e]:parseFloat(n),[t]:parseFloat(i),[s]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}},Wt=e=>R(0,255,e),ne={...Pe,transform:e=>Math.round(Wt(e))},N={test:fe("rgb","red"),parse:We("red","green","blue"),transform:({red:e,green:t,blue:s,alpha:r=1})=>"rgba("+ne.transform(e)+", "+ne.transform(t)+", "+ne.transform(s)+", "+_(Be.transform(r))+")"};function qt(e){let t="",s="",r="",n="";return e.length>5?(t=e.substring(1,3),s=e.substring(3,5),r=e.substring(5,7),n=e.substring(7,9)):(t=e.substring(1,2),s=e.substring(2,3),r=e.substring(3,4),n=e.substring(4,5),t+=t,s+=s,r+=r,n+=n),{red:parseInt(t,16),green:parseInt(s,16),blue:parseInt(r,16),alpha:n?parseInt(n,16)/255:1}}const ce={test:fe("#"),parse:qt,transform:N.transform},L={test:fe("hsl","hue"),parse:We("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:s,alpha:r=1})=>"hsla("+Math.round(e)+", "+Te.transform(_(t))+", "+Te.transform(_(s))+", "+_(Be.transform(r))+")"},B={test:e=>N.test(e)||ce.test(e)||L.test(e),parse:e=>N.test(e)?N.parse(e):L.test(e)?L.parse(e):ce.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?N.transform(e):L.transform(e)},$t=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function Kt(e){var t,s;return isNaN(e)&&typeof e=="string"&&(((t=e.match(Ue))==null?void 0:t.length)||0)+(((s=e.match($t))==null?void 0:s.length)||0)>0}const qe="number",$e="color",Zt="var",Jt="var(",Me="${}",Ht=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function J(e){const t=e.toString(),s=[],r={color:[],number:[],var:[]},n=[];let i=0;const a=t.replace(Ht,u=>(B.test(u)?(r.color.push(i),n.push($e),s.push(B.parse(u))):u.startsWith(Jt)?(r.var.push(i),n.push(Zt),s.push(u)):(r.number.push(i),n.push(qe),s.push(parseFloat(u))),++i,Me)).split(Me);return{values:s,split:a,indexes:r,types:n}}function Ke(e){return J(e).values}function Ze(e){const{split:t,types:s}=J(e),r=t.length;return n=>{let i="";for(let o=0;o<r;o++)if(i+=t[o],n[o]!==void 0){const a=s[o];a===qe?i+=_(n[o]):a===$e?i+=B.transform(n[o]):i+=n[o]}return i}}const Qt=e=>typeof e=="number"?0:e;function Xt(e){const t=Ke(e);return Ze(e)(t.map(Qt))}const Yt={test:Kt,parse:Ke,createTransformer:Ze,getAnimatableNone:Xt};function re(e,t,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?e+(t-e)*6*s:s<1/2?t:s<2/3?e+(t-e)*(2/3-s)*6:e}function es({hue:e,saturation:t,lightness:s,alpha:r}){e/=360,t/=100,s/=100;let n=0,i=0,o=0;if(!t)n=i=o=s;else{const a=s<.5?s*(1+t):s+t-s*t,u=2*s-a;n=re(u,a,e+1/3),i=re(u,a,e),o=re(u,a,e-1/3)}return{red:Math.round(n*255),green:Math.round(i*255),blue:Math.round(o*255),alpha:r}}function H(e,t){return s=>s>0?t:e}const se=(e,t,s)=>e+(t-e)*s,ie=(e,t,s)=>{const r=e*e,n=s*(t*t-r)+r;return n<0?0:Math.sqrt(n)},ts=[ce,N,L],ss=e=>ts.find(t=>t.test(e));function je(e){const t=ss(e);if(!t)return!1;let s=t.parse(e);return t===L&&(s=es(s)),s}const Se=(e,t)=>{const s=je(e),r=je(t);if(!s||!r)return H(e,t);const n={...s};return i=>(n.red=ie(s.red,r.red,i),n.green=ie(s.green,r.green,i),n.blue=ie(s.blue,r.blue,i),n.alpha=se(s.alpha,r.alpha,i),N.transform(n))},le=new Set(["none","hidden"]);function ns(e,t){return le.has(e)?s=>s<=0?e:t:s=>s>=1?t:e}const rs=(e,t)=>s=>t(e(s)),me=(...e)=>e.reduce(rs);function is(e,t){return s=>se(e,t,s)}function pe(e){return typeof e=="number"?is:typeof e=="string"?Vt(e)?H:B.test(e)?Se:cs:Array.isArray(e)?Je:typeof e=="object"?B.test(e)?Se:os:H}function Je(e,t){const s=[...e],r=s.length,n=e.map((i,o)=>pe(i)(i,t[o]));return i=>{for(let o=0;o<r;o++)s[o]=n[o](i);return s}}function os(e,t){const s={...e,...t},r={};for(const n in s)e[n]!==void 0&&t[n]!==void 0&&(r[n]=pe(e[n])(e[n],t[n]));return n=>{for(const i in r)s[i]=r[i](n);return s}}function as(e,t){const s=[],r={color:0,var:0,number:0};for(let n=0;n<t.values.length;n++){const i=t.types[n],o=e.indexes[i][r[i]],a=e.values[o]??0;s[n]=a,r[i]++}return s}const cs=(e,t)=>{const s=Yt.createTransformer(t),r=J(e),n=J(t);return r.indexes.var.length===n.indexes.var.length&&r.indexes.color.length===n.indexes.color.length&&r.indexes.number.length>=n.indexes.number.length?le.has(e)&&!n.values.length||le.has(t)&&!r.values.length?ns(e,t):me(Je(as(r,n),n.values),s):H(e,t)};function He(e,t,s){return typeof e=="number"&&typeof t=="number"&&typeof s=="number"?se(e,t,s):pe(e)(e,t)}const ls=e=>{const t=({timestamp:s})=>e(s);return{start:(s=!0)=>ee.update(t,s),stop:()=>_e(t),now:()=>Z.isProcessing?Z.timestamp:D.now()}},us=(e,t,s=10)=>{let r="";const n=Math.max(Math.round(t/s),2);for(let i=0;i<n;i++)r+=e(i/(n-1))+", ";return`linear(${r.substring(0,r.length-2)})`},Q=2e4;function ge(e){let t=0;const s=50;let r=e.next(t);for(;!r.done&&t<Q;)t+=s,r=e.next(t);return t>=Q?1/0:t}function ds(e,t=100,s){const r=s({...e,keyframes:[0,t]}),n=Math.min(ge(r),Q);return{type:"keyframes",ease:i=>r.next(n*i).value/t,duration:V(n)}}const hs=5;function Qe(e,t,s){const r=Math.max(t-hs,0);return Ge(s-e(r),t-r)}const y={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},Ce=.001;function fs({duration:e=y.duration,bounce:t=y.bounce,velocity:s=y.velocity,mass:r=y.mass}){let n,i,o=1-t;o=R(y.minDamping,y.maxDamping,o),e=R(y.minDuration,y.maxDuration,V(e)),o<1?(n=d=>{const l=d*o,h=l*e,p=l-s,k=ue(d,o),v=Math.exp(-h);return Ce-p/k*v},i=d=>{const h=d*o*e,p=h*s+s,k=Math.pow(o,2)*Math.pow(d,2)*e,v=Math.exp(-h),g=ue(Math.pow(d,2),o);return(-n(d)+Ce>0?-1:1)*((p-k)*v)/g}):(n=d=>{const l=Math.exp(-d*e),h=(d-s)*e+1;return-.001+l*h},i=d=>{const l=Math.exp(-d*e),h=(s-d)*(e*e);return l*h});const a=5/e,u=ps(n,i,a);if(e=te(e),isNaN(u))return{stiffness:y.stiffness,damping:y.damping,duration:e};{const d=Math.pow(u,2)*r;return{stiffness:d,damping:o*2*Math.sqrt(r*d),duration:e}}}const ms=12;function ps(e,t,s){let r=s;for(let n=1;n<ms;n++)r=r-e(r)/t(r);return r}function ue(e,t){return e*Math.sqrt(1-t*t)}const gs=["duration","bounce"],xs=["stiffness","damping","mass"];function Ae(e,t){return t.some(s=>e[s]!==void 0)}function ys(e){let t={velocity:y.velocity,stiffness:y.stiffness,damping:y.damping,mass:y.mass,isResolvedFromDuration:!1,...e};if(!Ae(e,xs)&&Ae(e,gs))if(e.visualDuration){const s=e.visualDuration,r=2*Math.PI/(s*1.2),n=r*r,i=2*R(.05,1,1-(e.bounce||0))*Math.sqrt(n);t={...t,mass:y.mass,stiffness:n,damping:i}}else{const s=fs(e);t={...t,...s,mass:y.mass},t.isResolvedFromDuration=!0}return t}function X(e=y.visualDuration,t=y.bounce){const s=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:t}:e;let{restSpeed:r,restDelta:n}=s;const i=s.keyframes[0],o=s.keyframes[s.keyframes.length-1],a={done:!1,value:i},{stiffness:u,damping:d,mass:l,duration:h,velocity:p,isResolvedFromDuration:k}=ys({...s,velocity:-V(s.velocity||0)}),v=p||0,g=d/(2*Math.sqrt(u*l)),M=o-i,w=V(Math.sqrt(u/l)),A=Math.abs(M)<5;r||(r=A?y.restSpeed.granular:y.restSpeed.default),n||(n=A?y.restDelta.granular:y.restDelta.default);let x;if(g<1){const f=ue(w,g);x=b=>{const j=Math.exp(-g*w*b);return o-j*((v+g*w*M)/f*Math.sin(f*b)+M*Math.cos(f*b))}}else if(g===1)x=f=>o-Math.exp(-w*f)*(M+(v+w*M)*f);else{const f=w*Math.sqrt(g*g-1);x=b=>{const j=Math.exp(-g*w*b),m=Math.min(f*b,300);return o-j*((v+g*w*M)*Math.sinh(m)+f*M*Math.cosh(m))/f}}const T={calculatedDuration:k&&h||null,next:f=>{const b=x(f);if(k)a.done=f>=h;else{let j=f===0?v:0;g<1&&(j=f===0?te(v):Qe(x,f,b));const m=Math.abs(j)<=r,C=Math.abs(o-b)<=n;a.done=m&&C}return a.value=a.done?o:b,a},toString:()=>{const f=Math.min(ge(T),Q),b=us(j=>T.next(f*j).value,f,30);return f+"ms "+b},toTransition:()=>{}};return T}X.applyToOptions=e=>{const t=ds(e,100,X);return e.ease=t.ease,e.duration=te(t.duration),e.type="keyframes",e};function de({keyframes:e,velocity:t=0,power:s=.8,timeConstant:r=325,bounceDamping:n=10,bounceStiffness:i=500,modifyTarget:o,min:a,max:u,restDelta:d=.5,restSpeed:l}){const h=e[0],p={done:!1,value:h},k=m=>a!==void 0&&m<a||u!==void 0&&m>u,v=m=>a===void 0?u:u===void 0||Math.abs(a-m)<Math.abs(u-m)?a:u;let g=s*t;const M=h+g,w=o===void 0?M:o(M);w!==M&&(g=w-h);const A=m=>-g*Math.exp(-m/r),x=m=>w+A(m),T=m=>{const C=A(m),F=x(m);p.done=Math.abs(C)<=d,p.value=p.done?w:F};let f,b;const j=m=>{k(p.value)&&(f=m,b=X({keyframes:[p.value,v(p.value)],velocity:Qe(x,m,p.value),damping:n,stiffness:i,restDelta:d,restSpeed:l}))};return j(0),{calculatedDuration:null,next:m=>{let C=!1;return!b&&f===void 0&&(C=!0,T(m),j(m)),f!==void 0&&m>=f?b.next(m-f):(!C&&T(m),p)}}}const Xe=(e,t,s)=>{const r=t-e;return r===0?1:(s-e)/r};function bs(e,t,s){const r=[],n=s||K.mix||He,i=e.length-1;for(let o=0;o<i;o++){let a=n(e[o],e[o+1]);if(t){const u=Array.isArray(t)?t[o]||Y:t;a=me(u,a)}r.push(a)}return r}function Ye(e,t,{clamp:s=!0,ease:r,mixer:n}={}){const i=e.length;if(Oe(i===t.length),i===1)return()=>t[0];if(i===2&&t[0]===t[1])return()=>t[1];const o=e[0]===e[1];e[0]>e[i-1]&&(e=[...e].reverse(),t=[...t].reverse());const a=bs(t,r,n),u=a.length,d=l=>{if(o&&l<e[0])return t[0];let h=0;if(u>1)for(;h<e.length-2&&!(l<e[h+1]);h++);const p=Xe(e[h],e[h+1],l);return a[h](p)};return s?l=>d(R(e[0],e[i-1],l)):d}function vs(e,t){const s=e[e.length-1];for(let r=1;r<=t;r++){const n=Xe(0,t,r);e.push(se(s,1,n))}}function ws(e){const t=[0];return vs(t,e.length-1),t}function Ts(e,t){return e.map(s=>s*t)}const et=(e,t,s)=>(((1-3*s+3*t)*e+(3*s-6*t))*e+3*t)*e,ks=1e-7,Ms=12;function js(e,t,s,r,n){let i,o,a=0;do o=t+(s-t)/2,i=et(o,r,n)-e,i>0?s=o:t=o;while(Math.abs(i)>ks&&++a<Ms);return o}function G(e,t,s,r){if(e===t&&s===r)return Y;const n=i=>js(i,0,1,e,s);return i=>i===0||i===1?i:et(n(i),t,r)}const Ss=G(.42,0,1,1),Cs=G(0,0,.58,1),tt=G(.42,0,.58,1),As=e=>Array.isArray(e)&&typeof e[0]!="number",st=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,nt=e=>t=>1-e(1-t),rt=G(.33,1.53,.69,.99),xe=nt(rt),Fs=st(xe),Ds=e=>(e*=2)<1?.5*xe(e):.5*(2-Math.pow(2,-10*(e-1))),ye=e=>1-Math.sin(Math.acos(e)),Ns=nt(ye),Vs=st(ye),Rs=e=>Array.isArray(e)&&typeof e[0]=="number",Ls={linear:Y,easeIn:Ss,easeInOut:tt,easeOut:Cs,circIn:ye,circInOut:Vs,circOut:Ns,backIn:xe,backInOut:Fs,backOut:rt,anticipate:Ds},Es=e=>typeof e=="string",Fe=e=>{if(Rs(e)){Oe(e.length===4);const[t,s,r,n]=e;return G(t,s,r,n)}else if(Es(e))return Ls[e];return e};function Is(e,t){return e.map(()=>t||tt).splice(0,e.length-1)}function O({duration:e=300,keyframes:t,times:s,ease:r="easeInOut"}){const n=As(r)?r.map(Fe):Fe(r),i={done:!1,value:t[0]},o=Ts(s&&s.length===t.length?s:ws(t),e),a=Ye(o,t,{ease:Array.isArray(n)?n:Is(t,n)});return{calculatedDuration:e,next:u=>(i.value=a(u),i.done=u>=e,i)}}const _s=e=>e!==null;function Os(e,{repeat:t,repeatType:s="loop"},r,n=1){const i=e.filter(_s),a=n<0||t&&s!=="loop"&&t%2===1?0:i.length-1;return!a||r===void 0?i[a]:r}const Ps={decay:de,inertia:de,tween:O,keyframes:O,spring:X};function Bs(e){typeof e.type=="string"&&(e.type=Ps[e.type])}class zs{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(t=>{this.resolve=t})}notifyFinished(){this.resolve()}then(t,s){return this.finished.then(t,s)}}const Gs=e=>e/100;class Us extends zs{constructor(t){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=(s=!0)=>{var r,n;if(s){const{motionValue:i}=this.options;i&&i.updatedAt!==D.now()&&this.tick(D.now())}this.isStopped=!0,this.state!=="idle"&&(this.teardown(),(n=(r=this.options).onStop)==null||n.call(r))},this.options=t,this.initAnimation(),this.play(),t.autoplay===!1&&this.pause()}initAnimation(){const{options:t}=this;Bs(t);const{type:s=O,repeat:r=0,repeatDelay:n=0,repeatType:i,velocity:o=0}=t;let{keyframes:a}=t;const u=s||O;u!==O&&typeof a[0]!="number"&&(this.mixKeyframes=me(Gs,He(a[0],a[1])),a=[0,100]);const d=u({...t,keyframes:a});i==="mirror"&&(this.mirroredGenerator=u({...t,keyframes:[...a].reverse(),velocity:-o})),d.calculatedDuration===null&&(d.calculatedDuration=ge(d));const{calculatedDuration:l}=d;this.calculatedDuration=l,this.resolvedDuration=l+n,this.totalDuration=this.resolvedDuration*(r+1)-n,this.generator=d}updateTime(t){const s=Math.round(t-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(t,s=!1){const{generator:r,totalDuration:n,mixKeyframes:i,mirroredGenerator:o,resolvedDuration:a,calculatedDuration:u}=this;if(this.startTime===null)return r.next(0);const{delay:d=0,keyframes:l,repeat:h,repeatType:p,repeatDelay:k,type:v,onUpdate:g,finalKeyframe:M}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,t):this.speed<0&&(this.startTime=Math.min(t-n/this.speed,this.startTime)),s?this.currentTime=t:this.updateTime(t);const w=this.currentTime-d*(this.playbackSpeed>=0?1:-1),A=this.playbackSpeed>=0?w<0:w>n;this.currentTime=Math.max(w,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=n);let x=this.currentTime,T=r;if(h){const m=Math.min(this.currentTime,n)/a;let C=Math.floor(m),F=m%1;!F&&m>=1&&(F=1),F===1&&C--,C=Math.min(C,h+1),!!(C%2)&&(p==="reverse"?(F=1-F,k&&(F-=k/a)):p==="mirror"&&(T=o)),x=R(0,1,F)*a}const f=A?{done:!1,value:l[0]}:T.next(x);i&&(f.value=i(f.value));let{done:b}=f;!A&&u!==null&&(b=this.playbackSpeed>=0?this.currentTime>=n:this.currentTime<=0);const j=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&b);return j&&v!==de&&(f.value=Os(l,this.options,M,this.speed)),g&&g(f.value),j&&this.finish(),f}then(t,s){return this.finished.then(t,s)}get duration(){return V(this.calculatedDuration)}get time(){return V(this.currentTime)}set time(t){var s;t=te(t),this.currentTime=t,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=t:this.driver&&(this.startTime=this.driver.now()-t/this.playbackSpeed),(s=this.driver)==null||s.start(!1)}get speed(){return this.playbackSpeed}set speed(t){this.updateTime(D.now());const s=this.playbackSpeed!==t;this.playbackSpeed=t,s&&(this.time=V(this.currentTime))}play(){var n,i;if(this.isStopped)return;const{driver:t=ls,startTime:s}=this.options;this.driver||(this.driver=t(o=>this.tick(o))),(i=(n=this.options).onPlay)==null||i.call(n);const r=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=r):this.holdTime!==null?this.startTime=r-this.holdTime:this.startTime||(this.startTime=s??r),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(D.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){var t,s;this.notifyFinished(),this.teardown(),this.state="finished",(s=(t=this.options).onComplete)==null||s.call(t)}cancel(){var t,s;this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),(s=(t=this.options).onCancel)==null||s.call(t)}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(t){return this.startTime=0,this.tick(t,!0)}attachTimeline(t){var s;return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),(s=this.driver)==null||s.stop(),t.observe(this)}}function Ws(e,t,s){if(e instanceof EventTarget)return[e];if(typeof e=="string"){const n=document.querySelectorAll(e);return n?Array.from(n):[]}return Array.from(e)}function be(e){const t=Ee(()=>zt(e)),{isStatic:s}=S.useContext(Ie);if(s){const[,r]=S.useState(e);S.useEffect(()=>t.on("change",r),[])}return t}function it(e,t){const s=be(t()),r=()=>s.set(t());return r(),St(()=>{const n=()=>ee.preRender(r,!1,!0),i=e.map(o=>o.on("change",n));return()=>{i.forEach(o=>o()),_e(r)}}),s}function qs(e){I.current=[],e();const t=it(I.current,e);return I.current=void 0,t}function $s(...e){const t=!Array.isArray(e[0]),s=t?0:-1,r=e[0+s],n=e[1+s],i=e[2+s],o=e[3+s],a=Ye(n,i,o);return t?a(r):a}function Ks(e,t,s,r){if(typeof e=="function")return qs(e);const n=$s(t,s,r);return Array.isArray(e)?De(e,n):De([e],([i])=>n(i))}function De(e,t){const s=Ee(()=>[]);return it(e,()=>{s.length=0;const r=e.length;for(let n=0;n<r;n++)s[n]=e[n].get();return t(s)})}function Zs(e,t,s){const r=e.get();let n=null,i=r,o;const a=typeof r=="string"?r.replace(/[\d.-]/g,""):void 0,u=()=>{n&&(n.stop(),n=null)},d=()=>{u(),n=new Us({keyframes:[Ve(e.get()),Ve(i)],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...s,onUpdate:o})};e.attach((h,p)=>(i=h,o=k=>p(Ne(k,a)),ee.postRender(d),e.get()),u);let l;return ze(t)&&(l=t.on("change",h=>e.set(Ne(h,a))),e.on("destroy",l)),l}function Ne(e,t){return t?e+t:e}function Ve(e){return typeof e=="number"?e:parseFloat(e)}function Js(e,t={}){const{isStatic:s}=S.useContext(Ie),r=()=>ze(e)?e.get():e;if(s)return Ks(r);const n=be(r());return S.useInsertionEffect(()=>Zs(n,e,t),[n,JSON.stringify(t)]),n}const Hs={some:0,all:1};function Qs(e,t,{root:s,margin:r,amount:n="some"}={}){const i=Ws(e),o=new WeakMap,a=d=>{d.forEach(l=>{const h=o.get(l.target);if(l.isIntersecting!==!!h)if(l.isIntersecting){const p=t(l.target,l);typeof p=="function"?o.set(l.target,p):u.unobserve(l.target)}else typeof h=="function"&&(h(l),o.delete(l.target))})},u=new IntersectionObserver(a,{root:s,rootMargin:r,threshold:typeof n=="number"?n:Hs[n]});return i.forEach(d=>u.observe(d)),()=>u.disconnect()}function Xs(e,{root:t,margin:s,amount:r,once:n=!1,initial:i=!1}={}){const[o,a]=S.useState(i);return S.useEffect(()=>{if(!e.current||n&&o)return;const u=()=>(a(!0),n?void 0:()=>a(!1)),d={root:t&&t.current||void 0,margin:s,amount:r};return Qs(e.current,u,d)},[t,e,s,n,r]),o}const W=({value:e})=>{const t=S.useRef(null),s=be(0),r=Js(s,{damping:100,stiffness:200}),n=Xs(t,{once:!0});return S.useEffect(()=>{n&&e!==void 0&&s.set(e)},[n,e,s]),S.useEffect(()=>{const i=r.on("change",o=>{var a;if(t.current){const u=!Number.isInteger(e),d=u?((a=e.toString().split(".")[1])==null?void 0:a.length)||1:0,l=o.toFixed(d);t.current.textContent=u?`${l}K`:l}});return()=>i()},[r,e]),c.jsx("div",{className:"count",ref:t})};function Ys(){return c.jsx(yt,{children:c.jsx("div",{className:"milestone_banner",children:c.jsxs("div",{className:"milestone_container",children:[c.jsxs("div",{className:"startJourney",children:[c.jsx("img",{src:Mt,alt:""}),c.jsx("h3",{children:"Start your journey now!"}),c.jsx("p",{children:"evaluating the performances of amateur, semi-professional, and pro"})]}),c.jsxs("div",{className:"counts_block",children:[c.jsxs("div",{className:"games counter",children:[c.jsx(W,{value:200}),c.jsx("span",{children:"Games"})]}),c.jsxs("div",{className:"sponsors counter",children:[c.jsx(W,{value:2.52}),c.jsx("span",{children:"Sponsors"})]}),c.jsxs("div",{className:"gamers counter",children:[c.jsx(W,{value:15.31}),c.jsx("span",{children:"Gamers"})]}),c.jsxs("div",{className:"deals counter",children:[c.jsx(W,{value:37.3}),c.jsx("span",{children:"Deals Made"})]})]}),c.jsx(E,{variant:"secondary",size:"lg",padding:"1rem",width:"11.625rem",children:"Register"})]})})})}const en=""+new URL("creators-brands-unite-BVmN9Zub.png",import.meta.url).href,tn=""+new URL("sponsorship-opportunities-DQLc_I6o.png",import.meta.url).href,sn=""+new URL("join-ecosystem-9ZiFPYlq.png",import.meta.url).href,nn=""+new URL("grow-your-business-CFNCQcdo.png",import.meta.url).href;function fn(){const e=S.useRef(null),t=()=>{e.current.scrollIntoView({behavior:"smooth"})},s=[{title:"Creators & Brands",subTitle:"unite!",className:"",readMoreColor:"primary",readMoreContent:"As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and certifications that help esports organizations gain recognition and credibility.",btnText:"Search",image:en,altText:"Creators and Brands Unite"},{title:"Search and find your best",subTitle:"sponsorship opportunities",className:"odd",readMoreColor:"primary",readMoreContent:"We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional guidance and support to create effective sponsorship proposals.",btnText:"Search",image:tn,altText:"Search and find your best sponsorship opportunities"},{title:"Join our",subTitle:"Ecosystem",className:"",readMoreColor:"primary",readMoreContent:"As part of our ecosystem, we provide sponsorships, merchandise shops, team-finding solutions, and certifications that help esports organizations gain recognition and credibility.",btnText:"Search",image:sn,altText:"Join Our Ecosystem"}],r={title:"Grow your business",subTitle:"with gamein",className:"odd",readMoreColor:"primary",readMoreContent:"We offer brands a targeted demographic to a highly engaged esports audience. Brands receive professional guidance and support to create effective sponsorship proposals.",btnText:"Search",image:nn,altText:"Grow your Business"};return c.jsxs(c.Fragment,{children:[c.jsxs("div",{className:"container",children:[c.jsx(bt,{scrollToElement:t}),c.jsx(kt,{scrollToRef:e}),s==null?void 0:s.map(n=>c.jsx(we,{data:n},n==null?void 0:n.subTitle))]}),c.jsx(Ys,{}),c.jsx("div",{className:"container",children:c.jsx(we,{data:r})})]})}export{fn as default};
