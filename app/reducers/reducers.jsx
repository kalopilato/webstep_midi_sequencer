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

export var tempoReducer = (state = 120, action) => {
  switch (action.type) {
    case 'CHANGE_TEMPO':
      return action.payload;
    default:
      return state;
  }
}

export var octaveReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_OCTAVE':
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




export var gridsReducer = (state = [INITIALISED_SEQUENCER_INSTANCE], action) => {
  switch (action.type) {
    case 'ADD_GRID':
      return [
        ...state
      ]
    case 'REMOVE_GRID':
      return state;
    case 'TOGGLE_STEP_BUTTON':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, columns: columnsReducer(grid.columns, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CLEAR_GRID':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, columns: columnsReducer(grid.columns, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CHANGE_MIDI_CHANNEL':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, midiChannel: midiChannelReducer(grid.midiChannel, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CHANGE_OCTAVE':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, currentOctave: octaveReducer(grid.currentOctave, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CHANGE_SCALE':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, currentScale: scaleReducer(grid.currentScale, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CHANGE_ROOT_NOTE':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, rootNote: rootNoteReducer(grid.rootNote, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    case 'CHANGE_SWING':
      var gridIndex = action.grid;
      var grid = state[gridIndex];
      var updatedGrid = {...grid, swing: swingReducer(grid.swing, action)};

      return state.slice(0, grid)
                  .concat(updatedGrid)
                  .concat(state.slice(grid + 1));
    default:
      return [...state];
  }
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

const INITIALISED_SEQUENCER_INSTANCE = {
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
