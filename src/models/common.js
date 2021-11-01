import { fetchMenulist } from '@/services/common/index';
export default {
  namespace: 'common',
  state: {
    menuList: [],
  },
  // 初始化调用
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路有变化
      history.listen(({ pathname }) => {
        console.log(pathname, 'common');
      });
    },
  },

  effects: {
    // 异步改变state中menuList
    *fetchMenuList({ data }, { call, put }) {
      //   // call 触发接口调用
      const result = yield call(fetchMenulist);
      console.log(result, 'fetchMenulist');
      if (result.success) {
        //   put 触发改变reducers中方法action-setMenuList
        yield put({ type: 'setMenuList', data: result.data });
      }
    },
  },

  reducers: {
    // 改变state中menuList
    setMenuList(state, action) {
      //   console.log(state, action);
      return { ...state, menuList: action.data };
    },
  },
};
