<%@ Page Language="C#" AutoEventWireup="true" CodeFile="register.aspx.cs" Inherits="register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>注册会员 - WEB圈</title>
<link type="text/css" href="Style/register.less" rel="stylesheet/less" />
<link href="scripts/animate.css" rel="stylesheet" />
<link href="Style/buttons.css" rel="stylesheet" />
<link href="Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
<link href="Style/pure-min.css" rel="stylesheet" />
<script src="scripts/jquery.min.js"></script>
<script src="scripts/less.min.js"></script>
<script src="scripts/bootstrap.min.js"></script>
<script src="scripts/layer.js"></script>
<script src="scripts/jquery-cookie/jquery.cookie.js"></script>
<script src="scripts/register.js"></script>
</head>
<body>
<div id="Layer1" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:0;"> 
<img src="images/register/regbg.jpg" style="width:100%;height:100%;" /> 
</div>
    <div id="inputform" class="pure-u-1-4">
        <table>
            <tr><td style="text-align:right;font-weight:bold;"class="pure-u-1-3">用户名：</td><td class="pure-u-2-3"><input type="text" style="width:100%;" id="signup-username" /></td></tr>
            <tr><td style="text-align:right;font-weight:bold;"class="pure-u-1-3">邮箱：</td><td class="pure-u-2-3"><input type="text" style="width:100%;" id="signup-email" /></td></tr>
            <tr><td style="text-align:right;font-weight:bold;"class="pure-u-1-3">密码：</td><td class="pure-u-2-3"><input type="password" style="width:100%;" id="signup-password" /></td></tr>
            <tr><td style="text-align:right;font-weight:bold;"class="pure-u-1-3">确认密码：</td><td class="pure-u-2-3"><input type="password" style="width:100%;" id="signup-password2" /></td></tr>
            <tr style="margin-top: -15px;"><td style="text-align:right;" class="pure-u-1-3"></td><td class="pure-u-2-3"><div class="rgt" id="login">注 册</div></td></tr>
        </table>
    </div>
    <div class="rgt" style="position:absolute;left:78%;top:47.5%"><a href="index.html" style="text-decoration:none;color:#fff;">登 录</a></div>
</body>
</html>
