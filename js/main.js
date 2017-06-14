/**
 * Created by Administrator on 2017/6/10.
 */
$(document).ready(function () {
    //全局变量定义
    var listsData;
    //初始化轮播图
    $('.slider-container').slider();
    init()
    //初始化化页面
    function init() {
        getData();
        eventBind();
    }
    // 渲染列表数组
    function  getData() {
        $.getJSON('js/list.json',function (data) {
            listsData=data.result;
            pagination(listsData);
        })
    }
//    事件绑定
    function eventBind() {
        $('.list-container').on('click','.list-item',function () {
            var companyId=$(this).attr('data-companyid');
            window.location.href='information.html?companyId='+companyId;
        })
        $('.search-btn').click(function () {
            var searchStr=$('.search-text').val();
            seachData(searchStr);
        })
    }
//    搜索数据
    function seachData(str) {
        var data=[];
        listsData.forEach(function (item) {
            if(item.positionName.indexOf(str)!=-1){
                data.push(item);
            }
        })
        renderHtml(data)
    }
//    渲染页面
    function renderHtml(data) {
        var listsData=data;
        $('.list-container').empty();
        listsData.forEach(function (item) {
            var htmStr='<div class="list-item" data-companyid="'+item.companyId+'">'+
                '<div class="list-header clear">'+
                '<div class="list-header-left">'+
                '<h4 class="job-name">'+item.positionName+'</h4>'+
                '<p class="info"><span class="money">'+item.salary+'</span><span class="experience">'+item.workYear+'</span></p>'+
                '</div>'+
                '<div class="list-header-middle">'+
                '<h4 class="company-name">'+item.companyShortName+'</h4>'+
                '<p class="stage">'+item.financeStage+'</p>'+
                '</div>'+
                '<div class="list-header-right">'+
                '<img src="//www.lgstatic.com/'+item.companyLogo+'" alt="logo" width="60" height="60">'+
                '</div>'+
                '</div>'+
                '<div class="list-footer clear">'+
                '<div class="list-footer-left"><span class="label">'+item.industryField+'</span></div>'+
                '<div class="list-footer-right">'+item.positionAdvantage+'</div>'+
                '</div>'+
                '</div>';
            $('.list-container').append(htmStr);
        })

    }
//    初始化分页
    function pagination(opts) {
        var pageSize=4,
              totalPages=Math.ceil(opts.length/pageSize),
             totalCounts=opts.length;

        $('.pagination').pagination({
            'totalPages':totalPages,
            'totalCounts':totalCounts,
            'pageSize':pageSize,
            'onPageChange':function (pageIndex) {
                var data = opts.slice((pageIndex-1)*pageSize,pageIndex*pageSize)
                renderHtml(data)
            }
        });
    }

})