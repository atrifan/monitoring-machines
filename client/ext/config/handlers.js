define(['ext/moduleControl/createWindow'], function(windowCreator){
    function handler(){};
    handler.prototype.IconClickState = function() {
        var elements = $('.icon-wraper');
        for (var i =0; i<elements.length; i++)
            $(elements[i]).removeClass('click');
        if ($(this).hasClass('click'))
            $(this).removeClass('click');
        else
            $(this).addClass('click');
    };
    handler.prototype.createWin = function(argument) {
        console.log(argument.data.constructor);
        nameOfWindow = $(this).attr('val');
        windowObj = {id: nameOfWindow};
        object = {
                data : {app: "x",
                    app2: "y"}
        };
        for (i in object.data)
            console.log(i,object.data[i]);
        if($('#'+nameOfWindow).length === 0) {
            var creator = new windowCreator(windowObj, argument.data.constructor);
            console.log(creator);
            creator._render();
        }
        
    };
    return handler;
});