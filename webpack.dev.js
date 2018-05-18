const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const mergeWithStrategy = merge.strategy({
  'module.rules': 'prepend'
});

module.exports = mergeWithStrategy(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '../',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          { loader: 'style-loader' }
        ]
      }
    ]
  }
});
