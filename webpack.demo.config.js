var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/demo/main.js',
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'demo.js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?presets[]=env',
            scss: 'style-loader!css-loader!postcss-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['env', {
              'targets': {
                'browsers': ['last 2 versions', 'safari >= 7']
              }
            }]
          ]
        }
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
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/demo/index.html'
    }),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.publicPath = 'https://sevenoutman.github.io/vue-aplayer'
  module.exports.devtool = '#source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/demo/index.html',
    }),
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