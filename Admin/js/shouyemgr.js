/// <reference path="../../scripts/jquery.min.js" />
$(function () {
    if (!$.cookie("adminname") || $.cookie("adminname") == null) {
        window.location.href = "adminlogin.aspx";
        return;
    }
    $("table").addClass("table");
    $("table").addClass("table-hover");
    $("table").attr("border", "0px").attr("rules", "0");
    for (var i = 0; i < $("table tr").length; i++) {//过滤标题
        var str = $("table tr").eq(i).find("td").eq(1).text().split(" ");
        $("table tr").eq(i).find("td").eq(1).text(str[str.length - 1]);
        $("table tr").eq(i).find("td").eq(1).append('<a class="edit" href="../fabiao.aspx?tid=' + $("table tr").eq(i).find("td").eq(0).text() + '" target="_blank">编辑文章</a>');
    }
    //编辑文章
    $(".edit").click(function () {
        $.cookie("username", "admin", { expires: 1, path: '/' });
    });
});