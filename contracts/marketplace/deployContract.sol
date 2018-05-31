pragma solidity ^0.4.21;

import './marketLib.sol';

contract DeployContract {
    
    MarketPlace.Data private _marketPlaceData;
    
    function addProduct(string _name, uint8 _stock){
        MarketPlace.addProduct(_marketPlaceData, _name, _stock);
    }
    
    function getProductStock(string _name) returns (uint8){
        return MarketPlace.getProductStock(_marketPlaceData, _name);
    }
}