
/**
 * Namespace    Classes.Service
 * Class        OrderStates
 * Author       Bram Vandenbussche
 * Description  Provides service level and access level logic for OrderState objects
 * Version      1.0
**/

var OrderStatesService = new function() {
    var root = this;
    
    this.States = [];
    this.SavedFileName = "orderstates.xml";
    
    this.LoadOrderStates = function() {
        var xml = LoadXmlFromFile(this.SavedFileName);
        
        if (xml != undefined) {
            // if there is, load the settings from it
            this.LoadOrderStatesFromFile(xml);            
        } else {
            // if there isn't, create the default settings
            this.LoadOrderStatesFromWS();
            
            // save them
            this.PersistOrderStates();
        }
        
        // and display them
        this.RenderOrderStates();
    }
    
    
    this.LoadOrderStatesFromFile = function(xml) {
        $.each($("state", xml), function() {
            var o = new OrderState();
            
            // Setting aanmaken vanuit xml
            o.Deserialize($(this));
            
            // Setting opslaan
            root.AddState(o);
        });
    }
    
    
    this.PersistOrderStates = function() {
        var xml = SerializeList(this.States, "states");
        
        SaveXmlToFile(xml, this.SavedFileName);
    }
    
    
    this.AssembleFromJson = function(sourceList) {
        for (var i = 0; i < sourceList.length; i++) {
            var oc = new OrderState(sourceList[i].id);
            
            oc.AssembleFromJson(sourceList[i]);
            
            this.States[oc.ID] = oc;
        }
    }
    
    
    this.LoadOrderStatesFromWS = function() {
        var getOrderStatesUrl = PrestashopService.PS_MOBILE_AUTHORIZATION.api.order_states["xlink:href"] + "?display=full";
        
        var getOrderStatesArgs = {
            url: getOrderStatesUrl,
            method: 'GET',
            dataType: "xml",
            beforeSend: function(jqXHR, settings) {            
                // Authentication
                PrestashopService.PrepareAjaxCredentials(jqXHR);
            },
            success: function(data, textStatus, jqXHR) {
                // Lijst met order staten verwerken
                root.AssembleFromJson($.xml2json(data).order_states.order_state);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#debug").html(textStatus);
            }
        }
        
        $.ajax(getOrderStatesArgs);
    }
    
    
    this.RenderOrderStates = function() {
    
    }
}