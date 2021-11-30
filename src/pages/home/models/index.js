/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-18 08:58:33
 * @LastEditTime: 2021-11-24 19:03:16
 * @LastEditors: llgtfoo
 * @FilePath: \react-quankun-test\src\pages\home\models\index.js
 */
import * as llgtfoo from '../api/index';
export default {
  namespace: 'home',
  state: {
    list: [],
  },
  // 初始化调用
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 监听路有变化
  //     // history.listen(({ pathname }) => {
  //     //   // console.log(pathname, 'home')
  //     // });
  //   },
  // },

  effects: {
    // 异步改变state中list
    *getList({ payload: { currentUrl } }, { call, put }) {
      //   // call 触发接口调用
      const result = yield call(llgtfoo.fetchTest);
      if (result.success) {
        //   put 触发改变reducers中方法action-setlist
        yield put({ type: 'setlist', data: result.data });
      }
    },
  },

  reducers: {
    // 改变state中list
    setlist(state, action) {
      return { ...state, list: action.data };
    },
  },
};
