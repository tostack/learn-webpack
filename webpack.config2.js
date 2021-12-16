/**
 * 生产环境
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const commonCssLoader = {

}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader
      /**
       * 语法检查 下载 eslint-loader eslint 
       *  注意：只检查自己写的源代码，第三方的库是不检查的
       *  设置检查规则：
       *          package.json 中eslintConfig中设置~
       *          "eslintConfig": {
                    "extends": "airbnb-base"
                  }
       *          airbnb规范 
       *          引入airbnb需要下载的插件 eslint-config-airbnb-base eslint eslint-plugin-import
       * 
       * // eslint-disable-next-line
       */
      /**
       * 正常来讲，一个文件只能被一个loader处理。
       * 当一个文件要被多个loader处理时，那么一定要指定先后顺序，先执行eslint 再执行babel
       */
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        // 优先执行
        enforce:'pre',
        options: {
          // 自动修复eslint的错误
          fixed: true
        }
      },
      /**
       * js 兼容性处理 babel-loader @babel/core @babel/preset-env
       *  1.基本的js兼容性处理 --> @babel/preset-env
       *  2.全部的兼容性处理 --> @babel/polyfill
       *    直接在全局中引入 import '@babel/polyfill'  这样做包的体积会过大
       *  3.需要做兼容性处理的就做： 按需加载 --> core-js
       * 
       */
      // {
      //   test: /\.js$/,
      //   loader: 'bable-loader',
      //   exclude: /node_modules/,

      //   options: {
      //     // 指示Babel做怎样的兼容性处理
      //     presets: ['@bable/preset-env']
      //   }
      // },
      // 按需处理兼容性问题
      {
        test: /\.js$/,
        loader: 'bable-loader',
        exclude: /node_modules/,
        options: {
          // 指示Babel做怎样的兼容性处理
          presets: [
            [
              '@bable/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        exclude: ['node_modules']
      },
      {
        test: /\.css$/,
        use: [
          // 创建style标签将样式放入
          // 'style-loader',
          // 这个loader取代style-loader。作用提取js中的css成单独的文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js中
          'css-loader',
          {
            /** 处理兼容性问题
             * "browselist": {
                  "production": [
                    ">0.2%",
                    "no dead",
                    "no op_min all"
                  ],
                  "development": [
                    "last 1 chrome version"
                  ]
                }
             */
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: () => [
                // postcss 的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ],
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
        template: './public/index.html',
        // 压缩html代码
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true
        }
      }
    }),
    new MiniCssExtractPlugin({
      options: {
        // outputPath: resolve(__dirname,'build')
        filename: 'css/built.css'
      }
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode:'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port:3000,
    open: true
  }
} 