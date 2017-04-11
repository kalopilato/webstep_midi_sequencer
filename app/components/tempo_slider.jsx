import React, { Component } from 'react';
import { SCALES } from '../constants';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

export default class TempoSlider extends Component {
  constructor() {
    super();

    this.onTempoChange = this.onTempoChange.bind(this);
  }

  onTempoChange = (event, value) => {
    this.props.onTempoChange(value);
  };

  render() {
    var { currentTempo } = this.props;

    return (
      <div>
        <div className="row">
          <TextField
            value={currentTempo}
            floatingLabelText="Tempo"/>
        </div>

        <div className="row">
          <Slider style={{width: 250}} min={40} max={240} defaultValue={currentTempo} step={1} onChange={this.onTempoChange}/>
        </div>
      </div>
    )
  }
}