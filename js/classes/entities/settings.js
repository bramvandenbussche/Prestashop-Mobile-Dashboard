
/**
 * Namespace    Classes.Entities
 * Class        Settings
 * Author       Bram Vandenbussche
 * Description  Describes a list of setting objects
 * Version      1.0
**/

Settings = function() {
    this.List = [];
}

Settings.prototype.GetByName = function(setting_name) {
    return this.List[setting_name];
}

Settings.prototype.Serialize = function() {
    return str = SerializeList(this.List, 'settings');
}

Settings.prototype.Deserialize = function(xml) {
    $.each("setting", xml) = function(o) {
        var s = new Setting();
        s.Deserialize(xml);
        this.List[s.Name] = s;
    }
}