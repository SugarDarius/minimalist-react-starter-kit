/*
* App Container
* Your App container where you can put your router definition or anything else
* author: Aurélien Dupays-Dexemple
*/

import React                            from 'react';

import {HelloWorld}                     from '../../components';

export default class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <HelloWorld />
      </div>
    );
  }
}
