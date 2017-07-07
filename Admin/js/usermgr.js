/// <reference path="../../scripts/jquery.min.js" />
$(function () {
    //if (!$.cookie("adminname") || $.cookie("adminname") == null) {
    //    window.location.href = "adminlogin.aspx";
    //    return;
    //}
    $("table").addClass("table");
    $("table").addClass("table-hover");
    $("table").attr("border", "0px").attr("rules", "0");
    $("table tr td").click(function () {
        $(this).unbind("click");
        var uid = $(this).parent().find("td").eq(0).text();
        var col = $(this).index();
        if (canceltitle($(this).index())==1) {
            var tdvalue = $(this).text();
            $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:" + $(this).width() + "px;' />");
            var setb = $(this);
            $("#tempinput")[0].focus();
            $("#tempinput").blur(function () {
                setb.html($(this).val());
                if ($(this).val() != tdvalue) {
                    $.post("../adminrequest.aspx", { cmd: "userupdate", uid: uid, col: col, update: $(this).val() });
                };
                setb.on("click", tt);
            });
        }
    });
    //表格移动添加删除按钮
    $("table tr").hover(function () {
        $(this).find("td").eq(5).append('<img id="wremove" src="ui/X.png" style="width:20px;height:20px;float:right;" />');
        wremove($(this).find("td").eq(0).text());
    }, function () {
        $(this).find("td").eq(5).find("img").remove();
    });
    function wremove(a) {//删除用户
        $("#wremove").click(function () {
            //询问框
            layer.confirm('你确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.post("../adminrequest.aspx", { cmd: "removeu", uid: a }, function (data) {
                    layer.msg(data, { icon: 1 });
                });
            }, function () {
                //layer.msg('也可以这样', {
                //    time: 20000, //20s后自动关闭
                //    btn: ['明白了', '知道了']
                //});
            });
        });
    }
    function tt() {
        $(this).unbind("click");
        var uid = $(this).parent().find("td").eq(0).text();
        var col = $(this).index();
        if (canceltitle($(this).index()) == 1) {
            var tdvalue = $(this).text();
            $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:" + $(this).width() + "px;' />");
            var setb = $(this);
            $("#tempinput")[0].focus();
            $("#tempinput").blur(function () {
                setb.html($(this).val());
                if ($(this).val() != tdvalue) {
                    $.post("../adminrequest.aspx", { cmd: "userupdate", uid: uid, col: col, update: $(this).val() });
                };
                setb.on("click", tt);
            });
        }
    }
    function canceltitle(index) {
        if (index == 0) {
            return 0;
        }
        else {
            for (var i = 0; i < $("table tr").length; i++) {
                $("table tr").eq(i).find("td").eq(0).unbind("click");
            }
            return 1;
        }
    }
});