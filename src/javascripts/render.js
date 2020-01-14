function render() {
    class Render {
        constructor() {
            this.goodsul = $('.item .goods-ul');
            this.goodslist = $('.item .goods-li');
        }
        init() {
            // 请求数据
            $.ajax({
                url: 'http://10.31.152.29/project-hisense/php/getdata.php',
                dataType: 'json',
                type: 'post'
            }).done((data) => {
                // 渲染数据
                this.goodslist.each((index, element) => {
                    if (index < 8) {
                        $(element).attr('sid',data[index].sid);
                        $(element).find('img').attr('src', data[index].url);
                        $(element).find('.tv-title').html(data[index].title);
                        $(element).find('.tv-desc').html(data[index].desc);
                        $(element).find('.tv-price').html(data[index].price);
                    }
                })
                // 点击跳转
                this.changePage();
            })
        }
        changePage(){
            this.goodslist.on('click',function(){
                let $index = $(this).attr('sid');
                $(this).find('a').attr('href','./details.html?sid='+$index);
            })
        }
    }
    new Render().init();
}


export {
    render
}