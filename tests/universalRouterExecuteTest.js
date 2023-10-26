const chai = require("chai");
const util = require("util");
const expect = chai.expect;
const fs = require("fs");
const {
  hasUniswapCommands,
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3PathDecode,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
} = require("../universalDecoder");

// Check whether it has uniswap commands
describe("Checking Commands", () => {
  const testFile = JSON.parse(fs.readFileSync("tests/noCommand.json", "utf-8"));

  it("should not have uniswap commands", () => {
    expect(hasUniswapCommands(testFile.input)).to.false;
  });
  const testFile2 = JSON.parse(fs.readFileSync("tests/noCommand2.json", "utf-8"));

  it("should not have uniswap commands", () => {
    expect(hasUniswapCommands(testFile2.input)).to.false;
  });
  const testFile3 = JSON.parse(fs.readFileSync("tests/noCommand3.json", "utf-8"));
  
  it("should not have uniswap commands", () => {
    expect(hasUniswapCommands(testFile3.input)).to.false;
  });
  const testFile4 = JSON.parse(fs.readFileSync("tests/0x0b08.json", "utf-8"));
  it("should have uniswap commands", () => {
    expect(hasUniswapCommands(testFile4.input)).to.true;
  });
});

// Uniswap Command Test
describe("Getting Commands", () => {
  const testFile = JSON.parse(fs.readFileSync("tests/0x0b08.json", "utf-8"));

  it("should have a hex string sequence", () => {
    let commandString = uniswapCommands(testFile.input);
    console.log(`Uniswap Command String: ${commandString}`);
    expect(commandString).to.includes("0x");
  });

  it("should have hex commands array", () => {
    let commandArray = uniswapCommandArray(testFile.input);
    console.log(`Uniswap Command Array: ${commandArray}`);
    expect(commandArray).to.eql(["0b", "08"]);
  });
});

describe("Getting Inputs Data", () => {
  const testFile = JSON.parse(fs.readFileSync("tests/0x0b08.json", "utf-8"));
  it("should have input array", () => {
    let inputArray = uniswapInputArray(testFile.input);
    console.log(`Uniswap Input Array: ${inputArray}`);
    expect(inputArray).to.eql([
      "0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000001aa535d3d0c000",
      "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001aa535d3d0c00000000000000000000000000000000000000000000030b3ead9ce807fab959dd700000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000002e7f808990638e9e67e1f00313037ede2362361",
    ]);
  });
  it("shoud have decoded array[0]", () => {
    let decodedInputArray = uniswapDecodedInputArray(testFile.input);
    console.log("Index1 Actual Value:", decodedInputArray[0]);
    expect(decodedInputArray[0]).to.eql([
      "0x0000000000000000000000000000000000000002",
      7500000000000000n,
    ]);
  });
  it("shoud have decoded array[1]", () => {
    let decodedInputArray = uniswapDecodedInputArray(testFile.input);
    console.log("Index2 Actual Value:", decodedInputArray[1]);
    expect(decodedInputArray[1]).to.eql([
      "0x0000000000000000000000000000000000000001",
      7500000000000000n,
      58878075174672152174894551n,
      [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0x02e7f808990638e9e67e1f00313037ede2362361",
      ],
      false,
    ]);
  });
});

describe("Getting Deadline", () => {
  it("should have deadline ", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b010c.json", "utf-8")
    );
    console.log("Actual V3 Array:", uniswapDeadline(testFile.input));
    expect(uniswapDeadline(testFile.input)).to.eql(1674344111n);
  });
});

describe("Getting V3 Transaction data", () => {
  it("should correctly translate hex bytes to V3 path", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b010c.json", "utf-8")
    );
    let decodedV3InputArray = uniswapV3PathDecode(
      "0x4d224452801aced8b2f0aebe155379bb5d594381000bb8c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    );
    console.log(uniswapDecodedInputArray(testFile.input));
    console.log("Actual V3 Array:", decodedV3InputArray);
    expect(decodedV3InputArray).to.eql([
      "0x4d224452801aced8b2f0aebe155379bb5d594381",
      3000n,
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    ]);
  });
  it("should correctly translate uniswap V3 path bytes to address in array", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b010c.json", "utf-8")
    );
    let decodedV3InputArray = uniswapV3DecodedInputArray(testFile.input);
    console.log("Actual V3 Array:", decodedV3InputArray);
    expect(decodedV3InputArray).to.eql([
      ["0x0000000000000000000000000000000000000002", 34564726617685178n],
      [
        "0x0000000000000000000000000000000000000001",
        10000000000000000000n,
        34564726617685178n,
        [
          "0x4d224452801aced8b2f0aebe155379bb5d594381",
          3000n,
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        ],
        false,
      ],
      ["0x0000000000000000000000000000000000000001", 0n],
    ]);
  });
});

// Full Transaction Data Test
describe("Transaction processing", () => {
  it("should correctly identify and decode a V2 swap exact in transaction from execute", () => {
    const testFile = JSON.parse(fs.readFileSync("tests/0x0b08.json", "utf-8"));
    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0b",
            value: "WRAP_ETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              7500000000000000n,
            ],
          },
        ],
        [
          {
            command: "08",
            value: "V2_SWAP_EXACT_IN",
            inputType: ["address", "uint256", "uint256", "address[]", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000001",
              7500000000000000n,
              58878075174672152174894551n,
              [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "0x02e7f808990638e9e67e1f00313037ede2362361",
              ],
              false,
            ],
          },
        ],
      ],
      deadline: 1674344111n,
    });
  });

  it("should correctly identify and decode a V2 swap exact out transaction from execute", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b090c.json", "utf-8")
    );
    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0b",
            value: "WRAP_ETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              29316395387909477n,
            ],
          },
        ],
        [
          {
            command: "09",
            value: "V2_SWAP_EXACT_OUT",
            inputType: ["address", "uint256", "uint256", "address[]", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000001",
              209511000000000n,
              29316395387909477n,
              [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "0x1e8e29ca51363d923725ab9dac73bd7e9c440f71",
              ],
              false,
            ],
          },
        ],
        [
          {
            command: "0c",
            value: "UNWRAP_WETH",
            inputType: ["address", "uint256"],
            decodedInput: ["0x0000000000000000000000000000000000000001", 0n],
          },
        ],
      ],
      deadline: 1674170879n,
    });
  });

  it("should correctly identify and decode a V3 swap exact in transaction from execute", () => {
    const testFile = JSON.parse(fs.readFileSync("tests/0x0b00.json", "utf-8"));

    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0b",
            value: "WRAP_ETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              490040542184142600n,
            ],
          },
        ],
        [
          {
            command: "00",
            value: "V3_SWAP_EXACT_IN",
            inputType: ["address", "uint256", "uint256", "bytes", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000001",
              490040542184142600n,
              22563458791223110851455n,
              [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                10000n,
                "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7",
              ],
              false,
            ],
          },
        ],
      ],
      deadline: 1674377291n,
    });
  });

  it("should correctly identify and decode a V3 swap exact in transaction from execute", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b010c.json", "utf-8")
    );

    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0b",
            value: "WRAP_ETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              34564726617685178n,
            ],
          },
        ],
        [
          {
            command: "01",
            value: "V3_SWAP_EXACT_OUT",
            inputType: ["address", "uint256", "uint256", "bytes", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000001",
              10000000000000000000n,
              34564726617685178n,
              [
                "0x4d224452801aced8b2f0aebe155379bb5d594381",
                3000n,
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              ],
              false,
            ],
          },
        ],
        [
          {
            command: "0c",
            value: "UNWRAP_WETH",
            inputType: ["address", "uint256"],
            decodedInput: ["0x0000000000000000000000000000000000000001", 0n],
          },
        ],
      ],
      deadline: 1674344111n,
    });
  });
  it("should correctly identify and decode a permit2 permit transaction from execute", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0a000c.json", "utf-8")
    );

    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0a",
            value: "PERMIT2_PERMIT",
            inputType: [
              "tuple((address,uint160,uint48,uint48),address,uint256)",
              "bytes",
            ],
            decodedInput: [
              [
                [
                  "0x3b960e47784150f5a63777201ee2b15253d713e8",
                  1461501637330902918203684832716283019655932542975n,
                  1699172129n,
                  0n,
                ],
                "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad",
                1696581929n,
              ],
              "0x2a3fe6b6af8c46505658c48be8bebb4b22588d0d605cdf8ed22461bcc03adc1b480ee0b6deb7354889e702506dbf703c83b1aab3a8a9d774283727b6455721b51c",
            ],
          },
        ],
        [
          {
            command: "00",
            value: "V3_SWAP_EXACT_IN",
            inputType: ["address", "uint256", "uint256", "bytes", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              14018556769268767n,
              11001239826448700n,
              [
                "0x3b960e47784150f5a63777201ee2b15253d713e8",
                500n,
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                500n,
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              ],
              true,
            ],
          },
        ],
        [
          {
            command: "0c",
            value: "UNWRAP_WETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000001",
              11001239826448700n,
            ],
          },
        ],
      ],
      deadline: 1696581923n,
    });
  });

  it("should correctly identify and decode a payportion and a sweep transaction from execute", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/0x0b080604.json", "utf-8")
    );

    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
      contents: [
        [
          {
            command: "0b",
            value: "WRAP_ETH",
            inputType: ["address", "uint256"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              5000000000000000n,
            ],
          },
        ],
        [
          {
            command: "08",
            value: "V2_SWAP_EXACT_IN",
            inputType: ["address", "uint256", "uint256", "address[]", "bool"],
            decodedInput: [
              "0x0000000000000000000000000000000000000002",
              5000000000000000n,
              11281527462407831653458207n,
              [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "0x6982508145454ce325ddbe47a25d4ec3d2311933",
              ],
              false,
            ],
          },
        ],
        [
          {
            command: "06",
            value: "PAY_PORTION",
            inputType: ["address", "address", "uint256"],
            decodedInput: [
              "0x6982508145454ce325ddbe47a25d4ec3d2311933",
              "0x17cc6042605381c158d2adab487434bde79aa61c",
              100n,
            ],
          },
        ],
        [
          {
            command: "04",
            value: "SWEEP",
            inputType: ["address", "address", "uint256"],
            decodedInput: [
              "0x6982508145454ce325ddbe47a25d4ec3d2311933",
              "0x0000000000000000000000000000000000000001",
              11281527462407831653458207n,
            ],
          },
        ],
      ],
      deadline: 1696581227n,
    });
  });
});
