import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaying, stopAndResetPosition, clearGrid } from 'actions';

import PlayButton from 'play_button';
import ControlButton from 'control_button';

class Controls extends Component {
  constructor() {
    super();

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleTogglePlay() {
    var { dispatch } = this.props;
    dispatch(togglePlaying());
  }

  handleStop() {
    var { dispatch } = this.props;
    dispatch(stopAndResetPosition());
  }

  handleClear() {
    var { dispatch } = this.props;
    dispatch(clearGrid());
  }

  render() {
    return (
      <div className="controls">
        <PlayButton onClick={this.handleTogglePlay} playing={this.props.playing} />
        <ControlButton onClick={this.handleStop} label="Stop" classes="alert hollow" />
        <ControlButton onClick={this.handleClear} label="Clear" classes="secondary" />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      playing: state.playing
    }
  }
)(Controls);