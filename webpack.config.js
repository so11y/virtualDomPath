const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: "./index.ts"
    },
    mode: "development",
    output: {
        filename: "js/[name].js",
        path: resolve(__dirname, 'dist'),
        chunkFilename: "js/[id].js"
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test:/\.sorry?$/,
                loader: './jsx/sorryLoader.js'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "main.html",
        }),
    ],
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        progress: true,
        port: 5050,
        hotOnly: true
    }
}