const path = require('path')

module.exports = {
  mode: 'development',
  entry: __dirname + '/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'minify'],
            comments: false
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: true,
    hot: true,
    inline: true
  }
}
