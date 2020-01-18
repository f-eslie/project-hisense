function louti() {
    class Louti {
        constructor() {
            this.items = $('.item');
            this.louti = $('#louti');
            this.top = $('.come-top');
        }
        init() {
            // 获取屏幕宽度
            let clientHeight = $(window).height();
            // 楼梯在页面垂直方向居中
            this.louti.css('top', (clientHeight - this.louti.height()) / 2);

            // 监听屏幕变化
            $(window).on('resize', () => {
                let clientHeight = $(window).height();
                this.louti.css('top', (clientHeight - this.louti.height()) / 2);
            })

            // 楼梯点击
            this.itemClick();

            // 页面刷新判断
            this.loadLouti();

            // 滚动条滚动判断
            $(window).on('scroll', () => {
                this.loadLouti();
            });

            // 回到顶部
            this.top.on('click', () => {
                $('html').animate({
                    scrollTop: 0
                });
            })
        }
        // 楼梯点击事件
        itemClick() {
            let _this = this;
            $('#louti li').on('click', function () {
                $(this).addClass('active').siblings('li').removeClass('active');
                let $index = $(this).index();
                let $top = _this.items.eq($index).offset().top;
                $('html').animate({
                    scrollTop: $top - 60
                });
            });
        }


        // 
        loadLouti() {
            let $top = $(window).scrollTop();
            if ($top >= 600) {
                $('#right-fixed').show();
                $('#louti').show();
            } else {
                $('#louti').hide();
                $('#right-fixed').hide();
            }

            this.items.each(function (index, element) {
                let $loucengtop = $(element).offset().top + $(element).height() / 1.5 + 60;
                //    + $(element).height() / 3
                if ($loucengtop > $top) {
                    $('#louti li').removeClass('active');
                    $('#louti li').eq(index).addClass('active');
                    return false;
                }
            });
        }

    }
    new Louti().init();
}

export {
    louti
}