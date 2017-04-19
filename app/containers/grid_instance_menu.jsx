import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeStepValue,
         changeScale,
         changeOctave,
         changeRootNote,
         changeSwing,
         changeMidiChannel } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';

import { STEP_VALUES, NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class GridInstanceMenu extends Component {
  constructor(){
    super();

    this.handleStepValueChange = this.handleStepValueChange.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
    this.handleRootNoteChange = this.handleRootNoteChange.bind(this);
    this.handleSwingChange = this.handleSwingChange.bind(this);
    this.handleMidiChannelChange = this.handleMidiChannelChange.bind(this);
  }

  handleStepValueChange(stepValue) {
    this.dispatchAction(changeStepValue, stepValue);
  }

  handleScaleChange(scale) {
    this.dispatchAction(changeScale, scale);
  }

  handleOctaveChange(octave) {
    this.dispatchAction(changeOctave, octave);
  }

  handleRootNoteChange(rootNote) {
    const index = NOTES.indexOf(rootNote);
    this.dispatchAction(changeRootNote, index);
  }

  handleSwingChange(swing) {
    this.dispatchAction(changeSwing, swing);
  }

  handleMidiChannelChange(channel) {
    this.dispatchAction(changeMidiChannel, channel);
  }

  dispatchAction(action, value) {
    const { dispatch, grid } = this.props;
    dispatch(action(value, grid));
  }

  render() {
    var { stepValue, scale, octave, rootNote, swing, midiChannel } = this.props;

    return (
      <div className="menu">
        <div className="row">
          <div className="small-12 columns">
            <DropdownSelect label="Step Value" currentVal={stepValue} itemsArray={STEP_VALUES} onChange={this.handleStepValueChange} />
            <SliderSelect label="Swing" currentVal={swing} minVal={50} maxVal={80} onChange={this.handleSwingChange} />
            <DropdownSelect label="Key / Root Note" currentVal={NOTES[rootNote]} itemsArray={NOTES} onChange={this.handleRootNoteChange} />
            <DropdownSelect label="Scale" currentVal={scale} itemsArray={Object.keys(SCALES)} onChange={this.handleScaleChange} />
            <SliderSelect label="Octave" currentVal={octave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
            <DropdownSelect label="MIDI Channel" currentVal={midiChannel} itemsArray={Object.keys(MIDI_CHANNELS)} onChange={this.handleMidiChannelChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      stepValue: state.grids[0].stepValue,
      scale: state.grids[0].currentScale,
      octave: state.grids[0].currentOctave,
      rootNote: state.grids[0].rootNote,
      swing: state.grids[0].swing,
      midiChannel: state.grids[0].midiChannel
    };
  }
)(GridInstanceMenu);
