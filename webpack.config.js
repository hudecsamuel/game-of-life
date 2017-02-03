var webpack = require("webpack");
var path = require("path");

const config = {
  devtool: "cheap-module-source-map",
  entry: [
    './src/index.ts'
  ],
  output: {
    path: "./public",
    publicPath: './public',
    filename: "./index.js"
  },
  module: {
    loaders: [
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
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  }
};

module.exports = config;
