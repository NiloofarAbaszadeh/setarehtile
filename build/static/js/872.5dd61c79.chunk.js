"use strict";(self.webpackChunksetarehtile=self.webpackChunksetarehtile||[]).push([[872],{48427:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(72791),l=a(11087),r=a(27245),i=a(59434),n=a(80184);const c=e=>{const t=(0,i.v9)((e=>e.State.host)),a={"--overlay-color":"object"===typeof e.overlay?"linear-gradient(to right top, ".concat(e.overlay.map(((e,t)=>e)),")"):e.overlay};return(0,n.jsx)("div",{className:"mt-12",children:(0,n.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-1 gap-[35px]",children:e.data.map((e=>(0,n.jsx)("div",{children:e.attributes&&(0,n.jsxs)(r.m.div,{className:"blog-Simple xs:block h-[550px] xs:h-full",style:a,initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.5,ease:"easeOut"},children:[(0,n.jsx)("div",{className:"blog-post-image xs:h-[250px] w-full",style:{backgroundImage:"url(".concat(t).concat(e.attributes.mainImage.data.attributes.formats.custom.url,")")},children:(0,n.jsx)(l.rU,{"aria-label":"link",to:"/research/".concat(e.attributes.title)})}),(0,n.jsxs)("div",{className:"post-details",children:[(0,n.jsx)(l.rU,{"aria-label":"link",to:"/research/".concat(e.attributes.title),className:"blog-category rounded-[10px]",children:(0,n.jsx)("div",{className:"text-md",children:e.attributes.subject})}),(0,n.jsx)(l.rU,{"aria-label":"link",to:"/research/".concat(e.attributes.title),className:"blog-title ",children:(0,n.jsx)("div",{className:"text-xlg font-bold",children:e.attributes.title})}),(0,n.jsx)("p",{className:"mt-[10px] mb-[25px] xl:mb-[25px] md:mb-[20px] xs:mb-[15px] text-gray text-justify line-clamp-[6] xs:line-clamp-[3] text-[14px]",children:e.attributes.discraption}),(0,n.jsx)("div",{className:"c-c-red font-lg",children:e.attributes.author.data.attributes.fullName})]})]})},e.id)))})})},o=(0,s.memo)(c)},11872:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(72791),l=a(55294),r=a(59434),i=a(47022),n=a(89743),c=a(2677),o=a(48427),d=a(33050),p=a(38616),m=a(25810),u=a(80184);const x=()=>{const e=(0,r.v9)((e=>e.State.readToken)),t=(0,r.v9)((e=>e.State.host)),[a,x]=(0,s.useState)(),[h,g]=(0,s.useState)(0),[f,v]=(0,s.useState)(0),[b,j]=(0,s.useState)(8),[y,N]=(0,s.useState)(),[w,k]=(0,s.useState)(1),[S,O]=(0,s.useState)([]);(0,s.useEffect)((()=>{l.Z.get("".concat(t,"/api/researchs?populate=deep"),{headers:{Authorization:"Bearer ".concat(e)}}).then((e=>{N(e.data.data.slice().reverse());const t=e.data.data.length%8!==0?e.data.data.length/8+1:e.data.data.length/8;g(t.toFixed(0)),(e=>{for(var t=1;t<e;t++)O((e=>[...e,t]))})(t.toFixed(0))})),l.Z.get("".concat(t,"/api/research-page?populate=deep"),{headers:{Authorization:"Bearer ".concat(e)}}).then((e=>{x(e.data.data)}))}),[t,e]);const Z=e=>{window.scrollTo({top:0,behavior:"smooth"});const t=e.target.value;"next"===t?w<h&&k((e=>e+1)):"per"===t?1!==w&&k((e=>e-1)):k(t),(e=>{"next"===e?w<h&&(v((e=>e+8)),j((e=>e+8))):"per"===e?w>1&&(v((e=>e-8)),j((e=>e-8))):(v(8*e-8),j(8*e))})(t)};return(0,u.jsxs)("div",{className:"bg-lightgray pb-[7.5rem] md:pb-20",children:[(0,u.jsx)(d.ql,{children:(0,u.jsx)("title",{children:" \u0645\u0642\u0627\u0644\u0627\u062a | \u06a9\u0627\u0634\u06cc \u0648 \u0633\u0631\u0627\u0645\u06cc\u06a9 \u0633\u062a\u0627\u0631\u0647  "})}),!a&&(0,u.jsx)("div",{className:"flex justify-center items-center bg-white w-full h-[100vh] fixed top-0 fix z-50 top-[-25px]",children:(0,u.jsx)(m.Z,{color:"#db1010",loading:!a,size:50,"aria-label":"Loading Spinner","data-testid":"loader"})}),a&&(0,u.jsxs)("div",{className:"h-[400px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative",children:[(0,u.jsx)("div",{className:"absolute top-0 left-0 w-full h-full bg-darkgray opacity-70 z-[1]"}),(0,u.jsx)(p.VS,{className:"lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]",translateY:[-40,40],style:{backgroundImage:"url(".concat(t).concat(a.attributes.boardImage.data.attributes.formats.custom.url,")")}}),(0,u.jsx)(i.Z,{className:"h-full relative z-[2]",children:(0,u.jsx)(n.Z,{className:"justify-center h-full",children:(0,u.jsx)(c.Z,{xl:6,lg:7,md:8,className:"relative font-serif text-center flex justify-center flex-col",children:(0,u.jsx)("h2",{className:"text-white font-medium -tracking-[1px] mb-0 text-[50px]",children:a.attributes.title})})})})]}),(0,u.jsx)("div",{className:"py-3 bg-lightgray"}),(0,u.jsx)("section",{className:"overflow-hidden relative px-[5%] pb-[70px] bg-lightgray lg:pb-[60px] lg:px-0 md:pb-[55px] sm:pb-[40px]",children:(0,u.jsx)(i.Z,{fluid:!0,children:(0,u.jsx)(n.Z,{className:"justify-center lg:mx-8 md:mx-0 xs:mx-8",children:(0,u.jsx)(c.Z,{xl:12,lg:12,sm:10,className:"lg:px-0",children:y&&(0,u.jsx)(o.Z,{link:"/research/",overlay:"#374162",pagination:!0,data:y.slice(f,b)})})})})}),y&&(0,u.jsx)("div",{className:"flex justify-center mt-[3.5rem] md:mt-20",children:(0,u.jsxs)("ul",{className:"pagination pagination-style-01 font-sans font-medium items-center",children:[(0,u.jsx)("li",{className:"page-item",children:(0,u.jsx)("button",{className:"feather-arrow-right text-lg page-link",onClick:Z,value:"per"})}),S[0]?S.map(((e,t)=>(0,u.jsx)("li",{className:"page-item",onClick:Z,children:(0,u.jsxs)("button",{className:"page-link",value:t+1,children:[" ",t+1," "]})}))):(0,u.jsx)("li",{className:"page-item",onClick:Z,children:(0,u.jsx)("button",{className:"page-link",value:1,children:" 1 "})}),(0,u.jsx)("li",{className:"page-item",children:(0,u.jsx)("button",{className:"feather-arrow-left text-lg page-link",onClick:Z,value:"next"})})]})})]})}},47022:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(81694),l=a.n(s),r=a(72791),i=a(10162),n=a(80184);const c=r.forwardRef(((e,t)=>{let{bsPrefix:a,fluid:s=!1,as:r="div",className:c,...o}=e;const d=(0,i.vE)(a,"container"),p="string"===typeof s?"-".concat(s):"-fluid";return(0,n.jsx)(r,{ref:t,...o,className:l()(c,s?"".concat(d).concat(p):d)})}));c.displayName="Container";const o=c},25810:(e,t,a)=>{a.d(t,{Z:()=>o});var s=a(72791),l={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function r(e){var t=function(e){if("number"===typeof e)return{value:e,unit:"px"};var t,a=(e.match(/^[0-9.]*/)||"").toString();t=a.includes(".")?parseFloat(a):parseInt(a,10);var s=(e.match(/[^0-9]*$/)||"").toString();return l[s]?{value:t,unit:s}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}(e);return"".concat(t.value).concat(t.unit)}var i=function(){return i=Object.assign||function(e){for(var t,a=1,s=arguments.length;a<s;a++)for(var l in t=arguments[a])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e},i.apply(this,arguments)},n=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var l=0;for(s=Object.getOwnPropertySymbols(e);l<s.length;l++)t.indexOf(s[l])<0&&Object.prototype.propertyIsEnumerable.call(e,s[l])&&(a[s[l]]=e[s[l]])}return a},c=function(e,t,a){var s="react-spinners-".concat(e,"-").concat(a);if("undefined"==typeof window||!window.document)return s;var l=document.createElement("style");document.head.appendChild(l);var r=l.sheet,i="\n    @keyframes ".concat(s," {\n      ").concat(t,"\n    }\n  ");return r&&r.insertRule(i,0),s}("ScaleLoader","0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}","scale");const o=function(e){var t=e.loading,a=void 0===t||t,l=e.color,o=void 0===l?"#000000":l,d=e.speedMultiplier,p=void 0===d?1:d,m=e.cssOverride,u=void 0===m?{}:m,x=e.height,h=void 0===x?35:x,g=e.width,f=void 0===g?4:g,v=e.radius,b=void 0===v?2:v,j=e.margin,y=void 0===j?2:j,N=n(e,["loading","color","speedMultiplier","cssOverride","height","width","radius","margin"]),w=i({display:"inherit"},u),k=function(e){return{backgroundColor:o,width:r(f),height:r(h),margin:r(y),borderRadius:r(b),display:"inline-block",animation:"".concat(c," ").concat(1/p,"s ").concat(.1*e,"s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),animationFillMode:"both"}};return a?s.createElement("span",i({style:w},N),s.createElement("span",{style:k(1)}),s.createElement("span",{style:k(2)}),s.createElement("span",{style:k(3)}),s.createElement("span",{style:k(4)}),s.createElement("span",{style:k(5)})):null}}}]);
//# sourceMappingURL=872.5dd61c79.chunk.js.map