![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![License: MIT](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)

## Uniswap universal execute decoder
Decodes Uniswap Universal execute function in accordance with [the Uniswap tehchnical reference](https://docs.uniswap.org/contracts/universal-router/technical-reference#command-inputs) in which translate binary into array.
 
### Used libraries

- chai
- ethers
- mocha
- fs
- path
- util

### Decoded functions

---

| command | value | Decode | Tested
| ---------- | ------------- |:------:|:------:
| 0x(Empty)   | [Use hasUniswapCommands function for avoiding Exception](https://github.com/HiroyukiNaito/uniswap-universal-decoder/blob/main/example.js#L26) | ✅ |  ✅
| 0x00 | V3_SWAP_EXACT_IN | ✅ |  ✅
| 0x01 | V3_SWAP_EXACT_OUT | ✅ |  ✅
| 0x02 | PERMIT2_TRANSFER_FROM | ✅ | 
| 0x03 | PERMIT2_PERMIT_BATCH | ✅ | 
| 0x04 | SWEEP | ✅ |  ✅
| 0x05 | TRANSFER | ✅ | ✅
| 0x06 | PAY_PORTION | ✅ |  ✅
| 0x07 | N/A | N/A | N/A
| 0x08 | V2_SWAP_EXACT_IN | ✅ |  ✅
| 0x09 | V2_SWAP_EXACT_OUT | ✅ |  ✅
| 0x0a | [PERMIT2_PERMIT](https://docs.uniswap.org/contracts/permit2/reference/allowance-transfer) | ✅ |  ✅
| 0x0b | WRAP_ETH | ✅ |  ✅
| 0x0c | UNWRAP_WETH | ✅ |   ✅
| 0x0d | PERMIT2_TRANSFER_FROM_BATCH | ✅ | 
| 0x0e | N/A | N/A | N/A
| 0x0f | N/A | N/A | N/A
| 0x10 | SEAPORT | ✅ | 
| 0x11 | LOOKS_RARE_721 | ✅ | 
| 0x12 | NFTX | ✅ | 
| 0x13 | CRYPTOPUNKS | ✅ | 
| 0x14 | LOOKS_RARE_1155 | ✅ | 
| 0x15 | OWNER_CHECK_721 | ✅ | 
| 0x16 | OWNER_CHECK_1155 | ✅ | 
| 0x17 | SWEEP_ERC721| ✅ | 
| 0x18 | X2Y2_721 | ✅ | 
| 0x19 | SUDOSWAP | ✅ | 
| 0x1a | NFT20 | ✅ | 
| 0x1b | X2Y2_1155 | ✅ | 
| 0x1c | FOUNDATION | ✅ | 
| 0x1d | N/A  | N/A | N/A
| 0x1e | N/A  | N/A | N/A
| 0x1f | N/A  | N/A | N/A

---

### [Address Constants](https://etherscan.io/address/0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD#code#F26#L17)

NOTE: Uniswap Universal Router uses address constants internally, for example

```solidity
    /// @dev Used as a flag for identifying the transfer of ETH instead of a token
    address internal constant ETH = address(0);

    /// @dev Used as a flag for identifying that msg.sender should be used, saves gas by sending more 0 bytes
    address internal constant MSG_SENDER = address(1);

    /// @dev Used as a flag for identifying address(this) should be used, saves gas by sending more 0 bytes
    address internal constant ADDRESS_THIS = address(2);
```
- '0x0000000000000000000000000000000000000001' represents msg.sender (EOA) address itself
- '0x0000000000000000000000000000000000000002' represents Universal Router Contract address itself 

### Usage

#### Importing module
```javascript
const {
  hasUniswapCommands,
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
} = require("./universalDecoder");
```

####  hasUniswapCommands function

Check whether it has Uiversal Router Commands

- Call function
```javascript
console.log(hasUniswapCommands(txnData));
```
- Expected Result Example
```javascript
true
```

Obtain Uniswap Uiversal Router Commands as an String

- Call function
```javascript
console.log(uniswapCommands(txnData));
```
- Expected Result Example
```javascript
"0x0b08"
```

####  uniswapCommandArray function
Obtain Uniswap Uiversal Router Commands as an Array

- Call function
```javascript
console.log(uniswapCommandArray(txnData));
```
- Expected Result Example
```javascript
["0b", "08"]
```

####  uniswapInputArray function
Obtain Uniswap Uiversal Router Input Array as an Binary

- Call function
```javascript
console.log(uniswapInputArray(txnData));
```
- Expected Result Example
```javascript
[
"0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000001aa535d3d0c000",
"0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001aa535d3d0c00000000000000000000000000000000000000000000030b3ead9ce807fab959dd700000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000002e7f808990638e9e67e1f00313037ede2362361",
]
```

####  uniswapDecodedInputArray function
Obtain Uniswap Uiversal Router Input Decoded Array

- Call function
```javascript
console.log(uniswapDecodedInputArray(txnData));
```
- Expected Result Example
```javascript
 [
  '0x0000000000000000000000000000000000000001',
  7500000000000000n,
  58878075174672152174894551n,
  [
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    '0x02e7f808990638e9e67e1f00313037ede2362361'
  ],
  false
]
```

####  uniswapV3DecodedInputArray function
Obtain Uniswap Uiversal Router Input Decoded Array and Decoded [Uniswap V3 Path](https://docs.uniswap.org/contracts/v3/reference/periphery/libraries/Path) 

- Call function
```javascript
console.log(uniswapV3DecodedInputArray(txnData));
```
- Expected Result Example
```javascript
 [
  [ '0x0000000000000000000000000000000000000002', 34564726617685178n ],
  [
    '0x0000000000000000000000000000000000000001',
    10000000000000000000n,
    34564726617685178n,
    [
      '0x4d224452801aced8b2f0aebe155379bb5d594381', <-- Path Address
      3000n,                                        <-- Pool Fee
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'  <-- Path Address
    ],
    false
  ],
  [ '0x0000000000000000000000000000000000000001', 0n ]
]
```

####  uniswapDeadline function
Obtain Uniswap Uiversal Router Deadline

- Call function
```javascript
console.log(uniswapDeadline(txnData));
```
- Expected Result Example
```javascript
1674344111n
```

####  uniswapFullDecodedInput function
Obtain Uniswap Uiversal Router Fullout with above functions as a Dictionary

- Call function
```javascript
console.log(
util.inspect(uniswapFullDecodedInput(txnData), false, null, true)
);
```
- Expected Result Example

Please see [the reference](https://docs.uniswap.org/contracts/universal-router/technical-reference#command-inputs) of each array meanings
  
```javascript
{
  contents: [
    {
      command: '0a',
      value: 'PERMIT2_PERMIT',
      inputType: [
        'tuple((address,uint160,uint48,uint48),address,uint256)',
        'bytes'
      ],
      decodedInput: [
        [
          [
            '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            1461501637330902918203684832716283019655932542975n,
            1703502841n,
            0n
          ],
          '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
          1700912641n
        ],
        '0x5f0511ba3fa712da37ec36ee9a253b62a633045c94307f1199fbbfbe5208e64e631a4964e505db3f74227bab7d03166084939b2e38ec7a312983cccee3a06fdf1c'
      ]
    },
    {
      command: '01',
      value: 'V3_SWAP_EXACT_OUT',
      inputType: [ 'address', 'uint256', 'uint256', 'bytes', 'bool' ],
      decodedInput: [
        '0x0000000000000000000000000000000000000002',
        2003000000000000000n,
        4185711450n,
        [
          '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          500n,
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
        ],
        true
      ]
    },
    {
      command: '05',
      value: 'TRANSFER',
      inputType: [ 'address', 'address', 'uint256' ],
      decodedInput: [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x37a8f295612602f2774d331e562be9e61b83a327',
        3000000000000000n
      ]
    },
    {
      command: '0c',
      value: 'UNWRAP_WETH',
      inputType: [ 'address', 'uint256' ],
      decodedInput: [
        '0x0000000000000000000000000000000000000001',
        2000000000000000000n
      ]
    }
  ],
  deadline: 1700911439n
}
```

####  Example program

1. Change `YOUR_NODE_RPC_WEBSOCKET_URL` in example.js to your WSS PRC endpoint
(Ex. `ws://localhost:8546` )

```Javascript
const ethers = require("ethers");
const util = require("util");
const {
  hasUniswapCommands,
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
} = require("./universalDecoder");

const wssUrl = "YOUR_RPC_WEBSOCKET_URL";
// const wssUrl = "ws://localhost:8546";

//Universal Router Contract Address
const router = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed),arg);

const main = async () => {
    const provider = new ethers.WebSocketProvider(wssUrl);
    provider.on('pending', async (tx) => {
        const txnData = await provider.getTransaction(tx);
        txnData 
          ? (txnData.to == router && hasUniswapCommands(txnData['data'])) 
                ? compose(
                     console.log("uniswapCommands: ", util.inspect(uniswapCommands(txnData['data']), false, null, true )),
                     console.log("uniswapCommandArray: ", util.inspect(uniswapCommandArray(txnData['data']), false, null, true )),
                     console.log("uniswapInputArray: ", util.inspect(uniswapInputArray(txnData['data']), false, null, true)),
                     console.log("uniswapDecodedInputArray: ", util.inspect(uniswapDecodedInputArray(txnData['data']), false, null, true )),
                     console.log("uniswapV3DecodedInputArray: ", util.inspect(uniswapV3DecodedInputArray(txnData['data']), false, null, true )),
                     console.log("uniswapDeadline: ", util.inspect(uniswapDeadline(txnData['data']), false, null, true )),
                     console.log("uniswapFullDecodedInput: ", util.inspect(uniswapFullDecodedInput(txnData['data']), false, null, true))
                   )
                : null 
          : null ;
        }
    )
}
main();
```

2. Run the program

```bash
$ node example.js
```



