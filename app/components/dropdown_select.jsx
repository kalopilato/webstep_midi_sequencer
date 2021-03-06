import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class DropdownSelect extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  menuItems(itemsArray) {
    return itemsArray.map((item) => {
      return (
        <MenuItem key={item} value={item} primaryText={item} />
      );
    });
  }

  onChange = (event, index, value) => {
    this.props.onChange(index, value);
  };

  render() {
    var { currentVal, label, itemsArray } = this.props;

    return (
      <div className="row">
        <SelectField floatingLabelText={label} value={currentVal} onChange={this.onChange} floatingLabelStyle={{fontSize: 20, color: 'rgba(0, 0, 0, 0.8)'}}>
          {this.menuItems(itemsArray)}
        </SelectField>
      </div>
    )
  }
}