const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config/index')
const baseWebpackConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractScss = new ExtractTextPlugin('/min.css')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.info(config)

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    filename: '[name].min.js'
  },
  module: {
    rules: [{
      test: /\.scss$/i,
      loader: extractScss.extract(['css-loader', 'sass-loader'])
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    extractScss,
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap ?
        {
          safe: true,
          map: {
            inline: false
          }
        } :
        {
          safe: true
        }
    }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      {
        from: `./packages/components`,
        to: `./components`
      }
    ]),
  ]
})

