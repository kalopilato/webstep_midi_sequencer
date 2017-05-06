import React, { Component } from 'react';
import { connect } from 'react-redux';
import MIDILooper from '../lib/midi_looper_2';

import StepMatrix from 'step_matrix';
import PlaybackControls from 'playback_controls';
import GridInstanceMenu from 'grid_instance_menu';
import GridEditControls from 'grid_edit_controls';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import { incrementColumn, setMidiOutputs } from 'actions';

import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE, GRID_COUNT } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60000;

var nextNoteTime, startTime, lastRenderTime, requestId, stepDuration;

class Main extends Component {
  constructor() {
    super();

    this.state = { midiLooper: new MIDILooper(), slideIndex: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    var { playing } = this.props;
    if(playing !== prevProps.playing){
      if(playing) {
        this.state.midiLooper.play();
      } else {
        this.state.midiLooper.stop();
      }
    }
  }

  handleTabChange(value) {
    this.setState({
      slideIndex: value
    });
  }

  tabComponents() {
    var tabs = [];
    for(let i = 0; i < GRID_COUNT; i++) {
      tabs.push(
        <Tab key={`grid-tab-${i}`} label={`Grid ${i + 1}`} value={i} />
      );
    }
    return tabs;
  }

  tabPanes() {
    var tabPanes = [];
    for(let i = 0; i < GRID_COUNT; i++) {
      tabPanes.push(
        <div key={`grid-pane-${i}`}>
          <div className="row" style={{position: 'relative'}}>
            <div className="large-3 columns" style={{height:'100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <GridInstanceMenu grid={i} />
            </div>

            <div className="large-9 columns">
              <StepMatrix grid={i} />
            </div>
          </div>

          <div className="row" >
            <div className="large-3 columns"></div>
            <div className="large-9 columns" style={{display: 'flex', justifyContent: 'center'}}>
              <GridEditControls grid={i} />
            </div>
          </div>
        </div>
      );
    }
    return tabPanes;
  }

  render() {
    return (
      <div>
        <div>
          <AppBar title="WebStep" iconElementRight={
            <FlatButton href="https://github.com/kalopilato/webstep_midi_sequencer"
                        target="_blank"
                        secondary={true}
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
            />
          }/>
        </div>

        <div className="row">
          <div className="large-12 columns">
            <PlaybackControls />
          </div>
        </div>

        <div className="row small-12 columns" >
          <Tabs onChange={this.handleTabChange} value={this.state.slideIndex} >
            {this.tabComponents()}
          </Tabs>

          <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleTabChange} style={{border: '2px solid #9E9E9E', borderTop: 0}}>
            {this.tabPanes()}
          </SwipeableViews>
        </div>


      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      playing: state.playing,
      tempo: state.tempo,
      swing: state.swing,
      stepValue: state.stepValue,
      currentColumn: state.currentColumn,
      grids: state.grids
    }
  }
)(Main);