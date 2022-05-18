"use strict";(self.webpackChunkdeveloperdocs=self.webpackChunkdeveloperdocs||[]).push([[978],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),d=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=d(e.components);return r.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=d(t),m=a,k=p["".concat(l,".").concat(m)]||p[m]||c[m]||s;return t?r.createElement(k,o(o({ref:n},u),{},{components:t})):r.createElement(k,o({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,o=new Array(s);o[0]=p;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var d=2;d<s;d++)o[d]=t[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},3375:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return i},metadata:function(){return d},toc:function(){return c}});var r=t(7462),a=t(3366),s=(t(7294),t(3905)),o=["components"],i={title:"Distributor",description:"How does the Distributor contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:new Date("2022-05-14T00:00:00.000Z"),lang:"en",sidebar_position:10},l=void 0,d={unversionedId:"Distributor",id:"Distributor",title:"Distributor",description:"How does the Distributor contract work? Why is it written that way?",source:"@site/docs/Distributor.md",sourceDirName:".",slug:"/Distributor",permalink:"/Developer-docs/docs/Distributor",draft:!1,tags:[{label:"solidity",permalink:"/Developer-docs/docs/tags/solidity"},{label:"hermes",permalink:"/Developer-docs/docs/tags/hermes"}],version:"current",sidebarPosition:10,frontMatter:{title:"Distributor",description:"How does the Distributor contract work? Why is it written that way?",author:"Hermes Team",sidebar:!0,tags:["solidity","hermes"],skill:"intermediate",published:"2022-05-14T00:00:00.000Z",lang:"en",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Dual Farms",permalink:"/Developer-docs/docs/Hermes Swap/Dual Farms"},next:{title:"Liquidity TransferService",permalink:"/Developer-docs/docs/Liquidity Transfer"}},u={},c=[{value:"Distributor.sol",id:"distributorsol",level:3},{value:"Setup Functions",id:"setup-functions",level:4},{value:"Events",id:"events",level:4},{value:"Externally Accessible Functions",id:"externally-accessible-functions",level:4},{value:"enter",id:"enter",level:5},{value:"_addNewToken",id:"_addnewtoken",level:5},{value:"run",id:"run",level:5}],p={toc:c};function m(e){var n=e.components,t=(0,a.Z)(e,o);return(0,s.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h3",{id:"distributorsol"},"Distributor.sol"),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://github.com/Hermes-defi/hermes-swap-fee-distributor/blob/master/contracts/Distributor.sol"},"This contract")," is used for fee split and distribution to other vaults contracts."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity 0.6.12;\ncontract Distributor is Ownable {\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"mapping(address => address[]) public tokensWithPathForXHRMS;\nmapping(address => address[]) public tokensWithPathForSHRMS;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    using EnumerableSet for EnumerableSet.AddressSet;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    address public wone;\n    address public ust;\n    address public HRMS;\n    address public treasury;\n    address public router;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    address public xHRMSAddress;\n    address public sHRMSAddress;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    IHermesRouter02 public routerCtx;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    IHermesFactory public factoryCtx;\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    EnumerableSet.AddressSet private allTokens;\n")),(0,s.kt)("h4",{id:"setup-functions"},"Setup Functions"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    constructor(\n        address _router,\n        address _treasury,\n        address _xHRMSAddress,\n        address _sHRMSAddress,\n        address _ust,\n        address _HRMS)\n    {\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    router = _router;\n    treasury = _treasury;\n    xHRMSAddress = _xHRMSAddress;\n    sHRMSAddress = _sHRMSAddress;\n\n    ust = _ust;\n    HRMS = _HRMS;\n\n    routerCtx = IHermesRouter02(_router);\n    factoryCtx = IHermesFactory(routerCtx.factory());\n    factoryCtx.allPairsLength();\n\n    wone = routerCtx.WONE();\n")),(0,s.kt)("h4",{id:"events"},"Events"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    event liquidityFound(uint index, address token0, address token1, uint amount0, uint amount1);\n    event convertTo(address convertFrom, address[] path, uint256[] amounts);\n    event splitAndSendInfo(uint woneBalance, uint treasureBalance, uint xHRMSBalance, uint sHRMSBalance, uint ust, uint hrms);\n")),(0,s.kt)("h4",{id:"externally-accessible-functions"},"Externally Accessible Functions"),(0,s.kt)("h5",{id:"enter"},"enter"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function pairLength() public view returns(uint){\n        return allTokens.length();\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function pairAt(uint i) public view returns(address){\n        return allTokens.at(i);\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"  function pairContains(address pair) public view returns(bool){\n        return allTokens.contains(pair);\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function pairRemove(address pair) public onlyOwner {\n        allTokens.remove(pair);\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function pairPaths(address pair) public view returns(address[] memory, address[] memory) {\n        return( tokensWithPathForXHRMS[pair], tokensWithPathForSHRMS[pair] );\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},'   function addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {\n        require(allTokens.contains(_token)==false  , "Token is already registered");\n        _addNewToken(_token, _xHRMSPath, _sHRMSPath);\n    }\n')),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function setToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {\n        _addNewToken(_token, _xHRMSPath, _sHRMSPath);\n    }\n")),(0,s.kt)("h5",{id:"_addnewtoken"},"_addNewToken"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function _addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) internal {\n        for (uint i = 0; i < _xHRMSPath.length; i ++) {\n            IERC20Hermes(_xHRMSPath[i]).balanceOf(address(this));\n        }\n        for (uint i = 0; i < _sHRMSPath.length; i ++) {\n            IERC20Hermes(_sHRMSPath[i]).balanceOf(address(this));\n        }\n        IHermesPair(_token).balanceOf(address(this));\n        allTokens.add(_token);\n        tokensWithPathForXHRMS[_token] = _xHRMSPath;\n        tokensWithPathForSHRMS[_token] = _sHRMSPath;\n\n    }\n")),(0,s.kt)("h5",{id:"run"},"run"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"    function run() public {\n        breakLp();\n        convertAll();\n        splitAndSend();\n    }\n\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function breakLp() public {\n        uint length = factoryCtx.allPairsLength();\n        //console.log('length', length);\n        for (uint i = 0; i < length; i ++) {\n            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));\n            uint balanceOfLp = pair.balanceOf(address(this));\n            //console.log('pair', balanceOfLp, address(pair));\n            if (balanceOfLp == 0) continue;\n            IERC20Hermes token0 = IERC20Hermes(pair.token0());\n            IERC20Hermes token1 = IERC20Hermes(pair.token1());\n            pair.approve(address(routerCtx), balanceOfLp);\n            (uint256 amountA, uint256 amountB) = routerCtx\n                .removeLiquidity(pair.token1(), pair.token0(), balanceOfLp,\n                0, 0, address(this), block.timestamp + 60);\n            emit liquidityFound(i, pair.token0(), pair.token1(), amountA, amountB);\n            //console.log('break0: ', token0.symbol(), amountA);\n            //console.log('break1: ', token1.symbol(), amountB);\n        }\n    }\n\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function convertAll() public {\n        uint length = factoryCtx.allPairsLength();\n        for (uint i = 0; i < length; i ++) {\n            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));\n            address id = address(pair);\n            IERC20Hermes token0 = IERC20Hermes(pair.token0());\n            IERC20Hermes token1 = IERC20Hermes(pair.token1());\n\n            uint balance0 = token0.balanceOf(address(this));\n            uint balance1 = token1.balanceOf(address(this));\n\n            if (balance0 > 1000000 && address(token0) != wone ) {\n                convert(token0);\n            }\n\n            if (balance1 > 1000000 && address(token1) != wone ) {\n                convert(token1);\n            }\n        }\n    }\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function convert(IERC20Hermes token) public {\n        address id = address(token);\n\n        if (id == wone) {\n            return;\n        }\n\n        if ( allTokens.contains(id) == false ) {\n            return;\n        }\n\n        uint balance = token.balanceOf(address(this));\n        IERC20Hermes(tokensWithPathForXHRMS[id][0])\n        .approve(address(routerCtx), balance);\n\n        uint256[] memory amounts = routerCtx.swapExactTokensForTokens(\n            balance,\n            0,\n            tokensWithPathForXHRMS[id],\n            address(this),\n            block.timestamp + 10000\n        );\n        emit convertTo(id, tokensWithPathForXHRMS[id], amounts);\n    }\n\n")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-solidity"},"   function splitAndSend() public {\n        IERC20Hermes token = IERC20Hermes(wone);\n        uint woneBalance = token.balanceOf(address(this));\n        if( woneBalance  < 1000000 ) return;\n        uint treasureBalance = token.balanceOf(address(this))/2;\n        uint xHRMSBalance = token.balanceOf(address(this))/4;\n        uint sHRMSBalance = token.balanceOf(address(this))/4;\n        token.transfer(treasury, treasureBalance);\n        address[] memory path1 = new address[](2);\n        path1[0] = wone;\n        path1[1] = ust;\n        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);\n        uint256[] memory amountsShrms = routerCtx.swapExactTokensForTokens(\n            sHRMSBalance, 0, path1, sHRMSAddress, block.timestamp + 10000\n        );\n        address[] memory path2 = new address[](2);\n        path2[0] = wone;\n        path2[1] = HRMS;\n        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);\n        uint256[] memory amountsXhrms = routerCtx.swapExactTokensForTokens(\n            sHRMSBalance, 0, path2, xHRMSAddress, block.timestamp + 10000\n        );\n        emit splitAndSendInfo(woneBalance, treasureBalance, xHRMSBalance, sHRMSBalance, amountsShrms[1], amountsXhrms[1]);\n    }\n\n")))}m.isMDXComponent=!0}}]);