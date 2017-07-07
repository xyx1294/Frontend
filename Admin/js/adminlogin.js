/// <reference path="../../scripts/jquery.min.js" />
/// <reference path="../../scripts/layer.js" />

$(function () {
    if ($.cookie("adminname") && $.cookie("adminname") != "null") {
        window.location.href = "manager.aspx";
        return;
    }
    $(".btn").click(function () {
        var u = $("[name='u']").val();
        var p = $("[name='p']").val();
        $.post("../adminrequest.aspx", { cmd:"login","u": u, "p": p }, function (data) {
            if (data == "success") {
                $.cookie("adminname", "admin", { expires: 1, path: '/' });
                window.location.href = "manager.aspx";
            }
            else {
                layer.alert("帐号或密码错误！");
            }
        });
    });
});
