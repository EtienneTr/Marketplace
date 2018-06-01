const library = artifacts.require("./MarketPlace.sol");  
const marketContract = artifacts.require("./DeployContract.sol");


contract('marketContract', (accounts) => {

  it("Should add a product", async () => {
    
    const contract = await marketContract.deployed();

    await contract.addProduct("produit 1", 5, 10);

    const stock = await contract.getProductStock.call("produit 1");
    assert.equal(stock.valueOf(), 5, "Error when getted stock");

    const amount = await contract.getProductPrice.call("produit 1");
    assert.equal(amount.valueOf(), 10, "Error when get amount");

  });

  it("Should remove a product", async () => {
    
    const contract = await marketContract.deployed();

    await contract.addProduct("produit 2", 5, 10);
    await contract.removeProduct("produit 2");

    const stock = await contract.getProductStock.call("produit 2");
    assert.equal(stock.valueOf(), 0, "Error when getted stock");
  });

it("Should fail if account not admin for add product", async () => {
    
    const contract = await marketContract.deployed();

    try{
    	await contract.addProduct("produit 3", 5, 10, {from: accounts[1]});
    	assert.fail();
 	} catch(ex) {
      	assert.include(ex.message, "revert", "Should throw a revert error");
    }
  });  

it("Should fail if account not admin for remove product", async () => {
    
    const contract = await marketContract.deployed();

	await contract.addProduct("produit 3", 5, 10);

    try{
    	await contract.removeProduct("produit 3", {from: accounts[1]});
    	assert.fail();
 	} catch(ex) {
      	assert.include(ex.message, "revert", "Should throw a revert error");
    }
  });  

});