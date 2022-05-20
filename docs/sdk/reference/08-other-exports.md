---
id: other-exports
title: Other Exports
---

# JSBI

```typescript
import { JSBI } from '@hermesdefiofficial/sdk';
// import JSBI from 'jsbi'
```

The default export from [jsbi](https://github.com/GoogleChromeLabs/jsbi).

# BigintIsh

```typescript
import { BigintIsh } from '@hermesdefiofficial/sdk';
// type BigintIsh = JSBI | bigint | string
```

A union type comprised of all types that can be cast to a JSBI instance.

# ChainId

```typescript
import { ChainId } from '@hermesdefiofficial/sdk';
// enum ChainId {
//   MAINNET = 1,
//   ROPSTEN = 3,
//   RINKEBY = 4,
//   GÖRLI = 5,
//   KOVAN = 42
// }
```

A enum denominating supported chain IDs.

# TradeType

```typescript
import { TradeType } from '@hermesdefiofficial/sdk';
// enum TradeType {
//   EXACT_INPUT,
//   EXACT_OUTPUT
// }
```

A enum denominating supported trade types.

# Rounding

```typescript
import { Rounding } from '@hermesdefiofficial/sdk';
// enum Rounding {
//   ROUND_DOWN,
//   ROUND_HALF_UP,
//   ROUND_UP
// }
```

A enum denominating supported rounding options.

# FACTORY_ADDRESS

```typescript
import { FACTORY_ADDRESS } from '@hermesdefiofficial/sdk';
```

The [factory address](../../../protocol/V2/reference/smart-contracts/factory#address).

# INIT_CODE_HASH

```typescript
import { INIT_CODE_HASH } from '@hermesdefiofficial/sdk';
```

See [pair addresses](../../../protocol/V2/guides/smart-contract-integration/getting-pair-addresses).

# MINIMUM_LIQUIDITY

```typescript
import { MINIMUM_LIQUIDITY } from '@hermesdefiofficial/sdk';
```

See [minimum liquidity](../../../protocol/V2/reference/smart-contracts/pair#minimum-liquidity).

# InsufficientReservesError

```typescript
import { InsufficientReservesError } from '@hermesdefiofficial/sdk';
```

# InsufficientInputAmountError

```typescript
import { InsufficientInputAmountError } from '@hermesdefiofficial/sdk';
```

# WETH

```typescript
import { WETH } from '@hermesdefiofficial/sdk';
```

An object whose values are [WETH](../../../protocol/V2/reference/smart-contracts/router-02#weth) [Token](token) instances, indexed by [ChainId](#chainid).
