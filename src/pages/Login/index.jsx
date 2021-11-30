import { login } from '@/services/login/index';
import { LockOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel, useDispatch } from 'umi';
import actions from '@/models/GlobalState.js';
import './index.less';

export default function Login(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {});
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async (user) => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => {
        actions.setGlobalState({ userInfo: { ...userInfo, ...user } });
        return {
          ...s,
          currentUser: { ...userInfo, ...user },
        };
      });
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (result.status === 'ok') {
        setLoading(false);
        message.success('登录成功');
        await fetchUserInfo(result);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.replace(redirect || '/');
      } else {
        setLoading(false);
        message.error(result.data.message);
      }

      // }
    } catch (error) {
      setLoading(false);
      message.error('登录失败，请重试！');
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };
  // 校验用户名不为空
  const validateUsername = async (rule, value) => {
    if (value && value !== '') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请输入用户名!'));
  };
  // 校验密码不为空
  const validatePassword = async (rule, value) => {
    if (value && value !== '') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('密码不能为空!'));
  };
  return (
    <div className="login-wraper">
      <div className="login-form">
        <div className="login-logo">
          <TwitterOutlined style={{ fontSize: '90px', color: '#1890ff' }} />
          <p className="logo-text">系统名称</p>
        </div>
        <div className="login-right-form">
          <Row>
            <Col>
              <div className="form-title">账号登录</div>
            </Col>
          </Row>
          <Form
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
              username: 'admin',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ validator: validateUsername }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名：admin"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码：123456"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Checkbox>记住用户名</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
