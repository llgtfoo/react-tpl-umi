import React, { useState, useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { history, connect } from 'umi';
import action from '@/models/GlobalState.js'; //引入子应用中创建的action.js
const InspectorWrapper =
  process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const BlankLayout = (props) => {
  const [locale] = useState(zhCN);
  return (
    <ConfigProvider locale={locale}>
      <InspectorWrapper>{props.children}</InspectorWrapper>
    </ConfigProvider>
  );
};

export default connect((state) => {
  return state.user;
})(BlankLayout);
