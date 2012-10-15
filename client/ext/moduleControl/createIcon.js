define(['ext/moduleControl/element'],function(el){
    function icon(obj){
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
        };
    }
    
    icon.prototype._render = function(){
        var _elementGenerator = new el(this.ic);
        var htmlElement = _elementGenerator._generate();
        _elementGenerator._appendToWorkspace(htmlElement);
    };
    
    return icon;
    
});