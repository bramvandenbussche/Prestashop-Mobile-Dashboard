
var PrestashopService = new function() {

    var root = this;
    var PS_MOBILE_PASSWORD = '';
    
    this.PS_MOBILE_AUTHORIZATION = '';
    
    this.CheckCredentials = function() {
        
        air.trace("Getting authorisation ticket..")

        var PS_MOBILE_API_URL = "http://" + SettingsService.Settings.PS_MOBILE_SHOP_URL.Value + "/api";
        
        var checkCredentialsArgs = {
            url: PS_MOBILE_API_URL,
            method: "GET",
            dataType: "xml",
            beforeSend: function(jqXHR, settings) {
                // Check button aanpassen
                $("#settings_status").html("checking");
                $("#settings_status").attr("status", "checking");
                
                // Authentication
                root.PrepareAjaxCredentials(jqXHR);
            },
            success: function(data, textStatus, jqXHR) {
                
                // Credentials die terugkomen omzetten naar json en beschikbaar maken in applicatie
                root.PS_MOBILE_AUTHORIZATION = $.xml2json(data);
                
                // Check button aanpassen
                $("#settings_status").html("checked");
                $("#settings_status").attr("status", "checked");
                
                // Check user credentials
                root.SetCredentials();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Check button aanpassen
                $("#settings_status").html("unchecked");
                $("#settings_status").attr("status", "unchecked");
                
                // Debug info
                $("#debug").html("Error " + textStatus + " occurred in ajax call:<br />" + errorThrown);
            }
        }
        
        $.ajax(checkCredentialsArgs);
    };


    this.PrepareAjaxCredentials = function(jqXHR) {
        var bytes = Crypto.charenc.Binary.stringToBytes(SettingsService.Settings['PS_MOBILE_API_KEY'].Value + ":" + PS_MOBILE_PASSWORD);
        var base64 = Crypto.util.bytesToBase64(bytes);
        jqXHR.setRequestHeader("Authorization", "Basic " + base64);
    }
    
    
    this.SetCredentials = function() {
    
        if (this.PS_MOBILE_AUTHORIZATION.api.order_details["get"])
            $("#tabs").tabs("enable", 1);
        else
            $("#tabs").tabs("disable", 1);
            
        if (this.PS_MOBILE_AUTHORIZATION.api.customers["get"])
            $("#tabs").tabs("enable", 2);
        else
            $("#tabs").tabs("disable", 2);
            
        // Beschikbare order staten ophalen
        OrderStatesService.LoadOrderStates();
    }
}