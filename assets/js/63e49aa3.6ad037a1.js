"use strict";(self.webpackChunkdeveloperdocs=self.webpackChunkdeveloperdocs||[]).push([[990],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),o=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=o(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=o(n),p=i,k=m["".concat(c,".").concat(p)]||m[p]||u[p]||r;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function p(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,l[1]=s;for(var o=2;o<r;o++)l[o]=n[o];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5744:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return p},frontMatter:function(){return s},metadata:function(){return o},toc:function(){return u}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),l=["components"],s={title:"Timelock",description:"How does the Timelock contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:new Date("2022-05-14T00:00:00.000Z"),lang:"en",sidebar_position:12},c="Timelock",o={unversionedId:"Timelock",id:"Timelock",title:"Timelock",description:"How does the Timelock contract work? Why is it written that way?",source:"@site/docs/Timelock.md",sourceDirName:".",slug:"/Timelock",permalink:"/Developer-docs/docs/Timelock",draft:!1,tags:[{label:"solidity",permalink:"/Developer-docs/docs/tags/solidity"},{label:"hermes",permalink:"/Developer-docs/docs/tags/hermes"}],version:"current",sidebarPosition:12,frontMatter:{title:"Timelock",description:"How does the Timelock contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:"2022-05-14T00:00:00.000Z",lang:"en",sidebar_position:12},sidebar:"tutorialSidebar",previous:{title:"Liquidity TransferService",permalink:"/Developer-docs/docs/Liquidity Transfer"},next:{title:"Vesting",permalink:"/Developer-docs/docs/Vesting"}},d={},u=[{value:"Timelock.sol",id:"timelocksol",level:3},{value:"Events",id:"events",level:4},{value:"Variables",id:"variables",level:4},{value:"Setup Functions",id:"setup-functions",level:4},{value:"Externally Accessible Functions",id:"externally-accessible-functions",level:4},{value:"receive",id:"receive",level:5},{value:"setDelay",id:"setdelay",level:5},{value:"acceptAdmin",id:"acceptadmin",level:5},{value:"setPendingAdmin",id:"setpendingadmin",level:5},{value:"queueTransaction",id:"queuetransaction",level:5},{value:"cancelTransaction",id:"canceltransaction",level:5},{value:"executeTransaction",id:"executetransaction",level:5},{value:"Internal functions",id:"internal-functions",level:5},{value:"getBlockTimestamp",id:"getblocktimestamp",level:5}],m={toc:u};function p(e){var t=e.components,n=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"timelock"},"Timelock"),(0,r.kt)("h3",{id:"timelocksol"},"Timelock.sol"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/Hermes-defi/hermes-timelock/blob/main/contracts/Timelock.sol"},"This contract")," is a representation of a locking mechanism. The time lock is a timer designed to prevent the execution of a transaction until it reaches the preset time, even if the correct lock combination(s) are known. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity 0.6.12;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"contract Timelock {\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    using SafeMath for uint256;\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"https://docs.openzeppelin.com/contracts/2.x/api/math"},"SafeMathHermes library")," is used to avoid overflows and\nunderflows. This is important because otherwise we might end up with a situation where a value should be ",(0,r.kt)("inlineCode",{parentName:"p"},"-1"),",\nbut is instead ",(0,r.kt)("inlineCode",{parentName:"p"},"2^256-1"),"."),(0,r.kt)("h4",{id:"events"},"Events"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event NewAdmin(address indexed newAdmin);                    \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a new admin is accepted\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event NewPendingAdmin(address indexed newPendingAdmin);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a new admin is queued to be accepted\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event NewDelay(uint indexed newDelay);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a new delay is setted\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event CancelTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature,  bytes data, uint eta);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a pending transaction is cancelled\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event ExecuteTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature,  bytes data, uint eta);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a pending transaction is executed\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    event QueueTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature, bytes data, uint eta);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Emitted when a new transaction is queued\n")),(0,r.kt)("h4",{id:"variables"},"Variables"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint public constant GRACE_PERIOD = 14 days;        \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"The time after which an accepted proposal cannot be executed anymore, constantly set to 14 days.\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint public constant MINIMUM_DELAY = 12 hours;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"The minimum delay accepted \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint public constant MAXIMUM_DELAY = 30 days;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"The maximum delay accepted \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    address public admin = address(0x7cef2432A2690168Fb8eb7118A74d5f8EfF9Ef55);\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"This address keeps the admin. Is used to allows one time setting of admin for deployment purposes\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    address public pendingAdmin;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"The new address of the admin \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    uint public delay;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"The delay waited to execute the transaction\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    bool public admin_initialized;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Used to check if the admin has already this contract. Only allows transaction if the admin is the contract himself\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    mapping (bytes32 => bool) public queuedTransactions;\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Queue of transactions\n")),(0,r.kt)("h4",{id:"setup-functions"},"Setup Functions"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"    constructor() public {\n        delay = MINIMUM_DELAY;\n        admin_initialized = false;\n    }\n")),(0,r.kt)("h4",{id:"externally-accessible-functions"},"Externally Accessible Functions"),(0,r.kt)("h5",{id:"receive"},"receive"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"   receive() external payable { }\n")),(0,r.kt)("h5",{id:"setdelay"},"setDelay"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'   function setDelay(uint delay_) public {\n        require(msg.sender == address(this), "Timelock::setDelay: Call must come from Timelock.");\n        require(delay_ >= MINIMUM_DELAY, "Timelock::setDelay: Delay must exceed minimum delay.");\n        require(delay_ <= MAXIMUM_DELAY, "Timelock::setDelay: Delay must not exceed maximum delay.");\n        delay = delay_;\n\n        emit NewDelay(delay);\n    }\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"This function check if the caller is the timelock contract,\ncheck if the new delay is between MINIMUM_DELAY and MAXIMUM_DELAY,\nthen set the new delay\n")),(0,r.kt)("h5",{id:"acceptadmin"},"acceptAdmin"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'   function acceptAdmin() public {\n        require(msg.sender == pendingAdmin, "Timelock::acceptAdmin: Call must come from pendingAdmin.");\n        admin = msg.sender;\n        pendingAdmin = address(0);\n\n        emit NewAdmin(admin);\n    }\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Change the actual admin if the sender is seted before on setPendingAdmin\n")),(0,r.kt)("h5",{id:"setpendingadmin"},"setPendingAdmin"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'   function setPendingAdmin(address pendingAdmin_) public {\n        // allows one time setting of admin for deployment purposes\n        if (admin_initialized) {\n            require(msg.sender == address(this), "Timelock::setPendingAdmin: Call must come from Timelock.");\n        } else {\n            require(msg.sender == admin, "Timelock::setPendingAdmin: First call must come from admin.");\n            admin_initialized = true;\n        }\n        pendingAdmin = pendingAdmin_;\n\n        emit NewPendingAdmin(pendingAdmin);\n    }\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Set a new admin to be checked\n")),(0,r.kt)("h5",{id:"queuetransaction"},"queueTransaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'   function queueTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public returns (bytes32) {\n        require(msg.sender == admin, "Timelock::queueTransaction: Call must come from admin.");\n        require(eta >= getBlockTimestamp().add(delay), "Timelock::queueTransaction: Estimated execution block must satisfy delay.");\n\n        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));\n        queuedTransactions[txHash] = true;\n\n        emit QueueTransaction(txHash, target, value, signature, data, eta);\n        return txHash;\n    }\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Queue a new transaction\n")),(0,r.kt)("h5",{id:"canceltransaction"},"cancelTransaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'   function cancelTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public {\n        require(msg.sender == admin, "Timelock::cancelTransaction: Call must come from admin.");\n\n        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));\n        queuedTransactions[txHash] = false;\n\n        emit CancelTransaction(txHash, target, value, signature, data, eta);\n    }\n\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Cancel a pending transaction\n")),(0,r.kt)("h5",{id:"executetransaction"},"executeTransaction"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'  \n    function executeTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public payable returns (bytes memory) {\n        require(msg.sender == admin, "Timelock::executeTransaction: Call must come from admin.");\n\n        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));\n        require(queuedTransactions[txHash], "Timelock::executeTransaction: Transaction hasn\'t been queued.");\n        require(getBlockTimestamp() >= eta, "Timelock::executeTransaction: Transaction hasn\'t surpassed time lock.");\n        require(getBlockTimestamp() <= eta.add(GRACE_PERIOD), "Timelock::executeTransaction: Transaction is stale.");\n\n        queuedTransactions[txHash] = false;\n\n        bytes memory callData;\n\n        if (bytes(signature).length == 0) {\n            callData = data;\n        } else {\n            callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);\n        }\n\n        // solium-disable-next-line security/no-call-value\n        (bool success, bytes memory returnData) = target.call{value: value}(callData);\n        require(success, "Timelock::executeTransaction: Transaction execution reverted.");\n\n        emit ExecuteTransaction(txHash, target, value, signature, data, eta);\n\n        return returnData;\n    }\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Execute a queued transaction\n")),(0,r.kt)("h5",{id:"internal-functions"},"Internal functions"),(0,r.kt)("h5",{id:"getblocktimestamp"},"getBlockTimestamp"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"   function getBlockTimestamp() internal view returns (uint) {\n        // solium-disable-next-line security/no-block-members\n        return block.timestamp;\n    }\n\n\n    Get the actual time blockstamp\n")))}p.isMDXComponent=!0}}]);