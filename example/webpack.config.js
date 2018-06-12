const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.js'],
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms')
    }
  },
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
            include: path.resolve(__dirname, 'src'),
            use: 'babel-loader'
          },
          {
            include: path.resolve(__dirname, '../src'),
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                extends: path.resolve(__dirname, '../.babelrc')
              }
            }
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
