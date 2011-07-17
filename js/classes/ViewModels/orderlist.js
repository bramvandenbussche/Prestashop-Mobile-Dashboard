
OrderList = function(_list, _divId) {
    this.ListOfOrders = _list;
    this.View = $("#" + _divId);
    root = this;
    
    var htmlOrderListTemplate = GetTemplateByName('OrderList');
    var htmlOrderTemplate = GetTemplateByName('Order');
    var htmlOrderDetailsTemplate = GetTemplateByName('OrderDetails');
    var htmlOrderProductDetailsTemplate = GetTemplateByName('OrderProductDetails');

    this.Constructor = function () {
        $(document).ready(function () {
            root.RenderView();
        });
    }
    
    this.RenderView = function() {
        
        // Status tonen
        SetStatus("loading");
        
        // Alle orders overlopen in de lijst
        // en dat allemaal renderen naar html
        orders_html = '';
        for (var i = 0; i < this.ListOfOrders.length; i++) {
            orders_html += this.RenderOrderDetailsView(this.ListOfOrders[i]);
        }
        
        orders_html = htmlOrderListTemplate.replace(/{ORDERS_HOOK}/g, orders_html);
        
        // HTML instellen
        $(this.View).html(orders_html);
        
        // Accordion activeren
        $("#order_list").accordion({
            autoHeight: false,
            collapsible: true
        });
        
        // Status resetten
        SetStatus("none");
    }
    
    
    // Renders the details view for a given order
    this.RenderOrderDetailsView = function (o) {
        var order_html = htmlOrderTemplate;
        
        order_html = order_html.replace(/{ID_HOOK}/g, AddPrePendingZeros(o.ID, 6));
        order_html = order_html.replace(/{STATUS_HOOK}/g, availableOrderStates.GetByID(o.StateID).name);
        order_html = order_html.replace(/{ORDER_DATE_HOOK}/g, o.OrderDate);
        order_html = order_html.replace(/{PAYMENT_GATEWAY_HOOK}/g, o.Payment);
        order_html = order_html.replace(/{PRODUCTS_AMOUNT_HOOK}/g, o.TotalProducts);
        order_html = order_html.replace(/{SHIPPING_AMOUNT_HOOK}/g, o.TotalShipping);
        order_html = order_html.replace(/{ORDER_AMOUNT_HOOK}/g, o.TotalPaid);
        
        
        // Customer velden
        var customer = GetCustomerByID(o.CustomerID);
        //order_html = order_html.replace(/{CUSTOMER_NAME_HOOK}/g, customer.firstname + ' ' + customer.lastname);
        order_html = order_html.replace(/{CUSTOMER_ID_HOOK}/g, o.CustomerID);
        
        
        // Shopping Cart
        var order_products_html = '';
        // Then there where multiple products in cart
        for (var e = 0; e < o.Products.length; e++) {
            order_products_html += this.RenderOrderProductDetailsView(o.Products[e]);
        }
        order_html = order_html.replace(/{ORDER_DETAILS_HOOK}/g, order_products_html);
        
        return order_html;
    }
    
    // Renders the product details view for a given order
    this.RenderOrderProductDetailsView = function(cart) {
        var cart_html = htmlOrderProductDetailsTemplate;
        
        cart_html = cart_html.replace(/{PRODUCT_ID_HOOK}/g, cart.id);
        cart_html = cart_html.replace(/{PRODUCT_NAME_HOOK}/g, cart.Name);
        cart_html = cart_html.replace(/{PRODUCT_QUANTITY_HOOK}/g, cart.Quantity);
        cart_html = cart_html.replace(/{PRODUCT_UNIT_PRICE_HOOK}/g, cart.UnitPrice);
        
        return cart_html
    }
}