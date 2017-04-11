import React, { Component } from 'react';
import { NOTES } from '../constants';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ScaleSelect extends Component {
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
    this.props.onKeyChange(value);
  };

  render() {
    var { currentKey } = this.props;

    return (
      <div className="row">
        <SelectField floatingLabelText="Key" value={currentKey} onChange={this.onChange}>
          {this.menuItems()}
        </SelectField>
      </div>
    )
  }
}