export var toggleStepButton = (col, row, grid) => {
  return {
    type: 'TOGGLE_STEP_BUTTON',
    col,
    row,
    grid
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

export var clearGrid = (grid) => {
  return {
    type: 'CLEAR_GRID',
    grid
  }
}

export var changeScale = (scale, grid) => {
  return {
    type: 'CHANGE_SCALE',
    payload: scale,
    grid
  }
}

export var changeTempo = (tempo) => {
  return {
    type: 'CHANGE_TEMPO',
    payload: tempo
  }
}

export var changeSwing = (swing) => {
  return {
    type: 'CHANGE_SWING',
    payload: swing
  }
}

export var changeOctave = (octave, grid) => {
  return {
    type: 'CHANGE_OCTAVE',
    payload: octave,
    grid
  }
}

export var changeRootNote = (index, grid) => {
  return {
    type: 'CHANGE_ROOT_NOTE',
    payload: index,
    grid
  }
}

export var changeStepValue = (stepValue, grid) => {
  return {
    type: 'CHANGE_STEP_VALUE',
    payload: stepValue,
    grid
  }
}


export var changeMidiChannel = (channel, grid) => {
  return {
    type: 'CHANGE_MIDI_CHANNEL',
    payload: channel,
    grid
  }
}
