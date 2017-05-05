import { incrementColumn, setMidiOutputs } from 'actions';
import store from '../app';

import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE, GRID_COUNT } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60000;

var nextNoteTime, startTime, lastRenderTime, requestId, stepDuration;
var midiAccess = undefined;

export default class MIDILooper {
  constructor() {
    this.initialiseMIDI();
    this.schedule = this.schedule.bind(this);
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

    if(outputs.size < 1){
      return alert("You have no MIDI devices connected");
    }

    var midiOutputs = [];
    for(let output of outputs.values()) { midiOutputs.push(output) };

    var outputsList = [];
    for(let output of midiOutputs) {
      outputsList.push({ id: output.id, name: `${output.manufacturer} ${output.name}`});
    }

    store.dispatch(setMidiOutputs(outputsList));
    this.midiAccess = midiAccess;
  }

  play() {
    nextNoteTime = 0.0;
    startTime = window.performance.now() + 0.005;
    lastRenderTime = -1;
    this.updateStepDuration();
    this.schedule();
    console.log("start playing");
  }

  stop() {
    this.clearSchedule();
  }

  // See (http://www.ccarh.org/courses/253/handout/midiprotocol/) for more info
  sendNoteOn(gridIndex, noteIndex, playTime) {
    var { tempo } = store.getState();
    var { currentScale, currentOctave, rootNote, midiChannel, midiOutputId } = store.getState().grids[gridIndex];
    var note = MIDI_ROOT + rootNote + (currentOctave * 12) + SCALES[currentScale][noteIndex];

    var midiOutput;
    if(this.midiAccess) {
      midiOutput = this.midiAccess.outputs.get(midiOutputId);
    }

    //TODO: error handling when midiOutput is not selected or does not exist
    if(midiOutput) {
      let channel = MIDI_CHANNELS[midiChannel];
      let noteOn = MIDI_MESSAGE_TYPE.NOTE_ON;
      let noteOff = MIDI_MESSAGE_TYPE.NOTE_OFF;
      var noteOnByte = parseInt(noteOn + channel, 2);
      var noteOffByte = parseInt(noteOff + channel, 2);

      var noteOnMessage = [noteOnByte, note, 0x7f];
      var noteOffMessage = [noteOffByte, note, 0x7f];

      midiOutput.send(noteOnMessage, playTime);
      midiOutput.send(noteOffMessage, playTime + stepDuration * 0.9);
    }
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
      var { currentColumn, grids } = store.getState();
      var playTime = nextNoteTime + startTime;

      for(let grid = 0; grid < grids.length; grid++){
        var currentGrid = grids[grid];
        if(currentGrid.active) {
          var { columns } = currentGrid;

          var col = columns[currentColumn];
          var rows = this.activeRows(col);

          this.playNotes(grid, rows, playTime);
        }
      }
      if(nextNoteTime !== lastRenderTime) {
        lastRenderTime = nextNoteTime;
        store.dispatch(incrementColumn());
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
    let { tempo, swing, stepValue, currentColumn } = store.getState();
    let swingMultiplier = swing / 50;

    stepDuration = (MINUTE / tempo) * (4 * eval(stepValue));
    stepDuration = (currentColumn % 2 === 0) ? stepDuration * (2 - swingMultiplier) : stepDuration * swingMultiplier;
  }
}