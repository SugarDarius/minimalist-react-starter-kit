/*
* HelloWorld component
* author: Aurélien Dupays-Dexemple
*/

import classnames                       from 'classnames';

import React                            from 'react';
import PropTypes                        from 'prop-types';

import stylesheet                       from './stylesheet.styl';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className='hello-world-box'>
        <div className='hello-world-content'>
          <h3>Hello World !!</h3>
        </div>
      </div>
    );
  }
}
