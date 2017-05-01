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
    var { row, col, grid, dispatch } = this.props;

    dispatch(toggleStepButton(col, row, grid));
  }

  render() {
    return (
      <div className={this.classNames()} onClick={this.onToggleStep}>
      </div>
    )
  }
}

export default connect()(StepButton);