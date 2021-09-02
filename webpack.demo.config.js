var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/demo/main.js',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'demo.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?babelrc',
            scss: 'style-loader!css-loader!postcss-loader!sass-loader',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=40000',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader',
      },
    ],
  },
  devtool: '#eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo'),
    },
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/aplayer': {
        target: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/',
        secure: false,
        changeOrigin: true,
        headers: {
          host: 'vue-aplayer.js.org',
          Referer: 'https://vue-aplayer.js.org/',
        },
        pathRewrite (path) {
          return path.replace(/^\/aplayer/, '')
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/demo/index.html',
      favicon: 'src/demo/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
      },
      VERSION: JSON.stringify(require("./package.json").version),
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = '/'
  module.exports.devtool = '#source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  )
}