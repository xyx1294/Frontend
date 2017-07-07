using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.Sql;

public partial class adminrequest : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string cmd = "";
        if(Request.Form["cmd"]!=null){
            cmd = Request.Form["cmd"];
        }
        if (cmd == "login")//登录
        {
            string u = Request.Form["u"];
            string p = Request.Form["p"];
            string sql = string.Format("select * from h5_admin where aname='{0}' and apassword='{1}'", u, p);
            if (SQLHelper.GetReader(sql).Read())
            {
                Response.Write("success");
            }
            else
            {
                Response.Write("error");
            }
            return;
        }
        if (cmd == "remenbankuai")//热门板块数据获取
        {
            string sql = "select ziclass,sum(clicksum) as clicksum from h5_wenzhang group by ziclass order by clicksum desc";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            Response.Write(tb);
            return;
        }
        if (cmd == "userupdate")//更新用户数据
        {
            int uid = Convert.ToInt32(Request.Form["uid"].ToString());
            int col = Convert.ToInt32(Request.Form["col"].ToString());
            string update = Request.Form["update"].ToString();
            string sql="";
            switch (col)
            {
                case 1: sql = "update h5_user set username='"+update+"' where uid="+uid; break;
                case 2: sql = "update h5_user set email='" + update + "' where uid=" + uid; break;
                case 3: sql = "update h5_user set qq='" + update + "' where uid=" + uid; break;
                case 4: sql = "update h5_user set jifen='" + update + "' where uid=" + uid; break;
                case 5: sql = "update h5_user set timer='" + update + "' where uid=" + uid; break;
            }
            if (SQLHelper.ExcuteSQL(sql) > 1)
            {
                Response.Write("ok");
            }
            return;
        }
        if (cmd == "wenzhangupdate")//更新文章数据
        {
            int tid = Convert.ToInt32(Request.Form["tid"].ToString());
            int col = Convert.ToInt32(Request.Form["col"].ToString());
            string update = Request.Form["update"].ToString();
            string sql = "";
            switch (col)
            {
                case 4: sql = "update h5_wenzhang set clicksum='" + update + "' where tid=" + tid; break;
                case 5: sql = "update h5_wenzhang set pinglun='" + update + "' where tid=" + tid; break;
                case 6: sql = "update h5_wenzhang set timer='" + update + "' where tid=" + tid; break;
            }
            if (SQLHelper.ExcuteSQL(sql) > 1)
            {
                Response.Write("ok");
            }
            return;
        }
        if (cmd == "videoupdate")//更新视频数据
        {
            int tid = Convert.ToInt32(Request.Form["tid"].ToString());
            int col = Convert.ToInt32(Request.Form["col"].ToString());
            string update = Request.Form["update"].ToString();
            string sql = "";
            switch (col)
            {
                case 4: sql = "update h5_wenzhang set clicksum='" + update + "' where tid=" + tid; break;
                case 5: sql = "update h5_wenzhang set pinglun='" + update + "' where tid=" + tid; break;
                case 6: sql = "update h5_wenzhang set timer='" + update + "' where tid=" + tid; break;
            }
            if (SQLHelper.ExcuteSQL(sql) > 1)
            {
                Response.Write("ok");
            }
            return;
        }
        if (cmd == "removelei")//删除类
        {
            string lei = Request.Form["lei"].ToString();
            string sql = "delete from h5_classify where ziclass='" + lei + "'";
            SQLHelper.ExcuteSQL(sql);
            return;
        }
        if (cmd == "addlei")//添加类
        {
            string lei = Request.Form["lei"].ToString();
            string sql = "insert into h5_classify (class,ziclass) values ('其他','"+lei+"')";
            SQLHelper.ExcuteSQL(sql);
            return;
        }
        if (cmd == "uptuijian")//修改推荐
        {
            int tid = Convert.ToInt32(Request.Form["tid"]);
            string lei = Request.Form["lei"].ToString();
            if (SQLHelper.ExcuteSQL("update h5_wenzhang set tuijian='" + lei + "' where tid=" + tid) > 0)
            {
                jctuijian();
            }
            return;
        }
        if (cmd == "liuliang")//流量统计
        {
            int[] time = new int[6];
            for (int i = 0; i < 6;i++ )
            {
                time[i] = 0;
            }
            string timeday = DateTime.Now.ToShortDateString().ToString();
            int h = DateTime.Now.Hour;
            string update="";
            if (h >= 0 && h < 4)
            {
                time[0] = 1;
                update = "update h5_liuliang set time00=time00+1 where timeday='"+timeday+"'";
            }
            else if (h >= 4 && h < 8)
            {
                time[1] = 1;
                update = "update h5_liuliang set time4=time4+1 where timeday='" + timeday + "'";
            }
            else if (h >= 8 && h < 12)
            {
                time[2] = 1;
                update = "update h5_liuliang set time8=time8+1 where timeday='" + timeday + "'";
            }
            else if (h >= 12 && h < 16)
            {
                time[3] = 1;
                update = "update h5_liuliang set time12=time12+1 where timeday='" + timeday + "'";
            }
            else if (h >= 16 && h < 20)
            {
                time[4] = 1;
                update = "update h5_liuliang set time16=time16+1 where timeday='" + timeday + "'";
            }
            else if (h >= 20 && h < 24)
            {
                time[5] = 1;
                update = "update h5_liuliang set time20=time20+1 where timeday='" + timeday + "'";
            }
            string sql = "select top 1 * from  h5_liuliang order by llid desc";
            DataTable  tb =SQLHelper.GetTable(sql);
            if (tb.Rows[0][7].ToString() ==timeday )
            {
                if (SQLHelper.ExcuteSQL(update) > 0)
                {
                    Response.Write("ok");
                    return;
                }
            }
            else
            {
                string insert = string.Format("insert into h5_liuliang (time4,time8,time12,time16,time20,time00,timeday) values ({0},{1},{2},{3},{4},{5},'{6}')", time[1], time[2], time[3], time[4], time[5], time[0], timeday);
                if (SQLHelper.ExcuteSQL(insert) > 0)
                {
                    Response.Write("ok");
                    return;
                }
            }
        }
        //今日流量获取
        if (cmd == "getliuliang")
        {
            string sql = "select top 1 time4,time8,time12,time16,time20,time00 from  h5_liuliang order by llid desc";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            Response.Write(tb);
            return;
        }
        //昨日流量获取
        if (cmd == "getliuliangz")
        {
            string sql = "select top 1 * from (select top 2 * from h5_liuliang order by llid desc) a order by [llid] asc";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            Response.Write(tb);
            return;
        }
        //删除用户
        if (cmd == "removeu")
        {
            int uid = Convert.ToInt32(Request.Form["uid"]);
            string sql = "delete from h5_user where uid=" + uid;
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                Response.Write("已删除");
            }
            else
            {
                Response.Write("error");
            }
            return;
        }
        //删除文章
        if (cmd == "removew")
        {
            int tid = Convert.ToInt32(Request.Form["tid"]);
            string sql = "delete from h5_wenzhang where tid="+tid;
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                Response.Write("已删除");
            }
            else
            {
                Response.Write("error");
            }
            return;
        }
        if (cmd == "adminpass")
        {
            string aname = Request.Form["aname"];
            string oldp = Request.Form["oldp"];
            string newp = Request.Form["newp"];
            string sql="select * from h5_admin where aname='"+aname+"' and apassword='"+oldp+"'";
            if (SQLHelper.GetReader(sql).Read())
            {
                sql = "update h5_admin set apassword='" + newp + "' where aname='" + aname + "'";
                if (SQLHelper.ExcuteSQL(sql) > 0)
                {
                    Response.Write("修改密码成功");
                }
            }
            else
            {
                Response.Write("当前密码错误");
            }
            return;
        }

    }
    public void jctuijian()
    {//保存推荐
        string sql = "select tid,title from h5_wenzhang where tuijian='1'";
        string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
        System.IO.FileStream myFs = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\video1.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
        System.IO.StreamWriter mySw = new System.IO.StreamWriter(myFs);
        mySw.WriteLine(tb);//writeStr为要写入的字符串
        mySw.Close();
        myFs.Close();
        sql = "select tid,title from h5_wenzhang where tuijian='2'";
        tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
        System.IO.FileStream myFs2 = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\video2.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
        System.IO.StreamWriter mySw2 = new System.IO.StreamWriter(myFs2);
        mySw2.WriteLine(tb);//writeStr为要写入的字符串
        mySw2.Close();
        myFs2.Close();
        sql = "select tid,title from h5_wenzhang where tuijian='3'";
        tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
        System.IO.FileStream myFs3 = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\video3.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
        System.IO.StreamWriter mySw3 = new System.IO.StreamWriter(myFs3);
        mySw3.WriteLine(tb);//writeStr为要写入的字符串
        mySw3.Close();
        myFs3.Close();
        sql = "select tid,title from h5_wenzhang where tuijian='4'";
        tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
        System.IO.FileStream myFs4 = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\video4.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
        System.IO.StreamWriter mySw4 = new System.IO.StreamWriter(myFs4);
        mySw4.WriteLine(tb);//writeStr为要写入的字符串
        mySw4.Close();
        myFs4.Close();
    }
}