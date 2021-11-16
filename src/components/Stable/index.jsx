import React, { Component } from 'react';
import { Table, Pagination } from 'antd';
import PropTypes from 'prop-types';
import './index.less';
export default class Stable extends Component {
  static propTypes = {
    columns: PropTypes.array, //表格列
    dataSource: PropTypes.array, //数据
    freeHeight: PropTypes.bool, //表格高度自由延伸
    total: PropTypes.number, //总条数
    currentPage: PropTypes.number, //当前页
    pageSize: PropTypes.number, //页条数
    pageSizeOptions: PropTypes.array, //每页条数选项
    showSizeChanger: PropTypes.bool, //每页条数选项显示
    showQuickJumper: PropTypes.bool, //跳页显示
    onChange: PropTypes.func, //显示页改变
    onShowSizeChange: PropTypes.func, //页条数改变

    bordered: PropTypes.bool, //表格边框
    isloading: PropTypes.bool, //表格加载中
    onSelectChange: PropTypes.func, //表格多选回调
    selectedRowKeys: PropTypes.array, //指定选中项的 key 数组，需要和 onChange 进行配合
  };
  static defaultProps = {
    freeHeight: true,
    total: 200,
    currentPage: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 40, 60],
    showSizeChanger: true,
    showQuickJumper: true,
    bordered: true,
    isloading: false,
    selectedRowKeys: [],
  };
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
    window.addEventListener('resize', this.autoHeight);
    this.autoHeight();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.autoHeight);
  }
  //表格计算自动高度
  autoHeight = () => {
    const { freeHeight } = this.props;
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
      y: this.stableRef.current.getBoundingClientRect().height - 55,
    };
    //表格满屏高度false，还是自由高度true
    if (freeHeight) {
      delete scroll.y;
    }
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
    const {
      dataSource,
      bordered,
      columns,
      total,
      currentPage,
      pageSize,
      pageSizeOptions,
      showSizeChanger,
      showQuickJumper,
      onShowSizeChange,
      onChange,
      isloading,
      onSelectChange,
      selectedRowKeys,
    } = this.props;
    //表格多选
    const rowSelection = {
      selectedRowKeys: selectedRowKeys, //选中key
      onChange: onSelectChange, //选中改变
      fixed: true,
    };
    return (
      <div className="s-table">
        <div className="s-table-container" ref={this.stableRef}>
          <Table
            loading={isloading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered={bordered}
            scroll={scroll}
            rowSelection={rowSelection}
          />
        </div>
        <div className="page-info" ref={this.stablePageRef}>
          <Pagination
            total={total}
            current={currentPage}
            pageSize={pageSize}
            pageSizeOptions={pageSizeOptions}
            responsive={true}
            showSizeChanger={showSizeChanger}
            showQuickJumper={showQuickJumper}
            showTotal={(total) => `共 ${total} 条`}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}
