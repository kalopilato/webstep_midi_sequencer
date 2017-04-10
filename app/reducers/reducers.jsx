export var playingReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAYING':
      return !state;
    default:
      return state;
  }
}

export var currentColumnReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COLUMN':
      return state === 7 ? 0 : state + 1;
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