/// <reference path="jquery.min.js" />
$(function () {
    var imgt = request("img");
    $("#img").attr("src", imgt);
    $("#img").load(function () {
        var imgw = parseInt($("#img").css("width").replace("px"));
        if (imgw > $(window).width()) {
            $('html,body').animate({ scrollLeft: (imgw - $(window).width()) / 2 }, 300);
        }
        else {
            $("div").css({ "width": imgw + "px", "margin": "auto" });
        }
    });
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
});