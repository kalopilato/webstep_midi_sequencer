import { initialisedGrid } from '../lib/lib';
import { combineReducers, createStore, compose } from 'redux';
import { gridsReducer } from 'grids_reducer';
import { tempoReducer, playingReducer, currentColumnReducer, swingReducer } from 'reducers';

export var configure = () => {
  var reducer = combineReducers({
    tempo: tempoReducer,
    swing: swingReducer,
    playing: playingReducer,
    currentColumn: currentColumnReducer,
    grids: gridsReducer
  });

  var store = createStore(reducer, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};