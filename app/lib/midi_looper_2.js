/*
*   Based on the `metronome` in Chris Wilson's Metronome app: `https://github.com/cwilso/metronome`
*/
import { incrementColumn, setMidiOutputs } from 'actions';
import store from '../app';
import { SCALES, MIDI_CHANNELS, MIDI_MESSAGE_TYPE, TOTAL_STEPS } from '../constants';

const MIDI_ROOT = 60;
const MINUTE = 60;

var startTime;
var nextStep;
var lastStepDrawn;
var audioContext = null;
var lookahead = 10.0;
var scheduleAheadTime = 0.1;
var nextNoteTime = 0.0;
var stepDuration;
var notesInQueue = [];

var timerWorker = null;

// var startTime, lastRenderTime, requestId, stepDuration;
var midiAccess = undefined;

export default class MIDILooper {
  constructor() {
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    this.initialiseMIDI();

    audioContext = new AudioContext();


    var TickerWorker = require("worker-loader!./ticker.worker");
    timerWorker = new TickerWorker();
    timerWorker.onmessage = (e) => {
      // console.log("message from worker", e.data);
      if(e.data == "tick") {
        this.scheduler();
      }
      timerWorker.postMessage({ "interval": lookahead });
    }

    this.updateCurrentColumn = this.updateCurrentColumn.bind(this);
    requestAnimFrame(this.updateCurrentColumn);
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
    startTime = window.performance.now();
    nextNoteTime = audioContext.currentTime;
    debugger;
    nextStep = store.getState().currentColumn;
    lastStepDrawn = nextStep === 0 ? TOTAL_STEPS - 1 : nextStep - 1;
    timerWorker.postMessage('start');
    this.updateStepDuration();
  }

  stop() {
    timerWorker.postMessage('stop');
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
      console.log('scheduling note');
      midiOutput.send(noteOnMessage, playTime * 1000.0 + 1000.0);
      midiOutput.send(noteOffMessage, playTime * 1000.0 + 1000.0 + stepDuration * 0.9);
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

  scheduler() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      this.scheduleNotes();
      this.nextNote();
    }
  }

  nextNote() {
    this.advanceNoteTime();
    // store.dispatch(incrementColumn());
  }

  scheduleNotes() {
    var { grids } = store.getState();
    notesInQueue.push( { step: nextStep, time: nextNoteTime } );

    for(let grid = 0; grid < grids.length; grid++){
      var currentGrid = grids[grid];
      if(currentGrid.active) {
        var { columns } = currentGrid;

        var col = columns[nextStep];
        var rows = this.activeRows(col);

        this.playNotes(grid, rows, nextNoteTime);
      }
    }
    // if(nextNoteTime !== lastRenderTime) {
    //   lastRenderTime = nextNoteTime;
    //   store.dispatch(incrementColumn());
    // }
    // this.advanceNoteTime();
  }

  advanceNoteTime() {
    nextStep++;
    this.updateStepDuration();
    nextNoteTime += stepDuration;
    if(nextStep === TOTAL_STEPS) {
      nextStep = 0;
    }
    console.log('nextStep', nextStep, 'nextNoteTime', nextNoteTime);
  }

  updateStepDuration() {
    let { tempo, swing, stepValue } = store.getState();
    let swingMultiplier = swing / 50;

    stepDuration = (MINUTE / tempo) * (4 * eval(stepValue));
    stepDuration = (nextStep % 2 === 0) ? stepDuration * (2 - swingMultiplier) : stepDuration * swingMultiplier;
  }

  updateCurrentColumn() {
    var currentStep = lastStepDrawn;
    var currentTime = audioContext.currentTime;

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        currentStep = notesInQueue[0].step;
        notesInQueue.splice(0,1);   // remove note from queue
    }

    // We only need to draw if the note has moved.
    if (lastStepDrawn != currentStep) {
        lastStepDrawn = currentStep;
        store.dispatch(incrementColumn());
    }

    requestAnimFrame(this.updateCurrentColumn);
  }



  // schedule() {
  //   var currentTime = window.performance.now() - startTime;

  //   while (nextNoteTime < currentTime + 0.200) {
  //     var { currentColumn, grids } = store.getState();
  //     var playTime = nextNoteTime + startTime;

  //     for(let grid = 0; grid < grids.length; grid++){
  //       var currentGrid = grids[grid];
  //       if(currentGrid.active) {
  //         var { columns } = currentGrid;

  //         var col = columns[currentColumn];
  //         var rows = this.activeRows(col);

  //         this.playNotes(grid, rows, playTime);
  //       }
  //     }
  //     if(nextNoteTime !== lastRenderTime) {
  //       lastRenderTime = nextNoteTime;
  //       store.dispatch(incrementColumn());
  //     }
  //     this.advanceNoteTime();
  //   }

  //   requestId = window.requestAnimationFrame(this.schedule);
  // }


}