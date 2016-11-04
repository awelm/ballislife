const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/js/main.js',

  output: {
    path:'./',
    filename: 'index.min.js',
  },

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
}

module.exports = config;
