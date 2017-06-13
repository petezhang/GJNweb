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
    var $elem = this.elem;
    var _self=this;
    $elem.find('.prove-btn').click(function () {
        _self.opts.onPageChange(1)
    })
    console.log('000')

}
