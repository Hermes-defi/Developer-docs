---
title: "Hermes Bar"
description: How does the HermesBar contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ["solidity", "hermes", "staking"]
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 9
---

# HermesBar 

HermesBar is a stacking contract that permit you invest some money, though HERMES token and gain xHERMESS in exchange.

The longer the token stays in the contract, the greater the possibility won. 

The user will be able to request their tokens at any time and receive the reward.

## Data and Control Flows

This is the flow of data and control that happens when you perform the three main actions of HermesBar:

1. The caller deposit some Hermes and gain some xHERMES. Locks Hermes and mints xHermes.
2. The caller can take them tokens any moment
3. Claim back your HERMESs. Unlocks the staked + gained Hermes and burns xHermes

### HermesBar.sol 

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/HermesBar.sol) implements the
 HermesSwap's staking.

 ```solidity
pragma solidity 0.6.12;
contract HermesBar is ERC20("HermesBar", "xHERMES") {
```

Start the contract by entering the token name ("HermesBar") and token symbol ("xHERMES").

```solidity
    using SafeMath for uint256;
```

The [SafeMathHermes library](https://docs.openzeppelin.com/contracts/2.x/api/math) is used to avoid overflows and
underflows. This is important because otherwise we might end up with a situation where a value should be `-1`,
but is instead `2^256-1`.

```solidity
    IERC20 public hermes;
```

The Hermes token.

#### Setup Functions 

```solidity
    constructor(IERC20 _hermes) public {
        hermes = _hermes;
    }
```

This contract inherits from `IERC20`, which provides the the ERC-20 functions for the liquidity tokens.

#### Externally Accessible Functions

##### enter

```solidity
   function enter(uint256 _amount) public {
       uint256 totalHermes = hermes.balanceOf(address(this));
       uint256 totalShares = totalSupply();       
```
    This function is called when a liquidity provider adds liquidity to the contract ("xHERMES").
    Gets the amount of Hermes locked in the contract and gets the amount of xHermes in existence

```solidity
   if (totalShares == 0 || totalHermes == 0) {
            _mint(msg.sender, _amount);
        }
```
    If no xHermes exists, mint it 1:1 to the amount put in

```solidity
   else {
            uint256 what = _amount.mul(totalShares).div(totalHermes);
            _mint(msg.sender, what);
        }
```
    Calculate and mint the amount of xHermes the Hermes is worth. The ratio will change overtime, as xHermes is burned/minted and Hermes deposited + gained from fees / withdrawn.

```solidity
   hermes.transferFrom(msg.sender, address(this), _amount);
```
    Lock the Hermes in the contract

##### leave    

```solidity
   function leave(uint256 _share) public {
```

    This function is called when a liquidity provider removes liquidity to from contract ("HERMES").
    Unlocks the staked + gained Hermes and burns xHermes
    Inform how much Hermes will be withdrawn. You can remove all or part of it.

```solidity
   uint256 totalShares = totalSupply();
```

    Gets the amount of xHermes in existence

```solidity
   uint256 what = _share.mul(hermes.balanceOf(address(this))).div(totalShares);
```

    Calculates the amount of Hermes the xHermes is worth

```solidity
   _burn(msg.sender, _share);
```

    Burn the requested tokens 

```solidity
   hermes.transfer(msg.sender, what);
```

    Transfer the tokens back
