import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepColumn from 'step_column';

class StepMatrix extends Component {
  renderColumns() {
    const grid = this.props.grids[this.props.grid];
    const columns = grid.columns;

    return columns.map((col, i) => {
      return (
        <StepColumn key={i} id={i} grid={this.props.grid}/>
      );
    });
  }

  render() {
    return (
      <ul className="sequencer-grid">
        { this.renderColumns() }
      </ul>
    )
  }
}

export default connect((state) => {
  return {
    grids: state.grids
  }
})(StepMatrix);