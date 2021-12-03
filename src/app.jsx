import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import { currentUser as queryCurrentUser } from './services/login/index';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  };
  //验证用户是不是登录状态，刷新执行
  // if (history.location.pathname !== loginPath) {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: {},
  //   };
  // }
  return {
    fetchUserInfo,
    settings: {},
  };
}
//渲染之前做权限校验，
export function render(oldRender) {
  oldRender();
}
