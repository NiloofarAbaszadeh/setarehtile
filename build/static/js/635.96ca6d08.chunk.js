"use strict";(self.webpackChunksetarehtile=self.webpackChunksetarehtile||[]).push([[635],{96007:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(72791),n=a(11087),l=a(59434),r=a(27245),i=a(80184);const c=e=>{const t=(0,l.v9)((e=>e.State.host));return(0,s.useEffect)((()=>{}),[e.data]),(0,i.jsx)("div",{children:e.data.map((a=>(0,i.jsxs)(r.m.div,{className:"blog-sideimage py-0 rounded-[3px]",...e.animation,children:[(0,i.jsx)("div",{className:"blog-post-image",children:(0,i.jsx)(n.rU,{"aria-label":"link",to:"".concat(e.link).concat([a.attributes.title]),children:(0,i.jsx)("img",{loading:"lazy",height:"",width:"",alt:"",src:"".concat(t).concat(a.attributes.mainImage.data.attributes.formats.large.url)})})}),(0,i.jsxs)("div",{className:"post-details",children:[(0,i.jsxs)("span",{className:"c-c-red text-[13px]",children:[" ",a.attributes.date," "]}),(0,i.jsx)(n.rU,{"aria-label":"link",to:"".concat(e.link).concat([a.attributes.title]),className:"blg-post-title my-[10px]",children:(0,i.jsxs)("span",{children:[" ",a.attributes.title," "]})}),(0,i.jsx)("p",{className:"text-[13px] text-justify text-gray",children:a.attributes.summery}),(0,i.jsx)("div",{className:"blog-author",children:(0,i.jsx)("span",{children:(0,i.jsxs)("span",{className:"text-gray",children:["\u0646\u0648\u0634\u062a\u0647 \u0634\u062f\u0647 \u062a\u0648\u0633\u0637 ",(0,i.jsxs)("span",{className:"c-c-red",children:[" ",a.attributes.author.data.attributes.fullName]})]})})})]})]},a.id)))})},o=(0,s.memo)(c)},4635:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(72791),n=a(59434),l=a(55294),r=a(47022),i=a(89743),c=a(2677),o=a(96007),d=a(57689),p=a(33050),u=a(38616),m=a(25810),h=a(80184);const x=()=>{const e=(0,d.TH)(),t=(0,n.v9)((e=>e.State.readToken)),a=(0,n.v9)((e=>e.State.host)),[x,f]=(0,s.useState)(null),[g,v]=(0,s.useState)(0),[b,j]=(0,s.useState)(0),[y,N]=(0,s.useState)(6),[w,k]=(0,s.useState)(),[S,O]=(0,s.useState)(1),[Z,E]=(0,s.useState)([]);(0,s.useEffect)((()=>{l.Z.get("".concat(a,"/api/news-elements?populate=deep"),{headers:{Authorization:"Bearer ".concat(t)}}).then((e=>{k(e.data.data.slice().reverse());const t=e.data.data.length%6!==0?e.data.data.length/6+1:e.data.data.length/6;v(t.toFixed(0)),(e=>{var t=0;for(t=1;t<e;t++)E((e=>[...e,t]))})(t.toFixed(0))})),l.Z.get("".concat(a,"/api/news-page?populate=deep"),{headers:{Authorization:"Bearer ".concat(t)}}).then((e=>{f(e.data.data)}))}),[a,t]);const z=e=>{window.scrollTo({top:0,behavior:"smooth"});const t=e.target.value;"next"===t?S<g&&O((e=>e+1)):"per"===t?1!==S&&O((e=>e-1)):O(t),(e=>{"next"===e?S<g&&(j((e=>e+6)),N((e=>e+6))):"per"===e?S>1&&(j((e=>e-6)),N((e=>e-6))):(j(6*e-6),N(6*e))})(t)};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.ql,{children:(0,h.jsx)("title",{children:" \u0627\u062e\u0628\u0627\u0631 | \u06a9\u0627\u0634\u06cc \u0648 \u0633\u0631\u0627\u0645\u06cc\u06a9 \u0633\u062a\u0627\u0631\u0647  "})}),!x&&!w&&(0,h.jsx)("div",{className:"flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]",children:(0,h.jsx)(m.Z,{color:"#db1010",loading:!x,size:50,"aria-label":"Loading Spinner","data-testid":"loader"})}),x&&w&&(0,h.jsxs)("div",{className:"h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative",children:[(0,h.jsx)("div",{className:"absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]"}),(0,h.jsx)(u.VS,{className:"lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]",translateY:[-40,40],style:{backgroundImage:"url(".concat(a).concat(x.attributes.boardImage.data.attributes.formats.custom.url,")")}}),(0,h.jsx)(r.Z,{className:"h-full relative z-[2]",children:(0,h.jsx)(i.Z,{className:"justify-center h-full",children:(0,h.jsx)(c.Z,{xl:6,lg:7,md:8,className:"relative font-serif text-center flex justify-center flex-col",children:(0,h.jsx)("h2",{className:"text-white font-medium -tracking-[1px] mb-0 text-[50px]",children:x.attributes.title})})})})]}),(0,h.jsx)("div",{className:"py-3 bg-lightgray"}),(0,h.jsxs)("section",{className:"overflow-hidden relative px-[11%] pb-[130px] bg-lightgray lg:px-0 lg:pb-[90px] md:pb-[75px] sm:pb-[50px]",children:[(0,h.jsx)(r.Z,{children:(0,h.jsx)(i.Z,{className:"justify-center",children:(0,h.jsx)(c.Z,{xl:10,sm:9,md:12,children:w&&(0,h.jsx)(o.Z,{link:"".concat(e.pathname,"/"),pagination:!0,data:w.slice(b,y)})})})}),x&&(0,h.jsx)("div",{className:"flex justify-center mt-[7.5rem] md:mt-20",children:(0,h.jsxs)("ul",{className:"pagination pagination-style-01 font-sans font-medium items-center",children:[(0,h.jsx)("li",{className:"page-item",children:(0,h.jsx)("button",{className:"feather-arrow-right text-lg page-link",onClick:z,value:"per"})}),Z.map(((e,t)=>(0,h.jsx)("li",{className:"page-item",onClick:z,children:(0,h.jsxs)("button",{className:"page-link",value:t+1,children:[" ",t+1," "]})}))),(0,h.jsx)("li",{className:"page-item",children:(0,h.jsx)("button",{className:"feather-arrow-left text-lg page-link",onClick:z,value:"next"})})]})})]})]})}},47022:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(81694),n=a.n(s),l=a(72791),r=a(10162),i=a(80184);const c=l.forwardRef(((e,t)=>{let{bsPrefix:a,fluid:s=!1,as:l="div",className:c,...o}=e;const d=(0,r.vE)(a,"container"),p="string"===typeof s?"-".concat(s):"-fluid";return(0,i.jsx)(l,{ref:t,...o,className:n()(c,s?"".concat(d).concat(p):d)})}));c.displayName="Container";const o=c},25810:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(72791),n={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function l(e){var t=function(e){if("number"===typeof e)return{value:e,unit:"px"};var t,a=(e.match(/^[0-9.]*/)||"").toString();t=a.includes(".")?parseFloat(a):parseInt(a,10);var s=(e.match(/[^0-9]*$/)||"").toString();return n[s]?{value:t,unit:s}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}(e);return"".concat(t.value).concat(t.unit)}var r=function(){return r=Object.assign||function(e){for(var t,a=1,s=arguments.length;a<s;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},r.apply(this,arguments)},i=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(s=Object.getOwnPropertySymbols(e);n<s.length;n++)t.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(e,s[n])&&(a[s[n]]=e[s[n]])}return a},c=function(e,t,a){var s="react-spinners-".concat(e,"-").concat(a);if("undefined"==typeof window||!window.document)return s;var n=document.createElement("style");document.head.appendChild(n);var l=n.sheet,r="\n    @keyframes ".concat(s," {\n      ").concat(t,"\n    }\n  ");return l&&l.insertRule(r,0),s}("ScaleLoader","0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}","scale");const o=function(e){var t=e.loading,a=void 0===t||t,n=e.color,o=void 0===n?"#000000":n,d=e.speedMultiplier,p=void 0===d?1:d,u=e.cssOverride,m=void 0===u?{}:u,h=e.height,x=void 0===h?35:h,f=e.width,g=void 0===f?4:f,v=e.radius,b=void 0===v?2:v,j=e.margin,y=void 0===j?2:j,N=i(e,["loading","color","speedMultiplier","cssOverride","height","width","radius","margin"]),w=r({display:"inherit"},m),k=function(e){return{backgroundColor:o,width:l(g),height:l(x),margin:l(y),borderRadius:l(b),display:"inline-block",animation:"".concat(c," ").concat(1/p,"s ").concat(.1*e,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return a?s.createElement("span",r({style:w},N),s.createElement("span",{style:k(1)}),s.createElement("span",{style:k(2)}),s.createElement("span",{style:k(3)}),s.createElement("span",{style:k(4)}),s.createElement("span",{style:k(5)})):null}}}]);
//# sourceMappingURL=635.96ca6d08.chunk.js.map