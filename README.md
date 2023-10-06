## Uniswap universal execute decoder
 Decodes Uniswap Universal execute function to their legacy V2 and V3 counterparts.

### Used libraries

- chai
- ethers
- mocha
- fs
- path 

### Decoded functions

---

| command | value | Decode | Tested
| ---------- | ------------- |:------:|:------:
| 0x00 | V3_SWAP_EXACT_IN | ✅ | 
| 0x01 | V3_SWAP_EXACT_OUT | ✅ | 
| 0x02 | PERMIT2_TRANSFER_FROM | ✅ | 
| 0x03 | PERMIT2_PERMIT_BATCH | ✅ | 
| 0x04 | SWEEP | ✅ | 
| 0x05 | TRANSFER | ✅ | 
| 0x06 | PAY_PORTION | ✅ | 
| 0x07 | N/A | N/A | N/A
| 0x08 | V3_SWAP_EXACT_IN | ✅ | 
| 0x09 | V3_SWAP_EXACT_OUT | ✅ | 
| 0x0a | PERMIT2_PERMIT | ✅ | 
| 0x0b | WRAP_ETH | ✅ | 
| 0x0c | VUNWRAP_WETH | ✅ | 
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
| 0x17 | V2_SWAP_EXACT_OUT | ✅ | 
| 0x18 | X2Y2_721 | ✅ | 
| 0x19 | SUDOSWAP | ✅ | 
| 0x1a | NFT20 | ✅ | 
| 0x1b | X2Y2_1155 | ✅ | 
| 0x1c | FOUNDATION | ✅ | 
| 0x1d | N/A  | N/A | N/A
| 0x1e | N/A  | N/A | N/A
| 0x1f | N/A  | N/A | N/A

---
