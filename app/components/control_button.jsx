import React, { Component } from 'react';

export default class ControlButton extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  label() {
    return this.props.label;
  }

  classNames() {
    return `button ${this.props.classes}`;
  }

  render() {
    return (
      <button className={this.classNames()} onClick={this.onClick}>
        {this.label()}
      </button>
    )
  }
}