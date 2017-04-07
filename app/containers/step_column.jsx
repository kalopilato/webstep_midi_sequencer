import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepButton from 'step_button';

const NOTES = ['C3', 'D3', 'E3', 'F3', 'G3', 'A4', 'B4', 'C4'];

class StepColumn extends Component {

  renderNotes() {
    return NOTES.map((note) => {
      return (
        <StepButton key={note} />
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
    return {
      active: state.active
    }
  }
)(StepColumn);