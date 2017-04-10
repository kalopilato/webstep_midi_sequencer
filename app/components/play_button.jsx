import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlaying } from 'actions';

class PlayButton extends Component {
  classNames() {
    var { playing } = this.props;
    return `button ${playing ? 'secondary' : 'primary'}`;
  }

  buttonLabel() {
    var { playing } = this.props;
    return playing ? 'Pause' : 'Play';
  }

  render() {
    return (
      <button className={this.classNames()} onClick={this.props.onTogglePlay()}>
        {this.buttonLabel()}
      </button>
    )
  }
}