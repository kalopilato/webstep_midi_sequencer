import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleStepButton } from 'actions';

class StepButton extends Component {
  constructor() {
    super();
    this.onToggleStep = this.onToggleStep.bind(this);
  }
  classNames() {
    var { active } = this.props;
    return `step-button ${active ? 'active' : ''}`;
  }

  onToggleStep() {
    var { dispatch } = this.props;
    dispatch(toggleStepButton());
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
    return {
      active: state.active
    }
  }
)(StepButton);