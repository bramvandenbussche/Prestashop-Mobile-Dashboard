

function Order(_id) {
    this.ID = _id;
    
    this.CustomerID = 0;
    this.Customer = null;
    
    this.DeliveryAddressID = 0;
    this.DeliveryAddress = null;
    
    this.InvoiceAddressID = 0;
    this.InvoiceAddress = null;
    
    this.InvoiceNumber = 0;
    
    this.OrderDate = null;
    this.InvoiceDate = null;
    this.DeliveryDate = null;
    
    this.StateID = 0;
    this.State = null;
    
    this.Payment = null;
    
    this.TotalAmount = 0;
    this.TotalProducts = 0;
    this.TotalShipping = 0;
    this.TotalDiscount = 0;
    
    this.Products = [];
    
}

Order.prototype.AssembleFromJson = function(json) {
    
    this.CustomerID = json.id_customer;
    
    this.DeliveryAddressID = json.id_address_delivery;
    this.InvoiceAddressID = json.id_address_invoice;
    
    this.InvoiceNumber = json.invoice_number;
    
    this.OrderDate = json.date_add;
    this.InvoiceDate = json.invoice_date;
    this.DeliveryDate = json.delivery_date;
    
    this.StateID = json.current_state.text;
    
    this.Payment = json.payment;
    
    this.TotalAmount = json.total_paid;
    this.TotalProducts = json.total_products;
    this.TotalShipping = json.total_shipping;
    this.TotalDiscount = json.total_discounts;
    
    if (json.associations.order_rows.order_row.length == undefined) {
        var c = new Product(json.associations.order_rows.order_row.id);
            
        c.AssembleFromJson(json.associations.order_rows.order_row);
        
        this.Products[0] = c;
    } else {    
        for (var i = 0; i < json.associations.order_rows.order_row.length; i++) {
            var c = new Product(json.associations.order_rows.order_row[i].id);
            
            c.AssembleFromJson(json.associations.order_rows.order_row[i]);
            
            this.Products[i] = c;
        }
    }
}

Order.prototype.Serialize = function() {
    var str = '';

    str += '<order>';
    
    str += '<id>' + this.ID + '</id>';
    
    str += '<customer_id>' + this.CustomerID + '</customer_id>';    
    str += '<delivery_address_id>' + this.DeliveryAddressID + '</delivery_address_id>';
    str += '<invoice_address_id>' + this.InvoiceAddressID + '</invoice_address_id>';
    str += '<state_id>' + this.StateID + '</state_id>';
    
    str += '<invoice_number>' + this.InvoiceNumber + '</invoice_number>';
    
    str += '<order_date>' + this.OrderDate + '</order_date>';
    str += '<invoice_date>' + this.InvoiceDate + '</invoice_date>';
    str += '<delivery_date>' + this.DeliveryDate + '</delivery_date>';
    
    str += '<payment>' + this.Payment + '</payment>';
    
    str += '<total_amount>' + this.TotalAmount + '</total_amount>';
    str += '<total_shipping>' + this.TotalShipping + '</total_shipping>';
    str += '<total_discount>' + this.TotalDiscount + '</total_discount>';
    
    str += '<products>';
    for (var i = 0; i < this.Products.length; i++) {
        str += this.Products[i].Serialize();
    }
    str += '</products>';
    
    str += '</order>';
    
    return str;
}

Order.prototype.Deserialize = function(xml) {
    var o = new Order();
    
    
    
    return o;
}