import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaying } from 'actions';

import PlayButton from 'play_button';

class Controls extends Component {
  constructor() {
    super();

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay() {
    var { dispatch } = this.props;

    dispatch(togglePlaying());
  }

  render() {
    return (
      <div className="column-row">
        <PlayButton playing={this.props.playing} onTogglePlay={this.handleTogglePlay} />
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