import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { connect, history } from 'umi';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
export default class SiderMenu extends Component {
  static propTypes = {
    siderMenu: PropTypes.array,
    siderSelectedKeys: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.unlisten = null;
    this.currentSelectedMenu = {};
    this.fetchObj(this.props.siderMenu, history.location.pathname);
    this.state = {
      collapsed: false, //菜单收缩
      selectedKeys: [history.location.pathname], //选中
      openKeys: [this.currentSelectedMenu.parentUrl], //打开
    };
    console.log(this.props, this.currentSelectedMenu, 'constructor');
  }
  fetchObj = (collenction, target) => {
    console.log(collenction, target, 'collenction, target');
    collenction.forEach((item) => {
      if (item.url === target) {
        this.currentSelectedMenu = { ...item };
        console.log(item, 111);
      } else if (item.children && item.children.length > 0) {
        this.fetchObj(item.children, target);
        console.log(222);
      }
    });
    console.log(this.currentSelectedMenu, 'boj');
  };
  //菜单折叠方法
  toggle = (collapseds, type) => {
    this.setState({
      collapsed: collapseds,
      openKeys: [],
    });
  };
  clickMenuItem = ({ key, keyPath, domEvent }) => {
    console.log(key, keyPath);
  };
  openChange = (openKeys) => {
    console.log(openKeys, 'openKeys');
    this.setState({
      openKeys: openKeys,
    });
  };
  // componentDidMount() {
  //   if (this.unlisten) {
  //     return;
  //   }
  //   this.unlisten = history.listen(({ pathname }) => {
  //     this.setState({
  //       selectedKeys: [pathname],
  //       openKeys: [],
  //     });
  //     console.log(this.state);
  //   });
  // }
  // componentWillUnmount() {
  //   console.log(this);
  //   if (this.unlisten) {
  //     this.unlisten();
  //   }
  // }
  //   componentDidMount() {
  //     console.log(history.location.pathname, 'history.location.pathname');
  //     const selectedKey = [history.location.pathname];
  //     this.setState({
  //       selectedKeys: selectedKey,
  //     });
  //   }
  //   componentDidUpdate() {
  //     const selectedKey = [history.location.pathname];
  //     // this.setState({
  //     //   selectedKeys: selectedKey,
  //     // });
  //     console.log([history.location.pathname], this.state);
  //   }
  render() {
    console.log(this.props, this.state, 'SiderMenu');
    const { collapsed, selectedKeys, openKeys, defaultOpenKeys } = this.state;
    const { children, siderMenu } = this.props;
    return (
      <Layout>
        <Sider
          width={230}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={this.toggle}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            // defaultOpenKeys={defaultOpenKeys}
            openKeys={openKeys}
            style={{ height: '100%', borderRight: 0 }}
            onClick={this.clickMenuItem}
            onOpenChange={this.openChange}
          >
            {siderMenu.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <SubMenu
                    key={item.url}
                    icon={<UserOutlined />}
                    title={item.title}
                    llgtfoo={item.url}
                  >
                    {item.children.map((v) => (
                      <Menu.Item key={v.url} llgtfoo={v.url}>
                        {v.title}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.url}
                    llgtfoo={item.url}
                    icon={<UserOutlined />}
                  >
                    {item.title}
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 10px 10px' }}>
          <Breadcrumb style={{ margin: '15px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 20,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
