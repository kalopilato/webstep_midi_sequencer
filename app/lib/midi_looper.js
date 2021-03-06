/*
*   Based on the `metronome` in Chris Wilson's Metronome app: `https://github.com/cwilso/metronome`
*/
import { incrementColumn, setMidiOutputs } from 'actions';
import store from '../app';
import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE, TOTAL_STEPS } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60;

var nextStep;
var lastStepDrawn;
var lookAheadTime = 25.0;
var scheduleAheadTime = 100.0;
var nextNoteTime = 0.0;
var stepDuration;
var stepsInQueue = [];

var tickerWorker = null;

var midiAccess = undefined;

export default class MIDILooper {
  constructor() {
    this.initialiseAnimFrame();
    this.initialiseTickerWorker();
    this.initialiseMIDI();

    this.updateCurrentColumn = this.updateCurrentColumn.bind(this);

    requestAnimFrame(this.updateCurrentColumn);
  }

  play() {
    nextNoteTime = window.performance.now();
    nextStep = store.getState().currentColumn;
    lastStepDrawn = nextStep === 0 ? TOTAL_STEPS - 1 : nextStep - 1;

    tickerWorker.postMessage('start');
    this.updateStepDuration();
  }

  stop() {
    tickerWorker.postMessage('stop');
  }

  scheduler() {
    while (nextNoteTime < window.performance.now() + scheduleAheadTime ) {
      this.scheduleNotes();
      this.advanceNoteTime();
    }
  }

  scheduleNotes() {
    var { grids } = store.getState();

    stepsInQueue.push( { step: nextStep, time: nextNoteTime } );

    for(let grid = 0; grid < grids.length; grid++){
      var currentGrid = grids[grid];
      if(currentGrid.active) {
        var { columns } = currentGrid;
        var col = columns[nextStep];
        var rows = this.activeRows(col);

        this.playNotes(grid, rows, nextNoteTime + 50.0);
      }
    }
  }

  advanceNoteTime() {
    nextStep++;
    this.updateStepDuration();
    nextNoteTime += stepDuration;
    if(nextStep === TOTAL_STEPS) {
      nextStep = 0;
    }
  }

  playNotes(gridIndex, rows, playTime){
    var i;
    for(i = 0; i < rows.length; i++){
      var row = rows[i];
      this.sendNoteOn(gridIndex, row, playTime);
    }
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
      if(playTime < window.performance.now()) {
        console.log('Next note playTime is in the past!!!');
      }

      midiOutput.send(noteOnMessage, playTime);
      midiOutput.send(noteOffMessage, (playTime + stepDuration * 0.8));
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

  updateStepDuration() {
    let { tempo, swing, stepValue } = store.getState();
    let swingMultiplier = swing / 50;

    stepDuration = (MINUTE / tempo) * (4 * eval(stepValue));
    stepDuration = (nextStep % 2 === 0) ? stepDuration * (2.0 - swingMultiplier) : stepDuration * swingMultiplier;
    stepDuration = stepDuration * 1000.0
  }

  updateCurrentColumn() {
    var currentStep = lastStepDrawn;
    var currentTime = window.performance.now();

    while (stepsInQueue.length && stepsInQueue[0].time < currentTime) {
        currentStep = stepsInQueue[0].step;
        // Remove note from queue
        stepsInQueue.splice(0,1);
    }

    // We only need to draw if the note has moved.
    if (lastStepDrawn != currentStep) {
        lastStepDrawn = currentStep;
        store.dispatch(incrementColumn());
    }

    requestAnimFrame(this.updateCurrentColumn);
  }

  /*
  *   INITIALISATION METHODS
  */

  initialiseAnimFrame() {
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000.0 / 60.0);
        };
    })();
  }

  initialiseAudioContext() {
    audioContext = new AudioContext();
    audioContext.now = () => {
      return audioContext.currentTime * 1000.0;
    }
  }

  initialiseTickerWorker() {
    var TickerWorker = require("worker-loader!./ticker.worker");
    tickerWorker = new TickerWorker();
    tickerWorker.onmessage = (e) => {
      if(e.data == "tick") {
        this.scheduler();
      }
      tickerWorker.postMessage({ "interval": lookAheadTime });
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
}