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
| 0x(void)   | [Use hasUniswapCommands function for avoiding Exception](https://github.com/HiroyukiNaito/uniswap-universal-decoder/blob/main/example.js#L26) | ✅ |  ✅
| 0x00 | V3_SWAP_EXACT_IN | ✅ |  ✅
| 0x01 | V3_SWAP_EXACT_OUT | ✅ |  ✅
| 0x02 | PERMIT2_TRANSFER_FROM | ✅ | 
| 0x03 | PERMIT2_PERMIT_BATCH | ✅ | 
| 0x04 | SWEEP | ✅ |  ✅
| 0x05 | TRANSFER | ✅ | 
| 0x06 | PAY_PORTION | ✅ |  ✅
| 0x07 | N/A | N/A | N/A
| 0x08 | V2_SWAP_EXACT_IN | ✅ |  ✅
| 0x09 | V2_SWAP_EXACT_OUT | ✅ |  ✅
| 0x0a | PERMIT2_PERMIT | ✅ |  ✅
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
    [
      {
        command: '0b',
        value: 'WRAP_ETH',
        inputType: [ 'address', 'uint256' ],
        decodedInput: [
          '0x0000000000000000000000000000000000000002',
          5000000000000000n
        ]
      }
    ],
    [
      {
        command: '08',
        value: 'V2_SWAP_EXACT_IN',
        inputType: [ 'address', 'uint256', 'uint256', 'address[]', 'bool' ],
        decodedInput: [
          '0x0000000000000000000000000000000000000002',
          5000000000000000n,
          11281527462407831653458207n,
          [
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            '0x6982508145454ce325ddbe47a25d4ec3d2311933'
          ],
          false
        ]
      }
    ],
    [
      {
        command: '06',
        value: 'PAY_PORTION',
        inputType: [ 'address', 'address', 'uint256' ],
        decodedInput: [
          '0x6982508145454ce325ddbe47a25d4ec3d2311933',
          '0x17cc6042605381c158d2adab487434bde79aa61c',
          100n
        ]
      }
    ],
    [
      {
        command: '04',
        value: 'SWEEP',
        inputType: [ 'address', 'address', 'uint256' ],
        decodedInput: [
          '0x6982508145454ce325ddbe47a25d4ec3d2311933',
          '0x0000000000000000000000000000000000000001',
          11281527462407831653458207n
        ]
      }
    ]
  ],
  deadline: 1696581227n
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



