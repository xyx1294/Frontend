<%@ WebHandler Language="C#" Class="request" %>

using System;
using System.Web;

public class request : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}