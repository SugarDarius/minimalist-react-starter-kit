
var path                                                = require('path');
var webpack                                             = require('webpack');
var ExtractTextPlugin                                   = require('extract-text-webpack-plugin');
var nib                                                 = require('nib');

var PostCssConfig                                       = require('./postcss.config.js');

var ProdWebpackConfig = {
  devtool: 'cheap-source-map',

  entry: {
    main: path.resolve(__dirname, '../src/client.js')
  },

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/build/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader:'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [['latest', {'es2015': {'modules': false}}], 'stage-0', 'react'],
              plugins: [
                'transform-runtime',
                'transform-decorators-legacy',
                'transform-class-properties',
                'react-hot-loader/babel'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options: PostCssConfig
            }
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: PostCssConfig
            }
          ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {importLoaders: 1}
            },
            {
              loader: 'postcss-loader',
              options: PostCssConfig
            },
            {
              loader: 'stylus-loader',
              options: {
                use: [nib()],
                import: ['~nib/lib/nib/index.styl']
              }
            }
          ]
        })
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 35000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2?|ttf|eot|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[path][name].[ext]?[hash:8]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true,
      },
      output: {
        screw_ie8: true,
        comments: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'main.bundle.css'
    })
  ]
};

module.exports = ProdWebpackConfig;
