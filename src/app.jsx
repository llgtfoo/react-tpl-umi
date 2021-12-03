import { PageLoading } from '@ant-design/pro-layout';
import { history, getDvaApp } from 'umi';
import { currentUser as queryCurrentUser } from './services/login/index';
import React from 'react';
import actions from '@/models/GlobalState.js';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
let currentUser = {};
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
  //验证用户是不是登录状态，刷新执行(服务器端存储登录用户数据)
  // if (history.location.pathname !== loginPath) {
  //   currentUser = await fetchUserInfo();
  //   actions.setGlobalState({ userInfo: { ...currentUser } });
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
// export function useQiankunStateForSlave(props) {
//   const app = getDvaApp();
//   const [masterState, setMasterState] = useState({ llgtfoo: 'llgtfoo' });
//   console.log('useQiankunStateForSlave', props, app, currentUser);
//   const setablState = (hh) => {
//     setMasterState(hh);
//   };
//   return {
//     currentUser,
//     setablState,
//     masterState,
//     setMasterState,
//   };
// }
//渲染之前做权限校验，
export function render(oldRender) {
  oldRender();
}
//改变子应用渲染容器
export function modifyClientRenderOpts(memo) {
  return {
    ...memo,
    rootElement: 'root',
  };
}
