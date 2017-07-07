/// <reference path="../../scripts/jquery.min.js" />
$(function () {
    if (!$.cookie("adminname") || $.cookie("adminname") == "null") {
        window.location.href = "adminlogin.aspx";
        return;
    }
    $("table").addClass("table");
    $("table").addClass("table-hover");
    $("table").attr("border", "0px").attr("rules", "0");
    for (var i = 0; i < $("table tr").length; i++) {//过滤标题
        var str = $("table tr").eq(i).find("td").eq(3).text().split(" ");
        $("table tr").eq(i).find("td").eq(3).text(str[str.length - 1]);
        $("table tr").eq(i).find("td").eq(3).append('<a class="edit" href="../fabiao.aspx?tid=' + $("table tr").eq(i).find("td").eq(0).text() + '" target="_blank">编辑文章</a>');
    }
    //表格移动添加删除按钮
    $("table tr").hover(function () {
        $(this).find("td").eq(6).append('<img id="wremove" src="ui/X.png" style="width:20px;height:20px;float:right;" />');
        wremove($(this).find("td").eq(0).text());
    }, function () {
        $(this).find("td").eq(6).find("img").remove();
    });
    function wremove(a) {//删除文章
        $("#wremove").click(function () {
            //询问框
            layer.confirm('你确定要删除吗？', {
                btn: ['确定', '取消'] //按钮
            }, function () {
                $.post("../adminrequest.aspx", { cmd: "removew", tid: a }, function (data) {
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
    $("table tr td").click(function () {
        $(this).unbind("click");
        var setb = $(this);
        var tid = $(this).parent().find("td").eq(0).text();
        var col = $(this).index();
        if (canceltitle($(this).index(), setb) == 1) {
            var tdvalue = $(this).text();
            $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:" + $(this).width() + "px;' />");
            $("#tempinput")[0].focus();
            $("#tempinput").blur(function () {
                setb.html($(this).val());
                if ($(this).val() != tdvalue) {
                    $.post("../adminrequest.aspx", { cmd: "wenzhangupdate", tid: tid, col: col, update: $(this).val() });
                };
                setb.on("click", tt);
            });
        }
    });
    function tt() {
        $(this).unbind("click");
        var setb = $(this);
        var tid = $(this).parent().find("td").eq(0).text();
        var col = $(this).index();
        if (canceltitle($(this).index(),setb) == 1) {
            var tdvalue = $(this).text();
            $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:" + $(this).width() + "px;' />");
            var setb = $(this);
            $("#tempinput")[0].focus();
            $("#tempinput").blur(function () {
                setb.html($(this).val());
                if ($(this).val() != tdvalue) {
                    $.post("../adminrequest.aspx", { cmd: "wenzhangupdate", tid: tid, col: col, update: $(this).val() });
                };
                setb.on("click", tt);
            });
        }
    }

    function canceltitle(index,obj) {
        if (index == 2) {
            //var tdvalue = obj.text();
            //obj.html('<select></select>');
            //$.ajax({
            //    url: "../static_data/ziclass.json",
            //    type: "get",
            //    success: function (data) {
            //        var json = eval(data);
            //        var str = "";
            //        for (var i = 0; i < json.length; i++) {
            //            if (json[i].ziclass == tdvalue) {
            //                obj.find("select").append("<option selected='selected'>" + json[i].ziclass + "</option>");
            //            }
            //            else {
            //                obj.find("select").append("<option>" + json[i].ziclass + "</option>");
            //            }
            //        };
            //    }
            //});
            //obj.find("select").focus();
            //obj.find("select").blur(function () {
            //    obj.html($(this).val());
            //    obj.on("click", tt);
            //});
            return 0;
        }
        if (index == 0 || index == 1 || index == 3) {
            return 0;
        }
        else
        {
            for (var i = 0; i < $("table tr").length; i++) {
                $("table tr").eq(i).find("td").eq(0).unbind("click");
                $("table tr").eq(i).find("td").eq(1).unbind("click");
                $("table tr").eq(i).find("td").eq(3).unbind("click");
            }
            return 1;
        }
    }
    //编辑文章
    $(".edit").click(function () {
        $.cookie("username", "admin",{ expires: 1, path: '/' });
    });
});