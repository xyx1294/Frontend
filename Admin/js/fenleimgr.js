/// <reference path="../../scripts/jquery.min.js" />
$.ajax({
    url: "../static_data/ziclass.json",
    type: "get",
    async: false,
    success: function (data) {
        var json = eval(data);
        var str = "";
        for (var i = 0; i < json.length; i++) {
            if (i == json.length - 1) {
                str += json[i].ziclass;
            }
            else {
                str += json[i].ziclass + ",";
            }
        };
        $(".tagsinput").val(str);
    }
});
$(function () {
    if (!$.cookie("adminname") || $.cookie("adminname") == "null") {
        window.location.href = "adminlogin.aspx";
    };
    //删除增加类
    var lei = new Array();
    var nowlei = new Array();
    for (var i = 0; i < $(".bootstrap-tagsinput span").length; i++) {
        if (i % 2 == 0) {
            lei[i/2] = $(".bootstrap-tagsinput span").eq(i).text().replace('\'\"\"\'g', "");
        }
    }
    
    $(".bootstrap-tagsinput span").click(function () {
        if ($(this).text() != "") {
        //$.post("../adminrequest.aspx", { cmd: "removelei", lei: $(this).text() });
        $.ajax({
            url: "../adminrequest.aspx",
            type: "post",
            data: { cmd: "removelei", lei: $(this).text() },
            async: false
        });
        $.post("../Handler.ashx", { cmd: "menu" });
        };
    });
    $(".bootstrap-tagsinput input").blur(function () {
        for (var i = 0; i < $(".bootstrap-tagsinput span").length; i++) {
            if (i % 2 == 0) {
                nowlei[i / 2] = $(".bootstrap-tagsinput span").eq(i).text().replace('\'\"\"\'g', "");
            }
        }
        if (nowlei.length > lei.length) {
            for (var i = 0; i < nowlei.length; i++) {
                for (var j = 0; j < lei.length; j++) {
                    if (nowlei[i] == lei[j]) { j = lei.length; }
                    if (j == lei.length - 1 && lei[i] != nowlei[j]) {
                        for (var t = 0; t < $(".bootstrap-tagsinput span").length; t++) {
                            if (t % 2 == 0) {
                                lei[t / 2] = $(".bootstrap-tagsinput span").eq(t).text().replace('\'\"\"\'g', "");
                            }
                        }
                        //$.post("../adminrequest.aspx", { cmd: "addlei", lei: nowlei[i] });
                        $.ajax({
                            url: "../adminrequest.aspx",
                            type: "post",
                            data: { cmd: "addlei", lei: nowlei[i] },
                            async:false
                        });
                        $.post("../Handler.ashx", { cmd: "menu"});
                    }
                }
            }
        }
    });
    //
});