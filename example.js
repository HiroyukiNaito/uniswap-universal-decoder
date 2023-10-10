const ethers = require("ethers");
const util = require("util");
const {
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
} = require("./universalDecoder");

const wssUrl = "YOUR_RPC_WEBSOCKET_URL";

//Universal Router Contract Address
const router = "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD";
const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed),arg);

async function main() {
    const provider = new ethers.WebSocketProvider(wssUrl);
    provider.on('pending', async (tx) => {
        const txnData = await provider.getTransaction(tx);
        txnData 
          ? (txnData.to == router && txnData['data'].includes("0x3593564c"))  // 0x3593564c => execute method
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