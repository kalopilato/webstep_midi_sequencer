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

export var changeScale = (scale) => {
  return {
    type: 'CHANGE_SCALE',
    payload: scale
  }
}

export var changeTempo = (tempo) => {
  return {
    type: 'CHANGE_TEMPO',
    payload: tempo
  }
}

export var changeOctave = (octave) => {
  return {
    type: 'CHANGE_OCTAVE',
    payload: octave
  }
}

export var changeRootNote = (index) => {
  return {
    type: 'CHANGE_ROOT_NOTE',
    payload: index
  }
}