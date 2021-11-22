import React, { useState } from 'react';
import { Button } from 'antd';
import ModalPage from '@/components/ModalPage/index.jsx';
import TestForm from './components/TestForm';
export default function MenuOne() {
  function showModal() {
    setVisible(true);
  }
  const handleOk = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <ModalPage
        title="新增"
        handleOk={handleOk}
        handleCancel={handleCancel}
        visible={visible}
      >
        <TestForm></TestForm>
      </ModalPage>
      <p>菜单二-1</p>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
    </div>
  );
}
