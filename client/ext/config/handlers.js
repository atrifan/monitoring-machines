define([], function(){
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
    return handler;
});