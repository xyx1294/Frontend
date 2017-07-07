/// <reference path="jquery.min.js" />
var username = "";
var touxiang = "";
$(function () {
    //收缩菜单
    //$("#logo .bn").parent().css("background", "#fff");
    //$(".header").css({ "margin-left": "0px" });
    //$("#menu").hide();
    //sc = 0;
    //$("#layout").css({ "padding-left": "0px" });
    //$(".home").css("border-bottom", "none");
    //$("#logo .bn").animate({ "left": "0" }, 500, function () { $(this).find("img").attr("src", "images/bn2.png"); $(this).animate({ "top": "px" }); });
    //绑定点击菜单
    $("body").mouseover(function () {
        $("#menu .erji li").click(function () {
           var zilei = $(this).text().trim();
           window.location.href = "index.html?ziclass=" + zilei;
        });
        $(this).unbind();
    });
    //获取文章和评论
    layer.load(1);
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "wenzhang" },
        async: false,
        success: function (data) {
            var json = eval(data);
            var content = json[0]["content"];
            var title = json[0]["title"];
            var user = json[0]["username"];
            var timer = json[0]["timer"];
            var read=json[0]["clicksum"];
            var huifu = json[0]["pinglun"];
            var touxiang = json[0]["touxiang"];
            $(".wztitle strong").text(title);
            $("#lzctt").html(content + '<span id="lztimer">' + timer + '</span><div class="bshare-custom icon-medium" style="margin-top:20px;"><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到网易微博" class="bshare-neteasemb"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div><script type="text/javascript" charset="utf-8" src="scripts/fenxiang/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=1&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="scripts/fenxiang/bshareC0.js"></script>');
            $("#readhuifu").text("阅读(" + read + ") 回复(" + huifu + ") ");
            $("#readhuifu").append('<span class="glyphicon glyphicon-star" style="color: rgb(255, 140, 60);"><a href="javascript:;" id="shoucang">收藏</a></span>&nbsp;');
            $("#readhuifu").append('<span class="glyphicon glyphicon-edit" style="color: rgb(255, 140, 60);"><a href="fabiao.aspx?tid=' + request("tid") + '">编辑</a></span>');
            $(".usdata span").eq(0).text(user);
            $("#wzbox .usdata img").attr("src",touxiang);
            //文章阴影特效
            $("#wzbox").hover(function () {
                $(this).addClass("yinying");
            }, function () {
                $(this).removeClass("yinying");
            });
            $.ajax(
                {
                    url: "Handler.ashx",
                    type: "POST",
                    data: { cmd: "pinglun" },
                    async:false,
                    success: function (data) {
                        var json = eval(data);
                        if (data != "") {
                            for (var i = 0, l = json.length; i < l; i++) {
                                var username = json[i]["username"];
                                var title = json[i]["title"];
                                var content = json[i]["content"];
                                var timer = json[i]["timer"];
                                var dianping = "";
                                var pid = json[i]["pid"];
                                var touxiang2 = json[i]["touxiang"];
                                if (json[i]["dianping"] != null) {
                                    dianping = json[i]["dianping"];
                                }
                                else {
                                    dianping = "";
                                }
                                $("#pinglun").append('<div class="plbox"><div class="pure-g"><div class="pure-u-1-5 usdata"><img src="'+touxiang2+'"/><span>' + username + '</span><a href="javascript:;" class="haoyou">加为好友</a></div><div class="pure-u-4-5 uscontent">' + content + '<input type="hidden" value="' + pid + '" id="pid" /><span class="button button-primary button-rounded button-small dianp">点评'+(i+1)+'楼</span><div style="clear:both;"></div><span id="pingluntimer">' + timer + '</span><div style="clear:both;"></div>' + dianping + '</div></div></div>');
                            };
                        }

                        //评论阴影特效
                        $(".plbox").hover(function () {
                            $(this).addClass("yinying");
                        }, function () {
                            $(this).removeClass("yinying");
                        });
                        //加为好友
                        $(".haoyou").click(function () {
                            if ($.cookie("username")) {
                                $.ajax({
                                    url: "Handler.ashx",
                                    type: "POST",
                                    data: { cmd: "addfriend", name: $.cookie("username"),fname:$(this).siblings("span").text()},
                                    success: function (data) {
                                        layer.alert(data);
                                    }
                                });
                            }
                            else {
                                layer.alert("你还没有登录呢！");
                            }
                        });
                    }
                }
                );
            layer.closeAll('loading');
        },
        error:function(){
            layer.alert("error");
            layer.closeAll('loading');
    }
    });
    //设置标题
    $("title").text($(".wztitle strong").text() + " - 最.前端");
    //点评信息获取
    for (var j = 0; j < $(".dianping").length; j++) {
        var uid = $(".dianping").eq(j).find("#uid").val();
        //点评头像
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "usertouxiang2", uid: uid },
            async:false,
            success: function (data) {
                $(".dianping").eq(j).find("#uid").siblings("img").attr("src", data);
            }
        });
        //点评昵称
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "getname", uid:uid},
            async: false,
            success: function (data) {
                $(".dianping").eq(j).find("a").attr("href", "user_index.aspx?user=" + data).text(data);
            }
        });
    }
    //点评窗口
    $(".dianp").click(function () {
        var dp = $(this).parent();
        if ($.cookie("username")) {
            layer.open({
                type: 1,
                title: "回复层主↓",
                area: '520px',
                closeBtn: 1,
                shadeClose: true,
                skin: 'yourclass',
                content: '<div style="width:500px;height:50px;margin:10px;"><input style="width:400px;height:30px;" type="input" /><div style="height:30px;width:60px;background:#1B9AF7;display:inline-block;text-align:center;line-height:30px;color:#fff;margin-left:10px;cursor:pointer;" id="dpok">确定</div></div>'
            });
            //点评确定
            $("#dpok").click(function () {
                var dianp = "";
                var dptext = $(this).siblings("input").val();
                //获取UID
                $.ajax({
                    url: "Handler.ashx",
                    type: "POST",
                    data: { cmd: "getuid", username: $.cookie("username") },
                    async: false,
                    success: function (data) {
                        dianp = '<div class="dianping animated fadeInRight"><input type="hidden" value="' + data + '" id="uid" /><img src="' + $(".login img").attr("src") + '" style="width:36px;height:36px;" /><a href="user_index.aspx?user=' + $.cookie("username") + '" style="margin-left:10px;display:inline-block;">' + $.cookie("username") + '</a>：' + dptext + '</div>';
                    }
                });
                $.ajax({
                    url: "Handler.ashx",
                    type: "POST",
                    data: { cmd: "dianping", pid:dp.children("#pid").val(),content:dianp},
                    async: false,
                    success: function (data) {
                        if (data == "ok") {
                            dp.append(dianp);
                            layer.closeAll();
                        }
                        else {
                            layer.alert("点评出错！");
                        }
                    }
                });
            });
        }
        else {
            layer.alert("你还没有登录呢！");
        }
    });
    //回复
    $("#huifu").click(function () {
        if ($("#edittext").val() == null || $("#edittext").val() == "") {
            layer.alert("你还没有填写回复内容呢");
            return;
        }
        if (username == null || username == "") {
            layer.alert("你还没有登录呢");
            return;
        }
        //alert(username + "," + $("#edittext").val());
        var title = $(".wztitle strong").text().split(" ");
    $.ajax(
        {
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "huifu", username: username, content: $("#edittext").val(), title: title[title.length - 1] },
            success: function (data) {
                $("#pinglun").append('<div class="plbox"><div class="pure-g"><div class="pure-u-1-5 usdata"><img src="' + $("#nowuser").siblings("img").attr("src") + '"/><span>' + username + '</span><a href="javascript:;" class="haoyou">加为好友</a></div><div class="pure-u-4-5 uscontent">' + $("#edittext").val() + '<span id="pingluntimer">' + data + '</span></div></div></div>');
                //$("#pinglun a").addClass("");
                $("#pinglun .plbox:last").addClass("animated lightSpeedIn");
                $("#edittext").val("");
            },
            error:function(){
                alert("error");
            }
        }
            );
    });
    //评论载入特效
    //var i = 0;
    //var size = wzbox.top + $("#wzbox").height();
    //$(window).scroll(function () {
    //    var wzbox = $("#wzbox").offset();

    //    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    //        $("#pinglun .plbox").eq(i).show().addClass("animated lightSpeedIn");
    //        //size =size+ $("#pinglun .plbox").eq(i).height()+10;
    //            i++;
    //    }
    //});
    //收藏
    $("#shoucang").click(function () {
        if ($.cookie("username")) {
            $.post("Handler.ashx", { cmd: "shoucang", username: $.cookie("username"), tid: request("tid") }, function (data) {
                layer.alert(data);
            });
        }
        else {
            layer.alert("你还没有登录呢！！");
        }
    });
    //用户是否登录
    if (!$.cookie("username") || $.cookie("username") == "null") {
        $("#nowuser").text("未登录");
    }
    else {
        for (var i = 0; i < $(".haoyou").length; i++) {
            if ($.cookie("username") == $(".haoyou").eq(i).siblings("span").text()) { $(".haoyou").eq(i).hide();};
        }
        $("#nowuser").text($.cookie("username"));
        $.ajax({
            url: "Handler.ashx",
            type: "POST",
            data: { cmd: "usertouxiang", username: $.cookie("username") },
            success: function (data) {
                var json = eval(data);
                $("#nowuser").siblings("img").attr("src",json[0]["touxiang"]);
            }
        });
    }

    //获取视频地址
    var videosrc = $(".palyvideo").attr("href");
    $(".palyvideo").attr("href","javascript:;");
    //播放视频
    $(".palyvideo").click(function () {
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
    });

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