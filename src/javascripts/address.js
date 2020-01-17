import {
    provice
} from './city.js';

class Address {
    constructor() {
        this.menu = $('.address-menu');
        this.btn = $('.text-2');
        this.content = $('.address-content');
    }
    init() {
        // 显示地址
        this.btnshow();

        // 省份点击事件
        this.proBtn();
        this.cityBtn();
        this.countryBtn();


        // 菜单标题点击切换
        this.changeShowTitle();

        // 点击空白区域，取消二级菜单
        $(document).on('click', (event) => {
            this.menu.css('display', 'none');
            let flag = $('.provice .pro-text').html() != '请选择' && $('.city .pro-text').html() != '请选择' && $('.country .pro-text').html() != '请选择'
            if (flag) {
                $('.cart-address .text-2 .address-text').html($('.provice .pro-text').html() + $('.city .pro-text').html() + $('.country .pro-text').html())
            }
        })
    }

    // 点击显示地址
    btnshow() {
        this.btn.on('click', (evevt) => {
            // 渲染省份
            this.renderProvice();
            $('.provice .pro-text').html('请选择').css('color', '#00aaa6');
            this.menu.show();
            $('.city-name').eq(0).show().siblings().hide();
            $('.address-content').eq(0).show().siblings('.address-content').hide();

            // 阻止事件冒泡
            event.stopPropagation();
        })
    }

    // 渲染省份
    renderProvice() {
        let str = '';

        $.each(provice, (index, value) => {
            str += `
            <li index-pro="${index}">
                <a href="javascript:;">
                    ${value.name}
                </a>
            </li>
            `;
        })
        // 渲染数据
        $('.show-provice').html(str);
    }
    // 省份点击事件
    proBtn() {

        let _this = this;
        $('.show-provice').on('click', 'li', function () {
            $('.city-name').not(0).siblings().find('.pro-text').html('请选择');
            // 显示的样式
            $('.address-content a').css('color', '#1e1e1e')
            $(this).find('a').css('color', '#00aaa6')
            // 获取点击的index
            _this.index_pro = $(this).attr('index-pro');
            // 
            let $text = $(this).text();
            // 改变显示内容
            _this.changeShow(0, 1, $text);

            // 城市按钮显示
            $('.city').show();

            // 渲染城市
            _this.renderCity();

            $('.address-content').eq(1).show().siblings('.address-content').hide();

            // 阻止事件冒泡
            event.stopPropagation();
        })
    }

    // 改变显示内容
    changeShow(prev, curr, text) {
        // 改变显示内容
        $('.address-title .pro-text').eq(prev).html(text);
        $('.address-title .pro-text').css('color', '#666');
        $('.address-title .pro-text').eq(curr).css('color', '#00aaa6');
        $('.address-title .city-name').css({
            border: 'none'
        });
        $('.address-title .city-name').eq(curr).css({
            'border-bottom': '1px solid #00aaa6'
        });
    }
    // 渲染城市
    renderCity() {
        let str = '';
        $.each(provice[this.index_pro].city, (index, value) => {
            str += `
            <li index-city="${index}">
                <a href="javascript:;">
                    ${value.name}
                </a>
            </li>
            `;
        })
        // 渲染数据
        $('.show-city').html(str);
    }

    // 城市点击事件
    cityBtn() {
        let _this = this;
        $('.show-city').on('click', 'li', function () {
            // 显示的样式
            $('.address-content a').css('color', '#1e1e1e')
            $(this).find('a').css('color', '#00aaa6')
            // 获取点击的index
            _this.index_city = $(this).attr('index-city');
            // 
            let $text = $(this).text();
            // 改变显示内容
            _this.changeShow(1, 2, $text);

            // 城市按钮显示
            $('.country').show();

            // 渲染区县
            _this.renderCountry();

            $('.address-content').eq(2).show().siblings('.address-content').hide();
            console.log('城市')
            // 阻止事件冒泡
            event.stopPropagation();
        })
    }

    // 渲染区县
    renderCountry() {
        let str = '';
        $.each(provice[this.index_pro].city[this.index_city].districtAndCounty, (index, value) => {
            str += `
            <li index-country="${index}">
                <a href="javascript:;">
                    ${value}
                </a>
            </li>
            `;
        })
        // 渲染数据
        $('.show-country').html(str);
    }

    // 区县点击事件
    countryBtn() {
        let _this = this;
        $('.show-country').on('click', 'li', function () {
            // 显示的样式
            $('.address-content a').css('color', '#1e1e1e')
            $(this).find('a').css('color', '#00aaa6')
            // 获取点击的index
            _this.index_country = $(this).attr('index-country');
            // 
            let $text = $(this).text();
            // 改变显示内容
            $('.country .pro-text').text($text);

            // $('.address-content').eq(2).show().siblings('.address-content').hide();

            // 阻止事件冒泡
            event.stopPropagation();
        })
    }


    // 菜单标题切换
    changeShowTitle() {
        let _this = this;
        $('.city-name').on('click', function (event) {
            $(this).find('.pro-text').html('请选择');

            if ($(this).index() === 0) {
                // 
                $(this).show().css({
                    'border-bottom': '1px solid #00aaa6'
                }).siblings().hide();
                // 
                _this.renderProvice();
                $('.address-content').eq(0).show().siblings('.address-content').hide();

            } else if ($(this).index() === 1) {
                // 渲染城市
                _this.renderCity();
                $('.address-content').eq(1).show().siblings('.address-content').hide();

                $(this).find('.pro-text').css('color', '#00aaa6');
                $('.country').hide().find('.pro-text').html('请选择').css('color', '#00aaa6');
                $(this).css({
                    'border-bottom': '1px solid #00aaa6'
                })
            } else if ($(this).index() === 2) {
                console.log(2);
            }
            event.stopPropagation();
        })
    }


}

export {
    Address
}