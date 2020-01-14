class detailsRender {
    constructor() {
        // 小图的盒子
        this.swrap = $('.spic');
        // 小图
        this.spic = $('.spic img');
        // 小放
        this.sf = $('.spic .sf');
        // 大放
        this.bf = $('.bf');
        // 大图
        this.bpic = $('.bf img');

        // 图片的ul
        this.picul = $('.pics-wrap ul');
        // 图片列表
        this.picli = $('.pics-wrap li:first');
        // 商品标题
        this.goodstitle = $('.has-advertise');
        // 商品描述
        this.goodsdesc = $('.details-goods-introduce .g-desc');
        // 商品价格
        this.goodsprice = $('.desc-price');
        this.goodsprice1 = $('.desc-price-1 span:first');

        // sid
        this.sid = location.search[location.search.length - 1];

        // 箭头
        this.arrows = $('.arrows');

        this.index = 0;
    }
    init() {
        
        // 发送ajax请求
        $.ajax({
            url: 'http://10.31.152.29/project-hisense/php/siddata.php',
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).done((data) => {
            this.spic.attr('src', data.url);
            this.bpic.attr('src', data.url);
            this.goodstitle.html(data.title);
            this.goodsdesc.html(data.desc);
            this.goodsprice.html(data.price);
            this.goodsprice1.text(data.price);
            let pics = data.urls.split(',');

            $.each(pics, (index, value) => {
                let str = `
                <li>
                    <img src="${value}" alt="">
                </li>
                `;
                this.picul.append(str);
            })
            this.picul.css('width', $('.pics-wrap li').outerWidth(true) * ($('.pics-wrap li').length));

            // 判断箭头形状
        if ((parseInt(this.index) >= ($('.pics-wrap li').length - 4))) {
            $('.gt').css('cursor', 'default');
        } else {
            $('.gt').css('cursor', 'pointer');
        }
        })
        // 切换照片
        this.liclick();
        // 滚动图片
        this.arrowsclick();
    }
    liclick() {
        let that = this;
        this.picul.on('click', 'li', function () {
            $('.pics-wrap li').css('border-color', '#ccc');
            $(this).css({
                border: '1px solid #00aaa6'
            });
            let src = $(this).find('img').attr('src');
            that.spic.attr('src', src);
            that.bpic.attr('src', src);
        })
    }

    // 箭头点击
    arrowsclick() {
        let that = this;
        this.arrows.on('click', function () {

            if ($(this).hasClass('lt')) {
                if (that.index < 0) {
                    that.index++;
                    $('.lt').css('cursor', 'pointer');
                    if(that.index >= 0){
                        $('.lt').css('cursor', 'default');
                    }
                    if(-(that.index) < $('.pics-wrap li').length - 4){
                        $('.gt').css('cursor', 'pointer');
                    }
                    let $left = $('.pics-wrap li').outerWidth(true) * that.index;
                    that.picul.stop(true, true).animate({
                        left: $left
                    }, 200);
                }

            } else if ($(this).hasClass('gt')) {
                if (-(that.index) < $('.pics-wrap li').length - 4) {
                    that.index--;
                    $('.gt').css('cursor', 'pointer');
                    if (-(that.index) >= $('.pics-wrap li').length - 4) {
                        $('.gt').css('cursor', 'default');
                    }
                    if (that.index < 0) {
                        $('.lt').css('cursor', 'pointer');
                    }
                    let $left = $('.pics-wrap li').outerWidth(true) * that.index;
                    that.picul.stop(true, true).animate({
                        left: $left
                    }, 200)
                }

            }
        })

    }

    // 箭头悬浮
}
export {
    detailsRender
}