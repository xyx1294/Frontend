<%@ Page Language="C#" AutoEventWireup="true" CodeFile="mobanmgr.aspx.cs" Inherits="Admin_mobanmgr" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
        <link href="../Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/mobanmgr.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    <h3>主页-热门模版</h3>
    <table>
        <tr><th scope="col">ID</th><th scope="col">标题</th><th scope="col">图片地址</th><th scope="col">下载地址</th></tr>
    </table>
    <div class="tools">
    <button style="height:30px; width:100px;" disabled="disabled">开始采集模版</button>
        <div class="jindutiao"></div>
    </div>
    <p class="alert"></p>
    <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
    <script src="../scripts/layer.js"></script>
    <script src="js/mobanmgr.js"></script>
    
</body>
</html>
