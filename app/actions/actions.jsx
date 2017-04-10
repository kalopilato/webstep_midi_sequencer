export var toggleStepButton = (col, row) => {
  return {
    type: 'TOGGLE_STEP_BUTTON',
    col,
    row
  }
}

export var togglePlaying = () => {
  return {
    type: 'TOGGLE_PLAYING'
  }
}

export var stopAndResetPosition = () => {
  return {
    type: 'STOP_AND_RESET'
  }
}

export var incrementColumn = () => {
  return {
    type: 'INCREMENT_COLUMN'
  }
}

export var clearGrid = () => {
  return {
    type: 'CLEAR_GRID'
  }
}