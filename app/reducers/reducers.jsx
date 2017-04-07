export var toggleStepButtonReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_STEP_BUTTON':
      return !state;
    default:
      return state;
  }
}