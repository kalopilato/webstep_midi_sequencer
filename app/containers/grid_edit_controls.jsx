import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearGrid } from 'actions';

import RaisedButton from 'material-ui/RaisedButton';

class GridEditControls extends Component {
  constructor(){
    super();

    this.handleClearGrid = this.handleClearGrid.bind(this);
  }

  handleClearGrid() {
    var { dispatch, grid } = this.props;
    dispatch(clearGrid(grid));
  }

  render() {
    var { tempo, swing, stepValue, playing } = this.props;

    return (
      <div className="row small-12 columns" style={{display: 'inline-block', paddingBottom: 40}}>
        <RaisedButton label="Clear" onClick={this.handleClearGrid} style={{width: '20%', marginLeft: '15%'}} />
        <RaisedButton label="Copy" primary={true} onClick={this.handleClearGrid} style={{width: '20%', marginLeft: '5%'}} />
        <RaisedButton label="Paste" secondary={true} onClick={this.handleClearGrid} style={{width: '20%', marginLeft: '5%'}} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return state;
    // {
    //   clipboard: state.clipboard
    // };
  }
)(GridEditControls);
