import { initialisedGrid } from '../lib/lib';

var redux = require('redux');
var { columnsReducer,
      playingReducer,
      currentColumnReducer,
      scaleReducer,
      tempoReducer,
      octaveReducer,
      rootNoteReducer,
      stepValueReducer,
      swingReducer,
      midiChannelReducer } = require('reducers');

export var configure = () => {
  var sequencerInstanceReducer = redux.combineReducers({
    columns: columnsReducer,
    currentScale: scaleReducer,
    currentOctave: octaveReducer,
    rootNote: rootNoteReducer,
    swing: swingReducer,
    midiChannel: midiChannelReducer
  });

  var reducer = redux.combineReducers({
    tempo: tempoReducer,
    playing: playingReducer,
    currentColumn: currentColumnReducer,
    stepValue: stepValueReducer,
    grid1: sequencerInstanceReducer
  });

  var initialState = {
    grid1: {
      columns: initialisedGrid()
    }
  }

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};