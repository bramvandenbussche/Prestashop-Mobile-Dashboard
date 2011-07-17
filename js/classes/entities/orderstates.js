
/**
 * Namespace    Classes.Entities
 * Class        OrderStates
 * Author       Bram Vandenbussche
 * Description  List Object to hold all different order states
 * Version      1.0
**/

// List of Order States
OrderStates = function(_list) {
    this.List = [];
    
    if (_list != undefined) {
        this.AssembleFromJson(_list);
    }
}

OrderStates.prototype.GetByID = function(_stateID) {
    return this.List[_stateID];
}

OrderStates.prototype.AssembleFromJson = function(sourceList) {
    
    for (var i = 0; i < sourceList.length; i++) {
        var oc = new OrderState(sourceList[i].id);
        
        oc.AssembleFromJson(sourceList[i]);
        
        this.List[oc.ID] = oc;
    }
}

OrderStates.prototype.Serialize = function() {
    return SerializeList(this.List, 'orderstates');
}

OrderStates.prototype.Deserialize = function(str) {
    var ocs = [];
    
    
    
    return ocs;
}