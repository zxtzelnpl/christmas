const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 0}},
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 0}},
          'postcss-loader'
        ]
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
    // html 模版插件
    new HtmlWebpackPlugin({template: __dirname + '/app/index.tmpl.html'}),

    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    //打开浏览器
    new OpenBrowserPlugin({url: 'http://localhost:8080'}),

    // 可在业务js代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告，production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev ') || 'false'))
    })
  ],

  devServer: {
    proxy: {
      '/DoubleDanashx': {
        target: 'http://106.14.21.199:8013',
        secure: false
      }
    },
    contentBase: './build',//本地服务器所加载的页面所在的目录
    inline: true,//实时刷新
    hot: true//使用热加载插件 HotModuleReplacementPlugin
  }
}