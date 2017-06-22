/**
 * Created by pe on 2017/6/21.
 */
$(document).ready(function () {
//    页面初始化
    initUserName()
//    按钮事件绑定
    $('.login-btn').click(function () {
        login()
    })
    function initUserName() {
        var userData= JSON.parse(localStorage.getItem('userData'));
        if(userData){
            $('#userName').val(userData.userName);
            $('#password').val(userData.password);
        }
    }
//    请求登录
    function login() {
        var userName=$('#userName').val(),
            password=$('#password').val(),
            remember=$('#remember').prop('checked');
        $.get('data/user.json').then(function (res) {
            var userList = res.userList;
            var isLoginFlag = userList.some(function (item) {
                    return item.userName==userName&&item.password==password
            })
            if(isLoginFlag){
                if(remember){
                    setUserName('save',{
                        "userName":userName,
                        "password":password
                    })
                }else{
                    setUserName('clear')
                }
                window.location.href='index.html'
            }else{
                showError()
            }
        })
    }
//    显示错误信息
    function showError() {
        $('.login-error').show()
    }
//    存储本地数据
    function setUserName(type,userData) {
        if(type=='save'&&userData){
            localStorage.setItem('userData',JSON.stringify(userData))
        }else{
            localStorage.clear('userData')
        }
    }


})