import { initialisedGrid } from '../lib/lib';
import { NOTES, STEP_VALUES, SCALES, TOTAL_STEPS, MIDI_CHANNELS } from '../constants';
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



export var gridsReducer = (state = [INITIALISED_SEQUENCER_INSTANCE], action) => {
  switch (action.type) {
    case 'ADD_GRID':
      return [
        ...state
      ]
    case 'REMOVE_GRID':
      return state;
    case 'TOGGLE_STEP_BUTTON':
      return updateGrid(state, action, 'columns', columnsReducer);
    case 'CLEAR_GRID':
      return updateGrid(state, action, 'columns', columnsReducer);
    case 'CHANGE_MIDI_CHANNEL':
      return updateGrid(state, action, 'midiChannel', midiChannelReducer);
    case 'CHANGE_OCTAVE':
      return updateGrid(state, action, 'currentOctave', octaveReducer);
    case 'CHANGE_SCALE':
      return updateGrid(state, action, 'currentScale', scaleReducer);
    case 'CHANGE_ROOT_NOTE':
      return updateGrid(state, action, 'rootNote', rootNoteReducer);
    case 'CHANGE_SWING':
      return updateGrid(state, action, 'swing', swingReducer);
    case 'CHANGE_STEP_VALUE':
      return updateGrid(state, action, 'stepValue', stepValueReducer);
    default:
      return [...state];
  }
}

var updateGrid = (state, action, keyToUpdate, reducer) => {
  var gridIndex = action.grid;
  var grid = state[gridIndex];
  var updatedGrid = {...grid};
  updatedGrid[keyToUpdate] = reducer(grid[keyToUpdate], action);

  return state.slice(0, gridIndex)
              .concat(updatedGrid)
              .concat(state.slice(gridIndex + 1));
}

var columnsReducer = (state = initialisedGrid(), action) => {
  switch (action.type) {
    case 'TOGGLE_STEP_BUTTON':
      var { col } = action;

      return state.slice(0, col)
                  .concat([updateColumnReducer(state[col], action)])
                  .concat(state.slice(col + 1));
    case 'CLEAR_GRID':
      return initialisedGrid();
    default:
      return state;
  }
}

var midiChannelReducer = (state = Object.keys(MIDI_CHANNELS)[0], action) => {
  switch (action.type) {
    case 'CHANGE_MIDI_CHANNEL':
      return action.payload;
    default:
      return state;
  }
}

var octaveReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_OCTAVE':
      return action.payload;
    default:
      return state;
  }
}

var scaleReducer = (state = Object.keys(SCALES)[0], action) => {
  switch (action.type) {
    case 'CHANGE_SCALE':
      return action.payload;
    default:
      return state;
  }
}

var rootNoteReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_ROOT_NOTE':
      return action.payload;
    default:
      return state;
  }
}

var swingReducer = (state = 50, action) => {
  switch (action.type) {
    case 'CHANGE_SWING':
      return action.payload;
    default:
      return state;
  }
}

var stepValueReducer = (state = STEP_VALUES[0], action) => {
  switch (action.type) {
    case 'CHANGE_STEP_VALUE':
      return action.payload;
    default:
      return state;
  }
}






const INITIALISED_SEQUENCER_INSTANCE = {
  stepValue: stepValueReducer(undefined, {type: ''}),
  columns: columnsReducer(undefined, {type: ''}),
  currentScale: scaleReducer(undefined, {type: ''}),
  currentOctave: octaveReducer(undefined, {type: ''}),
  rootNote: rootNoteReducer(undefined, {type: ''}),
  swing: swingReducer(undefined, {type: ''}),
  midiChannel: midiChannelReducer(undefined, {type: ''})
};

var updateColumnReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_STEP_BUTTON':
      var { row } = action;

      return state.slice(0, row)
                  .concat(toggleStepButton(state[row]))
                  .concat(state.slice(row + 1));
    default:
     return state;
  }
}

var toggleStepButton = (button) => {
  var { active } = button;
  return Object.assign({}, button, {
    active: !active
  });
}
