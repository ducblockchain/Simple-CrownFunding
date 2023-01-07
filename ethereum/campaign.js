import web3 from "./web3";
import Campaign from "./build/Campaign.json";
const abi = JSON.stringify(Campaign.abi);
function instance(address) {
  return new web3.eth.Contract(JSON.parse(abi), address);
}
export default instance;
