/// <reference path="jquery.min.js" />
var username = "";
var guest = "";
var user = "";
$(function () {
    user = decodeURIComponent(request("user"));
    if (user == "") {
        //判断是否登录
        if (!$.cookie("username") || $.cookie("username") =="null") {
            layer.msg("你还没有登录呢！");
            setTimeout(function () { window.location.href = "index.html"; }, 2000);
        }
        else {
            //自己访问自己主页
            username = $.cookie("username");
            guest = username;
            friend();//获取用户好友
            $("title").text(username + "的个人主页 - 最.前端");
        }
    }
    else {
        username = user;
        $("title").text(username + "的个人主页 - 最.前端");
        if ($.cookie("username") && $.cookie("username") != "null") {
            guest = $.cookie("username");
        }
        if (username != guest) {
            $("#savageren").hide();
            $(".content").hide();
            $("[data-pws-tab-name='我的收藏']").attr("data-pws-tab-name", "他的收藏");
        }
    }
    //获取个人资料
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: {cmd:"usermsg",username:username},
        success: function (data) {
            var json = eval(data);
            $("#gtouxiang").attr("src", json[0]["touxiang"]);
            $("#gnicheng").attr("placeholder", json[0]["username"]);
            $("#gjifen").attr("placeholder", json[0]["jifen"]);
            $("#gemail").attr("placeholder", json[0]["email"]);
            $("#gqq").attr("placeholder", json[0]["qq"]);
        }
    });
    userwz();//获取用户文章
    //获取最新视频
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "uservideo", username: username },
        async:false,
        success: function (data) {
            var json = eval(data);
            var pin = "";
            for (var i = 0; i < json.length; i++) {
                var title = json[i]["title"].split(" ");
                pin += '<div class="pure-u-1-4 uvbox"><div class="fengmian1"><span>' + json[i]["ziclass"] + '</span><div class="alert"><img src="images/video/play.png" /></div></div><p style="font-size:13px;">' + title[title.length-1] + '</p><input type="hidden" value="' + json[i]["video"] + '" /></div>'
            }
            $(".uvideo").append(pin);
        }
    });
    usersc();//获取用户收藏
    getliuyan();//获取留言

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
    //QQ表情设置
    $('.emotion').qqFace({
        id: 'facebox',
        assign: 'saytext',
        path: 'qqface/arclist/'	//表情存放的路径
    });
    //发表留言
    $("#sendly").click(function () {
        if (guest == "") {
            layer.alert("你还没有登录呢！");
            return;
        }
        else {
            if (user != "") {
                username = user;
            }
            var str = replace_em($("#saytext").val());
            var lou = $(".userly").children("li").length + 1;
            var touxiang = gettouxiang(guest);
            var timer = getNowFormatDate();
            fbliuyan(username, guest, str, timer);
            $(".userly").prepend('<li><h6>第' + lou + '楼</h6><hr style="margin:0;display:block;" /><div class="pure-g userbox"><div class="pure-u-1-12 usertouxiang"><img src="' + touxiang + '" style="width:50px;height:50px;" /></div><div class="pure-u-11-12 usercontent"><a href="user_index.aspx?user=' + guest + '">' + guest + '</a><p style="font-size:14px;letter-spacing:1px;">' + str + '</p><span>' + timer + '</span></div></div></li>');
            $("#saytext").val("");
            $(".userly li").eq(0).addClass("animated bounceInDown");
        }
    });
    //查看结果
    function replace_em(str) {
        str = str.replace(/\</g, '&lt;');
        str = str.replace(/\>/g, '&gt;');
        str = str.replace(/\n/g, '<br/>');
        str = str.replace(/\[em_([0-9]*)\]/g, '<img src="qqface/arclist/$1.gif" border="0" />');
        return str;
    }
    //上传头像
    $(":file").change(function () {
        
        ajaxFileUpload();
    });
    //保存个人信息
    $("#savageren").click(function () {
        var gtouxiang = $("#gtouxiang").attr("src");
        var gnicheng = $("#gnicheng").val();
        if (gnicheng == "") { gnicheng = $("#gnicheng").attr("placeholder"); }
        var gemail = $("#gemail").val();
        if (gemail == "") { gemail = $("#gemail").attr("placeholder"); }
        var gqq = $("#gqq").val();
        if (gqq == "") { gqq = $("#gqq").attr("placeholder"); }
        savageren(username, gtouxiang, gnicheng, gemail, gqq);
    });
    //背景图片大小
    //$("#bgsize").css({ "width": $(document).width() + 'px', "height": $(window).height() + 'px' });
});
function userwz() {//用户文章
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "userwz", username: username },
        success: function (data) {
            //alert(data);
            var json = eval(data);
            var icon = "";
            for (var i = 0, l = json.length; i < l; i++) {
                var title1 = json[i]["title"];
                var content1 = json[i]["content"];
                var yuedu1 = json[i]["clicksum"];
                var pinglun1 = json[i]["pinglun"];
                var timer1 = json[i]["timer"];
                var pic1 = json[i]["pic"];
                var video1 = json[i]["video"];
                var file1 = json[i]["file"];
                var tid = json[i]["tid"];
                if (pic1 != "0") { icon += '<span class="glyphicon glyphicon-picture" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (video1 != "0") { icon += '<span class="glyphicon glyphicon-facetime-video" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (file1 != "0") { icon += '<span class="glyphicon glyphicon-file" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                $(".tabset0 .wenzhang ul").append('<li><div><h4><a href="wenzhang.aspx?tid=' + tid + '" >' + title1 + '</a></h4></div><p>' + content1 + '</p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                //class="page-header"
                $(".tabset0 .wenzhang img").remove();
                icon = "";
            }
            

        },
        error: function () { layer.alert("error!"); }
    });

}

function usersc() {//用户收藏
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "usersc", username: username },
        success: function (data) {
            //alert(data);
            var json = eval(data);
            var icon = "";
            for (var i = 0, l = json.length; i < l; i++) {
                var title1 = json[i]["title"];
                var content1 = json[i]["content"];
                var yuedu1 = json[i]["clicksum"];
                var pinglun1 = json[i]["pinglun"];
                var timer1 = json[i]["timer"];
                var pic1 = json[i]["pic"];
                var video1 = json[i]["video"];
                var file1 = json[i]["file"];
                var tid = json[i]["tid"];
                if (pic1 != "0") { icon += '<span class="glyphicon glyphicon-picture" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (video1 != "0") { icon += '<span class="glyphicon glyphicon-facetime-video" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                if (file1 != "0") { icon += '<span class="glyphicon glyphicon-file" style="color: rgb(255, 140, 60);"></span>&nbsp;&nbsp;&nbsp;&nbsp;'; }
                $(".tabset0 .shoucang ul").append('<li style="width:900px;"><div><h4><a href="wenzhang.aspx?tid=' + tid + '" style="text-decoration:none;" >' + title1 + '</a></h4></div><p></p><div class="timer">' + icon + '<span class="glyphicon glyphicon-hand-up" style="color: rgb(255, 140, 60);">' + yuedu1 + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" style="color: rgb(255, 140, 60);">' + pinglun1 + ' ' + timer1 + '</span></div><hr /></li>');
                //class="page-header"
                $(".tabset0 .shoucang img").remove();
                icon = "";
            }


        },
        error: function () { layer.alert("error!"); }
    });

}
function friend() {//获取好友
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "friend", "username": username },
        async:false,
        success: function (data) {
            var json = eval(data);
            var li = "";
            for (var i = 0; i < json.length; i++) {
                var online = "offline";
                if (json[i]["online"] == 1) var online = "online";
                li += '<li><label class="' + online + '"></label><a href="javascript:;"><img src="' + json[i]["touxiang"] + '"></a><a href="javascript:;" class="chat03_name">' + json[i]["username"] + '</a></li>';
            }
            $(".chat03_content ul").empty();
            $(".chat03_content ul").append(li);
        }
    });
}
function gettouxiang(tx) {//获取头像
    var tt = "";
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "gettouxiang", username: tx },
        async:false,
        success: function (data) {
            tt= data;
        }
    });
    return tt;
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
function getNowFormatDate() {//获取当前时间
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
//获取留言
function getliuyan() {
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "getliuyan", username:username},
        success: function (data) {
            var json = eval(data);
            var li = "";
            for (var i = 0; i < json.length; i++) {
                var touxiang = json[i]["touxiang"];
                var userm = json[i]["username"];
                var ucontent = json[i]["content"];
                var timer = json[i]["timer"];
                li += '<li><h6>第' + (json.length-i) + '楼</h6><hr style="margin:0;display:block;" /><div class="pure-g userbox"><div class="pure-u-1-12 usertouxiang"><img src="' + touxiang + '" style="width:50px;height:50px;" /></div><div class="pure-u-11-12 usercontent"><a href="user_index.aspx?user=' + userm + '">' + userm + '</a><p style="font-size:14px;letter-spacing:1px;">' + ucontent + '</p><span>' + timer + '</span></div></div></li>';
            }
            $(".userly").append(li);
        }
    });
}
//发表留言
function fbliuyan(a,b,c,d){
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "fbliuyan", username: a,guest:b,content:c,timer:d},
        success: function (data) {
        }
    });
}
function ajaxFileUpload() {//上传文件
    $.ajaxFileUpload
    (
        {
            url: 'uploadfile.aspx?flag=' + Math.random(), //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'file1', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                //$("#img1").attr("src", data.imgurl);
                //$("#customized-buttonpane").html('<img src="'+data.imgurl+'" /');
                if (typeof (data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        //alert(data.msg);
                        $("#gtouxiang").attr("src", data.imgurl);
                        layer.closeAll();
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}
function savageren(a,b,c,d,e) {//保存个人信息
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "savageren", username: a, touxiang: b, nicheng: c, email: d,qq:e },
        success: function (data) {
            layer.alert(data);
            $.cookie("username", c, { expires: 1, path: '/' });
        }
    });
}