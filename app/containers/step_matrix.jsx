import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepColumn from 'step_column';

class StepMatrix extends Component {
  renderColumns() {
    var { columns } = this.props
    return columns.map((col, i) => {
      return (
        <StepColumn key={i} id={i} />
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
    columns: state.grid1.columns,
  }
})(StepMatrix);