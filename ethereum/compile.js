const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
const CampaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(CampaignPath, "utf-8");
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Campaign.sol"
];
console.log(output);

fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
