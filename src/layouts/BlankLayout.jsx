import React, { useState } from 'react';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
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

export default BlankLayout;
