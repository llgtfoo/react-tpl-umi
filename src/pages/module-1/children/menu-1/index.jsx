import React, { useState } from 'react';
import Stable from '@/components/Stable/index.jsx';
import './index.less';
export default function MenuOne() {
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 200,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 200,
    },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Column 9',
      dataIndex: 'address',
      key: '9',
      width: 200,
    },
    {
      title: 'Column 10',
      dataIndex: 'address',
      key: '10',
      width: 200,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
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
  return (
    <div className="menu-1-container">
      <Stable
        columns={columns}
        dataSource={data}
        freeHeight={false}
        currentPage={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        onSelectChange={onSelectChange}
        selectedRowKeys={selectedRowKeys}
      ></Stable>
    </div>
  );
}
