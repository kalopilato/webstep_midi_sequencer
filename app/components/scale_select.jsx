import React, { Component } from 'react';
import { SCALES } from '../constants';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ScaleSelect extends Component {
  constructor() {
    super();

    this.onScaleChange = this.onScaleChange.bind(this);
  }

  menuItems() {
    return Object.keys(SCALES).map((scale) => {
      return (
        <MenuItem key={scale} value={scale} primaryText={scale.toString()} />
      );
    });
  }

  onScaleChange = (event, index, value) => {
    this.props.onScaleChange(value);
  };

  render() {
    var { selectedScale } = this.props;
    return (
      <div className="row">
        <SelectField floatingLabelText="Scale" value={selectedScale} onChange={this.onScaleChange}>
          {this.menuItems()}
        </SelectField>
      </div>
    )
  }
}