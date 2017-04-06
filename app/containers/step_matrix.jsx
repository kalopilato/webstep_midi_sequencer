import React, { Component } from 'react';

import StepButton from 'step_button';

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
      alert("Your browser does not support MIDI, use a real browser");
    }
  }

  midiSuccess(midiAccess) {
    if(midiAccess.outputs.size < 1){
      return alert("You have no MIDI devices connected");
    }
    var outputs = midiAccess.outputs;

    var midiOutputs = [];
    for(let output of outputs) { midiOutputs.push(output[1]) };

    this.setState({ midiOutput: midiOutputs[0] });
    console.log("Setting MIDI output device to: ", midiOutputs[0]);
  }


  sendNoteOn() {
    var noteOnMessage = [0x90, 44 , 0x7f];
    this.state.midiOutput.send(noteOnMessage);
  }

  sendNoteOff() {
    var noteOffMessage = [0x80, 44, 0x7f];
    this.state.midiOutput.send(noteOffMessage);
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

  render() {
    return (
      <StepButton active={this.state.active} onToggleStep={this.handleToggleStep}/>
    )
  }
}

export default StepMatrix;