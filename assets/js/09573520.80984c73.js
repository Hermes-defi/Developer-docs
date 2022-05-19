"use strict";(self.webpackChunkdeveloperdocs=self.webpackChunkdeveloperdocs||[]).push([[329],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),c=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(o.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(t),m=a,g=d["".concat(o,".").concat(m)]||d[m]||p[m]||i;return t?r.createElement(g,s(s({ref:n},u),{},{components:t})):r.createElement(g,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=d;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var c=2;c<i;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3307:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return o},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),s=["components"],l={title:"Vesting",description:"How does the Vesting contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:new Date("2022-05-14T00:00:00.000Z"),lang:"en",sidebar_position:13},o="Vesting",c={unversionedId:"Vesting",id:"Vesting",title:"Vesting",description:"How does the Vesting contract work? Why is it written that way?",source:"@site/docs/Vesting.md",sourceDirName:".",slug:"/Vesting",permalink:"/Developer-docs/docs/Vesting",draft:!1,tags:[{label:"solidity",permalink:"/Developer-docs/docs/tags/solidity"},{label:"hermes",permalink:"/Developer-docs/docs/tags/hermes"}],version:"current",sidebarPosition:13,frontMatter:{title:"Vesting",description:"How does the Vesting contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:"2022-05-14T00:00:00.000Z",lang:"en",sidebar_position:13},sidebar:"tutorialSidebar",previous:{title:"Timelock",permalink:"/Developer-docs/docs/Timelock"},next:{title:"SingleStakingPool",permalink:"/Developer-docs/docs/Staking/SingleStakingPool"}},u={},p=[{value:"Vesting.sol",id:"vestingsol",level:3},{value:"Events",id:"events",level:4},{value:"Structs",id:"structs",level:4},{value:"Variables",id:"variables",level:4},{value:"Setup Functions",id:"setup-functions",level:4},{value:"Externally Accessible Functions",id:"externally-accessible-functions",level:4},{value:"freeClaim",id:"freeclaim",level:5},{value:"currentEpoch",id:"currentepoch",level:5},{value:"createVesting",id:"createvesting",level:5},{value:"setPendingAdmin",id:"setpendingadmin",level:5},{value:"claimable",id:"claimable",level:5},{value:"claim",id:"claim",level:5},{value:"Internal functions",id:"internal-functions",level:5},{value:"_claimable",id:"_claimable",level:5}],d={toc:p};function m(e){var n=e.components,t=(0,a.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"vesting"},"Vesting"),(0,i.kt)("h3",{id:"vestingsol"},"Vesting.sol"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/Hermes-defi/hermes-team-vest/blob/master/contracts/Vesting.sol"},"This contract"),"  lock in a certain amount of funds until the terms of the contract are fulfilled"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity ^0.8.4;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},' import "@openzeppelin/contracts/access/Ownable.sol";\n import "@openzeppelin/contracts/utils/Address.sol";\n import "@openzeppelin/contracts/token/ERC20/IERC20.sol";\n import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";\n import "hardhat/console.sol";\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"contract HermesVesting is Ownable {\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  using SafeERC20 for IERC20;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"SafeERC20 is a wrapper around the interface that eliminates the need to handle boolean return values. TokenTimelock can hold tokens for a beneficiary until a specified time.\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  using Address for address;\n")),(0,i.kt)("h4",{id:"events"},"Events"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    event CreateVesting(\n        uint256 indexed vestingId,\n        address indexed user,\n        uint256 amount,\n        uint256 startEpoch,\n        uint256 durationInEpoch\n    );    \n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Emmited when a new vest is created\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  event Claim(\n        uint256 indexed vestingId,\n        address indexed user,\n        uint256 amount\n    );\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Emmited when a vest is claimed\n")),(0,i.kt)("h4",{id:"structs"},"Structs"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"  struct Vesting {\n        address user;\n        uint256 amount; // Hermes token amount in wei\n        uint256 startEpoch; // start time in epoch\n        uint256 durationInEpoch; // duration in epoch\n        uint256 claimedAmount;\n    }\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Struct to keep the vesting informations\n")),(0,i.kt)("h4",{id:"variables"},"Variables"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint256 public startTime;                    \n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"The timestamp that the contract can start working\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint256 public epochLength;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"The size of epoch\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    IERC20 public hermes;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"The HERMES token\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    Vesting[] public vestings;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"A array of vestings structs\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    bool freeClaimed;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Check if the vesting was already claimed\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    mapping(address => uint256[]) private _vestingsByAddress;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"The list of all vestings address\n")),(0,i.kt)("h4",{id:"setup-functions"},"Setup Functions"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    constructor(\n        address _hermes,\n        uint256 _startTime,\n        uint256 _epochLength\n    ) Ownable() {\n        hermes = IERC20(_hermes);\n        startTime = _startTime;\n        epochLength = _epochLength;\n    }\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Start the contract setting the hermes token, the start of contract execution and the epoch lenght\n")),(0,i.kt)("h4",{id:"externally-accessible-functions"},"Externally Accessible Functions"),(0,i.kt)("h5",{id:"freeclaim"},"freeClaim"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},'   function freeClaim() external {\n        require(freeClaimed == false, "already did");\n        for(uint i = 0; i < vestings.length; i ++) {\n            Vesting storage vesting = vestings[i];\n            uint freeClaimAmount = vesting.amount * 166 / 1000;\n            vesting.claimedAmount = freeClaimAmount;\n            console.log(freeClaimAmount);\n            hermes.transfer(vesting.user, freeClaimAmount);\n        }\n        freeClaimed = true;\n    }\n\n')),(0,i.kt)("h5",{id:"currentepoch"},"currentEpoch"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"    function currentEpoch() public view returns (uint256) {\n        if (block.timestamp < startTime) {\n            return 0;\n        }\n\n        return (block.timestamp - startTime) / epochLength + 1;\n    }\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Returns the current epoch\n")),(0,i.kt)("h5",{id:"createvesting"},"createVesting"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},'   function createVesting(\n        address user,\n        uint256 amount,\n        uint256 startEpoch,\n        uint256 durationInEpoch\n    ) external onlyOwner {\n        require(\n            user != address(0) && !user.isContract(),\n            "Invalid address!"\n        );\n        require(amount > 0, "Invalid amount!");\n        require(\n            startEpoch > currentEpoch() && durationInEpoch > 0,\n            "Invalid request!"\n        );\n\n        vestings.push(\n            Vesting({\n                user: user,\n                amount: amount,\n                startEpoch: startEpoch,\n                durationInEpoch: durationInEpoch,\n                claimedAmount: 0\n            })\n        );\n        _vestingsByAddress[user].push(vestings.length - 1);\n\n        emit CreateVesting(\n            vestings.length - 1,\n            user,\n            amount,\n            startEpoch,\n            durationInEpoch\n        );\n    }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Create a new vesting\n")),(0,i.kt)("h5",{id:"setpendingadmin"},"setPendingAdmin"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"   function vestingsByAddress(address user)\n        external\n        view\n        returns (uint256[] memory)\n    {\n        return _vestingsByAddress[user];\n    }\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Set the new admin\n")),(0,i.kt)("h5",{id:"claimable"},"claimable"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},'   function claimable(uint256 vestingId) external view returns (uint256) {\n        require(vestingId < vestings.length, "Invalid index!");\n\n        return _claimable(vestingId);\n    }\n\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Check if the vesting is claimable\n")),(0,i.kt)("h5",{id:"claim"},"claim"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},'  \n    function claim(uint256 vestingId) external {\n        require(vestingId < vestings.length, "Invalid index!");\n\n        Vesting storage vesting = vestings[vestingId];\n        require(msg.sender == vesting.user, "unauthorized");\n\n        uint256 claimAmount = _claimable(vestingId);\n        require(claimAmount > 0, "unable to claim");\n\n        vesting.claimedAmount += claimAmount;\n\n        hermes.safeTransfer(vesting.user, claimAmount);\n\n        emit Claim(vestingId, vesting.user, claimAmount);\n    }\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Clain the vest and transfer the tokens\n")),(0,i.kt)("h5",{id:"internal-functions"},"Internal functions"),(0,i.kt)("h5",{id:"_claimable"},"_claimable"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"   function _claimable(uint256 vestingId) internal view returns (uint256) {\n        Vesting memory vesting = vestings[vestingId];\n\n        uint256 current = currentEpoch();\n\n        if (current < vesting.startEpoch) {\n            return 0;\n        }\n\n        uint256 vestedAmount = ((currentEpoch() - vesting.startEpoch + 1) *\n            vesting.amount) / vesting.durationInEpoch;\n\n        if (vestedAmount > vesting.amount) {\n            vestedAmount = vesting.amount;\n        }\n\n        return vestedAmount - vesting.claimedAmount;\n    }\n\n    Check if a vesting is claimable\n")))}m.isMDXComponent=!0}}]);