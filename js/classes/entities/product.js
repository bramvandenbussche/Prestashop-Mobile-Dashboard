
function Product(_id) {
    this.ID = _id;
    
    this.Quantity = 0;
    this.UnitPrice = 0;
    
    this.Name = '';
    
}

Product.prototype.Subtotal = function() {
    return this.Quantity * this.UnitPrice;
}

Product.prototype.AssembleFromJson = function(json) {
    this.Name = json.product_name;
    
    this.UnitPrice = parseFloat(json.product_price).toFixed(2)
    this.Quantity = json.product_quantity;
}

Product.prototype.Serialize = function() {
    var str = '';

    str += '<product>';
    
    str += '<id>' + this.ID + '</id>';
    str += '<name>' + this.Name + '</name>';
    str += '<unit_price>' + this.UnitPrice + '</unit_price>';
    str += '<quantity>' + this.Quantity + '</quantity>';
    
    str += '</product>';
    
    return str;
}


Product.prototype.Deserialize = function(xml) {
    var p = new Product();
    
    
    
    return p;
}