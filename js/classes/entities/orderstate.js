
// Single Order State
OrderState = function(_id) {

    this.ID = _id;
    this.Name = '';
    this.Color = '';
}

OrderState.prototype.AssembleFromJson = function(json) {
    this.Name = json.name.language.text;
}