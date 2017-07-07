/// <reference path="jquery.min.js" />
var timer = 365;
var leixing = 3;
var thisuser = "";
var page = 10;
var zilei = "";
$(function () {
    //设置标题
    $("title").text("高级搜索 - 最.前端");
    $("#thisuser").hover(function () {
        $(this).css({"background-color":"#000"});
    }, function () {
        $(this).css({ "background-color": "#808080" });
    });
    sousuo();
    $("[name='timer']").click(function () {
        timer = $(this).val();
        $("#keyword").empty();
        $("#xiangguan").empty();
        $("#sremen").empty();
        $("#spinglun").empty();
        sousuo();
    });

    $("[name='leixingr']").click(function () {
        leixing = $(this).val();
        $("#keyword").empty();
        $("#xiangguan").empty();
        $("#sremen").empty();
        $("#spinglun").empty();
        sousuo();
    });

    $("#thisuser").click(function () {
        thisuser = $("#usertext").val().trim();
        getuser();
    });

    $("[name='page']").click(function () {
        page = $(this).val();
        $("#keyword").empty();
        $("#xiangguan").empty();
        $("#sremen").empty();
        $("#spinglun").empty();
        sousuo();
    });
    //菜单点击事件
    $("body").mouseover(function () {
        $("#menu .erji li").click(function () {
            zilei = $(this).text().trim();
            $("#keyword").empty();
            $("#xiangguan").empty();
            $("#sremen").empty();
            $("#spinglun").empty();
            sousuo();
        });
        $(this).unbind();
    });

});

function sousuo() {
    layer.load();
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gjsousuo", ss: "1", timer: timer, leixing: leixing, thisuser: thisuser, page: page, zilei: zilei },
        async:false,
        success: function (data) {
            $("#keyword").append(data);
        }
    });

    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gjsousuo", ss: "2", timer: timer, leixing: leixing, thisuser: thisuser, page: page, zilei: zilei },
        async: false,
        success: function (data) {
            $("#xiangguan").append(data);
        }
    });

    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gjsousuo", ss: "3", timer: timer, leixing: leixing, thisuser: thisuser, page: page, zilei: zilei },
        async: false,
        success: function (data) {
            $("#sremen").append(data);
        }
    });

    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gjsousuo", ss: "4", timer: timer, leixing: leixing, thisuser: thisuser, page: page, zilei: zilei },
        async: false,
        success: function (data) {
            $("#spinglun").append(data);
        }
    });
    layer.closeAll('loading');
}

function getuser() {
    layer.load();
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gjsousuo", ss: "5", timer: timer, leixing: leixing, thisuser: thisuser, page: page },
        async: false,
        success: function (data) {
            $("#thisuserbox").append(data);
            $('html,body').animate({ scrollTop: $("#thisuserbox").offset().top - 90+ "px" }, 300);
        }
    });
    layer.closeAll('loading');
}