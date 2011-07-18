
// Single Order State
OrderState = function(_id) {

    this.ID = _id;
    this.Name = '';
    this.Color = '';
}

OrderState.prototype.AssembleFromJson = function(json) {
    this.Name = json.name.language.text;
}

OrderState.prototype.Serialize = function() {
    var xml = '';
    
    xml += '<state>';
        xml += '<id>' + this.ID + '</id>';
        xml += '<name>' + this.Name + '</name>';
        xml += '<color>' + this.Color + '</color>';
    xml += '</state>';
    
    return xml;
}

OrderState.prototype.Deserialize = function(xml) {
    this.ID = $("id", xml).html();
    this.Name = $("name", xml).html();
    this.Color = $("color", xml).html();
}