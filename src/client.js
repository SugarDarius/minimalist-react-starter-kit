/*
* Client UI
* author: Aurélien Dupays-Dexemple
*/

import React                                                  from 'react';
import ReactDOM                                               from 'react-dom';
import 'react-hot-loader/patch';
import {AppContainer as ReactHotLoaderContainer}              from 'react-hot-loader';

import Root                                                   from './containers/root';

const mountNode = document.getElementById('react-view-root');

const renderClient = (Component) => {
  console.log('Rendering client ...');
  ReactDOM.render(
    <ReactHotLoaderContainer>
      <Component />
    </ReactHotLoaderContainer>,
    mountNode
  );
}

renderClient(Root);

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    ReactDOM.unmountComponentAtNode(mountNode);
    renderClient(Root);
  });
}
