export const getSolidityCodeExample = (customUrlId: string) =>
  `pragma solidity ^0.8.2;\n\nimport \"redstone-evm-connector/lib/contracts/message-based/PriceAware.sol\";\n\ncontract ExampleContractCustomUrls is PriceAware {\n\n  uint256 private lastValue = 0;\n\n  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {\n    // For redstone-custom-urls-demo price feed (it has 2 authorised signers)\n    return _receviedSigner == 0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF\n      || _receviedSigner == 0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6;\n  }\n\n  function getValue() public view returns(uint256) {\n    // Check more details at: https://custom-urls-manifest-updater.redstone.finance/${customUrlId}\n\n    uint256 valueFromUrl = getPriceFromMsg(bytes32(\"${customUrlId}\"));\n    return valueFromUrl;\n  }\n}\n`;

export const getJavascriptCodeExample = (customUrlId: string) =>
  `import { WrapperBuilder } from \"redstone-evm-connector\";\n\nconst ExampleContract = await ethers.getContractFactory(\"ExampleContractCustomUrls\");\nlet exampleContract = await ExampleContract.deploy();\n  \nexampleContract = WrapperBuilder\n  .wrapLite(exampleContract)\n  .usingPriceFeed(\"redstone-custom-urls-demo\", {\n    // Check more details at: https://custom-urls-manifest-updater.redstone.finance/${customUrlId}\n    asset: "${customUrlId}",\n  });\n\nconst valueFromOracle = await exampleContract.getValue();\nconsole.log({ valueFromOracle: valueFromOracle.toNumber() });\n`;

// JAVASCRIPT CODE EXAMPLE
// import { WrapperBuilder } from "redstone-evm-connector";

// const ExampleContract = await ethers.getContractFactory("ExampleContractCustomUrls");
// let exampleContract = await ExampleContract.deploy();

// exampleContract = WrapperBuilder
//   .wrapLite(exampleContract)
//   .usingPriceFeed("redstone-custom-urls-demo", {
//     // Check more details at: https://custom-urls-manifest-updater.redstone.finance/${customUrlId}
//     asset: ${customUrlId},
//   });

// const valueFromOracle = await exampleContract.getValue();
// console.log({ valueFromOracle: valueFromOracle.toNumber() });

// SOLIDITY CODE EXAMPLE
// pragma solidity ^0.8.2;

// import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

// contract ExampleContractCustomUrls is PriceAware {

//   uint256 private lastValue = 0;

//   function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
//     // For redstone-custom-urls-demo price feed (it has 2 authorised signers)
//     return _receviedSigner == 0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF
//       || _receviedSigner == 0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6;
//   }

//   function getValue() public view returns(uint256) {
//     // Check more details at: https://custom-urls-manifest-updater.redstone.finance/${customUrlId}

//     uint256 valueFromUrl = getPriceFromMsg(bytes32("${customUrlId}"));
//     return valueFromUrl;
//   }
// }
