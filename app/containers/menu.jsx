import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale, changeTempo, changeOctave, changeRootNote } from 'actions';
import ScaleSelect from 'scale_select';
import RootNoteSelect from 'root_note_select';
import SliderSelect from 'slider_select';

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
    var { dispatch } = this.props;
    dispatch(changeScale(scale));
  }

  handleTempoChange(tempo) {
    var { dispatch } = this.props;
    dispatch(changeTempo(tempo));
  }

  handleOctaveChange(octave) {
    var { dispatch } = this.props;
    dispatch(changeOctave(octave));
  }

  handleRootNoteChange(index) {
    var { dispatch } = this.props;
    dispatch(changeRootNote(index));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <SliderSelect label="Tempo" currentVal={this.props.tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
              <RootNoteSelect rootNoteIndex={this.props.rootNote} onRootNoteChange={this.handleRootNoteChange} />
              <ScaleSelect selectedScale={this.props.scale} onScaleChange={this.handleScaleChange} />
              <SliderSelect label="Octave" currentVal={this.props.octave} minVal={-3} maxVal={3} onChange={this.handleOctaveChange} />
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
