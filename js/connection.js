

function GetCustomers() {
    var getCustomersUrl = SettingsService.PS_MOBILE_AUTHORIZATION.api.customers["xlink:href"] + "?display=full";
    var getCustomersArgs = {
        url: getCustomersUrl,
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
            var PS_MOBILE_CUSTOMER_LIST = $.xml2json(data);
            
            // Response data cachen
            savedCustomers = PS_MOBILE_CUSTOMER_LIST.customers.customer;
            
            // aantal aanpassen in tab header
            $("#customer_count").html("(" + savedCustomers.length + ")");
                        
            // View aanmaken of aanpassen
            if (customerListView == undefined) {
                customerListView = new CustomersList(PS_MOBILE_CUSTOMER_LIST, "customers_content")
            } else {
                customerListView.ListOfCustomers = savedCustomers;
            }
            
            // Tab renderen
            customerListView.RenderView();
        }
    }
    
    $.ajax(getCustomersArgs);
}


function GetCustomerByID(_customerID) {
    var foundCustomer = null;
    
    // Eerst proberen we de klant te zoeken in de cache
    if (savedCustomers != undefined) {
        $.each(savedCustomers, function(i,v) {
            if (v.id == _customerID) {
                foundCustomer = v;
            }
        });
    }
    
    // Als dat niet lukt, gaan we zoeken in de WS
    if (foundCustomer == undefined) {
        var getCustomerByIdUrl = SettingsService.PS_MOBILE_AUTHORIZATION.api.customers["xlink:href"] + "/" + _customerID;
        var getCustomerByIdArgs = {
            url: getCustomerByIdUrl,
            method: 'GET',
            dataType: 'xml',
            async: false,
            beforeSend: function(jqXHR, settings) {            
                // Authentication
                PrepareAjaxCredentials(jqXHR);
                
                // Status instellen
                SetStatus("loading");
            },
            success: function(data, textStatus, jqXHR) {
                foundCustomer = $.xml2json(data).customer;
            }
        }
    
        $.ajax(getCustomerByIdArgs);
    }
    
    return foundCustomer;
}
