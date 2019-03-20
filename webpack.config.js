const path = require('path')

module.exports = {
  entry:['./src/index.js'],
  mode: 'production',
  module:{
    rules:[
      {test:/\.js$/  , exclude: /node_modules/, loader:'babel-loader'}
    ]
  },
  output: {
    path: path.join(__dirname, 'lib','bundle'),
    filename: 'simple-webstorage.min.js',
  },
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  }
}