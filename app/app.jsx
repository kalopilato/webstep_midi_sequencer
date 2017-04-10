import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Sequencer from 'sequencer';

var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Sequencer />
  </Provider>,
  document.querySelector('.container')
);
