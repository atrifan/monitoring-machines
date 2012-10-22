define([], function() {
    function createWindow(obj, constructor){
        this.window = {
                   tag: 'div',
                   cls: 'window',
                   id: obj.id,
                   resizable: true,
                   draggable: true,
                   items: []
        };
        this.el = constructor;
    };
    createWindow.prototype._render = function() {
        console.log(this.el);
        var _elementGenerator = new this.el(this.window); //promises here
        var htmlElement = _elementGenerator._generate();
        _elementGenerator._appendToWorkspace(htmlElement);
    };
    
    return createWindow;
});