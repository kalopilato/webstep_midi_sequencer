import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepButton from 'step_button';
import { createColumn } from 'actions';

const NOTES = ['C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4'];

class StepColumn extends Component {
  renderNotes() {
    var { columns } = this.props;
    return columns[this.props.id].map((row) => {

      return (
        <StepButton key={row.row} row={row.row} col={row.col} active={row.active} />
      );
    });
  }

  render() {
    return (
      <ul className="step-column">
        {this.renderNotes()}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(StepColumn);