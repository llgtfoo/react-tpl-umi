import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起，您访问的页面不存在！"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        放回首页
      </Button>
    }
  />
);

export default NoFoundPage;
