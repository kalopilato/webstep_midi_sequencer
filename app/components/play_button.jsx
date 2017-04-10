import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaying } from 'actions';

class PlayButton extends Component {
  constructor() {
    super();

    this.onTogglePlay = this.onTogglePlay.bind(this);
  }

  classNames() {
    var { playing } = this.props;
    return `button ${playing ? 'secondary' : 'primary'}`;
  }

  buttonLabel() {
    var { playing } = this.props;
    return playing ? 'Pause' : 'Play';
  }

  onTogglePlay() {
    var { dispatch } = this.props;

    dispatch(togglePlaying());
  }

  render() {
    return (
      <div className="column-row">
        <button className={this.classNames()} onClick={this.onTogglePlay}>
          {this.buttonLabel()}
        </button>
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
)(PlayButton);