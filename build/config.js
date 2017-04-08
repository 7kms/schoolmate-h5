var path = require('path')
module.exports = {
    dev:{
        env:{
            NODE_ENV:'"development"'
        },
        port: 3456,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static',
        htmlOptions: {
            filename: 'index.html',
            title: '校友云'
        }
    },
    release:{
        env:{
            NODE_ENV:'"production"'
        },
        htmlOptions: {
            filename: 'index.html',
            title: '校友云'
        },
        sourceMap: false,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static'
    },
    test:{
        env:{
            NODE_ENV:'"test"'
        },
        htmlOptions: {
            filename: 'index.html',
            title: '校友云'
        },
        sourceMap: false,
        assetsRoot: path.resolve(__dirname,'../__dist__'),
        assetsPublicPath: '/',
        assetsSubDir: 'static'
    }
}