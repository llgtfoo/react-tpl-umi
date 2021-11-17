import React, { Component } from 'react';
import { Table, Pagination, Dropdown, Menu, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { BarsOutlined } from '@ant-design/icons';
import './index.less';
export default class Stable extends Component {
  static propTypes = {
    columns: PropTypes.array, //表格列
    dataSource: PropTypes.array, //数据
    dataChild: PropTypes.array, //数据-内嵌表格
    columnsChild: PropTypes.array, //表格列-内嵌表格
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
    rowSelection: PropTypes.bool, //是否显示多选
    onSelectChange: PropTypes.func, //表格多选回调
    selectedRowKeys: PropTypes.array, //指定选中项的 key 数组，需要和 onChange 进行配合
    onClickRow: PropTypes.func, //单击一行
    onDoubleClickRow: PropTypes.func, //单击一行
    onColumnsShow: PropTypes.func, //表格自动义显示回调
    showNumber: PropTypes.number, //自定义显示至少展示多少个
  };
  static defaultProps = {
    // dataChild: [],
    dataSource: [],
    columns: [],
    // columnsChild: [],
    freeHeight: true,
    total: 200,
    currentPage: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 40, 60],
    showSizeChanger: true,
    showQuickJumper: true,
    bordered: false,
    isloading: false,
    selectedRowKeys: [],
    rowSelection: true,
    showNumber: 5,
  };
  constructor(props) {
    super(props);
    this.state = {
      scroll: {},
      currentRow: {}, //当前点击row
      visible: false, //自定义框显示
      disabled: false, //自定禁用
    };
    this.stableRef = React.createRef(); //table Dom
    this.stablePageRef = React.createRef(); //page Dom
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
    const widthTotal = this.props.columns
      .filter((v) => v.show)
      .reduce((prv, current) => {
        const news = current.width ? Number(current.width) : 180;
        return prv + news;
      }, 0);
    const x =
      widthTotal > this.stableRef.current.getBoundingClientRect().width
        ? widthTotal
        : this.stableRef.current.getBoundingClientRect().width;
    const scroll = {
      x: x - 20,
      y: this.stableRef.current.getBoundingClientRect().height - 50,
    };
    //表格满屏高度false，还是自由高度true
    if (freeHeight) {
      delete scroll.y;
    }
    console.log(
      scroll,
      this.stableRef.current.getBoundingClientRect(),
      widthTotal,
      'scroll',
    );
    this.setState((state, props) => {
      return {
        scroll: scroll,
      };
    });
    // }, 0);
  };
  //多选改变
  onChanges = (e, data) => {
    data.show = e.target.checked;
    if (
      this.props.columns.filter((v) => v.show).length <= this.props.showNumber
    ) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
    this.autoHeight();
    if (this.props.onColumnsShow) {
      this.props.onColumnsShow([...this.props.columns]);
    }
  };
  //控制多选框显示
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };
  render() {
    const { scroll, visible, disabled } = this.state;
    const {
      dataSource,
      dataChild,
      bordered,
      columns,
      columnsChild,
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
      rowSelection,
      onClickRow,
      onDoubleClickRow,
    } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="1" className="checkbox-list">
          {columns.map((v, i) => (
            <Checkbox
              checked={v.show}
              key={v.key}
              onChange={(e) => this.onChanges(e, v)}
              disabled={v.show && disabled}
            >
              {v.title}
            </Checkbox>
          ))}
        </Menu.Item>
      </Menu>
    );
    //表格多选
    const rowSelections = rowSelection
      ? {
          selectedRowKeys: selectedRowKeys, //选中key
          onChange: onSelectChange, //选中改变
          fixed: true,
        }
      : rowSelection;
    //嵌套表格
    const expandedRowRender = () => {
      return (
        <Table
          columns={columnsChild}
          dataSource={dataChild}
          pagination={false}
          // scroll={{ y: 300 }}
          size="small"
        />
      );
    };
    return (
      <div className="s-table">
        <div className="s-table-container" ref={this.stableRef}>
          <Table
            loading={isloading}
            columns={columns.filter((v) => v.show)}
            dataSource={dataSource}
            pagination={false}
            bordered={bordered}
            scroll={scroll}
            rowSelection={rowSelections}
            rowClassName={(record, index) => {
              return record.key === this.state.currentRow.key
                ? 'ant-table-row-selected'
                : '';
            }}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  if (onClickRow) {
                    this.setState({
                      currentRow: record,
                    });
                    onClickRow(event, record);
                  }
                }, // 点击行
                onDoubleClick: (event) => {
                  if (onDoubleClickRow) {
                    this.setState({
                      currentRow: record,
                    });
                    onDoubleClickRow(event, record);
                  }
                },
                onContextMenu: (event) => {},
                onMouseEnter: (event) => {}, // 鼠标移入行
                onMouseLeave: (event) => {},
              };
            }}
            expandable={
              columnsChild && dataChild ? { expandedRowRender } : false
            }
          />
        </div>
        <div className="page-info" ref={this.stablePageRef}>
          <Dropdown
            overlay={menu}
            placement="topLeft"
            trigger={['click']}
            onVisibleChange={this.handleVisibleChange}
            visible={visible}
          >
            <div className="columns-show">
              <BarsOutlined />
              <span>自定义显示</span>
            </div>
          </Dropdown>
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
