/// <reference path="../../scripts/jquery.min.js" />
var adminname = "";
$(function () {
    if (!$.cookie("adminname") || $.cookie("adminname") == "null") {
        window.location.href = "adminlogin.aspx";
        return;
    }
    adminname = $.cookie("adminname");
    $(".admin a").text(adminname);
    var bindata;
    $.ajax({
        url: "../adminrequest.aspx",
        type: "post",
        data: { cmd: "remenbankuai" },
        async:false,
        success: function (data) {
            bindata = eval(data);
        }
    });
    //流量统计
    var timedata = new Array(7);
    //今天流量
    $.ajax({
        url: "../adminrequest.aspx",
        type:"POST",
        data: { cmd: "getliuliang" },
        async:false,
        success: function (data) {
            var json = eval(data);
            timedata[0] = 0;
            timedata[1] = json[0]["time00"];
            timedata[2] = json[0]["time4"];
            timedata[3] = json[0]["time8"];
            timedata[4] = json[0]["time12"];
            timedata[5] = json[0]["time16"];
            timedata[6] = json[0]["time20"];
            //for(var i=0;i<json.length;i++)
            //{
            //    timedata[i + 1] = eval("(" + json[i] + ")")[0];
            //}
        }
    });
    //昨日流量
    var timedataz = new Array(7);
    $.ajax({
        url: "../adminrequest.aspx",
        type: "POST",
        data: { cmd: "getliuliangz" },
        async: false,
        success: function (data) {
            var json = eval(data);
            timedataz[0] = 0;
            timedataz[1] = json[0]["time00"];
            timedataz[2] = json[0]["time4"];
            timedataz[3] = json[0]["time8"];
            timedataz[4] = json[0]["time12"];
            timedataz[5] = json[0]["time16"];
            timedataz[6] = json[0]["time20"];
        }
    });
    var lineChartData = {
        labels: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00", "0:00"],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: [0, timedataz[1], timedataz[2], timedataz[3], timedataz[4], timedataz[5], timedataz[6]]
            },
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: [0, timedata[1], timedata[2], timedata[3], timedata[4], timedata[5], timedata[6]]
            }
        ]

    }

    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
    //热门板块分析
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            remen();
            $(window).unbind();
        }
    });
    function remen() {
        var radom_color = function () {//生成随机颜色1
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        }
        var getRandomColor = function () {//生成随机颜色2

            return '#' +
              (function (color) {
                  return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                    && (color.length == 6) ? color : arguments.callee(color);
              })('');
        }
        for (var i = 0; i < bindata.length; i++) {
            bindata[i].value = bindata[i].clicksum;
            delete bindata[i].clicksum;
            bindata[i].label = bindata[i].ziclass;
            delete bindata[i].ziclass;
            bindata[i].color = getRandomColor();
        }
        new Chart(document.getElementById("canvas2").getContext("2d")).Doughnut(bindata);
        for (var i = 0; i < bindata.length; i++) {
            $("#remenbankuai").append('<div style="display:inline-block;height:15px;width:15px;background:' + bindata[i].color + ';"></div><span style="color:' + bindata[i].color + ';">&nbsp;' + bindata[i].label + '</span>&nbsp;&nbsp;&nbsp;&nbsp;');
        }
    }
    //菜单点击
    $(".menu li").eq(0).click(function () {//用户管理
        $(".sousuo").show();
        $("#ssbtn").unbind("click");
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "usermgr.aspx");
        $(".sstext").attr("placeholder", "请输入用户ID或用户名");
        $("#ssbtn").on("click",function () {
            $("#IFRAME1").attr("src", "usermgr.aspx?key="+$(".sstext").val());
        });
    });
    $(".menu li").eq(1).click(function () {//首页管理
        $(".sousuo").hide();
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "shouyemgr.aspx");
        $(".sstext").attr("placeholder", "");
    });
    $(".menu li").eq(2).click(function () {//文章管理
        $(".sousuo").show();
        $("#ssbtn").unbind("click");
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "wenzhangmgr.aspx");
        $(".sstext").attr("placeholder", "文章ID|标题|分类");
        $("#ssbtn").on("click", function () {
            $("#IFRAME1").attr("src", "wenzhangmgr.aspx?key=" + $(".sstext").val());
        });
    });
    $(".menu li").eq(3).click(function () {//菜单管理
        $(".sousuo").hide();
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "fenleimgr.aspx");
        $(".sstext").attr("placeholder", "");
    });
    $(".menu li").eq(4).click(function () {//视频页
        $(".sousuo").show();
        $("#ssbtn").unbind("click");
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "videomgr.aspx");
        $(".sstext").attr("placeholder", "视频ID|标题|分类");
        $("#ssbtn").on("click", function () {
            $("#IFRAME1").attr("src", "videomgr.aspx?key=" + $(".sstext").val());
        });
    });
    $(".menu li").eq(5).click(function () {//模板页
        $(".sousuo").hide();
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "mobanmgr.aspx");
        $(".sstext").attr("placeholder", "");
    });
    $(".menu li").eq(6).click(function () {//管理员
        $(".sousuo").hide();
        $("#rcontent").empty();
        $("#rcontent").append('<iframe id="IFRAME1" style="z-index:103;width:100%;position:relative;height:500px" ></iframe>');
        $("#IFRAME1").attr("src", "adminmgr.aspx");
        $(".sstext").attr("placeholder", "");
    });
    $(".admin").append('<span style="color:#171CE7;cursor:pointer;">注销</span>');
    $(".admin span").hide();
    $(".admin").hover(function () {
        $(this).find("span").show();
    }, function () {
        $(this).find("span").hide();
    });
    $(".admin span").click(function () {
        $.cookie("adminname", null, { expires: 1, path: '/' });
        window.location.href = "adminlogin.aspx";
    });
});