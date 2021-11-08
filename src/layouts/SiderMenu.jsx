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
    this.currentSelectedMenu = {}; //父级展开项
    this.unlisten = null;
    this.state = {
      collapsed: false, //菜单收缩
      openKeys: [], //展开
    };
  }
  componentDidMount() {
    //监听路由改变展开默认菜单
    if (this.unlisten) {
      return;
    }
    this.unlisten = history.listen(({ pathname }) => {
      this.fetchObj(this.props.siderMenu, pathname); //获取选中的父级打开菜单
      this.setState((state, props) => {
        return {
          openKeys: [this.currentSelectedMenu.parentUrl], //展开
        };
      });
    });
  }
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  //递归获取子菜单父级展开项
  fetchObj = (collenction, target) => {
    collenction.forEach((item) => {
      if (item.url === target) {
        this.currentSelectedMenu = { ...item };
      } else if (item.children && item.children.length > 0) {
        this.fetchObj(item.children, target);
      }
    });
  };
  //菜单折叠方法
  toggle = (collapseds, type) => {
    this.setState({
      collapsed: collapseds,
    });
  };
  //点击跳转
  clickMenuItem = ({ key, keyPath, domEvent }) => {
    history.push(key);
  };
  //点击菜单展开
  openChange = (openKeys) => {
    const last = openKeys.pop();
    console.log(openKeys, 'openKeys');
    this.setState({
      openKeys: [last],
    });
  };
  render() {
    console.log(this.props, this.state, 'SiderMenu');
    const { collapsed, openKeys } = this.state;
    const { children, siderMenu } = this.props;
    const selectedKeys = [history.location.pathname]; //选中
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
            {siderMenu.length > 0 ? children : ''}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
