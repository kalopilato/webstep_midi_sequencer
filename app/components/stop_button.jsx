import React, { Component } from 'react';

class StopButton extends Component {
  render() {
    return (
      <button className="button alert hollow" onClick={this.props.onStop()}>Stop</button>
    )
  }
}