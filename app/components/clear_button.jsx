import React, { Component } from 'react';

export default class ClearButton extends Component {
  onClear() {
    this.props.onStop();
  }

  render() {
    return (
      <button className="button secondary" onClick={this.props.onClear.bind(this)}>Clear</button>
    )
  }
}