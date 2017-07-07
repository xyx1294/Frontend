/// <reference path="jquery.min.js" />
$(function () {
    layer.load();
    //更换最新视频背景
    //for (var i = 0; i < 13; i++) {
    //    $(".jiaobox2 .fengmian").eq(i).css("background", "url(images/video/videobg"+((i%4)+1)+".jpg) no-repeat");
    //}
    //for (var i = 0; i < 7; i++) {
    //    $(".jiaobox2 .vhead").eq(i).css({ "background": "url(images/video/remenbg" + (i + 1) + ".jpg) no-repeat" ,"background-size":"100% 100%"});
    //}
    //$.ajax({
    //    url: "adminrequest.aspx",
    //    type: "POST",
    //    data:{cmd:"jctuijian"}
    //});
    //绑定点击菜单
    $("body").mouseover(function () {
        $("#menu .erji li").click(function () {
            var zilei = $(this).text().trim();
            window.location.href = "index.html?ziclass=" + zilei;
        });
        $(this).unbind();
    });
    //设置标题
    $("title").text("HTML5视频|教程 - 最.前端");
    //收缩菜单
    $("#logo .bn").parent().css("background", "#fff");
    $(".header").css({ "margin-left": "0px" });
    $("#menu").hide();
    sc = 0;
    $("#layout").css({ "padding-left": "0px" });
    $(".home").css("border-bottom", "none");
    $("#logo .bn").animate({ "left": "0" }, 500, function () { $(this).find("img").attr("src", "images/bn2.png"); $(this).animate({ "top": "px" }); });
    //
    $.ajax({
        url: "static_data\\video1.json",
        type: "GET",
        success: function (data) {
            var json = eval(data);
            var ss = "";
            for (var i = 0; i < json.length; i++) {
                var str = json[i]["title"].split(" ");
                ss += '<li><a href="wenzhang.aspx?tid=' + json[i]["tid"] + '" target="_blank">' + str[str.length-1] + '</a></li>';
            }
            $(".jcbox1 ul").append(ss);
        }
    });

    $.ajax({
        url: "static_data\\video2.json",
        type: "GET",
        success: function (data) {
            var json = eval(data);
            var ss = "";
            for (var i = 0; i < json.length; i++) {
                var str = json[i]["title"].split(" ");
                ss += '<li><a href="wenzhang.aspx?tid=' + json[i]["tid"] + '" target="_blank">' + str[str.length - 1] + '</a></li>';
            }
            $(".jcbox2 ul").append(ss);
        }
    });

    $.ajax({
        url: "static_data\\video3.json",
        type: "GET",
        success: function (data) {
            var json = eval(data);
            var ss = "";
            for (var i = 0; i < json.length; i++) {
                var str = json[i]["title"].split(" ");
                ss += '<li><a href="wenzhang.aspx?tid=' + json[i]["tid"] + '" target="_blank">' + str[str.length - 1] + '</a></li>';
            }
            $(".jcbox3 ul").append(ss);
        }
    });

    $.ajax({
        url: "static_data\\video4.json",
        type: "GET",
        success: function (data) {
            var json = eval(data);
            var ss = "";
            for (var i = 0; i < json.length; i++) {
                var str = json[i]["title"].split(" ");
                ss += '<li><a href="wenzhang.aspx?tid=' + json[i]["tid"] + '" target="_blank">' + str[str.length - 1] + '</a></li>';
            }
            $(".jcbox4 ul").append(ss);
        }
    });

    //获取最新视频
    //$.ajax({
    //    url: "Handler.ashx",
    //    type: "POST",
    //    data: {cmd:"newvideo"},
    //    success: function (data) {
    //        var json = eval(data);
    //        for (var i = 0; i < json.length; i++) {
    //            $(".jiaobox2 .uvbox").eq(i).find("span").text(json[i]["ziclass"]);
    //            $(".jiaobox2 .uvbox").eq(i).find("p").text(json[i]["title"]);
    //            $(".jiaobox2 .uvbox").eq(i).find("input").text(json[i]["video"]);
    //            $(".jiaobox2 .uvbox").eq(i).find(".alert").html('<img src="images/video/play.png" />'+"作者："+json[i]["username"]);
    //        }
    //    }
    //});
    //获取最新视频
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "newvideo", videosum: "12" },
        async: false,
        success: function (data) {
            var json = eval(data);
            var pin = "";
            for (var i = 0; i < json.length; i++) {
                var title= json[i]["title"].split(" ");
                $(".jiaobox2 .uvbox").eq(i).find("span").text(json[i]["ziclass"]);
                $(".jiaobox2 .uvbox").eq(i).find("p").html('<a href="wenzhang.aspx?tid='+json[i]["tid"]+'">'+title[title.length-1]+"</a>");
                $(".jiaobox2 .uvbox").eq(i).find("input").val(json[i]["video"]);
                $(".jiaobox2 .uvbox").eq(i).find(".alert").html('<img src="images/video/play.png" />' + "作者：" + json[i]["username"]);
            }
            $(".uvideo").append(pin);
            for (var i = 0; i < json.length; i++) {
                if (json[i]["pic"] != "0") {
                    $(".uvbox").eq(i).find(".fengmian").css({ "background-image": "url(" + json[i]["pic"] + ")" });
                }
                else {
                    Math.random()*
                    $(".uvbox").eq(i).find(".fengmian").css({"background-image":"url(images/video/videobg"+Math.floor(Math.random()*4+1)+".jpg)"});
                }
            }
        }
    });
    //获取热门视频
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "remenvideo" },
        success: function (data) {
            var json = eval(data);
            for (var i = 0; i < json.length; i++) {
                if (json[i]["pic"] != '0') {
                    $(".jiaobox2 .videoremen .video").eq(i).find(".vhead").css({ "background-image": "url(" + json[i]["pic"] + ")" });
                }
                else {
                    $(".jiaobox2 .videoremen .video").eq(i).find(".vhead").css({ "background-image": "url(images/video/videobg" + Math.floor(Math.random() * 4 + 1) + ".jpg)" });
                }
                $(".jiaobox2 .videoremen .video").eq(i).find(".valert").text(json[i]["title"]);
                $(".jiaobox2 .videoremen .video").eq(i).find("input").val(json[i]["video"]);
            }
        }
    });
    layer.closeAll('loading');
    //最新视频
    var videosrc = "";

    $(".jiaobox2 .videozuixin .uvbox").click(function () {
        videosrc = $(this).find("input").val();
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
            //autostart:true//自动播放
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
        var rmclass = $(this).children().eq(0);
        $(rmclass).addClass("animated pulse");
        setTimeout(function () { $(rmclass).removeClass("animated pulse"); }, 1000);
    }, function () {
        $(this).find(".alert").fadeOut(100);
    });
    //热门视频点击
    $(".jiaobox2 .videoremen .video").click(function () {
        videosrc = $(this).find("input").val();
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
            $('html,body').animate({ scrollTop: $(document).scrollTop() - 1 }, 100);
        }, 1000);
    }).hover(function () {
        $(this).addClass("animated pulse");
        $(this).children().css({ "opacity": "0.5" }).find("img").css({ "visibility": "visible" });
    }, function () {
        $(this).removeClass("animated pulse");
        $(this).children().css({ "opacity": "1" }).find("img").css({ "visibility": "hidden" });
    });
    //切换视频
    $("#qiehuan").click(function () {
        $(".videozuixin .uvbox").eq(11).after(($(".uvbox").eq(0)));
    });
    var daohang = new Array("#banner", ".jiaobox1", ".jiaobox2", ".videoremen");
    var k = 0;
    $("#titlelan").animate({ "left": ($(window).width()/2 - 40) + "px" });
    //快速导航
    $("#quick .quick").click(function () {
        if($(this).index()==0)
        {
            if(k!=0)
            {
                --k;
            }
            if (daohang[k] == ".jiaobox1") {
                $("#titlelan").css({ "background": "#F96B52" });
                $("#titlelan").text("学习之路");
            }
            if (daohang[k] == ".jiaobox2") {
                $("#titlelan").css({ "background": "#F9820D" });
                $("#titlelan").text("最新视频");
            }
            if (daohang[k] == ".videoremen") {
                $("#titlelan").css({ "background": "#5ED08B" });
                $("#titlelan").text("热门视频");
            }
            
            if (daohang[k] == ".videoremen") {
                $('html,body').animate({ scrollTop: $(daohang[k]).offset().top-60 }, 800);
            }
            else {
                $('html,body').animate({ scrollTop: $(daohang[k]).offset().top }, 800);
            }
        }
        if ($(this).index() == 1) {
            if (k != 4) {
                ++k;
            }
            if (daohang[k] == ".jiaobox1") {
                $("#titlelan").css({ "background": "#F96B52" });
                $("#titlelan").text("学习之路");
            }
            if (daohang[k] == ".jiaobox2") {
                $("#titlelan").css({ "background": "#F9820D" });
                $("#titlelan").text("最新视频");
            }
            if (daohang[k] == ".videoremen") {
                $("#titlelan").css({ "background": "#5ED08B" });
                $("#titlelan").text("热门视频");
            }
            if (daohang[k] == ".videoremen") {
                $('html,body').animate({ scrollTop: $(daohang[k]).offset().top-60 }, 800);
            }
            else {
                $('html,body').animate({ scrollTop: $(daohang[k]).offset().top }, 800);
            }
        }
    });
    $("#titlelan").click(function () {
        $('html,body').animate({ scrollTop: $(daohang[k]).offset().top }, 800);
    });
    //视频分享排行
    
    $.post("Handler.ashx", { cmd: "videoph" }, function (data) {
        var json = eval(data);
        for (var i = 0; i < json.length; i++) {
            $("#ranking .box").eq(i).find(".col_3").text(json[i]["username"]);
            $("#ranking .box").eq(i).find(".col_4").text(json[i]["sum"]);
        }
        
    });
    //
    $("#quick").css({ "left": ($(window).width()-35)+"px" });
    $("#quick").css({ "top": ($(window).height() / 2 - 17) + "px" });
    $(".quick").hover(function () { 
        $(this).css({ "background": "rgba(248,34,7,0.5)", "color": "#fff" }).siblings().css({ "background": "rgba(255,255,255,0.5)", "color": "#000" });
    }, function () {
        $(this).css({ "background": "rgba(255,255,255,0.5)", "color": "#000" }).siblings().css({ "background": "rgba(255,255,255,0.5)", "color": "#000" });
    });
});
