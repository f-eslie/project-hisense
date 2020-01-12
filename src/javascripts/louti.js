;
! function ($) {
    const $items = $('.item');
    const $louti = $('#louti');
    let clientHeight = $(window).height();
    $louti.css('top', (clientHeight - $louti.height()) / 2);


    $(window).on('resize', () => {
        let clientHeight = $(window).height();
        $louti.css('top', (clientHeight - $louti.height()) / 2);
    })

    $('#louti li').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var $index=$(this).index();
        let $top = $items.eq($index).offset().top;
        $('html').animate({
            scrollTop: $top-60
        });
    });

    // 页面刷新判断
    loadLouti();
    $(window).on('scroll', function () {
        loadLouti();
    });
    // 
    function loadLouti() { 
        $top = $(window).scrollTop();
        if ($top >= 600) {
            $('#louti').show();
        } else {
            $('#louti').hide();
        }

        $items.each(function (index, element) {
            let $loucengtop = $(element).offset().top + $(element).height() / 1.5 + 60;
            //    + $(element).height() / 3
            if ($loucengtop > $top) {
                $('#louti li').removeClass('active');
                $('#louti li').eq(index).addClass('active');
                return false;
            }
        });
     }
}(jQuery);