import React, { useState, useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import actions from '@/models/GlobalState.js';
import { connect } from 'umi';
const InspectorWrapper =
  process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const BlankLayout = (props) => {
  console.log(props, 'BlankLayout-props');
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
