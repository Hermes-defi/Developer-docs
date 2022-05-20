---
title: 'Timelock'
description: How does the Timelock contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ['solidity', 'hermes']
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 12
---

# Timelock

### Timelock.sol

[This contract](https://github.com/Hermes-defi/hermes-timelock/blob/main/contracts/Timelock.sol) is a representation of a locking mechanism. The time lock is a timer designed to prevent the execution of a transaction until it reaches the preset time, even if the correct lock combination(s) are known.

```solidity
pragma solidity 0.6.12;
```

```solidity
contract Timelock {
```

```solidity
    using SafeMath for uint256;
```

The [SafeMathHermes library](https://docs.openzeppelin.com/contracts/2.x/api/math) is used to avoid overflows and
underflows. This is important because otherwise we might end up with a situation where a value should be `-1`,
but is instead `2^256-1`.

#### Events

```solidity
    event NewAdmin(address indexed newAdmin);
```

    Emitted when a new admin is accepted

```solidity
    event NewPendingAdmin(address indexed newPendingAdmin);
```

    Emitted when a new admin is queued to be accepted

```solidity
    event NewDelay(uint indexed newDelay);
```

    Emitted when a new delay is setted

```solidity
    event CancelTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature,  bytes data, uint eta);
```

    Emitted when a pending transaction is cancelled

```solidity
    event ExecuteTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature,  bytes data, uint eta);
```

    Emitted when a pending transaction is executed

```solidity
    event QueueTransaction(bytes32 indexed txHash, address indexed target, uint value, string signature, bytes data, uint eta);
```

    Emitted when a new transaction is queued

#### Variables

```solidity
    uint public constant GRACE_PERIOD = 14 days;
```

    The time after which an accepted proposal cannot be executed anymore, constantly set to 14 days.

```solidity
    uint public constant MINIMUM_DELAY = 12 hours;
```

    The minimum delay accepted

```solidity
    uint public constant MAXIMUM_DELAY = 30 days;
```

    The maximum delay accepted

```solidity
    address public admin = address(0x7cef2432A2690168Fb8eb7118A74d5f8EfF9Ef55);
```

    This address keeps the admin. Is used to allows one time setting of admin for deployment purposes

```solidity
    address public pendingAdmin;
```

    The new address of the admin

```solidity
    uint public delay;
```

    The delay waited to execute the transaction

```solidity
    bool public admin_initialized;
```

    Used to check if the admin has already this contract. Only allows transaction if the admin is the contract himself

```solidity
    mapping (bytes32 => bool) public queuedTransactions;
```

    Queue of transactions

#### Setup Functions

```solidity
    constructor() public {
        delay = MINIMUM_DELAY;
        admin_initialized = false;
    }
```

#### Externally Accessible Functions

##### receive

```solidity
   receive() external payable { }
```

##### setDelay

```solidity
   function setDelay(uint delay_) public {
        require(msg.sender == address(this), "Timelock::setDelay: Call must come from Timelock.");
        require(delay_ >= MINIMUM_DELAY, "Timelock::setDelay: Delay must exceed minimum delay.");
        require(delay_ <= MAXIMUM_DELAY, "Timelock::setDelay: Delay must not exceed maximum delay.");
        delay = delay_;

        emit NewDelay(delay);
    }
```

    This function check if the caller is the timelock contract,
    check if the new delay is between MINIMUM_DELAY and MAXIMUM_DELAY,
    then set the new delay

##### acceptAdmin

```solidity
   function acceptAdmin() public {
        require(msg.sender == pendingAdmin, "Timelock::acceptAdmin: Call must come from pendingAdmin.");
        admin = msg.sender;
        pendingAdmin = address(0);

        emit NewAdmin(admin);
    }
```

    Change the actual admin if the sender is seted before on setPendingAdmin

##### setPendingAdmin

```solidity
   function setPendingAdmin(address pendingAdmin_) public {
        // allows one time setting of admin for deployment purposes
        if (admin_initialized) {
            require(msg.sender == address(this), "Timelock::setPendingAdmin: Call must come from Timelock.");
        } else {
            require(msg.sender == admin, "Timelock::setPendingAdmin: First call must come from admin.");
            admin_initialized = true;
        }
        pendingAdmin = pendingAdmin_;

        emit NewPendingAdmin(pendingAdmin);
    }
```

    Set a new admin to be checked

##### queueTransaction

```solidity
   function queueTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public returns (bytes32) {
        require(msg.sender == admin, "Timelock::queueTransaction: Call must come from admin.");
        require(eta >= getBlockTimestamp().add(delay), "Timelock::queueTransaction: Estimated execution block must satisfy delay.");

        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        queuedTransactions[txHash] = true;

        emit QueueTransaction(txHash, target, value, signature, data, eta);
        return txHash;
    }
```

    Queue a new transaction

##### cancelTransaction

```solidity
   function cancelTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public {
        require(msg.sender == admin, "Timelock::cancelTransaction: Call must come from admin.");

        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        queuedTransactions[txHash] = false;

        emit CancelTransaction(txHash, target, value, signature, data, eta);
    }

```

    Cancel a pending transaction

##### executeTransaction

```solidity

    function executeTransaction(address target, uint value, string memory signature, bytes memory data, uint eta) public payable returns (bytes memory) {
        require(msg.sender == admin, "Timelock::executeTransaction: Call must come from admin.");

        bytes32 txHash = keccak256(abi.encode(target, value, signature, data, eta));
        require(queuedTransactions[txHash], "Timelock::executeTransaction: Transaction hasn't been queued.");
        require(getBlockTimestamp() >= eta, "Timelock::executeTransaction: Transaction hasn't surpassed time lock.");
        require(getBlockTimestamp() <= eta.add(GRACE_PERIOD), "Timelock::executeTransaction: Transaction is stale.");

        queuedTransactions[txHash] = false;

        bytes memory callData;

        if (bytes(signature).length == 0) {
            callData = data;
        } else {
            callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);
        }

        // solium-disable-next-line security/no-call-value
        (bool success, bytes memory returnData) = target.call{value: value}(callData);
        require(success, "Timelock::executeTransaction: Transaction execution reverted.");

        emit ExecuteTransaction(txHash, target, value, signature, data, eta);

        return returnData;
    }
```

    Execute a queued transaction

##### Internal functions

##### getBlockTimestamp

```solidity
   function getBlockTimestamp() internal view returns (uint) {
        // solium-disable-next-line security/no-block-members
        return block.timestamp;
    }


    Get the actual time blockstamp
```
