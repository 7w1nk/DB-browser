const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const modeWork = process.env.NODE_ENV === "production" ? "production" : "development";
const isDev = modeWork === "development"
console.log(modeWork);

module.exports = {
    mode: modeWork,
    entry: "./src/js/index.jsx",
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        esmodules: true
                                    }
                                }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.csv$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/csv/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./index.html",
            favicon: "./src/img/logo.ico"
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash].css'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        clean: true
    }
};