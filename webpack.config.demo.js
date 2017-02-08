var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    context: __dirname,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    entry: ['webpack-hot-middleware/client', 'react-hot-loader/patch', './demo/index.jsx'],
    output: {
        publicPath: '/',
        path: __dirname,
        filename: 'main.js'
    },
    module: {
        rules: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: '/node_modules',
                        options: {
                                   presets: [
                                     ['es2015'],
                                     "stage-1",
                                     "react"
                                   ],
                                   plugins: ['react-hot-loader/babel']
                                 }
                    },
                    {
                        test:/\.less$/,
                        exclude:'/node_modules',
                        use: ["style-loader", "css-loader", "less-loader"]
                    } 
        ]
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};