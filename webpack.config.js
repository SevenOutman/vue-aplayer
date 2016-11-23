var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/demo/main.js',
    output: {
        path: './demo',
        filename: "main.js",
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            }
        ]
    },
    babel: {
        presets: ['es2015']
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/demo/index.html'
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.entry = './src/vue-aplayer.vue'
    module.exports.output = {
        path: './dist',
        filename: 'vue-aplayer.min.js'
    }
    module.exports.devtool = '#source-map'
    // http://vuejs.github.io/vue-loader/workflow/production.html
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
}