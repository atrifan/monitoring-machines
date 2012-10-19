define(['ext/moduleControl/element'], function(el) {
    function createWindow(obj){
        this.window = {
                   tag: 'div',
                   cls: 'window',
                   id: obj.id,
                   resizable: true,
                   draggable: true,
                   items: []
        };
    };
    createWindow.prototype._render = function() {
        var _elementGenerator = new el(this.window); //promises here
        var htmlElement = _elementGenerator._generate();
        _elementGenerator._appendToWorkspace(htmlElement);
    };
    
    return createWindow;
});