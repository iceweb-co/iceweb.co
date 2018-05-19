const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'src'),
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
      template: './src/index.html'
    })
  ]
};
