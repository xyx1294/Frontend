<%@ Page Language="C#" AutoEventWireup="true" CodeFile="shouyemgr.aspx.cs" Inherits="Admin_shouyemgr" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../Style/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/shouyemgr.css" rel="stylesheet" />
        <!-- Loading Flat UI -->
<%--    <link href="flatui/dist/css/flat-ui.css" rel="stylesheet" />
    <link rel="shortcut icon" href="flatui/img/favicon.ico" />--%>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div style="width:50%;float:left;border:solid 1px #FD8C84;">
            <h3>精华采撷</h3>
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="tid" DataSourceID="shouyesql">
            <Columns>
                <asp:BoundField DataField="tid" HeaderText="文章ID" InsertVisible="False" ReadOnly="True" SortExpression="tid" />
                <asp:BoundField DataField="title" HeaderText="标题" SortExpression="title" />
                <asp:BoundField DataField="clicksum" HeaderText="点击量" SortExpression="clicksum" />
                <asp:BoundField DataField="pinglun" HeaderText="评论数" SortExpression="pinglun" />
            </Columns>
        </asp:GridView>
            </div>
        <div style="width:50%;float:right;border:solid 1px #0D6CBF;">
            <h3>热门排行</h3>
            <asp:GridView ID="GridView2" runat="server" AutoGenerateColumns="False" DataKeyNames="tid" DataSourceID="remensql">
                <Columns>
                    <asp:BoundField DataField="tid" HeaderText="文章tid" InsertVisible="False" ReadOnly="True" SortExpression="tid" />
                    <asp:BoundField DataField="title" HeaderText="标题" SortExpression="title" />
                    <asp:BoundField DataField="clicksum" HeaderText="点击量" SortExpression="clicksum" />
                    <asp:BoundField DataField="pinglun" HeaderText="评论数" SortExpression="pinglun" />
                </Columns>
            </asp:GridView>
            <asp:SqlDataSource ID="remensql" runat="server" ConnectionString="<%$ ConnectionStrings:h5ConnectionString3 %>" SelectCommand="select top 10 tid,title,clicksum,pinglun from h5_wenzhang order by clicksum desc"></asp:SqlDataSource>
            </div>
        <asp:SqlDataSource ID="shouyesql" runat="server" ConnectionString="<%$ ConnectionStrings:h5ConnectionString3 %>" SelectCommand="select top 10 tid,title,clicksum,pinglun from h5_wenzhang where pinglun &lt;&gt; 0 order by (clicksum/pinglun)"></asp:SqlDataSource>
    </div>
    </form>
<%--    <div>
        <table class="table">
            <tr><td width="150" style="text-align:center;">网页标题</td><td>
                <div class="col-xs-3">
          <div class="form-group">
            <input type="text" value="" class="form-control" style="width:350px;">
          </div>
        </div>
                                         </td></tr>
            <tr><td width="150" style="text-align:center;">精华采撷算法</td><td>
                <div class="col-xs-3">
          <div class="form-group">
            <input type="text" value="" class="form-control" style="width:350px;">
          </div>
        </div>
                                           </td></tr>
            <tr><td width="150" style="text-align:center;">猜你想看算法</td><td>
                <div class="col-xs-3">
          <div class="form-group">
            <input type="text" value="" class="form-control" style="width:350px;">
          </div>
        </div>
                                           </td></tr>
            <tr><td width="150" style="text-align:center;">推荐视频算法</td><td>
                <div class="col-xs-3">
          <div class="form-group">
            <input type="text" value="" class="form-control" style="width:350px;">
          </div>
        </div>
                                           </td></tr>
            <tr><td width="150"></td><td><div class="col-xs-3"><a href="#fakelink" class="btn btn-block btn-lg btn-inverse" style="width:60px;">保存</a></div></td></tr>
        </table>

    </div>--%>
         <%--flatui--%>
<%--<script src="flatui/dist/js/flat-ui.min.js"></script>--%>
<script src="../scripts/jquery.min.js"></script>
<script src="../scripts/jquery-cookie/jquery.cookie.js"></script>
<script src="../scripts/bootstrap.min.js"></script>
<script src="js/shouyemgr.js"></script>
</body>
</html>
