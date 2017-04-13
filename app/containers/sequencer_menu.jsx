import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeTempo, changeStepValue } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';

import { STEP_VALUES, NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class SequencerMenu extends Component {
  constructor(){
    super();

    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleStepValueChange = this.handleStepValueChange.bind(this);
  }

  handleTempoChange(tempo) {
    this.dispatchAction(changeTempo, tempo);
  }

  handleStepValueChange(stepValue) {
    this.dispatchAction(changeStepValue, stepValue);
  }

  dispatchAction(action, value) {
    const { dispatch } = this.props;
    dispatch(action(value));
  }

  render() {
    var { tempo, stepValue } = this.props;

    return (
      <div className="menu">
        <div className="row">
          <div className="small-12 columns">
            <SliderSelect label="Tempo" currentVal={tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
            <DropdownSelect label="Step Value" currentVal={stepValue} itemsArray={STEP_VALUES} onChange={this.handleStepValueChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      tempo: state.tempo,
      stepValue: state.stepValue
    };
  }
)(SequencerMenu);
