const path = require('path')
const fs = require('fs')

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory()
}

module.exports = {
  mode: 'development',
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    if (isDirectory(path.join(__dirname, dir))) {
      entries[dir] = path.join(__dirname, dir, 'index.js')
    }

    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist/',
    compress: true,
    hot: true,
    inline: true,
    host: '0.0.0.0'
  }
}
