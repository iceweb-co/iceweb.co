const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const p = (file) => path.resolve(__dirname, file);
const mergeWithStrategy = merge.strategy({
  'module.rules': 'prepend'
});

module.exports = mergeWithStrategy(common, {
  mode: 'production',

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css'
    }),
    new PurgecssPlugin({
      whitelistPatterns: [],
      paths: ['layouts', 'src/js']
        .reduce((all, current) => all.concat(
          glob.sync(`${p(current)}/**/*`, { nodir: true })), []
        )
    })
  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader }
        ]
      }
    ]
  },

  output: {
    filename: 'js/[chunkhash].js',
    path: p('.dist'),
    crossOriginLoading: 'anonymous',
    publicPath: ''
  }
});
