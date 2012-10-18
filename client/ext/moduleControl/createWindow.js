define(['ext/moduleControl/element'], function(el) {
    function createWindow(obj){
        this.window = {
                   tag: 'div',
                   cls: 'window',
                   items: []
        };
    }
    createWindow.protype._render = function() {
        var _elementGenerator = new el(this.window);
        var htmlElement = _elementGenerator._generate();
        _elementGenerator._appendToWorkspace(htmlElement);
    };
});