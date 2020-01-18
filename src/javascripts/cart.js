class Cart {
    constructor() {
        this.goodsul = $('.carts ul')
        this.goodsUrl = $('.goods-url');
        this.goodsTitle = $('.goods-title');
        this.goodsPrice = $('.goods-price');
        this.delBtn = $('.goods-del');
        this.delCheckBtn = $('.dele-checked');
        this.nums = $('.bottom-right-text1 span');
    }
    init() {
        //购物车列表没有商品
        if ($('.goods-li').length === 0) {
            console.log($('.goods-li').length)
            $('.carts ul').html('暂无商品');
        }
        // 1.渲染
        $.ajax({
            url: 'http://10.31.152.29/project-hisense/php/getdata.php',
            dataType: 'json'
        }).done((data) => {
            this.goods = data;
            if (localStorage.getItem('goodsSid') && localStorage.getItem('goodsNum')) {
                let goodsSid = localStorage.getItem('goodsSid').split(',');
                let goodsNum = localStorage.getItem('goodsNum').split(',');
                for (let i = 0; i < goodsSid.length; i++) {
                    this.render(goodsSid[i], goodsNum[i]);
                }
            }
            // 减按钮显示状态
            this.jianShow();
            // 计算总价
            this.allprice();
            // 全选
            this.allselect();
            // 改变数量
            this.inputNumChange();
            // 删除单个商品
            this.delLi();
            // 删除选中
            this.delChecked();
            // 如果没有商品列表，取消全选
            this.noAllSel();
        })

    }
    // 判断减按钮状态
    jianShow(){
        $('.goods-li .goods-num-input input').each((index,ele)=>{
            if ($(ele).val() <= 1) {
                $(ele).prev('.jian').css({
                    'cursor': 'default',
                    'background-color': '#eee'
                })
            } else {
                $(ele).prev('.jian').css({
                    'cursor': 'pointer',
                    'background-color': '#fff'
                })
            }
        })
    }
    // 2.渲染每一件商品
    render(sid, num) {
        let strhtml = '';
        for (let i = 0; i < this.goods.length; i++) {
            if (sid == this.goods[i].sid) {
                strhtml += `
                        <li class="goods-li first-li" sid="${this.goods[i].sid}">
                        <div class="checkbox" >
                            <input type="checkbox" checked>
                        </div>
                        <div class="first-li-middle">
                            <div>
                                <img src="${this.goods[i].url}" alt="" class="goods-url">
                            </div>
                            <a class="goods-title">${this.goods[i].title}</a>
                        </div>
                        <div class="first-li-price goods-price">￥<span class="danjia">${this.goods[i].price}</span></div>
                        <div class="first-li-num goods-num-input">
                            <a href="javascript:;" class="jian">-</a>
                            <input type="text" value="${num}">
                            <a href="javascript:;" class="jia">+</a>
                        </div>
                        <div class="first-li-count goods-price-count">
                            ${this.goods[i].price * num}
                        </div>
                        <div class="first-li-op goods-del">
                            删除
                        </div>
                    </li>
                        `;
            }
        }
        this.goodsul.html('');
        this.goodsul.append(strhtml);
        if ($('.goods-li').length === 0) {
            this.goodsul.html('暂无商品');
        }
    }

    //计算总价
    allprice() {
        let $goodsnum = 0; //商品的件数
        let $goodsprice = 0; //商品的总价
        $('.carts ul .goods-li').each(function (index, element) {
            if ($(element).find('input:checkbox').is(':checked')) {
                $goodsnum += parseInt($(element).find('.goods-num-input input').val());
                $goodsprice += parseFloat($(element).find('.goods-price-count').html());
            }
        });
        $('.bottom-right-text1 span').html($goodsnum);
        $('.bottom-right-price').html('￥' + $goodsprice);
    }

    // 全选
    allselect() {
        $('.all-sel1').on('click', () => {
            $('.carts ul').find('input:checkbox').prop('checked', $('.all-sel1').prop('checked'));
            $('.all-sel2').prop('checked', $('.all-sel1').prop('checked'));
            this.allprice(); //求和

        });
        $('.all-sel2').on('click', () => {
            $('.carts ul').find('input:checkbox').prop('checked', $('.all-sel2').prop('checked'));
            $('.all-sel1').prop('checked', $('.all-sel2').prop('checked'));
            this.allprice(); //求和

        });
        // let $checkinput = $('.carts ul').find('input:checkbox'); //委托的元素。
        $('.carts ul').on('change', 'input:checkbox', () => {
            let $inputs = $('.goods-li').find('input:checkbox');
            if ($('.carts ul').find('input:checked').length === $inputs.length) {
                $('.all-sel2').prop('checked', true);
                $('.all-sel1').prop('checked', true);
            } else {
                $('.all-sel2').prop('checked', false);
                $('.all-sel1').prop('checked', false);
            }
            this.allprice(); //求和
        })
    }

    // 输入数量
    inputNumChange() {
        let _this = this;
        //加
        $('.jia').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            if ($num > 1) {
                $(this).parents('.goods-li').find('.jian').css({
                    'background-color': '#fff',
                    'cursor': 'pointer'
                })
            }
            $(this).prev('input').val($num);
            $(this).parents('.goods-li').find('.goods-price-count').html(singleprice($(this)));
            local($(this).parents('.goods-li').attr('sid'), $num);
            _this.allprice();
        });
        //减
        $('.jian').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;
                $(this).css({
                    'background-color': '#eee',
                    'cursor': 'default'
                })
            } else {
                $(this).css({
                    'background-color': '#fff'
                })
            }
            $(this).next('input').val($num);
            $(this).parents('.goods-li').find('.goods-price-count').html(singleprice($(this)));
            local($(this).parents('.goods-li').attr('sid'), $num);
            _this.allprice();
        });
        //改变数字
        $('.goods-num-input input').on('input', function () {
            let $inputvlaue = $(this).val();
            if (/^[1-9]+\d*$/.test($(this).val())) {
                if ($inputvlaue < 1) {
                    $(this).val(1);
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.goods-li').find('.goods-price-count').html(singleprice($(this)));
            local($(this).parents('.goods-li').attr('sid'), $(this).val());
            _this.allprice();
        });




        //封装计算单价
        function singleprice(obj) {
            let $dj = parseFloat(obj.parents('.goods-li').find('.danjia').html());
            let $count = parseFloat(obj.parents('.goods-li').find('.goods-num-input input').val());
            return $dj * $count.toFixed(2);
        }

        // 本地存储
        function local(sid, value) { //sid:当前的索引   value：数量
            if (localStorage.getItem('goodsSid') && localStorage.getItem('goodsNum')) {
                let sidlist = localStorage.getItem('goodsSid').split(',');
                let numlist = localStorage.getItem('goodsNum').split(',');
                let index = $.inArray(sid, sidlist); //sid在数组中的位置索引。
                numlist[index] = value;
                localStorage.setItem('goodsNum', numlist.toString());
            }
        }
    }

    // 删除单个
    delLi() {
        let _this = this;
        $('.carts ul').on('click', '.goods-del', function () {
            _this.delgoods($(this));
            _this.allprice();
        })
    }
    delgoods(obj) {
        $(obj).parents('.goods-li').remove();
        if ($('.goods-li').length === 0) {
            console.log($('.goods-li').length)
            $('.carts ul').html('暂无商品');
        }
        let sid = $(obj).parents('.goods-li').attr('sid');
        if (localStorage.getItem('goodsSid') && localStorage.getItem('goodsNum')) {
            let sidlist = localStorage.getItem('goodsSid').split(',');
            let numlist = localStorage.getItem('goodsNum').split(',');
            let index = $.inArray(sid, sidlist); //sid在数组中的位置索引。
            numlist.splice(index, 1);
            sidlist.splice(index, 1);
            localStorage.setItem('goodsNum', numlist.toString());
            localStorage.setItem('goodsSid', sidlist.toString());
        }
    }
    // 删除选中
    delChecked() {
        let _this = this;
        $('.dele-checked').on('click', function () {
            let delList = $('.carts ul').find('input:checked');
            delList.each((index,ele)=>{
                _this.delgoods($(ele));
            })
            _this.allprice();
            _this.noAllSel();
        })
    }
    // 如果没有一个li,取消全选
    noAllSel(){
        if($('.goods-li').length === 0){
            $('.all-sel1').prop('checked',false);
            $('.all-sel2').prop('checked',false);
        }
    }
}


export {
    Cart
}