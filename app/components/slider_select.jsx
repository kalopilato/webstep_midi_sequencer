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
    var { currentVal, minVal, maxVal, label, units } = this.props;

    return (
      <div style={{paddingTop: 18}}>
        <p style={{textAlign: 'left', fontSize: '0.65625rem', color: 'rgba(0, 0, 0, 0.298039)'}}>
          {label}
          <span style={{float: 'right'}}>{currentVal}{units}</span>
        </p>

        <Slider sliderStyle={{width: 250, marginTop: 0, marginBottom: 0}}
                min={minVal}
                max={maxVal}
                defaultValue={currentVal}
                step={1}
                onChange={this.onChange} />
      </div>
    )
  }
}