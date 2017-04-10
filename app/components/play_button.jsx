import React, { Component } from 'react';

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