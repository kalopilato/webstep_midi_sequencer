import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StepMatrix from 'step_matrix';
import { toggleStepButton } from 'actions';

var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <StepMatrix />
  </Provider>,
  document.querySelector('.container')
);
