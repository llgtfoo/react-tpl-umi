import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
export default class ModalPage extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    wrapClassName: PropTypes.string,
  };
  static defaultProps = {
    visible: true, //弹窗显示
    title: 'Modal标题title未指定', //弹窗标题
    wrapClassName: 'modal-page-container', //弹窗html位置
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  render() {
    const {
      visible,
      title,
      children,
      handleOk,
      handleCancel,
      wrapClassName,
    } = this.props;
    const { loading } = this.state;
    return (
      <Modal
        wrapClassName={wrapClassName}
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>,
        ]}
      >
        {children}
      </Modal>
    );
  }
}
