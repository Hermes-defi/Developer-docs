---
title: "Hermes Token"
description: How does the HermesToken contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ["solidity", "hermes"]
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 3
---

# HermesToken  

### HermesToken.sol 

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/HermesToken.sol) is a representation of IERC20 Hermes 

 ```solidity
pragma solidity >=0.8.0 <0.9.0;
```


```solidity
contract Hermes is
    Ownable,
    ERC20("Hermes", "HRMS"),
    ERC20Capped(30000000 gwei),
    AccessControl  
```



```solidity
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
```


#### Setup Functions 

```solidity
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }
```


#### Externally Accessible Functions

##### burn

```solidity
   function burn(address _account, uint256 amount)
        public
        onlyRole(BURNER_ROLE)
    {
        _burn(_account, amount);
    }
```
 
##### mint    

```solidity
   function mint(address _account, uint256 _amount)
        public
        onlyRole(MINTER_ROLE)
        returns(bool)
    {
        return _mint(_account, _amount);
    }
```

##### grantMinterRole    

```solidity
   function grantMinterRole(address _account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(MINTER_ROLE, _account);
    }
```

##### grantBurnerRole    

```solidity
   function grantBurnerRole(address _account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _grantRole(BURNER_ROLE, _account);
    }
```

##### revokeMinterRole    

```solidity
   function revokeMinterRole(address _account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(MINTER_ROLE, _account);
    }
```

##### revokeBurnerRole    

```solidity
   function revokeBurnerRole(address _account)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _revokeRole(BURNER_ROLE, _account);
    }
```

##### transferOwnership    

```solidity
  
    function transferOwnership(address newOwner)
        public
        virtual
        override
        onlyOwner
    {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _grantRole(DEFAULT_ADMIN_ROLE, newOwner);
        _transferOwnership(newOwner);
    }
```


##### Internal functions   

##### _mint    

```solidity
   function _mint(address account, uint256 amount)
        internal
        virtual
        override(ERC20, ERC20Capped)
        returns(bool)
    {
        return super._mint(account, amount);
    }
```

