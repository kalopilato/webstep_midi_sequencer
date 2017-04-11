import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeScale, changeTempo } from 'actions';
import ScaleSelect from 'scale_select';
import TempoSlider from 'tempo_slider';

import injectTouchTapEvent from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Menu extends Component {
  constructor(){
    super();

    this.state = { value: 1 }

    injectTouchTapEvent();

    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
  }

  handleScaleChange(scale) {
    var { dispatch } = this.props;
    dispatch(changeScale(scale));
  }

  handleTempoChange(tempo) {
    var { dispatch } = this.props;
    dispatch(changeTempo(tempo));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <TempoSlider currentTempo={this.props.tempo} onTempoChange={this.handleTempoChange} />
              <ScaleSelect selectedScale={this.props.scale} onScaleChange={this.handleScaleChange} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  (state) => {
    return {
      scale: state.currentScale,
      tempo: state.tempo
    };
  }
)(Menu);
