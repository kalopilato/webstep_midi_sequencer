var redux = require('redux');
var { columnsReducer } = require('reducers');

var initialState = () => {
  return {
    columns: buildColumns()
  }
}

var buildColumns = () => {
  var columns = [];
  var i;
  for(i = 0; i < 8; i++){
    columns.push(buildColumn(i));
  }
  return columns;
}

var buildColumn = (col) => {
  var column = [];
  var i;
  for(i = 0; i < 8; i++){
    column.push({
      active: false,
      row: i,
      col
    })
  }
  return column;
}

export var configure = () => {
  var reducer = redux.combineReducers({
    columns: columnsReducer
  });

  var store = redux.createStore(reducer, initialState(), redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};