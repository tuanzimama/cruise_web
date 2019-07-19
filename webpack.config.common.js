const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 引入分离插件(css,js)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/js')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader: 'css-loader',
					}
				})
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'sass-loader',
					}]
				})
			}, {
				test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: path.posix.join('static', '[name].[hash:7].[ext]')
				}
			}, {
				test: /\.(png|svg|jpg|gif)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: path.posix.join('static', '[name].[ext]')
					}
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin(isProd ? '../css/[name].css' : path.posix.join('static', '[name].css')),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		getEntryHtml()
	]
}

function getEntryHtml() {
	const entryHtml = {
		template: 'src/index.html'
	}
	isProd && (entryHtml.filename = path.resolve(__dirname, './dist/index.html'))
	return new HtmlWebpackPlugin(entryHtml);
}