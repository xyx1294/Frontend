using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_usermgr : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string key;
        if (Request.QueryString["key"] != null)
        {
            int n;
            int uid = 0;
            string str = Request.QueryString["key"].ToString();
            if (int.TryParse(str, out n))
            {
                uid = Convert.ToInt32(str);
            };
            usermgr.SelectCommand = "SELECT [uid], [username], [password], [email], [qq], [jifen], [timer] FROM [h5_user] where uid=" + uid + " or username like '%" + str + "%'";
        }
    }

}