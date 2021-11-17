import React, { useState } from 'react';
import Stable from '@/components/Stable/index.jsx';
import { Button, message } from 'antd';
import './index.less';
export default function MenuOne() {
  const onClickOperation = (e, name) => {
    message.info(`单击了${name}操作`);
    e.preventDefault();
    e.stopPropagation();
  };
  const column = [
    {
      title: 'Full Name',
      width: 200,
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
      key: '2',
      show: true,
      ellipsis: true,
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
      show: true,
      key: '4',
      ellipsis: true,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      show: true,
      key: '5',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Action',
      align: 'center',
      show: true,
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: () => {
        return (
          <span>
            <Button
              type="primary"
              size="small"
              onClick={(e) => onClickOperation(e, 'text')}
            >
              Text
            </Button>
            <Button
              type="primary"
              size="small"
              danger
              onClick={(e) => onClickOperation(e, 'delete')}
            >
              delete
            </Button>
          </span>
        );
      },
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
      llgfoo: '1111111111111111111111',
    });
  }
  const columnsChild = [
    {
      title: 'Age1',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
    },
    {
      title: 'Age2',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
    },
    {
      title: 'Age3',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
    },
    {
      title: 'Age4',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
    },

    {
      title: 'Age5',
      dataIndex: 'age',
      align: 'center',
      key: 'age',
    },
  ];
  const dataChild = [];
  for (let i = 0; i < 3; i++) {
    dataChild.push({
      key: i,
      name: `Edrward ${i}`,
      age: `London Park no. ${i}`,
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
    <div className="menu-2-container">
      <Stable
        columnsChild={columnsChild} //嵌套表格
        dataChild={dataChild} //嵌套表格
        columns={columns}
        dataSource={data}
        freeHeight={true} //表格高度自由延伸
        currentPage={currentPage} //当前页
        total={total} //总数
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
