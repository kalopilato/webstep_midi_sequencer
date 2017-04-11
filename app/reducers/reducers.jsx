import { initialisedGrid } from '../lib/lib';
import { SCALES, TOTAL_STEPS } from '../constants';

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

export var columnsReducer = (state = [], action) => {
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

export var scaleReducer = (state = Object.keys(SCALES)[0], action) => {
  switch (action.type) {
    case 'CHANGE_SCALE':
      return action.payload;
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
