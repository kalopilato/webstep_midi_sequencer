import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale,
         changeOctave,
         changeRootNote,
         changeMidiChannel,
         clearGrid,
         changeMidiOutputId } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';
import RaisedButton from 'material-ui/RaisedButton';

import { STEP_VALUES, NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class GridInstanceMenu extends Component {
  constructor(){
    super();

    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
    this.handleRootNoteChange = this.handleRootNoteChange.bind(this);
    this.handleMidiChannelChange = this.handleMidiChannelChange.bind(this);
    this.handleClearGrid = this.handleClearGrid.bind(this);
    this.handleMidiOutputChange = this.handleMidiOutputChange.bind(this);
  }

  handleScaleChange(index, scale) {
    this.dispatchAction(changeScale, scale);
  }

  handleOctaveChange(octave) {
    this.dispatchAction(changeOctave, octave);
  }

  handleRootNoteChange(index, rootNote) {
    this.dispatchAction(changeRootNote, index);
  }

  handleMidiOutputChange(index, output) {
    var { midiOutputs } = this.props;
    this.dispatchAction(changeMidiOutputId, midiOutputs[index].id);
  }

  handleMidiChannelChange(index, channel) {
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
    var { midiOutputs } = this.props;
    var grid = this.props.grids[this.props.grid];
    var { stepValue, currentScale, currentOctave, rootNote, midiChannel, midiOutputId } = grid;

    var outputNames = midiOutputs.map((output) => {
      return output.name;
    });

    var currentOutputName = midiOutputId ? midiOutputs.find(output => output.id === midiOutputId).name : undefined;

    return (
      <div className="menu">
        <div className="row">
          <div className="small-12 columns" style={{flex: 'none'}}>
            <DropdownSelect label="Key / Root Note" currentVal={NOTES[rootNote]} itemsArray={NOTES} onChange={this.handleRootNoteChange} />
            <DropdownSelect label="Scale" currentVal={currentScale} itemsArray={Object.keys(SCALES)} onChange={this.handleScaleChange} />
            <SliderSelect label="Octave" units="" currentVal={currentOctave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
            <DropdownSelect label="MIDI Output" currentVal={currentOutputName} itemsArray={outputNames} onChange={this.handleMidiOutputChange} />
            <DropdownSelect label="MIDI Channel" currentVal={midiChannel} itemsArray={Object.keys(MIDI_CHANNELS)} onChange={this.handleMidiChannelChange} />
            <RaisedButton label="Clear Grid" secondary={true} onClick={this.handleClearGrid} style={{width: '100%'}}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      grids: state.grids,
      midiOutputs: state.midiOutputs
    };
  }
)(GridInstanceMenu);
