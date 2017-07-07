<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="video.aspx.cs" Inherits="video" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <script src="scripts/video.js"></script>
    <script type="text/javascript" src="video/jwplayer.js"></script>
    <link type="text/css" href="Style/video.less" rel="stylesheet/less" />
    <%--<link rel="stylesheet" href="Style/video/normalize3.0.2.min.css" />--%>
    <link rel="stylesheet" href="Style/video/css.css?v=15" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" Runat="Server">
    <div id="quick"><div class="quick"><span>↑</span></div><div class="quick"><span>↓</span></div></div>

    <div id="banner">
</div>
        <div class="pure-g jiaobox1">
            <div id="jiaocheng1">
        <img class="pure-img-responsive" src="images/video/jiaocheng1.png" />
                <div class="pure-u-1-4 jcbox1">
                    <hr /><strong>推荐学习</strong><hr />
                    <ul>
                    </ul>
                </div>
                <div class="pure-u-1-4 jcbox2">
                    <hr /><strong>推荐学习</strong><hr />
                    <ul>
                    </ul>
                </div>
                <div class="pure-u-1-4 jcbox3">
                    <hr /><strong>推荐学习</strong><hr />
                    <ul>
                    </ul>
                </div>
                <div class="pure-u-1-4 jcbox4">
                    <hr /><strong>推荐学习</strong><hr />
                    <ul>
                    </ul>
                </div>
                </div>
</div>
    <div class="pure-g jiaobox2">
        <div class="pure-u-5-6 uservideo" >
            <div class="pure-g videozuixin">
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-5 uvbox"><div class="fengmian"><span>空</span><div class="alert">作者：空</div></div><p>空</p><input type="hidden" value="video\video.mp4" /></div>
                <div id="qiehuan">></div>
            </div>
        </div>
                <div class="pure-u-1-6 userpaiming" >
            <div class="userbox">

<section id="ranking"> <span id="ranking_title">分享排行</span>
  <section id="ranking_list">
  
    <section class="box">
      <section class="col_1" title="1">1</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">123</section>
    </section>
    <section class="box">
      <section class="col_1" title="2">2</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>
    <section class="box"><%--class= box cur(加背景标记)--%>
      <section class="col_1" title="3">3</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>
    <section class="box">
      <section class="col_1">4</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>
    <section class="box">
      <section class="col_1">5</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>
      <section class="box">
      <section class="col_1">6</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>
            <section class="box">
      <section class="col_1">7</section>
      
      <section class="col_3">riguang</section>
      <section class="col_4">0</section>
    </section>

  </section>
</section>
            </div>
        </div>

     <div class="pure-g videoremen">
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
                <div class="pure-u-1-4 video"><div class="vhead"><img src="images/video/play.png" /><div class="valert">Jquery基本使用方法</div></div><input type="hidden" value="video\video.mp4" /></div>
    </div>

    </div>
        <div class="footer">
        <div class="mng">
        <div class="fimg"></div>
        <div class="fyouqing"><h3 style="color:#fff;margin-left:50px;">友情链接</h3>
            <ul>
                <li><a href="">前端开发</a></li>
                <li><a href="">前端技术</a></li>
                <li><a href="">前端博客</a></li>
                </ul>
        </div>
        <div class="flianxi"><h3 style="color:#fff;margin-left:50px;">关注我们</h3>
            <div class="bshare-custom icon-medium-plus" style="margin-top:40px;margin-left:55px;"><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到网易微博" class="bshare-neteasemb"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a></div><script type="text/javascript" charset="utf-8" src="scripts/fenxiang/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="scripts/fenxiang/bshareC0.js"></script>
        </div>
            </div>
        </div>
    <div id="videobox">
        <div id="jwplayer" style="background: transparent !important; margin:0 auto; width:800px; height:540px; overflow:hidden;">
	<div id="player"></div>
    </div>
        </div>
            <div id="titlelan">学习之路</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
</asp:Content>

