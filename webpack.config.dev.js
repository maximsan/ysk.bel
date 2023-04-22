const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');

/** @type {import('@types/webpack').Configuration} */
module.exports = merge(webpackConfig, {
    output: {
        filename: '[name].js'
    },
    devtool: 'eval',
    watchOptions: {
        ignored: ['/node_modules/', '/doc/', '/temp/']
    },
    devServer: {
        port: 3000,
        hot: true,
    },
});
