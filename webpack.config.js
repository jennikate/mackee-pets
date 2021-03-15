// require Node's path module so we can work with file and directory paths
const { join } = require('path');
const path = require('path');

// export object with 
module.exports = {
  // entry: module or file that webpack should use to begin building out its dependency graph
  // From there webpack determines which other modules that entry point depends on
  entry: './src/app.js',
  // output: file and path where the created bundle should be emitted
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    // tell webpack to transform files ending with .js extension using the babel-loader, except those in the node_module dir
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    // describe configurations that can be made to webpack-dev-server
    // this tells it to serve files from our public directory (run build to get create version)
    contentBase: path.join(__dirname, 'public'),
    port: 8080
  }
};
