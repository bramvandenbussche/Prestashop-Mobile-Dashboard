
/**
 * Namespace    Classes.Entities
 * Class        Setting
 * Author       Bram Vandenbussche
 * Description  Describes a single setting object
 * Version      1.0
**/

Setting = function() {
    this.Name = '';
    this.Value = '';
    this.Description = '';
    this.Type = '';
}

Setting.prototype.Serialize = function() {
    var str = '<setting>';
    
		str += '<name>' + this.Name + '</name>';
		str += '<value>' + this.Value + '</value>';
		str += '<description>' + this.Description + '</description>';
		str += '<type>' + this.Type + '</type>';
    
    str += '</setting>';
    
    return str;
}

Setting.prototype.Deserialize = function(xml) {
    this.Name = $("name", xml).html();
    this.Value = $("value", xml).html();
    this.Description = $("description", xml).html();
    this.Type = $("type", xml).html();
}