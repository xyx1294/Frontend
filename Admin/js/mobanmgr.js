/// <reference path="../../scripts/jquery.min.js" />
$(function () {
    //运行模板工具
    //
    if (!$.cookie("adminname") || $.cookie("adminname") == null) {
        window.location.href = "adminlogin.aspx";
        return;
    }
    $("table").addClass("table");
    $("table").addClass("table-hover");
    $("table").css({ "border": "0px", "rules": "0" });
    $.get("..\\static_data\\remenmoban.json", function (data) {//获取热门模版
        var json = eval(data);
        for (var i = 0; i < json.length; i++) {//热门模版添加
            $("table").append('<tr><td>' + (i + 1) + '</td><td>' + json[i]["title"] + '</td><td>' + json[i]["img"] + '</td><td>' + json[i]["down"] + '</td></tr>');
        }
        $("table tr td").click(function () {
            $(this).unbind("click");
            var setb = $(this);
            var tdvalue = $(this).text();
            $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:"+$(this).width()+"px;' />");
            $("#tempinput")[0].focus();
            $("#tempinput").blur(function () {
                setb.html($(this).val());
                setb.on("click", tt);
            });
        });
    });
    function tt() {
        $(this).unbind("click");
        var setb = $(this);
        var tdvalue = $(this).text();
        $(this).html("<input id='tempinput' type='text' value='" + tdvalue + "' style='width:" + $(this).width() + "px;' />");
        var setb = $(this);
        $("#tempinput")[0].focus();
        $("#tempinput").blur(function () {
            setb.html($(this).val());
            setb.on("click", tt);
        });
    }
    
    //websocket更新模版
    var i = 0;
    var jdtimer;
    function jdt() {
        if(i>=100)
        {
            clearInterval(jdtimer);
        }
        else
        {
            $(".tools .jindutiao").css({ "width": i + "%" }).text(i + "%");
            i = i + 1;
        }
        
    }
    
    $(".tools button").click(function () {
        $(".tools button").attr("disabled", "disabled");
        i = 0;
        jdtimer = setInterval(jdt, 100);
        SendData();
    });
    var ws;
    ToggleConnectionClicked();
    function ToggleConnectionClicked() {
        try {
            ws = new WebSocket("ws://127.0.0.1:1818/chat");//连接服务器
            ws.onopen = function (event) { $(".alert").append("连接爬虫服务器成功..." + this.readyState + "<br />"); $(".tools button").removeAttr("disabled");  };
            ws.onmessage = function (event) {
                $(".alert").append("接收到服务器发送的数据：" + event.data + "<br />");
                if (event.data == "end") {
                    clearInterval(jdtimer);
                    $(".tools .jindutiao").css({ "width": "100%" }).text("100%");
                    $(".tools button").removeAttr("disabled");
                }
            };
            ws.onclose = function (event) { $(".alert").append("连接爬虫服务器失败..." + this.readyState + "<br />"); $(".tools button").attr("disabled", "disabled"); clearInterval(jdtimer); };
            ws.onerror = function (event) { $(".alert").append("WebSocket异常！" + "<br />"); $(".tools button").attr("disabled", "disabled"); clearInterval(jdtimer); };
        } catch (ex) {
            alert(ex.message);
        }
    };
    function SendData() {
        try {
            ws.send("beston");
        } catch (ex) {
            alert(ex.message);
        }
    };
});