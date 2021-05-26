/*
 * @Author: Aiden;
 * @Date: 2021-05-20 15:51:21
 * @LastEditTime: 2021-05-26 11:20:24
 * @LastEditors: Aiden
 * @Description:
 * @Email: aiden.dai@bayconnect.com.cn
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'built.js',
  },
  module: {
    // 正常来说，一个文件只能被一个Loader处理。
    // 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
    rules: [
      { // 在package.json中添加eslintConfig配置
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  ie: '9',
                },
              },
            ],
          ],
        },
      },
      // loader的配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 处理less文件资源，从右往左执行
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:8].[ext]',
          outputPath: 'img',
        },
      },
      {
        // 处理html中img图片资源
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false, // 启用commonjs模块化，默认是es6模块化
        },
      },
      {
        // 打包其他资源
        exclude: /\.(less|css|js|jpg|png|gif|html)$/, // 排除css,js,html资源
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  // 启动devServer指令为：webpack-dev-server
  devServer: {
    // contentBase: resolve(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    open: true,
    // 开启HMR功能
    // hot: true,
  },
};
