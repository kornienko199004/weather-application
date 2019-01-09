const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const conf = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '',
  },
  devServer: {
    overlay: true,
    compress: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

module.exports = (event, options) => {
  const production = options.mode === 'production';
  conf.devtool = production
    ? false
    : 'eval-sourcemap';
  return conf;
};
