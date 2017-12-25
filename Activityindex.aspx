<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Activityindex.aspx.cs" Inherits="Activityindex" %>

<!DOCTYPE html>

<html lang="en">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
    <title>元旦快乐</title>
    <link href="/christmas/index.css" rel="stylesheet"></head>
    <script>
	    var deviceWidth = document.documentElement.clientWidth < 750 ? document.documentElement.clientWidth : 750;
	    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';//750的设计稿
    </script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script><!--微信分享接口 -->
</head>
<body>
    <form id="form1" runat="server">
	    <div id="root">
	    
	    </div>
		<script type="text/javascript" src="/christmas/vendor.js"></script><script type="text/javascript" src="/christmas/index.2b5f2215.js"></script>
	    <script type="text/javascript">
	        wx.config({
	            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            debug: false,
	            // 必填，公众号的唯一标识
	            appId: '<%=APPid %>',
	            // 必填，生成签名的时间戳
	            timestamp: '<%=timestamp %>',
	            // 必填，生成签名的随机串
	            nonceStr: '<%=nonceStr %>',
	            // 必填，签名
	            signature: '<%=signature %>',
	            // 必填，需要使用的JS接口列表
	            jsApiList: [
	                 'checkJsApi',
	                 'onMenuShareTimeline',
	                 'onMenuShareAppMessage',
	                 'onMenuShareQQ',
	                 'onMenuShareWeibo'
	            ]
	        });
	        wx.ready(function () {
	            //发送到朋友圈
	            wx.onMenuShareTimeline({
	                title: '元旦让利  跨年钜惠', // 分享标题
	                link: 'http://wtg.jyzqsh.com/Activityindex.aspx', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	                imgUrl: 'http://public.jyzqsh.com/christmas/luckDraw/share.jpg', // 分享图标
	                success: function () {
	                    // 用户确认分享后执行的回调函数
	                    alert('已分享');
	                }, cancel: function () {
	                    // 用户取消分享后执行的回调函数
	                }
	            })

	            //发送给朋友
	            wx.onMenuShareAppMessage({
	                title: '元旦让利  跨年钜惠', // 分享标题
	                desc: '元旦让利跨年钜惠 送劲爆豪礼——轮盘大抽奖，厚度超乎你的想象', // 分享描述
	                link: 'http://wtg.jyzqsh.com/Activityindex.aspx', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	                imgUrl: 'http://public.jyzqsh.com/christmas/luckDraw/share.jpg', // 分享图标
	                success: function () {
	                    // 用户确认分享后执行的回调函数
	                    alert('已分享');
	                },
	                cancel: function () {
	                    // 用户取消分享后执行的回调函数
	                }
	            });
	        });
	    </script>
    </form>
</body>
</html>
