define([], function(){
function Element(object) {
    this.cls = object.cls;
    this.id = object.id;
    this.value = object.value;
    this.style= object.style;
    this.elTag = object.tag;
    this.nodes = object.items;
    this.inner = object.inner;
    this.event = object.event;
};

Element.prototype._generate = function () {
    var element = document.createElement(this.elTag);
    for(var i in this)
        if (typeof this[i] === 'undefined')
            this[i] = '';
    element.setAttribute('id', this.id);
    $(element).addClass(this.cls);
    $(element).html(this.inner);
    element.setAttribute('val', this.value);
    $(element).css(this.style);
    $(element).on(this.event.eventName,this.event.eventHandler);
    var children = [];
    if(this.nodes.length !== 0)
        for (var i in this.nodes){
            children.push(new Element(this.nodes[i]));
        }
    for (var i in children)
        $(element).append(children[i]._generate());
    return element;
};

Element.prototype._appendToWorkspace = function (el) {
        $('.workspace').append(el);
};

return Element;
});
