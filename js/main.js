
// variables to hold the different views
var customerListView = null;
var orderListView = null;

// Holds all the different order states for easy access
var availableOrderStates = [];

// List of Customer objects
var savedCustomers = [];

// List of Order objects
var savedOrders = [];

$(document).ready(function() {
    
    // Settinsg inladen
    SettingsService.LoadSettings();
    
    // Tabbladen aanmaken
    $("#tabs").tabs({
        select: function(event, ui) {
            switch($(ui.tab).attr("name")) {
                case "customers" : 
                    GetCustomers();
                    break;
            
                case "orders" : 
                    GetOrders();
                    break;
            }
        }
    });
    
    // Settingswijzigingen opvangen
    $("#api_key").blur(function() {
        SettingsService.ChangeSetting('PS_MOBILE_API_KEY', $(this).val());
        
        // Check credentials
        //CheckCredentials();
    });
    
    $(".ViewCustomer").live('click', function() {
        var customerID = $(this).attr("id");
        
        // De juist tab openen
        $("#tabs").tabs("select", "customers");
        
        // De juiste klant selecteren
        $("#accordion").accordion( "activate" , "#customer_" + customerID);
        
        air.trace($("#customer_" + customerID));
    });
    
});


function SetCredentials() {
    
    if (PS_MOBILE_AUTHORIZATION.api.order_details["get"])
        $("#tabs").tabs("enable", 1);
    else
        $("#tabs").tabs("disable", 1);
        
    if (PS_MOBILE_AUTHORIZATION.api.customers["get"])
        $("#tabs").tabs("enable", 2);
    else
        $("#tabs").tabs("disable", 2);
        
    // Beschikbare order staten ophalen
    GetOrderStates();
}