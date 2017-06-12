/**
 * Created by Administrator on 2017/6/10.
 */
;(function ($) {
    var _default={
        width:1200,
        height:360,
        speed:1000,
        direction:'right'
    }
    $.fn.slider=function (opts) {
        opts=$.extend({},_default,opts);
        return this.each(function () {
            var elem=$(this);
            var slider=new Slider(elem,opts);
        })
    }
})(jQuery);

    function Slider(elem,opts) {
        this.elem=elem;
       this.opts=opts;
       this.index=0,        //当前展示轮播索引
        this.init();
    }
    var sliderProto=Slider.prototype;

    sliderProto.init=function () {
        var $elem = this.elem;
        var _self =this;
        var timer;
        //初始化外框大小
        $elem.css({
            width:_self.opts.width,
            height:_self.opts.height
        })
        // 初始化内部轮播图片
        $elem.find('.slider-content').css({
            width:$elem.find('.slider-item').length*_self.opts.width
        })
        $elem.find('.slider-item').width(_self.opts.width);
        //事件绑定
        $elem.find('.arrow-left').on('click',function () {
            _self.toLeft()
        })
        $elem.find('.arrow-right').on('click',function () {
            _self.toRight()
        })
        $elem.hover(function () {
            if(timer){
                clearInterval(timer);
            }
        },function () {
                timer=setInterval(function () {
                    _self.toLeft();
                },2000)
        })
        // 开始轮播
        timer=setInterval(function () {
            _self.toLeft();
        },2000)
        //指示图标切换
        this.initDots();
    }
    sliderProto.toLeft=function () {
        var
            len=this.elem.find('.slider-item').length,
            _left;
        if(this.index>=len-1){
            this.index=0
        }else{
            this.index++
        }
        _left=this.index*this.opts.width;
        this.animate(-_left);
    }
    sliderProto.toRight=function () {
        var
            len=this.elem.find('.slider-item').length,
            _left;
        if(this.index<=0){
            this.index=len-1
        }else{
            this.index--
        }
        _left=this.index*this.opts.width;
        this.animate(-_left);
    }
    sliderProto.animate=function (val) {
        this.elem.find('.slider-content').animate({left:val},this.opts.speed);
        this.setActive();
    }
    sliderProto.initDots=function () {
        var len =this.elem.find('.slider-item').length;
        this.elem.find('.slider-dot').css({
            width: 24*len,
            'margin-left':-24*len/2
        });
        for(var i=0;i<len;i++){
            this.elem.find('.slider-dot').append('<span class="dot-item"></span>');
        }
        this.elem.find('.dot-item').eq(0).addClass('active');
    }
    sliderProto.setActive=function () {
    this.elem.find('.dot-item').removeClass('active').eq(this.index).addClass('active');
    }