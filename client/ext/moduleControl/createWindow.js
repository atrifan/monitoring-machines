define(['ext/lib/promise'], function(promise) {
    function createWindow(obj, constructor){
        var self = this;
        this.deferred = promise.defer();
        this.window = {
                   tag: 'div',
                   cls: 'window',
                   id: obj.id,
                   resizable: true,
                   draggable: true,
                   items: [{
                       tag: 'div',
                       cls: 'window-top',
                           items: [
                               {
                                   tag: 'div',
                                   cls: 'window-name',
                                   inner: obj.id+'-window'
                               },
                               {
                                   tag: 'div',
                                   cls: 'window-controller',
                                   items: [
                                       {
                                           tag: 'div',
                                           cls: 'button minimize',
                                           inner: '_',
                                           event: [{eventName: 'click',
                                               eventHandler: 'minimizeWin'
                                           }]
                                       },
                                       { 
                                           tag: 'div',
                                           cls: 'button maximize',
                                           inner: '&#9633'
                                       },
                                       {
                                           tag: 'div',
                                           cls: 'button close',
                                           inner: '&#215'
                                       }
                                   ]
                               }
                           ]
                       }
                   ]
        };
        require(['ext/moduleControl/definedModules/'+obj.module], function(module){
            self.window.items.push(module);
            console.log(module);
            //var modul = module;
            self.deferred.resolve(self);
            //console.log(self.window.items);
        });
        this.el = constructor;
        return this.deferred.promise;
    };
    createWindow.prototype._render = function() {
        console.log(this.el);
        var _elementGenerator = new this.el(this.window); //promises here
        var htmlElement = _elementGenerator._generate();
        _elementGenerator._appendToWorkspace(htmlElement);
    };
    return createWindow;
});