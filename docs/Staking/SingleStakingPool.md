---
title: "SingleStakingPool"
description: How does the SingleStakingPool contract work? Why is it written that way?
author: Hermes Team
sidebar: true
tags: ["solidity", "hermes", "staking"]
skill: intermediate
published: 2022-05-14
lang: en
sidebar_position: 7
---

# SingleStakingPool 

[This contract](https://github.com/Hermes-defi/hermes-swap/blob/main/contracts/SingleStakingPool.sol) is a representation of Single-stake. Single-stake pools is where only one type of token is needed to stake. No LP token-making is required, but the concept is similar to making a liquidity token (LP), and staking that LP in a farm to earn other tokens. 

### SingleStakingPool.sol 


```solidity
contract StakingPool is Ownable, Initializable {
```

```solidity
  using SafeERC20 for IERC20;
```

```solidity
  struct UserInfo {
          uint256 amount;     // How many LP tokens the user has provided.
          uint256 rewardDebt; // Reward debt. See explanation below.
      }
```

    Info of each user - How many LP tokens the user has provided and Reward debt

```solidity
  struct PoolInfo {
        IERC20 lpToken;           // Address of LP token contract.
        uint256 allocPoint;       // How many allocation points assigned to this pool. Rewards to distribute per block.
        uint256 lastRewardBlock;  // Last block number that Rewards distribution occurs.
        uint256 accRewardTokenPerShare; // Accumulated Rewards per share, times 1e30. See below.
    }

```
```solidity
  IERC20 public STAKE_TOKEN;
```

    The stake token

```solidity
  IERC20 public REWARD_TOKEN
```

    The reward token

```solidity
  uint256 public rewardPerBlock;
```

    Reward tokens created per block.

```solidity
  uint256 public totalStaked = 0;
```
    Keep track of number of tokens staked in case the contract earns reflect fees

```solidity
  PoolInfo public poolInfo;
```
    Info of each pool.

```solidity
  mapping (address => UserInfo) public userInfo;
```

    Info of each user that stakes LP tokens.

```solidity
  uint256 private totalAllocPoint = 0;
```

    Total allocation poitns. Must be the sum of all allocation points in all pools.

```solidity
  uint256 public startBlock;
```

    The block number when Reward mining starts.

```solidity
  uint256 public bonusEndBlock;
```

    The block number when mining ends.


#### Events


```solidity
event Deposit(address indexed user, uint256 amount);
    event DepositRewards(uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event SkimStakeTokenFees(address indexed user, uint256 amount);
    event LogUpdatePool(uint256 bonusEndBlock, uint256 rewardPerBlock);
    event EmergencyRewardWithdraw(address indexed user, uint256 amount);
    event EmergencySweepWithdraw(address indexed user, IERC20 indexed token, uint256 amount);
```


#### Setup Functions 

```solidity
    function initialize(
        IERC20 _stakeToken,
        IERC20 _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) external initializer
    {
        STAKE_TOKEN = _stakeToken;
        REWARD_TOKEN = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        bonusEndBlock = _bonusEndBlock;

        // staking pool
        poolInfo = PoolInfo({
        lpToken: _stakeToken,
        allocPoint: 1000,
        lastRewardBlock: startBlock,
        accRewardTokenPerShare: 0
        });

        totalAllocPoint = 1000;
    }
```



#### Externally Accessible Functions

##### getMultiplier

```solidity
   function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to - _from;
        } else if (_from >= bonusEndBlock) {
            return 0;
        } else {
            return bonusEndBlock - _from;
        }
    }
```

    Return reward multiplier over the given _from to _to block.
 
##### setBonusEndBlock    

```solidity
   function setBonusEndBlock(uint256 _bonusEndBlock) external onlyOwner {
        require(_bonusEndBlock > bonusEndBlock, 'new bonus end block must be greater than current');
        bonusEndBlock = _bonusEndBlock;
        emit LogUpdatePool(bonusEndBlock, rewardPerBlock);
    }
```

    _bonusEndBlock The block when rewards will end

##### pendingReward    

```solidity
   function pendingReward(address _user) external view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 accRewardTokenPerShare = poolInfo.accRewardTokenPerShare;
        if (block.number > poolInfo.lastRewardBlock && totalStaked != 0) {
            uint256 multiplier = getMultiplier(poolInfo.lastRewardBlock, block.number);
            uint256 tokenReward = multiplier * rewardPerBlock * poolInfo.allocPoint / totalAllocPoint;
            accRewardTokenPerShare = accRewardTokenPerShare + (tokenReward * 1e30 / totalStaked);
        }
        return user.amount * accRewardTokenPerShare / 1e30 - user.rewardDebt;
    }
```

    View function to see pending Reward on frontend.

##### updatePool    

```solidity
   function updatePool() public {
        if (block.number <= poolInfo.lastRewardBlock) {
            return;
        }
        if (totalStaked == 0) {
            poolInfo.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(poolInfo.lastRewardBlock, block.number);
        uint256 tokenReward = multiplier * rewardPerBlock * poolInfo.allocPoint / totalAllocPoint;
        poolInfo.accRewardTokenPerShare = poolInfo.accRewardTokenPerShare + (tokenReward * 1e30 / totalStaked);
        poolInfo.lastRewardBlock = block.number;
    }
```

    Update reward variables of the given pool to be up-to-date.

##### deposit    

```solidity
   function deposit(uint256 _amount) public {
        UserInfo storage user = userInfo[msg.sender];
        uint256 finalDepositAmount = 0;
        updatePool();
        if (user.amount > 0) {
            uint256 pending = user.amount * poolInfo.accRewardTokenPerShare / 1e30 - user.rewardDebt;
            if(pending > 0) {
                uint256 currentRewardBalance = rewardBalance();
                if(currentRewardBalance > 0) {
                    if(pending > currentRewardBalance) {
                        safeTransferReward(address(msg.sender), currentRewardBalance);
                    } else {
                        safeTransferReward(address(msg.sender), pending);
                    }
                }
            }
        }
        if (_amount > 0) {
            uint256 preStakeBalance = STAKE_TOKEN.balanceOf(address(this));
            poolInfo.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            finalDepositAmount = STAKE_TOKEN.balanceOf(address(this)) - preStakeBalance;
            user.amount = user.amount + finalDepositAmount;
            totalStaked = totalStaked + finalDepositAmount;
        }
        user.rewardDebt = user.amount * poolInfo.accRewardTokenPerShare / 1e30;

        emit Deposit(msg.sender, finalDepositAmount);
    }
```

    Deposit staking token into the contract to earn rewards.
    Since this contract needs to be supplied with rewards we are
    sending the balance of the contract if the pending rewards are higher
    @param _amount The amount of staking tokens to deposit

##### withdraw    

```solidity
   function withdraw(uint256 _amount) public {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool();
        uint256 pending = user.amount * poolInfo.accRewardTokenPerShare / 1e30 - user.rewardDebt;
        if(pending > 0) {
            uint256 currentRewardBalance = rewardBalance();
            if(currentRewardBalance > 0) {
                if(pending > currentRewardBalance) {
                    safeTransferReward(address(msg.sender), currentRewardBalance);
                } else {
                    safeTransferReward(address(msg.sender), pending);
                }
            }
        }
        if(_amount > 0) {
            user.amount = user.amount - _amount;
            poolInfo.lpToken.safeTransfer(address(msg.sender), _amount);
            totalStaked = totalStaked - _amount;
        }

        user.rewardDebt = user.amount * poolInfo.accRewardTokenPerShare / 1e30;

        emit Withdraw(msg.sender, _amount);
    }
```

    Withdraw rewards and/or staked tokens. Pass a 0 amount to withdraw only rewards
    @param _amount The amount of staking tokens to withdraw

##### rewardBalance    

```solidity
  
    function rewardBalance() public view returns (uint256) {
        uint256 balance = REWARD_TOKEN.balanceOf(address(this));
        if (STAKE_TOKEN == REWARD_TOKEN)
            return balance - totalStaked;
        return balance;
    }
```

    Obtain the reward balance of this contract
    @return wei balace of conract

##### depositRewards    

```solidity
   function depositRewards(uint256 _amount) external {
        require(_amount > 0, 'Deposit value must be greater than 0.');
        REWARD_TOKEN.safeTransferFrom(address(msg.sender), address(this), _amount);
        emit DepositRewards(_amount);
    }
```

    Deposit Rewards into contract   


##### totalStakeTokenBalance    

```solidity
  function totalStakeTokenBalance() public view returns (uint256) {
        if (STAKE_TOKEN == REWARD_TOKEN)
            return totalStaked;
        return STAKE_TOKEN.balanceOf(address(this));
    }
```

     Obtain the stake balance of this contract

##### getStakeTokenFeeBalance    

```solidity
  function getStakeTokenFeeBalance() public view returns (uint256) {
        return STAKE_TOKEN.balanceOf(address(this)) - totalStaked;
    }
```
    Obtain the stake token fees (if any) earned by reflect token

##### setRewardPerBlock    

```solidity
  function setRewardPerBlock(uint256 _rewardPerBlock) external onlyOwner {
        rewardPerBlock = _rewardPerBlock;
        emit LogUpdatePool(bonusEndBlock, rewardPerBlock);
    }
```
    @param _rewardPerBlock The amount of reward tokens to be given per block

##### skimStakeTokenFees    

```solidity
  function skimStakeTokenFees() external onlyOwner {
        uint256 stakeTokenFeeBalance = getStakeTokenFeeBalance();
        STAKE_TOKEN.safeTransfer(msg.sender, stakeTokenFeeBalance);
        emit SkimStakeTokenFees(msg.sender, stakeTokenFeeBalance);
    }

```
    Remove excess stake tokens earned by reflect fees

##### emergencyWithdraw    

```solidity
  function emergencyWithdraw() external {
        UserInfo storage user = userInfo[msg.sender];
        poolInfo.lpToken.safeTransfer(address(msg.sender), user.amount);
        totalStaked = totalStaked - user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        emit EmergencyWithdraw(msg.sender, user.amount);
    }
```

    Withdraw without caring about rewards. EMERGENCY ONLY.

##### emergencyRewardWithdraw    

```solidity
  function emergencyRewardWithdraw(uint256 _amount) external onlyOwner {
        require(_amount <= rewardBalance(), 'not enough rewards');
        // Withdraw rewards
        safeTransferReward(address(msg.sender), _amount);
        emit EmergencyRewardWithdraw(msg.sender, _amount);
    }
```

    Withdraw reward. EMERGENCY ONLY.

##### depositRewards    

```solidity
  function sweepToken(IERC20 token) external onlyOwner {
        require(address(token) != address(STAKE_TOKEN), "can not sweep stake token");
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
        emit EmergencySweepWithdraw(msg.sender, token, balance);
    }
```

    A public function to sweep accidental BEP20 transfers to this contract.
    Tokens are sent to owner
    @param token The address of the BEP20 token to sweep

##### Internal functions


##### safeTransferReward    

```solidity
function safeTransferReward(address _to, uint256 _amount) internal {
        REWARD_TOKEN.safeTransfer(_to, _amount);
    }
```

    @param _to address to send reward token to
    @param _amount value of reward token to transfer
