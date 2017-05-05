import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearGrid, setClipboard, setGrid, randomiseGrid } from 'actions';

import RaisedButton from 'material-ui/RaisedButton';

class GridEditControls extends Component {
  constructor(){
    super();

    this.handleCopy = this.handleCopy.bind(this);
    this.handleClearGrid = this.handleClearGrid.bind(this);
    this.handlePasteGrid = this.handlePasteGrid.bind(this);
    this.handleRandomiseGrid = this.handleRandomiseGrid.bind(this);
  }

  handleCopy() {
    var { dispatch, grid: gridIndex } = this.props;
    var grid = this.props.grids[gridIndex];

    dispatch(setClipboard(grid.columns));
  }

  handleClearGrid() {
    var { dispatch, grid } = this.props;
    dispatch(clearGrid(grid));
  }

  handlePasteGrid() {
    var { dispatch, grid, clipboard } = this.props;

    dispatch(setGrid(grid, clipboard));
  }

  handleRandomiseGrid() {
    var { dispatch, grid} = this.props;

    dispatch(randomiseGrid(grid));
  }

  render() {
    var { clipboard } = this.props;

    return (
      <div className="row small-12 columns" style={{display: 'inline-block', paddingBottom: 40}}>
        <RaisedButton label="Copy" primary={true} onClick={this.handleCopy} style={{width: '15%', marginLeft: '12.5%'}} />
        <RaisedButton label="Paste" secondary={true} disabled={clipboard.length === 0} onClick={this.handlePasteGrid} style={{width: '15%', marginLeft: '5%'}} />
        <RaisedButton label="Clear" onClick={this.handleClearGrid} style={{width: '15%', marginLeft: '5%'}} />
        <RaisedButton label="Randomise" primary={true} onClick={this.handleRandomiseGrid} style={{width: '15%', marginLeft: '5%'}} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      grids: state.grids,
      clipboard: state.clipboard
    };
  }
)(GridEditControls);
