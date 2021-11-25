import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Tabs, Dropdown, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { connect, history } from 'umi';
const { TabPane } = Tabs;
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Ltabs from '../components/Tabs/index.jsx';
import './SiderMenu.less';
export default class SiderMenu extends Component {
  static propTypes = {
    siderMenu: PropTypes.array,
    siderSelectedKeys: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.currentSelectedMenu = {}; //父级展开项
    this.unlisten = null;
    this.rootSubmenuKeys = this.props.siderMenu.map((v) => v.url);
    this.state = {
      collapsed: false, //菜单收缩
      openKeys: [], //展开
      // activekeys: '', //tab默认选中项
      tabLists: [], //标签页list
      refresh: true, //刷新当前页
    };
  }
  componentDidMount() {
    //监听路由改变展开默认菜单
    if (this.unlisten) {
      return;
    }
    this.unlisten = history.listen(({ pathname }) => {
      this.fetchObj(this.props.siderMenu, pathname); //获取选中的父级打开菜单
      let array = [];
      this.setState((state, props) => {
        const index = state.tabLists.findIndex(
          (item) => item.key === this.currentSelectedMenu.key,
        );
        if (
          index === -1 &&
          !this.currentSelectedMenu.children &&
          Object.keys(this.currentSelectedMenu).length > 0
        ) {
          array = [...state.tabLists, this.currentSelectedMenu];
        } else {
          array = [...state.tabLists];
        }
        const target = this.rootSubmenuKeys.filter((v) => {
          return this.currentSelectedMenu.parentUrl.includes(v);
        });

        return {
          tabLists: array, //标签页数据
          openKeys: [this.currentSelectedMenu.parentUrl, ...target], //展开
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
        item.key = item.url;
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
  openChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  //标签页点击
  clickTab = (key) => {
    history.push(key);
  };
  //标签页关闭
  closeTab = (key) => {
    const index = this.state.tabLists.findIndex((v) => v.key === key);
    if (index !== -1) {
      this.setState(
        (state, props) => {
          state.tabLists.splice(index, 1);
          return {
            tabLists: state.tabLists,
          };
        },
        () => {
          if (
            key === history.location.pathname &&
            this.state.tabLists.length > 0
          ) {
            const s =
              index - 1 > 0 ? index - 1 : this.state.tabLists.length - 1;
            history.push(this.state.tabLists[s].url);
          }
        },
      );
    }
  };
  dropdownItem = ({ key }) => {
    if (key === 'close') {
      this.setState((state, props) => {
        return {
          tabLists: [this.currentSelectedMenu],
        };
      });
    } else if (key === 'refresh') {
      this.setState(
        (state, props) => {
          return {
            refresh: false,
          };
        },
        () => {
          this.setState({ refresh: true });
        },
      );
    }
  };
  render() {
    const { collapsed, openKeys, tabLists, refresh } = this.state;
    const { children, siderMenu } = this.props;
    const selectedKeys = [history.location.pathname]; //选中
    const activekeys = history.location.pathname; //选中
    const menu = (
      <Menu onClick={this.dropdownItem}>
        <Menu.Item key="close">关闭其他标签页</Menu.Item>
        <Menu.Item key="refresh">刷新当前页</Menu.Item>
      </Menu>
    );
    let closeable = true; //标签页显示关闭标签
    if (tabLists.length === 1) {
      closeable = false;
    } else {
      closeable = true;
    }
    return (
      <Layout style={{ marginTop: 64, width: '100%' }}>
        <Sider
          width={230}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={this.toggle}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            // zIndex: 100,
          }}
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
            {getMenuNodes(siderMenu)}
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: !collapsed ? 230 : 80,
            boxSizing: 'border-box',
            transition: 'all 400ms ease',
          }}
        >
          <div
            className="breadcrumb"
            style={{
              position: 'fixed',
              right: 0,
              left: !collapsed ? 230 : 80,
              transition: 'all 400ms ease',
            }}
          >
            <Ltabs
              list={tabLists}
              style={{ paddingLeft: '15px' }}
              activekeys={activekeys}
              clicktab={this.clickTab}
              clickclose={this.closeTab}
              closeable={closeable}
            ></Ltabs>
            <div className="breadcrumb-tool">
              <Dropdown overlay={menu} trigger={['click']}>
                <span
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <DownOutlined style={{ fontSize: '14px' }} />
                </span>
              </Dropdown>
            </div>
          </div>
          <Content
            className="site-layout-background"
            style={{
              padding: 15,
              margin: '56px 10px 10px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {siderMenu.length > 0 && refresh ? children : ''}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//菜单递归
const getMenuNodes = (data) => {
  return data.map((item) => {
    if (!item.children) {
      return (
        <Menu.Item
          key={item.url}
          llgtfoo={item.url}
          icon={<i className={'icon iconfont' + ' ' + item.icon}></i>}
        >
          {item.title}
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu
          key={item.url}
          icon={<i className={'icon iconfont' + ' ' + item.icon}></i>}
          title={item.title}
          llgtfoo={item.url}
        >
          {getMenuNodes(item.children)}
          {/* 递归调用，渲染二级列表 */}
        </SubMenu>
      );
    }
  });
};
