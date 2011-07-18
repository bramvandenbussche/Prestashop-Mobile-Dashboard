
/**
 * Namespace    Classes.Service
 * Class        SettingsService
 * Author       Bram Vandenbussche
 * Description  Provides business logic and access logic for Settings
 * Version      1.0
**/

var SettingsService = new function() {

    var root = this;
    
    this.Settings = [];
    
    this.PS_MOBILE_AUTHORIZATION = '';
    this.PS_MOBILE_PASSWORD = '';
    
    
    this.CreateDefaultSettings = function() {
        air.trace("creating default settings..");
        
        var PS_MOBILE_SHOP_URL = new Setting();
        PS_MOBILE_SHOP_URL.Name = 'PS_MOBILE_SHOP_URL';
        PS_MOBILE_SHOP_URL.Value = 'http://shop.knuffelmama.be';        
        this.Settings['PS_MOBILE_SHOP_URL'] = PS_MOBILE_SHOP_URL;
        
        var PS_MOBILE_API_KEY = new Setting();
        PS_MOBILE_API_KEY.Name = 'PS_MOBILE_API_KEY';
        PS_MOBILE_API_KEY.Value = '1F18WAAFSXY3OJ3T0R0ZYGMKCGESQI09';
        this.Settings['PS_MOBILE_API_KEY'] = PS_MOBILE_API_KEY;
        
        var PS_MOBILE_ORDER_VIEW_LIMIT = new Setting();
        PS_MOBILE_ORDER_VIEW_LIMIT.Name = 'PS_MOBILE_ORDER_VIEW_LIMIT';
        PS_MOBILE_ORDER_VIEW_LIMIT.Value = 10;
        this.Settings['PS_MOBILE_ORDER_VIEW_LIMIT'] = PS_MOBILE_ORDER_VIEW_LIMIT;
    }
    
    
    this.LoadSettings = function() {
        // first check to see if there is a saved settings file
        var xml = LoadXmlFromFile('config.xml');
        
        if (xml != undefined) {
            // if there is, load the settings from it
            $.each($("setting", xml), function() {
                var s = new Setting();
				
				// Setting aanmaken vanuit xml
                s.Deserialize($(this));
				
				// Setting opslaan
                root.AddSetting(s);
            });
            
        } else {
            // if there isn't, create the default settings
            this.CreateDefaultSettings();
            
            // save them
            this.PersistSettings();
        }
        
        // and display them
        this.RenderSettings();
    }
	
	
	this.AddSetting = function(setting) {
		this.Settings[setting.Name] = setting;
	}
    
    
    this.RenderSettings = function() {
        // Shop url
        $("#shop_url").val(this.Settings['PS_MOBILE_SHOP_URL'].Value);
        
        // Api Key instellen
        $("#api_key").val(this.Settings['PS_MOBILE_API_KEY'].Value);
        
        // View settings
        $("#order_limit").val(this.Settings['PS_MOBILE_ORDER_VIEW_LIMIT'].Value);
    }

    this.ChangeSetting = function(key, newvalue) {
        // Setting aanpassen
        this.Settings[key] = newvalue;
        
        // en opslaan naar file
        this.PersistSettings();
    }

    this.PersistSettings = function() {
        var xml = SerializeList(this.Settings, "settings");
        
        SaveXmlToFile(xml, "config.xml");
    }
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


