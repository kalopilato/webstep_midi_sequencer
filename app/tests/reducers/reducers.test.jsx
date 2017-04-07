var expect = require('expect');
var reducers = require('reducers');

describe('Reducers', () => {
  describe('toggleStepButtonReducer', () => {
    it('should toggle the step button', () => {
      var action = {
        type: 'TOGGLE_STEP_BUTTON'
      };
      var res = reducers.toggleStepButtonReducer(true, action);

      expect(res).toEqual(false);
    })
  })
})