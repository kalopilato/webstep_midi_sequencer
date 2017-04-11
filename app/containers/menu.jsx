import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale, changeTempo, changeOctave, changeRootNote } from 'actions';
import SliderSelect from 'slider_select';
import DropDownSelect from 'dropdown_select';

import { NOTES, SCALES } from '../constants';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Menu extends Component {
  constructor(){
    super();

    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
    this.handleRootNoteChange = this.handleRootNoteChange.bind(this);
  }

  handleScaleChange(scale) {
    const { dispatch } = this.props;
    dispatch(changeScale(scale));
  }

  handleTempoChange(tempo) {
    const { dispatch } = this.props;
    dispatch(changeTempo(tempo));
  }

  handleOctaveChange(octave) {
    const { dispatch } = this.props;
    dispatch(changeOctave(octave));
  }

  handleRootNoteChange(rootNote) {
    const { dispatch } = this.props;
    let index = NOTES.indexOf(rootNote);
    dispatch(changeRootNote(index));
  }

  render() {
    var { scale, tempo, octave, rootNote } = this.props;

    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <SliderSelect label="Tempo" currentVal={tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
              <DropDownSelect label="Key / Root Note" currentVal={NOTES[rootNote]} itemsArray={NOTES} onChange={this.handleRootNoteChange} />
              <DropDownSelect label="Scale" currentVal={scale} itemsArray={Object.keys(SCALES)} onChange={this.handleScaleChange} />
              <SliderSelect label="Octave" currentVal={octave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
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
      rootNote: state.rootNote
    };
  }
)(Menu);
