export var toggleStepButton = (col, row) => {
  return {
    type: 'TOGGLE_STEP_BUTTON',
    col,
    row
  }
}