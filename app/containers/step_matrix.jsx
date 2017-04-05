import React, { Component } from 'react';

import StepButton from 'step_button';

class StepMatrix extends Component {
  constructor() {
    super();

    this.state = {active: false}
    this.handleToggleStep = this.handleToggleStep.bind(this);
  }

  handleToggleStep() {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <StepButton active={this.state.active} onToggleStep={this.handleToggleStep}/>
    )
  }
}

export default StepMatrix;