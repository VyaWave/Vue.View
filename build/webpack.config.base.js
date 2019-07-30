const path = require('path');
const webpack = require('webpack');

console.info(path.resolve(__dirname, '../packages/index.js'),)
module.exports = {
  entry:  path.resolve(__dirname, '../packages/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '',
    library: 'Vue.View',
    umdNamedDefine: true
  },
  externals: {

  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            css: 'vue-style-loader!css-loader!postcss-loader',
            sass: 'vue-style-loader!css-loader!sass-loader!postcss-loader',
            stylus: 'vue-style-loader!css-loader!stylus-loader!postcss-loader'
          },
          postLoaders: {
            html: 'babel-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'sass-loader',
          'css-loader',
          'autoprefixer-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192'
      }
  ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
