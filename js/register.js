/**
 * Created by pe on 2017/6/22.
 */
$(document).ready(function () {
    $('.register-btn').click(function () {
        register()
    })

//    注册用户
    function register() {
        var userName=$("#userName").val(),
            mail=$("#mail").val(),
            password=$("#password").val(),
            pwdNext=$("#pwdNext").val();
        $('.register-error').remove();

        var registerData={
            "userName":userName,
            "mail":mail,
            "password":password
        };
        var checkData=$.extend({},registerData,{"pwdNext":pwdNext});
       var checked= checkInfo(checkData)
        if(checked){
            var registerDataList=JSON.parse(localStorage.getItem('registerDataList'))||[]
           var isExit = registerDataList.some(function (item) {
                if(item.userName==registerData.userName){
                    showError('.user-name','用户名已经存在')
                    return true
                }
                if(item.mail==registerData.mail){
                    showError('.mail','邮箱已经存在')
                    return true
                }
            })
            if(!isExit){
                registerDataList.push(registerData)
                localStorage.setItem('registerDataList',JSON.stringify(registerDataList));
            }
        }

    }
//    验证输入内容合法性
    function checkInfo(registerData) {
        var userReg=/^1[3578]\d{9}$/;
        mailReg=/^[\w]+@[\w]+\.[\w]+$/
        if(!registerData.userName){
            showError('.user-name','用户名不能为空')
            return;
        }else if(!userReg.test(registerData.userName)){
            showError('.user-name','用户名格式不正确')
            return;
        }
        if(!registerData.mail){
            showError('.mail','邮箱不能为空')
            return;
        }else if(!mailReg.test(registerData.mail)){
            showError('.mail','邮箱不格式不正确')
            return;
        }
        if(!registerData.password){
            showError('.pwd','密码不能为空')
            return;
        }
        if(registerData.password!=registerData.pwdNext){
            showError('.pwd-next','两次密码不一致')
            return;
        }
        return true;
    }
//    显示错误信息
    function  showError(elem,str) {
    var errStr='<div class="register-error">'+str+'</div>';
        $(elem).after(errStr)
    }
})