pragma solidity ^0.4.21;

library MarketPlace {
    
    struct Product {
        string name;
        uint8 stock;
        uint256 amount;
    }
    
    struct Data {
        mapping (string => Product) products;
    }
    
    function addProduct(
        Data storage _data,
        string _name,
        uint8 _stock,
        uint256 _amount
        ) public returns (bool) {
            _data.products[_name] = Product(_name, _stock, _amount);
            return true;
        }
        
    function getProductStock(
        Data storage _data,
        string _name
        ) public returns (uint8){
            return _data.products[_name].stock;
        }
        
    function getProductAmount(
        Data storage _data,
        string _name
        ) public returns (uint256){
            return _data.products[_name].amount;
        }
        
    function removeProduct(
        Data storage _data,
        string _name
        ) public returns (bool) {
            delete  _data.products[_name];
            return true;
        }
    
}