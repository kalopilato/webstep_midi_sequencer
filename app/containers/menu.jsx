import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale, changeTempo, changeOctave } from 'actions';
import ScaleSelect from 'scale_select';
import TempoSlider from 'tempo_slider';
import OctaveSlider from 'octave_slider';

import injectTouchTapEvent from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Menu extends Component {
  constructor(){
    super();

    injectTouchTapEvent();

    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleOctaveChange = this.handleOctaveChange.bind(this);
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

  render() {
    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <TempoSlider currentTempo={this.props.tempo} onTempoChange={this.handleTempoChange} />
              <ScaleSelect selectedScale={this.props.scale} onScaleChange={this.handleScaleChange} />
              <OctaveSlider currentOctave={this.props.octave} onOctaveChange={this.handleOctaveChange} />
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
      octave: state.currentOctave
    };
  }
)(Menu);
