import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Sequencer from 'sequencer';
import Menu from 'menu';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTouchTapEvent from 'react-tap-event-plugin';

var store = require('configureStore').configure();

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

injectTouchTapEvent();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <div className="row">
        <div className="large-3 columns">
          <Menu />
        </div>

        <div className="large-9 columns">
          <Sequencer />
        </div>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('.container')
);
