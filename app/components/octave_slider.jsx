import React, { Component } from 'react';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

export default class OctaveSlider extends Component {
  constructor() {
    super();

    this.onOctaveChange = this.onOctaveChange.bind(this);
  }

  onOctaveChange = (event, value) => {
    this.props.onOctaveChange(value);
  };

  render() {
    var { currentOctave } = this.props;

    return (
      <div>
        <div className="row">
          <TextField
            value={currentOctave}
            floatingLabelText="Octave"/>
        </div>

        <div className="row">
          <Slider style={{width: 250}} min={-3} max={3} defaultValue={currentOctave} step={1} onChange={this.onOctaveChange}/>
        </div>
      </div>
    )
  }
}