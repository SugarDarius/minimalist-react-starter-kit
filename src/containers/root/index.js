/*
* Root Container
* author: Aurélien Dupays-Dexemple
*/

import React                            from 'react';

import {BrowserRouter as Router}        from 'react-router-dom';
import {Route}                          from 'react-router-dom';

import App                              from '../app';

const Root = () => (
  <Router>
    <Route exact path='/' component={App} />
  </Router>
);

export default Root;
