var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/vue-aplayer.vue',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-aplayer.min.js',
    library: 'VueAplayer',
    libraryTarget: 'umd'
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
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: 'style-loader!css-loader!postcss-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=40000'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      }
    ]
  },
  devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    })
  ]
}