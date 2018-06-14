const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dict'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
    ],

    extensions: ['.js', '.json', '.jsx', '.css'],
  },

  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   open: true,
  //   // compress: true,
  //   // port: 9000,
  //   hot: true,
  // },

  devtool: 'inline-source-map',
  // devtool: 'eval',

  plugins: [
    // new UglifyPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      template: 'src/assets/index.html',
    }),
  ],
}
