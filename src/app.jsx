import { PageLoading } from '@ant-design/pro-layout';
import { history, getDvaApp } from 'umi';
import { currentUser as queryCurrentUser } from './services/login/index';
import action from '@/models/GlobalState.js'; //引入子应用中创建的action.js
import user from './models/user.js';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  // const fetchUserInfo = async () => {
  //   try {
  //     const msg = await queryCurrentUser();
  //     return msg.data;
  //   } catch (error) {
  //     history.push(loginPath);
  //   }
  //   return undefined;
  // };
  // //验证用户是不是登录状态，刷新执行
  // if (history.location.pathname !== loginPath) {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: {},
  //   };
  // }
  // return {
  //   fetchUserInfo,
  //   settings: {},
  // };
}
//渲染之前做权限校验，
export function render(oldRender) {
  oldRender();
}
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    props.onGlobalStateChange((state, prev) => {
      action.setActions(props);
      if (getDvaApp()) {
        getDvaApp()._store.dispatch({
          type: 'user/fetchUser',
          payload: state,
        });
      } else {
        user.state = state;
      }
      // props.setGlobalState(state);
    }, true);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};
