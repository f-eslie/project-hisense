class Search {
    constructor() {
        this.searchWrap = $('.header-bottom-search');
        this.searchinput = $('.search-input');
        this.close = $('.search-close');
        this.nav = $('.header-nav');
        this.input = $('.search-input input');
        this.goodsli = $('.goods-li .tv-title')
    }
    init() {
        this.searchWrap.on('click', () => {
            this.nav.hide();
            this.searchinput.css('display', 'flex').find('input').animate({
                'width': '800px'
            }, 600)
        })

        this.close.on('click', (e) => {
            this.searchinput.find('input').animate({
                'width': '0px'
            }, 600, () => {
                this.input.css('width', '0px');
                this.searchinput.css('display', 'none')
                this.nav.show();
            })
            e.stopPropagation();
        })



        // 搜索框事件
        this.input.on('input', () => {
            // 获取搜索框提示列表
            this.getGoodsLi();
            console.log(this.titleArr)
             // 渲染数据
            this.renderLi();
        })

        $(document).on('click',()=>{
            $('.search-content').hide();
            this.input.val('');
        })
    }

    // 获取数据标题
    getGoodsLi() {
        let titleArr = [];
        this.goodsli.each((index, ele) => {
            if (index < 8) {
                if ($(ele).html().indexOf(this.input.val()) != -1) {
                    let obj = {
                        value:$(ele).html(),
                        id:$(ele).parents('.goods-li').attr('sid')
                    }
                    titleArr.push(obj);
                }
            }
        })
        this.titleArr = titleArr;
    }

    // 渲染数据
    renderLi() {
        if (this.titleArr.length > 0) {
            let str = '';
            $.each(this.titleArr, (index, v) => {
                str += `
                <li>
                    <a href="details.html?sid=${v.id}">${v.value}</a>
                </li>
                `;
            })
            $('.search-content').show();
            $('.search-content ul').html(str);
        }else{
            $('.search-content').hide();
        }
    }
}

export {
    Search
}