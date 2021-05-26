/*
 * @Author: Aiden
 * @Date: 2021-05-20 15:51:21
 * @LastEditTime: 2021-05-25 17:49:32
 * @LastEditors: Aiden
 * @Description:
 * @Email: aiden.dai@bayconnect.com.cn
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用于压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader, // 提取出单独的css
  'css-loader',
  {
    // 兼容css
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        // 帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
        plugins: ['postcss-preset-env'],
      },
    },
  },
];

module.exports = {
  mode: 'production', // 压缩js
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'built.js',
  },
  module: {
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
        /*
          js兼容性处理： babel-loader @babel/core @babel/preset-env
          1.基本js兼容性处理 @babel/preset-env
            问题：只能转换基本语法，而Promise则不能转换；
          2.全部js兼容性处理 @babel/polyfill
            问题：我只需要解决部分兼容性问题，但是会将所有兼容性代码全部引入，体积太大了。
          3. 兼容性处理：按需加载 core-js@3
        */
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              // 预设：指示babel做怎么样的兼容性处理
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3,
                },
              },
            ],
          ],
        },
      },
      // loader的配置
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        // 处理less文件资源，从右往左执行
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
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
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // minify: {
      //   collapseWhitespace: true, // 压缩空格
      //   removeComments: true, // 去除注释
      // },
    }),
    new MiniCssExtractPlugin(),
    new OptimizeCssAssetsPlugin(),
  ],
};
