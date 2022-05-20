---
title: 'Liquidity TransferService'
description: How does the LiquidityTransferService contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ['solidity', 'hermes', 'staking']
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 11
---

# LiquidityTransferService - Move fees

LiquidityTransferService is contract to move liquidity from A to B.

## Data and Control Flows

This is the flow of data and control that happens when you perform the three main actions of LiquidityTransferService:

1. Remove all liquidity from this contract
2. Apove and transfer all liquidity to pairs on routerDst

### LiquidityTransferService.sol

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/LiquidityTransfer.sol) implements the
HermesSwap's liquidity transfer service.

```solidity
pragma solidity 0.6.12;
contract LiquidityTransferService {
```

```solidity
    using SafeMath for uint256;
```

The [SafeMathHermes library](https://docs.openzeppelin.com/contracts/2.x/api/math) is used to avoid overflows and
underflows. This is important because otherwise we might end up with a situation where a value should be `-1`,
but is instead `2^256-1`.

```solidity
    IHermesRouter02 public routerSrc;
    IHermesRouter02 public routerDst;
```

    Interface to tokens on source and destination

```solidity
    address public srcPair;
    address public dstPair;
```

```solidity
    address public tokenA;
    address public tokenB;
```

```solidity
    uint public slippageBps = 50; // 0.5%
    address public admin;
```

#### Setup Functions

```solidity
    constructor(
        address _routerSrc, address _routerDst,
        address _tokenA, address _tokenB
    ) public {
        admin = msg.sender;
        routerSrc = IHermesRouter02(_routerSrc);
        routerDst = IHermesRouter02(_routerDst);

        tokenA = _tokenA;
        tokenB = _tokenB;

        srcPair = IHermesFactory(routerSrc.factory()).getPair(_tokenA, _tokenB);
        if (srcPair == address(0x0)) {
            srcPair = IHermesFactory(routerSrc.factory()).createPair(_tokenA, _tokenB);
        }

        dstPair = IHermesFactory(routerDst.factory()).getPair(_tokenA, _tokenB);
        if (dstPair == address(0x0)) {
            dstPair = IHermesFactory(routerDst.factory()).createPair(_tokenA, _tokenB);
        }
    }
```

    Initialize our variables.

#### Events

    event OnRemoveLiquidity(address user, address pair, uint amountA, uint amountB, uint liquidity);

    event OnAddLiquidity(address user, address pair, uint amountA, uint amountB, uint liquidity);

    event onSlippageBps(uint oldPoints, uint newPoints);

#### Externally Accessible Functions

##### enter

```solidity
   function setSlippageBps(uint points) external{
        require(msg.sender == admin, "error, no admin");
        emit onSlippageBps(slippageBps, points);
        slippageBps = points;
    }
```

```solidity
   function run() external {

        IHermesPair srcPairCtx = IHermesPair(srcPair);
        uint256 liquidity = srcPairCtx.balanceOf(msg.sender);

        require(liquidity > 0, "err no src liquidity");
        require(srcPairCtx.allowance(msg.sender, address(this)) >= liquidity, "err allowance");

        srcPairCtx.transferFrom(msg.sender, address(this), liquidity);

        liquidity = srcPairCtx.balanceOf(address(this));

        (uint256 tokenAAmount, uint256 tokenBAmount) = getLiquidityValue(srcPairCtx,liquidity);

        srcPairCtx.approve(address(routerSrc), liquidity);
        (uint amountA, uint amountB) = routerSrc.removeLiquidity(
                tokenA,
                tokenB,
                liquidity,
                tokenAAmount * (10000 - slippageBps) / 10000,
                tokenBAmount * (10000 - slippageBps) / 10000,
                address(this), block.timestamp + 60);

        /*
        console.log('amountA=%s amountB=%s', amountA, amountB);
        console.log('tokenAAmount=%s tokenBAmount=%s', tokenAAmount, tokenBAmount);
        console.log('tokenAAmount=%s tokenBAmount=%s',
            tokenAAmount * (10000 - slippageBps) / 10000,
            tokenBAmount * (10000 - slippageBps) / 10000);
        */

        emit OnRemoveLiquidity(msg.sender, srcPair, amountA, amountB, liquidity);

        IHermesERC20 tokenACtx = IHermesERC20(tokenA);
        IHermesERC20 tokenBCtx = IHermesERC20(tokenB);

        amountA = tokenACtx.balanceOf(address(this));
        amountB = tokenBCtx.balanceOf(address(this));

        tokenACtx.approve(address(routerDst), amountA);
        tokenBCtx.approve(address(routerDst), amountB);

        (uint _amountA, uint _amountB, uint _liquidity) =
        routerDst.addLiquidity(tokenA, tokenB,
            amountA,
            amountB,
            amountA * (10000 - slippageBps) / 10000,
            amountB * (10000 - slippageBps) / 10000,
            msg.sender, block.timestamp + 60);

        // by audit recomendation, we should send any dust to user

        uint balanceA = tokenACtx.balanceOf(address(this));
        if( balanceA > 0 ){
            tokenACtx.transfer(msg.sender, balanceA);
        }

        uint balanceB = tokenBCtx.balanceOf(address(this));
        if( balanceB > 0 ){
            tokenBCtx.transfer(msg.sender, balanceB);
        }

        emit OnAddLiquidity(msg.sender, srcPair, _amountA, _amountB, _liquidity);

    }
```

##### Internal functions

##### getLiquidityValue

```solidity
   function getLiquidityValue(
        IHermesPair pair,
        uint256 liquidityAmount
    ) internal view returns (uint256 tokenAAmount, uint256 tokenBAmount) {
        (uint256 reservesA, uint256 reservesB) = HermesLibrary.getReserves(routerSrc.factory(), pair.token0(), pair.token1());
        bool feeOn = IHermesFactory(routerSrc.factory()).feeTo() != address(0);
        uint kLast = feeOn ? pair.kLast() : 0;
        uint totalSupply = pair.totalSupply();
        return computeLiquidityValue(reservesA, reservesB, totalSupply, liquidityAmount, feeOn, kLast);
    }
```

##### computeLiquidityValue

```solidity
   function computeLiquidityValue(
        uint256 reservesA,
        uint256 reservesB,
        uint256 totalSupply,
        uint256 liquidityAmount,
        bool feeOn,
        uint kLast
    ) internal pure returns (uint256 tokenAAmount, uint256 tokenBAmount) {
        if (feeOn && kLast > 0) {
            uint rootK = Babylonian.sqrt(reservesA.mul(reservesB));
            uint rootKLast = Babylonian.sqrt(kLast);
            if (rootK > rootKLast) {
                uint numerator1 = totalSupply;
                uint numerator2 = rootK.sub(rootKLast);
                uint denominator = rootK.mul(5).add(rootKLast);
                uint feeLiquidity = FullMath.mulDiv(numerator1, numerator2, denominator);
                totalSupply = totalSupply.add(feeLiquidity);
            }
        }
        return (reservesA.mul(liquidityAmount) / totalSupply, reservesB.mul(liquidityAmount) / totalSupply);
    }
```
