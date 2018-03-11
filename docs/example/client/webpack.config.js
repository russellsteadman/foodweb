var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var build = path.join(__dirname, './../build');
if(fs.existsSync(build)) {
  fs.readdirSync(build).forEach(function(file,index){
    var curPath = path.join(build, '/' + file);
    if(fs.lstatSync(curPath).isDirectory()) {
      deleteFolderRecursive(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
}

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, './sample.js'),
  mode: 'production',
  output: {
    path: build,
    filename: 'food.js',
    chunkFilename: 'async.[chunkhash].js',
    publicPath: '/example/build/'
  }
};