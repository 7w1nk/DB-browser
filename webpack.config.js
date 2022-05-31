const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const modeWork = process.env.NODE_ENV === "production" ? "production" : "development";
const isDev = modeWork === "development"

module.exports = {
    mode: modeWork,
    entry: "./src/js/index.js",
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [[
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./index.html",
            favicon: "./src/img/logo.png"
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash].css'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    output: {
        assetModuleFilename: "assets/img/[hash][ext][query]",
        clean: true
    }
};