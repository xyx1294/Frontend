<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wenzhangmgr.aspx.cs" Inherits="Admin_js_wenzhangmgr" %>

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
    
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataSourceID="wenzhangsql">
            <Columns>
                <asp:BoundField DataField="tid" HeaderText="文章ID" />
                <asp:BoundField DataField="uid" HeaderText="用户ID" />
                <asp:BoundField DataField="ziclass" HeaderText="分类" />
                <asp:BoundField DataField="title" HeaderText="标题" />
                <asp:BoundField DataField="clicksum" HeaderText="点击量" />
                <asp:BoundField DataField="pinglun" HeaderText="评论数" />
                <asp:BoundField DataField="timer" HeaderText="时间" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="wenzhangsql" runat="server" ConnectionString="server=.;uid=sa;pwd=riguang;database=h5" ProviderName="System.Data.SqlClient" SelectCommand="SELECT * FROM [h5_wenzhang]"></asp:SqlDataSource>
    
    </div>
    </form>
            <script src="../scripts/jquery.min.js"></script>
    <script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
    <script src="../scripts/bootstrap.min.js"></script>
                <script src="../scripts/layer.js"></script>
    <script src="js/wenzhangmgr.js"></script>
</body>
</html>
