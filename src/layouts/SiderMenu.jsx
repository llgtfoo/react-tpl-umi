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
    this.state = {
      collapsed: false, //菜单收缩
      selectedKeys: [], //选中
      openKeys: [], //打开
    };
  }
  //菜单折叠方法
  toggle = (collapseds, type) => {
    this.setState({
      collapsed: collapseds,
    });
  };
  componentDidMount() {
    history.listen(({ pathname }) => {
      console.log(pathname, 'common1');
      this.setState({
        selectedKeys: pathname,
      });
    });
  }
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
    console.log(this.props, 'SiderMenu');
    const { collapsed, selectedKeys, openKeys } = this.state;
    const { children, siderMenu, siderSelectedKeys } = this.props;
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
            // openKeys={openKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            {siderMenu.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <SubMenu
                    key={item.url}
                    icon={<UserOutlined />}
                    title={item.title}
                  >
                    {item.children.map((v) => (
                      <Menu.Item key={v.url}>{v.title}</Menu.Item>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.url} icon={<UserOutlined />}>
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
