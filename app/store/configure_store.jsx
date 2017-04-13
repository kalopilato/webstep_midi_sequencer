import { initialisedGrid } from '../lib/lib';

var redux = require('redux');
var {
      columnsReducer,
      playingReducer,
      currentColumnReducer,
      scaleReducer,
      tempoReducer,
      octaveReducer,
      rootNoteReducer,
      stepValueReducer,
      swingReducer,
      midiChannelReducer,
      gridsReducer } = require('reducers');

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
    grids: gridsReducer
  });

  var store = redux.createStore(reducer, {}, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};