import React, { Component } from 'react';

class StepButton extends Component {
  constructor() {
    super();
    this.onToggleStep = this.onToggleStep.bind(this);
  }
  classNames() {
    return `step-button ${this.props.active ? 'step-button-active' : ''}`;
  }

  onToggleStep() {
    this.props.onToggleStep();
  }

  render() {
    return (
      <div className={this.classNames()} onClick={this.onToggleStep}>
      </div>
    )
  }
}

export default StepButton;