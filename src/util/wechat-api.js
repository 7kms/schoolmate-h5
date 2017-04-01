import $api from 'api';
let wx = window.wx;
let config = (config)=>{
    wx.config({
        debug: false,
        appId: config.appid,
        timestamp: parseInt(config.timestamp),
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: ['uploadImage','downloadImage','getLocalImgData','chooseWXPay']
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
wx.error(function(res){
    console.log(res);
});
export {
    register
}
