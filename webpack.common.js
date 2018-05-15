const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let envLoaderCSS;
if (process.env.NODE_ENV === 'production') {
  envLoaderCSS = MiniCssExtractPlugin.loader
} else {
  envLoaderCSS = 'style-loader'
}

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          { loader: envLoaderCSS },
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
    new CleanWebpackPlugin(['dist/*']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all'
    }),
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
