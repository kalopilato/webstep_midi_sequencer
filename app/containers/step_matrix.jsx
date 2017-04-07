import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMidiOutput } from 'actions';

import StepColumn from 'step_column';

class StepMatrix extends Component {
  constructor() {
    super();

    this.state = {active: false}
    this.handleToggleStep = this.handleToggleStep.bind(this);

    this.initialiseMIDI();
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


  sendNoteOn() {
    var noteOnMessage = [0x90, 48, 0x7f]; // 0x91 = note on, channel 2 (http://www.ccarh.org/courses/253/handout/midiprotocol/)
    this.state.midiOutput.send(noteOnMessage); // 0x9F = note on, channel 16
  }

  sendNoteOff() {
    var noteOffMessage = [0x80, 48, 0x7f]; // 0x81 = note off, channel 2 (http://www.ccarh.org/courses/253/handout/midiprotocol/)
    this.state.midiOutput.send(noteOffMessage); // 0x8F = note off, channel 16
  }

  // playNote() {
  //   console.log('Note ON');
  //   this.sendNoteOn();
  //   setTimeout(() => {
  //     console.log('Note OFF');
  //     this.sendNoteOff();
  //   }, 1000);
  // }

  handleToggleStep() {
    this.state.active ? this.sendNoteOff() : this.sendNoteOn();
    this.setState({active: !this.state.active});
  }

  renderColumns() {
    const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

    return COLUMNS.map((col) => {
      return (
        <StepColumn key={col} />
      );
    });
  }

  render() {
    return (
      <ul className="column-row">
        { this.renderColumns() }
      </ul>
    )
  }
}

export default connect()(StepMatrix);