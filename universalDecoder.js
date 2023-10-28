"use strict";
const fs = require("fs");
const path = require("path");
const { Interface, AbiCoder } = require("ethers");

// Setting Universal Router ABI
const universalABI = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./UniversalRouterAbi.json"), "utf-8")
);
const universalInterface = new Interface(universalABI);
const abiCoder = new AbiCoder();


// Getting Uniswap commands
// 0x3593564c => execute method
const hasUniswapCommands = (txnData) => {
 try {
   return txnData.includes("0x3593564c")
            ? (universalInterface.parseTransaction({ data: txnData }).args.length >= 2 && universalInterface.parseTransaction({ data: txnData }).args.length <= 3) 
                   ? (universalInterface.parseTransaction({ data: txnData }).args[0].length > 2)
                          ? true 
                          : false
                   : false 
            : false
 } catch (error) {
   console.log("Illegal format transaction data =>", txnData);
   console.log("Error contents =>", error);
   return false
 }                               
}
// Getting Uniswap commands
const uniswapCommands = (txnData) =>
  universalInterface.parseTransaction({ data: txnData }).args[0].toLowerCase();

// Getting Uniswap command array
const uniswapCommandArray = (txnData) =>
  uniswapCommands(txnData)
    .replace("0x", "")
    .match(/.{1,2}/g);

// Getting Uniswap InputArray
const uniswapInputArray = (txnData) =>
  universalInterface.parseTransaction({ data: txnData }).args[1];

// Uniswap Router command dictionary
// https://docs.uniswap.org/contracts/universal-router/technical-reference
const commandDictionary = {
    "00": ["V3_SWAP_EXACT_IN",["address", "uint256", "uint256", "bytes", "bool"]],
    "01": ["V3_SWAP_EXACT_OUT",["address", "uint256", "uint256", "bytes", "bool"]],
    "02": ["PERMIT2_TRANSFER_FROM",["address", "address", "uint256"]],
    "03": ["PERMIT2_PERMIT_BATCH",["bytes", "bytes"]],
    "04": ["SWEEP",["address", "address", "uint256"]],
    "05": ["TRANSFER",["address", "address", "uint256"]],
    "06": ["PAY_PORTION",["address", "address", "uint256"]],
    "07": [],
    "08": ["V2_SWAP_EXACT_IN",["address", "uint256", "uint256", "address[]", "bool"]],
    "09": ["V2_SWAP_EXACT_OUT",["address", "uint256", "uint256", "address[]", "bool"]],
    "0a": ["PERMIT2_PERMIT",["tuple((address,uint160,uint48,uint48),address,uint256)","bytes"]],
    "0b": ["WRAP_ETH",["address", "uint256"]],
    "0c": ["UNWRAP_WETH",["address", "uint256"]],
    "0d": ["PERMIT2_TRANSFER_FROM_BATCH",["tuple(address, address, uint160, address)[]"]],
    "0e": [],
    "0f": [],
    "10": ["SEAPORT",["uint256", "bytes"]],
    "11": ["LOOKS_RARE_721",["uint256","bytes","address","address", "uint256"]],
    "12": ["NFTX",["uint256","bytes"]],
    "13": ["CRYPTOPUNKS",["uint256","address","uint256"]],
    "14": ["LOOKS_RARE_1155",["uint256","bytes","address","address", "uint256","uint256"]],
    "15": ["OWNER_CHECK_721",["address","address", "uint256","uint256"]],
    "16": ["OWNER_CHECK_1155",["address","address", "uint256","uint256"]],
    "17": ["SWEEP_ERC721",["address","address", "uint256"]],
    "18": ["X2Y2_721",["uint256","bytes","address","address","uint256"]],
    "19": ["SUDOSWAP",["uint256","bytes"]],
    "1a": ["NFT20",["uint256","bytes"]],
    "1b": ["X2Y2_1155",["uint256","bytes","address","address","uint256","uint256"]],
    "1c": ["FOUNDATION",["uint256","bytes","address","address","uint256"]],
    "1d": ["SWEEP_ERC1155",["address","address", "uint256","uint256"]],
    "1e": [],
    "1f": [],
};
// All elements to be lower case such as hex address expression
const deepLowercase = (arr) =>
  arr.map((item) =>
    Array.isArray(item) ? deepLowercase(item) :
    typeof item === 'string' ? item.toLowerCase() :
    item
  );

// Getting Uniswap Decoded Input
const uniswapDecodedInputArray = (txnData) =>
  uniswapCommandArray(txnData).map((curr, i) =>
    deepLowercase(abiCoder.decode(commandDictionary[curr][1], uniswapInputArray(txnData)[i]))
  );

// Getting Uniswap deadline
const uniswapDeadline = (txnData) =>
  universalInterface.parseTransaction({ data: txnData }).args.length === 3
    ? universalInterface.parseTransaction({ data: txnData }).args[2]
    : null;

// Getting Uniswap V3 Path Decoded Input
// Ex. ["address","poolFee","address"]
// https://docs.uniswap.org/contracts/v3/guides/swaps/multihop-swaps

const uniswapV3PathDecode = (hexPath) => hexPath
                                          .replace("0x", "").match(/.{1,46}/g)
                                          .map((i) => i.match(/.{1,40}/g))
                                          .flat(1)
                                          .map((curr) =>
                                                  curr.length === 40
                                                  ? "0x" + curr
                                                  : BigInt(parseInt("0x" + curr))
                                           )

const uniswapV3DecodedInputArray = (txnData) =>
  uniswapCommandArray(txnData).map((curr, i) =>
    curr === "01" || curr === "00" // pick V3 for path format
      ? uniswapDecodedInputArray(txnData)[i].map((curr2, n) =>
          n === 3
            ? uniswapV3PathDecode(curr2)
            : curr2
        )
      : uniswapDecodedInputArray(txnData)[i]
  );

// Getting Full Output of Translated Data
const uniswapFullDecodedInput = (txnData) => ({
  contents: uniswapCommandArray(txnData).map((curr, i) => [
    {
      command: curr,
      value: commandDictionary[curr][0],
      inputType: commandDictionary[curr][1],
      decodedInput: uniswapV3DecodedInputArray(txnData)[i],
    },
  ]),
  deadline: uniswapDeadline(txnData),
});

// Exporting functions
module.exports = {
  hasUniswapCommands,
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3PathDecode,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
};
