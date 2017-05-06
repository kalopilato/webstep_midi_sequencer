var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  worker: {
    output: {
      path: __dirname,
      filename: "./ticker.worker.js",
      chunkFilename: "./[id].ticker.worker.js"
    }
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/containers',
      './app/reducers',
    ],
    alias: {
      app: 'app',
      actions: 'app/actions/actions.jsx',
      applicationStyles: 'app/styles/app.scss',
      configureStore: 'app/store/configure_store.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};