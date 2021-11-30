import React, { useState, useEffect } from 'react';
import Stable from '@/components/Stable/index.jsx';
import './index.less';
import { useModel } from 'umi';
export default function MenuOne() {
  const column = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      fixed: 'left',
      show: true,
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
      align: 'center',
      show: true,
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      align: 'center',
      ellipsis: true,
      show: true,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      align: 'center',
      ellipsis: true,
      key: '2',
      show: true,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      align: 'center',
      ellipsis: true,
      show: true,
      key: '3',
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      align: 'center',
      ellipsis: true,
      key: '4',
      show: true,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      align: 'center',
      ellipsis: true,
      show: true,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      align: 'center',
      ellipsis: true,
      key: '6',
      show: true,
    },
    {
      title: 'Column 7',
      align: 'center',
      dataIndex: 'address',
      ellipsis: true,
      key: '7',
      show: true,
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
      align: 'center',
      ellipsis: true,
      show: true,
    },
    {
      title: 'Column 9',
      dataIndex: 'address',
      align: 'center',
      key: '9',
      ellipsis: true,
      show: true,
    },
    {
      title: 'Column 10',
      dataIndex: 'address',
      align: 'center',
      key: '10',
      ellipsis: true,
      show: true,
    },
    {
      title: 'Action',
      align: 'center',
      key: 'operation',
      fixed: 'right',
      show: true,
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  const [columns, setColumns] = useState(column); //当前页
  const [currentPage, setCurrentPage] = useState(1); //当前页
  const [total, setTotal] = useState(50); //总条数
  const [pageSize, setPageSize] = useState(10); //页条数
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //多选
  const onChange = (page, pageSize) => {
    console.log(page, pageSize, 'onChange');
    setCurrentPage(page);
  };
  const onShowSizeChange = (current, size) => {
    console.log(current, size, 'onShowSizeChange');
    setPageSize(size);
  };
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows, 'onSelectChange');
    setSelectedRowKeys(selectedRowKeys);
  };
  const onClickRow = (event, record) => {
    console.log(record, 'onClickRow');
  };
  const onDoubleClickRow = (event, record) => {
    console.log(record, 'onDoubleClick');
  };
  const onColumnsShow = (column) => {
    setColumns(column);
  };
  return (
    <div className="menu-1-container">
      <Stable
        columns={columns}
        dataSource={data}
        freeHeight={false} //表格高度自由延伸
        currentPage={currentPage} //当前页
        total={total} //总数
        bordered={true}
        pageSize={pageSize} //页条数
        onChange={onChange} //当前页改变
        onShowSizeChange={onShowSizeChange} //页条数改变
        rowSelection={true} //多选显示
        onSelectChange={onSelectChange} //多选改变函数
        selectedRowKeys={selectedRowKeys} //多选选中
        onClickRow={onClickRow} //单击一行
        onDoubleClickRow={onDoubleClickRow} //双击一行
        onColumnsShow={onColumnsShow} //自定义显示
      ></Stable>
    </div>
  );
}
