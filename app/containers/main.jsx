import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sequencer from 'sequencer';
import Menu from 'menu';

class Main extends Component {
  render() {
    return (
      <div className="row">
        <div className="large-3 columns">
          <Menu />
        </div>

        <div className="large-9 columns">
          <Sequencer />
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state.grid1;
  }
)(Main);