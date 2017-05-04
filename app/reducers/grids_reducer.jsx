import { initialisedGrid } from '../lib/lib';
import { SCALES, MIDI_CHANNELS, GRID_COUNT } from '../constants';

export var gridsReducer = (state = initialisedGrids(), action) => {
  switch (action.type) {
    case 'TOGGLE_STEP_BUTTON':
      return updateGrid(state, action, 'columns', columnsReducer);
    case 'CLEAR_GRID':
      return updateGrid(state, action, 'columns', columnsReducer);
    case 'SET_GRID':
      return updateGrid(state, action, 'columns', columnsReducer);
    case 'CHANGE_MIDI_OUTPUT_ID':
      return updateGrid(state, action, 'midiOutputId', midiOutputReducer);
    case 'CHANGE_MIDI_CHANNEL':
      return updateGrid(state, action, 'midiChannel', midiChannelReducer);
    case 'CHANGE_OCTAVE':
      return updateGrid(state, action, 'currentOctave', octaveReducer);
    case 'CHANGE_SCALE':
      return updateGrid(state, action, 'currentScale', scaleReducer);
    case 'CHANGE_ROOT_NOTE':
      return updateGrid(state, action, 'rootNote', rootNoteReducer);
    default:
      return [...state];
  }
}

var initialisedGrids = () => {
  var grids = [];
  for(let i = 0; i < GRID_COUNT; i++) {
    grids.push(INITIALISED_SEQUENCER_INSTANCE);
  }
  return grids;
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
    case 'SET_GRID':
      return action.payload;
    default:
      return state;
  }
}

var midiOutputReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_MIDI_OUTPUT_ID':
      return action.payload;
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

var toggleStepButton = (button) => {
  var { active } = button;
  return Object.assign({}, button, {
    active: !active
  });
}

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

const INITIALISED_SEQUENCER_INSTANCE = {
  columns: columnsReducer(undefined, {type: ''}),
  currentScale: scaleReducer(undefined, {type: ''}),
  currentOctave: octaveReducer(undefined, {type: ''}),
  rootNote: rootNoteReducer(undefined, {type: ''}),
  midiOutputId: midiOutputReducer(undefined, {type: ''}),
  midiChannel: midiChannelReducer(undefined, {type: ''}),
};