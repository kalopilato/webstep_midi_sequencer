export var toggleStepButton = () => {
  return {
    type: 'TOGGLE_STEP_BUTTON'
  }
}

export var createColumn = (column) => {
  return {
    type: 'ADD_STEP_COLUMN',
    column
  }
}