import React, { Component } from 'react';
import { connect } from 'react-redux';

class Menu extends Component {
  render() {
    return (
      <div className="menu">MENU</div>
    )
  }
}

export default connect()(Menu);