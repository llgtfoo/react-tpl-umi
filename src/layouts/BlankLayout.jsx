import React, { useState, useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import WaterMark from 'watermark-component-for-react';
const InspectorWrapper =
  process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const BlankLayout = ({ children }) => {
  const [locale] = useState(zhCN);
  return (
    <ConfigProvider locale={locale}>
      <WaterMark
        content="UmiJS 项目模板"
        globalAlpha="0.15"
        width="400"
        height="300"
      >
        <InspectorWrapper>{children}</InspectorWrapper>
      </WaterMark>
    </ConfigProvider>
  );
};

export default BlankLayout;
