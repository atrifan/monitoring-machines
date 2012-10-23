define(['ext/moduleControl/createWindow','ext/lib/promise'], function(windowCreator,promise){
    function handler(){};
    handler.prototype.IconClickState = function() {
        var elements = $('.icon-wraper');
        elements.push($('.icon-wraper-toolbar'));
        for (var i =0; i<elements.length; i++)
            $(elements[i]).removeClass('click');
        if ($(this).hasClass('click'))
            $(this).removeClass('click');
        else
            $(this).addClass('click');
    };
    handler.prototype.createWin = function(argument) {
        //console.log(argument.data.constructor);
        this.creator = promise.defer();
        var self = this;
        var nameOfWindow = $(this).attr('val');
        windowObj = {id: nameOfWindow, module: $(this).attr('module')};
        if($('#'+nameOfWindow).length === 0) {
            var creator = new windowCreator(windowObj, argument.data.constructor).then(
                    function(builder){
                       builder._render();
                    }        
            );
            console.log(creator);
           /* promise.when(this.creator, function(winCreator) {
                winCreator._render();
            })*/
        }
        else {
            if ($('#'+nameOfWindow).css('visibility') === 'visible') {
                $('#'+nameOfWindow).css('visibility','hidden');
            }
            else
                $('#'+nameOfWindow).css('visibility','visible');
        }
        
    };
    
    handler.prototype.minimizeWin = function() {
        if ($($(this).parent().parent().parent()).css('visibility') === 'visible') {
            $($(this).parent().parent().parent()).css('visibility','hidden');
        }
        else
            $($(this).parent().parent().parent()).css('visibility','visible');
    };
    
    return handler;
});