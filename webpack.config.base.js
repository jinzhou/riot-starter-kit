var webpack = require('webpack');
var packageFile = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {

   entry: {
      app: './src/entry.js',
      vendor: Object.keys(packageFile.dependencies)
   },

   output: {
      // output filename to be specified in the environment specific config files
      path: './dist/',
      publicPath: ''
   },

   module: {
      loaders: [
         {
            test: /\.html$/,
            loader: 'raw'
         },
         {
            test: /\.css$/,
            loader: 'style!css'
         },
         {
            test: /\.less$/,
            loader: 'style!css!less'
         },
         {
            test: /\.tag(\.html)?$/,
            loader: 'riot-tag',
            query: {
               hot: true
            }
         },
         {
            test: /\.jpe?g|.png|.gif$/i,
            loader: 'file?name=images/[name].[ext]'
         },
         {
            test: /\.ttf|eot|svg|otf|woff(2)?$/,
            loader: 'file?name=fonts/[md5:hash].[ext]'
         }
      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: './src/app/index.html',
         filename: 'index.html'
      }),
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery',
         _: 'lodash'
      })
   ]
};

module.exports = config;
