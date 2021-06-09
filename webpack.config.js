const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 指定入口文件
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: "built.js",
    // 输出路径
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 详细loader配置
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面的内容是样式字符串 
          'css-loader',]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面的内容是样式字符串 
          'css-loader',
          // 需要下载less、less-loader
          'less-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        // 下载url-loader file-loader
        loader: 'url-loader',
        options: {
          // 默认是使用ES6模块化解析的，而html-loader引入图片是commonjs
          // 解析出现的问题： [object object]
          limit: 8*1024,
          // 解决：关闭url-loader的es6模块，使用commonjs
          esModule: false,
          // 给图片重命名
          // [hash:10]取图片的hash前10位
          // [ext]取文件原理的拓展名
          name:'[hash:10].[ext]'
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        
      },
      // 
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10]:[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({

    })
  ],
  mode: 'development', // 开发模式
  // mode: 'production'

  /**
   * 1. 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
      2. 特点：只会在内存中编译打包，不会有任何输出
      3. 启动devServer指令为：npx  webpack-dev-server
   */
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    port: 3000,
    open: true
  }
} 