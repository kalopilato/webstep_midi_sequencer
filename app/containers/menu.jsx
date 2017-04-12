import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale,
         changeTempo,
         changeOctave,
         changeRootNote,
         changeStepValue,
         changeSwing,
         changeMidiChannel } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';

import { STEP_VALUES, NOTES, SCALES, MIDI_CHANNELS } from '../constants';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Menu extends Component {
  constructor(){
    super();

    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
    this.handleRootNoteChange = this.handleRootNoteChange.bind(this);
    this.handleStepValueChange = this.handleStepValueChange.bind(this);
    this.handleSwingChange = this.handleSwingChange.bind(this);
    this.handleMidiChannelChange = this.handleMidiChannelChange.bind(this);
  }

  handleScaleChange(scale) {
    this.dispatchAction(changeScale, scale);
  }

  handleTempoChange(tempo) {
    this.dispatchAction(changeTempo, tempo);
  }

  handleOctaveChange(octave) {
    this.dispatchAction(changeOctave, octave);
  }

  handleRootNoteChange(rootNote) {
    const index = NOTES.indexOf(rootNote);
    this.dispatchAction(changeRootNote, index);
  }

  handleStepValueChange(stepValue) {
    this.dispatchAction(changeStepValue, stepValue);
  }

  handleSwingChange(swing) {
    this.dispatchAction(changeSwing, swing);
  }

  handleMidiChannelChange(channel) {
    this.dispatchAction(changeMidiChannel, channel);
  }

  dispatchAction(action, value) {
    const { dispatch } = this.props;
    dispatch(action(value));
  }

  render() {
    var { scale, tempo, octave, rootNote, stepValue, swing, midiChannel } = this.props;

    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <SliderSelect label="Tempo" currentVal={tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
              <DropdownSelect label="Step Value" currentVal={stepValue} itemsArray={STEP_VALUES} onChange={this.handleStepValueChange} />
              <SliderSelect label="Swing" currentVal={swing} minVal={50} maxVal={80} onChange={this.handleSwingChange} />
              <DropdownSelect label="Key / Root Note" currentVal={NOTES[rootNote]} itemsArray={NOTES} onChange={this.handleRootNoteChange} />
              <DropdownSelect label="Scale" currentVal={scale} itemsArray={Object.keys(SCALES)} onChange={this.handleScaleChange} />
              <SliderSelect label="Octave" currentVal={octave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
              <DropdownSelect label="MIDI Channel" currentVal={midiChannel} itemsArray={Object.keys(MIDI_CHANNELS)} onChange={this.handleMidiChannelChange} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  (state) => {
    return {
      scale: state.currentScale,
      tempo: state.tempo,
      octave: state.currentOctave,
      rootNote: state.rootNote,
      stepValue: state.stepValue,
      swing: state.swing,
      midiChannel: state.midiChannel
    };
  }
)(Menu);
