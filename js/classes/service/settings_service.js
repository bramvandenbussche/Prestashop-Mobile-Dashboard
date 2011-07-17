
/**
 * Namespace    Classes.Service
 * Class        SettingsService
 * Author       Bram Vandenbussche
 * Description  Provides business logic and access logic for Settings
 * Version      1.0
**/

var SettingsService = function() {
    
    this.Settings = new Settings();
    
    this.PS_MOBILE_AUTHORIZATION = '';
    this.PS_MOBILE_PASSWORD = '';
}

SettingsService.prototype.CreateDefaultSettings = function() {
    this.Settings['PS_MOBILE_SHOP_URL'] = 'http://shop.knuffelmama.be';
    this.Settings['PS_MOBILE_API_KEY'] = '1F18WAAFSXY3OJ3T0R0ZYGMKCGESQI09';
    this.Settings['PS_MOBILE_ORDER_VIEW_LIMIT'] = 10;
}

SettingsService.prototype.LoadSettings = function() {
    // first check to see if there is a saved settings file
    var xml = LoadXmlFromFile('config.xml');
    
    if (xml != undefined) {
        // if there is, load the settings from it
    } else {
        // if there isn't, create the default settings
        this.CreateDefaultSettings();
    }
    
    // save them
    this.PersistSettings();
    
    // and display them
    this.RenderSettings();
}

SettingsService.prototype.RenderSettings = function() {
    // Shop url
    $("#shop_url").val(this.Settings['PS_MOBILE_SHOP_URL']);
    
    // Api Key instellen
    $("#api_key").val(this.Settings['PS_MOBILE_API_KEY']);
    
    // View settings
    $("#order_limit").val(this.Settings['PS_MOBILE_ORDER_VIEW_LIMIT']);
}

SettingsService.prototype.ChangeSetting = function(key, newvalue) {
    // Setting aanpassen
    this.Settings[key] = newvalue;
    
    // en opslaan naar file
    this.PersistSettings();
}

SettingsService.prototype.PersistSettings = function() {
    SaveXmlToFile(this.Settings.Serialize(), "config.xml");
}


function CheckCredentials() {

    var PS_MOBILE_API_URL = "http://" + PS_MOBILE_SHOP_URL + "/api";
    
    var checkCredentialsArgs = {
        url: PS_MOBILE_API_URL,
        method: "GET",
        dataType: "xml",
        beforeSend: function(jqXHR, settings) {
            // Check button aanpassen
            $("#settings_status").html("checking");
            $("#settings_status").attr("status", "checking");
            
            // Authentication
            PrepareAjaxCredentials(jqXHR);
        },
        success: function(data, textStatus, jqXHR) {
            
            // Credentials die terugkomen omzetten naar json en beschikbaar maken in applicatie
            PS_MOBILE_AUTHORIZATION = $.xml2json(data);
            
            // Check button aanpassen
            $("#settings_status").html("checked");
            $("#settings_status").attr("status", "checked");
            
            // Check user credentials
            SetCredentials();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Check button aanpassen
            $("#settings_status").html("unchecked");
            $("#settings_status").attr("status", "unchecked");
            
            // Debug info
            $("#debug").html("Error occurred in ajax call:<br />" + errorThrown);
        }
    }
    
    $.ajax(checkCredentialsArgs);
};


function PrepareAjaxCredentials(jqXHR) {
    var bytes = Crypto.charenc.Binary.stringToBytes(SettingsService.Settings['PS_MOBILE_API_KEY'] + ":" + PS_MOBILE_PASSWORD);
    var base64 = Crypto.util.bytesToBase64(bytes);
    jqXHR.setRequestHeader("Authorization", "Basic " + base64);
}


