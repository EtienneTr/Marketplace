pragma solidity ^0.4.21;

library MarketPlace {
    
    struct Product {
        string name;
        uint8 stock;
        uint256 amount;
        bool exist;
    }
    
    struct Data {
        mapping (string => Product) products;
    }

    event Purchase(address indexed _admin, address indexed _spender, uint256 _amount, string _product);
    event ProductCreated(string _name, uint8 _stock, uint256 _amount);
    
    function addProduct(
        Data storage _data,
        string _name,
        uint8 _stock,
        uint256 _amount
        ) public returns (bool) {
            require(_stock > 0 && _data.products[_name].exist != true);
            _data.products[_name] = Product(_name, _stock, _amount, true);
            emit ProductCreated(_name, _stock, _amount);
            return true;
        }
        
    function getProductStock(
        Data storage _data,
        string _name
        ) public returns (uint8){
            require(_data.products[_name].exist == true);
            return _data.products[_name].stock;
        }
        
    function getProductAmount(
        Data storage _data,
        string _name
        ) public returns (uint256){
            require(_data.products[_name].exist == true);
            return _data.products[_name].amount;
        }
        
    function removeProduct(
        Data storage _data,
        string _name
        ) public returns (bool) {
            require(_data.products[_name].exist == true);
            delete  _data.products[_name];
            return true;
        }


    function allowedForBuy(
        Data storage _data,
        string _name,
        uint256 _amountUser
        ) public returns (bool)
        {
            require(_data.products[_name].exist == true && _data.products[_name].stock > 0 && _data.products[_name].amount == _amountUser );
            return true;
        }
        
    function buyProductConfirm (
        Data storage _data,
        address _admin,
        string _name,
        address _sender,
        uint256 _amount
        ) public returns (bool) {
        _data.products[_name].stock -= 1;
        emit Purchase(_admin, _sender, _amount, _name);
    }
}