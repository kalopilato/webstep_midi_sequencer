import React, { Component } from 'react';
import { connect } from 'react-redux';

import { togglePlaying, stopAndResetPosition, changeTempo } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';
import RaisedButton from 'material-ui/RaisedButton';

import { NOTES, SCALES, MIDI_CHANNELS } from '../constants';

class PlaybackControls extends Component {
  constructor(){
    super();

    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleTempoChange(tempo) {
    this.dispatchAction(changeTempo, tempo);
  }

  handleTogglePlay() {
    var { dispatch } = this.props;
    dispatch(togglePlaying());
  }

  handleStop() {
    var { dispatch } = this.props;
    dispatch(stopAndResetPosition());
  }

  dispatchAction(action, value) {
    const { dispatch } = this.props;
    dispatch(action(value));
  }

  playLabel() {
    var { playing } = this.props;
    return playing ? 'Pause' : 'Play';
  }

  render() {
    var { tempo, stepValue, playing } = this.props;

    return (
      <div className="menu">
        <div className="row small-12 columns">
          <div className="small-6 columns">
            <SliderSelect label="Tempo" currentVal={tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
          </div>
          <div className="small-6 columns">
            <RaisedButton label={this.playLabel()} primary={!playing} default={playing} onClick={this.handleTogglePlay} />
            <RaisedButton label="Stop" secondary={true} onClick={this.handleStop} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      playing: state.playing,
      tempo: state.tempo,
      stepValue: state.stepValue
    };
  }
)(PlaybackControls);
