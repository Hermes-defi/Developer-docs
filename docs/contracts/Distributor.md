---
title: 'Distributor'
description: How does the Distributor contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ['solidity', 'hermes']
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 10
---

### Distributor.sol

[This contract](https://github.com/Hermes-defi/hermes-swap-fee-distributor/blob/master/contracts/Distributor.sol) is used for fee split and distribution to other vaults contracts.

```solidity
pragma solidity 0.6.12;
contract Distributor is Ownable {
```

```solidity
mapping(address => address[]) public tokensWithPathForXHRMS;
mapping(address => address[]) public tokensWithPathForSHRMS;
```

```solidity
    using EnumerableSet for EnumerableSet.AddressSet;
```

```solidity
    address public wone;
    address public ust;
    address public HRMS;
    address public treasury;
    address public router;
```

```solidity
    address public xHRMSAddress;
    address public sHRMSAddress;
```

```solidity
    IHermesRouter02 public routerCtx;
```

```solidity
    IHermesFactory public factoryCtx;
```

```solidity
    EnumerableSet.AddressSet private allTokens;
```

#### Setup Functions

```solidity
    constructor(
        address _router,
        address _treasury,
        address _xHRMSAddress,
        address _sHRMSAddress,
        address _ust,
        address _HRMS)
    {
```

```solidity
    router = _router;
    treasury = _treasury;
    xHRMSAddress = _xHRMSAddress;
    sHRMSAddress = _sHRMSAddress;

    ust = _ust;
    HRMS = _HRMS;

    routerCtx = IHermesRouter02(_router);
    factoryCtx = IHermesFactory(routerCtx.factory());
    factoryCtx.allPairsLength();

    wone = routerCtx.WONE();
```

#### Events

```solidity
    event liquidityFound(uint index, address token0, address token1, uint amount0, uint amount1);
    event convertTo(address convertFrom, address[] path, uint256[] amounts);
    event splitAndSendInfo(uint woneBalance, uint treasureBalance, uint xHRMSBalance, uint sHRMSBalance, uint ust, uint hrms);
```

#### Externally Accessible Functions

##### enter

```solidity
   function pairLength() public view returns(uint){
        return allTokens.length();
    }
```

```solidity
   function pairAt(uint i) public view returns(address){
        return allTokens.at(i);
    }
```

```solidity
  function pairContains(address pair) public view returns(bool){
        return allTokens.contains(pair);
    }
```

```solidity
   function pairRemove(address pair) public onlyOwner {
        allTokens.remove(pair);
    }
```

```solidity
   function pairPaths(address pair) public view returns(address[] memory, address[] memory) {
        return( tokensWithPathForXHRMS[pair], tokensWithPathForSHRMS[pair] );
    }
```

```solidity
   function addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {
        require(allTokens.contains(_token)==false  , "Token is already registered");
        _addNewToken(_token, _xHRMSPath, _sHRMSPath);
    }
```

```solidity
   function setToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) external onlyOwner {
        _addNewToken(_token, _xHRMSPath, _sHRMSPath);
    }
```

##### \_addNewToken

```solidity
   function _addNewToken(address _token, address[] memory _xHRMSPath, address[] memory _sHRMSPath) internal {
        for (uint i = 0; i < _xHRMSPath.length; i ++) {
            IERC20Hermes(_xHRMSPath[i]).balanceOf(address(this));
        }
        for (uint i = 0; i < _sHRMSPath.length; i ++) {
            IERC20Hermes(_sHRMSPath[i]).balanceOf(address(this));
        }
        IHermesPair(_token).balanceOf(address(this));
        allTokens.add(_token);
        tokensWithPathForXHRMS[_token] = _xHRMSPath;
        tokensWithPathForSHRMS[_token] = _sHRMSPath;

    }
```

##### run

```solidity
    function run() public {
        breakLp();
        convertAll();
        splitAndSend();
    }

```

```solidity
   function breakLp() public {
        uint length = factoryCtx.allPairsLength();
        //console.log('length', length);
        for (uint i = 0; i < length; i ++) {
            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));
            uint balanceOfLp = pair.balanceOf(address(this));
            //console.log('pair', balanceOfLp, address(pair));
            if (balanceOfLp == 0) continue;
            IERC20Hermes token0 = IERC20Hermes(pair.token0());
            IERC20Hermes token1 = IERC20Hermes(pair.token1());
            pair.approve(address(routerCtx), balanceOfLp);
            (uint256 amountA, uint256 amountB) = routerCtx
                .removeLiquidity(pair.token1(), pair.token0(), balanceOfLp,
                0, 0, address(this), block.timestamp + 60);
            emit liquidityFound(i, pair.token0(), pair.token1(), amountA, amountB);
            //console.log('break0: ', token0.symbol(), amountA);
            //console.log('break1: ', token1.symbol(), amountB);
        }
    }

```

```solidity
   function convertAll() public {
        uint length = factoryCtx.allPairsLength();
        for (uint i = 0; i < length; i ++) {
            IHermesPair pair = IHermesPair(factoryCtx.allPairs(i));
            address id = address(pair);
            IERC20Hermes token0 = IERC20Hermes(pair.token0());
            IERC20Hermes token1 = IERC20Hermes(pair.token1());

            uint balance0 = token0.balanceOf(address(this));
            uint balance1 = token1.balanceOf(address(this));

            if (balance0 > 1000000 && address(token0) != wone ) {
                convert(token0);
            }

            if (balance1 > 1000000 && address(token1) != wone ) {
                convert(token1);
            }
        }
    }
```

```solidity
   function convert(IERC20Hermes token) public {
        address id = address(token);

        if (id == wone) {
            return;
        }

        if ( allTokens.contains(id) == false ) {
            return;
        }

        uint balance = token.balanceOf(address(this));
        IERC20Hermes(tokensWithPathForXHRMS[id][0])
        .approve(address(routerCtx), balance);

        uint256[] memory amounts = routerCtx.swapExactTokensForTokens(
            balance,
            0,
            tokensWithPathForXHRMS[id],
            address(this),
            block.timestamp + 10000
        );
        emit convertTo(id, tokensWithPathForXHRMS[id], amounts);
    }

```

```solidity
   function splitAndSend() public {
        IERC20Hermes token = IERC20Hermes(wone);
        uint woneBalance = token.balanceOf(address(this));
        if( woneBalance  < 1000000 ) return;
        uint treasureBalance = token.balanceOf(address(this))/2;
        uint xHRMSBalance = token.balanceOf(address(this))/4;
        uint sHRMSBalance = token.balanceOf(address(this))/4;
        token.transfer(treasury, treasureBalance);
        address[] memory path1 = new address[](2);
        path1[0] = wone;
        path1[1] = ust;
        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);
        uint256[] memory amountsShrms = routerCtx.swapExactTokensForTokens(
            sHRMSBalance, 0, path1, sHRMSAddress, block.timestamp + 10000
        );
        address[] memory path2 = new address[](2);
        path2[0] = wone;
        path2[1] = HRMS;
        IERC20Hermes(wone).approve(address(routerCtx), sHRMSBalance);
        uint256[] memory amountsXhrms = routerCtx.swapExactTokensForTokens(
            sHRMSBalance, 0, path2, xHRMSAddress, block.timestamp + 10000
        );
        emit splitAndSendInfo(woneBalance, treasureBalance, xHRMSBalance, sHRMSBalance, amountsShrms[1], amountsXhrms[1]);
    }

```
