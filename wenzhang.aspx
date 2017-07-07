<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="wenzhang.aspx.cs" Inherits="wenzhang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link type="text/css" href="Style/wenzhang.less" rel="stylesheet/less">
    <script src="scripts/wenzhang.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <div class="wzbox" id="wzbox">
    <div class="wztitle"><strong></strong><span id="readhuifu"></span></div>
    <div class="pure-g">
        <div class="pure-u-1-5 usdata">
            <img src="images/touxiang.png" style="height:100px;width:100px;"/>
            <span>一束日光</span>
            <a href="javascript:;" class="haoyou">加为好友</a>
        </div>
        <div class="pure-u-4-5 uscontent" id="lzctt">
            <p></p>
        </div>
    </div>
</div>
<div id="pinglun">
<%--<div class="plbox"><div class="pure-g"><div class="pure-u-1-5 usdata"><img src="images/touxiang.png"/><span>测试</span><a href="javascript:;" class="haoyou">加为好友</a></div><div class="pure-u-4-5 uscontent">测试<span class="button button-primary button-rounded button-small">回复</span><div style="clear:both;"></div><span id="pingluntimer">2016/8/15 17:51:01</span><div style="clear:both;"></div><div class="dianping"><img src="images/touxiang.png" style="width:36px;height:36px;" /><a href="javascript:;" style="margin-left:10px;display:inline-block;">日光</a>：非常好！</div></div></div></div>--%>
</div>


            <div class="fbbox">
    <div class="pure-g">
        <div class="pure-u-1-5 usdata">
            <img src="images/touxiang.png" style="height:100px;width:100px;" />
            <span id="nowuser"></span>
        </div>
        <div class="pure-u-4-5 uscontent">
            <div class="pure-u-1-5 textedit">
                文本编辑
                </div>
              <textarea id="edittext"></textarea>
            <button class="button button-primary button-rounded button-small" id="huifu">发表</button>
        </div>
    </div>
</div>
                <div id="videobox">
        <div id="jwplayer" style="background: transparent !important; margin:0 auto; width:800px; height:540px; overflow:hidden;">
	<div id="player"></div>
    </div>
        </div>
    <script type="text/javascript" src="video/jwplayer.js"></script>
</asp:Content>

