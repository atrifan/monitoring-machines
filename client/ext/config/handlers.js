define(['ext/moduleControl/createWindow'], function(windowCreator){
    console.log(windowCreator);
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
    handler.prototype.createWin = function() {
        nameOfWindow = $(this).attr('val');
        windowObj = {id: nameOfWindow};
        var creator = new windowCreator(windowObj);
        console.log(creator._render());
        creator._render();
    };
    return handler;
});