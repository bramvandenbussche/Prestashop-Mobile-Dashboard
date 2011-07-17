
/**
 * Namespace    Classes.Service
 * Class        Order
 * Author       Bram Vandenbussche
 * Description  Provides service level and access level logic for Order objects
 * Version      1.0
**/

function GetOrders() {
    // Check if file exists
    GetOrdersFromWS();
    
    // If no file exists, or file is out of date, get orders from WS
    
}


function GetOrdersFromFile() {

}


function GetOrdersFromWS() {
    var getOrdersUrl = SettingsService.PS_MOBILE_AUTHORIZATION.api.orders["xlink:href"] + "?display=full&sort=id_DESC&limit=" + PS_MOBILE_ORDER_LIMIT;
    var getOrdersArgs = {
        url: getOrdersUrl,
        method: 'GET',
        dataType: "xml",
        beforeSend: function(jqXHR, settings) {            
            // Authentication
            PrepareAjaxCredentials(jqXHR);
            
            // Status instellen
            SetStatus("loading");
        },
        success: function(data, textStatus, jqXHR) {
            // Return data omvormen naar JSON
            var PS_MOBILE_ORDER_LIST = $.xml2json(data);
            
            // Response data cachen
            for (var i = 0; i < PS_MOBILE_ORDER_LIST.orders.order.length; i++) {
                var o = new Order(PS_MOBILE_ORDER_LIST.orders.order[i].id);
                o.AssembleFromJson(PS_MOBILE_ORDER_LIST.orders.order[i]);
                
                savedOrders[i] = o;
            }
            //savedOrders = PS_MOBILE_ORDER_LIST.orders.order
            
            // Tab header aanpassen met aantal
            $("#order_count").html("(" + savedOrders.length + ")");
            
            // View aanmaken
            if (orderListView == undefined) {
                orderListView = new OrderList(savedOrders, "orders_content")
            } else {
                orderListView.ListOfOrders = savedOrders
            }
            
            // Tab renderen
            orderListView.RenderView();
        }
    }
    
    $.ajax(getOrdersArgs);
}