import Util from './index';
import $api from 'api';
let wx = window.wx;
let isRegisterd = false;
let config = (config)=>{
    return new Promise((resolve,reject)=>{
        wx.config({
            debug: false,
            appId: config.appid,
            timestamp: parseInt(config.timestamp),
            nonceStr: config.noncestr,
            signature: config.signature,
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','chooseImage','previewImage','downloadImage','uploadImage','getLocalImgData','chooseWXPay']
        });
        wx.ready(()=>{
            isRegisterd = true;
            resolve();
        });
        wx.error(function(err){
            isRegisterd = false;
            reject(err);
        });
    })

};

let register = (url = window.location.href)=>{
    // let url = `${location.host}${location.pathname}`;
    if(isRegisterd && Util.isIOS()){
        return Promise.resolve();
    }
    return $api.get('/Pay/getJssdkpara',{url})
        .then(data=>{
            return config(data);
        },err=>{
            return Promise.reject(err);
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


let wechatShare = ({title, link = window.location.href, imgUrl, desc})=>{
    imgUrl = Util.postUrl(imgUrl);
    wx.onMenuShareTimeline({
        title, // 分享标题
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareQQ({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接
        imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
};

export {
    register,
    chooseImage,
    previewImage,
    uploadImage,
    wechatPay,
    wechatShare
}
