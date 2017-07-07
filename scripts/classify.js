/// <reference path="jquery.min.js" />
var zilei = "";
var sc = 1;
$(function () {
    zilei = decodeURIComponent(request("ziclass"));
    //搜索
    $("#texttitle").keyup(
        function (event) {
            var key = event.which;
            var texttitle = $(this).val().trim();
            if (texttitle != "") {
                if (key == 40) {
                    ++xiabiao;
                    $(".sousuo li").eq(xiabiao).addClass("sousuobg").siblings().removeClass("sousuobg");
                    return;
                }
                if (key == 38) {
                    --xiabiao;
                    $(".sousuo li").eq(xiabiao).addClass("sousuobg").siblings().removeClass("sousuobg");
                    return;
                }
                if (key == 13) {
                    $("#texttitle").val($(".sousuo li").eq(xiabiao).text());
                    wztitle = $(".sousuo li").eq(xiabiao).text();
                    $(".sousuo ul").remove();
                    getwz(wztitle);
                    return;
                }
                $.ajax({
                    url: "Handler.ashx",
                    type: "POST",
                    data: { cmd: "sousuo", title: texttitle },
                    success: function (data) {
                        $(".sousuo ul").remove();
                        $(".sousuo").append(data);
                        $(".sousuo li").mouseover(function () { $(this).addClass("sousuobg").siblings().removeClass("sousuobg"); }).click(function () { $("#texttitle").val($(this).text()); $(".sousuo ul").remove(); getwz($("#texttitle").val()); });
                        xiabiao = -1;
                    }
                });
            }
            else {
                $(".sousuo ul").remove();
            }
        }
     );
    //跳到文章
    function getwz(wztitle) {
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "getwz", wztitle: wztitle },
            success: function (data) {
                window.location.href = "wenzhang.aspx?tid=" + data;
            }
        });
    }
    //banner收缩
    $(".pure-menu-heading span").click(function () {
        if ($(this).text() == ">") {
            $(".header").stop(true, true).animate({ "width": "100%" }, 600, function () { $(".pure-menu-heading .bn").text("<").addClass("animated lightSpeedIn"); }).show().children().show();
            $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
            $("#menu").css({ "width": "190px", "height": "100%", "overflow-y": "auto" });
            sc = 1;
            $("#layout").css({ "padding-left": "190px" });
            $(".home").show(500);
            $(this).css({ "float": "right" });
            $.cookie("banner", "1");
        }
        else {
            $(".header").stop(true, true).animate({ "width": "0px" }, 600, function () { $(".pure-menu-heading .bn").text(">").addClass("animated lightSpeedIn"); }).hide(600).children().hide(600);
            $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
            $("#menu").css({ "width": "30px", "height": "46px", "overflow-y": "hidden" });
            sc = 0;
            $("#layout").css({ "padding-left": "0px" });
            $(".home").hide(500);
            $(this).css({ "float": "right" });
            $.cookie("banner", "0");
        }
    });
    //获取菜单
    var daclass;
    var ziclass;
    var menu = "";
    $.ajax({
        url: "static_data\\class.json",
        type: "GET",
        async: false,
        success: function (data) {
            daclass = eval(data);
        }
    });
    $.ajax({
        url: "static_data\\ziclass.json",
        type: "GET",
        async: false,
        success: function (data) {
            ziclass = eval(data);
        }
    });
    for (var i = 0; i < daclass.length; i++) {
        var ico = "";
        if (i == 0) ico = '<span class="glyphicon glyphicon-copyright-mark" >&nbsp;';
        if (i == 1) ico = '<span class="glyphicon glyphicon-header">&nbsp;';
        if (i == 2) ico = '<span class="glyphicon glyphicon-fire">&nbsp;';
        menu = '<li class="fenlei pure-menu-item"><a href="javascript:;">' + ico + daclass[i]["class"] + '</span></a><ul class="pure-menu-list erji">';
        for (var j = 0; j < ziclass.length; j++) {
            if (ziclass[j]["class"] == daclass[i]["class"]) {
                menu += '<li class="pure-menu-item"><a href="javascript:;" class="pure-menu-link">>&nbsp;&nbsp;&nbsp;&nbsp;' + ziclass[j]["ziclass"] + '</a></li>';
            }
        }
        menu += '</ul></li>';
        $("#menu .daohang").append(menu);
    }
    menu = "";
    //导航代码
    //$(".fenlei>ul").hide();
    $(".fenlei>a").click(function () {
        //$(".fenlei>ul").not($(this).siblings("ul")).slideUp();
        $(this).next().slideToggle();
    });
    //菜单滚动条控制
    $("#menu").hover(function () {
        if (sc == 1) $(this).css({ "overflow-y": "auto" })
        $("body").css({ "overflow-y": "hidden" });
    }, function () {
        $(this).css({ "overflow-y": "hidden" });
        $("body").css({ "overflow-y": "auto" });
    });
    //登录代码
    $(".login").click(function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: '60%',
            skin: 'layui-layer-rim', //没有背景色
            shadeClose: true,
            content: $('#loginbox')
        });
    });

    //精华管理
    $.ajax({
        url: "static_data\\jinghua.json",
        type: "GET",
        success: function (data) {
            var json = eval(data);
            var k = 0;
            for (i = 0; i < 10; i++) {
                k = 0;
                for (var d in json[i]) {
                    if (k == 0)
                    { $(".jinghua a").eq(i).text(json[i][d]); }
                    else
                    { $(".jinghua p").eq(i).html('<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">22</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + json[i][d] + "</span>"); }
                    k++;
                }
            }
        },
        error: function () {
            alert("error!");
        }
    });
    //热门管理
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "remen" },
        success: function (data) {
            var json = eval(data);
            var k = 0;
            for (var i = 0; i < json.length; i++) {
                $(".ctt-remen a").eq(i).text(json[i]["title"]).attr("href", "wenzhang.aspx?tid=" + json[i]["tid"]);
                $(".ctt-remen p").eq(i).html('<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + json[i]["clicksum"] + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + json[i]["pinglun"] + "</span>");
            }
        },
        error: function () {
            alert("error!");
        }
    });
    //获取最新文章
    gengxin(0,zilei);
    layer.load(1);
    //获取当前用户
    if (!$.cookie("username") && $.cookie("username")!=null) {
        $.ajax(
            {
                url: "Handler.ashx",
                type: "POST",
                data: "cmd=nowuser",
                success: function (data) {
                    if (data != "nologin") {
                        username = data;
                        $(".login").addClass("animated hinge");
                        setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + data + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>'); }, 2000);
                    };
                }
            }
            );
    }
    else {
        username = $.cookie("username");
        //$(".login").addClass("animated hinge"); 
        //setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx">'+username+'</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>'); }, 2000);
        $(".login").html('<a href="user_index.aspx" target="_blank">' + username + '</a>').unbind().append('<a href="user_index.aspx" target="_blank"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>');
    }
    //用户登录
    $("#userlogin").click(function () {
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "userlogin", username: $("#uid").val(), password: $("#pwd").val() },
            success: function (data) {
                if (data == "loginsuccess") {
                    username = $("#uid").val();
                    $.cookie("username", $("#uid").val(), { expires: 1, path: '/' });
                    layer.closeAll();
                    setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + $("#uid").val() + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>'); }, 2000);
                    layer.msg('欢迎回来,' + $("#uid").val() + "！");
                }
                else {
                    layer.alert("帐号或密码错误！");
                }
            },
            error: function () {
                layer.alert("帐号或密码错误！");
            }
        }
              );
    });
    //分页配置
    var pagesize = 0;
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "fenyesum" ,ziclass:zilei},
        async: false,
        success: function (data) {
            pagesize = data;
        }
    });
    $(".tcdPageCode").createPage({
        pageCount: pagesize,
        current: 1,
        backFn: function (p) {
            var page = (p - 1) * 10;
            $(".ctt-zuixin ul").empty();
            gengxin(page);
            $('html,body').animate({ scrollTop: $(".ctt-zuixin").offset().top }, 800);
        }
    });
    //菜单状态
    if ($.cookie("banner") == "0") {
        $(".header").stop(true, true).animate({ "width": "0px" }, 10, function () { $(".pure-menu-heading .bn").text(">").addClass("animated lightSpeedIn"); }).hide(10).children().hide(10);
        $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
        $("#menu").css({ "width": "30px", "height": "46px", "overflow-y": "hidden" });
        sc = 0;
        $("#layout").css({ "padding-left": "0px" });
        $(".home").hide(10);
        $(this).css({ "float": "right" });
        $.cookie("banner") = "0";
    }
    //获取关键字
    if ($.cookie("keyword")) {
        $("#texttitle").val($.cookie("keyword"));
    }
    //高级搜索
    $("#gjsousuo").click(function () {
        window.location.href = "sousuo.aspx?keyword=" + $("#texttitle").val();
        $.cookie("keyword", $("#texttitle").val());
    });
    //菜单点击事件
    $("#menu .pure-menu-link").click(function () {
        var ziclass = $(this).text().replace(">", "").trim();
        window.location.href = "classify.html?ziclass=" + ziclass;
    });
    //主页
    $("#menu .home").click(function () {
        window.location.href = "index.html";
    });
});


function gengxin(page,ziclass) {
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gengxin", page: page ,ziclass:ziclass},
        success: function (data) {
            if (data == "error") {
                layer.msg('没有相应分类的文章!');
                layer.closeAll('loading');
                return;
            }
            //alert(data);
            var json = eval(data);
            var icon = "";
            for (var i = 0, l = json.length; i < l; i++) {
                var name = json[i]["username"];
                var title1 = json[i]["title"];
                var content1 = json[i]["content"];
                var yuedu1 = json[i]["clicksum"];
                var pinglun1 = json[i]["pinglun"];
                var timer1 = json[i]["timer"];
                var pic1 = json[i]["pic"];
                var video1 = json[i]["video"];
                var file1 = json[i]["file"];
                var tid = json[i]["tid"];
                var touxiang = json[i]["touxiang"];
                if (pic1 != "0") { icon += '<span class="glyphicon glyphicon-picture" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (video1 != "0") { icon += '<span class="glyphicon glyphicon-facetime-video" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (file1 != "0") { icon += '<span class="glyphicon glyphicon-file" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                //$(".ctt-zuixin ul").append('<li><div><h4><a href="wenzhang.aspx?tid=' + tid + '" >' + title1 + '</a></h4></div><p>' + content1 + '</p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                $(".ctt-zuixin ul").append('<li><div style="float:left;margin-right:20px;width:50px;text-align:center;overflow:hidden;height:75px;"><img src="' + touxiang + '" style="height:50px;"><a href="user_index.aspx?user=' + name + '" target="_blank">' + name + '</a></div><div><h4><a href="wenzhang.aspx?tid=' + tid + '" >' + title1 + '</a></h4></div><p>' + content1 + '</p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                //class="page-header"
                //$(".ctt-zuixin ul img").remove();
                icon = "";
            }
            layer.closeAll('loading');
        },
        error: function(){layer.alert("error!");}
    });
}

function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}