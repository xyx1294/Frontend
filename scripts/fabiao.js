/// <reference path="jquery.min.js" />
/** Default editor configuration **/
//var editct;

$(function () {
    $("title").text("发表帖子 - 最.前端");
    //绑定点击菜单
    $("body").mouseover(function () {
        $("#menu .erji li").click(function () {
            var zilei = $(this).text().trim();
            window.location.href = "index.html?ziclass=" + zilei;
        });
        $(this).unbind();
    });
    //设置富文本框
    $('#simple-editor').trumbowyg();
    /********************************************************
     * Customized button pane + buttons groups + dropdowns
     * Use upload plugin
     *******************************************************/

    /*
     * Add your own groups of button
     */
    $.trumbowyg.btnsGrps.test = ['bold', 'link'];

    /* Add new words for customs btnsDef just below */
    $.extend(true, $.trumbowyg.langs, {
        fr: {
            align: 'Alignement',
            image: 'Image'
        }
    });
    $('#customized-buttonpane').trumbowyg({
        //设置中文
        lang: 'zh-cn',
        //closable: true,
        fixedBtnPane: true,
        btnsDef: {
            // Customizables dropdowns
            align: {
                dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ico: 'justifyLeft'
            },
            image: {
                //dropdown: ['insertImage', 'upload', 'base64'],
                //dropdown: ['insertImage'],
                ico: 'insertImage'
            }
        },
        btns: ['viewHTML',
            '|', 'formatting',
            '|', 'btnGrp-test',
            '|', 'align',
            '|', 'btnGrp-lists',
            '|', 'image']
    });

    /** Simple customization with current options **/
    $('#form-content').trumbowyg({
        //设置中文
        lang: 'zh_cn',
        //closable: true,
        mobile: true,
        fixedBtnPane: true,
        fixedFullWidth: true,
        semantic: true,
        resetCss: true,
        autoAjustHeight: true,
        autogrow: true,
    });

    $('.editor').on('dblclick', function (e) {
        $(this).trumbowyg({
            lang: 'zh_cn',
            closable: true,
            fixedBtnPane: true
        });
    });

    //上传图片
    $("#upfile :file").change(function () {
        //editct = $("#customized-buttonpane").html();
        checkImgType(this);
    });
    $(".trumbowyg-image-button").click(function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: true,
            skin: 'yourclass',
            content: $("#upfile")
        });
    });
    $("#fabiao").click(function () {//发表
        var fenlei=$(".fb_fenlei select").val();
        var title = $(".fb_title input").val();
        //var content = $(".fb_content .editor").html();
        var content = $("#customized-buttonpane").html();
        var file = $("#customized-buttonpane .downfile a").attr("href");
        var video = $(".editor .palyvideo").attr("href");
        if (video == undefined) { video = "0"; }
        if (file == undefined) { file = "0"; }
        if (content == "" || fenlei == "" || title == "") { layer.alert("你还没有编辑好哦"); return; }
        if (username == "" || username == null) { layer.alert("你还没有登录呢"); return; }
        var img = $(".fb_content .editor img").attr("src");
        if (img == undefined)
        { img = "0"; }
        if ($("#fabiao").text() == "保存") {
            var tid = request("tid");
            $.ajax({
                url: "Handler.ashx",
                type: "POST",
                data: { cmd: "editcontent", tid: tid,fenlei: fenlei, title: title, content: content, img: img, username: username, file: file,video:video },
                success: function (data) {
                    location.href = "wenzhang.aspx?tid=" + data;
                },
                error: function () {
                    alert("error");
                }
            });
        }
        else {
            $.ajax({
                url: "Handler.ashx",
                type: "POST",
                data: { cmd: "fabiao", fenlei: fenlei, title: title, content: content, img: img, username: username, file: file, video: video },
                success: function (data) {
                    location.href = "wenzhang.aspx?tid=" + data;
                },
                error: function () {
                    alert("error");
                }
            });
        }
    });

    //获取分类
    var menu = "";
    var i = 0;
    $.ajax({
        url: "Handler.ashx",
        type: "POST",
        data: { cmd: "menuclass" },
        async: false,
        success: function (data) {
            var json1 = eval(data);
            for (i = 0; i < json1.length; i++) {
                var fuclass = json1[i]["class"];
                menu = '<option value ="' + fuclass + '" disabled="disabled">' + fuclass + '-------------</option>';
                $.ajax({
                    url: "Handler.ashx",
                    type: "POST",
                    data: { cmd: "menuziclass", fuclass: fuclass },
                    async: false,
                    success: function (data) {
                        var json2 = eval(data);
                        for (var j = 0; j < json2.length; j++) {
                            var ziclass = json2[j]["ziclass"];
                            menu += '<option value ="' + ziclass + '">' + ziclass + '</option>';
                        };
                    },
                    erroe: function () {
                        layer.alert("菜单获取失败，请检查网络！");
                    }
                });
                menu += '</ul></li>';
                $(".fb_fenlei select").append(menu);
            }
        },
        erroe: function () {
            layer.alert("菜单获取失败，请检查网络！");
        }
    });
    i = 0;
    menu = "";
    //编辑
    if (request("tid") != "") {
        var tid = request("tid");
        if ($.cookie("username") && $.cookie("username")!="null") {
            $.ajax({
                url: "Handler.ashx",
                type: "POST",
                data: { cmd: "edit", tid: tid, username: $.cookie("username") },
                async: false,
                success: function (data) {
                    if (data == "no") {
                        layer.alert("你没有权限编辑！");
                        window.location.href = "wenzhang.aspx?tid=" + tid;
                        return;
                    }
                    var json = eval(data);
                    var a = json[0]["title"];
                    var b = a.trim().split(" ");
                    $("[value='" + b[0].replace("[", "").replace("]", "") + "']").attr("selected", true);
                    $(".fb_title").find("input").val(b[b.length-1]);
                    $(".editor").html(json[0]["content"]);
                    $("#fabiao").text("保存");
                }
            });
        }
        else {
            window.location.href = "wenzhang.aspx?tid=" + tid;
        }
    }
    
    
});

function ajaxFileUpload() {
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
                        $("#customized-buttonpane").append('<img src="' + data.imgurl + '" />');
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
}
function ajaxFileUpload2() {
    $.ajaxFileUpload
    (
        {
            url: 'uploadfile2.aspx?flag=' + Math.random(), //用于文件上传的服务器端请求地址
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
                        $("#customized-buttonpane").append(data.fileurl);
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
function ajaxFileUpload3() {
    $.ajaxFileUpload
    (
        {
            url: 'uploadfile3.aspx?flag=' + Math.random(), //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: 'file1', //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            timeout:1000*60*5,//超时延迟5分钟
            success: function (data, status)  //服务器成功响应处理函数
            {
                //$("#img1").attr("src", data.imgurl);
                //$("#customized-buttonpane").html('<img src="'+data.imgurl+'" /');
                if (typeof (data.error) != 'undefined') {
                    if (data.error != '') {
                        alert(data.error);
                    } else {
                        //alert(data.msg);
                        $("#customized-buttonpane").append(data.fileurl);
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
//判断图片类型
function checkImgType(ths) {
    if (ths.value == "") {
        alert("请上传文件");
        return false;
    } else {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ths.value)) {
            if (!/\.(rar|zip)$/.test(ths.value)) {
                if (!/\.(flv|mp4)$/.test(ths.value)) {
                    layer.alert("文件格式仅支持|gif|jpg|jpeg|png|gif|rar|zip|flv|mp4|");
                    return;
                }
                else {
                    ajaxFileUpload3();
                }
            }
            else {
                ajaxFileUpload2();
            }
        }
        else {
            ajaxFileUpload();
        }
            
    }
    return true;
}