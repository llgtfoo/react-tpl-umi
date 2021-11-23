import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ThemePicker extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: [
        { name: '拂晓蓝(默认)', value: '#1890ff' },
        { name: '薄暮', value: '#f5222d' },
        { name: '火山', value: '#fa541c' },
        { name: '日暮', value: '#faad14' },
        { name: '明青', value: '#13c2c2' },
        { name: '极光绿', value: '#52c41a' },
        { name: '极客蓝', value: '#2f54eb' },
        { name: '酱紫', value: '#722ed1' },
      ],
    };
  }

  render() {
    return <div>系统换肤</div>;
  }
}

export default ThemePicker;
