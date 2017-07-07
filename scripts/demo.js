/// <reference path="jquery.min.js" />
$(function () {
    $("#menu ul>li").mouseover(function () {
        $(this).siblings().css("background-color", "#212121").find("ul").hide();
        $(this).css("background-color", "#000");
        $(this).find("ul").slideDown();
    });
    $("#menu").click(function () {
        $(".erji").hide();
    });
});
