import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Layout, Menu, Breadcrumb } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import SiderMenu from './SiderMenu.jsx';
import './index.less';
class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: '', //顶部选中
    };
  }
  //菜单点击
  clickMenuItem = ({ key, keyPath, domEvent }) => {
    const { history, dispatch } = this.props;
    history.push(key); //跳转
    this.setState({
      selectedKeys: key,
    }); //选中
    const currentMenu = this.getMenu(key);
    dispatch({
      type: 'common/setSiderMenus',
      payload: { currentMenu: currentMenu },
    });
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
    const { dispatch, history, menuList } = this.props;
    const current = `/${history.location.pathname.split('/')[1]}`; //顶部初始化选中
    //获取菜单
    dispatch({
      type: 'common/fetchMenuList',
      payload: { currentUrl: current },
    });
    this.setState({
      selectedKeys: current,
    });
  }
  render() {
    console.log(this.props, '-');
    const { selectedKeys } = this.state;
    const { menuList, children, siderMenu } = this.props;
    return (
      <Layout>
        <Header className="layout-header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            onClick={this.clickMenuItem}
          >
            {menuList.map((item) => {
              return (
                <Menu.Item v-for="(item) in menuList" key={item.url}>
                  {item.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Header>
        {siderMenu.length > 0 ? (
          <SiderMenu children={children} siderMenu={siderMenu}></SiderMenu>
        ) : (
          <Layout style={{ padding: '10px' }}>{children}</Layout>
        )}
      </Layout>
    );
  }
}
export default connect((data) => {
  console.log(data, 'data');
  return data.common;
})(Layouts);
