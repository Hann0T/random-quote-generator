const path = require( 'path' );
const htmlWebpackPlugin = require( 'html-webpack-plugin' );
const miniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const copyPlugin = require( 'copy-webpack-plugin' );
const terserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
            {
            test: /\.(sa|sc|c)ss$/,
            use: [
                miniCssExtractPlugin.loader,
                { loader: "css-loader", options: { sourceMap: true } },
                { loader: "resolve-url-loader", options: { sourceMap: true } },
                { loader: "sass-loader", options: { sourceMap: true } },
            ],
            },
            {
                test: /\.(png|jpg|svg)/,
                type: 'asset/resource'
            },
        ],
    },
    plugins: [
        new miniCssExtractPlugin( {
            filename: 'styles/[name].[contenthash].css'
        } ),
        new copyPlugin( {
            patterns: [
                {
                    from: path.resolve(__dirname, "public", "images"),
                    to: "images"
                }
            ]
        } ),
        // Add config for each html file
        new htmlWebpackPlugin( {
            title: 'Quote Generator',
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        } ),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new terserPlugin()
        ]
    }
}