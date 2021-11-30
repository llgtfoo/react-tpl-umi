import { connect } from 'umi';
import { List, Avatar } from 'antd';
import { useEffect } from 'react';
import './index.less';
export default connect(({ home, user, loading }) => {
  return { home, user, loading };
})(function IndexPage(props) {
  const { dispatch } = props;
  useEffect(() => {
    dispatch({
      type: 'home/getList',
      payload: {},
    });
  }, []);
  const {
    home: { list },
  } = props;
  return (
    <List
      header={<h1>&nbsp;&nbsp;首页——home-page{props.user.userInfo.userId}</h1>}
      className="home-page"
      itemLayout="vertical"
      size="large"
      pagination={false}
      dataSource={list}
      footer={false}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            <img
              width={100}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<span href={item.href}>{item.name}</span>}
            description={item.email}
          />
          {item.address}
        </List.Item>
      )}
    />
  );
});
