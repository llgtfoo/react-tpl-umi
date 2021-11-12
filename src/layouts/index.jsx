import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Layout, Menu, Spin } from 'antd';
import WaterMark from 'watermark-component-for-react';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import SiderMenu from './SiderMenu.jsx';
import SettingDropdown from '../components/SettingDropdown/index.jsx';
import './index.less';
class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //菜单点击
  clickMenuItem = ({ key, keyPath, domEvent }) => {
    const { dispatch } = this.props;
    history.push(key); //跳转
    const currentMenu = this.getMenu(key);
    dispatch({
      type: 'common/setSiderMenus',
      payload: { currentMenu: currentMenu },
    });
    console.log(this.state, '000-------', history.location.pathname);
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
    console.log(this.props, '-');
    const current = `/${history.location.pathname.split('/')[1]}`; //顶部初始化选中
    const selectedKeys = [current]; //顶部选中
    const { menuList, children, menuLoading } = this.props;
    //获取侧边菜单
    let siderMenu = [];
    const currentMenu = menuList.filter((v) => v.url === current);
    if (currentMenu.length > 0) {
      if (currentMenu[0].children && currentMenu[0].children.length > 0) {
        siderMenu = currentMenu[0].children;
      } else {
        siderMenu = [];
      }
    }
    return (
      // <WaterMark
      //   content="UmiJS 项目模板"
      //   globalAlpha="0.15"
      //   width="400"
      //   height="300"
      // >
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
        ) : siderMenu.length > 0 ? (
          <SiderMenu children={children} siderMenu={siderMenu}></SiderMenu>
        ) : (
          <Layout style={{ padding: '10px', marginTop: 64 }}>{children}</Layout>
        )}
      </Layout>
      // </WaterMark>
    );
  }
}
export default connect((data) => {
  return data.common;
})(Layouts);
