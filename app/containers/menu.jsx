import React, { Component } from 'react';
import { connect } from 'react-redux';

import SelectScale from 'select_scale';
import { changeScale } from 'actions';

import injectTouchTapEvent from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

class Menu extends Component {
  constructor(){
    super();

    this.state = { value: 1 }

    injectTouchTapEvent();

    this.handleScaleChange = this.handleScaleChange.bind(this);
  }

  handleScaleChange(scale) {
    var { dispatch } = this.props;

    dispatch(changeScale(scale));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="menu">
          <div className="row">
            <div className="small-12 columns">
              <div className="row">
                <SelectScale onScaleChange={this.handleScaleChange}/>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Menu);
