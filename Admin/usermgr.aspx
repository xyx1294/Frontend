<%@ Page Language="C#" AutoEventWireup="true" CodeFile="usermgr.aspx.cs" Inherits="Admin_usermgr" %>

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
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataSourceID="usermgr">
            <Columns>
                <asp:BoundField DataField="uid" HeaderText="用户ID" InsertVisible="False" ReadOnly="True" SortExpression="uid" />
                <asp:BoundField DataField="username" HeaderText="用户名" SortExpression="username" />
                <asp:BoundField DataField="email" HeaderText="邮箱" SortExpression="email" />
                <asp:BoundField DataField="qq" HeaderText="QQ号码" SortExpression="qq" />
                <asp:BoundField DataField="jifen" HeaderText="等级" SortExpression="jifen" />
                <asp:BoundField DataField="timer" HeaderText="注册时间" SortExpression="timer" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="usermgr" runat="server" ConnectionString="<%$ ConnectionStrings:conn %>" SelectCommand="SELECT [uid], [username], [password], [email], [qq], [jifen], [timer] FROM [h5_user]"></asp:SqlDataSource>
    </div>
    </form>
        <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
            <script src="../scripts/layer.js"></script>
    <script src="js/usermgr.js"></script>
</body>
</html>
