<%@ Page Language="C#" AutoEventWireup="true" CodeFile="manager.aspx.cs" Inherits="Admin_manager" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>后台管理系统</title>
    <link href="../Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/manager.css" rel="stylesheet" />
        <!-- Loading Flat UI -->
    <link href="flatui/dist/css/flat-ui.css" rel="stylesheet" />
    <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon" />
        <style type="text/css" >.aaa{ 
            BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; 

            BACKGROUND-COLOR: #ffcc33; BORDER-BOTTOM-STYLE: none 
        } 
        .bbb{ 
            BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; 

            BACKGROUND-COLOR: #99ffcc; BORDER-BOTTOM-STYLE: none 
        } 
    </style>
</head>
<body>
<%--        <form id="form1" runat="server">
    <div>--%>

    <div id="menu">
        <div class="admin"><a href="manager.aspx" style="color:#fff;"></a></div>
        <ul  class="menu">
            <li><span class="fui-user"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">用户管理</a></li>
            <li><span class="fui-home"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">首页管理</a></li>
            <li><span class="fui-window"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">文章管理</a></li>
            <li><span class="fui-list-bulleted"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">菜单管理</a></li>
            <li><span class="fui-video"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">视频页</a></li>
            <li><span class="fui-list-large-thumbnails"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">模板页</a></li>
            <li><span class="fui-star-2"></span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;">管理员</a></li>
        </ul>
    </div>
    <div id="banner"><div class="sousuo"><input type="text" class="sstext" style="border-radius:20px 20px 20px 20px;border:none;height:30px;width:180px;padding-left:0 10px;text-align:center;" /><input id="ssbtn" type="button" value="搜索" style="width:60px;height:30px;line-height:25px;text-align:center;border-radius:20px 20px 20px 20px;border:none;background:#418BCA;color:#fff;margin-left:10px;" /></div></div>
    <div id="content">
        <div id="rcontent">
            <h3 style="color:#ff6a00;font-family:'Microsoft YaHei'">网站时段流量分析</h3>
            <canvas id="canvas" style="width:100%;height:500px;"></canvas>
            <h3 style="color:#ff6a00;font-family:'Microsoft YaHei'">热门版块点击量分析</h3>
            <canvas id="canvas2" style="width:100%;height:500px;"></canvas>
            <div id="remenbankuai"></div>
        </div>
    </div>
<%--        <asp:button id="Button1" style="Z-INDEX: 101;  POSITION: absolute; TOP: 24px; width:100px;" runat="server" 
Text="WebFrom1Tab" CssClass="aaa" OnClick="Button1_Click"></asp:button> 
        <asp:Button id="Button2" style="Z-INDEX: 102;  POSITION: absolute; TOP: 25px; left: 111px;width:100px;" runat="server" 
Text="WebFrom2Tab" CssClass="bbb" OnClick="Button2_Click"></asp:Button>--%>
<%--    </div>
    </form>--%>
    <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
    <script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
    <%--flatui--%>
    <script src="flatui/dist/js/flat-ui.min.js"></script>



    <script src="../scripts/layer.js"></script>
    <script src="js/Chart.js"></script>
    <script src="js/manager.js"></script>
</body>
</html>
