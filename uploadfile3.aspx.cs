using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

public partial class uploadfile3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpFileCollection files = Request.Files;
        string msg = string.Empty;
        string error = string.Empty;
        string videourl;
        if (files.Count > 0)
        {
            //this.FileUpload1.SaveAs(this.Server.MapPath(@"~\Image\") + filename);
            string flname = System.IO.Path.GetFileName(files[0].FileName);//原文件名
            string filename = DateTime.Now.Ticks.ToString() + GetLastStr(flname, 4);//新文件名
            files[0].SaveAs(this.Server.MapPath(@"~\video\") + filename);
            msg = " 成功! 文件大小为:" + files[0].ContentLength;
            //imgurl = "/" + files[0].FileName;
            videourl = "<a href=\"video/" + filename + "\" class=\"button button-primary button-pill button-small palyvideo\">播放视频</a>";
            string res = "{ error:'" + error + "', msg:'" + msg + "',fileurl:'" + videourl + "'}";
            Response.Write(res);
            Response.End();
        }
    }
    public string GetLastStr(string str, int num)//string.right
    {
        int count = 0;
        if (str.Length > num)
        {
            count = str.Length - num;
            str = str.Substring(count, num);
        }
        return str;
    }
}