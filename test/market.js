const library = artifacts.require("./MarketPlace.sol");  
const marketContract = artifacts.require("./DeployContract.sol");


contract('marketContract', (accounts) => {

  it("Should add a product", async () => {
    
    const contract = await marketContract.deployed();

    await contract.addProduct("produit 1", 5);

    const stock = await contract.getProductStock.call("produit 1");
    assert.equal(stock.valueOf(), 5, "Error when getted stock");

  });

});