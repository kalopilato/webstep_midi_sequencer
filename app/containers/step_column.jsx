import React, { Component } from 'react';
import { connect } from 'react-redux';
import StepButton from 'step_button';
import { createColumn } from 'actions';

class StepColumn extends Component {
  renderNotes() {
    var { id, grid } = this.props;
    var columns = this.props.grids[grid].columns;

    return columns[id].map((row) => {
      return (
        <StepButton key={row.row} row={row.row} col={row.col} active={row.active} grid={grid}/>
      );
    });
  }

  isPlaying() {
    var { id, grid, currentColumn, playing } = this.props;
    var columns = this.props.grids[grid].columns;

    return ((currentColumn - 1) === id || currentColumn === 0 && id === columns.length - 1) && playing;
  }

  classes() {
    return `grid-column ${this.isPlaying() ? 'playing' : ''}`;
  }

  render() {
    return (
      <ul className={this.classes()}>
        {this.renderNotes()}
      </ul>
    )
  }
}

export default connect(
  (state) => {
    return {
      playing: state.playing,
      currentColumn: state.currentColumn,
      grids: state.grids
    }
  }
)(StepColumn);