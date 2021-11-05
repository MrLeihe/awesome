const path = require('path')

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'node_modules/@yxcx/util')],
      },
    ],
  },
}
