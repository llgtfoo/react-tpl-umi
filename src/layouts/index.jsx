import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Layout, Menu, Spin } from 'antd';
import WaterMark from 'watermark-component-for-react'; //水印
const { Header } = Layout;
import SiderMenu from './SiderMenu.jsx'; //菜单栏
import SettingDropdown from '../components/SettingDropdown/index.jsx'; //设置
import './index.less';
class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.firstPath = null;
  }
  //菜单点击
  clickMenuItem = ({ key, keyPath, domEvent }) => {
    const { dispatch } = this.props;
    history.push(key); //跳转
    // const currentMenu = this.getMenu(key);
    // dispatch({
    //   type: 'common/setSiderMenus',
    //   payload: { currentMenu: currentMenu },
    // });
    // //默认跳转第一个菜单
    // if (currentMenu.length > 0) {
    //   const obj = this.getFirstJumpPath(currentMenu[0]);
    //   history.push(obj.url);
    // }
  };
  //获取默认跳转路径
  getFirstJumpPath = (data) => {
    if (data.children && data.children.length > 0) {
      this.getFirstJumpPath(data.children[0]);
    } else {
      this.firstPath = data;
    }
    return this.firstPath;
  };
  //处理侧边菜单数据
  getMenu = (key) => {
    if (this.props.menuList.length === 0) {
      return;
    }
    let list = [];
    const currentMenu = this.props.menuList.filter((v) => v.url === key);
    if (currentMenu.length > 0) {
      if (currentMenu[0].children && currentMenu[0].children.length > 0) {
        list = currentMenu[0].children;
      } else {
        list = [];
      }
    }
    return list;
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const current = `/${history.location.pathname.split('/')[1]}`; //顶部初始化选中
    //获取菜单
    dispatch({
      type: 'common/fetchMenuList',
      payload: { currentUrl: current },
    });
  }
  render() {
    const current = `/${history.location.pathname.split('/')[1]}`; //顶部初始化选中
    const selectedKeys = [current]; //顶部选中
    const { menuList, children, menuLoading } = this.props;
    return (
      <WaterMark
        content="UmiJS 项目模板"
        globalAlpha="0.15"
        width="400"
        height="300"
      >
        <Layout>
          <Header className="layout-header" style={{ position: 'fixed' }}>
            {/* 系统logo */}
            <div className="logo">
              <i className="icon iconfont icon-years-fill"></i>
              <span>系统名称</span>
            </div>
            <Menu
              className="nav-menu-main"
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              onClick={this.clickMenuItem}
              style={{ height: '64px' }}
            >
              {menuList.map((item) => {
                return (
                  <Menu.Item
                    v-for="(item) in menuList"
                    key={item.url}
                    icon={<i className={'icon iconfont' + ' ' + item.icon}></i>}
                  >
                    {item.title}
                  </Menu.Item>
                );
              })}
            </Menu>
            {/* 系统设置 */}
            <SettingDropdown></SettingDropdown>
          </Header>
          {menuLoading ? (
            <div className="menuLoading">
              <Spin size="large" />
            </div>
          ) : (
            <Layout
              style={{
                margin: '64px 0px 0px',
                height: '100%',
              }}
              className="parent-container"
            >
              {children}
            </Layout>
          )}
        </Layout>
      </WaterMark>
    );
  }
}
export default connect(({ common }) => {
  return common;
})(Layouts);
