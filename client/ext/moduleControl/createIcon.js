define(['ext/moduleControl/element'],function(el){
    function icon(obj, where){
        this.where = where;
        if (where === "workspace")
            this.ic = {
                    tag : 'div',
                    cls : 'icon-wraper',
                    items : [{
                             tag: 'div',
                             cls: 'icon-big '+obj.cls,
                            },
                             {tag: 'div',
                                inner: obj.name}
                            ],
                    id : obj.name+'-big',
                    value : obj.name,
                    event : {
                            eventName : 'click',
                            eventHandler : 'IconClickState'
                    }
            };
        else if (where === "shortcut")
            this.ic = {
                tag : 'div',
                cls : 'icon-wraper-toolbar',
                items : [{
                         tag: 'div',
                         cls: 'icon-small '+obj.cls,
                        }],
                id : obj.name+'-small',
                value : obj.name,
                event : {
                        eventName : 'click',
                        eventHandler : 'IconClickState'
                }
        };
    }
    
    icon.prototype._render = function(where){
        var _elementGenerator = new el(this.ic);
        var htmlElement = _elementGenerator._generate();
        if (this.where === "workspace")
            _elementGenerator._appendToWorkspace(htmlElement);
        else if (this.where === "shortcut")
            _elementGenerator._appendToToolbar(htmlElement);
    };
    
    return icon;
    
});