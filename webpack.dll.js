/**
 * 使用dll技术，对某些库（第三方库：jquery,react）单独进行打包
 * 当运行webpack时，默认查找webpack.config.js 配置文件
 * 指定webpack文件  webpack --config webpack.dll.js
 */
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]',
  },
  
  plugins: [
    // 建立打包的依赖关系
    // 打包生成一个manifest.json --> 提供和jquery的映射
    new webpack.DllPlugin(
      {name: '[name]_[hash]', // 映射库暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json')} // 输出的文件路径
    )
  ],
  mode: 'production'
}