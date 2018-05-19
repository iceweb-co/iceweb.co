const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const mergeWithStrategy = merge.strategy({
  'module.rules': 'prepend'
});

const SriPlugin = require('webpack-subresource-integrity');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = mergeWithStrategy(common, {
  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].min.css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(
        `${path.resolve(__dirname, 'src')}/**/*`, { nodir: true }
      ),
      whitelistPatterns: []
    }),
    new SriPlugin({
      hashFuncNames: ['sha256']
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
    filename: 'js/[chunkhash].min.js',
    path: path.resolve(__dirname, 'dist/gsuite'),
    crossOriginLoading: 'anonymous',
    publicPath: ''
  }
});
