---
title: 'Vesting'
description: How does the Vesting contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ['solidity', 'hermes']
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 13
---

# Vesting

### Vesting.sol

[This contract](https://github.com/Hermes-defi/hermes-team-vest/blob/master/contracts/Vesting.sol) lock in a certain amount of funds until the terms of the contract are fulfilled

```solidity
pragma solidity ^0.8.4;
```

```solidity
 import "@openzeppelin/contracts/access/Ownable.sol";
 import "@openzeppelin/contracts/utils/Address.sol";
 import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
 import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
 import "hardhat/console.sol";
```

```solidity
contract HermesVesting is Ownable {
```

```solidity
  using SafeERC20 for IERC20;
```

    SafeERC20 is a wrapper around the interface that eliminates the need to handle boolean return values. TokenTimelock can hold tokens for a beneficiary until a specified time.

```solidity
  using Address for address;
```

#### Events

```solidity
    event CreateVesting(
        uint256 indexed vestingId,
        address indexed user,
        uint256 amount,
        uint256 startEpoch,
        uint256 durationInEpoch
    );
```

    Emmited when a new vest is created

```solidity
  event Claim(
        uint256 indexed vestingId,
        address indexed user,
        uint256 amount
    );
```

    Emmited when a vest is claimed

#### Structs

```solidity
  struct Vesting {
        address user;
        uint256 amount; // Hermes token amount in wei
        uint256 startEpoch; // start time in epoch
        uint256 durationInEpoch; // duration in epoch
        uint256 claimedAmount;
    }
```

    Struct to keep the vesting informations

#### Variables

```solidity
    uint256 public startTime;
```

    The timestamp that the contract can start working

```solidity
    uint256 public epochLength;
```

    The size of epoch

```solidity
    IERC20 public hermes;
```

    The HERMES token

```solidity
    Vesting[] public vestings;
```

    A array of vestings structs

```solidity
    bool freeClaimed;
```

    Check if the vesting was already claimed

```solidity
    mapping(address => uint256[]) private _vestingsByAddress;
```

    The list of all vestings address

#### Setup Functions

```solidity
    constructor(
        address _hermes,
        uint256 _startTime,
        uint256 _epochLength
    ) Ownable() {
        hermes = IERC20(_hermes);
        startTime = _startTime;
        epochLength = _epochLength;
    }
```

    Start the contract setting the hermes token, the start of contract execution and the epoch lenght

#### Externally Accessible Functions

##### freeClaim

```solidity
   function freeClaim() external {
        require(freeClaimed == false, "already did");
        for(uint i = 0; i < vestings.length; i ++) {
            Vesting storage vesting = vestings[i];
            uint freeClaimAmount = vesting.amount * 166 / 1000;
            vesting.claimedAmount = freeClaimAmount;
            console.log(freeClaimAmount);
            hermes.transfer(vesting.user, freeClaimAmount);
        }
        freeClaimed = true;
    }

```

##### currentEpoch

```solidity
    function currentEpoch() public view returns (uint256) {
        if (block.timestamp < startTime) {
            return 0;
        }

        return (block.timestamp - startTime) / epochLength + 1;
    }
```

    Returns the current epoch

##### createVesting

```solidity
   function createVesting(
        address user,
        uint256 amount,
        uint256 startEpoch,
        uint256 durationInEpoch
    ) external onlyOwner {
        require(
            user != address(0) && !user.isContract(),
            "Invalid address!"
        );
        require(amount > 0, "Invalid amount!");
        require(
            startEpoch > currentEpoch() && durationInEpoch > 0,
            "Invalid request!"
        );

        vestings.push(
            Vesting({
                user: user,
                amount: amount,
                startEpoch: startEpoch,
                durationInEpoch: durationInEpoch,
                claimedAmount: 0
            })
        );
        _vestingsByAddress[user].push(vestings.length - 1);

        emit CreateVesting(
            vestings.length - 1,
            user,
            amount,
            startEpoch,
            durationInEpoch
        );
    }
```

    Create a new vesting

##### setPendingAdmin

```solidity
   function vestingsByAddress(address user)
        external
        view
        returns (uint256[] memory)
    {
        return _vestingsByAddress[user];
    }
```

    Set the new admin

##### claimable

```solidity
   function claimable(uint256 vestingId) external view returns (uint256) {
        require(vestingId < vestings.length, "Invalid index!");

        return _claimable(vestingId);
    }

```

    Check if the vesting is claimable

##### claim

```solidity

    function claim(uint256 vestingId) external {
        require(vestingId < vestings.length, "Invalid index!");

        Vesting storage vesting = vestings[vestingId];
        require(msg.sender == vesting.user, "unauthorized");

        uint256 claimAmount = _claimable(vestingId);
        require(claimAmount > 0, "unable to claim");

        vesting.claimedAmount += claimAmount;

        hermes.safeTransfer(vesting.user, claimAmount);

        emit Claim(vestingId, vesting.user, claimAmount);
    }
```

    Clain the vest and transfer the tokens

##### Internal functions

##### \_claimable

```solidity
   function _claimable(uint256 vestingId) internal view returns (uint256) {
        Vesting memory vesting = vestings[vestingId];

        uint256 current = currentEpoch();

        if (current < vesting.startEpoch) {
            return 0;
        }

        uint256 vestedAmount = ((currentEpoch() - vesting.startEpoch + 1) *
            vesting.amount) / vesting.durationInEpoch;

        if (vestedAmount > vesting.amount) {
            vestedAmount = vesting.amount;
        }

        return vestedAmount - vesting.claimedAmount;
    }

    Check if a vesting is claimable
```
