const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'app/index.js'),
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'es6-promise',
      'whatwg-fetch',
      'moment'
    ]
  },
  output: {
    path: __dirname + '/christmas',
    // path: __dirname + '/build',
    // filename: "[name].[chunkhash:8].js",
    filename:'[name].js',
    publicPath: '/christmas/'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {importLoaders: 0}},
            {loader: 'postcss-loader'}
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {importLoaders:0}},
            {loader: 'postcss-loader'},
            {loader: 'less-loader'}
          ]
        })
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        use: ['url-loader?limit=5000']
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: ['url-loader?limit=5000']
      }
    ]
  },
  plugins: [
    // webpack 内置的banner-plugin
    new webpack.BannerPlugin('Copyright by zxt_zel_npl@github.com'),

    //html 模版插件
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html',
    }),

    //定义为生产环境,编译 React时压缩最小
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}}),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    // new webpack.optimize.OccurrenceOrderPlugin(),


    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),

    // 分离CSS和JS文件
    // new ExtractTextPlugin('[name].[chunkhash:8].css'),
    new ExtractTextPlugin('[name].css'),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: '[name].[chunkhash:8].js'
      filename:'[name].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev ') || 'false'))
    })
  ]
}