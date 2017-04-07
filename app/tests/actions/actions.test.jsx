var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('should generate toggle step button action', () => {
    var action = {
      type: 'TOGGLE_STEP_BUTTON',
    };
    var res = actions.toggleStepButton();

    expect(res).toEqual(action);
  });
});