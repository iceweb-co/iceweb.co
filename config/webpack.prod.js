const webpack = require('webpack');
const util = require('./webpack.util.js');
const loaders = require('./webpack.loaders.js');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: '[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtPlugin.loader },
          loaders['css-loader'],
          loaders['postcss-loader'],
          loaders['sass-loader'],
        ]
      }
    ]
  },

  plugins: [
    new PurgecssPlugin({
      whitelistPatterns: [],
      paths: util.getFilePaths(['content', 'layouts', 'src/js'])
    }),
    new MiniCssExtPlugin({
      filename: '[contenthash].css'
    }),
  ],
});
