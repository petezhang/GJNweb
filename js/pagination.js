/**
 * Created by pe on 2017/6/13.
 */
;(function ($) {
    $.fn.pagination=function (opts) {
        var _default={
            totalPages:1,
            totalCounts:0,
            pageIndex:1,
            pageSize:10,
            onPageChange:''
        }
        var opts = $.extend({},_default,opts);
        return this.each(function () {
            var elem = $(this);
            var pagination=new Pagination(elem,opts);
        })
    }
})(jQuery);

function Pagination(elem,opts) {
    this.elem=elem;
    this.opts=opts;
    this.init();
}
var pagePrototype=Pagination.prototype;

pagePrototype.init=function () {
    //初始化分页组件
    this.renderPages();
    this.eventBind();
}
//渲染分页组件
pagePrototype.renderPages=function () {
    var opts = this.opts;
    this.elem.empty();
    // 添加页数按钮
    for (var i=0;i<opts.totalPages;i++){
        var pageIdx=i+1;
        var pageBtnStr='<span class="page">'+pageIdx+'</span>'
        this.elem.append(pageBtnStr);
    }
    //添加上一页，下一页按钮
    this.elem.prepend('<span class="prove">上一页</span>').append('<span class="next">下一页</span>');
//    添加当前页状态
    this.elem.find('.page').eq(opts.pageIndex-1).addClass('active');
    this.opts.onPageChange(opts.pageIndex)
}
//分页组件事件绑定
pagePrototype.eventBind=function () {
    var _self=this;
    this.elem.on('click','.page',function () {
        var pageIndex=parseInt($(this).text());
        _self.changePage(pageIndex);
    })
//    上一页，下一页按钮点击事件
    this.elem.on('click','.prove',function () {
        _self.changePage('prove');
    }).on('click','.next',function () {
        _self.changePage('next');
    })
}
//页码切换
pagePrototype.changePage=function (pageIndex) {
    if(typeof  pageIndex=='number'){
        this.opts.pageIndex=pageIndex;
    }else if(pageIndex=='prove'&&this.opts.pageIndex>1){
        this.opts.pageIndex--
    }else if(pageIndex=='next'&&this.opts.pageIndex<this.opts.totalPages){
        this.opts.pageIndex++
    }else{
        return;
    }
    this.renderPages();
}
