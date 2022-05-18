"use strict";(self.webpackChunkdeveloperdocs=self.webpackChunkdeveloperdocs||[]).push([[671],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return m}});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),p=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||a;return r?o.createElement(h,i(i({ref:t},d),{},{components:r})):o.createElement(h,i({ref:t},d))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var p=2;p<a;p++)i[p]=r[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}u.displayName="MDXCreateElement"},9881:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return c}});var o=r(7462),n=r(3366),a=(r(7294),r(3905)),i=["components"],s={sidebar_position:1},l="Intro",p={unversionedId:"intro",id:"intro",title:"Intro",description:"Hermes-swap is the Core of Hermes Dex products. This set of contracts are used in several products, such as MasterChefV2, HermesBar, among others.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/Developer-docs/docs/intro",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Hermes Token",permalink:"/Developer-docs/docs/Hermes Token"}},d={},c=[{value:"Video",id:"video",level:2},{value:"Getting Started",id:"getting-started",level:2},{value:"App",id:"app",level:2},{value:"Tools",id:"tools",level:3}],u={toc:c};function m(e){var t=e.components,r=(0,n.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"intro"},"Intro"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Hermes-swap")," is the Core of Hermes Dex products. This set of contracts are used in several products, such as MasterChefV2, HermesBar, among others.\nThe purpose of this manual is to explain the operation of each part that makes up this set of utilities."),(0,a.kt)("h1",{id:"documentation"},"Documentation"),(0,a.kt)("p",null,"Are you part of ",(0,a.kt)("strong",{parentName:"p"},"Hermes")," heroes and want to contribute with some documentation? Please fell free to contribute. Our documentation is docusaurus based. With this simple commands, you can create and edit our docs!"),(0,a.kt)("p",null,"The first command is to remove the folder that you have cloned before, ensure that you are on the right directory. ",(0,a.kt)("strong",{parentName:"p"},"Replace SETYOURPERSONALGITTOKENHERE for your git personal token")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"git clone ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/Developer-docs.git"},"https://github.com/Hermes-defi/Developer-docs.git")),(0,a.kt)("li",{parentName:"ol"},"cd Developer-docs"),(0,a.kt)("li",{parentName:"ol"},"npm install"),(0,a.kt)("li",{parentName:"ol"},"Write more docs"),(0,a.kt)("li",{parentName:"ol"},"npx docusaurus build"),(0,a.kt)("li",{parentName:"ol"},"GIT_USER=valleyrider yarn deploy")),(0,a.kt)("p",null,"(paste your gpg personal token and press enter) "),(0,a.kt)("h2",{id:"video"},"Video"),(0,a.kt)("p",null,"Please check our video for ",(0,a.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1fTbo20-scaz3Z3SyImP-wq_DkGT0H9hw/view?usp=sharing"},"https://drive.google.com/file/d/1fTbo20-scaz3Z3SyImP-wq_DkGT0H9hw/view?usp=sharing")),(0,a.kt)("h2",{id:"getting-started"},"Getting Started"),(0,a.kt)("p",null,"Get started by ",(0,a.kt)("strong",{parentName:"p"},"deploy a Hermes contract"),"."),(0,a.kt)("p",null,"We advise you to read it in the following order for better understanding. However, feel free to read in the order that suits you best."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Hermes%20Token"},"Hemes Token")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Hermes%20Swap"},"Hermes Swap")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/MasterChefHermesV2"},"MasterChefV2")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Dual%20Farms"},"Dual Farms")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Staking"},"Staking")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/SingleStakingPool"},"SingleStakingPool")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/StableHermesStaking"},"StableHermesStaking")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Hermes%20Bar"},"Hermes Bar")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Distributor"},"Distributor")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"https://hermes-defi.github.io/Developer-docs/docs/Liquidity%20Transfer"},"Liquidity TransferService"))),(0,a.kt)("h2",{id:"app"},"App"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"try Hermes immediately")," with ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://www.hermesdefi.io/"},"hermes defi website")),"."),(0,a.kt)("h3",{id:"tools"},"Tools"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org/en/download/"},"Node.js")," version 14 or above:"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"When installing Node.js, you are recommended to check all checkboxes related to dependencies."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/v0.8.13/installing-solidity.html"},"Solidity"),":"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"When installing Solidity, you are recommended to check all checkboxes related to dependencies."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"https://hardhat.org/getting-started/"},"Hardhat"),":"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software.")))))}m.isMDXComponent=!0}}]);