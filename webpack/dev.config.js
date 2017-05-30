
import path                                                from 'path';
import webpack                                             from 'webpack';
import nib                                                 from 'nib';

import {webpackHost, webpackPort}                          from '../config/env';

import * as PostCssConfig                                  from './postcss.config.js';

const DevWebpackConfig = {
  devtool: 'cheap-eval-source-map',

  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://${webpackHost}:${webpackPort}/__webpack_hmr&timeout=20000`,
      path.resolve(__dirname, '../src/client.js')
    ]
  },

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: `http://${webpackHost}:${webpackPort}/build/`
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
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {importLoaders: 1}
          },
          {
            loader: 'postcss-loader',
            options: PostCssConfig
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {loader: 'style-loader'},
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
      },
      {
        test: /\.styl$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.NamedModulesPlugin()
  ]
};

export default DevWebpackConfig;
