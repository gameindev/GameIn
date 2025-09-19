import{c as F,f as I,u as N,j as r,B as R,b as H,U as J,J as A,g as q,E as Q,I as X,G as Y,t as f,d as Z,k as tt,x as et}from"./index-Ddh2FbSx.js";import{g as at}from"./get-auto-contrast-value-Da6zqqWm.js";import{c as ot}from"./create-scoped-keydown-handler-O-eo68DQ.js";import{u as st,a as nt}from"./DirectionProvider-DznSjpHc.js";import{u as it}from"./use-uncontrolled-DUnM3McR.js";function V(s,n){return e=>{if(typeof e!="string"||e.trim().length===0)throw new Error(n);return`${s}-${e}`}}const[rt,K]=F("Tabs component was not found in the tree");var x={root:"m_89d60db1","list--default":"m_576c9d4",list:"m_89d33d6d",tab:"m_4ec4dce6",panel:"m_b0c91715",tabSection:"m_fc420b1f",tabLabel:"m_42bbd1ae","tab--default":"m_539e827b","list--outline":"m_6772fbd5","tab--outline":"m_b59ab47c","tab--pills":"m_c3381914"};const z=I((s,n)=>{const e=N("TabsList",null,s),{children:o,className:b,grow:c,justify:l,classNames:i,styles:d,style:v,mod:u,...m}=e,a=K();return r.jsx(R,{...m,...a.getStyles("list",{className:b,style:v,classNames:i,styles:d,props:e,variant:a.variant}),ref:n,role:"tablist",variant:a.variant,mod:[{grow:c,orientation:a.orientation,placement:a.orientation==="vertical"&&a.placement,inverted:a.inverted},u],"aria-orientation":a.orientation,__vars:{"--tabs-justify":l},children:o})});z.classes=x;z.displayName="@mantine/core/TabsList";const D=I((s,n)=>{const e=N("TabsPanel",null,s),{children:o,className:b,value:c,classNames:l,styles:i,style:d,mod:v,keepMounted:u,...m}=e,a=K(),y=a.value===c,h=a.keepMounted||u||y?o:null;return r.jsx(R,{...a.getStyles("panel",{className:b,classNames:l,styles:i,style:[d,y?void 0:{display:"none"}],props:e}),ref:n,mod:[{orientation:a.orientation},v],role:"tabpanel",id:a.getPanelId(c),"aria-labelledby":a.getTabId(c),...m,children:h})});D.classes=x;D.displayName="@mantine/core/TabsPanel";const E=I((s,n)=>{const e=N("TabsTab",null,s),{className:o,children:b,rightSection:c,leftSection:l,value:i,onClick:d,onKeyDown:v,disabled:u,color:m,style:a,classNames:y,styles:h,vars:P,mod:S,tabIndex:j,...C}=e,L=H(),{dir:_}=st(),t=K(),T=i===t.value,$=k=>{t.onChange(t.allowTabDeactivation&&i===t.value?null:i),d==null||d(k)},g={classNames:y,styles:h,props:e};return r.jsxs(J,{...C,...t.getStyles("tab",{className:o,style:a,variant:t.variant,...g}),disabled:u,unstyled:t.unstyled,variant:t.variant,mod:[{active:T,disabled:u,orientation:t.orientation,inverted:t.inverted,placement:t.orientation==="vertical"&&t.placement},S],ref:n,role:"tab",id:t.getTabId(i),"aria-selected":T,tabIndex:j!==void 0?j:T||t.value===null?0:-1,"aria-controls":t.getPanelId(i),onClick:$,__vars:{"--tabs-color":m?A(m,L):void 0},onKeyDown:ot({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:t.activateTabWithKeyboard,loop:t.loop,orientation:t.orientation||"horizontal",dir:_,onKeyDown:v}),children:[l&&r.jsx("span",{...t.getStyles("tabSection",g),"data-position":"left",children:l}),b&&r.jsx("span",{...t.getStyles("tabLabel",g),children:b}),c&&r.jsx("span",{...t.getStyles("tabSection",g),"data-position":"right",children:c})]})});E.classes=x;E.displayName="@mantine/core/TabsTab";const U="Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value",lt={keepMounted:!0,orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,variant:"default",placement:"left"},ct=Q((s,{radius:n,color:e,autoContrast:o})=>({root:{"--tabs-radius":Y(n),"--tabs-color":A(e,s),"--tabs-text-color":at(o,s)?X({color:e,theme:s,autoContrast:o}):void 0}})),p=I((s,n)=>{const e=N("Tabs",lt,s),{defaultValue:o,value:b,onChange:c,orientation:l,children:i,loop:d,id:v,activateTabWithKeyboard:u,allowTabDeactivation:m,variant:a,color:y,radius:h,inverted:P,placement:S,keepMounted:j,classNames:C,styles:L,unstyled:_,className:t,style:T,vars:$,autoContrast:g,mod:k,attributes:B,...W}=e,w=nt(v),[G,O]=it({value:b,defaultValue:o,finalValue:null,onChange:c}),M=q({name:"Tabs",props:e,classes:x,className:t,style:T,classNames:C,styles:L,unstyled:_,attributes:B,vars:$,varsResolver:ct});return r.jsx(rt,{value:{placement:S,value:G,orientation:l,id:w,loop:d,activateTabWithKeyboard:u,getTabId:V(`${w}-tab`,U),getPanelId:V(`${w}-panel`,U),onChange:O,allowTabDeactivation:m,variant:a,color:y,radius:h,inverted:P,keepMounted:j,unstyled:_,getStyles:M},children:r.jsx(R,{ref:n,id:w,variant:a,mod:[{orientation:l,inverted:l==="horizontal"&&P,placement:l==="vertical"&&S},k],...M("root"),...W,children:i})})});p.classes=x;p.displayName="@mantine/core/Tabs";p.Tab=E;p.Panel=D;p.List=z;const dt=Z.div`
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
`;function yt({tabLists:s}){const n=tt(),e=et();return r.jsx(dt,{children:r.jsx(p,{value:e.pathname,onChange:o=>n(o),variant:"none",children:r.jsx(p.List,{children:s.map(o=>r.jsx(p.Tab,{value:o.value,children:o.label},o.value))})})})}export{yt as I};
