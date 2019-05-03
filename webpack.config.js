var webpack = require("webpack");
var path = require("path");

var publicPath = path.resolve('./public')

const config = {
  devtool: "cheap-module-source-map",
  entry: [
    './src/index.ts'
  ],
  output: {
    path: publicPath,
    publicPath: publicPath,
    filename: "./index.js"
  },
  module: {
    rules: [
    {
      exclude: /node_modules/,
      loader: 'ts-loader',
      test: /\.tsx?$/,
      options: {
        silent: true
      },
    },]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
};

module.exports = config;
