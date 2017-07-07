/// <reference path="jquery.min.js" />
var sc = 1;
var username = "";
$(function () {
    $("#loginbox").hide();
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
    $("#logo .bn").click(function () {
        if ($.cookie("banner") == "0" || $.cookie("banner") == "null") {
            $(this).parent().css("background", "#3A3A3A");
            $(".header").css({ "margin-left": "-190px" });
            $("#menu").show(500);
            sc = 1;
            $("#layout").css({ "padding-left": "190px" });
            $(".home").css("border-bottom", "solid 2px #8C877A");
            $(this).animate({ "left": "165px" }, 500, function () { $(this).find("img").attr("src", "images/bn.png"); $(this).animate({ "top": "0px" }); });
            //$(this).css({ "float": "right" });
            $.cookie("banner", "1", { expires: 1, path: '/' });
        }
        else {
            //$(this).parent().removeClass("animated lightSpeedIn");
            $(this).parent().css("background", "#fff");
            $(".header").css({ "margin-left": "0px" });
            //$("#menu").css({ "width": "30px", "height": "46px", "overflow-y": "hidden" });
            $("#menu").hide(500);
            sc = 0;
            $("#layout").css({ "padding-left": "0px" });
            $(".home").css("border-bottom", "none");
            $(this).animate({ "left": "0" }, 500, function () { $(this).find("img").attr("src", "images/bn2.png"); });
            //$(this).css({ "float": "right" });
            $.cookie("banner", "0", { expires: 1, path: '/' });
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
        menu = '<li class="fenlei pure-menu-item"><a href="javascript:;" style="font-size:16px;">' + "<span style='font-size:25px;'>+</span>" + "&nbsp;" + daclass[i]["class"] + '</span></a><ul class="pure-menu-list erji">';
        for (var j = 0; j < ziclass.length; j++) {
            if (ziclass[j]["class"] == daclass[i]["class"]) {
                menu += '<li class="pure-menu-item"><a href="javascript:;" class="pure-menu-link">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + ziclass[j]["ziclass"] + '</a></li>';
            }
        }
        menu += '</ul></li>';
        $("#menu .daohang").append(menu);
    }
    menu = "";
    //菜单点击事件
    $("#menu .pure-menu-link").click(function () {
        clearInterval(timer);
        zilei = $(this).text().trim();
        //window.location.href = "classify.html?ziclass=" + ziclass;
        $(".ctt-zuixin ul").empty();
        gengxin(0, zilei);
        fenye(zilei);
        $('html,body').animate({ scrollTop: $(".ctt-zuixin").offset().top }, 800);
    });
    //主页
    $("#menu .home").click(function () {
        window.location.href = "index.html";
    });
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
    //用户登录
    //$("#userlogin").click(function () {
    //    $.ajax({
    //        url: "Handler.ashx",
    //        type: "POST",
    //        data: { cmd: "userlogin", username: $("#uid").val(), password: $("#pwd").val() },
    //        success: function (data) {
    //            if (data == "loginsuccess") {
    //                $.cookie("username", $("#uid").val());
    //                layer.closeAll();
    //                $(".login").addClass("animated hinge");
    //                setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + $("#uid").val() + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>'); }, 2000);
    //                layer.msg('欢迎回来,' + $("#uid").val() + "！");
    //            }
    //            else {
    //                layer.alert("帐号或密码错误！");
    //            }
    //        },
    //        error: function () {
    //            layer.alert("帐号或密码错误！");
    //        }
    //    }
    //          );
    //});
    //获取当前用户
    if (!$.cookie("username") || $.cookie("username") == "null") {
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: "cmd=nowuser",
            success: function (data) {
                if (data != "nologin") {
                    var json = eval(data);
                    username = json[0]["username"];
                    $(".login").addClass("animated hinge");
                    setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + json[0]["username"] + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx" target="_blank"><img src="' + json[0]["touxiang"] + '" style="height:50px;width:50px;border-radius:100%;" /></a><p style="width:100%;text-align:center;color:#F97F05;display:none;cursor:pointer;">注销</p>'); zhuxiao(); }, 2000);
                }
            }
        });
    }
    else {
        username = $.cookie("username");
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "usertouxiang", username: username },
            success: function (data) {
                var json = eval(data);
                $(".login").addClass("animated hinge");
                setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx">' + username + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="' + json[0]["touxiang"] + '" style="height:50px;width:50px;border-radius:100%;" /></a><p style="width:100%;text-align:center;color:#F97F05;display:none;cursor:pointer;">注销</p>'); zhuxiao(); }, 2000);
                //$(".login").html('<a href="user_index.aspx" target="_blank">' + username + '</a>').unbind().append('<a href="user_index.aspx" target="_blank"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>');
            }
        });
    }
    //绑定注销
    function zhuxiao() {
        $(".login p").click(function () {
            $.post("Handler.ashx", { cmd: "clearuser" }, function (data) {
                username = "";
                $.cookie("username", null, { expires: 1, path: '/' });
                window.location.href = window.location.href;
            });
        });
        $(".login img").hover(function () {
            $(".login p").slideDown();
        }, function () {
            setTimeout(function () { $(".login p").slideUp(); }, 3000);
        });
    };
    //菜单状态
    if ($.cookie("banner") == "0") {
        $("#logo .bn").parent().css("background", "#fff");
        $(".header").css({ "margin-left": "0px" });
        $("#menu").hide();
        sc = 0;
        $("#layout").css({ "padding-left": "0px" });
        $(".home").css("border-bottom", "none");
        $("#logo .bn").animate({ "left": "0" }, 500, function () { $(this).find("img").attr("src", "images/bn2.png"); });
    }
    //获取关键字
    if ($.cookie("keyword")) {
        $("#texttitle").val($.cookie("keyword"));
    }
    //高级搜索
    $("#gjsousuo").click(function () {
        window.location.href = "sousuo.aspx?keyword=" + $("#texttitle").val();
        $.cookie("keyword", $("#texttitle").val(), { expires: 1, path: '/' });
    });

});
