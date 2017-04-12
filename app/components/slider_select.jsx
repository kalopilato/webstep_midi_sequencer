import React, { Component } from 'react';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

export default class TempoSlider extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  onChange = (event, value) => {
    this.props.onChange(value);
  };

  render() {
    var { currentVal, minVal, maxVal, label } = this.props;

    return (
      <div>
        <div className="row">
          <TextField
            value={currentVal}
            floatingLabelText={label}/>
        </div>

        <div className="row">
          <Slider style={{width: 250}} min={minVal} max={maxVal} defaultValue={currentVal} step={1} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}