"use strict";(self.webpackChunkdeveloperdocs=self.webpackChunkdeveloperdocs||[]).push([[12],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return u}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),p=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=p(e.components);return a.createElement(i.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(r),u=n,h=c["".concat(i,".").concat(u)]||c[u]||m[u]||o;return r?a.createElement(h,l(l({ref:t},d),{},{components:r})):a.createElement(h,l({ref:t},d))}));function u(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,l=new Array(o);l[0]=c;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var p=2;p<o;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},1698:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return m}});var a=r(7462),n=r(3366),o=(r(7294),r(3905)),l=["components"],s={title:"MasterChefV2",description:"How does the MasterChefV2 contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:new Date("2022-05-14T00:00:00.000Z"),lang:"en",sidebar_position:3},i="MasterChefHermesV2 and Double Reward Farms",p={unversionedId:"Hermes Swap/MasterChefHermesV2",id:"Hermes Swap/MasterChefHermesV2",title:"MasterChefV2",description:"How does the MasterChefV2 contract work? Why is it written that way?",source:"@site/docs/Hermes Swap/MasterChefHermesV2.md",sourceDirName:"Hermes Swap",slug:"/Hermes Swap/MasterChefHermesV2",permalink:"/Developer-docs/docs/Hermes Swap/MasterChefHermesV2",draft:!1,tags:[{label:"solidity",permalink:"/Developer-docs/docs/tags/solidity"},{label:"hermes",permalink:"/Developer-docs/docs/tags/hermes"}],version:"current",sidebarPosition:3,frontMatter:{title:"MasterChefV2",description:"How does the MasterChefV2 contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:"2022-05-14T00:00:00.000Z",lang:"en",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Hermes Swap",permalink:"/Developer-docs/docs/Hermes Swap/"},next:{title:"Dual Farms",permalink:"/Developer-docs/docs/Hermes Swap/Dual Farms"}},d={},m=[{value:"How It Works",id:"how-it-works",level:2},{value:"Example: Simple Rewarder (recommended)",id:"example-simple-rewarder-recommended",level:2},{value:"Example: MasterChef Rewarder",id:"example-masterchef-rewarder",level:2},{value:"Security and Testing",id:"security-and-testing",level:2}],c={toc:m};function u(e){var t=e.components,r=(0,n.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"masterchefhermesv2-and-double-reward-farms"},"MasterChefHermesV2 and Double Reward Farms"),(0,o.kt)("p",null,"MasterChefHermesV2 is a modified version of Sushi's MasterChefV2, which allows farms to offer two rewards instead of one."),(0,o.kt)("p",null,"For example, instead of just rewarding HERMES, it has the ability to offer HERMES ",(0,o.kt)("strong",{parentName:"p"},"and")," your project's token."),(0,o.kt)("h2",{id:"how-it-works"},"How It Works"),(0,o.kt)("p",null,"The only thing you need to get this to work with MasterChefHermesV2 is to implement a contract that conforms to the IRewarder interface."),(0,o.kt)("p",null,"This interface describes two functions:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sol"},"interface IRewarder {\n  using SafeERC20 for IERC20;\n\n  function onHermesReward(address user, uint256 newLpAmount) external;\n\n  function pendingTokens(address user) external view returns (uint256 pending);\n}\n\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"pendingTokens")," is purely for displaying stats on the frontend."),(0,o.kt)("p",null,"The most important is ",(0,o.kt)("inlineCode",{parentName:"p"},"onHermesReward"),", which is called whenever a user harvests from our MasterChefHermesV2."),(0,o.kt)("p",null,"It is in this function where you would want to contain the logic to mint/transfer your project's tokens to the user."),(0,o.kt)("p",null,"The implementation is completely up to you and it is does not matter if your tokens are minted per block or per second - either will work."),(0,o.kt)("p",null,"But to make your life easier, we have implemented two types of rewarders: a simple version and a version if your project also uses a Sushi-style masterchef."),(0,o.kt)("p",null,"Both types come in per block or per second:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/SimpleRewarderPerBlock.sol"},"contracts/rewarders/SimpleRewarderPerBlock.sol")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/SimpleRewarderPerSec.sol"},"contracts/rewarders/SimpleRewarderPerSec.sol")," (recommended)"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/MasterChefRewarderPerBlock.sol"},"contracts/rewarders/MasterChefRewarderPerBlock.sol")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contract/rewarders/MasterChefRewarderPerSec.sol"},"contract/rewarders/MasterChefRewarderPerSec.sol"))),(0,o.kt)("h2",{id:"example-simple-rewarder-recommended"},"Example: Simple Rewarder (recommended)"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/SimpleRewarderPerBlock.sol"},"contracts/rewarders/SimpleRewarderPerBlock.sol")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/SimpleRewarderPerSec.sol"},"contracts/rewarders/SimpleRewarderPerSec.sol"))),(0,o.kt)("p",null,"This is the version we recommend simply because it's the easiest and less prone to accidental failures."),(0,o.kt)("p",null,"The concept is simple: a fixed amount of reward tokens is transferred to the contract prior. Then our masterchef will\ndistribute it according to the reward rate set on it. This requires no coordination with your own masterchef whatsoever."),(0,o.kt)("p",null,"Key points:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Easy setup, no coordination with your masterchef."),(0,o.kt)("li",{parentName:"ul"},"Needs to be funded with your reward tokens beforehand."),(0,o.kt)("li",{parentName:"ul"},"Once the rewarder is funded with your reward tokens, there is ",(0,o.kt)("strong",{parentName:"li"},"no")," way to get them back.")),(0,o.kt)("p",null,"Setup:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"The rewarder contract is deployed."),(0,o.kt)("li",{parentName:"ol"},"A fixed amount of your token is transferred to the contract."),(0,o.kt)("li",{parentName:"ol"},"The reward rate is set on the rewarder contract."),(0,o.kt)("li",{parentName:"ol"},"The rewarder contract is added to the pool on our MasterChefHermesV2."),(0,o.kt)("li",{parentName:"ol"},"Users will now be able to claim double rewards when they start staking.")),(0,o.kt)("p",null,"To stop:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Set reward rate on rewarder contract to 0.")),(0,o.kt)("h2",{id:"example-masterchef-rewarder"},"Example: MasterChef Rewarder"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/rewarders/MasterChefRewarderPerBlock.sol"},"contracts/rewarders/MasterChefRewarderPerBlock.sol")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/blob/main/contract/rewarders/MasterChefRewarderPerSec.sol"},"contract/rewarders/MasterChefRewarderPerSec.sol"))),(0,o.kt)("p",null,"This is only applicable if your project uses a Sushi-style MasterChef contract."),(0,o.kt)("p",null,"Even if it does, we still recommend the Simple Rewarder. But in some cases, your project may not be able to pre-fund the rewarder.\nIn this case, the MasterChef Rewarder is suitable."),(0,o.kt)("p",null,"It works by creating a proxy pool in your own MasterChef using a dummy token, which the MasterChef Rewarder contract deposits in order\nto receive your reward tokens. Once it harvests your reward tokens, it is then able to distribute them to the users."),(0,o.kt)("p",null,"Key points:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Requires coordination with your masterchef."),(0,o.kt)("li",{parentName:"ul"},"Does not need pre-funding beforehand."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Highly recommend")," not to change any pool weights and/or add new pools in your MasterChef for the duration of the rewarder is live. If you do need to change any pool's weights\nor add new pools, please inform us as it requires coordination to ensure users don't under/over harvest rewards.")),(0,o.kt)("p",null,"Setup:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a new dummy token, ",(0,o.kt)("inlineCode",{parentName:"li"},"DUMMY"),", with supply of 1 (in Wei)."),(0,o.kt)("li",{parentName:"ol"},"Transfer 1 ",(0,o.kt)("inlineCode",{parentName:"li"},"DUMMY")," to the deployer and then renounce ownership of the token."),(0,o.kt)("li",{parentName:"ol"},"Create a new pool in your MasterChef for ",(0,o.kt)("inlineCode",{parentName:"li"},"DUMMY"),"."),(0,o.kt)("li",{parentName:"ol"},"Deploy the rewarder contract."),(0,o.kt)("li",{parentName:"ol"},"Approve the rewarder contract to spend 1 ",(0,o.kt)("inlineCode",{parentName:"li"},"DUMMY"),"."),(0,o.kt)("li",{parentName:"ol"},"Call the ",(0,o.kt)("inlineCode",{parentName:"li"},"init()")," method in IRewarder contract, passing in the ",(0,o.kt)("inlineCode",{parentName:"li"},"DUMMY")," token address - this will allow the rewarder to deposit the dummy token into your MasterChef and start receiving your rewards."),(0,o.kt)("li",{parentName:"ol"},"The rewarder contract is added to the pool on our MasterChefHermesV2."),(0,o.kt)("li",{parentName:"ol"},"Users will now be able to claim double rewards when they start staking.")),(0,o.kt)("p",null,"To stop:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Set allocation point of dummy pool on your MasterChef to 0."),(0,o.kt)("li",{parentName:"ol"},"Call ",(0,o.kt)("inlineCode",{parentName:"li"},"updatePool")," on rewarder contract."),(0,o.kt)("li",{parentName:"ol"},"Set reward rate on rewarder contract to 0."),(0,o.kt)("li",{parentName:"ol"},"Set allocation point on rewarder contract to 0.")),(0,o.kt)("h2",{id:"security-and-testing"},"Security and Testing"),(0,o.kt)("p",null,"None of these contracts are audited."),(0,o.kt)("p",null,"However, we have gone to extreme lengths to test every edge case possible. We implore you take a look at our test cases to be satisfied:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Hermes-defi/hermes-swap/tree/main/test/MasterChefHermesV2.test.ts"},"test/MasterChefHermesV2.test.ts"))),(0,o.kt)("p",null,"A quick note about testing with timestamp: it's less predictable than testing with blocks so instead of asserting the reward is an exact amount, we assert it falls within a certain range."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"To run:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"yarn test test/MasterChefHermesV2.test.ts\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"To run coverage:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'yarn test:coverage --testfiles "test/MasterChefHermesV2.test.ts"\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Coverage results:")),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"File"),(0,o.kt)("th",{parentName:"tr",align:null},"Statements"),(0,o.kt)("th",{parentName:"tr",align:null},"Branches"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"MasterChefHermesV2.sol"),(0,o.kt)("td",{parentName:"tr",align:null},"100%"),(0,o.kt)("td",{parentName:"tr",align:null},"100%")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"SimpleRewarderPerBlock.sol"),(0,o.kt)("td",{parentName:"tr",align:null},"100%"),(0,o.kt)("td",{parentName:"tr",align:null},"93.75%")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"SimpleRewarerPerSec.sol"),(0,o.kt)("td",{parentName:"tr",align:null},"100%"),(0,o.kt)("td",{parentName:"tr",align:null},"93.75%")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"MasterChefRewarderPerBlockMock.sol"),(0,o.kt)("td",{parentName:"tr",align:null},"98.28%"),(0,o.kt)("td",{parentName:"tr",align:null},"90.91%")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"MasterChefRewarderPerSecMock.sol"),(0,o.kt)("td",{parentName:"tr",align:null},"98.28%"),(0,o.kt)("td",{parentName:"tr",align:null},"90.91%")))),(0,o.kt)("p",null,"Notes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Rewarders have branches that are really hard to hit, hence why statements are not 100%."),(0,o.kt)("li",{parentName:"ul"},"Same with the branches.")))}u.isMDXComponent=!0}}]);