import { fetchMenulist } from '@/services/common/index';
import data from '../../mock/data.js';
export default {
  namespace: 'common',
  state: {
    menuList: [], //菜单集合
    // siderMenu: [], //侧边菜单
    menuLoading: false,
  },
  // // 初始化调用
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 监听路有变化
  //     // history.listen(({ pathname }) => {
  //     //   console.log(pathname, 'common')
  //     // })
  //   },
  // },

  effects: {
    // 异步改变state中menuList
    *fetchMenuList({ payload: { currentUrl } }, { call, put }) {
      yield put({ type: 'setLoading', data: true });
      //   // call 触发接口调用
      const result = yield call(fetchMenulist);
      if (result.success) {
        //   put 触发改变reducers中方法action-setMenuList
        yield put({ type: 'setMenuList', data: data });
        yield put({ type: 'setLoading', data: false });
      }
    },
  },

  reducers: {
    // 改变state中menuList
    setMenuList(state, action) {
      return { ...state, menuList: action.data };
    },
    //loading效果
    setLoading(state, action) {
      return { ...state, menuLoading: action.data };
    },
  },
};
