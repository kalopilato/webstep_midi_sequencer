import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepColumn from 'step_column';

class StepMatrix extends Component {
  renderColumns() {
    var { columns, grid } = this.props
    return columns.map((col, i) => {
      return (
        <StepColumn key={i} id={i} grid={grid}/>
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
    columns: state.grids[0].columns,
  }
})(StepMatrix);