/**
 * 开发环境
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 设置环境变量
process.env.NODE_ENV = 'development';
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'],
        exclude: ['node_modules']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
          outputPath: 'images'
        }
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif|less|css|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      options: {
        template: './public/index.html'
      }
    })
  ],
  mode:'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port:3000,
    open: true
  }
} 