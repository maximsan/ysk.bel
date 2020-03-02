const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Check the current build
const IS_DEV = process.env.NODE_ENV === 'dev';

const dirNode = 'node_modules';
const dirApp = path.resolve(__dirname, 'js');
const dirAssets = path.resolve(__dirname, 'assets');

module.exports = {
    entry: {
        vendor: ['AOS'],
        bundle: path.join(dirApp, 'index')
    },
    resolve: {
        modules: [dirNode, dirApp, dirAssets]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs')
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
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-webpack-loader',
                        options: {
                            data: {
                                title:
                                    'Усадьба серебряный карась. Рыбалка. Баня. Минская Область'
                            },
                            htmlmin: true
                        }
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
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
