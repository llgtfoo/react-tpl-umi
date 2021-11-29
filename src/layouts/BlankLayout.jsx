import React, { useState, useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import actions from '@/models/GlobalState.js';
import { connect } from 'umi';
const InspectorWrapper =
  process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const BlankLayout = (props) => {
  console.log(props, 'user');
  useEffect(() => {
    setTimeout(() => {
      console.log('setTimeout');
      actions.setGlobalState({ userInfo: { llgtfoo: 'llgtfoo' } });
    }, 5000);
  }, []);
  const [locale] = useState(zhCN);
  return (
    <ConfigProvider locale={locale}>
      <InspectorWrapper>{props.children}</InspectorWrapper>
    </ConfigProvider>
  );
};

export default connect(({ user }) => user)(BlankLayout);
