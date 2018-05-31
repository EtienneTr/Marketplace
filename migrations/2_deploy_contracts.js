const library = artifacts.require("./MarketPlace.sol");  
const marketContract = artifacts.require("./DeployContract.sol");

module.exports = function(deployer) {  
  deployer.deploy(library);
  deployer.link(library, marketContract);
  deployer.deploy(marketContract);
};