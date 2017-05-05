import { initialisedGrid } from '../lib/grid_builder';
import { combineReducers, createStore, compose } from 'redux';
import { gridsReducer } from 'grids_reducer';
import { tempoReducer, playingReducer, currentColumnReducer, swingReducer, stepValueReducer, midiOutputsReducer, clipboardReducer } from 'reducers';

export var configure = () => {
  var reducer = combineReducers({
    tempo: tempoReducer,
    swing: swingReducer,
    stepValue: stepValueReducer,
    playing: playingReducer,
    currentColumn: currentColumnReducer,
    grids: gridsReducer,
    midiOutputs: midiOutputsReducer,
    clipboard: clipboardReducer,
  });

  var store = createStore(reducer, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};