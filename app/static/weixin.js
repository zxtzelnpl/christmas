wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp:'' , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名，见附录1
  jsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
  ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
  wx.onMenuShareTimeline({
    title: "圣诞快乐",
    link: 'http://weixin.cjtglm.com/txsecurities-all/wx/toDialList/start2/', /*分享链接需要更改*/
    imgUrl: "http://weixin.cjtglm.com/txsecurities_pics/23.png", /*分享图片需要更改*/
    success: function () {

    }
  });
  wx.onMenuShareAppMessage({
    title: "圣诞快乐",
    desc: "圣诞快乐",
    link: '', /*分享链接需要更改*/
    imgUrl: "", /*分享图片需要更改*/
    success: function () {

    }
  });
});

wx.error(function(){
  console.log('需要在微信端打开页面')
})