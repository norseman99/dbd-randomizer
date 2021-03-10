const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'app': './src/script/randomizer.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script/[name].js'
  },
  mode: 'production',
  module: {
    rules: [
        {
            test: /\.txt/,
            type: 'asset/source'
        },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/env' ],
                    plugins: [ '@babel/plugin-proposal-class-properties' ]
                }
            }
        }
    ]
  },
  optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
          extractComments: false
        }),
      ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/vendor/styles.css'
        })
    ]
};