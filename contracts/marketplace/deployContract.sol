pragma solidity ^0.4.21;

import './marketLib.sol';

contract DeployContract {
    
    address private administrator;    
    MarketPlace.Data private _marketPlaceData;
    
    constructor() public {
        administrator = msg.sender;
    }
    
    modifier adminOnly(){
        require(msg.sender == administrator);
        _;
    }
    
    function addProduct(string _name, uint8 _stock, uint256 _amount) public 
    adminOnly() {
        MarketPlace.addProduct(_marketPlaceData, _name, _stock, _amount);
    }
    
    function removeProduct(string _name) public
    adminOnly() returns (bool) {
        return MarketPlace.removeProduct(_marketPlaceData, _name);
    }
    
    function getProductStock(string _name) public returns (uint8){
        return MarketPlace.getProductStock(_marketPlaceData, _name);
    }

    function getProductPrice(string _name) public returns(uint256) {
        return MarketPlace.getProductAmount(_marketPlaceData, _name);
    }
    
    function buyProduct(string _name) payable public returns (bool) {
        if(MarketPlace.allowedForBuy(_marketPlaceData, _name, msg.value) == true){
            administrator.transfer(msg.value);
            MarketPlace.buyProductConfirm(_marketPlaceData, administrator, _name, msg.sender, msg.value);
        }
        return true;
    }
}