// require Node's path module so we can work with file and directory paths
const path = require('path');
// enable webpack to work with html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

// export object with
module.exports = {
  // entry: module or file that webpack should use to begin building out its dependency graph
  // From there webpack determines which other modules that entry point depends on
  entry: './src',
  // output: file and path where the created bundle should be emitted
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    // tell webpack transform files ending with .js(x) using babel-loader except in node_modules
    rules: [
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [htmlPlugin],
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
};
