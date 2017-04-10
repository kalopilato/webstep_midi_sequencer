import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaying, stopAndResetPosition, clearGrid } from 'actions';

import PlayButton from 'play_button';
import StopButton from 'stop_button';
import ClearButton from 'clear_button';

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
      <div className="column-row">
        <PlayButton playing={this.props.playing} onTogglePlay={this.handleTogglePlay} />
        <StopButton onStop={this.handleStop} />
        <ClearButton onClear={this.handleClear} />
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