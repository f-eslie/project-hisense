function fdj() {
    class Fdj {
        constructor() {
            this.box = $('.detail-left');
            this.spic = $('.spic');
            this.sf = $('.sf');
            this.bf = $('.bf');
            this.bpic = $('.bf img');
        }
        init() {
            this.spic.hover(() => {
                // 移入显示
                this.sf.css('display', 'block');
                this.bf.css('display', 'block');

                // 求小放的大小
                let sWidth = this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth();
                let sHeight = this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight();
                this.sf.css({
                    width: sWidth,
                    height: sHeight
                });
                // 比例 就是大放比小放
                this.bili = this.bf.outerWidth() / this.sf.outerWidth();

                // 移动
                this.spic.on('mousemove', (e) => {
                    let l = e.pageX - this.spic.offset().left - $('.sf').outerWidth() / 2;
                    let t = e.pageY - this.spic.offset().top - $('.sf').outerWidth() / 2;

                    // 判断
                    if (l < 0) {
                        l = 0;
                    } else if (l > this.spic.outerWidth() - $('.sf').outerWidth()) {
                        l = this.spic.outerWidth() - $('.sf').outerWidth();
                    }
                    if (t < 0) {
                        t = 0;
                    } else if (t > this.spic.outerHeight() - $('.sf').outerHeight()) {
                        t = this.spic.outerHeight() - $('.sf').outerHeight();
                    }
                    this.sf.css({
                        left:l,
                        top:t
                    })
                    //大图
                    this.bpic.css({
                        left: -l * this.bili,
                        top: -t * this.bili
                    });
                })

            }, () => {
                // 移出隐藏
                this.sf.css('display', 'none');
                this.bf.css('display', 'none');
            })
        }
    }
    new Fdj().init();
}

export {
    fdj
}