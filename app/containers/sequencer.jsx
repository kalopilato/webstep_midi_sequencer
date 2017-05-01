import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepMatrix from 'step_matrix';
import { incrementColumn } from 'actions';

import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60000;

class Sequencer extends Component {
  constructor() {
    super();

    this.initialiseMIDI();
    this.sendNoteOn = this.sendNoteOn.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    var { playing } = this.props;
    if(playing !== prevProps.playing){
      if(playing) {
        this.playLoop();
        console.log("start playing");
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
      alert("Your browser does not support MIDI, please use a real browser");
    }
  }

  midiSuccess(midiAccess) {
    var outputs = midiAccess.outputs;

    if(outputs.size < 1){
      return alert("You have no MIDI devices connected");
    }

    var midiOutputs = [];
    for(let output of outputs) { midiOutputs.push(output[1]) };

    var selectedMidiOutput = midiOutputs[0];

    this.setState({ midiOutput: selectedMidiOutput });
    console.log("Setting MIDI output device to: ", selectedMidiOutput);
  }

  // See (http://www.ccarh.org/courses/253/handout/midiprotocol/) for more info
  sendNoteOn(noteIndex) {
    var { currentScale, tempo, currentOctave, rootNote, midiChannel } = this.props;
    var note = MIDI_ROOT + rootNote + (currentOctave * 12) + SCALES[currentScale][noteIndex];

    let channel = MIDI_CHANNELS[midiChannel];
    let noteOn = MIDI_MESSAGE_TYPE.NOTE_ON;
    let noteOff = MIDI_MESSAGE_TYPE.NOTE_OFF;
    var noteOnByte = parseInt(noteOn + channel, 2);
    var noteOffByte = parseInt(noteOff + channel, 2);

    var noteOnMessage = [noteOnByte, note, 0x7f];
    var noteOffMessage = [noteOffByte, note, 0x7f];

    this.state.midiOutput.send(noteOnMessage);
    this.timer = setTimeout(() => {
      this.state.midiOutput.send(noteOffMessage);
    }, (MINUTE / tempo) / 2);
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

  playNotes(rows){
    var i;
    for(i = 0; i < rows.length; i++){
      var row = rows[i];
      this.sendNoteOn(row);
    }
  }

  playLoop() {
    var { playing } = this.props;
    if(playing){
      var { tempo, stepValue, swing, columns, currentColumn, dispatch } = this.props;
      dispatch(incrementColumn());

      var col = columns[currentColumn];
      var rows = this.activeRows(col);

      this.playNotes(rows);

      let stepDuration = (MINUTE / tempo) * (4 * eval(stepValue));
      let swingMultiplier = swing / 50;

      stepDuration = (currentColumn % 2 === 0) ? stepDuration * swingMultiplier : stepDuration * (2 - swingMultiplier);

      this.stepTimer = setTimeout(() => {
        this.playLoop();
      }, stepDuration);
    }
  }

  render() {
    return (
      <div>
        <StepMatrix grid={this.props.grid} />
      </div>
    )
  }
}

export default connect(
  (state) => {

    return {
      playing: state.playing,
      tempo: state.tempo,
      currentColumn: state.currentColumn,
      stepValue: state.grids[0].stepValue,
      currentScale: state.grids[0].currentScale,
      currentOctave: state.grids[0].currentOctave,
      rootNote: state.grids[0].rootNote,
      midiChannel: state.grids[0].midiChannel,
      swing: state.grids[0].swing,
      columns: state.grids[0].columns,
    }
  }
)(Sequencer);