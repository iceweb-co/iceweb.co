const webpack = require('webpack');
const util = require('./webpack.util.js');
const loaders = require('./webpack.loaders.js');
const ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
  mode: 'none',

  entry: {
    gsuite: util.resolve('src/js/index.js')
  },

  output: {
    path: util.resolve('dist/assets'),
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    }),
    new ManifestPlugin({
      fileName: util.resolve('data/assets.json')
    })
  ]
};
