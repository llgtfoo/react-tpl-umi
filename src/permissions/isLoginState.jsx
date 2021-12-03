/*
 * @Description:登录状态验证
 * @Author: llgtfoo
 * @Date: 2021-11-18 14:47:39
 * @LastEditTime: 2021-12-03 17:25:33
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\permissions\isLoginState.jsx
 */
import { Redirect, history, connect } from 'umi';
import React, { Component } from 'react';
import { isLoginState } from '../services/login/index';
import actions from '@/models/GlobalState.js';
class isLoginStates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }
  async componentDidMount() {
    try {
      //获取菜单
      const { data, success } = await isLoginState();
      console.log(data, 'aa');
      const { dispatch } = this.props;
      if (success) {
        this.setState({ isLogin: success });
        actions.setGlobalState({ userInfo: { ...data } });
      }
    } catch (error) {
      this.setState({ isLogin: false });
    }
  }
  render() {
    const { isLogin } = this.state;
    console.log(isLogin, this.props, 'isLoginState.jsx');
    if (history.location.pathname === '/login') {
      return <Redirect to="/login" />;
    } else if (isLogin) {
      return <div>{this.props.children}</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default connect((state) => state)(isLoginStates);
