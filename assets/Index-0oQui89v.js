import{i as N,t as x,d as l,j as e,T as n,s as g,L as O,W as S,N as m,q as o,a5 as b,m as y,n as w,y as R,r as v,B as T,O as _}from"./index-Ddh2FbSx.js";import{C as A}from"./CoverBanner-DbBUYuSm.js";import{A as E}from"./AvatarSection-rpQ3v9TR.js";import{c as C,V as B,B as I,a as F,F as U}from"./FollowButton-BzRe2vnL.js";import{U as z}from"./user-round-aSE1tFo1.js";import{p as D}from"./useProfileMediaUrl-DRGexTqt.js";import{F as P,f as L}from"./index-BkPKTQ5D.js";import{I as k}from"./InfoTabs-Ddid4uiY.js";import{g as G}from"./index-8AOQfsCY.js";import"./modal-BrqPe0S_.js";import"./Modal-DT7K7fYe.js";import"./FocusTrap-BR_CIkjN.js";import"./DirectionProvider-DznSjpHc.js";import"./Paper-BSpVnLm3.js";import"./create-optional-context-IBslluko.js";import"./EditAvator-DzLDPkaX.js";import"./HexContainer-CYqX8Osk.js";import"./Stack-DQps_MKj.js";import"./Group-DpkmbcfE.js";import"./FileInput-BqiUkdXR.js";import"./InputBase-CeXKGc7g.js";import"./FileButton-rdLhRiWF.js";import"./use-uncontrolled-DUnM3McR.js";import"./Image-DoFcPglF.js";import"./get-auto-contrast-value-Da6zqqWm.js";import"./create-scoped-keydown-handler-O-eo68DQ.js";import"./index-Pf2rS8iD.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],W=N("eye",H),M=l.div`
  width: 100%;
  background-color: #1f2937;
  border-radius: ${x.radius.md};
  overflow: hidden;
  /* box-shadow: 0 0.25em 0.75em rgba(0, 0, 0, 0.3); */
`,X=l.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25em;
  background-color: ${x.colors.secondaryGrey[0]};
  color: white;
`,$=l.div`
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
`,V=l.div`
  margin-left: 12em;
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 1.5em;

  .personal_info {
    width: 80%;
  }
`,Y=l.div`
  .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.875em;
    margin-bottom: 0.5em;
  }

  .profile_name {
    font-size: 1.875em;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: ${x.colors.white[0]};
  }

  .profile_info {
    font-size: 0.875em;
    color: #a0aec0;
    display: flex;
    align-items: center;
    gap: 1em;
  }
`,q=l.div`
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
        margin: 0 0.5em 0 0.5em;
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
`,J=l.div`
  border-left: 0.063em dotted #4a5568;
  border-right: 0.063em dotted #4a5568;
  .levels {
    /* flex: 1; */
    display: flex;
    align-items: center;
    padding: 0 1.25em;

    svg text {
      font-family: ${x.fontFamily};
    }
  }
`,K=l.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 100%;
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
`,Q=l.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5em;

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`,Z=({user:s})=>{const i=C(s==null?void 0:s.date_of_birth);return e.jsx(Y,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:s.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:s.nationality||"IND"}),s.user_type==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:i||"N/A"}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(B,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(I,{})})]})]})})})},ee=({stats:s})=>e.jsx(q,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(W,{size:"0.75em"}),e.jsx(n,{className:"views",size:"md",weight:500,children:s.views}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(z,{size:"0.75em"}),e.jsx(n,{className:"followers",size:"md",weight:500,children:s.followers||"0"}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(n,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:(s==null?void 0:s.joinedOn)||"OCT. 23rd, 2022"})]})]})}),se=({sponsors:s})=>{var i;return e.jsxs(K,{children:[e.jsx(n,{className:"sponsorship_text",component:"span",size:"sm",children:s.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(i=s.sponsorship)==null?void 0:i.map((c,a)=>e.jsx("img",{className:"sponsor_logo",src:c.logo,alt:c.name,style:{width:c.size}},a))})]})},oe={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},ie=({level:s})=>{const i=oe[s]||"#E2BB63";return e.jsx(J,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(F,{fill:i,number:s})})})})},re=({userProfile:s,isSelf:i})=>{if(!s)return null;const{avatarUrl:c,coverImageUrl:a}=D(s),{user_type:p,creator_profile:t,brand_profile:d,community_profile:f}=s,r=p===m.CREATOR?t:p===m.BRAND?d:f,j={views:(r==null?void 0:r.views)||"0",followers:(r==null?void 0:r.followers)||"0",joinedOn:new Date(s.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};return e.jsxs(M,{children:[e.jsx(A,{coverImage:a,controls:i}),e.jsxs(X,{children:[e.jsx($,{children:e.jsx(E,{avatar:c,radius:.35,size:"180",controls:i})}),e.jsxs(V,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(Z,{user:s}),e.jsx(ee,{stats:j})]}),e.jsx(ie,{level:(r==null?void 0:r.rank)||1}),e.jsx(se,{sponsors:(s==null?void 0:s.sponsors)||[]}),e.jsx(Q,{children:i?e.jsx("div",{className:"actions",children:e.jsx(g,{variant:"secondary",size:"xs",children:"Edit Profile"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"interaction",children:e.jsx(O,{to:"/inbox",children:e.jsx(S,{size:"lg",color:"inputBgColor",variant:"filled",children:e.jsx(n,{size:"xs",children:e.jsx(P,{icon:L})})})})}),e.jsxs("div",{className:"actions",children:[e.jsx(U,{targetUserId:s.id,onChange:u=>console.log("Followed:",u)}),e.jsx(g,{variant:"primary",size:"xs",children:"Sponsor"})]})]})})]})]})]})},h={self:[{label:"DASHBOARD",value:o.ACCOUNTS.DASHBOARD.ROOT},{label:"PROFILE",value:o.ACCOUNTS.PROFILE.ROOT},{label:"SPONSORSHIPS",value:o.ACCOUNTS.SPONSORSHIPS.ROOT},{label:"OFFERINGS",value:o.ACCOUNTS.OFFERINGS.ROOT},{label:"STATS",value:o.ACCOUNTS.STATS.ROOT},{label:"NEWSFEED",value:o.ACCOUNTS.NEWSFEED.ROOT},{label:"INBOX",value:o.ACCOUNTS.INBOX.ROOT}],otherCreator:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"SPONSORSHIPS",value:o.helpers.sponsorship(s)},{label:"OFFERINGS",value:o.helpers.listOfferings(s)},{label:"INBOX",value:o.helpers.inbox(s)}],otherBrand:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"SPONSORSHIPS",value:o.helpers.sponsorship(s)},{label:"OFFERINGS",value:o.ACCOUNTS.OFFERINGS.ROOT},{label:"INBOX",value:o.helpers.inbox(s)}],otherCommunity:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"INBOX",value:o.helpers.inbox(s)}]};function Be(){const{id:s}=b(),{user:i}=y(w),{get:c}=R(),[a,p]=v.useState(null),t=!s||Number(i==null?void 0:i.id)===Number(s);v.useEffect(()=>{if(window.scrollTo(0,0),!s||t)return;(async()=>{try{const r=await G(c,s);p(r)}catch(r){console.error("Error fetching user data:",r)}})()},[s,t]);let d=h.self;return!t&&(a!=null&&a.user_type)&&(a.user_type===m.CREATOR&&(d=h.otherCreator(s)),a.user_type===m.BRAND&&(d=h.otherBrand(s)),a.user_type===m.COMMUNITY&&(d=h.otherCommunity(s))),e.jsxs(e.Fragment,{children:[e.jsx(re,{userProfile:t?i:a,isSelf:t}),e.jsx(k,{tabLists:d}),e.jsx(T,{mt:40,children:e.jsx(_,{context:{userProfile:t?i:a,isSelf:t}})})]})}export{Be as default};
