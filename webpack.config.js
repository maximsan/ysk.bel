const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

const dirStyles = path.resolve(__dirname, 'src/styles');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/js/index.js')
    },
    output: {
        assetModuleFilename: 'assets/images/[name][ext]'
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.ejs')
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.ejs$/i,
                use: [
                    'html-loader',
                    {
                        loader: 'template-ejs-loader',
                        // options: {
                        //     data: {
                        //         title: TITLE,
                        //         lat: 54.291652,
                        //         lng: 27.480454
                        //     },
                        //     htmlmin: true
                        // }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            sassOptions: {
                                includePaths: [dirStyles]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource'
            },
        ]
    }
};
