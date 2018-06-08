const library = artifacts.require("./MarketPlace.sol");  
const marketContract = artifacts.require("./DeployContract.sol");


contract('marketContract', (accounts) => {

	describe("Product default functions", () => {

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
	    //func on this product should fail
		try{
	    	const stock = await contract.getProductStock.call("produit 2");
	    	assert.fail();
	 	} catch(ex) {
	      	assert.include(ex.message, "revert", "Should throw a revert error");
	    }
	  });
	});


	describe("Check permissions", () => {
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

	describe("Advanced fonc", () => {

		it("Should buy a product", async () => {
			const contract = await marketContract.deployed();

			const resc = await contract.addProduct("produit to buy", 5, 10);
			//event
			assert.equal(resc.logs[0].event, "ProductCreated");
			
			const prevEtherAdmin = await web3.eth.getBalance(accounts[0]).toString();
			const prevEtherBuyer = await web3.eth.getBalance(accounts[1]).toString();

			const res = await contract.buyProduct("produit to buy", {from: accounts[1], value: 10});

			//event
			assert.equal(res.logs[0].event, "Purchase");

			const nextEtherAdmin = await web3.eth.getBalance(accounts[0]).toString();
			const nextEtherBuyer = await web3.eth.getBalance(accounts[1]).toString();

			//Compare 4 last to avoid bigInt comparaison
			assert.equal(nextEtherAdmin.substr(-4), parseInt(prevEtherAdmin.substr(-4)) + 10);
			assert.equal(nextEtherBuyer.substr(-4), parseInt(prevEtherBuyer.substr(-4)) - 10);
			//check stock
			const stock = await contract.getProductStock.call("produit to buy");
			assert.equal(stock.valueOf(), 4) 
		});
	});
});