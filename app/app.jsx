import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from 'main';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTouchTapEvent from 'react-tap-event-plugin';

var store = require('configureStore').configure();
export default store;

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

injectTouchTapEvent();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('.container')
);
