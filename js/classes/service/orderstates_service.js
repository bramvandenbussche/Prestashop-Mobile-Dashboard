
/**
 * Namespace    Classes.Service
 * Class        OrderStates
 * Author       Bram Vandenbussche
 * Description  Provides service level and access level logic for OrderState objects
 * Version      1.0
**/

function GetOrderStates() {
    GetOrderStatesFromWS();
}


function GetOrderStatesFromFile() {

}


function GetOrderStatesFromWS() {
    var getOrderStatesUrl = SettingsService.PS_MOBILE_AUTHORIZATION.api.order_states["xlink:href"] + "?display=full";
    var getOrderStatesArgs = {
        url: getOrderStatesUrl,
        method: 'GET',
        dataType: "xml",
        beforeSend: function(jqXHR, settings) {            
            // Authentication
            PrepareAjaxCredentials(jqXHR);
        },
        success: function(data, textStatus, jqXHR) {
            // Return data omvormen naar JSON
            var PS_MOBILE_ORDER_STATES_LIST = $.xml2json(data);
            
            // Lijst met order staten opslaan
            availableOrderStates = new OrderStates(PS_MOBILE_ORDER_STATES_LIST.order_states.order_state);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#debug").html(textStatus);
        }
    }
    
    $.ajax(getOrderStatesArgs);
}