define(['ext/config/handlers'], function(handlers){
function Element(object) {
    this.cls = object.cls;
    this.id = object.id;
    this.value = object.value;
    this.style= object.style;
    this.elTag = object.tag;
    this.nodes = object.items;
    this.inner = object.inner;
    this.draggable = object.draggable;
    this.event = object.event;
    this.resizable = object.resizable;
    this.module = object.module;
    this.handler_lib = new handlers();
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
    $(element).attr('module', this.module);
    //console.log(element);
    $(element).css(this.style);
    //console.log(this.handler_lib[this.event.eventHandler]);
    if(this.event.length !== 0)
        for (var i in this.event) {
            
            if (this.event[i].eventHandler === 'createWin')
                $(element).on(this.event[i].eventName, { constructor: Element }, this.handler_lib[this.event[i].eventHandler]);
            else if(this.event[i].eventHandler === 'minimizeWin')
                $(element).on(this.event[i].eventName, this.handler_lib[this.event[i].eventHandler]);
            else 
                $(element).on(this.event[i].eventName, this.handler_lib[this.event[i].eventHandler]);
        }
    
    var children = [];
    if(this.nodes.length !== 0)
        for (var i in this.nodes){
            children.push(new Element(this.nodes[i]));
        }
    for (var i in children)
        $(element).append(children[i]._generate());
    
    if (this.resizable){
        $(element).resizable({containment: "parent",
            handles: 'all',
        });
        var eleHandleNE = $("<div class='ui-resizable-handle ui-resizable-ne' id='negrip'>");
        var eleHandleSE = $("<div class='ui-resizable-handle ui-resizable-se' id='segrip'>");
        var eleHandleSW = $("<div class='ui-resizable-handle ui-resizable-sw' id='swgrip'>");
        var eleHandleNW = $("<div class='ui-resizable-handle ui-resizable-nw' id='nwgrip'>");

            eleHandleNE.appendTo(element);
            eleHandleSE.appendTo(element);
            eleHandleSW.appendTo(element);
            eleHandleNW.appendTo(element);
        
     }
    if (this.draggable) {
        $(element).draggable({
            containment: "parent"
        });
    }
    return element;
};

Element.prototype._appendToWorkspace = function (el) {
        $('.workspace').append(el);
};
Element.prototype._appendToToolbar = function (el) {
    $('.short_workspace').append(el);
};

return Element;
});
