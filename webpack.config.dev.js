var webpack = require('webpack');
var config = require('./webpack.config.base.js');

config.output.filename = '[name].bundle.js';
config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));

var ReloadHtmlWebpackPlugin = require('reload-html-webpack-plugin');
config.plugins.push(new ReloadHtmlWebpackPlugin());

var extend = require('util')._extend;

extend(config, {
   devtool: 'eval',

   devServer: {
      contentBase: './dist/',
      quiet: true
   }
});

module.exports = config;
