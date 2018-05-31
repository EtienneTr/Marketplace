pragma solidity ^0.4.21;

library MarketPlace {
    
    struct Product {
        string name;
        uint8 stock;
    }
    
    struct Data {
        mapping (string => uint8) products;
    }
    
    function addProduct(
        Data storage _data,
        string _name,
        uint8 _stock
        ) returns (bool) {
            _data.products[_name] = _stock;
            return true;
        }
        
    function getProductStock(
        Data storage _data,
        string _name
        ) returns (uint8){
            return _data.products[_name];
        }
        
    function removeProducy(
        Data storage _data,
        string _name
        ) returns (bool) {
            delete  _data.products[_name];
            return true;
        }
    
}