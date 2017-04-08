# 校友云h5

### h5 部署启动

1. 环境依赖

> 环境依赖nodejs 6.9.0+ 需要安装最新版的 nodejs
一般linux/mac系统会自带nodejs 但是版本比较低,需要先升级到最新版

查看当前nodejs版本
```js
    node -v  或者  nodejs -v

```
   若并未安装nodejs,各系统需先安装nodejs...若版本不够,正常情况下可以通过n模块进行升级

```sheel

npm install -g n
n stable

```
若失败需要进行源码安装


2. 安装依赖包
```javascript
    cd schoolmate-h5
    npm install
```
3.打包部署
这里需要分开发环境和生产(测试)

3.1 开发
```JavaScript
    npm run dev

```
3.2 测试
```JavaScript
    npm run test
```

3.3 生产
```JavaScript
    npm run release
```

4.生产环境服务器部署
以nginx为例

```nginx

  server {
        listen       80;
        location / {
           index index.html;
           root  ~/schoolmate-h5/__dist__;
           try_files $uri $uri/ /index.html =404;
        }
        location ~* ^/static {
          root ~/schoolmate-h5/__dist__;
        }
    }
    
```
> 这里注意需要将404等错误访问定向到index.html  不然页面刷新会出现404
