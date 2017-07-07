using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_videomgr : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string key;
        if (Request.QueryString["key"] != null)
        {
            int n;
            int tid = 0;
            string str = Request.QueryString["key"].ToString();
            if (int.TryParse(str, out n))
            {
                tid = Convert.ToInt32(str);
            };
            videomgr.SelectCommand = "SELECT * FROM [h5_wenzhang] where tid=" + tid + " or uid = " + tid + " or title like '%" + str + "%' or ziclass='" + str + "' and video<>'0'";
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("videomgr.aspx");
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        BoundField column = new BoundField();
        column.HeaderText = "推荐文章";
        column.SortExpression = "tuijian";
        column.DataField = "tuijian";
        GridView1.Columns.Add(column);
        //GridView1.Columns.Insert(0, column);
    }
}