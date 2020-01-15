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
        // 渲染省份
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
        this.content.html(str);

        // 显示地址
        this.btnshow();

        // 省份点击事件
        this.proBtn();
    }

    // 点击显示地址
    btnshow(){
        this.btn.on('click',()=>{
            this.menu.css('display','block');
        })
    }

    // 事件委托，省份点击事件
    proBtn(){
        this.content.on('click','li',function(){
            $('.address-content a').css('color','#1e1e1e')
            $(this).find('a').css('color','#00aaa6')
            let $index_pro = $(this).attr('index-pro');
            $('.provice .pro-text').html($(this).html());
        })    
    }
}

export {
    Address
}