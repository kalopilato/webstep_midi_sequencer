import { initialisedGrid } from '../lib/lib';

var redux = require('redux');
var { columnsReducer,
      playingReducer,
      currentColumnReducer,
      scaleReducer,
      tempoReducer,
      octaveReducer,
      rootNoteReducer } = require('reducers');

export var configure = () => {
  var reducer = redux.combineReducers({
    playing: playingReducer,
    columns: columnsReducer,
    currentColumn: currentColumnReducer,
    currentScale: scaleReducer,
    tempo: tempoReducer,
    currentOctave: octaveReducer,
    rootNote: rootNoteReducer
  });

  var initialState = {
    columns: initialisedGrid()
  }

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};