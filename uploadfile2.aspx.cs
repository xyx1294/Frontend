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

public partial class uploadfile2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpFileCollection files = Request.Files;
        string msg = string.Empty;
        string error = string.Empty;
        string fileurl;
        if (files.Count > 0)
        {
            string filename = DateTime.Now.Ticks.ToString() + ".rar";//新文件名
            //this.FileUpload1.SaveAs(this.Server.MapPath(@"~\Image\") + filename);
            string flname = System.IO.Path.GetFileName(files[0].FileName);//原文件名
            files[0].SaveAs(this.Server.MapPath(@"~\file\") + filename);
            msg = " 成功! 文件大小为:" + files[0].ContentLength;
            //imgurl = "/" + files[0].FileName;
            fileurl = "<span class='downfile'><a href='file/" + filename+"'>下载附件</a></span>";
            string res = "{ error:'" + error + "', msg:'" + msg + "',fileurl:'" + fileurl + "'}";
            Response.Write(res);
            Response.End();
        }
    }
}