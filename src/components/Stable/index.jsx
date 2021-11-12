import React, { Component } from 'react';
import { Table } from 'antd';
import './index.less';

export default class Stable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: {},
    };
    this.stableRef = React.createRef();
    this.stablePageRef = React.createRef();
  }
  componentDidMount() {
    //监听窗口改变
    window.addEventListener('resize', () => {
      this.autoHeight();
    });
    this.autoHeight();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.autoHeight();
    });
  }
  //表格计算自动高度
  autoHeight = () => {
    const widthTotal = this.props.columns.reduce((prv, current) => {
      const news = current.width ? Number(current.width) : 180;
      return prv + news;
    }, 0);
    const x =
      widthTotal > this.stableRef.current.getBoundingClientRect().width
        ? widthTotal
        : this.stableRef.current.getBoundingClientRect().width;
    const scroll = {
      x: x - 10,
      y: this.stableRef.current.getBoundingClientRect().height - 65,
    };
    console.log(scroll, 'scroll');
    this.setState((state, props) => {
      return {
        scroll: scroll,
      };
    });
    // }, 0);
  };
  render() {
    const { scroll } = this.state;
    const { dataSource, columns } = this.props;
    return (
      <div className="s-table">
        <div className="s-table-container" ref={this.stableRef}>
          <Table
            loading={false}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered={true}
            scroll={scroll}
          />
        </div>
        <div className="page-info" ref={this.stablePageRef}></div>
      </div>
    );
  }
}
