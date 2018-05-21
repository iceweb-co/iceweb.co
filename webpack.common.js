const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack.loaders.js');
const resolve = (f) => path.resolve(__dirname, f);
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
  mode: 'none',

  entry: {
    gsuite: resolve('src/js/index.js')
  },

  output: {
    path: resolve('static/dist'),
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new ManifestPlugin({
      fileName: resolve('data/assets.json'),
      publicPath: 'dist/'
    })
  ]
};
