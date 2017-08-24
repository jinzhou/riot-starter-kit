var webpack = require('webpack');
var config = require('./webpack.config.base.js');

config.output.filename = '[name].bundle.[chunkhash].js';
config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[chunkhash].js'));

if(process.env.npm_lifecycle_event == 'analyse') {
   var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   config.plugins.push(new BundleAnalyzerPlugin());
}

config.plugins.push(
   new webpack.optimize.DedupePlugin(),
   new webpack.optimize.UglifyJsPlugin({
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
   }),
   new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
);

module.exports = config;
