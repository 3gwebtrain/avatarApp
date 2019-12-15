const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js',]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          async: ['bundle.min.js']
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: 'bundle.min.js',
            defaultAttribute: 'defer'
        })
      ]
};