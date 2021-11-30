/*
 * @Description:用户数据
 * @Author: llgtfoo
 * @Date: 2021-11-23 15:41:01
 * @LastEditTime: 2021-11-30 11:04:12
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\models\user.js
 */
export default {
  namespace: 'user',
  state: {
    userInfo: {
      username: 'llgtfoo',
      userId: '1111',
    },
    llgtfoo: 'llgtfoo@163.com',
    theme: '#1890ff',
  },
  reducers: {
    // 改变state中userInfo
    setUserInfo(state, action) {
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
