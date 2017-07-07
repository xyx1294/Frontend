/// <reference path="jquery.min.js" />
var sc = 1;
var username = "";
var xiabiao = -1;
var wztitle = "";
var zilei = "";
var zxpic;
var lbi = 0;
var luntimer;
$(function () {
    //$.ajax({
    //    url: "request.ashx",
    //    type: "POST",
    //    data: "123",
    //    async: false,
    //    success: function (data) {
    //        alert(data);
    //    }
    //});
    //
    $("#loginbox").hide();
    //载入特效
    //$(".et_pb_widget").hide();
    //$(".ctt-jinghua").hide();
    //$(".ctt-remen").hide();
    //caixi();
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
                if(key ==13){
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
        if ($(this).text() == ">")
        {
            //$(".header").stop(true, true).animate({ "width": "100%" }, 600, function () { $(".pure-menu-heading .bn").text("<").addClass("animated lightSpeedIn"); }).show().children().show();
            $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
            $(".header").css({ "margin-left": "-190px" });
            $("#menu").css({ "width": "190px", "height": "100%", "overflow-y": "auto" });
            sc = 1;
            $("#layout").css({ "padding-left": "190px" });
            $(".home").show(500);
            $(this).css({ "float": "right" });
            $(".pure-menu-heading .bn").text("<").addClass("animated lightSpeedIn");
            $.cookie("banner", "1", { expires: 1, path: '/' });
        }
        else
        {
            //$(".header").stop(true, true).animate({ "width": "0px" }, 600, function () { $(".pure-menu-heading .bn").text(">").addClass("animated lightSpeedIn"); }).hide(600).children().hide(600);
            $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
            $(".header").css({"margin-left":"0px"});
            $("#menu").css({ "width": "30px", "height": "46px", "overflow-y": "hidden" });
            sc=0;
            $("#layout").css({ "padding-left": "0px" });
            $(".home").hide(500);
            $(this).css({ "float": "right" });
            $(".pure-menu-heading .bn").text(">").addClass("animated lightSpeedIn");
            $.cookie("banner", "0", { expires: 1, path: '/' });
        }
    });
    //获取菜单
    var daclass;
    var ziclass;
    var menu="";
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
        menu = '<li class="fenlei pure-menu-item"><a href="javascript:;">'+ico + daclass[i]["class"] + '</span></a><ul class="pure-menu-list erji">';
        for (var j = 0; j < ziclass.length; j++) {
            if (ziclass[j]["class"] == daclass[i]["class"]) {
            menu += '<li class="pure-menu-item"><a href="javascript:;" class="pure-menu-link">>&nbsp;&nbsp;&nbsp;&nbsp;' + ziclass[j]["ziclass"] + '</a></li>';
            }
        }
        menu += '</ul></li>';
        $("#menu .daohang").append(menu);
    }
    menu = "";
    //菜单点击事件
    $("#menu .pure-menu-link").click(function () {
        clearInterval(timer);
        zilei = $(this).text().replace(">", "").trim();
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
    //$(".login").click(function () {
    //    layer.open({
    //        type: 1,
    //        title: false,
    //        closeBtn: 0,
    //        area: '60%',
    //        skin: 'layui-layer-rim', //没有背景色
    //        shadeClose: true,
    //        content: $('#loginbox')
    //    });
    //});

    //精华管理
    //$.ajax({
    //    url: "static_data\\jinghua.json", 
    //    type: "GET",
    //    success: function (data) {
    //        var json = eval(data);
    //        var k=0;
    //        for (var i = 0; i < 10; i++) {
    //            $(".ctt-jinghua a").eq(i).text(json[i]["lab"]); 
    //            $(".ctt-jinghua p").eq(i).html('<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + json[i]["click"] + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + json[i]["comment"] + "</span>");
    //            }
    //     },
    //    error: function () {
    //        alert("error!");
    //     }
    //});
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "jinghua" },
        success: function (data) {
            var json = eval(data);
            var k = 0;
            for (var i = 0; i < json.length; i++) {
                $(".ctt-jinghua a").eq(i).text(json[i]["title"]).attr("href", "wenzhang.aspx?tid=" + json[i]["tid"]);
                $(".ctt-jinghua p").eq(i).html('<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + json[i]["clicksum"] + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + json[i]["pinglun"] + "</span>");
            }
        },
        error: function () {
            layer.alert("精华内容采集失败！");
        }
    });
    //热门管理
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data:{cmd:"remen"},
        success: function (data) {
            var json = eval(data);
            var k = 0;
            for (var i = 0; i < json.length; i++) {
                $(".ctt-remen a").eq(i).text(json[i]["title"]).attr("href", "wenzhang.aspx?tid=" + json[i]["tid"]);
                $(".ctt-remen p").eq(i).html('<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + json[i]["clicksum"] + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + json[i]["pinglun"] + "</span>");
            }
        },
        error: function () {
            layer.alert("热门内容采集失败！");
        }
    });
    //用户登录
    //$("#userlogin").click(function () {
    //    $.ajax({
    //        url: "Handler.ashx",
    //        type: "POST",
    //        data: {cmd:"userlogin",username:$("#uid").val(),password:$("#pwd").val()},
    //        success: function (data) {
    //            if (data == "loginsuccess") {
    //                $.cookie("username", $("#uid").val());
    //                layer.closeAll();
    //                $(".login").addClass("animated hinge");
    //                setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + $("#uid").val() + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="images\\touxiang.png" style="height:50px;width:auto;" /></a>'); }, 2000);
    //                layer.msg('欢迎回来,' + $("#uid").val()+"！");
    //            }
    //            else {
    //                layer.alert("帐号或密码错误！");
    //            }
    //        },
    //        error:function(){
    //            layer.alert("帐号或密码错误！");
    //        }
    //    }
    //          );
    //});
    //用户信息
    function usershow() {
        layer.alert("show");
    }
    //用户信息
    function userhide() {
        layer.alert("hide");
    }
    //获取最新文章
    gengxin(0,"");
    layer.load(1);
    //获取当前用户
    if (!$.cookie("username") || $.cookie("username")=="null") {
        $.ajax({
                url: "Handler.ashx",
                type: "POST",
                data: "cmd=nowuser",
                success: function (data) {
                    if (data != "nologin") {
                        var json = eval(data);
                        username = json[0]["username"];
                        $(".login").addClass("animated hinge");
                        setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + json[0]["username"] + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx" target="_blank"><img src="' + json[0]["touxiang"] + '" style="height:50px;width:50px;" /></a><p style="width:100%;text-align:center;color:#F97F05;display:none;cursor:pointer;">注销</p>'); zhuxiao(); }, 2000);
                    }
                }
        });
    }
    else {
        username = $.cookie("username");
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: {cmd:"usertouxiang",username:username},
            success: function (data) {
                var json = eval(data);
                $(".login").addClass("animated hinge");
                setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx">' + username + '</a>').addClass("animated bounceInDown").unbind().append('<a href="user_index.aspx"><img src="' + json[0]["touxiang"] + '" style="height:50px;width:50px;" /></a><p style="width:100%;text-align:center;color:#F97F05;display:none;cursor:pointer;">注销</p>'); zhuxiao(); }, 2000);
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
    //获取分页
    fenye();
    //菜单状态
    if ($.cookie("banner") == "0") {
        $(".pure-menu-heading .bn").removeClass("animated lightSpeedIn");
        $(".header").css({ "margin-left": "0px" });
        $("#menu").css({ "width": "30px", "height": "46px", "overflow-y": "hidden" });
        sc = 0;
        $("#layout").css({ "padding-left": "0px" });
        $(".home").hide(500);
        $(this).css({ "float": "right" });
        $(".pure-menu-heading .bn").text(">").addClass("animated lightSpeedIn");
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
    //获取最新视频
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "newvideo", videosum:"9" },
        async: false,
        success: function (data) {
            var json = eval(data);
            var pin = "";
            for (var i = 0; i < json.length; i++) {
                var content = json[i]["title"].split(" ");
                pin += '<div class="pure-u-1-4 uvbox"><div class="fengmian1"><span>' + json[i]["ziclass"] + '</span><div class="alert"><img src="images/video/play.png" /></div></div><p><a href="wenzhang.aspx?tid=' + json[i]["tid"] + '">' + content[content.length-1] + '</a></p><input type="hidden" value="' + json[i]["video"] + '" /></div>'
            }
            $(".uvideo").append(pin);
            for (var i = 0; i < json.length; i++) {
                if (json[i]["pic"] != "0") {
                    $(".uvbox").eq(i).find(".fengmian1").css({"background-image":"url("+json[i]["pic"]+")"});
                }
            }
        }
    });
    //视频点击
    var videosrc = "";
    $(".uvideo .fengmian1").click(function () {
        videosrc = $(this).siblings("input").val();

        jwplayer("player").setup({
            skin: "video\\glow.zip",
            stretching: "fill",
            flashplayer: "video\\player.swf",
            image: "22.jpg",
            width: 800,
            height: 540,
            levels: [{ file: videosrc }],
            events: {
                onReady: function () { this.play(); },//自动播放
                onVolume: function (event) { alert("the new volume is" + event.volume); }
            }
        });
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true,
            area: '800px',
            skin: 'yourclass',
            content: $("#videobox")
        });
        setTimeout(function () {
            $('html,body').animate({ scrollTop: $(document).scrollTop() + 1 }, 100);
        }, 1000);
        //iframe层-多媒体
        //layer.open({
        //    type: 2,
        //    title: false,
        //    area: ['630px', '360px'],
        //    shade: 0.8,
        //    closeBtn: 0,
        //    shadeClose: true,
        //    content: 'http://player.youku.com/embed/XMjY3MzgzODg0'
        //});
    }).hover(function () {
        $(this).find(".alert").fadeIn(100);
        $(this).addClass("animated pulse");
        var rmclass = this;
        setTimeout(function () { $(rmclass).removeClass("animated pulse"); }, 1000);
    }, function () {
        $(this).find(".alert").fadeOut(100);
    });
    //轮播图片
    //获取最新文章图片和标题
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "getzxwzpic" },
        success: function (data) {
            zxpic = eval(data);
            lunbowz();
            luntimer = setInterval(lunbowz, 3000);
        }
    });
    $("#lunbowz").hover(function () {
        clearInterval(luntimer);
    }, function () {
        luntimer = setInterval(lunbowz, 3000);
    });
    $(".lbtn").mouseover(function () {
        $(".tit a").attr("href", "wenzhang.aspx?tid=" + zxpic[$(this).index()]["tid"]);
        $(".tit a").text(zxpic[$(this).index()]["title"]);
        $("#lunbowz").css("background-image", "url(" + zxpic[$(this).index()]["pic"] + ")");
        $(".lbtn").eq($(this).index()).css("background", "rgb(255, 140, 60)").siblings().css("background", "#808080");
    });
    //获取最新动态
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "dongtai" },
        success: function (data) {
            var json = eval(data);
            var timer;
            for (var i = 0; i < json.length; i++) {
                $(".zxdt").eq(i).find("img").attr("src", json[i]["touxiang"]);
                $(".dongtai").eq(i).append(json[i]["content"]);
                timer = json[i]["timer"];
                $(".dongtai").eq(i).append("<p>"+timer+"</p>");
            }
        }
    });
    //猜你想看
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "cainikan" },
        success: function (data) {
            var json = eval(data);
            for (var i = 0; i < json.length; i++) {
                var title = json[i]["title"].split(" ");
                $(".widget_list li").eq(i).find(".widget_list_thumbnail").attr("href", "user_index.aspx?user=" + json[i]["username"]);
                $(".widget_list li").eq(i).find("img").attr("src", json[i]["touxiang"]);
                $(".widget_list li").eq(i).find(".post_info a").attr("href", "wenzhang.aspx?tid=" + json[i]["tid"]).text(title[title.length-1]);
                var edittimer = json[i]["timer"].split(" ");
                $(".widget_list li").eq(i).find(".updated").text(edittimer[0].replace(/\//g, "-"));
            }
        }
    });
    //猜你想学
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "cainixue" },
        success: function (data) {
            var json = eval(data);
            for (var i = 0; i < json.length; i++) {
                var title = json[i]["title"].split(" ");
                $("#xue .widget_list li").eq(i).find(".widget_list_thumbnail").attr("href", "user_index.aspx?user=" + json[i]["username"]);
                $("#xue .widget_list li").eq(i).find("img").attr("src", json[i]["touxiang"]);
                $("#xue .widget_list li").eq(i).find(".post_info a").attr("href", "wenzhang.aspx?tid=" + json[i]["tid"]).text(title[title.length - 1]);
                var edittimer = json[i]["timer"].split(" ");
                $("#xue .widget_list li").eq(i).find(".updated").text(edittimer[0].replace(/\//g, "-"));
            }
        }
    });
    
});
var timer;
function gengxin(page, ziclass) {
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gengxin", page: page, ziclass: ziclass },
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
                var content1 = delHtmlTag(json[i]["content"]);
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
                if (file1 != "") { icon += '<span class="glyphicon glyphicon-file" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                //$(".ctt-zuixin ul").append('<li><div><h4><a href="wenzhang.aspx?tid=' + tid + '" >' + title1 + '</a></h4></div><p>' + content1 + '</p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                $(".ctt-zuixin ul").append('<li class="zxwz"><div style="float:left;margin-right:20px;width:50px;text-align:center;overflow:hidden;height:75px;"><img src="' + touxiang + '" style="height:50px;"><a href="user_index.aspx?user=' + name + '" target="_blank">' + name + '</a></div><div><h4><a href="wenzhang.aspx?tid=' + tid + '"  target="_blank">' + title1 + '</a></h4></div><p>' + content1 + '</p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                //class="page-header"
                //$(".ctt-zuixin ul img").remove();
                icon = "";
            }
            if (ziclass != "") {
                $(".ctt-zuixin ul .zxwz").hide();
                timer = setInterval(texiao, 100);
            }
            layer.closeAll('loading');
        },
        error: function () { layer.alert("文章获取失败!"); }
    });
}

//分页配置
function fenye(ziclass) {
    var pagesize = 0;
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "fenyesum", ziclass: ziclass },
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
            gengxin(page, zilei);
            $('html,body').animate({ scrollTop: $(".ctt-zuixin").offset().top }, 800);
        }
    });
}

function caixi() {
    $(".et_pb_widget").show().addClass("animated fadeInRight");
    setTimeout(jinghua, 500);
}
function jinghua() {
    $(".ctt-jinghua").show().addClass("animated fadeInRight");
    setTimeout(remen, 500);
}
function remen() {
    $(".ctt-remen").show().addClass("animated fadeInRight");
    setTimeout(qtexiao, 1000);
}
function qtexiao() {
    $(".et_pb_widget").removeClass("animated fadeInRight");
    $(".ctt-jinghua").removeClass("animated fadeInRight");
    $(".ctt-remen").removeClass("animated fadeInRight");
}

var t = 0;
function texiao() {//文章载入特效
    if (t < 9) {
        $(".ctt-zuixin .zxwz").eq(t).show().addClass("animated bounceInRight");
        t++;
    }
    else
    {
        setTimeout(qumohuan, 1000);
        t = 0;
        clearInterval(timer);
    }
}
function qumohuan() {//去除模糊
    $(".ctt-zuixin .zxwz").removeClass("animated bounceInRight");
}

function lunbowz() {
    $(".tit a").attr("href", "wenzhang.aspx?tid=" + zxpic[lbi]["tid"]);
    $(".tit a").text(zxpic[lbi]["title"]);
    $("#lunbowz").css("background-image", "url(" + zxpic[lbi]["pic"] + ")");
    $(".lbtn").eq(lbi).css("background", "rgb(255, 140, 60)").siblings().css("background", "#808080");
    if (lbi == 2) {
        lbi = 0;
    }
    else {
        lbi++;
    }

}
function delHtmlTag(str) {
    return str.replace(/<[^<>]+>/g, "").replace(/<[^>]+>/g, "").replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/span/g, "").replace(/</g, "").replace(/&nbsp;/g, "");//去掉所有的html标记
}