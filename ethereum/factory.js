import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const abi = JSON.stringify(CampaignFactory.abi);
const instance = new web3.eth.Contract(
  JSON.parse(abi),
  "0x98afdcd7538273084C25d37339D6f62c9f5517d7"
);
export default instance;
