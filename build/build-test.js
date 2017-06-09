// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'test'
const path = require('path')
// require('../MP_verify_SV9CeydnGwoViOYq.txt')
const webpack = require('webpack')
const webpackConfig = require('./webpack.release.config')
var config = require('./config').release



var assetsPath = path.join(config.assetsRoot, config.assetsSubDir)
rm('-rf', config.assetsRoot)

mkdir('-p', assetsPath)
cp(path.resolve(__dirname,'../MP_verify_4gruzCH0ofsFW7xX.txt'), config.assetsRoot)
cp(path.resolve(__dirname,'../MP_verify_SV9CeydnGwoViOYq.txt'), config.assetsRoot)

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')

})
