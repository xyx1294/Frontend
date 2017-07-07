<%@ WebHandler Language="C#" Class="Handler"%>
using System;
using System.Web;
using System.Web.SessionState;
using System.Data;
using System.Data.SqlClient;

public class Handler : IHttpHandler,IReadOnlySessionState{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string cmd = context.Request.Form["cmd"];
        //搜索
        if (cmd == "sousuo")
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            sb.Append("<ul>");
            string title = context.Request.Form["title"];//接收到从js里面传递过来的title
            string sSql = string.Format("select top 10 title from [h5_wenzhang] where title like '%{0}%' order by [tid] desc", title);//得到查询的sql语句
            DataTable dt = SQLHelper.GetTable(sSql);//得到sql语句在数据库对应的数据表
            if (dt.Rows.Count > 0)//有数据
            {
                for (int i = 0; i < dt.Rows.Count; i++)//把数据表的内容进行循环拼凑到sb里面
                {
                    sb.Append(string.Format("<li>{0}</li>", dt.Rows[i][0].ToString()));
                }
            }
            else
            { //没数据
                sb.Append("<li>没有相关数据</li>");
            }
            sb.Append("</ul>");
            context.Response.Write(sb.ToString());//将拼凑的内容返回给js
            return;
        }
        //高级搜索
        if (cmd == "gjsousuo")
        {
            string Sql = "";
            string keyword = "";
            string lei = "";
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            sb.Append("<ul>");
            string title = context.Request.Form["keyword"];
            if (context.Session["keyword"] != null)
            {
                keyword = context.Session["keyword"].ToString();
            }
            string ss = context.Request.Form["ss"];
            int timer = Convert.ToInt32(context.Request.Form["timer"]);
            string thisuser = context.Request.Form["thisuser"];
            Int32 leixing = Convert.ToInt32(context.Request.Form["leixing"]);
            Int32 page = Convert.ToInt32(context.Request.Form["page"]);
            int uid = 0;
            string zilei = context.Request.Form["zilei"];
            if (context.Request.Form["zilei"] != "" && context.Request.Form["zilei"] != null)
            {
                lei = " and ziclass='" + context.Request.Form["zilei"].ToString().Trim() + "'";
            }
            if (thisuser != "") { uid = getusername(thisuser); }
            string datetime = "";
            switch (timer)
            {
                case 1: datetime = " and timer BETWEEN DATEADD(day,-1,getdate()) and getdate()"; break;
                case 7: datetime = " and timer BETWEEN DATEADD(day,-7,getdate()) and getdate()"; break;
                case 31: datetime = " and timer BETWEEN DATEADD(m,-1,getdate()) and getdate()"; break;
                case 365: datetime = " and timer BETWEEN DATEADD(yyyy,-1,getdate()) and getdate()"; break;
            }
            if (ss == "1")
            {//"select top 10"
                if (leixing != 0)
                {
                    switch (leixing)
                    {
                        case 1: Sql = "select distinct top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by a.tid desc) as rownumber,a.[tid],a.[title],a.[content],a.[timer],a.[ziclass] from h5_wenzhang as a,h5_pinglun as b where a.[title] like '%" + keyword + "%' or a.[content] like '%html%' and a.tid=b.tid) h5_wenzhang where rownumber >0" + datetime + lei; break;
                        case 2: Sql = "select distinct top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by a.tid desc) as rownumber,a.[tid],a.[title],b.[content],a.[timer],a.[ziclass] from h5_wenzhang as a,h5_pinglun as b where  b.[content] like '%" + keyword + "%' and a.tid=b.tid) h5_wenzhang where rownumber >0" + datetime + lei; break;
                        case 3: Sql = "select distinct top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by a.tid desc) as rownumber,a.[tid],a.[title],a.[content],a.[timer],a.[ziclass] from h5_wenzhang as a,h5_pinglun as b where a.[title] like '%" + keyword + "%' or a.[content] like '%" + keyword + "%' or b.[content] like '%" + keyword + "%' and a.tid=b.tid) h5_wenzhang where rownumber >0" + datetime + lei; break;
                    }
                }
                else
                {
                    Sql = string.Format("select  top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by tid desc) as rownumber,* from h5_wenzhang where [title] like '%{1}%' or [content] like '%{1}%') h5_wenzhang where rownumber >{0}" + datetime + lei, 0, keyword);
                }
            }
            if (ss == "2")
            {
                Sql = string.Format("select  top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by tid desc) as rownumber,* from h5_wenzhang where [ziclass] like '%{1}%') h5_wenzhang where rownumber >{0}" + datetime + lei, 0, keyword);
            }
            if (ss == "3")
            {
                Sql = string.Format("select  top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by [clicksum] desc) as rownumber,* from h5_wenzhang where [title] like '%{1}%' or [content] like '%{1}%') h5_wenzhang where rownumber >{0}" + datetime + lei, 0, keyword);
            }
            if (ss == "4")
            {
                Sql = string.Format("select  top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by [pinglun] desc) as rownumber,* from h5_wenzhang where [title] like '%{1}%' or [content] like '%{1}%') h5_wenzhang where rownumber >{0}" + datetime + lei, 0, keyword);
            }
            if (ss == "5")
            {
                Sql = "select  distinct top " + page + " [tid],[title],[content],[timer] from (select row_number() over(order by a.tid desc) as rownumber,a.[tid],a.[title],a.[content],a.[timer] from h5_wenzhang as a,h5_pinglun as b where a.tid=b.tid and a.uid=" + uid + " or b.uid=" + uid + " ) h5_wenzhang where rownumber >0" + datetime;
            }
            DataTable tb = SQLHelper.GetTable(Sql);
            if (tb.Rows.Count > 0)//有数据
            {
                for (int i = 0; i < tb.Rows.Count; i++)
                {
                    sb.Append(string.Format("<li><h5><a href='{0}' target='_black'>{1}</a></h5><p>{2}</p><p style='margin:0;display:inline;'>{3}</p></li>", "wenzhang.aspx?tid=" + tb.Rows[i][0].ToString(), tb.Rows[i][1].ToString(), NoHtml(tb.Rows[i][2].ToString()), tb.Rows[i][3].ToString()));
                }
            }
            sb.Append("</ul>");
            context.Response.Write(sb.ToString());
            return;
        }

        //跳到文章
        if (cmd == "getwz")
        {
            string title = context.Request.Form["wztitle"].ToString();
            string tid = SQLHelper.GetTable("select [tid] from [h5_wenzhang] where title='" + title + "'").Rows[0][0].ToString();
            context.Response.Write(tid);
        }
        //获取最新菜单父类
        if (cmd == "menuclass")
        {
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select distinct [class] from [h5_classify]"));
            context.Response.Write(tb);
            return;
        }
        //获取最新菜单子类
        if (cmd == "menuziclass")
        {
            string fuclass = context.Request.Form["fuclass"].ToString();
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select [ziclass] from [h5_classify] where [class]='" + fuclass + "'"));
            context.Response.Write(tb);
            return;
        }
        //生成菜单[后台功能]
        if (cmd == "menu")
        {
            //设置类
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select distinct [class] from [h5_classify]"));
            System.IO.FileStream myFs = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\class.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
            System.IO.StreamWriter mySw = new System.IO.StreamWriter(myFs);
            mySw.WriteLine(tb);//writeStr为要写入的字符串
            mySw.Close();
            myFs.Close();
            //设置子类
            string tb2 = ConvertJson.ToJson(SQLHelper.GetTable("select [class],[ziclass] from [h5_classify]"));
            System.IO.FileStream myFs2 = new System.IO.FileStream(System.Web.HttpContext.Current.Server.MapPath(@"~\static_data\ziclass.json"), System.IO.FileMode.Create);//txtFilePath为生成txt文件的路径
            System.IO.StreamWriter mySw2 = new System.IO.StreamWriter(myFs2);
            mySw2.WriteLine(tb2);//writeStr为要写入的字符串
            mySw2.Close();
            myFs2.Close();
            context.Response.Write(tb2);
            return;
        }
        if (cmd == "jinghua")//获取精华文章
        {
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select tid,ziclass,title,clicksum,pinglun from h5_wenzhang where pinglun <> 0 order by (clicksum/pinglun)"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "remen")//获取文章热门
        {
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select top 10 tid,ziclass,title,clicksum,pinglun from h5_wenzhang order by clicksum desc"));
            context.Response.Write(tb);
            return;
        }
        //video.aspx生成文章[后台功能]

        if (cmd == "gengxin")//获取最新文章
        {
            int page = Convert.ToInt32(context.Request.Form["page"]);
            string ziclass = "";
            if (context.Request.Form["ziclass"] != null && context.Request.Form["ziclass"] != "")
            {
                ziclass = " where ziclass = '" + context.Request.Form["ziclass"] + "'";
            }
            //string tb = NoHtml(ConvertJson.ToJson(SQLHelper.GetTable(string.Format("select top 10 * from (select row_number() over(order by tid desc) as rownumber,* from h5_wenzhang{0}) h5_wenzhang where rownumber >{1}", ziclass,page))));不返回touxiang列
            string sql = string.Format("select top 10 c.rownumber,a.tid,b.username,a.ziclass,a.title,left(a.content,300) as content,a.video,a.pic,a.[file],a.clicksum,a.pinglun,a.timer,touxiang from h5_wenzhang AS A LEFT JOIN h5_user AS B ON A.uid=B.uid LEFT JOIN (select row_number() over(order by tid desc) as rownumber,*  from h5_wenzhang{0}) c on A.tid=c.tid where c.rownumber>{1}", ziclass, page);
            DataTable datat = SQLHelper.GetTable(sql);
            string date = "";
            for (var i = 0; i < datat.Rows.Count; i++)
            {
                DateTime dt = Convert.ToDateTime(datat.Rows[i][11].ToString());
                DateTime timer = DateTime.Now.ToLocalTime();
                TimeSpan timediff = timer - dt;
                if (Convert.ToInt32(timediff.TotalMinutes) > 60)
                {
                    if (Convert.ToInt32(timediff.TotalMinutes) / 60 >= 24)
                    {
                        date = (Convert.ToInt32(timediff.TotalMinutes) / 60 / 24) + "天前";
                    }
                    else
                    {
                        date = (Convert.ToInt32(timediff.TotalMinutes) / 60) + "小时前";
                    }
                }
                else
                {
                    date = Convert.ToInt32(timediff.TotalMinutes) + "分钟前";
                }
                datat.Rows[i][11] = date;
            }
            string tb = ConvertJson.ToJson(datat);
            if (tb == "]")
            {
                context.Response.Write("error");
            }
            else
            {
                context.Response.Write(tb);
            }
            return;
        }
        if (cmd == "fenyesum")//获取总页数
        {
            string ziclass = "";
            if (context.Request.Form["ziclass"] != null && context.Request.Form["ziclass"] != "")
            {
                ziclass = " where ziclass = '" + context.Request.Form["ziclass"] + "'";
            }
            int ps = Convert.ToInt32(SQLHelper.GetTable("select count(*) from [h5_wenzhang]" + ziclass).Rows[0][0].ToString());
            int pagesize = 0;
            if (ps % 10 != 0)
            {
                pagesize = ps / 10 + 1;
            }
            else
            {
                pagesize = ps / 10;
            }
            context.Response.Write(pagesize);
        }
        if (cmd == "getzxwzpic")//获取最新文章图片和标题
        {
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select top 3 [tid],[title],[pic] from h5_wenzhang where pic<>'0' order by tid desc"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "fabiao")//发表文章
        {
            string username = "";
            if (context.Session["username"] != null) { username = context.Session["username"].ToString(); }
            username = context.Request.Form["username"].Trim();
            int uid = getusername(username);
            string fenlei = context.Request.Form["fenlei"].Trim();
            string title = "[" + fenlei + "]  " + context.Request.Form["title"].Trim();
            string content = context.Request.Form["content"].Replace("'", "\"");
            string img = context.Request.Form["img"];
            string file = context.Request.Form["file"];
            string video = context.Request.Form["video"];
            string timer = DateTime.Now.ToString();
            string sql = string.Format("insert into [h5_wenzhang](uid,ziclass,title,content,pic,timer,video,clicksum,pinglun,[file])values('{0}','{1}','{2}','{3}','{4}','{5}','{7}','0','0','{6}')", uid, fenlei, title, content, img, timer, file, video);
            if (SQLHelper.ExcuteSQL(sql) > 0) { context.Response.Write(SQLHelper.GetTable("select [tid] from [h5_wenzhang] where [timer]='" + timer + "'").Rows[0][0].ToString()); }
            return;
        }
        if (cmd == "wenzhang")//读取文章
        {
            if (context.Session["tid"] != null)
            {
                string wenzhangid = context.Session["tid"].ToString();
                SQLHelper.ExcuteSQL("update [h5_wenzhang] set clicksum=clicksum+1 where tid=" + wenzhangid);
                SQLHelper.ExcuteSQL("update [h5_wenzhang] set pinglun = (select count(*) from [h5_pinglun] where tid=" + wenzhangid + ") where [tid]=" + wenzhangid);
                DataTable t = SQLHelper.GetTable("select *,b.username from [h5_wenzhang] as a left join h5_user as b on a.uid=b.uid where tid=" + wenzhangid);
                if (t.Rows.Count > 0)
                {
                    string tb = ConvertJson.ToJson(t);
                    context.Response.Write(tb);
                }
                else
                {
                    context.Response.Write("未能获取到文章内容！");
                }
                return;
            }
            else
            {
                return;
            }

        }
        if (cmd == "pinglun")//读取评论
        {
            string tid = context.Session["tid"].ToString();
            string sql = "select a.*,b.username,b.touxiang from [h5_pinglun] as a left join h5_user as b on a.uid=b.uid where a.[tid]=" + tid;
            DataTable t = SQLHelper.GetTable(sql);
            if (t.Rows.Count > 0)
            {
                string tb = ConvertJson.ToJson(t);
                context.Response.Write(tb);
                return;
            }
        }
        if (cmd == "userlogin")//用户登录
        {
            string email = context.Request.Form["email"];
            string password = context.Request.Form["password"];
            if (SQLHelper.GetTable(string.Format("select * from [h5_user] where [email]='{0}' and [password]='{1}'", email, password)).Rows.Count > 0)
            {
                string tb = ConvertJson.ToJson(SQLHelper.GetTable("select [username],touxiang from h5_user where email='" + email + "'"));
                HttpContext.Current.Session["username"] = SQLHelper.GetTable("select [username] from h5_user where email='" + email + "'").Rows[0][0].ToString();
                context.Response.Write(tb);
                return;
            }
            else
            {
                context.Response.Write("error");
                return;
            }

        }
        if (cmd == "userreg")//用户注册
        {
            string username = context.Request.Form["username"];
            string email = context.Request.Form["email"];
            string password = context.Request.Form["password"];
            string timer = DateTime.Now.ToString();
            string sql = string.Format("insert into [h5_user](touxiang,username,password,email,timer)values('{0}','{1}','{2}','{3}','{4}')", "images/touxiang.png", username, password, email, timer);
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                context.Response.Write(username);
                return;
            }
        }
        if (cmd == "nowuser")//获取当前登录用户
        {
            if (context.Session["username"] != null)
            {
                string nowuser = context.Session["username"].ToString();
                string tb = ConvertJson.ToJson(SQLHelper.GetTable("select [username],touxiang from h5_user where username='" + nowuser + "'"));
                context.Response.Write(tb);
                return;
            }
            else
            {
                context.Response.Write("nologin");
                return;
            }
        }
        if (cmd == "clearuser")//清除当前登录用户
        {
            HttpContext.Current.Session["username"] = null;
            context.Response.Write("ok");
            return;
        }
        if (cmd == "usertouxiang")//获取用户头像
        {
            string username = context.Request.Form["username"];
            context.Response.Write(ConvertJson.ToJson(SQLHelper.GetTable("select touxiang from h5_user where username='" + username + "'")));
            return;
        }
        if (cmd == "usertouxiang2")//获取用户头像
        {
            int uid = Convert.ToInt32(context.Request.Form["uid"]);
            context.Response.Write(SQLHelper.GetTable("select touxiang from h5_user where uid=" + uid).Rows[0][0].ToString());
            return;
        }
        if (cmd == "getuid")//获取用户id
        {
            string username = context.Request.Form["username"];
            context.Response.Write(SQLHelper.GetTable("select uid from h5_user where username='" + username + "'").Rows[0][0].ToString());
            return;
        }
        if (cmd == "huifu")//回复文章
        {
            string timer = DateTime.Now.ToString();
            string username = context.Request.Form["username"];
            string title = context.Request.Form["title"];
            int uid = getusername(username);
            string content = context.Request.Form["content"];
            string tid = context.Session["tid"].ToString();
            string sql = string.Format("insert into [h5_pinglun](tid,uid,content,timer)values('{0}','{1}','{2}','{3}')", tid, uid, content, timer);
            string sql2 = "update [h5_wenzhang] set [pinglun]=[pinglun]+1 where [tid]=" + tid;
            string sql3 = "update [h5_user] set jifen=jifen+1 where username = '" + username + "'";
            if (SQLHelper.ExcuteSQL(sql) > 0 && SQLHelper.ExcuteSQL(sql2) > 0)
            {
                SQLHelper.ExcuteSQL(sql3);
                context.Response.Write(timer);
                //更新动态
                string str = string.Format("insert into h5_dongtai(uid,content,timer) values ({0},'{1}','{2}')", uid, "<a href=\"user_index.aspx?user=" + username + "\">" + username + "</a>评论了 <a href=\"wenzhang.aspx?tid=" + tid + "\">" + title + "</a>：" + content + "", timer);
                SQLHelper.ExcuteSQL(str);
                return;
            }
        }
        if (cmd == "newvideo")//获取最新视频
        {
            int sum = Convert.ToInt32(context.Request.Form["videosum"]);
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(string.Format("select top {0} tid,ziclass,pic,title,video,username from h5_wenzhang,h5_user where video<>'0' and h5_wenzhang.uid=h5_user.uid order by tid desc", sum)));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "remenvideo")//获取热门视频
        {
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select top 6 tid,ziclass,pic,title,video,username from h5_wenzhang,h5_user where video<>'0' and h5_wenzhang.uid=h5_user.uid and video<>'0' order by [clicksum] desc"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "addfriend")//加为好友
        {
            string name = context.Request.Form["name"];
            string fname = context.Request.Form["fname"];
            string timer = DateTime.Now.ToString();
            if (name == fname) { context.Response.Write("error!"); return; }
            string sql = "select uid from h5_friend where uid in (select uid from h5_user where username='" + name + "') and fuid= (select uid from h5_user where username='" + fname + "') or uid in (select uid from h5_user where username='" + fname + "') and fuid= (select uid from h5_user where username='" + name + "')";
            if (SQLHelper.GetReader(sql).Read())
            {
                context.Response.Write("我们已经是好友了！");
            }
            else
            {
                int uid = getusername(name);
                int fuid = getusername(fname);
                string sql2 = "insert into [h5_friend] values (" + uid + "," + fuid + ")";
                if (SQLHelper.ExcuteSQL(sql2) > 0)
                {
                    context.Response.Write("添加好友成功！");
                    //更新动态
                    string str = string.Format("insert into h5_dongtai(uid,content,timer) values ({0},'{1}','{2}')", uid, "<a href=\"user_index.aspx?user=" + name + "\">" + name + "</a>关注了 <a href=\"user_index.aspx?user=" + fname + "\">" + fname + "</a>", timer);
                    SQLHelper.ExcuteSQL(str);
                }
            }
            return;
        }
        if (cmd == "dongtai")//获取最新动态
        {
            string date = "";
            string sql = "select top 3 touxiang,[content],a.[timer] from h5_dongtai as a,h5_user as b where a.uid=b.uid  order by did desc";
            DataTable tb = SQLHelper.GetTable(sql);
            for (var i = 0; i < tb.Rows.Count; i++)
            {
                DateTime dt = Convert.ToDateTime(tb.Rows[i][2].ToString());
                DateTime timer = DateTime.Now.ToLocalTime();
                TimeSpan timediff = timer - dt;
                if (Convert.ToInt32(timediff.TotalMinutes) > 60)
                {
                    if (Convert.ToInt32(timediff.TotalMinutes) / 60 >= 24)
                    {
                        date = (Convert.ToInt32(timediff.TotalMinutes) / 60 / 24) + "天前";
                    }
                    else
                    {
                        date = (Convert.ToInt32(timediff.TotalMinutes) / 60) + "小时前";
                    }
                }
                else
                {
                    date = Convert.ToInt32(timediff.TotalMinutes) + "分钟前";
                }
                tb.Rows[i][2] = date;
            }

            context.Response.Write(ConvertJson.ToJson(tb));
            return;
        }
        //层主点评
        if (cmd == "dianping")
        {
            int pid = Convert.ToInt32(context.Request.Form["pid"]);
            string content2 = context.Request.Form["content"];
            string sql = "update h5_pinglun set [dianping]=isnull([dianping],'')+'" + content2 + "' where pid=" + pid;
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                context.Response.Write("ok");
            }
            else
            {
                context.Response.Write("no");
            }
        }
        //发表编辑
        if (cmd == "edit")
        {
            string username = context.Request.Form["username"];
            int muid = Convert.ToInt32(getusername(context.Request.Form["username"]));
            int tid = Convert.ToInt32(context.Request.Form["tid"]);
            if (username == "admin")
            {
                string sql = "select [title],[content] from h5_wenzhang where [tid]=" + tid;
                string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
                context.Response.Write(tb);
                return;
            }
            int uid = Convert.ToInt32(SQLHelper.GetTable("select uid from h5_wenzhang where [tid]=" + tid).Rows[0][0].ToString());
            if (muid != uid)
            {
                context.Response.Write("no");
                return;
            }
            else
            {
                string sql = "select [title],[content] from h5_wenzhang where [tid]=" + tid;
                string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
                context.Response.Write(tb);
                return;
            }
        }
        //编辑
        if (cmd == "editcontent")
        {
            string fenlei = context.Request.Form["fenlei"].Trim();
            string title = "[" + fenlei + "]  " + context.Request.Form["title"].Trim();
            string content = context.Request.Form["content"].Replace("'", "\"");
            string img = context.Request.Form["img"];
            string file = "";
            string video = "";
            if (context.Request.Form["file"] != null) { file = context.Request.Form["file"]; }
            if (context.Request.Form["video"] != null) { video = context.Request.Form["video"]; }
            int tid = Convert.ToInt32(context.Request.Form["tid"]);
            string timer = DateTime.Now.ToString();
            string sql = string.Format("update h5_wenzhang set ziclass='{0}',title='{1}',[content]='{2}',pic='{3}',timer='{4}',[file]='{5}',[video]='{7}' where tid={6}", fenlei, title, content, img, timer, file, tid, video);
            if (SQLHelper.ExcuteSQL(sql) > 0) { context.Response.Write(SQLHelper.GetTable("select [tid] from [h5_wenzhang] where [timer]='" + timer + "'").Rows[0][0].ToString()); }
            return;
        }
        //猜你想看
        if (cmd == "cainikan")
        {
            string sql = "Select Top 5 tid,touxiang,username,title,a.timer From h5_wenzhang as a,h5_user as b where a.uid=b.uid Order By NEWID()";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        //推荐视频
        if (cmd == "cainixue")
        {
            string sql = "Select Top 5 tid,touxiang,username,title,a.timer From h5_wenzhang as a,h5_user as b where a.uid=b.uid and a.video<>'0' Order By NEWID()";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        //关键字爬虫推荐
        if (cmd == "pachong1")
        {
            string key = context.Request.Form["key"].Trim();
            string keyword = "";
            for (int i=0; i < key.Length; i++)
            {
                keyword += "%" + key.Substring(i, 1);
                if (i == key.Length - 1)
                {
                    keyword += "%";
                }
            }
            //string sql = "select top 10 * from h5_wenzhang where title like '"+keyword+"'";
            string sql = "Select Top 5 tid,touxiang,username,title,a.timer From h5_wenzhang as a,h5_user as b where a.uid=b.uid and title like '" + keyword + "'";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "pachong2")
        {
            string key = context.Request.Form["key"].Trim();
            string keyword = "";
            for (int i = 0; i < key.Length; i++)
            {
                keyword += "%" + key.Substring(i, 1);
                if (i == key.Length - 1)
                {
                    keyword += "%";
                }
            }
            //string sql = "select top 10 * from h5_wenzhang where title like '"+keyword+"'";
            string sql = "Select Top 5 tid,touxiang,username,title,a.timer From h5_wenzhang as a,h5_user as b where a.uid=b.uid and a.video<>'0' and title like '" + keyword + "'";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        //收藏
        if (cmd == "shoucang")
        {
            int uid = getusername(context.Request.Form["username"]);
            int tid = Convert.ToInt32(context.Request.Form["tid"]);
            string sql = "insert into h5_shoucang(uid,tid) values (" + uid + "," + tid + ")";
            if (SQLHelper.GetTable("select * from h5_shoucang where uid=" + uid + " and tid=" + tid).Rows.Count > 0)
            {
                context.Response.Write("该帖子已经收藏了！");
                return;
            }
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                context.Response.Write("已添加到收藏夹！");
            }
            else
            {
                context.Response.Write("未知错误,添加到收藏夹失败！");
            }
            return;
        }
        //视频分享排行
        if (cmd == "videoph")
        {
            string sql = "select username,COUNT(*) as sum from h5_wenzhang,h5_user where video<>'0' and h5_wenzhang.uid=h5_user.uid group by h5_wenzhang.uid,username order by COUNT(*) desc";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        //--------------------------------------个人资料
        if (cmd == "usermsg")//获取用户信息
        {
            string username = context.Request.Form["username"].ToString();
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select * from [h5_user] where username ='" + username + "'"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "userwz")//获取用户文章
        {
            string username = context.Request.Form["username"].ToString();
            string tb = NoHtml(ConvertJson.ToJson(SQLHelper.GetTable("select a.* from h5_wenzhang as a left join h5_user as b on a.uid=b.uid where b.username='" + username + "'")));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "uservideo")//获取用户视频
        {
            string username = context.Request.Form["username"].ToString();
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select ziclass,title,video from h5_wenzhang where uid=" + getusername(username) + " and video!='0' order by tid desc"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "usersc")//获取用户收藏
        {
            string username = context.Request.Form["username"].ToString();
            string tb = ConvertJson.ToJson(SQLHelper.GetTable("select * from [h5_wenzhang] where [tid] in (select [tid] from [h5_shoucang] as a left join h5_user as b on a.uid=b.uid where b.[username]='" + username + "')"));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "friend")//获取好友
        {
            string username = context.Request.Form["username"].ToString();
            string sql = "select username,touxiang,[online] from h5_friend as a left join h5_user as b on a.fuid=b.uid where a.uid in (select uid from h5_user where username='日光') or a.fuid= (select uid from h5_user where username='" + username + "')";
            string json = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(json);
            return;
        }
        if (cmd == "gettouxiang")//获取头像
        {
            string username = context.Request.Form["username"].ToString();
            context.Response.Write(SQLHelper.GetTable("select touxiang from h5_user where [username]='" + username + "'").Rows[0][0].ToString());
            return;
        }
        if (cmd == "getname")//获取昵称
        {
            int uid = Convert.ToInt32(context.Request.Form["uid"].ToString());
            context.Response.Write(SQLHelper.GetTable("select username from h5_user where uid=" + uid).Rows[0][0].ToString());
            return;
        }
        if (cmd == "getliuyan")//获取留言
        {
            string username = context.Request.Form["username"].ToString();
            string sql = "select b.[touxiang],b.[username],a.[content],a.[timer] from h5_liuyan as a left join h5_user as b on a.guest=b.uid where a.uid=" + getusername(username) + " order by a.lid desc";
            string tb = ConvertJson.ToJson(SQLHelper.GetTable(sql));
            context.Response.Write(tb);
            return;
        }
        if (cmd == "fbliuyan")//发表留言
        {
            string username = context.Request.Form["username"].ToString();
            string guest = context.Request.Form["guest"].ToString();
            string content = context.Request.Form["content"].ToString();
            string timer = context.Request.Form["timer"].ToString();
            int uid = getusername(username);
            int gid = getusername(guest);
            string sql = string.Format("insert into [h5_liuyan](uid,guest,content,timer) values ({0},{1},'{2}','{3}')", uid, gid, content, timer);
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                context.Response.Write("ok");
                //更新动态
                string str = string.Format("insert into h5_dongtai(uid,content,timer) values ({0},'{1}','{2}')", gid, "<a href=\"user_index.aspx?user=" + guest + "\">" + guest + "</a>在<a href=\"user_index.aspx?user=" + username + "\">" + username + "</a>空间留言：" + content + "", timer);
                SQLHelper.ExcuteSQL(str);
                return;
            }
        }
        if (cmd == "savageren")//保存个人信息
        {
            string username = context.Request.Form["username"].ToString();
            string touxiang = context.Request.Form["touxiang"].ToString();
            string nicheng = context.Request.Form["nicheng"].ToString();
            string email = context.Request.Form["email"].ToString();
            string qq = context.Request.Form["qq"].ToString();
            string sql = string.Format("update [h5_user] set [touxiang]='{0}',[username]='{1}',[email]='{2}',[qq]='{3}' where username='" + username + "'", touxiang, nicheng, email, qq);
            if (SQLHelper.ExcuteSQL(sql) > 0)
            {
                context.Response.Write("保存个人信息成功！");
            }
            return;
        }
    }
    public int getusername(string username)
    {
        int uid = Convert.ToInt32(SQLHelper.GetTable("select uid from h5_user where username='" + username + "'").Rows[0][0]);
        return uid;
    }

    public bool IsReusable {
        get {
            return false;
        }
    }
    public string NoHtml(string html)
    {
        string StrNohtml = System.Text.RegularExpressions.Regex.Replace(html, "<[^>]+>", "");
        StrNohtml = System.Text.RegularExpressions.Regex.Replace(StrNohtml, "&[^;]+;", "");
        return StrNohtml;
    }

}