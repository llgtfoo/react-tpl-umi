import { Menu, Dropdown, Avatar, message } from 'antd';
import { UserOutlined, SettingFilled, LogoutOutlined } from '@ant-design/icons';
import { outLogin } from '@/services/login/index';
import { history } from 'umi';
import ThemePicker from '../ThemePicker/index';
import './index.less';

const SettingDropdown = (props) => {
  async function dropdownSettingItem({ key }) {
    switch (key) {
      case '0':
        // message.info('单击了个人中心');
        history.push('/user/account');
        break;
      case '1':
        // message.info('单击了个人设置');
        history.push('/user/setting');
        break;
      case '2':
        const { success } = await outLogin();
        if (success) {
          message.success('退出登录成功！');
          history.replace('/login');
        }
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
      <Dropdown overlay={menu} trigger={['click']}>
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
