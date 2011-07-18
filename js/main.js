
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
                    CustomerService.GetCustomers();
                    break;
            
                case "orders" : 
                    OrderService.GetOrders();
                    break;
            }
        }
    });
    
    
    // View Customer handler
    $(".ViewCustomer").live('click', function() {
        var customerID = $(this).attr("id");
        
        // De juist tab openen
        $("#tabs").tabs("select", "customers");
        
        // De juiste klant selecteren
        $("#accordion").accordion( "activate" , "#customer_" + customerID);
    });
    
    
    // Save settings handler
    $("#btnSaveSettings").click(function() {
        // Settings opslaan
        SettingsService.SaveSettings();
        
        // Credentials checken
        PrestashopService.CheckCredentials();
    });
    
});


