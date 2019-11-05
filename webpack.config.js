  const autoprefixer = require('autoprefixer'),
             cssnano = require('cssnano'),
   copyWebpackPlugin = require('copy-webpack-plugin'),
   htmlWebpackPlugin = require('html-webpack-plugin'),
miniCssExtractPlugin = require('mini-css-extract-plugin'),
                path = require('path'),
             webpack = require('webpack');

/*--------------------------------------------------
## Entries
--------------------------------------------------*/

const entries = {
  app: [
    '@babel/polyfill',
    './src/js/app.js'
  ]
}

/*--------------------------------------------------
## Output
--------------------------------------------------*/

const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'js/[name].bundle.js'
}

/*--------------------------------------------------
## Optimization
--------------------------------------------------*/

const optimization = {
  splitChunks: {
    cacheGroups: {
      node_vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
        priority: 1
      }
    }
  }
}

/*--------------------------------------------------
## Plugins
--------------------------------------------------*/

const plugins = [
  new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['vendors','app']
  }),
  new miniCssExtractPlugin({
    filename: 'css/[name].bundle.css'
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer(),
        cssnano()
      ]
    }
  }),
  new copyWebpackPlugin([
    { from: './src/assets', to: 'assets' }
  ])
]

/*--------------------------------------------------
## Loaders
--------------------------------------------------*/

const loaders = {
  rules: [{
    test: /\.js$/,
    use: [
      'babel-loader'
    ]
  },{
    test: /\.scss$/,
    use: [
      miniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  }, {
    test: /\.html$/,
    use: [
      'raw-loader'
    ]
  },{
      test: /\.(jpg|svg)$/i,
      loader: "file-loader",
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/',
        publicPath: url => `../assets/${url}`
      }
  }]
}

/*--------------------------------------------------
## Config
--------------------------------------------------*/

const webpackConfig = {
  entry: entries,
  output: output,
  plugins: plugins,
  module: loaders,
  optimization: optimization
}

module.exports = webpackConfig;