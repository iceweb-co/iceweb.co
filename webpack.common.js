const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const p = (file) => path.resolve(__dirname, file);

module.exports = {
  entry: p('src/js/index.js'),

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: p('src/scss'),
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new HtmlWebpackPlugin({
      template: p('layouts/_default/baseof.html')
    }),
    new ManifestPlugin({
      fileName: p('data/assets/manifest.json')
    })
  ]
};
