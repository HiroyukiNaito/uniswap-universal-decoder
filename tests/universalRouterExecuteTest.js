const chai = require("chai");
const util = require("util");
const expect = chai.expect;
const fs = require("fs");
const {
  uniswapCommands,
  uniswapCommandArray,
  uniswapInputArray,
  uniswapDecodedInputArray,
  uniswapV3DecodedInputArray,
  uniswapDeadline,
  uniswapFullDecodedInput,
} = require("../universalDecoder");

// Uniswap Command Test
describe("Getting Commands", () => {
  const testFile = JSON.parse(
    fs.readFileSync("tests/V2_SWAP_EXACT_IN_EXECUTE.json", "utf-8")
  );
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
  const testFile = JSON.parse(
    fs.readFileSync("tests/V2_SWAP_EXACT_IN_EXECUTE.json", "utf-8")
  );
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
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0x02e7F808990638E9e67E1f00313037EDe2362361",
      ],
      false,
    ]);
  });
});

describe("Getting Deadline", () => {
  it("should have deadline ", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/V3_SWAP_EXACT_OUT_EXECUTE.json", "utf-8")
    );
    console.log("Actual V3 Array:", uniswapDeadline(testFile.input));
    expect(uniswapDeadline(testFile.input)).to.eql(1674344111n);
  });
});

describe("Getting V3 Transaction data", () => {
  it("should correctly translate V3 path bytes to address", () => {
    const testFile = JSON.parse(
      fs.readFileSync("tests/V3_SWAP_EXACT_OUT_EXECUTE.json", "utf-8")
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
          "0x4D224452801ACED8B2F0AEBE155379BB5D594381",
          3000n,
          "0xC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2",
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
    const testFile = JSON.parse(
      fs.readFileSync("tests/V2_SWAP_EXACT_IN_EXECUTE.json", "utf-8")
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
                "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                "0x02e7F808990638E9e67E1f00313037EDe2362361",
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
      fs.readFileSync("tests/V2_SWAP_EXACT_OUT_EXECUTE.json", "utf-8")
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
                "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                "0x1E8E29CA51363D923725aB9DaC73Bd7e9C440f71",
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
    const testFile = JSON.parse(
      fs.readFileSync("tests/V3_SWAP_EXACT_IN_EXECUTE.json", "utf-8")
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
                "0xC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2",
                10000n,
                "0x00C83AECC790E8A4453E5DD3B0B4B3680501A7A7",
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
      fs.readFileSync("tests/V3_SWAP_EXACT_OUT_EXECUTE.json", "utf-8")
    );

    let fullDecodedInput = uniswapFullDecodedInput(testFile.input);
    console.log(
      util.inspect(fullDecodedInput, false, null, true /* enable colors */)
    );
    expect(fullDecodedInput).to.eql({
        contents: [
          [
            {
              command: '0b',
              value: 'WRAP_ETH',
              inputType: [ 'address', 'uint256' ],
              decodedInput: [
                '0x0000000000000000000000000000000000000002',
                34564726617685178n
              ]
            }
          ],
          [
            {
              command: '01',
              value: 'V3_SWAP_EXACT_OUT',
              inputType: [ 'address', 'uint256', 'uint256', 'bytes', 'bool' ],
              decodedInput: [
                '0x0000000000000000000000000000000000000001',
                10000000000000000000n,
                34564726617685178n,
                [
                  '0x4D224452801ACED8B2F0AEBE155379BB5D594381',
                  3000n,
                  '0xC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2'
                ],
                false
              ]
            }
          ],
          [
            {
              command: '0c',
              value: 'UNWRAP_WETH',
              inputType: [ 'address', 'uint256' ],
              decodedInput:  [ '0x0000000000000000000000000000000000000001', 0n ]
            }
          ]
        ],
        deadline: 1674344111n
      });
  });
});
