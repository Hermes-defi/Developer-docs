---
title: "Hermes Maker"
description: How does the HermesMaker contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ["solidity", "hermes"]
skill: intermediate
published: 2022-05-14
lang: en
---

# HermesMaker - Hermes token creator

HermesMaker is MasterHermes's left hand and kinda a wizard. He can cook up Hermes from pretty much anything!

This contract handles "serving up" rewards for xHermes holders by trading tokens collected from fees for Hermes.

## Data and Control Flows

This is the flow of data and control that happens when you perform the three main actions of HermesMaker:

1. 
2. 
3. 

### HermesMaker.sol 

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/HermesMaker.sol) 

 ```solidity
pragma solidity 0.6.12;

import "./libraries/SafeMath.sol";
import "./libraries/SafeERC20.sol";
import "./hermesswap/interfaces/IHermesERC20.sol";
import "./hermesswap/interfaces/IHermesPair.sol";
import "./hermesswap/interfaces/IHermesFactory.sol";
import "./boringcrypto/BoringOwnable.sol";
```



```solidity
contract HermesMaker is BoringOwnable {
```


```solidity
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
```

The [SafeMathHermes library](https://docs.openzeppelin.com/contracts/2.x/api/math) is used to avoid overflows and
underflows. This is important because otherwise we might end up with a situation where a value should be `-1`,
but is instead `2^256-1`.

```solidity
    IHermesFactory public immutable factory;
```

```solidity
    address public immutable bar;
```

```solidity
    address private immutable hermes;
```

```solidity
    address private immutable wone;
```

```solidity
    mapping(address => address) internal _bridges;
```

#### Events

```solidity
    event LogBridgeSet(address indexed token, address indexed bridge);
```

```solidity
    event LogConvert(
        address indexed server,
        address indexed token0,
        address indexed token1,
        uint256 amount0,
        uint256 amount1,
        uint256 amountHERMES
    );
```

#### Setup Functions 

```solidity
    constructor(
        address _factory,
        address _bar,
        address _hermes,
        address _wone
    ) public {
        factory = IHermesFactory(_factory);
        bar = _bar;
        hermes = _hermes;
        wone = _wone;
    }
```



#### Externally Accessible Functions

##### bridgeFor


```solidity
   function bridgeFor(address token) public view returns (address bridge) {
        bridge = _bridges[token];
        if (bridge == address(0)) {
            bridge = wone;
        }
    }
```
 
##### setBridge    

```solidity
   function setBridge(address token, address bridge) external onlyOwner {
        // Checks
        require(token != hermes && token != wone && token != bridge, "HermesMaker: Invalid bridge");

        // Effects
        _bridges[token] = bridge;
        emit LogBridgeSet(token, bridge);
    }
```

##### convert    

```solidity
   function convert(address token0, address token1) external onlyEOA {
        _convert(token0, token1);
    }
```

##### convertMultiple    

```solidity
   function convertMultiple(address[] calldata token0, address[] calldata token1) external onlyEOA {
        // TODO: This can be optimized a fair bit, but this is safer and simpler for now
        uint256 len = token0.length;
        for (uint256 i = 0; i < len; i++) {
            _convert(token0[i], token1[i]);
        }
    }
```

##### Internal functions   

##### _convert    

```solidity
   function _convert(address token0, address token1) internal {
        // Interactions
        // S1 - S4: OK
        IHermesPair pair = IHermesPair(factory.getPair(token0, token1));
        require(address(pair) != address(0), "HermesMaker: Invalid pair");
        // balanceOf: S1 - S4: OK
        // transfer: X1 - X5: OK
        IERC20(address(pair)).safeTransfer(address(pair), pair.balanceOf(address(this)));
        // X1 - X5: OK
        (uint256 amount0, uint256 amount1) = pair.burn(address(this));
        if (token0 != pair.token0()) {
            (amount0, amount1) = (amount1, amount0);
        }
        emit LogConvert(msg.sender, token0, token1, amount0, amount1, _convertStep(token0, token1, amount0, amount1));
    }
```

##### _convertStep    

```solidity
   function _convertStep(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1
    ) internal returns (uint256 hermesOut) {
        // Interactions
        if (token0 == token1) {
            uint256 amount = amount0.add(amount1);
            if (token0 == hermes) {
                IERC20(hermes).safeTransfer(bar, amount);
                hermesOut = amount;
            } else if (token0 == wone) {
                hermesOut = _toHERMES(wone, amount);
            } else {
                address bridge = bridgeFor(token0);
                amount = _swap(token0, bridge, amount, address(this));
                hermesOut = _convertStep(bridge, bridge, amount, 0);
            }
        } else if (token0 == hermes) {
            // eg. HERMES - ONE
            IERC20(hermes).safeTransfer(bar, amount0);
            hermesOut = _toHERMES(token1, amount1).add(amount0);
        } else if (token1 == hermes) {
            // eg. USDT - HERMES
            IERC20(hermes).safeTransfer(bar, amount1);
            hermesOut = _toHERMES(token0, amount0).add(amount1);
        } else if (token0 == wone) {
            // eg. ONE - USDC
            hermesOut = _toHERMES(wone, _swap(token1, wone, amount1, address(this)).add(amount0));
        } else if (token1 == wone) {
            // eg. USDT - ONE
            hermesOut = _toHERMES(wone, _swap(token0, wone, amount0, address(this)).add(amount1));
        } else {
            // eg. MIC - USDT
            address bridge0 = bridgeFor(token0);
            address bridge1 = bridgeFor(token1);
            if (bridge0 == token1) {
                // eg. MIC - USDT - and bridgeFor(MIC) = USDT
                hermesOut = _convertStep(bridge0, token1, _swap(token0, bridge0, amount0, address(this)), amount1);
            } else if (bridge1 == token0) {
                // eg. WBTC - DSD - and bridgeFor(DSD) = WBTC
                hermesOut = _convertStep(token0, bridge1, amount0, _swap(token1, bridge1, amount1, address(this)));
            } else {
                hermesOut = _convertStep(
                    bridge0,
                    bridge1, // eg. USDT - DSD - and bridgeFor(DSD) = WBTC
                    _swap(token0, bridge0, amount0, address(this)),
                    _swap(token1, bridge1, amount1, address(this))
                );
            }
        }
    }
```
##### convert    

```solidity
   function _swap(
        address fromToken,
        address toToken,
        uint256 amountIn,
        address to
    ) internal returns (uint256 amountOut) {
        // Checks
        // X1 - X5: OK
        IHermesPair pair = IHermesPair(factory.getPair(fromToken, toToken));
        require(address(pair) != address(0), "HermesMaker: Cannot convert");

        // Interactions
        // X1 - X5: OK
        (uint256 reserve0, uint256 reserve1, ) = pair.getReserves();
        uint256 amountInWithFee = amountIn.mul(997);
        if (fromToken == pair.token0()) {
            amountOut = amountIn.mul(997).mul(reserve1) / reserve0.mul(1000).add(amountInWithFee);
            IERC20(fromToken).safeTransfer(address(pair), amountIn);
            pair.swap(0, amountOut, to, new bytes(0));
            // TODO: Add maximum slippage?
        } else {
            amountOut = amountIn.mul(997).mul(reserve0) / reserve1.mul(1000).add(amountInWithFee);
            IERC20(fromToken).safeTransfer(address(pair), amountIn);
            pair.swap(amountOut, 0, to, new bytes(0));
            // TODO: Add maximum slippage?
        }
    }

    // F1 - F10: OK
    // C1 - C24: OK
    function _toHERMES(address token, uint256 amountIn) internal returns (uint256 amountOut) {
        // X1 - X5: OK
        amountOut = _swap(token, hermes, amountIn, bar);
    }
```

##### Function modifier    

##### onlyEOA

```solidity
    modifier onlyEOA() {
        // Try to make flash-loan exploit harder to do by only allowing externally owned addresses.
        require(msg.sender == tx.origin, "HermesMaker: must use EOA");
        _;
    }
```