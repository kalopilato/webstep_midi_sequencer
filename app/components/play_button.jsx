import React, { Component } from 'react';
import ControlButton from 'control_button';

export default class PlayButton extends ControlButton {
  classNames() {
    var { playing } = this.props;
    return `button ${playing ? 'secondary' : 'primary'}`;
  }

  label() {
    var { playing } = this.props;
    return playing ? 'Pause' : 'Play';
  }
}