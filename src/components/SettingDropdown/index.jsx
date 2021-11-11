import { Menu, Dropdown, Avatar, message } from 'antd';
import './index.less';
import { UserOutlined, SettingFilled, LogoutOutlined } from '@ant-design/icons';
const SettingDropdown = (props) => {
  function dropdownSettingItem({ key }) {
    switch (key) {
      case '0':
        message.info('单击了个人中心');
        break;
      case '1':
        message.info('单击了个人设置');
        break;
      case '2':
        message.info('单击了退出登录');
        break;
    }
  }
  const menu = (
    <Menu onClick={dropdownSettingItem}>
      <Menu.Item key="0" icon={<UserOutlined />}>
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item key="1" icon={<SettingFilled />}>
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="SettingDropdown">
      <Dropdown overlay={menu} trigger={['hover']}>
        <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            llgtfoo
          </Avatar>
          <span className="username"> llgtfoo</span>
        </span>
      </Dropdown>
    </div>
  );
};

export default SettingDropdown;
