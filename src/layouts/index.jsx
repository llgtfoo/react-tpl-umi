import React, { Component } from 'react';
import { connect, history } from 'umi';
import { Layout, Menu, Spin } from 'antd';
import WaterMark from 'watermark-component-for-react'; //水印
import SiderMenu from './SiderMenu.jsx'; //菜单栏
import './index.less';
class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.firstPath = null;
  }
  //获取默认跳转路径
  getFirstJumpPath = (data) => {
    if (data.children && data.children.length > 0) {
      this.getFirstJumpPath(data.children[0]);
    } else {
      this.firstPath = data;
    }
    return this.firstPath;
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // const current = `/${history.location.pathname.split('/')[1]}`; //顶部初始化选中
    //获取菜单
    dispatch({
      type: 'common/fetchMenuList',
      payload: { currentUrl: '' },
    });
  }
  render() {
    const { menuList, children, menuLoading } = this.props;
    return (
      // <WaterMark
      //   className="watermark"
      //   content="UmiJS 项目模板"
      //   globalAlpha="0.15"
      //   width="400"
      //   height="300"
      // >
      <Layout>
        {menuLoading ? (
          <div className="menuLoading">
            <Spin size="large" />
          </div>
        ) : (
          <SiderMenu children={children} siderMenu={menuList}></SiderMenu>
        )}
      </Layout>
      // </WaterMark>
    );
  }
}
export default connect(({ common }) => {
  return common;
})(Layouts);
