! function ($) {
    //页面移出1000px，显示box
    $(window).on('scroll', function () {
        let $top = $(window).scrollTop(); //获取top值
        if ($top >= 600) {
            $('#top-hover').stop(true).animate({
                top: 0
            });
        } else {
            $('#top-hover').stop(true).animate({
                top: -72
            });
        }
    });
}(jQuery);