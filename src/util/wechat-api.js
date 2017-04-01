import $api from 'api';
let wx = window.wx;
function RandomString(length) {
    var str = '';
    for ( ; str.length < length; str += Math.random().toString(36).substr(2) );
    return str.substr(0, length);
}
function onBridgeReady(option){
    let data = option.data;
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId":data.appid,     //公众号名称，由商户传入
            "timeStamp": String(Date.now()).slice(0,-3),         //时间戳，自1970年以来的秒数
            "nonceStr": RandomString(32), //随机串
            "package":`prepay_id=${data.prepay_id}`,
            "signType":"MD5",         //微信签名方式：
            "paySign":data.sign //微信签名
        },
        function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                option.callback &&  option.callback();
            }
        }
    );
}
let config = (config)=>{
    wx.config({
        debug: true,
        appId: config.appid,
        timestamp: parseInt(config.timestamp),
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: ['uploadImage','downloadImage','getLocalImgData','chooseWXPay','getBrandWCPayRequest']
    });
};
let register = (url)=>{
    console.log(url)
    console.log(encodeURIComponent(url))
    $api.get('/Pay/getJssdkpara',{url})
        .then(data=>{
            config(data);
        },err=>{
            console.log('error');
        })
};
let wechatPay = (option)=>{
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', function(){
                onBridgeReady(option);
            }, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', function(){
                onBridgeReady(option);
            });
            document.attachEvent('onWeixinJSBridgeReady', function(){
                onBridgeReady(option);
            });
        }
    }else{
        onBridgeReady(option);
    }
};


wx.error(function(res){
    console.log(res);
});
export {
    register,
    wechatPay
}
