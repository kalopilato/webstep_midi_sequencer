var React = require('react');
var ReactDOM = require('react-dom');

import StepButton from 'step_button';

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <StepButton />,
  document.querySelector('.container')
);
