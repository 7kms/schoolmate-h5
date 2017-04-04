import $api from 'api';
let wx = window.wx;

let config = (config)=>{
    wx.config({
        debug: false,
        appId: config.appid,
        timestamp: parseInt(config.timestamp),
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','downloadImage','uploadImage','getLocalImgData','chooseWXPay']
    });
};

let register = (url)=>{
    // let url = `${location.host}${location.pathname}`;
    $api.get('/Pay/getJssdkpara',{url})
        .then(data=>{
            config(data);
        },err=>{
            console.log('error');
        })
};

let chooseImage = (opt)=>{
    return new Promise((resolve,reject)=>{
      wx.chooseImage({
        count: opt.count || 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          resolve(res.localIds);
          // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        },
        cancel: function () {
          reject();
        },
        fail: function () {
          reject();
        }
      });
    })
};

let previewImage = (opt)=>{
  wx.previewImage({
    current: '', // 当前显示图片的http链接
    urls: [] // 需要预览的图片http链接列表
  });
};

let uploadImage = (localId)=>{
  return new Promise((resolve,reject)=>{
    wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 0, // 默认为1，显示进度提示
      success: function (res) {
        // var serverId = res.serverId; // 返回图片的服务器端ID
        resolve(res.serverId)
      },
      fail: function () {
        reject();
      }
    });
  });
};

let wechatPay = (obj)=>{
      let option = obj.data;
      wx.chooseWXPay({
        timestamp: option.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: option.nonceStr, // 支付签名随机串，不长于 32 位
        package: option.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: option.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: option.paySign, // 支付签名
        success: function (res) {
          if(res.errMsg == "chooseWXPay:ok" ) {
            //支付成功
            obj.success && obj.success();
          }else{
            obj.error && obj.error();
          }
        }
      });
};

wx.error(function(res){
    console.log(res);
});

export {
    register,
    chooseImage,
    previewImage,
    uploadImage,
    wechatPay
}
