var redux = require('redux');
var { toggleStepButtonReducer} = require('reducers');

export var configure = () => {
  var reducer = redux.combineReducers({
    active: toggleStepButtonReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};