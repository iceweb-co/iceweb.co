const webpack = require('webpack');
const util = require('./webpack.util.js');
const loaders = require('./webpack.loaders.js');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  // Should not use [hash] or [chunkhash] for development
  output: {
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          loaders['style-loader'],
          loaders['css-loader'],
          loaders['postcss-loader'],
          loaders['sass-loader'],
        ]
      }
    ]
  },
});
