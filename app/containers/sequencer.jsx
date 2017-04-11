import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepMatrix from 'step_matrix';
import Controls from 'controls';
import { incrementColumn } from 'actions';

import { SCALES } from '../constants';

const MIDI_ROOT = 60;
const TEMPO = 120;
const STEP_TIME = 60000/TEMPO;

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
    var { dispatch } = this.props;
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

  sendNoteOn(noteIndex) {
    var { currentScale } = this.props;
    var note = MIDI_ROOT + SCALES[currentScale][noteIndex];
    console.log("NOTE", note);
    var noteOnMessage = [0x90, note, 0x7f];   // 0x91 = note on, channel 2 (http://www.ccarh.org/courses/253/handout/midiprotocol/)
    var noteOffMessage = [0x80, note, 0x7f];  // 0x81 = note off, channel 2 (http://www.ccarh.org/courses/253/handout/midiprotocol/)
                                              // 0x8F = note off, channel 16

    this.state.midiOutput.send(noteOnMessage); // 0x9F = note on, channel 16
    this.timer = setTimeout(() => {
      this.state.midiOutput.send(noteOffMessage);
    }, STEP_TIME / 2);
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
      var { columns, currentColumn, dispatch } = this.props;
      dispatch(incrementColumn());

      var col = columns[currentColumn];
      var rows = this.activeRows(col);

      this.playNotes(rows);

      this.stepTimer = setTimeout(() => {
        this.playLoop();
      }, STEP_TIME);
    }
  }

  render() {
    return (
      <div>
        <StepMatrix />
        <Controls />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Sequencer);