<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="fabiao.aspx.cs" Inherits="fabiao" ValidateRequest="false"%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link type="text/css" href="Style/fabiao.less" rel="stylesheet/less">
    <script src="scripts/ajaxfileupload.js"></script>

    <%--富文本编辑器调用--%>
    <link rel="stylesheet" href="trumbowyg/design/css/trumbowyg.css">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="pure-g fb_box">

        <div class="pure-u-1-5 fb_fenlei">
        <select>
          <option value ="">请选择分类</option>
        </select>
        </div>

        <div class="pure-u-4-5 fb_title"><input type="text" placeholder="请输入文章标题" /></div>

        <div class="pure-u-1 fb_content"><%--富文本编辑器--%>

                <div id="customized-buttonpane" class="editor"></div>

            <button class="button button-primary button-rounded button-small" id="fabiao">发表</button>

        </div>
    </div>
    <div id="upfile" style="display:none;width:250px;"><input type="file" id="file1" name="file" /><div>文件格式支持:gif、jpg、jpeg、png、gif、rar、zip、flv、mp4</div></div>
        <script src="trumbowyg/trumbowyg.js"></script>
        <script src="trumbowyg/langs/fr.js"></script>
        <script src="scripts/fabiao.js"></script>
</asp:Content>
