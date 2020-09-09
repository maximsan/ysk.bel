const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: 'eval',
    watch: true,
    watchOptions: {
        aggregateTimeout: 800,
        ignored: ['/node_modules/', '/doc/', '/temp/']
    },
    devServer: {
        port: 3000,
        watchContentBase: true,
        open: true,
        compress: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    }
});
