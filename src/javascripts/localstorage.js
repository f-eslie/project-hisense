import {
    inherits
} from "util"

function storage() {
    class LocalStorage {
        constructor() {
            this.sid = location.search[location.search.length - 1];
            this.input = $('.num-input');
            this.jia = $('.jia');
            this.jian = $('.jian');
        }
        init() {
            let _this = this;
            // input框只允许输入数字
            this.input.on('input', function () {
                if (!(/^[1-9]{1,}\d*$/.test($(this).val()))) {
                    $(this).val(1);
                }
            })
            // 加减
            $('.num-change').on('click', function () {
                if ($(this).hasClass('jia')) {
                    _this.input.val(parseInt(_this.input.val()) + 1);
                }
                if ($(this).hasClass('jian')) {
                    if (_this.input.val() <= 1) {
                        _this.input.val(1)
                    } else {
                        _this.input.val(parseInt(_this.input.val()) - 1);
                    }
                }
            })

            // 悬浮
            $('.num-change').hover(function () {
                if (_this.input.val() == 1 && $(this).hasClass('jian')) {
                    $(this).css({
                        'background': '#fff'
                    })
                } else {
                    $(this).css({
                        'background': '#eee'
                    })
                }
            }, function () {
                $(this).css({
                    'background': '#fff'
                })
            })

            // 添加购物车
            this.addCart();
        }

        // 添加购物车事件
        addCart() {
            var sidarr = [];
            var numarr = [];
            $('.add-cart').on('click', () => {
                if (localStorage.getItem('goodsSid') && localStorage.getItem('goodsNum')) {
                    sidarr = localStorage.getItem('goodsSid').split(',');
                    numarr = localStorage.getItem('goodsNum').split(',');
                }
                // this.getStorage();
                let index = $.inArray(this.sid, sidarr);
                if ( index !== -1) {
                    numarr[index] = parseInt(numarr[index]) + parseInt(this.input.val());
                    localStorage.setItem('goodsNum', numarr);
                } else {
                    sidarr.push(this.sid);
                    localStorage.setItem('goodsSid', sidarr);
                    numarr.push(this.input.val());
                    localStorage.setItem('goodsNum', numarr);
                }

            })

        }
    }
    new LocalStorage().init();
}

export {
    storage
}