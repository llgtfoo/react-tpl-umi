/*
 * @Description:
 * @Author: llgtfoo
 * @Date: 2021-11-18 09:00:54
 * @LastEditTime: 2021-11-18 09:02:03
 * @LastEditors: llgtfoo
 * @FilePath: \react-tpl-umi\src\pages\module-2\children\menu-1\models\index.js
 */
export default {
  namespace: 'menu2-1',
  state: {
    menuList: [],
  },
  // 初始化调用
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路有变化
      history.listen(({ pathname }) => {
        // console.log(pathname, 'menu2-1')
      });
    },
  },

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
