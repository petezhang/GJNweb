/**
 * Created by pe on 2017/6/15.
 */
;(function ($) {
$.getParams=function(url){
    var params={};
    var start=url.indexOf('?')+1;
    var searchParam=url.substring(start);
    var paramsArr=searchParam.split('&');
    for(var i=0;i<paramsArr.length;i++){
        var paramArr=paramsArr[i].split('=');
        params[paramArr[0]]=paramArr[1];
    }
    return params
}
})(jQuery);