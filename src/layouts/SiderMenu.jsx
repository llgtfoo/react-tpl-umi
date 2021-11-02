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
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false, //菜单收缩
    };
  }
  //菜单折叠方法
  toggle = (collapseds, type) => {
    this.setState({
      collapsed: collapseds,
    });
  };
  render() {
    const { collapsed } = this.state;
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
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
