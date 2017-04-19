import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeTempo } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';

import { NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class SequencerMenu extends Component {
  constructor(){
    super();

    this.handleTempoChange = this.handleTempoChange.bind(this);
  }

  handleTempoChange(tempo) {
    this.dispatchAction(changeTempo, tempo);
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
