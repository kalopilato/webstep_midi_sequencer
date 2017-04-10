import React, { Component } from 'react';

export default class StopButton extends Component {
  onStop() {
    this.props.onStop();
  }

  render() {
    return (
      <button className="button alert hollow" onClick={this.props.onStop.bind(this)}>Stop</button>
    )
  }
}