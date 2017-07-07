<%@ Page Language="C#" AutoEventWireup="true" CodeFile="videomgr.aspx.cs" Inherits="Admin_videomgr" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
        <link href="../Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/wenzhangmgr.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button ID="Button1" runat="server" Text="视频管理" OnClick="Button1_Click" CausesValidation="false" /><asp:Button ID="Button2" runat="server" Text="推荐文章" OnClick="Button2_Click" CausesValidation="false" />
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="tid" DataSourceID="videomgr">
            <Columns>
                <asp:BoundField DataField="tid" HeaderText="视频ID" InsertVisible="False" ReadOnly="True" SortExpression="tid" />
                <asp:BoundField DataField="uid" HeaderText="用户ID" SortExpression="uid" />
                <asp:BoundField DataField="ziclass" HeaderText="分类" SortExpression="ziclass" />
                <asp:BoundField DataField="title" HeaderText="标题" SortExpression="title" />
                <asp:BoundField DataField="clicksum" HeaderText="点击量" SortExpression="clicksum" />
                <asp:BoundField DataField="pinglun" HeaderText="评论数" SortExpression="pinglun" />
                <asp:BoundField DataField="timer" HeaderText="发布时间" SortExpression="timer" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="videomgr" runat="server" ConnectionString="<%$ ConnectionStrings:h5ConnectionString %>" SelectCommand="SELECT * FROM [h5_wenzhang] where video<>'0'"></asp:SqlDataSource>
    
    </div>
    </form>
                <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
                <script src="../scripts/layer.js"></script>
    <script src="js/videomgr.js"></script>
</body>
</html>
