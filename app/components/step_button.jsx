import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleStepButton } from 'actions';

class StepButton extends Component {
  constructor({col, row, active}) {
    super();

    this.state = {
      col, row
    };
    this.onToggleStep = this.onToggleStep.bind(this);
  }

  classNames() {
    var { active } = this.props;
    return `step-button ${active ? 'active' : ''}`;
  }

  onToggleStep() {
    var { row, col, dispatch } = this.props;

    dispatch(toggleStepButton(col, row));
  }

  render() {
    return (
      <div className={this.classNames()} onClick={this.onToggleStep}>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state.grid1;
  }
)(StepButton);