import React, { Component } from 'react';
import { connect } from 'react-redux';

import SequencerMenu from 'sequencer_menu';
import Sequencer from 'sequencer';
import GridInstanceMenu from 'grid_instance_menu';

class Main extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="large-12 columns">
            <SequencerMenu />
          </div>
        </div>

        <div className="row">
          <div className="large-3 columns">
            <GridInstanceMenu />
          </div>

          <div className="large-9 columns">
            <Sequencer />
          </div>
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