/*
 * @Description:登录状态验证
 * @Author: llgtfoo
 * @Date: 2021-11-18 14:47:39
 * @LastEditTime: 2021-12-03 11:22:19
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\permissions\isLoginState.jsx
 */
import { Redirect, history, connect } from 'umi';
import React, { Component } from 'react';
import { isLoginState } from '../services/login/index';
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
      const { dispatch } = this.props;
      if (success) {
        this.setState({ isLogin: success });
        dispatch({
          type: 'user/fetchUser',
          payload: data,
        });
      }
    } catch (error) {
      this.setState({ isLogin: false });
    }
  }
  render() {
    const { isLogin } = this.state;

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
