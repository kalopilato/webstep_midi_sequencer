import React, { Component } from 'react';
import { connect } from 'react-redux';

import StepMatrix from 'step_matrix';
import PlayButton from 'play_button';
import { incrementColumn } from 'actions';

const NATURAL_MINOR       = [0, 2, 3, 5, 7, 8, 10, 12];
const HARMONIC_MINOR      = [0, 2, 3, 5, 7, 8, 11, 12];
const HUNGARIAN_MINOR     = [0, 2, 3, 6, 7, 8, 11, 12];
const MAJOR               = [0, 2, 4, 5, 7, 9, 11, 12];
const DORIAN              = [0, 2, 3, 5, 7, 9, 10, 12];
const UKRANIAN_DORIAN     = [0, 2, 3, 6, 7, 9, 10, 12];
const BEBOP_DORIAN        = [0, 3, 4, 5, 7, 9, 10, 12];
const PHRYGIAN            = [0, 1, 3, 5, 7, 8, 10, 12];
const LYDIAN              = [0, 2, 4, 6, 7, 9, 11, 12];
const MIXOLYDIAN          = [0, 2, 4, 5, 7, 9, 10, 12];
const AEOLIAN             = [0, 2, 3, 5, 7, 8, 10, 12]; // descending melodic minor scale
const HEPTATONIA_SECONDA  = [0, 2, 3, 5, 7, 9, 11, 12]; // ascending melodic minor scale
const LOCRIAN             = [0, 1, 3, 5, 6, 8, 10, 12];
const MARVA               = [0, 1, 4, 6, 7, 9, 11, 12];
const TODI                = [0, 1, 3, 6, 7, 8, 11, 12];

const MIDI_ROOT = 60;
const TEMPO = 120;
const STEP_TIME = 60000/TEMPO;

class Sequencer extends Component {
  constructor() {
    super();

    this.initialiseMIDI();
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
        () => { alert("MIDI Access Denied")}
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
    var note = MIDI_ROOT + NATURAL_MINOR[noteIndex];
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
        <PlayButton />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
  }
)(Sequencer);