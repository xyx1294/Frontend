using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_js_wenzhangmgr : System.Web.UI.Page
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
            wenzhangsql.SelectCommand = "SELECT * FROM [h5_wenzhang] where tid=" + tid + " or uid = "+tid+" or title like '%" + str + "%' or ziclass='"+str+"'";
        }
    }
}