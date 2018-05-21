const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack.loaders.js');
const resolve = (f) => path.resolve(__dirname, f);
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtPlugin = require('mini-css-extract-plugin');


const purgeCssDirs = ['layouts', 'src/js'];
const purgeCssPaths = purgeCssDirs.reduce((all, current) => {
  return all.concat(
    glob.sync(`${resolve(current)}/**/*`, { nodir: true })
  );
}, []);


module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: 'js/[chunkhash].js',
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
      paths: purgeCssPaths
    }),
    new MiniCssExtPlugin({
      filename: 'css/[contenthash].css'
    }),
  ],
});
