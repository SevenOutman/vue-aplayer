var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/demo/main.js',
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: "main.js",
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader?presets[]=es2015'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            }
        ]
    },
    devtool: '#eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/demo/index.html'
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.entry = './src/vue-aplayer.vue'
    module.exports.output = {
        path: path.resolve(__dirname, 'dist'),
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

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        })
    ]
}