const path = require('path')
const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

const HtmlPluginConfig = new HtmlPlugin({
  title: 'webpack 3.11.0 practice',
  filename: 'index.html',
  template: 'src/assets/index.html',
  inject: 'head',
});

module.exports = {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
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
        // use: [
        //   'style-loader',
        //   'css-loader',
        // ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]',
            },
          },
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

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    // port: 9000,
    hot: true,
  },

  devtool: 'inline-source-map',
  // devtool: 'source-map',
  // devtool: 'eval',

  plugins: [
    new UglifyPlugin(),
    // new HtmlPlugin({
    //   filename: 'index.html',
    //   template: 'src/assets/index.html',
    // }),
    HtmlPluginConfig,
    new ExtractTextPlugin('index.css'),
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(['dist']),
  ],
}
