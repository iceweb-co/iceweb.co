const preCSS = require('precss');
const autoPrefixer = require('autoprefixer');
const postCssPlugins = [preCSS, autoPrefixer];


const loaders = {
  'css-loader': { minimize: true },
  'postcss-loader': { plugins: () => postCssPlugins },
  'sass-loader': {},
  'style-loader': {}
};


module.exports = {};
Object.keys(loaders).forEach((loaderName) => {
  module.exports[loaderName] = {
    loader: loaderName,
    options: loaders[loaderName]
  };
});
