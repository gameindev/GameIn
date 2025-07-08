import{t as a,d as o,j as e,l as x,B as f,O as h}from"./index-D9oEtHeb.js";import{C as g}from"./CoverBanner-Bm70gIZs.js";import{A as j}from"./AvatarSection-AkqMalqv.js";import{c as v,V as u,B as w,a as y}from"./calculateAge-CU7XHlxw.js";import{c as N}from"./createLucideIcon-K2Gk7huH.js";import{T as t}from"./Text-8hgcObZb.js";import{U as _}from"./user-round-Bd6V2LNG.js";import{c as b}from"./selectors-BfVctv7J.js";import{u as z}from"./useProfileMediaUrl-Cs4gKdEF.js";import{B as c}from"./Button-DE9b1J-V.js";import{I as B}from"./InfoTabs-Dhf-RP59.js";import"./modal-DkAunJW6.js";import"./IconButton-BvFDETZx.js";import"./ActionIcon-CBmGwXDV.js";import"./Modal-BJGjPyn5.js";import"./create-safe-context-BzETH9ei.js";import"./FocusTrap-CENGLIKd.js";import"./DirectionProvider-D6EKyNqO.js";import"./Paper-B5GudHh1.js";import"./create-optional-context-nOeOZdkc.js";import"./EditAvator-RNBpw3lh.js";import"./HexContainer-zsQTPXMB.js";import"./useApi-HEZO75xY.js";import"./Stack-CmwLihlq.js";import"./Group-B6akqJOh.js";import"./Image-DLpckFmT.js";import"./FileInput-CX6dCDu1.js";import"./use-uncontrolled-NxHOPr4h.js";import"./get-auto-contrast-value-Da6zqqWm.js";import"./create-scoped-keydown-handler-O-eo68DQ.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],A=N("eye",S),T=o.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${a.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`,U=o.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25em;
  background-color: ${a.colors.secondaryGrey[0]};
  color: white;
`,E=o.div`
  position: absolute;
  top: -6em;
  left: 1em;
  /* width: 10.625em;
  height: 11.875em; */
  overflow: hidden;

  .action {
    position: absolute;
    bottom: 0.5em;
    right: 1.5em;
  }
`,C=o.div`
  margin-left: 12em;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5em;

  /* .personal_info {
    flex-grow: 1;
  } */
`,I=o.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875em;
    margin-bottom: 0.5em;
  }

  .profile_name {
    font-size: 1.875em;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${a.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875em;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1em;
  }
`,O=o.div`
  .profile_stats {
    display: flex;
    justify-content: flex-start;
    gap: 1.25em;
    color: white;

    .stats_section {
      text-align: center;
      display: flex;
      align-items: center;

      .views,
      .followers,
      .joined {
        font-size: 0.625em;
        margin: 0 0.188em 0 0.5em;
        font-weight: 800;
        line-height: 1.2;
      }

      .helperText {
        font-size: 0.625em;
        font-weight: 400;
        color: #a0aec0;
        text-transform: uppercase;
      }
    }
  }
`,k=o.div`
  border-left: 0.063em dotted #4a5568;
  border-right: 0.063em dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25em;

    svg text {
      font-family: ${a.fontFamily};
    }
  }
`,D=o.div`
  display: flex;
  align-items: end;
  gap: 2.5em;
  font-size: 0.875em;
  color: #a0aec0;
  padding: 0.5em;
  border-right: 0.063em dotted #4a5568;
  margin-right: auto;

  .sponsorship_text {
    font-size: 0.625em;
    font-weight: 400;
    text-transform: uppercase;
  }

  .sponsorship_badge {
    background-color: #2b6cb0;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    font-size: 0.75em;
  }
`,F=o.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`,R=({user:s})=>{const r=v(s==null?void 0:s.dateOfBirth);return e.jsx(I,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:s.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:s.nationality||"IND"}),s.userType==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:r||"N/A"}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(u,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(w,{})})]})]})})})},P=({stats:s})=>e.jsx(O,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(A,{size:"0.75em"}),e.jsx(t,{className:"views",size:"md",weight:500,children:s.views}),e.jsx(t,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(_,{size:"0.75em"}),e.jsx(t,{className:"followers",size:"md",weight:500,children:s==null?void 0:s.followers}),e.jsx(t,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(t,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(t,{className:"helperText",size:"xs",color:"dimmed",children:(s==null?void 0:s.joinedOn)||"OCT. 23rd, 2022"})]})]})}),L=({sponsors:s})=>{var r;return e.jsxs(D,{children:[e.jsx(t,{className:"sponsorship_text",component:"span",size:"sm",children:s.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(r=s.sponsorship)==null?void 0:r.map((n,l)=>e.jsx("img",{className:"sponsor_logo",src:n.logo,alt:n.name,style:{width:n.size}},l))})]})},$={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},V=({level:s})=>{const r=$[s]||"#E2BB63";return e.jsx(k,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(y,{fill:r,number:s})})})})},W=()=>{const{user:s}=x(b),{avatarUrl:r,coverImageUrl:n}=z();if(!s)return null;const{userType:l,creatorProfile:d,brandProfile:m}=s,i=l==="CREATOR"?d:m,p={views:(i==null?void 0:i.views)||"0",followers:(i==null?void 0:i.followers)||"0",joinedOn:new Date(s.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};return e.jsxs(T,{children:[e.jsx(g,{coverImage:n,controls:!0}),e.jsxs(U,{children:[e.jsx(E,{children:e.jsx(j,{avatar:r,radius:.35,size:"180",controls:!0})}),e.jsxs(C,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(R,{user:s}),e.jsx(P,{stats:p})]}),e.jsx(V,{level:(i==null?void 0:i.rank)||1}),e.jsx(L,{sponsors:(s==null?void 0:s.sponsors)||[]}),e.jsx(F,{children:e.jsxs("div",{className:"actions",children:[e.jsx(c,{variant:"secondary",size:"xs",children:"Follow"}),e.jsx(c,{variant:"primary",size:"xs",children:"Sponsor"})]})})]})]})]})};function we(){return e.jsxs(e.Fragment,{children:[e.jsx(W,{}),e.jsx(B,{}),e.jsx(f,{mt:40,children:e.jsx(h,{})})]})}export{we as default};
