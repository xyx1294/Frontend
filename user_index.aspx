<%@ Page Language="C#" AutoEventWireup="true" CodeFile="user_index.aspx.cs" Inherits="user_index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
   <title></title>
       <script src="scripts/jquery.min.js"></script>
    <link href="Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="Style/pure-min.css" rel="stylesheet" />
    <script src="scripts/layer.js"></script>
    <script type="text/javascript" src="video/jwplayer.js"></script>
    <script src="scripts/jquery-cookie/jquery.cookie.js"></script>
    <link href="scripts/animate.min.css" rel="stylesheet" />
    <link href="Style/buttons.css" rel="stylesheet" />

   <link type="text/css" rel="stylesheet" href="Style/tabs/assets/jquery.pwstabs-1.2.1.css" />
   <script src="Style/tabs/assets/jquery.pwstabs-1.2.1.js"></script>
   <link type="text/css" rel="stylesheet" href="Style/tabs/css/styles.css" />
   <link href='Style/tabs/css/tabs.css' rel='stylesheet' type='text/css' />
   <link type="text/css" rel="stylesheet" href="Style/tabs/assets/font-awesome-4.2.0/css/font-awesome.min.css" />
    <%--留言板--%>
    <script src="scripts/user_index.js"></script>
    <link rel="stylesheet" type="text/css" href="liuyan/chat.css" />
    <script type="text/javascript" src="scripts/chat.js"></script>
    <%--QQ表情--%>
    <link rel="stylesheet" href="qqface/css/reset.css">
    <script type="text/javascript" src="qqface/js/jquery-browser.js"></script>
    <script type="text/javascript" src="qqface/js/jquery.qqFace.js"></script>
    <!--[if lt IE 7]>
    <script src="scripts/IE7.js" type="text/javascript"></script>
    <![endif]-->
    <!--[if IE 6]>
    <script src="scripts/iepng.js" type="text/javascript"></script>
    <script type="text/javascript">
    EvPNG.fix('body, div, ul, img, li, input, a, span ,label'); 
    </script>
    <![endif]-->
       <script>
           jQuery(document).ready(function ($) {
               $('.tabset0').pwstabs({
                   effect: 'scale',              // You can change effects of your tabs container: scale / slideleft / slideright / slidetop / slidedown / none
                   defaultTab: 1,                // The tab we want to be opened by default
                   containerWidth: '100%',     // Set custom container width if not set then 100% is used
                   tabsPosition: 'horizontal',   // Tabs position: horizontal / vertical
                   horizontalPosition: 'top',    // Tabs horizontal position: top / bottom
                   verticalPosition: 'left',     // Tabs vertical position: left / right
                   responsive: true,             // Make tabs container responsive: true / false - boolean
                   theme: '',
                   rtl: false                    // Right to left support: true/ false
               });

               // Colors Demo
               $('.pws_demo_colors a').click(function (e) {
                   e.preventDefault();
                   $('.pws_tabs_container').removeClass('pws_theme_grey pws_theme_violet pws_theme_green pws_theme_yellow pws_theme_gold pws_theme_orange pws_theme_red pws_theme_purple').addClass('pws_theme_' + $(this).attr('data-demo-color'));
               });

           });
   </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    <div id="bgsize" >
       <div class="content1 demo_responsive">
     <%-- <h2 id="demos">Demos</h2>--%>

      <div class="pws_demo_colors">

         <a href="#" data-demo-color="cyan"></a>
         <a href="#" data-demo-color="violet"></a>
         <a href="#" data-demo-color="green"></a>
         <a href="#" data-demo-color="yellow"></a>
         <a href="#" data-demo-color="gold"></a>
         <a href="#" data-demo-color="orange"></a>
         <a href="#" data-demo-color="red"></a>
         <a href="#" data-demo-color="purple"></a>
         <a href="#" data-demo-color="grey"></a>

      </div><!-- pws_demo_colors -->

      <div class="tabset0" >
         <div data-pws-tab="tab1" data-pws-tab-name="个人资料" data-pws-tab-icon="fa-map-marker">
         <div class="geren">
<%--             <div class="gerenbox clear"><div class="touxiang">头像</div> <div class="input"><img src="images/touxiang.png" /></div></div>
             <div class="gerenbox clear"><div class="nicheng">昵称</div> <div class="input"><input  type="text" placeholder="昵称" /></div></div>
             <div class="gerenbox clear"><div class="youxiang">邮箱</div> <div class="input"><input  type="text" placeholder="邮箱" /></div></div>
             <div class="gerenbox clear"><div class="qq">ＱＱ</div> <div class="input"><input  type="text" placeholder="ＱＱ" /></div></div>
             <div class="gerenbox btn"><div class="input"><input  type="button" value="保存" /></div></div>--%>
              <table style="width:100%;">
                 <tr>
                     <td style="text-align:right;">头像</td><td><img src="images/touxiang.png" id="gtouxiang" style="width:100px;height:100px;" /><input type="file" id="file1" name="file" /></td>
                 </tr>
                                  <tr>
                     <td style="text-align:right;">昵称</td><td><input  type="text" placeholder="" id="gnicheng" /></td>
                 </tr>
                                  <tr>
                     <td style="text-align:right;">积分</td><td><input  type="text" placeholder="" id="gjifen" /></td>
                 </tr>
                                  <tr>
                     <td style="text-align:right;">邮箱</td><td><input  type="text" placeholder="" id="gemail" /></td>
                 </tr>
                                  <tr>
                     <td style="text-align:right;">ＱＱ</td><td><input  type="text" placeholder="" id="gqq" /></td>
                 </tr>
                                  <tr>
                     <td></td><td><input  type="button" value="保存" id="savageren" /></td>
                 </tr>
             </table>
         </div>
         </div>
         <div data-pws-tab="tab2" data-pws-tab-name="主题文章" data-pws-tab-icon="fa-refresh fa-spin">
             <div class="wenzhang">
                 <ul></ul>
             </div>
         </div>
         <div data-pws-tab="tab3" data-pws-tab-name="视频" data-pws-tab-icon="fa-video-camera" style="width:98%;">

             <div class="uvideo">
             </div>

         </div>
          <div data-pws-tab="tab4" data-pws-tab-name="我的收藏" data-pws-tab-icon="fa-star">

             <div class="shoucang">
                 <ul></ul>
             </div>

          </div>
          <div data-pws-tab="tab5" data-pws-tab-name="好友" data-pws-tab-icon="fa-user">
              <div class="liuyanban">
                  <div>
<!--效果html开始-->
    <div class="content">
        <div class="chatBox">
            <div class="chatLeft">
                <div class="chat01">
                    <div class="chat01_title">
                        <ul class="talkTo">
                            <li><a href="javascript:;"></a></li></ul>
                        <a class="close_btn" href="javascript:;"></a>
                    </div>
                    <div class="chat01_content">
                        <div class="message_box mes1">
                        </div>
                        <div class="message_box mes2">
                        </div>
                        <div class="message_box mes3" style="display: block;">
                        </div>
                        <div class="message_box mes4">
                        </div>
                        <div class="message_box mes5">
                        </div>
                        <div class="message_box mes6">
                        </div>
                        <div class="message_box mes7">
                        </div>
                        <div class="message_box mes8">
                        </div>
                        <div class="message_box mes9">
                        </div>
                        <div class="message_box mes10">
                        </div>
                    </div>
                </div>
                <div class="chat02">
                    <div class="chat02_title">
                        <a class="chat02_title_btn ctb01" href="javascript:;"></a><a class="chat02_title_btn ctb02"
                            href="javascript:;" title="选择文件">
                            <embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
                                data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true"
                                scale="noScale" menu="false" type="application/x-shockwave-flash" src="http://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
                                id="swf_3140">
                        </a><a class="chat02_title_btn ctb03" href="javascript:;" title="选择附件">
                            <embed width="15" height="16" flashvars="swfid=2556975203&amp;maxSumSize=50&amp;maxFileSize=50&amp;maxFileNum=1&amp;multiSelect=0&amp;uploadAPI=http%3A%2F%2Fupload.api.weibo.com%2F2%2Fmss%2Fupload.json%3Fsource%3D209678993%26tuid%3D1887188824&amp;initFun=STK.webim.ui.chatWindow.msgToolBar.upload.initFun&amp;sucFun=STK.webim.ui.chatWindow.msgToolBar.upload.sucFun&amp;errFun=STK.webim.ui.chatWindow.msgToolBar.upload.errFun&amp;beginFun=STK.webim.ui.chatWindow.msgToolBar.upload.beginFun&amp;showTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.showTipFun&amp;hiddenTipFun=STK.webim.ui.chatWindow.msgToolBar.upload.hiddenTipFun&amp;areaInfo=0-16|12-16&amp;fExt=*.jpg;*.gif;*.jpeg;*.png|*&amp;fExtDec=选择图片|选择文件"
                                data="upload.swf" wmode="transparent" bgcolor="" allowscriptaccess="always" allowfullscreen="true"
                                scale="noScale" menu="false" type="application/x-shockwave-flash" src="http://service.weibo.com/staticjs/tools/upload.swf?v=36c9997f1313d1c4"
                                id="Embed1">
                        </a>
                        <label class="chat02_title_t">
                            <a href="chat.htm" target="_blank"></a></label>
                        <div class="wl_faces_box">
                            <div class="wl_faces_content">
                                <div class="title">
                                    <ul>
                                        <li class="title_name">常用表情</li><li class="wl_faces_close"><span>&nbsp;</span></li></ul>
                                </div>
                                <div class="wl_faces_main">
                                    <ul>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_01.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_02.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_03.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_04.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_05.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_06.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_07.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_08.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_09.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_10.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_11.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_12.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_13.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_14.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_15.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/imge/mo_16.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_17.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_18.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_19.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_20.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_21.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_22.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_23.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_24.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_25.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_26.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_27.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/imge/mo_28.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_29.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_30.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_31.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_32.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_33.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_34.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/imgemo_35.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_36.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_37.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_38.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_39.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_40.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_41.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_42.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_43.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_44.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_45.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_46.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_47.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_48.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_49.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_50.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_51.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_52.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_53.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_54.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_55.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_56.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_57.gif" /></a></li>
                                        <li><a href="javascript:;">
                                            <img src="liuyan/img/emo_58.gif" /></a></li><li><a href="javascript:;">
                                                <img src="liuyan/img/emo_59.gif" /></a></li><li><a href="javascript:;">
                                                    <img src="liuyan/img/emo_60.gif" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="wlf_icon">
                            </div>
                        </div>
                    </div>
                    <div class="chat02_content">
                        <textarea id="textarea"></textarea>
                    </div>
                    <div class="chat02_bar">
                        <ul>
                            <li style="left: 20px; top: 10px; padding-left: 30px;">web2.0时代</li>
                            <li style="right: 5px; top: 5px;"><a href="javascript:;">
                                <img src="liuyan/img/send_btn.jpg"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chatRight">
                <div class="chat03">
                    <div class="chat03_title">
                        <label class="chat03_title_t">
                            成员列表</label>
                    </div>
                    <div class="chat03_content">
                        <ul>
                            <li>
                                <label class="online">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2013.jpg"></a><a href="javascript:;" class="chat03_name">刘秀</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2014.jpg"></a><a href="javascript:;" class="chat03_name">陈诚</a>
                            </li>
                            <li class="choosed">
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2015.jpg"></a><a href="javascript:;" class="chat03_name">王旭</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2016.jpg"></a><a href="javascript:;" class="chat03_name">张灵</a>
                            </li>
                            <li>
                                <label class="online">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2017.jpg"></a><a href="javascript:;" class="chat03_name">吴敬</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2018.jpg"></a><a href="javascript:;" class="chat03_name">王海东</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2019.jpg"></a><a href="javascript:;" class="chat03_name">郑小勇</a>
                            </li>
                            <li>
                                <label class="online">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2020.jpg"></a><a href="javascript:;" class="chat03_name">张珊珊</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2021.jpg"></a><a href="javascript:;" class="chat03_name">刘强</a>
                            </li>
                            <li>
                                <label class="offline">
                                </label>
                                <a href="javascript:;">
                                    <img src="liuyan/img/head/2022.jpg"></a><a href="javascript:;" class="chat03_name">程海斌</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="clear: both;">
            </div>
        </div>
    </div>
<!--效果html结束-->
</div>
              </div>
          </div>
          <div data-pws-tab="tab6" data-pws-tab-name="留言板" data-pws-tab-icon="fa-comment">
              <div class="lyb" >
                <img src="images/geren/liuyan.jpg" style="max-width:184px;height:auto;display:block;margin:0 auto;" />
                  <div style="width:100%;margin-top:10px;border:solid 4px #40c9f2;border-radius:5px 5px 5px 5px;">
                      <textarea style="width:100%;height:300px;border:none;" name="saytext" id="saytext"></textarea>
                      <hr style="display:block;margin:0;" />
                      <div style="margin:5px;position:relative">
                          <div style="float:left;"><span class="emotion" style="margin-left:10px;"><img src="qqface/happy_face.png" /></span></div>
                          <div style="float:right;margin-top:40px;"><button class="button button-primary button-rounded button-small" id="sendly">留言</button></div>
                          <div style="clear:both;"></div>
                      </div>
                  </div>
                  <div id="userly" style="margin-top:20px;">
                  <strong style="display:inline-block;margin:0;border-bottom:solid 3px #3698e9;color:#000000;">全部留言</strong>
                      <hr style="display:block;margin:0;" />    
                  </div>
                  <ul class="userly">
                  </ul>
              </div>

              </div>
      </div><!-- tabset0 -->

   </div><!-- content -->
        </div>
        <div id="videobox">
        <div id="jwplayer" style="background: transparent !important; margin:0 auto; width:800px; height:540px; overflow:hidden;">
	<div id="player"></div>
    </div>
        </div>
    <script src="scripts/ajaxfileupload.js"></script>
</body>
</html>
