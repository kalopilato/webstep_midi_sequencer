import { TOTAL_STEPS, STEP_VALUES } from '../constants';
var redux = require('redux');

export var playingReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return !state;
    case 'STOP_AND_RESET':
      return false;
    default:
      return state;
  }
}

export var tempoReducer = (state = 120, action) => {
  switch (action.type) {
    case 'CHANGE_TEMPO':
      return action.payload;
    default:
      return state;
  }
}

export var currentColumnReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COLUMN':
      return state === TOTAL_STEPS - 1 ? 0 : state + 1;
    case 'STOP_AND_RESET':
      return 0;
    default:
      return state;
  }
}

export var swingReducer = (state = 50, action) => {
  switch (action.type) {
    case 'CHANGE_SWING':
      return action.payload;
    default:
      return state;
  }
}


export var stepValueReducer = (state = STEP_VALUES[0], action) => {
  switch (action.type) {
    case 'CHANGE_STEP_VALUE':
      return action.payload;
    default:
      return state;
  }
}

export var midiOutputsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MIDI_OUTPUTS':
      return action.payload;
    default:
      return state;
  }
}

export var clipboardReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIPBOARD':
      return action.payload;
    default:
      return state;
  }
}