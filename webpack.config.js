const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const webpackConfig = {
  resolve: {
    modules: ['src', 'node_modules']
  },
  devtool: 'source-map',
  entry: {
    vendor: ['@babel/polyfill', 'react', 'react-dom'],
    client:     './src/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].chunkhash.bundle.js',
    chunkFilename: '[name].chunkhash.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css)$/,
        use: [
            "style-loader",
            "css-loader"
        ]
      },
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
     ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 8080
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './_redirects' },
    ]),
    new HtmlWebpackPlugin({
      title: 'Full Stack LaCroix',
      template: './src/index.html',
      filename: './index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ]
};

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.plugins.push(    
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env'
    })
  )
}

module.exports = webpackConfig;