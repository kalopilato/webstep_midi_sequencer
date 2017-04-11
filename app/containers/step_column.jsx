import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepButton from 'step_button';
import { createColumn } from 'actions';

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