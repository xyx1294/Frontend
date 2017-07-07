/// <reference path="jquery.min.js" />
var timer;
$(function () {
    //设置标题
    $("title").text("网页模板 - 最.前端");
    //收缩菜单
    $("#logo .bn").parent().css("background", "#fff");
    $(".header").css({ "margin-left": "0px" });
    $(".header").css({ "background": "#fff" });
    $("#menu").hide();
    sc = 0;
    $("#layout").css({ "padding-left": "0px" });
    $(".home").css("border-bottom", "none");
    $("#logo .bn").animate({ "left": "0" }, 500, function () { $(this).find("img").attr("src", "images/bn2.png"); $(this).animate({ "top": "px" }); });
    //绑定点击菜单
    $("body").mouseover(function () {
        $("#menu .erji li").click(function () {
            var zilei = $(this).text().trim();
            window.location.href = "index.html?ziclass=" + zilei;
        });
        $(this).unbind();
    });
    $.get("static_data\\remenmoban.json", function (data) {//获取热门模版
        var json = eval(data);
        for (var i = 0; i < json.length; i++) {//热门模版添加
            $("#lunbo ul").append('<li>' + '<a href="' + json[i]["down"] + '"><img src="' + json[i]["img"] + '" style="width:150px;height:150px;display:block;margin:5px auto;" /></a>' + '<a href="' + json[i]["down"] + '" style="display:inline-block;margin-top:10px;text-decoration:none;color:#000;font-size:13px;width:162px;text-align:center;">' + json[i]["title"] + '</a></li>');
        }
        $("#pic img").hover(function () {
            $(this).addClass("animated pulse");
        }, function () {
            $(this).removeClass("animated pulse");
        });
    });
    $.get("static_data\\moban.json", function (data) {//获取最新模版
        var json = eval(data);
        for (var i = 0; i<json.length; i++) {
            $(".zxweb li img").eq(i).attr("src", json[i]["img"]);
            $(".zxweb li .zximg a").eq(i).attr("href", "zhanshi.html?img="+json[i]["img2"]);
            $(".zxweb li").eq(i).find(".title a").attr("href", json[i]["down"]).text(json[i]["title"]);
        }
    });
    //for (var i = 0; i < 21; i++) {//热门模版添加
    //    $("#lunbo ul").append('<li>' + '<img src="images\\moban\\' + (i + 1) + '.jpg" style="width:150px;height:150px;display:block;margin:5px auto;" />' + '<a href="#" style="display:inline-block;margin-top:10px;text-decoration:none;color:#000;font-size:13px;width:162px;text-align:center;">网站名称</a></li>');
    //}
    timer = setInterval(bt2, 3000);
    $("#lunbo li").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(bt2, 3000);
    });
    $(".lbbtn").hover(function () {
        $(this).css({"opacity":"1"});
    }, function () {
        $(this).css({ "opacity": "0.5" });
    });
    $("#bt1").click(function () {
        bt1();
    });
    $("#bt2").click(function () {
        bt2();
    });
    texiao();
    function texiao() {
        $(".zximg img").hover(function () {
            $(this).addClass("animated pulse");
        }, function () {
            $(this).removeClass("animated pulse");
        });
    }
    //无限加载
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            var rand = Math.floor(Math.random() * 11);
            var rand2 = Math.floor(Math.random() * 11);
            while ( rand2 == rand || rand2 == rand3 || rand2 == rand4) {
                rand2 = Math.floor(Math.random() * 11);
            }
            var rand3 = Math.floor(Math.random() * 11);
            while (rand3 == rand || rand3 == rand2 || rand3 == rand4) {
                rand3 = Math.floor(Math.random() * 11);
            }
            var rand4 = Math.floor(Math.random() * 11);
            while (rand4 == rand || rand4 == rand2 || rand4 == rand3) {
                rand4 = Math.floor(Math.random() * 11);
            }
            $(".zxweb ul").append('<li><span class="zximg"><a href="' + $(".zxweb li").eq(rand).find(".zximg a").attr("href") + '" target="_blank"><img src="' + $(".zxweb li").eq(rand).find("img").attr("src") + '" border="0" alt="' + $(".zxweb li").eq(rand).find(".title a").text() + '" /></a></span><span class="title"><a href="' + $(".zxweb li").eq(rand).find(".title a").attr("href") + '" target="_blank">' + $(".zxweb li").eq(rand).find(".title a").text() + '</a></span></li><li><span class="zximg"><a href="' + $(".zxweb li").eq(rand2).find(".zximg a").attr("href") + '" target="_blank"><img src="' + $(".zxweb li").eq(rand2).find("img").attr("src") + '" border="0" alt="' + $(".zxweb li").eq(rand2).find(".title a").text() + '" /></a></span><span class="title"><a href="' + $(".zxweb li").eq(rand2).find(".title a").attr("href") + '" target="_blank">' + $(".zxweb li").eq(rand2).find(".title a").text() + '</a></span></li><li><span class="zximg"><a href="' + $(".zxweb li").eq(rand3).find(".zximg a").attr("href") + '" target="_blank"><img src="' + $(".zxweb li").eq(rand3).find("img").attr("src") + '" border="0" alt="' + $(".zxweb li").eq(rand3).find(".title a").text() + '" /></a></span><span class="title"><a href="' + $(".zxweb li").eq(rand3).find(".title a").attr("href") + '" target="_blank">' + $(".zxweb li").eq(rand3).find(".title a").text() + '</a></span></li><li><span class="zximg"><a href="' + $(".zxweb li").eq(rand4).find(".zximg a").attr("href") + '" target="_blank"><img src="' + $(".zxweb li").eq(rand4).find("img").attr("src") + '" border="0" alt="' + $(".zxweb li").eq(rand4).find(".title a").text() + '" /></a></span><span class="title"><a href="' + $(".zxweb li").eq(rand4).find(".title a").attr("href") + '" target="_blank">' + $(".zxweb li").eq(rand4).find(".title a").text() + '</a></span></li>');
            texiao();
        }
    });
        $(".da .main").css({ "max-width": "1100px" });
});
function bt1() {
    $("#lunbo ul").prepend($("#lunbo li").eq(9));
}
function bt2() {
        $("#pic").animate({ "overflow": "scroll", scrollLeft: "+=" + 202 + "px", "overflow": "hidden" });
        $("#lunbo ul").append($("#lunbo li").eq(0));
        $("#pic").css({ "overflow": "scroll", "scrollLeft": "0px", "overflow": "hidden" });
}
