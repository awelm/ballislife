const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

const config = {
  entry: './src/js/main.js',

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
=======
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['react', 'es2015', 'stage-0']
            }
         }
      ]
   },

   output: {
      path: './',
      filename: 'index.min.js',
   },

   plugins: debug ? [] : [
>>>>>>> master
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: true
    })
  ]
};

module.exports = config;
