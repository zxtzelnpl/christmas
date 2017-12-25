using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Activityindex : System.Web.UI.Page
{
    wx_token wx = new wx_token();
    public static string APPid = "";
    public static string timestamp = "";
    public static string nonceStr = "";
    public static string signature = "";
    SQLDB.QTDBFun ole = new SQLDB.QTDBFun();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //分享方法 最好别动
            Fenxiang();
        }
    }
    public void Fenxiang()
    {
        //生成签名的时间戳  
        TimeSpan ts = DateTime.Now - DateTime.Parse("1970-01-01 00:00:00");
        string timestamp_s = ts.TotalSeconds.ToString().Split('.')[0];
        //生成签名的随机串  
        string nonceStr_s = GetRandCode(16);

        string url_token = "http://wtg.jyzqsh.com/WX/wx_Access_Token.aspx";
        string Access_token = HttpGet(url_token, "");  //获得Access_Token
        string ticket = "";

        string sql = "select * from dbl_wx_ticket where type_status='99'";
        DataTable dt = ole.dataTable(sql);
        if (dt.Rows.Count > 0)
        {
            DateTime endTime = Convert.ToDateTime(DateTime.Now.ToString());    //当前时间
            DateTime startTime = Convert.ToDateTime(dt.Rows[0]["Create_time"].ToString());  //录入时间
            TimeSpan ts_sss = endTime - startTime;
            if (ts_sss.TotalSeconds >= 7180)
            {
                string json = HttpGet("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + Access_token + "&type=jsapi", "");
                var jObject = JObject.Parse(json);  //解析json

                sql = string.Format(@"update dbl_wx_ticket set ticket='{0}',Create_time='{1}' where type_status='99'", jObject["ticket"].ToString(), DateTime.Now);
                ole.ExecuteUpdate(sql);
                ticket = jObject["ticket"].ToString();
            }
            else
            {
                ticket = dt.Rows[0]["ticket"].ToString();
            }
        }
        //当前网页的URL  
        string pageurl = Request.Url.AbsoluteUri;

        //对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串  
        string str = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr_s + "&timestamp=" + timestamp_s + "&url=" + pageurl;
        //签名,使用SHA1生成  
        string signature_s = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(str, "SHA1").ToLower();

        APPid = wx.AppID;
        timestamp = timestamp_s;
        nonceStr = nonceStr_s;
        signature = signature_s;
    }
    /// <summary>
    /// 生成随机字符
    /// </summary>
    /// <param name="iLength">生成字符串的长度</param>
    /// <returns>返回随机字符串</returns>
    public static string GetRandCode(int iLength)
    {
        string sCode = "";
        if (iLength == 0)
        {
            iLength = 4;
        }
        string codeSerial = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        string[] arr = codeSerial.Split(',');
        int randValue = -1;
        Random rand = new Random(unchecked((int)DateTime.Now.Ticks));
        for (int i = 0; i < iLength; i++)
        {
            randValue = rand.Next(0, arr.Length - 1);
            sCode += arr[randValue];
        }
        return sCode;
    }
    /// <summary>  
    /// GET请求与获取结果  
    /// </summary>  
    public static string HttpGet(string Url, string postDataStr)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
        request.Method = "GET";
        request.ContentType = "text/html;charset=UTF-8";
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        Stream myResponseStream = response.GetResponseStream();
        StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.UTF8);
        string retString = myStreamReader.ReadToEnd();
        myStreamReader.Close();
        myResponseStream.Close();

        return retString;
    }
}