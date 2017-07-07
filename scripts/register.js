/// <reference path="jquery.min.js" />
$(function () {
    //$('html,body').animate({ scrollLeft: ((1920-$(window).width())/2)+"px"} , 800);
    $("#login").click(function () {
        if ($("#signup-password").val() != $("#signup-password2").val())
        {
            layer.alert("两次密码输入不一致！");
            return;
        }
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "userreg", username: $("#signup-username").val(), email: $("#signup-email").val(), "password": $("#signup-password").val() },
            success: function (data) {
                if (data != "") {
                    layer.closeAll();
                    layer.alert("欢迎你，" + data + "已注册成功！");
                    $.cookie("username", data, { expires: 1, path: '/' });
                    window.location.href = "index.html";
                }
                else {
                    layer.alert("注册错误！");
                }
            },
            error: function () {
                layer.alert("未知错误！");
            }
        });
    });

});
