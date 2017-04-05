var React = require('react');
var ReactDOM = require('react-dom');

import StepMatrix from 'step_matrix';

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <StepMatrix />,
  document.querySelector('.container')
);
