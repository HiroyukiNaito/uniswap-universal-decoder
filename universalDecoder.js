const fs = require("fs");
const path = require("path");
const {Interface, AbiCoder} = require("ethers");

// Setting Universal Router ABI
const universalABI = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./UniversalRouterAbi.json'), 'utf-8'));
const universalInteface = new Interface(universalABI);
const abiCoder = new AbiCoder();

// Getting Uniswap commands
const uniswapCommands = txdata => universalInteface.parseTransaction({data: txdata}).args[0];

// Getting Uniswap command array
const uniswapCommandArray = txdata => uniswapCommands(txdata).replace("0x","").match(/.{1,2}/g);

// Getting Uniswap InputArray
const uniswapInputArray = txdata => universalInteface.parseTransaction({data: txdata}).args[1];

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

// Getting Uniswap Decoded Input
const uniswapDecodedInputArray = txdata => 
      uniswapCommandArray(txdata).map((curr, i) => 
      (abiCoder.decode(commandDictionary[curr][1], uniswapInputArray(txdata)[i])));


// Getting Uniswap deadline
const uniswapDeadline = txdata => (universalInteface.parseTransaction({data: txdata}).args.length == 3) 
                                     ? universalInteface.parseTransaction({data: txdata}).args[2]
                                     : null;

// Getting Uniswap V3 Path Decoded Input
// Ex. ["address","poolFee","address"]
// https://docs.uniswap.org/contracts/v3/guides/swaps/multihop-swaps
const uniswapV3DecodedInputArray = txdata => 
      uniswapCommandArray(txdata)
       .map((curr, i) => 
         ((curr === "01" || curr === "00") // pick V3 for path format
         ?  uniswapDecodedInputArray(txdata)[i]
             .map((curr2, n) => ((n == 3)
                ?  curr2.replace("0x","")
                        .match(/.{1,46}/g)
                        .map(i=>i.match(/.{1,40}/g))
                        .flat(1)
                        .map((curr3) => 
                            ((curr3.length == 40)  
                            ? "0x" + curr3.toUpperCase() 
                            : BigInt(parseInt("0x" + curr3 ))
                         )) 
                : curr2
         )) 
         : uniswapDecodedInputArray(txdata)[i]
      ));

// Getting Full Output of Translated Data
const uniswapFullDecodedInput = (txdata) => (
{
    "contents" : uniswapCommandArray(txdata).map((curr, i) => 
                  [{ "command" : curr,
                     "value" : commandDictionary[curr][0] ,
                     "inputType" :  commandDictionary[curr][1],
                     "decodedInput" : uniswapV3DecodedInputArray(txdata)[i]
                 }]),
    "deadline": uniswapDeadline(txdata),
});


module.exports = {
    uniswapCommands: uniswapCommands,
    uniswapCommandArray: uniswapCommandArray,
    uniswapInputArray: uniswapInputArray,
    uniswapDecodedInputArray: uniswapDecodedInputArray,
    uniswapV3DecodedInputArray: uniswapV3DecodedInputArray,
    uniswapDeadline: uniswapDeadline,
    uniswapFullDecodedInput: uniswapFullDecodedInput
}








