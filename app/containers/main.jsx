import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepMatrix from 'step_matrix';
import PlaybackControls from 'playback_controls';
import GridInstanceMenu from 'grid_instance_menu';

import { incrementColumn, setMidiOutputs } from 'actions';

import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60000;

var nextNoteTime, startTime, lastRenderTime, requestId, stepDuration;

class Main extends Component {
  constructor() {
    super();

    this.initialiseMIDI();
    this.schedule = this.schedule.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    var { playing } = this.props;
    if(playing !== prevProps.playing){
      if(playing) {
        nextNoteTime = 0.0;
        startTime = window.performance.now() + 0.005;
        lastRenderTime = -1;
        this.updateStepDuration();
        this.schedule();
        console.log("start playing");
      } else {
        this.clearSchedule();
      }

    }
  }

  initialiseMIDI() {
    if(navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        this.midiSuccess.bind(this),
        () => { alert("MIDI Error: Access Denied")}
      );
    } else {
      alert("Your browser does not support the Web MIDI API :(");
    }
  }

  midiSuccess(midiAccess) {
    var outputs = midiAccess.outputs;
    var { dispatch } = this.props;

    if(outputs.size < 1){
      return alert("You have no MIDI devices connected");
    }

    var midiOutputs = [];
    for(let output of outputs.values()) { midiOutputs.push(output) };

    var outputsList = [];
    for(let output of midiOutputs) {
      outputsList.push({ id: output.id, name: `${output.manufacturer} ${output.name}`});
    }

    dispatch(setMidiOutputs(outputsList));

    this.setState({ midiAccess });
  }

  // See (http://www.ccarh.org/courses/253/handout/midiprotocol/) for more info
  sendNoteOn(gridIndex, noteIndex, playTime) {
    var { tempo, dispatch } = this.props;
    var { currentScale, currentOctave, rootNote, midiChannel, midiOutputId } = this.props.grids[gridIndex];
    var note = MIDI_ROOT + rootNote + (currentOctave * 12) + SCALES[currentScale][noteIndex];

    let channel = MIDI_CHANNELS[midiChannel];
    let noteOn = MIDI_MESSAGE_TYPE.NOTE_ON;
    let noteOff = MIDI_MESSAGE_TYPE.NOTE_OFF;
    var noteOnByte = parseInt(noteOn + channel, 2);
    var noteOffByte = parseInt(noteOff + channel, 2);
    //TODO: error handling when midiOutput is not selected or does not exist
    var midiOutput = this.state.midiAccess.outputs.get(midiOutputId);

    var noteOnMessage = [noteOnByte, note, 0x7f];
    var noteOffMessage = [noteOffByte, note, 0x7f];

    midiOutput.send(noteOnMessage, playTime);
    midiOutput.send(noteOffMessage, playTime + stepDuration * 0.9);
  }

  activeRows(column) {
    var rows = [];

    var i;
    for(i = 0; i < column.length; i++) {
      var row = column[i];
      if(row.active){
        rows.push(row.row);
      }
    }
    return rows;
  }

  playNotes(gridIndex, rows, playTime){
    var i;
    for(i = 0; i < rows.length; i++){
      var row = rows[i];
      this.sendNoteOn(gridIndex, row, playTime);
    }
  }

  clearSchedule(){
    window.cancelAnimationFrame(requestId);
  }

  schedule() {
    var currentTime = window.performance.now() - startTime;

    while (nextNoteTime < currentTime + 0.200) {
      var { dispatch, currentColumn, grids } = this.props;
      var playTime = nextNoteTime + startTime;

      for(let grid = 0; grid < grids.length; grid++){
        var currentGrid = grids[grid];
        var { columns } = currentGrid;

        var col = columns[currentColumn];
        var rows = this.activeRows(col);

        this.playNotes(grid, rows, playTime);
      }
      if(nextNoteTime !== lastRenderTime) {
        lastRenderTime = nextNoteTime;
        dispatch(incrementColumn());
      }
      this.advanceNoteTime();
    }

    requestId = window.requestAnimationFrame(this.schedule);
  }

  advanceNoteTime() {
    this.updateStepDuration();
    nextNoteTime += stepDuration;
  }

  updateStepDuration() {
    let { tempo, swing, stepValue, currentColumn } = this.props;
    let swingMultiplier = swing / 50;

    stepDuration = (MINUTE / tempo) * (4 * eval(stepValue));
    stepDuration = (currentColumn % 2 === 0) ? stepDuration * (2 - swingMultiplier) : stepDuration * swingMultiplier;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="large-12 columns">
            <PlaybackControls />
          </div>
        </div>

        <div className="row">
          <div className="large-3 columns">
            <GridInstanceMenu grid={0} />
          </div>

          <div className="large-9 columns">
            <StepMatrix grid={0} />
          </div>
        </div>

        <div className="row">
          <div className="large-3 columns">
            <GridInstanceMenu grid={1} />
          </div>

          <div className="large-9 columns">
            <StepMatrix grid={1} />
          </div>
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