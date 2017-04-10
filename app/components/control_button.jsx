import React, { Component } from 'react';

export default class ControlButton extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    var { classes, label } = this.props;
    var classNames = `button ${classes}`;

    return (
      <button className={classNames} onClick={this.onClick}>{label}</button>
    )
  }
}