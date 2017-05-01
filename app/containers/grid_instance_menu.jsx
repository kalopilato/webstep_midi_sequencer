import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeStepValue,
         changeScale,
         changeOctave,
         changeRootNote,
         changeMidiChannel,
         clearGrid } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';
import RaisedButton from 'material-ui/RaisedButton';

import { STEP_VALUES, NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class GridInstanceMenu extends Component {
  constructor(){
    super();

    this.handleStepValueChange = this.handleStepValueChange.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
    this.handleRootNoteChange = this.handleRootNoteChange.bind(this);
    this.handleMidiChannelChange = this.handleMidiChannelChange.bind(this);
    this.handleClearGrid = this.handleClearGrid.bind(this);
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

  handleMidiChannelChange(channel) {
    this.dispatchAction(changeMidiChannel, channel);
  }

  handleClearGrid() {
    var { dispatch, grid } = this.props;
    dispatch(clearGrid(grid));
  }

  dispatchAction(action, value) {
    const { dispatch, grid } = this.props;
    dispatch(action(value, grid));
  }

  render() {
    var grid = this.props.grids[this.props.grid];
    var { stepValue, currentScale, currentOctave, rootNote, midiChannel } = grid;

    return (
      <div className="menu">
        <div className="row">
          <div className="small-12 columns">
            <DropdownSelect label="Step Value" currentVal={stepValue} itemsArray={STEP_VALUES} onChange={this.handleStepValueChange} />
            <DropdownSelect label="Key / Root Note" currentVal={NOTES[rootNote]} itemsArray={NOTES} onChange={this.handleRootNoteChange} />
            <DropdownSelect label="Scale" currentVal={currentScale} itemsArray={Object.keys(SCALES)} onChange={this.handleScaleChange} />
            <SliderSelect label="Octave" currentVal={currentOctave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
            <DropdownSelect label="MIDI Channel" currentVal={midiChannel} itemsArray={Object.keys(MIDI_CHANNELS)} onChange={this.handleMidiChannelChange} />
            <RaisedButton label="Clear Grid" secondary={true} onClick={this.handleClearGrid} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      grids: state.grids
    };
  }
)(GridInstanceMenu);
