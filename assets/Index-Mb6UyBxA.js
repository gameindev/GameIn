import{t as x,d as l,j as e,L as N,D as d,l as o,T as O,k as S,r as g,B as b,O as y}from"./index-BdKYZ-eS.js";import{C as w}from"./CoverBanner-1hfzXeZ2.js";import{A as I}from"./AvatarSection-i47vKbpB.js";import{c as _,V as T,B as R,a as B,F as E}from"./FollowButton-DQ_PGlSw.js";import{c as A}from"./createReactComponent-vGlhThBW.js";import{T as n,B as v}from"./Button-Bhqaz8qy.js";import{I as C}from"./IconUser-C2oz7VWQ.js";import{p as F}from"./useProfileMediaUrl-7uGcnrxC.js";import{I as U}from"./IconButton-BUWNAfHS.js";import{A as z}from"./ActionIcon-Db9UWPL9.js";import{I as D}from"./IconMessage-CAvPBPyi.js";import{I as P}from"./InfoTabs-C6pY6Ie7.js";import{c as L}from"./selectors-BfVctv7J.js";import{u as k}from"./useApi-Biy4RklS.js";import{g as G}from"./index-C3NaiNSv.js";import"./modal-DTgkh8oR.js";import"./Modal-DAgg0iNA.js";import"./create-safe-context-Bvd17-2z.js";import"./FocusTrap-CvEZSnOY.js";import"./DirectionProvider-DXc5CcBD.js";import"./Paper-CJFZiEJq.js";import"./create-optional-context-Bp0Cxvum.js";import"./EditAvator-DAwUm_Jh.js";import"./HexContainer-CzvVzpjc.js";import"./Stack-BnYw-62w.js";import"./Group-Cc3YjUX0.js";import"./FileInput-Lv1PaQrn.js";import"./InputBase-CeldfAqD.js";import"./FileButton-bg7tlTQ9.js";import"./use-uncontrolled-BTizQgRf.js";import"./Image-C6yLjeA5.js";import"./get-auto-contrast-value-Da6zqqWm.js";import"./create-scoped-keydown-handler-O-eo68DQ.js";import"./index-BuX6f0Uy.js";/**
 * @license @tabler/icons-react v3.35.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0",key:"svg-0"}],["path",{d:"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6",key:"svg-1"}]],M=A("outline","eye","Eye",H),W=l.div`
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
`,J=l.div`
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
`,q=l.div`
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
`,Z=({user:s})=>{const r=_(s==null?void 0:s.date_of_birth);return e.jsx(Y,{children:e.jsx("div",{className:"infoSection",children:e.jsxs("div",{className:"user_info",children:[e.jsx("div",{className:"profile_name",children:s.username}),e.jsxs("div",{className:"profile_info",children:[e.jsx("div",{className:"nationality",children:s.nationality||"IND"}),s.user_type==="CREATOR"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"age",children:r||"N/A"}),e.jsx("div",{className:"gender_info"})]}),e.jsx("div",{className:"verified",children:e.jsx(T,{})}),e.jsx("div",{className:"badge_info",children:e.jsx(R,{})})]})]})})})},ee=({stats:s})=>e.jsx(J,{children:e.jsxs("div",{className:"profile_stats",children:[e.jsxs("div",{className:"stats_section",children:[e.jsx(M,{size:"0.75em"}),e.jsx(n,{className:"views",size:"md",weight:500,children:s.views}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:"Views"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(C,{size:"0.75em"}),e.jsx(n,{className:"followers",size:"md",weight:500,children:s.followers||"0"}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:"Followers"})]}),e.jsxs("div",{className:"stats_section",children:[e.jsx(n,{className:"joined",size:"md",weight:600,children:"Joined:"}),e.jsx(n,{className:"helperText",size:"xs",color:"dimmed",children:(s==null?void 0:s.joinedOn)||"OCT. 23rd, 2022"})]})]})}),se=({sponsors:s})=>{var r;return e.jsxs(K,{children:[e.jsx(n,{className:"sponsorship_text",component:"span",size:"sm",children:s.userType==="BRAND"?"Sponsoring":"Sponsored by"}),e.jsx("div",{className:"sponsorship_tracker",children:(r=s.sponsorship)==null?void 0:r.map((c,t)=>e.jsx("img",{className:"sponsor_logo",src:c.logo,alt:c.name,style:{width:c.size}},t))})]})},oe={1:"#9D7FEF",2:"#76A2EE",3:"#65C3D6",4:"#5CE5B0",5:"#AAD980",6:"#E2BB63"},re=({level:s})=>{const r=oe[s]||"#E2BB63";return e.jsx(q,{children:e.jsx("div",{className:"levels",children:e.jsx("div",{className:"badge_info",children:e.jsx(B,{fill:r,number:s})})})})},ie=({userProfile:s,isSelf:r})=>{if(!s)return null;const{avatarUrl:c,coverImageUrl:t}=F(s),{user_type:p,creator_profile:a,brand_profile:m,community_profile:f}=s,i=p===d.CREATOR?a:p===d.BRAND?m:f,j={views:(i==null?void 0:i.views)||"0",followers:(i==null?void 0:i.followers)||"0",joinedOn:new Date(s.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};return e.jsxs(W,{children:[e.jsx(w,{coverImage:t,controls:r}),e.jsxs(X,{children:[e.jsx($,{children:e.jsx(I,{avatar:c,radius:.35,size:"180",controls:r})}),e.jsxs(V,{children:[e.jsxs("div",{className:"personal_info",children:[e.jsx(Z,{user:s}),e.jsx(ee,{stats:j})]}),e.jsx(re,{level:(i==null?void 0:i.rank)||1}),e.jsx(se,{sponsors:(s==null?void 0:s.sponsors)||[]}),e.jsx(Q,{children:r?e.jsx("div",{className:"actions",children:e.jsx(v,{variant:"secondary",size:"xs",children:"Edit Profile"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"interaction",children:e.jsx(N,{to:"/inbox",children:e.jsx(z,{size:"lg",color:"inputBgColor",variant:"filled",children:e.jsx(n,{size:"xs",children:e.jsx(U,{Icon:D,hoverClass:"hoverGrey"})})})})}),e.jsxs("div",{className:"actions",children:[e.jsx(E,{targetUserId:s.id,onChange:u=>console.log("Followed:",u)}),e.jsx(v,{variant:"primary",size:"xs",children:"Sponsor"})]})]})})]})]})]})},h={self:[{label:"DASHBOARD",value:o.ACCOUNTS.DASHBOARD.ROOT},{label:"PROFILE",value:o.ACCOUNTS.PROFILE.ROOT},{label:"SPONSORSHIPS",value:o.ACCOUNTS.SPONSORSHIPS.ROOT},{label:"OFFERINGS",value:o.ACCOUNTS.OFFERINGS.ROOT},{label:"STATS",value:o.ACCOUNTS.STATS.ROOT},{label:"NEWSFEED",value:o.ACCOUNTS.NEWSFEED.ROOT},{label:"INBOX",value:o.ACCOUNTS.INBOX.ROOT}],otherCreator:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"SPONSORSHIPS",value:o.helpers.sponsorship(s)},{label:"OFFERINGS",value:o.helpers.offering(s)},{label:"INBOX",value:o.helpers.inbox(s)}],otherBrand:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"SPONSORSHIPS",value:o.helpers.sponsorship(s)},{label:"OFFERINGS",value:o.helpers.offering(s)},{label:"INBOX",value:o.helpers.inbox(s)}],otherCommunity:s=>[{label:"PROFILE",value:o.helpers.profile(s)},{label:"INBOX",value:o.helpers.inbox(s)}]};function Le(){const{id:s}=O(),{user:r}=S(L),{get:c}=k(),[t,p]=g.useState(null),a=!s||Number(r==null?void 0:r.id)===Number(s);g.useEffect(()=>{if(window.scrollTo(0,0),!s||a)return;(async()=>{try{const i=await G(c,s);p(i)}catch(i){console.error("Error fetching user data:",i)}})()},[s,a]);let m=h.self;return!a&&(t!=null&&t.user_type)&&(t.user_type===d.CREATOR&&(m=h.otherCreator(s)),t.user_type===d.BRAND&&(m=h.otherBrand(s)),t.user_type===d.COMMUNITY&&(m=h.otherCommunity(s))),e.jsxs(e.Fragment,{children:[e.jsx(ie,{userProfile:a?r:t,isSelf:a}),e.jsx(P,{tabLists:m}),e.jsx(b,{mt:40,children:e.jsx(y,{context:{userProfile:a?r:t,isSelf:a}})})]})}export{Le as default};
