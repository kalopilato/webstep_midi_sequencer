import React, { Component } from 'react';
import { connect } from 'react-redux';

import { togglePlaying, stopAndResetPosition, changeTempo, changeSwing, changeStepValue } from 'actions';

import SliderSelect from 'slider_select';
import DropdownSelect from 'dropdown_select';
import RaisedButton from 'material-ui/RaisedButton';

import { NOTES, SCALES, STEP_VALUES, MIDI_CHANNELS } from '../constants';

class PlaybackControls extends Component {
  constructor(){
    super();

    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handleSwingChange = this.handleSwingChange.bind(this);
    this.handleStepValueChange = this.handleStepValueChange.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleTempoChange(tempo) {
    this.dispatchAction(changeTempo, tempo);
  }

  handleSwingChange(swing) {
    this.dispatchAction(changeSwing, swing);
  }

  handleStepValueChange(index, stepValue) {
    this.dispatchAction(changeStepValue, stepValue);
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
    var { tempo, swing, stepValue, playing } = this.props;

    return (
      <div className="menu">
        <div className="row small-12 columns">
          <div className="small-3 columns menu-component">
            <SliderSelect label="Tempo" units="bpm" currentVal={tempo} minVal={40} maxVal={240} onChange={this.handleTempoChange} />
          </div>
          <div className="small-3 columns menu-component">
            <SliderSelect label="Swing" units="%" currentVal={swing} minVal={50} maxVal={80} onChange={this.handleSwingChange} />
          </div>
          <div className="small-3 columns menu-component">
            <DropdownSelect label="Step Value" currentVal={stepValue} itemsArray={STEP_VALUES} onChange={this.handleStepValueChange} />
          </div>
          <div className="small-3 columns menu-component">
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
      stepValue: state.stepValue,
      swing: state.swing
    };
  }
)(PlaybackControls);
