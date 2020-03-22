const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    devtool: 'eval',
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 800,
        ignored: ['/node_modules/', '/doc/', '/temp/']
    },
    devServer: {
        port: 8008,
        watchContentBase: true
    }
});
