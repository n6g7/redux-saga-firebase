const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@selectors': path.resolve(__dirname, 'src/redux/selectors')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: 'raw-loader'
          },
          {
            exclude: /node_modules/,
            use: 'babel-loader'
          }
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
