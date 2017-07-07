<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="sousuo.aspx.cs" Inherits="sousuo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link type="text/css" href="Style/sousuo.less" rel="stylesheet/less">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div style="width:100%;height:200px;background:#F5F6F5;">
        <div style="display:block;position:relative;left:20px;top:20px;font-size:13px;font-family:'Microsoft YaHei'">指定用户发言：<input type="text" style="margin-left:10px;width:200px;" id="usertext" /><div id="thisuser" style="margin-left:10px;width:80px;height:25px;line-height:25px;text-align:center;background:#808080;color:#fff;display:inline-block;cursor:pointer;">确定</div></div>
        <div style="display:block;position:relative;left:33px;top:40px;font-size:13px;font-family:'Microsoft YaHei'">按时间排序：<input type="radio" value="1" style="margin-left:10px;" name="timer" />一天内<input type="radio" value="7" style="margin-left:10px;" name="timer" />一星期内<input type="radio" value="31" style="margin-left:10px;" name="timer" />一个月内<input type="radio" value="365" style="margin-left:10px;" name="timer" checked="checked" />一年内
        </div>
        <div style="display:block;position:relative;left:20px;top:60px;font-size:13px;font-family:'Microsoft YaHei'">包含关键字的：<input type="radio" value="1" style="margin-left:10px;" name="leixingr" />主题<input type="radio" value="2" style="margin-left:10px;" name="leixingr" />评论<input type="radio" value="3" style="margin-left:10px;" name="leixingr" checked="checked" />全部</div>
    <div style="display:block;position:relative;left:46px;top:80px;font-size:13px;font-family:'Microsoft YaHei'">最多显示：<input type="radio" value="10" style="margin-left:10px;" name="page" checked="checked" />10条<input type="radio" value="20" style="margin-left:10px;" name="page" />20条<input type="radio" value="30" style="margin-left:10px;" name="page" />30条</div>
    </div>
    <div class="pure-g">
        <div class="pure-u-11-24 gjsousuo">
            <p>关键字搜索</p>
            <div id="keyword" class="result">
            </div>
        </div>
        <div class="pure-u-11-24 gjsousuo">
            <p>相关文章</p>
            <div id="xiangguan" class="result">
            </div>
        </div>
        <div class="pure-u-11-24 gjsousuo">
            <p>热门</p>
                        <div id="sremen" class="result">
            </div>
        </div>
        <div class="pure-u-11-24 gjsousuo">
            <p>评论数</p>
             <div id="spinglun" class="result">
            </div>
        </div>
                <div class="pure-u-11-24 gjsousuo">
            <p>指定用户发言</p>
             <div id="thisuserbox" class="result">
            </div>
        </div>
                <div class="pure-u-11-24 gjsousuo">
            <p>相关视频</p>
        </div>
    </div>
    <script src="scripts/sousuo.js"></script>
</asp:Content>

