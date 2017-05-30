
import path                                                                 from 'path';
import express                                                              from 'express';
import http                                                                 from 'http';
import helmet                                                               from 'helmet';
import hpp                                                                  from 'hpp';
import compression                                                          from 'compression';
import cookieParser                                                         from 'cookie-parser';
import morgan                                                               from 'morgan';
import favicon                                                              from 'serve-favicon';
import moment                                                               from 'moment';
import chalk                                                                from 'chalk';

import React                                                                from 'react';
import ReactDOM                                                             from 'react-dom/server';
import HTML                                                                 from './layouts/html';

import {host, port, webpackHost, webpackPort}                               from '../config/env';

const app = express();
const server = new http.Server(app);

app.use(helmet());
app.use(hpp());

app.use(compression());
app.use(cookieParser());

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
}

// app.use(favicon(path.resolve(__dirname, './assets/favicon/favicon.ico')));

app.get('*', (req, res) => {

  const bundle = {
    env: process.env.NODE_ENV,
    core: (process.env.NODE_ENV === 'development' ? `http://${webpackHost}:${webpackPort}/build/main.bundle.js` : '/build/main.bundle.min.js'),
    commons: '/build/commons.bundle.js',
    stylesheet:  '/build/main.bundle.css'
  };

  const html = ReactDOM.renderToStaticMarkup(<HTML bundle={bundle}/>);

  res.status(200).send(`<!doctype html>${html}`);
});

console.info(chalk.cyan(`Starting server at ${moment().format('llll')}`));
server.listen(port, (err) => {
  if(err) {
    console.error(chalk.red(err));
  }
  else {
    console.info(chalk.green(`Server listening on ${host}:${port} since ${moment().format('llll')}!`));
  }
});
