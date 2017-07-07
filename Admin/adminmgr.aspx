<%@ Page Language="C#" AutoEventWireup="true" CodeFile="adminmgr.aspx.cs" Inherits="Admin_adminmgr" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
            <link href="../Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
    <table border="1px" class="table">
        <caption><h3>密码修改</h3></caption>
        <tr><td style="text-align:right;">管理员</td><td id="admin">admin</td></tr>
        <tr><td style="text-align:right;">请输入当前密码</td><td><input type="password" id="oldp" /></td></tr>
        <tr><td style="text-align:right;">请输入新密码</td><td><input type="password" id="newp" /></td></tr>
        <tr><td style="text-align:right;"></td><td><input type="button" value="修改" id="xiugai" /></td></tr>
    </table>
        <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
     <script src="../scripts/layer.js"></script>
    <script>
        $(function () {
            $("#admin").text($.cookie("adminname"));
            $("#xiugai").click(function () {
                $.post("../adminrequest.aspx", { cmd: "adminpass",aname:$("#admin").text(), oldp: $("#oldp").val(), newp: $("#newp").val() }, function (data) {
                    layer.alert(data);
                });
            });
        });
    </script>
</body>
</html>
