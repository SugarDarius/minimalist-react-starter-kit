
import express                                          from 'express';
import webpack                                          from 'webpack';
import webpackDevMiddleware                             from 'webpack-dev-middleware';
import webpackHotMiddleware                             from 'webpack-hot-middleware';
import moment                                           from 'moment';
import chalk                                            from 'chalk';

import DevWebpackConfig                                 from './dev.config.js';
import {webpackPort, webpackHost}                       from '../config/env';

const compiler = webpack(DevWebpackConfig);

const webpackDevServerOptions = {
  quiet: false,
  inline: false,
  noInfo: false,
  lazy: false,
  serverSideRender: false,
  publicPath: DevWebpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const webpackDevHMROptions = {
  path: `/__webpack_hmr`,
  heartbeat: 2000
};

const app = express();

app.use(webpackDevMiddleware(compiler, webpackDevServerOptions));
app.use(webpackHotMiddleware(compiler, webpackDevHMROptions));

console.info(chalk.cyan(`Starting webpack development server at ${moment().format('llll')}`));
app.listen(webpackPort, (err) => {
  if(err) {
    console.error(chalk.red(err));
  }
  else {
    console.info(chalk.green(`Webpack development server listening on ${webpackHost}:${webpackPort} since ${moment().format('llll')}!`));
  }
});
