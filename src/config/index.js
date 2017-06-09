let server = process.env.NODE_ENV == "production" ?  'http://wechat.sweet3158.com' : 'http://www.chenfangli.com';
module.exports = {
  server,
  serverUrl: `${server}/index.php`
};