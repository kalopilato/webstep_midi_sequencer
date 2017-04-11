import React, { Component } from 'react';
import { NOTES } from '../constants';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class RootNoteSelect extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  menuItems() {
    return NOTES.map((note) => {
      return (
        <MenuItem key={note} value={note} primaryText={note} />
      );
    });
  }

  onChange = (event, index, value) => {
    this.props.onRootNoteChange(index);
  };

  render() {
    let { rootNoteIndex } = this.props;
    let rootNote = NOTES[rootNoteIndex];

    return (
      <div className="row">
        <SelectField floatingLabelText="Key / Root Note" value={rootNote} onChange={this.onChange}>
          {this.menuItems()}
        </SelectField>
      </div>
    )
  }
}