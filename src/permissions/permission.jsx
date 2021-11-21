/*
 * @Description:菜单权限访问
 * @Author: llgtfoo
 * @Date: 2021-11-18 14:47:39
 * @LastEditTime: 2021-11-21 12:19:21
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\permissions\permission.jsx
 */
import React, { Component } from 'react';
import { history } from 'umi';
import NotFound from '../pages/notFound/404.jsx';
import { fetchMenulist } from '@/services/common/index';
let bool = null;
export default class wrappers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
    };
  }
  async componentDidMount() {
    //获取菜单
    const { data, success } = await fetchMenulist();
    if (success) {
      this.setState({ list: data });
    }
  }
  render() {
    const { isExists } = useAuth(this.state.list, window.location.hash);
    if (isExists || history.location.pathname === '/') {
      bool = null;
      return <div>{this.props.children}</div>;
    } else {
      return <NotFound />;
    }
  }
}
//递归查找
const isExists = (list, path) => {
  if (list && list.length > 0) {
    list.forEach((v) => {
      if ('#' + v.url === path) {
        bool = v;
      } else if (v.children && v.children.length > 0) {
        isExists(v.children, path);
      }
    });
  }
  return bool;
};
//判断菜单权限校验校验
const useAuth = (list, path) => {
  const s = isExists(list, path);
  return { isExists: s || !list ? true : false };
};
