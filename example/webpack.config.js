const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: 'raw-loader'
          },
          {
            use: 'babel-loader'
          }
        ]
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          'url-loader',
          'img-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: 'cheap-module-eval-source-map'
}
