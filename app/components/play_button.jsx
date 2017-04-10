import React, { Component } from 'react';

export default class PlayButton extends Component {
  classNames() {
    var { playing } = this.props;
    return `button ${playing ? 'secondary' : 'primary'}`;
  }

  buttonLabel() {
    var { playing } = this.props;
    return playing ? 'Pause' : 'Play';
  }

  onTogglePlay() {
    this.props.onTogglePlay();
  }

  render() {
    return (
      <button className={this.classNames()} onClick={this.onTogglePlay.bind(this)}>
        {this.buttonLabel()}
      </button>
    )
  }
}