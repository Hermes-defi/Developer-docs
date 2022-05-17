---
title: "StableHermesStaking"
description: How does the StableHermesStaking contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ["solidity", "hermes", "stacking"]
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 8
---

# StableHermesStaking 

  StableHermesStaking is a contract that allows HERMES deposits and receives stablecoins sent by MoneyMaker's daily
  harvests. Users deposit HERMES and receive a share of what has been sent by MoneyMaker based on their participation of
  the total deposited HERMES. It is similar to a MasterChef, but we allow for claiming of different reward tokens
  (in case at some point we wish to change the stablecoin rewarded).
  Every time `updateReward(token)` is called, We distribute the balance of that tokens as rewards to users that are
  currently staking inside this contract, and they can claim it using `withdraw(0)`


### StableHermesStaking.sol 

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/StableHermesStaking.sol) 


```solidity
contract StableHermesStaking is Ownable
```

```solidity
  using SafeMath for uint256;
  using SafeERC20 for IERC20;
```

```solidity
 struct UserInfo {
        uint256 amount;
        mapping(IERC20 => uint256) rewardDebt;       
    }
```
 
 We do some fancy math here. Basically, any point in time, the amount of HERMESs
 entitled to a user but is pending to be distributed is:

   pending reward = (user.amount * accRewardPerShare) - user.rewardDebt[token]

 Whenever a user deposits or withdraws HERMES. Here's what happens:
   1. accRewardPerShare (and `lastRewardBalance`) gets updated
   2. User receives the pending reward sent to his/her address
   3. User's `amount` gets updated
   4. User's `rewardDebt[token]` gets updated


```solidity
  IERC20 public hermes;
```
```solidity
  uint256 internalHermesBalance;
```
  Internal balance of HERMES, this gets updated on user deposits / withdrawals
  this allows to reward users with HERMES.

```solidity
  IERC20[] public rewardTokens;
```

  Array of tokens that users can claim

```solidity
  mapping(IERC20 => bool) public isRewardToken;
```

```solidity
  mapping(IERC20 => uint256) public lastRewardBalance;
```
  Last reward balance of `token`

```solidity
  address public feeCollector;
```

```solidity
  uint256 public depositFeePercent;
```

  The deposit fee, scaled to `PRECISION`

```solidity
  mapping(IERC20 => uint256) public accRewardPerShare;
```

  Accumulated `token` rewards per share, scaled to `PRECISION`. See above

```solidity
  uint256 public PRECISION;
```
  PRECISION of accRewardPerShare

```solidity
  mapping(address => UserInfo) private userInfo;
```

Info of each user that stakes HERMES

### Events

```solidity
  event Deposit(address indexed user, uint256 amount, uint256 fee);
```
Emitted when a user deposits HERMES

```solidity
  event DepositFeeChanged(uint256 newFee, uint256 oldFee);
```
Emitted when owner changes the deposit fee percentage

```solidity
  event Withdraw(address indexed user, uint256 amount);
```
Emitted when a user withdraws HERMES

```solidity
  event ClaimReward(address indexed user, address indexed rewardToken, uint256 amount);
```
Emitted when a user claims reward

```solidity
  event EmergencyWithdraw(address indexed user, uint256 amount);
```

Emitted when a user emergency withdraws its HERMES

```solidity
  event RewardTokenAdded(address token);
```
Emitted when owner adds a token to the reward tokens list

```solidity
  event RewardTokenRemoved(address token);
```

Emitted when owner removes a token from the reward tokens list


#### Setup Functions 

```solidity
    constructor(
        IERC20 _rewardToken,
        IERC20 _hermes,
        address _feeCollector,
        uint256 _depositFeePercent
    ) {
        require(_feeCollector != address(0), "StableHermesStaking: fee collector can't be address 0");
        require(_depositFeePercent <= 5e17, "StableHermesStaking: max deposit fee can't be greater than 50%");

        hermes = _hermes;
        depositFeePercent = _depositFeePercent;
        feeCollector = _feeCollector;

        isRewardToken[_rewardToken] = true;
        rewardTokens.push(_rewardToken);
        PRECISION = 1e24;
    }
```

  Initialize a new StableHermesStaking contract
  This contract needs to receive an ERC20 `_rewardToken` in order to distribute them (with MoneyMaker in our case)
  @param _rewardToken The address of the ERC20 reward token
  @param _hermes The address of the HERMES token
  @param _depositFeePercent The deposit fee percent, scalled to 1e18, e.g. 3% is 3e16     

#### Externally Accessible Functions

##### deposit

```solidity
   function deposit(uint256 _amount) external {
        UserInfo storage user = userInfo[msg.sender];

        uint256 _fee = (_amount * depositFeePercent) / 1e18;
        uint256 _amountMinusFee = _amount.sub(_fee);

        uint256 _previousAmount = user.amount;
        uint256 _newAmount = user.amount.add(_amountMinusFee);
        user.amount = _newAmount;

        uint256 _len = rewardTokens.length;
        for (uint256 i; i < _len; i++) {
            IERC20 _token = rewardTokens[i];
            updateReward(_token);

            if (_previousAmount != 0) {
                uint256 _pending = _previousAmount.mul(accRewardPerShare[_token]).div(PRECISION).sub(
                    user.rewardDebt[_token]
                );
                if (_pending != 0) {
                    safeTokenTransfer(_token, msg.sender, _pending);
                    emit ClaimReward(msg.sender, address(_token), _pending);
                }
            }
            user.rewardDebt[_token] = _newAmount.mul(accRewardPerShare[_token]).div(PRECISION);
        }

        internalHermesBalance = internalHermesBalance.add(_amountMinusFee);
        hermes.safeTransferFrom(msg.sender, feeCollector, _fee);
        hermes.safeTransferFrom(msg.sender, address(this), _amountMinusFee);
        emit Deposit(msg.sender, _amountMinusFee, _fee);
    }
```

  Deposit HERMES for reward token allocation
  @param _amount The amount of HERMES to deposit
 
##### getUserInfo    

```solidity
   function getUserInfo(address _user, IERC20 _rewardToken) external view returns (uint256, uint256) {
        UserInfo storage user = userInfo[_user];
        return (user.amount, user.rewardDebt[_rewardToken]);
    }
```


    Get user info
    @param _user The address of the user
    @param _rewardToken The address of the reward token
    @return The amount of HERMES user has deposited
    @return The reward debt for the chosen token
     

##### rewardTokensLength    

```solidity
   function rewardTokensLength() external view returns (uint256) {
        return rewardTokens.length;
    }
```

    Get the number of reward tokens
    @return The length of the array

##### addRewardToken    

```solidity
   function addRewardToken(IERC20 _rewardToken) external onlyOwner {
        require(
            !isRewardToken[_rewardToken] && address(_rewardToken) != address(0),
            "StableHermesStaking: token can't be added"
        );
        require(rewardTokens.length < 25, "StableHermesStaking: list of token too big");
        rewardTokens.push(_rewardToken);
        isRewardToken[_rewardToken] = true;
        updateReward(_rewardToken);
        emit RewardTokenAdded(address(_rewardToken));
    }
```

  Add a reward token
  @param _rewardToken The address of the reward token

##### removeRewardToken    

```solidity
   function removeRewardToken(IERC20 _rewardToken) external onlyOwner {
        require(isRewardToken[_rewardToken], "StableHermesStaking: token can't be removed");
        updateReward(_rewardToken);
        isRewardToken[_rewardToken] = false;
        uint256 _len = rewardTokens.length;
        for (uint256 i; i < _len; i++) {
            if (rewardTokens[i] == _rewardToken) {
                rewardTokens[i] = rewardTokens[_len - 1];
                rewardTokens.pop();
                break;
            }
        }
        emit RewardTokenRemoved(address(_rewardToken));
    }
```

    Remove a reward token
    @param _rewardToken The address of the reward token

##### setDepositFeePercent    

```solidity
   function setDepositFeePercent(uint256 _depositFeePercent) external onlyOwner {
        require(_depositFeePercent <= 5e17, "StableHermesStaking: deposit fee can't be greater than 50%");
        uint256 oldFee = depositFeePercent;
        depositFeePercent = _depositFeePercent;
        emit DepositFeeChanged(_depositFeePercent, oldFee);
    }
```

    Set the deposit fee percent
    @param _depositFeePercent The new deposit fee percent

##### pendingReward    

```solidity
  
    function pendingReward(address _user, IERC20 _token) external view returns (uint256) {
        require(isRewardToken[_token], "StableHermesStaking: wrong reward token");
        UserInfo storage user = userInfo[_user];
        uint256 _totalHermes = internalHermesBalance;
        uint256 _accRewardTokenPerShare = accRewardPerShare[_token];

        uint256 _currRewardBalance = _token.balanceOf(address(this));
        uint256 _rewardBalance = _token == hermes ? _currRewardBalance.sub(internalHermesBalance) : _currRewardBalance;

        if (_rewardBalance != lastRewardBalance[_token] && _totalHermes != 0) {
            uint256 _accruedReward = _rewardBalance.sub(lastRewardBalance[_token]);
            _accRewardTokenPerShare = _accRewardTokenPerShare.add(_accruedReward.mul(PRECISION).div(_totalHermes));
        }
        return user.amount.mul(_accRewardTokenPerShare).div(PRECISION).sub(user.rewardDebt[_token]);
    }
```


  View function to see pending reward token on frontend
  @param _user The address of the user
  @param _token The address of the token
  @return `_user`'s pending reward token

##### withdraw    

```solidity
   function withdraw(uint256 _amount) external {
        UserInfo storage user = userInfo[msg.sender];
        uint256 _previousAmount = user.amount;
        require(_amount <= _previousAmount, "StableHermesStaking: withdraw amount exceeds balance");
        uint256 _newAmount = user.amount.sub(_amount);
        user.amount = _newAmount;

        uint256 _len = rewardTokens.length;
        if (_previousAmount != 0) {
            for (uint256 i; i < _len; i++) {
                IERC20 _token = rewardTokens[i];
                updateReward(_token);

                uint256 _pending = _previousAmount.mul(accRewardPerShare[_token]).div(PRECISION).sub(
                    user.rewardDebt[_token]
                );
                user.rewardDebt[_token] = _newAmount.mul(accRewardPerShare[_token]).div(PRECISION);

                if (_pending != 0) {
                    safeTokenTransfer(_token, msg.sender, _pending);
                    emit ClaimReward(msg.sender, address(_token), _pending);
                }
            }
        }

        internalHermesBalance = internalHermesBalance.sub(_amount);
        hermes.safeTransfer(msg.sender, _amount);

        emit Withdraw(msg.sender, _amount);
    }
```

  Withdraw HERMES and harvest the rewards
  @param _amount The amount of HERMES to withdraw

##### emergencyWithdraw    

```solidity
  function emergencyWithdraw() external {
        UserInfo storage user = userInfo[msg.sender];

        uint256 _amount = user.amount;
        user.amount = 0;
        uint256 _len = rewardTokens.length;
        for (uint256 i; i < _len; i++) {
            IERC20 _token = rewardTokens[i];
            user.rewardDebt[_token] = 0;
        }
        hermes.safeTransfer(msg.sender, _amount);
        emit EmergencyWithdraw(msg.sender, _amount);
    }
```

  Withdraw without caring about rewards. EMERGENCY ONLY

##### updateReward    

```solidity
  function updateReward(IERC20 _token) public {
        require(isRewardToken[_token], "StableHermesStaking: wrong reward token");

        uint256 _currRewardBalance = _token.balanceOf(address(this));
        uint256 _rewardBalance = _token == hermes ? _currRewardBalance.sub(internalHermesBalance) : _currRewardBalance;

        uint256 _totalHermes = internalHermesBalance;

        // Did StableHermesStaking receive any token
        if (_rewardBalance == lastRewardBalance[_token] || _totalHermes == 0) {
            return;
        }

        uint256 _accruedReward = _rewardBalance.sub(lastRewardBalance[_token]);

        accRewardPerShare[_token] = accRewardPerShare[_token].add(_accruedReward.mul(PRECISION).div(_totalHermes));
        lastRewardBalance[_token] = _rewardBalance;
    }

```

  Update reward variables
  @param _token The address of the reward token
  @dev Needs to be called before any deposit or withdrawal


##### Internal functions


##### safeTokenTransfer    

```solidity
  function safeTokenTransfer(
        IERC20 _token,
        address _to,
        uint256 _amount
    ) internal {
        uint256 _currRewardBalance = _token.balanceOf(address(this));
        uint256 _rewardBalance = _token == hermes ? _currRewardBalance.sub(internalHermesBalance) : _currRewardBalance;

        if (_amount > _rewardBalance) {
            lastRewardBalance[_token] = lastRewardBalance[_token].sub(_rewardBalance);
            _token.safeTransfer(_to, _rewardBalance);
        } else {
            lastRewardBalance[_token] = lastRewardBalance[_token].sub(_amount);
            _token.safeTransfer(_to, _amount);
        }
    }
```

  Safe token transfer function, just in case if rounding error
  causes pool to not have enough reward tokens
  @param _token The address of then token to transfer
  @param _to The address that will receive `_amount` `rewardToken`
  @param _amount The amount to send to `_to`
