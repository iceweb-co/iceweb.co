const path = require('path');
const glob = require('glob');


module.exports = {
  resolve: function (f) {
    return path.resolve(__dirname, '..', f);
  },

  globPaths: function(dir) {
    return glob.sync(
      `${this.resolve(dir)}/**/*`,
      { nodir: true }
    );
  },

  getFilePaths: function(dirs) {
    return dirs.reduce((allDirs, currentDir) => {
      return allDirs.concat(this.globPaths(currentDir));
    }, []);
  },
}
