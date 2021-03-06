﻿/// <reference path="jquery.min.js" />
var zilei = "";
var sc = 1;
$(function () {
    zilei = decodeURIComponent(request("ziclass"));
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
    gengxin(0, "animation");
    layer.load(1);
    //获取当前用户
    if (!$.cookie("username") || $.cookie("username") == "null") {
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
    //分页配置
    var pagesize = 0;
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "fenyesum", ziclass: zilei },
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
});


function gengxin(page, ziclass) {
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gengxin", page: page, ziclass: zilei },
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
        error: function () { layer.alert("error!"); }
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