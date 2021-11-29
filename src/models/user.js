/*
 * @Description:用户数据
 * @Author: llgtfoo
 * @Date: 2021-11-23 15:41:01
 * @LastEditTime: 2021-11-29 15:57:31
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\models\user.js
 */
const user = {
  namespace: 'user',
  state: {
    userInfo: {
      username: 'llgtfoo',
      orgId: '0001',
    },
    theme: '#1890ff',
  },
  reducers: {
    // 改变state中userInfo
    setUserInfo(state, action) {
      console.log(action.data, 'setUserInfo');
      return { ...state, ...action.data };
    },
    //改变主题
    setTheme(state, action) {
      window.localStorage.setItem('theme', action.data);
      return { ...state, theme: action.data };
    },
  },
  effects: {
    *fetchUser({ payload: currentMenu }, { call, put }) {
      console.log(currentMenu, 'currentMenu');
      yield put({ type: 'setUserInfo', data: currentMenu });
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 监听路有变化
  //     history.listen(({ pathname }) => {
  //       console.log(pathname, 'userusser')
  //     })
  //   },
  // },
};
export default user;
