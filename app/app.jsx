var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Load foundation
$(document).foundation();

// Load App CSS
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <p>Boilerplate Project</p>,
  document.getElementById('app')
);
