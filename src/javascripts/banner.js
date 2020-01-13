;
! function ($) {
    function Banner(){
        this.banner=$('#banner');
        this.bannermain=$('.banner-main');
        this.picul=$('.banner-ul');
        this.piclist=$('#banner .banner-ul li');
        this.btns=$('#banner .points-index');
        this.num=0;
        this.liwidth=this.piclist.eq(0).width();
        this.left=$('.left-arrow');
        this.right=$('.right-arrow');
        this.timer=null;
    }
    
    Banner.prototype.init=function(){
        var that=this;
        var $firstpic=this.piclist.first().clone()
        var $lastpic=this.piclist.last().clone();
        this.picul.append($firstpic);
        this.picul.prepend($lastpic);
        $(window).on('resize',()=>{
            this.liwidth=$('#banner li').width();
            if(this.bannermain.width() >= 1550){
                this.picul.find('img').each((index,element)=>{
                    $(element).css('width',this.bannermain.width());
                })
            }else{
                this.picul.find('img').each((index,element)=>{
                    $(element).css('width',1520);
                })
            }
        })
        if(this.bannermain.width() >= 1550){
            this.picul.find('img').each((index,element)=>{
                $(element).css('width',this.bannermain.width());
            })
        }else{
            this.picul.find('img').each((index,element)=>{
                $(element).css('width',1520);
            })
        }
        // 重新获取li的宽度
        this.liwidth=$('#banner li').width();
        //重新获取piclist的长度。
        this.piclist=$('#banner ul li');
        this.picul.width(this.liwidth*this.piclist.length).css('left',-this.liwidth);
        for(var i=0;i<this.btns.length;i++){
            this.btns[i].onclick=function(){
                that.num=$(this).index();
                that.tabchange();
            }
        }
        this.banner.hover(function(){
            that.left.show();
            that.right.show();
            clearInterval(that.timer);
        },function(){
            that.left.hide();
            that.right.hide();
            that.autoplay();
        });
        
        this.right.on('click',function(){
            that.num++;
            if(that.num==that.btns.length){
                that.btns.eq(0).addClass('active').siblings().removeClass('active');
            }
            that.tabchange();
            
        });
        this.left.on('click',function(){
            that.num--;
            that.tabchange();

        });
        this.autoplay();
    }
    
    Banner.prototype.tabchange=function(){
        var that=this;
        this.btns.eq(this.num).addClass('active').siblings().removeClass('active');
        this.picul.stop(true,true).animate({
            left:-this.liwidth*(this.num+1)
        },400,function(){
            if(parseInt(that.picul.css('left'))==-that.liwidth*(that.btns.length+1)){
                that.picul.css('left',-that.liwidth+'px');
                that.num=0;
            }
            if(parseInt(that.picul.css('left'))==0){
                that.picul.css('left',-that.liwidth*that.btns.length+'px');
                that.num=that.btns.length-1;
            }
        })
    }
    Banner.prototype.autoplay=function(){
        var that=this;
        that.timer=setInterval(function(){
            that.right.click();
        },3500)
    }
    new Banner().init();
}(jQuery);