import React, { Component } from 'react';
import { SCALES } from '../constants';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class SelectScale extends Component {
  constructor() {
    super();

    this.state = {
      value: Object.keys(SCALES)[0]
    }

    this.onScaleChange = this.onScaleChange.bind(this);
  }

  menuItems() {
    return Object.keys(SCALES).map((scale) => {
      return (
        <MenuItem value={scale} primaryText={scale.toString()} />
      );
    });
  }

  onScaleChange = (event, index, value) => {
    this.setState({value})

    this.props.onScaleChange(value);
  };

  render() {
    return (
      <SelectField floatingLabelText="Scale" value={this.state.value} onChange={this.onScaleChange}>
        {this.menuItems()}
      </SelectField>
    )
  }
}