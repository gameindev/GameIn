import{f as N,u as I,j as c,B as k,b as G,U as H,z as W,e as q,v as J,y as Q,w as X,t as f,d as Y,h as Z,o as tt}from"./index-KaOkpbgD.js";import{g as et}from"./get-auto-contrast-value-Da6zqqWm.js";import{c as at}from"./create-safe-context-DyzOCSRN.js";import{c as ot}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as nt,a as st}from"./DirectionProvider-BAcK1-7b.js";import{u as rt}from"./use-uncontrolled-DeQvrbay.js";function E(n,s){return e=>{if(typeof e!="string"||e.trim().length===0)throw new Error(s);return`${n}-${e}`}}const[it,z]=at("Tabs component was not found in the tree");var x={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const K=N((n,s)=>{const e=I("TabsList",null,n),{children:r,className:d,grow:i,justify:o,classNames:l,styles:u,style:p,mod:b,...m}=e,a=z();return c.jsx(k,{...m,...a.getStyles("list",{className:d,style:p,classNames:l,styles:u,props:e,variant:a.variant}),ref:s,role:"tablist",variant:a.variant,mod:[{grow:i,orientation:a.orientation,placement:a.orientation==="vertical"&&a.placement,inverted:a.inverted},b],"aria-orientation":a.orientation,__vars:{"--tabs-justify":o},children:r})});K.classes=x;K.displayName="@mantine/core/TabsList";const D=N((n,s)=>{const e=I("TabsPanel",null,n),{children:r,className:d,value:i,classNames:o,styles:l,style:u,mod:p,keepMounted:b,...m}=e,a=z(),h=a.value===i,y=a.keepMounted||b||h?r:null;return c.jsx(k,{...a.getStyles("panel",{className:d,classNames:o,styles:l,style:[u,h?void 0:{display:"none"}],props:e}),ref:s,mod:[{orientation:a.orientation},p],role:"tabpanel",id:a.getPanelId(i),"aria-labelledby":a.getTabId(i),...m,children:y})});D.classes=x;D.displayName="@mantine/core/TabsPanel";const M=N((n,s)=>{const e=I("TabsTab",null,n),{className:r,children:d,rightSection:i,leftSection:o,value:l,onClick:u,onKeyDown:p,disabled:b,color:m,style:a,classNames:h,styles:y,vars:P,mod:S,tabIndex:j,...C}=e,$=G(),{dir:_}=nt(),t=z(),T=l===t.value,L=R=>{t.onChange(t.allowTabDeactivation&&l===t.value?null:l),u==null||u(R)},g={classNames:h,styles:y,props:e};return c.jsxs(H,{...C,...t.getStyles("tab",{className:r,style:a,variant:t.variant,...g}),disabled:b,unstyled:t.unstyled,variant:t.variant,mod:[{active:T,disabled:b,orientation:t.orientation,inverted:t.inverted,placement:t.orientation==="vertical"&&t.placement},S],ref:s,role:"tab",id:t.getTabId(l),"aria-selected":T,tabIndex:j!==void 0?j:T||t.value===null?0:-1,"aria-controls":t.getPanelId(l),onClick:L,__vars:{"--tabs-color":m?W(m,$):void 0},onKeyDown:ot({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:t.activateTabWithKeyboard,loop:t.loop,orientation:t.orientation||"horizontal",dir:_,onKeyDown:p}),children:[o&&c.jsx("span",{...t.getStyles("tabSection",g),"data-position":"left",children:o}),d&&c.jsx("span",{...t.getStyles("tabLabel",g),children:d}),i&&c.jsx("span",{...t.getStyles("tabSection",g),"data-position":"right",children:i})]})});M.classes=x;M.displayName="@mantine/core/TabsTab";const U="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",lt={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},ct=J((n,{radius:s,color:e,autoContrast:r})=>({root:{"--tabs-radius":X(s),"--tabs-color":W(e,n),"--tabs-text-color":et(r,n)?Q({color:e,theme:n,autoContrast:r}):void 0}})),v=N((n,s)=>{const e=I("Tabs",lt,n),{defaultValue:r,value:d,onChange:i,orientation:o,children:l,loop:u,id:p,activateTabWithKeyboard:b,allowTabDeactivation:m,variant:a,color:h,radius:y,inverted:P,placement:S,keepMounted:j,classNames:C,styles:$,unstyled:_,className:t,style:T,vars:L,autoContrast:g,mod:R,attributes:A,...B}=e,w=st(p),[O,F]=rt({value:d,defaultValue:r,finalValue:null,onChange:i}),V=q({name:"Tabs",props:e,classes:x,className:t,style:T,classNames:C,styles:$,unstyled:_,attributes:A,vars:L,varsResolver:ct});return c.jsx(it,{value:{placement:S,value:O,orientation:o,id:w,loop:u,activateTabWithKeyboard:b,getTabId:E(`${w}-tab`,U),getPanelId:E(`${w}-panel`,U),onChange:F,allowTabDeactivation:m,variant:a,color:h,radius:y,inverted:P,keepMounted:j,unstyled:_,getStyles:V},children:c.jsx(k,{ref:s,id:w,variant:a,mod:[{orientation:o,inverted:o==="horizontal"&&P,placement:o==="vertical"&&S},R],...V("root"),...B,children:l})})});v.classes=x;v.displayName="@mantine/core/Tabs";v.Tab=M;v.Panel=D;v.List=K;const dt=Y.div`
  position: relative;
  background-color: ${f.colors.secondaryGrey[0]};
  border-radius: ${f.radius.md};
  margin-top: 0.625em;
  padding: 1em 0.5em;

  button span {
    font-size: ${f.fontSizes.sm};
    font-weight: 600;
  }

  button[data-active] span {
    position: relative;
    color: ${f.colors.primary[0]};

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.5em;
      width: 100%;
      height: 0.125em;
      border-radius: 50em;
      background: ${f.colors.primary[0]};
    }
  }
`;function yt({tabLists:n}){var d,i;const s=Z(),e=tt(),r=((d=n.find(o=>e.pathname.startsWith(o.value)))==null?void 0:d.value)||((i=n[0])==null?void 0:i.value);return c.jsx(dt,{children:c.jsx(v,{value:r,onChange:o=>s(o),variant:"none",children:c.jsx(v.List,{children:n.map(o=>c.jsx(v.Tab,{value:o.value,children:o.label},o.value))})})})}export{yt as I};
