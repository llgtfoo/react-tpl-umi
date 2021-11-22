import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ThemePicker extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {},
    };
  }

  render() {
    return <div></div>;
  }
}

export default ThemePicker;
