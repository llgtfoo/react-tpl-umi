/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-18 09:00:54
 * @LastEditTime: 2021-11-24 19:03:31
 * @LastEditors: llgtfoo
 * @FilePath: \react-quankun-test\src\pages\module-1\children\menu-2\models\index.js
 */
export default {
  namespace: 'menu-2',
  state: {
    menuList: [],
  },
  // 初始化调用
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 监听路有变化
  //     // history.listen(({ pathname }) => {
  //     //   // console.log(pathname, 'menu-2')
  //     // });
  //   },
  // },

  effects: {
    // 异步改变state中menuList
    *fetchMenuList({ payload: { currentUrl } }, { call, put }) {
      //   // call 触发接口调用
      const result = yield call(fetchMenulist);
      if (result.success) {
        //   put 触发改变reducers中方法action-setMenuList
        yield put({ type: 'setMenuList', data: result.data });
      }
    },
  },

  reducers: {
    // 改变state中menuList
    setMenuList(state, action) {
      return { ...state, menuList: action.data };
    },
  },
};
