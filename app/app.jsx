import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Sequencer from 'sequencer';
import Menu from 'menu';

var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <div className="row">
      <div className="large-4 columns">
        <Menu />
      </div>

      <div className="large-8 columns">
        <Sequencer />
        </div>
    </div>
  </Provider>,
  document.querySelector('.container')
);
